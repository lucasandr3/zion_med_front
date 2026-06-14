import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  LinkBioCtaChannel,
  LinkBioClinic,
  LinkBioExtra,
  LinkBioLink,
  LinkBioPublicDocItem,
  LinkBioService,
  LinkBioGoogleReviews,
} from '../../core/services/link-bio.service';
import { linkBioHeroPortraitUrl } from '../../core/utils/link-bio-public-assets';
import { linkBioSpecialtiesList, parseLinkBioExtra } from '../../core/utils/link-bio-clinic-normalize.util';
import { LinkBioPublicGoogleReviewsComponent } from './link-bio-public-google-reviews.component';

const DEFAULT_AREAS: { icon: string; title: string; description: string }[] = [
  {
    icon: '🌱',
    title: 'Nutrição funcional',
    description: 'Abordagem integrativa focada na causa raiz dos desequilíbrios.',
  },
  {
    icon: '⚖️',
    title: 'Emagrecimento',
    description: 'Reeducação alimentar sustentável, sem dietas restritivas.',
  },
  {
    icon: '🏃',
    title: 'Nutrição esportiva',
    description: 'Performance, recuperação e composição corporal.',
  },
  {
    icon: '🧬',
    title: 'Saúde intestinal',
    description: 'Microbiota, disbiose, SII e doenças inflamatórias.',
  },
];

@Component({
  selector: 'app-link-bio-public-layout-nutri',
  standalone: true,
  imports: [CommonModule, RouterLink, LinkBioPublicGoogleReviewsComponent],
  templateUrl: './link-bio-public-layout-nutri.component.html',
  styleUrl: './link-bio-public-layout-nutri.component.css',
})
export class LinkBioPublicLayoutNutriComponent {
  private linkBio = inject(LinkBioService);

  @Input({ required: true }) clinic!: LinkBioClinic;
  @Input() bioLinks: LinkBioLink[] = [];
  @Input() googleReviews: LinkBioGoogleReviews | null = null;
  @Input() dark = false;
  @Input() allDocs: LinkBioPublicDocItem[] = [];
  @Input() publicSlug = '';
  @Input() linkBioPreview = false;

  @Output() toggleDark = new EventEmitter<void>();
  @Output() share = new EventEmitter<void>();

  get extra(): LinkBioExtra {
    return parseLinkBioExtra(this.clinic.link_bio_extra);
  }

  get heroPortraitUrl(): string | null {
    return linkBioHeroPortraitUrl(this.clinic);
  }

  get clinicInitials(): string {
    return (this.clinic.name ?? '')
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0].toUpperCase())
      .join('');
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

  get specialtiesChips(): string[] {
    const list = linkBioSpecialtiesList(this.clinic);
    return list.length ? list.slice(0, 6) : ['Funcional', 'Emagrecimento', 'Esportiva', 'Intestino'];
  }

  get councilMetaLine(): string {
    const parts: string[] = [];
    if (this.extra.council_registration?.trim()) parts.push(this.extra.council_registration.trim());
    if (this.clinic.founded_year) parts.push(`Atendendo desde ${this.clinic.founded_year}`);
    return parts.join(' · ');
  }

  get heroDescription(): string {
    return (
      this.clinic.short_description?.trim() ||
      this.extra.hero_tagline?.trim() ||
      'Nutrição clínica e funcional'
    );
  }

  get modalities(): { title: string; subtitle?: string; available: boolean; icon: 'place' | 'computer' }[] {
    const custom = this.extra.modalities;
    if (custom?.length) {
      return custom.map((item, index) => ({
        title: item.title,
        subtitle: item.subtitle,
        available: item.available !== false,
        icon: index === 0 ? 'place' : 'computer',
      }));
    }

    return [
      {
        title: 'Presencial',
        subtitle: this.clinic.address?.trim() || 'Consultório',
        available: true,
        icon: 'place',
      },
      {
        title: 'Online',
        subtitle: 'Via videochamada',
        available: true,
        icon: 'computer',
      },
    ];
  }

  get conveniosList(): string[] {
    const raw = this.extra.convenios?.map((item) => String(item).trim()).filter(Boolean);
    return raw?.length ? raw : ['Unimed', 'Amil', 'SulAmérica', '+ Particular'];
  }

  get areas(): { icon: string; title: string; description: string }[] {
    const list = linkBioSpecialtiesList(this.clinic);
    if (!list.length) return DEFAULT_AREAS;

    return list.slice(0, 4).map((title, index) => ({
      icon: DEFAULT_AREAS[index]?.icon ?? '🥗',
      title,
      description: DEFAULT_AREAS[index]?.description ?? 'Atendimento nutricional personalizado para sua rotina.',
    }));
  }

  get currentStatusLabel(): string {
    if (this.clinic.is_open_now === true) return 'Aberta para consultas';
    if (this.clinic.is_open_now === false) return 'Atendimento sob agendamento';
    return 'Agenda disponível';
  }

  /** Cor de destaque — lê `accent_hex`, fallback ao verde-sálvia (#527a42). */
  m8AccentHex(): string {
    let h = (this.clinic?.accent_hex ?? '').trim();
    if (!h) return '#527a42';
    if (!h.startsWith('#')) h = `#${h}`;
    if (h.length === 4 && /^#[0-9a-fA-F]{3}$/.test(h)) {
      h = `#${h[1]}${h[1]}${h[2]}${h[2]}${h[3]}${h[3]}`;
    }
    return /^#[0-9a-fA-F]{6}$/.test(h) ? h.toLowerCase() : '#527a42';
  }

  /** Variáveis CSS para Nutricionista (M8) — torna o accent personalizável. */
  themeVarsM8(): Record<string, string> {
    const accent = this.m8AccentHex();
    const coverBg = this.mixHex(accent, '#000000', 0.42);
    const coverBgDark = this.mixHex(accent, '#000000', 0.65);
    const onAccent = this.onAccentForHex(accent);
    const rgb = this.hexToRgbTuple(accent);
    const rgbStr = rgb ? `${rgb.r},${rgb.g},${rgb.b}` : '82,122,66';
    return {
      '--m8-accent': accent,
      '--m8-on-accent': onAccent,
      '--m8-cover-bg': coverBg,
      '--m8-cover-bg-dark': coverBgDark,
      '--m8-page-bg': '#f9fafb',
      '--m8-page-bg-dark': '#121212',
      '--m8-accent-rgb': rgbStr,
    };
  }

  private hexToRgbTuple(hex: string): { r: number; g: number; b: number } | null {
    const h = hex.replace('#', '').trim();
    if (h.length !== 6) return null;
    return { r: parseInt(h.slice(0, 2), 16), g: parseInt(h.slice(2, 4), 16), b: parseInt(h.slice(4, 6), 16) };
  }

  private mixHex(from: string, to: string, t: number): string {
    const a = this.hexToRgbTuple(from);
    const b = this.hexToRgbTuple(to);
    if (!a || !b) return from;
    const ch = (x: number, y: number) => Math.round(x + (y - x) * t);
    const x = (n: number) => n.toString(16).padStart(2, '0');
    return `#${x(ch(a.r, b.r))}${x(ch(a.g, b.g))}${x(ch(a.b, b.b))}`;
  }

  private onAccentForHex(hex: string): string {
    const h = hex.replace('#', '').trim();
    if (h.length !== 6) return '#fafafa';
    const r = parseInt(h.substring(0, 2), 16) / 255;
    const g = parseInt(h.substring(2, 4), 16) / 255;
    const b = parseInt(h.substring(4, 6), 16) / 255;
    const l = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    return l > 0.55 ? '#0b0b0b' : '#fafafa';
  }

  get weekdayRows(): { label: string; text: string }[] {
    return this.hoursGridArray.slice(0, 5).filter((row) => row.text !== '–');
  }

  get weekendRows(): { label: string; text: string }[] {
    return this.hoursGridArray.slice(5, 7).filter((row) => row.text !== '–');
  }

  whatsappUrl(): string {
    const phone = this.clinic.phone?.replace(/\D/g, '') ?? '';
    const wa = phone.length >= 10 && phone.length <= 11 ? '55' + phone : phone;
    return wa ? `https://wa.me/${wa}` : '';
  }

  telHref(): string {
    const raw = this.clinic.phone?.trim() ?? '';
    if (!raw) return '';
    if (raw.startsWith('+')) return `tel:${raw}`;
    const digits = raw.replace(/\D/g, '');
    if (!digits) return '';
    const intl = digits.length <= 11 && !digits.startsWith('55') ? '55' + digits : digits;
    return `tel:+${intl}`;
  }

  formToken(f: { public_url: string }): string {
    const parts = f.public_url.split('/f/');
    return parts.length > 1 ? parts[1]!.split('?')[0]! : '';
  }

  trackDoc(_i: number, link: LinkBioPublicDocItem): string {
    return link.type === 'bio' ? `b-${link.item.id}` : `f-${link.item.id}`;
  }

  hrefBio(link: LinkBioLink): string {
    return this.linkBio.outboundBioLinkUrl(this.publicSlug, link, this.linkBioPreview, this.clinic?.slug);
  }

  trackCta(channel: LinkBioCtaChannel, directUrl: string, teamRef?: number): string {
    if (!directUrl) return '';
    const u = this.linkBio.outboundCtaUrl(
      this.publicSlug,
      channel,
      this.linkBioPreview,
      this.clinic?.slug,
      teamRef
    );
    return u ?? directUrl;
  }

  onToggleDark(): void {
    this.toggleDark.emit();
  }

  onShare(): void {
    this.share.emit();
  }
}
