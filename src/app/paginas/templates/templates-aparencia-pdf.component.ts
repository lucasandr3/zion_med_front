import {
  ChangeDetectionStrategy,
  Component,
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
  @ViewChild('overlayCanvas', { static: false }) overlayCanvas?: ElementRef<HTMLCanvasElement>;

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
  readonly systemTargets = SYSTEM_PRINT_TARGETS;

  private pdfDoc: PdfJsDoc | null = null;
  private pdfObjectUrl: string | null = null;
  private workerBlobUrl: string | null = null;
  private gesture:
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
        startX: number;
        startY: number;
        start: PrintLayoutPlacement;
      }
    | null = null;
  private renderToken = 0;

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
    this.pdfDoc?.destroy?.();
    if (this.pdfObjectUrl) URL.revokeObjectURL(this.pdfObjectUrl);
    if (this.workerBlobUrl) URL.revokeObjectURL(this.workerBlobUrl);
  }

  get mappedCount(): number {
    return this.placements().length;
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

  /** Radio / checkbox / select com opções → mapear cada opção (bolinha no PDF). */
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
    } else {
      this.drawOverlays();
    }
  }

  removerCampo(target: PrintLayoutTarget, event?: Event): void {
    event?.stopPropagation();
    this.placements.set(this.placements().filter((p) => !samePlacement(p, target)));
    const cur = this.selectedTarget();
    if (cur && samePlacement(cur, target)) this.selectedTarget.set(null);
    this.dirty.set(true);
    this.drawOverlays();
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

  onOverlayPointerDown(event: PointerEvent): void {
    const canvas = this.overlayCanvas?.nativeElement;
    if (!canvas) return;
    const { x, y } = this.pointerNorm(event, canvas);
    const page = this.pageIndex();

    // Redimensionar pelo canto SE da área selecionada
    const cur = this.selectedTarget();
    const selected = cur
      ? this.placements().find((p) => samePlacement(p, cur) && p.page === page)
      : undefined;
    if (selected && this.hitResizeHandle(selected, x, y)) {
      this.gesture = {
        mode: 'resize',
        target: { name_key: selected.name_key, option: selected.option ?? null },
        startX: x,
        startY: y,
        start: { ...selected },
      };
      canvas.setPointerCapture(event.pointerId);
      canvas.style.cursor = 'nwse-resize';
      return;
    }

    // Arrastar área existente (mesmo sem selecionar antes)
    const hit = this.findPlacementAt(x, y, page);
    if (hit) {
      this.selectedTarget.set({ name_key: hit.name_key, option: hit.option ?? null });
      this.gesture = {
        mode: 'move',
        target: { name_key: hit.name_key, option: hit.option ?? null },
        grabX: x - hit.x,
        grabY: y - hit.y,
        start: { ...hit },
      };
      canvas.setPointerCapture(event.pointerId);
      canvas.style.cursor = 'grabbing';
      this.drawOverlays();
      return;
    }

    // Desenhar nova área (precisa de campo/opção selecionado)
    if (!this.selectedTarget()) {
      this.toast.warning(
        'Aparência do PDF',
        'Selecione um campo (ou opção de rádio) à esquerda, ou arraste uma área já marcada.',
      );
      return;
    }
    this.gesture = { mode: 'draw', startX: x, startY: y };
    canvas.setPointerCapture(event.pointerId);
    canvas.style.cursor = 'crosshair';
  }

  onOverlayPointerMove(event: PointerEvent): void {
    const canvas = this.overlayCanvas?.nativeElement;
    if (!canvas) return;
    const { x, y } = this.pointerNorm(event, canvas);

    if (!this.gesture) {
      this.updateHoverCursor(canvas, x, y);
      return;
    }

    if (this.gesture.mode === 'draw') {
      this.drawOverlays({
        x: Math.min(this.gesture.startX, x),
        y: Math.min(this.gesture.startY, y),
        w: Math.abs(x - this.gesture.startX),
        h: Math.abs(y - this.gesture.startY),
      });
      return;
    }

    if (this.gesture.mode === 'move') {
      const start = this.gesture.start;
      const next = {
        ...start,
        x: clamp01(x - this.gesture.grabX),
        y: clamp01(y - this.gesture.grabY),
      };
      // Mantém a caixa dentro da página
      next.x = Math.min(next.x, 1 - start.w);
      next.y = Math.min(next.y, 1 - start.h);
      this.patchPlacement(this.gesture.target, next);
      return;
    }

    if (this.gesture.mode === 'resize') {
      const start = this.gesture.start;
      const nextW = Math.max(0.01, x - start.x);
      const nextH = Math.max(0.008, y - start.y);
      this.patchPlacement(this.gesture.target, {
        ...start,
        w: Math.min(nextW, 1 - start.x),
        h: Math.min(nextH, 1 - start.y),
      });
    }
  }

  onOverlayPointerUp(event: PointerEvent): void {
    const canvas = this.overlayCanvas?.nativeElement;
    const gesture = this.gesture;
    this.gesture = null;
    if (canvas) {
      try {
        canvas.releasePointerCapture(event.pointerId);
      } catch {
        /* ignore */
      }
      canvas.style.cursor = 'crosshair';
    }
    if (!gesture) return;

    if (gesture.mode === 'move' || gesture.mode === 'resize') {
      this.dirty.set(true);
      this.drawOverlays();
      return;
    }

    // draw
    const target = this.selectedTarget();
    if (!target) {
      this.drawOverlays();
      return;
    }
    const { x, y } = canvas
      ? this.pointerNorm(event, canvas)
      : { x: gesture.startX, y: gesture.startY };
    const box = {
      x: Math.min(gesture.startX, x),
      y: Math.min(gesture.startY, y),
      w: Math.abs(x - gesture.startX),
      h: Math.abs(y - gesture.startY),
    };
    if (box.w < 0.01 || box.h < 0.008) {
      this.drawOverlays();
      return;
    }

    const field = this.campos().find((c) => c.name_key === target.name_key);
    const system = SYSTEM_PRINT_TARGETS.find((t) => t.name_key === target.name_key);
    const hasOption = !!(target.option && target.option.trim());
    const placement: PrintLayoutPlacement = {
      name_key: target.name_key,
      option: hasOption ? target.option : null,
      page: this.pageIndex(),
      x: box.x,
      y: box.y,
      w: box.w,
      h: box.h,
      kind: system?.kind ?? inferPlacementKind(field?.type, hasOption),
      align: 'left',
      font_size: field?.type === 'textarea' ? 10 : 11,
    };
    const others = this.placements().filter((p) => !samePlacement(p, placement));
    this.placements.set([...others, placement]);
    this.dirty.set(true);
    this.drawOverlays();
  }

  private pointerNorm(
    event: PointerEvent,
    canvas: HTMLCanvasElement,
  ): { x: number; y: number } {
    const rect = canvas.getBoundingClientRect();
    return {
      x: clamp01((event.clientX - rect.left) / rect.width),
      y: clamp01((event.clientY - rect.top) / rect.height),
    };
  }

  private findPlacementAt(x: number, y: number, page: number): PrintLayoutPlacement | null {
    // Prioriza a selecionada, depois a de cima (última na lista)
    const onPage = this.placements().filter((p) => p.page === page);
    const cur = this.selectedTarget();
    const selected = cur ? onPage.find((p) => samePlacement(p, cur)) : undefined;
    if (selected && this.pointInBox(x, y, selected)) return selected;
    for (let i = onPage.length - 1; i >= 0; i--) {
      const p = onPage[i]!;
      if (this.pointInBox(x, y, p)) return p;
    }
    return null;
  }

  private pointInBox(x: number, y: number, box: PrintLayoutPlacement): boolean {
    return x >= box.x && x <= box.x + box.w && y >= box.y && y <= box.y + box.h;
  }

  private hitResizeHandle(box: PrintLayoutPlacement, x: number, y: number): boolean {
    const hx = box.x + box.w;
    const hy = box.y + box.h;
    const tol = 0.012;
    return Math.abs(x - hx) <= tol && Math.abs(y - hy) <= tol;
  }

  private patchPlacement(target: PrintLayoutTarget, next: PrintLayoutPlacement): void {
    this.placements.set(
      this.placements().map((p) => (samePlacement(p, target) ? next : p)),
    );
    this.drawOverlays();
  }

  private updateHoverCursor(canvas: HTMLCanvasElement, x: number, y: number): void {
    const page = this.pageIndex();
    const cur = this.selectedTarget();
    const selected = cur
      ? this.placements().find((p) => samePlacement(p, cur) && p.page === page)
      : undefined;
    if (selected && this.hitResizeHandle(selected, x, y)) {
      canvas.style.cursor = 'nwse-resize';
      return;
    }
    if (this.findPlacementAt(x, y, page)) {
      canvas.style.cursor = 'grab';
      return;
    }
    canvas.style.cursor = this.selectedTarget() ? 'crosshair' : 'default';
  }

  limparTudo(): void {
    this.placements.set([]);
    this.dirty.set(true);
    this.drawOverlays();
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

    // 1) Blob com MIME text/javascript (contorna application/octet-stream do host)
    try {
      pdfjs.GlobalWorkerOptions.workerSrc = await this.workerSrcFromLocalAsset();
      return (await pdfjs.getDocument({ data: data.slice() }).promise) as unknown as PdfJsDoc;
    } catch (err) {
      console.warn('[aparencia-pdf] worker blob falhou, tentando CDN', err);
    }

    // 2) CDN com MIME correto
    pdfjs.GlobalWorkerOptions.workerSrc = cdnWorker;
    return (await pdfjs.getDocument({ data: data.slice() }).promise) as unknown as PdfJsDoc;
  }

  /**
   * Baixa o worker como texto e recria Blob com MIME JS.
   * Evita o bloqueio de module script com application/octet-stream.
   */
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
    const overlay = this.overlayCanvas?.nativeElement;
    if (!doc || !canvas || !overlay) return;

    const token = ++this.renderToken;
    const page = await doc.getPage(this.pageIndex() + 1);
    if (token !== this.renderToken) return;

    const viewport = page.getViewport({ scale: 1.35 });
    canvas.width = Math.floor(viewport.width);
    canvas.height = Math.floor(viewport.height);
    overlay.width = canvas.width;
    overlay.height = canvas.height;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    await page.render({ canvasContext: ctx, viewport, canvas }).promise;
    if (token !== this.renderToken) return;
    this.drawOverlays();
  }

  private drawOverlays(draft?: { x: number; y: number; w: number; h: number }): void {
    const overlay = this.overlayCanvas?.nativeElement;
    if (!overlay) return;
    const ctx = overlay.getContext('2d');
    if (!ctx) return;
    const w = overlay.width;
    const h = overlay.height;
    ctx.clearRect(0, 0, w, h);

    for (const p of this.placements()) {
      if (p.page !== this.pageIndex()) continue;
      const selected = this.isSelected(p);
      ctx.strokeStyle = selected ? '#0f766e' : '#2563eb';
      ctx.fillStyle = selected ? 'rgba(15, 118, 110, 0.18)' : 'rgba(37, 99, 235, 0.14)';
      ctx.lineWidth = selected ? 2.5 : 1.5;
      ctx.fillRect(p.x * w, p.y * h, p.w * w, p.h * h);
      ctx.strokeRect(p.x * w, p.y * h, p.w * w, p.h * h);
      ctx.fillStyle = selected ? '#0f766e' : '#1d4ed8';
      ctx.font = '600 11px Roboto, Arial, sans-serif';
      ctx.fillText(this.placementTitle(p).slice(0, 42), p.x * w + 4, p.y * h + 14);

      if (selected) {
        const hx = (p.x + p.w) * w;
        const hy = (p.y + p.h) * h;
        const size = 8;
        ctx.fillStyle = '#0f766e';
        ctx.fillRect(hx - size / 2, hy - size / 2, size, size);
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(hx - size / 2, hy - size / 2, size, size);
      }
    }

    if (draft && draft.w > 0 && draft.h > 0) {
      ctx.strokeStyle = '#ea580c';
      ctx.fillStyle = 'rgba(234, 88, 12, 0.16)';
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 4]);
      ctx.fillRect(draft.x * w, draft.y * h, draft.w * w, draft.h * h);
      ctx.strokeRect(draft.x * w, draft.y * h, draft.w * w, draft.h * h);
      ctx.setLineDash([]);
    }
  }
}

function clamp01(n: number): number {
  return Math.min(1, Math.max(0, n));
}
