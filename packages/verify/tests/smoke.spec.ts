import { expect, test } from '@playwright/test';
import {
  MORTGAGE_REFERENCE_INPUTS,
  MORTGAGE_REFERENCE_MONTHLY,
  mortgage,
} from '@c21/shared/math/mortgage';
import { pageUrl, VERSIONS, waitForFonts } from './_helpers.ts';

/**
 * Interaction smoke tests — one row per version. Exercises the interactive
 * contracts from the plan's verification section.
 */
test('mortgage math reference value is correct in shared util', () => {
  const { monthlyPayment } = mortgage(MORTGAGE_REFERENCE_INPUTS);
  expect(Math.abs(monthlyPayment - MORTGAGE_REFERENCE_MONTHLY)).toBeLessThanOrEqual(0.01);
});

for (const v of VERSIONS) {
  test(`smoke: ${v.name} mortgage calc matches shared util`, async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(pageUrl(v.id, 'listing'));
    await waitForFonts(page);

    const calc = page.locator('[data-section="mortgage-calc"]');
    await expect(calc).toBeVisible();

    // Set reference inputs. Each version wires inputs with these stable data-testids.
    await calc.locator('[data-testid="mortgage-price"]').fill('285000');
    await calc.locator('[data-testid="mortgage-down"]').fill('30');
    await calc.locator('[data-testid="mortgage-term"]').fill('20');
    await calc.locator('[data-testid="mortgage-rate"]').fill('8');

    const value = await calc.locator('[data-testid="mortgage-monthly"]').textContent();
    const num = Number((value ?? '').replace(/[^\d.-]/g, ''));
    expect(Math.abs(num - MORTGAGE_REFERENCE_MONTHLY)).toBeLessThanOrEqual(0.5);
  });

  test(`smoke: ${v.name} contact form blocks empty submit`, async ({ page }) => {
    await page.goto(pageUrl(v.id, 'listing'));
    await waitForFonts(page);

    const form = page.locator('[data-section="contact-form"] form');
    await expect(form).toBeVisible();
    await form.locator('button[type="submit"]').click();
    // Any required field should now report invalid
    const invalidCount = await form.locator(':invalid').count();
    expect(invalidCount).toBeGreaterThan(0);
  });

  test(`smoke: ${v.name} favorite toggle persists via localStorage`, async ({ page }) => {
    await page.goto(pageUrl(v.id, 'listing'));
    await waitForFonts(page);

    const btn = page.locator('[data-testid="favorite-toggle"]');
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
