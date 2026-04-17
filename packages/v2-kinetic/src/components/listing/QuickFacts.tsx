import { BedDouble, Bath, Ruler, Car, Compass, Wrench } from 'lucide-react';
import type { Listing } from '@c21/shared';

/**
 * Six quick facts. Mobile: 2-col icon grid. Desktop: single row of 6 facts.
 */
export function QuickFacts({ listing }: { listing: Listing }) {
  const facts = [
    { icon: BedDouble, label: 'Ambientes', value: String(listing.specs.ambientes) },
    { icon: BedDouble, label: 'Dormitorios', value: String(listing.specs.dormitorios) },
    { icon: Bath, label: 'Baños', value: String(listing.specs.baños) },
    { icon: Car, label: 'Cocheras', value: String(listing.specs.cocheras) },
    { icon: Ruler, label: 'Cubierta', value: `${listing.areas.cubierta} m²` },
    { icon: Compass, label: 'Orientación', value: listing.specs.orientacion },
    { icon: Wrench, label: 'Estado', value: listing.specs.estado },
  ];
  return (
    <section data-section="quick-facts" className="zone-neutral border-t border-[var(--color-divider)] bg-[var(--color-surface)]">
      <div className="mx-auto max-w-[var(--container-max)] px-4 py-8 md:px-6 md:py-10">
        <p className="v2-mono text-[0.7rem] uppercase tracking-[0.22em] text-[var(--color-ink-mute)]">
          Ficha rápida
        </p>
        <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-7">
          {facts.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.label}>
                <Icon size={20} strokeWidth={1.5} className="text-[var(--color-accent-warm)]" aria-hidden />
                <dt className="v2-mono mt-2 text-[0.66rem] uppercase tracking-[0.2em] text-[var(--color-ink-mute)]">
                  {f.label}
                </dt>
                <dd className="v2-mono mt-1 text-[1rem] font-[600] tabular-nums">{f.value}</dd>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
