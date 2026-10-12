import { Component, OnDestroy, OnInit, inject, Signal, ChangeDetectionStrategy, signal, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NovidadesService, ReleaseNote, ReleaseNoteItem, ReleaseNoteItemType } from '../../../core/services/novidades.service';
import { PlataformaHeaderService } from '../../../core/services/plataforma-header.service';
import { LoadingService } from '../../../shared/services/loading.service';
import { ZmSkeletonListComponent } from '../../../shared/components/skeletons';
import { ZmEmptyStateComponent } from '../../../shared/components/ui';

import { GestgoBadgeComponent } from '@/shared/components/badge/badge.component';
import { GestgoComboboxComponent, type GestgoComboboxOption } from '@/shared/components/combobox';
import { NORD_FORM_IMPORTS } from '@/shared/nord';
import { ToastService } from '../../../core/services/toast.service';
import { ConfirmDialogService } from '../../../core/services/confirm-dialog.service';

interface FormItem {
  type: ReleaseNoteItemType;
  text: string;
}

@Component({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-plataforma-novidades',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    ZmSkeletonListComponent,
    ZmEmptyStateComponent,
    GestgoBadgeComponent,
    GestgoComboboxComponent,
    ...NORD_FORM_IMPORTS],
  templateUrl: './plataforma-novidades.component.html',
  styleUrl: './plataforma-novidades.component.css',
})
export class PlataformaNovidadesComponent implements OnInit, OnDestroy {
  showSkeleton!: Signal<boolean>;
  readonly listaPronta = signal(false);
  readonly erro = signal(false);
  readonly notas = signal<ReleaseNote[]>([]);
  readonly excluindoId = signal<number | null>(null);
  readonly salvando = signal(false);
  readonly editandoId = signal<number | null>(null);
  readonly exibirFormulario = signal(false);

  formVersion = '';
  formTitle = '';
  formSummary = '';
  formReleasedAt = '';
  formPublished = true;
  formItems: FormItem[] = [{ type: 'feature', text: '' }];

  readonly tipos: GestgoComboboxOption[] = [
    { value: 'feature', label: 'Novidade' },
    { value: 'improvement', label: 'Melhoria' },
    { value: 'fix', label: 'Correção' },
  ];

  private novidadesService = inject(NovidadesService);
  private headerService = inject(PlataformaHeaderService);
  private loadingService = inject(LoadingService);
  private toast = inject(ToastService);
  private confirm = inject(ConfirmDialogService);

  ngOnInit(): void {
    this.headerService.setHeader(
      'Novidades e versão',
      'Publique o changelog de cada release para os usuários do Gestgo.',
    );
    this.carregar();
  }

  ngOnDestroy(): void {
    this.headerService.clearHeader();
  }

  carregar(): void {
    const { data$, showSkeleton } = this.loadingService.loadWithThreshold(this.novidadesService.listPlatform());
    this.showSkeleton = showSkeleton;
    data$.subscribe({
      next: (res) => {
        this.listaPronta.set(true);
        this.erro.set(false);
        this.notas.set(res.data ?? []);
      },
      error: () => {
        this.listaPronta.set(true);
        this.erro.set(true);
      },
    });
  }

  abrirNovo(): void {
    this.editandoId.set(null);
    this.exibirFormulario.set(true);
    this.formVersion = '';
    this.formTitle = '';
    this.formSummary = '';
    this.formReleasedAt = new Date().toISOString().slice(0, 10);
    this.formPublished = true;
    this.formItems = [{ type: 'feature', text: '' }];
  }

  editar(nota: ReleaseNote): void {
    this.editandoId.set(nota.id);
    this.exibirFormulario.set(true);
    this.formVersion = nota.version;
    this.formTitle = nota.title;
    this.formSummary = nota.summary ?? '';
    this.formReleasedAt = nota.released_at;
    this.formPublished = nota.is_published !== false;
    this.formItems = (nota.items ?? []).map((item) => ({ type: item.type, text: item.text }));
    if (this.formItems.length === 0) {
      this.formItems = [{ type: 'feature', text: '' }];
    }
  }

  cancelarFormulario(): void {
    this.exibirFormulario.set(false);
    this.editandoId.set(null);
  }

  adicionarItem(): void {
    this.formItems = [...this.formItems, { type: 'feature', text: '' }];
  }

  removerItem(index: number): void {
    if (this.formItems.length <= 1) return;
    this.formItems = this.formItems.filter((_, i) => i !== index);
  }

  salvar(): void {
    const items = this.formItems
      .map((item) => ({ type: item.type, text: item.text.trim() }))
      .filter((item) => item.text.length > 0);

    if (!this.formVersion.trim() || !this.formTitle.trim() || !this.formReleasedAt || items.length === 0) {
      this.toast.error('Campos obrigatórios', 'Preencha versão, título, data e ao menos um item.');
      return;
    }

    const payload = {
      version: this.formVersion.trim(),
      title: this.formTitle.trim(),
      summary: this.formSummary.trim() || null,
      released_at: this.formReleasedAt,
      is_published: this.formPublished,
      items,
    };

    this.salvando.set(true);
    const wasEditing = this.editandoId() != null;
    const editingId = this.editandoId();
    const req = editingId
      ? this.novidadesService.updatePlatform(editingId, payload)
      : this.novidadesService.createPlatform(payload);

    req.subscribe({
      next: () => {
        this.salvando.set(false);
        this.exibirFormulario.set(false);
        this.editandoId.set(null);
        this.carregar();
        this.toast.success('Novidades', wasEditing ? 'Release atualizada.' : 'Release publicada.');
      },
      error: () => {
        this.salvando.set(false);
        this.toast.error('Erro', 'Não foi possível salvar a release.');
      },
    });
  }

  async excluir(nota: ReleaseNote): Promise<void> {
    const ok = await this.confirm.request({
      title: 'Remover release?',
      messageBefore: 'A versão ',
      emphasis: `v${nota.version}`,
      messageAfter: ' será removida permanentemente.',
      confirmLabel: 'Sim, remover',
      variant: 'danger',
    });
    if (!ok) return;

    this.excluindoId.set(nota.id);
    this.novidadesService.deletePlatform(nota.id).subscribe({
      next: () => {
        this.excluindoId.set(null);
        this.carregar();
        this.toast.success('Removida', `Release v${nota.version} excluída.`);
      },
      error: () => {
        this.excluindoId.set(null);
        this.toast.error('Erro', 'Não foi possível remover a release.');
      },
    });
  }

  formatarData(iso: string): string {
    const d = new Date(iso + 'T12:00:00');
    if (Number.isNaN(d.getTime())) return iso;
    return d.toLocaleDateString('pt-BR');
  }

  labelTipo(type: ReleaseNoteItemType): string {
    return this.novidadesService.labelTipo(type);
  }
}
