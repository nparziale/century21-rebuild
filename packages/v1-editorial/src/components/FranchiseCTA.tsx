import { ArrowRight } from 'lucide-react';

/**
 * Quiet franchise-opportunity panel. At ≥1280 px a vertical rotated spine
 * label reads "OPORTUNIDAD 2026". Copy is understated — no exclamation marks.
 */
export function FranchiseCTA() {
  return (
    <section
      data-section="franchise-cta"
      aria-label="Oportunidad de franquicia"
      className="bg-[color:var(--color-bg)] py-20 lg:py-28"
    >
      <div className="container-ed">
        <div className="relative mx-auto max-w-5xl border border-[color:var(--color-divider)] bg-[color:var(--color-surface)] px-6 py-12 md:px-12 lg:px-20 lg:py-20">
          <span
            aria-hidden
            className="spine-label absolute -left-10 top-1/2 hidden -translate-y-1/2 xl:block"
          >
            Oportunidad 2026
          </span>
          <p className="eyebrow mb-4">Licencias</p>
          <h2
            className="mb-6 font-display leading-[1]"
            style={{
              fontSize: 'var(--text-h2)',
              fontVariationSettings: "'opsz' 72, 'SOFT' 60, 'WONK' 1",
            }}
          >
            Adquiere una licencia CENTURY 21.
          </h2>
          <p className="mb-8 max-w-[54ch] text-[color:var(--color-ink-mute)]" style={{ fontSize: 'var(--text-body-lg)' }}>
            Una red global que opera desde 1971, adaptada al mercado argentino.
            Franquicias independientes con soporte regional, formación continua
            y herramientas de marketing compartidas.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <a href="/licencias" className="btn btn-olive">
              Conocer el programa
              <ArrowRight size={16} aria-hidden />
            </a>
            <a href="/unete" className="link-bronze text-sm">
              Trabaja con nosotros
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
