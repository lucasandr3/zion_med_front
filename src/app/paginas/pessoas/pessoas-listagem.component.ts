import { Component, OnInit, inject, Signal, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PessoasService, Pessoa } from '../../core/services/pessoas.service';
import { LoadingService } from '../../shared/services/loading.service';
import { ZmSkeletonListComponent } from '../../shared/components/skeletons';
import { ZmPaginationComponent } from '../../shared/components/ui';
import {
  SearchBoxComponent,
  DataTableComponent,
  BadgeComponent,
  UpEmptyStateComponent,
  ListFiltersPanelComponent,
} from '../../shared/components/up';
import { MAT_FORM_IMPORTS } from '@/shared/material';
import { OpenPickerOnInteractDirective } from '@/shared/directives/open-picker-on-interact.directive';
import { formatDateToYmd } from '@/shared/utils/date-time.util';

@Component({
  selector: 'app-pessoas-listagem',
  standalone: true,
  imports: [
    ...MAT_FORM_IMPORTS,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    MatButtonModule,
    MatIconModule,
    ZmSkeletonListComponent,
    ZmPaginationComponent,
    SearchBoxComponent,
    DataTableComponent,
    BadgeComponent,
    UpEmptyStateComponent,
    ListFiltersPanelComponent,
    OpenPickerOnInteractDirective,
  ],
  templateUrl: './pessoas-listagem.component.html',
})
export class PessoasListagemComponent implements OnInit {
  pessoas: Pessoa[] = [];
  meta: { current_page: number; last_page: number; per_page: number; total: number } = {
    current_page: 1,
    last_page: 1,
    per_page: 20,
    total: 0,
  };
  showSkeleton!: Signal<boolean>;
  listaPronta = false;
  erro = '';

  readonly buscaControl = new FormControl('', { nonNullable: true });
  status = '';
  has_protocols: '' | '1' | '0' = '';
  createdFromDate: Date | null = null;
  createdToDate: Date | null = null;
  readonly filtersOpen = signal(false);

  private pessoasService = inject(PessoasService);
  private loadingService = inject(LoadingService);
  private router = inject(Router);

  ngOnInit(): void {
    this.carregar();
  }

  get temFiltrosAtivos(): boolean {
    return !!(this.status !== '' || this.has_protocols !== '' || this.createdFromDate || this.createdToDate);
  }

  toggleFilters(): void {
    this.filtersOpen.update((open) => !open);
  }

  closeFilters(): void {
    this.filtersOpen.set(false);
  }

  buscar(): void {
    this.carregar(1);
  }

  carregar(page = 1): void {
    const params: Parameters<PessoasService['list']>[0] = { per_page: 20, page };
    const busca = this.buscaControl.value?.trim();
    if (busca) params.search = busca;
    if (this.status) params.status = this.status;
    if (this.has_protocols !== '') params.has_protocols = this.has_protocols;
    const createdFrom = formatDateToYmd(this.createdFromDate);
    const createdTo = formatDateToYmd(this.createdToDate);
    if (createdFrom) params.created_from = createdFrom;
    if (createdTo) params.created_to = createdTo;

    const { data$, showSkeleton } = this.loadingService.loadWithThreshold(this.pessoasService.list(params));
    this.showSkeleton = showSkeleton;
    data$.subscribe({
      next: (res) => {
        this.listaPronta = true;
        this.pessoas = res.data;
        this.meta = res.meta;
      },
      error: () => {
        this.listaPronta = true;
        this.erro = 'Não foi possível carregar as pessoas.';
      },
    });
  }

  aplicarFiltros(): void {
    this.carregar(1);
    this.closeFilters();
  }

  limparFiltros(): void {
    this.status = '';
    this.has_protocols = '';
    this.createdFromDate = null;
    this.createdToDate = null;
    this.carregar(1);
    this.closeFilters();
  }

  irParaDetalhe(p: Pessoa, event: Event): void {
    if ((event.target as HTMLElement).closest('a, button')) return;
    this.router.navigate(['/pessoas', p.id]);
  }

  dataFormatada(val: string | undefined | null): string {
    if (!val) return '—';
    const d = new Date(val);
    if (isNaN(d.getTime())) return val;
    return d.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  formatarDataCurta(val: string | undefined | null): string {
    if (!val) return '—';
    const d = new Date(val);
    if (isNaN(d.getTime())) return val;
    return d.toLocaleDateString('pt-BR');
  }
}
