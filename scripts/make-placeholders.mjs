// Placeholder assets, so the project builds before the real photography exists.
// Run with: node scripts/make-placeholders.mjs
//
// Every image on this page is a *static import* (see the note in README.md about
// content-hashed URLs). That makes a missing file a build error rather than a
// blank box, so the seven section slots need something on disk from day one.
//
// These are deliberately ugly: a flat cream field with a palm diagonal and the
// slot name burned in, at the real aspect ratio. You should be able to tell at a
// glance which slots are still waiting on art. Replacing one is a drop-in under
// the same filename followed by `node scripts/process-images.mjs`.
//
// This never overwrites an existing file — once a real shot lands, re-running
// this script leaves it alone.
import sharp from "sharp";
import { mkdirSync, existsSync } from "node:fs";

const OUT = "assets/images";
mkdirSync(OUT, { recursive: true });

// [filename, width, height] — ratios match the shot list in WORKFLOWS.md
const slots = [
  ["coconut-almond-macro.webp", 1600, 900], // 16:9
  ["studio-pedestal.webp", 1600, 900], // 16:9
  ["brand-story-grove.webp", 2000, 1125], // 16:9
  ["hair-before.webp", 1200, 1600], // 3:4
  ["hair-after.webp", 1200, 1600], // 3:4
  ["studio-front.webp", 1200, 1200], // 1:1
  ["testimonial-side.webp", 1000, 1250], // 4:5
];

const svg = (w, h, label) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#f2ebdf"/>
      <stop offset="50%" stop-color="#e7dcc9"/>
      <stop offset="100%" stop-color="#d9cbb0"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#g)"/>
  <line x1="0" y1="${h}" x2="${w}" y2="0" stroke="#1f4d3d" stroke-width="${Math.round(h / 180)}" opacity="0.4"/>
  <text x="50%" y="48%" fill="#1f4d3d" font-family="sans-serif" font-size="${Math.round(h / 18)}"
        text-anchor="middle" opacity="0.95">${label}</text>
  <text x="50%" y="56%" fill="#6b5b45" font-family="sans-serif" font-size="${Math.round(h / 34)}"
        text-anchor="middle">placeholder — ${w}×${h}</text>
</svg>`;

for (const [name, w, h] of slots) {
  const to = `${OUT}/${name}`;
  if (existsSync(to)) {
    console.log(`kept ${name} (already present)`);
    continue;
  }
  await sharp(Buffer.from(svg(w, h, name.replace(".webp", ""))))
    .webp({ quality: 80 })
    .toFile(to);
  console.log(`${name} ✓ placeholder`);
}

// The hero is a special case: Hero.tsx feeds this file to `maskImage` to clip
// the light sweep, so a flat rectangle would make the sweep cross the whole box
// instead of tracking the bottle. It has to ship with real alpha even as a
// placeholder — hence a bottle silhouette on a transparent ground rather than
// the labelled card above.
const HERO = `${OUT}/bottle-hero.webp`;
if (existsSync(HERO)) {
  console.log("kept bottle-hero.webp (already present)");
} else {
  const hw = 1050;
  const hh = 1400;
  // White body, gold collar, black pump, SILVER base band — the coconut bottle
  // is the only one in the line whose base ring is not gold. The body gradient
  // is a very narrow off-white ramp because a white bottle has to be modelled
  // with shadow rather than hue, or the silhouette reads as a flat cut-out.
  const bottle = `
<svg xmlns="http://www.w3.org/2000/svg" width="${hw}" height="${hh}">
  <defs>
    <linearGradient id="body" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#d8d2c6"/>
      <stop offset="30%" stop-color="#fdfcf9"/>
      <stop offset="62%" stop-color="#f3efe6"/>
      <stop offset="100%" stop-color="#cfc8ba"/>
    </linearGradient>
    <linearGradient id="cap" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#8a6d18"/>
      <stop offset="45%" stop-color="#e8c86a"/>
      <stop offset="100%" stop-color="#8a6d18"/>
    </linearGradient>
    <linearGradient id="base" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#8d8d8d"/>
      <stop offset="45%" stop-color="#dcdcdc"/>
      <stop offset="100%" stop-color="#8d8d8d"/>
    </linearGradient>
  </defs>
  <!-- pump — matte black -->
  <path d="M470 40 h110 a26 26 0 0 1 26 26 v54 h-162 v-54 a26 26 0 0 1 26 -26 z" fill="#1b1b1f"/>
  <rect x="497" y="120" width="56" height="110" fill="#2a2a30"/>
  <!-- gold collar -->
  <rect x="430" y="150" width="190" height="120" rx="16" fill="url(#cap)"/>
  <!-- shoulder + body -->
  <path d="M525 270 h0 c150 0 235 90 235 210 v760 c0 55 -40 90 -95 90 h-280
           c-55 0 -95 -35 -95 -90 v-760 c0 -120 85 -210 235 -210 z"
        fill="url(#body)"/>
  <!-- silver base band -->
  <rect x="290" y="1240" width="470" height="70" rx="14" fill="url(#base)"/>
  <text x="525" y="700" fill="#8a6d18" font-family="sans-serif" font-size="74"
        text-anchor="middle" opacity="0.9">COCO</text>
  <text x="525" y="790" fill="#8a6d18" font-family="sans-serif" font-size="74"
        text-anchor="middle" opacity="0.9">NUT</text>
  <text x="525" y="880" fill="#6b5b45" font-family="sans-serif" font-size="36"
        text-anchor="middle" opacity="0.8">placeholder</text>
</svg>`;
  await sharp(Buffer.from(bottle))
    .webp({ quality: 92, alphaQuality: 100 })
    .toFile(HERO);
  console.log("bottle-hero.webp ✓ placeholder (transparent)");
}

console.log("\ndone — replace these via WORKFLOWS.md, then run scripts/process-images.mjs");
console.log("the hero comes from scripts/cutout-hero.mjs, not process-images.mjs");
