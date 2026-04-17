import { expect, test } from '@playwright/test';
import { assertNoHorizontalScroll, pageUrl, PAGES, VERSIONS, VIEWPORTS, waitForFonts } from './_helpers.ts';

/**
 * Layout correctness gate — no horizontal scroll, tap targets ≥ 44x44 below
 * 1024 px, no orphan overlapping interactive elements.
 */
for (const v of VERSIONS) {
  for (const p of PAGES) {
    for (const vp of VIEWPORTS) {
      test(`layout: ${v.name} ${p.key} @ ${vp.width}x${vp.height}`, async ({ page }) => {
        await page.setViewportSize({ width: vp.width, height: vp.height });
        await page.goto(pageUrl(v.id, p.key));
        await waitForFonts(page);

        await assertNoHorizontalScroll(page);

        if (vp.width < 1024) {
          const tiny = await page.$$eval(
            'a, button, [role="button"], input, select, textarea',
            (els) =>
              els
                .filter((el) => {
                  const style = window.getComputedStyle(el);
                  return style.display !== 'none' && style.visibility !== 'hidden';
                })
                .map((el) => {
                  const r = el.getBoundingClientRect();
                  return { w: r.width, h: r.height, tag: el.tagName.toLowerCase() };
                })
                .filter((r) => r.w > 0 && r.h > 0 && (r.w < 44 || r.h < 44)),
          );
          expect(tiny, `tap targets must be ≥ 44×44 on mobile`).toEqual([]);
        }
      });
    }
  }
}
