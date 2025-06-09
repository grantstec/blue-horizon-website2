"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon } from 'lucide-react';

const STYLES = {
  textSize: "text-lg sm:text-xl lg:text-1xl", 
  spacing: "lg:space-x-5 xl:space-x-12",
  dropdownTextSize: "text-base lg:text-lg",
  textTracking: "tracking-wider"
};

const navigationItems = [
  { name: "HOME", active: true, hasDropdown: false, href: "/" },
  { name: "ABOUT", active: false, hasDropdown: false, href: "/about" },
  { 
    name: "TEAMS", 
    active: false, 
    hasDropdown: true,
    dropdownItems: [
      { name: "PROPULSION", href: "/teams/propulsion" },
      { name: "GSE", href: "/teams/gse" },
      { name: "AVIONICS", href: "/teams/avionics" }
    ]
  },
  { 
    name: "PROJECTS", 
    active: false, 
    hasDropdown: true,
    dropdownItems: [
      { name: "MOJAVE SPINE", href: "/projects/mojave-spine" },
      { name: "TVC", href: "/projects/tvc" }
    ]
  },
  { name: "CONTACT", active: false, hasDropdown: false, href: "/contact" }
];

const navVariants = {
  container: {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.18 // Stagger the start of each nav item's animation
      }
    }
  },
  item: {
    hidden: { x: -400, opacity: 0 }, // Start further off-screen
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 25,  // Lower stiffness for a slower, softer spring
        damping: 12,   // Adequate damping to prevent too much oscillation
        mass: 1.5       // Slightly increased mass for a more substantial feel
      }
      // Note: 'duration' is not typically used with type: "spring"
      // as the spring's physics (stiffness, damping, mass) determine its natural duration.
    }
  }
};

const dropdownSpreadVariants = {
  container: {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.04 // Or adjust/remove if you want them to start moving truly simultaneously
      }
    }
  },
  item: (index: number) => {
    const SPREAD_Y = 0; // Adjust this based on your item height (font size + padding)
                        // e.g., if text-base (16px) + py-1 (8px total) = 24px.
    return {
      hidden: {
        y: -40*(index), // CRITICAL: All items start at the same y-position within the container
        opacity: 0,
        scale: 0.95
      },
      visible: {
        y: index * SPREAD_Y, // Each item animates to its final vertical position
        opacity: 1,
        scale: 1,
        transition: {
          type: "spring",
          stiffness: 150,
          damping: 25,
          mass: 0.75
        }
      },
      exit: {
        opacity: 0,
        scale: 0.9,
        y: -40*(index),
        transition: { duration: 0.25, ease: "easeInOut"}
      }
    };
  }
};

const Navigation: React.FC = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const handleMouseEnter = (itemName: string, hasDropdown: boolean) => {
    setHoveredItem(itemName);
    if (hasDropdown) setActiveDropdown(itemName);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
    setActiveDropdown(null);
  };

  return (
    <nav className="relative overflow-visible">
      <motion.ul
        className={`flex flex-col lg:flex-row items-center ${STYLES.spacing} space-y-4 lg:space-y-0`}
        variants={navVariants.container}
        initial="hidden"
        animate="visible"
      >
        {navigationItems.map((item) => (
          <motion.li
            key={item.name}
            className="relative" // Parent li is relative for absolute positioning of dropdown
            variants={navVariants.item}
            onMouseEnter={() => handleMouseEnter(item.name, item.hasDropdown || false)}
            onMouseLeave={handleMouseLeave}
          >
            <motion.a
              href={item.href}
              className={`
                flex items-center px-2 py-1 cursor-pointer transition-colors duration-300
                font-normal ${STYLES.textSize} ${STYLES.textTracking} leading-normal whitespace-nowrap
                drop-shadow-lg text-white hover:text-[#0033a0]
                ${item.active || hoveredItem === item.name ? 'text-[#0033a0]' : ''}
              `}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {item.name}
              {item.hasDropdown && (
                <motion.div
                  initial={false}
                  animate={{ rotate: activeDropdown === item.name ? 180 : 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="ml-2"
                >
                  <ChevronDownIcon className="w-4 h-4" />
                </motion.div>
              )}
            </motion.a>
            {/* Dropdown Spread Animation */}
            <AnimatePresence>
              {item.hasDropdown && activeDropdown === item.name && (
                <motion.div
                  // className="absolute left-0 flex-col items-start pd " // OLD
                  className="absolute top-full left-0 z-50" // NEW: top-full positions it below parent. pt-2 for a small gap.
                                                                // Removed flex-col and items-start.
                  initial="hidden"
                  animate="visible"
                  exit="hidden" // Consider using "exit" variant from dropdownSpreadVariants if defined
                  variants={dropdownSpreadVariants.container}
                >
                  {item.dropdownItems?.map((dropdownItem, dropIndex) => (
                    <motion.a
                      key={dropdownItem.name}
                      href={dropdownItem.href}
                      className={`
                        block px-4 py-1 text-white hover:text-[#0033a0] // py-1 for some vertical padding on items
                        cursor-pointer transition-colors duration-300 ${STYLES.dropdownTextSize} tracking-wide
                        font-pcap 
                      `}
                      // Ensure SPREAD_Y in dropdownSpreadVariants.item is appropriate for your font size and py-1
                      variants={dropdownSpreadVariants.item(dropIndex)} // Pass only dropIndex if 'total' isn't used
                      initial="hidden"
                      animate="visible"
                      exit="exit" // Make sure your item variant has an 'exit' state
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {dropdownItem.name}
                    </motion.a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.li>
        ))}
      </motion.ul>
    </nav>
  );
};

export default Navigation;