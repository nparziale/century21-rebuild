import { MotionConfig } from 'motion/react';
import { UtilityBar } from '../components/UtilityBar.tsx';
import { Nav } from '../components/Nav.tsx';
import { Hero } from '../components/Hero.tsx';
import { SearchWidget } from '../components/SearchWidget.tsx';
import { FeaturedGrid } from '../components/FeaturedGrid.tsx';
import { VendorCTA } from '../components/VendorCTA.tsx';
import { BrandStory } from '../components/BrandStory.tsx';
import { OfficeLocator } from '../components/OfficeLocator.tsx';
import { FranchiseCTA } from '../components/FranchiseCTA.tsx';
import { TestimonialsGrid } from '../components/TestimonialsGrid.tsx';
import { BlogGrid } from '../components/BlogGrid.tsx';
import { Newsletter } from '../components/Newsletter.tsx';
import { Footer } from '../components/Footer.tsx';
import { SectionCounter } from '../components/SectionCounter.tsx';

export function HomePage() {
  return (
    <MotionConfig reducedMotion="user">
      <a href="#main" className="skip-link">
        Saltar al contenido
      </a>
      <SectionCounter />
      <UtilityBar />
      <Nav />
      <main id="main">
        <Hero />
        <SearchWidget />
        <FeaturedGrid />
        <VendorCTA />
        <BrandStory />
        <OfficeLocator />
        <FranchiseCTA />
        <TestimonialsGrid />
        <BlogGrid />
        <Newsletter />
      </main>
      <Footer />
    </MotionConfig>
  );
}
