/**
 * Required data-section markers for each page of each version. A missing key
 * fails the gate with a named error — this is the anti-"missing-section" gate.
 */
export const HOME_SECTIONS = [
  'utility-bar',
  'nav',
  'hero',
  'search',
  'featured',
  'vendor-cta',
  'brand-story',
  'office-locator',
  'franchise-cta',
  'testimonials',
  'blog',
  'newsletter',
  'footer',
] as const;

export const LISTING_SECTIONS = [
  'breadcrumb',
  'title',
  'gallery',
  'price',
  'quick-facts',
  'description',
  'amenities',
  'neighborhood',
  'map',
  'agent-card',
  'contact-form',
  'similar',
  'share-actions',
  'footer',
] as const;

export type SectionKey = (typeof HOME_SECTIONS)[number] | (typeof LISTING_SECTIONS)[number];

/**
 * Each version's dev server port + production base path.
 */
export const VERSIONS = [
  { id: 'v1', name: 'v1-editorial', devPort: 5173, buildBase: '/v1/' },
  { id: 'v2', name: 'v2-kinetic', devPort: 5174, buildBase: '/v2/' },
  { id: 'v3', name: 'v3-brutalist', devPort: 5175, buildBase: '/v3/' },
] as const;

/**
 * Six viewports — mobile-first to widescreen. Two pages × three versions ×
 * six viewports = 36 coverage cells.
 */
export const VIEWPORTS = [
  { name: 'mobile-sm', width: 360, height: 780 },
  { name: 'mobile-lg', width: 414, height: 896 },
  { name: 'tablet-portrait', width: 768, height: 1024 },
  { name: 'tablet-landscape', width: 1024, height: 768 },
  { name: 'laptop', width: 1440, height: 900 },
  { name: 'desktop', width: 1920, height: 1080 },
] as const;

/** Pages under test per version. */
export const PAGES = [
  { key: 'home', path: '/', sections: HOME_SECTIONS },
  {
    key: 'listing',
    path: '/propiedad/286194',
    sections: LISTING_SECTIONS,
  },
] as const;
