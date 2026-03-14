import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface PlataformaHeaderOverride {
  titulo: string;
  subtitulo: string | null;
}

/**
 * Permite que páginas filhas do layout plataforma (ex.: detalhe do tenant)
 * definam título e subtítulo do header dinamicamente.
 */
@Injectable({ providedIn: 'root' })
export class PlataformaHeaderService {
  private readonly override$ = new BehaviorSubject<PlataformaHeaderOverride | null>(null);

  getOverride() {
    return this.override$.asObservable();
  }

  setHeader(titulo: string, subtitulo: string | null = null): void {
    this.override$.next({ titulo, subtitulo });
  }

  clearHeader(): void {
    this.override$.next(null);
  }
}
