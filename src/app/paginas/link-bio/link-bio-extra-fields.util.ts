import { LinkBioLayoutModel } from '../../core/services/link-bio.service';

/** Blocos editáveis na aba Conteúdo extra. */
export type LinkBioExtraSection =
  | 'foto'
  | 'hero_tagline'
  | 'council'
  | 'brand_subtitle'
  | 'instagram'
  | 'ped_texts'
  | 'ped_steps'
  | 'ped_age_bands'
  | 'convenios'
  | 'modalidades'
  | 'equipe';

/** Catálogo 2026-10: 1 Solo … 8 Fisioterapia (sem veterinária). */
const SECTIONS_BY_MODEL: Record<LinkBioLayoutModel, readonly LinkBioExtraSection[]> = {
  1: ['foto', 'hero_tagline', 'council', 'brand_subtitle'],
  2: ['foto', 'hero_tagline', 'brand_subtitle'],
  3: ['foto', 'hero_tagline', 'council', 'instagram', 'modalidades'],
  4: ['foto', 'hero_tagline', 'council', 'instagram', 'convenios', 'modalidades'],
  5: ['foto', 'hero_tagline', 'council', 'convenios', 'modalidades'],
  6: ['foto', 'hero_tagline', 'council', 'ped_texts', 'ped_steps', 'ped_age_bands', 'convenios'],
  7: ['foto', 'hero_tagline', 'equipe'],
  8: ['foto', 'hero_tagline', 'council', 'modalidades'],
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
    1: 'Solo · Profissional autônomo (1)',
    2: 'Genérico · Clínica (2)',
    3: 'Estética facial (3)',
    4: 'Odontologia (4)',
    5: 'Nutrição (5)',
    6: 'Pediatria (6)',
    7: 'Multiprofissional (7)',
    8: 'Fisioterapia dermatofuncional (8)',
  };
  return labels[model] ?? `Modelo ${model}`;
}
