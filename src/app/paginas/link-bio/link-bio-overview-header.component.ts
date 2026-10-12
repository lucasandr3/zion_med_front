import { Component, EventEmitter, Input, Output, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'zm-link-bio-overview-header',
  standalone: true,
  imports: [],
  templateUrl: './link-bio-overview-header.component.html',
  styleUrl: './link-bio-overview-header.component.css',
})
export class LinkBioOverviewHeaderComponent {
  @Input({ required: true }) clinicName!: string;
  @Input() publicUrl = '';
  @Input() publicUrlAbrir = '';
  @Input() totemUrl = '';
  @Input() totemUrlAbrir = '';
  @Input() copiedLink = false;
  @Input() copiedTotem = false;
  @Input() visitasHoje: number | null = null;
  @Input() cliques: number | null = null;

  @Output() copyLink = new EventEmitter<void>();
  @Output() copyTotem = new EventEmitter<void>();

  get displayUrl(): string {
    return (this.publicUrl || '')
      .replace(/^https?:\/\//i, '')
      .replace(/\/$/, '');
  }
}
