"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { heroText, fadeIn, hoverScale, tapScale } from '../../utils/animations';

// === EDITABLE STYLE CONSTANTS ===
const STYLES = {
  titleText: "BLUE HORIZON",
  subtitleText: "USAFA Collegiate Rocketry Club",
  titleSize: "text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl",
  subtitleSize: "text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl",
  titleColor: "text-[#0033a0]",
  subtitleColor: "text-white",
  titleTracking: "tracking-wider sm:tracking-[2px] md:tracking-[3px] lg:tracking-[4px] xl:tracking-[4.80px]",
  subtitleTracking: "tracking-wide sm:tracking-[1px] md:tracking-[1.5px] lg:tracking-[1.80px]",
  showCTA: true,
  ctaText: "EXPLORE"
};

const HeroSection: React.FC = () => {
  return (
    <div className="text-center lg:text-left max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        className="space-y-4 lg:space-y-6"
        initial="hidden"
        animate="visible"
      >
        {/* Main Title */}
        <motion.h1
          variants={heroText(0.8, 2)}
          className={`
            font-bold ${STYLES.titleColor} ${STYLES.titleSize} ${STYLES.titleTracking}
            leading-tight drop-shadow-lg
          `}
        >
          {STYLES.titleText}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={heroText(1.1, 2)}
          className={`
            font-normal ${STYLES.subtitleColor} ${STYLES.subtitleSize} ${STYLES.subtitleTracking}
            leading-normal drop-shadow-md
          `}
        >
          {STYLES.subtitleText}
        </motion.p>

        {/* Call to Action */}
        {STYLES.showCTA && (
          <motion.div
            variants={fadeIn(2.3, 1)}
            className="pt-8"
          >
            <motion.button
              className="
                px-8 py-3 bg-transparent border-2 border-white text-white
                text-base lg:text-lg tracking-wider
                hover:bg-white hover:text-[#4f679a] transition-all duration-300
                rounded-lg backdrop-blur-sm
              "
              whileHover={hoverScale}
              whileTap={tapScale}
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