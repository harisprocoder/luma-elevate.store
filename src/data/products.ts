import {
  sneakerImage,
  hoodieImage,
  tshirtImage,
  watchImage,
  bagImage,
  glassesImage,
  jacketImage,
  createCategoryImage,
} from "@/lib/productImages";

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  category: string;
  subcategory?: string;
  description: string;
  features: string[];
  colors: { name: string; hex: string }[];
  sizes: string[];
  rating: number;
  reviewCount: number;
  badge?: "new" | "sale" | "bestseller" | "limited";
  images: string[];
  inStock: boolean;
  isNew?: boolean;
  isBestseller?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  productCount: number;
}



// ─── Category Images ───────────────────────────────────────────────────────

export const categories: Category[] = [
  {
    id: "footwear",
    name: "Footwear",
    slug: "footwear",
    image: createCategoryImage("#252220", "#352f2a", "#D4A574", "👟", "5 ITEMS"),
    productCount: 5,
  },
  {
    id: "hoodies",
    name: "Hoodies",
    slug: "hoodies",
    image: createCategoryImage("#1e2225", "#2a2f33", "#A8B4C0", "🧥", "4 ITEMS"),
    productCount: 4,
  },
  {
    id: "t-shirts",
    name: "T-Shirts",
    slug: "t-shirts",
    image: createCategoryImage("#22201e", "#302c28", "#D4C5A9", "👕", "5 ITEMS"),
    productCount: 5,
  },
  {
    id: "jackets",
    name: "Jackets",
    slug: "jackets",
    image: createCategoryImage("#1c1e20", "#282c2e", "#B8C4D0", "🧥", "4 ITEMS"),
    productCount: 4,
  },
  {
    id: "bags",
    name: "Bags",
    slug: "bags",
    image: createCategoryImage("#201c1a", "#2e2826", "#C8A882", "👜", "4 ITEMS"),
    productCount: 4,
  },
  {
    id: "watches",
    name: "Watches",
    slug: "watches",
    image: createCategoryImage("#1a1c1e", "#262828", "#C0B8A8", "⌚", "4 ITEMS"),
    productCount: 4,
  },
  {
    id: "accessories",
    name: "Accessories",
    slug: "accessories",
    image: createCategoryImage("#1e1c20", "#2a282c", "#B0A898", "🕶", "3 ITEMS"),
    productCount: 3,
  },
];

// ─── Products ──────────────────────────────────────────────────────────────

export const products: Product[] = [
  {
    id: "luma-ess-tee-01",
    name: "Essential Crew Tee",
    brand: "LUMA",
    price: 48,
    category: "t-shirts",
    description:
      "Crafted from 100% organic Supima cotton with a relaxed, modern fit. Pre-washed for a lived-in softness from the first wear. A wardrobe essential refined to its purest form.",
    features: [
      "100% Organic Supima Cotton",
      "Relaxed Modern Fit",
      "Pre-washed for Softness",
      "Reinforced Collar",
      "Side-seamed Construction",
    ],
    colors: [
      { name: "Ivory", hex: "#F5F0EB" },
      { name: "Charcoal", hex: "#3A3A3A" },
      { name: "Navy", hex: "#1B2A4A" },
      { name: "Sage", hex: "#8B9A7D" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.8,
    reviewCount: 247,
    badge: "bestseller",
    images: [tshirtImage("#3a3530", "#4a4540", "#f0ebe0"), tshirtImage("#44403a", "#54504a", "#e8e0d0")],
    inStock: true,
    isBestseller: true,
  },
  {
    id: "luma-stride-01",
    name: "Stride Minimal Runner",
    brand: "LUMA",
    price: 165,
    originalPrice: 195,
    category: "footwear",
    description:
      "Engineered with a lightweight EVA midsole and premium suede upper. The silhouette balances athletic performance with refined aesthetics.",
    features: [
      "Premium Suede Upper",
      "Lightweight EVA Midsole",
      "Memory Foam Insole",
      "Rubber Outsole",
      "Breathable Lining",
    ],
    colors: [
      { name: "Stone", hex: "#C4B896" },
      { name: "Onyx", hex: "#2A2A2A" },
      { name: "Cloud", hex: "#E8E4DF" },
    ],
    sizes: ["7", "8", "9", "10", "11", "12"],
    rating: 4.7,
    reviewCount: 183,
    badge: "sale",
    images: [sneakerImage("#35302a", "#45403a", "#d4c5a9"), sneakerImage("#3e3832", "#4e4842", "#c4b896")],
    inStock: true,
  },
  {
    id: "luma-chronos-01",
    name: "Chronos Automatic",
    brand: "LUMA",
    price: 340,
    category: "watches",
    description:
      "Japanese automatic movement housed in a 40mm brushed titanium case. Sapphire crystal glass with exhibition caseback. Water-resistant to 50 meters.",
    features: [
      "Japanese Automatic Movement",
      "Brushed Titanium Case",
      "Sapphire Crystal Glass",
      "50m Water Resistant",
      "Italian Leather Strap",
    ],
    colors: [
      { name: "Titanium", hex: "#A8A8A8" },
      { name: "Black", hex: "#1A1A1A" },
      { name: "Gold", hex: "#C9A96E" },
    ],
    sizes: ["40mm", "42mm"],
    rating: 4.9,
    reviewCount: 92,
    badge: "limited",
    images: [watchImage("#2a2c30", "#3a3c40", "#c0b8a8"), watchImage("#33353a", "#43454a", "#c9a96e")],
    inStock: true,
  },
  {
    id: "luma-arc-tote-01",
    name: "Arc Leather Tote",
    brand: "LUMA",
    price: 225,
    category: "bags",
    description:
      "Full-grain vegetable-tanned leather with a structured silhouette. Interior features a zip pocket and two slip pockets. Hand-stitched handles.",
    features: [
      "Full-Grain Vegetable-Tanned Leather",
      "Structured Silhouette",
      "Interior Zip Pocket",
      "Hand-Stitched Handles",
      "Cotton Canvas Lining",
    ],
    colors: [
      { name: "Cognac", hex: "#8B5E3C" },
      { name: "Noir", hex: "#1A1A1A" },
      { name: "Dune", hex: "#C4B896" },
    ],
    sizes: ["One Size"],
    rating: 4.8,
    reviewCount: 156,
    badge: "bestseller",
    images: [bagImage("#302820", "#403830", "#c8a882"), bagImage("#3a3228", "#4a4238", "#d4c5a9")],
    inStock: true,
    isBestseller: true,
  },
  {
    id: "luma-onyx-sunglass-01",
    name: "Onyx Aviator",
    brand: "LUMA",
    price: 145,
    category: "accessories",
    description:
      "Hand-polished acetate frames with polarized CR-39 lenses. UV400 protection with anti-reflective coating. Comes with a leather case.",
    features: [
      "Hand-Polished Acetate",
      "Polarized CR-39 Lenses",
      "UV400 Protection",
      "Anti-Reflective Coating",
      "Leather Case Included",
    ],
    colors: [
      { name: "Onyx", hex: "#1A1A1A" },
      { name: "Tortoise", hex: "#6B4423" },
      { name: "Crystal", hex: "#D4D0CB" },
    ],
    sizes: ["One Size"],
    rating: 4.6,
    reviewCount: 214,
    images: [glassesImage("#28262a", "#38363c", "#b0a898"), glassesImage("#302e34", "#403e44", "#c8c0b0")],
    inStock: true,
  },
  {
    id: "luma-drift-hoodie-01",
    name: "Drift French Terry Hoodie",
    brand: "LUMA",
    price: 128,
    category: "hoodies",
    description:
      "Heavyweight 400gsm French terry with a brushed interior. Dropped shoulders, kangaroo pocket, and a refined silhouette that layers effortlessly.",
    features: [
      "400gsm French Terry",
      "Brushed Interior",
      "Dropped Shoulders",
      "Kangaroo Pocket",
      "Ribbed Cuffs & Hem",
    ],
    colors: [
      { name: "Heather Grey", hex: "#9A9A9A" },
      { name: "Washed Black", hex: "#2A2A2A" },
      { name: "Sand", hex: "#C4B896" },
      { name: "Forest", hex: "#2D4A3E" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.9,
    reviewCount: 312,
    badge: "bestseller",
    images: [hoodieImage("#2a2e33", "#3a3e43", "#a8b4c0"), hoodieImage("#333740", "#434750", "#b8c4d0")],
    inStock: true,
    isNew: true,
    isBestseller: true,
  },
  {
    id: "luma-shell-jacket-01",
    name: "Shell Tech Jacket",
    brand: "LUMA",
    price: 275,
    category: "jackets",
    description:
      "Waterproof 3-layer construction with seam-sealed seams. Lightweight yet protective, with a minimal design that transitions from trail to city.",
    features: [
      "Waterproof 3-Layer Shell",
      "Seam-Sealed Seams",
      "Adjustable Hood",
      "Zip Pockets",
      "Packable Design",
    ],
    colors: [
      { name: "Obsidian", hex: "#1A1A1A" },
      { name: "Slate", hex: "#5A5A5A" },
      { name: "Olive", hex: "#4A5A40" },
    ],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.7,
    reviewCount: 89,
    badge: "new",
    images: [jacketImage("#252830", "#353840", "#b8c4d0"), jacketImage("#2e3038", "#3e4048", "#c0ccd8")],
    inStock: true,
    isNew: true,
  },
  {
    id: "luma-comfort-runner-01",
    name: "Cloud Walk Trainer",
    brand: "LUMA",
    price: 148,
    category: "footwear",
    description:
      "Ultra-lightweight knit upper with responsive ZoomFoam cushioning. Designed for all-day comfort with a clean, contemporary profile.",
    features: [
      "Engineered Knit Upper",
      "ZoomFoam Cushioning",
      "Ortholite Insole",
      "Flex Groove Outsole",
      "Pull Tab",
    ],
    colors: [
      { name: "White", hex: "#F0EDE8" },
      { name: "Black", hex: "#1A1A1A" },
      { name: "Grey", hex: "#8A8A8A" },
    ],
    sizes: ["7", "8", "9", "10", "11", "12"],
    rating: 4.6,
    reviewCount: 167,
    images: [sneakerImage("#302c28", "#403c38", "#d4c5a9"), sneakerImage("#3a3630", "#4a4640", "#c4b896")],
    inStock: true,
  },
  {
    id: "luma-signature-tee-01",
    name: "Signature Logo Tee",
    brand: "LUMA",
    price: 55,
    category: "t-shirts",
    description:
      "Premium heavyweight 220gsm cotton with a relaxed drop-shoulder fit. Subtle tonal logo embossing on the chest. Built to hold its shape wash after wash.",
    features: [
      "220gsm Heavyweight Cotton",
      "Drop-Shoulder Fit",
      "Tonal Logo Embossing",
      "Pre-shrunk",
      "Double-Stitched Hem",
    ],
    colors: [
      { name: "Black", hex: "#1A1A1A" },
      { name: "White", hex: "#F5F0EB" },
      { name: "Olive", hex: "#4A5A40" },
    ],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.5,
    reviewCount: 198,
    badge: "new",
    images: [tshirtImage("#35302a", "#45403a", "#d4c5a9"), tshirtImage("#3e3832", "#4e4842", "#c4b896")],
    inStock: true,
    isNew: true,
  },
  {
    id: "luma-minimal-tee-01",
    name: "Studio Minimal Tee",
    brand: "LUMA",
    price: 42,
    category: "t-shirts",
    description:
      "Clean, minimal design on premium 180gsm cotton. Boxy fit with a straight hem. The foundation of any thoughtful wardrobe.",
    features: [
      "180gsm Cotton",
      "Boxy Fit",
      "Straight Hem",
      "Side-Seamed",
      "Tagless Label",
    ],
    colors: [
      { name: "Ecru", hex: "#E8E4DF" },
      { name: "Charcoal", hex: "#3A3A3A" },
      { name: "Rust", hex: "#8B4513" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.4,
    reviewCount: 134,
    images: [tshirtImage("#383430", "#484440", "#c8baa8"), tshirtImage("#423e38", "#524e48", "#b8aa98")],
    inStock: true,
  },
  {
    id: "luma-heritage-hoodie-01",
    name: "Heritage Zip Hoodie",
    brand: "LUMA",
    price: 148,
    category: "hoodies",
    description:
      "Premium zip-through hoodie in 380gsm brushed fleece. Features a two-way zipper, ribbed trims, and a slightly oversized fit.",
    features: [
      "380gsm Brushed Fleece",
      "Two-Way Zipper",
      "Ribbed Trims",
      "Oversized Fit",
      "Kangaroo Pockets",
    ],
    colors: [
      { name: "Washed Navy", hex: "#2A3A5A" },
      { name: "Charcoal", hex: "#3A3A3A" },
      { name: "Cream", hex: "#E8E0D0" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.7,
    reviewCount: 178,
    images: [hoodieImage("#282c32", "#383c42", "#a8b4c0"), hoodieImage("#323640", "#424650", "#b8c4d0")],
    inStock: true,
  },
  {
    id: "luma-cozy-hoodie-01",
    name: "Cozy Pullover Hoodie",
    brand: "LUMA",
    price: 118,
    originalPrice: 138,
    category: "hoodies",
    description:
      "Ultra-soft loopback cotton hoodie with a relaxed fit. Perfect weight for year-round layering. Minimal branding for a clean aesthetic.",
    features: [
      "Loopback Cotton",
      "Relaxed Fit",
      "Kangaroo Pocket",
      "Adjustable Drawstring",
      "Ribbed Hem",
    ],
    colors: [
      { name: "Midnight", hex: "#1A1A2E" },
      { name: "Slate", hex: "#5A5A5A" },
    ],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.6,
    reviewCount: 145,
    badge: "sale",
    images: [hoodieImage("#2c2e35", "#3c3e45", "#a0acb8"), hoodieImage("#353740", "#454750", "#b0bcc8")],
    inStock: true,
  },
  {
    id: "luma-formal-tee-01",
    name: "Pima V-Neck Tee",
    brand: "LUMA",
    price: 58,
    category: "t-shirts",
    description:
      "Elevated Pima cotton v-neck with a tailored fit. Ultra-fine gauge knit gives a silky hand feel. Perfect layering piece or standalone essential.",
    features: [
      "100% Pima Cotton",
      "Tailored V-Neck",
      "Fine Gauge Knit",
      "Side-Seamed",
      "Reinforced Neckline",
    ],
    colors: [
      { name: "Black", hex: "#1A1A1A" },
      { name: "White", hex: "#F5F0EB" },
      { name: "Navy", hex: "#1B2A4A" },
    ],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.5,
    reviewCount: 102,
    images: [tshirtImage("#363230", "#464240", "#d0c2b0"), tshirtImage("#403c38", "#504c48", "#c0b2a0")],
    inStock: true,
  },
  {
    id: "luma-urban-tee-01",
    name: "Urban Graphic Tee",
    brand: "LUMA",
    price: 62,
    category: "t-shirts",
    description:
      "Oversized graphic tee on premium 200gsm cotton. Features an abstract tonal print on the back. A statement piece with restrained execution.",
    features: [
      "200gsm Premium Cotton",
      "Oversized Fit",
      "Tonal Back Print",
      "Dropped Shoulders",
      "Pre-washed",
    ],
    colors: [
      { name: "Black", hex: "#1A1A1A" },
      { name: "Stone", hex: "#C4B896" },
    ],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.3,
    reviewCount: 87,
    badge: "new",
    images: [tshirtImage("#2e2a26", "#3e3a36", "#d4c5a9"), tshirtImage("#383430", "#484440", "#c4b896")],
    inStock: true,
    isNew: true,
  },
  {
    id: "luma-trail-boot-01",
    name: "Trail Tech Boot",
    brand: "LUMA",
    price: 198,
    category: "footwear",
    description:
      "Waterproof nubuck leather with Vibram outsole. Gusseted tongue and a reinforced toe cap for all-terrain confidence. Refined enough for the city.",
    features: [
      "Waterproof Nubuck",
      "Vibram Outsole",
      "Gusseted Tongue",
      "Reinforced Toe",
      "Cushioned Ankle Collar",
    ],
    colors: [
      { name: "Dark Earth", hex: "#4A3A2A" },
      { name: "Black", hex: "#1A1A1A" },
      { name: "Olive", hex: "#4A5A40" },
    ],
    sizes: ["8", "9", "10", "11", "12"],
    rating: 4.8,
    reviewCount: 76,
    badge: "new",
    images: [sneakerImage("#2a2620", "#3a3630", "#c4b896"), sneakerImage("#343028", "#444038", "#d4c5a9")],
    inStock: true,
    isNew: true,
  },
  {
    id: "luma-mid-sneaker-01",
    name: "Mid Canvas Sneaker",
    brand: "LUMA",
    price: 128,
    category: "footwear",
    description:
      "Clean mid-top silhouette in organic canvas with vulcanized rubber sole. Minimal branding and a timeless profile.",
    features: [
      "Organic Canvas",
      "Vulcanized Rubber Sole",
      "Metal Eyelets",
      "Ortholite Insole",
      "Reinforced Toe",
    ],
    sizes: ["7", "8", "9", "10", "11"],
    colors: [
      { name: "Natural", hex: "#E8E0D0" },
      { name: "Black", hex: "#1A1A1A" },
      { name: "Olive", hex: "#4A5A40" },
    ],
    rating: 4.5,
    reviewCount: 119,
    images: [sneakerImage("#2e2a24", "#3e3a34", "#c8bca8"), sneakerImage("#38342e", "#48443e", "#b8ac98")],
    inStock: true,
  },
  {
    id: "luma-flight-jacket-01",
    name: "Flight Bomber Jacket",
    brand: "LUMA",
    price: 320,
    category: "jackets",
    description:
      "Reimagined bomber silhouette in lightweight ripstop nylon with a satin finish. Ribbed collar and cuffs, with two-way zip closure.",
    features: [
      "Ripstop Nylon",
      "Satin Finish",
      "Ribbed Collar & Cuffs",
      "Two-Way Zip",
      "Interior Pocket",
    ],
    colors: [
      { name: "Black", hex: "#1A1A1A" },
      { name: "Olive", hex: "#3A4A30" },
    ],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.7,
    reviewCount: 64,
    images: [jacketImage("#282c30", "#383c40", "#c0ccd8"), jacketImage("#303438", "#404448", "#b0bcc8")],
    inStock: true,
  },
  {
    id: "luma-wool-overcoat-01",
    name: "Wool Overcoat",
    brand: "LUMA",
    price: 395,
    originalPrice: 450,
    category: "jackets",
    description:
      "Double-breasted overcoat in Italian virgin wool. Structured shoulders with a clean drape. A modern investment piece for cooler months.",
    features: [
      "Italian Virgin Wool",
      "Double-Breasted",
      "Structured Shoulders",
      "Wool Lining",
      "Two Front Pockets",
    ],
    colors: [
      { name: "Camel", hex: "#C4A87A" },
      { name: "Charcoal", hex: "#3A3A3A" },
    ],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.9,
    reviewCount: 41,
    badge: "limited",
    images: [jacketImage("#2c2820", "#3c3830", "#d4c5a9"), jacketImage("#363228", "#464238", "#c4b896")],
    inStock: true,
  },
  {
    id: "luma-parka-01",
    name: "Insulated Parka",
    brand: "LUMA",
    price: 365,
    category: "jackets",
    description:
      "Down-filled parka with a water-resistant shell. Removable hood, storm cuffs, and a clean silhouette that avoids bulk.",
    features: [
      "Down Insulation",
      "Water-Resistant Shell",
      "Removable Hood",
      "Storm Cuffs",
      "Internal Media Pocket",
    ],
    colors: [
      { name: "Navy", hex: "#1B2A4A" },
      { name: "Black", hex: "#1A1A1A" },
    ],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.6,
    reviewCount: 53,
    images: [jacketImage("#262a30", "#363a40", "#b8c4d0"), jacketImage("#303440", "#404450", "#a8b4c0")],
    inStock: true,
  },
  {
    id: "luma-crossbody-01",
    name: "Crossbody Sling",
    brand: "LUMA",
    price: 95,
    category: "bags",
    description:
      "Compact crossbody in ballistic nylon with leather trim. Adjustable strap and multiple compartments for organized carry.",
    features: [
      "Ballistic Nylon",
      "Leather Trim",
      "Adjustable Strap",
      "RFID Pocket",
      "YKK Zippers",
    ],
    colors: [
      { name: "Black", hex: "#1A1A1A" },
      { name: "Olive", hex: "#4A5A40" },
    ],
    sizes: ["One Size"],
    rating: 4.5,
    reviewCount: 108,
    images: [bagImage("#2c2822", "#3c3832", "#c8a882"), bagImage("#36322c", "#46423c", "#d4b892")],
    inStock: true,
  },
  {
    id: "luma-weekender-01",
    name: "Weekender Duffel",
    brand: "LUMA",
    price: 285,
    category: "bags",
    description:
      "Full-grain leather duffel with brass hardware and a detachable shoulder strap. Designed for the perfect weekend escape.",
    features: [
      "Full-Grain Leather",
      "Brass Hardware",
      "Detachable Strap",
      "Shoe Compartment",
      "Canvas Lining",
    ],
    colors: [
      { name: "Cognac", hex: "#8B5E3C" },
      { name: "Noir", hex: "#1A1A1A" },
    ],
    sizes: ["One Size"],
    rating: 4.8,
    reviewCount: 67,
    badge: "new",
    images: [bagImage("#2a241e", "#3a342e", "#c8a882"), bagImage("#342e28", "#443e38", "#d4b892")],
    inStock: true,
    isNew: true,
  },
  {
    id: "luma-mini-clutch-01",
    name: "Mini Leather Clutch",
    brand: "LUMA",
    price: 78,
    category: "bags",
    description:
      "Sleek zip-around clutch in smooth calfskin. Card slots and a note compartment keep essentials organized.",
    features: [
      "Smooth Calfskin",
      "Zip-Around Closure",
      "4 Card Slots",
      "Note Compartment",
      "Gold-Tone Hardware",
    ],
    colors: [
      { name: "Black", hex: "#1A1A1A" },
      { name: "Ivory", hex: "#F5F0EB" },
      { name: "Burgundy", hex: "#5A1A2A" },
    ],
    sizes: ["One Size"],
    rating: 4.4,
    reviewCount: 93,
    images: [bagImage("#2e2620", "#3e3630", "#c8a882"), bagImage("#38322c", "#48423c", "#d4b892")],
    inStock: true,
  },
  {
    id: "luma-field-watch-01",
    name: "Field Explorer Watch",
    brand: "LUMA",
    price: 195,
    category: "watches",
    description:
      "Military-inspired field watch with a 38mm stainless steel case. Swiss quartz movement, luminous indices, and a NATO strap.",
    features: [
      "Swiss Quartz Movement",
      "38mm Stainless Steel",
      "Luminous Indices",
      "NATO Strap",
      "100m Water Resistant",
    ],
    colors: [
      { name: "Sand/Green", hex: "#C4B896" },
      { name: "Black/Black", hex: "#1A1A1A" },
    ],
    sizes: ["38mm"],
    rating: 4.7,
    reviewCount: 134,
    images: [watchImage("#2a2c28", "#3a3c38", "#c0b8a8"), watchImage("#343630", "#444640", "#d0c8b8")],
    inStock: true,
  },
  {
    id: "luma-minimal-watch-01",
    name: "Minimal Dress Watch",
    brand: "LUMA",
    price: 265,
    category: "watches",
    description:
      "Ultra-thin dress watch with a 36mm case and mesh bracelet. Swiss movement with a sunray dial that shifts with the light.",
    features: [
      "Swiss Quartz Movement",
      "36mm Ultra-Thin Case",
      "Sunray Dial",
      "Mesh Bracelet",
      "Sapphire Crystal",
    ],
    colors: [
      { name: "Silver", hex: "#C0C0C0" },
      { name: "Gold", hex: "#C9A96E" },
    ],
    sizes: ["36mm"],
    rating: 4.8,
    reviewCount: 89,
    badge: "bestseller",
    images: [watchImage("#2c2e30", "#3c3e40", "#c8c0b0"), watchImage("#36383c", "#46484c", "#c9a96e")],
    inStock: true,
    isBestseller: true,
  },
  {
    id: "luma-diver-watch-01",
    name: "Diver Pro Watch",
    brand: "LUMA",
    price: 420,
    category: "watches",
    description:
      "Professional dive watch with 300m water resistance. Unidirectional bezel, helium escape valve, and Super-Luminova indices.",
    features: [
      "Automatic Movement",
      "300m Water Resistant",
      "Unidirectional Bezel",
      "Helium Escape Valve",
      "Super-Luminova",
    ],
    colors: [
      { name: "Black/Steel", hex: "#2A2A2A" },
      { name: "Blue/Steel", hex: "#1B2A4A" },
    ],
    sizes: ["42mm", "44mm"],
    rating: 4.9,
    reviewCount: 56,
    badge: "limited",
    images: [watchImage("#282a30", "#383a40", "#c0b8a8"), watchImage("#32343a", "#42444a", "#d0c8b8")],
    inStock: true,
  },
  {
    id: "luma-leather-belt-01",
    name: "Heritage Leather Belt",
    brand: "LUMA",
    price: 85,
    category: "accessories",
    description:
      "Full-grain Italian leather belt with a brushed stainless steel buckle. Hand-burnished edges for a refined finish.",
    features: [
      "Full-Grain Italian Leather",
      "Brushed Steel Buckle",
      "Hand-Burnished Edges",
      "32mm Width",
      "Gift Box Included",
    ],
    colors: [
      { name: "Black", hex: "#1A1A1A" },
      { name: "Cognac", hex: "#8B5E3C" },
    ],
    sizes: ["S (28-30)", "M (31-33)", "L (34-36)", "XL (37-40)"],
    rating: 4.6,
    reviewCount: 178,
    images: [watchImage("#2a2620", "#3a3630", "#b0a898"), watchImage("#34302a", "#44403a", "#c0b8a8")],
    inStock: true,
  },
  {
    id: "luma-wallet-01",
    name: "Slim Card Wallet",
    brand: "LUMA",
    price: 65,
    category: "accessories",
    description:
      "Ultra-slim bifold wallet in vegetable-tanned leather. Six card slots, a note pocket, and RFID protection. Gets better with age.",
    features: [
      "Vegetable-Tanned Leather",
      "6 Card Slots",
      "RFID Protection",
      "Note Pocket",
      "Slim 8mm Profile",
    ],
    colors: [
      { name: "Black", hex: "#1A1A1A" },
      { name: "Natural", hex: "#C4B896" },
      { name: "Navy", hex: "#1B2A4A" },
    ],
    sizes: ["One Size"],
    rating: 4.7,
    reviewCount: 203,
    images: [bagImage("#2c2820", "#3c3830", "#b0a898"), bagImage("#36322a", "#46423a", "#c0b8a8")],
    inStock: true,
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export function getNewArrivals(): Product[] {
  return products.filter((p) => p.isNew).slice(0, 4);
}

export function getBestsellers(): Product[] {
  return products.filter((p) => p.isBestseller).slice(0, 4);
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
  );
}
