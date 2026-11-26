/** Catálogo estático do Gestgo Studio (24 presets). IDs estáveis — nunca usar índice 0/1/2 na API. */

export type StudioMode = 'link' | 'site';

export type StudioSpecialtyKey =
  | 'solo'
  | 'clinic'
  | 'est'
  | 'odonto'
  | 'nutri'
  | 'ped'
  | 'multi'
  | 'fisio';

export type StudioHeroLayout =
  | 'split'
  | 'offset'
  | 'type'
  | 'framed'
  | 'collage'
  | 'centered'
  | 'gallery'
  | 'immersive'
  | 'kinetic';

export interface StudioTemplatePreset {
  id: string;
  name: string;
  tag: string;
  layout: StudioHeroLayout;
  canvas: string;
  ink: string;
  accent: string;
  font: string;
}

export interface StudioSpecialty {
  key: StudioSpecialtyKey;
  name: string;
  icon: string;
  legacyModel: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  /** Blocos ligados por padrão neste nicho (referência do protótipo). */
  defaultBlocks: string[];
  templates: StudioTemplatePreset[];
}

export const STUDIO_SPECIALTIES: StudioSpecialty[] = [
  {
    key: 'solo',
    name: 'Solo · Autônomo',
    icon: 'person',
    legacyModel: 1,
    defaultBlocks: ['services', 'bio', 'reviews', 'office', 'booking'],
    templates: [
      { id: 'solo.signature', name: 'Signature', tag: 'Marca pessoal', layout: 'split', canvas: '#f1ede6', ink: '#23372f', accent: '#7e998b', font: 'Instrument' },
      { id: 'solo.portrait', name: 'Portrait', tag: 'Retrato editorial', layout: 'offset', canvas: '#f5ede8', ink: '#342821', accent: '#b98a73', font: 'Cormorant' },
      { id: 'solo.direct', name: 'Direct', tag: 'Conversão direta', layout: 'type', canvas: '#eaf5ed', ink: '#163d33', accent: '#08875d', font: 'Jakarta' },
    ],
  },
  {
    key: 'clinic',
    name: 'Genérico · Clínica',
    icon: 'apartment',
    legacyModel: 2,
    defaultBlocks: ['services', 'team', 'office', 'reviews', 'booking'],
    templates: [
      { id: 'clinic.maison-sante', name: 'Maison Santé', tag: 'Clínica boutique', layout: 'framed', canvas: '#f5f1eb', ink: '#253631', accent: '#a68b6d', font: 'Cormorant' },
      { id: 'clinic.modern-medical', name: 'Modern Medical', tag: 'Institucional', layout: 'collage', canvas: '#edf4f5', ink: '#183844', accent: '#5c9fa5', font: 'Jakarta' },
      { id: 'clinic.the-clinic', name: 'The Clinic', tag: 'Minimal sofisticado', layout: 'centered', canvas: '#f8f9f6', ink: '#252f2c', accent: '#7f9188', font: 'Manrope' },
    ],
  },
  {
    key: 'est',
    name: 'Estética facial',
    icon: 'spa',
    legacyModel: 3,
    defaultBlocks: ['services', 'results', 'method', 'bio', 'office', 'reviews', 'booking'],
    templates: [
      { id: 'est.nude-atelier', name: 'Nude Atelier', tag: 'Luxo natural', layout: 'offset', canvas: '#f7efe7', ink: '#3a2b26', accent: '#b58c79', font: 'Cormorant' },
      { id: 'est.ritual-studio', name: 'Ritual Studio', tag: 'Editorial imersivo', layout: 'immersive', canvas: '#ece0d9', ink: '#2e2522', accent: '#9a695e', font: 'Instrument' },
      { id: 'est.dermalab', name: 'Dermalab', tag: 'Clínico moderno', layout: 'collage', canvas: '#edf5f1', ink: '#203a30', accent: '#669e82', font: 'Jakarta' },
    ],
  },
  {
    key: 'odonto',
    name: 'Odontologia',
    icon: 'dentistry',
    legacyModel: 4,
    defaultBlocks: ['results', 'services', 'team', 'office', 'reviews', 'booking'],
    templates: [
      { id: 'odonto.smile-gallery', name: 'Smile Gallery', tag: 'Sorriso editorial', layout: 'gallery', canvas: '#f6f1e9', ink: '#342c26', accent: '#b49b76', font: 'Instrument' },
      { id: 'odonto.precision', name: 'Precision', tag: 'Tecnologia', layout: 'kinetic', canvas: '#eaf2f5', ink: '#132d3b', accent: '#338bac', font: 'Outfit' },
      { id: 'odonto.pure-ivory', name: 'Pure Ivory', tag: 'Estética minimal', layout: 'centered', canvas: '#faf9f6', ink: '#2b3330', accent: '#94a49c', font: 'Manrope' },
    ],
  },
  {
    key: 'nutri',
    name: 'Nutrição',
    icon: 'nutrition',
    legacyModel: 5,
    defaultBlocks: ['method', 'services', 'bio', 'reviews', 'booking'],
    templates: [
      { id: 'nutri.raiz', name: 'Raiz', tag: 'Orgânico editorial', layout: 'collage', canvas: '#f3f0e5', ink: '#2d382b', accent: '#89986c', font: 'Cormorant' },
      { id: 'nutri.forma', name: 'Forma', tag: 'Performance', layout: 'type', canvas: '#eef5ef', ink: '#183a30', accent: '#239371', font: 'Outfit' },
      { id: 'nutri.sereno', name: 'Sereno', tag: 'Lifestyle humano', layout: 'offset', canvas: '#faf0e6', ink: '#493629', accent: '#c18d6e', font: 'Instrument' },
    ],
  },
  {
    key: 'ped',
    name: 'Pediatria',
    icon: 'child_care',
    legacyModel: 6,
    defaultBlocks: ['method', 'bio', 'services', 'office', 'reviews', 'booking'],
    templates: [
      { id: 'ped.afeto', name: 'Afeto', tag: 'Acolhedor', layout: 'collage', canvas: '#faf4ed', ink: '#3c443b', accent: '#b9ad88', font: 'Cormorant' },
      { id: 'ped.brincar', name: 'Brincar', tag: 'Leve e contemporâneo', layout: 'type', canvas: '#fcf2e7', ink: '#35424b', accent: '#dc9a69', font: 'Jakarta' },
      { id: 'ped.crescer', name: 'Crescer', tag: 'Segurança clínica', layout: 'framed', canvas: '#eef5f5', ink: '#2f4647', accent: '#74a7a7', font: 'Manrope' },
    ],
  },
  {
    key: 'multi',
    name: 'Multiprofissional',
    icon: 'groups',
    legacyModel: 7,
    defaultBlocks: ['team', 'services', 'method', 'office', 'reviews', 'booking'],
    templates: [
      { id: 'multi.nexo-collective', name: 'Nexo Collective', tag: 'Equipe em destaque', layout: 'gallery', canvas: '#edf4ef', ink: '#21382f', accent: '#599179', font: 'Jakarta' },
      { id: 'multi.essencia', name: 'Essência', tag: 'Institucional premium', layout: 'immersive', canvas: '#eeede9', ink: '#26362e', accent: '#889685', font: 'Cormorant' },
      { id: 'multi.atlas-health', name: 'Atlas Health', tag: 'Grid sofisticado', layout: 'centered', canvas: '#eef2f5', ink: '#283947', accent: '#839eac', font: 'Manrope' },
    ],
  },
  {
    key: 'fisio',
    name: 'Fisioterapia dermato',
    icon: 'accessibility_new',
    legacyModel: 8,
    defaultBlocks: ['services', 'method', 'results', 'bio', 'office', 'booking'],
    templates: [
      { id: 'fisio.contour', name: 'Contour', tag: 'Resultados e método', layout: 'split', canvas: '#f5eeeb', ink: '#332e2d', accent: '#b18c83', font: 'Instrument' },
      { id: 'fisio.motion-lab', name: 'Motion Lab', tag: 'Clínico dinâmico', layout: 'kinetic', canvas: '#eaf4f6', ink: '#183643', accent: '#389aac', font: 'Outfit' },
      { id: 'fisio.elan-wellness', name: 'Élan Wellness', tag: 'Bem-estar premium', layout: 'framed', canvas: '#eff5ef', ink: '#2b3d33', accent: '#80a48f', font: 'Cormorant' },
    ],
  },
];

export function findSpecialty(key: StudioSpecialtyKey): StudioSpecialty {
  return STUDIO_SPECIALTIES.find((s) => s.key === key) ?? STUDIO_SPECIALTIES[2];
}

export const STUDIO_BLOCK_LABELS: Record<string, string> = {
  services: 'Tratamentos / serviços',
  results: 'Meus resultados',
  method: 'Como funciona',
  bio: 'Minha trajetória',
  office: 'Conheça meu consultório',
  team: 'Nossa equipe',
  reviews: 'Avaliações',
  booking: 'Agende sua consulta',
};
