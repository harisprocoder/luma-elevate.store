import { Link } from "react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Truck, RotateCcw, Shield, Star, ChevronDown } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { categories, getNewArrivals, getBestsellers, products } from "@/data/products";
import {
  prefersReducedMotion,
  staggerContainer,
  staggerChild,
  staggerChildScale,
  heroEntrance,
  heroChild,
  fadeUp,
  revealUp,
  scaleReveal,
  wordContainer,
  wordReveal,
  splitWords,
  clipReveal,
} from "@/lib/motion";

const reduced = prefersReducedMotion();

export default function Home() {
  const newArrivals = getNewArrivals();
  const bestsellers = getBestsellers();
  const displayCategories = categories.slice(0, 5);

  const headlineWords = splitWords("Essentials,");
  const sublineWords = splitWords("elevated.");

  // Featured hero product
  const heroProduct = products.find((p) => p.id === "luma-drift-hoodie-01") ?? products[0];
  const heroProduct2 = products.find((p) => p.id === "luma-chronos-01") ?? products[2];

  return (
    <div className="min-h-screen">
      {/* ─── Hero ──────────────────────────────────────────────────────── */}
      <section className="relative min-h-[95vh] flex items-center overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-card">
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, currentColor 1px, transparent 1px), radial-gradient(circle at 75% 75%, currentColor 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />
          {/* Warm ambient glows — animated */}
          <motion.div
            animate={reduced ? {} : { x: [0, 30, 0], y: [0, -20, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/4 -right-20 w-[600px] h-[600px] bg-amber-500/[0.04] rounded-full blur-[140px]"
          />
          <motion.div
            animate={reduced ? {} : { x: [0, -20, 0], y: [0, 15, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-1/4 -left-20 w-[500px] h-[500px] bg-amber-500/[0.025] rounded-full blur-[120px]"
          />
          {/* Subtle horizontal line accent */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/30 to-transparent" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Text Content */}
            <div className="lg:col-span-6">
              <motion.div
                initial={reduced ? false : "hidden"}
                animate="visible"
                variants={heroEntrance}
              >
                <motion.p
                  variants={heroChild}
                  className="text-[11px] uppercase tracking-[0.35em] text-muted-foreground/70 mb-7 font-medium"
                >
                  New Season Collection
                </motion.p>
                {/* Word-by-word headline */}
                <div className="perspective-1000 mb-7">
                  <motion.h1
                    initial={reduced ? false : "hidden"}
                    animate="visible"
                    variants={wordContainer}
                    className="text-5xl sm:text-6xl lg:text-[5.25rem] font-serif font-bold text-foreground leading-[1.02] tracking-[-0.02em]"
                  >
                    {headlineWords.map((word, i) => (
                      <motion.span
                        key={`h-${i}`}
                        variants={reduced ? undefined : wordReveal}
                        className="inline-block mr-[0.3em]"
                        style={{ transformOrigin: "bottom" }}
                      >
                        {word}
                      </motion.span>
                    ))}
                    <br />
                    <motion.span
                      initial={reduced ? false : "hidden"}
                      animate="visible"
                      variants={wordContainer}
                      className="inline-flex flex-wrap"
                    >
                      {sublineWords.map((word, i) => (
                        <motion.span
                          key={`s-${i}`}
                          variants={reduced ? undefined : wordReveal}
                          className="inline-block mr-[0.3em] italic text-gradient-accent font-normal"
                          style={{ transformOrigin: "bottom" }}
                        >
                          {word}
                        </motion.span>
                      ))}
                    </motion.span>
                  </motion.h1>
                </div>
                <motion.p
                  variants={heroChild}
                  className="text-[15px] text-muted-foreground/80 max-w-md mb-11 leading-relaxed font-light"
                >
                  Thoughtfully crafted essentials that balance refined aesthetics
                  with everyday comfort. Built to last, designed to endure.
                </motion.p>
                <motion.div variants={heroChild} className="flex flex-wrap gap-3">
                  <Link
                    to="/shop"
                    className="magnetic-btn inline-flex items-center gap-2.5 px-8 py-3.5 bg-foreground text-background text-[13px] font-semibold rounded-full hover:bg-foreground/90 transition-all duration-300 hover:shadow-xl hover:shadow-foreground/20 tracking-wide"
                  >
                    Shop Collection
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                  <Link
                    to="/shop?category=new-arrivals"
                    className="magnetic-btn inline-flex items-center gap-2.5 px-8 py-3.5 border border-border/80 text-foreground text-[13px] font-medium rounded-full hover:bg-muted/40 hover:border-foreground/20 transition-all duration-300 tracking-wide"
                  >
                    Explore New Arrivals
                  </Link>
                </motion.div>
              </motion.div>
            </div>

            {/* Hero Product Visuals */}
            <div className="lg:col-span-6 relative hidden lg:block">
              <motion.div
                initial={reduced ? false : { opacity: 0, scale: 0.92, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                className="relative"
              >
                {/* Primary product card */}
                <motion.div
                  animate={reduced ? {} : { y: [0, -8, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="relative w-[340px] mx-auto"
                >
                  <div className="aspect-[3/4] rounded-3xl overflow-hidden bg-card border border-border/30 shadow-2xl shadow-black/20">
                    <img
                      src={heroProduct.images[0]}
                      alt={heroProduct.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Product info overlay */}
                  <div className="absolute bottom-4 left-4 right-4 bg-background/80 backdrop-blur-xl rounded-2xl p-4 border border-border/20">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60 font-medium mb-1">
                      {heroProduct.brand}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-[13px] font-medium text-foreground">
                        {heroProduct.name}
                      </p>
                      <p className="text-[13px] font-semibold text-foreground">
                        ${heroProduct.price}
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Secondary floating product */}
                <motion.div
                  animate={reduced ? {} : { y: [0, -6, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute -top-4 -right-4 w-[160px]"
                >
                  <div className="aspect-square rounded-2xl overflow-hidden bg-card border border-border/30 shadow-xl shadow-black/15">
                    <img
                      src={heroProduct2.images[0]}
                      alt={heroProduct2.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-background/80 backdrop-blur-xl rounded-xl px-3 py-1.5 border border-border/20 shadow-lg">
                    <p className="text-[11px] font-semibold text-foreground whitespace-nowrap">
                      ${heroProduct2.price}
                    </p>
                  </div>
                </motion.div>

                {/* Decorative accent ring */}
                <motion.div
                  animate={reduced ? {} : { rotate: 360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-8 -left-8 w-32 h-32 border border-border/10 rounded-full"
                />
              </motion.div>
            </div>
          </div>

          {/* Animated scroll indicator */}
          <motion.div
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground/40 font-medium">
              Scroll
            </span>
            <motion.div
              animate={reduced ? {} : { y: [0, 6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown className="h-4 w-4 text-muted-foreground/30" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── Trust Row ─────────────────────────────────────────────────── */}
      <section className="border-y border-border/60 bg-card/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={reduced ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer(0.1)}
            className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border/60"
          >
            {[
              { icon: Truck, label: "Free Shipping", desc: "On orders over $100" },
              { icon: RotateCcw, label: "Easy Returns", desc: "30-day free returns" },
              { icon: Shield, label: "Secure Checkout", desc: "100% encrypted payment" },
              { icon: Star, label: "Premium Quality", desc: "Curated with care" },
            ].map(({ icon: Icon, label, desc }) => (
              <motion.div
                key={label}
                variants={staggerChild}
                className="flex items-center gap-3.5 py-5 px-4 md:px-6"
              >
                <div className="flex items-center justify-center w-9 h-9 rounded-full bg-muted/60 flex-shrink-0">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-[13px] font-medium text-foreground/90">{label}</p>
                  <p className="text-[11px] text-muted-foreground/70 hidden sm:block">
                    {desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Categories ────────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={reduced ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={revealUp}
            className="flex items-end justify-between mb-12"
          >
            <div>
              <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground/60 mb-2 font-medium">
                Browse by
              </p>
              <h2 className="text-3xl font-serif font-semibold text-foreground tracking-[-0.01em]">
                Categories
              </h2>
            </div>
            <Link
              to="/shop"
              className="link-underline text-[13px] text-muted-foreground/70 hover:text-foreground transition-colors flex items-center gap-1.5 font-medium"
            >
              View All <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </motion.div>

          <motion.div
            initial={reduced ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer(0.07)}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4"
          >
            {displayCategories.map((cat) => (
              <motion.div key={cat.id} variants={staggerChildScale}>
                <Link
                  to={`/shop?category=${cat.slug}`}
                  className="group block relative aspect-[4/5] rounded-2xl overflow-hidden bg-card border border-border/40 hover-glow transition-all duration-500"
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    loading="lazy"
                  />
                  {/* Editorial overlay with gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                  {/* Animated border on hover */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-white/10 transition-all duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 transform transition-transform duration-500 group-hover:-translate-y-1">
                    <h3 className="text-sm font-semibold text-white/95 mb-0.5 transition-colors duration-300 group-hover:text-white">
                      {cat.name}
                    </h3>
                    <p className="text-[11px] text-white/50 font-light">
                      {cat.productCount} {cat.productCount === 1 ? "product" : "products"}
                    </p>
                  </div>
                  {/* Hover arrow with smooth reveal */}
                  <div className="absolute top-3.5 right-3.5 p-2 bg-white/10 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all duration-400 translate-x-2 group-hover:translate-x-0">
                    <ArrowRight className="h-3.5 w-3.5 text-white/90" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── New Arrivals ──────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-card/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={reduced ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={scaleReveal}
            className="flex items-end justify-between mb-12"
          >
            <div>
              <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground/60 mb-2 font-medium">
                Just Arrived
              </p>
              <h2 className="text-3xl font-serif font-semibold text-foreground tracking-[-0.01em]">
                New Arrivals
              </h2>
            </div>
            <Link
              to="/shop?category=new-arrivals"
              className="text-[13px] text-muted-foreground/70 hover:text-foreground transition-colors flex items-center gap-1.5 font-medium"
            >
              View All <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </motion.div>

          <motion.div
            initial={reduced ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer(0.06)}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
          >
            {newArrivals.map((product) => (
              <motion.div key={product.id} variants={staggerChild}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Promo Banner ──────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={reduced ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={clipReveal}
            className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#1a1816] via-[#24201c] to-[#1a1816] border border-border/30 p-10 sm:p-16 lg:p-20"
          >
            {/* Animated ambient glows */}
            <motion.div
              animate={reduced ? {} : { x: [0, 40, 0], y: [0, -30, 0] }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 right-0 w-96 h-96 bg-amber-500/[0.05] rounded-full blur-[120px]"
            />
            <motion.div
              animate={reduced ? {} : { x: [0, -25, 0] }}
              transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-0 left-0 w-72 h-72 bg-amber-500/[0.03] rounded-full blur-[100px]"
            />
            {/* Subtle texture */}
            <div
              className="absolute inset-0 opacity-[0.015]"
              style={{
                backgroundImage: `radial-gradient(circle at 50% 50%, #fff 1px, transparent 1px)`,
                backgroundSize: "24px 24px",
              }}
            />

            <div className="relative max-w-xl">
              <p className="text-[11px] uppercase tracking-[0.35em] text-amber-300/50 mb-5 font-medium">
                Summer Collection
              </p>
              <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-foreground mb-4 tracking-[-0.01em] leading-tight">
                Designed for the season ahead.
              </h2>
              <p className="text-[15px] text-muted-foreground/70 mb-9 leading-relaxed font-light max-w-md">
                Explore our latest collection of lightweight, breathable
                essentials crafted for warm days and cooler evenings.
              </p>
              <Link
                to="/shop?category=new-arrivals"
                className="magnetic-btn inline-flex items-center gap-2.5 px-8 py-3.5 bg-foreground text-background text-[13px] font-semibold rounded-full hover:bg-foreground/90 transition-all duration-300 hover:shadow-xl hover:shadow-foreground/20 tracking-wide"
              >
                Shop Now
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Bestsellers ───────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-card/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={reduced ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={revealUp}
            className="flex items-end justify-between mb-12"
          >
            <div>
              <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground/60 mb-2 font-medium">
                Customer Favorites
              </p>
              <h2 className="text-3xl font-serif font-semibold text-foreground tracking-[-0.01em]">
                Bestsellers
              </h2>
            </div>
            <Link
              to="/shop"
              className="text-[13px] text-muted-foreground/70 hover:text-foreground transition-colors flex items-center gap-1.5 font-medium"
            >
              View All <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </motion.div>

          <motion.div
            initial={reduced ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer(0.06)}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
          >
            {bestsellers.map((product) => (
              <motion.div key={product.id} variants={staggerChild}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Editorial Statement ───────────────────────────────────────── */}
      <section className="py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={reduced ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={revealUp}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="w-12 h-px bg-foreground/20 mx-auto mb-8" />
            <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground/50 mb-6 font-medium">
              Our Philosophy
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-semibold text-foreground leading-snug tracking-[-0.01em] mb-6">
              We believe in the power of less. Every piece is considered, every detail intentional.
            </h2>
            <p className="text-[15px] text-muted-foreground/60 leading-relaxed font-light max-w-lg mx-auto">
              LUMA exists at the intersection of timeless design and modern craft.
              We create essentials that transcend seasons and trends.
            </p>
            <div className="w-12 h-px bg-foreground/20 mx-auto mt-8" />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
