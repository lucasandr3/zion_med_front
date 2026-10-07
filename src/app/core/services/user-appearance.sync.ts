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

/** Path do símbolo Gestgo (viewBox 0 0 100 100). */
export const GESTGO_LOGO_MARK_PATH =
  "M47.54 93.87C46.41 93.65 45.39 92.80 44.85 91.65L44.55 91.03L44.52 77.46C44.50 68.62 44.53 63.54 44.60 62.88C44.83 60.89 45.72 58.57 46.96 56.73C47.72 55.61 49.42 53.85 50.61 52.95C51.73 52.11 52.81 51.46 55.09 50.27C56.05 49.76 58.57 48.43 60.69 47.31C62.81 46.19 65.93 44.54 67.62 43.65C71.72 41.48 73.11 40.74 79.23 37.47C80.00 37.06 81.31 36.36 82.14 35.91C86.57 33.53 86.35 33.63 87.27 33.63C87.91 33.62 88.24 33.68 88.67 33.88C89.40 34.21 90.10 34.91 90.42 35.62L90.68 36.19L90.71 50.15C90.74 60.17 90.71 64.41 90.62 65.17C90.13 69.25 87.38 73.27 83.40 75.74C82.80 76.11 81.60 76.80 80.74 77.26C76.33 79.63 63.02 86.70 57.23 89.75C56.09 90.34 54.08 91.41 52.76 92.11C49.77 93.69 49.67 93.74 48.96 93.88C48.30 94.00 48.21 94.00 47.54 93.87ZM11.83 82.94C10.85 82.68 9.95 81.90 9.50 80.93L9.26 80.42L9.26 63.66C9.26 50.87 9.29 46.72 9.40 46.12C9.61 44.90 10.39 42.67 11.02 41.47C12.86 37.99 15.75 35.21 19.76 33.06C20.31 32.77 21.11 32.33 21.53 32.09C21.95 31.86 22.31 31.67 22.33 31.67C22.36 31.67 23.42 31.11 24.70 30.42C28.15 28.57 33.49 25.73 35.45 24.69C37.51 23.60 42.75 20.80 47.18 18.43C49.84 17.01 55.87 13.79 60.08 11.56C60.63 11.27 62.11 10.48 63.37 9.81C70.50 6.00 70.22 6.12 71.40 6.23C72.19 6.30 73.26 6.82 73.72 7.35C73.91 7.56 74.18 7.98 74.33 8.28L74.60 8.83L74.60 18.65L74.60 28.48L74.28 29.30C73.87 30.38 73.43 31.11 72.68 31.96C71.64 33.14 70.88 33.60 62.42 38.18C61.63 38.61 60.52 39.21 59.98 39.51C59.43 39.82 58.65 40.24 58.25 40.46C57.84 40.67 56.03 41.66 54.21 42.64C45.12 47.58 45.06 47.62 43.31 49.37C41.69 50.99 40.50 52.88 39.88 54.85C39.31 56.67 39.23 57.46 39.14 61.93L39.07 66.12L38.76 66.94C38.32 68.10 37.75 69.03 36.97 69.85C36.11 70.75 35.56 71.11 32.94 72.54C31.77 73.17 30.01 74.13 29.03 74.66C26.98 75.78 25.21 76.74 23.05 77.91C22.23 78.35 21.12 78.96 20.60 79.25C19.37 79.93 14.89 82.34 14.20 82.69C13.63 82.98 12.45 83.11 11.83 82.94Z";

/** Favicon SVG tintado com a cor do tema (só o símbolo, sem fundo). */
export function buildThemeFaviconDataUrl(primary: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" role="img" aria-label="Gestgo">
  <path fill="${primary}" d="${GESTGO_LOGO_MARK_PATH}"/>
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
