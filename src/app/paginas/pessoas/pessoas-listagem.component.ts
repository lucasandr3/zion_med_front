import { Component, OnInit, OnDestroy, inject, Signal, ViewChild, TemplateRef, ViewContainerRef } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PessoasService, Pessoa } from '../../core/services/pessoas.service';
import { LoadingService } from '../../shared/services/loading.service';
import { ZmSkeletonListComponent } from '../../shared/components/skeletons';
import { ZmPaginationComponent, ZmEmptyStateComponent } from '../../shared/components/ui';
import { ZardCardComponent } from '@/shared/components/card/card.component';
import { ZardButtonComponent } from '@/shared/components/button/button.component';
import { ZardBadgeComponent } from '@/shared/components/badge/badge.component';
import { ZardSheetService } from '@/shared/components/sheet/sheet.service';
import type { ZardSheetRef } from '@/shared/components/sheet/sheet-ref';

import { FlatpickrDirective } from 'angularx-flatpickr';

import { ZardComboboxComponent, type ZardComboboxOption } from '@/shared/components/combobox';
import { ZardTableImports } from '@/shared/components/table';
import { ZARD_FORM_CONTROL_IMPORTS } from '@/shared/components/input';
@Component({
  selector: 'app-pessoas-listagem',
  standalone: true,
  imports: [
    ...ZARD_FORM_CONTROL_IMPORTS,
    ...ZardTableImports,
    FlatpickrDirective,
    CommonModule,
    FormsModule,
    RouterLink,
    ZmSkeletonListComponent,
    ZmPaginationComponent,
    ZmEmptyStateComponent,
    ZardCardComponent,
    ZardButtonComponent,
    ZardBadgeComponent,
    ZardComboboxComponent,
  ],
  templateUrl: './pessoas-listagem.component.html',
})
export class PessoasListagemComponent implements OnInit, OnDestroy {
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

  busca = '';
  status: string = '';
  has_protocols: '' | '1' | '0' = '';
  created_from = '';
  created_to = '';
  filterDrawerOpen = false;
  /** Calendário no body para não ser cortado pelo overflow do sheet. */
  flatpickrAppendTo!: HTMLElement;

  @ViewChild('pessoasFiltrosTpl') pessoasFiltrosTpl?: TemplateRef<void>;

  private filtrosSheetRef?: ZardSheetRef<void>;

  private pessoasService = inject(PessoasService);
  private loadingService = inject(LoadingService);
  private router = inject(Router);
  private readonly vcr = inject(ViewContainerRef);
  private readonly zardSheet = inject(ZardSheetService);

  readonly opcoesStatusFiltro: ZardComboboxOption[] = [
    { value: '', label: 'Todas' },
    { value: 'active', label: 'Ativa' },
    { value: 'inactive', label: 'Inativa' },
  ];

  readonly opcoesProtocolosFiltro: ZardComboboxOption[] = [
    { value: '', label: 'Todos' },
    { value: '1', label: 'Com protocolos' },
    { value: '0', label: 'Sem protocolos' },
  ];

  selecionarStatusFiltro(key: string | null): void {
    this.status = key ?? '';
  }

  selecionarProtocolosFiltro(key: string | null): void {
    if (!key) {
      this.has_protocols = '';
      return;
    }
    this.has_protocols = key === '' ? '' : (key as '1' | '0');
  }

  ngOnDestroy(): void {
    this.filtrosSheetRef?.close();
  }
  ngOnInit(): void {
    this.flatpickrAppendTo = document.body;
    this.carregar();
  }

  get temFiltrosAtivos(): boolean {
    return !!(this.status !== '' || this.has_protocols !== '' || this.created_from !== '' || this.created_to !== '');
  }

  get quantidadeFiltrosAtivos(): number {
    let n = 0;
    if (this.status !== '') n++;
    if (this.has_protocols !== '') n++;
    if (this.created_from !== '') n++;
    if (this.created_to !== '') n++;
    return n;
  }

  carregar(page = 1): void {
    const params: Parameters<PessoasService['list']>[0] = { per_page: 20, page };
    if (this.busca?.trim()) params.search = this.busca.trim();
    if (this.status) params.status = this.status;
    if (this.has_protocols !== '') params.has_protocols = this.has_protocols;
    if (this.created_from) params.created_from = this.created_from;
    if (this.created_to) params.created_to = this.created_to;

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
    this.filtrosSheetRef?.close();
  }

  limparFiltros(): void {
    this.status = '';
    this.has_protocols = '';
    this.created_from = '';
    this.created_to = '';
    this.carregar(1);
    this.filtrosSheetRef?.close();
  }

  openFilterDrawer(): void {
    if (this.filtrosSheetRef) {
      this.filtrosSheetRef.close();
      return;
    }
    if (!this.pessoasFiltrosTpl) {
      return;
    }
    this.filterDrawerOpen = true;
    this.filtrosSheetRef = this.zardSheet.create<void, void>({
      zContent: this.pessoasFiltrosTpl,
      zViewContainerRef: this.vcr,
      zSide: 'right',
      zSize: 'lg',
      zTitle: 'Filtros',
      zHideFooter: true,
      zOkText: null,
      zCancelText: null,
      zAfterClose: () => {
        this.filtrosSheetRef = undefined;
        this.filterDrawerOpen = false;
      },
    });
  }

  irParaDetalhe(p: Pessoa, event: Event): void {
    if ((event.target as HTMLElement).closest('a, button')) return;
    this.router.navigate(['/pessoas', p.id]);
  }

  dataFormatada(val: string | undefined | null): string {
    if (!val) return '—';
    const d = new Date(val);
    if (isNaN(d.getTime())) return val;
    return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  }

  formatarDataCurta(val: string | undefined | null): string {
    if (!val) return '—';
    const d = new Date(val);
    if (isNaN(d.getTime())) return val;
    return d.toLocaleDateString('pt-BR');
  }

  contagemTexto(): string {
    const n = this.meta.total;
    return n === 1 ? '1 registro' : `${n} registros`;
  }
}
