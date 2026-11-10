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
  subtitle: 'Crie, organize e acompanhe a documentação da sua empresa.',
  sectionTitle: 'O que você deseja fazer?',
  sectionSubtitle: 'Escolha uma ação ou acesse a área correspondente.',
  // Temporário: envios ocultos
  // primaryCta: {
  //   label: 'Novo envio',
  //   route: '/envios?novo=1',
  //   icon: 'add',
  //   permissionsAny: ['templates.manage', 'submissions.view'],
  // },
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
    // {
    //   id: 'novo',
    //   title: 'Novo envio',
    //   description: 'Escolha uma ficha e compartilhe o link de preenchimento com a pessoa.',
    //   icon: 'send',
    //   route: '/envios?novo=1',
    //   permissionsAny: ['templates.manage', 'submissions.view'],
    // },
    // {
    //   id: 'envios',
    //   title: 'Envios realizados',
    //   description: 'Veja o que foi enviado, o que está pendente e o que foi concluído.',
    //   icon: 'send',
    //   route: '/envios',
    //   permissionsAny: ['templates.manage', 'submissions.view'],
    // },
    {
      id: 'protocolos',
      title: 'Protocolos',
      description: 'Acesse as respostas e os registros associados às fichas recebidas.',
      icon: 'article_person',
      route: '/protocolos',
      permission: 'submissions.view',
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
      id: 'importar',
      title: 'Importar ficha com IA',
      description: 'Converta um PDF ou foto de ficha em um modelo digital.',
      icon: 'auto_awesome',
      route: '/templates/importar',
      permission: 'templates.manage',
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

export const NAVIGATION_HUBS: Record<string, NavigationHubConfig> = {
  documentos: HUB_DOCUMENTOS,
  configuracoes: HUB_CONFIGURACOES,
  'plataforma-clientes': HUB_PLATAFORMA_CLIENTES,
  'plataforma-financeiro': HUB_PLATAFORMA_FINANCEIRO,
  'plataforma-comunicacao': HUB_PLATAFORMA_COMUNICACAO,
  'plataforma-sistema': HUB_PLATAFORMA_SISTEMA,
};
