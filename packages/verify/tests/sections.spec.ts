import { test } from '@playwright/test';
import {
  assertAllSectionsPresent,
  pageUrl,
  PAGES,
  VERSIONS,
  VIEWPORTS,
  waitForFonts,
} from './_helpers.ts';

/**
 * Section-presence gate — every page of every version at every viewport must
 * render every required data-section key. A missing key fails the gate with a
 * named error that directly tells you which section to fix.
 */
for (const v of VERSIONS) {
  for (const p of PAGES) {
    for (const vp of VIEWPORTS) {
      test(`sections: ${v.name} ${p.key} @ ${vp.width}x${vp.height}`, async ({ page }) => {
        await page.setViewportSize({ width: vp.width, height: vp.height });
        await page.goto(pageUrl(v.id, p.key));
        await waitForFonts(page);
        await assertAllSectionsPresent(page, p.sections);
      });
    }
  }
}
