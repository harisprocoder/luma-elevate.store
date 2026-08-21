import { Link } from "react-router";
import { motion } from "framer-motion";
import { Package, ArrowRight } from "lucide-react";
import { useOrders } from "@/contexts/OrdersContext";
import { cn } from "@/lib/utils";

const statusColors: Record<string, string> = {
  confirmed: "bg-blue-500/10 text-blue-500 dark:text-blue-400",
  processing: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  shipped: "bg-purple-500/10 text-purple-500 dark:text-purple-400",
  delivered: "bg-green-500/10 text-green-600 dark:text-green-400",
};

export default function Orders() {
  const { orders } = useOrders();

  if (orders.length === 0) {
    return (
      <div className="min-h-screen pt-20 pb-20 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <Package className="h-16 w-16 text-muted-foreground/20 mx-auto mb-6" strokeWidth={1} />
          <h1 className="text-2xl font-serif font-semibold text-foreground mb-3">
            No orders yet
          </h1>
          <p className="text-[14px] text-muted-foreground/60 mb-8 font-light">
            When you place an order, it will appear here.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-foreground text-background text-[13px] font-semibold rounded-full hover:bg-foreground/90 transition-colors tracking-wide"
          >
            Start Shopping
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-serif font-semibold text-foreground mb-2 tracking-[-0.01em]">
          My Orders
        </h1>
        <p className="text-[13px] text-muted-foreground/60 mb-8">
          {orders.length} {orders.length === 1 ? "order" : "orders"}
        </p>

        <div className="space-y-3">
          {orders.map((order, i) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="bg-card/50 border border-border/30 rounded-2xl p-5"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-[13px] font-medium text-foreground/90">
                    Order #{order.id}
                  </p>
                  <p className="text-[11px] text-muted-foreground/50 mt-0.5 font-medium">
                    {new Date(order.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <span
                  className={cn(
                    "px-2.5 py-1 text-[10px] font-semibold rounded-lg capitalize tracking-wide",
                    statusColors[order.status] ||
                      "bg-muted text-muted-foreground"
                  )}
                >
                  {order.status}
                </span>
              </div>

              <div className="flex items-center gap-2.5 mb-4 overflow-x-auto pb-1">
                {order.items.slice(0, 4).map((item) => (
                  <div
                    key={`${item.productId}-${item.color}-${item.size}`}
                    className="w-12 h-12 rounded-xl overflow-hidden bg-muted/30 flex-shrink-0"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
                {order.items.length > 4 && (
                  <div className="w-12 h-12 rounded-xl bg-muted/30 flex-shrink-0 flex items-center justify-center">
                    <span className="text-[11px] text-muted-foreground/60 font-medium">
                      +{order.items.length - 4}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-3.5 border-t border-border/30">
                <div className="text-[12px] text-muted-foreground/50 font-medium">
                  {order.items.length}{" "}
                  {order.items.length === 1 ? "item" : "items"}
                  {order.estimatedDelivery && (
                    <span className="ml-1.5">
                      • Est. {order.estimatedDelivery}
                    </span>
                  )}
                </div>
                <span className="text-[13px] font-semibold text-foreground">
                  ${order.total.toFixed(2)}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
