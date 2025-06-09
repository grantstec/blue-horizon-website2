"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon } from 'lucide-react';
import { createNavigationVariants, dropdown, hoverScale, tapScale } from '../../utils/animations';

// === EDITABLE STYLE CONSTANTS ===
const STYLES = {
  textSize: "text-lg sm:text-xl lg:text-2xl",
  spacing: "lg:space-x-6 xl:space-x-12",
  hoverColor: "text-[#0033a0]", 
  activeColor: "text-[#0033a0]",
  dropdownTextSize: "text-base lg:text-lg",
  textTracking: "tracking-wider"
};

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

  const navVariants = createNavigationVariants(navigationItems.length);

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
        className={`flex flex-col lg:flex-row items-center ${STYLES.spacing} space-y-4 lg:space-y-0`}
        variants={navVariants.container}
        initial="hidden"
        animate="visible"
      >
        {navigationItems.map((item, index) => (
          <motion.li
            key={item.name}
            className="relative"
            custom={index}
            variants={navVariants.item}
            onMouseEnter={() => handleMouseEnter(item.name, item.hasDropdown || false)}
            onMouseLeave={handleMouseLeave}
          >
            {/* Main Navigation Link */}
            <motion.a
              href={item.href}
              className={`
                flex items-center px-2 py-1 cursor-pointer transition-colors duration-300
                font-normal ${STYLES.textSize} ${STYLES.textTracking} leading-normal whitespace-nowrap
                drop-shadow-lg text-white
                ${hoveredItem === item.name ? STYLES.hoverColor : ''}
                ${item.active ? STYLES.activeColor : ''}
              `}
              whileHover={hoverScale}
              whileTap={tapScale}
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
                  variants={dropdown.container}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <div className="bg-transparent rounded-lg overflow-visible">
                    {item.dropdownItems?.map((dropdownItem) => (
                      <motion.a
                        key={dropdownItem.name}
                        href={dropdownItem.href}
                        className={`
                          block px-2 py-1 text-white hover:${STYLES.hoverColor.replace('text-', '')} 
                          cursor-pointer transition-colors duration-300 ${STYLES.dropdownTextSize} tracking-wide
                        `}
                        variants={dropdown.item}
                        initial="hidden"
                        animate="visible"
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