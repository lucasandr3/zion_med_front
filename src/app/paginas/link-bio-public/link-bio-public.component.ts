import { Component, OnDestroy, OnInit, inject, PLATFORM_ID, Signal, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
import {
  LinkBioService,
  LinkBioPublicData,
  LinkBioClinic,
  LinkBioLink,
  LinkBioPublicDocItem,
} from '../../core/services/link-bio.service';
import { absoluteMediaUrl } from '../../core/utils/absolute-media-url';
import { PublicPageBodyService } from '../../core/services/public-page-body.service';
import { LoadingService } from '../../shared/services/loading.service';
import { ZmSkeletonListComponent } from '../../shared/components/skeletons';
import { LinkBioPublicLayoutsComponent } from './link-bio-public-layouts.component';
import { LinkBioPublicLayoutGenericComponent } from './link-bio-public-layout-generic.component';
import { LinkBioPublicLayoutVetComponent } from './link-bio-public-layout-vet.component';
import { LinkBioPublicLayoutPediaComponent } from './link-bio-public-layout-pedia.component';
import { LinkBioPublicLayoutNutriComponent } from './link-bio-public-layout-nutri.component';
import type { LinkBioLayoutModel } from '../../core/services/link-bio.service';

@Component({
  selector: 'app-link-bio-public',
  standalone: true,
  imports: [
    CommonModule,
    ZmSkeletonListComponent,
    LinkBioPublicLayoutGenericComponent,
    LinkBioPublicLayoutsComponent,
    LinkBioPublicLayoutVetComponent,
    LinkBioPublicLayoutPediaComponent,
    LinkBioPublicLayoutNutriComponent,
  ],
  templateUrl: './link-bio-public.component.html',
  styleUrl: './link-bio-public.component.css',
})
export class LinkBioPublicComponent implements OnInit, OnDestroy {
  slug = '';
  data: LinkBioPublicData | null = null;
  showSkeleton!: Signal<boolean>;
  erro = '';
  dark = false;

  private route = inject(ActivatedRoute);
  private linkBioService = inject(LinkBioService);
  private loadingService = inject(LoadingService);
  private title = inject(Title);
  private meta = inject(Meta);
  private platformId = inject(PLATFORM_ID);
  private publicPageBody = inject(PublicPageBodyService);

  ngOnInit(): void {
    this.publicPageBody.enterPublicPage();
    try {
      this.dark = localStorage.getItem('gestgo_bio_dark') === '1';
    } catch {}
    const slug = this.route.snapshot.paramMap.get('slug') ?? '';
    this.slug = slug;
    if (!slug) {
      this.showSkeleton = signal(false).asReadonly();
      this.erro = 'Link inválido.';
      return;
    }
    const preview = this.route.snapshot.queryParamMap.get('preview') === '1';
    const { data$, showSkeleton } = this.loadingService.loadWithThreshold(
      this.linkBioService.getPublicBySlug(slug, { preview })
    );
    this.showSkeleton = showSkeleton;
    data$.subscribe({
      next: (d) => {
        const clinic = { ...d.clinic };
        if (clinic.logo_url != null && String(clinic.logo_url).trim() !== '') {
          clinic.logo_url = absoluteMediaUrl(String(clinic.logo_url)) ?? clinic.logo_url;
        }
        if (clinic.cover_image_url != null && String(clinic.cover_image_url).trim() !== '') {
          clinic.cover_image_url = absoluteMediaUrl(String(clinic.cover_image_url)) ?? clinic.cover_image_url;
        }
        this.data = { ...d, clinic };
        this.applyPreviewFromAdminSession();
        this.updateMeta();
      },
      error: () => {
        this.erro = 'Link Bio não encontrado.';
      },
    });
  }

  /** Prévia no painel: ?preview=1&preview_model=1..8 + sessionStorage (JSON extra). */
  private applyPreviewFromAdminSession(): void {
    if (!isPlatformBrowser(this.platformId) || !this.data?.clinic) return;
    const q = this.route.snapshot.queryParamMap;
    if (q.get('preview') !== '1') return;
    const pm = q.get('preview_model');
    if (pm && ['1', '2', '3', '4', '5', '6', '7', '8'].includes(pm)) {
      this.data.clinic.link_bio_model = Number(pm) as LinkBioLayoutModel;
    }
    try {
      const raw = sessionStorage.getItem('zm_link_bio_preview');
      if (!raw?.trim()) return;
      const o = JSON.parse(raw) as { link_bio_extra?: unknown };
      if (
        o?.link_bio_extra != null &&
        typeof o.link_bio_extra === 'object' &&
        !Array.isArray(o.link_bio_extra)
      ) {
        this.data.clinic.link_bio_extra = o.link_bio_extra as LinkBioClinic['link_bio_extra'];
      }
    } catch {
      /* JSON inválido na sessão — ignora */
    }
  }

  private updateMeta(): void {
    const c = this.clinic;
    if (!c) return;
    const isPv = isPlatformBrowser(this.platformId) && this.route.snapshot.queryParamMap.get('preview') === '1';
    const suffix = isPv ? ' (prévia)' : '';
    const title = c.short_description ? `${c.name} – ${(c.short_description as string).slice(0, 50)}${suffix}` : `${c.name}${suffix}`;
    this.title.setTitle(title);
    const desc = c.meta_description ?? (c.short_description ?? `Links e informações de ${c.name}`);
    this.meta.updateTag({ name: 'description', content: desc });
    this.meta.updateTag({ property: 'og:title', content: c.name });
    this.meta.updateTag({ property: 'og:description', content: desc });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    if (c.cover_image_url) this.meta.updateTag({ property: 'og:image', content: c.cover_image_url });
    else if (c.logo_url) this.meta.updateTag({ property: 'og:image', content: c.logo_url });
  }

  get clinic(): LinkBioClinic | null {
    return this.data?.clinic ?? null;
  }

  /** Prévia no painel admin: não contabiliza visitas/cliques externos. */
  get linkBioPreview(): boolean {
    return isPlatformBrowser(this.platformId) && this.route.snapshot.queryParamMap.get('preview') === '1';
  }

  get model(): LinkBioLayoutModel {
    const value = this.clinic?.link_bio_model;
    return value && [1, 2, 3, 4, 5, 6, 7, 8].includes(value) ? value : 1;
  }

  /** Para o componente de layouts 2–5 (só usar quando model ∈ {2,3,4,5}). */
  layoutModelLegacy(): 2 | 3 | 4 | 5 {
    const v = this.model;
    if (v === 2 || v === 3 || v === 4 || v === 5) return v;
    return 2;
  }

  get links(): LinkBioLink[] {
    return this.data?.links ?? [];
  }

  get formLinks(): { id: number; name: string; public_url: string }[] {
    return this.data?.form_links ?? [];
  }

  /** Lista unificada: bio links primeiro, depois formulários (como no Blade). */
  get allLinks(): LinkBioPublicDocItem[] {
    const items: LinkBioPublicDocItem[] = this.links.map((item) => ({ type: 'bio', item }));
    this.formLinks.forEach((item) => items.push({ type: 'form', item }));
    return items;
  }

  toggleDark(): void {
    this.dark = !this.dark;
    try {
      localStorage.setItem('gestgo_bio_dark', this.dark ? '1' : '0');
    } catch {}
  }

  sharePage(): void {
    try {
      if (typeof navigator !== 'undefined' && navigator.share) {
        navigator.share({
          title: document.title,
          text: this.clinic?.short_description ?? this.clinic?.name ?? '',
          url: window.location.href,
        }).catch(() => this.copyLinkFallback());
        return;
      }
    } catch {}
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
