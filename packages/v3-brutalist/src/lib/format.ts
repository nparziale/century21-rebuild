/**
 * Number / currency formatters for V3.
 * Always es-AR; always tabular numerals at render.
 */
import type { Money } from '@c21/shared';

const nfUsd = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

const nfUsdCents = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const nfArs = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  maximumFractionDigits: 0,
});

const nfInt = new Intl.NumberFormat('es-AR', { maximumFractionDigits: 0 });
const nfDec = new Intl.NumberFormat('es-AR', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatMoney(m: Money): string {
  return m.currency === 'USD' ? nfUsd.format(m.amount) : nfArs.format(m.amount);
}

export function formatInt(n: number): string {
  return nfInt.format(Math.round(n));
}

export function formatDecimal(n: number): string {
  return nfDec.format(n);
}

export function formatCurrencyNumber(n: number, currency: 'USD' | 'ARS' = 'USD'): string {
  return currency === 'USD' ? nfUsd.format(n) : nfArs.format(n);
}

export function formatCurrencyCents(n: number, currency: 'USD' | 'ARS' = 'USD'): string {
  return currency === 'USD' ? nfUsdCents.format(n) : nfArs.format(n);
}

/** Percent label, always 0-1 input. */
export function formatPct(n: number): string {
  return `${Math.round(n * 100)}%`;
}

export function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' });
}
