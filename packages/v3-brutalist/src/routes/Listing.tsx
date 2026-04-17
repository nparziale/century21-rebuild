import { MotionConfig } from 'motion/react';
import {
  LISTING_286194,
  agentById,
  officeById,
} from '@c21/shared';
import { Nav } from '../components/Nav.tsx';
import { UtilityBar } from '../components/UtilityBar.tsx';
import { Breadcrumb } from '../components/Breadcrumb.tsx';
import { ListingTitle } from '../components/ListingTitle.tsx';
import { Gallery } from '../components/Gallery.tsx';
import { PriceBlock } from '../components/PriceBlock.tsx';
import { QuickFacts } from '../components/QuickFacts.tsx';
import { DescriptionBlock } from '../components/DescriptionBlock.tsx';
import { Amenities } from '../components/Amenities.tsx';
import { Neighborhood } from '../components/Neighborhood.tsx';
import { MapBlock } from '../components/MapBlock.tsx';
import { AgentCard } from '../components/AgentCard.tsx';
import { ContactForm } from '../components/ContactForm.tsx';
import { MortgageCalc } from '../components/MortgageCalc.tsx';
import { SimilarGrid } from '../components/SimilarGrid.tsx';
import { ShareActions } from '../components/ShareActions.tsx';
import { Footer } from '../components/Footer.tsx';
import { SectionCounter } from '../components/SectionCounter.tsx';

export function ListingPage() {
  const listing = LISTING_286194;
  const agent = agentById(listing.agentId);
  const office = officeById(listing.officeId);

  return (
    <MotionConfig reducedMotion="user">
      <a href="#main" className="skip-link">
        Saltar al contenido
      </a>
      <SectionCounter />
      <UtilityBar />
      <Nav />
      <main id="main">
        <Breadcrumb listing={listing} />
        <ListingTitle listing={listing} />
        <Gallery photos={listing.gallery} listingId={listing.id} />
        <PriceBlock listing={listing} />
        <QuickFacts listing={listing} />
        <DescriptionBlock listing={listing} agent={agent} />
        <Amenities listing={listing} />
        <Neighborhood listing={listing} />
        <MapBlock listing={listing} />

        <section>
          <div className="mx-auto max-w-[1920px] px-4 md:px-6 xl:px-10 py-10 xl:py-14">
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 xl:gap-8">
              <div className="xl:col-span-8">
                <ContactForm listing={listing} />
              </div>
              <div className="xl:col-span-4">
                {agent && <AgentCard agent={agent} office={office} />}
              </div>
            </div>
          </div>
        </section>

        <MortgageCalc listing={listing} />
        <SimilarGrid />
        <ShareActions listing={listing} />
      </main>
      <Footer />
    </MotionConfig>
  );
}
