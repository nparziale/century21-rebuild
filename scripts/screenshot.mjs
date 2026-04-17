#!/usr/bin/env node
import { chromium } from '/Users/nparziale/repos/century21-test/node_modules/.pnpm/playwright@1.59.1/node_modules/playwright/index.mjs';
import { mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';

const OUT = process.argv[2] || '.screenshots/before';
const outDir = resolve(process.cwd(), OUT);
await mkdir(outDir, { recursive: true });

const ROUTES = [
  { v: 'v1', port: 5173, page: 'home',    path: '/' },
  { v: 'v1', port: 5173, page: 'listing', path: '/propiedad/286194' },
  { v: 'v2', port: 5174, page: 'home',    path: '/' },
  { v: 'v2', port: 5174, page: 'listing', path: '/propiedad/286194' },
  { v: 'v3', port: 5175, page: 'home',    path: '/' },
  { v: 'v3', port: 5175, page: 'listing', path: '/propiedad/286194' },
];

const VIEWPORTS = [
  { name: 'mobile',  width: 390, height: 844 },   // iPhone 14 Pro
  { name: 'desktop', width: 1440, height: 900 },
];

const errors = [];
const consoleMsgs = [];
const failedRequests = [];

const browser = await chromium.launch();

for (const r of ROUTES) {
  for (const vp of VIEWPORTS) {
    const ctx = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 2,
      reducedMotion: 'reduce',
    });
    const page = await ctx.newPage();

    page.on('pageerror', (err) => errors.push({ r: `${r.v}/${r.page}`, vp: vp.name, msg: String(err) }));
    page.on('console', (msg) => {
      if (msg.type() === 'error' || msg.type() === 'warning') {
        consoleMsgs.push({ r: `${r.v}/${r.page}`, vp: vp.name, type: msg.type(), text: msg.text() });
      }
    });
    page.on('requestfailed', (req) => {
      failedRequests.push({ r: `${r.v}/${r.page}`, vp: vp.name, url: req.url(), why: req.failure()?.errorText });
    });
    page.on('response', (resp) => {
      const url = resp.url();
      const ct = resp.headers()['content-type'] || '';
      // Detect images that returned HTML (Vite SPA fallback) — broken image
      if (
        /\.(png|jpe?g|webp|svg|gif|avif|mp4|webm|woff2?)(\?|$)/i.test(url) &&
        ct.includes('text/html')
      ) {
        failedRequests.push({
          r: `${r.v}/${r.page}`,
          vp: vp.name,
          url,
          why: `served HTML instead of asset (status ${resp.status()})`,
        });
      }
    });

    try {
      await page.goto(`http://localhost:${r.port}${r.path}`, { waitUntil: 'networkidle', timeout: 20000 });
      await page.waitForTimeout(800);
      await page.screenshot({
        path: `${outDir}/${r.v}-${r.page}-${vp.name}.png`,
        fullPage: true,
      });
      console.log(`✓ ${r.v}/${r.page} @ ${vp.name}`);
    } catch (e) {
      console.log(`✗ ${r.v}/${r.page} @ ${vp.name}: ${e.message}`);
      errors.push({ r: `${r.v}/${r.page}`, vp: vp.name, msg: e.message });
    }
    await ctx.close();
  }
}

await browser.close();

console.log('\n=== ERRORS ===');
for (const e of errors) console.log(JSON.stringify(e));
console.log('\n=== CONSOLE WARN/ERROR ===');
for (const c of consoleMsgs) console.log(JSON.stringify(c));
console.log('\n=== FAILED REQUESTS ===');
for (const f of failedRequests) console.log(JSON.stringify(f));
console.log(`\nDone. Screenshots in ${outDir}`);
