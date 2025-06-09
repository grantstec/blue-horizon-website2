import { Variants } from 'framer-motion';
import { designConfig, getNavigationItemTiming } from '../config/design';

// Slide in from left animation
export const slideInLeft = (delay = 0, duration = 2): Variants => ({
  hidden: {
    x: designConfig.startPositions.logo.x,
    opacity: 0
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration,
      delay,
      ease: designConfig.animations.logo.easing
    }
  }
});

// Staggered navigation animation
export const createNavigationItemVariants = (index: number): Variants => {
  const timing = getNavigationItemTiming(index);
  
  return {
    hidden: {
      x: designConfig.startPositions.navigation.x,
      y: 0,
      opacity: 0
    },
    visible: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: timing
    }
  };
};

// Container animation for staggered children
export const staggerContainer = (
  staggerDelay = 0.1,
  delayChildren = 0.5
): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: staggerDelay,
      delayChildren
    }
  }
});

// Dropdown animations
export const dropdownContainer: Variants = {
  hidden: {
    opacity: 0,
    height: 0,
    scaleY: 0
  },
  visible: {
    opacity: 1,
    height: "auto",
    scaleY: 1,
    transition: {
      duration: designConfig.animations.dropdown.duration,
      ease: designConfig.animations.dropdown.easing,
      staggerChildren: designConfig.animations.dropdown.staggerDelay,
      delayChildren: 0.1
    }
  },
  exit: {
    opacity: 0,
    height: 0,
    scaleY: 0,
    transition: {
      duration: 0.2,
      ease: "easeIn"
    }
  }
};

export const dropdownItem: Variants = {
  hidden: {
    y: designConfig.startPositions.dropdown.y,
    opacity: 0
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: designConfig.animations.dropdown.easing
    }
  }
};

// Hero section animations
export const heroTitle: Variants = {
  hidden: {
    x: designConfig.startPositions.hero.x,
    opacity: 0
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: designConfig.animations.hero.duration,
      ease: designConfig.animations.hero.easing,
      delay: designConfig.animations.hero.titleDelay
    }
  }
};

export const heroSubtitle: Variants = {
  hidden: {
    x: designConfig.startPositions.hero.x,
    opacity: 0
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: designConfig.animations.hero.duration,
      ease: designConfig.animations.hero.easing,
      delay: designConfig.animations.hero.subtitleDelay
    }
  }
};

// Scroll indicator animation
export const scrollIndicator: Variants = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: designConfig.animations.scrollIndicator.delay,
      duration: designConfig.animations.scrollIndicator.duration
    }
  }
};

// Bounce animation for scroll indicator
export const bounceAnimation = {
  y: [0, 10, 0],
  transition: {
    repeat: designConfig.animations.scrollIndicator.bounceRepeat,
    duration: designConfig.animations.scrollIndicator.bounceDuration
  }
};

// Hover animations
export const hoverScale = {
  scale: designConfig.effects.hoverScale,
  transition: { duration: 0.2 }
};

export const tapScale = {
  scale: designConfig.effects.tapScale
};

// Fade in animation
export const fadeIn = (delay = 0, duration = 1): Variants => ({
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      duration,
      delay
    }
  }
});