import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
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

interface PendingFile {
  file: File;
  name: string;
  sizeLabel: string;
  kind: FormImportSourceKind;
  previewUrl: string | null;
}

interface PreviewPage {
  page: number;
  name: string;
  kind: FormImportSourceKind;
  url: SafeResourceUrl;
}

const STEPS: StepMeta[] = [
  { index: 0, title: 'Enviar arquivo', subtitle: 'Fotos ou PDF' },
  { index: 1, title: 'Processamento', subtitle: 'Estruturar perguntas' },
  { index: 2, title: 'Comparar', subtitle: 'Original × digital' },
  { index: 3, title: 'Revisar', subtitle: 'Editar e finalizar' },
];

const MAX_FILES = 10;
const MAX_BYTES = 10 * 1024 * 1024;

@Component({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-templates-importar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'n-page' },
  imports: [CommonModule, FormsModule, ZmPageBackLinkComponent, GestgoCardComponent],
  templateUrl: './templates-importar.component.html',
  styleUrl: './templates-importar.component.css',
})
export class TemplatesImportarComponent implements OnDestroy {
  @ViewChild('fileInput') private fileInput?: ElementRef<HTMLInputElement>;

  private imports = inject(FormImportService);
  private toast = inject(ToastService);
  private router = inject(Router);
  private sanitizer = inject(DomSanitizer);

  readonly steps = STEPS;
  readonly maxFiles = MAX_FILES;
  readonly step = signal<ImportStep>(0);
  readonly dragOver = signal(false);
  readonly enviando = signal(false);
  readonly salvando = signal(false);
  readonly importItem = signal<FormImportItem | null>(null);
  readonly fields = signal<FormImportField[]>([]);
  readonly selectedIndex = signal(0);
  readonly templateName = signal('');
  readonly erro = signal('');
  readonly pendingFiles = signal<PendingFile[]>([]);
  readonly sourceKind = signal<FormImportSourceKind>('file');
  readonly previewPages = signal<PreviewPage[]>([]);
  readonly activePreviewPage = signal(1);
  readonly sourcePreviewLoading = signal(false);
  readonly zoom = signal(100);
  readonly consentBlankAck = signal(false);

  private pollSub: Subscription | null = null;
  private serverPreviewUrls: string[] = [];

  readonly selectedField = computed(() => {
    const list = this.fields();
    const i = this.selectedIndex();
    return list[i] ?? null;
  });

  readonly pendingFileName = computed(() => {
    const files = this.pendingFiles();
    if (!files.length) return this.importItem()?.source_original_name || '';
    if (files.length === 1) return files[0].name;
    return `${files.length} fotos · ${files[0].name}`;
  });

  readonly pendingFileSize = computed(() => {
    const files = this.pendingFiles();
    if (!files.length) return this.formatBytes(this.importItem()?.source_size);
    const total = files.reduce((sum, f) => sum + f.file.size, 0);
    return this.formatBytes(total);
  });

  readonly activePreview = computed(() => {
    const pages = this.previewPages();
    const page = this.activePreviewPage();
    return pages.find((p) => p.page === page) ?? pages[0] ?? null;
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
    if (this.enviando()) {
      const n = this.pendingFiles().length;
      return n > 1 ? `Enviando ${n} arquivos…` : 'Enviando arquivo…';
    }
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

  readonly canStartUpload = computed(
    () => this.consentBlankAck() && this.pendingFiles().length > 0 && !this.enviando(),
  );

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

  openFilePicker(): void {
    this.fileInput?.nativeElement?.click();
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
    const list = Array.from(ev.dataTransfer?.files ?? []);
    this.addFiles(list);
  }

  onFileSelected(ev: Event): void {
    const input = ev.target as HTMLInputElement;
    const list = Array.from(input.files ?? []);
    input.value = '';
    this.addFiles(list);
  }

  removePending(index: number): void {
    this.pendingFiles.update((list) => {
      const next = [...list];
      const [removed] = next.splice(index, 1);
      if (removed?.previewUrl) URL.revokeObjectURL(removed.previewUrl);
      return next;
    });
    this.refreshLocalPreviews();
  }

  clearPending(): void {
    for (const item of this.pendingFiles()) {
      if (item.previewUrl) URL.revokeObjectURL(item.previewUrl);
    }
    this.pendingFiles.set([]);
    this.previewPages.set([]);
    this.activePreviewPage.set(1);
    this.erro.set('');
  }

  startUploadFromPending(): void {
    if (!this.canStartUpload()) return;
    this.startUpload(this.pendingFiles().map((p) => p.file));
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
    this.pendingFiles.set([]);
    this.sourceKind.set('file');
    this.zoom.set(100);
    this.consentBlankAck.set(false);
    this.activePreviewPage.set(1);
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

  setPreviewPage(page: number): void {
    this.activePreviewPage.set(page);
  }

  zoomIn(): void {
    this.zoom.update((z) => Math.min(160, z + 10));
  }

  zoomOut(): void {
    this.zoom.update((z) => Math.max(70, z - 10));
  }

  selectField(i: number): void {
    this.selectedIndex.set(i);
    const page = this.fields()[i]?.page;
    if (page && this.previewPages().some((p) => p.page === page)) {
      this.activePreviewPage.set(page);
    }
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
        page: this.activePreviewPage() || 1,
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
          const tpl = res.template as {
            id: number;
            name: string;
            has_source_document?: boolean;
          };
          const veioDePdf =
            tpl.has_source_document === true || this.importItem()?.source_kind === 'pdf';
          if (veioDePdf) {
            this.toast.success(
              'Modelo criado',
              'PDF da clínica anexado. Mapeie a aparência para o PDF preenchido ficar igual ao original.',
            );
            void this.router.navigate(['/templates', tpl.id, 'aparencia-pdf']);
            return;
          }
          this.toast.success('Modelo criado', 'Revise os campos e publique o link quando estiver pronto.');
          void this.router.navigate(['/templates', tpl.id, 'campos']);
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

  private addFiles(incoming: File[]): void {
    if (!incoming.length) return;
    this.erro.set('');

    const current = [...this.pendingFiles()];
    const next = [...current];

    for (const file of incoming) {
      if (next.length >= MAX_FILES) {
        this.erro.set(`No máximo ${MAX_FILES} arquivos por importação.`);
        break;
      }
      if (file.size > MAX_BYTES) {
        this.erro.set(`"${file.name}" passa de 10 MB.`);
        continue;
      }
      const kind = this.kindFromFile(file);
      if (kind === 'file') {
        this.erro.set(`Tipo não suportado: ${file.name}. Use PDF, JPG, PNG ou TXT.`);
        continue;
      }
      next.push({
        file,
        name: file.name,
        sizeLabel: this.formatBytes(file.size),
        kind,
        previewUrl: kind === 'image' || kind === 'pdf' ? URL.createObjectURL(file) : null,
      });
    }

    const validationError = this.validateFileSet(next.map((p) => p.file));
    if (validationError) {
      // revoke newly added previews that won't stay
      for (const item of next) {
        if (!current.includes(item) && item.previewUrl) URL.revokeObjectURL(item.previewUrl);
      }
      this.erro.set(validationError);
      return;
    }

    // revoke removed? we only append
    this.pendingFiles.set(next);
    this.refreshLocalPreviews();
  }

  private validateFileSet(files: File[]): string | null {
    if (!files.length) return 'Selecione ao menos um arquivo.';
    if (files.length > MAX_FILES) return `No máximo ${MAX_FILES} arquivos por importação.`;
    if (files.length === 1) return null;

    const nonImages = files.filter((f) => this.kindFromFile(f) !== 'image');
    if (nonImages.length) {
      return 'Para várias páginas, envie só fotos (JPG/PNG). PDF deve ser um único arquivo.';
    }
    return null;
  }

  private startUpload(files: File[]): void {
    const validationError = this.validateFileSet(files);
    if (validationError) {
      this.erro.set(validationError);
      return;
    }

    this.erro.set('');
    this.pollSub?.unsubscribe();
    this.revokeServerPreviews();
    this.refreshLocalPreviews();
    this.sourceKind.set(files.length > 1 ? 'image' : this.kindFromFile(files[0]));
    this.enviando.set(true);
    this.step.set(1);
    this.templateName.set(
      files.length === 1
        ? files[0].name.replace(/\.[^.]+$/, '')
        : files[0].name.replace(/\.[^.]+$/, '') + ` (${files.length} págs)`,
    );

    this.imports.create(files, undefined, true).subscribe({
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
    if (this.sourcePreviewLoading()) return;
    const item = this.importItem();
    if (!item?.has_source) return;

    // Prefer local previews already set from upload when available.
    if (this.previewPages().length && this.pendingFiles().length) return;

    const pageCount = Math.max(1, item.source_page_count || item.pages?.length || 1);
    this.sourcePreviewLoading.set(true);
    this.revokeServerPreviews();

    const requests = Array.from({ length: pageCount }, (_, i) => i + 1).map(
      (page) =>
        new Promise<PreviewPage | null>((resolve) => {
          this.imports.getSourceBlob(item.id, page).subscribe({
            next: (blob) => {
              const objectUrl = URL.createObjectURL(blob);
              this.serverPreviewUrls.push(objectUrl);
              const meta = item.pages?.find((p) => p.page_number === page);
              const mime = (meta?.mime || item.source_mime || blob.type || '').toLowerCase();
              const name = meta?.original_name || item.source_original_name || `Página ${page}`;
              let kind: FormImportSourceKind = 'file';
              if (mime.startsWith('image/')) kind = 'image';
              else if (mime.includes('pdf')) kind = 'pdf';
              else if (mime.startsWith('text/')) kind = 'text';
              resolve({
                page,
                name,
                kind,
                url: this.sanitizer.bypassSecurityTrustResourceUrl(objectUrl),
              });
            },
            error: () => resolve(null),
          });
        }),
    );

    void Promise.all(requests).then((pages) => {
      const valid = pages.filter((p): p is PreviewPage => !!p);
      if (valid.length) {
        this.previewPages.set(valid);
        this.activePreviewPage.set(valid[0].page);
        this.sourceKind.set(valid[0].kind);
      }
      this.sourcePreviewLoading.set(false);
    });
  }

  private refreshLocalPreviews(): void {
    const files = this.pendingFiles();
    const pages: PreviewPage[] = [];
    files.forEach((item, index) => {
      if (!item.previewUrl) return;
      pages.push({
        page: index + 1,
        name: item.name,
        kind: item.kind,
        url: this.sanitizer.bypassSecurityTrustResourceUrl(item.previewUrl),
      });
    });
    this.previewPages.set(pages);
    if (pages.length) {
      this.activePreviewPage.set(pages[0].page);
      this.sourceKind.set(pages.length > 1 ? 'image' : pages[0].kind);
    } else {
      this.activePreviewPage.set(1);
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

  private revokeServerPreviews(): void {
    for (const url of this.serverPreviewUrls) URL.revokeObjectURL(url);
    this.serverPreviewUrls = [];
  }

  private clearAllPreviews(): void {
    this.revokeServerPreviews();
    for (const item of this.pendingFiles()) {
      if (item.previewUrl) URL.revokeObjectURL(item.previewUrl);
    }
    this.previewPages.set([]);
    this.sourcePreviewLoading.set(false);
  }
}
