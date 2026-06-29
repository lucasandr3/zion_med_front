import { LinkBioLayoutModel } from '../../core/services/link-bio.service';

export const LINK_BIO_PREVIEW_MODEL_IDS: readonly LinkBioLayoutModel[] = [1, 2, 3, 4, 5, 6, 7, 8];

export const LINK_BIO_MODEL_LABELS: Record<LinkBioLayoutModel, string> = {
  1: 'Genérico atual',
  2: 'Profissional solo',
  3: 'Estética e beleza',
  4: 'Odontologia',
  5: 'Multi profissionais',
  6: 'Clínica veterinária',
  7: 'Pediatria',
  8: 'Nutricionista',
};

export const LINK_BIO_MODEL_SUBTITLES: Record<LinkBioLayoutModel, string> = {
  1: 'Layout multipropósito',
  2: 'Perfil + contato direto',
  3: 'Agendamento + portfólio',
  4: 'Convênios + serviços',
  5: 'Equipe em destaque',
  6: 'Pets + agendamento',
  7: 'Agenda + info para pais',
  8: 'Planos + consulta online',
};

export function linkBioModelLabel(model: LinkBioLayoutModel): string {
  return LINK_BIO_MODEL_LABELS[model] ?? '—';
}
