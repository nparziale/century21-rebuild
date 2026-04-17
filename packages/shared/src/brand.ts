import type { SocialLink } from './types.ts';

/**
 * Verified Century 21 Argentina brand facts.
 *
 * Every value here was confirmed against primary public sources during the
 * "Brand truth" research phase of PLAN.md. Do not add fabricated stats —
 * Argentina office count, agent count, annual operations count are not
 * publicly disclosed and must not appear anywhere in copy.
 */
export const BRAND = {
  name: 'CENTURY 21 Argentina',
  globalFoundedYear: 1971,
  argentinaLaunchDate: '2017-06-12',
  countriesOperated: 79,
  globalOfficesApprox: 'más de 11.000',
  provinciasCubiertas: 28,
  phone: '(011) 3070 5043',
  hq: 'Madison, NJ, EE. UU.',
  parent: 'Compass International Holdings',
  argentinaCEO: 'María Verónica Pagola',

  tagline: 'Dando el 121%',
  taglineSub: 'Desafiando la mediocridad',
  positioning: 'Tu Agencia de Bienes Raíces de Confianza en Argentina',

  paletteGold: '#BEAF88',
  paletteInk: '#252526',
} as const;

export const SOCIALS: readonly SocialLink[] = [
  { network: 'instagram', handle: '@century21arg', url: 'https://www.instagram.com/century21arg' },
  { network: 'facebook', handle: 'century21arg', url: 'https://www.facebook.com/century21arg' },
  {
    network: 'linkedin',
    handle: 'century21-argentina',
    url: 'https://ar.linkedin.com/company/century21-argentina',
  },
  { network: 'x', handle: '@century21arg', url: 'https://x.com/century21arg' },
] as const;

/**
 * Verbatim legal disclaimer from century21.com.ar footer. Render in every
 * version's footer, every page.
 */
export const LEGAL_FOOTER =
  'La marca y el logotipo CENTURY 21 son propiedad de CENTURY 21 Real Estate, LLC. ' +
  'Cada Oficina es de Propiedad y Operación Independiente. CENTURY 21 Argentina, ' +
  'no es responsable por la exactitud o complementos de la información de los ' +
  'Afiliados, de los corredores inmobiliarios y de las propiedades y de otra ' +
  'información provista por los usuarios de este sitio. La información puede ' +
  'cambiar sin previo aviso. La opinión de algunos artículos es responsabilidad ' +
  'de sus autores y han sido publicados solo para fines informativos y no expresa ' +
  'el punto de vista de CENTURY 21 Argentina.';

/**
 * Project-level disclaimer shown in showcase.html and the listing footer,
 * so visitors can't mistake mock content for live C21 operations.
 */
export const DESIGN_BUILD_DISCLAIMER =
  'Sitio de demostración de diseño. Las propiedades, agentes, testimonios y ' +
  'artículos son ejemplos y no representan inventario real de CENTURY 21 Argentina. ' +
  'El teléfono, legales, redes y datos corporativos son los oficiales verificados.';

export const NAV_PRIMARY = [
  {
    key: 'comprar',
    label: 'Encuentra una propiedad',
    href: '/',
    children: [
      { label: 'Casas en venta', href: '/?op=venta&tipo=casa' },
      { label: 'Departamentos en venta', href: '/?op=venta&tipo=departamento' },
      { label: 'Alquileres', href: '/?op=alquiler' },
      { label: 'Inmuebles en el Extranjero', href: '/?op=venta&internacional=1' },
    ],
  },
  {
    key: 'vender',
    label: 'Confíanos tu propiedad',
    href: '/confianos-tu-propiedad',
    children: [
      { label: 'Tasación gratuita', href: '/confianos-tu-propiedad#tasacion' },
      { label: 'Promover mi propiedad', href: '/confianos-tu-propiedad#promover' },
    ],
  },
  {
    key: 'unete',
    label: 'Únete a C21',
    href: '/unete',
    children: [
      { label: 'Trabaja con nosotros', href: '/unete' },
      { label: 'Adquiere una Licencia', href: '/licencias' },
      { label: 'Acerca de C21', href: '/acerca' },
    ],
  },
  {
    key: 'contacto',
    label: 'Contáctanos',
    href: '/contacto',
    children: [
      { label: 'Directorio de Oficinas', href: '/directorio' },
      { label: '21 Online', href: '/21-online' },
    ],
  },
] as const;

export const FOOTER_COLUMNS = {
  nosotros: {
    label: 'Nosotros',
    links: [
      { label: 'Misión, Visión y Valores', href: '/acerca' },
      { label: 'Licencias', href: '/licencias' },
      { label: 'Acerca de C21', href: '/acerca' },
      { label: 'Aviso de Privacidad', href: '/privacidad' },
    ],
  },
  explora: {
    label: 'Explora',
    links: [
      { label: 'Directorio de Oficinas', href: '/directorio' },
      { label: 'Propiedades en Venta', href: '/?op=venta' },
      { label: 'Propiedades en Alquiler', href: '/?op=alquiler' },
      { label: 'Búsqueda Internacional', href: '/?internacional=1' },
    ],
  },
  contacto: {
    label: 'Contacto',
    links: [
      { label: BRAND.phone, href: `tel:+54${BRAND.phone.replace(/\D/g, '').slice(1)}` },
      { label: 'Contáctanos', href: '/contacto' },
      { label: 'Reclutamiento', href: '/unete' },
      { label: 'Ofrezco Propiedad', href: '/confianos-tu-propiedad' },
      { label: 'Envíanos un comentario', href: '/contacto#comentario' },
      { label: 'Reportar Anomalía', href: '/contacto#anomalia' },
    ],
  },
} as const;

/**
 * Tenure in Argentina at render time. Copy should prefer "desde 2017" over a
 * computed number where a stable phrasing is desired.
 */
export function tenureYearsInArgentina(today: Date = new Date()): number {
  const launch = new Date(BRAND.argentinaLaunchDate);
  const ms = today.getTime() - launch.getTime();
  return Math.floor(ms / (365.25 * 24 * 60 * 60 * 1000));
}

/**
 * Global tenure ("54 años globalmente" at plan date).
 */
export function tenureYearsGlobal(today: Date = new Date()): number {
  return today.getFullYear() - BRAND.globalFoundedYear;
}
