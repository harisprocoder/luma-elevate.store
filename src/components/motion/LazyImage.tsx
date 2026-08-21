import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { prefersReducedMotion } from "@/lib/motion";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  /** Aspect ratio for the container (e.g. "3/4", "1/1") */
  aspectRatio?: string;
  /** Whether to enable zoom on hover */
  enableZoom?: boolean;
}

/** Skeleton shimmer gradient for loading state */
function SkeletonLoader({ className }: { className?: string }) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className ?? ""}`}>
      <div
        className="absolute inset-0 bg-muted/30"
        style={{
          background: `linear-gradient(90deg, transparent 0%, oklch(0.5 0.01 60 / 0.06) 50%, transparent 100%)`,
          backgroundSize: "200% 100%",
          animation: "shimmer 1.5s ease-in-out infinite",
        }}
      />
    </div>
  );
}

export function LazyImage({
  src,
  alt,
  className = "",
  aspectRatio,
  enableZoom = false,
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = prefersReducedMotion();

  // Intersection observer for lazy loading
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      {/* Skeleton */}
      {!isLoaded && <SkeletonLoader />}

      {/* Image */}
      {isInView && (
        <motion.img
          ref={imgRef}
          src={src}
          alt={alt}
          initial={{ opacity: 0 }}
          animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
          transition={{
            duration: reduced ? 0 : 0.4,
            ease: [0.25, 1, 0.5, 1],
          }}
          className={`w-full h-full object-cover ${enableZoom ? "transition-transform duration-700 ease-out group-hover:scale-[1.03]" : ""}`}
          onLoad={() => setIsLoaded(true)}
          loading="lazy"
        />
      )}
    </div>
  );
}
