import type { Listing } from '../types.ts';
import { unsplashUrl } from './unsplash.ts';

/**
 * Mockup data for listing 286194, based on the real title from
 * century21.com.ar/propiedad/286194_casa-de-4-ambientes-en-venta-ramos-mejia-con-pileta-y-cochera
 *
 * Only the title, neighborhood, and core facts (casa / 4 ambientes / pileta /
 * cochera) are taken from the real listing. Price, m², full description,
 * address details, amenities, and agent are plausible mock values and do not
 * represent a real C21 Argentina inventory item.
 */
export const LISTING_286194: Listing = {
  id: '286194',
  slug: 'casa-de-4-ambientes-en-venta-ramos-mejia-con-pileta-y-cochera',
  operation: 'venta',
  propertyType: 'casa',
  title: 'Casa de 4 ambientes en venta en Ramos Mejía con pileta y cochera',
  price: { amount: 285000, currency: 'USD' },
  priceARS: { amount: 313_500_000, currency: 'ARS' },
  expensas: { amount: 0, currency: 'ARS' },
  address: {
    street: 'Ramos Mejía (calle reservada hasta la firma)',
    neighborhood: 'Ramos Mejía',
    city: 'La Matanza',
    province: 'Buenos Aires',
    lat: -34.6447,
    lng: -58.5668,
  },
  specs: {
    ambientes: 4,
    dormitorios: 3,
    baños: 2,
    cocheras: 2,
    antiguedad: 35,
    orientacion: 'Norte',
    estado: 'Muy bueno',
  },
  areas: {
    cubierta: 180,
    semicubierta: 32,
    descubierta: 118,
    total: 330,
  },
  amenities: [
    'pileta',
    'parrilla',
    'quincho',
    'cochera-doble',
    'jardin',
    'patio',
    'lavadero',
    'dependencia-servicio',
    'aire-acondicionado',
    'calefaccion-radiadores',
    'portón-automatizado',
    'alarma',
    'seguridad-barrio',
    'pisos-madera',
    'ventanas-dvh',
    'termotanque-gas',
    'toilette',
    'placares-empotrados',
    'cocina-integrada',
    'tendedero',
  ],
  description:
    'Casa en dos plantas sobre lote propio de 330 m² en uno de los corredores más buscados de ' +
    'Ramos Mejía, a pocas cuadras de Av. de Mayo y la estación del ferrocarril Sarmiento. En ' +
    'planta baja: living comedor amplio con salida a galería, cocina integrada con isla y ' +
    'desayunador, toilette de recepción, dependencia de servicio y lavadero. La galería con ' +
    'parrilla abre a un jardín con pileta y deck de madera. En planta alta: tres dormitorios ' +
    'con placares empotrados, baño completo con bañera, y un escritorio/estar que funciona ' +
    'como cuarto ambiente. Cochera doble cubierta con portón automatizado. Pisos de madera ' +
    'originales restaurados, carpinterías DVH, caldera y termotanque a gas. Barrio residencial ' +
    'tranquilo, con vigilancia privada y transporte público a pocos metros. Excelente estado ' +
    'de conservación. Se entrega con posesión inmediata.',
  gallery: [
    {
      src: unsplashUrl('1564013799919-ab600027ffc6', 2400),
      alt: 'Fachada de la casa con entrada al caer la tarde',
      caption: 'Exterior — frente sobre calle arbolada',
    },
    {
      src: unsplashUrl('1600596542815-ffad4c1539a9', 2400),
      alt: 'Pileta y deck de madera en el jardín trasero',
      caption: 'Pileta y quincho',
    },
    {
      src: unsplashUrl('1600585154340-be6161a56a0c', 2400),
      alt: 'Living comedor amplio con salida al jardín',
      caption: 'Living comedor principal',
    },
    {
      src: unsplashUrl('1556912173-3bb406ef7e77', 2400),
      alt: 'Cocina integrada con isla y desayunador',
      caption: 'Cocina integrada',
    },
    {
      src: unsplashUrl('1600566753190-17f0baa2a6c3', 2400),
      alt: 'Dormitorio principal con placares empotrados',
      caption: 'Dormitorio principal',
    },
    {
      src: unsplashUrl('1600566753086-00f18fe6ba68', 2400),
      alt: 'Baño completo con bañera en planta alta',
      caption: 'Baño completo',
    },
    {
      src: unsplashUrl('1600607687939-ce8a6c25118c', 2400),
      alt: 'Galería con parrilla abierta al jardín',
      caption: 'Galería con parrilla',
    },
    {
      src: unsplashUrl('1600566753376-12c8ab7fb75b', 2400),
      alt: 'Cochera doble cubierta con portón automatizado',
      caption: 'Cochera doble',
    },
  ],
  agentId: 'agent-laura-mansilla',
  officeId: 'office-ramos-mejia',
  publishedAt: '2026-02-18',
  updatedAt: '2026-04-09',
};

export const AMENITY_LABELS: Record<string, string> = {
  pileta: 'Pileta',
  parrilla: 'Parrilla',
  quincho: 'Quincho',
  'cochera-doble': 'Cochera doble',
  jardin: 'Jardín',
  patio: 'Patio',
  lavadero: 'Lavadero',
  'dependencia-servicio': 'Dependencia de servicio',
  'aire-acondicionado': 'Aire acondicionado',
  'calefaccion-radiadores': 'Calefacción por radiadores',
  'portón-automatizado': 'Portón automatizado',
  alarma: 'Alarma',
  'seguridad-barrio': 'Seguridad de barrio',
  'pisos-madera': 'Pisos de madera',
  'ventanas-dvh': 'Ventanas DVH',
  'termotanque-gas': 'Termotanque a gas',
  toilette: 'Toilette',
  'placares-empotrados': 'Placares empotrados',
  'cocina-integrada': 'Cocina integrada',
  tendedero: 'Tendedero',
};
