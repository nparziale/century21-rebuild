import { ArrowRight } from 'lucide-react';

/**
 * "Confíanos tu propiedad" — calm 50/50 panel with a Fraunces italic drop-cap on
 * desktop and inline bronze link. No exclamation marks, no superlatives.
 */
export function VendorCTA() {
  return (
    <section
      data-section="vendor-cta"
      aria-label="Vendé tu propiedad con Century 21"
      className="bg-[color:var(--color-surface)] py-16 lg:py-24"
    >
      <div className="container-ed grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-16">
        <div className="lg:col-span-5">
          <p className="eyebrow mb-4">Propietarios</p>
          <h2
            className="font-display leading-[1]"
            style={{
              fontSize: 'var(--text-h2)',
              fontVariationSettings: "'opsz' 72, 'SOFT' 60, 'WONK' 1",
            }}
          >
            Confíanos tu propiedad.
          </h2>
        </div>
        <div className="lg:col-span-7 lg:pt-3">
          <p className="dropcap font-body text-[color:var(--color-ink)] text-[1.0625rem] leading-[1.7]">
            Tasamos con datos del corredor local y armamos una ficha pensada para
            quien busca. Sin cláusulas largas ni exclusividades forzadas. El
            acuerdo empieza cuando vos decidís que empiece.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <a href="/confianos-tu-propiedad" className="btn btn-olive">
              Confíanos tu propiedad
              <ArrowRight size={16} aria-hidden />
            </a>
            <a href="/confianos-tu-propiedad#tasacion" className="link-bronze text-sm">
              Tasar mi propiedad
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
