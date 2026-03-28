/** Chaves alinhadas ao cabeçalho e ao `index.html`. */
export const GESTGO_THEME_LS = 'gestgo_theme';
export const GESTGO_DARK_LS = 'gestgo_dark_mode';

export interface UserAppearanceFields {
  ui_theme?: string | null;
  ui_dark_mode?: boolean | null;
}

/**
 * Aplica tema/modo no `document.body` e no localStorage.
 * Valores `null`/`undefined` são ignorados (mantém o que já está no browser).
 */
export function applyUserAppearanceToBrowser(fields: UserAppearanceFields): void {
  if (typeof document === 'undefined' || typeof localStorage === 'undefined') return;

  const theme = fields.ui_theme;
  if (theme != null && theme !== '') {
    const list = Array.from(document.body.classList).filter((c) => c.startsWith('theme-'));
    list.forEach((c) => document.body.classList.remove(c));
    document.body.classList.add('theme-' + theme);
    try {
      localStorage.setItem(GESTGO_THEME_LS, theme);
    } catch {}
  }

  if (fields.ui_dark_mode !== null && fields.ui_dark_mode !== undefined) {
    document.body.classList.toggle('dark', fields.ui_dark_mode);
    try {
      localStorage.setItem(GESTGO_DARK_LS, fields.ui_dark_mode ? '1' : '0');
    } catch {}
  }
}
