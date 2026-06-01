import type { Variants } from 'framer-motion';

// A brutalist stagger container that snaps its children in quickly
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

// A hard, aggressive pop up animation
export const brutalistPop: Variants = {
  hidden: { 
    y: 60, 
    opacity: 0,
    scale: 0.95
  },
  show: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
      mass: 1,
    },
  },
};

// Slide from the left violently
export const brutalistSlideLeft: Variants = {
  hidden: { 
    x: -80, 
    opacity: 0,
  },
  show: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
};

// Slide from the right violently
export const brutalistSlideRight: Variants = {
  hidden: { 
    x: 80, 
    opacity: 0,
  },
  show: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
};

// Rotate into view
export const brutalistSpinIn: Variants = {
  hidden: { 
    opacity: 0,
    rotate: -45,
    scale: 0.5
  },
  show: {
    opacity: 1,
    rotate: [0, -10, 12, 0], // Optional: if we want it to shake, or we can just let it land at 0
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15,
    },
  },
};

// Fast snap for simple items
export const fastSnap: Variants = {
  hidden: { 
    y: 20, 
    opacity: 0,
  },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 30,
    },
  },
};
