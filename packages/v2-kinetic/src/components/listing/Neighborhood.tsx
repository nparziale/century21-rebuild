import { motion } from 'motion/react';
import type { Listing } from '@c21/shared';

/**
 * Neighborhood stats. Mobile: stat strip. Desktop: 2-col text + walkability
 * bars growing on intersection (300 ms).
 */
export function Neighborhood({ listing }: { listing: Listing }) {
  const bars = [
    { label: 'Transporte', value: 78 },
    { label: 'Colegios', value: 82 },
    { label: 'Comercios', value: 71 },
    { label: 'Espacios verdes', value: 64 },
    { label: 'Vida nocturna', value: 42 },
  ];
  return (
    <section data-section="neighborhood" className="zone-neutral">
      <div className="mx-auto grid max-w-[var(--container-max)] grid-cols-1 gap-10 px-4 py-12 md:grid-cols-2 md:px-6 md:py-16">
        <div>
          <p className="v2-mono text-[0.7rem] uppercase tracking-[0.22em] text-[var(--color-ink-mute)]">
            Zona — {listing.address.neighborhood}
          </p>
          <h2 className="mt-2 text-[var(--text-h3)] font-[700] leading-[1.05] tracking-[-0.01em]">
            Barrio residencial del oeste.
          </h2>
          <p className="mt-4 text-[0.95rem] leading-[1.55] text-[var(--color-ink-mute)]">
            Ramos Mejía es cabecera de La Matanza y una de las zonas con mejor relación entre
            precio por metro y conectividad sobre el ferrocarril Sarmiento. Av. de Mayo concentra
            comercios, gastronomía y transporte.
          </p>
          <dl className="v2-mono mt-6 grid grid-cols-3 gap-4 text-[0.72rem] uppercase tracking-[0.18em]">
            <div>
              <dt className="text-[var(--color-ink-mute)]">Densidad</dt>
              <dd className="mt-1 text-[1.25rem] font-[700] normal-case tracking-normal">Media</dd>
            </div>
            <div>
              <dt className="text-[var(--color-ink-mute)]">Tren</dt>
              <dd className="mt-1 text-[1.25rem] font-[700] normal-case tracking-normal">5 min</dd>
            </div>
            <div>
              <dt className="text-[var(--color-ink-mute)]">Centro</dt>
              <dd className="mt-1 text-[1.25rem] font-[700] normal-case tracking-normal">25 min</dd>
            </div>
          </dl>
        </div>

        <div>
          <p className="v2-mono text-[0.7rem] uppercase tracking-[0.22em] text-[var(--color-ink-mute)]">
            Walkability
          </p>
          <ul className="mt-4 space-y-4">
            {bars.map((b) => (
              <li key={b.label}>
                <div className="flex items-baseline justify-between">
                  <span className="text-[0.88rem] font-[500]">{b.label}</span>
                  <span className="v2-mono text-[0.78rem] font-[600] tabular-nums">{b.value}</span>
                </div>
                <div className="relative mt-1 h-[6px] w-full overflow-hidden bg-[var(--color-surface)]">
                  <motion.span
                    initial={{ width: 0 }}
                    whileInView={{ width: `${b.value}%` }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-y-0 left-0 block bg-[var(--color-accent-cool)]"
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
