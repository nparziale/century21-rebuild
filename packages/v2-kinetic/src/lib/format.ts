import type { Money } from '@c21/shared';

/**
 * Currency formatter with intentional mono-friendly output. Uses es-AR grouping
 * for ARS and en-US for USD so the mono column lines up in the hero/listing.
 */
export function formatMoney(m: Money, opts?: { compact?: boolean }): string {
  const { amount, currency } = m;
  const locale = currency === 'ARS' ? 'es-AR' : 'en-US';
  const fmt = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
    notation: opts?.compact ? 'compact' : 'standard',
  });
  return fmt.format(amount);
}

/** Format a plain number with thousand separators. */
export function formatNumber(n: number, locale = 'es-AR', fractionDigits = 0): string {
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(n);
}

export function formatDateISO(iso: string, locale = 'es-AR'): string {
  const d = new Date(iso);
  return new Intl.DateTimeFormat(locale, { day: '2-digit', month: 'short', year: 'numeric' }).format(d);
}
