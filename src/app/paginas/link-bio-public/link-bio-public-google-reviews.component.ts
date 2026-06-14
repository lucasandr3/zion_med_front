import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import type { LinkBioGoogleReviews } from '../../core/services/link-bio.service';

@Component({
  selector: 'app-link-bio-public-google-reviews',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './link-bio-public-google-reviews.component.html',
  styleUrl: './link-bio-public-google-reviews.component.css',
})
export class LinkBioPublicGoogleReviewsComponent {
  @Input({ required: true }) reviews!: LinkBioGoogleReviews;
  @Input() dark = false;

  stars(rating: number): number[] {
    const n = Math.max(0, Math.min(5, Math.round(rating)));
    return Array.from({ length: n }, (_, i) => i);
  }

  emptyStars(rating: number): number[] {
    const n = Math.max(0, 5 - Math.round(Math.max(0, Math.min(5, rating))));
    return Array.from({ length: n }, (_, i) => i);
  }
}
