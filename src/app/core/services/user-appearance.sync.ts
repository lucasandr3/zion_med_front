/** Chaves alinhadas ao cabeçalho e ao `index.html`. */
export const GESTGO_THEME_LS = 'gestgo_theme';
export const GESTGO_DARK_LS = 'gestgo_dark_mode';
/** Quando `'auto'`, o modo claro/escuro segue `prefers-color-scheme` (drawer do cabeçalho). */
export const GESTGO_APPEARANCE_MODE_LS = 'gestgo_appearance_mode';
/** Preset visual do shell (header + sidebar): `default` | `tinted` | `sidebar_dark`. */
export const GESTGO_SHELL_PRESET_LS = 'gestgo_shell_preset';
/** Disposição do menu: `sidebar` (padrão) | `horizontal`. */
export const GESTGO_NAV_LAYOUT_LS = 'gestgo_nav_layout';
/**
 * Escolha explícita de claro/escuro na tela de login (`'0'` | `'1'`).
 * Tem prioridade sobre `ui_dark_mode` da API até o PATCH da conta concluir.
 */
export const GESTGO_LOGIN_DARK_CHOICE_SS = 'gestgo_login_dark_choice';

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
    icon: 'dashboard',
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
    icon: 'vertical_split',
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
    icon: 'view_sidebar',
    description: 'Barra de navegação fixa à esquerda.',
  },
  {
    id: 'horizontal',
    label: 'Horizontal',
    icon: 'view_week',
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

/** Fallback da marca Gestgo (tema ocean-blue). */
export const GESTGO_BRAND_GREEN = '#14B87A';

/**
 * Sincroniza accent Nord no `html`, meta theme-color e favicon com a logo do tema.
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

  // Páginas públicas (/l, /a, /f…) mantêm a cor do tema da clínica (não a do painel)
  const publicPage = document.documentElement.getAttribute('data-public-page') === '1';
  if (publicPage) {
    const locked = document.documentElement.getAttribute('data-theme-color');
    if (locked && /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(locked)) {
      document.documentElement.style.setProperty('--public-chrome-color', locked);
      document.querySelectorAll('meta[name="theme-color"]').forEach((el) => el.remove());
      const meta = document.createElement('meta');
      meta.setAttribute('name', 'theme-color');
      meta.setAttribute('content', locked);
      document.head.appendChild(meta);
    }
  } else {
    document.documentElement.style.removeProperty('--public-chrome-color');
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute('content', dark ? '#1d2025' : primary);
    }
  }

  // Favicon = PNG oficial do tema (mesma arte da sidebar). Remove links estáticos concorrentes.
  const m = document.body.className.match(/(?:^|\s)theme-([a-z0-9-]+)/);
  const themeKey = normalizeThemeKey(m?.[1] ?? 'ocean-blue');
  const logoFile: Record<string, string> = {
    'gestgo-blue': 'logo-azul.png',
    'ocean-blue': 'logo.png',
    'indigo-night': 'logo-indigo.png',
    'emerald-fresh': 'logo-emerald.png',
    'rose-elegant': 'logo-rose.png',
    'amber-warm': 'logo-amber.png',
    'violet-dream': 'logo-violet.png',
    'teal-ocean': 'logo-teal.png',
    'slate-pro': 'logo-slate.png',
    'cyan-tech': 'logo-cyan.png',
    'fuchsia-bold': 'logo-fucshia.png',
  };
  const href = `/assets/logo/${logoFile[themeKey] ?? 'logo.png'}?theme=${encodeURIComponent(themeKey)}`;

  document
    .querySelectorAll<HTMLLinkElement>('link[rel="icon"], link[rel="shortcut icon"]')
    .forEach((el) => el.remove());

  const link = document.createElement('link');
  link.rel = 'icon';
  link.type = 'image/png';
  link.dataset['themeFavicon'] = '1';
  link.href = href;
  document.head.prepend(link);
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
    let dark = fields.ui_dark_mode;
    try {
      const loginChoice = sessionStorage.getItem(GESTGO_LOGIN_DARK_CHOICE_SS);
      if (loginChoice === '0' || loginChoice === '1') {
        dark = loginChoice === '1';
      }
    } catch {}
    document.body.classList.toggle('dark', dark);
    try {
      localStorage.setItem(GESTGO_DARK_LS, dark ? '1' : '0');
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
