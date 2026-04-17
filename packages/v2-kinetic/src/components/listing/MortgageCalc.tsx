import { useMemo, useState } from 'react';
import { mortgage, MORTGAGE_REFERENCE_INPUTS } from '@c21/shared';
import { formatMoney } from '../../lib/format.ts';

/**
 * Mortgage calculator. Blue zone on desktop. Defaults to MORTGAGE_REFERENCE_INPUTS
 * so the first-paint output equals 1668.69 (verify harness assertion).
 * Digit slot-roll animation is handled via key on the output (changes on change).
 */
export function MortgageCalc() {
  const [price, setPrice] = useState(MORTGAGE_REFERENCE_INPUTS.priceUsd);
  const [downPct, setDownPct] = useState(MORTGAGE_REFERENCE_INPUTS.downPaymentPct * 100);
  const [term, setTerm] = useState(MORTGAGE_REFERENCE_INPUTS.termYears);
  const [rate, setRate] = useState(MORTGAGE_REFERENCE_INPUTS.annualRatePct);

  const result = useMemo(
    () =>
      mortgage({
        priceUsd: price,
        downPaymentPct: downPct / 100,
        termYears: term,
        annualRatePct: rate,
      }),
    [price, downPct, term, rate],
  );

  const monthlyStr = formatMoney({ amount: result.monthlyPayment, currency: 'USD' });

  return (
    <section data-section="mortgage-calc" className="zone-blue py-14 md:py-20">
      <div className="mx-auto max-w-[var(--container-max)] px-4 md:px-6">
        <p className="v2-mono text-[0.72rem] uppercase tracking-[0.22em] text-white">
          Calculadora hipotecaria
        </p>
        <h2 className="mt-3 text-[clamp(1.75rem,1.2rem+2vw,2.75rem)] font-[700] leading-[1.05] tracking-[-0.01em] text-white">
          Simulá tu cuota mensual.
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <SliderField
              label="Precio (USD)"
              value={price}
              min={50000}
              max={2000000}
              step={5000}
              onChange={setPrice}
              format={(v) => formatMoney({ amount: v, currency: 'USD' }, { compact: true })}
              testid="mortgage-price"
            />
            <SliderField
              label="Anticipo (%)"
              value={downPct}
              min={0}
              max={80}
              step={1}
              onChange={setDownPct}
              format={(v) => `${v}%`}
              testid="mortgage-down"
            />
            <SliderField
              label="Plazo (años)"
              value={term}
              min={5}
              max={30}
              step={1}
              onChange={setTerm}
              format={(v) => `${v} años`}
              testid="mortgage-term"
            />
            <SliderField
              label="Tasa anual (%)"
              value={rate}
              min={2}
              max={20}
              step={0.25}
              onChange={setRate}
              format={(v) => `${v}%`}
              testid="mortgage-rate"
            />
          </div>

          <div className="border border-white/40 p-6 text-white">
            {/* Solid blue background — an extra white/10 overlay lightens the
                base and drops white contrast under 4.5:1 at small sizes. */}
            <p className="v2-mono text-[0.72rem] uppercase tracking-[0.2em] text-white">
              Cuota mensual estimada
            </p>
            <p
              key={result.monthlyPayment}
              data-testid="mortgage-monthly"
              className="v2-mono mt-3 text-[clamp(2rem,1.2rem+3vw,3.5rem)] font-[700] leading-none tabular-nums"
            >
              <SlotText value={monthlyStr} />
            </p>
            <dl className="v2-mono mt-6 grid grid-cols-2 gap-4 text-[0.78rem] text-white tabular-nums">
              <div>
                <dt className="uppercase tracking-[0.18em] text-white/95">Capital</dt>
                <dd className="mt-1">{formatMoney({ amount: result.principal, currency: 'USD' })}</dd>
              </div>
              <div>
                <dt className="uppercase tracking-[0.18em] text-white/95">Total intereses</dt>
                <dd className="mt-1">{formatMoney({ amount: result.totalInterest, currency: 'USD' })}</dd>
              </div>
              <div className="col-span-2">
                <dt className="uppercase tracking-[0.18em] text-white/95">Total a pagar</dt>
                <dd className="mt-1">{formatMoney({ amount: result.totalPaid, currency: 'USD' })}</dd>
              </div>
            </dl>
            <p className="v2-mono mt-5 text-[0.66rem] uppercase tracking-[0.18em] text-white/95">
              Cálculo referencial. Consultá condiciones con tu banco.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function SliderField({
  label,
  value,
  min,
  max,
  step,
  onChange,
  format,
  testid,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  format: (v: number) => string;
  testid: string;
}) {
  return (
    <label className="block text-white">
      <span className="v2-mono flex items-baseline justify-between text-[0.66rem] uppercase tracking-[0.2em] text-white">
        <span>{label}</span>
        <span className="tabular-nums text-white">{format(value)}</span>
      </span>
      <input
        type="range"
        data-testid={testid}
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 w-full accent-white"
        aria-label={label}
      />
    </label>
  );
}

function SlotText({ value }: { value: string }) {
  return (
    <span aria-label={value}>
      {value.split('').map((c, i) => (
        <span key={`${value}-${i}`} className="v2-slot-digit" style={{ animationDelay: `${i * 24}ms` }}>
          {c}
        </span>
      ))}
    </span>
  );
}
