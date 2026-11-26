import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnInit,
  Signal,
  inject,
  signal,
} from '@angular/core';
import { PlataformaService, PlatformCannedReplyRow } from '../../../core/services/plataforma.service';
import { ToastService } from '../../../core/services/toast.service';
import { LoadingService } from '../../../shared/services/loading.service';
import { ListSkeletonComponent } from '../../../shared/components/list-skeleton/list-skeleton.component';
import { ZmPageBackLinkComponent } from '../../../shared/components/ui';

@Component({
  selector: 'app-plataforma-respostas-prontas',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'n-page-list' },
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [ListSkeletonComponent, ZmPageBackLinkComponent],
  templateUrl: './plataforma-respostas-prontas.component.html',
  styleUrl: './plataforma-respostas-prontas.component.css',
})
export class PlataformaRespostasProntasComponent implements OnInit {
  showSkeleton!: Signal<boolean>;
  readonly listaPronta = signal(false);
  readonly error = signal('');
  readonly acting = signal(false);
  readonly items = signal<PlatformCannedReplyRow[]>([]);
  readonly editing = signal(false);
  readonly editId = signal<number | null>(null);
  readonly title = signal('');
  readonly body = signal('');
  readonly category = signal('geral');
  readonly shortcut = signal('');
  readonly sortOrder = signal(0);

  private plataforma = inject(PlataformaService);
  private loadingService = inject(LoadingService);
  private toast = inject(ToastService);

  ngOnInit(): void {
    this.carregar();
  }

  carregar(): void {
    const { data$, showSkeleton } = this.loadingService.loadWithThreshold(
      this.plataforma.getPlatformCannedReplies(false),
    );
    this.showSkeleton = showSkeleton;
    data$.subscribe({
      next: (res) => {
        this.listaPronta.set(true);
        this.error.set('');
        this.items.set(res.data ?? []);
      },
      error: () => {
        this.listaPronta.set(true);
        this.error.set('Não foi possível carregar as respostas prontas.');
      },
    });
  }

  novo(): void {
    this.editing.set(true);
    this.editId.set(null);
    this.title.set('');
    this.body.set('');
    this.category.set('geral');
    this.shortcut.set('');
    this.sortOrder.set(0);
  }

  editar(item: PlatformCannedReplyRow): void {
    this.editing.set(true);
    this.editId.set(item.id);
    this.title.set(item.title);
    this.body.set(item.body);
    this.category.set(item.category || 'geral');
    this.shortcut.set(item.shortcut || '');
    this.sortOrder.set(item.sort_order ?? 0);
  }

  cancelar(): void {
    this.editing.set(false);
  }

  salvar(): void {
    const title = this.title().trim();
    const body = this.body().trim();
    if (!title || !body) {
      this.toast.error('Campos', 'Informe título e corpo.');
      return;
    }
    const payload = {
      title,
      body,
      category: this.category().trim() || undefined,
      shortcut: this.shortcut().trim() || undefined,
      sort_order: Number(this.sortOrder()) || 0,
      active: true,
    };
    this.acting.set(true);
    const id = this.editId();
    const req = id
      ? this.plataforma.updatePlatformCannedReply(id, payload)
      : this.plataforma.createPlatformCannedReply(payload);
    req.subscribe({
      next: () => {
        this.acting.set(false);
        this.editing.set(false);
        this.toast.success('Salvo', 'Resposta pronta atualizada.');
        this.carregar();
      },
      error: () => {
        this.acting.set(false);
        this.toast.error('Erro', 'Não foi possível salvar.');
      },
    });
  }

  ativar(item: PlatformCannedReplyRow): void {
    this.acting.set(true);
    this.plataforma.activatePlatformCannedReply(item.id).subscribe({
      next: () => {
        this.acting.set(false);
        this.toast.success('Ativa', 'Resposta disponível no inbox.');
        this.carregar();
      },
      error: () => {
        this.acting.set(false);
        this.toast.error('Erro', 'Falha ao ativar.');
      },
    });
  }

  desativar(item: PlatformCannedReplyRow): void {
    this.acting.set(true);
    this.plataforma.deactivatePlatformCannedReply(item.id).subscribe({
      next: () => {
        this.acting.set(false);
        this.toast.success('Desativada', 'Resposta ocultada do inbox.');
        this.carregar();
      },
      error: () => {
        this.acting.set(false);
        this.toast.error('Erro', 'Falha ao desativar.');
      },
    });
  }

  onTitle(e: Event): void {
    this.title.set((e.target as HTMLInputElement).value);
  }
  onBody(e: Event): void {
    this.body.set((e.target as HTMLTextAreaElement).value);
  }
  onCategory(e: Event): void {
    this.category.set((e.target as HTMLInputElement).value);
  }
  onShortcut(e: Event): void {
    this.shortcut.set((e.target as HTMLInputElement).value);
  }
  onSort(e: Event): void {
    this.sortOrder.set(Number((e.target as HTMLInputElement).value) || 0);
  }
}
