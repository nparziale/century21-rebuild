import { unsplashSrcSet, unsplashUrl, LQIP_NEUTRAL } from '@c21/shared';
import { ArrowRight } from 'lucide-react';
import { MonogramMark } from './MonogramMark';
import { useCropReveal } from '../lib/useCropReveal';

/**
 * Editorial hero: full-bleed photograph on left 7/12, stacked H1 text in right 5/12
 * (desktop). Mobile: image on top, text below. Fraunces italic folio "01" and the
 * bronze "Ver propiedades →" CTA. Crop-reveal triggers on mount for the image;
 * monogram mark draws on load.
 */
const HERO_PHOTO_ID = '1600596542815-ffad4c1539a9';

export function Hero() {
  const cropRef = useCropReveal<HTMLDivElement>(0.05);

  return (
    <section
      data-section="hero"
      aria-label="Encabezado editorial"
      className="relative bg-[color:var(--color-bg)]"
    >
      <div className="container-ed grid gap-8 pb-16 pt-6 lg:grid-cols-12 lg:gap-12 lg:pb-24 lg:pt-0">
        <div
          ref={cropRef}
          className="crop-reveal is-in relative lg:col-span-7 lg:col-start-1 lg:row-start-1"
        >
          <div className="passepartout">
            <picture>
              <source type="image/webp" srcSet={unsplashSrcSet(HERO_PHOTO_ID)} sizes="(min-width: 1024px) 58vw, 100vw" />
              <img
                src={unsplashUrl(HERO_PHOTO_ID, 1920)}
                alt="Casa argentina con galería abierta al jardín"
                loading="eager"
                decoding="async"
                fetchPriority="high"
                width={1920}
                height={1280}
                className="block h-full w-full object-cover aspect-[4/5] md:aspect-[3/4] lg:aspect-[4/5]"
                style={{ backgroundImage: `url('${LQIP_NEUTRAL}')`, backgroundSize: 'cover' }}
              />
            </picture>
          </div>
          <MonogramMark className="absolute -bottom-6 -right-2 w-24 text-[color:var(--color-accent)] md:w-28 lg:-bottom-10 lg:w-32" />
        </div>

        <div className="relative flex flex-col gap-6 lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:pt-[120px]">
          <h1
            className="font-display text-[color:var(--color-ink)] leading-[0.95]"
            style={{
              fontSize: 'var(--text-h1)',
              fontVariationSettings: "'opsz' 96, 'SOFT' 60, 'WONK' 1",
            }}
          >
            Acá empieza la casa que buscabas.
          </h1>
          <p className="max-w-[42ch] text-[color:var(--color-ink-mute)]" style={{ fontSize: 'var(--text-body-lg)' }}>
            Propiedades que elegimos mirar con detalle.
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a href="#featured" className="btn btn-olive">
              Ver propiedades
              <ArrowRight size={16} aria-hidden />
            </a>
            <a href="/confianos-tu-propiedad" className="link-bronze text-sm">
              Tasar mi propiedad
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
