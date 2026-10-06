import { Component, OnDestroy, OnInit, inject, Signal, ChangeDetectionStrategy, signal, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, Subscription, debounceTime, distinctUntilChanged } from 'rxjs';
import { NovidadesService, ReleaseNote } from '../../core/services/novidades.service';
import { LoadingService } from '../../shared/services/loading.service';
import { ZmSkeletonListComponent } from '../../shared/components/skeletons';
import { ZmEmptyStateComponent } from '../../shared/components/ui';
import { GestgoBadgeComponent } from '@/shared/components/badge/badge.component';

import { NORD_FORM_IMPORTS } from '@/shared/nord';

@Component({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-pagina-novidades',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'n-page' },
  imports: [
    CommonModule,
    FormsModule,
    ...NORD_FORM_IMPORTS,
    ZmSkeletonListComponent,
    ZmEmptyStateComponent,
    GestgoBadgeComponent
  ],
  templateUrl: './novidades.component.html',
  styleUrl: './novidades.component.css',
})
export class NovidadesComponent implements OnInit, OnDestroy {
  readonly notas = signal<ReleaseNote[]>([]);
  busca = '';
  readonly paginaAtual = signal(1);
  readonly ultimaPagina = signal(1);
  readonly total = signal(0);
  showSkeleton!: Signal<boolean>;
  readonly listaPronta = signal(false);
  readonly erro = signal('');
  readonly carregandoMais = signal(false);

  private novidadesService = inject(NovidadesService);
  private loadingService = inject(LoadingService);
  private buscaSubject = new Subject<string>();
  private buscaSub?: Subscription;

  get buscaAtiva(): boolean {
    return this.busca.trim().length > 0;
  }

  get notaRecente(): ReleaseNote | null {
    if (this.buscaAtiva || this.notas().length === 0) return null;
    return this.notas()[0];
  }

  get notasAnteriores(): ReleaseNote[] {
    if (this.buscaAtiva || this.notas().length <= 1) return [];
    return this.notas().slice(1);
  }

  get podeCarregarMais(): boolean {
    return this.paginaAtual() < this.ultimaPagina();
  }

  ngOnInit(): void {
    this.buscaSub = this.buscaSubject.pipe(debounceTime(350), distinctUntilChanged()).subscribe(() => {
      this.carregar(true);
    });
    this.carregar(true);
  }

  ngOnDestroy(): void {
    this.buscaSub?.unsubscribe();
  }

  onBuscaChange(): void {
    this.buscaSubject.next(this.busca.trim());
  }

  limparBusca(): void {
    if (!this.busca) return;
    this.busca = '';
    this.carregar(true);
  }

  carregar(reset: boolean): void {
    const pagina = reset ? 1 : this.paginaAtual() + 1;
    const termo = this.busca.trim() || undefined;

    if (reset) {
      const { data$, showSkeleton } = this.loadingService.loadWithThreshold(
        this.novidadesService.list(pagina, termo),
      );
      this.showSkeleton = showSkeleton;
      data$.subscribe({
        next: (res) => this.aplicarResposta(res, reset),
        error: () => {
          this.listaPronta.set(true);
          this.erro.set('Não foi possível carregar as novidades.');
        },
      });
      return;
    }

    this.carregandoMais.set(true);
    this.novidadesService.list(pagina, termo).subscribe({
      next: (res) => this.aplicarResposta(res, reset),
      error: () => {
        this.carregandoMais.set(false);
        this.erro.set('Não foi possível carregar mais versões.');
      },
    });
  }

  private aplicarResposta(
    res: { data: ReleaseNote[]; meta?: { current_page: number; last_page: number; total: number } },
    reset: boolean,
  ): void {
    this.listaPronta.set(true);
    this.carregandoMais.set(false);
    this.erro.set('');
    const novos = res.data ?? [];
    this.notas.set(reset ? novos : [...this.notas(), ...novos]);
    this.paginaAtual.set(res.meta?.current_page ?? 1);
    this.ultimaPagina.set(res.meta?.last_page ?? 1);
    this.total.set(res.meta?.total ?? this.notas().length);

    if (reset) {
      this.novidadesService.markLatestAsSeen().subscribe({ error: () => {} });
    }
  }

  formatarData(iso: string): string {
    const d = new Date(iso + 'T12:00:00');
    if (Number.isNaN(d.getTime())) return iso;
    return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
  }

  formatarDataCurta(iso: string): string {
    const d = new Date(iso + 'T12:00:00');
    if (Number.isNaN(d.getTime())) return iso;
    return d.toLocaleDateString('pt-BR');
  }

  labelTipo(type: string): string {
    return this.novidadesService.labelTipo(type as 'feature' | 'improvement' | 'fix');
  }

  iconeTipo(type: string): string {
    const icons: Record<string, string> = {
      feature: 'new_releases',
      improvement: 'upgrade',
      fix: 'build',
    };
    return icons[type] ?? 'info';
  }

  ehNova(nota: ReleaseNote): boolean {
    return this.novidadesService.isNoteNova(nota);
  }

  contagemItens(nota: ReleaseNote): number {
    return nota.items?.length ?? 0;
  }
}
