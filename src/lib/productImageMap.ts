// Product Image Mapping — each product gets its own dedicated real photo
// When image files are added to public/images/products/, they are used automatically
// Falls back to SVG-generated images when real images aren't available yet

import {
  sneakerImage,
  hoodieImage,
  tshirtImage,
  watchImage,
  bagImage,
  glassesImage,
  jacketImage,
} from "@/lib/productImages";

// ─── Real Image Paths ───────────────────────────────────────────────────────
// Each product has a unique dedicated image file for authentic presentation

const REAL_IMAGES: Record<string, { primary: string; secondary: string }> = {
  // Footwear — each shoe gets its own dedicated photo
  "luma-stride-01": {
    primary: "/images/products/stride-runner.jpg",
    secondary: "/images/products/cloud-walker.jpg",
  },
  "luma-comfort-runner-01": {
    primary: "/images/products/cloud-walker.jpg",
    secondary: "/images/products/stride-runner.jpg",
  },
  "luma-trail-boot-01": {
    primary: "/images/products/trail-boot.jpg",
    secondary: "/images/products/mid-sneaker.jpg",
  },
  "luma-mid-sneaker-01": {
    primary: "/images/products/mid-sneaker.jpg",
    secondary: "/images/products/stride-runner.jpg",
  },

  // Hoodies — each style gets its own photo
  "luma-drift-hoodie-01": {
    primary: "/images/products/drift-hoodie.jpg",
    secondary: "/images/products/heritage-hoodie.jpg",
  },
  "luma-heritage-hoodie-01": {
    primary: "/images/products/heritage-hoodie.jpg",
    secondary: "/images/products/cozy-hoodie.jpg",
  },
  "luma-cozy-hoodie-01": {
    primary: "/images/products/cozy-hoodie.jpg",
    secondary: "/images/products/drift-hoodie.jpg",
  },

  // T-Shirts — each style gets its own photo
  "luma-ess-tee-01": {
    primary: "/images/products/essential-tee.jpg",
    secondary: "/images/products/signature-tee.jpg",
  },
  "luma-signature-tee-01": {
    primary: "/images/products/signature-tee.jpg",
    secondary: "/images/products/essential-tee.jpg",
  },
  "luma-minimal-tee-01": {
    primary: "/images/products/minimal-tee.jpg",
    secondary: "/images/products/formal-tee.jpg",
  },
  "luma-formal-tee-01": {
    primary: "/images/products/formal-tee.jpg",
    secondary: "/images/products/urban-tee.jpg",
  },
  "luma-urban-tee-01": {
    primary: "/images/products/urban-tee.jpg",
    secondary: "/images/products/minimal-tee.jpg",
  },

  // Jackets — each style gets its own photo
  "luma-shell-jacket-01": {
    primary: "/images/products/shell-jacket.jpg",
    secondary: "/images/products/flight-jacket.jpg",
  },
  "luma-flight-jacket-01": {
    primary: "/images/products/flight-jacket.jpg",
    secondary: "/images/products/shell-jacket.jpg",
  },
  "luma-wool-overcoat-01": {
    primary: "/images/products/wool-overcoat.jpg",
    secondary: "/images/products/parka.jpg",
  },
  "luma-parka-01": {
    primary: "/images/products/parka.jpg",
    secondary: "/images/products/wool-overcoat.jpg",
  },

  // Bags — each style gets its own photo
  "luma-arc-tote-01": {
    primary: "/images/products/arc-tote.jpg",
    secondary: "/images/products/weekender.jpg",
  },
  "luma-crossbody-01": {
    primary: "/images/products/crossbody.jpg",
    secondary: "/images/products/arc-tote.jpg",
  },
  "luma-weekender-01": {
    primary: "/images/products/weekender.jpg",
    secondary: "/images/products/crossbody.jpg",
  },
  "luma-mini-clutch-01": {
    primary: "/images/products/mini-clutch.jpg",
    secondary: "/images/products/arc-tote.jpg",
  },

  // Watches — each gets its own dedicated watch photo
  "luma-chronos-01": {
    primary: "/images/products/chronos-watch.jpg",
    secondary: "/images/products/gold-watch.jpg",
  },
  "luma-field-watch-01": {
    primary: "/images/products/field-watch.jpg",
    secondary: "/images/products/minimal-watch.jpg",
  },
  "luma-minimal-watch-01": {
    primary: "/images/products/minimal-watch.jpg",
    secondary: "/images/products/chronos-watch.jpg",
  },
  "luma-diver-watch-01": {
    primary: "/images/products/diver-watch.jpg",
    secondary: "/images/products/field-watch.jpg",
  },

  // Accessories — each gets its own photo
  "luma-onyx-sunglass-01": {
    primary: "/images/products/onyx-aviator.jpg",
    secondary: "/images/products/leather-belt.jpg",
  },
  "luma-leather-belt-01": {
    primary: "/images/products/leather-belt.jpg",
    secondary: "/images/products/slim-wallet.jpg",
  },
  "luma-wallet-01": {
    primary: "/images/products/slim-wallet.jpg",
    secondary: "/images/products/leather-belt.jpg",
  },
};

// ─── SVG Fallbacks ──────────────────────────────────────────────────────────
// Used when real images haven't been added yet

const SVG_FALLBACKS: Record<string, { primary: string; secondary: string }> = {
  // Footwear
  "luma-stride-01": {
    primary: sneakerImage("#35302a", "#45403a", "#d4c5a9"),
    secondary: sneakerImage("#3e3832", "#4e4842", "#c4b896"),
  },
  "luma-comfort-runner-01": {
    primary: sneakerImage("#302c28", "#403c38", "#d4c5a9"),
    secondary: sneakerImage("#3a3630", "#4a4640", "#c4b896"),
  },
  "luma-trail-boot-01": {
    primary: sneakerImage("#2a2620", "#3a3630", "#c4b896"),
    secondary: sneakerImage("#343028", "#444038", "#d4c5a9"),
  },
  "luma-mid-sneaker-01": {
    primary: sneakerImage("#2e2a24", "#3e3a34", "#c8bca8"),
    secondary: sneakerImage("#38342e", "#48443e", "#b8ac98"),
  },

  // Hoodies
  "luma-drift-hoodie-01": {
    primary: hoodieImage("#2a2e33", "#3a3e43", "#a8b4c0"),
    secondary: hoodieImage("#333740", "#434750", "#b8c4d0"),
  },
  "luma-heritage-hoodie-01": {
    primary: hoodieImage("#282c32", "#383c42", "#a8b4c0"),
    secondary: hoodieImage("#323640", "#424650", "#b8c4d0"),
  },
  "luma-cozy-hoodie-01": {
    primary: hoodieImage("#2c2e35", "#3c3e45", "#a0acb8"),
    secondary: hoodieImage("#353740", "#454750", "#b0bcc8"),
  },

  // T-Shirts
  "luma-ess-tee-01": {
    primary: tshirtImage("#3a3530", "#4a4540", "#f0ebe0"),
    secondary: tshirtImage("#44403a", "#54504a", "#e8e0d0"),
  },
  "luma-signature-tee-01": {
    primary: tshirtImage("#35302a", "#45403a", "#d4c5a9"),
    secondary: tshirtImage("#3e3832", "#4e4842", "#c4b896"),
  },
  "luma-minimal-tee-01": {
    primary: tshirtImage("#383430", "#484440", "#c8baa8"),
    secondary: tshirtImage("#423e38", "#524e48", "#b8aa98"),
  },
  "luma-formal-tee-01": {
    primary: tshirtImage("#363230", "#464240", "#d0c2b0"),
    secondary: tshirtImage("#403c38", "#504c48", "#c0b2a0"),
  },
  "luma-urban-tee-01": {
    primary: tshirtImage("#2e2a26", "#3e3a36", "#d4c5a9"),
    secondary: tshirtImage("#383430", "#484440", "#c4b896"),
  },

  // Jackets
  "luma-shell-jacket-01": {
    primary: jacketImage("#252830", "#353840", "#b8c4d0"),
    secondary: jacketImage("#2e3038", "#3e4048", "#c0ccd8"),
  },
  "luma-flight-jacket-01": {
    primary: jacketImage("#282c30", "#383c40", "#c0ccd8"),
    secondary: jacketImage("#303438", "#404448", "#b0bcc8"),
  },
  "luma-wool-overcoat-01": {
    primary: jacketImage("#2c2820", "#3c3830", "#d4c5a9"),
    secondary: jacketImage("#363228", "#464238", "#c4b896"),
  },
  "luma-parka-01": {
    primary: jacketImage("#262a30", "#363a40", "#b8c4d0"),
    secondary: jacketImage("#303440", "#404450", "#a8b4c0"),
  },

  // Bags
  "luma-arc-tote-01": {
    primary: bagImage("#302820", "#403830", "#c8a882"),
    secondary: bagImage("#3a3228", "#4a4238", "#d4c5a9"),
  },
  "luma-crossbody-01": {
    primary: bagImage("#2c2822", "#3c3832", "#c8a882"),
    secondary: bagImage("#36322c", "#46423c", "#d4b892"),
  },
  "luma-weekender-01": {
    primary: bagImage("#2a241e", "#3a342e", "#c8a882"),
    secondary: bagImage("#342e28", "#443e38", "#d4b892"),
  },
  "luma-mini-clutch-01": {
    primary: bagImage("#2e2620", "#3e3630", "#c8a882"),
    secondary: bagImage("#38322c", "#48423c", "#d4b892"),
  },

  // Watches
  "luma-chronos-01": {
    primary: watchImage("#2a2c30", "#3a3c40", "#c0b8a8"),
    secondary: watchImage("#33353a", "#43454a", "#c9a96e"),
  },
  "luma-field-watch-01": {
    primary: watchImage("#2a2c28", "#3a3c38", "#c0b8a8"),
    secondary: watchImage("#343630", "#444640", "#d0c8b8"),
  },
  "luma-minimal-watch-01": {
    primary: watchImage("#2c2e30", "#3c3e40", "#c8c0b0"),
    secondary: watchImage("#36383c", "#46484c", "#c9a96e"),
  },
  "luma-diver-watch-01": {
    primary: watchImage("#282a30", "#383a40", "#c0b8a8"),
    secondary: watchImage("#32343a", "#42444a", "#d0c8b8"),
  },

  // Accessories
  "luma-onyx-sunglass-01": {
    primary: glassesImage("#28262a", "#38363c", "#b0a898"),
    secondary: glassesImage("#302e34", "#403e44", "#c8c0b0"),
  },
  "luma-leather-belt-01": {
    primary: watchImage("#2a2620", "#3a3630", "#b0a898"),
    secondary: watchImage("#34302a", "#44403a", "#c0b8a8"),
  },
  "luma-wallet-01": {
    primary: bagImage("#2c2820", "#3c3830", "#b0a898"),
    secondary: bagImage("#36322a", "#46423a", "#c0b8a8"),
  },
};

// ─── Brand Images ───────────────────────────────────────────────────────────

export const brandImages = {
  heroBackground: "/images/brand/hero-architectural.jpg",
  heroBackgroundFallback: "/images/brand/hero-architectural.jpg",
  categoryBackground: "/images/brand/warm-shadow.jpg",
  editorial: "/images/brand/hero-architectural.jpg",
  giftbox: "/images/brand/warm-shadow.jpg",
  clothingRack: "/images/brand/warm-shadow.jpg",
};

// ─── API ────────────────────────────────────────────────────────────────────

/** Get the real image paths for a product (may not exist on disk yet) */
export function getRealImages(productId: string): { primary: string; secondary: string } | null {
  return REAL_IMAGES[productId] ?? null;
}

/** Get SVG fallback images for a product */
export function getSVGFallbacks(productId: string): { primary: string; secondary: string } | null {
  return SVG_FALLBACKS[productId] ?? null;
}

/** Get all images for a product — real paths (for <img src>) */
export function getProductImageSrc(productId: string, index: number = 0): string {
  const real = REAL_IMAGES[productId];
  if (real) {
    return index === 0 ? real.primary : real.secondary;
  }
  // Fallback to SVG
  const svg = SVG_FALLBACKS[productId];
  if (svg) {
    return index === 0 ? svg.primary : svg.secondary;
  }
  return "";
}
