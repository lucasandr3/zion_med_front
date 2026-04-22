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

  /**
   * Índice do dia atual dentro de `hoursGridArray` (segunda=0 … domingo=6).
   * O grid usa chaves '1'..'7' (seg..dom) e JS `Date.getDay()` retorna 0=dom..6=sáb.
   * Retorna -1 quando o dia não está visível no array.
   */
  get todayIndexInHoursGrid(): number {
    const jsDay = new Date().getDay();
    const idx = (jsDay + 6) % 7;
    const arr = this.hoursGridArray;
    return idx < arr.length ? idx : -1;
  }

  /** Glifos delicados para os cards de procedimento (fallback por posição). */
  private readonly procedureIconMap: Record<string, string> = {
    botox: '✦',
    preenchimento: '◈',
    skincare: '✿',
    bioestimulador: '⬡',
    'bioestimulador de colágeno': '⬡',
    laser: '◉',
    'fios pdo': '⌇',
    'fios de sustentação': '⌇',
    peeling: '✧',
    limpeza: '❂',
    'limpeza de pele': '❂',
    microagulhamento: '⁘',
    harmonização: '❖',
    'harmonização facial': '❖',
    criolipólise: '❄',
    massagem: '◊',
    drenagem: '◊',
    'radiofrequência': '◉',
    depilação: '⌇',
  };

  private readonly procedureIconFallback = ['✦', '◈', '✿', '⬡', '◉', '⌇', '✧', '❖', '◊'];

  iconForProcedure(name: string, index: number): string {
    const key = (name ?? '').trim().toLowerCase();
    if (this.procedureIconMap[key]) return this.procedureIconMap[key]!;
    return this.procedureIconFallback[index % this.procedureIconFallback.length]!;
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

  /** Modelo 5: lista colapsada (3) ou expandida (até 8). */
  teamExpanded = false;

  get visibleTeamM5(): { name: string; credential?: string; notes?: string; whatsapp?: string }[] {
    const t = this.teamM5;
    if (t.length <= 3) return t;
    return this.teamExpanded ? t.slice(0, 8) : t.slice(0, 3);
  }

  toggleTeamExpanded(): void {
    this.teamExpanded = !this.teamExpanded;
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

  accentHex(): string {
    const theme = this.clinic?.public_theme?.trim();
    const accent = this.clinic?.accent_hex?.trim();
    if (theme === 'custom' && accent) return accent;
    if (theme === 'onyx-black') return '#1a1410';
    return accent || '#c9a84c';
  }

  themeVarsM3(): Record<string, string> {
    const accent = this.accentHex();
    return {
      '--m3-accent': accent,
      '--m3-on-accent': this.onAccentColor(accent),
    };
  }

  /**
   * Calcula a cor de texto ideal (claro ou escuro) sobre o accent, usando luminância relativa.
   * Evita botões com texto ilegível quando a cor do tema é muito escura (ex.: onyx-black).
   */
  private onAccentColor(hex: string): string {
    const h = (hex || '').replace('#', '').trim();
    if (h.length !== 6) return '#0b0b0b';
    const r = parseInt(h.substring(0, 2), 16) / 255;
    const g = parseInt(h.substring(2, 4), 16) / 255;
    const b = parseInt(h.substring(4, 6), 16) / 255;
    // Luminância percebida (aprox. Rec. 709)
    const l = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    return l > 0.55 ? '#0b0b0b' : '#faf7f2';
  }

  teamAvatarColor(index: number): string {
    const colors = ['bg-indigo-500', 'bg-emerald-500', 'bg-orange-500', 'bg-pink-500', 'bg-cyan-500'];
    return colors[index % colors.length]!;
  }
}
