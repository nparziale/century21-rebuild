import { expect, Page } from '@playwright/test';
import { PAGES, VERSIONS, VIEWPORTS } from '../manifest.ts';

export type VersionId = (typeof VERSIONS)[number]['id'];
export type PageKey = (typeof PAGES)[number]['key'];

export function baseUrl(versionId: VersionId): string {
  const v = VERSIONS.find((x) => x.id === versionId);
  if (!v) throw new Error(`Unknown version ${versionId}`);
  // When serving built showcase, override via CENTURY21_BASE env.
  const base = process.env.CENTURY21_BASE;
  if (base) return `${base.replace(/\/$/, '')}${v.buildBase}`;
  return `http://localhost:${v.devPort}`;
}

export function pageUrl(versionId: VersionId, pageKey: PageKey): string {
  const p = PAGES.find((x) => x.key === pageKey);
  if (!p) throw new Error(`Unknown page ${pageKey}`);
  return `${baseUrl(versionId)}${p.path}`;
}

export async function waitForFonts(page: Page): Promise<void> {
  await page.evaluate(() => (document as unknown as { fonts: FontFaceSet }).fonts.ready);
  // brief settle so layout is stable for screenshots
  await page.waitForTimeout(200);
}

export async function assertNoHorizontalScroll(page: Page): Promise<void> {
  const result = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    innerWidth: window.innerWidth,
  }));
  // Subpixel rounding in the browser layout engine can nudge scrollWidth by
  // ±2 px without a user-visible horizontal scrollbar ever appearing.
  expect(result.scrollWidth, 'page should not scroll horizontally').toBeLessThanOrEqual(
    result.innerWidth + 2,
  );
}

export async function assertAllSectionsPresent(page: Page, sections: readonly string[]): Promise<void> {
  for (const key of sections) {
    const el = page.locator(`[data-section="${key}"]`);
    await expect(el, `data-section="${key}" must be rendered`).toHaveCount(1);
  }
}

export { PAGES, VERSIONS, VIEWPORTS };
