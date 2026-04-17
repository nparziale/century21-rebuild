#!/usr/bin/env node
/**
 * Compose the showcase from each version's built dist/.
 *
 * Expects `pnpm build` to have run (each packages/v*/dist/ exists).
 *
 * Output: dist-showcase/
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
const OUT = resolve(ROOT, 'dist-showcase');

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
    console.log(`✓ ${v.id} → dist-showcase/${v.id}/`);
  }

  let html = await readFile(resolve(ROOT, 'showcase.html'), 'utf8');
  // Rewrite dev links to built paths
  for (const v of versions) {
    html = html.replaceAll(`http://localhost:${v.port}/propiedad/286194`, `./${v.id}/index.html#/propiedad/286194`);
    html = html.replaceAll(`http://localhost:${v.port}/`, `./${v.id}/index.html`);
  }
  await writeFile(resolve(OUT, 'index.html'), html);
  await cp(resolve(ROOT, 'showcase.css'), resolve(OUT, 'showcase.css'));
  console.log(`✓ showcase.html + showcase.css → dist-showcase/`);

  console.log(`\nShowcase ready at ${OUT}`);
  console.log(`Run: pnpm preview:showcase  (or serve dist-showcase/ with any static server)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
