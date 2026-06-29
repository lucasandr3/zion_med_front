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
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  LinkBioService,
  LinkBioState,
  LinkBioLink,
  LinkBioFormLink,
  LinkBioLayoutModel,
  LinkBioStats,
} from '../../core/services/link-bio.service';
import { LoadingService } from '../../shared/services/loading.service';
import { ZmSkeletonLinkBioComponent } from '../../shared/components/skeletons';
import { ToastService } from '../../core/services/toast.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { normalizeLinkBioClinic } from '../../core/utils/link-bio-clinic-normalize.util';

type AbaPrincipal = 'visaoGeral' | 'conteudo';
type Aba = 'links' | 'forms' | 'aparencia' | 'modelos' | 'conteudoExtra';

import { type LinkBioOverviewSuggestion } from './link-bio-overview-suggestions.util';
import { type LinkBioStatsPeriodo } from './link-bio-stats-chart.util';
import { LinkBioOverviewSectionComponent } from './link-bio-overview-section.component';
import { LinkBioLinksTabComponent } from './link-bio-links-tab.component';
import { LinkBioFormsTabComponent } from './link-bio-forms-tab.component';
import { LinkBioAparenciaTabComponent } from './link-bio-aparencia-tab.component';
import { LinkBioConteudoExtraTabComponent } from './link-bio-conteudo-extra-tab.component';
import { LinkBioModelosTabComponent } from './link-bio-modelos-tab.component';
import { linkBioModelLabel } from './link-bio-model-labels.util';
import {
  applyExtraToFormState,
  buildExtraPayload,
  createEmptyExtraFormState,
  type LinkBioExtraFormState,
} from './link-bio-extra-form.util';
import { normalizeGooglePlaceId } from './link-bio-google-review-link.util';
import { environment } from '../../../environments/environment';

const LINK_BIO_PREVIEW_SESSION_KEY = 'zm_link_bio_preview';

import { ZARD_FORM_CONTROL_IMPORTS } from '@/shared/components/input';
import { ZardBadgeComponent } from '@/shared/components/badge';
import { ZardButtonComponent } from '@/shared/components/button/button.component';
import { ZardCardComponent } from '@/shared/components/card/card.component';
import { ZardTabComponent, ZardTabGroupComponent } from '@/shared/components/tabs';
import { ZardMenuImports } from '../../shared/components/menu/menu.imports';
import { ZardSkeletonComponent } from '@/shared/components/skeleton/skeleton.component';
import {
  downloadPublicFormQrPng,
  getOrCreatePublicFormQrDataUrl,
  prefetchPublicFormQr,
} from '../../core/utils/public-form-qr.util';
import { LinkBioSidePreviewComponent } from './link-bio-side-preview.component';

@Component({
  selector: 'app-pagina-link-bio',
  standalone: true,
  imports: [
    ...ZARD_FORM_CONTROL_IMPORTS,
    CommonModule,
    FormsModule,
    ZmSkeletonLinkBioComponent,
    ZardBadgeComponent,
    ZardButtonComponent,
    ZardCardComponent,
    ZardTabComponent,
    ZardTabGroupComponent,
    ZardSkeletonComponent,
    ...ZardMenuImports,
    LinkBioSidePreviewComponent,
    LinkBioOverviewSectionComponent,
    LinkBioLinksTabComponent,
    LinkBioFormsTabComponent,
    LinkBioAparenciaTabComponent,
    LinkBioConteudoExtraTabComponent,
    LinkBioModelosTabComponent,
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

  // Aparência (modelo/layout — aba Modelos)
  aparenciaModelo: LinkBioLayoutModel = 1;
  /** Place ID manual para gerar o link «Avalie no Google» (aba Links). */
  linkAvaliePlaceIdManual = '';
  extraForm: LinkBioExtraFormState = createEmptyExtraFormState();
  previewSessionVersion = 0;
  atualizandoStatsRodape = false;

  copiedPrincipalLink = false;
  qrAberto = false;
  qrCarregando = false;
  qrDataUrl = '';
  statsPeriodo: LinkBioStatsPeriodo = '7d';
  insightBannerFechado = false;

  readonly ctrMediaSetor = 5;

  previewUrlSafe: SafeResourceUrl | null = null;

  private linkBioService = inject(LinkBioService);
  private loadingService = inject(LoadingService);
  private toast = inject(ToastService);
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

  /** Modelo salvo na API (para barra “alterações não salvas”). */
  modeloPersistido: LinkBioLayoutModel = 1;

  get modeloDirty(): boolean {
    return this.state != null && this.aparenciaModelo !== this.modeloPersistido;
  }

  get layoutPublicadoLabel(): string {
    return linkBioModelLabel(this.modeloPersistido);
  }

  get layoutSelecionadoLabel(): string {
    return linkBioModelLabel(this.aparenciaModelo);
  }

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

  /** Grava rascunho do formulário extra na sessão para os iframes de prévia (?preview=1). */
  syncDraftToSessionForPreviews(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    try {
      const payload = buildExtraPayload(this.extraForm, this.state?.clinic?.link_bio_extra);
      if (!payload) {
        sessionStorage.removeItem(LINK_BIO_PREVIEW_SESSION_KEY);
      } else {
        sessionStorage.setItem(LINK_BIO_PREVIEW_SESSION_KEY, JSON.stringify({ link_bio_extra: payload }));
      }
    } catch {
      /* ignore */
    }
    this.previewSessionVersion = Date.now();
  }

  onExtraClinicUpdated(): void {
    if (this.state) {
      this.extraForm = applyExtraToFormState(this.state.clinic.link_bio_extra);
    }
    if (isPlatformBrowser(this.platformId)) {
      try {
        sessionStorage.removeItem(LINK_BIO_PREVIEW_SESSION_KEY);
      } catch {
        /* ignore */
      }
    }
    this.previewSessionVersion = Date.now();
    this.syncDraftToSessionForPreviews();
  }

  /** Atualiza o iframe de preview (ex.: após salvar aparência). */
  atualizarPreviewUrl(): void {
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
    this.aparenciaModelo = (c.link_bio_model as LinkBioLayoutModel) ?? 1;
    this.modeloPersistido = this.aparenciaModelo;
    this.linkAvaliePlaceIdManual = normalizeGooglePlaceId(c.google_place_id) ?? '';
    this.extraForm = applyExtraToFormState(c.link_bio_extra);
    this.syncDraftToSessionForPreviews();
    const previewUrl = this.getPreviewUrl(true);
    this.previewUrlSafe = previewUrl ? this.sanitizer.bypassSecurityTrustResourceUrl(previewUrl) : null;
    if (s.public_url) prefetchPublicFormQr(s.public_url);
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
}
