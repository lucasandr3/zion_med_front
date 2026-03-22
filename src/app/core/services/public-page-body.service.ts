import { Injectable, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

/**
 * Rotas públicas (/l/:slug, /f/:token, …) não devem herdar `body.dark` do painel:
 * o Tailwind usa `dark:` com ancestral `.dark`, o que quebra tema claro do Link Bio / formulário.
 */
@Injectable({ providedIn: 'root' })
export class PublicPageBodyService {
  private document = inject(DOCUMENT);
  private refCount = 0;
  private hadBodyDark = false;

  enterPublicPage(): void {
    const body = this.document?.body;
    if (!body) return;
    if (this.refCount === 0) {
      this.hadBodyDark = body.classList.contains('dark');
      if (this.hadBodyDark) {
        body.classList.remove('dark');
      }
    }
    this.refCount++;
  }

  leavePublicPage(): void {
    const body = this.document?.body;
    if (!body) return;
    this.refCount = Math.max(0, this.refCount - 1);
    if (this.refCount === 0 && this.hadBodyDark) {
      body.classList.add('dark');
      this.hadBodyDark = false;
    }
  }
}
