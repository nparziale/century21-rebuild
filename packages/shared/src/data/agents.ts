import type { Agent } from '../types.ts';

/**
 * Mockup agent profiles. Names, photos, bios are invented for this design
 * build — not real Century 21 Argentina agents. `showcase.html` states this.
 */
export const AGENTS: readonly Agent[] = [
  {
    id: 'agent-laura-mansilla',
    name: 'Laura Mansilla',
    title: 'Asesora inmobiliaria',
    officeId: 'office-ramos-mejia',
    phone: '+54 9 11 5234 7129',
    whatsapp: '5491152347129',
    email: 'laura.mansilla@century21arg.example',
    photoUnsplashId: '1494790108377-be9c29b29330',
    bio:
      'Trabaja el mercado del oeste del GBA hace nueve años, especializada en casas ' +
      'familiares sobre lote propio en Ramos Mejía, Haedo y San Justo.',
  },
  {
    id: 'agent-martin-salaberry',
    name: 'Martín Salaberry',
    title: 'Asesor inmobiliario',
    officeId: 'office-palermo-soho',
    phone: '+54 9 11 6012 4480',
    whatsapp: '5491160124480',
    email: 'martin.salaberry@century21arg.example',
    photoUnsplashId: '1507003211169-0a1dd7228f2d',
    bio:
      'Especialista en departamentos y PH en Palermo, Colegiales y Villa Crespo. ' +
      'Enfocado en primera vivienda y cartera de inversión.',
  },
  {
    id: 'agent-carolina-dominguez',
    name: 'Carolina Domínguez',
    title: 'Asesora senior',
    officeId: 'office-belgrano',
    phone: '+54 9 11 5698 3321',
    whatsapp: '5491156983321',
    email: 'carolina.dominguez@century21arg.example',
    photoUnsplashId: '1573497019940-1c28c88b4f3e',
    bio:
      'Veinte años en el mercado porteño. Referente en Belgrano R y Núñez, con ' +
      'foco en operaciones de patrimonio y sucesiones.',
  },
  {
    id: 'agent-federico-rojas',
    name: 'Federico Rojas',
    title: 'Asesor inmobiliario',
    officeId: 'office-vicente-lopez',
    phone: '+54 9 11 4482 1103',
    whatsapp: '5491144821103',
    email: 'federico.rojas@century21arg.example',
    photoUnsplashId: '1500648767791-00dcc994a43e',
    bio:
      'Trabaja zona norte del conurbano: Vicente López, Olivos y Martínez. ' +
      'Casas familiares, duplex y terrenos.',
  },
  {
    id: 'agent-matias-dalessandro',
    name: 'Matías D’Alessandro',
    title: 'Broker asociado',
    officeId: 'office-belgrano',
    phone: '+54 9 11 3076 5544',
    whatsapp: '5491130765544',
    email: 'matias.dalessandro@century21arg.example',
    photoUnsplashId: '1506794778202-cad84cf45f1d',
    bio:
      'Se dedica al análisis de oportunidades de inversión: unidades a reciclar, ' +
      'PH con potencial de subdivisión y terrenos.',
  },
  {
    id: 'agent-ines-pagola',
    name: 'Inés Pagola',
    title: 'Asesora inmobiliaria',
    officeId: 'office-cordoba-nueva',
    phone: '+54 9 351 644 2908',
    whatsapp: '5493516442908',
    email: 'ines.pagola@century21arg.example',
    photoUnsplashId: '1544005313-94ddf0286df2',
    bio:
      'Zona Nueva Córdoba, Observatorio y Güemes. Departamentos, oficinas y ' +
      'cocheras en el microcentro cordobés.',
  },
] as const;

export function agentById(id: string): Agent | undefined {
  return AGENTS.find((a) => a.id === id);
}
