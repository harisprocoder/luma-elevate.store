import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingBag, Heart, Menu, X, Sun, Moon } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";
import { searchProducts } from "@/data/products";
import { CartDrawer } from "@/components/CartDrawer";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<ReturnType<typeof searchProducts>>([]);
  const { totalItems } = useCart();
  const { items: wishlistItems } = useWishlist();
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
    setSearchQuery("");
  }, [location]);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  useEffect(() => {
    if (searchQuery.length >= 2) {
      setSearchResults(searchProducts(searchQuery).slice(0, 6));
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "/" &&
        !isSearchOpen &&
        !isCartOpen &&
        !(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)
      ) {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === "Escape") {
        setIsSearchOpen(false);
        setIsCartOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen, isCartOpen]);

  // Lock body scroll when cart is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCartOpen]);

  const navLinks = [
    { href: "/shop", label: "Shop" },
    { href: "/shop?category=new-arrivals", label: "Collections" },
    { href: "/shop?category=new-arrivals", label: "New Arrivals" },
    { href: "/shop?category=bestseller", label: "Sale" },
  ];

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-background/85 backdrop-blur-xl border-b border-border/30"
            : "bg-transparent"
        )}
      >
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-[60px] items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <span className="text-lg font-serif font-bold tracking-[0.1em] text-foreground">
                LUMA
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-7">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className={cn(
                    "text-[13px] tracking-wide transition-colors duration-200 relative py-1",
                    location.pathname === link.href &&
                      link.label === "Shop"
                      ? "text-foreground font-medium"
                      : "text-muted-foreground/60 hover:text-foreground"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-0.5">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="relative p-2.5 text-muted-foreground/60 hover:text-foreground transition-colors"
                aria-label="Search"
              >
                <Search className="h-[18px] w-[18px]" strokeWidth={1.5} />
              </button>

              <button
                onClick={toggleTheme}
                className="relative p-2.5 text-muted-foreground/60 hover:text-foreground transition-colors"
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <Sun className="h-[18px] w-[18px]" strokeWidth={1.5} />
                ) : (
                  <Moon className="h-[18px] w-[18px]" strokeWidth={1.5} />
                )}
              </button>

              <Link
                to="/wishlist"
                className="relative p-2.5 text-muted-foreground/60 hover:text-foreground transition-colors"
                aria-label="Wishlist"
              >
                <Heart className="h-[18px] w-[18px]" strokeWidth={1.5} />
                {wishlistItems.length > 0 && (
                  <span className="absolute top-1.5 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[9px] font-bold text-black">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>

              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2.5 text-muted-foreground/60 hover:text-foreground transition-colors"
                aria-label="Open cart"
              >
                <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.5} />
                {totalItems > 0 && (
                  <span className="absolute top-1.5 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[9px] font-bold text-black">
                    {totalItems}
                  </span>
                )}
              </button>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2.5 text-muted-foreground/60 hover:text-foreground transition-colors"
                aria-label="Menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-[18px] w-[18px]" strokeWidth={1.5} />
                ) : (
                  <Menu className="h-[18px] w-[18px]" strokeWidth={1.5} />
                )}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border/30"
            >
              <div className="px-5 py-5 space-y-0.5">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.href}
                    className={cn(
                      "block py-3 text-[15px] transition-colors border-b border-border/20 last:border-0",
                      location.pathname === link.href
                        ? "text-foreground font-medium"
                        : "text-muted-foreground/60 hover:text-foreground"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-sm"
            onClick={() => {
              setIsSearchOpen(false);
              setSearchQuery("");
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="mx-auto max-w-xl px-4 pt-28"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/40" strokeWidth={1.5} />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search for products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-14 pl-12 pr-16 bg-card border border-border/50 rounded-2xl text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-border text-[15px] transition-colors"
                />
                <kbd className="absolute right-4 top-1/2 -translate-y-1/2 hidden sm:inline-flex items-center gap-0.5 rounded-md border border-border/40 bg-muted/40 px-2 py-0.5 text-[11px] text-muted-foreground/50 font-mono">
                  ESC
                </kbd>
              </div>

              {searchResults.length > 0 && (
                <div className="mt-3 bg-card border border-border/40 rounded-2xl overflow-hidden shadow-xl shadow-black/10">
                  {searchResults.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => {
                        navigate(`/product/${product.id}`);
                        setIsSearchOpen(false);
                        setSearchQuery("");
                      }}
                      className="w-full flex items-center gap-4 p-4 hover:bg-muted/20 transition-colors text-left border-b border-border/15 last:border-0"
                    >
                      <div className="w-12 h-12 rounded-xl bg-muted/30 flex-shrink-0 overflow-hidden">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] text-muted-foreground/50 tracking-[0.15em] uppercase font-medium">
                          {product.brand}
                        </p>
                        <p className="text-[13px] font-medium text-foreground truncate">
                          {product.name}
                        </p>
                        <p className="text-[13px] text-muted-foreground/60">
                          ${product.price}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {searchQuery.length >= 2 && searchResults.length === 0 && (
                <div className="mt-3 bg-card border border-border/40 rounded-2xl p-10 text-center">
                  <p className="text-[14px] text-muted-foreground/60">
                    No products found for &ldquo;{searchQuery}&rdquo;
                  </p>
                </div>
              )}

              {searchQuery.length < 2 && (
                <div className="mt-3 bg-card border border-border/40 rounded-2xl p-5">
                  <p className="text-[10px] text-muted-foreground/50 uppercase tracking-[0.2em] font-medium mb-3">
                    Popular searches
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Hoodies", "Watches", "Bags", "Jackets", "Footwear"].map(
                      (term) => (
                        <button
                          key={term}
                          onClick={() => setSearchQuery(term)}
                          className="px-3.5 py-1.5 text-[12px] bg-muted/30 rounded-full text-muted-foreground/70 hover:text-foreground hover:bg-muted/50 transition-colors font-medium"
                        >
                          {term}
                        </button>
                      )
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
