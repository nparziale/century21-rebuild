import { TESTIMONIALS, unsplashUrl } from '@c21/shared';

/**
 * Editorial testimonials. Mobile: one-per-screen swipeable (snap). Desktop:
 * 3-up with a giant Fraunces open-quote glyph in bronze.
 */
export function Testimonials() {
  const items = TESTIMONIALS.slice(0, 3);
  return (
    <section
      data-section="testimonials"
      aria-label="Testimonios"
      className="bg-[color:var(--color-surface)] py-20 lg:py-28"
    >
      <div className="container-ed">
        <div className="mb-10">
          <p className="eyebrow">Testimonios</p>
          <h2
            className="mt-2 font-display leading-[1]"
            style={{
              fontSize: 'var(--text-h2)',
              fontVariationSettings: "'opsz' 72, 'SOFT' 60, 'WONK' 1",
            }}
          >
            Historias que se firman despacio.
          </h2>
        </div>

        <ul className="hidden lg:grid lg:grid-cols-3 lg:gap-10">
          {items.map((t) => (
            <li key={t.id}>
              <Card t={t} />
            </li>
          ))}
        </ul>

        <ul className="snap-track lg:hidden">
          {items.map((t) => (
            <li key={t.id} className="w-[85vw]">
              <Card t={t} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Card({ t }: { t: (typeof TESTIMONIALS)[number] }) {
  return (
    <figure className="flex flex-col gap-6">
      <div aria-hidden className="font-display text-[8rem] leading-[0.6] text-[color:var(--color-accent)]">
        “
      </div>
      <blockquote className="font-display text-[1.5rem] leading-[1.3] text-[color:var(--color-ink)]">
        {t.quote}
      </blockquote>
      <figcaption className="flex items-center gap-3">
        {t.photoUnsplashId && (
          <img
            src={unsplashUrl(t.photoUnsplashId, 120)}
            alt=""
            role="presentation"
            loading="lazy"
            width={40}
            height={40}
            className="h-10 w-10 rounded-full object-cover"
          />
        )}
        <div className="flex flex-col">
          <span className="text-sm font-medium text-[color:var(--color-ink)]">{t.attribution}</span>
          {t.neighborhood && (
            <span className="font-mono text-xs text-[color:var(--color-ink-mute)]">
              {t.neighborhood}
            </span>
          )}
        </div>
      </figcaption>
    </figure>
  );
}
