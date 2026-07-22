import { Component, OnDestroy, OnInit, inject, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NovidadesService, ReleaseNote, ReleaseNoteItem, ReleaseNoteItemType } from '../../../core/services/novidades.service';
import { PlataformaHeaderService } from '../../../core/services/plataforma-header.service';
import { LoadingService } from '../../../shared/services/loading.service';
import { ZmSkeletonListComponent } from '../../../shared/components/skeletons';
import { BadgeComponent, ZionEmptyStateComponent } from '../../../shared/components/zion';
import { ToastService } from '../../../core/services/toast.service';
import { ConfirmDialogService } from '../../../core/services/confirm-dialog.service';

interface FormItem {
  type: ReleaseNoteItemType;
  text: string;
}

@Component({
  selector: 'app-plataforma-novidades',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    ZmSkeletonListComponent,
    BadgeComponent,
    ZionEmptyStateComponent,
  ],
  templateUrl: './plataforma-novidades.component.html',
  styleUrl: './plataforma-novidades.component.css',
})
export class PlataformaNovidadesComponent implements OnInit, OnDestroy {
  showSkeleton!: Signal<boolean>;
  listaPronta = false;
  erro = false;
  notas: ReleaseNote[] = [];
  excluindoId: number | null = null;
  salvando = false;
  editandoId: number | null = null;
  exibirFormulario = false;

  formVersion = '';
  formTitle = '';
  formSummary = '';
  formReleasedAt = '';
  formPublished = true;
  formItems: FormItem[] = [{ type: 'feature', text: '' }];

  readonly tipos: { value: ReleaseNoteItemType; label: string }[] = [
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
        this.listaPronta = true;
        this.erro = false;
        this.notas = res.data ?? [];
      },
      error: () => {
        this.listaPronta = true;
        this.erro = true;
      },
    });
  }

  abrirNovo(): void {
    this.editandoId = null;
    this.exibirFormulario = true;
    this.formVersion = '';
    this.formTitle = '';
    this.formSummary = '';
    this.formReleasedAt = new Date().toISOString().slice(0, 10);
    this.formPublished = true;
    this.formItems = [{ type: 'feature', text: '' }];
  }

  editar(nota: ReleaseNote): void {
    this.editandoId = nota.id;
    this.exibirFormulario = true;
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
    this.exibirFormulario = false;
    this.editandoId = null;
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

    this.salvando = true;
    const wasEditing = this.editandoId != null;
    const req = this.editandoId
      ? this.novidadesService.updatePlatform(this.editandoId, payload)
      : this.novidadesService.createPlatform(payload);

    req.subscribe({
      next: () => {
        this.salvando = false;
        this.exibirFormulario = false;
        this.editandoId = null;
        this.carregar();
        this.toast.success('Novidades', wasEditing ? 'Release atualizada.' : 'Release publicada.');
      },
      error: () => {
        this.salvando = false;
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

    this.excluindoId = nota.id;
    this.novidadesService.deletePlatform(nota.id).subscribe({
      next: () => {
        this.excluindoId = null;
        this.carregar();
        this.toast.success('Removida', `Release v${nota.version} excluída.`);
      },
      error: () => {
        this.excluindoId = null;
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
