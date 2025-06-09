import { Variants } from 'framer-motion';
import { CONSTANTS } from '../config/design';

// Navigation animations - all items arrive at the same time but start at different times
export const createNavigationVariants = () => {
  return {
    container: {
      hidden: {},
      visible: {
        transition: {
          delayChildren: 0,
          staggerChildren: 0
        }
      }
    },
    
    item: (index: number) => {
      // Items further away (higher index) start earlier to arrive at same time
      const baseDelay = 0.5;
      const staggerAmount = 0.3;
      const delay = baseDelay + (index * staggerAmount);
      
      // Items further away move faster
      const baseDuration = 1.5;
      const durationIncrement = 0.2;
      const duration = baseDuration + (index * durationIncrement);
      
      return {
        hidden: {
          x: -800 - (index * 200), // Further items start further offscreen
          opacity: 0
        },
        visible: {
          x: 0,
          opacity: 1,
          transition: {
            duration,
            delay,
            ease: CONSTANTS.SMOOTH_EASE
          }
        }
      };
    }
  };
};

// Simple slide in from left
export const slideInLeft = (delay: number = 0, duration: number = 2): Variants => ({
  hidden: {
    x: -400,
    opacity: 0
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration,
      delay,
      ease: CONSTANTS.SMOOTH_EASE
    }
  }
});

// Hero text animations
export const heroText = (delay: number = 0, duration: number = 2): Variants => ({
  hidden: {
    x: -1000,
    opacity: 0
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration,
      delay,
      ease: CONSTANTS.SMOOTH_EASE
    }
  }
});



// Fade in animation
export const fadeIn = (delay: number = 0, duration: number = 1): Variants => ({
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay,
      duration
    }
  }
});

// Hover effects
export const hoverScale = {
  scale: 1.05,
  transition: { duration: 0.2 }
};

export const tapScale = {
  scale: 0.95
};