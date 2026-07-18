/**
 * Generates raster assets from the SVG sources in /public:
 *   - og-image.png  (1200x630) — social platforms need PNG/JPG, not SVG
 *   - favicon.ico   (16/32/48, PNG-compressed entries)
 *   - apple-touch-icon.png (180x180)
 *
 * Run: node scripts/gen-assets.mjs   (sharp ships with Astro's image tooling)
 */
import sharp from "sharp";
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pub = join(root, "public");

// 1) OG image → PNG
await sharp(join(pub, "og-image.svg"))
  .resize(1200, 630)
  .png()
  .toFile(join(pub, "og-image.png"));
console.log("✓ og-image.png");

// 2) Apple touch icon (needs an opaque background)
const markSvg = readFileSync(join(pub, "favicon.svg"));
await sharp(markSvg).resize(180, 180).png().toFile(join(pub, "apple-touch-icon.png"));
console.log("✓ apple-touch-icon.png");

// 3) favicon.ico — pack PNG entries for 16/32/48
const sizes = [16, 32, 48];
const pngs = await Promise.all(
  sizes.map((s) => sharp(markSvg).resize(s, s).png().toBuffer()),
);

const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type: icon
header.writeUInt16LE(sizes.length, 4); // count

const entries = [];
let offset = 6 + sizes.length * 16;
pngs.forEach((png, i) => {
  const e = Buffer.alloc(16);
  const s = sizes[i];
  e.writeUInt8(s === 256 ? 0 : s, 0); // width
  e.writeUInt8(s === 256 ? 0 : s, 1); // height
  e.writeUInt8(0, 2); // palette
  e.writeUInt8(0, 3); // reserved
  e.writeUInt16LE(1, 4); // color planes
  e.writeUInt16LE(32, 6); // bits per pixel
  e.writeUInt32LE(png.length, 8); // size of image data
  e.writeUInt32LE(offset, 12); // offset
  offset += png.length;
  entries.push(e);
});

writeFileSync(join(pub, "favicon.ico"), Buffer.concat([header, ...entries, ...pngs]));
console.log("✓ favicon.ico");
