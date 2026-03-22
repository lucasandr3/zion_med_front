import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService, ToastType } from '../../../core/services/toast.service';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast-container.component.html',
  styleUrl: './toast-container.component.css',
})
export class ToastContainerComponent {
  private toastService = inject(ToastService);
  readonly toasts = this.toastService.toasts;

  icon(type: ToastType): string {
    const m: Record<ToastType, string> = {
      success: 'check',
      error: 'error',
      warning: 'warning',
      info: 'info',
    };
    return m[type];
  }

  dismiss(id: number): void {
    this.toastService.remove(id);
  }
}
