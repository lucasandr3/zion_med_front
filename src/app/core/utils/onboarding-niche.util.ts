/** Chaves do wizard (UI) → niche da organization (API). */
const SEGMENT_TO_NICHE: Record<string, string> = {
  'estetica-facial': 'estetica',
  'fisioterapia-dermatofuncional': 'fisioterapia',
  podologia: 'geral',
  odontologia: 'odontologia',
  outro: 'geral',
};

/** Niche da org → chave do wizard (melhor esforço). */
const NICHE_TO_SEGMENT: Record<string, string> = {
  estetica: 'estetica-facial',
  fisioterapia: 'fisioterapia-dermatofuncional',
  odontologia: 'odontologia',
  geral: 'outro',
  clinica_medica: 'outro',
  psicologia: 'outro',
  pediatria: 'outro',
  ginecologia: 'outro',
  oftalmologia: 'outro',
  dermatologia: 'outro',
  laboratorio: 'outro',
  veterinaria: 'outro',
};

export function segmentKeyToNiche(segmentKey: string): string {
  return SEGMENT_TO_NICHE[segmentKey] ?? 'geral';
}

export function nicheToSegmentKey(niche: string | null | undefined): string | null {
  if (!niche) return null;
  const key = niche.trim().toLowerCase();
  if (!key) return null;
  if (NICHE_TO_SEGMENT[key]) return NICHE_TO_SEGMENT[key];
  if (SEGMENT_TO_NICHE[key]) return key;
  return 'outro';
}
