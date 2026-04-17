import { LISTING_286194, agentById, officeById } from '@c21/shared';
import { MotionRoot } from '../components/MotionRoot.tsx';
import { UtilityBar } from '../components/UtilityBar.tsx';
import { Nav } from '../components/Nav.tsx';
import { Breadcrumb } from '../components/listing/Breadcrumb.tsx';
import { ListingTitle } from '../components/listing/ListingTitle.tsx';
import { Gallery } from '../components/listing/Gallery.tsx';
import { Price } from '../components/listing/Price.tsx';
import { QuickFacts } from '../components/listing/QuickFacts.tsx';
import { Description } from '../components/listing/Description.tsx';
import { Amenities } from '../components/listing/Amenities.tsx';
import { Neighborhood } from '../components/listing/Neighborhood.tsx';
import { MapBlock } from '../components/listing/MapBlock.tsx';
import { AgentCard } from '../components/listing/AgentCard.tsx';
import { ContactForm } from '../components/listing/ContactForm.tsx';
import { Similar } from '../components/listing/Similar.tsx';
import { ShareRail } from '../components/listing/ShareRail.tsx';
import { Footer } from '../components/Footer.tsx';

/**
 * V2 — Listing (286194 Ramos Mejía).
 * Required data-section keys: breadcrumb, title, gallery, price,
 * quick-facts, description, amenities, neighborhood, map, agent-card,
 * contact-form, similar, share-actions, footer.
 */
export function ListingPage() {
  const listing = LISTING_286194;
  const agent = agentById(listing.agentId);
  const office = officeById(listing.officeId);

  return (
    <MotionRoot>
      <a href="#main" className="skip-link">
        Saltar al contenido
      </a>
      <UtilityBar />
      <Nav tone="light" />
      <main id="main">
        <Breadcrumb
          trail={[
            { label: 'Inicio', href: '/' },
            { label: 'Venta', href: '/?op=venta' },
            { label: 'Casas', href: '/?op=venta&tipo=casa' },
            { label: listing.address.province, href: `/?provincia=${listing.address.province}` },
            { label: listing.address.neighborhood, href: `/?barrio=${listing.address.neighborhood}` },
            { label: listing.title },
          ]}
        />
        <ListingTitle listing={listing} />
        <Gallery listing={listing} />

        <div className="mx-auto grid max-w-[var(--container-max)] grid-cols-1 gap-10 px-4 md:px-6 lg:grid-cols-[1fr_380px]">
          <div className="min-w-0">
            <Price listing={listing} />
            <QuickFacts listing={listing} />
            <Description listing={listing} />
            <Amenities listing={listing} />
            <Neighborhood listing={listing} />
            <MapBlock listing={listing} />
          </div>

          {/* Sticky right sidebar on desktop */}
          <aside className="order-first lg:order-last">
            <div className="lg:sticky lg:top-[96px] lg:pt-10 flex flex-col gap-4">
              {agent && <AgentCard agent={agent} office={office} />}
              <ContactForm listing={listing} />
            </div>
          </aside>
        </div>

        <Similar />
        <ShareRail listing={listing} />
      </main>
      <Footer />
    </MotionRoot>
  );
}
