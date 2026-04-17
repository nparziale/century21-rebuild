import { unsplashSrcSet, unsplashUrl, LQIP_NEUTRAL } from '@c21/shared';
import { FolioRule } from './FolioRule.tsx';

const HERO_PHOTO_ID = '1600585154526-990dced4db0d';

/**
 * V3 Hero — mobile: Anton H1 stacked over single photo.
 * Desktop ≥1280: H1 spans cols 1-8, photo cols 9-12, folio "01" top-left.
 * No motion on hero. H1 copy is fixed by spec.
 */
export function Hero() {
  return (
    <section data-section="hero" className="relative">
      <FolioRule sectionNumber={1} total={10} label="INTRO" />
      <div className="mx-auto max-w-[1920px] px-4 md:px-6 xl:px-10 pb-12 xl:pb-24 pt-4 xl:pt-10">
        <div className="grid grid-cols-4 xl:grid-cols-12 gap-4 xl:gap-6">
          <div className="col-span-4 xl:col-span-8">
            <div className="flex items-baseline gap-3 mb-4">
              <span
                className="mono text-sm"
                style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-ink-mute)' }}
              >
                01 / 10
              </span>
              <span
                className="uppercase tracking-widest text-[11px]"
                style={{ color: 'var(--color-ink-mute)' }}
              >
                INTRO
              </span>
            </div>
            <h1
              className="font-display uppercase"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-h1)',
                lineHeight: 0.92,
                letterSpacing: '-0.005em',
              }}
            >
              CENTURY 21.
              <br />
              EN ARGENTINA DESDE 2017.
              <br />
              UNA RED EN 79 PAÍSES.
            </h1>
            <p
              className="mt-6 max-w-[52ch] text-lg"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Compra, venta y alquiler en 79 países. En Argentina desde 2017.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#search"
                className="cta-primary"
                data-accent="tango"
              >
                Buscar propiedad
              </a>
              <a
                href="/confianos-tu-propiedad"
                className="cta-ghost"
              >
                Vender mi propiedad
              </a>
            </div>
          </div>
          <figure className="col-span-4 xl:col-span-4 mt-8 xl:mt-0">
            <div className="border border-black">
              <picture>
                <source srcSet={unsplashSrcSet(HERO_PHOTO_ID)} sizes="(min-width: 1280px) 33vw, 100vw" />
                <img
                  src={unsplashUrl(HERO_PHOTO_ID, 1280)}
                  alt="Casa de barrio bonaerense al atardecer"
                  width={1280}
                  height={960}
                  fetchPriority="high"
                  decoding="async"
                  className="block w-full h-auto aspect-[4/5] object-cover"
                  style={{ backgroundImage: `url(${LQIP_NEUTRAL})`, backgroundSize: 'cover' }}
                />
              </picture>
              <figcaption
                className="border-t border-black p-3 mono text-xs uppercase tracking-widest flex items-center justify-between"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                <span>FOTO ARCHIVO</span>
                <span>01 / 10</span>
              </figcaption>
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
}
