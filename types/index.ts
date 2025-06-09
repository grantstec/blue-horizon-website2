// Common types used throughout the application

export interface NavigationItem {
  name: string;
  href?: string;
  active?: boolean;
  hasDropdown?: boolean;
  dropdownItems?: DropdownItem[];
}

export interface DropdownItem {
  name: string;
  href?: string;
  description?: string;
}

export interface AnimationConfig {
  duration: number;
  delay?: number;
  easing?: number[] | string;
}

export interface DesignTokens {
  colors: {
    primary: string;
    secondary: string;
    white: string;
    black: string;
    overlay: string;
  };
  animations: {
    logo: AnimationConfig;
    navigation: {
      containerDelay: number;
      staggerDelay: number;
      baseDuration: number;
      durationDecrement: number;
      easing: number[];
    };
    hero: {
      titleDelay: number;
      subtitleDelay: number;
      ctaDelay: number;
      duration: number;
      easing: number[];
    };
    dropdown: {
      duration: number;
      staggerDelay: number;
      easing: string;
    };
    scrollIndicator: {
      delay: number;
      duration: number;
      bounceRepeat: number;
      bounceDuration: number;
    };
  };
  typography: {
    fontFamily: string;
    sizes: {
      [key: string]: {
        mobile: string;
        tablet?: string;
        desktop?: string;
        large?: string;
      };
    };
    tracking: {
      [key: string]: string;
    };
  };
  layout: {
    padding: {
      mobile: string;
      tablet: string;
      desktop: string;
    };
    navigation: {
      spacing: string;
      mobileSpacing: string;
    };
    heroSpacing: string;
  };
  effects: {
    textShadow: string;
    backdropBlur: string;
    fireOpacity: string;
    hoverScale: number;
    tapScale: number;
  };
  startPositions: {
    [key: string]: {
      x?: number;
      y?: number;
    };
  };
  breakpoints: {
    [key: string]: string;
  };
}

export interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
}