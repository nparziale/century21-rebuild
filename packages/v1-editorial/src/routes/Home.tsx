import { Blog } from '../components/Blog';
import { BrandStory } from '../components/BrandStory';
import { FeaturedGrid } from '../components/FeaturedGrid';
import { Footer } from '../components/Footer';
import { FranchiseCTA } from '../components/FranchiseCTA';
import { Hero } from '../components/Hero';
import { Nav } from '../components/Nav';
import { Newsletter } from '../components/Newsletter';
import { SearchWidget } from '../components/SearchWidget';
import { Testimonials } from '../components/Testimonials';
import { UtilityBar } from '../components/UtilityBar';
import { VendorCTA } from '../components/VendorCTA';

/**
 * V1 — Editorial Pampas — Home
 * 13 sections in spec order. See /Users/nparziale/.../packages/v1-editorial
 * for the full build spec.
 */
export function HomePage() {
  return (
    <>
      <a href="#main" className="skip-link">
        Saltar al contenido
      </a>
      <UtilityBar />
      <Nav />
      <main id="main">
        <Hero />
        <SearchWidget />
        <FeaturedGrid />
        <VendorCTA />
        <BrandStory />
        <FranchiseCTA />
        <Testimonials />
        <Blog />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
