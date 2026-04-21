import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'zm-empty-state',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './zm-empty-state.component.html',
  styleUrl: './zm-empty-state.component.css',
})
export class ZmEmptyStateComponent {
  @Input({ required: true }) title!: string;
  @Input() description: string | null = null;
  @Input() actionLabel: string | null = null;
  @Input() actionLink: string | null = null;
  @Input() actionIcon: string | null = 'add_circle';
}
