import { Injectable } from '@angular/core';
import { toast } from 'ngx-sonner';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

@Injectable({ providedIn: 'root' })
export class ToastService {
  show(
    type: ToastType,
    title: string,
    desc?: string,
    duration = 4000,
    actionLabel?: string,
    onAction?: () => void,
  ): void {
    const description = desc?.trim() || undefined;
    const action =
      actionLabel && onAction
        ? {
            label: actionLabel,
            onClick: () => onAction(),
          }
        : undefined;

    const options = { duration, description, action };

    switch (type) {
      case 'success':
        toast.success(title, options);
        break;
      case 'error':
        toast.error(title, options);
        break;
      case 'warning':
        toast.warning(title, options);
        break;
      case 'info':
        toast.info(title, options);
        break;
    }
  }

  success(title: string, desc?: string): void {
    this.show('success', title, desc);
  }

  error(title: string, desc?: string): void {
    this.show('error', title, desc);
  }

  warning(title: string, desc?: string): void {
    this.show('warning', title, desc);
  }

  info(title: string, desc?: string): void {
    this.show('info', title, desc);
  }

  remove(id: number | string): void {
    toast.dismiss(id);
  }
}
