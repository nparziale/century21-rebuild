import { BLOG_CARDS, unsplashSrcSet, unsplashUrl, LQIP_NEUTRAL } from '@c21/shared';
import { FolioRule } from './FolioRule.tsx';
import { formatDate } from '../lib/format.ts';

export function BlogGrid() {
  return (
    <section data-section="blog">
      <FolioRule sectionNumber={9} label="REVISTA" />
      <div className="mx-auto max-w-[1920px] px-4 md:px-6 xl:px-10 py-10 xl:py-14">
        <div className="flex items-baseline justify-between flex-wrap gap-3 mb-6">
          <h2
            className="uppercase"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h2)' }}
          >
            Notas e informes
          </h2>
          <span
            className="mono text-xs uppercase tracking-widest"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-ink-mute)' }}
          >
            09 / 13
          </span>
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 xl:gap-6">
          {BLOG_CARDS.map((b) => (
            <li key={b.id} className="border border-black flex flex-col">
              <picture>
                <source srcSet={unsplashSrcSet(b.photoUnsplashId)} sizes="(min-width: 1280px) 30vw, 100vw" />
                <img
                  src={unsplashUrl(b.photoUnsplashId, 1280)}
                  alt=""
                  width={1280}
                  height={800}
                  loading="lazy"
                  decoding="async"
                  className="block w-full aspect-[3/2] object-cover"
                  style={{ backgroundImage: `url(${LQIP_NEUTRAL})`, backgroundSize: 'cover' }}
                />
              </picture>
              <div className="p-4 flex-1 flex flex-col gap-3 border-t border-black">
                <div
                  className="mono text-[11px] uppercase tracking-widest flex items-center justify-between"
                  style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-ink-mute)' }}
                >
                  <span>{b.category}</span>
                  <span>
                    {formatDate(b.publishedAt)} · {b.readMinutes} MIN
                  </span>
                </div>
                <h3
                  className="text-xl leading-tight"
                  style={{ fontFamily: 'var(--font-body)', fontWeight: 600 }}
                >
                  <a href={`/blog/${b.slug}`}>{b.title}</a>
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: 'var(--color-ink-mute)', fontFamily: 'var(--font-body)' }}
                >
                  {b.dek}
                </p>
                <a
                  href={`/blog/${b.slug}`}
                  className="mt-auto uppercase text-xs tracking-widest underline underline-offset-4 self-start"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  Leer nota
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
