import { Link } from "react-router";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-7xl font-serif font-bold text-foreground mb-4 tracking-[-0.03em]">
          404
        </h1>
        <p className="text-lg text-muted-foreground/60 mb-8 font-light">
          Page not found
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-foreground text-background text-[13px] font-semibold rounded-full hover:bg-foreground/90 transition-colors tracking-wide"
        >
          Return Home
          <ArrowRight className="h-4 w-4" />
        </Link>
      </motion.div>
    </div>
  );
}
