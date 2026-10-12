/** Arquivo da marca por tema (`src/assets/logo/logo-*.png`). */
const THEME_LOGO_FILE: Record<string, string> = {
  'gestgo-blue': 'logo-azul.png',
  'zion-blue': 'logo-azul.png',
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

function canonicalThemeKey(theme: string): string {
  return theme === 'zion-blue' ? 'gestgo-blue' : theme;
}

function readBodyThemeKey(): string {
  if (typeof document === 'undefined') return 'ocean-blue';
  const m = document.body.className.match(/(?:^|\s)theme-([a-z0-9-]+)/);
  return canonicalThemeKey(m?.[1] ?? 'ocean-blue');
}

/** PNG colorido do tema (nunca a variante branca) — sidebar + favicon. */
export function resolveThemeLogoSrc(themeKey?: string): string {
  const key = canonicalThemeKey(themeKey ?? readBodyThemeKey());
  const file = THEME_LOGO_FILE[key] ?? 'logo.png';
  return `/assets/logo/${file}`;
}

/**
 * Logo oficial Gestgo (PNG do sistema).
 * Preset "Topo e marca" usa a variante branca; demais temas usam a arte colorida.
 */
export function resolveSidebarLogoSrc(): string {
  if (typeof document === 'undefined') {
    return '/assets/logo/logo.png';
  }
  if (document.body.classList.contains('shell-preset-tinted')) {
    return '/assets/logo/logo-white.png';
  }
  return resolveThemeLogoSrc();
}

/** Favicon = mesma arte colorida do tema (cache-bust por chave). */
export function resolveThemeFaviconHref(themeKey?: string): string {
  const key = canonicalThemeKey(themeKey ?? readBodyThemeKey());
  return `${resolveThemeLogoSrc(key)}?theme=${encodeURIComponent(key)}`;
}
