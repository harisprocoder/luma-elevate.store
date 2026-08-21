// ─── Motion Tokens ─────────────────────────────────────────────────────────
// Centralized animation configuration for consistent, premium motion

export const duration = {
  fast: 0.15,
  base: 0.25,
  medium: 0.4,
  slow: 0.6,
  hero: 0.8,
} as const;

export const ease = {
  /** Primary for layout/reveals — smooth deceleration with slight overshoot */
  outExpo: [0.16, 1, 0.3, 1] as [number, number, number, number],
  /** UI micro-interactions — gentle deceleration */
  outQuart: [0.25, 1, 0.5, 1] as [number, number, number, number],
  /** Page transitions — balanced ease-in-out */
  inOutCubic: [0.65, 0, 0.35, 1] as [number, number, number, number],
  /** Snappy UI response */
  outCubic: [0.33, 1, 0.68, 1] as [number, number, number, number],
} as const;

export const distance = {
  subtle: 8,
  small: 12,
  medium: 16,
  large: 20,
  hero: 24,
} as const;

// ─── Reusable Animation Variants ───────────────────────────────────────────

/** Fade up — primary entrance animation */
export const fadeUp = {
  hidden: {
    opacity: 0,
    y: distance.medium,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: duration.slow,
      ease: ease.outExpo,
    },
  },
};

/** Fade in — simple opacity transition */
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: duration.medium, ease: ease.outQuart },
  },
};

/** Fade in from left */
export const fadeLeft = {
  hidden: { opacity: 0, x: -distance.medium },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: duration.slow, ease: ease.outExpo },
  },
};

/** Fade in from right */
export const fadeRight = {
  hidden: { opacity: 0, x: distance.medium },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: duration.slow, ease: ease.outExpo },
  },
};

/** Scale in — for modals, overlays */
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: duration.medium,
      ease: ease.outQuart,
    },
  },
};

/** Stagger container — wrap children to stagger their entrance */
export const staggerContainer = (staggerDelay = 0.05) => ({
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: 0.1,
    },
  },
});

/** Stagger child — pair with staggerContainer */
export const staggerChild = {
  hidden: { opacity: 0, y: distance.small },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: duration.slow,
      ease: ease.outExpo,
    },
  },
};

/** Cart item stagger — for drawer item list */
export const cartItemStagger = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.15,
    },
  },
};

export const cartItemChild = {
  hidden: { opacity: 0, x: distance.small },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: duration.medium,
      ease: ease.outQuart,
    },
  },
};

/** Page transition — for route changes */
export const pageTransition = {
  initial: {
    opacity: 0,
    y: distance.subtle,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: duration.medium,
      ease: ease.inOutCubic,
    },
  },
  exit: {
    opacity: 0,
    y: -distance.subtle,
    transition: {
      duration: duration.fast,
      ease: ease.inOutCubic,
    },
  },
};

/** Hero entrance — staggered elements on page load */
export const heroEntrance = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

export const heroChild = {
  hidden: { opacity: 0, y: distance.large },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: duration.hero,
      ease: ease.outExpo,
    },
  },
};

/** Accordion expand/collapse */
export const accordionContent = {
  closed: {
    height: 0,
    opacity: 0,
    transition: {
      height: { duration: duration.base, ease: ease.inOutCubic },
      opacity: { duration: duration.fast },
    },
  },
  open: {
    height: "auto",
    opacity: 1,
    transition: {
      height: { duration: duration.medium, ease: ease.outQuart },
      opacity: { duration: duration.base, delay: 0.05 },
    },
  },
};

/** Drawer slide-in */
export const drawerSlide = {
  hidden: { x: "100%" },
  visible: {
    x: 0,
    transition: {
      duration: duration.medium,
      ease: ease.outExpo,
    },
  },
  exit: {
    x: "100%",
    transition: {
      duration: duration.base,
      ease: ease.inOutCubic,
    },
  },
};

/** Backdrop fade */
export const backdropFade = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: duration.base },
  },
  exit: {
    opacity: 0,
    transition: { duration: duration.fast },
  },
};

/** Hover lift — for cards */
export const hoverLift = {
  rest: { y: 0, transition: { duration: duration.base, ease: ease.outQuart } },
  hover: { y: -6, transition: { duration: duration.base, ease: ease.outQuart } },
};

/** Button press */
export const buttonPress = {
  rest: { scale: 1 },
  hover: { scale: 1.01 },
  tap: { scale: 0.98 },
};

// ─── Check Reduced Motion ──────────────────────────────────────────────────

/** Returns true if user prefers reduced motion */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Returns animation props based on reduced motion preference */
export function motionProps(
  variants: Record<string, unknown>,
  reducedMotionOverride?: boolean
) {
  const reduced = reducedMotionOverride ?? prefersReducedMotion();
  if (reduced) {
    return {
      initial: false,
      animate: "visible",
      variants: {
        hidden: { opacity: 1, y: 0, x: 0, scale: 1 },
        visible: { opacity: 1, y: 0, x: 0, scale: 1 },
      },
    };
  }
  return {
    initial: "hidden",
    animate: "visible",
    variants,
  };
}
