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
import { ProductTelemetryService } from '../../core/services/product-telemetry.service';
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
import {
  fillSourcePdf,
  type FillSourcePdfFieldValue,
} from '../../core/utils/fill-source-pdf.util';
import {
  detectPrintLayoutSuggestions,
  mergeDetectResults,
  normalizeApiDetectResult,
  suggestFromKnownFields,
  suggestionToPlacement,
  type PrintLayoutSuggestion,
} from '../../core/utils/detect-print-layout.util';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  buildPdfFingerprint,
  parseArchivedPrintLayout,
  planReuseFromArchived,
} from '../../core/utils/reuse-print-layout.util';

type PdfJsPage = {
  getViewport: (opts: { scale: number }) => { width: number; height: number };
  getTextContent: () => Promise<{
    items: Array<{ str?: string; transform?: number[]; width?: number; height?: number }>;
  }>;
  getAnnotations: () => Promise<Array<Record<string, unknown>>>;
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

type GuideLine = { axis: 'x' | 'y'; pos: number };

type Gesture =
  | { mode: 'draw'; startX: number; startY: number }
  | {
      mode: 'move';
      uid: string;
      grabX: number;
      grabY: number;
      start: PrintLayoutPlacement;
      starts: PrintLayoutPlacement[];
    }
  | {
      mode: 'resize';
      uid: string;
      start: PrintLayoutPlacement;
    }
  | {
      mode: 'pan';
      startClientX: number;
      startClientY: number;
      startScrollLeft: number;
      startScrollTop: number;
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
  @ViewChild('stageScroll', { static: false }) stageScroll?: ElementRef<HTMLElement>;

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
  /** Multi-seleção (Ctrl/Shift+clique). */
  readonly selectedUids = signal<string[]>([]);
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
  readonly canUndo = signal(false);
  readonly canRedo = signal(false);
  readonly autosaving = signal(false);
  readonly generatingPreview = signal(false);
  readonly layoutWarnings = signal<string[]>([]);
  readonly snapEnabled = signal(true);
  readonly panTool = signal(false);
  readonly spaceHeld = signal(false);
  readonly guideLines = signal<GuideLine[]>([]);
  /** Miniaturas JPEG (data URL) por página; string vazia = ainda não gerada. */
  readonly pageThumbnails = signal<string[]>([]);
  readonly suggestions = signal<PrintLayoutSuggestion[]>([]);
  readonly detecting = signal(false);
  readonly detectMessage = signal('');
  readonly reusingLayout = signal(false);
  readonly reuseMessage = signal('');

  readonly placementsOnPage = computed(() =>
    this.placements().filter((p) => p.page === this.pageIndex()),
  );

  readonly suggestionsOnPage = computed(() =>
    this.suggestions().filter((s) => s.page === this.pageIndex()),
  );

  /** Contagem de áreas mapeadas por página (0-based). */
  readonly fieldsPerPage = computed(() => {
    const counts = new Array(Math.max(1, this.pageCount())).fill(0) as number[];
    for (const p of this.placements()) {
      if (p.page >= 0 && p.page < counts.length) counts[p.page] += 1;
    }
    return counts;
  });

  readonly selectedPlacement = computed(() => {
    const uid = this.selectedUid();
    if (!uid) return null;
    return this.placements().find((p) => p.uid === uid) ?? null;
  });

  readonly selectedPlacements = computed(() => {
    const set = new Set(this.selectedUids());
    return this.placements().filter((p) => p.uid && set.has(p.uid));
  });

  readonly selectedCount = computed(() => this.selectedUids().length);

  readonly isPanning = computed(() => this.panTool() || this.spaceHeld());

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
    if (this.viewMode() === 'preview') return 'Prévia das respostas nas áreas mapeadas.';
    if (this.isPanning()) return 'Arraste para navegar no PDF (Espaço ou ferramenta mão).';
    if (this.selectedCount() > 1) {
      return `${this.selectedCount()} caixas selecionadas · alinhe no painel ou arraste juntas.`;
    }
    if (!this.selectedTarget()) return 'Selecione um campo e desenhe no PDF.';
    return 'Arraste as caixas · Ctrl+clique multi-seleciona · snap nas guias.';
  });

  get zoomPercent(): number {
    return Math.round(this.zoom() * 100);
  }

  private pdfDoc: PdfJsDoc | null = null;
  private pdfObjectUrl: string | null = null;
  private sourcePdfBytes: Uint8Array | null = null;
  private workerBlobUrl: string | null = null;
  private gesture: Gesture | null = null;
  private renderToken = 0;
  private activePointerId: number | null = null;
  private sidebarWasCollapsed: boolean | null = null;
  private historyStack: PrintLayoutPlacement[][] = [];
  private historyIndex = -1;
  private historySuspended = false;
  private clipboard: PrintLayoutPlacement | null = null;
  private autosaveTimer: ReturnType<typeof setTimeout> | null = null;

  private route = inject(ActivatedRoute);
  private templatesService = inject(TemplatesService);
  private productTelemetry = inject(ProductTelemetryService);
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
        this.replacePlacements(layout.placements, { markDirty: false, pushHistory: true });
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
    this.clearAutosaveTimer();
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
    const tag = (event.target as HTMLElement | null)?.tagName?.toLowerCase();
    if (tag === 'input' || tag === 'textarea' || tag === 'select') return;

    if (event.code === 'Space' && !event.repeat && !(event.ctrlKey || event.metaKey || event.altKey)) {
      event.preventDefault();
      this.spaceHeld.set(true);
      return;
    }

    const mod = event.ctrlKey || event.metaKey;
    const key = event.key.toLowerCase();

    if (mod && key === 'a' && this.viewMode() === 'edit') {
      event.preventDefault();
      this.selecionarTodasNaPagina();
      return;
    }
    if (mod && key === 'z' && !event.shiftKey) {
      event.preventDefault();
      this.undo();
      return;
    }
    if ((mod && key === 'y') || (mod && event.shiftKey && key === 'z')) {
      event.preventDefault();
      this.redo();
      return;
    }
    if (mod && key === 'd') {
      event.preventDefault();
      this.duplicarSelecionado();
      return;
    }
    if (mod && key === 'c') {
      event.preventDefault();
      this.copiarSelecionado();
      return;
    }
    if (mod && key === 'v') {
      event.preventDefault();
      this.colarClipboard();
      return;
    }
    if (mod && key === 's') {
      event.preventDefault();
      this.salvar();
      return;
    }

    if (this.viewMode() !== 'edit') return;

    if (event.key === 'Escape') {
      this.clearSelection();
      return;
    }

    if (event.key === 'Delete' || event.key === 'Backspace') {
      if (this.selectedCount() === 0) return;
      event.preventDefault();
      this.removerSelecionados();
      return;
    }

    const selected = this.selectedPlacements();
    if (!selected.length) return;

    const step = event.shiftKey ? 0.01 : 0.002;
    let dx = 0;
    let dy = 0;
    if (event.key === 'ArrowLeft') dx = -step;
    else if (event.key === 'ArrowRight') dx = step;
    else if (event.key === 'ArrowUp') dy = -step;
    else if (event.key === 'ArrowDown') dy = step;
    else return;

    event.preventDefault();
    this.nudgeSelected(dx, dy);
  }

  @HostListener('window:keyup', ['$event'])
  onKeyup(event: KeyboardEvent): void {
    if (event.code === 'Space') {
      this.spaceHeld.set(false);
      if (this.gesture?.mode === 'pan') {
        this.gesture = null;
        this.releasePointerCapture();
      }
    }
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
    this.setZoom(Math.min(2, Math.round((this.zoom() + 0.1) * 10) / 10));
  }

  zoomOut(): void {
    this.setZoom(Math.max(0.5, Math.round((this.zoom() - 0.1) * 10) / 10));
  }

  setZoom(value: number): void {
    this.zoom.set(Math.min(2, Math.max(0.5, Math.round(value * 100) / 100)));
  }

  zoomFitWidth(): void {
    const scroll = document.querySelector('.ae-stage-scroll') as HTMLElement | null;
    const stageW = this.stageWidth();
    if (!scroll || stageW <= 0) {
      this.setZoom(1);
      return;
    }
    const available = Math.max(120, scroll.clientWidth - 32);
    this.setZoom(available / stageW);
  }

  pageFieldCount(page: number): number {
    return this.fieldsPerPage()[page] ?? 0;
  }

  undo(): void {
    if (this.historyIndex <= 0) return;
    this.historyIndex -= 1;
    this.historySuspended = true;
    this.placements.set(clonePlacements(this.historyStack[this.historyIndex]));
    this.historySuspended = false;
    this.syncHistoryFlags();
    this.dirty.set(true);
    this.refreshWarnings();
    this.scheduleAutosave();
  }

  redo(): void {
    if (this.historyIndex >= this.historyStack.length - 1) return;
    this.historyIndex += 1;
    this.historySuspended = true;
    this.placements.set(clonePlacements(this.historyStack[this.historyIndex]));
    this.historySuspended = false;
    this.syncHistoryFlags();
    this.dirty.set(true);
    this.refreshWarnings();
    this.scheduleAutosave();
  }

  duplicarSelecionado(): void {
    const selected = this.selectedPlacements();
    if (!selected.length || this.viewMode() !== 'edit') return;
    const copies = selected.map((sel) => ({
      ...sel,
      uid: newPlacementUid(),
      x: clamp01(Math.min(sel.x + 0.02, 1 - sel.w)),
      y: clamp01(Math.min(sel.y + 0.02, 1 - sel.h)),
    }));
    this.replacePlacements([...this.placements(), ...copies], { markDirty: true, pushHistory: true });
    this.setSelection(
      copies.map((c) => c.uid!),
      copies[copies.length - 1]?.uid,
    );
    const last = copies[copies.length - 1];
    if (last) {
      this.selectedTarget.set({ name_key: last.name_key, option: last.option ?? null });
    }
  }

  copiarSelecionado(): void {
    const sel = this.selectedPlacement();
    if (!sel) return;
    this.clipboard = { ...sel };
    this.toast.info('Aparência do PDF', 'Caixa copiada. Ctrl+V para colar.');
  }

  colarClipboard(): void {
    if (!this.clipboard || this.viewMode() !== 'edit') return;
    const base = this.clipboard;
    const copy: PrintLayoutPlacement = {
      ...base,
      uid: newPlacementUid(),
      page: this.pageIndex(),
      x: clamp01(Math.min(base.x + 0.02, 1 - base.w)),
      y: clamp01(Math.min(base.y + 0.02, 1 - base.h)),
    };
    this.replacePlacements([...this.placements(), copy], { markDirty: true, pushHistory: true });
    this.setSelection([copy.uid!], copy.uid);
    this.selectedTarget.set({ name_key: copy.name_key, option: copy.option ?? null });
  }

  async detectarCampos(): Promise<void> {
    if (!this.pdfDoc || this.detecting() || this.viewMode() !== 'edit') return;
    this.detecting.set(true);
    this.detectMessage.set('');
    try {
      const local = await detectPrintLayoutSuggestions(this.pdfDoc);
      let remote = null;
      const tplId = this.template()?.id;
      if (tplId) {
        try {
          const apiRaw = await firstValueFrom(this.templatesService.detectPrintLayout(tplId));
          remote = normalizeApiDetectResult(apiRaw);
        } catch (apiErr) {
          console.warn('[aparencia-pdf] detecção API indisponível; usando só o editor', apiErr);
        }
      }
      let result = mergeDetectResults(local, remote);

      // PDF-01C — corresponde campos do modelo aos rótulos do PDF (local, com revisão).
      const known = this.campos()
        .filter((c) => !!c.name_key && !!c.label)
        .map((c) => ({ name_key: c.name_key!, label: c.label, type: c.type }));
      if (known.length > 0 && this.pdfDoc) {
        try {
          const matched = await suggestFromKnownFields(this.pdfDoc, known);
          if (matched.length > 0) {
            result = mergeDetectResults(result, {
              mode: result.mode === 'empty' ? 'text' : result.mode,
              page_count: result.page_count,
              has_text: true,
              suggestions: matched,
              message: `${matched.length} correspondência(s) com campos do modelo.`,
            });
          }
        } catch (matchErr) {
          console.warn('[aparencia-pdf] correspondência de campos falhou', matchErr);
        }
      }

      // PDF-01C — endpoint assistido (flag): provider/servidor pode complementar.
      if (
        environment.printLayoutAiEnabled &&
        tplId &&
        (result.suggestions.length === 0 || result.mode === 'scanned' || result.mode === 'empty')
      ) {
        try {
          const aiRaw = await firstValueFrom(this.templatesService.detectPrintLayoutAi(tplId));
          const ai = normalizeApiDetectResult(aiRaw);
          this.productTelemetry.trackPdfMapper('pdf_detect_ai_ran', {
            template_id: tplId,
            mode: ai.mode,
            suggestions_count: ai.suggestions.length,
            page_count: ai.page_count,
          });
          if (ai.mode === 'ai_disabled' && result.suggestions.length === 0) {
            result = { ...result, message: ai.message, mode: ai.mode };
          } else if (ai.suggestions.length > 0) {
            result = mergeDetectResults(result, ai);
          } else if (ai.message && result.suggestions.length === 0) {
            result = { ...result, message: ai.message, mode: ai.mode || result.mode };
          }
        } catch (aiErr) {
          console.warn('[aparencia-pdf] detecção IA indisponível', aiErr);
        }
      }

      this.suggestions.set(result.suggestions);
      this.detectMessage.set(result.message);
      if (tplId) {
        this.productTelemetry.trackPdfMapper('pdf_detect_ran', {
          template_id: tplId,
          mode: result.mode,
          suggestions_count: result.suggestions.length,
          page_count: result.page_count,
          has_text: !!result.has_text,
          source: remote ? 'local+api' : 'local',
        });
      }
      if (result.suggestions.length === 0) {
        this.toast.warning('Detecção', result.message);
      } else {
        this.toast.success('Detecção', result.message);
        const first = result.suggestions[0];
        if (first && first.page !== this.pageIndex()) {
          void this.goToPage(first.page);
        }
      }
    } catch (err) {
      console.error('[aparencia-pdf] detecção falhou', err);
      this.toast.error('Detecção', 'Não foi possível analisar o PDF.');
    } finally {
      this.detecting.set(false);
    }
  }

  /** PDF-01D — reaproveita mapa arquivado se páginas/dimensões forem compatíveis. */
  async reaproveitarMapeamentoAnterior(): Promise<void> {
    if (this.reusingLayout() || this.viewMode() !== 'edit') return;
    const archived = parseArchivedPrintLayout(this.template()?.print_layout_archived);
    if (!archived) {
      this.toast.warning('Reaproveitar', 'Não há mapeamento arquivado deste modelo.');
      return;
    }
    if (!this.pdfDoc) {
      this.toast.warning('Reaproveitar', 'Carregue o PDF antes de reaproveitar o mapa.');
      return;
    }
    this.reusingLayout.set(true);
    this.reuseMessage.set('');
    try {
      const fp = await buildPdfFingerprint(this.pdfDoc);
      const known = new Set(this.campos().map((c) => c.name_key).filter(Boolean) as string[]);
      const plan = planReuseFromArchived(archived, fp, known);
      this.reuseMessage.set(plan.message);
      if (plan.status !== 'compatible' || plan.copied.length === 0) {
        this.toast.warning('Reaproveitar', plan.message);
        return;
      }
      this.replacePlacements(plan.copied, { markDirty: true, pushHistory: true });
      this.toast.success('Reaproveitar', plan.message);
      this.refreshWarnings();
      const tplId = this.template()?.id;
      if (tplId) {
        this.productTelemetry.trackPdfMapper('pdf_mapping_reused', {
          template_id: tplId,
          placements_count: plan.copied.length,
        });
      }
    } catch (err) {
      console.error('[aparencia-pdf] reaproveitar falhou', err);
      this.toast.error('Reaproveitar', 'Não foi possível comparar o PDF com o mapa anterior.');
    } finally {
      this.reusingLayout.set(false);
    }
  }

  get temMapeamentoArquivado(): boolean {
    return !!parseArchivedPrintLayout(this.template()?.print_layout_archived);
  }

  aceitarSugestao(s: PrintLayoutSuggestion): void {
    const placement = suggestionToPlacement(s);
    // Se já existe campo digital com name_key semelhante, reutiliza a chave
    const matchCampo = this.campos().find(
      (c) =>
        c.name_key === s.name_key ||
        c.label.toLowerCase() === s.label.toLowerCase() ||
        c.name_key.replace(/_/g, '') === s.name_key.replace(/_/g, ''),
    );
    if (matchCampo) {
      placement.name_key = matchCampo.name_key;
      placement.kind = inferPlacementKind(matchCampo.type, false);
    }
    this.replacePlacements([...this.placements(), placement], {
      markDirty: true,
      pushHistory: true,
    });
    this.suggestions.set(this.suggestions().filter((x) => x.temporary_id !== s.temporary_id));
    this.setSelection([placement.uid!], placement.uid);
    this.selectedTarget.set({ name_key: placement.name_key, option: null });
    const tplId = this.template()?.id;
    if (tplId) {
      this.productTelemetry.trackPdfMapper('pdf_suggestion_accepted', {
        template_id: tplId,
        source: s.source ?? null,
        count: 1,
      });
    }
  }

  rejeitarSugestao(s: PrintLayoutSuggestion): void {
    this.suggestions.set(this.suggestions().filter((x) => x.temporary_id !== s.temporary_id));
    const tplId = this.template()?.id;
    if (tplId) {
      this.productTelemetry.trackPdfMapper('pdf_suggestion_rejected', {
        template_id: tplId,
        source: s.source ?? null,
        count: 1,
      });
    }
  }

  aceitarTodasSugestoesDaPagina(): void {
    const pageSugs = this.suggestionsOnPage();
    if (!pageSugs.length) return;
    const additions = pageSugs.map((s) => {
      const p = suggestionToPlacement(s);
      const matchCampo = this.campos().find((c) => c.name_key === s.name_key);
      if (matchCampo) {
        p.name_key = matchCampo.name_key;
        p.kind = inferPlacementKind(matchCampo.type, false);
      }
      return p;
    });
    const ids = new Set(pageSugs.map((s) => s.temporary_id));
    this.replacePlacements([...this.placements(), ...additions], {
      markDirty: true,
      pushHistory: true,
    });
    this.suggestions.set(this.suggestions().filter((s) => !ids.has(s.temporary_id)));
    const tplId = this.template()?.id;
    if (tplId) {
      this.productTelemetry.trackPdfMapper('pdf_suggestion_accepted', {
        template_id: tplId,
        count: pageSugs.length,
        bulk: true,
      });
    }
  }

  limparSugestoes(): void {
    this.suggestions.set([]);
    this.detectMessage.set('');
  }

  confidencePct(s: PrintLayoutSuggestion): number {
    return Math.round((s.confidence || 0) * 100);
  }

  async gerarPreviewPdf(): Promise<void> {
    if (!this.sourcePdfBytes || this.generatingPreview()) return;
    const layout: PrintLayout = {
      version: 1,
      placements: this.placements(),
    };
    if (!hasUsablePrintLayout(layout)) {
      this.toast.warning('Aparência do PDF', 'Mapeie ao menos uma área antes da prévia real.');
      return;
    }
    this.generatingPreview.set(true);
    try {
      const values = this.buildSyntheticFillValues(layout.placements);
      const blob = await fillSourcePdf({
        sourcePdfBytes: this.sourcePdfBytes,
        layout,
        values,
      });
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank', 'noopener');
      setTimeout(() => URL.revokeObjectURL(url), 60_000);
      this.toast.success('Aparência do PDF', 'Prévia do PDF final aberta (dados sintéticos).');
    } catch (err) {
      console.error('[aparencia-pdf] prévia real falhou', err);
      this.toast.error('Aparência do PDF', 'Não foi possível gerar a prévia do PDF.');
    } finally {
      this.generatingPreview.set(false);
    }
  }

  pct(n: number): number {
    return Math.round(n * 1000) / 10;
  }

  isBoxSelected(p: PrintLayoutPlacement): boolean {
    return !!p.uid && this.selectedUids().includes(p.uid);
  }

  togglePanTool(): void {
    this.panTool.update((v) => !v);
  }

  toggleSnap(): void {
    this.snapEnabled.update((v) => !v);
    if (!this.snapEnabled()) this.guideLines.set([]);
  }

  clearSelection(): void {
    this.selectedUids.set([]);
    this.selectedUid.set(null);
  }

  selecionarTodasNaPagina(): void {
    const uids = this.placementsOnPage()
      .map((p) => p.uid)
      .filter((u): u is string => !!u);
    this.selectedUids.set(uids);
    this.selectedUid.set(uids[0] ?? null);
  }

  setSelection(uids: string[], primary?: string | null): void {
    const unique = [...new Set(uids.filter(Boolean))];
    this.selectedUids.set(unique);
    this.selectedUid.set(primary ?? unique[unique.length - 1] ?? null);
  }

  nudgeSelected(dx: number, dy: number): void {
    const selected = this.selectedPlacements();
    if (!selected.length) return;
    const byUid = new Map(selected.map((p) => [p.uid!, p]));
    const next = this.placements().map((p) => {
      if (!p.uid || !byUid.has(p.uid)) return p;
      return {
        ...p,
        x: clamp01(Math.min(p.x + dx, 1 - p.w)),
        y: clamp01(Math.min(p.y + dy, 1 - p.h)),
      };
    });
    this.replacePlacements(next, { markDirty: true, pushHistory: true });
  }

  removerSelecionados(): void {
    const set = new Set(this.selectedUids());
    if (!set.size) return;
    this.replacePlacements(
      this.placements().filter((p) => !p.uid || !set.has(p.uid)),
      { markDirty: true, pushHistory: true },
    );
    this.clearSelection();
  }

  /** Alinha caixas selecionadas entre si (mín. 2). */
  alignSelection(mode: 'left' | 'right' | 'top' | 'bottom' | 'hcenter' | 'vcenter'): void {
    const selected = this.selectedPlacements();
    if (selected.length < 2) return;
    const left = Math.min(...selected.map((p) => p.x));
    const top = Math.min(...selected.map((p) => p.y));
    const right = Math.max(...selected.map((p) => p.x + p.w));
    const bottom = Math.max(...selected.map((p) => p.y + p.h));
    const cx = (left + right) / 2;
    const cy = (top + bottom) / 2;
    const byUid = new Map(selected.map((p) => [p.uid!, p]));
    const next = this.placements().map((p) => {
      if (!p.uid || !byUid.has(p.uid)) return p;
      let x = p.x;
      let y = p.y;
      if (mode === 'left') x = left;
      if (mode === 'right') x = right - p.w;
      if (mode === 'top') y = top;
      if (mode === 'bottom') y = bottom - p.h;
      if (mode === 'hcenter') x = cx - p.w / 2;
      if (mode === 'vcenter') y = cy - p.h / 2;
      return {
        ...p,
        x: clamp01(Math.min(x, 1 - p.w)),
        y: clamp01(Math.min(y, 1 - p.h)),
      };
    });
    this.replacePlacements(next, { markDirty: true, pushHistory: true });
  }

  distributeSelection(axis: 'h' | 'v'): void {
    const selected = [...this.selectedPlacements()].sort((a, b) =>
      axis === 'h' ? a.x - b.x : a.y - b.y,
    );
    if (selected.length < 3) return;
    if (axis === 'h') {
      const left = selected[0].x;
      const right = selected[selected.length - 1].x + selected[selected.length - 1].w;
      const totalW = selected.reduce((s, p) => s + p.w, 0);
      const gap = (right - left - totalW) / (selected.length - 1);
      let cursor = left;
      const pos = new Map<string, number>();
      for (const p of selected) {
        pos.set(p.uid!, cursor);
        cursor += p.w + gap;
      }
      const next = this.placements().map((p) =>
        p.uid && pos.has(p.uid)
          ? { ...p, x: clamp01(Math.min(pos.get(p.uid)!, 1 - p.w)) }
          : p,
      );
      this.replacePlacements(next, { markDirty: true, pushHistory: true });
      return;
    }
    const top = selected[0].y;
    const bottom = selected[selected.length - 1].y + selected[selected.length - 1].h;
    const totalH = selected.reduce((s, p) => s + p.h, 0);
    const gap = (bottom - top - totalH) / (selected.length - 1);
    let cursor = top;
    const pos = new Map<string, number>();
    for (const p of selected) {
      pos.set(p.uid!, cursor);
      cursor += p.h + gap;
    }
    const next = this.placements().map((p) =>
      p.uid && pos.has(p.uid)
        ? { ...p, y: clamp01(Math.min(pos.get(p.uid)!, 1 - p.h)) }
        : p,
    );
    this.replacePlacements(next, { markDirty: true, pushHistory: true });
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
    this.patchPlacementByUid(sel.uid, next, { commit: true });
  }

  patchSelectedFont(value: number | string): void {
    const sel = this.selectedPlacement();
    if (!sel?.uid) return;
    const n = Number(value);
    if (!Number.isFinite(n)) return;
    this.patchPlacementByUid(sel.uid, {
      ...sel,
      font_size: Math.min(28, Math.max(6, Math.round(n))),
    }, { commit: true });
  }

  patchSelectedAlign(value: string | null): void {
    const sel = this.selectedPlacement();
    if (!sel?.uid) return;
    const align: PrintLayoutAlign =
      value === 'center' || value === 'right' ? value : 'left';
    this.patchPlacementByUid(sel.uid, { ...sel, align }, { commit: true });
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
    if (existing?.uid) {
      this.setSelection([existing.uid], existing.uid);
      if (existing.page !== this.pageIndex()) {
        void this.goToPage(existing.page);
      }
    } else {
      this.clearSelection();
    }
  }

  removerCampo(target: PrintLayoutTarget, event?: Event): void {
    event?.stopPropagation();
    const removed = this.placements().filter((p) => samePlacement(p, target));
    this.replacePlacements(
      this.placements().filter((p) => !samePlacement(p, target)),
      { markDirty: true, pushHistory: true },
    );
    const cur = this.selectedTarget();
    if (cur && samePlacement(cur, target)) this.selectedTarget.set(null);
    const removedUids = new Set(removed.map((p) => p.uid).filter(Boolean) as string[]);
    if (removedUids.size) {
      this.selectedUids.set(this.selectedUids().filter((u) => !removedUids.has(u)));
      if (this.selectedUid() && removedUids.has(this.selectedUid()!)) {
        this.selectedUid.set(this.selectedUids()[0] ?? null);
      }
    }
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

  /** Clique no fundo do PDF → pan, limpa seleção ou desenha nova área. */
  onLayerPointerDown(event: PointerEvent): void {
    if ((event.target as HTMLElement | null)?.closest?.('.ae-box')) return;
    if (this.viewMode() === 'preview') return;

    const wantsPan =
      this.isPanning() || event.button === 1 || (event.button === 0 && event.altKey);
    if (wantsPan) {
      event.preventDefault();
      this.beginPan(event);
      return;
    }

    if (event.button !== 0 && event.pointerType === 'mouse') return;
    event.preventDefault();
    const layer = this.overlayLayer?.nativeElement;
    if (!layer) return;
    const { x, y } = this.pointerNorm(event, layer);

    if (!(event.ctrlKey || event.metaKey || event.shiftKey)) {
      this.clearSelection();
    }

    if (!this.selectedTarget()) {
      this.toast.warning(
        'Aparência do PDF',
        'Selecione um campo (ou Dia/Mês/Ano) à esquerda e desenhe no PDF. Espaço+arrastar = pan.',
      );
      return;
    }

    this.gesture = { mode: 'draw', startX: x, startY: y };
    this.draftBox.set({ x, y, w: 0, h: 0 });
    this.capturePointer(event, layer);
  }

  /** Arrastar caixa existente (com multi-select). */
  onBoxPointerDown(event: PointerEvent, p: PrintLayoutPlacement): void {
    if (this.viewMode() === 'preview') return;
    if (this.isPanning() || event.button === 1) {
      event.preventDefault();
      event.stopPropagation();
      this.beginPan(event);
      return;
    }
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

    const additive = event.ctrlKey || event.metaKey || event.shiftKey;
    if (additive) {
      const cur = this.selectedUids();
      if (cur.includes(uid)) {
        const next = cur.filter((u) => u !== uid);
        this.setSelection(next, next[next.length - 1] ?? null);
      } else {
        this.setSelection([...cur, uid], uid);
      }
    } else if (!this.selectedUids().includes(uid)) {
      this.setSelection([uid], uid);
    } else {
      this.selectedUid.set(uid);
    }

    this.selectedTarget.set({ name_key: p.name_key, option: p.option ?? null });

    const moveUids = new Set(
      this.selectedUids().includes(uid) ? this.selectedUids() : [uid],
    );
    if (!moveUids.has(uid)) moveUids.add(uid);
    const starts = this.placements()
      .filter((item) => item.uid && moveUids.has(item.uid))
      .map((item) => ({ ...item }));

    this.gesture = {
      mode: 'move',
      uid,
      grabX: x - p.x,
      grabY: y - p.y,
      start: { ...p, uid },
      starts,
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
    this.setSelection([uid], uid);
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
    if (p.uid && this.selectedUids().includes(p.uid) && this.selectedCount() > 1) {
      this.removerSelecionados();
      return;
    }
    this.replacePlacements(
      this.placements().filter((item) => !samePlacementBox(item, p)),
      { markDirty: true, pushHistory: true },
    );
    if (p.uid) {
      this.selectedUids.set(this.selectedUids().filter((u) => u !== p.uid));
      if (this.selectedUid() === p.uid) this.selectedUid.set(this.selectedUids()[0] ?? null);
    }
  }

  private beginPan(event: PointerEvent): void {
    const scroll = this.stageScroll?.nativeElement;
    const layer = this.overlayLayer?.nativeElement;
    if (!scroll || !layer) return;
    this.gesture = {
      mode: 'pan',
      startClientX: event.clientX,
      startClientY: event.clientY,
      startScrollLeft: scroll.scrollLeft,
      startScrollTop: scroll.scrollTop,
    };
    this.capturePointer(event, layer);
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
    this.replacePlacements([], { markDirty: true, pushHistory: true });
    this.clearSelection();
    this.draftBox.set(null);
    this.guideLines.set([]);
  }

  salvar(fromAutosave = false): void {
    void this.salvarAsync(fromAutosave);
  }

  private async salvarAsync(fromAutosave = false): Promise<void> {
    const tpl = this.template();
    if (!tpl || this.salvando() || this.autosaving()) return;
    if (!this.dirty() && fromAutosave) return;
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
    if (this.pdfDoc && layout.placements.length > 0) {
      try {
        layout.pdf_fingerprint = await buildPdfFingerprint(this.pdfDoc);
      } catch {
        /* fingerprint opcional */
      }
    }
    if (fromAutosave) this.autosaving.set(true);
    else this.salvando.set(true);
    this.templatesService.updatePrintLayout(tpl.id, layout).subscribe({
      next: (updated) => {
        this.salvando.set(false);
        this.autosaving.set(false);
        const saved = parsePrintLayout(updated.print_layout);
        if (layout.placements.length > 0 && !hasUsablePrintLayout(saved)) {
          if (!fromAutosave) {
            this.toast.error(
              'Aparência do PDF',
              'O servidor não confirmou o mapa. Tente salvar de novo.',
            );
          }
          return;
        }
        this.template.set(updated);
        if (saved) {
          this.replacePlacements(saved.placements, { markDirty: false, pushHistory: false });
        }
        this.dirty.set(false);
        this.productTelemetry.trackPdfMapper('pdf_print_layout_saved', {
          template_id: tpl.id,
          placements_count: layout.placements.length,
          autosave: !!fromAutosave,
        });
        if (!fromAutosave) {
          this.toast.success(
            'Aparência do PDF',
            hasUsablePrintLayout(saved)
              ? `Mapa salvo (${saved!.placements.length} áreas). Prévia e PDF dos protocolos passam a usar este layout.`
              : 'Mapa limpo. O PDF voltará ao layout padrão.',
          );
        }
      },
      error: (err) => {
        this.salvando.set(false);
        this.autosaving.set(false);
        if (fromAutosave) return;
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

    if (this.gesture.mode === 'pan') {
      const scroll = this.stageScroll?.nativeElement;
      if (!scroll) return;
      const dx = event.clientX - this.gesture.startClientX;
      const dy = event.clientY - this.gesture.startClientY;
      scroll.scrollLeft = this.gesture.startScrollLeft - dx;
      scroll.scrollTop = this.gesture.startScrollTop - dy;
      return;
    }

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

      const movingUids = new Set(this.gesture.starts.map((s) => s.uid).filter(Boolean) as string[]);
      const others = this.placementsOnPage().filter((p) => p.uid && !movingUids.has(p.uid));
      const snapped = this.snapEnabled()
        ? snapPlacement({ ...start, x: nx, y: ny }, others)
        : { x: nx, y: ny, guides: [] as GuideLine[] };
      this.guideLines.set(snapped.guides);

      const dx = snapped.x - start.x;
      const dy = snapped.y - start.y;
      const startByUid = new Map(this.gesture.starts.map((s) => [s.uid!, s]));
      this.placements.set(
        this.placements().map((p) => {
          if (!p.uid || !startByUid.has(p.uid)) return p;
          const s = startByUid.get(p.uid)!;
          return {
            ...s,
            x: clamp01(Math.min(s.x + dx, 1 - s.w)),
            y: clamp01(Math.min(s.y + dy, 1 - s.h)),
          };
        }),
      );
      return;
    }

    if (this.gesture.mode === 'resize') {
      const start = this.gesture.start;
      let nextW = Math.max(0.01, Math.min(x - start.x, 1 - start.x));
      let nextH = Math.max(0.008, Math.min(y - start.y, 1 - start.y));
      if (this.snapEnabled()) {
        const others = this.placementsOnPage().filter((p) => p.uid !== start.uid);
        const rightTargets = [1, ...others.flatMap((o) => [o.x, o.x + o.w, o.x + o.w / 2])];
        const bottomTargets = [1, ...others.flatMap((o) => [o.y, o.y + o.h, o.y + o.h / 2])];
        const snapR = nearestSnap(start.x + nextW, rightTargets, SNAP_THRESHOLD);
        const snapB = nearestSnap(start.y + nextH, bottomTargets, SNAP_THRESHOLD);
        const guides: GuideLine[] = [];
        if (snapR != null) {
          nextW = Math.max(0.01, snapR - start.x);
          guides.push({ axis: 'x', pos: snapR });
        }
        if (snapB != null) {
          nextH = Math.max(0.008, snapB - start.y);
          guides.push({ axis: 'y', pos: snapB });
        }
        this.guideLines.set(guides);
      }
      this.patchPlacementByUid(this.gesture.uid, { ...start, w: nextW, h: nextH });
    }
  }

  private onPointerUp(_event: PointerEvent): void {
    const gesture = this.gesture;
    this.gesture = null;
    this.releasePointerCapture();
    this.guideLines.set([]);
    if (!gesture) return;

    if (gesture.mode === 'pan') {
      return;
    }

    if (gesture.mode === 'move' || gesture.mode === 'resize') {
      this.pushHistorySnapshot();
      this.dirty.set(true);
      this.refreshWarnings();
      this.scheduleAutosave();
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
    let nextList: PrintLayoutPlacement[];
    if (field && this.fieldIsChoice(field) && !hasOption) {
      nextList = [...this.placements().filter((p) => p.name_key !== target.name_key), placement];
    } else if (isChoiceOption) {
      // Uma caixa por opção (substitui a anterior da mesma opção).
      nextList = [...this.placements().filter((p) => !samePlacement(p, placement)), placement];
    } else {
      // Data etc.: pode repetir no PDF.
      nextList = [...this.placements(), placement];
    }
    this.replacePlacements(nextList, { markDirty: true, pushHistory: true });
    this.setSelection([placement.uid!], placement.uid);
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

  private patchPlacementByUid(
    uid: string,
    next: PrintLayoutPlacement,
    opts?: { commit?: boolean },
  ): void {
    const mapped = this.placements().map((p) =>
      p.uid === uid || (!p.uid && samePlacementBox(p, next)) ? { ...next, uid } : p,
    );
    if (opts?.commit) {
      this.replacePlacements(mapped, { markDirty: true, pushHistory: true });
      return;
    }
    this.placements.set(mapped);
  }

  private replacePlacements(
    next: PrintLayoutPlacement[],
    opts: { markDirty: boolean; pushHistory: boolean },
  ): void {
    this.placements.set(clonePlacements(next));
    if (opts.pushHistory) this.pushHistorySnapshot();
    if (opts.markDirty) {
      this.dirty.set(true);
      this.scheduleAutosave();
    }
    this.refreshWarnings();
  }

  private pushHistorySnapshot(): void {
    if (this.historySuspended) return;
    const snapshot = clonePlacements(this.placements());
    if (this.historyIndex >= 0) {
      const cur = this.historyStack[this.historyIndex];
      if (cur && placementsEqual(cur, snapshot)) {
        this.syncHistoryFlags();
        return;
      }
    }
    this.historyStack = this.historyStack.slice(0, this.historyIndex + 1);
    this.historyStack.push(snapshot);
    if (this.historyStack.length > 80) {
      this.historyStack.shift();
    } else {
      this.historyIndex += 1;
    }
    this.historyIndex = this.historyStack.length - 1;
    this.syncHistoryFlags();
  }

  private syncHistoryFlags(): void {
    this.canUndo.set(this.historyIndex > 0);
    this.canRedo.set(this.historyIndex >= 0 && this.historyIndex < this.historyStack.length - 1);
  }

  private scheduleAutosave(): void {
    this.clearAutosaveTimer();
    this.autosaveTimer = setTimeout(() => {
      this.autosaveTimer = null;
      if (this.dirty() && !this.salvando()) {
        this.salvar(true);
      }
    }, 2500);
  }

  private clearAutosaveTimer(): void {
    if (this.autosaveTimer) {
      clearTimeout(this.autosaveTimer);
      this.autosaveTimer = null;
    }
  }

  private refreshWarnings(): void {
    const list = this.placements();
    const warnings: string[] = [];
    for (const p of list) {
      if (p.x < 0 || p.y < 0 || p.x + p.w > 1.002 || p.y + p.h > 1.002) {
        warnings.push(`“${this.placementTitle(p)}” ultrapassa a página.`);
      }
      if (p.w < 0.01 || p.h < 0.008) {
        warnings.push(`“${this.placementTitle(p)}” está muito pequena.`);
      }
    }
    for (let i = 0; i < list.length; i++) {
      for (let j = i + 1; j < list.length; j++) {
        const a = list[i];
        const b = list[j];
        if (a.page !== b.page) continue;
        if (boxesOverlap(a, b)) {
          warnings.push(`Sobreposição: “${this.placementTitle(a)}” e “${this.placementTitle(b)}”.`);
        }
      }
    }
    this.layoutWarnings.set(warnings.slice(0, 8));
  }

  private buildSyntheticFillValues(placements: PrintLayoutPlacement[]): FillSourcePdfFieldValue[] {
    const byKey = new Map<string, FillSourcePdfFieldValue>();
    for (const p of placements) {
      if (byKey.has(p.name_key)) continue;
      const sample = this.previewSample(p);
      if (p.kind === 'checkbox') {
        byKey.set(p.name_key, {
          name_key: p.name_key,
          checked: true,
          selected_options: p.option ? [p.option] : undefined,
          text: sample,
        });
      } else {
        byKey.set(p.name_key, { name_key: p.name_key, text: sample });
      }
    }
    return [...byKey.values()];
  }

  private loadPdf(templateId: number): void {
    this.templatesService.downloadSourceDocument(templateId).subscribe({
      next: async (blob) => {
        try {
          if (this.pdfObjectUrl) URL.revokeObjectURL(this.pdfObjectUrl);
          this.pdfObjectUrl = URL.createObjectURL(blob);
          const pdfjs = await import('pdfjs-dist');
          const data = new Uint8Array(await blob.arrayBuffer());
          this.sourcePdfBytes = data.slice();
          this.pdfDoc = (await this.openPdfDocument(pdfjs, data)) as unknown as PdfJsDoc;
          this.pageCount.set(this.pdfDoc.numPages);
          this.pageThumbnails.set(new Array(this.pdfDoc.numPages).fill(''));
          this.pageIndex.set(0);
          this.carregando.set(false);
          this.refreshWarnings();
          setTimeout(() => {
            void this.renderPage();
            void this.renderThumbnails();
          }, 0);
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

  /** Gera miniaturas leves de cada página (máx. 24) sem bloquear a edição. */
  private async renderThumbnails(): Promise<void> {
    const doc = this.pdfDoc;
    if (!doc) return;
    const total = doc.numPages;
    const limit = Math.min(total, 24);
    const next = new Array(total).fill('') as string[];
    for (let i = 1; i <= limit; i++) {
      try {
        const page = await doc.getPage(i);
        const viewport = page.getViewport({ scale: 0.22 });
        const canvas = document.createElement('canvas');
        canvas.width = Math.max(1, Math.floor(viewport.width));
        canvas.height = Math.max(1, Math.floor(viewport.height));
        const ctx = canvas.getContext('2d');
        if (!ctx) continue;
        await page.render({ canvasContext: ctx, viewport, canvas }).promise;
        next[i - 1] = canvas.toDataURL('image/jpeg', 0.7);
        // Atualiza progressivamente para a UI não esperar todas as páginas.
        if (i === 1 || i === limit || i % 3 === 0) {
          this.pageThumbnails.set([...next]);
        }
      } catch (err) {
        console.warn('[aparencia-pdf] miniatura página', i, err);
      }
    }
    this.pageThumbnails.set(next);
  }
}

function clamp01(n: number): number {
  return Math.min(1, Math.max(0, n));
}

const SNAP_THRESHOLD = 0.008;

function nearestSnap(value: number, targets: number[], threshold: number): number | null {
  let best: number | null = null;
  let bestDist = threshold;
  for (const t of targets) {
    const d = Math.abs(value - t);
    if (d <= bestDist) {
      bestDist = d;
      best = t;
    }
  }
  return best;
}

function snapPlacement(
  box: PrintLayoutPlacement,
  others: PrintLayoutPlacement[],
): { x: number; y: number; guides: GuideLine[] } {
  const pageTargetsX = [0, 0.5, 1];
  const pageTargetsY = [0, 0.5, 1];
  const otherX = others.flatMap((o) => [o.x, o.x + o.w, o.x + o.w / 2]);
  const otherY = others.flatMap((o) => [o.y, o.y + o.h, o.y + o.h / 2]);
  const xTargets = [...pageTargetsX, ...otherX];
  const yTargets = [...pageTargetsY, ...otherY];

  let x = box.x;
  let y = box.y;
  const guides: GuideLine[] = [];

  const left = nearestSnap(box.x, xTargets, SNAP_THRESHOLD);
  const right = nearestSnap(box.x + box.w, xTargets, SNAP_THRESHOLD);
  const cx = nearestSnap(box.x + box.w / 2, xTargets, SNAP_THRESHOLD);
  if (left != null) {
    x = left;
    guides.push({ axis: 'x', pos: left });
  } else if (right != null) {
    x = right - box.w;
    guides.push({ axis: 'x', pos: right });
  } else if (cx != null) {
    x = cx - box.w / 2;
    guides.push({ axis: 'x', pos: cx });
  }

  const top = nearestSnap(box.y, yTargets, SNAP_THRESHOLD);
  const bottom = nearestSnap(box.y + box.h, yTargets, SNAP_THRESHOLD);
  const cy = nearestSnap(box.y + box.h / 2, yTargets, SNAP_THRESHOLD);
  if (top != null) {
    y = top;
    guides.push({ axis: 'y', pos: top });
  } else if (bottom != null) {
    y = bottom - box.h;
    guides.push({ axis: 'y', pos: bottom });
  } else if (cy != null) {
    y = cy - box.h / 2;
    guides.push({ axis: 'y', pos: cy });
  }

  return {
    x: clamp01(Math.min(x, 1 - box.w)),
    y: clamp01(Math.min(y, 1 - box.h)),
    guides,
  };
}

function clonePlacements(list: PrintLayoutPlacement[]): PrintLayoutPlacement[] {
  return list.map((p) => ({ ...p }));
}

function placementsEqual(a: PrintLayoutPlacement[], b: PrintLayoutPlacement[]): boolean {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    const x = a[i];
    const y = b[i];
    if (
      x.uid !== y.uid ||
      x.name_key !== y.name_key ||
      x.option !== y.option ||
      x.page !== y.page ||
      x.x !== y.x ||
      x.y !== y.y ||
      x.w !== y.w ||
      x.h !== y.h ||
      x.align !== y.align ||
      x.font_size !== y.font_size ||
      x.kind !== y.kind
    ) {
      return false;
    }
  }
  return true;
}

function boxesOverlap(a: PrintLayoutPlacement, b: PrintLayoutPlacement): boolean {
  const ax2 = a.x + a.w;
  const ay2 = a.y + a.h;
  const bx2 = b.x + b.w;
  const by2 = b.y + b.h;
  const overlapW = Math.max(0, Math.min(ax2, bx2) - Math.max(a.x, b.x));
  const overlapH = Math.max(0, Math.min(ay2, by2) - Math.max(a.y, b.y));
  const area = overlapW * overlapH;
  const minArea = Math.min(a.w * a.h, b.w * b.h);
  return area > minArea * 0.35;
}
