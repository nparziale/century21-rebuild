/**
 * Fixed-rate mortgage monthly payment (standard amortization formula).
 *
 * Inputs:
 *   priceUsd        — property price in USD (e.g. 285000)
 *   downPaymentPct  — down payment as a fraction (0–1), e.g. 0.3 for 30%
 *   termYears       — loan term in years
 *   annualRatePct   — annual interest rate as a percent (e.g. 8 for 8%)
 *
 * Returns:
 *   { principal, monthlyPayment, totalPaid, totalInterest } — all USD numbers.
 *
 * Reference assertion (from verify harness): priceUsd=285000, downPaymentPct=0.3,
 * termYears=20, annualRatePct=8  ⇒  monthlyPayment ≈ 1668.69 USD  (±0.01).
 */
export type MortgageInputs = {
  priceUsd: number;
  downPaymentPct: number;
  termYears: number;
  annualRatePct: number;
};

export type MortgageResult = {
  principal: number;
  monthlyPayment: number;
  totalPaid: number;
  totalInterest: number;
};

export function mortgage(inputs: MortgageInputs): MortgageResult {
  const { priceUsd, downPaymentPct, termYears, annualRatePct } = inputs;
  const principal = priceUsd * (1 - downPaymentPct);
  const n = termYears * 12;
  const r = annualRatePct / 100 / 12;

  if (n <= 0) {
    return { principal, monthlyPayment: principal, totalPaid: principal, totalInterest: 0 };
  }

  let monthlyPayment: number;
  if (r === 0) {
    monthlyPayment = principal / n;
  } else {
    const growth = Math.pow(1 + r, n);
    monthlyPayment = (principal * r * growth) / (growth - 1);
  }

  const totalPaid = monthlyPayment * n;
  const totalInterest = totalPaid - principal;

  return {
    principal: round2(principal),
    monthlyPayment: round2(monthlyPayment),
    totalPaid: round2(totalPaid),
    totalInterest: round2(totalInterest),
  };
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

/** Canonical reference inputs used by the verify smoke test. */
export const MORTGAGE_REFERENCE_INPUTS: MortgageInputs = {
  priceUsd: 285000,
  downPaymentPct: 0.3,
  termYears: 20,
  annualRatePct: 8,
};

/** Expected monthly payment at the reference inputs: USD 1668.69 (±0.01). */
export const MORTGAGE_REFERENCE_MONTHLY = 1668.69;
