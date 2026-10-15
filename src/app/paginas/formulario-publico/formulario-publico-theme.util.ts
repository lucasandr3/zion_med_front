import { FormularioPublicoData } from '../../core/services/formulario-publico.service';
import { normalizeThemeKey } from '../../core/services/user-appearance.sync';

/** Verde Gestgo (referência premium) — nunca preto: no escuro CTA/destaques sumiam. */
const DEFAULT_ACCENT = '#0c9368';

/** Presets alinhados ao `ThemeService` do backend (só fichas públicas). */
const FORM_THEME_ACCENT: Record<string, string> = {
  'gestgo-blue': '#1e40af',
  'ocean-blue': '#14B87A',
  'indigo-night': '#4f46e5',
  'emerald-fresh': '#10b981',
  'rose-elegant': '#f43f5e',
  'amber-warm': '#f59e0b',
  'violet-dream': '#6d28d9',
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

/**
 * Tema da ficha pública — independente da Link Bio / agenda.
 * Usa apenas `form_public_theme` + `form_accent_hex` (e `accent_hex` já resolvido pela API da ficha).
 */
export function resolveFormularioPublicoAccent(data: FormularioPublicoData | null | undefined): string {
  const theme = normalizeThemeKey(String(data?.form_public_theme ?? '').trim());
  if (!theme) {
    return DEFAULT_ACCENT;
  }

  if (theme === 'custom') {
    const custom = data?.form_accent_hex?.trim();
    if (isValidHex(custom)) {
      return custom.toLowerCase();
    }
    return FORM_THEME_ACCENT['custom'];
  }

  // accent_hex da API pública da ficha já vem de form_public_theme (não da Link Bio)
  const fromApi = data?.accent_hex?.trim();
  if (isValidHex(fromApi)) {
    return fromApi.toLowerCase();
  }

  return FORM_THEME_ACCENT[theme] ?? DEFAULT_ACCENT;
}

/** Accent muito escuro some no modo escuro — usa tom mais claro para CTAs/destaques. */
function accentForUi(accent: string): string {
  const raw = accent.replace('#', '');
  if (!/^[0-9a-fA-F]{6}$/.test(raw)) return DEFAULT_ACCENT;
  const n = parseInt(raw, 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  // Pretos / onyx / slate muito escuros
  if (luminance < 0.18) return DEFAULT_ACCENT;
  return accent;
}

/** Variáveis CSS aplicadas na página pública do formulário. */
export function buildFormularioPublicoThemeVars(data: FormularioPublicoData | null | undefined): Record<string, string> {
  const resolved = resolveFormularioPublicoAccent(data);
  const accent = accentForUi(resolved);
  const hasCustomAccent =
    !!String(data?.form_public_theme ?? '').trim() ||
    (isValidHex(data?.accent_hex) && data!.accent_hex!.toLowerCase() !== DEFAULT_ACCENT);

  // --fp-brand-soft fica no CSS (claro/escuro); só o accent vem das configs
  return {
    '--fp-brand-400': accent,
    '--fp-brand-500': accent,
    '--fp-brand-600': accent,
    '--n-color-accent': accent,
    '--n-color-accent-hover': accent,
    '--n-color-text-link': accent,
    '--fp-accent-contrast': '#ffffff',
    ...(hasCustomAccent ? { '--fp-branded': '1' } : {}),
  };
}

export function formularioPublicoHasBranding(data: FormularioPublicoData | null | undefined): boolean {
  const theme = String(data?.form_public_theme ?? '').trim();
  if (theme) return true;
  const accent = resolveFormularioPublicoAccent(data);
  return accent !== DEFAULT_ACCENT && accentForUi(accent) === accent;
}
