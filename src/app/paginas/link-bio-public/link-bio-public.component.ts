import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  computed,
  inject,
  PLATFORM_ID,
  Signal,
  signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
import {
  LinkBioService,
  LinkBioPublicData,
  LinkBioClinic,
  LinkBioLink,
  LinkBioPublicDocItem,
  LinkBioGoogleReviews,
  StudioLinkPublicData,
} from '../../core/services/link-bio.service';
import { absoluteMediaUrl } from '../../core/utils/absolute-media-url';
import { normalizeLinkBioClinic, parseLinkBioExtra } from '../../core/utils/link-bio-clinic-normalize.util';
import { PublicPageBodyService } from '../../core/services/public-page-body.service';
import { LoadingService } from '../../shared/services/loading.service';
import { resolvePublicAccentHex } from '../../core/utils/public-theme-accent';
import { linkBioPresetMeta } from './link-bio-preset.util';
import { LinkBioPublicLayoutPresetComponent } from './link-bio-public-layout-preset.component';
import { LinkBioPublicTotemComponent } from './link-bio-public-totem.component';
import { StudioLinkPublicComponent } from '../studio/studio-link-public.component';
import { isTotemQueryParam } from '../link-bio/link-bio-public-url.util';
import type { LinkBioLayoutModel } from '../../core/services/link-bio.service';

@Component({
  selector: 'app-link-bio-public',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LinkBioPublicTotemComponent, LinkBioPublicLayoutPresetComponent, StudioLinkPublicComponent],
  templateUrl: './link-bio-public.component.html',
  styleUrl: './link-bio-public.component.css',
})
export class LinkBioPublicComponent implements OnInit, OnDestroy {
  slug = '';
  /** Hub totem: `/l/:slug?totem=1` — lista só os links publicados. */
  totemMode = false;
  readonly data = signal<LinkBioPublicData | null>(null);
  readonly erro = signal('');
  readonly dark = signal(false);
  showSkeleton!: Signal<boolean>;

  private route = inject(ActivatedRoute);
  private linkBioService = inject(LinkBioService);
  private loadingService = inject(LoadingService);
  private title = inject(Title);
  private meta = inject(Meta);
  private platformId = inject(PLATFORM_ID);
  private publicPageBody = inject(PublicPageBodyService);

  readonly clinic = computed(() => this.data()?.clinic ?? null);

  readonly model = computed<LinkBioLayoutModel>(() => {
    const value = this.clinic()?.link_bio_model;
    return value && [1, 2, 3, 4, 5, 6, 7, 8].includes(value) ? value : 1;
  });

  readonly links = computed<LinkBioLink[]>(() => this.data()?.links ?? []);

  readonly formLinks = computed(() => this.data()?.form_links ?? []);

  readonly googleReviews = computed<LinkBioGoogleReviews | null>(() => this.data()?.google_reviews ?? null);

  /** Studio Link publicado substitui o layout legado 1–8 (Totem permanece legado). */
  readonly studioLink = computed<StudioLinkPublicData | null>(() => {
    const studio = this.data()?.studio_link;
    if (!studio?.enabled || !studio.templateId) return null;
    const shared = { ...studio.shared, media: { ...(studio.shared?.media ?? {}) } };
    if (shared.media) {
      shared.media.heroUrl = absoluteMediaUrl(shared.media.heroUrl) ?? shared.media.heroUrl;
      shared.media.portraitUrl = absoluteMediaUrl(shared.media.portraitUrl) ?? shared.media.portraitUrl;
      shared.media.officeUrl = absoluteMediaUrl(shared.media.officeUrl) ?? shared.media.officeUrl;
    }
    return { ...studio, shared };
  });

  /** Lista unificada: bio links primeiro, depois formulários (como no Blade). */
  readonly allLinks = computed<LinkBioPublicDocItem[]>(() => {
    const items: LinkBioPublicDocItem[] = this.links().map((item) => ({ type: 'bio', item }));
    this.formLinks().forEach((item) => items.push({ type: 'form', item }));
    return items;
  });

  /** Prévia no painel admin: não contabiliza visitas/cliques externos. */
  get linkBioPreview(): boolean {
    return isPlatformBrowser(this.platformId) && this.route.snapshot.queryParamMap.get('preview') === '1';
  }

  ngOnInit(): void {
    this.publicPageBody.enterPublicPage();
    this.totemMode = isTotemQueryParam((k) => this.route.snapshot.queryParamMap.get(k));
    try {
      this.dark.set(localStorage.getItem('gestgo_bio_dark') === '1');
    } catch {
      /* ignore */
    }
    this.syncThemeColor();
    const slug = this.route.snapshot.paramMap.get('slug') ?? '';
    this.slug = slug;
    if (!slug) {
      this.showSkeleton = signal(false).asReadonly();
      this.erro.set('Link inválido.');
      return;
    }
    const preview = this.route.snapshot.queryParamMap.get('preview') === '1';
    const { data$, showSkeleton } = this.loadingService.loadWithThreshold(
      this.linkBioService.getPublicBySlug(slug, { preview }),
      0,
    );
    this.showSkeleton = showSkeleton;
    data$.subscribe({
      next: (d) => {
        const clinic = { ...d.clinic };
        if (clinic.logo_url != null && String(clinic.logo_url).trim() !== '') {
          clinic.logo_url = absoluteMediaUrl(String(clinic.logo_url)) ?? clinic.logo_url;
        }
        if (clinic.company_logo_url != null && String(clinic.company_logo_url).trim() !== '') {
          clinic.company_logo_url = absoluteMediaUrl(String(clinic.company_logo_url)) ?? clinic.company_logo_url;
        }
        if (clinic.professional_photo_url != null && String(clinic.professional_photo_url).trim() !== '') {
          clinic.professional_photo_url =
            absoluteMediaUrl(String(clinic.professional_photo_url)) ?? clinic.professional_photo_url;
        }
        if (clinic.cover_image_url != null && String(clinic.cover_image_url).trim() !== '') {
          clinic.cover_image_url = absoluteMediaUrl(String(clinic.cover_image_url)) ?? clinic.cover_image_url;
        }
        let next: LinkBioPublicData = { ...d, clinic };
        next = this.applyPreviewFromAdminSession(next);
        if (next.clinic) {
          next = {
            ...next,
            clinic: normalizeLinkBioClinic(next.clinic, { publicPage: true }),
          };
        }
        this.data.set(next);
        this.erro.set('');
        this.updateMeta();
        this.syncThemeColor();
      },
      error: () => {
        // Adia o erro para o próximo tick — evita NG0100 no @if do template
        queueMicrotask(() => this.erro.set('Link na bio não encontrado.'));
      },
    });
  }

  /** Prévia no painel: ?preview=1&preview_model=1..8 + sessionStorage (JSON extra). */
  private applyPreviewFromAdminSession(source: LinkBioPublicData): LinkBioPublicData {
    if (!isPlatformBrowser(this.platformId) || !source.clinic) return source;
    const q = this.route.snapshot.queryParamMap;
    if (q.get('preview') !== '1') return source;
    let clinic = { ...source.clinic };
    const pm = q.get('preview_model');
    if (pm && ['1', '2', '3', '4', '5', '6', '7', '8'].includes(pm)) {
      clinic = { ...clinic, link_bio_model: Number(pm) as LinkBioLayoutModel };
    }
    try {
      const raw = sessionStorage.getItem('zm_link_bio_preview');
      if (!raw?.trim()) return { ...source, clinic };
      const o = JSON.parse(raw) as { link_bio_extra?: unknown };
      if (
        o?.link_bio_extra != null &&
        typeof o.link_bio_extra === 'object' &&
        !Array.isArray(o.link_bio_extra)
      ) {
        clinic = { ...clinic, link_bio_extra: parseLinkBioExtra(o.link_bio_extra) };
      }
    } catch {
      /* JSON inválido na sessão — ignora */
    }
    return { ...source, clinic };
  }

  private updateMeta(): void {
    const c = this.clinic();
    if (!c) return;
    const isPv = isPlatformBrowser(this.platformId) && this.route.snapshot.queryParamMap.get('preview') === '1';
    const suffix = isPv ? ' (prévia)' : '';
    const title = c.short_description
      ? `${c.name} – ${(c.short_description as string).slice(0, 50)}${suffix}`
      : `${c.name}${suffix}`;
    this.title.setTitle(title);
    const desc = c.meta_description ?? (c.short_description ?? `Links e informações de ${c.name}`);
    this.meta.updateTag({ name: 'description', content: desc });
    this.meta.updateTag({ property: 'og:title', content: c.name });
    this.meta.updateTag({ property: 'og:description', content: desc });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    if (c.cover_image_url) this.meta.updateTag({ property: 'og:image', content: c.cover_image_url });
    else if (c.professional_photo_url)
      this.meta.updateTag({ property: 'og:image', content: c.professional_photo_url });
    else if (c.logo_url) this.meta.updateTag({ property: 'og:image', content: c.logo_url });
    else if (c.company_logo_url) this.meta.updateTag({ property: 'og:image', content: c.company_logo_url });
  }

  toggleDark(): void {
    this.dark.update((v) => !v);
    try {
      localStorage.setItem('gestgo_bio_dark', this.dark() ? '1' : '0');
    } catch {
      /* ignore */
    }
    this.syncThemeColor();
  }

  /**
   * Status bar + barra de progresso = cor do tema da clínica (não o verde Gestgo).
   * Preferência: accent da API → brand do modelo visual → --brand no DOM.
   */
  private syncThemeColor(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    if (this.dark()) {
      this.publicPageBody.setThemeColor('#151a1b');
      return;
    }
    if (this.data() && this.model() === 7) {
      this.publicPageBody.setThemeColor('#34285e');
      return;
    }
    const clinic = this.data()?.clinic;
    const fromApi = clinic ? resolvePublicAccentHex(clinic.public_theme, clinic.accent_hex) : null;
    if (fromApi) {
      this.publicPageBody.setThemeColor(fromApi);
      return;
    }
    if (this.data()) {
      const presetBrand = linkBioPresetMeta(this.model()).brand;
      if (presetBrand) {
        this.publicPageBody.setThemeColor(presetBrand);
        return;
      }
    }
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const root = document.querySelector('.lb-preset-root') as HTMLElement | null;
        const brand = root ? getComputedStyle(root).getPropertyValue('--brand').trim() : '';
        const solid =
          brand && /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(brand)
            ? brand
            : linkBioPresetMeta(1).brand;
        this.publicPageBody.setThemeColor(solid);
        this.publicPageBody.reapplyLockedThemeColor();
      });
    });
  }

  sharePage(): void {
    try {
      if (typeof navigator !== 'undefined' && navigator.share) {
        navigator
          .share({
            title: document.title,
            text: this.clinic()?.short_description ?? this.clinic()?.name ?? '',
            url: window.location.href,
          })
          .catch(() => this.copyLinkFallback());
        return;
      }
    } catch {
      /* ignore */
    }
    this.copyLinkFallback();
  }

  copyLinkFallback(): void {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(url).then(() => this.showCopiedFeedback());
    } else {
      const input = document.createElement('input');
      input.value = url;
      input.setAttribute('readonly', '');
      input.style.position = 'absolute';
      input.style.left = '-9999px';
      document.body.appendChild(input);
      input.select();
      try {
        document.execCommand('copy');
        this.showCopiedFeedback();
      } catch {
        window.alert('Link: ' + url);
      }
      document.body.removeChild(input);
    }
  }

  currentYear(): number {
    return new Date().getFullYear();
  }

  private showCopiedFeedback(): void {
    const toast = document.createElement('div');
    toast.textContent = 'Link copiado!';
    Object.assign(toast.style, {
      position: 'fixed',
      bottom: '24px',
      left: '50%',
      transform: 'translateX(-50%) translateY(8px)',
      background: '#0b1628',
      color: '#ffffff',
      fontSize: '13px',
      fontWeight: '600',
      padding: '10px 22px',
      borderRadius: '999px',
      opacity: '0',
      transition: 'opacity .2s, transform .2s',
      zIndex: '9999',
      whiteSpace: 'nowrap',
    });
    document.body.appendChild(toast);
    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateX(-50%) translateY(0)';
    });
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(8px)';
      setTimeout(() => toast.remove(), 220);
    }, 2400);
  }

  ngOnDestroy(): void {
    this.publicPageBody.leavePublicPage();
  }
}
