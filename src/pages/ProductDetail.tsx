import { useState, useMemo } from "react";
import { useParams, Link } from "react-router";
import { motion } from "framer-motion";
import {
  Heart,
  ShoppingBag,
  Truck,
  RotateCcw,
  Shield,
  ChevronDown,
  Star,
  Minus,
  Plus,
} from "lucide-react";
import { getProductById, products } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { ProductCard } from "@/components/ProductCard";
import { cn } from "@/lib/utils";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const product = id ? getProductById(id) : undefined;
  const { addItem } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();

  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);

  const inWishlist = product ? isInWishlist(product.id) : false;

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return products
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="text-2xl font-serif font-semibold text-foreground mb-4">
            Product not found
          </h1>
          <Link
            to="/shop"
            className="text-[13px] text-muted-foreground/70 hover:text-foreground transition-colors underline underline-offset-4"
          >
            Return to shop
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        productId: product.id,
        name: product.name,
        brand: product.brand,
        price: product.price,
        image: product.images[0],
        color: product.colors[selectedColor]?.name || "",
        size: product.sizes[selectedSize] || "",
      });
    }
  };

  const toggleAccordion = (key: string) => {
    setActiveAccordion(activeAccordion === key ? null : key);
  };

  const accordions = [
    {
      key: "details",
      title: "Product Details",
      content: product.description,
    },
    {
      key: "features",
      title: "Features & Materials",
      content: product.features.join(" • "),
    },
    {
      key: "shipping",
      title: "Shipping & Returns",
      content:
        "Free standard shipping on orders over $100. Express shipping available. Free 30-day returns on all orders. Items must be unworn with tags attached.",
    },
  ];

  return (
    <div className="min-h-screen pt-20 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[11px] text-muted-foreground/60 mb-8 tracking-wide">
          <Link
            to="/"
            className="hover:text-foreground transition-colors"
          >
            Home
          </Link>
          <span className="text-muted-foreground/30">/</span>
          <Link
            to="/shop"
            className="hover:text-foreground transition-colors"
          >
            Shop
          </Link>
          <span className="text-muted-foreground/30">/</span>
          <Link
            to={`/shop?category=${product.category}`}
            className="hover:text-foreground transition-colors capitalize"
          >
            {product.category}
          </Link>
          <span className="text-muted-foreground/30">/</span>
          <span className="text-foreground/70">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-card border border-border/30 shadow-sm">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.badge && (
                <div className="absolute top-4 left-4 px-3 py-1.5 bg-foreground/90 text-background text-[10px] font-semibold uppercase tracking-widest rounded-lg backdrop-blur-sm">
                  {product.badge}
                </div>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3 mt-4">
                {product.images.map((img, i) => (
                  <div
                    key={i}
                    className={cn(
                      "aspect-square rounded-xl overflow-hidden bg-card border-2 transition-all duration-200 cursor-pointer",
                      i === 0
                        ? "border-foreground/80"
                        : "border-border/30 hover:border-foreground/20"
                    )}
                  >
                    <img
                      src={img}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.08, ease: "easeOut" }}
            className="lg:sticky lg:top-24 lg:self-start"
          >
            <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground/60 mb-2 font-medium">
              {product.brand}
            </p>
            <h1 className="text-3xl lg:text-[2.5rem] font-serif font-semibold text-foreground mb-3 tracking-[-0.01em] leading-tight">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-5">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-3.5 w-3.5",
                      i < Math.floor(product.rating)
                        ? "text-amber-400 fill-amber-400"
                        : "text-muted-foreground/20"
                    )}
                  />
                ))}
              </div>
              <span className="text-[13px] text-muted-foreground/60">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-2xl font-semibold text-foreground tracking-tight">
                ${product.price}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-[15px] text-muted-foreground/50 line-through">
                    ${product.originalPrice}
                  </span>
                  <span className="px-2 py-0.5 bg-rose-500/10 text-rose-500 text-[11px] font-semibold rounded-md">
                    Save ${product.originalPrice - product.price}
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-[14px] text-muted-foreground/65 leading-relaxed mb-7 max-w-lg font-light">
              {product.description}
            </p>

            {/* Color Selection */}
            {product.colors.length > 0 && (
              <div className="mb-7">
                <p className="text-[13px] font-medium text-foreground/90 mb-3">
                  Color:{" "}
                  <span className="text-muted-foreground/60 font-normal">
                    {product.colors[selectedColor]?.name}
                  </span>
                </p>
                <div className="flex items-center gap-2.5">
                  {product.colors.map((color, i) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(i)}
                      className={cn(
                        "w-9 h-9 rounded-full border-2 transition-all duration-200",
                        selectedColor === i
                          ? "border-foreground scale-110 shadow-sm"
                          : "border-border/40 hover:border-foreground/25"
                      )}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.sizes.length > 1 && (
              <div className="mb-7">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[13px] font-medium text-foreground/90">
                    Size:{" "}
                    <span className="text-muted-foreground/60 font-normal">
                      {product.sizes[selectedSize]}
                    </span>
                  </p>
                  <button className="text-[11px] text-muted-foreground/60 underline underline-offset-4 hover:text-foreground transition-colors">
                    Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size, i) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(i)}
                      className={cn(
                        "min-w-[48px] h-11 px-4 rounded-xl border text-[13px] font-medium transition-all duration-200",
                        selectedSize === i
                          ? "bg-foreground text-background border-foreground"
                          : "bg-card/60 text-foreground/80 border-border/40 hover:border-foreground/20"
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-7">
              <p className="text-[13px] font-medium text-foreground/90 mb-3">
                Quantity
              </p>
              <div className="inline-flex items-center border border-border/50 rounded-xl">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 text-muted-foreground/60 hover:text-foreground transition-colors"
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-12 text-center text-[13px] font-medium text-foreground">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 text-muted-foreground/60 hover:text-foreground transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Add to Cart & Wishlist */}
            <div className="flex gap-3 mb-8">
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2.5 h-12 bg-foreground text-background text-[13px] font-semibold rounded-xl hover:bg-foreground/90 transition-all duration-200 hover:shadow-lg hover:shadow-foreground/15 tracking-wide"
              >
                <ShoppingBag className="h-4 w-4" />
                Add to Cart — ${product.price * quantity}
              </button>
              <button
                onClick={() => toggleItem(product.id)}
                className={cn(
                  "h-12 w-12 flex items-center justify-center rounded-xl border transition-all duration-200",
                  inWishlist
                    ? "bg-foreground text-background border-foreground"
                    : "bg-card/60 text-foreground/80 border-border/40 hover:border-foreground/20"
                )}
                aria-label={
                  inWishlist ? "Remove from wishlist" : "Add to wishlist"
                }
              >
                <Heart
                  className={cn("h-5 w-5", inWishlist && "fill-current")}
                />
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-3 mb-8">
              {[
                { icon: Truck, label: "Free Shipping" },
                { icon: RotateCcw, label: "30-Day Returns" },
                { icon: Shield, label: "Secure Checkout" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-1.5 py-3.5 bg-card/40 border border-border/30 rounded-xl"
                >
                  <Icon className="h-4 w-4 text-muted-foreground/50" strokeWidth={1.5} />
                  <span className="text-[10px] text-muted-foreground/60 text-center font-medium">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* Accordions */}
            <div className="border-t border-border/40">
              {accordions.map(({ key, title, content }) => (
                <div key={key} className="border-b border-border/40">
                  <button
                    onClick={() => toggleAccordion(key)}
                    className="w-full flex items-center justify-between py-4 text-[13px] font-medium text-foreground/90"
                  >
                    {title}
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 text-muted-foreground/50 transition-transform duration-200",
                        activeAccordion === key && "rotate-180"
                      )}
                    />
                  </button>
                  {activeAccordion === key && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="pb-4"
                    >
                      <p className="text-[13px] text-muted-foreground/65 leading-relaxed font-light">
                        {content}
                      </p>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-20 pt-16 border-t border-border/40">
            <h2 className="text-2xl font-serif font-semibold text-foreground mb-8 tracking-[-0.01em]">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
