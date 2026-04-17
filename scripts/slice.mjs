#!/usr/bin/env node
/**
 * Capture each route as a sequence of viewport-sized "slices" by scrolling.
 * This produces small, faithfully-sized PNGs that don't get downscaled to the
 * point of unreadability when viewed in the agent's image tool.
 */
import { chromium } from '/Users/nparziale/repos/century21-test/node_modules/.pnpm/playwright@1.59.1/node_modules/playwright/index.mjs';
import { mkdir, rm } from 'node:fs/promises';
import { resolve } from 'node:path';

const OUT = resolve(process.cwd(), process.argv[2] || '.screenshots/slices');
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
const VIEWPORTS = [
  { name: 'mobile',  width: 390, height: 844 },
  { name: 'desktop', width: 1440, height: 900 },
];

const browser = await chromium.launch();

for (const r of ROUTES) {
  for (const vp of VIEWPORTS) {
    const ctx = await browser.newContext({
      viewport: vp,
      deviceScaleFactor: 1,
      reducedMotion: 'reduce',
    });
    const page = await ctx.newPage();
    await page.goto(`http://localhost:${r.port}${r.path}`, { waitUntil: 'networkidle', timeout: 20000 });
    await page.waitForTimeout(500);

    // Force any whileInView blocks to settle by scrolling the whole page first
    const totalH = await page.evaluate(() => document.documentElement.scrollHeight);
    const step = Math.floor(vp.height * 0.9);
    let y = 0;
    while (y < totalH) {
      await page.evaluate((yy) => window.scrollTo(0, yy), y);
      await page.waitForTimeout(120);
      y += step;
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(300);

    // Now scroll-and-capture
    let i = 0;
    y = 0;
    while (y < totalH) {
      await page.evaluate((yy) => window.scrollTo(0, yy), y);
      await page.waitForTimeout(120);
      const captureH = Math.min(vp.height, totalH - y);
      await page.screenshot({
        path: `${OUT}/${r.v}-${r.page}-${vp.name}-${String(i).padStart(2, '0')}.png`,
        clip: { x: 0, y: 0, width: vp.width, height: captureH },
      });
      i += 1;
      y += step;
    }
    console.log(`✓ ${r.v}/${r.page} ${vp.name} — ${i} slices`);
    await ctx.close();
  }
}
await browser.close();
console.log(`\nDone. Slices in ${OUT}`);
