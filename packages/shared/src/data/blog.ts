import type { BlogCard } from '../types.ts';

/**
 * Three blog/insight cards for the home page teaser. Mockup content — titles
 * are chosen to feel plausible for an Argentine real-estate audience.
 */
export const BLOG_CARDS: readonly BlogCard[] = [
  {
    id: 'b1',
    slug: 'como-leer-una-escritura-antes-de-firmar',
    title: 'Cómo leer una escritura antes de firmarla',
    dek:
      'Cinco lecturas cruzadas que hacemos antes de cerrar una operación, explicadas ' +
      'para quien compra su primera propiedad.',
    category: 'Guías',
    publishedAt: '2026-03-18',
    readMinutes: 7,
    photoUnsplashId: '1450101499163-c8848c66ca85',
  },
  {
    id: 'b2',
    slug: 'ramos-mejia-el-oeste-que-volvio-a-mirarse',
    title: 'Ramos Mejía, el oeste que volvió a mirarse',
    dek:
      'Repunte de precios por m² del primer trimestre, pero el movimiento está en ' +
      'las casas sobre lote propio que el mercado porteño dejaba de lado.',
    category: 'Mercado',
    publishedAt: '2026-04-02',
    readMinutes: 5,
    photoUnsplashId: '1518155317743-a8ff43ea6a5f',
  },
  {
    id: 'b3',
    slug: 'expensas-en-caba-que-cubre-cada-categoria',
    title: 'Expensas en CABA: qué cubre cada categoría',
    dek:
      'Ordinarias, extraordinarias y fondos de reserva. Cómo interpretarlas en la ' +
      'ficha de una propiedad antes de hacer una oferta.',
    category: 'Guías',
    publishedAt: '2026-03-28',
    readMinutes: 6,
    photoUnsplashId: '1515263487990-61b07816b924',
  },
] as const;
