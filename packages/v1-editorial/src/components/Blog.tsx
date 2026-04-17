import { BLOG_CARDS, unsplashSrcSet, unsplashUrl } from '@c21/shared';
import { ArrowRight } from 'lucide-react';
import { formatDateAR } from '../lib/format';

/**
 * Editorial blog index. Mobile: stacked cards. Desktop: first card full-bleed
 * 2-col feature, other two as side-by-side index rows with mono dateline.
 */
export function Blog() {
  const [first, ...rest] = BLOG_CARDS;
  if (!first) return null;
  return (
    <section
      data-section="blog"
      aria-label="Notas y guías"
      className="bg-[color:var(--color-bg)] py-20 lg:py-28"
    >
      <div className="container-ed">
        <div className="mb-10 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">Notas</p>
            <h2
              className="mt-2 font-display leading-[1]"
              style={{
                fontSize: 'var(--text-h2)',
                fontVariationSettings: "'opsz' 72, 'SOFT' 60, 'WONK' 1",
              }}
            >
              Guías para leer antes de firmar.
            </h2>
          </div>
          <a href="/notas" className="link-bronze text-sm">
            Ver todas las notas
          </a>
        </div>

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <article className="lg:col-span-7">
            <a href={`/notas/${first.slug}`} className="group flex flex-col gap-4">
              <div className="overflow-hidden bg-[color:var(--color-surface)]">
                <picture>
                  <source
                    srcSet={unsplashSrcSet(first.photoUnsplashId)}
                    sizes="(min-width: 1024px) 58vw, 100vw"
                  />
                  <img
                    src={unsplashUrl(first.photoUnsplashId, 1920)}
                    alt=""
                    role="presentation"
                    loading="lazy"
                    decoding="async"
                    width={1920}
                    height={1200}
                    className="block aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                </picture>
              </div>
              <div className="flex items-center gap-3 font-mono text-xs text-[color:var(--color-ink-mute)]">
                <span>{first.category}</span>
                <span>·</span>
                <time dateTime={first.publishedAt}>{formatDateAR(first.publishedAt)}</time>
                <span>·</span>
                <span>{first.readMinutes} min</span>
              </div>
              <h3
                className="font-display text-3xl leading-[1.1]"
                style={{ fontVariationSettings: "'opsz' 60, 'SOFT' 40, 'WONK' 1" }}
              >
                {first.title}
              </h3>
              <p className="max-w-[60ch] text-[color:var(--color-ink-mute)]">{first.dek}</p>
              <span className="link-bronze mt-1 inline-flex items-center gap-1 text-sm">
                Leer la nota <ArrowRight size={12} aria-hidden />
              </span>
            </a>
          </article>

          <div className="flex flex-col gap-8 lg:col-span-5">
            {rest.map((b) => (
              <article key={b.id} className="border-t border-[color:var(--color-divider)] pt-6">
                <a href={`/notas/${b.slug}`} className="group grid grid-cols-[112px_1fr] gap-4">
                  <img
                    src={unsplashUrl(b.photoUnsplashId, 360)}
                    alt=""
                    role="presentation"
                    loading="lazy"
                    decoding="async"
                    width={112}
                    height={112}
                    className="aspect-square w-28 object-cover"
                  />
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 font-mono text-[11px] text-[color:var(--color-ink-mute)]">
                      <span>{b.category}</span>
                      <span>·</span>
                      <time dateTime={b.publishedAt}>{formatDateAR(b.publishedAt)}</time>
                    </div>
                    <h3 className="font-display text-lg leading-[1.2]">{b.title}</h3>
                    <span className="link-bronze text-xs">Leer</span>
                  </div>
                </a>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
