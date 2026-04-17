import { expect, Locator, test } from '@playwright/test';
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

/**
 * Parse a localised currency/number string. Handles both en-US ("$1,668.69")
 * and es-AR ("US$ 1.668,69" or "US$ 1.669" integer). The LAST separator with
 * exactly 1–2 trailing digits is the decimal point; everything else is a
 * thousands separator and is stripped.
 */
function parseLocalizedNumber(raw: string): number {
  const digits = raw.replace(/[^\d,.-]/g, '');
  if (!digits) return NaN;
  const m = digits.match(/[.,](\d{1,2})$/);
  if (m) {
    const decIdx = m.index!;
    const intPart = digits.slice(0, decIdx).replace(/[.,]/g, '');
    return Number(`${intPart}.${m[1]}`);
  }
  // No decimal separator — strip both thousands separators.
  return Number(digits.replace(/[.,]/g, ''));
}

/**
 * Set <input>.value and fire input+change events through the native setter.
 * Works for <input type="range"> (where Playwright's .fill() is a no-op) as
 * well as text/number inputs.
 */
async function setInputValue(input: Locator, value: string): Promise<void> {
  await input.evaluate((el, v) => {
    const native = el as HTMLInputElement;
    const proto = Object.getPrototypeOf(native);
    const setter = Object.getOwnPropertyDescriptor(proto, 'value')?.set;
    setter?.call(native, v);
    native.dispatchEvent(new Event('input', { bubbles: true }));
    native.dispatchEvent(new Event('change', { bubbles: true }));
  }, value);
}

for (const v of VERSIONS) {
  test(`smoke: ${v.name} mortgage calc matches shared util`, async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(pageUrl(v.id, 'listing'));
    await waitForFonts(page);

    const calc = page.locator('[data-section="mortgage-calc"]');
    await expect(calc).toBeVisible();
    // Scroll the mortgage section into view so IntersectionObserver-driven
    // counters (V3) trigger their mount tween.
    await calc.scrollIntoViewIfNeeded();

    // Range inputs don't respond to Playwright's .fill(); use native setter + input/change events.
    for (const [testid, val] of [
      ['mortgage-price', '285000'],
      ['mortgage-down', '30'],
      ['mortgage-term', '20'],
      ['mortgage-rate', '8'],
    ] as const) {
      await setInputValue(calc.locator(`[data-testid="${testid}"]`).first(), val);
    }
    // Let any mount-tween or counter settle on the final value.
    await page.waitForTimeout(1200);

    const value = await calc.locator('[data-testid="mortgage-monthly"]').first().textContent();
    const num = parseLocalizedNumber(value ?? '');
    // Exactness is proved by the shared-math reference test below;
    // here we only assert the UI is within a sensible settling band.
    expect(Math.abs(num - MORTGAGE_REFERENCE_MONTHLY)).toBeLessThanOrEqual(5);
  });

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
