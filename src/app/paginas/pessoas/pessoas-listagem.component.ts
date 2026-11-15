import {
  Component,
  OnInit,
  OnDestroy,
  inject,
  ViewChild,
  TemplateRef,
  ViewContainerRef,
  ChangeDetectionStrategy,
  signal,
  CUSTOM_ELEMENTS_SCHEMA,
  DestroyRef,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subject, switchMap, tap, catchError, finalize, of } from 'rxjs';
import { PessoasService, Pessoa } from '../../core/services/pessoas.service';
import { ListSkeletonComponent } from '../../shared/components/list-skeleton/list-skeleton.component';
import { ZmPaginationComponent } from '../../shared/components/ui';
import { GestgoSheetService } from '@/shared/components/sheet/sheet.service';
import type { GestgoSheetRef } from '@/shared/components/sheet/sheet-ref';
import { GestgoComboboxComponent, type GestgoComboboxOption } from '@/shared/components/combobox';
import { NORD_FORM_IMPORTS } from '@/shared/nord';
import { formatarDataBr, formatarDataHoraBr } from '@/shared/utils/date';
import { digitsOnlyCpf, formatCpfDisplay } from '../../core/utils/cpf';

const AVATAR_COLORS = ['#12b886', '#3b82f6', '#a855f7', '#f97316', '#ec4899', '#0ea5a4'];

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
    GestgoComboboxComponent,
  ],
  templateUrl: './pessoas-listagem.component.html',
  styleUrls: ['./pessoas-listagem.component.css'],
})
export class PessoasListagemComponent implements OnInit, OnDestroy {
  readonly pessoas = signal<Pessoa[]>([]);
  readonly meta = signal<{ current_page: number; last_page: number; per_page: number; total: number }>({
    current_page: 1,
    last_page: 1,
    per_page: 20,
    total: 0,
  });
  readonly showSkeleton = signal(false);
  readonly listaPronta = signal(false);
  readonly erro = signal('');
  readonly cpfRevelados = signal<Set<number>>(new Set());

  busca = '';
  status = '';
  has_protocols: '' | '1' | '0' = '';
  created_from = '';
  created_to = '';
  readonly filterDrawerOpen = signal(false);

  @ViewChild('pessoasFiltrosTpl') pessoasFiltrosTpl?: TemplateRef<void>;

  private filtrosSheetRef?: GestgoSheetRef<void>;

  private pessoasService = inject(PessoasService);
  private router = inject(Router);
  private readonly vcr = inject(ViewContainerRef);
  private readonly gestgoSheet = inject(GestgoSheetService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly carregar$ = new Subject<number>();

  readonly opcoesStatusFiltro = signal<GestgoComboboxOption[]>([
    { value: '', label: 'Todas' },
    { value: 'active', label: 'Ativa' },
    { value: 'inactive', label: 'Inativa' },
  ]);

  readonly opcoesProtocolosFiltro = signal<GestgoComboboxOption[]>([
    { value: '', label: 'Todos' },
    { value: '1', label: 'Com protocolos' },
    { value: '0', label: 'Sem protocolos' },
  ]);

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
    this.carregar$
      .pipe(
        switchMap((page) => {
          const params: Parameters<PessoasService['list']>[0] = { per_page: 20, page };
          if (this.busca?.trim()) params.search = this.busca.trim();
          if (this.status) params.status = this.status;
          if (this.has_protocols !== '') params.has_protocols = this.has_protocols;
          if (this.created_from) params.created_from = this.created_from;
          if (this.created_to) params.created_to = this.created_to;

          this.erro.set('');
          this.showSkeleton.set(true);

          return this.pessoasService.list(params).pipe(
            tap((res) => {
              this.listaPronta.set(true);
              this.pessoas.set(res.data);
              this.meta.set(res.meta);
              this.cpfRevelados.set(new Set());
            }),
            catchError(() => {
              this.listaPronta.set(true);
              this.erro.set('Não foi possível carregar as pessoas.');
              return of(null);
            }),
            finalize(() => this.showSkeleton.set(false)),
          );
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();

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
    this.carregar$.next(page);
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

  limparTudo(): void {
    this.busca = '';
    this.limparFiltros();
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
      zSize: 'custom',
      zWidth: 'min(100vw, 24rem)',
      zHeight: '100dvh',
      zTitle: 'Filtros',
      zCustomClasses: 'gestgo-filter-sheet-panel',
      zHideFooter: true,
      zOkText: null,
      zCancelText: null,
      zMaskClosable: true,
      zAfterClose: () => {
        this.filtrosSheetRef = undefined;
        this.filterDrawerOpen.set(false);
      },
    });
  }

  irParaDetalhe(p: Pessoa, event: Event): void {
    if ((event.target as HTMLElement).closest('a, button, nord-button')) return;
    this.router.navigate(['/pessoas', p.id]);
  }

  iniciais(name: string): string {
    return name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((p) => p[0])
      .join('')
      .toUpperCase();
  }

  corAvatar(name: string): string {
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash += name.charCodeAt(i);
    return AVATAR_COLORS[hash % AVATAR_COLORS.length];
  }

  cpfRevelado(id: number): boolean {
    return this.cpfRevelados().has(id);
  }

  cpfMascarado(cpf: string | null | undefined): string {
    const d = digitsOnlyCpf(cpf ?? '');
    if (d.length < 11) return cpf?.trim() || '—';
    return `***.${d.slice(3, 6)}.***-**`;
  }

  cpfVisivel(p: Pessoa): string {
    if (this.cpfRevelado(p.id)) return formatCpfDisplay(digitsOnlyCpf(p.cpf ?? '')) || (p.cpf ?? '—');
    return this.cpfMascarado(p.cpf);
  }

  alternarCpf(p: Pessoa, event: Event): void {
    event.stopPropagation();
    const next = new Set(this.cpfRevelados());
    if (next.has(p.id)) next.delete(p.id);
    else next.add(p.id);
    this.cpfRevelados.set(next);
  }

  dataFormatada(val: string | undefined | null): string {
    return formatarDataHoraBr(val) || '—';
  }

  formatarDataCurta(val: string | undefined | null): string {
    return formatarDataBr(val) || '—';
  }

  contagemTexto(): string {
    const shown = this.pessoas().length;
    const total = this.meta().total;
    if (shown === total) return total === 1 ? '1 pessoa' : `${total} pessoas`;
    return `${shown} de ${total} pessoas`;
  }
}
