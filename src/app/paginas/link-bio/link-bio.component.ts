import {
  afterNextRender,
  Component,
  inject,
  Injector,
  OnInit,
  PLATFORM_ID,
  runInInjectionContext,
  Signal,
  ViewChild,
} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import {
  LinkBioService,
  LinkBioState,
  LinkBioLink,
  LinkBioFormLink,
  LinkBioExtra,
  LinkBioLayoutModel,
  LinkBioStats,
  LinkBioClinic,
  LinkBioClickBreakdownRow,
} from '../../core/services/link-bio.service';
import { ClinicaService } from '../../core/services/clinica.service';
import { LoadingService } from '../../shared/services/loading.service';
import { ZmSkeletonLinkBioComponent } from '../../shared/components/skeletons';
import { ToastService } from '../../core/services/toast.service';
import { ConfirmDialogService } from '../../core/services/confirm-dialog.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { normalizeThemeKey } from '../../core/services/user-appearance.sync';
import { environment } from '../../../environments/environment';
import { normalizeLinkBioClinic, parseLinkBioExtra } from '../../core/utils/link-bio-clinic-normalize.util';
import {
  linkBioExtraHasAnySection,
  linkBioExtraModelLabel,
  linkBioExtraSectionVisible,
  LinkBioExtraSection,
} from './link-bio-extra-fields.util';

type AbaPrincipal = 'visaoGeral' | 'conteudo';
type Aba = 'links' | 'forms' | 'aparencia' | 'modelos' | 'conteudoExtra';
type LinkBioStatsPeriodo = '7d' | '30d' | '90d';

import {
  buildLinkBioOverviewSuggestions,
  type LinkBioOverviewSuggestion,
} from './link-bio-overview-suggestions.util';
import {
  buildGoogleWriteReviewUrl,
  extractPlaceIdFromMapsUrl,
  GOOGLE_REVIEW_LINK_ICON,
  GOOGLE_REVIEW_LINK_LABEL,
  hasGoogleReviewLink,
  isShortGoogleMapsShareUrl,
  normalizeGooglePlaceId,
  resolveGoogleWriteReviewUrl,
} from './link-bio-google-review-link.util';

/** Linha do formulário — modalidades (modelo 2). */
interface LinkBioModalityFormRow {
  title: string;
  subtitle: string;
  available: boolean;
}

/** Linha do formulário — equipe (modelo 5). */
interface LinkBioTeamFormRow {
  name: string;
  credential: string;
  notes: string;
  whatsapp: string;
}

/** Linha do formulário — chip de espécie (modelo 6 vet). */
interface LinkBioSpeciesChipFormRow {
  label: string;
  active: boolean;
}

/** Linha do formulário — card de serviço vet (modelo 6). */
interface LinkBioVetServiceCardFormRow {
  icon: string;
  title: string;
}

/** Linha do formulário — passo da primeira visita (modelo 7 pedia). */
interface LinkBioPedStepFormRow {
  title: string;
  subtitle: string;
}

/** Linha do formulário — faixa etária pediátrica (modelo 7). */
interface LinkBioPedAgeBandFormRow {
  emoji: string;
  title: string;
  range: string;
}

const LINK_BIO_PREVIEW_SESSION_KEY = 'zm_link_bio_preview';

/** Mesmo limite do Laravel `max:2048` (kilobytes) na rota de upload. */
const LINK_BIO_FOTO_PROFISSIONAL_MAX_BYTES = 2048 * 1024;

import { ZARD_FORM_CONTROL_IMPORTS } from '@/shared/components/input';
import { ZardBadgeComponent } from '@/shared/components/badge';
import { ZardButtonComponent } from '@/shared/components/button/button.component';
import { ZardCardComponent } from '@/shared/components/card/card.component';
import { ZardTabComponent, ZardTabGroupComponent } from '@/shared/components/tabs';
import { ZardComboboxComponent, type ZardComboboxOption } from '@/shared/components/combobox';
import { ZardMenuImports } from '../../shared/components/menu/menu.imports';
import { ZardSkeletonComponent } from '@/shared/components/skeleton/skeleton.component';
import {
  downloadPublicFormQrPng,
  getOrCreatePublicFormQrDataUrl,
  prefetchPublicFormQr,
} from '../../core/utils/public-form-qr.util';

@Component({
  selector: 'app-pagina-link-bio',
  standalone: true,
  imports: [
    ...ZARD_FORM_CONTROL_IMPORTS,
    CommonModule,
    FormsModule,
    RouterLink,
    ZmSkeletonLinkBioComponent,
    ZardBadgeComponent,
    ZardButtonComponent,
    ZardCardComponent,
    ZardTabComponent,
    ZardTabGroupComponent,
    ZardComboboxComponent,
    ZardSkeletonComponent,
    ...ZardMenuImports,
  ],
  templateUrl: './link-bio.component.html',
  styleUrl: './link-bio.component.css',
})
export class LinkBioComponent implements OnInit {
  state: LinkBioState | null = null;
  showSkeleton!: Signal<boolean>;
  erro = '';
  abaPrincipal: AbaPrincipal = 'visaoGeral';
  abaAtiva: Aba = 'modelos';

  @ViewChild('mainTabGroup') mainTabGroup?: ZardTabGroupComponent;

  private readonly injector = inject(Injector);

  // Form novo link
  mostrarFormNovo = false;
  novoLabel = '';
  novoUrl = '';
  novoIcon = 'link';

  // Edição inline
  editandoId: number | null = null;
  editLabel = '';
  editUrl = '';
  editIcon = 'link';

  // Aparência
  aparenciaPublicTheme = '';
  aparenciaCustomAccent = '#c9a84c';
  aparenciaCoverColor = '#1a1a2e';
  aparenciaCoverMode: 'banner' | 'solid' | 'none' = 'banner';
  aparenciaModelo: LinkBioLayoutModel = 1;
  aparenciaShortDescription = '';
  aparenciaSpecialties = '';
  aparenciaFoundedYear: number | null = null;
  aparenciaContactEmail = '';
  aparenciaMapsUrl = '';
  /** Place ID manual para gerar o link «Avalie no Google» (aba Links). */
  linkAvaliePlaceIdManual = '';
  salvandoLinkAvalieGoogle = false;
  enviandoCover = false;
  enviandoFotoProfissionalLinkBio = false;
  nomeArquivoFotoProfissional = '';
  salvandoExtra = false;
  salvandoNovoLink = false;
  salvandoEdicaoId: number | null = null;
  salvandoAparencia = false;
  salvandoModelos = false;
  excluindoLinkId: number | null = null;
  atualizandoStatsRodape = false;

  /** Formulário: dados extras para layouts temáticos (persistidos em `link_bio_extra`). */
  extraHeroTagline = '';
  extraCouncilRegistration = '';
  extraBrandSubtitle = '';
  extraInstagramUrl = '';
  /** Um campo por linha; linhas vazias são ignoradas ao salvar. */
  extraConveniosLinhas: string[] = [''];
  extraModalidades: LinkBioModalityFormRow[] = [];
  extraEquipe: LinkBioTeamFormRow[] = [];
  /** Layout veterinário (6): portal de resultados de exames. */
  extraVetExamResultsUrl = '';
  extraVetExamResultsLabel = '';
  extraVetExamResultsSubtitle = '';

  /** Layout veterinário (6): campos extras. */
  extraVetCoverKicker = '';
  extraVetWaCtaLabel = '';
  extraVetDocsSectionTitle = '';
  extraVetDocsIntro = '';
  extraSpeciesChips: LinkBioSpeciesChipFormRow[] = [];
  extraVetServiceCards: LinkBioVetServiceCardFormRow[] = [];

  /** Layout pediatria (7): campos extras. */
  extraPedCoverKicker = '';
  extraPedWaCtaLabel = '';
  extraPedDocsSectionTitle = '';
  extraPedDocsIntro = '';
  extraPedParentNoticeTitle = '';
  extraPedParentNoticeBody = '';
  extraPedFirstVisitSteps: LinkBioPedStepFormRow[] = [];
  extraPedAgeBands: LinkBioPedAgeBandFormRow[] = [];
  nomeArquivoCover = '';
  copiedFormId: number | null = null;
  copiedPrincipalLink = false;
  qrAberto = false;
  qrCarregando = false;
  qrDataUrl = '';
  statsPeriodo: LinkBioStatsPeriodo = '7d';
  insightBannerFechado = false;

  readonly ctrMediaSetor = 5;
  readonly statsPeriodos: readonly { id: LinkBioStatsPeriodo; label: string }[] = [
    { id: '7d', label: '7d' },
    { id: '30d', label: '30d' },
    { id: '90d', label: '90d' },
  ];

  previewUrlSafe: SafeResourceUrl | null = null;

  /** URLs sanitizadas por modelo — mesma referência entre ciclos de CD (evita reload do iframe no scroll). */
  private readonly modelPreviewUrlByModel = new Map<LinkBioLayoutModel, SafeResourceUrl>();

  private linkBioService = inject(LinkBioService);
  private loadingService = inject(LoadingService);
  private clinicaService = inject(ClinicaService);
  private toast = inject(ToastService);
  private confirm = inject(ConfirmDialogService);
  private sanitizer = inject(DomSanitizer);
  private platformId = inject(PLATFORM_ID);
  private router = inject(Router);

  get links(): LinkBioLink[] {
    return this.state?.links ?? [];
  }

  get forms(): LinkBioFormLink[] {
    return this.state?.forms ?? [];
  }

  get publicUrl(): string {
    return this.state?.public_url ?? '';
  }

  /**
   * Link aberto por &quot;Ver página&quot;. Em dev, se o `public_url` da API tiver outro origin
   * que o painel (ex.: FRONTEND_URL=zion_med.test e `ng serve` em localhost:4200), abre o SPA
   * no host atual para a página pública chamar a mesma API e as métricas baterem.
   */
  get publicUrlAbrirNoNavegador(): string {
    const canonical = this.publicUrl;
    const slug = this.state?.clinic?.slug;
    if (!canonical || !slug) return canonical;
    if (environment.production || !isPlatformBrowser(this.platformId)) {
      return canonical;
    }
    try {
      const spaOrigin = window.location.origin;
      const linkOrigin = new URL(canonical).origin;
      if (linkOrigin !== spaOrigin) {
        return `${spaOrigin}/l/${encodeURIComponent(slug)}`;
      }
    } catch {
      /* URL inválida — mantém canonical */
    }
    return canonical;
  }

  /**
   * Página pública em modo totem/recepção (`?kiosk=1`): só lista de links, ideal para tablet.
   * Mesma regra de origem que {@link publicUrlAbrirNoNavegador} em desenvolvimento.
   */
  get recepcaoKioskUrl(): string {
    const base = this.publicUrlAbrirNoNavegador;
    if (!base?.trim()) return '';
    try {
      const u = new URL(base);
      u.searchParams.set('kiosk', '1');
      return u.toString();
    } catch {
      const sep = base.includes('?') ? '&' : '?';
      return `${base}${sep}kiosk=1`;
    }
  }

  copiarLinkRecepcao(): void {
    const url = this.recepcaoKioskUrl;
    if (!url) return;
    navigator.clipboard.writeText(url).then(
      () => this.toast.success('Copiado', 'Link do modo recepção na área de transferência.'),
      () => this.toast.error('Não foi possível copiar', 'Tente selecionar o link manualmente.')
    );
  }

  get availableIcons(): Record<string, string> {
    return this.state?.available_icons ?? {};
  }

  /** Opções do z-combobox de ícone (Links). */
  get iconComboboxOptions(): ZardComboboxOption[] {
    return Object.entries(this.availableIcons).map(([value, label]) => ({ value, label }));
  }

  get availableThemes(): Record<string, { label: string; primary: string }> {
    return this.state?.available_themes ?? {};
  }

  /** Mesma ordem que Configurações → Tema visual (`Object.keys`, não ordenação alfabética do keyvalue). */
  get themeKeys(): string[] {
    return Object.keys(this.availableThemes);
  }

  get metrics() {
    return this.state?.metrics;
  }

  get stats(): LinkBioStats {
    return (
      this.state?.stats ?? {
        clicks_per_day: {},
        views_per_day: {},
        most_clicked_link: null,
        peak_day_label: null,
        click_breakdown: [],
      }
    );
  }

  /** Prévia na coluna direita (lg+) — Links, Formulários e Aparência. */
  get previewAoLado(): boolean {
    return this.abaAtiva === 'links' || this.abaAtiva === 'forms' || this.abaAtiva === 'aparencia';
  }

  /** IDs dos modelos para grade de prévia na aba Modelos. */
  readonly previewModelIds: readonly LinkBioLayoutModel[] = [1, 2, 3, 4, 5, 6, 7, 8];

  /** Nome exibido de cada layout (substitui “Modelo N”). */
  readonly linkBioModelLabels: Record<LinkBioLayoutModel, string> = {
    1: 'Genérico atual',
    2: 'Profissional solo',
    3: 'Estética e beleza',
    4: 'Odontologia',
    5: 'Multi profissionais',
    6: 'Clínica veterinária',
    7: 'Pediatria',
    8: 'Nutricionista',
  };

  /** Subtítulo curto nos cards de modelo (layout). */
  readonly linkBioModelSubtitles: Record<LinkBioLayoutModel, string> = {
    1: 'Layout multipropósito',
    2: 'Perfil + contato direto',
    3: 'Agendamento + portfólio',
    4: 'Convênios + serviços',
    5: 'Equipe em destaque',
    6: 'Pets + agendamento',
    7: 'Agenda + info para pais',
    8: 'Planos + consulta online',
  };

  /** Modelo salvo na API (para barra “alterações não salvas”). */
  modeloPersistido: LinkBioLayoutModel = 1;

  get modeloDirty(): boolean {
    return this.state != null && this.aparenciaModelo !== this.modeloPersistido;
  }

  get layoutPublicadoLabel(): string {
    return this.linkBioModelLabels[this.modeloPersistido] ?? '—';
  }

  get layoutSelecionadoLabel(): string {
    return this.linkBioModelLabels[this.aparenciaModelo] ?? '—';
  }

  get conteudoExtraApareceNoPublico(): boolean {
    return this.modeloPersistido !== 1;
  }

  /** Modelo usado para filtrar campos na aba Conteúdo extra (o selecionado em Modelos). */
  get conteudoExtraModeloAtivo(): LinkBioLayoutModel {
    return this.aparenciaModelo;
  }

  get conteudoExtraModeloAtivoLabel(): string {
    return linkBioExtraModelLabel(this.conteudoExtraModeloAtivo);
  }

  get conteudoExtraTemCamposParaModelo(): boolean {
    return linkBioExtraHasAnySection(this.conteudoExtraModeloAtivo);
  }

  extraMostraSecao(section: LinkBioExtraSection): boolean {
    return linkBioExtraSectionVisible(this.conteudoExtraModeloAtivo, section);
  }

  get extraMostraTextosLinks(): boolean {
    return (
      this.extraMostraSecao('hero_tagline') ||
      this.extraMostraSecao('council') ||
      this.extraMostraSecao('brand_subtitle') ||
      this.extraMostraSecao('instagram')
    );
  }

  /** Bust de cache dos iframes da aba Modelos. */
  private previewModelsTimestamp = Date.now();

  /** URL para o iframe de preview: mesma origem + rota /l/:slug (layout do próprio projeto). */
  private getPreviewUrl(cacheBust?: boolean): string | null {
    const slug = this.state?.clinic?.slug;
    if (!slug) return this.publicUrl || null;
    if (!isPlatformBrowser(this.platformId)) return this.publicUrl || null;
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    if (!origin) return this.publicUrl || null;
    const base = `${origin}/l/${encodeURIComponent(slug)}?preview=1`;
    return cacheBust ? `${base}&t=${Date.now()}` : base;
  }

  /** Prévia do iframe na aba Modelos (referência estável — não chamar método no template). */
  get aparenciaModeloIframeSrc(): SafeResourceUrl | null {
    return this.modelPreviewUrlByModel.get(this.aparenciaModelo) ?? null;
  }

  /** Recria cache de URLs dos iframes de modelo (após salvar ou bust de rascunho). */
  private rebuildModelPreviewUrls(): void {
    this.modelPreviewUrlByModel.clear();
    const slug = this.state?.clinic?.slug;
    if (!slug || !isPlatformBrowser(this.platformId)) return;
    const origin = window.location.origin;
    const t = this.previewModelsTimestamp;
    for (const model of this.previewModelIds) {
      const u = `${origin}/l/${encodeURIComponent(slug)}?preview=1&preview_model=${model}&t=${t}`;
      this.modelPreviewUrlByModel.set(model, this.sanitizer.bypassSecurityTrustResourceUrl(u));
    }
  }

  /** Grava rascunho do formulário extra na sessão para os iframes de prévia (?preview=1). */
  syncDraftToSessionForPreviews(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    try {
      const payload = this.montarLinkBioExtraPayload();
      if (!payload) {
        sessionStorage.removeItem(LINK_BIO_PREVIEW_SESSION_KEY);
      } else {
        sessionStorage.setItem(LINK_BIO_PREVIEW_SESSION_KEY, JSON.stringify({ link_bio_extra: payload }));
      }
    } catch {
      /* ignore */
    }
    this.previewModelsTimestamp = Date.now();
    this.rebuildModelPreviewUrls();
  }

  private trim(s: string): string {
    return (s ?? '').trim();
  }

  /** Cópia superficial do `link_bio_extra` já salvo (preserva chaves que o formulário não edita). */
  private getExistingLinkBioExtraRecord(): Record<string, unknown> {
    const e = parseLinkBioExtra(this.state?.clinic?.link_bio_extra);
    return Object.keys(e).length ? { ...(e as Record<string, unknown>) } : {};
  }

  /**
   * Monta o `link_bio_extra` completo para a API: parte do que está salvo + campos desta tela.
   * Remove chaves quando o usuário limpa o campo (evita “fantasma” no JSON).
   */
  private montarLinkBioExtraPayload(): LinkBioExtra | null {
    const merged = this.getExistingLinkBioExtraRecord();

    const setOrDelete = (key: string, value: unknown): void => {
      if (value === undefined || value === null || value === '') {
        delete merged[key];
      } else {
        merged[key] = value;
      }
    };

    const h = this.trim(this.extraHeroTagline);
    setOrDelete('hero_tagline', h || undefined);
    const cr = this.trim(this.extraCouncilRegistration);
    setOrDelete('council_registration', cr || undefined);
    const bs = this.trim(this.extraBrandSubtitle);
    setOrDelete('brand_subtitle', bs || undefined);
    const ig = this.trim(this.extraInstagramUrl);
    setOrDelete('instagram_url', ig || undefined);

    const convenios = this.extraConveniosLinhas.map((x) => this.trim(x)).filter(Boolean);
    if (convenios.length) merged['convenios'] = convenios;
    else delete merged['convenios'];

    const modalities = this.extraModalidades
      .filter((m) => this.trim(m.title))
      .map((m) => ({
        title: this.trim(m.title),
        subtitle: this.trim(m.subtitle) || undefined,
        available: m.available !== false,
      }));
    if (modalities.length) merged['modalities'] = modalities;
    else delete merged['modalities'];

    const team = this.extraEquipe
      .filter((m) => this.trim(m.name))
      .map((m) => ({
        name: this.trim(m.name),
        credential: this.trim(m.credential) || undefined,
        notes: this.trim(m.notes) || undefined,
        whatsapp: this.trim(m.whatsapp) || undefined,
      }));
    if (team.length) merged['team'] = team;
    else delete merged['team'];

    const examUrlRaw = this.trim(this.extraVetExamResultsUrl);
    if (examUrlRaw) {
      const normalized =
        /^https?:\/\//i.test(examUrlRaw) ? examUrlRaw : `https://${examUrlRaw.replace(/^\/+/, '')}`;
      merged['vet_exam_results_url'] = normalized;
      const el = this.trim(this.extraVetExamResultsLabel);
      if (el) merged['vet_exam_results_label'] = el;
      else delete merged['vet_exam_results_label'];
      const es = this.trim(this.extraVetExamResultsSubtitle);
      if (es) merged['vet_exam_results_subtitle'] = es;
      else delete merged['vet_exam_results_subtitle'];
    } else {
      delete merged['vet_exam_results_url'];
      delete merged['vet_exam_results_label'];
      delete merged['vet_exam_results_subtitle'];
    }

    // --- Veterinária (M6) ---
    setOrDelete('layout_cover_kicker', this.trim(this.extraVetCoverKicker) || undefined);
    setOrDelete('vet_wa_cta_label', this.trim(this.extraVetWaCtaLabel) || undefined);
    setOrDelete('vet_docs_section_title', this.trim(this.extraVetDocsSectionTitle) || undefined);
    setOrDelete('vet_docs_intro', this.trim(this.extraVetDocsIntro) || undefined);

    const speciesChips = this.extraSpeciesChips.filter((s) => this.trim(s.label));
    if (speciesChips.length) merged['species_chips'] = speciesChips.map((s) => ({ label: this.trim(s.label), active: s.active !== false }));
    else delete merged['species_chips'];

    const vetServiceCards = this.extraVetServiceCards.filter((c) => this.trim(c.title));
    if (vetServiceCards.length) merged['vet_service_cards'] = vetServiceCards.map((c) => ({ icon: this.trim(c.icon) || '💉', title: this.trim(c.title) }));
    else delete merged['vet_service_cards'];

    // --- Pediatria (M7) ---
    setOrDelete('ped_cover_kicker', this.trim(this.extraPedCoverKicker) || undefined);
    setOrDelete('ped_wa_cta_label', this.trim(this.extraPedWaCtaLabel) || undefined);
    setOrDelete('ped_docs_section_title', this.trim(this.extraPedDocsSectionTitle) || undefined);
    setOrDelete('ped_docs_intro', this.trim(this.extraPedDocsIntro) || undefined);
    setOrDelete('ped_parent_notice_title', this.trim(this.extraPedParentNoticeTitle) || undefined);
    setOrDelete('ped_parent_notice_body', this.trim(this.extraPedParentNoticeBody) || undefined);

    const pedSteps = this.extraPedFirstVisitSteps.filter((s) => this.trim(s.title));
    if (pedSteps.length) merged['ped_first_visit_steps'] = pedSteps.map((s) => ({ title: this.trim(s.title), subtitle: this.trim(s.subtitle) }));
    else delete merged['ped_first_visit_steps'];

    const pedAgeBands = this.extraPedAgeBands.filter((b) => this.trim(b.title));
    if (pedAgeBands.length) merged['ped_age_bands'] = pedAgeBands.map((b) => ({ emoji: this.trim(b.emoji) || '👶', title: this.trim(b.title), range: this.trim(b.range) }));
    else delete merged['ped_age_bands'];

    return Object.keys(merged).length ? (merged as LinkBioExtra) : null;
  }

  private aplicarExtraNoFormulario(extra: unknown): void {
    const e = parseLinkBioExtra(extra);
    this.extraHeroTagline = e.hero_tagline ?? '';
    this.extraCouncilRegistration = e.council_registration ?? '';
    this.extraBrandSubtitle = e.brand_subtitle ?? '';
    this.extraInstagramUrl = e.instagram_url ?? '';
    const conv = e.convenios?.filter((x) => this.trim(String(x))) ?? [];
    this.extraConveniosLinhas = conv.length ? [...conv] : [''];
    const mods = e.modalities ?? [];
    this.extraModalidades = mods.length
      ? mods.map((m) => ({
          title: m.title ?? '',
          subtitle: m.subtitle ?? '',
          available: m.available !== false,
        }))
      : [];
    const team = e.team ?? [];
    this.extraEquipe = team.length
      ? team.map((t) => ({
          name: t.name ?? '',
          credential: t.credential ?? '',
          notes: t.notes ?? '',
          whatsapp: t.whatsapp ?? '',
        }))
      : [];
    this.extraVetExamResultsUrl =
      typeof e.vet_exam_results_url === 'string' ? e.vet_exam_results_url : '';
    this.extraVetExamResultsLabel =
      typeof e.vet_exam_results_label === 'string' ? e.vet_exam_results_label : '';
    this.extraVetExamResultsSubtitle =
      typeof e.vet_exam_results_subtitle === 'string' ? e.vet_exam_results_subtitle : '';

    // Veterinária extras
    this.extraVetCoverKicker = e.layout_cover_kicker ?? '';
    this.extraVetWaCtaLabel = e.vet_wa_cta_label ?? '';
    this.extraVetDocsSectionTitle = e.vet_docs_section_title ?? '';
    this.extraVetDocsIntro = e.vet_docs_intro ?? '';
    const speciesChips = e.species_chips ?? [];
    this.extraSpeciesChips = speciesChips.length
      ? speciesChips.map((s) => ({ label: s.label ?? '', active: s.active !== false }))
      : [];
    const vetServiceCards = e.vet_service_cards ?? [];
    this.extraVetServiceCards = vetServiceCards.length
      ? vetServiceCards.map((c) => ({ icon: c.icon ?? '', title: c.title ?? '' }))
      : [];

    // Pediatria extras
    this.extraPedCoverKicker = e.ped_cover_kicker ?? '';
    this.extraPedWaCtaLabel = e.ped_wa_cta_label ?? '';
    this.extraPedDocsSectionTitle = e.ped_docs_section_title ?? '';
    this.extraPedDocsIntro = e.ped_docs_intro ?? '';
    this.extraPedParentNoticeTitle = e.ped_parent_notice_title ?? '';
    this.extraPedParentNoticeBody = e.ped_parent_notice_body ?? '';
    const pedSteps = e.ped_first_visit_steps ?? [];
    this.extraPedFirstVisitSteps = pedSteps.length
      ? pedSteps.map((s) => ({ title: s.title ?? '', subtitle: s.subtitle ?? '' }))
      : [];
    const pedAgeBands = e.ped_age_bands ?? [];
    this.extraPedAgeBands = pedAgeBands.length
      ? pedAgeBands.map((b) => ({ emoji: b.emoji ?? '', title: b.title ?? '', range: b.range ?? '' }))
      : [];
  }

  adicionarConvenioLinha(): void {
    this.extraConveniosLinhas.push('');
  }

  removerConvenioLinha(index: number): void {
    if (this.extraConveniosLinhas.length <= 1) {
      this.extraConveniosLinhas = [''];
      return;
    }
    this.extraConveniosLinhas.splice(index, 1);
  }

  adicionarModalidade(): void {
    this.extraModalidades.push({ title: '', subtitle: '', available: true });
  }

  removerModalidade(index: number): void {
    this.extraModalidades.splice(index, 1);
  }

  adicionarMembroEquipe(): void {
    this.extraEquipe.push({ name: '', credential: '', notes: '', whatsapp: '' });
  }

  removerMembroEquipe(index: number): void {
    this.extraEquipe.splice(index, 1);
  }

  adicionarSpeciesChip(): void {
    this.extraSpeciesChips.push({ label: '', active: true });
  }

  removerSpeciesChip(index: number): void {
    this.extraSpeciesChips.splice(index, 1);
  }

  adicionarVetServiceCard(): void {
    this.extraVetServiceCards.push({ icon: '💉', title: '' });
  }

  removerVetServiceCard(index: number): void {
    this.extraVetServiceCards.splice(index, 1);
  }

  adicionarPedStep(): void {
    this.extraPedFirstVisitSteps.push({ title: '', subtitle: '' });
  }

  removerPedStep(index: number): void {
    this.extraPedFirstVisitSteps.splice(index, 1);
  }

  adicionarPedAgeBand(): void {
    this.extraPedAgeBands.push({ emoji: '👶', title: '', range: '' });
  }

  removerPedAgeBand(index: number): void {
    this.extraPedAgeBands.splice(index, 1);
  }

  salvarConteudoExtra(): void {
    if (!this.state) return;
    this.salvandoExtra = true;
    const link_bio_extra = this.montarLinkBioExtraPayload();
    this.linkBioService.updateAparencia({ link_bio_extra }).subscribe({
      next: (clinic) => {
        this.salvandoExtra = false;
        if (this.state) {
          this.state.clinic = normalizeLinkBioClinic({ ...this.state.clinic, ...clinic });
          this.aplicarExtraNoFormulario(this.state.clinic.link_bio_extra);
        }
        if (isPlatformBrowser(this.platformId)) {
          try {
            sessionStorage.removeItem(LINK_BIO_PREVIEW_SESSION_KEY);
          } catch {
            /* ignore */
          }
        }
        this.previewModelsTimestamp = Date.now();
        this.atualizarPreviewUrl();
        this.toast.success('Conteúdo extra salvo', 'As informações foram atualizadas.');
      },
      error: () => {
        this.salvandoExtra = false;
        this.toast.error('Erro ao salvar', 'Não foi possível salvar o conteúdo extra.');
      },
    });
  }

  /** Atualiza o iframe de preview (ex.: após salvar aparência). */
  private atualizarPreviewUrl(): void {
    const url = this.getPreviewUrl(true);
    this.previewUrlSafe = url ? this.sanitizer.bypassSecurityTrustResourceUrl(url) : null;
  }

  ngOnInit(): void {
    this.carregar();
  }

  carregar(): void {
    const { data$, showSkeleton } = this.loadingService.loadWithThreshold(this.linkBioService.get());
    this.showSkeleton = showSkeleton;
    data$.subscribe({
      next: (s) => this.aplicarEstadoLinkBio(s),
      error: () => {
        this.erro = 'Não foi possível carregar o link na bio.';
      },
    });
  }

  private aplicarEstadoLinkBio(s: LinkBioState): void {
    this.state = {
      ...s,
      clinic: normalizeLinkBioClinic(s.clinic),
    };
    const c = this.state.clinic;
    this.aparenciaPublicTheme = c.public_theme
      ? normalizeThemeKey(String(c.public_theme))
      : '';
    this.aparenciaCustomAccent = this.normalizarHex(c.accent_hex) ?? '#c9a84c';
    this.aparenciaCoverColor = c.cover_color ?? '#1a1a2e';
    this.aparenciaCoverMode = (c.cover_mode as 'banner' | 'solid' | 'none') ?? 'banner';
    this.aparenciaModelo = (c.link_bio_model as LinkBioLayoutModel) ?? 1;
    this.modeloPersistido = this.aparenciaModelo;
    this.aparenciaShortDescription = c.short_description ?? '';
    this.aparenciaSpecialties = c.specialties ?? '';
    this.aparenciaFoundedYear = (c.founded_year as number | null) ?? null;
    this.aparenciaContactEmail = c.contact_email ?? '';
    this.aparenciaMapsUrl = c.maps_url ?? '';
    this.linkAvaliePlaceIdManual = normalizeGooglePlaceId(c.google_place_id) ?? '';
    this.aplicarExtraNoFormulario(c.link_bio_extra);
    this.syncDraftToSessionForPreviews();
    const previewUrl = this.getPreviewUrl(true);
    this.previewUrlSafe = previewUrl ? this.sanitizer.bypassSecurityTrustResourceUrl(previewUrl) : null;
    if (s.public_url) prefetchPublicFormQr(s.public_url);
  }

  /** Rodapé da aba Links: salvar novo link ou edição em andamento. */
  get linkBioFooterLinksSaveDisabled(): boolean {
    if (this.salvandoNovoLink || this.salvandoEdicaoId !== null) return true;
    if (this.mostrarFormNovo) {
      return !this.novoLabel.trim() || !this.novoUrl.trim();
    }
    if (this.editandoId !== null) {
      return !this.editLabel.trim() || !this.editUrl.trim();
    }
    return true;
  }

  salvarFooterAbaLinks(): void {
    if (this.mostrarFormNovo) {
      this.salvarNovoLink();
      return;
    }
    if (this.editandoId !== null) {
      const lnk = this.links.find((l) => l.id === this.editandoId);
      if (lnk) {
        this.salvarEdicao(lnk);
      }
    }
  }

  atualizarDadosEstatisticas(): void {
    if (this.atualizandoStatsRodape) return;
    this.atualizandoStatsRodape = true;
    this.linkBioService.get().subscribe({
      next: (s) => {
        this.atualizandoStatsRodape = false;
        this.aplicarEstadoLinkBio(s);
        this.toast.success('Dados atualizados', 'Métricas e estatísticas foram recarregadas.');
      },
      error: () => {
        this.atualizandoStatsRodape = false;
        this.toast.error('Erro', 'Não foi possível atualizar os dados.');
      },
    });
  }

  onMainTabChange(event: { index: number }): void {
    this.abaPrincipal = event.index === 0 ? 'visaoGeral' : 'conteudo';
  }

  editarConteudo(): void {
    this.ativarAba('conteudoExtra', true);
  }

  ativarAba(aba: Aba, irParaAbaConteudo = false): void {
    this.abaAtiva = aba;
    this.abaPrincipal = 'conteudo';
    if (irParaAbaConteudo) {
      this.syncMainTabGroup();
    }
    if (aba === 'modelos') {
      this.syncDraftToSessionForPreviews();
    }
  }

  private syncMainTabGroup(): void {
    runInInjectionContext(this.injector, () => {
      afterNextRender(() => {
        const index = this.abaPrincipal === 'visaoGeral' ? 0 : 1;
        this.mainTabGroup?.selectTabByIndex(index);
      });
    });
  }

  selecionarModelo(m: LinkBioLayoutModel): void {
    this.aparenciaModelo = m;
  }

  copiarLinkPrincipal(): void {
    if (!this.publicUrl) return;
    navigator.clipboard.writeText(this.publicUrl).then(
      () => {
        this.copiedPrincipalLink = true;
        this.toast.success('Link copiado', 'Você já pode colar e compartilhar.');
        window.setTimeout(() => {
          this.copiedPrincipalLink = false;
        }, 2000);
      },
      () => this.toast.error('Não foi possível copiar', 'Tente novamente.')
    );
  }

  headerMetaLinha(): string | null {
    const m = this.metrics;
    if (!m) return null;
    const partes: string[] = [];
    partes.push(`${m.visitas_hoje} ${m.visitas_hoje === 1 ? 'visita hoje' : 'visitas hoje'}`);
    partes.push(`${m.total_clicks_last_30} cliques`);
    return partes.join(' · ');
  }

  async abrirQrPrincipal(): Promise<void> {
    if (!this.publicUrl) {
      this.toast.warning('Link indisponível', 'A página pública ainda não possui URL.');
      return;
    }
    this.qrAberto = true;
    this.qrCarregando = true;
    this.qrDataUrl = '';
    try {
      this.qrDataUrl = await getOrCreatePublicFormQrDataUrl(this.publicUrl);
    } catch {
      this.toast.error('QR code', 'Não foi possível gerar o QR code deste link.');
      this.fecharQr();
    } finally {
      this.qrCarregando = false;
    }
  }

  baixarQrPrincipal(): void {
    if (!this.qrDataUrl || !this.state) return;
    downloadPublicFormQrPng(this.qrDataUrl, this.state.clinic.name);
    this.toast.success('Download iniciado', 'O QR code foi salvo no seu dispositivo.');
  }

  fecharQr(): void {
    this.qrAberto = false;
    this.qrCarregando = false;
    this.qrDataUrl = '';
  }

  toggleFormNovo(): void {
    this.mostrarFormNovo = !this.mostrarFormNovo;
    if (!this.mostrarFormNovo) {
      this.novoLabel = '';
      this.novoUrl = '';
      this.novoIcon = 'link';
    }
  }

  salvarNovoLink(): void {
    if (!this.novoLabel.trim() || !this.novoUrl.trim()) return;
    this.salvandoNovoLink = true;
    this.linkBioService.createLink({ label: this.novoLabel.trim(), url: this.novoUrl.trim(), icon: this.novoIcon }).subscribe({
      next: () => {
        this.salvandoNovoLink = false;
        this.toggleFormNovo();
        this.carregar();
        this.toast.success('Link adicionado', 'O novo link foi salvo.');
      },
      error: () => {
        this.salvandoNovoLink = false;
        this.toast.error('Erro', 'Não foi possível adicionar o link.');
      },
    });
  }

  get temLinkAvalieGoogle(): boolean {
    return hasGoogleReviewLink(this.links);
  }

  get faltaLinkGoogleMaps(): boolean {
    return !(this.state?.clinic?.maps_url ?? '').trim();
  }

  /** Link curto do Maps não gera botão de avaliação automaticamente. */
  get mapsUrlCurtoSemPlaceId(): boolean {
    const url = this.state?.clinic?.maps_url;
    if (!url?.trim()) return false;
    return (
      isShortGoogleMapsShareUrl(url) &&
      !extractPlaceIdFromMapsUrl(url) &&
      !normalizeGooglePlaceId(this.linkAvaliePlaceIdManual)
    );
  }

  /** URL sugerida para o botão «Avalie no Google», com base no Maps / Place ID. */
  get urlAvalieGoogleSugerida(): string | null {
    if (!this.state?.clinic) return null;

    const manual = normalizeGooglePlaceId(this.linkAvaliePlaceIdManual);
    if (manual) {
      return buildGoogleWriteReviewUrl(manual);
    }

    return resolveGoogleWriteReviewUrl(this.state.clinic);
  }

  adicionarLinkAvalieGoogle(): void {
    if (this.temLinkAvalieGoogle) {
      this.toast.info('Link já existe', 'Sua página já possui um botão de avaliação no Google.');
      return;
    }
    const url = this.urlAvalieGoogleSugerida;
    if (!url) {
      this.toast.warning(
        'Configure o Google Maps',
        'Informe o link do Maps em Aparência ou cole o Place ID abaixo (formato ChIJ…).'
      );
      return;
    }
    this.salvandoLinkAvalieGoogle = true;
    this.linkBioService
      .createLink({
        label: GOOGLE_REVIEW_LINK_LABEL,
        url,
        icon: GOOGLE_REVIEW_LINK_ICON,
      })
      .subscribe({
        next: () => {
          this.salvandoLinkAvalieGoogle = false;
          this.carregar();
          this.toast.success('Link adicionado', 'O botão «Avalie no Google» já aparece na sua página pública.');
        },
        error: () => {
          this.salvandoLinkAvalieGoogle = false;
          this.toast.error('Erro', 'Não foi possível adicionar o link.');
        },
      });
  }

  iniciarEdicao(link: LinkBioLink): void {
    this.editandoId = link.id;
    this.editLabel = link.label;
    this.editUrl = link.url;
    this.editIcon = link.icon ?? 'link';
  }

  cancelarEdicao(): void {
    this.editandoId = null;
    this.editLabel = '';
    this.editUrl = '';
    this.editIcon = 'link';
  }

  salvarEdicao(link: LinkBioLink): void {
    if (!this.editandoId) return;
    this.salvandoEdicaoId = link.id;
    const payload = {
      label: this.editLabel.trim() || link.label,
      url: this.editUrl.trim() || link.url,
      icon: this.editIcon || link.icon || 'link',
    };
    this.linkBioService.updateLink(link.id, payload).subscribe({
      next: () => {
        this.salvandoEdicaoId = null;
        this.cancelarEdicao();
        this.carregar();
        this.toast.success('Link atualizado', 'As alterações foram salvas.');
      },
      error: () => {
        this.salvandoEdicaoId = null;
        this.toast.error('Erro', 'Não foi possível salvar o link.');
      },
    });
  }

  async excluirLink(link: LinkBioLink): Promise<void> {
    const ok = await this.confirm.request({
      title: 'Remover este link?',
      messageBefore: 'O link ',
      emphasis: link.label,
      messageAfter: ' será removido da página pública.',
      confirmLabel: 'Sim, remover',
      variant: 'danger',
    });
    if (!ok) return;
    this.excluindoLinkId = link.id;
    this.linkBioService.deleteLink(link.id).subscribe({
      next: () => {
        this.excluindoLinkId = null;
        this.carregar();
        this.toast.success('Link removido', `${link.label} foi excluído.`);
      },
      error: () => {
        this.excluindoLinkId = null;
        this.toast.error('Erro', 'Não foi possível remover o link.');
      },
    });
  }

  copiarLinkForm(f: LinkBioFormLink): void {
    if (!f.public_url) return;
    navigator.clipboard.writeText(f.public_url).then(
      () => {
        this.copiedFormId = f.id;
        this.toast.success('Link copiado', 'Cole e compartilhe o formulário.');
        window.setTimeout(() => {
          if (this.copiedFormId === f.id) {
            this.copiedFormId = null;
          }
        }, 2000);
      },
      () => this.toast.error('Não foi possível copiar', 'Tente novamente.')
    );
  }

  salvarAparencia(): void {
    if (!this.state) return;
    this.salvandoAparencia = true;
    const isCustom = this.aparenciaPublicTheme === 'custom';
    const mapsUrl = this.aparenciaMapsUrl?.trim() || null;
    const placeId =
      normalizeGooglePlaceId(this.linkAvaliePlaceIdManual) ||
      extractPlaceIdFromMapsUrl(mapsUrl) ||
      null;
    const payload: Partial<LinkBioClinic> & Record<string, unknown> = {
      public_theme: this.aparenciaPublicTheme,
      cover_color: this.aparenciaCoverColor || null,
      cover_mode: this.aparenciaCoverMode,
      short_description: this.aparenciaShortDescription || null,
      specialties: this.aparenciaSpecialties || null,
      founded_year: this.aparenciaFoundedYear || null,
      contact_email: this.aparenciaContactEmail || null,
      maps_url: mapsUrl,
      google_place_id: placeId,
      accent_hex: isCustom ? this.aparenciaCustomAccent : null,
    };
    this.linkBioService.updateAparencia(payload).subscribe({
      next: (clinic) => {
        this.salvandoAparencia = false;
        if (this.state) {
          this.state.clinic = normalizeLinkBioClinic({ ...this.state.clinic, ...clinic });
        }
        this.atualizarPreviewUrl();
        this.toast.success('Aparência salva', 'As configurações visuais foram atualizadas.');
      },
      error: () => {
        this.salvandoAparencia = false;
        this.toast.error('Erro ao salvar', 'Não foi possível salvar a aparência.');
      },
    });
  }

  /** Apenas o layout publicado (dados extras ficam na aba Conteúdo extra). */
  salvarModelos(): void {
    if (!this.state) return;
    if (!this.modeloDirty) return;
    this.salvandoModelos = true;
    this.linkBioService.updateAparencia({ link_bio_model: this.aparenciaModelo }).subscribe({
      next: (clinic) => {
        this.salvandoModelos = false;
        if (this.state) {
          this.state.clinic = { ...this.state.clinic, ...clinic };
        }
        this.modeloPersistido = this.aparenciaModelo;
        this.syncDraftToSessionForPreviews();
        this.atualizarPreviewUrl();
        this.toast.success('Modelo publicado', 'O layout do link público foi atualizado.');
      },
      error: () => {
        this.salvandoModelos = false;
        this.toast.error('Erro ao salvar', 'Não foi possível salvar o modelo.');
      },
    });
  }

  selecionarTema(themeKey: string): void {
    this.aparenciaPublicTheme = themeKey === '' ? '' : normalizeThemeKey(themeKey);
  }

  /** Normaliza hex no formato #RRGGBB (ou #RGB → #RRGGBB). Retorna null se inválido. */
  private normalizarHex(value: string | null | undefined): string | null {
    const v = (value ?? '').trim();
    if (!v) return null;
    const short = /^#([0-9a-f]{3})$/i.exec(v);
    if (short) {
      const [r, g, b] = short[1]!.split('');
      return `#${r}${r}${g}${g}${b}${b}`.toLowerCase();
    }
    const long = /^#([0-9a-f]{6})$/i.exec(v);
    if (long) return v.toLowerCase();
    return null;
  }

  onCustomAccentChange(value: string): void {
    const hex = this.normalizarHex(value);
    if (hex) this.aparenciaCustomAccent = hex;
  }

  onSelecionarCoverImage(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file || !this.state?.clinic?.name) return;
    this.enviandoCover = true;
    this.nomeArquivoCover = file.name;
    this.clinicaService.uploadCoverImage(file, this.state.clinic.name).subscribe({
      next: (clinic) => {
        if (this.state) {
          this.state.clinic = { ...this.state.clinic, ...clinic };
        }
        this.aparenciaCoverMode = 'banner';
        this.atualizarPreviewUrl();
        this.enviandoCover = false;
        this.toast.success('Capa enviada', 'A imagem de capa foi atualizada.');
      },
      error: () => {
        this.enviandoCover = false;
        this.toast.error('Erro no upload', 'Não foi possível enviar a imagem.');
      },
    });
  }

  onSelecionarFotoProfissionalLinkBio(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file || !this.state) return;

    if (file.size > LINK_BIO_FOTO_PROFISSIONAL_MAX_BYTES) {
      const mb = (file.size / (1024 * 1024)).toFixed(1);
      this.toast.error(
        'Arquivo muito grande',
        `Esta imagem tem cerca de ${mb} MB. O tamanho máximo permitido é 2 MB. Comprima ou redimensione a foto e tente novamente.`
      );
      input.value = '';
      return;
    }

    this.enviandoFotoProfissionalLinkBio = true;
    this.nomeArquivoFotoProfissional = file.name;
    this.linkBioService.uploadProfessionalPhoto(file).subscribe({
      next: (clinic) => {
        if (this.state) {
          this.state.clinic = { ...this.state.clinic, ...clinic };
        }
        this.atualizarPreviewUrl();
        this.previewModelsTimestamp = Date.now();
        this.enviandoFotoProfissionalLinkBio = false;
        this.toast.success('Foto enviada', 'A foto do profissional foi atualizada no link na bio.');
      },
      error: (err: unknown) => {
        this.enviandoFotoProfissionalLinkBio = false;
        const detalhe = this.mensagemErroUploadFotoProfissional(err);
        this.toast.error('Não foi possível enviar a foto', detalhe);
      },
    });
    input.value = '';
  }

  /** Mensagem legível para falhas de upload (tamanho, tipo, limite do servidor). */
  private mensagemErroUploadFotoProfissional(err: unknown): string {
    if (err instanceof HttpErrorResponse) {
      if (err.status === 413) {
        return 'O servidor recusou o arquivo por ser muito grande. Use uma imagem de até 2 MB ou comprima o arquivo antes de enviar.';
      }
      const body = err.error as
        | { message?: string; errors?: Record<string, string[] | string> }
        | null
        | undefined;
      const fromErrors = body?.errors?.['professional_photo'];
      if (Array.isArray(fromErrors) && fromErrors.length) {
        return String(fromErrors[0]).trim();
      }
      if (typeof fromErrors === 'string' && fromErrors.trim()) {
        return fromErrors.trim();
      }
      if (body?.errors && typeof body.errors === 'object') {
        const first = Object.values(body.errors).flat()[0];
        if (typeof first === 'string' && first.trim()) {
          return first.trim();
        }
      }
      if (typeof body?.message === 'string' && body.message.trim()) {
        const m = body.message.trim();
        if (/greater than|too large|exceeds|413/i.test(m)) {
          return 'A foto é muito grande. O tamanho máximo permitido é 2 MB. Reduza a imagem e tente novamente.';
        }
        return m;
      }
    }
    return 'Verifique sua conexão e tente de novo. Se o arquivo for grande, use no máximo 2 MB.';
  }

  // Helpers para estatísticas
  selecionarPeriodoStats(periodo: LinkBioStatsPeriodo): void {
    this.statsPeriodo = periodo;
  }

  fecharInsightBanner(): void {
    this.insightBannerFechado = true;
  }

  aplicarSugestao(sugestao: LinkBioOverviewSuggestion): void {
    if (sugestao.rota) {
      void this.router.navigateByUrl(sugestao.rota);
      return;
    }
    if (sugestao.aba) {
      this.ativarAba(sugestao.aba, true);
    }
  }

  get visitasOntem(): number {
    const ontem = this.formatYmd(this.addDays(new Date(), -1));
    return Number(this.stats.views_per_day?.[ontem]) || 0;
  }

  get visitasTrendPercent(): number | null {
    const hoje = this.metrics?.visitas_hoje ?? 0;
    const ontem = this.visitasOntem;
    if (hoje === 0 && ontem === 0) return null;
    if (ontem === 0) return hoje > 0 ? 100 : null;
    return Math.round(((hoje - ontem) / ontem) * 100);
  }

  get cliquesTrendPercent(): number | null {
    const entries = this.sortedDayEntries(this.stats.clicks_per_day ?? {});
    if (entries.length < 14) return null;
    const recent = entries.slice(-7).reduce((sum, [, v]) => sum + (Number(v) || 0), 0);
    const previous = entries.slice(-14, -7).reduce((sum, [, v]) => sum + (Number(v) || 0), 0);
    if (recent === 0 && previous === 0) return null;
    if (previous === 0) return recent > 0 ? 100 : null;
    return Math.round(((recent - previous) / previous) * 100);
  }

  get ctrBarPercent(): number {
    const ctr = this.metrics?.taxa_clique ?? 0;
    return Math.min(100, Math.round((ctr / this.ctrMediaSetor) * 100));
  }

  get ctrAbaixoDaMedia(): boolean {
    return (this.metrics?.taxa_clique ?? 0) < this.ctrMediaSetor && (this.metrics?.total_views ?? 0) > 0;
  }

  get mostrarInsightBanner(): boolean {
    return this.ctrAbaixoDaMedia && !this.insightBannerFechado;
  }

  get insightBannerTexto(): string {
    const visitas = this.metrics?.visitas_hoje ?? 0;
    const cliques = this.metrics?.total_clicks ?? 0;
    const cliqueLabel = cliques === 1 ? '1 clique' : `${cliques} cliques`;
    return `Seu CTR está abaixo da média. Com ${visitas} visitas e ${cliqueLabel}, considere adicionar um botão de agendamento online para converter mais visitantes.`;
  }

  get totalCliquesPeriodo(): number {
    return this.chartCliques.reduce((sum, bar) => sum + bar.count, 0);
  }

  get chartCliques(): { label: string; count: number; percent: number; ghost: boolean }[] {
    const raw = this.stats.clicks_per_day ?? {};
    if (this.statsPeriodo === '7d') {
      const days = this.lastNDays(7);
      return this.barsFromCounts(
        days.map((date) => ({
          label: this.dayLabelShort(date),
          count: Number(raw[date]) || 0,
        }))
      );
    }
    if (this.statsPeriodo === '30d') {
      return this.barsFromCounts(this.aggregateByWeek(raw, 30));
    }
    return this.barsFromCounts(this.aggregateByMonth(raw, 90));
  }

  get origensClique(): { row: LinkBioClickBreakdownRow; percent: number; icon: string }[] {
    const rows = this.stats.click_breakdown ?? [];
    const max = Math.max(...rows.map((r) => r.total_last_30), 1);
    return rows.map((row) => ({
      row,
      percent: Math.round((row.total_last_30 / max) * 100),
      icon: this.iconeOrigemClique(row),
    }));
  }

  get sugestoesMelhoria(): LinkBioOverviewSuggestion[] {
    if (!this.state) return [];
    return buildLinkBioOverviewSuggestions({
      clinic: this.state.clinic,
      links: this.links,
      forms: this.forms,
      layoutModel: this.aparenciaModelo,
      metrics: this.metrics,
      ctrMediaSetor: this.ctrMediaSetor,
    });
  }

  iconeOrigemClique(row: LinkBioClickBreakdownRow): string {
    if (row.kind === 'bio_link') return 'link';
    const label = row.label.toLowerCase();
    const channel = (row.channel ?? '').toLowerCase();
    if (channel.includes('whatsapp') || label.includes('whatsapp')) return 'chat';
    if (channel.includes('maps') || label.includes('maps') || label.includes('chegar')) return 'location_on';
    if (channel.includes('email') || label.includes('e-mail') || label.includes('email')) return 'mail';
    if (channel.includes('instagram')) return 'photo_camera';
    if (channel.includes('phone') || label.includes('telefone')) return 'call';
    return 'touch_app';
  }

  get diasClicks(): { date: string; label: string; count: number; percent: number; ghost: boolean }[] {
    const s = this.stats;
    if (!s) return [];
    const entries = Object.entries(s.clicks_per_day ?? {});
    if (!entries.length) return [];
    entries.sort(([a], [b]) => a.localeCompare(b));
    const counts = entries.map(([, v]) => Number(v) || 0);
    const maxVal = Math.max(...counts);
    const dayLabels = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
    return entries.map(([date, countVal]) => {
      const c = Number(countVal) || 0;
      const d = this.parseStatsDate(date);
      const dow = d.getDay() === 0 ? 7 : d.getDay();
      const label = dayLabels[dow - 1] ?? date;
      /** Sem cliques em nenhum dia: barras “fantasma” só para o gráfico não sumir. */
      const ghost = maxVal === 0;
      const percent = ghost ? 18 : Math.round((c / maxVal) * 100);
      return { date, label, count: c, percent, ghost };
    });
  }

  /** Evita deslocar o dia da semana com fuso em strings YYYY-MM-DD. */
  private parseStatsDate(date: string): Date {
    if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return new Date(`${date}T12:00:00`);
    }
    return new Date(date);
  }

  private formatYmd(date: Date): string {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  private addDays(date: Date, days: number): Date {
    const next = new Date(date);
    next.setDate(next.getDate() + days);
    return next;
  }

  private lastNDays(n: number): string[] {
    const today = new Date();
    return Array.from({ length: n }, (_, index) => this.formatYmd(this.addDays(today, index - (n - 1))));
  }

  private sortedDayEntries(data: Record<string, number>): [string, number][] {
    return Object.entries(data).sort(([a], [b]) => a.localeCompare(b));
  }

  private dayLabelShort(date: string): string {
    const dayLabels = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    const d = this.parseStatsDate(date);
    return dayLabels[d.getDay()] ?? date;
  }

  private monthLabel(date: string): string {
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    const d = this.parseStatsDate(`${date.slice(0, 7)}-01`);
    return months[d.getMonth()] ?? date.slice(0, 7);
  }

  private barsFromCounts(items: { label: string; count: number }[]): {
    label: string;
    count: number;
    percent: number;
    ghost: boolean;
  }[] {
    if (!items.length) return [];
    const maxVal = Math.max(...items.map((item) => item.count), 0);
    const ghost = maxVal === 0;
    return items.map((item) => ({
      label: item.label,
      count: item.count,
      percent: ghost ? 18 : Math.round((item.count / maxVal) * 100),
      ghost,
    }));
  }

  private aggregateByWeek(data: Record<string, number>, days: number): { label: string; count: number }[] {
    const dates = this.lastNDays(days);
    const weeks: { label: string; count: number }[] = [];
    for (let i = 0; i < dates.length; i += 7) {
      const chunk = dates.slice(i, i + 7);
      const count = chunk.reduce((sum, date) => sum + (Number(data[date]) || 0), 0);
      weeks.push({ label: `Sem ${weeks.length + 1}`, count });
    }
    return weeks;
  }

  private aggregateByMonth(data: Record<string, number>, days: number): { label: string; count: number }[] {
    const dates = this.lastNDays(days);
    const buckets = new Map<string, number>();
    for (const date of dates) {
      const key = date.slice(0, 7);
      buckets.set(key, (buckets.get(key) ?? 0) + (Number(data[date]) || 0));
    }
    return Array.from(buckets.entries()).map(([key, count]) => ({
      label: this.monthLabel(key),
      count,
    }));
  }
}
