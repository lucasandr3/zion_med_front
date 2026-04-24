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
} from '../../core/services/link-bio.service';
import { linkBioHeroPortraitUrl } from '../../core/utils/link-bio-public-assets';

const DEFAULT_SPECIES: { label: string; active: boolean }[] = [
  { label: '🐕 Cães', active: true },
  { label: '🐈 Gatos', active: true },
  { label: '🐇 Coelhos', active: false },
  { label: '🐹 Hamsters', active: false },
  { label: '🐦 Aves', active: false },
  { label: '🦎 Répteis', active: false },
];

const DEFAULT_VET_SERVICES: { icon: string; title: string }[] = [
  { icon: '💉', title: 'Vacinas' },
  { icon: '🔬', title: 'Exames' },
  { icon: '🩺', title: 'Consulta' },
  { icon: '✂️', title: 'Cirurgia' },
  { icon: '🛁', title: 'Banho e tosa' },
  { icon: '🏥', title: 'Internação' },
];

@Component({
  selector: 'app-link-bio-public-layout-vet',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './link-bio-public-layout-vet.component.html',
  styleUrl: './link-bio-public-layout-vet.component.css',
})
export class LinkBioPublicLayoutVetComponent {
  private linkBio = inject(LinkBioService);

  @Input({ required: true }) clinic!: LinkBioClinic;
  /** Reservado (links bio); a lista unificada vem em `allDocs`. */
  @Input() bioLinks: LinkBioLink[] = [];
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

  get heroPortraitUrl(): string | null {
    return linkBioHeroPortraitUrl(this.clinic);
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

  get coverKicker(): string {
    return this.extra.layout_cover_kicker?.trim() || 'Medicina veterinária';
  }

  get taglineUnderTitle(): string {
    return (
      this.clinic.short_description?.trim() ||
      this.extra.hero_tagline?.trim() ||
      'Cuidando de quem você ama'
    );
  }

  get councilMetaLine(): string {
    const parts: string[] = [];
    if (this.extra.council_registration?.trim()) parts.push(this.extra.council_registration.trim());
    if (this.clinic.founded_year) parts.push(`Desde ${this.clinic.founded_year}`);
    return parts.join(' · ');
  }

  get speciesChips(): { label: string; active: boolean }[] {
    const c = this.extra.species_chips;
    if (c?.length) {
      return c.map((x) => ({ label: String(x.label), active: x.active !== false }));
    }
    return DEFAULT_SPECIES;
  }

  get serviceCards(): { icon: string; title: string }[] {
    const s = this.extra.vet_service_cards;
    if (s?.length) {
      return s.map((x) => ({ icon: x.icon?.trim() || '💉', title: x.title }));
    }
    return DEFAULT_VET_SERVICES;
  }

  get waCtaLabel(): string {
    return this.extra.vet_wa_cta_label?.trim() || 'Marcar consulta para o pet';
  }

  get docsTitle(): string {
    return this.extra.vet_docs_section_title?.trim() || 'Fichas do pet';
  }

  get docsIntro(): string {
    return (
      this.extra.vet_docs_intro?.trim() ||
      'Preencha antes da consulta do seu bichinho'
    );
  }

  get examResultsUrl(): string {
    const raw = this.extra.vet_exam_results_url?.trim();
    if (!raw) return '';
    if (/^https?:\/\//i.test(raw)) return raw;
    return `https://${raw}`;
  }

  get examResultsLabel(): string {
    return this.extra.vet_exam_results_label?.trim() || 'Consultar resultados';
  }

  get examResultsSubtitle(): string {
    return this.extra.vet_exam_results_subtitle?.trim() || 'Acesso ao portal do laboratório';
  }

  /**
   * Cor de destaque da vitrine (`accent_hex`), com fallback ao verde veterinário padrão.
   */
  themeVarsM6(): Record<string, string> {
    const accent = this.normalizeAccentHex();
    const accentMid = this.mixHex(accent, '#ffffff', 0.26);
    const accentSoft = this.mixHex(accent, '#ffffff', 0.5);
    const accentFaint = this.mixHex(accent, '#ffffff', 0.93);
    const textBody = this.mixHex(accent, '#020806', 0.52);
    const borderLight = this.mixHex(accent, '#ffffff', 0.78);
    const pawDark = this.mixHex(accent, '#000000', 0.74);
    const pageDark = this.mixHex(accent, '#040604', 0.88);
    const textOnDark = this.mixHex(accent, '#ffffff', 0.42);
    const rootTextDark = this.mixHex(accent, '#ecfdf5', 0.48);
    const chipInactiveDarkBg = this.mixHex(accent, '#000000', 0.8);
    const chipInactiveDarkBorder = this.mixHex(accent, '#000000', 0.55);
    const waHover = this.mixHex(accent, '#000000', 0.18);
    const rgb = this.hexToRgbTuple(accent) ?? { r: 30, g: 125, b: 71 };
    return {
      '--m6-accent': accent,
      '--m6-on-accent': this.onAccentForHex(accent),
      '--m6-accent-mid': accentMid,
      '--m6-on-accent-mid': this.onAccentForHex(accentMid),
      '--m6-accent-soft': accentSoft,
      '--m6-accent-faint': accentFaint,
      '--m6-text-body': textBody,
      '--m6-border-light': borderLight,
      '--m6-paw-dark': pawDark,
      '--m6-page-dark': pageDark,
      '--m6-text-on-dark': textOnDark,
      '--m6-root-text-dark': rootTextDark,
      '--m6-chip-dark-bg': chipInactiveDarkBg,
      '--m6-chip-dark-border': chipInactiveDarkBorder,
      '--m6-wa-hover': waHover,
      '--m6-accent-rgb': `${rgb.r},${rgb.g},${rgb.b}`,
    };
  }

  private normalizeAccentHex(): string {
    let h = (this.clinic?.accent_hex ?? '').trim();
    if (!h) return '#1e7d47';
    if (!h.startsWith('#')) h = `#${h}`;
    if (h.length === 4 && /^#[0-9a-fA-F]{3}$/.test(h)) {
      h = `#${h[1]}${h[1]}${h[2]}${h[2]}${h[3]}${h[3]}`;
    }
    if (!/^#[0-9a-fA-F]{6}$/.test(h)) return '#1e7d47';
    return h.toLowerCase();
  }

  private hexToRgbTuple(hex: string): { r: number; g: number; b: number } | null {
    const h = hex.replace('#', '').trim();
    if (h.length !== 6) return null;
    const r = parseInt(h.slice(0, 2), 16);
    const g = parseInt(h.slice(2, 4), 16);
    const b = parseInt(h.slice(4, 6), 16);
    if ([r, g, b].some((n) => Number.isNaN(n))) return null;
    return { r, g, b };
  }

  private mixHex(from: string, to: string, t: number): string {
    const a = this.hexToRgbTuple(from);
    const b = this.hexToRgbTuple(to);
    if (!a || !b) return from;
    const ch = (x: number, y: number) => Math.round(x + (y - x) * t);
    const r = ch(a.r, b.r);
    const g = ch(a.g, b.g);
    const bl = ch(a.b, b.b);
    const x = (n: number) => n.toString(16).padStart(2, '0');
    return `#${x(r)}${x(g)}${x(bl)}`;
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

  whatsappUrl(): string {
    const phone = this.clinic.phone?.replace(/\D/g, '') ?? '';
    const wa = phone.length >= 10 && phone.length <= 11 ? '55' + phone : phone;
    return wa ? `https://wa.me/${wa}` : '';
  }

  telHref(): string {
    const raw = this.clinic.phone?.trim() ?? '';
    if (!raw) return '';
    if (raw.startsWith('+')) return `tel:${raw}`;
    const d = raw.replace(/\D/g, '');
    if (!d) return '';
    const intl = d.length <= 11 && !d.startsWith('55') ? '55' + d : d;
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
