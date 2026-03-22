import { Component, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogService } from '../../../core/services/confirm-dialog.service';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.css',
})
export class ConfirmDialogComponent {
  private dialog = inject(ConfirmDialogService);
  readonly state = this.dialog.options;

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.state()) this.dialog.respond(false);
  }

  onBackdrop(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('confirm-backdrop')) {
      this.dialog.respond(false);
    }
  }

  cancel(): void {
    this.dialog.respond(false);
  }

  confirm(): void {
    this.dialog.respond(true);
  }
}
