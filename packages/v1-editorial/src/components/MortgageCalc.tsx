import { MORTGAGE_REFERENCE_INPUTS, mortgage } from '@c21/shared';
import { useEffect, useRef, useState } from 'react';
import { formatMoney, formatNumber } from '../lib/format';
import { usePrefersReducedMotion } from '../lib/usePrefersReducedMotion';

/**
 * Mortgage calculator with editable price/down/term/rate and a mono readout.
 * Default inputs match MORTGAGE_REFERENCE_INPUTS, producing monthly 1668.69.
 * Number output tweens on change (150ms) unless reduced-motion is set.
 */
export function MortgageCalc({ priceUsd = MORTGAGE_REFERENCE_INPUTS.priceUsd }: { priceUsd?: number }) {
  const [price, setPrice] = useState(priceUsd);
  const [downPct, setDownPct] = useState(MORTGAGE_REFERENCE_INPUTS.downPaymentPct * 100);
  const [term, setTerm] = useState(MORTGAGE_REFERENCE_INPUTS.termYears);
  const [rate, setRate] = useState(MORTGAGE_REFERENCE_INPUTS.annualRatePct);

  const result = mortgage({
    priceUsd: price,
    downPaymentPct: downPct / 100,
    termYears: term,
    annualRatePct: rate,
  });

  const monthly = useTweenedNumber(result.monthlyPayment, 150);

  // Progress: principal as fraction of total paid
  const progress = result.totalPaid > 0 ? result.principal / result.totalPaid : 0;

  return (
    <section
      data-section="mortgage-calc"
      aria-label="Calculadora de cuota"
      className="bg-[color:var(--color-bg)]"
    >
      <div className="flex flex-col gap-6 border border-[color:var(--color-divider)] bg-[color:var(--color-surface)] p-6 md:p-8">
        <header className="flex flex-col gap-1">
          <p className="eyebrow">Calculadora</p>
          <h3 className="font-display text-2xl leading-tight">Simular tu cuota</h3>
          <p className="font-italic text-sm text-[color:var(--color-ink-mute)]">
            Cálculo orientativo a tasa fija, sin gastos ni seguros.
          </p>
        </header>

        <div className="grid gap-5 md:grid-cols-2">
          <Slider
            label="Precio (USD)"
            dataTestId="mortgage-price"
            value={price}
            onChange={setPrice}
            min={50_000}
            max={1_500_000}
            step={5_000}
            display={formatMoney({ amount: price, currency: 'USD' })}
          />
          <Slider
            label="Anticipo"
            dataTestId="mortgage-down"
            value={downPct}
            onChange={setDownPct}
            min={10}
            max={80}
            step={1}
            display={`${downPct}%`}
          />
          <Slider
            label="Plazo (años)"
            dataTestId="mortgage-term"
            value={term}
            onChange={setTerm}
            min={5}
            max={30}
            step={1}
            display={`${term} años`}
          />
          <Slider
            label="Tasa anual"
            dataTestId="mortgage-rate"
            value={rate}
            onChange={setRate}
            min={2}
            max={20}
            step={0.25}
            display={`${rate.toFixed(2)}%`}
          />
        </div>

        <div className="border-t border-[color:var(--color-divider)] pt-5">
          <div className="mb-3 flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Cuota mensual estimada</p>
              <output
                data-testid="mortgage-monthly"
                className="mt-1 block font-mono text-3xl text-[color:var(--color-ink)] tabular md:text-4xl"
              >
                USD {formatNumber(monthly, 2)}
              </output>
            </div>
            <dl className="hidden gap-4 text-right md:grid md:grid-cols-2">
              <Readout label="Capital" value={formatMoney({ amount: result.principal, currency: 'USD' })} />
              <Readout label="Intereses" value={formatMoney({ amount: result.totalInterest, currency: 'USD' })} />
            </dl>
          </div>
          <div
            className="h-1 w-full bg-[color:var(--color-divider)]"
            role="progressbar"
            aria-label="Proporción capital vs total pagado"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress * 100)}
          >
            <div
              className="h-full bg-[color:var(--color-accent-deep)] transition-[width] duration-300 ease-out"
              style={{ width: `${Math.round(progress * 100)}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Slider({
  label,
  value,
  onChange,
  min,
  max,
  step,
  display,
  dataTestId,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  min: number;
  max: number;
  step: number;
  display: string;
  dataTestId: string;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="flex items-baseline justify-between">
        <span className="field-label">{label}</span>
        <span className="font-mono text-sm text-[color:var(--color-ink)] tabular">{display}</span>
      </span>
      <input
        data-testid={dataTestId}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        className="mortgage-slider accent-[color:var(--color-accent-deep)]"
      />
    </label>
  );
}

function Readout({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col">
      <dt className="text-[11px] uppercase tracking-[0.14em] text-[color:var(--color-ink-mute)]">
        {label}
      </dt>
      <dd className="font-mono text-sm text-[color:var(--color-ink)] tabular">{value}</dd>
    </div>
  );
}

function useTweenedNumber(target: number, duration = 150): number {
  const [value, setValue] = useState(target);
  const reduced = usePrefersReducedMotion();
  const fromRef = useRef(target);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    if (reduced) {
      fromRef.current = target;
      setValue(target);
      return;
    }
    const from = fromRef.current;
    const to = target;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const v = from + (to - from) * eased;
      setValue(v);
      if (t < 1) frame.current = requestAnimationFrame(tick);
      else fromRef.current = to;
    };
    frame.current = requestAnimationFrame(tick);
    return () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, [target, duration, reduced]);

  return value;
}
