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
    icon: 'view_agenda',
    description: 'Topo e menu iguais aos cartões (superfície neutra).',
  },
  {
    id: 'tinted',
    label: 'Topo e marca',
    icon: 'branding_watermark',
    description: 'Cor primária no cabeçalho e na faixa do nome Gestgo; o restante do menu segue o fundo padrão.',
  },
  {
    id: 'sidebar_dark',
    label: 'Menu escuro',
    icon: 'dock_to_right',
    description: 'Barra lateral estilo painel; destaque no modo claro.',
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
}
