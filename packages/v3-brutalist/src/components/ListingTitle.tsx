import type { Listing } from '@c21/shared';
import { useLocalStorageFavorites } from '../lib/useFavorites.ts';
import { Counter } from './Counter.tsx';
import { FolioRule } from './FolioRule.tsx';
import { Heart } from 'lucide-react';
import { unsplashSrcSet, unsplashUrl, LQIP_NEUTRAL } from '@c21/shared';
import { formatMoney } from '../lib/format.ts';

type Props = { listing: Listing };

export function ListingTitle({ listing }: Props) {
  const { has, toggle } = useLocalStorageFavorites();
  const isFav = has(listing.id);
  const hero = listing.gallery[0]!;
  const heroId = hero.src.replace(/^.*photo-/, '').split('?')[0] ?? '';

  return (
    <section data-section="title">
      <FolioRule sectionNumber={1} total={11} label="PORTADA" />
      <div className="relative mx-auto max-w-[1920px] px-4 md:px-6 xl:px-10 py-8 xl:py-12">
        {/* Poster ≥1024 */}
        <div className="hidden xl:block relative">
          <div className="border border-black">
            <picture>
              <source srcSet={unsplashSrcSet(heroId)} sizes="100vw" />
              <img
                src={unsplashUrl(heroId, 2400)}
                alt={hero.alt}
                width={2400}
                height={1200}
                fetchPriority="high"
                decoding="async"
                className="block w-full h-[70vh] object-cover"
                style={{
                  backgroundImage: `url(${LQIP_NEUTRAL})`,
                  backgroundSize: 'cover',
                }}
              />
            </picture>
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 p-8 flex items-end justify-between gap-8">
            <h1
              className="uppercase text-white pointer-events-auto"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(3rem, 6vw, 7rem)',
                lineHeight: 0.9,
                textShadow: '0 2px 12px rgba(0,0,0,0.6)',
              }}
            >
              Casa · Ramos Mejía
              <br />
              4 ambientes · pileta
            </h1>
            <div className="bg-black text-white p-6 pointer-events-auto">
              <p
                className="mono text-[11px] uppercase tracking-widest"
                style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-concrete)' }}
              >
                Precio (USD)
              </p>
              <Counter
                as="div"
                value={listing.price.amount}
                kind="currencyUsd"
                className="mt-1 text-3xl"
              />
            </div>
          </div>
        </div>

        {/* Mobile title */}
        <div className="xl:hidden">
          <p
            className="mono text-xs uppercase tracking-widest"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-ink-mute)' }}
          >
            Ref. {listing.id} · {listing.address.neighborhood}
          </p>
          <h1
            className="mt-2 uppercase"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-h1)',
              lineHeight: 0.92,
            }}
          >
            {listing.title}
          </h1>
          <div className="mt-4 flex items-center justify-between gap-3">
            <div>
              <p
                className="mono text-xs uppercase tracking-widest"
                style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-ink-mute)' }}
              >
                Precio (USD)
              </p>
              <Counter
                as="div"
                value={listing.price.amount}
                kind="currencyUsd"
                className="text-3xl"
              />
            </div>
            <button
              type="button"
              data-testid="favorite-toggle"
              onClick={() => toggle(listing.id)}
              aria-pressed={isFav}
              aria-label={isFav ? 'Quitar de favoritos' : 'Agregar a favoritos'}
              className="inline-flex items-center justify-center w-11 h-11 border border-black"
            >
              <Heart size={20} fill={isFav ? '#FF3B1F' : 'transparent'} color="#0a0a0a" />
            </button>
          </div>
        </div>

        {/* Desktop favourite control — aria-hidden twin for pointer, but no testid to keep selector unique */}
        <div className="hidden xl:flex absolute top-14 right-16 z-10">
          <button
            type="button"
            onClick={() => toggle(listing.id)}
            aria-pressed={isFav}
            aria-label={isFav ? 'Quitar de favoritos' : 'Agregar a favoritos'}
            className="inline-flex items-center justify-center w-11 h-11 border border-white bg-black"
          >
            <Heart size={20} fill={isFav ? '#FF3B1F' : 'transparent'} color="#ffffff" />
          </button>
        </div>
      </div>
    </section>
  );
}
