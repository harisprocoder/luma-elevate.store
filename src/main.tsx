import { StrictMode, lazy, Suspense, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes, useLocation } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Toaster } from "@/components/ui/sonner";
import { CartProvider } from "@/contexts/CartContext";
import { WishlistProvider } from "@/contexts/WishlistContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { OrdersProvider } from "@/contexts/OrdersContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { prefersReducedMotion } from "@/lib/motion";
import "./index.css";

// Lazy load route components
const Home = lazy(() => import("./pages/Home.tsx"));
const Shop = lazy(() => import("./pages/Shop.tsx"));
const ProductDetail = lazy(() => import("./pages/ProductDetail.tsx"));
const Cart = lazy(() => import("./pages/Cart.tsx"));
const Wishlist = lazy(() => import("./pages/Wishlist.tsx"));
const Checkout = lazy(() => import("./pages/Checkout.tsx"));
const OrderSuccess = lazy(() => import("./pages/OrderSuccess.tsx"));
const Orders = lazy(() => import("./pages/Orders.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));

function RouteLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse text-muted-foreground/50 text-sm font-light tracking-wide">
        Loading...
      </div>
    </div>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const reduced = prefersReducedMotion();

/** Page transition wrapper — subtle fade + slide */
const pageVariants = {
  initial: {
    opacity: 0,
    y: reduced ? 0 : 8,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 1, 0.5, 1] as const,
    },
  },
  exit: {
    opacity: 0,
    y: reduced ? 0 : -8,
    transition: {
      duration: 0.2,
      ease: [0.65, 0, 0.35, 1] as const,
    },
  },
};

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="flex-1"
      >
        <Suspense fallback={<RouteLoading />}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-success/:id" element={<OrderSuccess />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
}

function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1">
        <AnimatedRoutes />
      </main>
      <Footer />
    </div>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <CartProvider>
        <WishlistProvider>
          <OrdersProvider>
            <BrowserRouter>
              <ScrollToTop />
              <AppLayout />
              <Toaster position="bottom-right" />
            </BrowserRouter>
          </OrdersProvider>
        </WishlistProvider>
      </CartProvider>
    </ThemeProvider>
  </StrictMode>
);
