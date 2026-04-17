import type { Money } from '@c21/shared';

/**
 * Format a Money object in es-AR locale with currency prefix.
 * USD → "USD 285.000", ARS → "ARS 313.500.000".
 */
export function formatMoney(m: Money | undefined): string {
  if (!m) return '';
  const n = new Intl.NumberFormat('es-AR', {
    maximumFractionDigits: 0,
  }).format(m.amount);
  return `${m.currency} ${n}`;
}

/** Compact USD — "USD 285k" or "USD 1,2M" — for tight spaces. */
export function formatMoneyCompact(m: Money | undefined): string {
  if (!m) return '';
  const n = m.amount;
  if (n >= 1_000_000) {
    return `${m.currency} ${(n / 1_000_000).toFixed(1).replace('.', ',')}M`;
  }
  if (n >= 1_000) {
    return `${m.currency} ${Math.round(n / 1_000)}k`;
  }
  return `${m.currency} ${n}`;
}

export function formatNumber(n: number, fractionDigits = 0): string {
  return new Intl.NumberFormat('es-AR', {
    maximumFractionDigits: fractionDigits,
    minimumFractionDigits: fractionDigits,
  }).format(n);
}

export function formatDateAR(iso: string): string {
  const d = new Date(iso);
  return new Intl.DateTimeFormat('es-AR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(d);
}

export function formatDateShort(iso: string): string {
  const d = new Date(iso);
  return new Intl.DateTimeFormat('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(d);
}
