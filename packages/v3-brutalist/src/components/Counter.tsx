import { useCounter } from '../lib/useCounter.ts';
import {
  formatInt,
  formatDecimal,
  formatCurrencyNumber,
  formatCurrencyCents,
} from '../lib/format.ts';

type Kind = 'int' | 'decimal' | 'currencyUsd' | 'currencyArs' | 'currencyUsdCents';

type Props = {
  value: number;
  kind?: Kind;
  prefix?: string;
  suffix?: string;
  threshold?: number;
  className?: string;
  'aria-label'?: string;
  as?: 'span' | 'div' | 'strong';
};

function render(n: number, kind: Kind) {
  switch (kind) {
    case 'decimal':
      return formatDecimal(n);
    case 'currencyUsd':
      return formatCurrencyNumber(n, 'USD');
    case 'currencyUsdCents':
      return formatCurrencyCents(n, 'USD');
    case 'currencyArs':
      return formatCurrencyNumber(n, 'ARS');
    default:
      return formatInt(n);
  }
}

/**
 * Number counter (M1). Mounted, animates 0 → value when 30% visible.
 * Uses JetBrains Mono tabular-nums; final frame is exact target.
 * Budget: max 8 instances per page — callers choose which numerals matter.
 */
export function Counter({
  value,
  kind = 'int',
  prefix = '',
  suffix = '',
  threshold,
  className,
  as = 'span',
  ...rest
}: Props) {
  const { ref, value: shown } = useCounter(value, threshold ? { threshold } : undefined);
  const Tag = as;
  return (
    <Tag
      ref={ref as never}
      className={`mono tabular-nums ${className ?? ''}`}
      style={{ fontFeatureSettings: '"tnum" 1' }}
      aria-label={rest['aria-label']}
    >
      {prefix}
      {render(shown, kind)}
      {suffix}
    </Tag>
  );
}
