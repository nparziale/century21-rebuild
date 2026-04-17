import { unsplashSrcSet, unsplashUrl, LQIP_NEUTRAL } from '@c21/shared';
import { FolioRule } from './FolioRule.tsx';

const PHOTO_ID = '1497366216548-37526070297c';

export function FranchiseCTA() {
  return (
    <section data-section="franchise-cta">
      <FolioRule sectionNumber={6} total={10} label="FRANQUICIA" />
      <div className="mx-auto max-w-[1920px] px-4 md:px-6 xl:px-10 py-12 xl:py-20">
        <div className="grid grid-cols-4 xl:grid-cols-12 gap-4 xl:gap-6 items-stretch">
          <div className="col-span-4 xl:col-span-6 flex flex-col justify-between">
            <div>
              <p
                className="mono text-xs uppercase tracking-widest mb-4"
                style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-ink-mute)' }}
              >
                06 / 10 · Licencias
              </p>
              <h2
                className="uppercase"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-h2)',
                  lineHeight: 0.92,
                }}
              >
                Abrí tu propia
                <br />
                oficina Century 21.
              </h2>
              <p
                className="mt-6 max-w-[52ch]"
                style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-body)' }}
              >
                Te acompañamos con capacitación, sistemas, marketing y la marca. La oficina
                es tuya — independiente y operada por vos — con el respaldo de la red
                global de Century 21.
              </p>
            </div>
            <a
              href="/licencias"
              className="cta-primary mt-8 self-start"
              data-accent="tango"
            >
              Adquiere una licencia
            </a>
          </div>
          <figure className="col-span-4 xl:col-span-6 border border-black">
            <picture>
              <source srcSet={unsplashSrcSet(PHOTO_ID)} sizes="(min-width: 1280px) 50vw, 100vw" />
              <img
                src={unsplashUrl(PHOTO_ID, 1920)}
                alt="Equipo inmobiliario trabajando en una oficina moderna"
                width={1920}
                height={1280}
                loading="lazy"
                decoding="async"
                className="block w-full h-full object-cover"
                style={{ backgroundImage: `url(${LQIP_NEUTRAL})`, backgroundSize: 'cover' }}
              />
            </picture>
          </figure>
        </div>
      </div>
    </section>
  );
}
