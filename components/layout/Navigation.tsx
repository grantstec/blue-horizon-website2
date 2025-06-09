"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon } from 'lucide-react';

interface DropdownItem {
  name: string;
  href?: string;
}

interface NavigationItem {
  name: string;
  href?: string;
  active?: boolean;
  hasDropdown?: boolean;
  dropdownItems?: DropdownItem[];
}

const navigationItems: NavigationItem[] = [
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

const Navigation: React.FC = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Animation variants for staggered navigation items
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.5
      }
    }
  };

  // Each item starts from the same position (stacked) but with different durations
  const getItemVariants = (index: number) => ({
    hidden: {
      x: -800, // All start from same off-screen position
      y: 0,    // All on same y-axis (stacked)
      opacity: 0
    },
    visible: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        duration: 2 - (index * 0.2), // Earlier items move slower, later ones faster
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: index * 0.1 // Small stagger delay
      }
    }
  });

  // Dropdown animation variants
  const dropdownContainerVariants = {
    hidden: {
      opacity: 0,
      height: 0
    },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeOut",
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.2,
        ease: "easeIn"
      }
    }
  };

  const dropdownItemVariants = {
    hidden: {
      y: -20,
      x: 0, // Start stacked at the parent's x position
      opacity: 0
    },
    visible: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const handleMouseEnter = (itemName: string, hasDropdown: boolean) => {
    setHoveredItem(itemName);
    if (hasDropdown) {
      setActiveDropdown(itemName);
    }
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
    setActiveDropdown(null);
  };

  return (
    <nav className="relative">
      <motion.ul
        className="flex flex-col lg:flex-row items-center lg:space-x-6 xl:space-x-12 space-y-4 lg:space-y-0"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {navigationItems.map((item, index) => (
          <motion.li
            key={item.name}
            className="relative"
            variants={getItemVariants(index)}
            onMouseEnter={() => handleMouseEnter(item.name, item.hasDropdown || false)}
            onMouseLeave={handleMouseLeave}
          >
            {/* Main Navigation Link */}
            <motion.a
              href={item.href}
              className={`
                flex items-center px-2 py-1 cursor-pointer transition-all duration-300
                font-mono font-normal text-lg sm:text-xl lg:text-2xl 
                tracking-wider leading-normal whitespace-nowrap
                drop-shadow-lg hover:scale-105
                ${hoveredItem === item.name ? 'text-[#0033a0]' : 'text-white'}
                ${item.active ? 'text-[#0033a0]' : ''}
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {item.name}
              {item.hasDropdown && (
                <motion.div
                  animate={{ rotate: activeDropdown === item.name ? 180 : 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                >
                  <ChevronDownIcon className="ml-2 w-4 h-4" />
                </motion.div>
              )}
            </motion.a>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {item.hasDropdown && activeDropdown === item.name && (
                <motion.div
                  className="absolute top-full left-0 mt-2 z-50 min-w-[180px]"
                  variants={dropdownContainerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <div className="bg-transparent rounded-lg shadow-none overflow-visible">
                    {item.dropdownItems?.map((dropdownItem) => (
                      <motion.a
                        key={dropdownItem.name}
                        href={dropdownItem.href}
                        className="
                          block px-2 py-1 text-white hover:text-[#0033a0] cursor-pointer transition-all duration-300 
                          font-mono text-base lg:text-lg tracking-wide 
                        "
                        variants={dropdownItemVariants}
                      >
                        {dropdownItem.name}
                      </motion.a>
                    ))}
                  </div>
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