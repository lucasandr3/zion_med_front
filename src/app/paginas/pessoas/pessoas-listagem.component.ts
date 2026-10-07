import { Component, OnInit, OnDestroy, inject, Signal, ViewChild, TemplateRef, ViewContainerRef, ChangeDetectionStrategy, signal, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PessoasService, Pessoa } from '../../core/services/pessoas.service';
import { LoadingService } from '../../shared/services/loading.service';
import { ListSkeletonComponent } from '../../shared/components/list-skeleton/list-skeleton.component';
import { ZmPaginationComponent } from '../../shared/components/ui';
import { GestgoSheetService } from '@/shared/components/sheet/sheet.service';
import type { GestgoSheetRef } from '@/shared/components/sheet/sheet-ref';
import { GestgoComboboxComponent, type GestgoComboboxOption } from '@/shared/components/combobox';
import { NORD_FORM_IMPORTS } from '@/shared/nord';
@Component({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-pessoas-listagem',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'n-page-list' },
  imports: [
    ...NORD_FORM_IMPORTS,
    FormsModule,
    RouterLink,
    ListSkeletonComponent,
    ZmPaginationComponent,
    GestgoComboboxComponent],
  templateUrl: './pessoas-listagem.component.html',
})
export class PessoasListagemComponent implements OnInit, OnDestroy {
  readonly pessoas = signal<Pessoa[]>([]);
  readonly meta = signal<{ current_page: number; last_page: number; per_page: number; total: number }>({
    current_page: 1,
    last_page: 1,
    per_page: 20,
    total: 0,
  });
  showSkeleton!: Signal<boolean>;
  readonly listaPronta = signal(false);
  readonly erro = signal('');

  busca = '';
  status: string = '';
  has_protocols: '' | '1' | '0' = '';
  created_from = '';
  created_to = '';
  readonly filterDrawerOpen = signal(false);

  @ViewChild('pessoasFiltrosTpl') pessoasFiltrosTpl?: TemplateRef<void>;

  private filtrosSheetRef?: GestgoSheetRef<void>;

  private pessoasService = inject(PessoasService);
  private loadingService = inject(LoadingService);
  private router = inject(Router);
  private readonly vcr = inject(ViewContainerRef);
  private readonly gestgoSheet = inject(GestgoSheetService);

  readonly opcoesStatusFiltro = signal<GestgoComboboxOption[]>([
    { value: '', label: 'Todas' },
    { value: 'active', label: 'Ativa' },
    { value: 'inactive', label: 'Inativa' }]);

  readonly opcoesProtocolosFiltro = signal<GestgoComboboxOption[]>([
    { value: '', label: 'Todos' },
    { value: '1', label: 'Com protocolos' },
    { value: '0', label: 'Sem protocolos' }]);

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
        this.listaPronta.set(true);
        this.pessoas.set(res.data);
        this.meta.set(res.meta);
      },
      error: () => {
        this.listaPronta.set(true);
        this.erro.set('Não foi possível carregar as pessoas.');
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
    this.filterDrawerOpen.set(true);
    this.filtrosSheetRef = this.gestgoSheet.create<void, void>({
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
        this.filterDrawerOpen.set(false);
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
    const n = this.meta().total;
    return n === 1 ? '1 registro' : `${n} registros`;
  }
}
