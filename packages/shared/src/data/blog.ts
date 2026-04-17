import type { BlogCard } from '../types.ts';

/**
 * Three editorial cards for the homepage blog teaser. Voice: terse, specific,
 * no marketing adjectives. Titles read as journalism or in-house bulletins,
 * not listicles. Dates are frozen to plan date (2026-04) ± a couple weeks.
 *
 * Photo IDs reuse the set verified working in featured-listings.ts so cards
 * never render broken imagery out of the box. Swap to local generated assets
 * via media-todo.md § 6 when real covers land.
 */
export const BLOG_CARDS: readonly BlogCard[] = [
  {
    id: 'b1',
    slug: 'lectura-previa-de-una-escritura-en-caba',
    title: 'La lectura previa de una escritura en CABA',
    dek:
      'Qué se mira en el título, el estado de ocupación y los cargos antes de ' +
      'firmar. Lo que un escribano revisa en la semana previa al cierre.',
    category: 'Guías',
    publishedAt: '2026-04-08',
    readMinutes: 8,
    photoUnsplashId: '1505873242700-f289a29e1e0f',
  },
  {
    id: 'b2',
    slug: 'ramos-mejia-m2-primer-trimestre-2026',
    title: 'Ramos Mejía: el m² del primer trimestre',
    dek:
      'El valor publicado subió 2,3 % contra diciembre. El movimiento lo empujaron ' +
      'las casas sobre lote propio de más de 200 m². Los PH recuperan consultas.',
    category: 'Mercado',
    publishedAt: '2026-04-02',
    readMinutes: 5,
    photoUnsplashId: '1564013799919-ab600027ffc6',
  },
  {
    id: 'b3',
    slug: 'expensas-ordinarias-extraordinarias-fondo-de-reserva',
    title: 'Ordinarias, extraordinarias y fondo de reserva',
    dek:
      'Tres rubros que conviven en el mismo recibo y que dicen cosas distintas. ' +
      'Cómo pedir la proyección anual antes de hacer una oferta.',
    category: 'Guías',
    publishedAt: '2026-03-21',
    readMinutes: 6,
    photoUnsplashId: '1600047509807-ba8f99d2cdde',
  },
] as const;
