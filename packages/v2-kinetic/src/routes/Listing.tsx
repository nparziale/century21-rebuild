/**
 * V2 — Kinetic Marquee — Listing (286194 Ramos Mejía)
 *
 * STUB. Every one of the 15 required data-section keys is present. The build
 * subagent replaces each stub with the full component per the V2 refined spec
 * (full-bleed hero + pinned metadata, horizontal strip gallery, sticky right
 * sidebar with agent bio peek + contact + calculator).
 */
export function ListingPage() {
  return (
    <>
      <a href="#main" className="skip-link">
        Saltar al contenido
      </a>
      <header data-section="nav" hidden>
        nav
      </header>
      <main id="main">
        <nav data-section="breadcrumb" aria-label="breadcrumb">
          breadcrumb
        </nav>
        <section data-section="title">title</section>
        <section data-section="gallery">gallery</section>
        <section data-section="price">price</section>
        <section data-section="quick-facts">quick-facts</section>
        <section data-section="description">description</section>
        <section data-section="amenities">amenities</section>
        <section data-section="neighborhood">neighborhood</section>
        <section data-section="map">map</section>
        <aside data-section="agent-card">agent-card</aside>
        <section data-section="contact-form">contact-form</section>
        <section data-section="mortgage-calc">mortgage-calc</section>
        <section data-section="similar">similar</section>
        <aside data-section="share-actions">share-actions</aside>
      </main>
      <footer data-section="footer">footer</footer>
    </>
  );
}
