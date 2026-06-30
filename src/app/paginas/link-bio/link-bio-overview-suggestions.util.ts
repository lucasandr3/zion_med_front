import {
  LinkBioClinic,
  LinkBioExtra,
  LinkBioFormLink,
  LinkBioLayoutModel,
  LinkBioLink,
  LinkBioMetrics,
} from '../../core/services/link-bio.service';
import { parseLinkBioExtra } from '../../core/utils/link-bio-clinic-normalize.util';
import { hasGoogleReviewLink } from './link-bio-google-review-link.util';

export type LinkBioSuggestionAba = 'links' | 'forms' | 'aparencia' | 'modelos' | 'conteudoExtra';

export interface LinkBioOverviewSuggestion {
  id: string;
  icon: string;
  tone: 'green' | 'blue' | 'purple' | 'orange';
  title: string;
  subtitle: string;
  aba?: LinkBioSuggestionAba;
  /** Rota interna quando a ação não está na aba Conteúdo (ex.: telefone em Configurações). */
  rota?: string;
  priority: number;
}

export interface LinkBioPageAuditInput {
  clinic: LinkBioClinic;
  links: LinkBioLink[];
  forms: LinkBioFormLink[];
  layoutModel: LinkBioLayoutModel;
  metrics?: LinkBioMetrics;
  ctrMediaSetor?: number;
}

function extraOf(clinic: LinkBioClinic): LinkBioExtra {
  return parseLinkBioExtra(clinic.link_bio_extra);
}

function hasPhone(clinic: LinkBioClinic): boolean {
  const digits = clinic.phone?.replace(/\D/g, '') ?? '';
  return digits.length >= 10;
}

function hasWhatsappLink(links: LinkBioLink[]): boolean {
  return links.some((link) => /whatsapp|wa\.me|api\.whatsapp/i.test(`${link.label} ${link.url}`));
}

function hasAgendamento(links: LinkBioLink[]): boolean {
  return links.some((link) => /agend|calendar|consult|marca|doctoralia|calendly|feegow/i.test(`${link.label} ${link.url}`));
}

function hasInstagram(clinic: LinkBioClinic, links: LinkBioLink[]): boolean {
  const extra = extraOf(clinic);
  if (extra.instagram_url?.trim()) return true;
  return links.some((link) => /instagram|instagr\.am/i.test(`${link.label} ${link.url}`));
}

function hasGoogleMaps(clinic: LinkBioClinic): boolean {
  return !!clinic.maps_url?.trim();
}

function hasGoogleReviewsLink(links: LinkBioLink[]): boolean {
  return hasGoogleReviewLink(links);
}

function hasCoverOrPhoto(clinic: LinkBioClinic): boolean {
  if (clinic.professional_photo_url?.trim()) return true;
  if (clinic.cover_image_url?.trim() && clinic.cover_mode === 'banner') return true;
  if (clinic.logo_url?.trim() || clinic.company_logo_url?.trim()) return true;
  return false;
}

function hasHeroText(clinic: LinkBioClinic): boolean {
  const extra = extraOf(clinic);
  return !!(clinic.short_description?.trim() || extra.hero_tagline?.trim());
}

function hasSpecialties(clinic: LinkBioClinic): boolean {
  if (clinic.specialties?.trim()) return true;
  return (clinic.specialties_list?.filter(Boolean).length ?? 0) > 0;
}

function hasContactEmail(clinic: LinkBioClinic): boolean {
  return !!clinic.contact_email?.trim();
}

function layoutUsesConteudoExtra(model: LinkBioLayoutModel): boolean {
  return model !== 1;
}

/** Sugestões ordenadas por prioridade — só o que a página ainda não oferece. */
export function buildLinkBioOverviewSuggestions(input: LinkBioPageAuditInput): LinkBioOverviewSuggestion[] {
  const { clinic, links, forms, layoutModel, metrics } = input;
  const ctrMedia = input.ctrMediaSetor ?? 5;
  const extra = extraOf(clinic);
  const suggestions: LinkBioOverviewSuggestion[] = [];

  if (!hasPhone(clinic) && !hasWhatsappLink(links)) {
    suggestions.push({
      id: 'whatsapp',
      icon: 'chat',
      tone: 'green',
      title: 'Ativar botão de WhatsApp',
      subtitle: 'Cadastre o telefone em Configurações da empresa — ou adicione um link wa.me na aba Links',
      rota: '/clinica/configuracoes',
      priority: 100,
    });
  }

  if ((metrics?.formularios_ativos ?? forms.length) === 0) {
    suggestions.push({
      id: 'formularios',
      icon: 'assignment',
      tone: 'green',
      title: 'Publicar formulário com link',
      subtitle: 'Pacientes podem preencher fichas antes da consulta pelo link público',
      aba: 'forms',
      priority: 95,
    });
  }

  if (!hasGoogleMaps(clinic)) {
    suggestions.push({
      id: 'maps',
      icon: 'location_on',
      tone: 'purple',
      title: 'Adicionar link do Google Maps',
      subtitle: 'Facilita que pacientes encontrem sua clínica',
      aba: 'aparencia',
      priority: 90,
    });
  }

  if (!hasHeroText(clinic)) {
    suggestions.push({
      id: 'descricao',
      icon: 'edit_note',
      tone: 'blue',
      title: 'Adicionar descrição ou slogan',
      subtitle: 'Uma frase curta ajuda visitantes a entender seu serviço em segundos',
      aba: layoutUsesConteudoExtra(layoutModel) ? 'conteudoExtra' : 'aparencia',
      priority: 85,
    });
  }

  if (!hasCoverOrPhoto(clinic)) {
    suggestions.push({
      id: 'foto',
      icon: 'add_a_photo',
      tone: 'blue',
      title: 'Adicionar foto ou banner',
      subtitle: 'Páginas com imagem transmitem mais confiança e engajamento',
      aba: layoutUsesConteudoExtra(layoutModel) ? 'conteudoExtra' : 'aparencia',
      priority: 80,
    });
  }

  if (links.length === 0) {
    suggestions.push({
      id: 'links',
      icon: 'link',
      tone: 'blue',
      title: 'Cadastrar links úteis',
      subtitle: 'Instagram, site, agendamento e outros atalhos aparecem na página pública',
      aba: 'links',
      priority: 75,
    });
  }

  if (!hasAgendamento(links)) {
    suggestions.push({
      id: 'agendamento',
      icon: 'event_available',
      tone: 'green',
      title: 'Adicionar agendamento online',
      subtitle: 'Botões de agendamento aumentam a conversão de visitantes em contatos',
      aba: 'links',
      priority: 70,
    });
  }

  if (!hasInstagram(clinic, links)) {
    suggestions.push({
      id: 'instagram',
      icon: 'photo_camera',
      tone: 'purple',
      title: 'Conectar Instagram',
      subtitle: 'Layouts temáticos exibem o Instagram quando o link está configurado',
      aba: 'conteudoExtra',
      priority: 65,
    });
  }

  if (!hasSpecialties(clinic) && layoutModel !== 1) {
    suggestions.push({
      id: 'especialidades',
      icon: 'medical_services',
      tone: 'blue',
      title: 'Informar especialidades',
      subtitle: 'Visitantes entendem melhor o que sua clínica oferece',
      aba: 'aparencia',
      priority: 60,
    });
  }

  if (!hasContactEmail(clinic)) {
    suggestions.push({
      id: 'email',
      icon: 'mail',
      tone: 'blue',
      title: 'Adicionar e-mail de contato público',
      subtitle: 'Alguns layouts exibem botão de e-mail na página',
      aba: 'aparencia',
      priority: 55,
    });
  }

  if (layoutModel === 5 && (extra.team?.filter((m) => m.name?.trim()).length ?? 0) === 0) {
    suggestions.push({
      id: 'equipe',
      icon: 'groups',
      tone: 'purple',
      title: 'Cadastrar equipe',
      subtitle: 'O layout multi profissionais destaca cada membro da equipe',
      aba: 'conteudoExtra',
      priority: 50,
    });
  }

  if (layoutModel === 4 && (extra.convenios?.filter(Boolean).length ?? 0) === 0) {
    suggestions.push({
      id: 'convenios',
      icon: 'health_and_safety',
      tone: 'purple',
      title: 'Listar convênios aceitos',
      subtitle: 'O layout odontologia exibe convênios na página pública',
      aba: 'conteudoExtra',
      priority: 48,
    });
  }

  if (layoutModel === 2 && (extra.modalities?.length ?? 0) === 0) {
    suggestions.push({
      id: 'modalidades',
      icon: 'home_work',
      tone: 'purple',
      title: 'Definir modalidades de atendimento',
      subtitle: 'Informe se atende online, presencial ou ambos',
      aba: 'conteudoExtra',
      priority: 46,
    });
  }

  if (hasGoogleMaps(clinic) && !hasGoogleReviewsLink(links)) {
    suggestions.push({
      id: 'google-reviews-link',
      icon: 'star',
      tone: 'purple',
      title: 'Adicionar botão Avalie no Google',
      subtitle: 'Na aba Links, use o atalho pré-configurado — leva o paciente a avaliar no Google',
      aba: 'links',
      priority: 40,
    });
  }

  if ((metrics?.taxa_clique ?? 0) < ctrMedia && (metrics?.total_views ?? 0) > 0) {
    const alreadyHasAgendamentoSuggestion = suggestions.some((s) => s.id === 'agendamento');
    if (!alreadyHasAgendamentoSuggestion && !hasAgendamento(links)) {
      suggestions.push({
        id: 'ctr-agendamento',
        icon: 'trending_up',
        tone: 'orange',
        title: 'Melhorar conversão (CTR baixo)',
        subtitle: 'Com poucos cliques em relação às visitas, priorize WhatsApp e agendamento em destaque',
        aba: 'links',
        priority: 35,
      });
    }
  }

  return suggestions.sort((a, b) => b.priority - a.priority).slice(0, 5);
}

/** Resumo do que a página já oferece (para debug/UI futura). */
export function summarizeLinkBioPageOffer(input: LinkBioPageAuditInput): string[] {
  const { clinic, links, forms } = input;
  const offered: string[] = [];
  if (hasPhone(clinic) || hasWhatsappLink(links)) offered.push('WhatsApp');
  if (hasGoogleMaps(clinic)) offered.push('Google Maps');
  if (forms.length > 0) offered.push('Formulários públicos');
  if (links.length > 0) offered.push(`${links.length} link(s) personalizado(s)`);
  if (hasCoverOrPhoto(clinic)) offered.push('Imagem ou banner');
  if (hasHeroText(clinic)) offered.push('Descrição/slogan');
  if (hasInstagram(clinic, links)) offered.push('Instagram');
  if (hasGoogleReviewsLink(links)) offered.push('Botão Avalie no Google');
  return offered;
}
