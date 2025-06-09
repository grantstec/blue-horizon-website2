import { Variants } from 'framer-motion';
import { CONSTANTS } from '../config/design';

// Navigation animations - all items arrive at the same time but start at different times
export const createNavigationVariants = () => {
  const baseDuration = 2;
  const durationDecrement = 0.2;
  
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
      const duration = baseDuration - (index * durationDecrement);
      const delay = CONSTANTS.NAV_ARRIVAL_TIME - duration;
      
      return {
        hidden: {
          x: -800,
          opacity: 0
        },
        visible: {
          x: 0,
          opacity: 1,
          transition: {
            duration,
            delay: Math.max(0, delay),
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

// Dropdown animations - no stagger, all items at once
export const dropdown = {
  container: {
    hidden: {
      opacity: 0,
      height: 0
    },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeOut"
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
  },
  
  item: {
    hidden: {
      y: -20,
      opacity: 0
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: CONSTANTS.SMOOTH_EASE
      }
    }
  }
};

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