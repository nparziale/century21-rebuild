import {
  AMENITY_LABELS,
  LISTING_286194,
  agentById,
  officeById,
} from '@c21/shared';
import { Check } from 'lucide-react';
import { formatMoney } from '../lib/format';
import { AgentCard } from '../components/AgentCard';
import { ContactForm } from '../components/ContactForm';
import { Footer } from '../components/Footer';
import { Gallery } from '../components/Gallery';
import { Nav } from '../components/Nav';
import { ShareActions } from '../components/ShareActions';
import { SimilarListings } from '../components/SimilarListings';
import { UtilityBar } from '../components/UtilityBar';
import { useCropReveal } from '../lib/useCropReveal';

/**
 * V1 — Editorial Pampas — Listing detail.
 * 60/40 editorial split at ≥1024 px. Mobile order: breadcrumb, title, gallery,
 * price, quick-facts, description, amenities, neighborhood, map, agent-card,
 * contact-form, similar, share-actions, footer.
 */
export function ListingPage() {
  const l = LISTING_286194;
  const agent = agentById(l.agentId);
  const office = officeById(l.officeId);
  const descRef = useCropReveal<HTMLDivElement>(0.15);

  return (
    <>
      <a href="#main" className="skip-link">
        Saltar al contenido
      </a>
      <UtilityBar />
      <Nav />

      <nav
        data-section="breadcrumb"
        aria-label="Migas de pan"
        className="border-b border-[color:var(--color-divider)] bg-[color:var(--color-bg)]"
      >
        <ol className="container-ed flex items-center gap-2 overflow-x-auto py-3 font-mono text-[11px] text-[color:var(--color-ink-mute)] no-scrollbar">
          <li>
            <a href="/" className="link-bronze">Inicio</a>
          </li>
          <li aria-hidden>·</li>
          <li>
            <a href="/?op=venta" className="link-bronze">Venta</a>
          </li>
          <li aria-hidden>·</li>
          <li>
            <a href="/?op=venta&tipo=casa" className="link-bronze">Casas</a>
          </li>
          <li aria-hidden>·</li>
          <li>
            <a href={`/?zona=bsas-prov`} className="link-bronze">{l.address.province}</a>
          </li>
          <li aria-hidden>·</li>
          <li className="truncate text-[color:var(--color-ink)]">{l.address.neighborhood}</li>
        </ol>
      </nav>

      <main id="main" className="pb-24 lg:pb-0">
        {/* Title */}
        <section
          data-section="title"
          aria-label="Título de la propiedad"
          className="bg-[color:var(--color-bg)] pt-8 lg:pt-14"
        >
          <div className="container-ed lg:grid lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-8">
              <p className="eyebrow mb-3">
                <span className="font-mono tracking-[0.14em]">Ref. {l.id}</span> ·{' '}
                <span>Venta · Casa</span>
              </p>
              <h1
                className="font-display leading-[0.98] text-[color:var(--color-ink)]"
                style={{
                  fontSize: 'var(--text-h1)',
                  fontVariationSettings: "'opsz' 96, 'SOFT' 60, 'WONK' 1",
                }}
              >
                {l.title}
              </h1>
              <p className="mt-4 font-italic text-lg text-[color:var(--color-ink-mute)]">
                {l.address.neighborhood}, {l.address.city}, {l.address.province}.
              </p>
            </div>
          </div>
        </section>

        {/* Gallery */}
        <Gallery photos={l.gallery} />

        {/* From here on: 60/40 editorial split */}
        <div className="container-ed grid gap-10 pb-24 pt-8 lg:grid-cols-12 lg:gap-12">
          <div className="flex flex-col gap-16 lg:col-span-7">
            {/* Description */}
            <section
              data-section="description"
              aria-label="Descripción"
              ref={descRef}
              className="crop-reveal"
            >
              <p className="eyebrow mb-4">Descripción</p>
              <div className="dropcap text-[1.0625rem] leading-[1.8] text-[color:var(--color-ink)]">
                {l.description}
              </div>
            </section>

            {/* Amenities */}
            <section data-section="amenities" aria-label="Amenities">
              <p className="eyebrow mb-4">Comodidades</p>
              <ul className="grid grid-cols-2 gap-x-6 gap-y-2 md:grid-cols-3">
                {l.amenities.map((a) => (
                  <li key={a} className="flex items-center gap-2 text-sm">
                    <Check
                      size={14}
                      aria-hidden
                      className="shrink-0 text-[color:var(--color-accent-deep)]"
                    />
                    <span className="text-[color:var(--color-ink)]">
                      {AMENITY_LABELS[a] ?? a}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Neighborhood */}
            <section data-section="neighborhood" aria-label="El barrio">
              <p className="eyebrow mb-4">El barrio</p>
              <div className="grid gap-8 md:grid-cols-[1fr_200px]">
                <div className="text-[1.0625rem] leading-[1.75] text-[color:var(--color-ink)]">
                  <p className="mb-4">
                    {l.address.neighborhood} es uno de los corredores residenciales
                    más estables del oeste del conurbano. Calles arboladas,
                    estación del ferrocarril Sarmiento a pocas cuadras y una oferta
                    creciente de gastronomía y librerías sobre Av. de Mayo.
                  </p>
                  <p>
                    El entorno inmediato combina casas sobre lote propio con
                    edificios bajos de los años 70 y 80. Movimiento tranquilo los
                    fines de semana; vida de barrio los días de semana.
                  </p>
                </div>
                <aside className="marginalia flex flex-col gap-4 border-l border-[color:var(--color-divider)] pl-4">
                  <p>
                    <span className="block font-mono text-[10px] uppercase tracking-[0.16em] not-italic text-[color:var(--color-ink-mute)]">
                      Transporte
                    </span>
                    Estación Ramos Mejía (Sarmiento), líneas 96 y 500.
                  </p>
                  <p>
                    <span className="block font-mono text-[10px] uppercase tracking-[0.16em] not-italic text-[color:var(--color-ink-mute)]">
                      Educación
                    </span>
                    Escuelas públicas y colegios privados a 6-8 cuadras.
                  </p>
                  <p>
                    <span className="block font-mono text-[10px] uppercase tracking-[0.16em] not-italic text-[color:var(--color-ink-mute)]">
                      Comercio
                    </span>
                    Centro comercial sobre Av. Rivadavia, a pocos minutos en auto.
                  </p>
                </aside>
              </div>
            </section>

            {/* Map */}
            <section data-section="map" aria-label="Ubicación">
              <p className="eyebrow mb-4">Ubicación aproximada</p>
              <div className="relative aspect-[16/10] w-full overflow-hidden border border-[color:var(--color-divider)] bg-[color:var(--color-surface)]">
                <StaticMap lat={l.address.lat} lng={l.address.lng} />
              </div>
              <p className="mt-2 font-italic text-xs text-[color:var(--color-ink-mute)]">
                La dirección exacta se comparte al confirmar la visita.
              </p>
            </section>

            {/* Similar — spans both columns below */}
          </div>

          {/* Right rail: price + quick-facts + agent-card + contact */}
          <aside className="flex flex-col gap-10 lg:col-span-5 lg:sticky lg:top-24 lg:self-start">
            {/* Price */}
            <section data-section="price" aria-label="Precio" className="border-t border-[color:var(--color-accent)] pt-4">
              <p className="eyebrow">Precio</p>
              <p className="mt-1 font-mono text-3xl text-[color:var(--color-ink)] tabular md:text-4xl">
                {formatMoney(l.price)}
              </p>
              {l.priceARS && (
                <p className="font-mono text-sm text-[color:var(--color-ink-mute)] tabular">
                  {formatMoney(l.priceARS)} (ARS referencial)
                </p>
              )}
              {l.expensas && l.expensas.amount > 0 && (
                <p className="mt-1 font-mono text-xs text-[color:var(--color-ink-mute)] tabular">
                  Expensas: {formatMoney(l.expensas)} /mes
                </p>
              )}
            </section>

            {/* Quick facts */}
            <section data-section="quick-facts" aria-label="Ficha técnica">
              <p className="eyebrow mb-3">Ficha</p>
              <dl className="grid grid-cols-1 gap-0 border-t border-[color:var(--color-divider)]">
                <Fact label="Ambientes" value={`${l.specs.ambientes}`} />
                <Fact label="Dormitorios" value={`${l.specs.dormitorios}`} />
                <Fact label="Baños" value={`${l.specs.baños}`} />
                <Fact label="Cocheras" value={`${l.specs.cocheras}`} />
                <Fact label="Sup. cubierta" value={`${l.areas.cubierta} m²`} />
                <Fact label="Sup. descubierta" value={`${l.areas.descubierta} m²`} />
                <Fact label="Sup. total" value={`${l.areas.total} m²`} />
                <Fact label="Antigüedad" value={`${l.specs.antiguedad} años`} />
                <Fact label="Orientación" value={l.specs.orientacion} />
                <Fact label="Estado" value={l.specs.estado} />
              </dl>
            </section>

            {/* Agent card */}
            {agent && <AgentCard agent={agent} office={office} />}

            {/* Contact form */}
            <ContactForm agent={agent} listingId={l.id} />
          </aside>
        </div>

        {/* Similar listings — below split */}
        <SimilarListings />
      </main>

      {/* Share actions: mobile bottom bar */}
      <ShareActions listingId={l.id} title={l.title} />
      <Footer />
    </>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[1fr_auto] items-baseline gap-4 border-b border-[color:var(--color-divider)] py-3">
      <dt className="text-[11px] uppercase tracking-[0.14em] text-[color:var(--color-ink-mute)]">
        {label}
      </dt>
      <dd className="font-mono text-sm text-[color:var(--color-ink)] tabular">{value}</dd>
    </div>
  );
}

/**
 * Styled SVG static map with a single pin. No live Google Maps iframe — keeps
 * third-party beacons out and loads instantly.
 */
function StaticMap({ lat, lng }: { lat: number; lng: number }) {
  return (
    <svg
      viewBox="0 0 800 500"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={`Mapa aproximado — coordenadas ${lat.toFixed(3)}, ${lng.toFixed(3)}`}
      className="h-full w-full"
    >
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--color-divider)" strokeWidth="0.5" />
        </pattern>
        <pattern id="gridL" width="160" height="160" patternUnits="userSpaceOnUse">
          <path d="M 160 0 L 0 0 0 160" fill="none" stroke="var(--color-divider)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="800" height="500" fill="var(--color-surface)" />
      <rect width="800" height="500" fill="url(#grid)" />
      <rect width="800" height="500" fill="url(#gridL)" />
      {/* A couple of pseudo-streets */}
      <path d="M 0 260 L 800 220" stroke="var(--color-divider)" strokeWidth="8" fill="none" />
      <path d="M 360 0 L 420 500" stroke="var(--color-divider)" strokeWidth="6" fill="none" />
      <path d="M 0 360 L 800 400" stroke="var(--color-divider)" strokeWidth="4" fill="none" />
      {/* Pin at center */}
      <g transform="translate(400,260)">
        <circle r="28" fill="var(--color-accent)" opacity="0.15" />
        <circle r="14" fill="var(--color-accent)" opacity="0.25" />
        <circle r="6" fill="var(--color-accent-deep)" />
      </g>
      <text
        x="400"
        y="310"
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="12"
        fill="var(--color-ink-mute)"
      >
        {lat.toFixed(3)}, {lng.toFixed(3)}
      </text>
    </svg>
  );
}
