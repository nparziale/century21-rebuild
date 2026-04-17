/**
 * V2 — Kinetic Marquee — Home
 *
 * STUB. Every one of the 13 required data-section keys is present. The build
 * subagent replaces each stub with the full component per the V2 refined spec
 * (Switzer weight-morph hero, pre-rendered MP4 hero b-roll, horizontal
 * marquee of fresh listings, interactive Argentina SVG map, single-accent
 * rule warm/cool zones).
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
