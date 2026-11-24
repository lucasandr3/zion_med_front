import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnInit,
  Signal,
  inject,
  signal,
} from '@angular/core';
import {
  PlataformaService,
  PlatformMessageTemplateRow,
} from '../../../core/services/plataforma.service';
import { ConfirmDialogService } from '../../../core/services/confirm-dialog.service';
import { ToastService } from '../../../core/services/toast.service';
import { LoadingService } from '../../../shared/services/loading.service';
import { ListSkeletonComponent } from '../../../shared/components/list-skeleton/list-skeleton.component';
import { ZmPageBackLinkComponent } from '../../../shared/components/ui';

@Component({
  selector: 'app-plataforma-relacionamento-modelos',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'n-page-list' },
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [ListSkeletonComponent, ZmPageBackLinkComponent],
  templateUrl: './plataforma-relacionamento-modelos.component.html',
  styleUrl: './plataforma-relacionamento-modelos.component.css',
})
export class PlataformaRelacionamentoModelosComponent implements OnInit {
  showSkeleton!: Signal<boolean>;
  readonly listaPronta = signal(false);
  readonly error = signal('');
  readonly acting = signal(false);
  readonly items = signal<PlatformMessageTemplateRow[]>([]);
  readonly editing = signal(false);
  readonly editId = signal<number | null>(null);
  readonly name = signal('');
  readonly category = signal('leads');
  readonly subject = signal('');
  readonly body = signal('');
  readonly variables = signal('');
  readonly status = signal('active');

  private plataformaService = inject(PlataformaService);
  private loadingService = inject(LoadingService);
  private toast = inject(ToastService);
  private confirm = inject(ConfirmDialogService);

  ngOnInit(): void {
    this.carregar();
  }

  carregar(): void {
    const { data$, showSkeleton } = this.loadingService.loadWithThreshold(
      this.plataformaService.getRelationshipTemplates(),
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
        this.error.set('Não foi possível carregar os modelos.');
      },
    });
  }

  novo(): void {
    this.editing.set(true);
    this.editId.set(null);
    this.name.set('');
    this.category.set('leads');
    this.subject.set('');
    this.body.set('');
    this.variables.set('');
    this.status.set('active');
  }

  editar(item: PlatformMessageTemplateRow): void {
    this.editing.set(true);
    this.editId.set(item.id);
    this.name.set(item.name);
    this.category.set(item.category || 'leads');
    this.subject.set(item.subject || '');
    this.body.set(item.body || '');
    this.variables.set((item.variables_json ?? []).join(', '));
    this.status.set(item.status || 'active');
  }

  cancelar(): void {
    this.editing.set(false);
  }

  salvar(): void {
    const name = this.name().trim();
    const body = this.body().trim();
    if (!name || !body) {
      this.toast.error('Campos', 'Informe nome e corpo.');
      return;
    }
    const variables_json = this.variables()
      .split(',')
      .map((v) => v.trim())
      .filter(Boolean);
    const payload = {
      name,
      channel: 'email',
      category: this.category().trim() || undefined,
      subject: this.subject().trim() || undefined,
      body,
      variables_json,
      status: this.status(),
    };
    this.acting.set(true);
    const id = this.editId();
    const req = id
      ? this.plataformaService.updateRelationshipTemplate(id, payload)
      : this.plataformaService.createRelationshipTemplate(payload);
    req.subscribe({
      next: () => {
        this.acting.set(false);
        this.editing.set(false);
        this.toast.success('Salvo', 'Modelo atualizado.');
        this.carregar();
      },
      error: () => {
        this.acting.set(false);
        this.toast.error('Erro', 'Não foi possível salvar o modelo.');
      },
    });
  }

  async pausar(item: PlatformMessageTemplateRow): Promise<void> {
    const ok = await this.confirm.request({
      title: 'Pausar modelo',
      message: `Pausar "${item.name}"?`,
      confirmLabel: 'Pausar',
    });
    if (!ok) return;
    this.acting.set(true);
    this.plataformaService.pauseRelationshipTemplate(item.id).subscribe({
      next: () => {
        this.acting.set(false);
        this.toast.success('Pausado', 'Modelo pausado.');
        this.carregar();
      },
      error: () => {
        this.acting.set(false);
        this.toast.error('Erro', 'Não foi possível pausar.');
      },
    });
  }

  async ativar(item: PlatformMessageTemplateRow): Promise<void> {
    this.acting.set(true);
    this.plataformaService.activateRelationshipTemplate(item.id).subscribe({
      next: () => {
        this.acting.set(false);
        this.toast.success('Ativado', 'Modelo ativo.');
        this.carregar();
      },
      error: () => {
        this.acting.set(false);
        this.toast.error('Erro', 'Não foi possível ativar.');
      },
    });
  }

  formatarData(value?: string | null): string {
    if (!value) return '—';
    try {
      return new Date(value).toLocaleString('pt-BR');
    } catch {
      return value;
    }
  }

  onName(e: Event): void {
    this.name.set((e.target as HTMLInputElement).value);
  }
  onCategory(e: Event): void {
    this.category.set((e.target as HTMLInputElement).value);
  }
  onSubject(e: Event): void {
    this.subject.set((e.target as HTMLInputElement).value);
  }
  onBody(e: Event): void {
    this.body.set((e.target as HTMLTextAreaElement).value);
  }
  onVariables(e: Event): void {
    this.variables.set((e.target as HTMLInputElement).value);
  }
  onStatus(e: Event): void {
    this.status.set((e.target as HTMLSelectElement).value);
  }
}
