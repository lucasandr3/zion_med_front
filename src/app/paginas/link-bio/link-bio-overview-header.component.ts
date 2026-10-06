import { Component, EventEmitter, Input, Output, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { GestgoBadgeComponent } from '@/shared/components/badge';

import { GestgoCardComponent } from '@/shared/components/card/card.component';

@Component({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'zm-link-bio-overview-header',
  standalone: true,
  imports: [GestgoBadgeComponent, GestgoCardComponent],
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
