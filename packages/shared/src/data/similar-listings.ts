import type { FeaturedCard } from '../types.ts';

/**
 * Three "similar properties" cards for the listing detail page. Same shape as
 * featured cards; same mockup disclaimer applies.
 */
export const SIMILAR_LISTINGS: readonly FeaturedCard[] = [
  {
    id: '286702',
    slug: 'casa-3-ambientes-haedo-patio-cochera',
    operation: 'venta',
    propertyType: 'casa',
    title: 'Casa en Haedo con cochera y patio',
    neighborhood: 'Haedo',
    province: 'Buenos Aires',
    price: { amount: 215000, currency: 'USD' },
    specsShort: { ambientes: 3, dormitorios: 2, baños: 2, cubierta: 140 },
    photoUnsplashId: '1583608205776-bfd35f0d9f83',
    photoAlt: 'Casa en Haedo con jardín frontal',
  },
  {
    id: '287884',
    slug: 'casa-4-ambientes-castelar-norte-pileta',
    operation: 'venta',
    propertyType: 'casa',
    title: 'Casa con pileta y parrilla en Castelar Norte',
    neighborhood: 'Castelar',
    province: 'Buenos Aires',
    price: { amount: 265000, currency: 'USD' },
    specsShort: { ambientes: 4, dormitorios: 3, baños: 2, cubierta: 175 },
    photoUnsplashId: '1568605114967-8130f3a36994',
    photoAlt: 'Casa en Castelar con pileta',
  },
  {
    id: '288050',
    slug: 'casa-5-ambientes-san-justo-lote-propio',
    operation: 'venta',
    propertyType: 'casa',
    title: 'Casa de 5 ambientes sobre lote propio',
    neighborhood: 'San Justo',
    province: 'Buenos Aires',
    price: { amount: 298000, currency: 'USD' },
    specsShort: { ambientes: 5, dormitorios: 4, baños: 2, cubierta: 210 },
    photoUnsplashId: '1613490493576-7fde63acd811',
    photoAlt: 'Casa amplia en San Justo',
  },
] as const;
