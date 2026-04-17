import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { pageUrl, PAGES, VERSIONS, VIEWPORTS, waitForFonts } from './_helpers.ts';

/**
 * Accessibility gate — zero serious/critical axe violations against WCAG
 * 2.2 AA tag set. Ran against mobile-sm + desktop to cover both extremes.
 */
const A11Y_VIEWPORTS = VIEWPORTS.filter((v) => v.name === 'mobile-sm' || v.name === 'laptop');

for (const v of VERSIONS) {
  for (const p of PAGES) {
    for (const vp of A11Y_VIEWPORTS) {
      test(`a11y: ${v.name} ${p.key} @ ${vp.width}x${vp.height}`, async ({ page }) => {
        await page.setViewportSize({ width: vp.width, height: vp.height });
        await page.goto(pageUrl(v.id, p.key));
        await waitForFonts(page);

        const results = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag22aa', 'best-practice'])
          .analyze();

        const seriousOrCritical = results.violations.filter(
          (v) => v.impact === 'serious' || v.impact === 'critical',
        );
        expect(
          seriousOrCritical.map((x) => `${x.id}: ${x.help} (${x.nodes.length})`),
          'no serious or critical axe violations allowed',
        ).toEqual([]);
      });
    }
  }
}
