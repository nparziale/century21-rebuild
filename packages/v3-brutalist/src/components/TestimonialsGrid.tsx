import { TESTIMONIALS, officeById, OFFICES } from '@c21/shared';
import { FolioRule } from './FolioRule.tsx';

function pickOffice(index: number) {
  // Ensure the attribution has a real office reference for V3's documentary voice.
  const office = OFFICES[index % OFFICES.length];
  return office?.name.replace('CENTURY 21 ', 'Oficina ') ?? 'Oficina';
}

export function TestimonialsGrid() {
  return (
    <section data-section="testimonials">
      <FolioRule sectionNumber={8} label="TESTIMONIOS" />
      <div className="mx-auto max-w-[1920px] px-4 md:px-6 xl:px-10 py-10 xl:py-14">
        <div className="flex items-baseline justify-between flex-wrap gap-3 mb-6">
          <h2
            className="uppercase"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h2)' }}
          >
            Lo que dicen los clientes
          </h2>
          <span
            className="mono text-xs uppercase tracking-widest"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-ink-mute)' }}
          >
            08 / 13
          </span>
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 xl:gap-6">
          {TESTIMONIALS.map((t, i) => {
            const officeLabel = pickOffice(i);
            return (
              <li key={t.id} className="border border-black p-6 flex flex-col">
                <span
                  aria-hidden="true"
                  className="font-display leading-none mb-2"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '6rem',
                    color: 'var(--color-ink-mute)',
                  }}
                >
                  “
                </span>
                <blockquote
                  className="italic text-lg leading-relaxed"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {t.quote}
                </blockquote>
                <figcaption
                  className="mt-6 pt-4 border-t border-black flex items-baseline justify-between gap-3"
                >
                  <cite
                    className="not-italic"
                    style={{ fontFamily: 'var(--font-body)', fontWeight: 600 }}
                  >
                    — {t.attribution}
                  </cite>
                  <span
                    className="mono text-[11px] uppercase tracking-widest"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--color-ink-mute)',
                    }}
                  >
                    {officeLabel}
                  </span>
                </figcaption>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

// Silence unused-import when bundler tree-shakes; keeps symmetry with V1/V2.
void officeById;
