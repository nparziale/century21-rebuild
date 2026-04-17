/**
 * V3 — Raw Grid — Home
 *
 * STUB. Every one of the 13 required data-section keys is present. The build
 * subagent replaces each stub with the full component per the V3 refined spec
 * (Anton ultra-condensed display, visible 12-col gutters with 1 px ink rules,
 * section-counter side-rail ≥1280, number counters, FLIP grid reflow on filter).
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
