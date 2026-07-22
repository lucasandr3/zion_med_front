/** Chaves alinhadas ao cabeçalho e ao `index.html`. */
export const GESTGO_THEME_LS = 'gestgo_theme';
export const GESTGO_DARK_LS = 'gestgo_dark_mode';
/** Quando `'auto'`, o modo claro/escuro segue `prefers-color-scheme` (drawer do cabeçalho). */
export const GESTGO_APPEARANCE_MODE_LS = 'gestgo_appearance_mode';
/** Preset visual do shell: `default` | `tinted` | `sidebar_dark` | `tinted_sidebar_dark`. */
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

/** Estilo do topo/faixa de marca (independente do menu escuro). */
export type ShellHeaderPreset = 'default' | 'tinted';

/**
 * Valor persistido na API/localStorage.
 * `tinted` e `sidebar_dark` podem combinar em `tinted_sidebar_dark`.
 */
export type ShellPreset = 'default' | 'tinted' | 'sidebar_dark' | 'tinted_sidebar_dark';

/** Estado interno do shell (topo + menu). */
export interface ShellAppearance {
  header: ShellHeaderPreset;
  sidebarDark: boolean;
}

/** Opções do drawer — Padrão/Topo são exclusivos; Menu escuro é independente (toggle). */
export const SHELL_PRESET_UI_OPTIONS: ReadonlyArray<{
  id: 'default' | 'tinted' | 'sidebar_dark';
  label: string;
  icon: string;
  description: string;
}> = [
  {
    id: 'default',
    label: 'Padrão',
    icon: 'view_agenda',
    description: 'Topo neutro (branco/superfície). Permanece claro mesmo com Menu escuro.',
  },
  {
    id: 'tinted',
    label: 'Topo e marca',
    icon: 'branding_watermark',
    description: 'Cor primária no cabeçalho e na faixa do nome Gestgo (pode combinar com Menu escuro).',
  },
  {
    id: 'sidebar_dark',
    label: 'Menu escuro',
    icon: 'dock_to_right',
    description: 'Escurece só a lateral (#1a1a1a). Não altera o topo Padrão nem remove Topo e marca.',
  },
];

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
    icon: 'dock_to_right',
    description: 'Barra de navegação fixa à esquerda.',
  },
  {
    id: 'horizontal',
    label: 'Horizontal',
    icon: 'view_day',
    description: 'Marca, menu e ações no topo.',
  },
];

const NAV_LAYOUT_BODY_CLASS = 'shell-nav-horizontal';

/** Converte valor da API/localStorage para estado do shell. */
export function parseShellAppearance(raw: string | null | undefined): ShellAppearance {
  const s = String(raw ?? '').trim();
  if (s === 'tinted_sidebar_dark' || s === 'tinted+sidebar_dark' || s === 'sidebar_dark_tinted') {
    return { header: 'tinted', sidebarDark: true };
  }
  if (s === 'tinted' || s === 'branded-top') {
    return { header: 'tinted', sidebarDark: false };
  }
  if (s === 'sidebar_dark' || s === 'dark-sidebar') {
    return { header: 'default', sidebarDark: true };
  }
  return { header: 'default', sidebarDark: false };
}

/** Serializa estado do shell para API/localStorage. */
export function serializeShellAppearance(appearance: ShellAppearance): ShellPreset {
  if (appearance.header === 'tinted' && appearance.sidebarDark) return 'tinted_sidebar_dark';
  if (appearance.header === 'tinted') return 'tinted';
  if (appearance.sidebarDark) return 'sidebar_dark';
  return 'default';
}

/** @deprecated Preferir `parseShellAppearance` — mantido para chamadas existentes. */
export function normalizeShellPreset(raw: string | null | undefined): ShellPreset {
  return serializeShellAppearance(parseShellAppearance(raw));
}

/** Lê disposição atual do `body` (após boot ou apply). */
export function readNavLayoutFromDom(): NavLayout {
  if (typeof document === 'undefined') return 'sidebar';
  return document.body.classList.contains(NAV_LAYOUT_BODY_CLASS) ? 'horizontal' : 'sidebar';
}

/** Normaliza valor da API ou localStorage para disposição do menu. */
export function normalizeNavLayout(raw: string | null | undefined): NavLayout {
  return String(raw ?? '').trim() === 'horizontal' ? 'horizontal' : 'sidebar';
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

/** Lê estado atual das classes do body. */
export function readShellAppearanceFromDom(): ShellAppearance {
  if (typeof document === 'undefined') return { header: 'default', sidebarDark: false };
  return {
    header: document.body.classList.contains('shell-preset-tinted') ? 'tinted' : 'default',
    sidebarDark: document.body.classList.contains('shell-preset-sidebar-dark'),
  };
}

/**
 * Aplica classes `body.shell-preset-*` e persiste em localStorage.
 * Topo e marca (`tinted`) e Menu escuro (`sidebar_dark`) são independentes.
 */
export function applyShellAppearanceToDom(appearance: ShellAppearance): void {
  if (typeof document === 'undefined') return;
  document.body.classList.toggle('shell-preset-tinted', appearance.header === 'tinted');
  document.body.classList.toggle('shell-preset-sidebar-dark', appearance.sidebarDark);
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(GESTGO_SHELL_PRESET_LS, serializeShellAppearance(appearance));
  } catch {}
}

/** @deprecated Preferir `applyShellAppearanceToDom`. */
export function applyShellPresetToDom(preset: ShellPreset | string): void {
  applyShellAppearanceToDom(parseShellAppearance(preset));
}

export interface UserAppearanceFields {
  ui_theme?: string | null;
  ui_dark_mode?: boolean | null;
  ui_shell_preset?: string | null;
  /** `null` = lateral (padrão). `horizontal` = menu no topo. */
  ui_nav_layout?: string | null;
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
    applyShellAppearanceToDom(parseShellAppearance(fields.ui_shell_preset));
  }

  if (fields.ui_nav_layout != null && String(fields.ui_nav_layout).trim() !== '') {
    applyNavLayoutToDom(normalizeNavLayout(fields.ui_nav_layout));
  }
}
