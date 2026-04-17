import type { Testimonial } from '../types.ts';

/**
 * Mockup testimonial quotes. Voices span client + broker + franquiciado so
 * each version can choose the mix that fits its tone (V1 editorial-warm,
 * V2 declarative-cool, V3 documentary).
 */
export const TESTIMONIALS: readonly Testimonial[] = [
  {
    id: 't1',
    quote:
      'Buscábamos en Ramos Mejía hacía dos años. Laura no nos apuró nunca. Firmamos en marzo.',
    attribution: 'Inés y Pablo',
    role: 'cliente',
    neighborhood: 'Ramos Mejía',
    photoUnsplashId: '1531123897727-8f129e1688ce',
  },
  {
    id: 't2',
    quote:
      'Mostrar una casa es leer una familia. Recién después se habla de metros.',
    attribution: 'Martín Salaberry, asesor',
    role: 'broker',
    neighborhood: 'Palermo',
    photoUnsplashId: '1507003211169-0a1dd7228f2d',
  },
  {
    id: 't3',
    quote:
      'Entregamos las llaves de la casa de mis viejos con respeto. Eso lo valoré más que el precio.',
    attribution: 'Carolina D.',
    role: 'cliente',
    neighborhood: 'Belgrano',
    photoUnsplashId: '1554151228-14d9def656e4',
  },
  {
    id: 't4',
    quote: 'Cerramos la operación en 11 días. La tasación fue exacta.',
    attribution: 'Laura M.',
    role: 'cliente',
    neighborhood: 'Ramos Mejía',
    photoUnsplashId: '1544005313-94ddf0286df2',
  },
  {
    id: 't5',
    quote: 'Mi franquicia creció 40% el primer año con el soporte regional.',
    attribution: 'Franco B., franquiciado',
    role: 'franquiciado',
    neighborhood: 'Córdoba',
    photoUnsplashId: '1519085360753-af0119f7cbe7',
  },
];
