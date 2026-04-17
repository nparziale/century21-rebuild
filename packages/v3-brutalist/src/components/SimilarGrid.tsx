import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import {
  SIMILAR_LISTINGS,
  unsplashSrcSet,
  unsplashUrl,
  LQIP_NEUTRAL,
  type FeaturedCard,
} from '@c21/shared';
import { formatMoney } from '../lib/format.ts';
import { FolioRule } from './FolioRule.tsx';

function filtered(list: readonly FeaturedCard[], params: URLSearchParams) {
  const tipo = params.get('tipo');
  const precio = params.get('precio');
  const max = precio ? Number.parseInt(precio, 10) : Number.POSITIVE_INFINITY;
  return list.filter((l) => {
    if (tipo && l.propertyType !== tipo) return false;
    if (l.price.currency === 'USD' && Number.isFinite(max) && l.price.amount > max) return false;
    return true;
  });
}

export function SimilarGrid() {
  const [params] = useSearchParams();
  const items = useMemo(() => filtered(SIMILAR_LISTINGS, params), [params]);
  return (
    <section data-section="similar">
      <FolioRule sectionNumber={13} label="SIMILARES" />
      <div className="mx-auto max-w-[1920px] px-4 md:px-6 xl:px-10 py-10 xl:py-14">
        <div className="flex items-baseline justify-between flex-wrap gap-3 mb-6">
          <h2
            className="uppercase"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h3)' }}
          >
            Propiedades similares
          </h2>
          <span
            className="mono text-xs uppercase tracking-widest"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-ink-mute)' }}
          >
            13 / 15
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 xl:gap-6">
          <AnimatePresence mode="popLayout">
            {items.map((c) => (
              <motion.article
                key={c.id}
                layout
                layoutId={`card-${c.id}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ type: 'spring', stiffness: 260, damping: 32 }}
                className="border border-black flex flex-col"
              >
                <Link to={`/propiedad/${c.id}`} className="block">
                  <picture>
                    <source
                      srcSet={unsplashSrcSet(c.photoUnsplashId)}
                      sizes="(min-width: 1280px) 30vw, 100vw"
                    />
                    <img
                      src={unsplashUrl(c.photoUnsplashId, 1280)}
                      alt={c.photoAlt}
                      width={1280}
                      height={960}
                      loading="lazy"
                      decoding="async"
                      className="block w-full aspect-[4/3] object-cover"
                      style={{
                        backgroundImage: `url(${LQIP_NEUTRAL})`,
                        backgroundSize: 'cover',
                      }}
                    />
                  </picture>
                </Link>
                <div className="p-4 border-t border-black flex-1 flex flex-col gap-2">
                  <span
                    className="mono text-[11px] uppercase tracking-widest"
                    style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-ink-mute)' }}
                  >
                    REF {c.id} · {c.neighborhood}
                  </span>
                  <h3
                    className="text-lg"
                    style={{ fontFamily: 'var(--font-body)', fontWeight: 600 }}
                  >
                    <Link to={`/propiedad/${c.id}`}>{c.title}</Link>
                  </h3>
                  <span
                    className="mono text-lg mt-auto"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontVariantNumeric: 'tabular-nums',
                    }}
                  >
                    {formatMoney(c.price)}
                  </span>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
