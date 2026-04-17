#!/usr/bin/env node
/**
 * Compose the showcase from each version's built dist/.
 *
 * Expects `pnpm build` to have run (each packages/v1-editorial, v2-kinetic,
 * v3-brutalist has a dist/ directory).
 *
 * Output: century21-rebuild/dist-showcase/
 *   ├── index.html      (showcase.html with localhost links rewritten to ./v1, ./v2, ./v3)
 *   ├── showcase.css
 *   ├── v1/…            (copy of packages/v1-editorial/dist)
 *   ├── v2/…            (copy of packages/v2-kinetic/dist)
 *   └── v3/…            (copy of packages/v3-brutalist/dist)
 */
import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const SITE = resolve(ROOT, 'century21-rebuild');
const OUT = resolve(SITE, 'dist-showcase');
/** Root mirror for hosts (e.g. Render) whose publish dir is still `dist-showcase`. */
const OUT_MIRROR = resolve(ROOT, 'dist-showcase');

const versions = [
  { id: 'v1', src: 'packages/v1-editorial/dist', port: 5173 },
  { id: 'v2', src: 'packages/v2-kinetic/dist', port: 5174 },
  { id: 'v3', src: 'packages/v3-brutalist/dist', port: 5175 },
];

async function main() {
  if (existsSync(OUT)) await rm(OUT, { recursive: true, force: true });
  await mkdir(OUT, { recursive: true });

  for (const v of versions) {
    const srcAbs = resolve(ROOT, v.src);
    if (!existsSync(srcAbs)) {
      console.error(`✗ Missing build: ${v.src} — run \`pnpm build\` first`);
      process.exit(1);
    }
    await cp(srcAbs, resolve(OUT, v.id), { recursive: true });
    console.log(`✓ ${v.id} → century21-rebuild/dist-showcase/${v.id}/`);
  }

  let html = await readFile(resolve(SITE, 'showcase.html'), 'utf8');
  // Rewrite dev links to built paths
  for (const v of versions) {
    html = html.replaceAll(`http://localhost:${v.port}/propiedad/286194`, `./${v.id}/index.html#/propiedad/286194`);
    html = html.replaceAll(`http://localhost:${v.port}/`, `./${v.id}/index.html`);
  }
  await writeFile(resolve(OUT, 'index.html'), html);
  await cp(resolve(SITE, 'showcase.css'), resolve(OUT, 'showcase.css'));
  const assetsSrc = resolve(SITE, 'showcase-assets');
  if (existsSync(assetsSrc)) {
    await cp(assetsSrc, resolve(OUT, 'showcase-assets'), { recursive: true });
    console.log(`✓ showcase.html + showcase.css + showcase-assets → century21-rebuild/dist-showcase/`);
  } else {
    console.log(`✓ showcase.html + showcase.css → century21-rebuild/dist-showcase/ (no showcase-assets dir found — run \`node scripts/showcase-assets.mjs\` to regenerate phone-frame screenshots)`);
  }

  if (existsSync(OUT_MIRROR)) await rm(OUT_MIRROR, { recursive: true, force: true });
  await cp(OUT, OUT_MIRROR, { recursive: true });

  console.log(`\nShowcase ready at ${OUT}`);
  console.log(`(also mirrored to ${OUT_MIRROR} for static hosts using that publish path)`);
  console.log(`Run: pnpm preview:showcase  (or serve century21-rebuild/dist-showcase/ with any static server)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
