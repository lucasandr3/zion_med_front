/** Chaves alinhadas ao cabeçalho e ao `index.html`. */
export const GESTGO_THEME_LS = 'gestgo_theme';
export const GESTGO_DARK_LS = 'gestgo_dark_mode';
/** Quando `'auto'`, o modo claro/escuro segue `prefers-color-scheme` (drawer do cabeçalho). */
export const GESTGO_APPEARANCE_MODE_LS = 'gestgo_appearance_mode';
/** Preset visual do shell (header + sidebar): `default` | `tinted` | `sidebar_dark`. */
export const GESTGO_SHELL_PRESET_LS = 'gestgo_shell_preset';
/** Disposição do menu: `sidebar` (padrão) | `horizontal`. */
export const GESTGO_NAV_LAYOUT_LS = 'gestgo_nav_layout';

export type NavLayout = 'sidebar' | 'horizontal';

/** Alinhado ao backend (`ThemeService::LEGACY_THEME_ALIASES`). */
const LEGACY_THEME_ALIASES: Record<string, string> = {
  'zion-blue': 'gestgo-blue',
};

/** Converte chaves legadas (ex.: zion-blue) para a chave canônica usada em CSS e API. */
export function normalizeThemeKey(theme: string): string {
  return LEGACY_THEME_ALIASES[theme] ?? theme;
}

export type ShellPreset = 'default' | 'tinted' | 'sidebar_dark';

/** Opções do shell (drawer do header e aba Tema Visual em Configurações). */
export const SHELL_PRESET_UI_OPTIONS: ReadonlyArray<{
  id: ShellPreset;
  label: string;
  icon: string;
  description: string;
}> = [
  {
    id: 'default',
    label: 'Padrão',
    icon: 'navigation-dashboard',
    description: 'Topo e menu iguais aos cartões (superfície neutra).',
  },
  {
    id: 'tinted',
    label: 'Topo e marca',
    icon: 'file-picture',
    description: 'Cor primária no cabeçalho e na faixa do nome Gestgo; o restante do menu segue o fundo padrão.',
  },
  {
    id: 'sidebar_dark',
    label: 'Menu escuro',
    icon: 'navigation-drawer-right-expand',
    description: 'Barra lateral estilo painel; destaque no modo claro.',
  }];

/** Opções de disposição do menu (drawer do header). */
export const NAV_LAYOUT_UI_OPTIONS: ReadonlyArray<{
  id: NavLayout;
  label: string;
  icon: string;
  description: string;
}> = [
  {
    id: 'sidebar',
    label: 'Lateral',
    icon: 'navigation-drawer-left-expand',
    description: 'Barra de navegação fixa à esquerda.',
  },
  {
    id: 'horizontal',
    label: 'Horizontal',
    icon: 'interface-presentation-mode',
    description: 'Marca, menu e ações no topo.',
  }];

const SHELL_BODY_CLASSES = ['shell-preset-tinted', 'shell-preset-sidebar-dark'] as const;
const NAV_LAYOUT_BODY_CLASS = 'shell-nav-horizontal';

/** Normaliza valor da API ou localStorage para um preset do shell. */
export function normalizeShellPreset(raw: string | null | undefined): ShellPreset {
  const s = String(raw ?? '').trim();
  if (s === 'tinted' || s === 'sidebar_dark') return s;
  return 'default';
}

/** Normaliza valor da API ou localStorage para disposição do menu. */
export function normalizeNavLayout(raw: string | null | undefined): NavLayout {
  return String(raw ?? '').trim() === 'horizontal' ? 'horizontal' : 'sidebar';
}

/** Lê disposição atual do `body` (após boot ou apply). */
export function readNavLayoutFromDom(): NavLayout {
  if (typeof document === 'undefined') return 'sidebar';
  return document.body.classList.contains(NAV_LAYOUT_BODY_CLASS) ? 'horizontal' : 'sidebar';
}

/**
 * Aplica classe `body.shell-nav-horizontal` e persiste em localStorage.
 */
export function applyNavLayoutToDom(layout: NavLayout): void {
  if (typeof document === 'undefined') return;
  document.body.classList.toggle(NAV_LAYOUT_BODY_CLASS, layout === 'horizontal');
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(GESTGO_NAV_LAYOUT_LS, layout);
  } catch {}
}

/**
 * Remove a disposição horizontal do `body` sem tocar na preferência salva.
 *
 * O shell Nord (`nord-layout`) é sidebar-first e o menu horizontal legado
 * conflita com ele, então os layouts desligam a classe no DOM enquanto a
 * escolha do usuário continua intacta em localStorage e na API.
 */
export function disableHorizontalNavInDom(): void {
  if (typeof document === 'undefined') return;
  document.body.classList.remove(NAV_LAYOUT_BODY_CLASS);
}

/**
 * Aplica classes `body.shell-preset-*` e persiste em localStorage.
 */
export function applyShellPresetToDom(preset: ShellPreset): void {
  if (typeof document === 'undefined') return;
  SHELL_BODY_CLASSES.forEach((c) => document.body.classList.remove(c));
  if (preset === 'tinted') document.body.classList.add('shell-preset-tinted');
  if (preset === 'sidebar_dark') document.body.classList.add('shell-preset-sidebar-dark');
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(GESTGO_SHELL_PRESET_LS, preset);
  } catch {}
}

export interface UserAppearanceFields {
  ui_theme?: string | null;
  ui_dark_mode?: boolean | null;
  ui_shell_preset?: string | null;
  /** `null` = lateral (padrão). `horizontal` = menu no topo. */
  ui_nav_layout?: string | null;
}

/** Cor primária resolvida do tema atual no `body` (fallback marca Gestgo). */
export function readThemePrimaryColor(): string {
  if (typeof document === 'undefined') return '#14B87A';
  const raw = getComputedStyle(document.body).getPropertyValue('--c-primary').trim();
  return raw || '#14B87A';
}

/** Favicon SVG tintado com a cor do tema (padrão pesquisa_app). */
export function buildThemeFaviconDataUrl(primary: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" role="img" aria-label="Gestgo">
  <rect width="32" height="32" rx="8" fill="${primary}"/>
  <path fill="#fff" d="M10.2 8.4h7.1c3.55 0 5.85 2.15 5.85 5.35 0 2.35-1.2 4.05-3.2 4.85l3.55 5h-3.35l-3.2-4.55h-3.45V23.6H10.2V8.4zm3.3 2.55v5.15h3.55c1.7 0 2.7-.9 2.7-2.55s-1-2.6-2.7-2.6H13.5z"/>
</svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

/**
 * Sincroniza accent Nord no `html`, meta theme-color e favicon com a cor do tema.
 * Chamar após trocar `body.theme-*` ou modo escuro.
 */
export function syncThemeChrome(): void {
  if (typeof document === 'undefined') return;

  const primary = readThemePrimaryColor();
  const root = document.documentElement;
  const dark = document.body.classList.contains('dark');

  root.style.setProperty('--n-color-accent', primary);
  root.style.setProperty('--n-color-accent-secondary', primary);
  root.style.setProperty('--n-color-text-link', primary);

  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    meta.setAttribute('content', dark ? '#1d2025' : primary);
  }

  let link =
    document.querySelector<HTMLLinkElement>('link[rel="icon"][data-theme-favicon]') ??
    document.querySelector<HTMLLinkElement>('link[rel="icon"][type="image/svg+xml"]');
  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    link.type = 'image/svg+xml';
    document.head.prepend(link);
  }
  link.dataset['themeFavicon'] = '1';
  link.type = 'image/svg+xml';
  link.href = buildThemeFaviconDataUrl(primary);
}

/**
 * Aplica tema/modo/shell no `document.body` e no localStorage.
 * Campos ausentes (`undefined`) não alteram o estado atual do browser.
 */
export function applyUserAppearanceToBrowser(fields: UserAppearanceFields): void {
  if (typeof document === 'undefined' || typeof localStorage === 'undefined') return;

  const theme = fields.ui_theme;
  if (theme != null && theme !== '') {
    const canonical = normalizeThemeKey(theme);
    const list = Array.from(document.body.classList).filter((c) => c.startsWith('theme-'));
    list.forEach((c) => document.body.classList.remove(c));
    document.body.classList.add('theme-' + canonical);
    try {
      localStorage.setItem(GESTGO_THEME_LS, canonical);
    } catch {}
  }

  if (fields.ui_dark_mode !== null && fields.ui_dark_mode !== undefined) {
    document.body.classList.toggle('dark', fields.ui_dark_mode);
    try {
      localStorage.setItem(GESTGO_DARK_LS, fields.ui_dark_mode ? '1' : '0');
    } catch {}
  }

  if (fields.ui_shell_preset !== undefined) {
    const p = normalizeShellPreset(fields.ui_shell_preset);
    applyShellPresetToDom(p);
  }

  if (fields.ui_nav_layout != null && String(fields.ui_nav_layout).trim() !== '') {
    applyNavLayoutToDom(normalizeNavLayout(fields.ui_nav_layout));
  }

  syncThemeChrome();
}
