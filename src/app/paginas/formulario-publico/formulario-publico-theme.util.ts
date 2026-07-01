import { FormularioPublicoData } from '../../core/services/formulario-publico.service';

const DEFAULT_ACCENT = '#0a0a0a';

/** Cor de destaque resolvida para CSS (herda Link Bio / clínica). */
export function resolveFormularioPublicoAccent(data: FormularioPublicoData | null | undefined): string {
  const hex = data?.accent_hex?.trim();
  if (hex && /^#[0-9a-fA-F]{6}$/.test(hex)) {
    return hex.toLowerCase();
  }
  return DEFAULT_ACCENT;
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
