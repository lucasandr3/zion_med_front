export interface ShellNavItem {
  route: string;
  label: string;
  icon: string;
  exact?: boolean;
  /** Exige esta permissão para exibir o item. */
  permission?: string;
  /** Exibe se o usuário tiver ao menos uma das permissões. */
  permissionsAny?: string[];
  badge?: 'notifications' | 'novidades' | 'trial';
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
  { route: '/templates', label: 'Modelos de fichas', icon: 'description', permission: 'templates.manage' },
  { route: '/links-publicos', label: 'Formulários públicos', icon: 'link', permissionsAny: ['templates.manage', 'submissions.view'] },
  { route: '/envios', label: 'Envios de documento', icon: 'send', permissionsAny: ['templates.manage', 'submissions.view'] },
  { route: '/protocolos', label: 'Protocolos', icon: 'inbox', permission: 'submissions.view' },
  { route: '/pessoas', label: 'Pessoas', icon: 'group', permission: 'submissions.view' },
  { route: '/notificacoes', label: 'Notificações', icon: 'notifications', permission: 'notifications.access', badge: 'notifications' },
  { route: '/clinica/configuracoes', label: 'Empresa', icon: 'business', permission: 'organization.manage' },
  { route: '/link-bio', label: 'Link na bio', icon: 'link', permission: 'organization.manage' },
  { route: '/clinica/integracoes', label: 'Integrações', icon: 'api', permission: 'organization.manage' },
  { route: '/usuarios', label: 'Usuários', icon: 'group', permission: 'users.manage' },
  { route: '/organizacao/permissoes', label: 'Permissões', icon: 'admin_panel_settings', permission: 'users.manage' },
];

/** Seções do menu horizontal tenant. */
export const SHELL_NAV_APP_SECTIONS: ShellNavSection[] = [
  {
    id: 'inicio',
    label: 'Dashboard',
    icon: 'bar_chart',
    items: [
      { route: '/dashboard', label: 'Dashboard', icon: 'bar_chart', permission: 'dashboard.access', exact: true },
    ],
  },
  {
    id: 'operacao',
    label: 'Operação',
    icon: 'work',
    items: [
      { route: '/templates', label: 'Modelos de fichas', icon: 'app_registration', permission: 'templates.manage' },
      { route: '/links-publicos', label: 'Formulários públicos', icon: 'list_alt', permissionsAny: ['templates.manage', 'submissions.view'] },
      { route: '/envios', label: 'Envios de documento', icon: 'send', permissionsAny: ['templates.manage', 'submissions.view'] },
      { route: '/protocolos', label: 'Protocolos', icon: 'article_person', permission: 'submissions.view' },
      { route: '/pessoas', label: 'Pessoas', icon: 'group', permission: 'submissions.view' },
    ],
  },
  {
    id: 'admin',
    label: 'Admin',
    icon: 'admin_panel_settings',
    items: [
      { route: '/clinica/configuracoes', label: 'Empresa', icon: 'emoji_transportation', permission: 'organization.manage' },
      { route: '/link-bio', label: 'Link na bio', icon: 'nest_heat_link_gen_3', permission: 'organization.manage' },
      { route: '/clinica/integracoes', label: 'Integrações', icon: 'linked_services', permission: 'organization.manage' },
      { route: '/usuarios', label: 'Usuários', icon: 'group', permission: 'users.manage' },
      { route: '/organizacao/permissoes', label: 'Permissões', icon: 'admin_panel_settings', permission: 'users.manage' },
    ],
  },
];

/** Itens avulsos no menu horizontal tenant (fora de seções). */
export const SHELL_NAV_APP_STANDALONE: ShellNavItem[] = [
  { route: '/novidades', label: 'Novidades', icon: 'new_releases', badge: 'novidades' },
  { route: '/notificacoes', label: 'Notificações', icon: 'notifications', permission: 'notifications.access', badge: 'notifications' },
];

/** Sidebar tenant — fonte única para barra-lateral. */
export const SHELL_NAV_SIDEBAR: ShellNavSection[] = [
  {
    id: 'menu',
    label: 'Menu',
    icon: 'menu',
    items: [
      { route: '/dashboard', label: 'Dashboard', icon: 'bar_chart', permission: 'dashboard.access', exact: true },
      { route: '/templates', label: 'Modelos de fichas', icon: 'app_registration', permission: 'templates.manage' },
      { route: '/links-publicos', label: 'Formulários públicos', icon: 'list_alt', permissionsAny: ['templates.manage', 'submissions.view'] },
      { route: '/envios', label: 'Envios de documento', icon: 'send', permissionsAny: ['templates.manage', 'submissions.view'] },
      { route: '/protocolos', label: 'Protocolos', icon: 'article_person', permission: 'submissions.view' },
      { route: '/pessoas', label: 'Pessoas', icon: 'group', permission: 'submissions.view' },
    ],
  },
  {
    id: 'comunicacao',
    label: '',
    icon: 'notifications',
    items: [
      { route: '/novidades', label: 'Novidades', icon: 'new_releases', badge: 'novidades' },
      { route: '/notificacoes', label: 'Notificações', icon: 'notifications', permission: 'notifications.access', badge: 'notifications' },
      { route: '/assinatura', label: 'Assinatura', icon: 'credit_card', permission: 'billing.manage', badge: 'trial' },
    ],
  },
  {
    id: 'admin',
    label: 'Administração',
    icon: 'admin_panel_settings',
    items: [
      { route: '/clinica/configuracoes', label: 'Empresa', icon: 'emoji_transportation', permission: 'organization.manage' },
      { route: '/link-bio', label: 'Link na bio', icon: 'nest_heat_link_gen_3', permission: 'organization.manage' },
      { route: '/clinica/integracoes', label: 'Integrações', icon: 'linked_services', permission: 'organization.manage' },
      { route: '/usuarios', label: 'Usuários', icon: 'group', permission: 'users.manage' },
      { route: '/organizacao/permissoes', label: 'Permissões', icon: 'admin_panel_settings', permission: 'users.manage' },
    ],
  },
];

/** Itens do menu plataforma — legado / referência plana. */
export const SHELL_NAV_PLATAFORMA: ShellNavItem[] = [
  { route: '/plataforma', label: 'Visão geral', icon: 'analytics', exact: true },
  { route: '/plataforma/clientes', label: 'Clientes', icon: 'apartment' },
  { route: '/plataforma/organizacoes-online', label: 'Online', icon: 'sensors' },
  { route: '/plataforma/leads', label: 'Leads', icon: 'request_quote' },
  { route: '/plataforma/trafego-landing', label: 'Tráfego', icon: 'monitoring' },
  { route: '/plataforma/assinaturas', label: 'Assinaturas', icon: 'receipt_long' },
  { route: '/plataforma/faturas', label: 'Faturas', icon: 'payments' },
  { route: '/plataforma/emails', label: 'E-mails', icon: 'mail' },
  { route: '/plataforma/notificacoes', label: 'Notificações', icon: 'notifications', badge: 'notifications' },
  { route: '/plataforma/planos', label: 'Planos', icon: 'subscriptions' },
  { route: '/plataforma/configuracoes', label: 'Config.', icon: 'settings' },
  { route: '/plataforma/logs', label: 'Logs', icon: 'history' },
];

/** Seções do menu horizontal plataforma. */
export const SHELL_NAV_PLATAFORMA_SECTIONS: ShellNavSection[] = [
  {
    id: 'inicio',
    label: 'Dashboard',
    icon: 'bar_chart',
    items: [
      { route: '/plataforma', label: 'Dashboard', icon: 'bar_chart', exact: true },
    ],
  },
  {
    id: 'clientes',
    label: 'Clientes',
    icon: 'emoji_transportation',
    items: [
      { route: '/plataforma/clientes', label: 'Clientes', icon: 'emoji_transportation' },
      { route: '/plataforma/organizacoes-online', label: 'Empresas online', icon: 'sensors' },
      { route: '/plataforma/leads', label: 'Leads', icon: '3p' },
    ],
  },
  {
    id: 'operacao',
    label: 'Operação',
    icon: 'monitoring',
    items: [
      { route: '/plataforma/trafego-landing', label: 'Tráfego da landing', icon: 'monitoring' },
      { route: '/plataforma/assinaturas', label: 'Assinaturas', icon: 'add_card' },
      { route: '/plataforma/faturas', label: 'Faturas / cobranças', icon: 'payments' },
      { route: '/plataforma/emails', label: 'E-mails', icon: 'mail' },
    ],
  },
  {
    id: 'admin',
    label: 'Admin',
    icon: 'settings',
    items: [
      { route: '/plataforma/planos', label: 'Planos', icon: 'featured_play_list' },
      { route: '/plataforma/novidades', label: 'Novidades', icon: 'new_releases' },
      { route: '/plataforma/configuracoes', label: 'Configurações', icon: 'settings' },
      { route: '/plataforma/logs', label: 'Logs', icon: 'history' },
    ],
  },
];

export const SHELL_NAV_PLATAFORMA_STANDALONE: ShellNavItem[] = [
  { route: '/plataforma/notificacoes', label: 'Notificações', icon: 'notifications', badge: 'notifications' },
];

export function shellNavItemVisivel(
  item: ShellNavItem,
  hasPermission: (key: string) => boolean,
  context: 'app' | 'plataforma',
): boolean {
  if (context === 'plataforma') return true;
  if (item.permission) return hasPermission(item.permission);
  if (item.permissionsAny?.length) {
    return item.permissionsAny.some((p) => hasPermission(p));
  }
  return true;
}

export function shellNavSectionVisivel(
  section: ShellNavSection,
  hasPermission: (key: string) => boolean,
  context: 'app' | 'plataforma',
): boolean {
  return section.items.some((item) => shellNavItemVisivel(item, hasPermission, context));
}
