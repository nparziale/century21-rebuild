import type { Country, Region } from './types.ts';

/**
 * 28 provinces/regions grouped as the live century21.com.ar footer groups them.
 */
export const REGIONS: readonly Region[] = [
  // Buenos Aires (6)
  { key: 'caba', label: 'Capital Federal', group: 'Buenos Aires' },
  { key: 'bsas-prov', label: 'Buenos Aires (provincia)', group: 'Buenos Aires' },
  { key: 'bsas-costa', label: 'Buenos Aires Costa Atlántica', group: 'Buenos Aires' },
  { key: 'gba-norte', label: 'GBA Norte', group: 'Buenos Aires' },
  { key: 'gba-oeste', label: 'GBA Oeste', group: 'Buenos Aires' },
  { key: 'gba-sur', label: 'GBA Sur', group: 'Buenos Aires' },
  // Noroeste (5)
  { key: 'catamarca', label: 'Catamarca', group: 'Noroeste' },
  { key: 'jujuy', label: 'Jujuy', group: 'Noroeste' },
  { key: 'la-rioja', label: 'La Rioja', group: 'Noroeste' },
  { key: 'salta', label: 'Salta', group: 'Noroeste' },
  { key: 'tucuman', label: 'Tucumán', group: 'Noroeste' },
  // Noreste (4)
  { key: 'chaco', label: 'Chaco', group: 'Noreste' },
  { key: 'corrientes', label: 'Corrientes', group: 'Noreste' },
  { key: 'formosa', label: 'Formosa', group: 'Noreste' },
  { key: 'misiones', label: 'Misiones', group: 'Noreste' },
  // Centro (7)
  { key: 'cordoba', label: 'Córdoba', group: 'Centro' },
  { key: 'entre-rios', label: 'Entre Ríos', group: 'Centro' },
  { key: 'la-pampa', label: 'La Pampa', group: 'Centro' },
  { key: 'san-juan', label: 'San Juan', group: 'Centro' },
  { key: 'san-luis', label: 'San Luis', group: 'Centro' },
  { key: 'santa-fe', label: 'Santa Fe', group: 'Centro' },
  { key: 'santiago', label: 'Santiago del Estero', group: 'Centro' },
  // Sur (5)
  { key: 'chubut', label: 'Chubut', group: 'Sur' },
  { key: 'neuquen', label: 'Neuquén', group: 'Sur' },
  { key: 'rio-negro', label: 'Río Negro', group: 'Sur' },
  { key: 'santa-cruz', label: 'Santa Cruz', group: 'Sur' },
  { key: 'tierra-del-fuego', label: 'Tierra del Fuego', group: 'Sur' },
] as const;

export const REGION_GROUPS = ['Buenos Aires', 'Noroeste', 'Noreste', 'Centro', 'Sur'] as const;

export function regionsByGroup(group: Region['group']): readonly Region[] {
  return REGIONS.filter((r) => r.group === group);
}

/**
 * 11 Latin American franchise countries shown in the footer International column,
 * plus the Commercial division.
 */
export const INTERNATIONAL_COUNTRIES: readonly Country[] = [
  { code: 'BO', name: 'Bolivia' },
  { code: 'BR', name: 'Brasil' },
  { code: 'CL', name: 'Chile' },
  { code: 'CO', name: 'Colombia' },
  { code: 'EC', name: 'Ecuador' },
  { code: 'GY', name: 'Guyana' },
  { code: 'MX', name: 'México' },
  { code: 'PY', name: 'Paraguay' },
  { code: 'PE', name: 'Perú' },
  { code: 'UY', name: 'Uruguay' },
  { code: 'VE', name: 'Venezuela' },
] as const;
