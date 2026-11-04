import { LinkBioLayoutModel } from '../../core/services/link-bio.service';

export type LinkBioPresetTheme =
  | 'theme-solo'
  | 'theme-generico'
  | 'theme-estetica'
  | 'theme-odontologia'
  | 'theme-nutricao'
  | 'theme-pediatria'
  | 'theme-multiprofissional'
  | 'theme-fisioterapia';

export interface LinkBioPresetMeta {
  theme: LinkBioPresetTheme;
  brand: string;
  brandDark: string;
  brandSoft: string;
  eyebrow: string;
  defaultHeadline: string;
  defaultDescription: string;
  artCopy: string;
  artIcon: string;
  pills: string[];
  primaryCta: string;
  servicesTitle: string;
  docsTitle: string;
  docsSub: string;
  showSteps: boolean;
  showAgeTabs: boolean;
  showSpecialtyFilter: boolean;
}

/** Catálogo 2026-10: 1 Solo … 8 Fisioterapia dermatofuncional. */
export const LINK_BIO_PRESET_META: Record<LinkBioLayoutModel, LinkBioPresetMeta> = {
  1: {
    theme: 'theme-solo',
    brand: '#206D58',
    brandDark: '#174B3E',
    brandSoft: '#EAF6EF',
    eyebrow: 'BEM-VINDO(A)',
    defaultHeadline: 'Cuidar de você começa com uma boa conversa.',
    defaultDescription: 'Atendimento individual, acolhedor e organizado em cada etapa do seu cuidado.',
    artCopy: 'Cuidar com presença. Atender com propósito.',
    artIcon: 'heart',
    pills: ['Atendimento individual', 'Acolhimento e escuta', 'Documentos digitais'],
    primaryCta: 'Agendar uma consulta',
    servicesTitle: 'Como posso ajudar você?',
    docsTitle: 'Antes de nos encontrarmos',
    docsSub: 'Preencha apenas os documentos orientados pelo profissional ou pela equipe.',
    showSteps: false,
    showAgeTabs: false,
    showSpecialtyFilter: false,
  },
  2: {
    theme: 'theme-generico',
    brand: '#24334A',
    brandDark: '#192337',
    brandSoft: '#EEF2F7',
    eyebrow: 'SUA CLÍNICA',
    defaultHeadline: 'Seu cuidado, com mais simplicidade.',
    defaultDescription: 'Uma página para contato, localização e documentos — com a identidade da sua clínica.',
    artCopy: 'Organizado para o paciente. Prático para a clínica.',
    artIcon: 'spark',
    pills: ['Contato rápido', 'Documentos públicos', 'Identidade da clínica'],
    primaryCta: 'Agendar atendimento',
    servicesTitle: 'Atendimentos',
    docsTitle: 'Documentos disponíveis',
    docsSub: 'Acesse fichas e formulários publicados pela clínica.',
    showSteps: false,
    showAgeTabs: false,
    showSpecialtyFilter: false,
  },
  3: {
    theme: 'theme-estetica',
    brand: '#806044',
    brandDark: '#302720',
    brandSoft: '#F5EEE5',
    eyebrow: 'ESTÉTICA FACIAL',
    defaultHeadline: 'Sua beleza, no seu próprio tempo.',
    defaultDescription: 'Procedimentos, anamneses e consentimentos digitais em um só lugar.',
    artCopy: 'Cuidado estético com organização e clareza.',
    artIcon: 'spark',
    pills: ['Anamnese digital', 'Consentimentos', 'Agenda pelo WhatsApp'],
    primaryCta: 'Quero agendar',
    servicesTitle: 'Procedimentos',
    docsTitle: 'Antes do procedimento',
    docsSub: 'Preencha os documentos indicados pela clínica antes do atendimento.',
    showSteps: false,
    showAgeTabs: false,
    showSpecialtyFilter: false,
  },
  4: {
    theme: 'theme-odontologia',
    brand: '#1764A8',
    brandDark: '#10365F',
    brandSoft: '#EAF5FF',
    eyebrow: 'ODONTOLOGIA',
    defaultHeadline: 'Um sorriso tranquilo começa aqui.',
    defaultDescription: 'Cuidados odontológicos com fichas digitais e contato direto com a equipe.',
    artCopy: 'Do primeiro contato ao acompanhamento.',
    artIcon: 'tooth',
    pills: ['Avaliação', 'Documentos digitais', 'Equipe de confiança'],
    primaryCta: 'Agendar consulta',
    servicesTitle: 'Especialidades e cuidados',
    docsTitle: 'Fichas e termos',
    docsSub: 'Documentos para preparar sua consulta com tranquilidade.',
    showSteps: false,
    showAgeTabs: false,
    showSpecialtyFilter: false,
  },
  5: {
    theme: 'theme-nutricao',
    brand: '#3E6345',
    brandDark: '#233E2B',
    brandSoft: '#EAF2E5',
    eyebrow: 'NUTRIÇÃO',
    defaultHeadline: 'Comer bem é encontrar o seu equilíbrio.',
    defaultDescription: 'Acompanhamento nutricional com documentos organizados e contato simples.',
    artCopy: 'Alimentação com propósito e acompanhamento.',
    artIcon: 'leaf',
    pills: ['Consulta nutricional', 'Planos personalizados', 'Fichas digitais'],
    primaryCta: 'Agendar consulta',
    servicesTitle: 'Como posso ajudar',
    docsTitle: 'Antes da consulta',
    docsSub: 'Preencha os formulários indicados para aproveitar melhor o atendimento.',
    showSteps: false,
    showAgeTabs: false,
    showSpecialtyFilter: false,
  },
  6: {
    theme: 'theme-pediatria',
    brand: '#286D8A',
    brandDark: '#194A68',
    brandSoft: '#EAF6FA',
    eyebrow: 'PEDIATRIA',
    defaultHeadline: 'Cuidado grande para gente pequena.',
    defaultDescription: 'Informações úteis para famílias, com documentos digitais e contato direto.',
    artCopy: 'Acolhimento para a família toda.',
    artIcon: 'heart',
    pills: ['Puericultura', 'Orientação aos pais', 'Documentos digitais'],
    primaryCta: 'Agendar consulta',
    servicesTitle: 'Atendimentos',
    docsTitle: 'Documentos para a família',
    docsSub: 'Formulários publicados pela clínica para preparar a consulta.',
    showSteps: true,
    showAgeTabs: true,
    showSpecialtyFilter: false,
  },
  7: {
    theme: 'theme-multiprofissional',
    brand: '#6250AA',
    brandDark: '#34285E',
    brandSoft: '#F1EEFF',
    eyebrow: 'CLÍNICA MULTIPROFISSIONAL',
    defaultHeadline: 'Diferentes especialidades. Um mesmo cuidado.',
    defaultDescription: 'Encontre a especialidade, os documentos e o contato da equipe em uma página.',
    artCopy: 'Várias especialidades, uma jornada.',
    artIcon: 'users',
    pills: ['Equipe multidisciplinar', 'Documentos por área', 'Contato direto'],
    primaryCta: 'Agendar atendimento',
    servicesTitle: 'Especialidades',
    docsTitle: 'Documentos da clínica',
    docsSub: 'Formulários públicos disponíveis conforme a área de atendimento.',
    showSteps: false,
    showAgeTabs: false,
    showSpecialtyFilter: true,
  },
  8: {
    theme: 'theme-fisioterapia',
    brand: '#3E736C',
    brandDark: '#194A47',
    brandSoft: '#E8F4EF',
    eyebrow: 'SAÚDE DA PELE EM CADA DETALHE',
    defaultHeadline: 'Ciência e cuidado para a saúde da sua pele.',
    defaultDescription: 'Avaliação individualizada e acompanhamento para necessidades estéticas e funcionais.',
    artCopy: 'Um atendimento que entende a sua história.',
    artIcon: 'stethoscope',
    pills: ['Avaliação individual', 'Fisioterapia dermato', 'Acompanhamento organizado'],
    primaryCta: 'Agendar minha avaliação',
    servicesTitle: 'Atendimentos',
    docsTitle: 'Antes da avaliação',
    docsSub: 'Preencha apenas os documentos orientados pelo profissional ou pela equipe.',
    showSteps: true,
    showAgeTabs: false,
    showSpecialtyFilter: false,
  },
};

export function linkBioPresetMeta(model: LinkBioLayoutModel): LinkBioPresetMeta {
  return LINK_BIO_PRESET_META[model] ?? LINK_BIO_PRESET_META[2];
}

export function initialsFromName(name: string | null | undefined): string {
  const parts = (name ?? '')
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (!parts.length) return 'GG';
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return `${parts[0]![0] ?? ''}${parts[parts.length - 1]![0] ?? ''}`.toUpperCase();
}
