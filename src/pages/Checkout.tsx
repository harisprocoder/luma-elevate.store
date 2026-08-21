import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronRight, Lock } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useOrders } from "@/contexts/OrdersContext";
import { cn } from "@/lib/utils";
import { prefersReducedMotion } from "@/lib/motion";

const reduced = prefersReducedMotion();

const steps = [
  { id: 1, label: "Information" },
  { id: 2, label: "Shipping" },
  { id: 3, label: "Payment" },
  { id: 4, label: "Review" },
];

/** Step content transition variants */
const stepVariants = {
  enter: (direction: number) => ({
    x: reduced ? 0 : direction > 0 ? 20 : -20,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: [0.25, 1, 0.5, 1] as const,
    },
  },
  exit: (direction: number) => ({
    x: reduced ? 0 : direction > 0 ? -20 : 20,
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: [0.65, 0, 0.35, 1] as const,
    },
  }),
};

export default function Checkout() {
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const { items, subtotal, shipping, total, clearCart } = useCart();
  const { addOrder } = useOrders();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    shippingMethod: "standard",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
    cardName: "",
  });

  const updateForm = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setDirection(1);
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setDirection(-1);
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const order = addOrder({ items, subtotal, shipping, total });
    clearCart();
    navigate(`/order-success/${order.id}`);
  };

  const inputClass =
    "w-full h-11 px-4 bg-background border border-border/50 rounded-xl text-[13px] text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-foreground/40 focus:ring-2 focus:ring-foreground/5 transition-all duration-200";

  return (
    <div className="min-h-screen pt-20 pb-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress */}
        <div className="mb-10">
          <div className="flex items-center justify-center gap-2 sm:gap-4">
            {steps.map((step, i) => (
              <div key={step.id} className="flex items-center">
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{
                      scale: currentStep === step.id ? 1.05 : 1,
                    }}
                    transition={{ duration: 0.2, ease: [0.25, 1, 0.5, 1] }}
                    className={cn(
                      "flex items-center justify-center w-8 h-8 rounded-full text-[11px] font-semibold transition-colors duration-200",
                      currentStep > step.id
                        ? "bg-foreground text-background"
                        : currentStep === step.id
                          ? "bg-foreground text-background"
                          : "bg-card/60 border border-border/40 text-muted-foreground/50"
                    )}
                  >
                    {currentStep > step.id ? (
                      <Check className="h-3.5 w-3.5" />
                    ) : (
                      step.id
                    )}
                  </motion.div>
                  <span
                    className={cn(
                      "text-[13px] hidden sm:block transition-colors duration-200",
                      currentStep >= step.id
                        ? "text-foreground font-medium"
                        : "text-muted-foreground/50"
                    )}
                  >
                    {step.label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <ChevronRight className="h-4 w-4 text-muted-foreground/20 mx-2 sm:mx-4" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentStep}
                custom={direction}
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                {currentStep === 1 && (
                  <div className="space-y-5">
                    <h2 className="text-xl font-serif font-semibold text-foreground">
                      Contact Information
                    </h2>
                    <input
                      type="email"
                      placeholder="Email address"
                      value={form.email}
                      onChange={(e) => updateForm("email", e.target.value)}
                      className={inputClass}
                    />
                    <h2 className="text-xl font-serif font-semibold text-foreground pt-2">
                      Shipping Address
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="First name"
                        value={form.firstName}
                        onChange={(e) =>
                          updateForm("firstName", e.target.value)
                        }
                        className={inputClass}
                      />
                      <input
                        type="text"
                        placeholder="Last name"
                        value={form.lastName}
                        onChange={(e) =>
                          updateForm("lastName", e.target.value)
                        }
                        className={inputClass}
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Address"
                      value={form.address}
                      onChange={(e) =>
                        updateForm("address", e.target.value)
                      }
                      className={inputClass}
                    />
                    <div className="grid grid-cols-3 gap-4">
                      <input
                        type="text"
                        placeholder="City"
                        value={form.city}
                        onChange={(e) => updateForm("city", e.target.value)}
                        className={inputClass}
                      />
                      <input
                        type="text"
                        placeholder="State"
                        value={form.state}
                        onChange={(e) =>
                          updateForm("state", e.target.value)
                        }
                        className={inputClass}
                      />
                      <input
                        type="text"
                        placeholder="ZIP"
                        value={form.zip}
                        onChange={(e) => updateForm("zip", e.target.value)}
                        className={inputClass}
                      />
                    </div>
                    <input
                      type="tel"
                      placeholder="Phone (optional)"
                      value={form.phone}
                      onChange={(e) => updateForm("phone", e.target.value)}
                      className={inputClass}
                    />
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-5">
                    <h2 className="text-xl font-serif font-semibold text-foreground">
                      Shipping Method
                    </h2>
                    {[
                      {
                        id: "standard",
                        label: "Standard Shipping",
                        time: "5–7 business days",
                        price: shipping === 0 ? "Free" : "$12.00",
                      },
                      {
                        id: "express",
                        label: "Express Shipping",
                        time: "2–3 business days",
                        price: "$18.00",
                      },
                      {
                        id: "overnight",
                        label: "Overnight Shipping",
                        time: "Next business day",
                        price: "$28.00",
                      },
                    ].map((method) => (
                      <label
                        key={method.id}
                        className={cn(
                          "flex items-center justify-between p-4 bg-card/50 border rounded-2xl cursor-pointer transition-all duration-200",
                          form.shippingMethod === method.id
                            ? "border-foreground/60"
                            : "border-border/30 hover:border-foreground/15"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={cn(
                              "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors duration-200",
                              form.shippingMethod === method.id
                                ? "border-foreground"
                                : "border-border/50"
                            )}
                          >
                            {form.shippingMethod === method.id && (
                              <motion.div
                                initial={reduced ? false : { scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{
                                  duration: 0.2,
                                  ease: [0.25, 1, 0.5, 1],
                                }}
                                className="w-2.5 h-2.5 rounded-full bg-foreground"
                              />
                            )}
                          </div>
                          <div>
                            <p className="text-[13px] font-medium text-foreground/90">
                              {method.label}
                            </p>
                            <p className="text-[11px] text-muted-foreground/50">
                              {method.time}
                            </p>
                          </div>
                        </div>
                        <span className="text-[13px] font-medium text-foreground/90">
                          {method.price}
                        </span>
                      </label>
                    ))}
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-5">
                    <div className="flex items-center gap-2 mb-2 p-3 bg-muted/20 rounded-xl">
                      <Lock className="h-3.5 w-3.5 text-muted-foreground/50" />
                      <p className="text-[11px] text-muted-foreground/60 font-medium">
                        Demo checkout — no real payment will be processed
                      </p>
                    </div>
                    <h2 className="text-xl font-serif font-semibold text-foreground">
                      Payment
                    </h2>
                    <input
                      type="text"
                      placeholder="Card number"
                      value={form.cardNumber}
                      onChange={(e) =>
                        updateForm("cardNumber", e.target.value)
                      }
                      className={inputClass}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="MM / YY"
                        value={form.cardExpiry}
                        onChange={(e) =>
                          updateForm("cardExpiry", e.target.value)
                        }
                        className={inputClass}
                      />
                      <input
                        type="text"
                        placeholder="CVC"
                        value={form.cardCvc}
                        onChange={(e) =>
                          updateForm("cardCvc", e.target.value)
                        }
                        className={inputClass}
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Name on card"
                      value={form.cardName}
                      onChange={(e) =>
                        updateForm("cardName", e.target.value)
                      }
                      className={inputClass}
                    />
                  </div>
                )}

                {currentStep === 4 && (
                  <div className="space-y-5">
                    <h2 className="text-xl font-serif font-semibold text-foreground">
                      Review Order
                    </h2>
                    <div className="bg-card/50 border border-border/30 rounded-2xl p-5 space-y-4">
                      <div>
                        <p className="text-[10px] text-muted-foreground/50 uppercase tracking-[0.15em] font-medium mb-1">
                          Shipping to
                        </p>
                        <p className="text-[13px] text-foreground/90">
                          {form.firstName} {form.lastName}
                        </p>
                        <p className="text-[13px] text-muted-foreground/60">
                          {form.address}, {form.city} {form.state}{" "}
                          {form.zip}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] text-muted-foreground/50 uppercase tracking-[0.15em] font-medium mb-1">
                          Payment
                        </p>
                        <p className="text-[13px] text-foreground/90">
                          •••• •••• ••••{" "}
                          {form.cardNumber.slice(-4) || "0000"}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {items.map((item) => (
                        <div
                          key={`${item.productId}-${item.color}-${item.size}`}
                          className="flex gap-3"
                        >
                          <div className="w-12 h-14 rounded-xl overflow-hidden bg-muted/30 flex-shrink-0">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <p className="text-[13px] font-medium text-foreground/90">
                              {item.name}
                            </p>
                            <p className="text-[11px] text-muted-foreground/50">
                              {item.color} / {item.size} ×{" "}
                              {item.quantity}
                            </p>
                          </div>
                          <span className="text-[13px] font-medium text-foreground/90">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-10 pt-6 border-t border-border/40">
              {currentStep > 1 ? (
                <button
                  onClick={handleBack}
                  className="text-[13px] text-muted-foreground/60 hover:text-foreground transition-colors"
                >
                  ← Back
                </button>
              ) : (
                <div />
              )}
              {currentStep < 4 ? (
                <motion.button
                  onClick={handleNext}
                  whileHover={reduced ? undefined : { scale: 1.01 }}
                  whileTap={reduced ? undefined : { scale: 0.98 }}
                  className="px-8 py-3 bg-foreground text-background text-[13px] font-semibold rounded-xl hover:bg-foreground/90 transition-colors tracking-wide"
                >
                  Continue
                </motion.button>
              ) : (
                <motion.button
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                  whileHover={reduced ? undefined : { scale: 1.01 }}
                  whileTap={reduced ? undefined : { scale: 0.98 }}
                  className="px-8 py-3 bg-foreground text-background text-[13px] font-semibold rounded-xl hover:bg-foreground/90 transition-colors disabled:opacity-50 tracking-wide"
                >
                  {isProcessing ? "Processing..." : "Place Order"}
                </motion.button>
              )}
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-2">
            <div className="sticky top-24 bg-card/50 border border-border/30 rounded-2xl p-6">
              <h3 className="text-[13px] font-semibold text-foreground mb-5">
                Order Summary ({items.length}{" "}
                {items.length === 1 ? "item" : "items"})
              </h3>
              <div className="space-y-3 mb-5 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div
                    key={`${item.productId}-${item.color}-${item.size}`}
                    className="flex gap-3"
                  >
                    <div className="w-14 h-16 rounded-xl overflow-hidden bg-muted/30 flex-shrink-0 relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-muted-foreground/70 text-[9px] font-semibold text-background">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-medium text-foreground/90 truncate">
                        {item.name}
                      </p>
                      <p className="text-[11px] text-muted-foreground/50">
                        {item.color} / {item.size}
                      </p>
                    </div>
                    <span className="text-[13px] font-medium text-foreground/90">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-border/40 pt-4 space-y-2.5">
                <div className="flex justify-between text-[13px]">
                  <span className="text-muted-foreground/60">Subtotal</span>
                  <span className="text-foreground/90">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-[13px]">
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
                <div className="flex justify-between text-[13px] font-semibold pt-2.5 border-t border-border/40">
                  <span className="text-foreground/90">Total</span>
                  <span className="text-foreground/90">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
