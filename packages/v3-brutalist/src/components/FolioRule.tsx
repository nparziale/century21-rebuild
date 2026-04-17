type Props = {
  sectionNumber: number;
  total?: number;
  label?: string;
  invert?: boolean;
};

/**
 * Full-page-width horizontal rule with folio markers. Desktop ≥1280 shows
 * "§ 04" on the left (Anton) and "04 / 13" on the right (mono). Below that,
 * it collapses to a plain 1 px rule.
 */
export function FolioRule({ sectionNumber, total = 13, label, invert = false }: Props) {
  const pad = (n: number) => String(n).padStart(2, '0');
  const tone = invert ? 'bg-white text-white' : 'bg-black text-black';
  return (
    <div className="w-full" aria-hidden="true">
      <div className="hidden xl:flex items-center gap-3 px-6 pt-4 pb-1">
        <span
          className="font-display uppercase tracking-widest text-sm"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          § {pad(sectionNumber)}
          {label ? ` · ${label}` : ''}
        </span>
        <span className={`flex-1 h-px ${tone}`} />
        <span
          className="mono text-xs"
          style={{ fontFamily: 'var(--font-mono)', fontVariantNumeric: 'tabular-nums' }}
        >
          {pad(sectionNumber)} / {pad(total)}
        </span>
      </div>
      <div className={`xl:hidden h-px w-full ${tone}`} />
    </div>
  );
}
