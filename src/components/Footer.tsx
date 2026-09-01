import { Link } from "react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Check, ArrowRight } from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting) return;
    setIsSubmitting(true);

    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 800));

    setIsSubscribed(true);
    setIsSubmitting(false);
    setEmail("");
    toast.success("You're on the list", {
      description:
        "We'll let you know about new collections and exclusive offers.",
    });

    // Reset after animation
    setTimeout(() => setIsSubscribed(false), 3000);
  };

  return (
    <footer className="bg-card/50 border-t border-border/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Newsletter */}
        <div className="py-16 border-b border-border/40">
          <div className="max-w-md mx-auto text-center">
            <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground/50 mb-3 font-medium">
              Newsletter
            </p>
            <h3 className="text-xl font-serif font-semibold text-foreground mb-2.5">
              Stay in the Loop
            </h3>
            <p className="text-[13px] text-muted-foreground/60 mb-7 leading-relaxed font-light">
              Be the first to know about new collections, limited releases, and
              exclusive member offers.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="relative">
              <div className="flex gap-2.5">
                <div className="relative flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    disabled={isSubmitting}
                    className="w-full h-12 px-5 pr-12 bg-background border border-border/60 rounded-xl text-[13px] text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus-glow transition-all duration-300 disabled:opacity-50"
                  />
                  <AnimatePresence mode="wait">
                    {isSubscribed ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 w-6 h-6 bg-green-500/15 rounded-full flex items-center justify-center"
                      >
                        <Check className="h-3.5 w-3.5 text-green-500" />
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="h-12 px-7 bg-foreground text-background text-[13px] font-semibold rounded-xl hover:bg-foreground/90 transition-all duration-300 tracking-wide disabled:opacity-50 flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <div className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                  ) : (
                    <>
                      Subscribe
                      <ArrowRight className="h-3.5 w-3.5" />
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </div>
        </div>

        {/* Links */}
        <div className="py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/80 mb-4">
              Shop
            </h4>
            <ul className="space-y-2.5">
              {[
                "New Arrivals",
                "Bestsellers",
                "Footwear",
                "T-Shirts",
                "Hoodies",
              ].map((link) => (
                <li key={link}>
                  <Link
                    to={`/shop?category=${link.toLowerCase().replace(" ", "-")}`}
                    className="link-underline text-[13px] text-muted-foreground/60 hover:text-foreground transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/80 mb-4">
              Help
            </h4>
            <ul className="space-y-2.5">
              {["Shipping & Returns", "Size Guide", "Track Order", "Contact Us", "FAQ"].map(
                (link) => (
                  <li key={link}>
                    <span className="link-underline text-[13px] text-muted-foreground/60 hover:text-foreground transition-colors cursor-default">
                      {link}
                    </span>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/80 mb-4">
              About
            </h4>
            <ul className="space-y-2.5">
              {["Our Story", "Sustainability", "Careers", "Press"].map((link) => (
                <li key={link}>
                  <span className="link-underline text-[13px] text-muted-foreground/60 hover:text-foreground transition-colors cursor-default">
                    {link}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/80 mb-4">
              Connect
            </h4>
            <ul className="space-y-2.5">
              {["Instagram", "Twitter", "Pinterest", "TikTok"].map((link) => (
                <li key={link}>
                  <span className="link-underline text-[13px] text-muted-foreground/60 hover:text-foreground transition-colors cursor-default">
                    {link}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="py-6 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-serif font-bold tracking-[0.08em] text-foreground/80">
              LUMA
            </span>
          </div>
          <p className="text-[11px] text-muted-foreground/50">
            © {new Date().getFullYear()} Luma. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
