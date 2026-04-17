import type { Listing } from '@c21/shared';
import { FolioRule } from './FolioRule.tsx';
import { Counter } from './Counter.tsx';

type Props = { listing: Listing };

export function QuickFacts({ listing }: Props) {
  const rows: Array<{ label: string; value: React.ReactNode }> = [
    {
      label: 'm² cubiertos',
      value: <Counter value={listing.areas.cubierta} suffix=" m²" />,
    },
    {
      label: 'm² totales',
      value: <Counter value={listing.areas.total} suffix=" m²" />,
    },
    {
      label: 'Ambientes',
      value: <Counter value={listing.specs.ambientes} />,
    },
    {
      label: 'Dormitorios',
      value: <span className="mono tabular-nums" style={{ fontFamily: 'var(--font-mono)' }}>{listing.specs.dormitorios}</span>,
    },
    {
      label: 'Baños',
      value: <span className="mono tabular-nums" style={{ fontFamily: 'var(--font-mono)' }}>{listing.specs.baños}</span>,
    },
    {
      label: 'Cocheras',
      value: <span className="mono tabular-nums" style={{ fontFamily: 'var(--font-mono)' }}>{listing.specs.cocheras}</span>,
    },
    {
      label: 'Antigüedad',
      value: <Counter value={listing.specs.antiguedad} suffix=" años" />,
    },
    {
      label: 'Orientación',
      value: listing.specs.orientacion,
    },
    {
      label: 'Estado',
      value: listing.specs.estado,
    },
    {
      label: 'Tipo',
      value: listing.propertyType,
    },
  ];

  return (
    <section data-section="quick-facts">
      <FolioRule sectionNumber={5} label="FICHA TÉCNICA" />
      <div className="mx-auto max-w-[1920px] px-4 md:px-6 xl:px-10 py-8">
        <div className="flex items-baseline justify-between flex-wrap gap-3 mb-6">
          <h2
            className="uppercase"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h3)' }}
          >
            Ficha técnica
          </h2>
          <span
            className="mono text-xs uppercase tracking-widest"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-ink-mute)' }}
          >
            05 / 15
          </span>
        </div>
        <dl className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 border-t border-black">
          {rows.map((r) => (
            <div
              key={r.label}
              className="grid grid-cols-[1fr_auto] items-baseline gap-4 border-b border-black px-1 py-3"
            >
              <dt
                className="uppercase text-[11px] tracking-widest"
                style={{ color: 'var(--color-ink-mute)', fontFamily: 'var(--font-body)' }}
              >
                {r.label}
              </dt>
              <dd
                className="text-right"
                style={{ fontFamily: 'var(--font-mono)', fontVariantNumeric: 'tabular-nums' }}
              >
                {r.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
