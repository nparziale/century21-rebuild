import { expect, test } from '@playwright/test';
import { pageUrl, PAGES, VERSIONS, VIEWPORTS, waitForFonts } from './_helpers.ts';

/**
 * Visual regression gate. First run writes baselines under ./snapshots/;
 * subsequent runs diff with maxDiffPixelRatio 0.01. Fonts and animations are
 * settled before snapshot.
 */
for (const v of VERSIONS) {
  for (const p of PAGES) {
    for (const vp of VIEWPORTS) {
      test(`visual: ${v.name} ${p.key} @ ${vp.width}x${vp.height}`, async ({ page }) => {
        await page.setViewportSize({ width: vp.width, height: vp.height });
        await page.emulateMedia({ reducedMotion: 'reduce' });
        await page.goto(pageUrl(v.id, p.key));
        await waitForFonts(page);
        await expect(page).toHaveScreenshot(`${v.id}-${p.key}-${vp.name}.png`, {
          fullPage: true,
        });
      });
    }
  }
}
