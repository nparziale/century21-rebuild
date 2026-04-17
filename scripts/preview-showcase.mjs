#!/usr/bin/env node
import { chromium } from '/Users/nparziale/repos/century21-test/node_modules/.pnpm/playwright@1.59.1/node_modules/playwright/index.mjs';
import { mkdir, rm } from 'node:fs/promises';
import { resolve } from 'node:path';

const OUT = resolve(process.cwd(), '.screenshots/showcase');
await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });

const VPS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile',  width: 390, height: 844 },
];

const browser = await chromium.launch();
for (const vp of VPS) {
  const ctx = await browser.newContext({ viewport: vp, deviceScaleFactor: 1, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  await page.goto('http://127.0.0.1:8765/showcase.html', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(700);

  // Settle any scroll-triggered work + load all images
  const totalH = await page.evaluate(() => document.documentElement.scrollHeight);
  let y = 0;
  while (y < totalH) {
    await page.evaluate((yy) => window.scrollTo(0, yy), y);
    await page.waitForTimeout(120);
    y += vp.height * 0.85;
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);

  const total = await page.evaluate(() => document.documentElement.scrollHeight);
  const step = Math.floor(vp.height * 0.92);
  let i = 0;
  y = 0;
  while (y < total) {
    await page.evaluate((yy) => window.scrollTo(0, yy), y);
    await page.waitForTimeout(120);
    const ch = Math.min(vp.height, total - y);
    await page.screenshot({ path: `${OUT}/${vp.name}-${String(i).padStart(2, '0')}.png`, clip: { x: 0, y: 0, width: vp.width, height: ch } });
    i += 1;
    y += step;
  }
  console.log(`✓ ${vp.name}: ${i} slices · total ${total}px`);
  await ctx.close();
}
await browser.close();
