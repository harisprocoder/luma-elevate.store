// Premium SVG product imagery — studio-lit, high contrast, editorial feel
// Each product gets a unique, detailed visual identity with proper lighting and shadows

const svgHeader = `xmlns="http://www.w3.org/2000/svg"`;
const svgDefs = `
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="{bg1}"/>
      <stop offset="100%" stop-color="{bg2}"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="35%" r="55%">
      <stop offset="0%" stop-color="{accent}" stop-opacity="0.08"/>
      <stop offset="70%" stop-color="{accent}" stop-opacity="0.02"/>
      <stop offset="100%" stop-color="{accent}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="spotlight" cx="50%" cy="30%" r="40%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.06"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
    <filter id="shadow">
      <feDropShadow dx="0" dy="16" stdDeviation="28" flood-color="#000" flood-opacity="0.4"/>
    </filter>
    <filter id="softShadow">
      <feDropShadow dx="0" dy="6" stdDeviation="12" flood-color="#000" flood-opacity="0.25"/>
    </filter>
    <filter id="innerGlow">
      <feFlood flood-color="{accent}" flood-opacity="0.1"/>
      <feComposite in2="SourceAlpha" operator="in"/>
      <feGaussianBlur stdDeviation="8"/>
      <feComposite in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feMerge>
        <feMergeNode/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>`;

function buildSvg(
  w: number,
  h: number,
  bg1: string,
  bg2: string,
  accent: string,
  shape: string,
  label: string
): string {
  const defs = svgDefs
    .replace(/\{bg1\}/g, bg1)
    .replace(/\{bg2\}/g, bg2)
    .replace(/\{accent\}/g, accent);

  return `data:image/svg+xml,${encodeURIComponent(
    `<svg ${svgHeader} width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  ${defs}
  <rect width="${w}" height="${h}" fill="url(#bg)"/>
  <rect width="${w}" height="${h}" fill="url(#glow)"/>
  <rect width="${w}" height="${h}" fill="url(#spotlight)"/>
  ${shape}
  <text x="${w / 2}" y="${h - 30}" text-anchor="middle" font-family="Georgia,'Times New Roman',serif" font-size="11" fill="${accent}" opacity="0.3" letter-spacing="4">${label}</text>
</svg>`
  )}`;
}

// ─── Sneaker Shape ─────────────────────────────────────────────────────────
function sneakerShape(fg: string): string {
  return `
  <g filter="url(#shadow)" transform="translate(300,380)">
    <!-- Sole -->
    <path d="M-170,30 Q-170,50 -150,55 L150,55 Q180,55 180,30 L175,20 Q170,10 150,10 L-140,10 Q-165,10 -170,20Z" 
          fill="${fg}" fill-opacity="0.25" stroke="${fg}" stroke-opacity="0.5" stroke-width="1.5"/>
    <!-- Midsole -->
    <path d="M-155,10 Q-155,-5 -140,-10 L140,-10 Q165,-5 165,10 L-155,10Z" 
          fill="${fg}" fill-opacity="0.15" stroke="${fg}" stroke-opacity="0.3" stroke-width="1"/>
    <!-- Upper -->
    <path d="M-140,-10 Q-130,-70 -60,-100 Q0,-120 60,-100 Q120,-80 140,-40 Q155,-10 165,10 L-155,10 Q-160,0 -140,-10Z" 
          fill="${fg}" fill-opacity="0.12" stroke="${fg}" stroke-opacity="0.4" stroke-width="2"/>
    <!-- Tongue -->
    <path d="M-30,-100 Q-20,-140 0,-150 Q20,-140 30,-100" 
          fill="${fg}" fill-opacity="0.08" stroke="${fg}" stroke-opacity="0.25" stroke-width="1.5"/>
    <!-- Lace holes -->
    <circle cx="-20" cy="-80" r="2.5" fill="${fg}" fill-opacity="0.3"/>
    <circle cx="-10" cy="-90" r="2.5" fill="${fg}" fill-opacity="0.3"/>
    <circle cx="0" cy="-95" r="2.5" fill="${fg}" fill-opacity="0.3"/>
    <circle cx="10" cy="-90" r="2.5" fill="${fg}" fill-opacity="0.3"/>
    <circle cx="20" cy="-80" r="2.5" fill="${fg}" fill-opacity="0.3"/>
    <!-- Laces -->
    <path d="M-20,-80 L20,-80 M-15,-87 L15,-87 M-8,-93 L8,-93" 
          fill="none" stroke="${fg}" stroke-opacity="0.2" stroke-width="1"/>
    <!-- Swoosh/logo detail -->
    <path d="M-80,-30 Q0,-60 100,-20" fill="none" stroke="${fg}" stroke-opacity="0.2" stroke-width="2" stroke-linecap="round"/>
    <!-- Heel tab -->
    <rect x="-8" y="-148" width="16" height="20" rx="3" fill="${fg}" fill-opacity="0.1" stroke="${fg}" stroke-opacity="0.2" stroke-width="1"/>
  </g>`;
}

// ─── Hoodie Shape ──────────────────────────────────────────────────────────
function hoodieShape(fg: string): string {
  return `
  <g filter="url(#shadow)" transform="translate(300,370)">
    <!-- Body -->
    <path d="M-110,-170 Q0,-200 110,-170 Q135,-140 125,-100 Q110,-80 100,-90 L100,160 Q0,180 -100,160 L-100,-90 Q-110,-80 -125,-100 Q-135,-140 -110,-170Z" 
          fill="${fg}" fill-opacity="0.1" stroke="${fg}" stroke-opacity="0.35" stroke-width="2"/>
    <!-- Hood -->
    <path d="M-80,-170 Q-80,-210 -40,-230 Q0,-240 40,-230 Q80,-210 80,-170" 
          fill="${fg}" fill-opacity="0.06" stroke="${fg}" stroke-opacity="0.2" stroke-width="1.5"/>
    <!-- Hood opening -->
    <ellipse cx="0" cy="-155" rx="40" ry="25" fill="none" stroke="${fg}" stroke-opacity="0.15" stroke-width="1.5"/>
    <!-- Kangaroo pocket -->
    <path d="M-50,80 Q-50,60 0,55 Q50,60 50,80 L50,120 Q50,130 40,130 L-40,130 Q-50,130 -50,120Z" 
          fill="${fg}" fill-opacity="0.04" stroke="${fg}" stroke-opacity="0.12" stroke-width="1"/>
    <!-- Pocket opening -->
    <path d="M-40,90 Q0,85 40,90" fill="none" stroke="${fg}" stroke-opacity="0.1" stroke-width="1"/>
    <!-- Center seam -->
    <line x1="0" y1="-155" x2="0" y2="160" stroke="${fg}" stroke-opacity="0.06" stroke-width="1"/>
    <!-- Drawstrings -->
    <line x1="-15" y1="-150" x2="-18" y2="-110" stroke="${fg}" stroke-opacity="0.15" stroke-width="1.5" stroke-linecap="round"/>
    <line x1="15" y1="-150" x2="18" y2="-110" stroke="${fg}" stroke-opacity="0.15" stroke-width="1.5" stroke-linecap="round"/>
    <!-- Cuff lines -->
    <line x1="-100" y1="150" x2="100" y2="150" stroke="${fg}" stroke-opacity="0.08" stroke-width="1"/>
    <line x1="-100" y1="-80" x2="-50" y2="-70" stroke="${fg}" stroke-opacity="0.08" stroke-width="1"/>
    <line x1="100" y1="-80" x2="50" y2="-70" stroke="${fg}" stroke-opacity="0.08" stroke-width="1"/>
  </g>`;
}

// ─── T-Shirt Shape ─────────────────────────────────────────────────────────
function tshirtShape(fg: string): string {
  return `
  <g filter="url(#shadow)" transform="translate(300,350)">
    <!-- Body -->
    <path d="M-90,-160 L-130,-120 L-110,-100 L-90,-110 L-90,150 Q0,170 90,150 L90,-110 L110,-100 L130,-120 L90,-160 Q0,-180 -90,-160Z" 
          fill="${fg}" fill-opacity="0.1" stroke="${fg}" stroke-opacity="0.35" stroke-width="2"/>
    <!-- Collar -->
    <ellipse cx="0" cy="-155" rx="35" ry="18" fill="none" stroke="${fg}" stroke-opacity="0.25" stroke-width="2"/>
    <!-- Shoulder seams -->
    <line x1="-90" y1="-155" x2="-130" y2="-120" stroke="${fg}" stroke-opacity="0.12" stroke-width="1"/>
    <line x1="90" y1="-155" x2="130" y2="-120" stroke="${fg}" stroke-opacity="0.12" stroke-width="1"/>
    <!-- Side seams -->
    <line x1="-90" y1="-100" x2="-85" y2="150" stroke="${fg}" stroke-opacity="0.06" stroke-width="1"/>
    <line x1="90" y1="-100" x2="85" y2="150" stroke="${fg}" stroke-opacity="0.06" stroke-width="1"/>
    <!-- Hem -->
    <path d="M-90,150 Q0,165 90,150" fill="none" stroke="${fg}" stroke-opacity="0.1" stroke-width="1"/>
    <!-- Subtle chest detail -->
    <rect x="-25" y="-60" width="50" height="3" rx="1.5" fill="${fg}" fill-opacity="0.08"/>
  </g>`;
}

// ─── Watch Shape ───────────────────────────────────────────────────────────
function watchShape(fg: string): string {
  return `
  <g filter="url(#shadow)" transform="translate(300,370)">
    <!-- Strap top -->
    <rect x="-20" y="-180" width="40" height="75" rx="6" fill="${fg}" fill-opacity="0.1" stroke="${fg}" stroke-opacity="0.2" stroke-width="1.5"/>
    <!-- Strap bottom -->
    <rect x="-20" y="105" width="40" height="75" rx="6" fill="${fg}" fill-opacity="0.1" stroke="${fg}" stroke-opacity="0.2" stroke-width="1.5"/>
    <!-- Strap holes -->
    <ellipse cx="0" cy="140" rx="4" ry="3" fill="none" stroke="${fg}" stroke-opacity="0.15" stroke-width="1"/>
    <ellipse cx="0" cy="155" rx="4" ry="3" fill="none" stroke="${fg}" stroke-opacity="0.15" stroke-width="1"/>
    <ellipse cx="0" cy="170" rx="4" ry="3" fill="none" stroke="${fg}" stroke-opacity="0.15" stroke-width="1"/>
    <!-- Case -->
    <circle cx="0" cy="0" r="100" fill="${fg}" fill-opacity="0.08" stroke="${fg}" stroke-opacity="0.4" stroke-width="2.5"/>
    <!-- Bezel -->
    <circle cx="0" cy="0" r="90" fill="none" stroke="${fg}" stroke-opacity="0.15" stroke-width="1.5"/>
    <!-- Dial -->
    <circle cx="0" cy="0" r="80" fill="none" stroke="${fg}" stroke-opacity="0.1" stroke-width="1"/>
    <!-- Hour markers -->
    <line x1="0" y1="-75" x2="0" y2="-65" stroke="${fg}" stroke-opacity="0.35" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="65" y1="0" x2="75" y2="0" stroke="${fg}" stroke-opacity="0.25" stroke-width="2" stroke-linecap="round"/>
    <line x1="0" y1="65" x2="0" y2="75" stroke="${fg}" stroke-opacity="0.25" stroke-width="2" stroke-linecap="round"/>
    <line x1="-65" y1="0" x2="-75" y2="0" stroke="${fg}" stroke-opacity="0.25" stroke-width="2" stroke-linecap="round"/>
    <!-- Minor markers -->
    <line x1="37" y1="-65" x2="33" y2="-58" stroke="${fg}" stroke-opacity="0.15" stroke-width="1.5" stroke-linecap="round"/>
    <line x1="65" y1="-37" x2="58" y2="-33" stroke="${fg}" stroke-opacity="0.15" stroke-width="1.5" stroke-linecap="round"/>
    <line x1="65" y1="37" x2="58" y2="33" stroke="${fg}" stroke-opacity="0.15" stroke-width="1.5" stroke-linecap="round"/>
    <line x1="37" y1="65" x2="33" y2="58" stroke="${fg}" stroke-opacity="0.15" stroke-width="1.5" stroke-linecap="round"/>
    <line x1="-37" y1="65" x2="-33" y2="58" stroke="${fg}" stroke-opacity="0.15" stroke-width="1.5" stroke-linecap="round"/>
    <line x1="-65" y1="37" x2="-58" y2="33" stroke="${fg}" stroke-opacity="0.15" stroke-width="1.5" stroke-linecap="round"/>
    <line x1="-65" y1="-37" x2="-58" y2="-33" stroke="${fg}" stroke-opacity="0.15" stroke-width="1.5" stroke-linecap="round"/>
    <line x1="-37" y1="-65" x2="-33" y2="-58" stroke="${fg}" stroke-opacity="0.15" stroke-width="1.5" stroke-linecap="round"/>
    <!-- Hands -->
    <line x1="0" y1="-5" x2="0" y2="-62" stroke="${fg}" stroke-opacity="0.45" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="0" y1="-5" x2="48" y2="0" stroke="${fg}" stroke-opacity="0.35" stroke-width="2" stroke-linecap="round"/>
    <line x1="0" y1="20" x2="-28" y2="-40" stroke="${fg}" stroke-opacity="0.2" stroke-width="1" stroke-linecap="round"/>
    <!-- Center pin -->
    <circle cx="0" cy="0" r="4" fill="${fg}" fill-opacity="0.4"/>
    <!-- Crown -->
    <rect x="98" y="-8" width="14" height="16" rx="3" fill="${fg}" fill-opacity="0.12" stroke="${fg}" stroke-opacity="0.2" stroke-width="1"/>
  </g>`;
}

// ─── Bag Shape ─────────────────────────────────────────────────────────────
function bagShape(fg: string): string {
  return `
  <g filter="url(#shadow)" transform="translate(300,380)">
    <!-- Body -->
    <rect x="-110" y="-90" width="220" height="200" rx="12" fill="${fg}" fill-opacity="0.1" stroke="${fg}" stroke-opacity="0.35" stroke-width="2"/>
    <!-- Handles -->
    <path d="M-55,-90 Q-55,-155 0,-175 Q55,-155 55,-90" fill="none" stroke="${fg}" stroke-opacity="0.3" stroke-width="2.5" stroke-linecap="round"/>
    <!-- Handle attachment -->
    <rect x="-60" y="-95" width="14" height="14" rx="3" fill="${fg}" fill-opacity="0.08" stroke="${fg}" stroke-opacity="0.15" stroke-width="1"/>
    <rect x="46" y="-95" width="14" height="14" rx="3" fill="${fg}" fill-opacity="0.08" stroke="${fg}" stroke-opacity="0.15" stroke-width="1"/>
    <!-- Horizontal stitch line -->
    <line x1="-90" y1="-10" x2="90" y2="-10" stroke="${fg}" stroke-opacity="0.08" stroke-width="1" stroke-dasharray="4 3"/>
    <!-- Interior shadow -->
    <rect x="-95" y="-80" width="190" height="40" rx="4" fill="${fg}" fill-opacity="0.04"/>
    <!-- Bottom detail -->
    <line x1="-90" y1="90" x2="90" y2="90" stroke="${fg}" stroke-opacity="0.1" stroke-width="1"/>
  </g>`;
}

// ─── Glasses Shape ─────────────────────────────────────────────────────────
function glassesShape(fg: string): string {
  return `
  <g filter="url(#shadow)" transform="translate(300,360)">
    <!-- Left lens -->
    <ellipse cx="-75" cy="0" rx="65" ry="50" fill="${fg}" fill-opacity="0.06" stroke="${fg}" stroke-opacity="0.4" stroke-width="2.5"/>
    <!-- Right lens -->
    <ellipse cx="75" cy="0" rx="65" ry="50" fill="${fg}" fill-opacity="0.06" stroke="${fg}" stroke-opacity="0.4" stroke-width="2.5"/>
    <!-- Bridge -->
    <path d="M-10,-5 Q0,-18 10,-5" fill="none" stroke="${fg}" stroke-opacity="0.35" stroke-width="2.5" stroke-linecap="round"/>
    <!-- Left temple -->
    <line x1="-140" y1="-5" x2="-185" y2="-25" stroke="${fg}" stroke-opacity="0.3" stroke-width="2.5" stroke-linecap="round"/>
    <!-- Right temple -->
    <line x1="140" y1="-5" x2="185" y2="-25" stroke="${fg}" stroke-opacity="0.3" stroke-width="2.5" stroke-linecap="round"/>
    <!-- Lens glare -->
    <ellipse cx="-55" cy="-18" rx="20" ry="10" fill="${fg}" fill-opacity="0.04" transform="rotate(-15 -55 -18)"/>
    <ellipse cx="55" cy="-18" rx="20" ry="10" fill="${fg}" fill-opacity="0.04" transform="rotate(15 55 -18)"/>
    <!-- Nose pads -->
    <ellipse cx="-18" cy="15" rx="5" ry="7" fill="${fg}" fill-opacity="0.08" stroke="${fg}" stroke-opacity="0.15" stroke-width="1"/>
    <ellipse cx="18" cy="15" rx="5" ry="7" fill="${fg}" fill-opacity="0.08" stroke="${fg}" stroke-opacity="0.15" stroke-width="1"/>
  </g>`;
}

// ─── Jacket Shape ──────────────────────────────────────────────────────────
function jacketShape(fg: string): string {
  return `
  <g filter="url(#shadow)" transform="translate(300,370)">
    <!-- Body -->
    <path d="M-110,-180 L0,-200 L110,-180 L120,170 L-120,170Z" 
          fill="${fg}" fill-opacity="0.08" stroke="${fg}" stroke-opacity="0.35" stroke-width="2"/>
    <!-- Collar -->
    <path d="M-50,-185 Q-30,-210 0,-215 Q30,-210 50,-185" 
          fill="${fg}" fill-opacity="0.06" stroke="${fg}" stroke-opacity="0.2" stroke-width="1.5"/>
    <!-- Center zip -->
    <line x1="0" y1="-200" x2="0" y2="170" stroke="${fg}" stroke-opacity="0.15" stroke-width="1.5"/>
    <!-- Zip teeth detail -->
    <line x1="-2" y1="-180" x2="-2" y2="160" stroke="${fg}" stroke-opacity="0.08" stroke-width="0.5" stroke-dasharray="3 2"/>
    <line x1="2" y1="-180" x2="2" y2="160" stroke="${fg}" stroke-opacity="0.08" stroke-width="0.5" stroke-dasharray="3 2"/>
    <!-- Lapels -->
    <path d="M-50,-185 Q-80,-150 -95,-100" fill="none" stroke="${fg}" stroke-opacity="0.15" stroke-width="1.5"/>
    <path d="M50,-185 Q80,-150 95,-100" fill="none" stroke="${fg}" stroke-opacity="0.15" stroke-width="1.5"/>
    <!-- Pockets -->
    <rect x="-90" y="60" width="65" height="5" rx="2.5" fill="${fg}" fill-opacity="0.08" stroke="${fg}" stroke-opacity="0.1" stroke-width="0.5"/>
    <rect x="25" y="60" width="65" height="5" rx="2.5" fill="${fg}" fill-opacity="0.08" stroke="${fg}" stroke-opacity="0.1" stroke-width="0.5"/>
    <!-- Shoulder seams -->
    <line x1="-110" y1="-180" x2="-50" y2="-185" stroke="${fg}" stroke-opacity="0.1" stroke-width="1"/>
    <line x1="110" y1="-180" x2="50" y2="-185" stroke="${fg}" stroke-opacity="0.1" stroke-width="1"/>
  </g>`;
}

// ─── Category Image Generator ──────────────────────────────────────────────
function createCategoryImage(
  bg1: string,
  bg2: string,
  accent: string,
  icon: string,
  subtext: string
): string {
  return buildSvg(
    800,
    600,
    bg1,
    bg2,
    accent,
    `<text x="400" y="270" text-anchor="middle" font-family="Georgia,'Times New Roman',serif" font-size="72" fill="${accent}" opacity="0.6">${icon}</text>
     <text x="400" y="340" text-anchor="middle" font-family="Inter,Helvetica,Arial,sans-serif" font-size="13" fill="${accent}" opacity="0.35" letter-spacing="3">${subtext}</text>`,
    "LUMA"
  );
}

// ─── Public API ────────────────────────────────────────────────────────────

export function sneakerImage(bg1: string, bg2: string, accent: string): string {
  return buildSvg(600, 750, bg1, bg2, accent, sneakerShape(accent), "LUMA");
}

export function hoodieImage(bg1: string, bg2: string, accent: string): string {
  return buildSvg(600, 750, bg1, bg2, accent, hoodieShape(accent), "LUMA");
}

export function tshirtImage(bg1: string, bg2: string, accent: string): string {
  return buildSvg(600, 750, bg1, bg2, accent, tshirtShape(accent), "LUMA");
}

export function watchImage(bg1: string, bg2: string, accent: string): string {
  return buildSvg(600, 750, bg1, bg2, accent, watchShape(accent), "LUMA");
}

export function bagImage(bg1: string, bg2: string, accent: string): string {
  return buildSvg(600, 750, bg1, bg2, accent, bagShape(accent), "LUMA");
}

export function glassesImage(bg1: string, bg2: string, accent: string): string {
  return buildSvg(600, 750, bg1, bg2, accent, glassesShape(accent), "LUMA");
}

export function jacketImage(bg1: string, bg2: string, accent: string): string {
  return buildSvg(600, 750, bg1, bg2, accent, jacketShape(accent), "LUMA");
}

export { createCategoryImage };
