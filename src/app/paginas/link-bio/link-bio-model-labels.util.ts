import { LinkBioLayoutModel } from '../../core/services/link-bio.service';

export const LINK_BIO_PREVIEW_MODEL_IDS: readonly LinkBioLayoutModel[] = [1, 2, 3, 4, 5, 6, 7, 8];

/** Catálogo Gestgo 2026-10 (alinhado a Gestgo_LinkBio_Docs). */
export const LINK_BIO_MODEL_LABELS: Record<LinkBioLayoutModel, string> = {
  1: 'Solo · Profissional autônomo',
  2: 'Genérico · Clínica',
  3: 'Estética facial',
  4: 'Odontologia',
  5: 'Nutrição',
  6: 'Pediatria',
  7: 'Multiprofissional',
  8: 'Fisioterapia dermatofuncional',
};

export const LINK_BIO_MODEL_SUBTITLES: Record<LinkBioLayoutModel, string> = {
  1: 'Perfil + contato direto',
  2: 'Layout multipropósito',
  3: 'Procedimentos + documentos',
  4: 'Convênios + serviços',
  5: 'Consulta + planos',
  6: 'Família + faixas etárias',
  7: 'Equipe em destaque',
  8: 'Avaliação + anamnese dermato',
};

export function linkBioModelLabel(model: LinkBioLayoutModel): string {
  return LINK_BIO_MODEL_LABELS[model] ?? '—';
}
