/**
 * V1 — Editorial Pampas — Home
 *
 * STUB. Every one of the 13 required data-section keys is present. The build
 * subagent replaces each stub with the full component per the V1 refined spec
 * (Fraunces display, bronze/olive accents, crop-reveal motion, caret-swap nav,
 * 60/40 editorial splits at ≥1024 px, marginalia gutter at ≥1280 px).
 */
export function HomePage() {
  return (
    <>
      <a href="#main" className="skip-link">
        Saltar al contenido
      </a>
      <section data-section="utility-bar">utility-bar</section>
      <header data-section="nav">nav</header>
      <main id="main">
        <section data-section="hero">hero</section>
        <section data-section="search">search</section>
        <section data-section="featured">featured</section>
        <section data-section="vendor-cta">vendor-cta</section>
        <section data-section="brand-story">brand-story</section>
        <section data-section="office-locator">office-locator</section>
        <section data-section="franchise-cta">franchise-cta</section>
        <section data-section="testimonials">testimonials</section>
        <section data-section="blog">blog</section>
        <section data-section="newsletter">newsletter</section>
      </main>
      <footer data-section="footer">footer</footer>
    </>
  );
}
