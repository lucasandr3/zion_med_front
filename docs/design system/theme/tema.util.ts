import { Injectable, computed, signal } from '@angular/core';

export type ColorScheme = 'light' | 'dark';

/**
 * Tema Gestgo — modo claro/escuro com persistência em localStorage.
 */
@Injectable({
  providedIn: 'root',
})
export class TemaUtil {
  private readonly keyColorSchemeLocalStorage = 'color-scheme';
  private readonly keyColorThemeLocalStorage = 'color-theme';

  readonly colorScheme = signal<ColorScheme>('light');
  readonly colorTheme = signal('padrao');
  readonly isDark = computed(() => this.colorScheme() === 'dark');

  constructor() {
    this.initialize();
  }

  initialize(): void {
    if (!localStorage.getItem(this.keyColorThemeLocalStorage)) {
      localStorage.setItem(this.keyColorThemeLocalStorage, 'padrao');
    }

    if (!localStorage.getItem(this.keyColorSchemeLocalStorage)) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      localStorage.setItem(this.keyColorSchemeLocalStorage, prefersDark ? 'dark' : 'light');
    }

    this.configureDarkMode();
  }

  configureDarkMode(): void {
    const scheme =
      (localStorage.getItem(this.keyColorSchemeLocalStorage) as ColorScheme | null) ?? 'light';
    let theme = localStorage.getItem(this.keyColorThemeLocalStorage) ?? 'padrao';

    if (theme === 'undefined') {
      theme = 'padrao';
    }

    this.colorScheme.set(scheme === 'dark' ? 'dark' : 'light');
    this.colorTheme.set(theme);

    const isDark = this.colorScheme() === 'dark';
    document.documentElement.classList.toggle('dark', isDark);
    document.documentElement.setAttribute('color-theme', theme);
    document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';

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
    if (!colorScheme) {
      localStorage.removeItem(this.keyColorSchemeLocalStorage);
    } else {
      localStorage.setItem(this.keyColorSchemeLocalStorage, colorScheme);
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
    if (!colorTheme) {
      localStorage.removeItem(this.keyColorThemeLocalStorage);
    } else {
      localStorage.setItem(this.keyColorThemeLocalStorage, colorTheme);
    }
    this.configureDarkMode();
  }

  applyThemeTemplate(temaUsuario: string | null | undefined): void {
    if (!temaUsuario) return;

    const [letra, colorTheme] = temaUsuario.split('-');
    const colorScheme: ColorScheme = letra === 'l' ? 'light' : 'dark';

    if (colorTheme) {
      localStorage.setItem(this.keyColorThemeLocalStorage, colorTheme);
    }
    localStorage.setItem(this.keyColorSchemeLocalStorage, colorScheme);

    this.configureDarkMode();
  }
}
