import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ArrowRight, Truck, ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { cn } from "@/lib/utils";
import {
  prefersReducedMotion,
  drawerSlide,
  backdropFade,
  cartItemStagger,
  cartItemChild,
} from "@/lib/motion";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const reduced = prefersReducedMotion();

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const {
    items,
    removeItem,
    updateQuantity,
    subtotal,
    shipping,
    total,
    freeShippingThreshold,
    shippingProgress,
    totalItems,
  } = useCart();

  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0 : 0.15 }}
          className="fixed inset-0 z-[70]"
        >
          {/* Backdrop */}
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={backdropFade}
            className="absolute inset-0 bg-background/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={drawerSlide}
            className="absolute inset-y-0 right-0 w-full max-w-md bg-background border-l border-border/40 shadow-2xl shadow-black/30 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border/40">
              <div className="flex items-center gap-2.5">
                <ShoppingBag
                  className="h-4 w-4 text-muted-foreground/60"
                  strokeWidth={1.5}
                />
                <h2 className="text-[15px] font-semibold text-foreground">
                  Your Cart
                </h2>
                {totalItems > 0 && (
                  <span className="text-[12px] text-muted-foreground/50 font-medium">
                    ({totalItems} {totalItems === 1 ? "item" : "items"})
                  </span>
                )}
              </div>
              <motion.button
                onClick={onClose}
                whileHover={reduced ? undefined : { scale: 1.05 }}
                whileTap={reduced ? undefined : { scale: 0.95 }}
                className="p-1.5 text-muted-foreground/50 hover:text-foreground transition-colors rounded-lg hover:bg-muted/30"
                aria-label="Close cart"
              >
                <X className="h-5 w-5" />
              </motion.button>
            </div>

            {/* Content */}
            {items.length === 0 ? (
              <div className="flex-1 flex items-center justify-center px-6">
                <motion.div
                  initial={reduced ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.15 }}
                  className="text-center"
                >
                  <ShoppingBag
                    className="h-14 w-14 text-muted-foreground/15 mx-auto mb-5"
                    strokeWidth={1}
                  />
                  <p className="text-[15px] font-medium text-foreground/80 mb-2">
                    Your bag is empty
                  </p>
                  <p className="text-[13px] text-muted-foreground/50 mb-6 font-light">
                    Start adding items to your bag.
                  </p>
                  <button
                    onClick={onClose}
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-foreground text-background text-[13px] font-semibold rounded-full hover:bg-foreground/90 active:scale-[0.98] transition-all duration-200"
                  >
                    Continue Shopping
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </motion.div>
              </div>
            ) : (
              <>
                {/* Free Shipping Progress */}
                {amountToFreeShipping > 0 && (
                  <div className="px-6 py-3.5 border-b border-border/30">
                    <div className="flex items-center gap-2 mb-2">
                      <Truck
                        className="h-3.5 w-3.5 text-muted-foreground/50"
                        strokeWidth={1.5}
                      />
                      <p className="text-[12px] text-foreground/70">
                        <span className="font-semibold">
                          ${amountToFreeShipping.toFixed(2)}
                        </span>{" "}
                        away from free shipping
                      </p>
                    </div>
                    <div className="h-1 bg-muted/30 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-foreground rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${shippingProgress * 100}%` }}
                        transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                      />
                    </div>
                  </div>
                )}

                {/* Items — staggered entrance */}
                <div className="flex-1 overflow-y-auto px-6 py-4">
                  <motion.div
                    variants={cartItemStagger}
                    initial="hidden"
                    animate="visible"
                    className="space-y-4"
                  >
                    {items.map((item) => (
                      <motion.div
                        key={`${item.productId}-${item.color}-${item.size}`}
                        variants={cartItemChild}
                        layout
                        className="flex gap-3.5"
                      >
                        <Link
                          to={`/product/${item.productId}`}
                          onClick={onClose}
                          className="w-16 h-20 rounded-xl overflow-hidden bg-muted/20 flex-shrink-0 border border-border/20"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </Link>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="text-[10px] text-muted-foreground/45 uppercase tracking-[0.15em] font-medium">
                                {item.brand}
                              </p>
                              <Link
                                to={`/product/${item.productId}`}
                                onClick={onClose}
                                className="text-[13px] font-medium text-foreground/90 hover:text-foreground transition-colors leading-snug block"
                              >
                                {item.name}
                              </Link>
                            </div>
                            <button
                              onClick={() =>
                                removeItem(
                                  item.productId,
                                  item.color,
                                  item.size
                                )
                              }
                              className="p-1 text-muted-foreground/35 hover:text-foreground transition-colors flex-shrink-0"
                              aria-label="Remove item"
                            >
                              <X className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <p className="text-[11px] text-muted-foreground/45 mt-0.5 font-medium">
                            {item.color} / {item.size}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <div className="inline-flex items-center border border-border/40 rounded-lg">
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item.productId,
                                    item.color,
                                    item.size,
                                    item.quantity - 1
                                  )
                                }
                                className="p-1.5 text-muted-foreground/45 hover:text-foreground transition-colors active:scale-95"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="w-7 text-center text-[12px] font-medium text-foreground">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item.productId,
                                    item.color,
                                    item.size,
                                    item.quantity + 1
                                  )
                                }
                                className="p-1.5 text-muted-foreground/45 hover:text-foreground transition-colors active:scale-95"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                            <span className="text-[13px] font-semibold text-foreground">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>

                {/* Footer */}
                <div className="border-t border-border/40 px-6 py-5">
                  {/* Summary */}
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-[13px]">
                      <span className="text-muted-foreground/60">
                        Subtotal
                      </span>
                      <span className="text-foreground/90">
                        ${subtotal.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-[13px]">
                      <span className="text-muted-foreground/60">
                        Shipping
                      </span>
                      <span
                        className={cn(
                          "text-foreground/90",
                          shipping === 0 &&
                            "text-green-600 dark:text-green-400 font-medium"
                        )}
                      >
                        {shipping === 0
                          ? "Free"
                          : `$${shipping.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="border-t border-border/30 pt-2 flex justify-between">
                      <span className="text-[13px] font-medium text-foreground/90">
                        Total
                      </span>
                      <span className="text-[15px] font-semibold text-foreground">
                        ${total.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <Link
                    to="/checkout"
                    onClick={onClose}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-foreground text-background text-[13px] font-semibold rounded-xl hover:bg-foreground/90 active:scale-[0.98] transition-all duration-200 mb-2.5 tracking-wide"
                  >
                    Proceed to Checkout
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <button
                    onClick={onClose}
                    className="w-full text-center py-2.5 text-[13px] text-muted-foreground/60 hover:text-foreground transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
