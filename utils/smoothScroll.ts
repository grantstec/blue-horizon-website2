// utils/smoothScroll.ts - Simple, SSR-safe scroll utilities
import { useCallback } from 'react';

interface SmoothScrollOptions {
  duration?: number;
  easing?: 'easeInOut' | 'easeIn' | 'easeOut' | 'linear';
  offset?: number;
}

export const useSmoothScroll = () => {
  const scrollToElement = useCallback((
    elementId: string, 
    options: SmoothScrollOptions = {}
  ) => {
    // Check if running on client side
    if (typeof window === 'undefined') return;
    
    const { duration = 1000, easing = 'easeInOut', offset = 0 } = options;
    
    const element = document.getElementById(elementId);
    if (!element) return;

    const targetPosition = element.offsetTop - offset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime: number | null = null;

    const easingFunctions = {
      linear: (t: number) => t,
      easeIn: (t: number) => t * t,
      easeOut: (t: number) => t * (2 - t),
      easeInOut: (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
    };

    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const ease = easingFunctions[easing](progress);
      
      window.scrollTo(0, startPosition + distance * ease);
      
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  }, []);

  const scrollToTop = useCallback((duration = 800) => {
    // Check if running on client side
    if (typeof window === 'undefined') return;
    
    const startPosition = window.pageYOffset;
    let startTime: number | null = null;

    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const ease = progress * (2 - progress); // easeOut
      
      window.scrollTo(0, startPosition * (1 - ease));
      
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  }, []);

  return { scrollToElement, scrollToTop };
};

// Simple scroll to function that can be used outside of React
export const scrollToElement = (elementId: string, duration = 1000, offset = 0) => {
  if (typeof window === 'undefined') return;
  
  const element = document.getElementById(elementId);
  if (!element) return;

  const targetPosition = element.offsetTop - offset;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime: number | null = null;

  const animation = (currentTime: number) => {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    const ease = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;
    
    window.scrollTo(0, startPosition + distance * ease);
    
    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  };

  requestAnimationFrame(animation);
};