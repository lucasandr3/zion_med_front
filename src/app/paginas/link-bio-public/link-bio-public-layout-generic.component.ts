import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  LinkBioClinic,
  LinkBioLink,
  LinkBioPublicDocItem,
  LinkBioService,
} from '../../core/services/link-bio.service';

@Component({
  selector: 'app-link-bio-public-layout-generic',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './link-bio-public-layout-generic.component.html',
  styleUrl: './link-bio-public-layout-generic.component.css',
})
export class LinkBioPublicLayoutGenericComponent {
  private linkBioService = inject(LinkBioService);

  @Input({ required: true }) clinic!: LinkBioClinic;
  @Input({ required: true }) allLinks: LinkBioPublicDocItem[] = [];
  @Input() publicSlug = '';
  @Input() linkBioPreview = false;
  @Input() dark = false;
  /** Dentro do iframe da landing (sem forçar 100vh). */
  @Input() embedMode = false;

  @Output() toggleDark = new EventEmitter<void>();
  @Output() share = new EventEmitter<void>();

  onToggleDark(): void {
    this.toggleDark.emit();
  }

  onShare(): void {
    this.share.emit();
  }

  hrefBioLink(link: LinkBioLink): string {
    return this.linkBioService.outboundBioLinkUrl(this.publicSlug, link, this.linkBioPreview);
  }

  formToken(f: { public_url: string }): string {
    const parts = f.public_url.split('/f/');
    return parts.length > 1 ? parts[1]!.split('?')[0]! : '';
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
    return { '--accent': this.accentHex() };
  }

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
    const weekdays = this.hoursGridArray
      .slice(0, 5)
      .map((d) => d.text)
      .filter((t) => t && t !== '–');
    if (!weekdays.length) return 'Fechado';
    const first = weekdays[0]!;
    const allEqual = weekdays.every((h) => h === first);
    return allEqual ? first : 'Horários variáveis';
  }

  get weekendHoursText(): string {
    const weekends = this.hoursGridArray
      .slice(5, 7)
      .map((d) => d.text)
      .filter((t) => t && t !== '–');
    if (!weekends.length) return 'Fechado';
    const first = weekends[0]!;
    const allEqual = weekends.every((h) => h === first);
    return allEqual ? first : 'Horários variáveis';
  }

  get clinicInitials(): string {
    const name = this.clinic?.name?.trim() ?? '';
    if (!name) return 'GG';
    const parts = name.split(/\s+/).filter(Boolean);
    if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
    return (parts[0]!.charAt(0) + parts[1]!.charAt(0)).toUpperCase();
  }

  whatsappUrl(): string {
    const phone = this.clinic?.phone?.replace(/\D/g, '') ?? '';
    const wa = phone.length >= 10 && phone.length <= 11 ? '55' + phone : phone;
    return wa ? `https://wa.me/${wa}` : '';
  }

  trackDoc(_i: number, link: LinkBioPublicDocItem): string | number {
    return link.type === 'bio' ? link.item.id : `${link.item.id}_form`;
  }
}
