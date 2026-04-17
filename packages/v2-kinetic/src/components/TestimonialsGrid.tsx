import { TESTIMONIALS, unsplashUrl } from '@c21/shared';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * Testimonials. Mobile: 1-up slider with prev/next. Desktop: 3-up static with
 * a horizontal marquee of client names underneath. Uses TESTIMONIALS verbatim.
 */
export function TestimonialsGrid() {
  const [idx, setIdx] = useState(0);
  const t = TESTIMONIALS;
  const current = t[idx] ?? t[0];
  if (!current) return null;

  const names = t.map((x) => x.attribution).concat(t.map((x) => x.attribution));

  return (
    <section data-section="testimonials" className="zone-neutral bg-[var(--color-surface)] py-16 md:py-24">
      <div className="mx-auto max-w-[var(--container-max)] px-4 md:px-6">
        <p className="v2-mono text-[0.72rem] uppercase tracking-[0.22em] text-[var(--color-ink-mute)]">
          Testimonios verificados
        </p>
        <h2 className="mt-2 text-[var(--text-h2)] font-[700] leading-[0.95] tracking-[-0.015em]">
          Qué dicen los que cerraron.
        </h2>

        {/* Mobile slider */}
        <div className="mt-10 md:hidden">
          <figure className="border border-[var(--color-divider)] bg-white p-6">
            <blockquote className="text-[1.1rem] leading-[1.45] font-[500] tracking-[-0.005em]">
              “{current.quote}”
            </blockquote>
            <figcaption className="mt-5 flex items-center gap-3">
              {current.photoUnsplashId && (
                <img
                  src={unsplashUrl(current.photoUnsplashId, 96)}
                  alt=""
                  className="h-10 w-10 rounded-full object-cover"
                  loading="lazy"
                />
              )}
              <div>
                <p className="text-[0.88rem] font-[600]">{current.attribution}</p>
                <p className="v2-mono text-[0.7rem] uppercase tracking-[0.18em] text-[var(--color-ink-mute)]">
                  {current.role} · {current.neighborhood}
                </p>
              </div>
            </figcaption>
          </figure>
          <div className="mt-4 flex items-center justify-between">
            <button
              type="button"
              aria-label="Testimonio anterior"
              onClick={() => setIdx((i) => (i - 1 + t.length) % t.length)}
              className="v2-tap inline-flex h-11 w-11 items-center justify-center border border-[var(--color-divider)]"
            >
              <ChevronLeft size={18} />
            </button>
            <p className="v2-mono text-[0.75rem] tabular-nums text-[var(--color-ink-mute)]">
              {idx + 1} / {t.length}
            </p>
            <button
              type="button"
              aria-label="Siguiente testimonio"
              onClick={() => setIdx((i) => (i + 1) % t.length)}
              className="v2-tap inline-flex h-11 w-11 items-center justify-center border border-[var(--color-divider)]"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Desktop 3-up */}
        <div className="mt-10 hidden grid-cols-3 gap-6 md:grid">
          {t.slice(0, 3).map((x) => (
            <figure key={x.id} className="flex flex-col border border-[var(--color-divider)] bg-white p-6">
              <blockquote className="flex-1 text-[1.05rem] leading-[1.5] font-[500]">
                “{x.quote}”
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                {x.photoUnsplashId && (
                  <img
                    src={unsplashUrl(x.photoUnsplashId, 96)}
                    alt=""
                    className="h-10 w-10 rounded-full object-cover"
                    loading="lazy"
                  />
                )}
                <div>
                  <p className="text-[0.88rem] font-[600]">{x.attribution}</p>
                  <p className="v2-mono text-[0.68rem] uppercase tracking-[0.18em] text-[var(--color-ink-mute)]">
                    {x.role} · {x.neighborhood}
                  </p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Names marquee underline */}
        <div className="v2-marquee v2-edge-fade mt-10 overflow-hidden border-y border-[var(--color-divider)] py-4">
          <div className="v2-marquee-track" style={{ ['--marquee-dur' as string]: '48s' }}>
            {names.map((n, i) => (
              <span
                key={i}
                className="v2-mono inline-flex items-center gap-4 whitespace-nowrap px-6 text-[0.8rem] uppercase tracking-[0.22em] text-[var(--color-ink-mute)]"
              >
                <span>{n}</span>
                <span aria-hidden className="h-[2px] w-8 bg-[var(--color-accent-cool)]" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
