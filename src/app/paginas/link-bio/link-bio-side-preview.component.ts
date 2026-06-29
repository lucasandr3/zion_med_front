import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'zm-link-bio-side-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './link-bio-side-preview.component.html',
  styleUrl: './link-bio-side-preview.component.css',
})
export class LinkBioSidePreviewComponent {
  previewUrlSafe = input<SafeResourceUrl | null>(null);
  loadingLabel = input('Carregando prévia…');
}
