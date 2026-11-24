export interface NavigationHubCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  route: string;
  /** Exige esta permissão para exibir o card. */
  permission?: string;
  /** Exibe se tiver ao menos uma das permissões. */
  permissionsAny?: string[];
  /** Exibe só quando a conta pode gerenciar multiempresa (plano Enterprise). */
  requiresMultiEmpresa?: boolean;
  /** Exibe só quando o usuário pode alternar entre empresas. */
  requiresSwitchClinic?: boolean;
}

export interface NavigationHubKpi {
  id: string;
  label: string;
  icon: string;
  hint?: string;
  route?: string;
  permission?: string;
  permissionsAny?: string[];
}

export interface NavigationHubConfig {
  id: string;
  title: string;
  subtitle: string;
  cards: NavigationHubCard[];
  kpis?: NavigationHubKpi[];
  sectionTitle?: string;
  sectionSubtitle?: string;
  primaryCta?: {
    label: string;
    route: string;
    icon: string;
    permission?: string;
    permissionsAny?: string[];
  };
}

export const HUB_DOCUMENTOS: NavigationHubConfig = {
  id: 'documentos',
  title: 'Documentos',
  subtitle: 'Importe sua ficha, envie e acompanhe as respostas — em poucos passos.',
  sectionTitle: 'O que você deseja fazer?',
  sectionSubtitle: 'Siga o fluxo: preparar ficha → enviar → acompanhar.',
  primaryCta: {
    label: 'Novo envio',
    route: '/envios?novo=1',
    icon: 'add',
    permissionsAny: ['templates.manage', 'submissions.view'],
  },
  kpis: [
    {
      id: 'modelos',
      label: 'Modelos disponíveis',
      icon: 'description',
      hint: 'Total na empresa',
      route: '/templates',
      permission: 'templates.manage',
    },
    {
      id: 'protocolos',
      label: 'Protocolos recebidos',
      icon: 'article_person',
      hint: 'Fichas respondidas',
      route: '/protocolos',
      permission: 'submissions.view',
    },
    {
      id: 'formularios',
      label: 'Formulários públicos',
      icon: 'list_alt',
      hint: 'Links ativos',
      route: '/links-publicos',
      permissionsAny: ['templates.manage', 'submissions.view'],
    },
  ],
  cards: [
    {
      id: 'importar',
      title: 'Usar minha ficha atual',
      description: 'Envie o PDF da ficha que você já usa e mapeie os campos no layout original.',
      icon: 'upload_file',
      route: '/templates/importar',
      permission: 'templates.manage',
    },
    {
      id: 'modelos',
      title: 'Modelos de fichas',
      description: 'Crie, edite e organize fichas e documentos reutilizáveis.',
      icon: 'app_registration',
      route: '/templates',
      permission: 'templates.manage',
    },
    {
      id: 'novo',
      title: 'Novo envio',
      description: 'Escolha uma ficha e compartilhe o link de preenchimento com a pessoa.',
      icon: 'send',
      route: '/envios?novo=1',
      permissionsAny: ['templates.manage', 'submissions.view'],
    },
    {
      id: 'protocolos',
      title: 'Protocolos',
      description: 'Acesse as respostas e os registros associados às fichas recebidas.',
      icon: 'article_person',
      route: '/protocolos',
      permission: 'submissions.view',
    },
    {
      id: 'envios',
      title: 'Envios realizados',
      description: 'Veja o que foi enviado, o que está pendente e o que foi concluído.',
      icon: 'outbox',
      route: '/envios',
      permissionsAny: ['templates.manage', 'submissions.view'],
    },
    {
      id: 'formularios',
      title: 'Formulários públicos',
      description: 'Gerencie links que podem ser preenchidos sem envio individual.',
      icon: 'list_alt',
      route: '/links-publicos',
      permissionsAny: ['templates.manage', 'submissions.view'],
    },
  ],
};

export const HUB_CONFIGURACOES: NavigationHubConfig = {
  id: 'configuracoes',
  title: 'Administração da empresa',
  subtitle: 'Configurações da organização, usuários, acessos e assinatura.',
  sectionTitle: 'Escolha uma área',
  sectionSubtitle: 'Acesse somente o que você precisa, sem sobrecarregar o menu lateral.',
  cards: [
    {
      id: 'empresa',
      title: 'Empresa',
      description: 'Atualize os dados e as configurações da sua clínica ou negócio.',
      icon: 'emoji_transportation',
      route: '/clinica/configuracoes',
      permission: 'organization.manage',
    },
    {
      id: 'empresas',
      title: 'Empresas do grupo',
      description: 'Gerencie filiais do grupo e cadastre novas empresas da conta.',
      icon: 'business_center',
      route: '/clinica/configuracoes?tab=empresas',
      permission: 'organization.manage',
      requiresMultiEmpresa: true,
    },
    {
      id: 'usuarios',
      title: 'Usuários',
      description: 'Convide e gerencie as pessoas que utilizam sua conta empresarial.',
      icon: 'group',
      route: '/usuarios',
      permission: 'users.manage',
    },
    {
      id: 'permissoes',
      title: 'Permissões',
      description: 'Defina perfis e papéis de acesso conforme as atribuições.',
      icon: 'admin_panel_settings',
      route: '/organizacao/permissoes',
      permission: 'users.manage',
    },
    {
      id: 'assinatura',
      title: 'Meu plano e cobrança',
      description: 'Veja o plano contratado, faturas e situação da assinatura.',
      icon: 'credit_card',
      route: '/assinatura',
      permission: 'billing.manage',
    },
    {
      id: 'integracoes',
      title: 'Integrações',
      description: 'Conecte sistemas externos e serviços usados no dia a dia.',
      icon: 'linked_services',
      route: '/clinica/integracoes',
      permission: 'organization.manage',
    },
  ],
};

export const HUB_PLATAFORMA_CLIENTES: NavigationHubConfig = {
  id: 'plataforma-clientes',
  title: 'Clientes e atividade',
  subtitle: 'Empresas, sessões, leads e tráfego da landing.',
  cards: [
    {
      id: 'clientes',
      title: 'Clientes',
      description: 'Consulte os cadastros de empresas que utilizam o GestGo.',
      icon: 'emoji_transportation',
      route: '/plataforma/clientes',
    },
    {
      id: 'online',
      title: 'Empresas online',
      description: 'Acompanhe quais empresas estão com sessões ativas.',
      icon: 'sensors',
      route: '/plataforma/organizacoes-online',
    },
    {
      id: 'leads',
      title: 'Leads',
      description: 'Analise pedidos de demonstração e novos contatos de interesse.',
      icon: '3p',
      route: '/plataforma/leads',
    },
    {
      id: 'trafego',
      title: 'Tráfego da landing',
      description: 'Consulte visitas e cliques das páginas comerciais.',
      icon: 'monitoring',
      route: '/plataforma/trafego-landing',
    },
  ],
};

export const HUB_PLATAFORMA_FINANCEIRO: NavigationHubConfig = {
  id: 'plataforma-financeiro',
  title: 'Financeiro',
  subtitle: 'Assinaturas, faturas, cobranças e planos comerciais.',
  cards: [
    {
      id: 'assinaturas',
      title: 'Assinaturas',
      description: 'Visualize as assinaturas vinculadas a cada empresa.',
      icon: 'add_card',
      route: '/plataforma/assinaturas',
    },
    {
      id: 'faturas',
      title: 'Faturas e cobranças',
      description: 'Acompanhe pagamentos, faturas e cobranças.',
      icon: 'payments',
      route: '/plataforma/faturas',
    },
    {
      id: 'planos',
      title: 'Planos',
      description: 'Configure o catálogo de planos disponíveis para venda.',
      icon: 'featured_play_list',
      route: '/plataforma/planos',
    },
  ],
};

export const HUB_PLATAFORMA_RELACIONAMENTO: NavigationHubConfig = {
  id: 'plataforma-relacionamento',
  title: 'Central de Relacionamento',
  subtitle: 'Automações, jornadas e atendimento da operação Gestgo.',
  sectionTitle: 'Operação comercial e suporte',
  sectionSubtitle: 'Exceções do dia, automações, modelos e tarefas.',
  kpis: [
    {
      id: 'tickets_waiting',
      label: 'Chamados aguardando',
      icon: 'support_agent',
      hint: 'Inbox de atendimento',
      route: '/plataforma/relacionamento/atendimento',
      permission: 'support.tickets.view',
    },
    {
      id: 'tasks_open',
      label: 'Tarefas abertas',
      icon: 'task_alt',
      hint: 'Intervenção humana',
      route: '/plataforma/relacionamento/tarefas',
      permission: 'platform.admin',
    },
    {
      id: 'automations_active',
      label: 'Automações ativas',
      icon: 'bolt',
      hint: 'Escopo plataforma',
      route: '/plataforma/relacionamento/automacoes',
      permission: 'platform.admin',
    },
    {
      id: 'trials_ending_3d',
      label: 'Trials (3 dias)',
      icon: 'hourglass_top',
      hint: 'Conversão',
      route: '/plataforma/clientes',
      permission: 'platform.admin',
    },
    {
      id: 'articles_published',
      label: 'Artigos publicados',
      icon: 'menu_book',
      hint: 'Base de conhecimento',
      route: '/plataforma/relacionamento/conhecimento',
      permission: 'platform.admin',
    },
  ],
  cards: [
    {
      id: 'atendimento',
      title: 'Caixa de entrada',
      description: 'Helpdesk híbrido — chamados das clínicas.',
      icon: 'support_agent',
      route: '/plataforma/relacionamento/atendimento',
      permission: 'support.tickets.view',
    },
    {
      id: 'tarefas',
      title: 'Tarefas',
      description: 'Fila operacional gerada por automações ou pela equipe.',
      icon: 'task_alt',
      route: '/plataforma/relacionamento/tarefas',
      permission: 'platform.admin',
    },
    {
      id: 'automacoes',
      title: 'Automações',
      description: 'Regras PLATFORM ativas — gatilho, condição e ações.',
      icon: 'bolt',
      route: '/plataforma/relacionamento/automacoes',
      permission: 'platform.admin',
    },
    {
      id: 'jornadas',
      title: 'Jornadas',
      description: 'Onboarding e sequências internas sem duplicar e-mails do funil.',
      icon: 'route',
      route: '/plataforma/relacionamento/jornadas',
      permission: 'platform.admin',
    },
    {
      id: 'modelos',
      title: 'Modelos de mensagens',
      description: 'Biblioteca de e-mails e respostas da plataforma.',
      icon: 'description',
      route: '/plataforma/relacionamento/modelos',
      permission: 'platform.admin',
    },
    {
      id: 'conhecimento',
      title: 'Base de conhecimento',
      description: 'Artigos da ajuda clínica e do Go Assistant.',
      icon: 'menu_book',
      route: '/plataforma/relacionamento/conhecimento',
      permission: 'platform.admin',
    },
    {
      id: 'respostas-prontas',
      title: 'Respostas prontas',
      description: 'Modelos rápidos para o inbox de atendimento.',
      icon: 'quickreply',
      route: '/plataforma/relacionamento/respostas-prontas',
      permission: 'support.canned.manage',
    },
    {
      id: 'execucoes',
      title: 'Histórico de execuções',
      description: 'Resultados, falhas e reprocessamento futuro.',
      icon: 'history',
      route: '/plataforma/relacionamento/execucoes',
      permission: 'platform.admin',
    },
  ],
};

export const HUB_PLATAFORMA_COMUNICACAO: NavigationHubConfig = {
  id: 'plataforma-comunicacao',
  title: 'Comunicação',
  subtitle: 'E-mails, notificações, feedback e novidades do produto.',
  cards: [
    {
      id: 'emails',
      title: 'E-mails',
      description: 'Envie mensagens manuais de contato, cobrança ou aviso.',
      icon: 'mail',
      route: '/plataforma/emails',
    },
    {
      id: 'feedback',
      title: 'Feedback',
      description: 'Consulte sugestões e problemas enviados pelos usuários.',
      icon: 'feedback',
      route: '/plataforma/feedback',
    },
    {
      id: 'notificacoes',
      title: 'Notificações',
      description: 'Consulte alertas específicos do painel administrativo.',
      icon: 'notifications',
      route: '/plataforma/notificacoes',
    },
    {
      id: 'novidades',
      title: 'Novidades',
      description: 'Gerencie os avisos e o changelog do produto.',
      icon: 'check_circle',
      route: '/plataforma/novidades',
    },
  ],
};

export const HUB_PLATAFORMA_FILAS: NavigationHubConfig = {
  id: 'plataforma-filas',
  title: 'Filas e jobs',
  subtitle: 'Acompanhe a fila interna, falhas e tarefas agendadas.',
  sectionTitle: 'O que deseja acompanhar?',
  sectionSubtitle: 'Abra a listagem de jobs ou os schedules da plataforma.',
  kpis: [
    {
      id: 'pending',
      label: 'Pendentes',
      icon: 'hourglass_top',
      hint: 'Aguardando ou em execução',
      route: '/plataforma/filas/jobs?filtro=pendentes',
    },
    {
      id: 'failed',
      label: 'Falhos',
      icon: 'error',
      hint: 'Esgotaram tentativas',
      route: '/plataforma/filas/jobs?filtro=falhos',
    },
    {
      id: 'email_pending',
      label: 'E-mails na fila',
      icon: 'mail',
      hint: 'Jobs de e-mail pendentes',
      route: '/plataforma/filas/jobs?filtro=pendentes',
    },
    {
      id: 'schedules_count',
      label: 'Schedules',
      icon: 'schedule',
      hint: 'Tarefas agendadas',
      route: '/plataforma/filas/schedules',
    },
  ],
  cards: [
    {
      id: 'jobs',
      title: 'Jobs',
      description: 'Fila pendente e falhos — reprocessar, descartar ou limpar e-mails.',
      icon: 'cloud_sync',
      route: '/plataforma/filas/jobs',
    },
    {
      id: 'schedules',
      title: 'Schedules',
      description: 'Tarefas agendadas da plataforma (cron e worker da fila).',
      icon: 'schedule',
      route: '/plataforma/filas/schedules',
    },
  ],
};

export const HUB_PLATAFORMA_SISTEMA: NavigationHubConfig = {
  id: 'plataforma-sistema',
  title: 'Plataforma e auditoria',
  subtitle: 'Serviços, parâmetros e registros administrativos.',
  cards: [
    {
      id: 'config',
      title: 'Configurações',
      description: 'Gerencie os parâmetros, integrações e serviços administrativos.',
      icon: 'settings',
      route: '/plataforma/configuracoes',
    },
    {
      id: 'logs',
      title: 'Logs',
      description: 'Consulte os registros de auditoria das ações de administradores.',
      icon: 'history',
      route: '/plataforma/logs',
    },
  ],
};

export const HUB_UTILITARIOS: NavigationHubConfig = {
  id: 'utilitarios',
  title: 'Utilitários',
  subtitle: 'Propostas, WhatsApp e follow-ups para converter e reter — no computador e no celular.',
  cards: [
    {
      id: 'orcamento',
      title: 'Orçamentos',
      description: 'Listagem de propostas — reabra, copie ou envie no WhatsApp.',
      icon: 'receipt_long',
      route: '/utilitarios/orcamento',
      permissionsAny: ['submissions.view', 'organization.manage'],
    },
    {
      id: 'mensagens',
      title: 'Notificações',
      description: 'Confirmação, pós-atendimento e reativação — modelos da clínica.',
      icon: 'chat',
      route: '/utilitarios/notificacoes',
      permissionsAny: ['submissions.view', 'organization.manage'],
    },
    {
      id: 'retornos',
      title: 'Retornos',
      description: 'Fila de follow-ups pendentes para não perder oportunidade.',
      icon: 'event_repeat',
      route: '/utilitarios/retornos',
      permissionsAny: ['submissions.view', 'organization.manage'],
    },
    {
      id: 'automacoes',
      title: 'Automações',
      description: 'Quando acontece → criar tarefa ou avisar a equipe.',
      icon: 'bolt',
      route: '/automacoes',
      permission: 'organization.manage',
    },
    {
      id: 'tarefas-operacionais',
      title: 'Tarefas operacionais',
      description: 'Fila da clínica gerada por automações ou criada manualmente.',
      icon: 'task_alt',
      route: '/automacoes/tarefas',
      permission: 'organization.manage',
    },
  ],
};

export const NAVIGATION_HUBS: Record<string, NavigationHubConfig> = {
  documentos: HUB_DOCUMENTOS,
  configuracoes: HUB_CONFIGURACOES,
  utilitarios: HUB_UTILITARIOS,
  'plataforma-clientes': HUB_PLATAFORMA_CLIENTES,
  'plataforma-financeiro': HUB_PLATAFORMA_FINANCEIRO,
  'plataforma-comunicacao': HUB_PLATAFORMA_COMUNICACAO,
  'plataforma-relacionamento': HUB_PLATAFORMA_RELACIONAMENTO,
  'plataforma-filas': HUB_PLATAFORMA_FILAS,
  'plataforma-sistema': HUB_PLATAFORMA_SISTEMA,
};
