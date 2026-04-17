import { useMemo, useState } from 'react';
import {
  mortgage,
  MORTGAGE_REFERENCE_INPUTS,
  type Listing,
} from '@c21/shared';
import { FolioRule } from './FolioRule.tsx';
import { Counter } from './Counter.tsx';
import { formatCurrencyNumber } from '../lib/format.ts';

type Props = { listing: Listing };

export function MortgageCalc({ listing }: Props) {
  const [price, setPrice] = useState<number>(
    listing.price.currency === 'USD' ? listing.price.amount : MORTGAGE_REFERENCE_INPUTS.priceUsd,
  );
  const [downPct, setDownPct] = useState<number>(MORTGAGE_REFERENCE_INPUTS.downPaymentPct * 100);
  const [term, setTerm] = useState<number>(MORTGAGE_REFERENCE_INPUTS.termYears);
  const [rate, setRate] = useState<number>(MORTGAGE_REFERENCE_INPUTS.annualRatePct);
  const [key, setKey] = useState(0); // bumped on slider release to re-run counter M1

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

  const onRelease = () => setKey((k) => k + 1);

  return (
    <section data-section="mortgage-calc">
      <FolioRule sectionNumber={12} label="HIPOTECA" />
      <div className="mx-auto max-w-[1920px] px-4 md:px-6 xl:px-10 py-10 xl:py-14">
        <div className="flex items-baseline justify-between flex-wrap gap-3 mb-6">
          <h2
            className="uppercase"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h3)' }}
          >
            Calculadora hipotecaria
          </h2>
          <span
            className="mono text-xs uppercase tracking-widest"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-ink-mute)' }}
          >
            12 / 15
          </span>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 xl:gap-8">
          <div className="xl:col-span-6 flex flex-col gap-6 border border-black p-5">
            <Slider
              label="Precio (USD)"
              value={price}
              min={30_000}
              max={2_000_000}
              step={1000}
              onChange={setPrice}
              onRelease={onRelease}
              format={(n) => formatCurrencyNumber(n, 'USD')}
              testid="mortgage-price"
            />
            <Slider
              label="Anticipo (%)"
              value={downPct}
              min={0}
              max={90}
              step={1}
              onChange={setDownPct}
              onRelease={onRelease}
              format={(n) => `${Math.round(n)} %`}
              testid="mortgage-down"
            />
            <Slider
              label="Plazo (años)"
              value={term}
              min={5}
              max={30}
              step={1}
              onChange={setTerm}
              onRelease={onRelease}
              format={(n) => `${Math.round(n)} años`}
              testid="mortgage-term"
            />
            <Slider
              label="Tasa anual (%)"
              value={rate}
              min={1}
              max={20}
              step={0.1}
              onChange={setRate}
              onRelease={onRelease}
              format={(n) => `${n.toFixed(1)} %`}
              testid="mortgage-rate"
            />
          </div>
          <div className="xl:col-span-6 border border-black p-6 flex flex-col gap-4 bg-black text-white">
            <p
              className="mono text-[11px] uppercase tracking-widest"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-concrete)' }}
            >
              12 / 15 · Cuota mensual estimada
            </p>
            <p
              className="uppercase"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-h3)',
                lineHeight: 0.92,
              }}
            >
              Cuota estimada
            </p>
            <div
              data-testid="mortgage-monthly"
              aria-live="polite"
              className="mono"
              style={{
                fontFamily: 'var(--font-mono)',
                fontVariantNumeric: 'tabular-nums',
                fontSize: 'clamp(3rem, 8vw, 6rem)',
                lineHeight: 1,
              }}
            >
              <Counter
                key={key}
                value={result.monthlyPayment}
                kind="currencyUsdCents"
              />
              <span
                className="ml-2 text-base uppercase"
                style={{ color: 'var(--color-concrete)' }}
              >
                / mes
              </span>
            </div>
            <dl className="grid grid-cols-2 gap-y-2 border-t border-white/30 pt-4 text-sm">
              <dt style={{ color: 'var(--color-concrete)' }}>Capital financiado</dt>
              <dd
                className="text-right mono"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {formatCurrencyNumber(result.principal, 'USD')}
              </dd>
              <dt style={{ color: 'var(--color-concrete)' }}>Intereses totales</dt>
              <dd
                className="text-right mono"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {formatCurrencyNumber(result.totalInterest, 'USD')}
              </dd>
              <dt style={{ color: 'var(--color-concrete)' }}>Total a pagar</dt>
              <dd
                className="text-right mono"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {formatCurrencyNumber(result.totalPaid, 'USD')}
              </dd>
            </dl>
            <p
              className="mono text-[10px] uppercase tracking-widest"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-concrete)' }}
            >
              Cálculo de referencia. No constituye oferta crediticia.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

type SliderProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (n: number) => void;
  onRelease: () => void;
  format: (n: number) => string;
  testid: string;
};

function Slider({ label, value, min, max, step, onChange, onRelease, format, testid }: SliderProps) {
  return (
    <label className="field">
      <span className="flex items-baseline justify-between">
        <span>{label}</span>
        <span
          className="mono text-sm"
          style={{
            fontFamily: 'var(--font-mono)',
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {format(value)}
        </span>
      </span>
      <input
        data-testid={testid}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        onMouseUp={onRelease}
        onTouchEnd={onRelease}
        onKeyUp={onRelease}
        style={{ accentColor: 'var(--color-tango)', minHeight: 44 }}
        aria-label={label}
      />
    </label>
  );
}
