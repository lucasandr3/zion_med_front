import { FormularioPublicoData } from '../../core/services/formulario-publico.service';
import { normalizeThemeKey } from '../../core/services/user-appearance.sync';
import { getGestgoThemePrimary, GESTGO_THEME_TOKENS } from '../../core/theme/gestgo-themes';

const DEFAULT_ACCENT = '#0a0a0a';

/** Presets alinhados à matriz Gestgo (`gestgo-themes.ts` / `theme-palettes.css`). */
const PUBLIC_THEME_ACCENT: Record<string, string> = Object.fromEntries(
  Object.entries(GESTGO_THEME_TOKENS).map(([key, tokens]) => [key, tokens.light.primary]),
);

PUBLIC_THEME_ACCENT['onyx-black'] = '#1a1410';
PUBLIC_THEME_ACCENT['custom'] = '#c9a84c';

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

  return PUBLIC_THEME_ACCENT[theme] ?? getGestgoThemePrimary(theme) ?? DEFAULT_ACCENT;
}

/** Variáveis CSS aplicadas na página pública do formulário. */
export function buildFormularioPublicoThemeVars(data: FormularioPublicoData | null | undefined): Record<string, string> {
  const accent = resolveFormularioPublicoAccent(data);
  const hasCustomAccent = accent !== DEFAULT_ACCENT;
  const theme = normalizeThemeKey(String(data?.form_public_theme ?? data?.public_theme ?? ''));
  const tokens = theme && GESTGO_THEME_TOKENS[theme] ? GESTGO_THEME_TOKENS[theme] : null;
  const onPrimary = tokens?.light.onPrimary ?? '#ffffff';
  const soft = tokens?.light.soft ?? accent;

  return {
    '--fp-brand-400': accent,
    '--fp-brand-500': accent,
    '--fp-brand-600': tokens?.light.primaryHover ?? accent,
    '--fp-accent-contrast': onPrimary,
    '--fp-brand-soft': soft,
    ...(hasCustomAccent ? { '--fp-branded': '1' } : {}),
  };
}

export function formularioPublicoHasBranding(data: FormularioPublicoData | null | undefined): boolean {
  const theme = data?.form_public_theme ?? data?.public_theme;
  return resolveFormularioPublicoAccent(data) !== DEFAULT_ACCENT || !!theme;
}
