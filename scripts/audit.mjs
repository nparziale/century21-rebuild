#!/usr/bin/env node
/**
 * Per-section audit: for each route, walk every [data-section] block and
 * report height, child count, presence of broken images, computed layout
 * issues. Also dump per-section cropped screenshots for visual review.
 */
import { chromium } from '/Users/nparziale/repos/century21-test/node_modules/.pnpm/playwright@1.59.1/node_modules/playwright/index.mjs';
import { mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';

const OUT = resolve(process.cwd(), '.screenshots/audit');
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
const reports = {};

for (const r of ROUTES) {
  for (const vp of VIEWPORTS) {
    const ctx = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 1,
    });
    const page = await ctx.newPage();
    const failedImages = [];
    page.on('response', (resp) => {
      const url = resp.url();
      const ct = resp.headers()['content-type'] || '';
      if (
        /\.(png|jpe?g|webp|svg|gif|avif|mp4|webm)(\?|$)/i.test(url) &&
        ct.includes('text/html')
      ) {
        failedImages.push({ url, status: resp.status() });
      }
      if (resp.status() === 404 && /(image|video)/.test(ct)) {
        failedImages.push({ url, status: 404 });
      }
    });

    try {
      await page.goto(`http://localhost:${r.port}${r.path}`, { waitUntil: 'networkidle', timeout: 20000 });
      await page.waitForTimeout(800);

      // Disable scroll-driven animations + parallax effects that depend on view
      // by jumping to bottom and back to settle layout.
      await page.evaluate(() => window.scrollTo(0, 0));

      const sections = await page.evaluate(() => {
        const ss = Array.from(document.querySelectorAll('[data-section]'));
        return ss.map((el) => {
          const r = el.getBoundingClientRect();
          const cs = getComputedStyle(el);
          // Count broken images (natural size 0 or src that returned 404)
          const imgs = Array.from(el.querySelectorAll('img'));
          const brokenImgs = imgs.filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.src);
          // Detect text overflow / horizontal scrolling under this section
          const child = el.firstElementChild;
          const childW = child ? child.getBoundingClientRect().width : 0;
          return {
            section: el.getAttribute('data-section'),
            height: Math.round(r.height),
            top: Math.round(r.top + window.scrollY),
            children: el.childElementCount,
            innerTextLen: el.innerText?.length || 0,
            background: cs.backgroundColor,
            brokenImgs,
            imgsTotal: imgs.length,
            childWidth: Math.round(childW),
          };
        });
      });

      const docOverflow = await page.evaluate(() => ({
        documentScrollWidth: document.documentElement.scrollWidth,
        documentScrollHeight: document.documentElement.scrollHeight,
        viewportWidth: window.innerWidth,
      }));

      reports[`${r.v}-${r.page}-${vp.name}`] = { sections, docOverflow, failedImages };

      // Crop one screenshot per section so I can visually inspect each individually.
      for (const s of sections) {
        if (s.height < 10) continue;
        await page.evaluate((y) => window.scrollTo(0, Math.max(0, y - 20)), s.top);
        await page.waitForTimeout(120);
        const captureH = Math.min(s.height + 40, 2000);
        await page.screenshot({
          path: `${OUT}/${r.v}-${r.page}-${vp.name}-${s.section}.png`,
          clip: { x: 0, y: 20, width: vp.width, height: captureH },
        });
      }
      console.log(`✓ ${r.v}/${r.page} @ ${vp.name} — ${sections.length} sections`);
    } catch (e) {
      console.log(`✗ ${r.v}/${r.page} @ ${vp.name}: ${e.message}`);
    }
    await ctx.close();
  }
}

await browser.close();

// Compact text report
console.log('\n=== AUDIT REPORT ===');
for (const [key, rep] of Object.entries(reports)) {
  console.log(`\n--- ${key} ---`);
  console.log(`document: ${rep.docOverflow.documentScrollWidth}w (vp ${rep.docOverflow.viewportWidth}) × ${rep.docOverflow.documentScrollHeight}h`);
  if (rep.docOverflow.documentScrollWidth > rep.docOverflow.viewportWidth) {
    console.log(`  ⚠ HORIZONTAL OVERFLOW: ${rep.docOverflow.documentScrollWidth - rep.docOverflow.viewportWidth}px`);
  }
  for (const s of rep.sections) {
    const flags = [];
    if (s.height < 50) flags.push('tiny');
    if (s.height > 2500) flags.push('huge');
    if (s.imgsTotal > 0 && s.brokenImgs.length > 0) flags.push(`${s.brokenImgs.length}/${s.imgsTotal} broken-img`);
    if (s.innerTextLen < 5 && s.imgsTotal === 0 && s.height > 100) flags.push('empty-with-height');
    const tag = flags.length ? `  [${flags.join(', ')}]` : '';
    console.log(`  ${s.section.padEnd(20)} h=${String(s.height).padStart(5)} txt=${s.innerTextLen}${tag}`);
  }
  if (rep.failedImages.length) {
    console.log(`  failed images: ${rep.failedImages.length}`);
    for (const f of rep.failedImages.slice(0, 5)) console.log(`    ${f.status} ${f.url}`);
  }
}
