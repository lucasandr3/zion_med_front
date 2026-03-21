import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { LinkBioService, LinkBioPublicData, LinkBioClinic, LinkBioLink } from '../../core/services/link-bio.service';
import { LoadingOverlayComponent } from '../../componentes/ui/loading-overlay/loading-overlay.component';

type BioLinkItem = { type: 'bio'; item: LinkBioLink } | { type: 'form'; item: { id: number; name: string; public_url: string } };

@Component({
  selector: 'app-link-bio-public',
  standalone: true,
  imports: [CommonModule, RouterLink, LoadingOverlayComponent],
  templateUrl: './link-bio-public.component.html',
  styleUrl: './link-bio-public.component.css',
})
export class LinkBioPublicComponent implements OnInit {
  slug = '';
  data: LinkBioPublicData | null = null;
  carregando = true;
  erro = '';
  dark = false;

  private route = inject(ActivatedRoute);
  private linkBioService = inject(LinkBioService);
  private title = inject(Title);
  private meta = inject(Meta);

  ngOnInit(): void {
    try {
      this.dark = localStorage.getItem('zionmed_bio_dark') === '1';
    } catch {}
    const slug = this.route.snapshot.paramMap.get('slug') ?? '';
    this.slug = slug;
    if (!slug) {
      this.carregando = false;
      this.erro = 'Link inválido.';
      return;
    }
    this.linkBioService.getPublicBySlug(slug).subscribe({
      next: (d) => {
        this.data = d;
        this.carregando = false;
        this.updateMeta();
      },
      error: () => {
        this.carregando = false;
        this.erro = 'Link Bio não encontrado.';
      },
    });
  }

  private updateMeta(): void {
    const c = this.clinic;
    if (!c) return;
    const title = c.short_description ? `${c.name} – ${(c.short_description as string).slice(0, 50)}` : c.name;
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

  get links(): LinkBioLink[] {
    return this.data?.links ?? [];
  }

  get formLinks(): { id: number; name: string; public_url: string }[] {
    return this.data?.form_links ?? [];
  }

  /** Lista unificada: bio links primeiro, depois formulários (como no Blade). */
  get allLinks(): BioLinkItem[] {
    const items: BioLinkItem[] = this.links.map((item) => ({ type: 'bio', item }));
    this.formLinks.forEach((item) => items.push({ type: 'form', item }));
    return items;
  }

  get hasCoverImage(): boolean {
    return !!this.clinic?.cover_image_url;
  }

  get hasCoverColor(): boolean {
    return !!this.clinic?.cover_color;
  }

  get hasCover(): boolean {
    if (this.coverMode === 'none') return false;
    if (this.coverMode === 'solid') return true;
    return this.hasCoverImage || this.hasCoverColor;
  }

  get coverMode(): 'banner' | 'solid' | 'none' {
    const mode = this.clinic?.cover_mode;
    if (mode === 'none' || mode === 'solid' || mode === 'banner') return mode;
    return 'banner';
  }

  coverStyle(): Record<string, string> {
    const color = this.clinic?.cover_color ?? '#1a1a2e';
    return { 'background-color': color };
  }

  accentHex(): string {
    return this.clinic?.accent_hex ?? '#1a1a2e';
  }

  themeVars(): Record<string, string> {
    const accent = this.accentHex();
    return { '--accent': accent };
  }

  /** Grid de horários em ordem (Seg..Dom). */
  get hoursGridArray(): { label: string; text: string }[] {
    const grid = this.clinic?.business_hours_grid;
    if (!grid || typeof grid !== 'object') return [];
    const order = ['1', '2', '3', '4', '5', '6', '7'];
    return order.map((k) => (grid as Record<string, { label: string; text: string }>)[k]).filter(Boolean);
  }

  get hasAnyHour(): boolean {
    return this.hoursGridArray.some((d) => d.text !== '–');
  }

  get weekdayHoursText(): string {
    const weekdays = this.hoursGridArray.slice(0, 5).map((d) => d.text).filter((t) => t && t !== '–');
    if (!weekdays.length) return 'Fechado';
    const first = weekdays[0]!;
    const allEqual = weekdays.every((h) => h === first);
    return allEqual ? first : 'Horários variáveis';
  }

  get weekendHoursText(): string {
    const weekends = this.hoursGridArray.slice(5, 7).map((d) => d.text).filter((t) => t && t !== '–');
    if (!weekends.length) return 'Fechado';
    const first = weekends[0]!;
    const allEqual = weekends.every((h) => h === first);
    return allEqual ? first : 'Horários variáveis';
  }

  get clinicInitials(): string {
    const name = this.clinic?.name?.trim() ?? '';
    if (!name) return 'ZM';
    const parts = name.split(/\s+/).filter(Boolean);
    if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
    return (parts[0]!.charAt(0) + parts[1]!.charAt(0)).toUpperCase();
  }

  whatsappUrl(): string {
    const phone = this.clinic?.phone?.replace(/\D/g, '') ?? '';
    const wa = phone.length >= 10 && phone.length <= 11 ? '55' + phone : phone;
    return wa ? `https://wa.me/${wa}` : '';
  }

  iconName(icon: string | undefined): string {
    return icon && icon !== 'link' ? icon : 'link';
  }

  formToken(f: { public_url: string }): string {
    const parts = f.public_url.split('/f/');
    return parts.length > 1 ? parts[1]!.split('?')[0]! : '';
  }

  toggleDark(): void {
    this.dark = !this.dark;
    try {
      localStorage.setItem('zionmed_bio_dark', this.dark ? '1' : '0');
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
}
