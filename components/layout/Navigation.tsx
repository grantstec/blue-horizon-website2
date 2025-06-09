"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon } from 'lucide-react';

const STYLES = {
  textSize: "text-1 sm:text-xl lg:text-1xl", // Responsive text: 18px -> 20px -> 24px  
  spacing: "lg:space-x-5 xl:space-x-12", // Horizontal spacing between nav items: 20px on lg, 48px on xl
  dropdownTextSize: "text-sm lg:text-s", // Dropdown text: 16px base, 18px on large screens
  textTracking: "tracking-wider" // Increased letter spacing for better readability
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
      { name: "STRUCTURES", href: "/teams/structures" },
      { name: "AVIONICS", href: "/teams/flight-software" },
      { name: "CONTROLS", href: "/teams/payloads" },
      { name: "GSE", href: "/teams/gse" },
      { name: "SUPPORT", href: "/teams/avionics" }
    ]
  },
  { 
    name: "PROJECTS", 
    active: false, 
    hasDropdown: true,
    dropdownItems: [
      { name: "SPHINX I", href: "/projects/mojave-spine" },    
      { name: "SPHINX II", href: "/projects/mojave-spine" },
      { name: "VIKING", href: "/projects/tvc" }
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
    hidden: { x: -800, opacity: 0 }, // Start further off-screen
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 35,  // Lower stiffness for a slower, softer spring
        damping: 12,   // Adequate damping to prevent too much oscillation
        mass: 1       // Slightly increased mass for a more substantial feel
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
        staggerChildren: 0.04 // Small stagger for near-simultaneous animation start
      }
    }
  },
  item: (index: number) => {
    const SPREAD_Y = 2; // Vertical spacing between dropdown items in pixels
                         // Negative value moves items upward for compact layout
                         // Should match your text height + padding (text-base + py-1 ≈ 24px total)
    return {
      hidden: {
        y: -20*(index), // All items start stacked at same position (40px spacing for animation effect)
        opacity: 0,
        scale: 0.95 // Slightly smaller during hidden state
      },
      visible: {
        y: index * SPREAD_Y, // Each item animates to its final position with SPREAD_Y spacing
        opacity: 1,
        scale: 1, // Full size when visible
        transition: {
          type: "spring",
          stiffness: 150, // Higher stiffness for snappy dropdown animation
          damping: 25,    // Good damping to prevent overshoot
          mass: 0.75      // Lighter mass for quick, responsive feel
        }
      },
      exit: {
        opacity: 0,
        scale: 0.9,
        y: -20*(index), // Return to stacked position when hiding
        transition: { duration: 0.3, ease: "easeInOut"}
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
            className="relative" // Parent li needs relative positioning for absolute dropdown positioning
            variants={navVariants.item}
            onMouseEnter={() => handleMouseEnter(item.name, item.hasDropdown || false)}
            onMouseLeave={handleMouseLeave}
          >
            <motion.a
              href={item.href}
              className={`
                flex items-center px-2 py-1 cursor-pointer transition-colors duration-200
                font-normal text-1x1 ${STYLES.textTracking} leading-normal whitespace-nowrap
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
                  className="absolute top-full left-0 z-50" // top-full: positions dropdown directly below parent item
                                                           // left-0: aligns dropdown with left edge of parent
                                                           // z-50: high z-index ensures dropdown appears above other elements
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={dropdownSpreadVariants.container}
                >
                  {item.dropdownItems?.map((dropdownItem, dropIndex) => (
                    <motion.a
                      key={dropdownItem.name}
                      href={dropdownItem.href}
                      className={`
                        block px-1 py-0 text-white hover:text-[#0033a0]
                        cursor-pointer transition-colors duration-300 ${STYLES.dropdownTextSize} tracking-wide
                        font-pcap 
                      `} // block: makes link fill full width of container
                         // px-4 py-1: 16px horizontal, 4px vertical padding (more than nav items)
                         // tracking-wide: moderate letter spacing for dropdown items
                         // font-pcap: custom font family
                      variants={dropdownSpreadVariants.item(dropIndex)}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      whileHover={{ scale: 1.05 }} // 5% scale increase (less than main nav)
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