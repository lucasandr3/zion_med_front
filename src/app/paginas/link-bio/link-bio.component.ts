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
} from '../../core/services/link-bio.service';
import { LoadingService } from '../../shared/services/loading.service';
import { ZmSkeletonLinkBioComponent } from '../../shared/components/skeletons';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { normalizeLinkBioClinic } from '../../core/utils/link-bio-clinic-normalize.util';

type AbaPrincipal = 'visaoGeral' | 'conteudo';
type Aba = 'links' | 'forms' | 'aparencia' | 'modelos' | 'conteudoExtra';

import { type LinkBioOverviewSuggestion } from './link-bio-overview-suggestions.util';
import { LinkBioLinksTabComponent } from './link-bio-links-tab.component';
import { LinkBioFormsTabComponent } from './link-bio-forms-tab.component';
import { LinkBioAparenciaTabComponent } from './link-bio-aparencia-tab.component';
import { LinkBioConteudoExtraTabComponent } from './link-bio-conteudo-extra-tab.component';
import { LinkBioModelosTabComponent } from './link-bio-modelos-tab.component';
import { LinkBioVisaoGeralTabComponent } from './link-bio-visao-geral-tab.component';
import { linkBioModelLabel } from './link-bio-model-labels.util';
import {
  applyExtraToFormState,
  buildExtraPayload,
  createEmptyExtraFormState,
  type LinkBioExtraFormState,
} from './link-bio-extra-form.util';
import { normalizeGooglePlaceId } from './link-bio-google-review-link.util';

const LINK_BIO_PREVIEW_SESSION_KEY = 'zm_link_bio_preview';

import { ZARD_FORM_CONTROL_IMPORTS } from '@/shared/components/input';
import { ZardBadgeComponent } from '@/shared/components/badge';
import { ZardButtonComponent } from '@/shared/components/button/button.component';
import { ZardTabComponent, ZardTabGroupComponent } from '@/shared/components/tabs';
import { prefetchPublicFormQr } from '../../core/utils/public-form-qr.util';
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
    ZardTabComponent,
    ZardTabGroupComponent,
    LinkBioSidePreviewComponent,
    LinkBioVisaoGeralTabComponent,
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

  aparenciaModelo: LinkBioLayoutModel = 1;
  linkAvaliePlaceIdManual = '';
  extraForm: LinkBioExtraFormState = createEmptyExtraFormState();
  previewSessionVersion = 0;

  previewUrlSafe: SafeResourceUrl | null = null;

  private linkBioService = inject(LinkBioService);
  private loadingService = inject(LoadingService);
  private sanitizer = inject(DomSanitizer);
  private platformId = inject(PLATFORM_ID);
  private router = inject(Router);

  get links(): LinkBioLink[] {
    return this.state?.links ?? [];
  }

  get forms(): LinkBioFormLink[] {
    return this.state?.forms ?? [];
  }

  get metrics() {
    return this.state?.metrics;
  }

  get previewAoLado(): boolean {
    return this.abaAtiva === 'links' || this.abaAtiva === 'forms' || this.abaAtiva === 'aparencia';
  }

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

  private getPreviewUrl(cacheBust?: boolean): string | null {
    const slug = this.state?.clinic?.slug;
    const publicUrl = this.state?.public_url ?? '';
    if (!slug) return publicUrl || null;
    if (!isPlatformBrowser(this.platformId)) return publicUrl || null;
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    if (!origin) return publicUrl || null;
    const base = `${origin}/l/${encodeURIComponent(slug)}?preview=1`;
    return cacheBust ? `${base}&t=${Date.now()}` : base;
  }

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

  aplicarEstadoLinkBio(s: LinkBioState): void {
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
