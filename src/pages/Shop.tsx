import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  SlidersHorizontal,
  X,
  ChevronDown,
  Search,
} from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { products, categories } from "@/data/products";
import { cn } from "@/lib/utils";

const allSizes = [
  "XS", "S", "M", "L", "XL", "XXL", "7", "8", "9", "10", "11", "12",
];
const allColors = [
  { name: "Black", hex: "#1A1A1A" },
  { name: "White", hex: "#F5F0EB" },
  { name: "Navy", hex: "#1B2A4A" },
  { name: "Grey", hex: "#8A8A8A" },
  { name: "Olive", hex: "#4A5A40" },
  { name: "Sand", hex: "#C4B896" },
  { name: "Brown", hex: "#8B5E3C" },
  { name: "Green", hex: "#2D4A3E" },
];

const priceRanges = [
  { label: "Under $50", min: 0, max: 50 },
  { label: "$50 – $100", min: 50, max: 100 },
  { label: "$100 – $200", min: 100, max: 200 },
  { label: "$200 – $300", min: 200, max: 300 },
  { label: "Over $300", min: 300, max: Infinity },
];

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sort, setSort] = useState("featured");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    () => searchParams.get("category")?.split(",") || []
  );
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<{
    min: number;
    max: number;
  } | null>(null);
  const [minRating, setMinRating] = useState(0);

  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) {
      setSelectedCategories(cat.split(","));
    }
  }, [searchParams]);

  const toggleCategory = (slug: string) => {
    setSelectedCategories((prev) =>
      prev.includes(slug)
        ? prev.filter((c) => c !== slug)
        : [...prev, slug]
    );
  };

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size)
        ? prev.filter((s) => s !== size)
        : [...prev, size]
    );
  };

  const toggleColor = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color)
        ? prev.filter((c) => c !== color)
        : [...prev, color]
    );
  };

  const activeFiltersCount =
    selectedCategories.length +
    selectedSizes.length +
    selectedColors.length +
    (selectedPriceRange ? 1 : 0) +
    (minRating > 0 ? 1 : 0);

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setSelectedPriceRange(null);
    setMinRating(0);
    setSearchQuery("");
    setSearchParams({});
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    if (selectedCategories.includes("new-arrivals")) {
      result = result.filter((p) => p.isNew);
    } else if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category));
    }

    if (selectedSizes.length > 0) {
      result = result.filter((p) =>
        p.sizes.some((s) => selectedSizes.includes(s))
      );
    }

    if (selectedColors.length > 0) {
      result = result.filter((p) =>
        p.colors.some((c) => selectedColors.includes(c.name))
      );
    }

    if (selectedPriceRange) {
      result = result.filter(
        (p) =>
          p.price >= selectedPriceRange.min &&
          p.price < selectedPriceRange.max
      );
    }

    if (minRating > 0) {
      result = result.filter((p) => p.rating >= minRating);
    }

    switch (sort) {
      case "newest":
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
    }

    return result;
  }, [
    searchQuery,
    selectedCategories,
    selectedSizes,
    selectedColors,
    selectedPriceRange,
    minRating,
    sort,
  ]);

  const FilterSection = ({
    title,
    children,
    defaultOpen = true,
  }: {
    title: string;
    children: React.ReactNode;
    defaultOpen?: boolean;
  }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    return (
      <div className="border-b border-border/40 py-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between text-[13px] font-medium text-foreground/90"
        >
          {title}
          <ChevronDown
            className={cn(
              "h-3.5 w-3.5 text-muted-foreground/50 transition-transform duration-200",
              isOpen && "rotate-180"
            )}
          />
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="pt-3">{children}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className="min-h-screen pt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-semibold text-foreground mb-2 tracking-[-0.01em]">
            {selectedCategories.includes("new-arrivals")
              ? "New Arrivals"
              : selectedCategories.length === 1
                ? categories.find(
                    (c) => c.slug === selectedCategories[0]
                  )?.name || "Shop"
                : "Shop"}
          </h1>
          <p className="text-[13px] text-muted-foreground/70">
            {filteredProducts.length}{" "}
            {filteredProducts.length === 1 ? "product" : "products"}
          </p>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-60 flex-shrink-0">
            <div className="sticky top-24">
              {/* Search */}
              <div className="relative mb-5">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/50" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-10 pl-9 pr-4 bg-card/60 border border-border/40 rounded-xl text-[13px] text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-border/60 transition-colors"
                />
              </div>

              <FilterSection title="Category">
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <label
                      key={cat.id}
                      className="flex items-center gap-2.5 cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat.slug)}
                        onChange={() => toggleCategory(cat.slug)}
                        className="w-4 h-4 rounded border-border/60 bg-card text-foreground focus:ring-ring/20"
                      />
                      <span className="text-[13px] text-muted-foreground/70 group-hover:text-foreground/80 transition-colors">
                        {cat.name}
                      </span>
                      <span className="text-[11px] text-muted-foreground/40 ml-auto">
                        {cat.productCount}
                      </span>
                    </label>
                  ))}
                </div>
              </FilterSection>

              <FilterSection title="Price">
                <div className="space-y-2">
                  {priceRanges.map((range) => (
                    <label
                      key={range.label}
                      className="flex items-center gap-2.5 cursor-pointer group"
                    >
                      <input
                        type="radio"
                        name="price"
                        checked={
                          selectedPriceRange?.min === range.min &&
                          selectedPriceRange?.max === range.max
                        }
                        onChange={() =>
                          setSelectedPriceRange({
                            min: range.min,
                            max: range.max,
                          })
                        }
                        className="w-4 h-4 border-border/60 bg-card text-foreground focus:ring-ring/20"
                      />
                      <span className="text-[13px] text-muted-foreground/70 group-hover:text-foreground/80 transition-colors">
                        {range.label}
                      </span>
                    </label>
                  ))}
                </div>
              </FilterSection>

              <FilterSection title="Size">
                <div className="flex flex-wrap gap-1.5">
                  {allSizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => toggleSize(size)}
                      className={cn(
                        "px-3 py-1.5 text-[11px] rounded-lg border transition-all duration-200 font-medium",
                        selectedSizes.includes(size)
                          ? "bg-foreground text-background border-foreground"
                          : "bg-card/60 text-muted-foreground/70 border-border/40 hover:border-foreground/20"
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </FilterSection>

              <FilterSection title="Color">
                <div className="flex flex-wrap gap-2">
                  {allColors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => toggleColor(color.name)}
                      className={cn(
                        "w-7 h-7 rounded-full border-2 transition-all duration-200",
                        selectedColors.includes(color.name)
                          ? "border-foreground scale-110 shadow-sm"
                          : "border-border/40 hover:border-foreground/25"
                      )}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
              </FilterSection>

              <FilterSection title="Rating">
                <div className="space-y-2">
                  {[4, 3, 2].map((rating) => (
                    <label
                      key={rating}
                      className="flex items-center gap-2.5 cursor-pointer group"
                    >
                      <input
                        type="radio"
                        name="rating"
                        checked={minRating === rating}
                        onChange={() =>
                          setMinRating(minRating === rating ? 0 : rating)
                        }
                        className="w-4 h-4 border-border/60 bg-card text-foreground focus:ring-ring/20"
                      />
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <svg
                            key={i}
                            className={cn(
                              "h-3 w-3",
                              i < rating
                                ? "text-amber-400 fill-amber-400"
                                : "text-muted-foreground/20"
                            )}
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="text-[11px] text-muted-foreground/50 ml-1">
                          & Up
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
              </FilterSection>

              {activeFiltersCount > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="mt-4 w-full py-2.5 text-[13px] text-muted-foreground/60 hover:text-foreground transition-colors border border-border/30 rounded-xl hover:bg-muted/20"
                >
                  Clear all filters
                </button>
              )}
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between gap-4 mb-6 pb-5 border-b border-border/40">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <button
                  onClick={() => setIsFilterOpen(true)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 bg-card/60 border border-border/40 rounded-xl text-[13px] text-foreground/80 hover:bg-muted/30 transition-colors flex-shrink-0"
                >
                  <SlidersHorizontal className="h-3.5 w-3.5" />
                  Filters
                  {activeFiltersCount > 0 && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-foreground text-background text-[9px] font-semibold">
                      {activeFiltersCount}
                    </span>
                  )}
                </button>

                {/* Active filter chips */}
                <div className="hidden sm:flex items-center gap-1.5 flex-wrap">
                  {selectedCategories.map((cat) => (
                    <span
                      key={cat}
                      className="inline-flex items-center gap-1 px-2.5 py-1 bg-card/60 border border-border/40 rounded-full text-[11px] text-muted-foreground/70 font-medium"
                    >
                      {categories.find((c) => c.slug === cat)?.name || cat}
                      <button onClick={() => toggleCategory(cat)}>
                        <X className="h-3 w-3 opacity-50" />
                      </button>
                    </span>
                  ))}
                  {selectedSizes.map((size) => (
                    <span
                      key={size}
                      className="inline-flex items-center gap-1 px-2.5 py-1 bg-card/60 border border-border/40 rounded-full text-[11px] text-muted-foreground/70 font-medium"
                    >
                      {size}
                      <button onClick={() => toggleSize(size)}>
                        <X className="h-3 w-3 opacity-50" />
                      </button>
                    </span>
                  ))}
                  {selectedColors.map((color) => (
                    <span
                      key={color}
                      className="inline-flex items-center gap-1 px-2.5 py-1 bg-card/60 border border-border/40 rounded-full text-[11px] text-muted-foreground/70 font-medium"
                    >
                      {color}
                      <button onClick={() => toggleColor(color)}>
                        <X className="h-3 w-3 opacity-50" />
                      </button>
                    </span>
                  ))}
                  {selectedPriceRange && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-card/60 border border-border/40 rounded-full text-[11px] text-muted-foreground/70 font-medium">
                      ${selectedPriceRange.min}–$
                      {selectedPriceRange.max === Infinity
                        ? "∞"
                        : selectedPriceRange.max}
                      <button onClick={() => setSelectedPriceRange(null)}>
                        <X className="h-3 w-3 opacity-50" />
                      </button>
                    </span>
                  )}
                  {activeFiltersCount > 1 && (
                    <button
                      onClick={clearAllFilters}
                      className="text-[11px] text-muted-foreground/60 hover:text-foreground transition-colors font-medium"
                    >
                      Clear all
                    </button>
                  )}
                </div>
              </div>

              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="h-9 px-3 bg-card/60 border border-border/40 rounded-xl text-[13px] text-foreground/80 focus:outline-none focus:border-border/60 flex-shrink-0"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Product Grid */}
            {filteredProducts.length > 0 ? (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  visible: { transition: { staggerChildren: 0.04 } },
                }}
                className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-5"
              >
                {filteredProducts.map((product) => (
                  <motion.div key={product.id} variants={fadeUp}>
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="py-24 text-center">
                <p className="text-[15px] text-muted-foreground/60 mb-5">
                  No products found
                </p>
                <button
                  onClick={clearAllFilters}
                  className="text-[13px] text-foreground underline underline-offset-4 hover:no-underline font-medium"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              onClick={() => setIsFilterOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="absolute inset-y-0 left-0 w-80 max-w-full bg-background border-r border-border/40 overflow-y-auto"
            >
              <div className="sticky top-0 bg-background/95 backdrop-blur-xl border-b border-border/40 px-5 py-4 flex items-center justify-between">
                <h3 className="text-[15px] font-semibold text-foreground">
                  Filters
                </h3>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="p-1.5 text-muted-foreground/60 hover:text-foreground"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="px-5 pb-20">
                <FilterSection title="Category">
                  <div className="space-y-2">
                    {categories.map((cat) => (
                      <label
                        key={cat.id}
                        className="flex items-center gap-2.5 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(cat.slug)}
                          onChange={() => toggleCategory(cat.slug)}
                          className="w-4 h-4 rounded border-border/60 bg-card text-foreground"
                        />
                        <span className="text-[13px] text-muted-foreground/70">
                          {cat.name}
                        </span>
                      </label>
                    ))}
                  </div>
                </FilterSection>

                <FilterSection title="Price">
                  <div className="space-y-2">
                    {priceRanges.map((range) => (
                      <label
                        key={range.label}
                        className="flex items-center gap-2.5 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="price-mobile"
                          checked={selectedPriceRange?.min === range.min}
                          onChange={() =>
                            setSelectedPriceRange({
                              min: range.min,
                              max: range.max,
                            })
                          }
                          className="w-4 h-4 border-border/60 bg-card text-foreground"
                        />
                        <span className="text-[13px] text-muted-foreground/70">
                          {range.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </FilterSection>

                <FilterSection title="Size">
                  <div className="flex flex-wrap gap-1.5">
                    {allSizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => toggleSize(size)}
                        className={cn(
                          "px-3 py-1.5 text-[11px] rounded-lg border transition-colors font-medium",
                          selectedSizes.includes(size)
                            ? "bg-foreground text-background border-foreground"
                            : "bg-card/60 text-muted-foreground/70 border-border/40"
                        )}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </FilterSection>

                <FilterSection title="Color">
                  <div className="flex flex-wrap gap-2">
                    {allColors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => toggleColor(color.name)}
                        className={cn(
                          "w-7 h-7 rounded-full border-2 transition-all",
                          selectedColors.includes(color.name)
                            ? "border-foreground scale-110"
                            : "border-border/40"
                        )}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      />
                    ))}
                  </div>
                </FilterSection>
              </div>

              <div className="sticky bottom-0 bg-background/95 backdrop-blur-xl border-t border-border/40 px-5 py-4 flex gap-3">
                <button
                  onClick={clearAllFilters}
                  className="flex-1 py-2.5 text-[13px] text-muted-foreground/70 border border-border/40 rounded-xl hover:bg-muted/20 transition-colors"
                >
                  Clear all
                </button>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="flex-1 py-2.5 text-[13px] font-semibold text-background bg-foreground rounded-xl hover:bg-foreground/90 transition-colors"
                >
                  Show {filteredProducts.length} results
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
