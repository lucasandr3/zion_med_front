import type { AssistantTour } from '../models/assistant.types';

/**
 * Tours guiados. Os seletores usam `data-go-tour`.
 * Telas sem hotspots ainda podem iniciar o tour com passos informativos (sem highlight).
 */
export const ASSISTANT_TOURS: AssistantTour[] = [
  {
    id: 'tour.dashboard',
    screenId: 'dashboard',
    steps: [
      {
        id: 'dash-1',
        selector: '[data-go-tour="dashboard-metrics"]',
        title: 'Resumo operacional',
        body: 'Aqui você acompanha métricas e o andamento dos protocolos da empresa.',
      },
      {
        id: 'dash-2',
        selector: '[data-go-tour="dashboard-onboarding"]',
        title: 'Onboarding',
        body: 'No primeiro acesso, o assistente de onboarding ajuda a gerar o primeiro formulário público.',
      },
      {
        id: 'dash-3',
        selector: '[data-go-tour="dashboard-shortcuts"]',
        title: 'Atalhos',
        body: 'Use os atalhos para ir rápido a Modelos, Protocolos e Pessoas.',
      },
    ],
  },
  {
    id: 'tour.templates.list',
    screenId: 'templates.list',
    steps: [
      {
        id: 'tpl-1',
        selector: '[data-go-tour="templates-new"]',
        title: 'Criar modelo',
        body: 'Comece por aqui para criar um modelo a partir da biblioteca ou em branco.',
      },
      {
        id: 'tpl-2',
        selector: '[data-go-tour="templates-list"]',
        title: 'Lista de modelos',
        body: 'Cada modelo pode ser editado, ter campos configurados e link público ativado.',
      },
      {
        id: 'tpl-3',
        selector: '[data-go-tour="templates-search"]',
        title: 'Busca e filtros',
        body: 'Filtre por categoria ou nome para encontrar fichas rapidamente.',
      },
    ],
  },
  {
    id: 'tour.links-publicos',
    screenId: 'links-publicos',
    steps: [
      {
        id: 'lp-1',
        selector: '[data-go-tour="links-publicos-list"]',
        title: 'Links ativos',
        body: 'Aqui ficam os formulários públicos ativos para copiar URL ou QR Code.',
      },
    ],
  },
  {
    id: 'tour.envios',
    screenId: 'envios',
    steps: [
      {
        id: 'env-1',
        selector: '[data-go-tour="envios-new"]',
        title: 'Novo envio',
        body: 'Dispare fichas por e-mail ou WhatsApp para uma pessoa específica.',
      },
      {
        id: 'env-2',
        selector: '[data-go-tour="envios-list"]',
        title: 'Acompanhamento',
        body: 'Reenvie ou cancele envios conforme o status.',
      },
    ],
  },
  {
    id: 'tour.protocolos.list',
    screenId: 'protocolos.list',
    steps: [
      {
        id: 'prot-1',
        selector: '[data-go-tour="protocolos-filters"]',
        title: 'Filtros',
        body: 'Filtre por status, período ou pessoa para achar submissões.',
      },
      {
        id: 'prot-2',
        selector: '[data-go-tour="protocolos-list"]',
        title: 'Inbox de protocolos',
        body: 'Abra um item para revisar, aprovar, baixar PDF ou dossiê.',
      },
    ],
  },
  {
    id: 'tour.protocolos.detail',
    screenId: 'protocolos.detail',
    steps: [
      {
        id: 'protd-1',
        selector: '[data-go-tour="protocolo-actions"]',
        title: 'Ações do protocolo',
        body: 'Aprove/rejeite, baixe PDF/dossiê e registre comentários.',
      },
      {
        id: 'protd-2',
        selector: '[data-go-tour="protocolo-timeline"]',
        title: 'Timeline',
        body: 'Acompanhe o histórico de eventos e evidências da submissão.',
      },
    ],
  },
  {
    id: 'tour.pessoas.list',
    screenId: 'pessoas.list',
    steps: [
      {
        id: 'pes-1',
        selector: '[data-go-tour="pessoas-new"]',
        title: 'Nova pessoa',
        body: 'Cadastre pessoas (pacientes/clientes) que preenchem fichas.',
      },
      {
        id: 'pes-2',
        selector: '[data-go-tour="pessoas-search"]',
        title: 'Busca',
        body: 'Pesquise por nome ou contato e abra a ficha com histórico de protocolos.',
      },
    ],
  },
];
