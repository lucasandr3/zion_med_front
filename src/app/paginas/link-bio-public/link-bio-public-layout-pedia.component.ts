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

  stepNumClass(tone: string): string {
    if (tone === 'lemon') return 'bg-[#facc15] text-[#7c5f00]';
    if (tone === 'mint') return 'bg-[#22c55e] text-white';
    return 'bg-[#0ea5e9] text-white';
  }

  onToggleDark(): void {
    this.toggleDark.emit();
  }

  onShare(): void {
    this.share.emit();
  }
}
