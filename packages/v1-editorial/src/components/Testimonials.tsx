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
            Con la palabra de quien firmó.
          </h2>
        </div>

        <ul className="hidden lg:grid lg:grid-cols-3 lg:gap-10 lg:items-stretch">
          {items.map((t) => (
            <li key={t.id} className="flex">
              <Card t={t} />
            </li>
          ))}
        </ul>

        <div
          className="lg:hidden"
          role="region"
          aria-label="Testimonios — deslizá horizontalmente"
        >
          <ul className="snap-track" tabIndex={0}>
            {items.map((t) => (
              <li key={t.id}>
                <Card t={t} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Card({ t }: { t: (typeof TESTIMONIALS)[number] }) {
  // h-full + mt-auto on the figcaption anchors attributions to the bottom of
  // every card, so quote bodies can vary in line-count without leaving the
  // shorter card's attribution floating mid-column.
  return (
    <figure className="flex h-full w-full flex-col">
      <div
        aria-hidden
        className="font-display text-[6rem] leading-[0.6] text-[color:var(--color-accent)] lg:text-[7rem]"
      >
        “
      </div>
      <blockquote className="mt-6 font-display text-[1.375rem] leading-[1.35] text-[color:var(--color-ink)] lg:text-[1.5rem]">
        {t.quote}
      </blockquote>
      <figcaption className="mt-auto flex items-center gap-3 pt-10">
        {t.photoUnsplashId && (
          <img
            src={unsplashUrl(t.photoUnsplashId, 120)}
            alt=""
            role="presentation"
            loading="lazy"
            width={40}
            height={40}
            className="h-10 w-10 shrink-0 rounded-full object-cover"
          />
        )}
        <div className="flex flex-col">
          <span className="text-sm font-medium text-[color:var(--color-ink)]">
            {t.attribution}
          </span>
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
