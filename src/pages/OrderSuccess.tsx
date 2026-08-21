import { Link, useParams } from "react-router";
import { motion } from "framer-motion";
import { Package, ArrowRight } from "lucide-react";
import { useOrders } from "@/contexts/OrdersContext";
import {
  prefersReducedMotion,
  staggerContainer,
  staggerChild,
} from "@/lib/motion";

const reduced = prefersReducedMotion();

export default function OrderSuccess() {
  const { id } = useParams<{ id: string }>();
  const { orders } = useOrders();
  const order = orders.find((o) => o.id === id);

  return (
    <div className="min-h-screen pt-20 pb-20 flex items-center justify-center">
      <motion.div
        initial={reduced ? false : "hidden"}
        animate="visible"
        variants={staggerContainer(0.12)}
        className="max-w-md mx-auto text-center px-4"
      >
        {/* SVG Checkmark with stroke animation */}
        <motion.div
          variants={staggerChild}
          className="w-20 h-20 mx-auto mb-8"
        >
          <svg
            viewBox="0 0 80 80"
            className="w-full h-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.circle
              cx="40"
              cy="40"
              r="36"
              stroke="currentColor"
              strokeWidth="2"
              className="text-foreground"
              initial={reduced ? false : { pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={
                reduced
                  ? {}
                  : {
                      pathLength: {
                        duration: 0.6,
                        delay: 0.2,
                        ease: [0.25, 1, 0.5, 1],
                      },
                      opacity: { duration: 0.2 },
                    }
              }
            />
            <motion.path
              d="M24 40 L35 51 L56 30"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-foreground"
              initial={reduced ? false : { pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={
                reduced
                  ? {}
                  : {
                      pathLength: {
                        duration: 0.4,
                        delay: 0.6,
                        ease: [0.25, 1, 0.5, 1],
                      },
                      opacity: { duration: 0.1, delay: 0.6 },
                    }
              }
            />
          </svg>
        </motion.div>

        <motion.h1
          variants={staggerChild}
          className="text-3xl font-serif font-semibold text-foreground mb-3"
        >
          Order Confirmed!
        </motion.h1>

        <motion.p
          variants={staggerChild}
          className="text-[14px] text-muted-foreground/60 mb-2 font-light"
        >
          Thank you for your purchase.
        </motion.p>

        {order && (
          <motion.div
            variants={staggerChild}
            className="bg-card/50 border border-border/30 rounded-2xl p-6 my-8 text-left"
          >
            <div className="flex items-center gap-2.5 mb-4">
              <Package
                className="h-4 w-4 text-muted-foreground/50"
                strokeWidth={1.5}
              />
              <p className="text-[13px] text-foreground/90 font-medium">
                Order #{order.id}
              </p>
            </div>
            <p className="text-[13px] text-muted-foreground/60">
              Estimated delivery:{" "}
              <span className="text-foreground/80 font-medium">
                {order.estimatedDelivery}
              </span>
            </p>
            <div className="mt-4 pt-4 border-t border-border/30">
              <div className="flex justify-between text-[13px]">
                <span className="text-muted-foreground/60">Total</span>
                <span className="font-semibold text-foreground">
                  ${order.total.toFixed(2)}
                </span>
              </div>
            </div>
          </motion.div>
        )}

        <motion.div
          variants={staggerChild}
          className="flex flex-col gap-3 mt-6"
        >
          <Link
            to="/orders"
            className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 bg-foreground text-background text-[13px] font-semibold rounded-full hover:bg-foreground/90 active:scale-[0.98] transition-all duration-200 tracking-wide"
          >
            View My Orders
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/shop"
            className="text-[13px] text-muted-foreground/60 hover:text-foreground transition-colors py-2"
          >
            Continue Shopping
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
