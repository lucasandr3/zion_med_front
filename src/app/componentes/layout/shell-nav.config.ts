export interface ShellNavItem {
  route: string;
  label: string;
  icon: string;
  exact?: boolean;
  /**
   * Prefixos filhos que NÃO devem ativar este item (ex.: Modelos vs Importar).
   * Só aplica quando `exact` é falso.
   */
  activeExceptPrefixes?: string[];
  /**
   * Prefixos adicionais que também ativam o item (ex.: hub Documentos quando em /envios).
   */
  activeAlsoPrefixes?: string[];
  /** Exige esta permissão para exibir o item. */
  permission?: string;
  /** Exibe se o usuário tiver ao menos uma das permissões. */
  permissionsAny?: string[];
  /** Exibe só quem pode alternar entre empresas do mesmo tenant. */
  requiresSwitchClinic?: boolean;
  badge?: 'notifications' | 'novidades' | 'trial';
}

export interface ShellNavVisibilityOptions {
  canSwitchClinic?: boolean;
}

export interface ShellNavSection {
  id: string;
  label: string;
  icon: string;
  items: ShellNavItem[];
}

export interface ShellNavSectionView extends ShellNavSection {
  visibleItems: ShellNavItem[];
}

/** Itens do menu tenant (app) — legado / referência plana. */
export const SHELL_NAV_APP: ShellNavItem[] = [
  { route: '/dashboard', label: 'Painel', icon: 'dashboard', permission: 'dashboard.access', exact: true },
  {
    route: '/templates',
    label: 'Modelos de fichas',
    icon: 'description',
    permission: 'templates.manage',
    activeExceptPrefixes: ['/templates/importar'],
  },
  { route: '/templates/importar', label: 'Usar minha ficha', icon: 'upload_file', permission: 'templates.manage', exact: true },
  { route: '/links-publicos', label: 'Formulários públicos', icon: 'link', permissionsAny: ['templates.manage', 'submissions.view'] },
  { route: '/envios', label: 'Envios de documento', icon: 'send', permissionsAny: ['templates.manage', 'submissions.view'] },
  { route: '/protocolos', label: 'Protocolos', icon: 'inbox', permission: 'submissions.view' },
  { route: '/pessoas', label: 'Pessoas', icon: 'group', permission: 'submissions.view' },
  { route: '/agenda', label: 'Agenda', icon: 'calendar_month', permission: 'organization.manage' },
  { route: '/servicos', label: 'Serviços', icon: 'layers', permission: 'organization.manage' },
  { route: '/notificacoes', label: 'Notificações', icon: 'notifications', permission: 'notifications.access', badge: 'notifications' },
  { route: '/clinica/configuracoes', label: 'Empresa', icon: 'business', permission: 'organization.manage' },
  // { route: '/studio', label: 'Gestgo Studio', icon: 'palette', permission: 'organization.manage' },
  { route: '/link-bio', label: 'Link na bio', icon: 'link', permission: 'organization.manage' },
  { route: '/usuarios', label: 'Usuários', icon: 'group', permission: 'users.manage' },
  { route: '/organizacao/permissoes', label: 'Permissões', icon: 'admin_panel_settings', permission: 'users.manage' },
  { route: '/ajuda', label: 'Ajuda', icon: 'help', exact: true },
  { route: '/suporte', label: 'Atendimento', icon: 'support_agent', exact: true },
];

/** Itens avulsos no menu horizontal tenant (fora de seções). */
export const SHELL_NAV_APP_STANDALONE: ShellNavItem[] = [
  { route: '/novidades', label: 'Novidades', icon: 'check_circle', badge: 'novidades' },
  { route: '/notificacoes', label: 'Notificações', icon: 'notifications', permission: 'notifications.access', badge: 'notifications' },
];

/** Sidebar tenant — fonte única para barra-lateral / shell Nord. */
export const SHELL_NAV_SIDEBAR: ShellNavSection[] = [
  {
    id: 'principal',
    label: 'Principal',
    icon: 'home',
    items: [
      { route: '/dashboard', label: 'Dashboard', icon: 'bar_chart', permission: 'dashboard.access', exact: true },
      { route: '/pessoas', label: 'Pessoas', icon: 'group', permission: 'submissions.view' },
      { route: '/agenda', label: 'Agenda', icon: 'calendar_month', permission: 'organization.manage' },
      { route: '/servicos', label: 'Serviços', icon: 'layers', permission: 'organization.manage' },
      {
        route: '/documentos',
        label: 'Documentos',
        icon: 'folder_open',
        permissionsAny: ['templates.manage', 'submissions.view'],
        exact: true,
        activeAlsoPrefixes: ['/envios', '/protocolos'],
      },
      {
        route: '/utilitarios',
        label: 'Utilitários',
        icon: 'widgets',
        permissionsAny: ['submissions.view', 'organization.manage'],
        exact: true,
        activeAlsoPrefixes: [
          '/utilitarios/orcamento',
          '/utilitarios/notificacoes',
          '/utilitarios/retornos',
          '/utilitarios/orcamento/novo',
          '/utilitarios/retornos/novo',
          '/automacoes',
          '/automacoes/tarefas',
        ],
      },
      {
        route: '/automacoes',
        label: 'Automações',
        icon: 'bolt',
        permission: 'organization.manage',
        exact: true,
        activeAlsoPrefixes: ['/automacoes/tarefas'],
      },
    ],
  },
  {
    id: 'produtos',
    label: 'Produtos',
    icon: 'widgets',
    items: [
      {
        route: '/templates',
        label: 'Modelos de fichas',
        icon: 'app_registration',
        permission: 'templates.manage',
        activeExceptPrefixes: ['/templates/importar'],
      },
      {
        route: '/links-publicos',
        label: 'Formulários públicos',
        icon: 'list_alt',
        permissionsAny: ['templates.manage', 'submissions.view'],
      },
      // { route: '/studio', label: 'Gestgo Studio', icon: 'palette', permission: 'organization.manage' },
      { route: '/link-bio', label: 'Link na bio', icon: 'nest_heat_link_gen_3', permission: 'organization.manage' },
    ],
  },
  {
    id: 'admin',
    label: 'Administração',
    icon: 'admin_panel_settings',
    items: [
      {
        route: '/ajuda',
        label: 'Ajuda',
        icon: 'help',
        exact: true,
      },
      {
        route: '/suporte',
        label: 'Atendimento',
        icon: 'support_agent',
        exact: true,
      },
      {
        route: '/configuracoes',
        label: 'Configurações',
        icon: 'settings',
        permissionsAny: ['organization.manage', 'users.manage', 'billing.manage'],
        exact: true,
        activeAlsoPrefixes: [
          '/clinica/configuracoes',
          '/clinica/integracoes',
          '/usuarios',
          '/organizacao/permissoes',
          '/assinatura',
        ],
      },
      {
        route: '/clinica/escolher',
        label: 'Trocar empresa',
        icon: 'swap_horiz',
        requiresSwitchClinic: true,
        exact: true,
      },
    ],
  },
];

/** Seções do menu horizontal tenant (espelha a sidebar). */
export const SHELL_NAV_APP_SECTIONS: ShellNavSection[] = SHELL_NAV_SIDEBAR;

/** Itens do menu plataforma — legado / referência plana. */
export const SHELL_NAV_PLATAFORMA: ShellNavItem[] = [
  { route: '/plataforma', label: 'Visão geral', icon: 'analytics', exact: true, permission: 'platform.admin' },
  { route: '/plataforma/clientes', label: 'Clientes', icon: 'apartment', permission: 'platform.admin' },
  { route: '/plataforma/organizacoes-online', label: 'Online', icon: 'sensors', permission: 'platform.admin' },
  { route: '/plataforma/leads', label: 'Leads', icon: 'request_quote', permission: 'platform.admin' },
  { route: '/plataforma/trafego-landing', label: 'Tráfego', icon: 'monitoring', permission: 'platform.admin' },
  { route: '/plataforma/assinaturas', label: 'Assinaturas', icon: 'receipt_long', permission: 'platform.admin' },
  { route: '/plataforma/faturas', label: 'Faturas', icon: 'payments', permission: 'platform.admin' },
  { route: '/plataforma/emails', label: 'E-mails', icon: 'mail', permission: 'platform.admin' },
  { route: '/plataforma/feedback', label: 'Feedback', icon: 'feedback', permission: 'platform.admin' },
  { route: '/plataforma/notificacoes', label: 'Notificações', icon: 'notifications', badge: 'notifications', permission: 'platform.admin' },
  {
    route: '/plataforma/relacionamento',
    label: 'Relacionamento',
    icon: 'handshake',
    exact: true,
    permissionsAny: ['platform.admin', 'support.tickets.view'],
    activeAlsoPrefixes: [
      '/plataforma/relacionamento/automacoes',
      '/plataforma/relacionamento/execucoes',
      '/plataforma/relacionamento/tarefas',
      '/plataforma/relacionamento/modelos',
      '/plataforma/relacionamento/jornadas',
      '/plataforma/relacionamento/atendimento',
      '/plataforma/relacionamento/conhecimento',
      '/plataforma/relacionamento/respostas-prontas',
    ],
  },
  { route: '/plataforma/planos', label: 'Planos', icon: 'subscriptions', permission: 'platform.admin' },
  { route: '/plataforma/configuracoes', label: 'Config.', icon: 'settings', permission: 'platform.admin' },
  { route: '/plataforma/filas', label: 'Filas', icon: 'cloud_sync', exact: true, permission: 'platform.admin', activeAlsoPrefixes: ['/plataforma/filas/jobs', '/plataforma/filas/schedules'] },
  { route: '/plataforma/logs', label: 'Logs', icon: 'history', permission: 'platform.admin' },
];

/** Sidebar plataforma — fonte única para o shell Nord da plataforma. */
export const SHELL_NAV_PLATAFORMA_SIDEBAR: ShellNavSection[] = [
  {
    id: 'visao',
    label: 'Visão geral',
    icon: 'bar_chart',
    items: [
      { route: '/plataforma', label: 'Dashboard', icon: 'bar_chart', exact: true, permission: 'platform.admin' },
    ],
  },
  {
    id: 'operacao',
    label: 'Operação',
    icon: 'work',
    items: [
      {
        route: '/plataforma/clientes-atividade',
        label: 'Clientes e atividade',
        icon: 'emoji_transportation',
        exact: true,
        permission: 'platform.admin',
        activeAlsoPrefixes: [
          '/plataforma/clientes',
          '/plataforma/organizacoes-online',
          '/plataforma/leads',
          '/plataforma/trafego-landing',
        ],
      },
      {
        route: '/plataforma/financeiro',
        label: 'Financeiro',
        icon: 'add_card',
        exact: true,
        permission: 'platform.admin',
        activeAlsoPrefixes: ['/plataforma/assinaturas', '/plataforma/faturas', '/plataforma/planos'],
      },
    ],
  },
  {
    id: 'plataforma',
    label: 'Plataforma',
    icon: 'settings',
    items: [
      {
        route: '/plataforma/comunicacao',
        label: 'Comunicação',
        icon: 'mail',
        exact: true,
        permission: 'platform.admin',
        activeAlsoPrefixes: [
          '/plataforma/emails',
          '/plataforma/feedback',
          '/plataforma/notificacoes',
          '/plataforma/novidades',
        ],
      },
      {
        route: '/plataforma/relacionamento',
        label: 'Relacionamento',
        icon: 'handshake',
        exact: true,
        permissionsAny: ['platform.admin', 'support.tickets.view'],
        activeAlsoPrefixes: [
          '/plataforma/relacionamento/automacoes',
          '/plataforma/relacionamento/execucoes',
          '/plataforma/relacionamento/tarefas',
          '/plataforma/relacionamento/modelos',
          '/plataforma/relacionamento/jornadas',
          '/plataforma/relacionamento/atendimento',
          '/plataforma/relacionamento/conhecimento',
          '/plataforma/relacionamento/respostas-prontas',
        ],
      },
      {
        route: '/plataforma/filas',
        label: 'Filas e jobs',
        icon: 'cloud_sync',
        exact: true,
        permission: 'platform.admin',
        activeAlsoPrefixes: [
          '/plataforma/filas/jobs',
          '/plataforma/filas/schedules',
        ],
      },
      {
        route: '/plataforma/sistema',
        label: 'Plataforma e auditoria',
        icon: 'settings',
        exact: true,
        permission: 'platform.admin',
        activeAlsoPrefixes: ['/plataforma/configuracoes', '/plataforma/logs'],
      },
    ],
  },
];

/** Seções do menu horizontal plataforma (espelha a sidebar). */
export const SHELL_NAV_PLATAFORMA_SECTIONS: ShellNavSection[] = SHELL_NAV_PLATAFORMA_SIDEBAR;

export const SHELL_NAV_PLATAFORMA_STANDALONE: ShellNavItem[] = [
  {
    route: '/plataforma/notificacoes',
    label: 'Notificações',
    icon: 'notifications',
    badge: 'notifications',
    permissionsAny: ['platform.admin', 'support.tickets.view'],
  },
];

export function shellNavItemVisivel(
  item: ShellNavItem,
  hasPermission: (key: string) => boolean,
  context: 'app' | 'plataforma',
  opts?: ShellNavVisibilityOptions,
): boolean {
  if (item.requiresSwitchClinic && !opts?.canSwitchClinic) return false;
  if (item.permission) return hasPermission(item.permission);
  if (item.permissionsAny?.length) {
    return item.permissionsAny.some((p) => hasPermission(p));
  }
  // Plataforma: item sem permissão explícita fica visível (compat).
  return true;
}

/** Compara rota atual com item do menu (suporta exact e exclusões de prefixo). */
export function shellNavItemActive(item: ShellNavItem, urlOrPath: string): boolean {
  const path = (urlOrPath.split('?')[0] || '/').replace(/\/$/, '') || '/';
  const alvo = (item.route || '/').replace(/\/$/, '') || '/';

  const also = item.activeAlsoPrefixes ?? [];
  if (
    also.some((prefix) => {
      const p = prefix.replace(/\/$/, '') || '/';
      return path === p || path.startsWith(p + '/');
    })
  ) {
    return true;
  }

  if (item.exact) {
    return path === alvo;
  }

  if (path === alvo) {
    return true;
  }

  if (!path.startsWith(alvo + '/')) {
    return false;
  }

  const excluded = item.activeExceptPrefixes ?? [];
  return !excluded.some((prefix) => {
    const p = prefix.replace(/\/$/, '') || '/';
    return path === p || path.startsWith(p + '/');
  });
}

export function shellNavSectionVisivel(
  section: ShellNavSection,
  hasPermission: (key: string) => boolean,
  context: 'app' | 'plataforma',
  opts?: ShellNavVisibilityOptions,
): boolean {
  return section.items.some((item) => shellNavItemVisivel(item, hasPermission, context, opts));
}
