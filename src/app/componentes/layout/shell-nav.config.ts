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
  { route: '/organizacao/permissoes', label: 'Permissões', icon: 'admin_panel_settings', permission: 'users.manage' }];

/** Seções do menu horizontal tenant. */
export const SHELL_NAV_APP_SECTIONS: ShellNavSection[] = [
  {
    id: 'inicio',
    label: 'Dashboard',
    icon: 'bar_chart',
    items: [
      { route: '/dashboard', label: 'Dashboard', icon: 'bar_chart', permission: 'dashboard.access', exact: true }],
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
      { route: '/pessoas', label: 'Pessoas', icon: 'group', permission: 'submissions.view' }],
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
      { route: '/organizacao/permissoes', label: 'Permissões', icon: 'admin_panel_settings', permission: 'users.manage' }],
  }];

/** Itens avulsos no menu horizontal tenant (fora de seções). */
export const SHELL_NAV_APP_STANDALONE: ShellNavItem[] = [
  { route: '/novidades', label: 'Novidades', icon: 'interface-checked-circle', badge: 'novidades' },
  { route: '/notificacoes', label: 'Notificações', icon: 'notifications', permission: 'notifications.access', badge: 'notifications' }];

/** Sidebar tenant — fonte única para barra-lateral / shell Nord. */
export const SHELL_NAV_SIDEBAR: ShellNavSection[] = [
  {
    id: 'menu',
    label: 'Menu',
    icon: 'interface-menu-small',
    items: [
      { route: '/dashboard', label: 'Dashboard', icon: 'navigation-dashboard', permission: 'dashboard.access', exact: true },
      { route: '/templates', label: 'Modelos de fichas', icon: 'file-notes', permission: 'templates.manage' },
      { route: '/links-publicos', label: 'Formulários públicos', icon: 'interface-link', permissionsAny: ['templates.manage', 'submissions.view'] },
      { route: '/envios', label: 'Envios de documento', icon: 'interface-send', permissionsAny: ['templates.manage', 'submissions.view'] },
      { route: '/protocolos', label: 'Protocolos', icon: 'file-patient-records', permission: 'submissions.view' },
      { route: '/pessoas', label: 'Pessoas', icon: 'user-multiple', permission: 'submissions.view' }],
  },
  {
    id: 'comunicacao',
    label: '',
    icon: 'navigation-notifications',
    items: [
      { route: '/novidades', label: 'Novidades', icon: 'interface-checked-circle', badge: 'novidades' },
      { route: '/notificacoes', label: 'Notificações', icon: 'navigation-notifications', permission: 'notifications.access', badge: 'notifications' },
      { route: '/assinatura', label: 'Assinatura', icon: 'generic-credit-card', permission: 'billing.manage', badge: 'trial' }],
  },
  {
    id: 'admin',
    label: 'Administração',
    icon: 'navigation-settings',
    items: [
      { route: '/clinica/configuracoes', label: 'Empresa', icon: 'generic-company', permission: 'organization.manage' },
      { route: '/link-bio', label: 'Link na bio', icon: 'interface-link', permission: 'organization.manage' },
      { route: '/clinica/integracoes', label: 'Integrações', icon: 'generic-chip', permission: 'organization.manage' },
      { route: '/usuarios', label: 'Usuários', icon: 'user-multiple', permission: 'users.manage' },
      { route: '/organizacao/permissoes', label: 'Permissões', icon: 'interface-shield', permission: 'users.manage' }],
  }];

/** Itens do menu plataforma — legado / referência plana. */
export const SHELL_NAV_PLATAFORMA: ShellNavItem[] = [
  { route: '/plataforma', label: 'Visão geral', icon: 'navigation-reports', exact: true },
  { route: '/plataforma/clientes', label: 'Clientes', icon: 'generic-building' },
  { route: '/plataforma/organizacoes-online', label: 'Online', icon: 'generic-signal' },
  { route: '/plataforma/leads', label: 'Leads', icon: 'file-invoice' },
  { route: '/plataforma/trafego-landing', label: 'Tráfego', icon: 'navigation-reports-2' },
  { route: '/plataforma/assinaturas', label: 'Assinaturas', icon: 'file-invoice' },
  { route: '/plataforma/faturas', label: 'Faturas', icon: 'navigation-payments' },
  { route: '/plataforma/emails', label: 'E-mails', icon: 'generic-mail' },
  { route: '/plataforma/notificacoes', label: 'Notificações', icon: 'navigation-notifications', badge: 'notifications' },
  { route: '/plataforma/planos', label: 'Planos', icon: 'navigation-finances' },
  { route: '/plataforma/configuracoes', label: 'Config.', icon: 'navigation-settings' },
  { route: '/plataforma/logs', label: 'Logs', icon: 'navigation-timeline' }];

/** Seções do menu horizontal plataforma. */
export const SHELL_NAV_PLATAFORMA_SECTIONS: ShellNavSection[] = [
  {
    id: 'inicio',
    label: 'Dashboard',
    icon: 'navigation-dashboard',
    items: [
      { route: '/plataforma', label: 'Dashboard', icon: 'navigation-dashboard', exact: true }],
  },
  {
    id: 'clientes',
    label: 'Clientes',
    icon: 'generic-building',
    items: [
      { route: '/plataforma/clientes', label: 'Clientes', icon: 'generic-building' },
      { route: '/plataforma/organizacoes-online', label: 'Empresas online', icon: 'generic-signal' },
      { route: '/plataforma/leads', label: 'Leads', icon: 'user-multiple' }],
  },
  {
    id: 'operacao',
    label: 'Operação',
    icon: 'navigation-reports',
    items: [
      { route: '/plataforma/trafego-landing', label: 'Tráfego da landing', icon: 'navigation-reports-2' },
      { route: '/plataforma/assinaturas', label: 'Assinaturas', icon: 'generic-credit-card' },
      { route: '/plataforma/faturas', label: 'Faturas / cobranças', icon: 'navigation-payments' },
      { route: '/plataforma/emails', label: 'E-mails', icon: 'generic-mail' }],
  },
  {
    id: 'admin',
    label: 'Admin',
    icon: 'navigation-settings',
    items: [
      { route: '/plataforma/planos', label: 'Planos', icon: 'file-multiple' },
      { route: '/plataforma/novidades', label: 'Novidades', icon: 'interface-checked-circle' },
      { route: '/plataforma/configuracoes', label: 'Configurações', icon: 'navigation-settings' },
      { route: '/plataforma/logs', label: 'Logs', icon: 'navigation-timeline' }],
  }];

/** Sidebar plataforma — fonte única para o shell Nord da plataforma. */
export const SHELL_NAV_PLATAFORMA_SIDEBAR: ShellNavSection[] = [
  {
    id: 'menu',
    label: 'Menu',
    icon: 'interface-menu-small',
    items: [
      { route: '/plataforma', label: 'Dashboard', icon: 'navigation-dashboard', exact: true },
      { route: '/plataforma/clientes', label: 'Clientes', icon: 'generic-building' },
      { route: '/plataforma/organizacoes-online', label: 'Empresas online', icon: 'generic-signal' },
      { route: '/plataforma/leads', label: 'Leads', icon: 'user-multiple' },
      { route: '/plataforma/trafego-landing', label: 'Tráfego da landing', icon: 'navigation-reports-2' },
      { route: '/plataforma/assinaturas', label: 'Assinaturas', icon: 'generic-credit-card' },
      { route: '/plataforma/faturas', label: 'Faturas / cobranças', icon: 'navigation-payments' },
      { route: '/plataforma/emails', label: 'E-mails', icon: 'generic-mail' },
      { route: '/plataforma/notificacoes', label: 'Notificações', icon: 'navigation-notifications', badge: 'notifications' }],
  },
  {
    id: 'plataforma',
    label: 'Plataforma',
    icon: 'navigation-settings',
    items: [
      { route: '/plataforma/planos', label: 'Planos', icon: 'file-multiple' },
      { route: '/plataforma/novidades', label: 'Novidades', icon: 'interface-checked-circle' },
      { route: '/plataforma/configuracoes', label: 'Configurações', icon: 'navigation-settings' },
      { route: '/plataforma/logs', label: 'Logs', icon: 'navigation-timeline' }],
  }];

export const SHELL_NAV_PLATAFORMA_STANDALONE: ShellNavItem[] = [
  { route: '/plataforma/notificacoes', label: 'Notificações', icon: 'navigation-notifications', badge: 'notifications' }];

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
