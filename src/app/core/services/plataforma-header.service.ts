import { Injectable, Injector, inject, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';

export interface PlataformaHeaderOverride {
  titulo: string;
  subtitulo: string | null;
}

/**
 * Permite que páginas filhas do layout plataforma definam título/subtítulo do header.
 */
@Injectable({ providedIn: 'root' })
export class PlataformaHeaderService {
  private readonly injector = inject(Injector);
  private readonly overrideSignal = signal<PlataformaHeaderOverride | null>(null);

  readonly override = this.overrideSignal.asReadonly();

  /** Compatível com subscribers legados; preferir `override()` em código novo. */
  getOverride() {
    return toObservable(this.overrideSignal, { injector: this.injector });
  }

  setHeader(titulo: string, subtitulo: string | null = null): void {
    this.overrideSignal.set({ titulo, subtitulo });
  }

  clearHeader(): void {
    this.overrideSignal.set(null);
  }
}
