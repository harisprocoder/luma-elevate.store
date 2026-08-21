import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { fadeUp, fadeIn, fadeLeft, fadeRight, staggerContainer, staggerChild, prefersReducedMotion, type staggerChild as staggerChildType } from "@/lib/motion";

type AnimationType = "fadeUp" | "fadeIn" | "fadeLeft" | "fadeRight" | "stagger";

interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: AnimationType;
  className?: string;
  delay?: number;
  /** Override: always animate (for above-the-fold content) */
  alwaysVisible?: boolean;
  /** Trigger threshold (0-1) */
  threshold?: number;
  /** Once = true means animate only once */
  once?: boolean;
}

const variants = {
  fadeUp,
  fadeIn,
  fadeLeft,
  fadeRight,
  stagger: staggerContainer(0.05),
};

const childVariant = staggerChild;

export function ScrollReveal({
  children,
  animation = "fadeUp",
  className,
  delay = 0,
  alwaysVisible = false,
  threshold = 0.15,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: threshold });
  const reduced = prefersReducedMotion();

  const shouldAnimate = alwaysVisible || (reduced ? true : isInView);

  if (animation === "stagger") {
    return (
      <motion.div
        ref={ref}
        initial={reduced ? false : "hidden"}
        animate={shouldAnimate ? "visible" : "hidden"}
        variants={variants.stagger}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial={reduced ? false : "hidden"}
      animate={shouldAnimate ? "visible" : "hidden"}
      variants={variants[animation]}
      className={className}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </motion.div>
  );
}

/** Child element for use inside a stagger ScrollReveal */
export function ScrollRevealChild({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={childVariant} className={className}>
      {children}
    </motion.div>
  );
}
