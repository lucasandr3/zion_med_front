import {
  ChangeDetectionStrategy,
  Component,
  computed,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TemplatesService, Template, TemplateCampo } from '../../core/services/templates.service';
import { ToastService } from '../../core/services/toast.service';
import { ZmPageBackLinkComponent } from '../../shared/components/ui';
import { GestgoCardComponent } from '@/shared/components/card/card.component';
import { NORD_FORM_IMPORTS } from '@/shared/nord';
import {
  emptyPrintLayout,
  hasUsablePrintLayout,
  inferPlacementKind,
  parsePrintLayout,
  samePlacement,
  SYSTEM_PRINT_TARGETS,
  type PrintLayout,
  type PrintLayoutPlacement,
  type PrintLayoutTarget,
} from '../../core/utils/print-layout.util';

type PdfJsPage = {
  getViewport: (opts: { scale: number }) => { width: number; height: number };
  render: (opts: {
    canvasContext: CanvasRenderingContext2D;
    viewport: { width: number; height: number };
    canvas: HTMLCanvasElement;
  }) => { promise: Promise<void> };
};

type PdfJsDoc = {
  numPages: number;
  getPage: (n: number) => Promise<PdfJsPage>;
  destroy?: () => void;
};

type Gesture =
  | { mode: 'draw'; startX: number; startY: number }
  | {
      mode: 'move';
      target: PrintLayoutTarget;
      grabX: number;
      grabY: number;
      start: PrintLayoutPlacement;
    }
  | {
      mode: 'resize';
      target: PrintLayoutTarget;
      start: PrintLayoutPlacement;
    };

@Component({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-templates-aparencia-pdf',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'n-page templates-aparencia-pdf' },
  imports: [...NORD_FORM_IMPORTS, RouterLink, FormsModule, ZmPageBackLinkComponent, GestgoCardComponent],
  templateUrl: './templates-aparencia-pdf.component.html',
  styleUrl: './templates-aparencia-pdf.component.css',
})
export class TemplatesAparenciaPdfComponent implements OnInit, OnDestroy {
  @ViewChild('pdfCanvas', { static: false }) pdfCanvas?: ElementRef<HTMLCanvasElement>;
  @ViewChild('overlayLayer', { static: false }) overlayLayer?: ElementRef<HTMLElement>;

  readonly template = signal<Template | null>(null);
  readonly campos = signal<TemplateCampo[]>([]);
  readonly carregando = signal(true);
  readonly salvando = signal(false);
  readonly erro = signal('');
  readonly pageIndex = signal(0);
  readonly pageCount = signal(0);
  readonly selectedTarget = signal<PrintLayoutTarget | null>(null);
  readonly placements = signal<PrintLayoutPlacement[]>([]);
  readonly dirty = signal(false);
  readonly draftBox = signal<{ x: number; y: number; w: number; h: number } | null>(null);
  readonly systemTargets = SYSTEM_PRINT_TARGETS;

  readonly placementsOnPage = computed(() =>
    this.placements().filter((p) => p.page === this.pageIndex()),
  );

  private pdfDoc: PdfJsDoc | null = null;
  private pdfObjectUrl: string | null = null;
  private workerBlobUrl: string | null = null;
  private gesture: Gesture | null = null;
  private renderToken = 0;
  private readonly onWinMove = (e: PointerEvent) => this.onPointerMove(e);
  private readonly onWinUp = (e: PointerEvent) => this.onPointerUp(e);

  private route = inject(ActivatedRoute);
  private templatesService = inject(TemplatesService);
  private toast = inject(ToastService);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!Number.isFinite(id) || id <= 0) {
      this.carregando.set(false);
      this.erro.set('ID inválido.');
      return;
    }

    this.templatesService.get(id).subscribe({
      next: (tpl) => {
        this.template.set(tpl);
        const layout = parsePrintLayout(tpl.print_layout) ?? emptyPrintLayout();
        this.placements.set(layout.placements);
        if (!tpl.has_source_document) {
          this.carregando.set(false);
          this.erro.set('Anexe o PDF original do modelo antes de mapear a aparência.');
          return;
        }
        this.templatesService.getCampos(id).subscribe({
          next: (campos) => {
            this.campos.set(
              (campos || []).filter(
                (c) => !['heading', 'notice', 'section_break'].includes((c.type || '').toLowerCase()),
              ),
            );
            this.loadPdf(id);
          },
          error: () => {
            this.carregando.set(false);
            this.erro.set('Não foi possível carregar os campos do modelo.');
          },
        });
      },
      error: () => {
        this.carregando.set(false);
        this.erro.set('Modelo não encontrado.');
      },
    });
  }

  ngOnDestroy(): void {
    this.detachWindowListeners();
    this.pdfDoc?.destroy?.();
    if (this.pdfObjectUrl) URL.revokeObjectURL(this.pdfObjectUrl);
    if (this.workerBlobUrl) URL.revokeObjectURL(this.workerBlobUrl);
  }

  get mappedCount(): number {
    return this.placements().length;
  }

  trackPlacement(p: PrintLayoutPlacement): string {
    return `${p.name_key}::${p.option ?? ''}@${p.page}`;
  }

  campoLabel(nameKey: string): string {
    const system = SYSTEM_PRINT_TARGETS.find((t) => t.name_key === nameKey);
    if (system) return system.label;
    return this.campos().find((c) => c.name_key === nameKey)?.label || nameKey;
  }

  selecionarExtra(nameKey: string): void {
    this.selecionarCampo(nameKey);
  }

  fieldOptions(campo: TemplateCampo): string[] {
    const raw = campo.options;
    if (Array.isArray(raw)) {
      return raw.map((o) => String(o).trim()).filter(Boolean);
    }
    if (raw && typeof raw === 'object') {
      const nested = (raw as { options?: unknown }).options;
      if (Array.isArray(nested)) {
        return nested.map((o) => String(o).trim()).filter(Boolean);
      }
    }
    return [];
  }

  fieldHasOptionTargets(campo: TemplateCampo): boolean {
    const t = (campo.type || '').toLowerCase();
    return (
      (t === 'radio' || t === 'checkbox' || t === 'select') && this.fieldOptions(campo).length > 0
    );
  }

  isMapped(target: PrintLayoutTarget): boolean {
    return this.placements().some((p) => samePlacement(p, target));
  }

  isFieldFullyMapped(campo: TemplateCampo): boolean {
    if (!this.fieldHasOptionTargets(campo)) {
      return this.isMapped({ name_key: campo.name_key });
    }
    return this.fieldOptions(campo).every((opt) =>
      this.isMapped({ name_key: campo.name_key, option: opt }),
    );
  }

  isSelected(target: PrintLayoutTarget): boolean {
    const cur = this.selectedTarget();
    return !!cur && samePlacement(cur, target);
  }

  selecionarCampo(nameKey: string, option?: string | null): void {
    const target: PrintLayoutTarget = { name_key: nameKey, option: option ?? null };
    this.selectedTarget.set(target);
    const existing = this.placements().find((p) => samePlacement(p, target));
    if (existing && existing.page !== this.pageIndex()) {
      void this.goToPage(existing.page);
    }
  }

  removerCampo(target: PrintLayoutTarget, event?: Event): void {
    event?.stopPropagation();
    this.placements.set(this.placements().filter((p) => !samePlacement(p, target)));
    const cur = this.selectedTarget();
    if (cur && samePlacement(cur, target)) this.selectedTarget.set(null);
    this.dirty.set(true);
  }

  placementTitle(p: PrintLayoutPlacement): string {
    const base = this.campoLabel(p.name_key);
    return p.option ? `${base}: ${p.option}` : base;
  }

  async goToPage(index: number): Promise<void> {
    if (!this.pdfDoc) return;
    const next = Math.max(0, Math.min(this.pdfDoc.numPages - 1, index));
    this.pageIndex.set(next);
    await this.renderPage();
  }

  prevPage(): void {
    void this.goToPage(this.pageIndex() - 1);
  }

  nextPage(): void {
    void this.goToPage(this.pageIndex() + 1);
  }

  /** Clique no fundo do PDF → desenha nova área. */
  onLayerPointerDown(event: PointerEvent): void {
    if ((event.target as HTMLElement | null)?.closest?.('.aparencia-box')) return;
    event.preventDefault();
    const layer = this.overlayLayer?.nativeElement;
    if (!layer) return;
    const { x, y } = this.pointerNorm(event, layer);

    if (!this.selectedTarget()) {
      this.toast.warning(
        'Aparência do PDF',
        'Selecione um campo (ou opção) à esquerda e desenhe no PDF. Para mover, arraste a caixa azul.',
      );
      return;
    }

    this.gesture = { mode: 'draw', startX: x, startY: y };
    this.draftBox.set({ x, y, w: 0, h: 0 });
    this.attachWindowListeners();
  }

  /** Arrastar caixa existente. */
  onBoxPointerDown(event: PointerEvent, p: PrintLayoutPlacement): void {
    event.preventDefault();
    event.stopPropagation();
    const layer = this.overlayLayer?.nativeElement;
    if (!layer) return;
    const { x, y } = this.pointerNorm(event, layer);
    const target: PrintLayoutTarget = { name_key: p.name_key, option: p.option ?? null };
    this.selectedTarget.set(target);
    this.gesture = {
      mode: 'move',
      target,
      grabX: x - p.x,
      grabY: y - p.y,
      start: { ...p },
    };
    this.attachWindowListeners();
  }

  /** Redimensionar pelo canto. */
  onResizePointerDown(event: PointerEvent, p: PrintLayoutPlacement): void {
    event.preventDefault();
    event.stopPropagation();
    const target: PrintLayoutTarget = { name_key: p.name_key, option: p.option ?? null };
    this.selectedTarget.set(target);
    this.gesture = {
      mode: 'resize',
      target,
      start: { ...p },
    };
    this.attachWindowListeners();
  }

  limparTudo(): void {
    this.placements.set([]);
    this.dirty.set(true);
    this.draftBox.set(null);
  }

  salvar(): void {
    const tpl = this.template();
    if (!tpl || this.salvando()) return;
    const layout: PrintLayout = {
      version: 1,
      placements: this.placements(),
    };
    this.salvando.set(true);
    this.templatesService
      .update(tpl.id, {
        name: tpl.name,
        print_layout: layout,
      })
      .subscribe({
        next: (updated) => {
          this.salvando.set(false);
          this.template.set(updated);
          this.dirty.set(false);
          this.toast.success(
            'Aparência do PDF',
            hasUsablePrintLayout(layout)
              ? 'Mapa salvo. O PDF preenchido usará o layout da clínica.'
              : 'Mapa limpo. O PDF voltará ao layout padrão.',
          );
        },
        error: (err) => {
          this.salvando.set(false);
          const msg =
            err?.error?.message ||
            err?.error?.errors?.print_layout?.[0] ||
            'Não foi possível salvar o mapa.';
          this.toast.error('Aparência do PDF', msg);
        },
      });
  }

  private onPointerMove(event: PointerEvent): void {
    if (!this.gesture) return;
    const layer = this.overlayLayer?.nativeElement;
    if (!layer) return;
    const { x, y } = this.pointerNorm(event, layer);

    if (this.gesture.mode === 'draw') {
      this.draftBox.set({
        x: Math.min(this.gesture.startX, x),
        y: Math.min(this.gesture.startY, y),
        w: Math.abs(x - this.gesture.startX),
        h: Math.abs(y - this.gesture.startY),
      });
      return;
    }

    if (this.gesture.mode === 'move') {
      const start = this.gesture.start;
      let nx = clamp01(x - this.gesture.grabX);
      let ny = clamp01(y - this.gesture.grabY);
      nx = Math.min(nx, 1 - start.w);
      ny = Math.min(ny, 1 - start.h);
      this.patchPlacement(this.gesture.target, { ...start, x: nx, y: ny });
      return;
    }

    if (this.gesture.mode === 'resize') {
      const start = this.gesture.start;
      const nextW = Math.max(0.01, Math.min(x - start.x, 1 - start.x));
      const nextH = Math.max(0.008, Math.min(y - start.y, 1 - start.y));
      this.patchPlacement(this.gesture.target, { ...start, w: nextW, h: nextH });
    }
  }

  private onPointerUp(event: PointerEvent): void {
    const gesture = this.gesture;
    this.gesture = null;
    this.detachWindowListeners();
    if (!gesture) return;

    if (gesture.mode === 'move' || gesture.mode === 'resize') {
      this.dirty.set(true);
      return;
    }

    const draft = this.draftBox();
    this.draftBox.set(null);
    const target = this.selectedTarget();
    if (!target || !draft || draft.w < 0.01 || draft.h < 0.008) return;

    const field = this.campos().find((c) => c.name_key === target.name_key);
    const system = SYSTEM_PRINT_TARGETS.find((t) => t.name_key === target.name_key);
    const hasOption = !!(target.option && target.option.trim());
    const placement: PrintLayoutPlacement = {
      name_key: target.name_key,
      option: hasOption ? target.option : null,
      page: this.pageIndex(),
      x: draft.x,
      y: draft.y,
      w: draft.w,
      h: draft.h,
      kind: system?.kind ?? inferPlacementKind(field?.type, hasOption),
      align: 'left',
      font_size: field?.type === 'textarea' ? 10 : 11,
    };
    const others = this.placements().filter((p) => !samePlacement(p, placement));
    this.placements.set([...others, placement]);
    this.dirty.set(true);
  }

  private attachWindowListeners(): void {
    window.addEventListener('pointermove', this.onWinMove, { passive: false });
    window.addEventListener('pointerup', this.onWinUp, { passive: false });
    window.addEventListener('pointercancel', this.onWinUp, { passive: false });
  }

  private detachWindowListeners(): void {
    window.removeEventListener('pointermove', this.onWinMove);
    window.removeEventListener('pointerup', this.onWinUp);
    window.removeEventListener('pointercancel', this.onWinUp);
  }

  private pointerNorm(event: PointerEvent, el: HTMLElement): { x: number; y: number } {
    const rect = el.getBoundingClientRect();
    const w = Math.max(1, rect.width);
    const h = Math.max(1, rect.height);
    return {
      x: clamp01((event.clientX - rect.left) / w),
      y: clamp01((event.clientY - rect.top) / h),
    };
  }

  private patchPlacement(target: PrintLayoutTarget, next: PrintLayoutPlacement): void {
    this.placements.set(this.placements().map((p) => (samePlacement(p, target) ? next : p)));
  }

  private loadPdf(templateId: number): void {
    this.templatesService.downloadSourceDocument(templateId).subscribe({
      next: async (blob) => {
        try {
          if (this.pdfObjectUrl) URL.revokeObjectURL(this.pdfObjectUrl);
          this.pdfObjectUrl = URL.createObjectURL(blob);
          const pdfjs = await import('pdfjs-dist');
          const data = new Uint8Array(await blob.arrayBuffer());
          this.pdfDoc = (await this.openPdfDocument(pdfjs, data)) as unknown as PdfJsDoc;
          this.pageCount.set(this.pdfDoc.numPages);
          this.pageIndex.set(0);
          this.carregando.set(false);
          setTimeout(() => void this.renderPage(), 0);
        } catch (err) {
          console.error('[aparencia-pdf] falha ao abrir PDF', err);
          this.carregando.set(false);
          this.erro.set('Não foi possível abrir o PDF original.');
        }
      },
      error: () => {
        this.carregando.set(false);
        this.erro.set('Não foi possível baixar o PDF original.');
      },
    });
  }

  private async openPdfDocument(
    pdfjs: typeof import('pdfjs-dist'),
    data: Uint8Array,
  ): Promise<PdfJsDoc> {
    const cdnWorker = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

    try {
      pdfjs.GlobalWorkerOptions.workerSrc = await this.workerSrcFromLocalAsset();
      return (await pdfjs.getDocument({ data: data.slice() }).promise) as unknown as PdfJsDoc;
    } catch (err) {
      console.warn('[aparencia-pdf] worker blob falhou, tentando CDN', err);
    }

    pdfjs.GlobalWorkerOptions.workerSrc = cdnWorker;
    return (await pdfjs.getDocument({ data: data.slice() }).promise) as unknown as PdfJsDoc;
  }

  private async workerSrcFromLocalAsset(): Promise<string> {
    if (this.workerBlobUrl) return this.workerBlobUrl;

    const assetUrl = this.pdfWorkerAssetUrl();
    const res = await fetch(assetUrl, { credentials: 'same-origin' });
    if (!res.ok) throw new Error(`asset ${res.status}`);
    const code = await res.text();
    if (!code || code.trimStart().startsWith('<!')) throw new Error('asset HTML');
    const workerBlob = new Blob([code], { type: 'text/javascript' });
    this.workerBlobUrl = URL.createObjectURL(workerBlob);
    return this.workerBlobUrl;
  }

  private pdfWorkerAssetUrl(): string {
    const base = document.querySelector('base')?.getAttribute('href') || '/';
    try {
      return new URL('assets/pdfjs/pdf.worker.min.mjs', window.location.origin + base).toString();
    } catch {
      return '/assets/pdfjs/pdf.worker.min.mjs';
    }
  }

  private async renderPage(): Promise<void> {
    const doc = this.pdfDoc;
    const canvas = this.pdfCanvas?.nativeElement;
    if (!doc || !canvas) return;

    const token = ++this.renderToken;
    const page = await doc.getPage(this.pageIndex() + 1);
    if (token !== this.renderToken) return;

    const viewport = page.getViewport({ scale: 1.35 });
    canvas.width = Math.floor(viewport.width);
    canvas.height = Math.floor(viewport.height);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    await page.render({ canvasContext: ctx, viewport, canvas }).promise;
  }
}

function clamp01(n: number): number {
  return Math.min(1, Math.max(0, n));
}
