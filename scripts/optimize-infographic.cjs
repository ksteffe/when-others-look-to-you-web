/* eslint-disable @typescript-eslint/no-require-imports -- Node CommonJS */
/**
 * Lossy-ish PNG optimization (palette quantization + zlib) for fixed infographic assets.
 * Rescale wide exports first (e.g. `sips --resampleWidth 1200 public/assets/foo.png`).
 *
 * Usage:
 *   npm run optimize:infographic
 *   node scripts/optimize-infographic.cjs public/assets/one.png public/assets/two.png
 */
const fs = require("fs");
const path = require("path");

const DEFAULT_NAMES = [
  "attention-finds-a-focus.png",
  "examples-accumulate.png",
  "leadership-coalesces.png",
];

async function optimizeOne(sharp, target) {
  const before = fs.statSync(target).size;
  const meta = await sharp(target).metadata();

  const buf = await sharp(target)
    .png({
      compressionLevel: 9,
      effort: 10,
      adaptiveFiltering: true,
      palette: true,
      quality: 82,
      colors: 256,
    })
    .toBuffer();

  fs.writeFileSync(target, buf);

  const after = fs.statSync(target).size;
  console.log(
    `${path.basename(target)}: ${meta.width}×${meta.height}, ${before} → ${after} bytes (${((100 * after) / before).toFixed(1)}% of prior file)`,
  );
}

async function main() {
  const sharp = require("sharp");
  const argv = process.argv.slice(2);
  const targets =
    argv.length > 0
      ? argv.map((p) => path.resolve(process.cwd(), p))
      : DEFAULT_NAMES.map((name) =>
          path.join(__dirname, "../public/assets", name),
        ).filter((p) => fs.existsSync(p));

  if (targets.length === 0) {
    console.error("No PNG paths found to optimize.");
    process.exit(1);
  }

  for (const target of targets) {
    if (!fs.existsSync(target)) {
      console.error("Missing:", target);
      process.exit(1);
    }
    await optimizeOne(sharp, target);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
