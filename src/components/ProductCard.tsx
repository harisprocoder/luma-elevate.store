import { useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { Heart, Eye, ShoppingBag, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCart } from "@/contexts/CartContext";
import { prefersReducedMotion } from "@/lib/motion";
import { getRealImages, getSVGFallbacks } from "@/lib/productImageMap";
import { SmartImage } from "@/components/SmartImage";
import type { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
  className?: string;
}

const reduced = prefersReducedMotion();

export function ProductCard({ product, className }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { toggleItem, isInWishlist } = useWishlist();
  const { addItem } = useCart();
  const inWishlist = isInWishlist(product.id);

  const realImages = getRealImages(product.id);
  const svgFallbacks = getSVGFallbacks(product.id);
  const hasSecondaryImage = realImages?.secondary || svgFallbacks?.secondary;

  const badgeLabel =
    product.badge === "new"
      ? "New"
      : product.badge === "sale"
        ? "Sale"
        : product.badge === "bestseller"
          ? "Best"
          : product.badge === "limited"
            ? "Limited"
            : null;

  const badgeStyle =
    product.badge === "sale"
      ? "bg-rose-500/90 text-white"
      : product.badge === "limited"
        ? "bg-amber-500/90 text-black"
        : "bg-foreground/90 text-background";

  return (
    <motion.div
      className={cn("group relative", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={reduced ? undefined : { y: -6 }}
      transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
    >
      {/* Image */}
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-card border border-border/40 shadow-sm group-hover:shadow-xl group-hover:shadow-black/20 transition-shadow duration-500">
          {/* Primary Image */}
          <SmartImage
            src={realImages?.primary ?? product.images[0]}
            fallbackSrc={svgFallbacks?.primary}
            alt={product.name}
            className="absolute inset-0 w-full h-full"
            enableZoom
          />

          {/* Secondary Image — revealed on hover */}
          {hasSecondaryImage && (
            <SmartImage
              src={realImages?.secondary ?? (svgFallbacks?.secondary ?? product.images[1] ?? "")}
              fallbackSrc={svgFallbacks?.secondary}
              alt={`${product.name} alternate view`}
              className={cn(
                "absolute inset-0 w-full h-full transition-opacity duration-700",
                isHovered ? "opacity-100" : "opacity-0"
              )}
              enableZoom
            />
          )}

          {/* Subtle gradient overlay on hover */}
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Top gradient for badges */}
          <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/20 to-transparent opacity-60" />

          {/* Badge */}
          {badgeLabel && (
            <div
              className={cn(
                "absolute top-3 left-3 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest rounded-md backdrop-blur-sm z-20",
                badgeStyle
              )}
            >
              {badgeLabel}
            </div>
          )}

          {/* Wishlist */}
          <motion.button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleItem(product.id);
            }}
            className={cn(
              "absolute top-3 right-3 p-2 rounded-full z-20 transition-shadow duration-300",
              inWishlist
                ? "bg-foreground text-background shadow-md"
                : "bg-background/70 backdrop-blur-md text-foreground/70 hover:bg-background/90"
            )}
            initial={false}
            animate={{
              opacity: inWishlist || isHovered ? 1 : 0,
              scale: inWishlist ? 1 : isHovered ? 1 : 0.85,
            }}
            transition={{ duration: reduced ? 0 : 0.25, ease: [0.25, 1, 0.5, 1] }}
            aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart className={cn("h-4 w-4", inWishlist && "fill-current")} />
          </motion.button>

          {/* Hover Actions — slide up */}
          <motion.div
            className="absolute bottom-3 left-3 right-3 flex gap-2 z-20"
            initial={false}
            animate={{
              opacity: isHovered ? 1 : 0,
              y: isHovered ? 0 : 12,
            }}
            transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
          >
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addItem({
                  productId: product.id,
                  name: product.name,
                  brand: product.brand,
                  price: product.price,
                  image: realImages?.primary ?? product.images[0],
                  color: product.colors[0]?.name || "",
                  size: product.sizes[0] || "",
                });
              }}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-foreground text-background text-xs font-semibold rounded-xl hover:bg-foreground/90 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-black/30"
            >
              <ShoppingBag className="h-3.5 w-3.5" />
              Quick Add
            </button>
            <Link
              to={`/product/${product.id}`}
              className="flex items-center justify-center p-2.5 bg-background/85 backdrop-blur-md text-foreground rounded-xl hover:bg-background active:scale-[0.98] transition-all duration-200 shadow-lg shadow-black/20"
              onClick={(e) => e.stopPropagation()}
              aria-label="Quick view"
            >
              <Eye className="h-3.5 w-3.5" />
            </Link>
          </motion.div>
        </div>
      </Link>

      {/* Info */}
      <div className="mt-3.5 px-0.5">
        <p className="text-[10px] text-muted-foreground uppercase tracking-[0.15em] font-medium mb-0.5">
          {product.brand}
        </p>
        <Link to={`/product/${product.id}`}>
          <h3 className="text-[13px] font-medium text-foreground/90 truncate group-hover:text-foreground transition-colors duration-200 leading-snug">
            {product.name}
          </h3>
        </Link>

        {/* Price + Rating row */}
        <div className="flex items-center justify-between mt-1.5">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-foreground tracking-tight">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-muted-foreground/60 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
          <div className="flex items-center gap-0.5">
            <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
            <span className="text-[11px] text-muted-foreground font-medium">
              {product.rating}
            </span>
          </div>
        </div>

        {/* Colors */}
        {product.colors.length > 0 && (
          <div className="flex items-center gap-1.5 mt-2.5">
            {product.colors.slice(0, 5).map((color) => (
              <div
                key={color.name}
                className="w-3.5 h-3.5 rounded-full border border-black/20 shadow-sm"
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
            {product.colors.length > 5 && (
              <span className="text-[10px] text-muted-foreground/70">
                +{product.colors.length - 5}
              </span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
