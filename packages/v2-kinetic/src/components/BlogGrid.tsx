import { BLOG_CARDS, unsplashUrl, unsplashSrcSet } from '@c21/shared';
import { formatDateISO } from '../lib/format.ts';

/**
 * Blog teaser. Mobile 2-col mini. Desktop 3-col with lead article spanning 2
 * columns. Dates in Geist Mono tabular.
 */
export function BlogGrid() {
  const [lead, ...rest] = BLOG_CARDS;
  if (!lead) return null;
  return (
    <section data-section="blog" className="zone-neutral bg-[var(--color-bg)] py-16 md:py-24">
      <div className="mx-auto max-w-[var(--container-max)] px-4 md:px-6">
        <div className="flex items-end justify-between">
          <div>
            <p className="v2-mono text-[0.72rem] uppercase tracking-[0.22em] text-[var(--color-ink-mute)]">
              Guías y análisis
            </p>
            <h2 className="mt-2 text-[var(--text-h2)] font-[700] leading-[0.95] tracking-[-0.015em]">
              Desde la redacción.
            </h2>
          </div>
          <a
            href="/blog"
            className="v2-mono hidden md:inline text-[0.8rem] uppercase tracking-[0.22em] underline underline-offset-4 hover:text-[var(--color-accent-cool)]"
          >
            Todos los artículos
          </a>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Lead card spans 2 cols on desktop */}
          <a
            href={`/blog/${lead.slug}`}
            className="group block border border-[var(--color-divider)] bg-white sm:col-span-2 lg:col-span-2 lg:row-span-1"
          >
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-[var(--color-surface)]">
              <img
                src={unsplashUrl(lead.photoUnsplashId, 1600)}
                srcSet={unsplashSrcSet(lead.photoUnsplashId)}
                sizes="(min-width: 1024px) 60vw, 100vw"
                alt={lead.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="p-5 md:p-6">
              <p className="v2-mono flex gap-3 text-[0.7rem] uppercase tracking-[0.2em] text-[var(--color-ink-mute)]">
                <span>{lead.category}</span>
                <span aria-hidden>·</span>
                <time dateTime={lead.publishedAt}>{formatDateISO(lead.publishedAt)}</time>
                <span aria-hidden>·</span>
                <span>{lead.readMinutes} min</span>
              </p>
              <h3 className="mt-3 text-[1.6rem] font-[700] leading-tight group-hover:text-[var(--color-accent-cool)]">
                {lead.title}
              </h3>
              <p className="mt-3 text-[0.95rem] text-[var(--color-ink-mute)]">{lead.dek}</p>
            </div>
          </a>

          {rest.map((b) => (
            <a
              key={b.id}
              href={`/blog/${b.slug}`}
              className="group block border border-[var(--color-divider)] bg-white"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--color-surface)]">
                <img
                  src={unsplashUrl(b.photoUnsplashId, 960)}
                  srcSet={unsplashSrcSet(b.photoUnsplashId)}
                  sizes="(min-width: 1024px) 30vw, 50vw"
                  alt={b.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="p-4">
                <p className="v2-mono flex gap-2 text-[0.65rem] uppercase tracking-[0.2em] text-[var(--color-ink-mute)]">
                  <span>{b.category}</span>
                  <span aria-hidden>·</span>
                  <time dateTime={b.publishedAt}>{formatDateISO(b.publishedAt)}</time>
                </p>
                <h3 className="mt-2 text-[1.05rem] font-[700] leading-snug line-clamp-2 group-hover:text-[var(--color-accent-cool)]">
                  {b.title}
                </h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
