import { FolioRule } from './FolioRule.tsx';

/**
 * V3 Vendor CTA — 12-col black bar. No counters (counters reserved for
 * verified stats — never invent volumes for C21 Argentina). Anton inverted
 * headline, Plex copy, tango CTA "Solicitar tasación".
 */
export function VendorCTA() {
  return (
    <section data-section="vendor-cta" data-invert="true">
      <FolioRule sectionNumber={4} total={10} label="VENDER" invert />
      <div className="mx-auto max-w-[1920px] px-4 md:px-6 xl:px-10 py-14 xl:py-24">
        <div className="grid grid-cols-4 xl:grid-cols-12 gap-4 xl:gap-6 items-end">
          <div className="col-span-4 xl:col-span-8">
            <p
              className="mono text-xs uppercase tracking-widest mb-4"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-concrete)' }}
            >
              04 / 10 · Para propietarios
            </p>
            <h2
              className="uppercase"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-h1)',
                lineHeight: 0.92,
              }}
            >
              CONFÍANOS
              <br />
              TU PROPIEDAD.
            </h2>
            <p
              className="mt-6 max-w-[52ch]"
              style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-body)' }}
            >
              Te ayudamos con la tasación, la estrategia de precio y la comercialización.
              Trabajás con un asesor asignado y una oficina propietaria local. Respuesta
              dentro de las 48 horas hábiles.
            </p>
          </div>
          <div className="col-span-4 xl:col-span-4 flex flex-col gap-4">
            <a href="/confianos-tu-propiedad" className="cta-primary w-full" data-accent="tango">
              Solicitar tasación
            </a>
            <a
              href="/confianos-tu-propiedad"
              className="cta-ghost w-full"
              style={{ color: 'var(--color-paper)', borderColor: 'var(--color-paper)' }}
            >
              Promover mi propiedad
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
