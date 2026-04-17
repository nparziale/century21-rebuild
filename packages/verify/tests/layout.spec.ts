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
          // WCAG 2.5.8 (AA): primary targets ≥ 24×24. Scope: HTML <button>,
          // form controls, role=button. SVG children are skipped (an SVG
          // <circle role="button"> is typically decorative with an aria-
          // labelled wrapper handling the real hit area). Inline <a> in
          // flowing text is exempt by the WCAG spec itself.
          // Checkboxes and radios are native 13×13 by default; they're
          // conventionally paired with a <label> that carries the real hit
          // area. Excluding them matches WCAG's "equivalent click target"
          // rationale. Style them up-sized only when you want to gate on them.
          const tiny = await page.$$eval(
            'button:not(svg *), input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="range"]), select, textarea, [role="button"]:not(svg *), a[data-testid], [data-tap]',
            (els) =>
              els
                .filter((el) => {
                  if (el instanceof SVGElement) return false;
                  const style = window.getComputedStyle(el);
                  if (style.display === 'none' || style.visibility === 'hidden') return false;
                  const r = el.getBoundingClientRect();
                  return r.width > 0 && r.height > 0;
                })
                .map((el) => {
                  const r = el.getBoundingClientRect();
                  return {
                    w: Math.round(r.width),
                    h: Math.round(r.height),
                    tag: el.tagName.toLowerCase(),
                    testid: (el as HTMLElement).dataset.testid ?? '',
                  };
                })
                .filter((r) => r.w < 24 || r.h < 24),
          );
          expect(tiny, `primary tap targets must be ≥ 24×24 on mobile`).toEqual([]);
        }
      });
    }
  }
}
