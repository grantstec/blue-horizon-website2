"use client";

import React from 'react';
import { motion } from 'framer-motion';

const HeroSection: React.FC = () => {
  const titleVariants = {
    hidden: {
      x: -1000,
      opacity: 0
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 2,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0.8
      }
    }
  };

  const subtitleVariants = {
    hidden: {
      x: -1000,
      opacity: 0
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 2,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 1.1
      }
    }
  };

  const ctaVariants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 2.3,
        duration: 1
      }
    }
  };

  return (
    <div className="text-center lg:text-left max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        className="space-y-4 lg:space-y-6"
        initial="hidden"
        animate="visible"
      >
        {/* Main Title */}
        <motion.h1
          variants={titleVariants}
          className="
            font-mono font-bold text-[#0033a0]
            text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl
            tracking-wider sm:tracking-[2px] md:tracking-[3px] lg:tracking-[4px] xl:tracking-[4.80px]
            leading-tight
            drop-shadow-lg
          "
        >
          BLUE HORIZON
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={subtitleVariants}
          className="
            font-mono font-normal text-white
            text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl
            tracking-wide sm:tracking-[1px] md:tracking-[1.5px] lg:tracking-[1.80px]
            leading-normal
            drop-shadow-md
          "
        >
          USAFA Collegiate Rocketry Club
        </motion.p>

        {/* Optional Call to Action */}
        <motion.div
          variants={ctaVariants}
          className="pt-8"
        >
          <motion.button
            className="
              px-8 py-3 bg-transparent border-2 border-white text-white
              font-mono text-base lg:text-lg tracking-wider
              hover:bg-white hover:text-[#4f679a] transition-all duration-300
              rounded-lg backdrop-blur-sm
            "
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            EXPLORE
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroSection;