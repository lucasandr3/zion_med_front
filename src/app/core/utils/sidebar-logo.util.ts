import { GESTGO_THEME_LS, normalizeThemeKey } from '../services/user-appearance.sync';

/** Ficheiros em `assets/logo/` alinhados aos temas da UI (modo «Topo e marca»). */
const THEME_LOGO_FILE: Record<string, string> = {
  'gestgo-blue': 'logo-azul.png',
  'ocean-blue': 'logo-ocean.png',
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

/**
 * Logo na faixa da marca: com `shell-preset-tinted`, usa variante colorida do tema; caso contrário `logo.png`.
 */
export function resolveSidebarLogoSrc(): string {
  if (typeof document === 'undefined') {
    return '/assets/logo/logo.png';
  }
  const tinted = document.body.classList.contains('shell-preset-tinted');
  if (!tinted) {
    return '/assets/logo/logo.png';
  }
  let themeKey = '';
  for (const c of Array.from(document.body.classList)) {
    if (c.startsWith('theme-')) {
      themeKey = normalizeThemeKey(c.slice('theme-'.length));
      break;
    }
  }
  if (!themeKey) {
    try {
      const ls = localStorage.getItem(GESTGO_THEME_LS);
      if (ls) themeKey = normalizeThemeKey(ls);
    } catch {
      /* ignore */
    }
  }
  if (!themeKey) {
    themeKey = 'ocean-blue';
  }
  const file = THEME_LOGO_FILE[themeKey] ?? 'logo.png';
  return `/assets/logo/${file}`;
}
