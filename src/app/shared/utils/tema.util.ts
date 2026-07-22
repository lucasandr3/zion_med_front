import { Injectable, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type ColorScheme = 'light' | 'dark';

const KEY_COLOR_SCHEME = 'color-scheme';
const KEY_COLOR_THEME = 'color-theme';
/** Alinhada ao `index.html` (boot script) e ao restante do app (drawer, configurações). */
const KEY_DARK_MODE = 'gestgo_dark_mode';

/**
 * Tema Gestgo — modo claro/escuro real, com persistência em `localStorage`
 * e sincronização de `html.dark` + `body.dark` (compatível com o boot script do `index.html`).
 */
@Injectable({
  providedIn: 'root',
})
export class TemaUtil {
  private readonly platformId = inject(PLATFORM_ID);

  readonly colorScheme = signal<ColorScheme>('light');
  readonly colorTheme = signal('padrao');
  readonly isDark = computed(() => this.colorScheme() === 'dark');

  constructor() {
    this.initialize();
  }

  initialize(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    if (!localStorage.getItem(KEY_COLOR_THEME)) {
      localStorage.setItem(KEY_COLOR_THEME, 'padrao');
    }

    if (localStorage.getItem(KEY_COLOR_SCHEME) == null) {
      const legacyDark = localStorage.getItem(KEY_DARK_MODE) === '1';
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      localStorage.setItem(KEY_COLOR_SCHEME, legacyDark || prefersDark ? 'dark' : 'light');
    }

    this.configureDarkMode();
  }

  configureDarkMode(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const scheme = (localStorage.getItem(KEY_COLOR_SCHEME) as ColorScheme | null) ?? 'light';
    let theme = localStorage.getItem(KEY_COLOR_THEME) ?? 'padrao';
    if (theme === 'undefined') {
      theme = 'padrao';
    }

    const isDark = scheme === 'dark';
    this.colorScheme.set(isDark ? 'dark' : 'light');
    this.colorTheme.set(theme);

    document.documentElement.classList.toggle('dark', isDark);
    document.body.classList.toggle('dark', isDark);
    document.documentElement.setAttribute('color-theme', theme);
    document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';

    try {
      localStorage.setItem(KEY_DARK_MODE, isDark ? '1' : '0');
    } catch {}

    const metaColorScheme = document.querySelector('meta[name="color-scheme"]');
    if (metaColorScheme) {
      metaColorScheme.setAttribute('content', isDark ? 'dark' : 'light');
    }

    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', isDark ? '#121212' : '#0d2833');
    }
  }

  getColorScheme(): ColorScheme {
    return this.colorScheme();
  }

  setColorScheme(colorScheme: ColorScheme | ''): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    if (!colorScheme) {
      localStorage.removeItem(KEY_COLOR_SCHEME);
    } else {
      localStorage.setItem(KEY_COLOR_SCHEME, colorScheme);
    }
    this.configureDarkMode();
  }

  toggleColorScheme(): void {
    this.setColorScheme(this.isDark() ? 'light' : 'dark');
  }

  getColorTheme(): string {
    return this.colorTheme();
  }

  setColorTheme(colorTheme: string): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    if (!colorTheme) {
      localStorage.removeItem(KEY_COLOR_THEME);
    } else {
      localStorage.setItem(KEY_COLOR_THEME, colorTheme);
    }
    this.configureDarkMode();
  }

  /** Aplica um template no formato `l-padrao` / `d-padrao` (letra = esquema; resto = tema de cor). */
  applyThemeTemplate(temaUsuario: string | null | undefined): void {
    if (!temaUsuario) return;

    const [letra, colorTheme] = temaUsuario.split('-');
    const colorScheme: ColorScheme = letra === 'd' ? 'dark' : 'light';

    if (colorTheme && isPlatformBrowser(this.platformId)) {
      localStorage.setItem(KEY_COLOR_THEME, colorTheme);
    }

    this.setColorScheme(colorScheme);
  }
}
