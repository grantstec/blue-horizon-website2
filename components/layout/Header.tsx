"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Navigation from './Navigation';
import HeroSection from './HeroSection';

const Header: React.FC = () => {
  const logoVariants = {
    hidden: {
      x: -400,
      opacity: 0
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 2,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const scrollIndicatorVariants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 3,
        duration: 1
      }
    }
  };

  return (
    <header className="relative w-full min-h-screen overflow-hidden bg-[#0033a0]">
      {/* Background Layers */}
      <div className="absolute inset-0 bg-[#0033a0]" />
      <div className="absolute inset-0 bg-[url(/fire.png)] bg-cover bg-center opacity-70" />
      
      {/* Content Container */}
      <div className="relative z-10 flex flex-col h-screen">
        {/* Top Navigation Area */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start lg:justify-between p-4 sm:p-6 lg:p-8 xl:p-12 space-y-6 lg:space-y-0">
          {/* Logo */}
          <motion.div
            variants={logoVariants}
            initial="hidden"
            animate="visible"
            className="flex-shrink-0 order-1 lg:order-1"
          >
            <div className="w-12.8 h-12.8 sm:w-16 sm:h-16 lg:w-19.2 lg:h-19.2 xl:w-22.4 xl:h-25.6">
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
          <div className="flex-1 flex justify-center lg:justify-start lg:ml-8 xl:ml-12 order-2 lg:order-2">
            <Navigation />
          </div>
        </div>

        {/* Hero Content */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <HeroSection />
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          variants={scrollIndicatorVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-6 h-6 text-white cursor-pointer"
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </header>
  );
};

export default Header;