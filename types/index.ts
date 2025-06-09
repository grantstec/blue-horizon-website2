// Navigation types
export interface DropdownItem {
  name: string;
  href?: string;
  description?: string;
}

export interface NavigationItem {
  name: string;
  href?: string;
  active?: boolean;
  hasDropdown?: boolean;
  dropdownItems?: DropdownItem[];
}

// Component props
export interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
}

// Animation types
export interface AnimationConfig {
  duration: number;
  delay?: number;
  easing?: number[] | string;
}