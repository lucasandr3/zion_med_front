import { FormularioPublicoData } from '../../core/services/formulario-publico.service';
import { normalizeThemeKey } from '../../core/services/user-appearance.sync';

const DEFAULT_ACCENT = '#0a0a0a';

/** Presets alinhados ao `ThemeService` do backend. */
const PUBLIC_THEME_ACCENT: Record<string, string> = {
  'gestgo-blue': '#1e40af',
  'ocean-blue': '#2563eb',
  'indigo-night': '#4f46e5',
  'emerald-fresh': '#10b981',
  'rose-elegant': '#f43f5e',
  'amber-warm': '#f59e0b',
  'violet-dream': '#8b5cf6',
  'teal-ocean': '#14b8a6',
  'slate-pro': '#475569',
  'cyan-tech': '#06b6d4',
  'fuchsia-bold': '#d946ef',
  'onyx-black': '#1a1410',
  custom: '#c9a84c',
};

function isValidHex(hex: string | null | undefined): hex is string {
  return !!hex && /^#[0-9a-fA-F]{6}$/.test(hex.trim());
}

/** Cor de destaque resolvida para CSS (preset, custom ou accent_hex da API). */
export function resolveFormularioPublicoAccent(data: FormularioPublicoData | null | undefined): string {
  const fromApi = data?.accent_hex?.trim();
  if (isValidHex(fromApi)) {
    return fromApi.toLowerCase();
  }

  const theme = normalizeThemeKey(String(data?.form_public_theme ?? data?.public_theme ?? ''));
  if (!theme) {
    return DEFAULT_ACCENT;
  }

  if (theme === 'custom') {
    const custom = data?.form_accent_hex?.trim();
    if (isValidHex(custom)) {
      return custom.toLowerCase();
    }
    return PUBLIC_THEME_ACCENT['custom'];
  }

  return PUBLIC_THEME_ACCENT[theme] ?? DEFAULT_ACCENT;
}

/** Variáveis CSS aplicadas na página pública do formulário. */
export function buildFormularioPublicoThemeVars(data: FormularioPublicoData | null | undefined): Record<string, string> {
  const accent = resolveFormularioPublicoAccent(data);
  const hasCustomAccent = accent !== DEFAULT_ACCENT;

  return {
    '--fp-brand-400': accent,
    '--fp-brand-500': accent,
    '--fp-brand-600': accent,
    '--fp-accent-contrast': '#ffffff',
    ...(hasCustomAccent ? { '--fp-branded': '1' } : {}),
  };
}

export function formularioPublicoHasBranding(data: FormularioPublicoData | null | undefined): boolean {
  const theme = data?.form_public_theme ?? data?.public_theme;
  return resolveFormularioPublicoAccent(data) !== DEFAULT_ACCENT || !!theme;
}
