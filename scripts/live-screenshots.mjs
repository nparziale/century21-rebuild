#!/usr/bin/env node
/**
 * Capture mobile full-page screenshots of the live century21.com.ar site —
 * the home page and listing 286194 — for the "Sitio actual" section of the
 * showcase. Output goes to century21-rebuild/showcase-assets/ as PNGs; a
 * follow-up step converts them to JPG to match the existing convention.
 */
import { chromium } from '/Users/nparziale/repos/century21-test/node_modules/.pnpm/playwright@1.59.1/node_modules/playwright/index.mjs';
import { mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const OUT = resolve(ROOT, 'century21-rebuild', 'showcase-assets');
await mkdir(OUT, { recursive: true });

const ROUTES = [
  {
    name: 'current-home-mobile-full',
    url: 'https://century21.com.ar/',
  },
  {
    name: 'current-listing-mobile-full',
    url: 'https://century21.com.ar/propiedad/286194_casa-de-4-ambientes-en-venta-ramos-mejia-con-pileta-y-cochera',
  },
];

const MOBILE = { width: 390, height: 844 };

const browser = await chromium.launch();

for (const r of ROUTES) {
  const ctx = await browser.newContext({
    viewport: MOBILE,
    deviceScaleFactor: 2,
    reducedMotion: 'reduce',
    userAgent:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
    locale: 'es-AR',
  });
  const page = await ctx.newPage();

  try {
    await page.goto(r.url, { waitUntil: 'domcontentloaded', timeout: 45000 });
    // Some networkidle waits never resolve on sites with long-polling / ads.
    // Use a combination: wait a moment for the main content, then scroll the
    // page to trigger lazy-loads, then decode all images.
    await page.waitForTimeout(1500);
    try {
      await page.waitForLoadState('networkidle', { timeout: 8000 });
    } catch {
      /* ignore — networkidle is best-effort on third-party sites */
    }

    // Dismiss any cookie / consent / chat widgets that overlay the page.
    await page.evaluate(() => {
      const kill = (sel) =>
        document.querySelectorAll(sel).forEach((n) => n.remove());
      kill('#cookieAlert, .cookie-alert, #cookies, .cookies, #onetrust-consent-sdk, #CybotCookiebotDialog');
      // Common chat widgets
      kill('iframe[src*="tawk"], iframe[src*="chat"], #launcher, .zEWidget-launcher');
      // Anything fixed at bottom / top that looks banner-ish and massive
    });

    // Scroll in slices to trigger lazy images, then back to top.
    const totalH = await page.evaluate(() => document.documentElement.scrollHeight);
    let y = 0;
    while (y < totalH) {
      await page.evaluate((yy) => window.scrollTo(0, yy), y);
      await page.waitForTimeout(140);
      y += MOBILE.height * 0.9;
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(400);

    // Force-eager any lazy images.
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
    await page.evaluate(() =>
      Promise.all(
        Array.from(document.images).map((img) =>
          img.decode().catch(() => undefined),
        ),
      ),
    );
    await page.waitForTimeout(400);

    await page.screenshot({
      path: `${OUT}/${r.name}.png`,
      fullPage: true,
    });
    console.log(`✓ ${r.name}`);
  } catch (e) {
    console.log(`✗ ${r.name}: ${e.message}`);
  }

  await ctx.close();
}

await browser.close();
console.log(`\nDone. PNGs in ${OUT}`);
