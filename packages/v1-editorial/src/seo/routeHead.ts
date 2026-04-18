import { LISTING_286194 } from '@c21/shared';
import type { Listing } from '@c21/shared';
import { BRAND } from '@c21/shared';
import { truncateMetaDescription } from './config.ts';
import { homeOrganizationJsonLd, homeWebSiteJsonLd, listingRealEstateJsonLd } from './jsonld.ts';

export type HeadSnapshot = {
  title: string;
  description: string;
  canonical: string;
  og: Record<string, string>;
  twitter: Record<string, string>;
  jsonLd: string[];
};

const HOME_TITLE = `${BRAND.name} — Editorial Pampas | Bienes raíces en Argentina`;
const HOME_DESC =
  'Propiedades seleccionadas en Argentina, acompañadas por asesores de CENTURY 21 desde 2017. ' +
  'Casas, departamentos y experiencia de marca con alcance internacional.';

function absoluteCanonical(path: string, canonicalBase: string): string {
  const p = path.startsWith('/') ? path : `/${path}`;
  if (canonicalBase) return `${canonicalBase.replace(/\/$/, '')}${p}`;
  if (typeof window !== 'undefined') return `${window.location.origin}${p}`;
  return p;
}

function listingHead(listing: Listing, canonicalBase: string): HeadSnapshot {
  const path = `/propiedad/${listing.id}`;
  const canonical = absoluteCanonical(path, canonicalBase);
  const pageTitle = `${listing.title} | ${BRAND.name}`;
  const metaDesc = truncateMetaDescription(
    listing.description ||
      `${listing.propertyType} en ${listing.address.neighborhood}, ${listing.address.city}.`,
  );
  const ogImage = listing.gallery[0]?.src ?? '';
  const jsonLd = [JSON.stringify(listingRealEstateJsonLd(listing, canonical))];

  const og: Record<string, string> = {
    'og:type': 'article',
    'og:locale': 'es_AR',
    'og:site_name': BRAND.name,
    'og:title': listing.title,
    'og:description': metaDesc,
    'og:url': canonical,
  };
  if (ogImage) {
    og['og:image'] = ogImage;
    og['og:image:secure_url'] = ogImage;
  }

  const twitter: Record<string, string> = {
    'twitter:card': 'summary_large_image',
    'twitter:title': listing.title,
    'twitter:description': metaDesc,
  };
  if (ogImage) twitter['twitter:image'] = ogImage;

  return {
    title: pageTitle,
    description: metaDesc,
    canonical,
    og,
    twitter,
    jsonLd,
  };
}

function homeHead(canonicalBase: string): HeadSnapshot {
  const canonical = absoluteCanonical('/', canonicalBase);
  const base = canonicalBase || (typeof window !== 'undefined' ? window.location.origin : '');
  const jsonLd = [
    JSON.stringify(homeOrganizationJsonLd(base)),
    JSON.stringify(homeWebSiteJsonLd(base)),
  ];

  return {
    title: HOME_TITLE,
    description: HOME_DESC,
    canonical,
    og: {
      'og:type': 'website',
      'og:locale': 'es_AR',
      'og:site_name': BRAND.name,
      'og:title': HOME_TITLE,
      'og:description': HOME_DESC,
      'og:url': canonical,
    },
    twitter: {
      'twitter:card': 'summary_large_image',
      'twitter:title': HOME_TITLE,
      'twitter:description': HOME_DESC,
    },
    jsonLd,
  };
}

export function computeHeadSnapshot(pathname: string, canonicalBase: string): HeadSnapshot {
  if (pathname.startsWith('/propiedad/')) {
    return listingHead(LISTING_286194, canonicalBase);
  }
  return homeHead(canonicalBase);
}

export function computeHeadForClient(pathname: string): HeadSnapshot {
  const base = getClientCanonicalBase();
  return computeHeadSnapshot(pathname, base);
}

function getClientCanonicalBase(): string {
  const env = import.meta.env.VITE_CANONICAL_BASE_URL?.replace(/\/$/, '');
  if (env) return env;
  const { origin, pathname } = window.location;
  const propIdx = pathname.indexOf('/propiedad/');
  if (propIdx > 0) return origin + pathname.slice(0, propIdx).replace(/\/$/, '');
  if (propIdx === 0) return origin;
  return origin;
}
