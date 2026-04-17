import type { Office } from '../types.ts';

/**
 * Mockup C21 Argentina office listings. Names follow C21's franchise naming
 * pattern (CENTURY 21 + Neighborhood) but these specific offices are design
 * placeholders — the real directory is at century21.com.ar/directorio.
 */
export const OFFICES: readonly Office[] = [
  {
    id: 'office-ramos-mejia',
    name: 'CENTURY 21 Ramos Mejía',
    province: 'Buenos Aires',
    region: 'GBA Oeste',
    address: 'Av. de Mayo 1250, Ramos Mejía, La Matanza',
    phone: '+54 11 4658 7200',
    email: 'ramosmejia@century21arg.example',
  },
  {
    id: 'office-palermo-soho',
    name: 'CENTURY 21 Palermo Soho',
    province: 'Buenos Aires',
    region: 'Capital Federal',
    address: 'Honduras 4890, CABA',
    phone: '+54 11 4831 9020',
    email: 'palermo@century21arg.example',
  },
  {
    id: 'office-belgrano',
    name: 'CENTURY 21 Belgrano',
    province: 'Buenos Aires',
    region: 'Capital Federal',
    address: 'Av. Cabildo 2230, CABA',
    phone: '+54 11 4783 1515',
    email: 'belgrano@century21arg.example',
  },
  {
    id: 'office-vicente-lopez',
    name: 'CENTURY 21 Vicente López',
    province: 'Buenos Aires',
    region: 'GBA Norte',
    address: 'Av. del Libertador 850, Vicente López',
    phone: '+54 11 4791 6600',
    email: 'vicentelopez@century21arg.example',
  },
  {
    id: 'office-tigre',
    name: 'CENTURY 21 Tigre',
    province: 'Buenos Aires',
    region: 'GBA Norte',
    address: 'Av. Italia 200, Tigre',
    phone: '+54 11 4749 3311',
    email: 'tigre@century21arg.example',
  },
  {
    id: 'office-cordoba-nueva',
    name: 'CENTURY 21 Nueva Córdoba',
    province: 'Córdoba',
    region: 'Centro',
    address: 'Obispo Trejo 180, Córdoba',
    phone: '+54 351 422 3090',
    email: 'cordoba@century21arg.example',
  },
  {
    id: 'office-rosario-pichincha',
    name: 'CENTURY 21 Rosario Pichincha',
    province: 'Santa Fe',
    region: 'Centro',
    address: 'Av. Pellegrini 2100, Rosario',
    phone: '+54 341 449 2020',
    email: 'rosario@century21arg.example',
  },
  {
    id: 'office-mendoza-ciudad',
    name: 'CENTURY 21 Mendoza',
    province: 'Mendoza',
    region: 'Centro',
    address: 'Av. San Martín 1250, Mendoza',
    phone: '+54 261 423 8888',
    email: 'mendoza@century21arg.example',
  },
  {
    id: 'office-mar-del-plata',
    name: 'CENTURY 21 Mar del Plata',
    province: 'Buenos Aires',
    region: 'Costa Atlántica',
    address: 'Av. Colón 3100, Mar del Plata',
    phone: '+54 223 491 5500',
    email: 'mdp@century21arg.example',
  },
  {
    id: 'office-bariloche',
    name: 'CENTURY 21 Bariloche',
    province: 'Río Negro',
    region: 'Sur',
    address: 'Mitre 320, San Carlos de Bariloche',
    phone: '+54 294 443 0099',
    email: 'bariloche@century21arg.example',
  },
  {
    id: 'office-salta-ciudad',
    name: 'CENTURY 21 Salta',
    province: 'Salta',
    region: 'Noroeste',
    address: 'Av. Belgrano 670, Salta',
    phone: '+54 387 431 2020',
    email: 'salta@century21arg.example',
  },
  {
    id: 'office-neuquen',
    name: 'CENTURY 21 Neuquén',
    province: 'Neuquén',
    region: 'Sur',
    address: 'Av. Argentina 200, Neuquén',
    phone: '+54 299 447 8080',
    email: 'neuquen@century21arg.example',
  },
] as const;

export function officeById(id: string): Office | undefined {
  return OFFICES.find((o) => o.id === id);
}
