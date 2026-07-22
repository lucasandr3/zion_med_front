import { Component, OnDestroy, OnInit, inject, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Subscription, debounceTime, distinctUntilChanged } from 'rxjs';
import { NovidadesService, ReleaseNote } from '../../core/services/novidades.service';
import { LoadingService } from '../../shared/services/loading.service';
import { ZmSkeletonListComponent } from '../../shared/components/skeletons';
import { SearchBoxComponent, UpEmptyStateComponent } from '../../shared/components/up';
import { ZardBadgeComponent } from '@/shared/components/badge/badge.component';

@Component({
  selector: 'app-pagina-novidades',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    ZmSkeletonListComponent,
    SearchBoxComponent,
    UpEmptyStateComponent,
    ZardBadgeComponent,
  ],
  templateUrl: './novidades.component.html',
  styleUrl: './novidades.component.css',
})
export class NovidadesComponent implements OnInit, OnDestroy {
  notas: ReleaseNote[] = [];
  readonly buscaControl = new FormControl('', { nonNullable: true });
  paginaAtual = 1;
  ultimaPagina = 1;
  total = 0;
  showSkeleton!: Signal<boolean>;
  listaPronta = false;
  erro = '';
  carregandoMais = false;

  private novidadesService = inject(NovidadesService);
  private loadingService = inject(LoadingService);
  private buscaSub?: Subscription;

  get busca(): string {
    return this.buscaControl.value;
  }

  get buscaAtiva(): boolean {
    return this.busca.trim().length > 0;
  }

  get notaRecente(): ReleaseNote | null {
    if (this.buscaAtiva || this.notas.length === 0) return null;
    return this.notas[0];
  }

  get notasAnteriores(): ReleaseNote[] {
    if (this.buscaAtiva || this.notas.length <= 1) return [];
    return this.notas.slice(1);
  }

  get podeCarregarMais(): boolean {
    return this.paginaAtual < this.ultimaPagina;
  }

  ngOnInit(): void {
    this.buscaSub = this.buscaControl.valueChanges.pipe(debounceTime(350), distinctUntilChanged()).subscribe(() => {
      this.carregar(true);
    });
    this.carregar(true);
  }

  ngOnDestroy(): void {
    this.buscaSub?.unsubscribe();
  }

  carregar(reset: boolean): void {
    const pagina = reset ? 1 : this.paginaAtual + 1;
    const termo = this.busca.trim() || undefined;

    if (reset) {
      const { data$, showSkeleton } = this.loadingService.loadWithThreshold(
        this.novidadesService.list(pagina, termo),
      );
      this.showSkeleton = showSkeleton;
      data$.subscribe({
        next: (res) => this.aplicarResposta(res, reset),
        error: () => {
          this.listaPronta = true;
          this.erro = 'Não foi possível carregar as novidades.';
        },
      });
      return;
    }

    this.carregandoMais = true;
    this.novidadesService.list(pagina, termo).subscribe({
      next: (res) => this.aplicarResposta(res, reset),
      error: () => {
        this.carregandoMais = false;
        this.erro = 'Não foi possível carregar mais versões.';
      },
    });
  }

  private aplicarResposta(
    res: { data: ReleaseNote[]; meta?: { current_page: number; last_page: number; total: number } },
    reset: boolean,
  ): void {
    this.listaPronta = true;
    this.carregandoMais = false;
    this.erro = '';
    const novos = res.data ?? [];
    this.notas = reset ? novos : [...this.notas, ...novos];
    this.paginaAtual = res.meta?.current_page ?? 1;
    this.ultimaPagina = res.meta?.last_page ?? 1;
    this.total = res.meta?.total ?? this.notas.length;

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
