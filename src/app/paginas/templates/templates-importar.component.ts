import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  computed,
  inject,
  signal,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subscription, switchMap, takeWhile, timer } from 'rxjs';
import {
  FormImportField,
  FormImportItem,
  FormImportService,
  FormImportSourceKind,
} from '../../core/services/form-import.service';
import { ToastService } from '../../core/services/toast.service';
import { ZmPageBackLinkComponent } from '../../shared/components/ui/zm-page-back-link.component';
import { GestgoCardComponent } from '@/shared/components/card/card.component';

type ImportStep = 0 | 1 | 2 | 3;

interface StepMeta {
  index: ImportStep;
  title: string;
  subtitle: string;
}

const STEPS: StepMeta[] = [
  { index: 0, title: 'Enviar arquivo', subtitle: 'Fotos ou PDF' },
  { index: 1, title: 'Processamento', subtitle: 'Estruturar perguntas' },
  { index: 2, title: 'Comparar', subtitle: 'Original × digital' },
  { index: 3, title: 'Revisar', subtitle: 'Editar e finalizar' },
];

@Component({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-templates-importar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'n-page-list' },
  imports: [CommonModule, FormsModule, ZmPageBackLinkComponent, GestgoCardComponent],
  templateUrl: './templates-importar.component.html',
  styleUrl: './templates-importar.component.css',
})
export class TemplatesImportarComponent implements OnDestroy {
  private imports = inject(FormImportService);
  private toast = inject(ToastService);
  private router = inject(Router);
  private sanitizer = inject(DomSanitizer);

  readonly steps = STEPS;
  readonly step = signal<ImportStep>(0);
  readonly dragOver = signal(false);
  readonly enviando = signal(false);
  readonly salvando = signal(false);
  readonly importItem = signal<FormImportItem | null>(null);
  readonly fields = signal<FormImportField[]>([]);
  readonly selectedIndex = signal(0);
  readonly templateName = signal('');
  readonly erro = signal('');
  readonly pendingFileName = signal('');
  readonly pendingFileSize = signal('');
  readonly sourceKind = signal<FormImportSourceKind>('file');
  readonly sourcePreviewSafe = signal<SafeResourceUrl | null>(null);
  readonly sourcePreviewLoading = signal(false);
  readonly zoom = signal(100);
  readonly consentBlankAck = signal(false);

  private pollSub: Subscription | null = null;
  private sourceObjectUrl: string | null = null;
  private localPreviewUrl: string | null = null;

  readonly selectedField = computed(() => {
    const list = this.fields();
    const i = this.selectedIndex();
    return list[i] ?? null;
  });

  readonly progressPct = computed(() => {
    const st = this.importItem()?.status;
    if (this.enviando()) return 18;
    if (st === 'queued') return 35;
    if (st === 'processing') return 72;
    if (st === 'completed' || st === 'committed') return 100;
    if (st === 'failed') return 100;
    return this.step() >= 1 ? 10 : 0;
  });

  readonly processTasks = computed(() => {
    const st = this.importItem()?.status;
    const doneQueued = !!st && st !== 'queued';
    const doneProcessing = st === 'completed' || st === 'committed';
    const failed = st === 'failed';
    return [
      {
        label: 'Arquivo recebido',
        state: this.enviando() ? 'current' : 'done',
      },
      {
        label: 'Na fila de processamento',
        state: failed
          ? 'done'
          : st === 'queued'
            ? 'current'
            : doneQueued
              ? 'done'
              : 'pending',
      },
      {
        label: 'Extração de campos (OpenAI)',
        state: failed
          ? 'done'
          : st === 'processing'
            ? 'current'
            : doneProcessing
              ? 'done'
              : 'pending',
      },
      {
        label: 'Resultado pronto para comparação',
        state: failed ? 'pending' : doneProcessing ? 'done' : 'pending',
      },
    ] as const;
  });

  readonly statusLabel = computed(() => {
    if (this.enviando()) return 'Enviando arquivo…';
    const st = this.importItem()?.status;
    switch (st) {
      case 'queued':
        return 'Na fila…';
      case 'processing':
        return 'Extraindo campos com a OpenAI…';
      case 'completed':
        return 'Pronto para comparar';
      case 'failed':
        return 'Falhou';
      case 'committed':
        return 'Salvo como modelo';
      default:
        return st || '—';
    }
  });

  readonly canGoCompare = computed(
    () => this.importItem()?.status === 'completed' || this.importItem()?.status === 'committed',
  );

  readonly canGoReview = computed(() => this.canGoCompare() && this.fields().length > 0);

  ngOnDestroy(): void {
    this.pollSub?.unsubscribe();
    this.clearAllPreviews();
  }

  stepState(index: ImportStep): 'active' | 'done' | 'idle' {
    const current = this.step();
    if (index === current) return 'active';
    if (index < current) return 'done';
    return 'idle';
  }

  stepDisabled(index: ImportStep): boolean {
    if (index === 0) return false;
    if (index === 1) return !this.enviando() && !this.importItem();
    if (index === 2) return !this.canGoCompare();
    return !this.canGoReview();
  }

  gotoStep(index: ImportStep): void {
    if (this.stepDisabled(index)) return;
    if (index === 0) {
      this.step.set(0);
      return;
    }
    if (index === 1) {
      this.step.set(1);
      return;
    }
    if (index === 2) {
      this.step.set(2);
      this.ensureSourcePreview();
      return;
    }
    this.step.set(3);
  }

  onDragOver(ev: DragEvent): void {
    ev.preventDefault();
    this.dragOver.set(true);
  }

  onDragLeave(ev: DragEvent): void {
    ev.preventDefault();
    this.dragOver.set(false);
  }

  onDrop(ev: DragEvent): void {
    ev.preventDefault();
    this.dragOver.set(false);
    if (!this.consentBlankAck()) {
      this.erro.set('Confirme que o arquivo é uma ficha em branco, sem dados de paciente.');
      return;
    }
    const file = ev.dataTransfer?.files?.[0];
    if (file) this.startUpload(file);
  }

  onFileSelected(ev: Event): void {
    const input = ev.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = '';
    if (!this.consentBlankAck()) {
      this.erro.set('Confirme que o arquivo é uma ficha em branco, sem dados de paciente.');
      return;
    }
    if (file) this.startUpload(file);
  }

  restart(): void {
    this.pollSub?.unsubscribe();
    this.clearAllPreviews();
    this.step.set(0);
    this.enviando.set(false);
    this.salvando.set(false);
    this.importItem.set(null);
    this.fields.set([]);
    this.selectedIndex.set(0);
    this.templateName.set('');
    this.erro.set('');
    this.pendingFileName.set('');
    this.pendingFileSize.set('');
    this.sourceKind.set('file');
    this.zoom.set(100);
    this.consentBlankAck.set(false);
  }

  continueToCompare(): void {
    if (!this.canGoCompare()) return;
    this.step.set(2);
    this.ensureSourcePreview();
  }

  continueToReview(): void {
    if (!this.canGoReview()) return;
    this.step.set(3);
  }

  zoomIn(): void {
    this.zoom.update((z) => Math.min(160, z + 10));
  }

  zoomOut(): void {
    this.zoom.update((z) => Math.max(70, z - 10));
  }

  selectField(i: number): void {
    this.selectedIndex.set(i);
  }

  updateSelected(patch: Partial<FormImportField>): void {
    const i = this.selectedIndex();
    this.fields.update((list) => list.map((f, idx) => (idx === i ? { ...f, ...patch } : f)));
  }

  optionsText(): string {
    return (this.selectedField()?.options ?? []).join('\n');
  }

  setOptionsText(value: string): void {
    const options = value
      .split(/\r?\n/)
      .map((s) => s.trim())
      .filter(Boolean);
    this.updateSelected({ options });
  }

  removeSelected(): void {
    const i = this.selectedIndex();
    this.fields.update((list) => list.filter((_, idx) => idx !== i));
    this.selectedIndex.set(Math.max(0, i - 1));
  }

  addField(): void {
    const n = this.fields().length + 1;
    this.fields.update((list) => [
      ...list,
      {
        type: 'text',
        label: `Novo campo ${n}`,
        name_key: `campo_${n}`,
        required: false,
        options: [],
        sort_order: n,
        page: 1,
      },
    ]);
    this.selectedIndex.set(Math.max(0, this.fields().length - 1));
  }

  salvarRascunho(): void {
    const item = this.importItem();
    if (!item) return;
    this.salvando.set(true);
    this.imports.saveDraft(item.id, this.fields()).subscribe({
      next: (updated) => {
        this.salvando.set(false);
        this.importItem.set(updated);
        this.toast.success('Rascunho salvo', 'Você pode continuar a revisão depois.');
      },
      error: (err: unknown) => {
        this.salvando.set(false);
        const msg = (err as { error?: { message?: string } })?.error?.message || 'Falha ao salvar.';
        this.toast.error('Erro', msg);
      },
    });
  }

  salvarModelo(): void {
    const item = this.importItem();
    if (!item) return;
    this.salvando.set(true);
    this.imports
      .commit(item.id, { name: this.templateName() || undefined, fields: this.fields() })
      .subscribe({
        next: (res) => {
          this.salvando.set(false);
          this.toast.success('Modelo criado', 'Revise os campos e publique o link quando estiver pronto.');
          void this.router.navigate(['/templates', res.template.id, 'campos']);
        },
        error: (err: unknown) => {
          this.salvando.set(false);
          const msg =
            (err as { error?: { message?: string } })?.error?.message || 'Falha ao salvar modelo.';
          this.toast.error('Erro', msg);
        },
      });
  }

  formatBytes(size: number | null | undefined): string {
    if (!size || size <= 0) return '';
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  }

  private startUpload(file: File): void {
    this.erro.set('');
    this.pollSub?.unsubscribe();
    this.clearAllPreviews();
    this.setLocalPreview(file);
    this.pendingFileName.set(file.name);
    this.pendingFileSize.set(this.formatBytes(file.size));
    this.sourceKind.set(this.kindFromFile(file));
    this.enviando.set(true);
    this.step.set(1);
    this.templateName.set(file.name.replace(/\.[^.]+$/, ''));

    this.imports.create(file, undefined, true).subscribe({
      next: (item) => {
        this.enviando.set(false);
        this.importItem.set(item);
        if (item.source_kind) this.sourceKind.set(item.source_kind);
        if (item.status === 'completed') {
          this.applyFields(item);
          this.step.set(2);
          this.ensureSourcePreview();
          return;
        }
        if (item.status === 'failed') {
          this.erro.set(item.error_message || 'Falha ao processar o arquivo.');
          return;
        }
        this.startPolling(item.id);
      },
      error: (err: unknown) => {
        this.enviando.set(false);
        this.step.set(0);
        const msg =
          (err as { error?: { message?: string } })?.error?.message ||
          'Não foi possível enviar o arquivo.';
        this.erro.set(msg);
        this.toast.error('Erro', msg);
      },
    });
  }

  private startPolling(id: number): void {
    this.pollSub?.unsubscribe();
    this.pollSub = timer(0, 1500)
      .pipe(
        switchMap(() => this.imports.get(id)),
        takeWhile((item) => item.status === 'queued' || item.status === 'processing', true),
      )
      .subscribe({
        next: (item) => {
          this.importItem.set(item);
          if (item.source_kind) this.sourceKind.set(item.source_kind);
          if (item.status === 'completed') {
            this.applyFields(item);
            this.step.set(2);
            this.ensureSourcePreview();
          } else if (item.status === 'failed') {
            this.erro.set(item.error_message || 'Falha ao processar o arquivo.');
            this.toast.error('Processamento', this.erro());
          }
        },
        error: () => {
          this.erro.set('Não foi possível acompanhar o processamento.');
        },
      });
  }

  private applyFields(item: FormImportItem): void {
    const list = item.reviewed_schema?.fields ?? item.extracted_schema?.fields ?? [];
    this.fields.set(list.map((f, i) => ({ ...f, sort_order: f.sort_order ?? i + 1, page: f.page ?? 1 })));
    this.selectedIndex.set(0);
  }

  private ensureSourcePreview(): void {
    if (this.sourcePreviewSafe() || this.sourcePreviewLoading()) return;
    const item = this.importItem();
    if (!item?.has_source) {
      // keep local preview if available
      return;
    }
    this.sourcePreviewLoading.set(true);
    this.imports.getSourceBlob(item.id).subscribe({
      next: (blob) => {
        this.revokeLocalPreview();
        if (this.sourceObjectUrl) {
          URL.revokeObjectURL(this.sourceObjectUrl);
          this.sourceObjectUrl = null;
        }
        this.sourceObjectUrl = URL.createObjectURL(blob);
        this.sourcePreviewSafe.set(
          this.sanitizer.bypassSecurityTrustResourceUrl(this.sourceObjectUrl),
        );
        this.sourcePreviewLoading.set(false);
      },
      error: () => {
        this.sourcePreviewLoading.set(false);
        // local preview already set from upload when possible
      },
    });
  }

  private setLocalPreview(file: File): void {
    this.revokeLocalPreview();
    const kind = this.kindFromFile(file);
    if (kind === 'image' || kind === 'pdf') {
      this.localPreviewUrl = URL.createObjectURL(file);
      this.sourcePreviewSafe.set(
        this.sanitizer.bypassSecurityTrustResourceUrl(this.localPreviewUrl),
      );
    } else {
      this.sourcePreviewSafe.set(null);
    }
  }

  private kindFromFile(file: File): FormImportSourceKind {
    const mime = (file.type || '').toLowerCase();
    const name = file.name.toLowerCase();
    if (mime.startsWith('image/') || /\.(png|jpe?g|webp)$/.test(name)) return 'image';
    if (mime === 'application/pdf' || name.endsWith('.pdf')) return 'pdf';
    if (mime.startsWith('text/') || name.endsWith('.txt')) return 'text';
    return 'file';
  }

  private revokeLocalPreview(): void {
    if (this.localPreviewUrl) {
      URL.revokeObjectURL(this.localPreviewUrl);
      this.localPreviewUrl = null;
    }
  }

  private clearAllPreviews(): void {
    if (this.sourceObjectUrl) {
      URL.revokeObjectURL(this.sourceObjectUrl);
      this.sourceObjectUrl = null;
    }
    this.revokeLocalPreview();
    this.sourcePreviewSafe.set(null);
    this.sourcePreviewLoading.set(false);
  }
}
