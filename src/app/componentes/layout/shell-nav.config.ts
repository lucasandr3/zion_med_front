export interface ShellNavItem {
  route: string;
  label: string;
  icon: string;
  exact?: boolean;
  /** Exige esta permissão para exibir o item. */
  permission?: string;
  /** Exibe se o usuário tiver ao menos uma das permissões. */
  permissionsAny?: string[];
  badge?: 'notifications' | 'novidades';
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
  { route: '/templates', label: 'Modelos', icon: 'description', permission: 'templates.manage' },
  { route: '/links-publicos', label: 'Formulários públicos', icon: 'link', permissionsAny: ['templates.manage', 'submissions.view'] },
  { route: '/envios', label: 'Envios', icon: 'send', permissionsAny: ['templates.manage', 'submissions.view'] },
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
    label: 'Início',
    icon: 'dashboard',
    items: [
      { route: '/dashboard', label: 'Painel', icon: 'dashboard', permission: 'dashboard.access', exact: true },
    ],
  },
  {
    id: 'operacao',
    label: 'Operação',
    icon: 'work',
    items: [
      { route: '/templates', label: 'Modelos de fichas', icon: 'description', permission: 'templates.manage' },
      { route: '/links-publicos', label: 'Formulários públicos', icon: 'link', permissionsAny: ['templates.manage', 'submissions.view'] },
      { route: '/envios', label: 'Envios de documento', icon: 'send', permissionsAny: ['templates.manage', 'submissions.view'] },
      { route: '/protocolos', label: 'Protocolos', icon: 'inbox', permission: 'submissions.view' },
      { route: '/pessoas', label: 'Pessoas', icon: 'group', permission: 'submissions.view' },
    ],
  },
  {
    id: 'admin',
    label: 'Admin',
    icon: 'admin_panel_settings',
    items: [
      { route: '/clinica/configuracoes', label: 'Empresa', icon: 'business', permission: 'organization.manage' },
      { route: '/link-bio', label: 'Link na bio', icon: 'link', permission: 'organization.manage' },
      { route: '/clinica/integracoes', label: 'Integrações', icon: 'api', permission: 'organization.manage' },
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
    label: 'Início',
    icon: 'analytics',
    items: [
      { route: '/plataforma', label: 'Visão geral', icon: 'analytics', exact: true },
    ],
  },
  {
    id: 'clientes',
    label: 'Clientes',
    icon: 'apartment',
    items: [
      { route: '/plataforma/clientes', label: 'Clientes', icon: 'apartment' },
      { route: '/plataforma/organizacoes-online', label: 'Empresas online', icon: 'sensors' },
      { route: '/plataforma/leads', label: 'Leads', icon: 'request_quote' },
    ],
  },
  {
    id: 'operacao',
    label: 'Operação',
    icon: 'monitoring',
    items: [
      { route: '/plataforma/trafego-landing', label: 'Tráfego da landing', icon: 'monitoring' },
      { route: '/plataforma/assinaturas', label: 'Assinaturas', icon: 'receipt_long' },
      { route: '/plataforma/faturas', label: 'Faturas / cobranças', icon: 'payments' },
      { route: '/plataforma/emails', label: 'E-mails', icon: 'mail' },
    ],
  },
  {
    id: 'admin',
    label: 'Admin',
    icon: 'settings',
    items: [
      { route: '/plataforma/planos', label: 'Planos', icon: 'subscriptions' },
      { route: '/plataforma/novidades', label: 'Novidades', icon: 'new_releases' },
      { route: '/plataforma/configuracoes', label: 'Configurações', icon: 'settings' },
      { route: '/plataforma/logs', label: 'Logs', icon: 'history' },
    ],
  },
];

export const SHELL_NAV_PLATAFORMA_STANDALONE: ShellNavItem[] = [
  { route: '/plataforma/notificacoes', label: 'Notificações', icon: 'notifications', badge: 'notifications' },
];

/** Verifica se o usuário pode ver o item. */
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
