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
    return this.linkBio.outboundBioLinkUrl(this.publicSlug, link, this.linkBioPreview);
  }

  onToggleDark(): void {
    this.toggleDark.emit();
  }

  onShare(): void {
    this.share.emit();
  }
}
