"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import Layout from '../../components/layout/Layout';
import Header from '../../components/layout/Header';

// Scroll snap section component
const SnapSection: React.FC<{
  children: React.ReactNode;
  id?: string;
  className?: string;
  bgOverlay?: string;
}> = ({ children, id, className = '', bgOverlay = '' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-200px" });

  return (
    <section
      ref={ref}
      id={id}
      className={`
        min-h-screen flex items-center justify-center relative
        scroll-snap-start scroll-snap-always
        ${className}
      `}
    >
      {/* Background overlay */}
      {bgOverlay && (
        <div className={`absolute inset-0 ${bgOverlay}`} />
      )}
      
      {/* Content */}
      <motion.div
        className="relative z-10 w-full max-w-6xl mx-auto px-4"
        initial={{ opacity: 0, y: 60 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </section>
  );
};

// Parallax background with scroll snap
const ParallaxBackground: React.FC = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, -150]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -300]);
  
  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Base background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0033a0] via-[#001a5c] to-[#000814]" />
      
      {/* Parallax layers */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{ y: y1 }}
      >
        <div className="w-full h-[120%] bg-gradient-to-b from-transparent via-blue-900/20 to-transparent" />
      </motion.div>
      
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{ y: y2 }}
      >
        <div className="w-full h-[140%] bg-gradient-to-b from-transparent via-indigo-800/30 to-transparent" />
      </motion.div>
    </div>
  );
};

// Floating navigation with snap controls
const FloatingNav: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsVisible(scrollPosition > 100);
      
      // Update active section based on scroll position
      const sections = ['home', 'mission', 'achievements', 'team'];
      const sectionElements = sections.map(id => document.getElementById(id));
      
      for (let i = 0; i < sectionElements.length; i++) {
        const element = sectionElements[i];
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };
  
  return (
    <motion.nav
      className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50"
      initial={{ y: -100, opacity: 0 }}
      animate={{ 
        y: isVisible ? 0 : -100, 
        opacity: isVisible ? 1 : 0 
      }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="bg-black/60 backdrop-blur-lg rounded-full px-8 py-4 border border-white/20 shadow-xl">
        <div className="flex space-x-8 text-white text-sm font-medium">
          {[
            { id: 'home', label: 'HOME' },
            { id: 'mission', label: 'MISSION' },
            { id: 'achievements', label: 'ACHIEVEMENTS' },
            { id: 'team', label: 'TEAM' }
          ].map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className={`
                px-3 py-2 rounded-full transition-all duration-300
                ${activeSection === id 
                  ? 'text-[#0033a0] bg-white scale-105' 
                  : 'hover:text-blue-300 hover:bg-white/10'
                }
              `}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </motion.nav>
  );
};

// Statistics with staggered animations
const StatCard: React.FC<{ 
  label: string; 
  value: number; 
  suffix?: string; 
  delay?: number;
}> = ({ label, value, suffix = "", delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    
    const duration = 2500;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    
    const timer = setTimeout(() => {
      const counter = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(counter);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
    }, delay);

    return () => clearTimeout(timer);
  }, [isInView, value, delay]);

  return (
    <motion.div
      ref={ref}
      className="text-center group"
      initial={{ opacity: 0, scale: 0.3, y: 50 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ 
        duration: 0.8, 
        delay: delay / 1000,
        type: "spring",
        stiffness: 100
      }}
      viewport={{ once: true, margin: "-100px" }}
      whileHover={{ scale: 1.05 }}
    >
      <motion.div 
        className="text-4xl md:text-6xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors duration-300"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, delay: (delay + 300) / 1000 }}
      >
        {count.toLocaleString()}{suffix}
      </motion.div>
      <div className="text-blue-300 text-sm md:text-base tracking-wide font-medium">
        {label}
      </div>
    </motion.div>
  );
};

// Scroll progress indicator
const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 origin-left z-50"
      style={{ scaleX: scrollYProgress }}
    />
  );
};

// Animated rocket that follows scroll
const ScrollRocket: React.FC = () => {
  const { scrollY } = useScroll();
  const [windowHeight, setWindowHeight] = useState(800);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowHeight(window.innerHeight);
      const handleResize = () => setWindowHeight(window.innerHeight);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);
  
  const rocketY = useTransform(scrollY, [0, 3000], [windowHeight - 100, -100]);
  const rocketRotate = useTransform(scrollY, [0, 3000], [0, 360]);
  const trailOpacity = useTransform(scrollY, [100, 500], [0, 1]);
  
  return (
    <motion.div
      className="fixed right-8 z-40 pointer-events-none"
      style={{ y: rocketY }}
    >
      <motion.div style={{ rotate: rocketRotate }}>
        <div className="text-4xl">🚀</div>
      </motion.div>
      
      {/* Rocket trail */}
      <motion.div
        className="absolute top-12 left-1/2 transform -translate-x-1/2"
        style={{ opacity: trailOpacity }}
      >
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="w-1 h-6 bg-gradient-to-t from-orange-400 to-red-500 mb-1 rounded-full"
            animate={{ 
              scaleY: [1, 0.6, 1],
              opacity: [0.8, 0.4, 0.8]
            }}
            transition={{ 
              duration: 0.4, 
              delay: i * 0.1, 
              repeat: Infinity 
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default function HomePage() {
  return (
    <div className="scroll-container">
      <ParallaxBackground />
      <ScrollProgress />
      <FloatingNav />
      <ScrollRocket />
      
      {/* Hero Section */}
      <section id="home" className="min-h-screen scroll-snap-start relative z-10">
        <Header />
      </section>

      {/* Mission Section */}
      <SnapSection 
        id="mission"
        bgOverlay="bg-gradient-to-b from-black/20 to-black/40"
      >
        <div className="text-center">
          <motion.h2 
            className="text-5xl md:text-7xl xl:text-8xl font-bold text-white mb-8 tracking-wider"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true, margin: "-200px" }}
          >
            OUR MISSION
          </motion.h2>
          <motion.p 
            className="text-xl md:text-2xl xl:text-3xl text-blue-200 max-w-5xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            viewport={{ once: true, margin: "-200px" }}
          >
            Pushing the boundaries of aerospace engineering through innovative rocketry, 
            fostering the next generation of space pioneers at the United States Air Force Academy.
          </motion.p>
        </div>
      </SnapSection>

      {/* Achievements Section */}
      <SnapSection 
        id="achievements"
        bgOverlay="bg-gradient-to-b from-black/40 to-black/60"
      >
        <div className="text-center">
          <motion.h2 
            className="text-5xl md:text-7xl xl:text-8xl font-bold text-white mb-16 tracking-wider"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true, margin: "-200px" }}
          >
            ACHIEVEMENTS
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <StatCard label="ROCKETS LAUNCHED" value={12} delay={0} />
            <StatCard label="ALTITUDE REACHED" value={30000} suffix=" FT" delay={200} />
            <StatCard label="TEAM MEMBERS" value={45} delay={400} />
            <StatCard label="COMPETITIONS WON" value={8} delay={600} />
          </div>
        </div>
      </SnapSection>

      {/* Team Section */}
      <SnapSection 
        id="team"
        bgOverlay="bg-gradient-to-b from-black/60 to-black/80"
      >
        <div className="text-center">
          <motion.h2 
            className="text-5xl md:text-7xl xl:text-8xl font-bold text-white mb-8 tracking-wider"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true, margin: "-200px" }}
          >
            JOIN THE TEAM
          </motion.h2>
          <motion.p 
            className="text-xl md:text-2xl xl:text-3xl text-blue-200 max-w-5xl mx-auto leading-relaxed mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            viewport={{ once: true, margin: "-200px" }}
          >
            Be part of something extraordinary. Join Blue Horizon and help us reach new heights.
          </motion.p>
          <motion.button
            className="px-16 py-5 bg-transparent border-3 border-white text-white text-xl tracking-wider hover:bg-white hover:text-[#0033a0] transition-all duration-400 rounded-xl shadow-2xl"
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(255, 255, 255, 0.2)"
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            viewport={{ once: true, margin: "-200px" }}
          >
            APPLY NOW
          </motion.button>
        </div>
      </SnapSection>
    </div>
  );
}