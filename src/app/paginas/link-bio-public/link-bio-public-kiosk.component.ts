import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  LinkBioClinic,
  LinkBioLink,
  LinkBioPublicDocItem,
  LinkBioService,
} from '../../core/services/link-bio.service';

/**
 * Modo totem/recepção: `/l/:slug?kiosk=1`. Visual igual ao formulário público
 * (paleta cream/ink + Playfair). Mostra só a lista de links publicados.
 */
@Component({
  selector: 'app-link-bio-public-kiosk',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './link-bio-public-kiosk.component.html',
  styleUrl: './link-bio-public-kiosk.component.css',
})
export class LinkBioPublicKioskComponent {
  private linkBioService = inject(LinkBioService);

  @Input({ required: true }) clinic!: LinkBioClinic;
  @Input({ required: true }) allLinks: LinkBioPublicDocItem[] = [];
  @Input() publicSlug = '';
  @Input() linkBioPreview = false;
  @Input() dark = false;

  @Output() toggleDark = new EventEmitter<void>();

  hrefBioLink(link: LinkBioLink): string {
    return this.linkBioService.outboundBioLinkUrl(this.publicSlug, link, this.linkBioPreview, this.clinic?.slug);
  }

  formToken(f: { public_url: string }): string {
    const parts = f.public_url.split('/f/');
    return parts.length > 1 ? parts[1]!.split('?')[0]! : '';
  }

  trackDoc(index: number, link: LinkBioPublicDocItem): string {
    return link.type === 'bio' ? `b-${link.item.id}` : `f-${link.item.id}`;
  }

  clinicNameInitial(): string {
    const name = this.clinic?.name?.trim() ?? '';
    return name ? name.charAt(0).toUpperCase() : 'C';
  }

  clinicLogoUrl(): string | null {
    return this.clinic?.logo_url || this.clinic?.company_logo_url || null;
  }
}
