import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZardBadgeComponent } from '@/shared/components/badge';
import { ZardButtonComponent } from '@/shared/components/button/button.component';
import { ZardCardComponent } from '@/shared/components/card/card.component';
import { ZardMenuImports } from '../../shared/components/menu/menu.imports';

@Component({
  selector: 'zm-link-bio-overview-header',
  standalone: true,
  imports: [CommonModule, ZardBadgeComponent, ZardButtonComponent, ZardCardComponent, ...ZardMenuImports],
  templateUrl: './link-bio-overview-header.component.html',
  styleUrl: './link-bio-overview-header.component.css',
})
export class LinkBioOverviewHeaderComponent {
  @Input({ required: true }) clinicName!: string;
  @Input() publicUrl = '';
  @Input() publicUrlAbrir = '';
  @Input() recepcaoKioskUrl = '';
  @Input() headerMeta: string | null = null;
  @Input() copiedLink = false;

  @Output() copyLink = new EventEmitter<void>();
  @Output() openQr = new EventEmitter<void>();
  @Output() editContent = new EventEmitter<void>();
  @Output() copyRecepcao = new EventEmitter<void>();
}
