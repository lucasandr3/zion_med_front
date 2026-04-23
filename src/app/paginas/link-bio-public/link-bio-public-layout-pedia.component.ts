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
import { linkBioHeaderBrandImageUrl, linkBioHeroPortraitUrl } from '../../core/utils/link-bio-public-assets';

const DEFAULT_STEPS: { title: string; subtitle: string; tone: 'sky' | 'lemon' | 'mint' }[] = [
  {
    title: 'Preencha as fichas abaixo',
    subtitle: 'Antes de vir à clínica, economiza tempo na recepção',
    tone: 'sky',
  },
  {
    title: 'Traga documento e cartão do plano',
    subtitle: 'RG ou certidão da criança + documento do responsável',
    tone: 'lemon',
  },
  {
    title: 'Chegue 10 min antes',
    subtitle: 'Para confirmar os dados na recepção com tranquilidade',
    tone: 'mint',
  },
];

const DEFAULT_AGE_BANDS: { emoji: string; title: string; range: string; theme: 'sky' | 'lemon' | 'coral' }[] = [
  { emoji: '👶', title: 'Recém-nascido', range: '0 – 28 dias', theme: 'sky' },
  { emoji: '🧒', title: 'Criança', range: '1 – 10 anos', theme: 'lemon' },
  { emoji: '🧑', title: 'Adolescente', range: '11 – 18 anos', theme: 'coral' },
];

@Component({
  selector: 'app-link-bio-public-layout-pedia',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './link-bio-public-layout-pedia.component.html',
  styleUrl: './link-bio-public-layout-pedia.component.css',
})
export class LinkBioPublicLayoutPediaComponent {
  private linkBio = inject(LinkBioService);

  @Input({ required: true }) clinic!: LinkBioClinic;
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
    return this.extra.ped_cover_kicker?.trim() || 'Pediatria';
  }

  get taglineUnderTitle(): string {
    return this.clinic.short_description?.trim() || this.extra.hero_tagline?.trim() || 'Cuidando da saúde das crianças';
  }

  get councilMetaLine(): string {
    const parts: string[] = [];
    if (this.extra.council_registration?.trim()) parts.push(this.extra.council_registration.trim());
    if (this.clinic.founded_year) parts.push(`Pediatria desde ${this.clinic.founded_year}`);
    return parts.join(' · ');
  }

  get parentNoticeTitle(): string {
    return this.extra.ped_parent_notice_title?.trim() || 'Importante para os pais';
  }

  get parentNoticeBody(): string {
    return (
      this.extra.ped_parent_notice_body?.trim() ||
      'As fichas e termos devem ser preenchidos e assinados pelo responsável legal da criança (pai, mãe ou guardião com documentação).'
    );
  }

  get firstVisitSteps(): { title: string; subtitle: string; tone: 'sky' | 'lemon' | 'mint' }[] {
    const s = this.extra.ped_first_visit_steps;
    if (s?.length) {
      return s.map((x, i) => ({
        title: x.title,
        subtitle: x.subtitle,
        tone: x.tone ?? (['sky', 'lemon', 'mint'][i % 3] as 'sky' | 'lemon' | 'mint'),
      }));
    }
    return DEFAULT_STEPS;
  }

  get ageBands(): { emoji: string; title: string; range: string; theme: 'sky' | 'lemon' | 'coral' }[] {
    const b = this.extra.ped_age_bands;
    if (b?.length) {
      return b.map((x, i) => ({
        emoji: x.emoji,
        title: x.title,
        range: x.range,
        theme: x.theme ?? (['sky', 'lemon', 'coral'][i % 3] as 'sky' | 'lemon' | 'coral'),
      }));
    }
    return DEFAULT_AGE_BANDS;
  }

  get conveniosList(): string[] {
    const raw = this.extra.convenios?.map((c) => String(c).trim()).filter(Boolean);
    return raw?.length ? raw : ['Unimed', 'Amil', 'SulAmérica', 'Bradesco Saúde', '+ Particular'];
  }

  get docsTitle(): string {
    return this.extra.ped_docs_section_title?.trim() || 'Fichas e documentos';
  }

  get docsIntro(): string {
    return this.extra.ped_docs_intro?.trim() || 'Preencha com os dados da criança antes da consulta';
  }

  get waCtaLabel(): string {
    return this.extra.ped_wa_cta_label?.trim() || 'Marcar consulta';
  }

  get headerInitial(): string {
    const n = this.clinic.name?.trim();
    return n ? n.charAt(0).toUpperCase() : 'P';
  }

  get headerBrandImageUrl(): string | null {
    return linkBioHeaderBrandImageUrl(this.clinic);
  }

  get heroPortraitUrl(): string | null {
    return linkBioHeroPortraitUrl(this.clinic);
  }

  get clinicInitials(): string {
    const n = this.clinic.name?.trim() || 'P';
    const parts = n.split(/\s+/).filter(Boolean);
    if (parts.length >= 2) {
      return (parts[0]!.charAt(0) + parts[parts.length - 1]!.charAt(0)).toUpperCase();
    }
    return n.slice(0, 2).toUpperCase() || 'P';
  }

  /** Título do herói (Stitch: “Cuidado com carinho”). */
  get heroHeadlineP7(): string {
    return this.extra.hero_tagline?.trim() || 'Cuidado com carinho';
  }

  /** Subtítulo curto abaixo do herói. */
  get heroSubP7(): string {
    return (
      this.clinic.short_description?.trim() ||
      'Excelência em pediatria para o seu maior tesouro.'
    );
  }

  get conveniosLine(): string {
    const list = this.conveniosList.filter((c) => c !== '+ Particular');
    const partic = this.conveniosList.some((c) => c === '+ Particular');
    const joined = list.join(' e ');
    if (joined && partic) return `${joined} e particular`;
    if (joined) return joined;
    if (partic) return 'Particular';
    return 'Consulte na recepção';
  }

  get hoursSummaryLines(): string[] {
    return this.hoursGridArray
      .filter((d) => d.text && d.text !== '–')
      .slice(0, 4)
      .map((r) => `${r.label}: ${r.text}`);
  }

  /**
   * Cor de destaque da página pública (`accent_hex`), com fallback ao azul pediatria.
   */
  themeVarsP7(): Record<string, string> {
    const accent = this.normalizeAccentHex();
    const soft = this.mixHex(accent, '#ffffff', 0.42);
    const deep = this.mixHex(accent, '#04121f', 0.36);
    const headerDark = this.mixHex(accent, '#020617', 0.58);
    const rgb = this.hexToRgbTuple(accent) ?? { r: 0, g: 123, b: 185 };
    return {
      '--p7-accent': accent,
      '--p7-on-accent': this.onAccentForHex(accent),
      '--p7-accent-soft': soft,
      '--p7-accent-deep': deep,
      '--p7-header-bg-dark': headerDark,
      '--p7-on-header-dark': this.onAccentForHex(headerDark),
      '--p7-accent-rgb': `${rgb.r},${rgb.g},${rgb.b}`,
    };
  }

  private normalizeAccentHex(): string {
    let h = (this.clinic?.accent_hex ?? '').trim();
    if (!h) return '#007bb9';
    if (!h.startsWith('#')) h = `#${h}`;
    if (h.length === 4 && /^#[0-9a-fA-F]{3}$/.test(h)) {
      h = `#${h[1]}${h[1]}${h[2]}${h[2]}${h[3]}${h[3]}`;
    }
    if (!/^#[0-9a-fA-F]{6}$/.test(h)) return '#007bb9';
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

  /** Texto legível sobre fundo `hex` (preto ou off-white). */
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
