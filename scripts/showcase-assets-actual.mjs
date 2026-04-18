#!/usr/bin/env node
/**
 * Capture mobile screenshots of the current (production) century21.com.ar
 * home page and reference listing (286194) for the "Versión actual" section
 * of the showcase. Matches the layout used for the rebuilt versions.
 *
 *   actual-home-mobile-full.jpg     — full-page mobile, retina
 *   actual-listing-mobile-full.jpg  — full-page mobile, retina
 */
import { chromium } from 'playwright';
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const OUT = resolve(ROOT, 'century21-rebuild', 'showcase-assets');
await mkdir(OUT, { recursive: true });

const ROUTES = [
  {
    name: 'actual-home',
    url: 'https://century21.com.ar/',
  },
  {
    name: 'actual-listing',
    url: 'https://century21.com.ar/propiedad/286194_casa-de-4-ambientes-en-venta-ramos-mejia-con-pileta-y-cochera',
  },
];

const MOBILE = { width: 390, height: 844 };

// The sandboxed session this was written in ships a chromium at a fixed path;
// anywhere else, let Playwright resolve its own browser.
import { existsSync } from 'node:fs';
const SANDBOX_CHROMIUM = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const browser = await chromium.launch(
  existsSync(SANDBOX_CHROMIUM) ? { executablePath: SANDBOX_CHROMIUM } : {},
);

for (const r of ROUTES) {
  const ctx = await browser.newContext({
    viewport: MOBILE,
    deviceScaleFactor: 2,
    reducedMotion: 'reduce',
    ignoreHTTPSErrors: true,
    userAgent:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
  });
  const page = await ctx.newPage();
  console.log(`→ ${r.name}: ${r.url}`);
  await page.goto(r.url, { waitUntil: 'networkidle', timeout: 45000 });
  await page.waitForTimeout(1500);

  // Dismiss any cookie / consent banners if present
  const dismissers = [
    'button:has-text("Aceptar")',
    'button:has-text("Acepto")',
    'button:has-text("ACEPTAR")',
    'button:has-text("Entendido")',
    'button:has-text("OK")',
    'button:has-text("Cerrar")',
    '[aria-label="Cerrar"]',
  ];
  for (const sel of dismissers) {
    const btn = page.locator(sel).first();
    if (await btn.count().catch(() => 0)) {
      await btn.click({ timeout: 1500 }).catch(() => {});
      await page.waitForTimeout(300);
    }
  }

  // Trigger lazy content by scrolling the full height in chunks
  const totalH = await page.evaluate(() => document.documentElement.scrollHeight);
  let y = 0;
  while (y < totalH + MOBILE.height) {
    await page.evaluate((yy) => window.scrollTo(0, yy), y);
    await page.waitForTimeout(120);
    y += MOBILE.height * 0.9;
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);

  // Force lazy images to load + decode
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
                setTimeout(resolve, 8000);
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

  const pngPath = `${OUT}/${r.name}-mobile-full.png`;
  const jpgPath = `${OUT}/${r.name}-mobile-full.jpg`;
  await page.screenshot({ path: pngPath, fullPage: true });

  const meta = await sharp(pngPath).jpeg({ quality: 82, mozjpeg: true }).toFile(jpgPath).then((info) => info);
  console.log(`  ✓ ${r.name} → ${meta.width}×${meta.height} (${Math.round(meta.size / 1024)}KB)`);

  await ctx.close();
}

await browser.close();
console.log(`\nDone. Assets in ${OUT}`);
