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
  type PrintLayout,
  type PrintLayoutPlacement,
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
  readonly selectedKey = signal<string | null>(null);
  readonly placements = signal<PrintLayoutPlacement[]>([]);
  readonly dirty = signal(false);

  private pdfDoc: PdfJsDoc | null = null;
  private pdfObjectUrl: string | null = null;
  private dragStart: { x: number; y: number } | null = null;
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
  }

  get mappedCount(): number {
    return this.placements().length;
  }

  campoLabel(nameKey: string): string {
    return this.campos().find((c) => c.name_key === nameKey)?.label || nameKey;
  }

  isMapped(nameKey: string): boolean {
    return this.placements().some((p) => p.name_key === nameKey);
  }

  selecionarCampo(nameKey: string): void {
    this.selectedKey.set(nameKey);
    const existing = this.placements().find((p) => p.name_key === nameKey);
    if (existing && existing.page !== this.pageIndex()) {
      void this.goToPage(existing.page);
    } else {
      this.drawOverlays();
    }
  }

  removerCampo(nameKey: string, event?: Event): void {
    event?.stopPropagation();
    this.placements.set(this.placements().filter((p) => p.name_key !== nameKey));
    if (this.selectedKey() === nameKey) this.selectedKey.set(null);
    this.dirty.set(true);
    this.drawOverlays();
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
    if (!this.selectedKey()) {
      this.toast.warning('Aparência do PDF', 'Selecione um campo à esquerda e arraste no PDF.');
      return;
    }
    const canvas = this.overlayCanvas?.nativeElement;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    this.dragStart = { x, y };
    canvas.setPointerCapture(event.pointerId);
  }

  onOverlayPointerMove(event: PointerEvent): void {
    if (!this.dragStart) return;
    const canvas = this.overlayCanvas?.nativeElement;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = clamp01((event.clientX - rect.left) / rect.width);
    const y = clamp01((event.clientY - rect.top) / rect.height);
    this.drawOverlays({
      x: Math.min(this.dragStart.x, x),
      y: Math.min(this.dragStart.y, y),
      w: Math.abs(x - this.dragStart.x),
      h: Math.abs(y - this.dragStart.y),
    });
  }

  onOverlayPointerUp(event: PointerEvent): void {
    if (!this.dragStart || !this.selectedKey()) {
      this.dragStart = null;
      return;
    }
    const canvas = this.overlayCanvas?.nativeElement;
    if (!canvas) {
      this.dragStart = null;
      return;
    }
    const rect = canvas.getBoundingClientRect();
    const x = clamp01((event.clientX - rect.left) / rect.width);
    const y = clamp01((event.clientY - rect.top) / rect.height);
    const box = {
      x: Math.min(this.dragStart.x, x),
      y: Math.min(this.dragStart.y, y),
      w: Math.abs(x - this.dragStart.x),
      h: Math.abs(y - this.dragStart.y),
    };
    this.dragStart = null;

    if (box.w < 0.01 || box.h < 0.008) {
      this.drawOverlays();
      return;
    }

    const field = this.campos().find((c) => c.name_key === this.selectedKey());
    const placement: PrintLayoutPlacement = {
      name_key: this.selectedKey()!,
      page: this.pageIndex(),
      x: box.x,
      y: box.y,
      w: box.w,
      h: box.h,
      kind: inferPlacementKind(field?.type),
      align: 'left',
      font_size: field?.type === 'textarea' ? 10 : 11,
    };

    const others = this.placements().filter((p) => p.name_key !== placement.name_key);
    this.placements.set([...others, placement]);
    this.dirty.set(true);
    this.drawOverlays();
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
          // Worker servido via assets (angular.json) — evita MIME text/html do fallback SPA
          pdfjs.GlobalWorkerOptions.workerSrc = this.pdfWorkerSrc();

          const data = new Uint8Array(await blob.arrayBuffer());
          const loadingTask = pdfjs.getDocument({ data });
          this.pdfDoc = (await loadingTask.promise) as unknown as PdfJsDoc;
          this.pageCount.set(this.pdfDoc.numPages);
          this.pageIndex.set(0);
          this.carregando.set(false);
          // Espera o canvas existir no DOM
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

  /** Caminho do worker compatível com base href do Angular. */
  private pdfWorkerSrc(): string {
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
      const selected = p.name_key === this.selectedKey();
      ctx.strokeStyle = selected ? '#0f766e' : '#2563eb';
      ctx.fillStyle = selected ? 'rgba(15, 118, 110, 0.18)' : 'rgba(37, 99, 235, 0.14)';
      ctx.lineWidth = selected ? 2.5 : 1.5;
      ctx.fillRect(p.x * w, p.y * h, p.w * w, p.h * h);
      ctx.strokeRect(p.x * w, p.y * h, p.w * w, p.h * h);
      ctx.fillStyle = selected ? '#0f766e' : '#1d4ed8';
      ctx.font = '600 11px Roboto, Arial, sans-serif';
      ctx.fillText(this.campoLabel(p.name_key).slice(0, 42), p.x * w + 4, p.y * h + 14);
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
