import { MotionRoot } from '../components/MotionRoot.tsx';
import { UtilityBar } from '../components/UtilityBar.tsx';
import { Nav } from '../components/Nav.tsx';
import { Hero } from '../components/Hero.tsx';
import { SearchWidget } from '../components/SearchWidget.tsx';
import { FeaturedGrid } from '../components/FeaturedGrid.tsx';
import { VendorCta } from '../components/VendorCta.tsx';
import { BrandStory } from '../components/BrandStory.tsx';
import { FranchiseCta } from '../components/FranchiseCta.tsx';
import { TestimonialsGrid } from '../components/TestimonialsGrid.tsx';
import { BlogGrid } from '../components/BlogGrid.tsx';
import { Newsletter } from '../components/Newsletter.tsx';
import { Footer } from '../components/Footer.tsx';

/**
 * V2 — Kinetic Marquee — Home
 *
 * Required data-section keys:
 *   utility-bar · nav · hero · search · featured · vendor-cta · brand-story ·
 *   franchise-cta · testimonials · blog · newsletter · footer
 */
export function HomePage() {
  return (
    <MotionRoot>
      <a href="#main" className="skip-link">
        Saltar al contenido
      </a>
      <UtilityBar />
      <Nav tone="ink" />
      <main id="main">
        <Hero />
        <SearchWidget />
        <FeaturedGrid />
        <VendorCta />
        <BrandStory />
        <FranchiseCta />
        <TestimonialsGrid />
        <BlogGrid />
        <Newsletter />
      </main>
      <Footer />
    </MotionRoot>
  );
}
