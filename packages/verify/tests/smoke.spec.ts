import { expect, test } from '@playwright/test';
import { pageUrl, VERSIONS, waitForFonts } from './_helpers.ts';

/**
 * Interaction smoke tests — one row per version. Exercises the interactive
 * contracts from the plan's verification section.
 */
for (const v of VERSIONS) {
  test(`smoke: ${v.name} contact form blocks empty submit`, async ({ page }) => {
    await page.goto(pageUrl(v.id, 'listing'));
    await waitForFonts(page);

    const form = page.locator('[data-section="contact-form"] form').first();
    await expect(form).toBeVisible();
    await form.locator('button[type="submit"]').first().click();
    const invalidCount = await form.locator(':invalid').count();
    expect(invalidCount).toBeGreaterThan(0);
  });

  test(`smoke: ${v.name} favorite toggle persists via localStorage`, async ({ page }) => {
    // Mobile viewport so the single-visible mobile share bar is the hit target.
    await page.setViewportSize({ width: 375, height: 780 });
    await page.goto(pageUrl(v.id, 'listing'));
    await waitForFonts(page);

    const btn = page.locator('[data-testid="favorite-toggle"]:visible').first();
    await expect(btn).toBeVisible();
    await btn.click();
    const saved = await page.evaluate(() => window.localStorage.getItem('c21:favorites'));
    expect(saved).toContain('286194');
  });

  test(`smoke: ${v.name} mobile nav opens sheet + closes on Esc`, async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 780 });
    await page.goto(pageUrl(v.id, 'home'));
    await waitForFonts(page);

    await page.locator('[data-testid="mobile-nav-toggle"]').click();
    const sheet = page.locator('[data-testid="mobile-nav-sheet"]');
    await expect(sheet).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(sheet).toBeHidden();
  });
}
