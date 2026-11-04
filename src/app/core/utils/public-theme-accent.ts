import { TEMAS } from '../../componentes/layout/shell-theme.config';
import { normalizeThemeKey } from '../services/user-appearance.sync';

const THEME_ACCENT: Record<string, string> = Object.fromEntries(
  TEMAS.map((t) => [t.key, t.color]),
);

/** Temas só de páginas públicas (alinhados ao ThemeService do backend). */
THEME_ACCENT['onyx-black'] = '#1a1410';
THEME_ACCENT['custom'] = '#c9a84c';

function isValidHex(hex: string | null | undefined): hex is string {
  return !!hex && /^#[0-9A-Fa-f]{6}$/.test(hex.trim());
}

/**
 * Resolve a cor de destaque pública (Link Bio / agenda / formulário).
 * Prefere `accent_hex` já resolvido pela API; senão usa o preset de `public_theme`.
 */
export function resolvePublicAccentHex(
  publicTheme: string | null | undefined,
  accentHex: string | null | undefined,
): string | null {
  if (isValidHex(accentHex)) {
    return accentHex.trim().toLowerCase();
  }

  const theme = normalizeThemeKey(String(publicTheme ?? '').trim());
  if (!theme) return null;

  if (theme === 'custom') {
    return THEME_ACCENT['custom'];
  }

  return THEME_ACCENT[theme] ?? null;
}

/** Tom claro sólido (meta theme-color não aceita color-mix). */
export function solidBrandSoft(hex: string, towardWhite = 0.88): string {
  const raw = hex.trim().replace('#', '');
  if (!/^[0-9A-Fa-f]{6}$/.test(raw)) return '#f6f9f6';
  const n = parseInt(raw, 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  const mix = (c: number) => Math.round(c + (255 - c) * towardWhite);
  return `#${[mix(r), mix(g), mix(b)].map((x) => x.toString(16).padStart(2, '0')).join('')}`;
}
