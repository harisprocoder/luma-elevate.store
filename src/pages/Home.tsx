import { Link } from "react-router";
import { motion } from "framer-motion";
import { ArrowRight, Truck, RotateCcw, Shield, Star } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { categories, getNewArrivals, getBestsellers } from "@/data/products";
import {
  prefersReducedMotion,
  staggerContainer,
  staggerChild,
  heroEntrance,
  heroChild,
  fadeUp,
} from "@/lib/motion";

const reduced = prefersReducedMotion();

export default function Home() {
  const newArrivals = getNewArrivals();
  const bestsellers = getBestsellers();
  const displayCategories = categories.slice(0, 5);

  return (
    <div className="min-h-screen">
      {/* ─── Hero ──────────────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-card">
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, currentColor 1px, transparent 1px), radial-gradient(circle at 75% 75%, currentColor 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />
          {/* Warm ambient glow */}
          <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-amber-500/[0.04] rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 -left-40 w-[400px] h-[400px] bg-amber-500/[0.025] rounded-full blur-[100px]" />
          {/* Subtle horizontal line accent */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/30 to-transparent" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32">
          <div className="max-w-3xl">
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
              <motion.h1
                variants={heroChild}
                className="text-5xl sm:text-6xl lg:text-[5.25rem] font-serif font-bold text-foreground leading-[1.02] mb-7 tracking-[-0.02em]"
              >
                Essentials,
                <br />
                <span className="italic text-muted-foreground/50 font-normal">
                  elevated.
                </span>
              </motion.h1>
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
                  className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-foreground text-background text-[13px] font-semibold rounded-full hover:bg-foreground/90 active:scale-[0.98] transition-all duration-200 hover:shadow-lg hover:shadow-foreground/15 tracking-wide"
                >
                  Shop Collection
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/shop?category=new-arrivals"
                  className="inline-flex items-center gap-2.5 px-8 py-3.5 border border-border/80 text-foreground text-[13px] font-medium rounded-full hover:bg-muted/40 active:scale-[0.98] transition-all duration-200 tracking-wide"
                >
                  Explore New Arrivals
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Trust Row ─────────────────────────────────────────────────── */}
      <section className="border-y border-border/60 bg-card/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={reduced ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer(0.08)}
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
            variants={fadeUp}
            className="flex items-end justify-between mb-10"
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
              className="text-[13px] text-muted-foreground/70 hover:text-foreground transition-colors flex items-center gap-1.5 font-medium"
            >
              View All <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </motion.div>

          <motion.div
            initial={reduced ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={staggerContainer(0.06)}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5"
          >
            {displayCategories.map((cat) => (
              <motion.div key={cat.id} variants={staggerChild}>
                <Link
                  to={`/shop?category=${cat.slug}`}
                  className="group block relative aspect-[4/5] rounded-2xl overflow-hidden bg-card border border-border/40 shadow-sm hover:shadow-lg hover:shadow-black/15 transition-all duration-500"
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Editorial overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-sm font-semibold text-white/95 mb-0.5">
                      {cat.name}
                    </h3>
                    <p className="text-[11px] text-white/50 font-light">
                      {cat.productCount} {cat.productCount === 1 ? "product" : "products"}
                    </p>
                  </div>
                  {/* Hover arrow */}
                  <div className="absolute top-3.5 right-3.5 p-2 bg-white/10 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-1 group-hover:translate-x-0">
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
            variants={fadeUp}
            className="flex items-end justify-between mb-10"
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
            variants={staggerContainer(0.05)}
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
            variants={fadeUp}
            className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#1a1816] via-[#24201c] to-[#1a1816] border border-border/30 p-10 sm:p-16 lg:p-20"
          >
            {/* Ambient glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/[0.04] rounded-full blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/[0.025] rounded-full blur-[80px]" />
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
                className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-foreground text-background text-[13px] font-semibold rounded-full hover:bg-foreground/90 active:scale-[0.98] transition-all duration-200 hover:shadow-lg hover:shadow-foreground/15 tracking-wide"
              >
                Shop Now
                <ArrowRight className="h-4 w-4" />
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
            variants={fadeUp}
            className="flex items-end justify-between mb-10"
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
            variants={staggerContainer(0.05)}
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
    </div>
  );
}
