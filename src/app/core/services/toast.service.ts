import { Injectable, signal } from '@angular/core';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: number;
  type: ToastType;
  title: string;
  desc?: string;
  duration: number;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private _id = 0;
  toasts = signal<Toast[]>([]);

  show(type: ToastType, title: string, desc?: string, duration = 4000) {
    const toast: Toast = { id: ++this._id, type, title, desc, duration };
    this.toasts.update((t) => [...t, toast]);
    setTimeout(() => this.remove(toast.id), duration);
  }

  success(title: string, desc?: string) {
    this.show('success', title, desc);
  }
  error(title: string, desc?: string) {
    this.show('error', title, desc);
  }
  warning(title: string, desc?: string) {
    this.show('warning', title, desc);
  }
  info(title: string, desc?: string) {
    this.show('info', title, desc);
  }

  remove(id: number) {
    this.toasts.update((t) => t.filter((x) => x.id !== id));
  }
}
