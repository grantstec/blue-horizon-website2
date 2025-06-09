"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, className = '' }) => {
  return (
    <motion.div
      className={`min-h-screen bg-[#0033a0] scroll-smooth ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        scrollSnapType: 'y mandatory', // Enable vertical scroll snapping
        scrollBehavior: 'smooth',
        overflowY: 'auto',
        height: '100vh'
      }}
    >
      {children}
    </motion.div>
  );
};

export default Layout;