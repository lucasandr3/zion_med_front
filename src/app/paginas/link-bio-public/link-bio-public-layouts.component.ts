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

  /** Modelo 2 (Stitch): linhas de horário com valor preenchido. */
  get hoursRowsM2(): { label: string; text: string }[] {
    return this.hoursGridArray.filter((d) => d.text && d.text !== '–');
  }

  get hasHoursM2(): boolean {
    return this.hoursRowsM2.length > 0;
  }

  /** Título editorial do hero (referência Stitch). */
  get m2HeroHeadline(): string {
    const t = this.extra.hero_tagline?.trim();
    if (t) return t;
    return 'Cuidando da sua saúde com excelência';
  }

  /** Subtítulo abaixo do título. */
  get m2HeroSubline(): string {
    const s = this.clinic.short_description?.trim();
    if (s) return s;
    const meta = this.clinic.meta_description?.trim();
    if (meta) return meta;
    return 'Atendimento especializado focado no bem-estar integral e resultados duradouros.';
  }

  /** Bloco de citação final (texto extra ou padrão da referência). */
  get m2SignatureText(): string {
    return (
      this.extra.brand_subtitle?.trim() ||
      'Nosso compromisso é com a excelência técnica aliada a um atendimento humanizado e exclusivo.'
    );
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

  get clinicInitials(): string {
    const name = this.clinic.name?.trim() ?? '';
    if (!name) return 'GG';
    const parts = name.split(/\s+/).filter(Boolean);
    if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
    return (parts[0]!.charAt(0) + parts[1]!.charAt(0)).toUpperCase();
  }

  /** Logo compacto no header: empresa, senão legado `logo_url`. */
  get headerBrandImageUrl(): string | null {
    return linkBioHeaderBrandImageUrl(this.clinic);
  }

  /**
   * Modelo 2 (profissional solo): avatar no header = foto do profissional
   * (`professional_photo_url` ou `logo_url`), nunca só `company_logo_url`.
   */
  get m2HeaderAvatarUrl(): string | null {
    return linkBioHeroPortraitUrl(this.clinic);
  }

  /** Foto grande: profissional, senão legado `logo_url`. */
  get heroPortraitUrl(): string | null {
    return linkBioHeroPortraitUrl(this.clinic);
  }

  /** Modelo 3 (header): últimas duas palavras do nome, estilo referência Stitch. */
  get m3HeaderShortLabel(): string {
    const parts = this.clinic.name?.trim().split(/\s+/).filter(Boolean) ?? [];
    if (parts.length >= 2) return parts.slice(-2).join(' ');
    return this.clinic.name?.trim() || '';
  }

  /** Modelo 3: subtítulo itálico abaixo do título principal. */
  get m3ProfileTagline(): string {
    return (
      this.clinic.short_description?.trim() ||
      this.extra.hero_tagline?.trim() ||
      'Cuidando da sua saúde com excelência'
    );
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

  /** Modelo 4 (odontologia / Stitch): título principal do herói. */
  get dentalHeroHeadline(): string {
    return this.extra.hero_tagline?.trim() || 'Cuidado que transforma sorrisos';
  }

  /** Modelo 4: parágrafo abaixo do título. */
  get dentalHeroSub(): string {
    return (
      this.clinic.short_description?.trim() ||
      'Especialistas em odontologia estética e reabilitação oral. Sua saúde bucal em mãos de quem entende.'
    );
  }

  /** Modelo 4: chip “excelência / conselho / desde”. */
  get dentalVerifiedLine(): string {
    const council = this.extra.council_registration?.trim();
    const y = this.clinic.founded_year;
    if (council && y) return `${council} · Odontologia desde ${y}`;
    if (council) return council;
    if (y) return `Excelência em odontologia desde ${y}`;
    return 'Excelência em odontologia';
  }

  /**
   * Cards do bento “Nossas especialidades”: `modalities` (3 itens) ou `specialties_list`, com fallback.
   */
  get dentalBento(): { title: string; layout: 'sm' | 'wide' }[] {
    const mods = this.extra.modalities?.map((m) => ({ title: m.title?.trim() || '' })).filter((m) => m.title);
    if (mods && mods.length >= 3) {
      return [
        { title: mods[0]!.title, layout: 'sm' },
        { title: mods[1]!.title, layout: 'sm' },
        { title: mods[2]!.title, layout: 'wide' },
      ];
    }
    if (mods && mods.length === 2) {
      return [
        { title: mods[0]!.title, layout: 'sm' },
        { title: mods[1]!.title, layout: 'sm' },
      ];
    }
    const specs = (this.clinic.specialties_list ?? []).map((s) => s.trim()).filter(Boolean);
    if (specs.length >= 3) {
      return [
        { title: specs[0]!, layout: 'sm' },
        { title: specs[1]!, layout: 'sm' },
        { title: specs[2]!, layout: 'wide' },
      ];
    }
    if (specs.length === 2) {
      return [
        { title: specs[0]!, layout: 'sm' },
        { title: specs[1]!, layout: 'sm' },
      ];
    }
    if (specs.length === 1) {
      return [{ title: specs[0]!, layout: 'wide' }];
    }
    return [
      { title: 'Estética dental', layout: 'sm' },
      { title: 'Implantes', layout: 'sm' },
      { title: 'Ortodontia', layout: 'wide' },
    ];
  }

  /** Resumo SEG–SEX e sábado para o card de horários (modelo 4). */
  get dentalHoursPair(): { a: { label: string; text: string }; b: { label: string; text: string } } | null {
    const g = this.hoursGridArray;
    if (!g.length) return null;
    const wd = g.slice(0, 5).map((d) => d.text);
    const wdOk = wd.filter((t) => t && t !== '–');
    const uniq = [...new Set(wdOk)];
    const leftText = uniq.length === 1 ? uniq[0]! : wdOk[0] || '—';
    const sat = g[5];
    const sun = g[6];
    const bLabel = (sat?.label || 'Sábado').replace(/\.$/, '');
    let bText = '—';
    if (sat?.text && sat.text !== '–') bText = sat.text;
    else if (sun?.text && sun.text !== '–') bText = sun.text;
    return {
      a: { label: 'SEG – SEX', text: leftText },
      b: { label: bLabel.toUpperCase(), text: bText },
    };
  }

  /** Texto do bloco convênio (modelo 4). */
  get dentalConvenioLine(): string {
    const c = this.conveniosM4;
    if (!c.length) return 'Particular e demais convênios — consulte na recepção';
    return c.join(' · ');
  }

  /** Cor principal do modelo 4 (Stitch: #0f4c81). */
  m4AccentHex(): string {
    const raw = this.clinic?.accent_hex?.trim();
    if (!raw) return '#0f4c81';
    return raw.startsWith('#') ? raw : `#${raw}`;
  }

  /** Variáveis CSS para odontologia (contraste do CTA e header). */
  themeVarsM4(): Record<string, string> {
    const container = this.normalizeHex6(this.m4AccentHex(), '#0f4c81');
    const primary = this.mixHex(container, '#000814', 0.46);
    const rgb = this.hexToRgbTriplet(container);
    return {
      '--d4-container': container,
      '--d4-primary': primary,
      '--d4-on-cta': this.onAccentColor(primary),
      '--d4-container-rgb': `${rgb.r},${rgb.g},${rgb.b}`,
    };
  }

  private normalizeHex6(input: string, fallback: string): string {
    let h = (input || '').trim();
    if (!h) return fallback;
    if (!h.startsWith('#')) h = `#${h}`;
    if (h.length === 4 && /^#[0-9a-fA-F]{3}$/.test(h)) {
      h = `#${h[1]}${h[1]}${h[2]}${h[2]}${h[3]}${h[3]}`;
    }
    if (!/^#[0-9a-fA-F]{6}$/.test(h)) return fallback;
    return h.toLowerCase();
  }

  private hexToRgbTriplet(hex: string): { r: number; g: number; b: number } {
    const h = hex.replace('#', '').trim();
    if (h.length !== 6) return { r: 15, g: 76, b: 129 };
    return {
      r: parseInt(h.slice(0, 2), 16),
      g: parseInt(h.slice(2, 4), 16),
      b: parseInt(h.slice(4, 6), 16),
    };
  }

  private mixHex(from: string, to: string, t: number): string {
    const a = this.hexToRgbTriplet(from);
    const b = this.hexToRgbTriplet(to);
    const ch = (x: number, y: number) => Math.round(x + (y - x) * t);
    const x = (n: number) => n.toString(16).padStart(2, '0');
    return `#${x(ch(a.r, b.r))}${x(ch(a.g, b.g))}${x(ch(a.b, b.b))}`;
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

  /**
   * Cor de destaque só do modelo 3 (estética): **dourado por padrão** (#D4AF37).
   * Respeita `accent_hex` quando o tema da clínica é `custom`.
   */
  m3AccentHex(): string {
    const theme = this.clinic?.public_theme?.trim();
    const accent = this.clinic?.accent_hex?.trim();
    if (theme === 'custom' && accent) return accent;
    if (accent) return accent;
    return '#d4af37';
  }

  themeVarsM3(): Record<string, string> {
    const accent = this.m3AccentHex();
    const base: Record<string, string> = {
      '--m3-accent': accent,
      '--m3-on-accent': this.onAccentColor(accent),
    };
    if (this.dark) {
      return {
        ...base,
        '--m3-navy': '#e8edf5',
        '--m3-bg': '#0c1018',
        '--m3-surface': '#151b26',
        '--m3-muted': '#9ca3af',
      };
    }
    return {
      ...base,
      '--m3-navy': '#0a192f',
      '--m3-bg': '#fcf9f4',
      '--m3-surface': '#ffffff',
      '--m3-muted': '#4a4a4a',
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
