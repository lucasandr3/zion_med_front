import {
  ChangeDetectionStrategy,
  Component,
  computed,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  HostListener,
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
import { ShellSidebarCollapseService } from '../../core/services/shell-sidebar-collapse.service';
import { ZmPageBackLinkComponent } from '../../shared/components/ui';
import { GestgoComboboxComponent, type GestgoComboboxOption } from '@/shared/components/combobox';
import {
  DATE_PART_TARGETS,
  emptyPrintLayout,
  hasUsablePrintLayout,
  inferPlacementKind,
  isDatePartOption,
  isDocDateTarget,
  newPlacementUid,
  parsePrintLayout,
  samePlacement,
  samePlacementBox,
  SYSTEM_PRINT_TARGETS,
  type PrintLayout,
  type PrintLayoutAlign,
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
      uid: string;
      grabX: number;
      grabY: number;
      start: PrintLayoutPlacement;
    }
  | {
      mode: 'resize';
      uid: string;
      start: PrintLayoutPlacement;
    };

@Component({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-templates-aparencia-pdf',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'n-page n-page--flush templates-aparencia-pdf ae-root' },
  imports: [RouterLink, FormsModule, ZmPageBackLinkComponent, GestgoComboboxComponent],
  templateUrl: './templates-aparencia-pdf.component.html',
  styleUrl: './templates-aparencia-pdf.component.css',
})
export class TemplatesAparenciaPdfComponent implements OnInit, OnDestroy {
  @ViewChild('pdfCanvas', { static: false }) pdfCanvas?: ElementRef<HTMLCanvasElement>;
  @ViewChild('overlayLayer', { static: false }) overlayLayer?: ElementRef<HTMLElement>;

  readonly alignOptions: GestgoComboboxOption[] = [
    { value: 'left', label: 'Esquerda' },
    { value: 'center', label: 'Centro' },
    { value: 'right', label: 'Direita' },
  ];

  readonly template = signal<Template | null>(null);
  readonly campos = signal<TemplateCampo[]>([]);
  readonly carregando = signal(true);
  readonly salvando = signal(false);
  readonly erro = signal('');
  readonly pageIndex = signal(0);
  readonly pageCount = signal(0);
  readonly selectedTarget = signal<PrintLayoutTarget | null>(null);
  readonly selectedUid = signal<string | null>(null);
  readonly placements = signal<PrintLayoutPlacement[]>([]);
  readonly dirty = signal(false);
  readonly draftBox = signal<{ x: number; y: number; w: number; h: number } | null>(null);
  readonly systemTargets = SYSTEM_PRINT_TARGETS;
  readonly fieldSearch = signal('');
  readonly viewMode = signal<'edit' | 'preview'>('edit');
  readonly zoom = signal(1);
  readonly hintVisible = signal(false);
  readonly mobileTab = signal<'fields' | 'document' | 'inspector'>('document');
  readonly stageWidth = signal(0);
  readonly stageHeight = signal(0);
  /** Seções laterais dobráveis. */
  readonly extrasOpen = signal(true);
  readonly camposOpen = signal(true);
  /** Subgrupos (ex.: estado civil) recolhidos por name_key. */
  readonly collapsedSubgroups = signal<Record<string, boolean>>({});

  readonly placementsOnPage = computed(() =>
    this.placements().filter((p) => p.page === this.pageIndex()),
  );

  readonly selectedPlacement = computed(() => {
    const uid = this.selectedUid();
    if (!uid) return null;
    return this.placements().find((p) => p.uid === uid) ?? null;
  });

  readonly filteredCampos = computed(() => {
    const q = this.fieldSearch().trim().toLowerCase();
    if (!q) return this.campos();
    return this.campos().filter(
      (c) =>
        c.label.toLowerCase().includes(q) ||
        c.name_key.toLowerCase().includes(q) ||
        (c.type || '').toLowerCase().includes(q),
    );
  });

  readonly filteredSystemTargets = computed(() => {
    const q = this.fieldSearch().trim().toLowerCase();
    if (!q) return this.systemTargets;
    return this.systemTargets.filter(
      (t) => t.label.toLowerCase().includes(q) || t.name_key.toLowerCase().includes(q),
    );
  });

  readonly mappedExtrasCount = computed(
    () => this.systemTargets.filter((t) => this.isExtraMapped(t.name_key)).length,
  );

  readonly statusText = computed(() => {
    if (!this.selectedTarget()) return 'Selecione um campo e desenhe no PDF.';
    if (this.viewMode() === 'preview') return 'Prévia das respostas nas áreas mapeadas.';
    return 'Arraste as caixas ou use o painel de ajustes.';
  });

  get zoomPercent(): number {
    return Math.round(this.zoom() * 100);
  }

  private pdfDoc: PdfJsDoc | null = null;
  private pdfObjectUrl: string | null = null;
  private workerBlobUrl: string | null = null;
  private gesture: Gesture | null = null;
  private renderToken = 0;
  private activePointerId: number | null = null;
  private sidebarWasCollapsed: boolean | null = null;

  private route = inject(ActivatedRoute);
  private templatesService = inject(TemplatesService);
  private toast = inject(ToastService);
  private sidebarCollapse = inject(ShellSidebarCollapseService);

  ngOnInit(): void {
    this.sidebarCollapse.ensureHydrated();
    this.sidebarWasCollapsed = this.sidebarCollapse.collapsed();
    if (!this.sidebarWasCollapsed) {
      this.sidebarCollapse.setCollapsed(true);
    }

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
    this.releasePointerCapture();
    this.pdfDoc?.destroy?.();
    if (this.pdfObjectUrl) URL.revokeObjectURL(this.pdfObjectUrl);
    if (this.workerBlobUrl) URL.revokeObjectURL(this.workerBlobUrl);
    if (this.sidebarWasCollapsed === false) {
      this.sidebarCollapse.setCollapsed(false);
    }
  }

  @HostListener('window:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    const sel = this.selectedPlacement();
    if (!sel || this.viewMode() !== 'edit') return;
    const tag = (event.target as HTMLElement | null)?.tagName?.toLowerCase();
    if (tag === 'input' || tag === 'textarea' || tag === 'select') return;

    const step = event.shiftKey ? 0.01 : 0.002;
    let dx = 0;
    let dy = 0;
    if (event.key === 'ArrowLeft') dx = -step;
    else if (event.key === 'ArrowRight') dx = step;
    else if (event.key === 'ArrowUp') dy = -step;
    else if (event.key === 'ArrowDown') dy = step;
    else return;

    event.preventDefault();
    const next = {
      ...sel,
      x: clamp01(Math.min(sel.x + dx, 1 - sel.w)),
      y: clamp01(Math.min(sel.y + dy, 1 - sel.h)),
    };
    this.patchPlacementByUid(sel.uid!, next);
    this.dirty.set(true);
  }

  get mappedCount(): number {
    return this.placements().length;
  }

  fieldGlyph(type: string | null | undefined): string {
    const t = (type || '').toLowerCase();
    if (t === 'signature') return '✎';
    if (t === 'checkbox' || t === 'radio') return '☑';
    if (t === 'date' || t === 'datetime') return '📅';
    if (t === 'file') return '▣';
    return 'Aa';
  }

  toggleExtras(): void {
    this.extrasOpen.update((v) => !v);
  }

  toggleCampos(): void {
    this.camposOpen.update((v) => !v);
  }

  isSubgroupOpen(nameKey: string): boolean {
    // Com busca ativa, mantém subgrupos abertos para achar o campo.
    if (this.fieldSearch().trim()) return true;
    return !this.collapsedSubgroups()[nameKey];
  }

  toggleSubgroup(nameKey: string): void {
    const cur = this.collapsedSubgroups();
    this.collapsedSubgroups.set({ ...cur, [nameKey]: !cur[nameKey] });
  }

  zoomIn(): void {
    this.zoom.set(Math.min(1.6, Math.round((this.zoom() + 0.1) * 10) / 10));
  }

  zoomOut(): void {
    this.zoom.set(Math.max(0.5, Math.round((this.zoom() - 0.1) * 10) / 10));
  }

  pct(n: number): number {
    return Math.round(n * 1000) / 10;
  }

  isBoxSelected(p: PrintLayoutPlacement): boolean {
    return !!p.uid && p.uid === this.selectedUid();
  }

  patchSelectedNumeric(key: 'x' | 'y' | 'w' | 'h', value: number | string): void {
    const sel = this.selectedPlacement();
    if (!sel?.uid) return;
    const n = Number(value);
    if (!Number.isFinite(n)) return;
    const v = clamp01(n / 100);
    const next = { ...sel, [key]: v };
    if (key === 'x') next.x = Math.min(v, 1 - sel.w);
    if (key === 'y') next.y = Math.min(v, 1 - sel.h);
    if (key === 'w') next.w = Math.max(0.005, Math.min(v, 1 - sel.x));
    if (key === 'h') next.h = Math.max(0.005, Math.min(v, 1 - sel.y));
    this.patchPlacementByUid(sel.uid, next);
    this.dirty.set(true);
  }

  patchSelectedFont(value: number | string): void {
    const sel = this.selectedPlacement();
    if (!sel?.uid) return;
    const n = Number(value);
    if (!Number.isFinite(n)) return;
    this.patchPlacementByUid(sel.uid, {
      ...sel,
      font_size: Math.min(28, Math.max(6, Math.round(n))),
    });
    this.dirty.set(true);
  }

  patchSelectedAlign(value: string | null): void {
    const sel = this.selectedPlacement();
    if (!sel?.uid) return;
    const align: PrintLayoutAlign =
      value === 'center' || value === 'right' ? value : 'left';
    this.patchPlacementByUid(sel.uid, { ...sel, align });
    this.dirty.set(true);
  }

  trackPlacement(p: PrintLayoutPlacement): string {
    return p.uid || `${p.name_key}::${p.option ?? ''}@${p.page}:${p.x}:${p.y}`;
  }

  mappedCountFor(target: PrintLayoutTarget): number {
    return this.placements().filter((p) => samePlacement(p, target)).length;
  }

  campoLabel(nameKey: string): string {
    const system = SYSTEM_PRINT_TARGETS.find((t) => t.name_key === nameKey);
    if (system) return system.label;
    return this.campos().find((c) => c.name_key === nameKey)?.label || nameKey;
  }

  selecionarExtra(nameKey: string, option?: string | null): void {
    this.selecionarCampo(nameKey, option);
  }

  isExtraMapped(nameKey: string): boolean {
    return this.placements().some((p) => p.name_key === nameKey);
  }

  isDocDateExtra(nameKey: string): boolean {
    return isDocDateTarget(nameKey);
  }

  /** Alvos da data genérica (completa + partes), repetíveis no PDF. */
  docDateMapTargets(): Array<{ option: string | null; label: string }> {
    return [
      { option: null, label: 'Data completa (dd/mm/aaaa)' },
      ...DATE_PART_TARGETS.map((d) => ({ option: d.option as string, label: d.label })),
    ];
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
    if (t === 'date' || t === 'datetime') return true;
    return (
      (t === 'radio' || t === 'checkbox' || t === 'select') && this.fieldOptions(campo).length > 0
    );
  }

  fieldIsDate(campo: TemplateCampo): boolean {
    const t = (campo.type || '').toLowerCase();
    return t === 'date' || t === 'datetime';
  }

  fieldIsChoice(campo: TemplateCampo): boolean {
    const t = (campo.type || '').toLowerCase();
    return (t === 'radio' || t === 'checkbox' || t === 'select') && this.fieldOptions(campo).length > 0;
  }

  /**
   * Alvos mapeáveis.
   * Data: completa (uma caixa) OU partes (dia/mês/ano) — pode misturar os dois.
   * Rádio/select: primeiro “Resposta em texto”, depois ✓ por opção.
   */
  fieldMapTargets(campo: TemplateCampo): Array<{ option: string | null; label: string }> {
    if (this.fieldIsDate(campo)) {
      return [
        { option: null, label: 'Data completa (dd/mm/aaaa)' },
        ...DATE_PART_TARGETS.map((d) => ({ option: d.option as string, label: d.label })),
      ];
    }
    if (this.fieldIsChoice(campo)) {
      return [
        { option: null, label: 'Resposta em texto (uma caixa)' },
        ...this.fieldOptions(campo).map((opt) => ({ option: opt, label: `✓ ${opt}` })),
      ];
    }
    return this.fieldOptions(campo).map((opt) => ({ option: opt, label: opt }));
  }

  /** Ícone do alvo na lista (data completa vs partes vs ✓). */
  targetGlyph(campo: TemplateCampo | null, option: string | null): string {
    if ((campo && this.fieldIsDate(campo)) || !campo) {
      if (option === null) return 'Aa';
      if (option === 'day') return '12';
      if (option === 'month') return '11';
      if (option === 'month_name') return 'nov';
      if (option === 'year') return '26';
      return 'Aa';
    }
    return option === null ? 'Aa' : '✓';
  }

  dateTargetGlyph(option: string | null): string {
    return this.targetGlyph(null, option);
  }

  trackMapTarget(t: { option: string | null }): string {
    return t.option ?? '__text__';
  }

  isMapped(target: PrintLayoutTarget): boolean {
    return this.placements().some((p) => samePlacement(p, target));
  }

  isFieldFullyMapped(campo: TemplateCampo): boolean {
    if (!this.fieldHasOptionTargets(campo)) {
      return this.isMapped({ name_key: campo.name_key });
    }
    if (this.fieldIsDate(campo)) {
      const key = campo.name_key;
      // Completa (uma caixa) OU o trio dia + mês + ano
      if (this.isMapped({ name_key: key })) return true;
      const hasDay = this.isMapped({ name_key: key, option: 'day' });
      const hasYear = this.isMapped({ name_key: key, option: 'year' });
      const hasMonth =
        this.isMapped({ name_key: key, option: 'month' }) ||
        this.isMapped({ name_key: key, option: 'month_name' });
      return hasDay && hasYear && hasMonth;
    }
    // Estado civil etc.: basta o texto OU as marcações por opção
    if (this.fieldIsChoice(campo)) {
      if (this.isMapped({ name_key: campo.name_key })) return true;
      return this.fieldOptions(campo).every((opt) =>
        this.isMapped({ name_key: campo.name_key, option: opt }),
      );
    }
    return this.fieldMapTargets(campo).every((t) =>
      this.isMapped({ name_key: campo.name_key, option: t.option }),
    );
  }

  /** Texto de exemplo dentro da caixa — mesma posição visual do PDF gerado (base). */
  previewSample(p: PrintLayoutPlacement): string {
    if (p.kind === 'checkbox') return '✓';
    if (p.name_key === '__verify_qr') return 'QR';
    if (p.name_key === '__verify_code') return 'A1B2C3D4';
    if (p.name_key === '__clinic_logo') return 'logo';
    if (p.kind === 'signature' || p.kind === 'image' || p.name_key === '__clinic_signature') {
      return 'assinatura';
    }
    if (isDatePartOption(p.option)) {
      if (p.option === 'day') return '12';
      if (p.option === 'month') return '11';
      if (p.option === 'month_name') return 'novembro';
      if (p.option === 'year') return '2026';
    }
    if (p.option) return p.option;

    if (isDocDateTarget(p.name_key)) return '13/11/2026';

    // Exemplos realistas (não o rótulo do campo) para a prévia parecer o PDF preenchido.
    const key = `${p.name_key} ${this.campoLabel(p.name_key)}`.toLowerCase();
    if (/nome|cedente|paciente|titular/.test(key)) return 'Lucas Silva';
    if (/nacional/.test(key)) return 'Brasileiro';
    if (/estado.?civil|civil/.test(key)) return 'Casado(a)';
    if (/profiss/.test(key)) return 'Empresário';
    if (/\brg\b/.test(key)) return '16.569.832';
    if (/cpf/.test(key)) return '098.613.856-81';
    if (/endere[cç]o/.test(key)) return 'Rua Exemplo, 100';
    if (/telefone|celular|whatsapp|fone/.test(key)) return '(34) 99893-8363';
    if (/nasc|birth/.test(key)) return '31/01/1990';
    if (/\bdata\b/.test(key)) return '13/11/2026';
    if (/e-?mail|email/.test(key)) return 'lucas@email.com';
    if (/cidade/.test(key)) return 'São Paulo';
    if (/bairro/.test(key)) return 'Centro';
    if (/cep/.test(key)) return '01310-100';

    const label = this.campoLabel(p.name_key);
    return label.length > 18 ? `${label.slice(0, 16)}…` : label || 'texto';
  }

  previewFontPx(p: PrintLayoutPlacement): number {
    const layerH = this.overlayLayer?.nativeElement?.clientHeight || 900;
    const boxH = Math.max(8, p.h * layerH);
    const preferred = p.font_size ?? Math.max(7, Math.min(10, boxH * 0.72));
    return Math.max(6, Math.min(preferred, boxH * 0.92));
  }

  isSelected(target: PrintLayoutTarget): boolean {
    const cur = this.selectedTarget();
    return !!cur && samePlacement(cur, target);
  }

  selecionarCampo(nameKey: string, option?: string | null): void {
    const target: PrintLayoutTarget = { name_key: nameKey, option: option ?? null };
    this.selectedTarget.set(target);
    const existing = this.placements().find((p) => samePlacement(p, target));
    if (existing) {
      this.selectedUid.set(existing.uid || null);
      if (existing.page !== this.pageIndex()) {
        void this.goToPage(existing.page);
      }
    } else {
      this.selectedUid.set(null);
    }
  }

  removerCampo(target: PrintLayoutTarget, event?: Event): void {
    event?.stopPropagation();
    const removed = this.placements().filter((p) => samePlacement(p, target));
    this.placements.set(this.placements().filter((p) => !samePlacement(p, target)));
    const cur = this.selectedTarget();
    if (cur && samePlacement(cur, target)) this.selectedTarget.set(null);
    const uid = this.selectedUid();
    if (uid && removed.some((p) => p.uid === uid)) this.selectedUid.set(null);
    this.dirty.set(true);
  }

  placementTitle(p: PrintLayoutPlacement): string {
    const base = this.campoLabel(p.name_key);
    if (!p.option) return base;
    if (isDatePartOption(p.option)) {
      const label = DATE_PART_TARGETS.find((d) => d.option === p.option)?.label || p.option;
      return `${base}: ${label}`;
    }
    return `${base}: ${p.option}`;
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
    if ((event.target as HTMLElement | null)?.closest?.('.ae-box')) return;
    if (this.viewMode() === 'preview') return;
    if (event.button !== 0 && event.pointerType === 'mouse') return;
    event.preventDefault();
    const layer = this.overlayLayer?.nativeElement;
    if (!layer) return;
    const { x, y } = this.pointerNorm(event, layer);

    if (!this.selectedTarget()) {
      this.toast.warning(
        'Aparência do PDF',
        'Selecione um campo (ou Dia/Mês/Ano) à esquerda e desenhe no PDF. Para mover, arraste a caixa.',
      );
      return;
    }

    this.gesture = { mode: 'draw', startX: x, startY: y };
    this.draftBox.set({ x, y, w: 0, h: 0 });
    this.capturePointer(event, layer);
  }

  /** Arrastar caixa existente. */
  onBoxPointerDown(event: PointerEvent, p: PrintLayoutPlacement): void {
    if (this.viewMode() === 'preview') return;
    if (event.button !== 0 && event.pointerType === 'mouse') return;
    event.preventDefault();
    event.stopPropagation();
    const layer = this.overlayLayer?.nativeElement;
    if (!layer) return;
    const { x, y } = this.pointerNorm(event, layer);
    const uid = p.uid || newPlacementUid();
    if (!p.uid) {
      this.placements.set(
        this.placements().map((item) => (samePlacementBox(item, p) ? { ...item, uid } : item)),
      );
    }
    this.selectedTarget.set({ name_key: p.name_key, option: p.option ?? null });
    this.selectedUid.set(uid);
    this.gesture = {
      mode: 'move',
      uid,
      grabX: x - p.x,
      grabY: y - p.y,
      start: { ...p, uid },
    };
    this.capturePointer(event, layer);
  }

  /** Redimensionar pelo canto. */
  onResizePointerDown(event: PointerEvent, p: PrintLayoutPlacement): void {
    if (this.viewMode() === 'preview') return;
    if (event.button !== 0 && event.pointerType === 'mouse') return;
    event.preventDefault();
    event.stopPropagation();
    const layer = this.overlayLayer?.nativeElement;
    if (!layer) return;
    const uid = p.uid || newPlacementUid();
    if (!p.uid) {
      this.placements.set(
        this.placements().map((item) => (samePlacementBox(item, p) ? { ...item, uid } : item)),
      );
    }
    this.selectedTarget.set({ name_key: p.name_key, option: p.option ?? null });
    this.selectedUid.set(uid);
    this.gesture = {
      mode: 'resize',
      uid,
      start: { ...p, uid },
    };
    this.capturePointer(event, layer);
  }

  /** Remove só esta caixa (útil quando a data se repete no PDF). */
  removerBox(p: PrintLayoutPlacement, event?: Event): void {
    event?.stopPropagation();
    this.placements.set(this.placements().filter((item) => !samePlacementBox(item, p)));
    if (p.uid && this.selectedUid() === p.uid) this.selectedUid.set(null);
    this.dirty.set(true);
  }

  onOverlayPointerMove(event: PointerEvent): void {
    if (!this.gesture) return;
    if (this.activePointerId !== null && event.pointerId !== this.activePointerId) return;
    event.preventDefault();
    this.onPointerMove(event);
  }

  onOverlayPointerUp(event: PointerEvent): void {
    if (!this.gesture) return;
    if (this.activePointerId !== null && event.pointerId !== this.activePointerId) return;
    event.preventDefault();
    this.onPointerUp(event);
  }

  limparTudo(): void {
    this.placements.set([]);
    this.selectedUid.set(null);
    this.dirty.set(true);
    this.draftBox.set(null);
  }

  salvar(): void {
    const tpl = this.template();
    if (!tpl || this.salvando()) return;
    const layout: PrintLayout = {
      version: 1,
      placements: this.placements().map((p) => ({
        ...p,
        x: clamp01(p.x),
        y: clamp01(p.y),
        w: Math.min(1, Math.max(0.005, p.w)),
        h: Math.min(1, Math.max(0.005, p.h)),
      })),
    };
    this.salvando.set(true);
    this.templatesService.updatePrintLayout(tpl.id, layout).subscribe({
      next: (updated) => {
        this.salvando.set(false);
        const saved = parsePrintLayout(updated.print_layout);
        if (layout.placements.length > 0 && !hasUsablePrintLayout(saved)) {
          this.toast.error(
            'Aparência do PDF',
            'O servidor não confirmou o mapa. Tente salvar de novo.',
          );
          return;
        }
        this.template.set(updated);
        if (saved) this.placements.set(saved.placements);
        this.dirty.set(false);
        this.toast.success(
          'Aparência do PDF',
          hasUsablePrintLayout(saved)
            ? `Mapa salvo (${saved!.placements.length} áreas). O protocolo usará este layout.`
            : 'Mapa limpo. O PDF voltará ao layout padrão.',
        );
      },
      error: (err) => {
        this.salvando.set(false);
        const msg =
          err?.error?.message ||
          err?.error?.errors?.print_layout?.[0] ||
          err?.error?.errors?.['print_layout.placements']?.[0] ||
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
      this.patchPlacementByUid(this.gesture.uid, { ...start, x: nx, y: ny });
      return;
    }

    if (this.gesture.mode === 'resize') {
      const start = this.gesture.start;
      const nextW = Math.max(0.01, Math.min(x - start.x, 1 - start.x));
      const nextH = Math.max(0.008, Math.min(y - start.y, 1 - start.y));
      this.patchPlacementByUid(this.gesture.uid, { ...start, w: nextW, h: nextH });
    }
  }

  private onPointerUp(_event: PointerEvent): void {
    const gesture = this.gesture;
    this.gesture = null;
    this.releasePointerCapture();
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
    const isDatePart = hasOption && isDatePartOption(target.option);
    const isChoiceOption =
      hasOption &&
      (field?.type === 'radio' || field?.type === 'checkbox' || field?.type === 'select');

    const placement: PrintLayoutPlacement = {
      name_key: target.name_key,
      option: hasOption ? target.option : null,
      uid: newPlacementUid(),
      page: this.pageIndex(),
      x: draft.x,
      y: draft.y,
      w: draft.w,
      h: draft.h,
      kind: system?.kind ?? inferPlacementKind(field?.type, hasOption),
      align: 'left',
      font_size: field?.type === 'textarea' ? 9 : isDatePart ? 10 : 9,
    };

    // Texto único de rádio/select (ex.: estado civil): uma caixa e remove ✓ antigos do campo.
    if (field && this.fieldIsChoice(field) && !hasOption) {
      const others = this.placements().filter((p) => p.name_key !== target.name_key);
      this.placements.set([...others, placement]);
    } else if (isChoiceOption) {
      // Uma caixa por opção (substitui a anterior da mesma opção).
      const others = this.placements().filter((p) => !samePlacement(p, placement));
      this.placements.set([...others, placement]);
    } else {
      // Data etc.: pode repetir no PDF.
      this.placements.set([...this.placements(), placement]);
    }
    this.selectedUid.set(placement.uid!);
    this.dirty.set(true);
  }

  private capturePointer(event: PointerEvent, layer: HTMLElement): void {
    this.activePointerId = event.pointerId;
    try {
      layer.setPointerCapture(event.pointerId);
    } catch {
      // Alguns browsers rejeitam se o pointer já terminou
    }
  }

  private releasePointerCapture(): void {
    const layer = this.overlayLayer?.nativeElement;
    const id = this.activePointerId;
    this.activePointerId = null;
    if (!layer || id === null) return;
    try {
      if (layer.hasPointerCapture?.(id)) {
        layer.releasePointerCapture(id);
      }
    } catch {
      // ignore
    }
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

  private patchPlacementByUid(uid: string, next: PrintLayoutPlacement): void {
    this.placements.set(
      this.placements().map((p) => (p.uid === uid || (!p.uid && samePlacementBox(p, next)) ? { ...next, uid } : p)),
    );
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

    const viewport = page.getViewport({ scale: 1.5 });
    const w = Math.floor(viewport.width);
    const h = Math.floor(viewport.height);
    canvas.width = w;
    canvas.height = h;
    this.stageWidth.set(w);
    this.stageHeight.set(h);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    await page.render({ canvasContext: ctx, viewport, canvas }).promise;
  }
}

function clamp01(n: number): number {
  return Math.min(1, Math.max(0, n));
}
