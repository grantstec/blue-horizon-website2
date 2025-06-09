"use client";

import React from 'react';
import { motion } from 'framer-motion';

// === EDITABLE STYLE CONSTANTS ===
const STYLES = {
  titleText: "BLUE HORIZON",
  subtitleText: "USAFA COLLEGIATE ROCKETRY CLUB",
  titleSize: "text-5xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl", // Responsive: 36px -> 48px -> 60px -> 72px -> 96px
  subtitleSize: "text-lg sm:text-xl md:text-xl lg:text-xl xl:text-2xl", // Responsive: 18px -> 20px -> 24px -> 30px -> 36px
  titleColor: "text-[#0033a0]", // Custom blue color matching brand
  subtitleColor: "text-white",
  titleTracking: "tracking-wider sm:tracking-[2px] md:tracking-[3px] lg:tracking-[4px] xl:tracking-[4.80px]", // Letter spacing increases with screen size
  subtitleTracking: "tracking-wide sm:tracking-[1px] md:tracking-[1.5px] lg:tracking-[1.80px]", // Smaller letter spacing for subtitle
  showCTA: true,
  ctaText: "LAUNCH"
};

// Hero text animation variants - matches Navigation.tsx spring animation style
const heroVariants = {
  container: {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3 // Stagger each text element by 300ms
      }
    }
  },
  title: {
    hidden: { 
      x: -1000, // Start 1000px to the left (further off-screen for dramatic effect)
      opacity: 0 
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 30,  // Lower stiffness for slower, softer spring
        damping: 15,    // Adequate damping to prevent oscillation
        mass: 1.25        // Heavier mass for more substantial feel on large text
      }
    }
  },
  subtitle: {
    hidden: { 
      x: -1200, // Start 800px to the left (slightly less than title for variation)
      opacity: 0 
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 35,  // Slightly stiffer for subtitle
        damping: 15,
        mass: 1
      }
    }
  },
  cta: {
    hidden: { 
      opacity: 0, 
      y: 50 // Start 100px below final position
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 40,
        mass: 0.25
      }
    }
  }
};

// Button hover/tap animations - consistent with Navigation.tsx
const buttonVariants = {
  hover: { scale: 1.05 },
  tap: { scale: 0.95 }
};

const HeroSection: React.FC = () => {
  return (
    <div className="text-left max-w-8xl mx-auto px-4 sm:px-6 lg:px-8"> {/* Changed from text-center lg:text-left to just text-left for consistent left alignment */}
      <motion.div
        className="space-y-0 lg:space-y-0" // Vertical spacing: 16px on mobile, 24px on large screens
        variants={heroVariants.container}
        initial="hidden"
        animate="visible"
      >
        {/* Main Title */}
        <motion.h1
          variants={heroVariants.title}
          className={`
            font-bold ${STYLES.titleColor} ${STYLES.titleSize} ${STYLES.titleTracking}
            leading-tight drop-shadow-lg
          `} // leading-tight: tight line height, drop-shadow-lg: large text shadow for depth
        >
          {STYLES.titleText}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={heroVariants.subtitle}
          className={`
            font-normal ${STYLES.subtitleColor} ${STYLES.subtitleSize} ${STYLES.subtitleTracking}
            leading-normal drop-shadow-md
          `} // leading-normal: standard line height, drop-shadow-md: medium shadow for subtitle
        >
          {STYLES.subtitleText}
        </motion.p>

        {/* Call to Action */}
        {STYLES.showCTA && (
          <motion.div
            variants={heroVariants.cta}
            className="pt-8" // pt-8: 32px top padding to separate from subtitle
          >
            <motion.button
              className="
                px-8 py-3 bg-transparent border-2 border-white text-white
                text-base lg:text-lg tracking-wider
                hover:bg-white hover:text-[#4f679a] transition-all duration-300
                rounded-lg backdrop-blur-sm
              " // px-8 py-3: 32px horizontal, 12px vertical padding
                 // border-2: 2px border width
                 // transition-all duration-300: smooth 300ms transitions
                 // rounded-lg: 8px border radius
                 // backdrop-blur-sm: subtle background blur effect
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              {STYLES.ctaText}
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default HeroSection;