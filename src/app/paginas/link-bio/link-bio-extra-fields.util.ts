import { LinkBioLayoutModel } from '../../core/services/link-bio.service';

/** Blocos editáveis na aba Conteúdo extra. */
export type LinkBioExtraSection =
  | 'foto'
  | 'hero_tagline'
  | 'council'
  | 'brand_subtitle'
  | 'instagram'
  | 'vet_exam'
  | 'vet_cover'
  | 'vet_species'
  | 'vet_services'
  | 'ped_texts'
  | 'ped_steps'
  | 'ped_age_bands'
  | 'convenios'
  | 'modalidades'
  | 'equipe';

const SECTIONS_BY_MODEL: Record<LinkBioLayoutModel, readonly LinkBioExtraSection[]> = {
  1: [],
  2: ['foto', 'hero_tagline', 'council', 'brand_subtitle'],
  3: ['foto', 'hero_tagline', 'council', 'instagram'],
  4: ['foto', 'hero_tagline', 'council', 'instagram', 'convenios', 'modalidades'],
  5: ['foto', 'hero_tagline', 'equipe'],
  6: ['foto', 'hero_tagline', 'council', 'vet_exam', 'vet_cover', 'vet_species', 'vet_services'],
  7: ['foto', 'hero_tagline', 'council', 'ped_texts', 'ped_steps', 'ped_age_bands', 'convenios'],
  8: ['foto', 'hero_tagline', 'council', 'convenios', 'modalidades'],
};

export function linkBioExtraSectionsForModel(model: LinkBioLayoutModel): ReadonlySet<LinkBioExtraSection> {
  return new Set(SECTIONS_BY_MODEL[model] ?? []);
}

export function linkBioExtraSectionVisible(model: LinkBioLayoutModel, section: LinkBioExtraSection): boolean {
  return linkBioExtraSectionsForModel(model).has(section);
}

export function linkBioExtraHasAnySection(model: LinkBioLayoutModel): boolean {
  return (SECTIONS_BY_MODEL[model]?.length ?? 0) > 0;
}

/** Rótulo curto do layout para textos de ajuda. */
export function linkBioExtraModelLabel(model: LinkBioLayoutModel): string {
  const labels: Record<LinkBioLayoutModel, string> = {
    1: 'Genérico atual',
    2: 'Profissional solo (2)',
    3: 'Estética e beleza (3)',
    4: 'Odontologia (4)',
    5: 'Multi profissionais (5)',
    6: 'Clínica veterinária (6)',
    7: 'Pediatria (7)',
    8: 'Nutricionista (8)',
  };
  return labels[model] ?? `Modelo ${model}`;
}
