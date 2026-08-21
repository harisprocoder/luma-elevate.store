import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, X, ArrowRight, Truck, ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { cn } from "@/lib/utils";

export default function Cart() {
  const {
    items,
    removeItem,
    updateQuantity,
    subtotal,
    shipping,
    total,
    freeShippingThreshold,
    shippingProgress,
  } = useCart();

  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-20 pb-20 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <ShoppingBag className="h-16 w-16 text-muted-foreground/20 mx-auto mb-6" strokeWidth={1} />
          <h1 className="text-2xl font-serif font-semibold text-foreground mb-3">
            Your bag is empty
          </h1>
          <p className="text-[14px] text-muted-foreground/60 mb-8 font-light">
            Start adding items to your bag.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-foreground text-background text-[13px] font-semibold rounded-full hover:bg-foreground/90 transition-colors tracking-wide"
          >
            Continue Shopping
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-serif font-semibold text-foreground mb-8 tracking-[-0.01em]">
          Shopping Bag
        </h1>

        {/* Free Shipping Progress */}
        {amountToFreeShipping > 0 && (
          <div className="mb-8 p-4 bg-card/60 border border-border/40 rounded-2xl">
            <div className="flex items-center gap-2.5 mb-2.5">
              <Truck className="h-4 w-4 text-muted-foreground/50" strokeWidth={1.5} />
              <p className="text-[13px] text-foreground/80">
                <span className="font-semibold">${amountToFreeShipping.toFixed(2)}</span>{" "}
                away from free shipping
              </p>
            </div>
            <div className="h-1.5 bg-muted/40 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-foreground rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${shippingProgress * 100}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-3">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={`${item.productId}-${item.color}-${item.size}`}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -80 }}
                  className="flex gap-4 p-4 bg-card/50 border border-border/30 rounded-2xl"
                >
                  <Link
                    to={`/product/${item.productId}`}
                    className="w-20 h-24 rounded-xl overflow-hidden bg-muted/30 flex-shrink-0"
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
                        <p className="text-[10px] text-muted-foreground/50 uppercase tracking-[0.15em] font-medium">
                          {item.brand}
                        </p>
                        <Link
                          to={`/product/${item.productId}`}
                          className="text-[13px] font-medium text-foreground/90 hover:text-foreground transition-colors"
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
                        className="p-1 text-muted-foreground/40 hover:text-foreground transition-colors"
                        aria-label="Remove item"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="text-[11px] text-muted-foreground/50 mt-1 font-medium">
                      {item.color} / {item.size}
                    </p>
                    <div className="flex items-center justify-between mt-3">
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
                          className="p-1.5 text-muted-foreground/50 hover:text-foreground transition-colors"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-8 text-center text-[12px] font-medium text-foreground">
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
                          className="p-1.5 text-muted-foreground/50 hover:text-foreground transition-colors"
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
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-card/50 border border-border/30 rounded-2xl p-6">
              <h2 className="text-[15px] font-semibold text-foreground mb-5">
                Order Summary
              </h2>
              <div className="space-y-3 mb-5">
                <div className="flex items-center justify-between text-[13px]">
                  <span className="text-muted-foreground/60">Subtotal</span>
                  <span className="text-foreground/90">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[13px]">
                  <span className="text-muted-foreground/60">Shipping</span>
                  <span
                    className={cn(
                      "text-foreground/90",
                      shipping === 0 && "text-green-600 dark:text-green-400"
                    )}
                  >
                    {shipping === 0
                      ? "Free"
                      : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="border-t border-border/40 pt-3 flex items-center justify-between">
                  <span className="text-[13px] font-medium text-foreground/90">
                    Total
                  </span>
                  <span className="text-lg font-semibold text-foreground">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              <Link
                to="/checkout"
                className="w-full flex items-center justify-center gap-2.5 py-3 bg-foreground text-background text-[13px] font-semibold rounded-xl hover:bg-foreground/90 transition-colors mb-3 tracking-wide"
              >
                Proceed to Checkout
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/shop"
                className="w-full block text-center py-3 text-[13px] text-muted-foreground/60 hover:text-foreground transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
