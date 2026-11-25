import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { StudioService, type StudioPublishedSummary } from '../../core/services/studio.service';
import { ToastService } from '../../core/services/toast.service';
import { NORD_FORM_IMPORTS } from '@/shared/nord';
import {
  STUDIO_BLOCK_LABELS,
  STUDIO_SPECIALTIES,
  findSpecialty,
  type StudioHeroLayout,
  type StudioSpecialtyKey,
} from './studio-catalog';
import type { StudioDraft, StudioMediaSlot, StudioMode, StudioSharedContent } from './studio.models';
import { StudioPreviewComponent } from './studio-preview.component';

type SharedTextField = Exclude<keyof StudioSharedContent, 'media'>;
type ThemeField = 'accent' | 'ink' | 'canvas' | 'font' | 'layout';
type ThemeNumberField = 'round' | 'space';
type InspectorTab = 'content' | 'style' | 'media' | 'blocks' | 'publish';
type PreviewDevice = 'desktop' | 'mobile';

const TOAST_TITLE = 'Gestgo Studio';

@Component({
  selector: 'app-studio',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  host: { class: 'n-page n-page--flush' },
  imports: [...NORD_FORM_IMPORTS, RouterLink, FormsModule, StudioPreviewComponent],
  templateUrl: './studio.component.html',
  styleUrl: './studio.component.css',
})
export class StudioComponent implements OnInit {
  private readonly studioApi = inject(StudioService);
  private readonly toast = inject(ToastService);

  readonly specialties = STUDIO_SPECIALTIES;
  readonly blockLabels = STUDIO_BLOCK_LABELS;
  readonly mediaSlots: { slot: StudioMediaSlot; label: string }[] = [
    { slot: 'hero', label: 'Foto principal' },
    { slot: 'portrait', label: 'Retrato do profissional' },
    { slot: 'office', label: 'Consultório' },
  ];
  readonly inspectorTabs: { id: InspectorTab; label: string }[] = [
    { id: 'content', label: 'Conteúdo' },
    { id: 'style', label: 'Design' },
    { id: 'media', label: 'Fotos' },
    { id: 'blocks', label: 'Seções' },
    { id: 'publish', label: 'Publicar' },
  ];
  readonly fontOptions = [
    { id: 'Instrument', label: 'Instrument Serif' },
    { id: 'Cormorant', label: 'Cormorant Garamond' },
    { id: 'Jakarta', label: 'Plus Jakarta Sans' },
    { id: 'Manrope', label: 'Manrope' },
    { id: 'Outfit', label: 'Outfit' },
    { id: 'Playfair', label: 'Playfair Display' },
  ];
  readonly layoutOptions: { id: StudioHeroLayout; label: string }[] = [
    { id: 'split', label: 'Dividido 50/50' },
    { id: 'offset', label: 'Fotografia deslocada' },
    { id: 'immersive', label: 'Imagem imersiva' },
    { id: 'centered', label: 'Central minimal' },
    { id: 'type', label: 'Tipografia grande' },
    { id: 'framed', label: 'Moldura de luxo' },
    { id: 'collage', label: 'Composição colagem' },
    { id: 'kinetic', label: 'Impacto tipográfico' },
    { id: 'gallery', label: 'Estilo galeria' },
  ];

  readonly loading = signal(true);
  readonly saving = signal(false);
  readonly uploading = signal<StudioMediaSlot | null>(null);
  readonly dirty = signal(false);
  readonly hasSavedDraft = signal(false);
  readonly publishing = signal(false);
  readonly publicUrl = signal('');
  readonly mode = signal<StudioMode>('link');
  readonly device = signal<PreviewDevice>('mobile');
  readonly focusedPreview = signal(false);
  readonly inspectorTab = signal<InspectorTab>('content');
  readonly editBlockId = signal('');
  readonly draft = signal<StudioDraft | null>(null);
  readonly published = signal<StudioPublishedSummary>({ link: false, site: false });
  readonly legacyNote = signal('');

  readonly specialty = computed(() => findSpecialty(this.draft()?.specialtyKey ?? 'est'));

  readonly selectedTemplate = computed(() => {
    const d = this.draft();
    const spec = this.specialty();
    const id = d?.modes?.[this.mode()]?.templateId;
    return spec.templates.find((t) => t.id === id) ?? spec.templates[0];
  });

  readonly activeBlocks = computed(() => {
    const blocks = this.draft()?.modes?.[this.mode()]?.blocks ?? [];
    return [...blocks].sort((a, b) => a.order - b.order);
  });

  readonly previewTheme = computed(() => {
    const tpl = this.selectedTemplate();
    const ov = this.draft()?.themeOverrides?.[tpl.id] ?? {};
    const layout = String(ov['layout'] ?? tpl.layout) as StudioHeroLayout;
    return {
      ...tpl,
      canvas: String(ov['canvas'] ?? tpl.canvas),
      ink: String(ov['ink'] ?? tpl.ink),
      accent: String(ov['accent'] ?? tpl.accent),
      font: String(ov['font'] ?? tpl.font),
      layout: this.layoutOptions.some((l) => l.id === layout) ? layout : tpl.layout,
    };
  });

  readonly linkPublished = computed(() => this.published().link);

  readonly addressBar = computed(() => {
    const url = this.publicUrl();
    if (url) {
      try {
        return url.replace(/^https?:\/\//, '');
      } catch {
        return url;
      }
    }
    const slug = this.slugify(this.draft()?.shared?.displayName || 'minha-pagina');
    return this.mode() === 'site' ? `gestgo.com.br/site/${slug}` : `app.gestgo.com.br/l/${slug}`;
  });

  ngOnInit(): void {
    this.reload();
  }

  reload(): void {
    this.loading.set(true);
    this.studioApi.get().subscribe({
      next: (state) => {
        this.draft.set(structuredClone(state.draft));
        this.published.set(state.published);
        this.hasSavedDraft.set(state.hasSavedDraft);
        this.publicUrl.set(state.publicUrl);
        this.legacyNote.set(
          state.published.link
            ? 'Link do Studio publicado em /l/:slug.'
            : state.draft.seededFromLegacy
              ? `Pré-preenchido com o Link na Bio (modelo ${state.legacy.legacyModel}).`
              : state.hasSavedDraft
                ? 'Rascunho salvo. Publique o Link para atualizar /l/:slug.'
                : ''
        );
        this.dirty.set(false);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.toast.error(TOAST_TITLE, 'Não foi possível carregar o Studio.');
      },
    });
  }

  setMode(mode: StudioMode): void {
    this.mode.set(mode);
    if (mode === 'link') this.device.set('mobile');
  }

  setDevice(device: PreviewDevice): void {
    if (this.mode() === 'link' && device === 'desktop') return;
    this.device.set(device);
  }

  setInspectorTab(tab: InspectorTab): void {
    this.inspectorTab.set(tab);
  }

  toggleFocus(): void {
    this.focusedPreview.update((v) => !v);
  }

  selectSpecialty(key: StudioSpecialtyKey): void {
    const current = this.draft();
    if (!current) return;
    const spec = findSpecialty(key);
    const templateId = spec.templates[0].id;
    const blocks = spec.defaultBlocks.map((type, order) => ({
      id: type,
      type,
      enabled: true,
      order,
      variant: this.mode() === 'link' ? 'compact' : 'grid',
      title: '',
      description: '',
    }));
    this.draft.set({
      ...current,
      specialtyKey: key,
      modes: {
        link: { ...current.modes.link, templateId, blocks: structuredClone(blocks) },
        site: {
          ...current.modes.site,
          templateId,
          blocks: blocks.map((b) => ({ ...b, variant: 'grid' })),
        },
      },
      seededFromLegacy: false,
    });
    this.editBlockId.set('');
    this.dirty.set(true);
  }

  selectTemplate(id: string): void {
    const current = this.draft();
    if (!current) return;
    const mode = this.mode();
    this.draft.set({
      ...current,
      modes: {
        ...current.modes,
        [mode]: { ...current.modes[mode], templateId: id },
      },
      seededFromLegacy: false,
    });
    this.dirty.set(true);
  }

  patchShared(field: SharedTextField, value: string): void {
    const current = this.draft();
    if (!current) return;
    this.draft.set({
      ...current,
      shared: { ...current.shared, [field]: value },
      seededFromLegacy: false,
    });
    this.dirty.set(true);
  }

  toggleBlock(blockId: string): void {
    const current = this.draft();
    if (!current) return;
    const mode = this.mode();
    const blocks = current.modes[mode].blocks.map((b) =>
      b.id === blockId ? { ...b, enabled: !b.enabled } : b
    );
    this.draft.set({
      ...current,
      modes: {
        ...current.modes,
        [mode]: { ...current.modes[mode], blocks },
      },
      seededFromLegacy: false,
    });
    this.dirty.set(true);
  }

  moveBlock(blockId: string, delta: -1 | 1): void {
    const current = this.draft();
    if (!current) return;
    const mode = this.mode();
    const sorted = [...current.modes[mode].blocks].sort((a, b) => a.order - b.order);
    const index = sorted.findIndex((b) => b.id === blockId);
    const target = index + delta;
    if (index < 0 || target < 0 || target >= sorted.length) return;
    const swapped = [...sorted];
    [swapped[index], swapped[target]] = [swapped[target], swapped[index]];
    const blocks = swapped.map((b, order) => ({ ...b, order }));
    this.draft.set({
      ...current,
      modes: {
        ...current.modes,
        [mode]: { ...current.modes[mode], blocks },
      },
      seededFromLegacy: false,
    });
    this.dirty.set(true);
  }

  toggleEditBlock(blockId: string): void {
    this.editBlockId.update((id) => (id === blockId ? '' : blockId));
  }

  patchBlock(blockId: string, field: 'title' | 'description' | 'variant', value: string): void {
    const current = this.draft();
    if (!current) return;
    const mode = this.mode();
    const blocks = current.modes[mode].blocks.map((b) =>
      b.id === blockId ? { ...b, [field]: value } : b
    );
    this.draft.set({
      ...current,
      modes: {
        ...current.modes,
        [mode]: { ...current.modes[mode], blocks },
      },
      seededFromLegacy: false,
    });
    this.dirty.set(true);
  }

  patchTheme(field: ThemeField, value: string): void {
    const current = this.draft();
    if (!current) return;
    if (['ink', 'accent', 'canvas'].includes(field) && !/^#[0-9a-fA-F]{6}$/.test(value)) return;
    const templateId = this.selectedTemplate().id;
    const prev = current.themeOverrides?.[templateId] ?? {};
    this.draft.set({
      ...current,
      themeOverrides: {
        ...current.themeOverrides,
        [templateId]: {
          ...prev,
          [field]: ['ink', 'accent', 'canvas'].includes(field) ? value.toLowerCase() : value,
        },
      },
      seededFromLegacy: false,
    });
    this.dirty.set(true);
  }

  patchThemeNumber(field: ThemeNumberField, value: number | string): void {
    const current = this.draft();
    if (!current) return;
    const n = Number(value);
    if (!Number.isFinite(n)) return;
    const templateId = this.selectedTemplate().id;
    const prev = current.themeOverrides?.[templateId] ?? {};
    this.draft.set({
      ...current,
      themeOverrides: {
        ...current.themeOverrides,
        [templateId]: { ...prev, [field]: n },
      },
      seededFromLegacy: false,
    });
    this.dirty.set(true);
  }

  themeValue(field: ThemeField): string {
    const theme = this.previewTheme();
    if (field === 'font') return theme.font;
    if (field === 'layout') return theme.layout;
    return String(theme[field]);
  }

  themeNumber(field: ThemeNumberField, fallback: number): number {
    const tpl = this.selectedTemplate();
    const ov = this.draft()?.themeOverrides?.[tpl.id] ?? {};
    const n = Number(ov[field]);
    return Number.isFinite(n) ? n : fallback;
  }

  resetTheme(): void {
    const current = this.draft();
    if (!current) return;
    const templateId = this.selectedTemplate().id;
    const next = { ...current.themeOverrides };
    delete next[templateId];
    this.draft.set({ ...current, themeOverrides: next, seededFromLegacy: false });
    this.dirty.set(true);
  }

  onMediaSelected(slot: StudioMediaSlot, event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = '';
    if (!file) return;
    if (!/^image\/(jpeg|png|webp)$/i.test(file.type)) {
      this.toast.error(TOAST_TITLE, 'Use JPEG, PNG ou WebP.');
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      this.toast.error(TOAST_TITLE, 'A imagem deve ter no máximo 2 MB.');
      return;
    }
    this.uploading.set(slot);
    this.studioApi.uploadMedia(slot, file).subscribe({
      next: (res) => {
        this.draft.set(structuredClone(res.draft));
        this.hasSavedDraft.set(res.hasSavedDraft);
        this.publicUrl.set(res.publicUrl);
        this.legacyNote.set('Imagem salva no rascunho.');
        this.dirty.set(false);
        this.uploading.set(null);
        this.toast.success(TOAST_TITLE, 'Imagem enviada.');
      },
      error: () => {
        this.uploading.set(null);
        this.toast.error(TOAST_TITLE, 'Não foi possível enviar a imagem.');
      },
    });
  }

  saveDraft(): void {
    const current = this.draft();
    if (!current || this.saving()) return;
    this.saving.set(true);
    this.studioApi.saveDraft(current).subscribe({
      next: (res) => {
        this.draft.set(structuredClone(res.draft));
        this.published.set(res.published);
        this.hasSavedDraft.set(res.hasSavedDraft);
        this.publicUrl.set(res.publicUrl);
        this.legacyNote.set(
          res.published.link
            ? 'Rascunho salvo. A versão publicada só muda ao republicar.'
            : 'Rascunho salvo. Publique o Link para atualizar /l/:slug.'
        );
        this.dirty.set(false);
        this.saving.set(false);
        this.toast.success(TOAST_TITLE, 'Rascunho salvo.');
      },
      error: (err: unknown) => {
        this.saving.set(false);
        if (err instanceof HttpErrorResponse && err.status === 409) {
          this.toast.error(TOAST_TITLE, 'Rascunho desatualizado. Recarregando…');
          this.reload();
          return;
        }
        this.toast.error(TOAST_TITLE, 'Não foi possível salvar o rascunho.');
      },
    });
  }

  publishLink(): void {
    if (this.publishing() || this.mode() !== 'link') {
      this.setInspectorTab('publish');
      if (this.mode() !== 'link') {
        this.toast.error(TOAST_TITLE, 'Publique no modo Link na Bio.');
      }
      return;
    }
    const saveFirst = this.dirty() ? this.studioApi.saveDraft(this.draft()!) : null;
    const runPublish = () => {
      this.publishing.set(true);
      this.studioApi.publish('link').subscribe({
        next: (res) => {
          this.draft.set(structuredClone(res.draft));
          this.published.set(res.published);
          this.hasSavedDraft.set(res.hasSavedDraft);
          this.publicUrl.set(res.publicUrl);
          this.dirty.set(false);
          this.publishing.set(false);
          this.legacyNote.set('Link publicado. /l/:slug usa o layout do Studio.');
          this.setInspectorTab('publish');
          this.toast.success(TOAST_TITLE, 'Link publicado.');
        },
        error: (err: unknown) => {
          this.publishing.set(false);
          const msg =
            err instanceof HttpErrorResponse && typeof err.error?.message === 'string'
              ? err.error.message
              : 'Não foi possível publicar o Link.';
          this.toast.error(TOAST_TITLE, msg);
        },
      });
    };
    if (saveFirst) {
      this.saving.set(true);
      saveFirst.subscribe({
        next: (res) => {
          this.draft.set(structuredClone(res.draft));
          this.published.set(res.published);
          this.hasSavedDraft.set(res.hasSavedDraft);
          this.publicUrl.set(res.publicUrl);
          this.dirty.set(false);
          this.saving.set(false);
          runPublish();
        },
        error: () => {
          this.saving.set(false);
          this.toast.error(TOAST_TITLE, 'Salve o rascunho antes de publicar.');
        },
      });
      return;
    }
    runPublish();
  }

  unpublishLink(): void {
    if (this.publishing()) return;
    this.publishing.set(true);
    this.studioApi.unpublish('link').subscribe({
      next: (res) => {
        this.draft.set(structuredClone(res.draft));
        this.published.set(res.published);
        this.hasSavedDraft.set(res.hasSavedDraft);
        this.publicUrl.set(res.publicUrl);
        this.publishing.set(false);
        this.legacyNote.set('Link despublicado. /l/:slug voltou ao layout legado.');
        this.toast.success(TOAST_TITLE, 'Link despublicado.');
      },
      error: () => {
        this.publishing.set(false);
        this.toast.error(TOAST_TITLE, 'Não foi possível despublicar.');
      },
    });
  }

  blockLabel(type: string): string {
    return this.blockLabels[type] ?? type;
  }

  mediaUrl(slot: StudioMediaSlot): string | null {
    const media = this.draft()?.shared?.media;
    if (!media) return null;
    if (slot === 'hero') return media.heroUrl ?? null;
    if (slot === 'portrait') return media.portraitUrl ?? null;
    return media.officeUrl ?? null;
  }

  private slugify(value: string): string {
    return (
      String(value || 'pagina')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '') || 'minha-pagina'
    );
  }
}
