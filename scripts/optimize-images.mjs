import { readdir, stat } from 'node:fs/promises';
import { extname, join, basename } from 'node:path';
import sharp from 'sharp';

const PUBLIC_DIR = new URL('../public/', import.meta.url).pathname;
const TARGETS = new Set(['.png', '.jpg', '.jpeg']);

const formats = [
  { ext: '.avif', options: { quality: 55, effort: 6 } },
  { ext: '.webp', options: { quality: 80, effort: 5 } },
];

const fileSizeKb = async (path) => {
  try {
    const s = await stat(path);
    return Math.round(s.size / 1024);
  } catch {
    return null;
  }
};

const run = async () => {
  const entries = await readdir(PUBLIC_DIR);
  const sources = entries.filter((name) => TARGETS.has(extname(name).toLowerCase()));
  if (!sources.length) {
    console.log('no source images found in public/');
    return;
  }

  for (const file of sources) {
    const inputPath = join(PUBLIC_DIR, file);
    const stem = basename(file, extname(file));
    const inputKb = await fileSizeKb(inputPath);
    console.log(`\n${file} (${inputKb} KB)`);
    for (const { ext, options } of formats) {
      const outPath = join(PUBLIC_DIR, `${stem}${ext}`);
      const method = ext === '.avif' ? 'avif' : 'webp';
      await sharp(inputPath)[method](options).toFile(outPath);
      const outKb = await fileSizeKb(outPath);
      const pct = inputKb ? Math.round((1 - outKb / inputKb) * 100) : 0;
      console.log(`  → ${stem}${ext}  ${outKb} KB  (${pct}% smaller)`);
    }
  }
  console.log('\ndone');
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
