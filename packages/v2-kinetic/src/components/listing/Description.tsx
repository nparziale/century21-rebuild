import type { Listing } from '@c21/shared';

/**
 * Description. Mobile full width. Desktop 8/4 split with body text + a rail of
 * "Destacados" chips.
 */
export function Description({ listing }: { listing: Listing }) {
  const chips = ['Lote propio', 'Posesión inmediata', 'Barrio residencial', 'Pileta + parrilla', 'Cochera doble'];
  return (
    <section data-section="description" className="zone-neutral">
      <div className="mx-auto grid max-w-[var(--container-max)] grid-cols-1 gap-8 px-4 py-12 md:px-6 md:py-16 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <p className="v2-mono text-[0.7rem] uppercase tracking-[0.22em] text-[var(--color-ink-mute)]">
            Descripción
          </p>
          <h2 className="mt-2 text-[var(--text-h3)] font-[700] leading-[1.05] tracking-[-0.01em]">
            Sobre esta propiedad.
          </h2>
          <p className="mt-5 text-[1rem] leading-[1.65] text-[var(--color-ink)]/80">
            {listing.description}
          </p>
        </div>
        <aside className="lg:col-span-4">
          <p className="v2-mono text-[0.7rem] uppercase tracking-[0.22em] text-[var(--color-ink-mute)]">
            Destacados
          </p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {chips.map((c) => (
              <li
                key={c}
                className="v2-mono border border-[var(--color-divider)] bg-white px-3 py-1.5 text-[0.76rem] uppercase tracking-[0.14em] text-[var(--color-ink)]"
              >
                {c}
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
