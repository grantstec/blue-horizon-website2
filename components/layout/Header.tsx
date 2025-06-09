"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Navigation from './Navigation';
import HeroSection from './HeroSection';

// === EDITABLE STYLE CONSTANTS ===
const STYLES = {
  logoSize: "w-10 h-10 sm:w-12 sm:h-12 lg:w-18 lg:h-18 xl:w-24 xl:h-24", // Responsive logo sizing: 64px -> 80px -> 96px -> 112px-128px
  videoOpacity: "opacity-60", // Renamed from backgroundOpacity
  showScrollIndicator: true,
  videoSrc: "/video/video.mp4" // Add your video file name here
};

// Logo animation variants - matches Navigation.tsx spring animation style
const logoVariants = {
  hidden: { 
    x: -400, // Start 400px to the left (off-screen)
    opacity: 0 
  },
  visible: {
    x: 0, // End at natural position
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 20,  // Lower stiffness for slower, softer spring motion
      damping: 12,    // Prevents excessive oscillation
      mass: 1      // Slightly heavier feel for substantial movement
    }
  }
};

// Scroll indicator animation variants - spring-based like Navigation.tsx
const scrollIndicatorVariants = {
  hidden: { 
    opacity: 0, 
    y: 20 // Start 20px below final position
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      mass: 1,
      delay: 3 // Wait 3 seconds before animating in
    }
  }
};

const Header: React.FC = () => {
  return (
    <header className="relative w-full min-h-screen overflow-hidden bg-[#0033a0]">
      {/* Background Layers */}
      <div className="absolute inset-0 bg-[#00124c]" />
      
      {/* Video Background */}
      <div className={`absolute inset-0 ${STYLES.videoOpacity}`}>
        <video
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={STYLES.videoSrc} type="video/mp4" />
          {/* Fallback for browsers that don't support video */}
        </video>
      </div>
      {/* Content Container */}
      <div className="relative z-10 flex flex-col h-screen">
        {/* Top Navigation Area */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start lg:justify-between p-6 sm:p-6 lg:p-8 xl:p-12 space-y-8 lg:space-y-0">
          {/* Logo */}
          <motion.div
            variants={logoVariants}
            initial="hidden"
            animate="visible"
            className="flex-shrink-0 order-1 lg:order-1"
          >
            <div className={STYLES.logoSize}>
              <Image
                alt="Blue Horizon Logo"
                src="/g3.png"
                width={90}
                height={96}
                priority
                className="w-full h-full object-contain"
              />
            </div>
          </motion.div>

          {/* Navigation */}
          <div className="flex-1 flex justify-center lg:justify-start lg:ml-8 xl:ml-12 order-2 lg:order-2 pt-2 px-1">
            <Navigation />
          </div>
        </div>

        {/* Hero Content */}
        <div className="items-center justify-center px-4 sm:px-4 lg:px-6 pt-20 sm:pt-20 lg:pt-22 xl:pt-26 text-left">
          <HeroSection />
        </div>

        {/* Scroll Indicator */}
        {STYLES.showScrollIndicator && (
          <motion.div 
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2" // Absolutely positioned at bottom center
            variants={scrollIndicatorVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }} // Continuous bouncing animation: up -> down -> up
              transition={{ repeat: Infinity, duration: 2 }} // Infinite loop, 2 seconds per cycle
              className="w-5 h-5 text-white cursor-pointer" // 24x24px white SVG icon
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.div>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;