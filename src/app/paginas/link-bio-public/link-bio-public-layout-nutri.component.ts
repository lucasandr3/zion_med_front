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
  imports: [CommonModule, RouterLink],
  templateUrl: './link-bio-public-layout-nutri.component.html',
  styleUrl: './link-bio-public-layout-nutri.component.css',
})
export class LinkBioPublicLayoutNutriComponent {
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

  get specialtiesChips(): string[] {
    const list = this.clinic.specialties_list?.map((item) => item.trim()).filter(Boolean) ?? [];
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
    const list = this.clinic.specialties_list?.map((item) => item.trim()).filter(Boolean) ?? [];
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
    return this.linkBio.outboundBioLinkUrl(this.publicSlug, link, this.linkBioPreview);
  }

  onToggleDark(): void {
    this.toggleDark.emit();
  }

  onShare(): void {
    this.share.emit();
  }
}
