import { Injectable, signal } from '@angular/core';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export type NordToastVariant = 'default' | 'danger';

@Injectable({ providedIn: 'root' })
export class ToastService {
  readonly message = signal('');
  readonly visible = signal(false);
  readonly variant = signal<NordToastVariant>('default');
  readonly durationMs = signal(4000);

  private timer: ReturnType<typeof setTimeout> | null = null;

  show(
    type: ToastType,
    title: string,
    desc?: string,
    duration = 4000,
    _actionLabel?: string,
    _onAction?: () => void,
  ): void {
    const description = desc?.trim();
    const text = description ? `${title} — ${description}` : title;
    this.message.set(text);
    this.variant.set(type === 'error' ? 'danger' : 'default');
    this.durationMs.set(duration);
    this.visible.set(true);
    if (this.timer) clearTimeout(this.timer);
    this.timer = setTimeout(() => this.hide(), duration);
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

  hide(): void {
    this.visible.set(false);
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  /** Compat: ngx-sonner usava dismiss por id; Nord mostra um toast por vez. */
  remove(_id?: number | string): void {
    this.hide();
  }
}
