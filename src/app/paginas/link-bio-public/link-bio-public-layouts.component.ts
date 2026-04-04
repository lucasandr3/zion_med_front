import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  LinkBioClinic,
  LinkBioExtra,
  LinkBioLink,
  LinkBioPublicDocItem,
  LinkBioService,
} from '../../core/services/link-bio.service';

@Component({
  selector: 'app-link-bio-public-layouts',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './link-bio-public-layouts.component.html',
  styleUrl: './link-bio-public-layouts.component.css',
})
export class LinkBioPublicLayoutsComponent {
  private linkBio = inject(LinkBioService);

  @Input({ required: true }) model!: 2 | 3 | 4 | 5;
  @Input({ required: true }) clinic!: LinkBioClinic;
  @Input({ required: true }) bioLinks: LinkBioLink[] = [];
  @Input() dark = false;
  @Input() allDocs: LinkBioPublicDocItem[] = [];
  @Input() publicSlug = '';
  @Input() linkBioPreview = false;

  @Output() toggleDark = new EventEmitter<void>();
  @Output() share = new EventEmitter<void>();

  get extra(): LinkBioExtra {
    const e = this.clinic.link_bio_extra;
    return e && typeof e === 'object' ? (e as LinkBioExtra) : {};
  }

  get hoursGridArray(): { label: string; text: string }[] {
    const grid = this.clinic.business_hours_grid;
    if (!grid || typeof grid !== 'object') return [];
    const order = ['1', '2', '3', '4', '5', '6', '7'];
    return order.map((k) => (grid as Record<string, { label: string; text: string }>)[k]).filter(Boolean);
  }

  get hasAnyHour(): boolean {
    return this.hoursGridArray.some((d) => d.text !== '–');
  }

  get clinicInitials(): string {
    const name = this.clinic.name?.trim() ?? '';
    if (!name) return 'GG';
    const parts = name.split(/\s+/).filter(Boolean);
    if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
    return (parts[0]!.charAt(0) + parts[1]!.charAt(0)).toUpperCase();
  }

  /** Modelo 2: última palavra em itálico (ex.: Dra. Ana _Beatriz_) */
  get soloNameParts(): { line1: string; emphasis: string } {
    const name = this.clinic.name?.trim() ?? '';
    const parts = name.split(/\s+/).filter(Boolean);
    if (parts.length <= 1) return { line1: name, emphasis: '' };
    return { line1: parts.slice(0, -1).join(' '), emphasis: parts[parts.length - 1]! };
  }

  get heroTaglineM2(): string {
    return (
      this.extra.hero_tagline ??
      [this.clinic.specialties_list?.[0], this.extra.council_registration].filter(Boolean).join(' · ')
    );
  }

  get modalitiesM2(): { title: string; subtitle?: string; available: boolean }[] {
    const m = this.extra.modalities;
    if (m?.length) {
      return m.map((x) => ({
        title: x.title,
        subtitle: x.subtitle,
        available: x.available !== false,
      }));
    }
    return [
      {
        title: 'Online',
        subtitle: 'Atendimento remoto',
        available: true,
      },
      {
        title: 'Presencial',
        subtitle: this.clinic.address?.trim() || 'Consultório',
        available: true,
      },
    ];
  }

  get brandSubtitleM3(): string {
    if (this.extra.brand_subtitle) return this.extra.brand_subtitle;
    const y = this.clinic.founded_year;
    return y ? `Estética avançada · Desde ${y}` : 'Estética avançada';
  }

  get m3BrandParts(): { gold: string; plain: string } {
    const name = this.clinic.name?.trim() ?? '';
    const parts = name.split(/\s+/).filter(Boolean);
    if (parts.length <= 1) return { gold: name, plain: '' };
    return { gold: parts[0]!, plain: parts.slice(1).join(' ') };
  }

  get proceduresM3(): string[] {
    const list = this.clinic.specialties_list ?? [];
    if (list.length) return list.slice(0, 12);
    return ['Botox', 'Preenchimento', 'Skincare', 'Bioestimulador', 'Laser', 'Fios PDO'];
  }

  get conveniosM4(): string[] {
    const c = this.extra.convenios;
    if (c?.length) return c;
    return [];
  }

  get councilLineM4(): string {
    return this.extra.council_registration ?? '';
  }

  get instagramUrl(): string {
    if (this.extra.instagram_url?.trim()) return this.extra.instagram_url.trim();
    const ig = this.bioLinks.find((l) => /instagram\.com/i.test(l.url));
    return ig?.url ?? '';
  }

  get teamM5(): { name: string; credential?: string; notes?: string; whatsapp?: string }[] {
    return this.extra.team?.length ? this.extra.team : [];
  }

  get teamPreviewM5(): { name: string; initials: string; color: string }[] {
    const colors = ['bg-indigo-500', 'bg-emerald-500', 'bg-orange-500', 'bg-pink-500', 'bg-cyan-500'];
    return this.teamM5.slice(0, 5).map((m, i) => ({
      name: m.name,
      initials: this.initialsFromName(m.name),
      color: colors[i % colors.length]!,
    }));
  }

  get teamExtraCountM5(): number {
    return Math.max(0, this.teamM5.length - 3);
  }

  initialsFromName(name: string): string {
    const p = name.trim().split(/\s+/).filter(Boolean);
    if (!p.length) return '?';
    if (p.length === 1) return p[0]!.slice(0, 2).toUpperCase();
    return (p[0]!.charAt(0) + p[p.length - 1]!.charAt(0)).toUpperCase();
  }

  whatsappUrl(phone?: string): string {
    const raw = (phone ?? this.clinic.phone)?.replace(/\D/g, '') ?? '';
    const wa = raw.length >= 10 && raw.length <= 11 ? '55' + raw : raw;
    return wa ? `https://wa.me/${wa}` : '';
  }

  waUrlForMember(whatsapp?: string): string {
    if (!whatsapp?.trim()) return '';
    const d = whatsapp.replace(/\D/g, '');
    if (!d) return '';
    const wa = d.length >= 10 && d.length <= 13 ? d : d;
    return `https://wa.me/${wa}`;
  }

  formToken(f: { public_url: string }): string {
    const parts = f.public_url.split('/f/');
    return parts.length > 1 ? parts[1]!.split('?')[0]! : '';
  }

  onToggleDark(): void {
    this.toggleDark.emit();
  }

  onShare(): void {
    this.share.emit();
  }

  trackDoc(_i: number, link: LinkBioPublicDocItem): string {
    return link.type === 'bio' ? `b-${link.item.id}` : `f-${link.item.id}`;
  }

  hrefBio(link: LinkBioLink): string {
    return this.linkBio.outboundBioLinkUrl(this.publicSlug, link, this.linkBioPreview);
  }

  teamAvatarColor(index: number): string {
    const colors = ['bg-indigo-500', 'bg-emerald-500', 'bg-orange-500', 'bg-pink-500', 'bg-cyan-500'];
    return colors[index % colors.length]!;
  }
}
