#!/usr/bin/env node
/**
 * Capture polished mobile + desktop screenshots for the client-proposal
 * showcase. Output goes to century21-rebuild/showcase-assets/ next to showcase.html.
 *
 *   {v}-{home|listing}-mobile.png   — 390×first-2-screens (~1700px), retina
 *   {v}-{home|listing}-mobile-full.png — full-page mobile, retina
 */
import { chromium } from '/Users/nparziale/repos/century21-test/node_modules/.pnpm/playwright@1.59.1/node_modules/playwright/index.mjs';
import { mkdir, rm } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const OUT = resolve(ROOT, 'century21-rebuild', 'showcase-assets');
await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });

const ROUTES = [
  { v: 'v1', port: 5173, page: 'home',    path: '/' },
  { v: 'v1', port: 5173, page: 'listing', path: '/propiedad/286194' },
  { v: 'v2', port: 5174, page: 'home',    path: '/' },
  { v: 'v2', port: 5174, page: 'listing', path: '/propiedad/286194' },
  { v: 'v3', port: 5175, page: 'home',    path: '/' },
  { v: 'v3', port: 5175, page: 'listing', path: '/propiedad/286194' },
];

const MOBILE = { width: 390, height: 844 };

const browser = await chromium.launch();

for (const r of ROUTES) {
  const ctx = await browser.newContext({
    viewport: MOBILE,
    deviceScaleFactor: 2,
    reducedMotion: 'reduce',
  });
  const page = await ctx.newPage();
  await page.goto(`http://localhost:${r.port}${r.path}`, { waitUntil: 'networkidle', timeout: 25000 });
  await page.waitForTimeout(700);

  // Hide the mobile sticky share bar during fullPage capture. Chromium
  // renders position:sticky at the viewport-bottom offset for each tile of
  // the stitched screenshot, which makes the V3 share bar appear painted
  // over the gallery. The bar isn't design content for the proposal anyway.
  await page.addStyleTag({
    content: `[data-section="share-actions"] { display: none !important; }`,
  });

  // Settle whileInView animations by scrolling to bottom and back
  const totalH = await page.evaluate(() => document.documentElement.scrollHeight);
  let y = 0;
  while (y < totalH) {
    await page.evaluate((yy) => window.scrollTo(0, yy), y);
    await page.waitForTimeout(80);
    y += MOBILE.height * 0.9;
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);

  // Force every lazy image to load — horizontal scroll-snap galleries (V3
  // listing) don't trigger lazy-load via vertical scroll. Then await every
  // image to complete so the screenshot captures fully-rendered media.
  await page.evaluate(() => {
    document.querySelectorAll('img[loading="lazy"]').forEach((img) => {
      img.loading = 'eager';
    });
  });
  await page.evaluate(
    () =>
      Promise.all(
        Array.from(document.images)
          .filter((img) => !img.complete)
          .map(
            (img) =>
              new Promise((resolve) => {
                img.addEventListener('load', resolve, { once: true });
                img.addEventListener('error', resolve, { once: true });
              }),
          ),
      ),
  );
  // Force every loaded image to be GPU-decoded. Without this, Chromium
  // throws away decoded raster for off-screen <img> tags during fullPage
  // stitching, so the V3 listing's first gallery image ends up painted as
  // its LQIP backgroundImage instead of the actual photo.
  await page.evaluate(() =>
    Promise.all(
      Array.from(document.images).map((img) =>
        img.decode().catch(() => undefined),
      ),
    ),
  );
  await page.waitForTimeout(300);

  // Full-page mobile capture (used inside phone frame, scrollable)
  await page.screenshot({
    path: `${OUT}/${r.v}-${r.page}-mobile-full.png`,
    fullPage: true,
  });
  console.log(`✓ ${r.v}/${r.page} mobile full`);

  await ctx.close();
}

await browser.close();
console.log(`\nDone. Assets in ${OUT}`);
