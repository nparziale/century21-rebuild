import { chromium } from '/Users/nparziale/repos/century21-test/node_modules/.pnpm/playwright@1.59.1/node_modules/playwright/index.mjs';
import { mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';

const OUT = resolve(process.cwd(), '.screenshots/header-zoom');
await mkdir(OUT, { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 390, height: 200 },
  deviceScaleFactor: 3,
  reducedMotion: 'reduce',
});
const page = await ctx.newPage();
await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
await page.waitForTimeout(500);
await page.screenshot({ path: `${OUT}/v1-home-header.png`, clip: { x: 0, y: 0, width: 390, height: 200 } });
console.log('done');
await browser.close();
