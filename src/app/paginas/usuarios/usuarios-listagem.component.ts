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
  computed,
  Signal,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UsuariosService, Usuario } from '../../core/services/usuarios.service';
import { LoadingService } from '../../shared/services/loading.service';
import { ListSkeletonComponent } from '../../shared/components/list-skeleton/list-skeleton.component';
import { AuthService } from '../../core/services/auth.service';
import { ToastService } from '../../core/services/toast.service';
import { ConfirmDialogService } from '../../core/services/confirm-dialog.service';
import { GestgoSheetService } from '@/shared/components/sheet/sheet.service';
import type { GestgoSheetRef } from '@/shared/components/sheet/sheet-ref';
import { GestgoComboboxComponent, type GestgoComboboxOption } from '@/shared/components/combobox';
import { NORD_FORM_IMPORTS } from '@/shared/nord';

const AVATAR_COLORS = ['#12b886', '#3b82f6', '#a855f7', '#f97316', '#ec4899', '#0ea5a4'];

@Component({
  selector: 'app-usuarios-listagem',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  host: { class: 'n-page-list' },
  imports: [
    ...NORD_FORM_IMPORTS,
    FormsModule,
    RouterLink,
    ListSkeletonComponent,
    GestgoComboboxComponent,
  ],
  templateUrl: './usuarios-listagem.component.html',
  styleUrl: './usuarios-listagem.component.css',
})
export class UsuariosListagemComponent implements OnInit, OnDestroy {
  readonly usuarios = signal<Usuario[]>([]);
  showSkeleton!: Signal<boolean>;
  readonly listaPronta = signal(false);
  readonly erro = signal('');
  readonly desativandoId = signal<number | null>(null);
  readonly filterDrawerOpen = signal(false);
  readonly buscaSignal = signal('');
  readonly statusSignal = signal('');
  readonly roleSignal = signal('');

  busca = '';
  status = '';
  role = '';

  @ViewChild('usuariosFiltrosTpl') usuariosFiltrosTpl?: TemplateRef<void>;

  private filtrosSheetRef?: GestgoSheetRef<void>;

  private usuariosService = inject(UsuariosService);
  private loadingService = inject(LoadingService);
  private auth = inject(AuthService);
  private toast = inject(ToastService);
  private confirm = inject(ConfirmDialogService);
  private router = inject(Router);
  private readonly vcr = inject(ViewContainerRef);
  private readonly gestgoSheet = inject(GestgoSheetService);
  private currentUserId: number | null = this.auth.getUser()?.id ?? null;

  readonly opcoesStatusFiltro = signal<GestgoComboboxOption[]>([
    { value: '', label: 'Todas' },
    { value: 'active', label: 'Ativo' },
    { value: 'inactive', label: 'Inativo' },
  ]);

  readonly opcoesRoleFiltro = signal<GestgoComboboxOption[]>([{ value: '', label: 'Todos' }]);

  readonly usuariosFiltrados = computed(() => {
    const q = this.buscaSignal().trim().toLowerCase();
    const status = this.statusSignal();
    const role = this.roleSignal();
    return this.usuarios().filter((u) => {
      if (status === 'active' && !u.active) return false;
      if (status === 'inactive' && u.active) return false;
      if (role && u.role !== role) return false;
      if (!q) return true;
      const hay = `${u.name ?? ''} ${u.email ?? ''} ${u.role_label ?? ''} ${u.role ?? ''}`.toLowerCase();
      return hay.includes(q);
    });
  });

  ngOnInit(): void {
    // Skeleton imediato — evita tela em branco enquanto a API responde
    const { data$, showSkeleton } = this.loadingService.loadWithThreshold(this.usuariosService.list(), 0);
    this.showSkeleton = showSkeleton;
    data$.subscribe({
      next: (list) => {
        this.listaPronta.set(true);
        this.usuarios.set(list);
      },
      error: () => {
        this.listaPronta.set(true);
        this.erro.set('Não foi possível carregar os usuários.');
      },
    });

    this.usuariosService.roles().subscribe({
      next: (roles) => {
        this.opcoesRoleFiltro.set([
          { value: '', label: 'Todos' },
          ...roles.map((r) => ({ value: r.value, label: r.label })),
        ]);
      },
    });
  }

  ngOnDestroy(): void {
    this.filtrosSheetRef?.close();
  }

  get temFiltrosAtivos(): boolean {
    return !!(this.statusSignal() !== '' || this.roleSignal() !== '');
  }

  get quantidadeFiltrosAtivos(): number {
    let n = 0;
    if (this.statusSignal() !== '') n++;
    if (this.roleSignal() !== '') n++;
    return n;
  }

  aplicarBuscaLocal(): void {
    this.buscaSignal.set(this.busca);
  }

  selecionarStatusFiltro(key: string | null): void {
    this.status = key ?? '';
  }

  selecionarRoleFiltro(key: string | null): void {
    this.role = key ?? '';
  }

  aplicarFiltros(): void {
    this.statusSignal.set(this.status);
    this.roleSignal.set(this.role);
    this.filtrosSheetRef?.close();
  }

  limparFiltros(): void {
    this.status = '';
    this.role = '';
    this.statusSignal.set('');
    this.roleSignal.set('');
    this.filtrosSheetRef?.close();
  }

  limparTudo(): void {
    this.busca = '';
    this.buscaSignal.set('');
    this.limparFiltros();
  }

  openFilterDrawer(): void {
    if (this.filtrosSheetRef) {
      this.filtrosSheetRef.close();
      return;
    }
    if (!this.usuariosFiltrosTpl) return;
    this.filterDrawerOpen.set(true);
    this.filtrosSheetRef = this.gestgoSheet.create<void, void>({
      zContent: this.usuariosFiltrosTpl,
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

  irParaEditar(u: Usuario, event: Event): void {
    if ((event.target as HTMLElement).closest('a, button, nord-button')) return;
    this.router.navigate(['/usuarios', u.id, 'editar'], { state: { usuario: u } });
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

  contagemTexto(): string {
    const shown = this.usuariosFiltrados().length;
    const total = this.usuarios().length;
    if (shown === total) return total === 1 ? '1 usuário' : `${total} usuários`;
    return `${shown} de ${total} usuários`;
  }

  podeDesativar(u: Usuario): boolean {
    return !!u.active && (!this.currentUserId || u.id !== this.currentUserId);
  }

  async desativar(u: Usuario): Promise<void> {
    if (!this.podeDesativar(u)) return;
    const ok = await this.confirm.request({
      title: 'Desativar usuário?',
      messageBefore: 'O usuário ',
      emphasis: u.name ?? u.email ?? String(u.id),
      messageAfter: ' será desativado e perderá o acesso.',
      confirmLabel: 'Sim, desativar',
      variant: 'danger',
    });
    if (!ok) return;
    this.desativandoId.set(u.id);
    this.usuariosService.delete(u.id).subscribe({
      next: () => {
        this.desativandoId.set(null);
        this.usuarios.set(this.usuarios().filter((x) => x.id !== u.id));
        this.toast.success('Usuário desativado', 'O acesso foi revogado.');
      },
      error: () => {
        this.desativandoId.set(null);
        this.erro.set('Não foi possível desativar o usuário.');
        this.toast.error('Erro', this.erro());
      },
    });
  }
}
