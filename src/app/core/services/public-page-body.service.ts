import { Injectable, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

/**
 * Rotas públicas (/l/:slug, /f/:token, /a/:slug, …) não devem herdar `body.dark` do painel:
 * o Tailwind usa `dark:` com ancestral `.dark`, o que quebra tema claro do Link Bio / formulário.
 * Também guarda/restaura o `theme-color` da barra do navegador no mobile e impede que
 * `syncThemeChrome` (tema do painel) sobrescreva a cor da página pública.
 *
 * No Chrome Android, só alterar `content` às vezes não atualiza a status bar —
 * por isso removemos e recriamos o(s) meta theme-color.
 */
@Injectable({ providedIn: 'root' })
export class PublicPageBodyService {
  private document = inject(DOCUMENT);
  private refCount = 0;
  private hadBodyDark = false;
  private savedThemeColor: string | null = null;
  private savedBodyBg: string | null = null;
  private savedHtmlBg: string | null = null;
  /** Cor vigente enquanto a página pública está ativa. */
  private lockedThemeColor: string | null = null;

  /** Há rota pública montada (Link Bio, agenda, formulário…). */
  get isActive(): boolean {
    return this.refCount > 0;
  }

  enterPublicPage(): void {
    const body = this.document?.body;
    if (!body) return;
    if (this.refCount === 0) {
      this.hadBodyDark = body.classList.contains('dark');
      if (this.hadBodyDark) {
        body.classList.remove('dark');
      }
      const existing = this.document.querySelector('meta[name="theme-color"]');
      this.savedThemeColor = existing?.getAttribute('content') ?? null;
      this.savedBodyBg = body.style.backgroundColor || null;
      this.savedHtmlBg = this.document.documentElement.style.backgroundColor || null;
      this.document.documentElement.setAttribute('data-public-page', '1');
      // Layout premium: fundo da página (não o --c-bg do painel)
      this.applyPageBackground('#eff4f1');
    }
    this.refCount++;
  }

  leavePublicPage(): void {
    const body = this.document?.body;
    if (!body) return;
    this.refCount = Math.max(0, this.refCount - 1);
    if (this.refCount === 0) {
      this.lockedThemeColor = null;
      this.document.documentElement.removeAttribute('data-public-page');
      this.document.documentElement.removeAttribute('data-theme-color');
      this.document.documentElement.style.removeProperty('--public-chrome-color');
      this.document.documentElement.classList.remove('gestgo-public-page-dark');
      if (this.savedBodyBg != null) {
        body.style.backgroundColor = this.savedBodyBg;
      } else {
        body.style.removeProperty('background-color');
      }
      if (this.savedHtmlBg != null) {
        this.document.documentElement.style.backgroundColor = this.savedHtmlBg;
      } else {
        this.document.documentElement.style.removeProperty('background-color');
      }
      this.savedBodyBg = null;
      this.savedHtmlBg = null;
      if (this.hadBodyDark) {
        body.classList.add('dark');
        this.hadBodyDark = false;
      }
      this.restoreThemeColor();
    }
  }

  /** Fundo html/body da rota pública (branco ou escuro neutro — sem tinta do tema). */
  applyPageBackground(color: string): void {
    const normalized = this.normalizeHex(color);
    if (!normalized || !this.document?.body) return;
    this.document.body.style.backgroundColor = normalized;
    this.document.documentElement.style.backgroundColor = normalized;
    this.document.documentElement.classList.toggle(
      'gestgo-public-page-dark',
      normalized === '#101713' || normalized === '#0a0a0a',
    );
  }

  /** Cor da status bar / chrome mobile (meta theme-color) + barra de progresso. */
  setThemeColor(color: string): void {
    const normalized = this.normalizeHex(color);
    if (!normalized) return;
    if (this.refCount > 0) {
      this.lockedThemeColor = normalized;
      this.document.documentElement.setAttribute('data-theme-color', normalized);
      this.document.documentElement.style.setProperty('--public-chrome-color', normalized);
    }
    this.applyThemeColor(normalized);
  }

  private normalizeHex(color: string): string | null {
    const trimmed = (color || '').trim();
    if (!trimmed) return null;
    if (/^#([0-9A-Fa-f]{6})$/.test(trimmed)) return trimmed.toLowerCase();
    if (/^#([0-9A-Fa-f]{3})$/.test(trimmed)) {
      const h = trimmed.slice(1);
      return `#${h[0]}${h[0]}${h[1]}${h[1]}${h[2]}${h[2]}`.toLowerCase();
    }
    return null;
  }

  /**
   * Reaplica a cor travada da página pública (ex.: após `syncThemeChrome` do painel).
   */
  reapplyLockedThemeColor(): void {
    const fromAttr = this.document.documentElement.getAttribute('data-theme-color');
    const color = this.lockedThemeColor || fromAttr;
    if (this.refCount <= 0 || !color) return;
    this.applyThemeColor(color);
  }

  private applyThemeColor(color: string): void {
    const head = this.document?.head;
    if (!head) return;
    // Chrome Android: recriar o meta força a status bar a atualizar
    head.querySelectorAll('meta[name="theme-color"]').forEach((el) => el.remove());
    const meta = this.document.createElement('meta');
    meta.setAttribute('name', 'theme-color');
    meta.setAttribute('content', color);
    head.appendChild(meta);
  }

  private restoreThemeColor(): void {
    if (this.savedThemeColor == null) return;
    this.applyThemeColor(this.savedThemeColor);
    this.savedThemeColor = null;
  }
}
