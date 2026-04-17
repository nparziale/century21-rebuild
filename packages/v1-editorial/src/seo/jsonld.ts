import type { Listing } from '@c21/shared';
import { BRAND } from '@c21/shared';

export function homeOrganizationJsonLd(canonicalBase: string): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: BRAND.name,
    description: BRAND.positioning,
    url: canonicalBase ? `${canonicalBase}/` : undefined,
    telephone: BRAND.phone,
    areaServed: { '@type': 'Country', name: 'Argentina' },
  };
}

export function homeWebSiteJsonLd(canonicalBase: string): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: BRAND.name,
    url: canonicalBase ? `${canonicalBase}/` : undefined,
    inLanguage: 'es-AR',
  };
}

export function listingRealEstateJsonLd(listing: Listing, canonicalUrl: string): Record<string, unknown> {
  const img = listing.gallery[0]?.src;
  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: listing.title,
    url: canonicalUrl,
    datePosted: listing.publishedAt,
    ...(img ? { image: img } : {}),
    offers: {
      '@type': 'Offer',
      price: String(listing.price.amount),
      priceCurrency: listing.price.currency,
      availability: 'https://schema.org/OnlineOnly',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: listing.address.neighborhood,
      addressRegion: listing.address.province,
      addressCountry: 'AR',
    },
  };
}
