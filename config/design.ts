// Design configuration for easy adjustments
export const designConfig = {
  // Color Palette
  colors: {
    primary: '#0033a0',      // Main blue background
    secondary: '#0033a0',    // Accent blue for text/hover
    white: '#ffffff',
    black: '#000000',
    overlay: 'rgba(0, 0, 0, 0.2)', // For backdrop blur effects
  },

  // Animation Timing
  animations: {
    // Main page load animations
    logo: {
      duration: 2,
      delay: 0,
      easing: [0.25, 0.46, 0.45, 0.94]
    },
    navigation: {
      containerDelay: 0.5,
      staggerDelay: 0.1,
      baseDuration: 2,
      durationDecrement: 0.2, // How much faster each subsequent item should be
      easing: [0.25, 0.46, 0.45, 0.94]
    },
    hero: {
      titleDelay: 1,
      subtitleDelay: 1.3,
      ctaDelay: 2.5,
      duration: 2,
      easing: [0.25, 0.46, 0.45, 0.94]
    },
    dropdown: {
      duration: 0.3,
      staggerDelay: 0.05,
      easing: "easeOut"
    },
    scrollIndicator: {
      delay: 3,
      duration: 1,
      bounceRepeat: Infinity,
      bounceDuration: 2
    }
  },

  // Typography
  typography: {
    fontFamily: 'PCap_Terminal',
    sizes: {
      logo: {
        mobile: 'w-16 h-16',
        tablet: 'w-20 h-20', 
        desktop: 'w-24 h-24',
        large: 'w-28 h-32'
      },
      heroTitle: {
        mobile: 'text-4xl',
        tablet: 'text-5xl md:text-6xl',
        desktop: 'lg:text-7xl xl:text-8xl'
      },
      heroSubtitle: {
        mobile: 'text-lg',
        tablet: 'text-xl md:text-2xl',
        desktop: 'lg:text-3xl xl:text-4xl'
      },
      navigation: {
        mobile: 'text-lg',
        tablet: 'text-xl',
        desktop: 'lg:text-2xl'
      }
    },
    tracking: {
      wide: 'tracking-wider',
      wider: 'tracking-[2px] md:tracking-[3px] lg:tracking-[4px] xl:tracking-[4.80px]',
      subtitle: 'tracking-wide sm:tracking-[1px] md:tracking-[1.5px] lg:tracking-[1.80px]'
    }
  },

  // Layout & Spacing
  layout: {
    padding: {
      mobile: 'p-4',
      tablet: 'sm:p-6',
      desktop: 'lg:p-8 xl:p-12'
    },
    navigation: {
      spacing: 'lg:space-x-6 xl:space-x-12',
      mobileSpacing: 'space-y-4 lg:space-y-0'
    },
    heroSpacing: 'space-y-4 lg:space-y-6'
  },

  // Effects
  effects: {
    textShadow: 'drop-shadow-lg',
    backdropBlur: 'backdrop-blur-sm',
    fireOpacity: 'opacity-70',
    hoverScale: 1.05,
    tapScale: 0.95
  },

  // Starting positions for animations (easily adjustable)
  startPositions: {
    logo: { x: -400 },
    navigation: { x: -800 },
    hero: { x: -1000 },
    dropdown: { y: -50 }
  },

  // Responsive breakpoints for fine-tuning
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  }
};

// Helper function to get animation timing for navigation items
export const getNavigationItemTiming = (index: number) => ({
  duration: designConfig.animations.navigation.baseDuration - 
           (index * designConfig.animations.navigation.durationDecrement),
  delay: index * designConfig.animations.navigation.staggerDelay,
  ease: designConfig.animations.navigation.easing
});

// Helper function to create consistent easing
export const createEasing = (type: 'smooth' | 'bounce' | 'spring') => {
  switch (type) {
    case 'smooth':
      return [0.25, 0.46, 0.45, 0.94];
    case 'bounce':
      return [0.68, -0.55, 0.265, 1.55];
    case 'spring':
      return [0.175, 0.885, 0.32, 1.275];
    default:
      return [0.25, 0.46, 0.45, 0.94];
  }
};