import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { prefersReducedMotion } from "@/lib/motion";

interface SmartImageProps {
  /** Primary image source (real photo path) */
  src: string;
  /** SVG fallback source (generated placeholder) */
  fallbackSrc?: string;
  /** Alt text for accessibility */
  alt: string;
  /** CSS classes for the container */
  className?: string;
  /** CSS classes for the img element */
  imgClassName?: string;
  /** Whether to enable zoom on hover */
  enableZoom?: boolean;
  /** Aspect ratio for the container */
  aspectRatio?: string;
  /** Loading strategy */
  loading?: "lazy" | "eager";
  /** Callback when image loads successfully */
  onLoad?: () => void;
}

const reduced = prefersReducedMotion();

/**
 * Premium image component that:
 * 1. Tries to load the real photo first
 * 2. Falls back to SVG-generated placeholder if the photo doesn't exist
 * 3. Shows a shimmer skeleton while loading
 * 4. Supports smooth hover zoom
 */
export function SmartImage({
  src,
  fallbackSrc,
  alt,
  className,
  imgClassName,
  enableZoom = false,
  aspectRatio,
  loading = "lazy",
  onLoad,
}: SmartImageProps) {
  const [loadState, setLoadState] = useState<"loading" | "loaded" | "error">("loading");
  const [useFallback, setUseFallback] = useState(false);

  const activeSrc = useFallback ? fallbackSrc : src;

  const handleLoad = useCallback(() => {
    setLoadState("loaded");
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    if (!useFallback && fallbackSrc) {
      // Try the SVG fallback
      setUseFallback(true);
      setLoadState("loading");
    } else {
      setLoadState("error");
    }
  }, [useFallback, fallbackSrc]);

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      {/* Shimmer skeleton */}
      {loadState === "loading" && (
        <div className="absolute inset-0 z-10">
          <div
            className="absolute inset-0 bg-muted/30"
            style={{
              background: `linear-gradient(90deg, transparent 0%, oklch(0.5 0.01 60 / 0.06) 50%, transparent 100%)`,
              backgroundSize: "200% 100%",
              animation: "shimmer 2s ease-in-out infinite",
            }}
          />
        </div>
      )}

      {/* Image */}
      {activeSrc && (
        <img
          src={activeSrc}
          alt={alt}
          loading={loading}
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            "w-full h-full object-cover transition-all duration-700 ease-out",
            enableZoom && "group-hover:scale-[1.03]",
            loadState === "loaded" ? "opacity-100" : "opacity-0",
            reduced && "transition-none",
            imgClassName
          )}
        />
      )}

      {/* Error state — minimal fallback */}
      {loadState === "error" && !activeSrc && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/20">
          <div className="text-center">
            <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-muted/40 flex items-center justify-center">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-muted-foreground/40"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="M21 15l-5-5L5 21" />
              </svg>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
