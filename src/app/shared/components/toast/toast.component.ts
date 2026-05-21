import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';

import type { ClassValue } from 'clsx';
import { NgxSonnerToaster, type ToastOptions } from 'ngx-sonner';

import { mergeClasses } from '@/shared/utils/merge-classes';

import { toastVariants, type ZardToastVariants } from './toast.variants';

/** Classes padrão por toast (padrão shadcn/Zard + tokens do tema). */
const ZARD_DEFAULT_TOAST_OPTIONS: ToastOptions = {
  classes: {
    toast:
      'group toast flex w-full items-center gap-3 rounded-lg border border-border bg-background p-4 text-foreground shadow-lg',
    title: 'text-sm font-semibold',
    description: 'text-sm text-muted-foreground',
    actionButton:
      'inline-flex h-[length:var(--button-height)] min-h-[length:var(--button-height)] shrink-0 items-center justify-center rounded-md border border-border bg-transparent px-3 text-sm font-medium transition-colors hover:bg-secondary',
    cancelButton:
      'inline-flex h-[length:var(--button-height)] min-h-[length:var(--button-height)] shrink-0 items-center justify-center rounded-md border border-border bg-transparent px-3 text-sm font-medium transition-colors hover:bg-secondary',
    closeButton:
      'absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground group-hover:opacity-100',
  },
};

@Component({
  selector: 'z-toast, z-toaster',
  imports: [NgxSonnerToaster],
  template: `
    <ngx-sonner-toaster
      [theme]="theme()"
      [class]="classes()"
      [style]="toasterStyle"
      [position]="position()"
      [richColors]="richColors()"
      [expand]="expand()"
      [duration]="duration()"
      [visibleToasts]="visibleToasts()"
      [closeButton]="closeButton()"
      [toastOptions]="mergedToastOptions()"
      [dir]="dir()"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'zToast',
})
export class ZardToastComponent {
  readonly class = input<ClassValue>('');
  readonly variant = input<ZardToastVariants>('default');
  readonly theme = input<'light' | 'dark' | 'system'>('system');
  readonly position = input<'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'>(
    'bottom-right',
  );

  readonly richColors = input<boolean>(false);
  readonly expand = input<boolean>(false);
  readonly duration = input<number>(4000);
  readonly visibleToasts = input<number>(3);
  readonly closeButton = input<boolean>(false);
  readonly toastOptions = input<ToastOptions>({});
  readonly dir = input<'ltr' | 'rtl' | 'auto'>('auto');

  /** Variáveis CSS do Sonner alinhadas aos tokens Zard (popover/border/radius). */
  protected readonly toasterStyle: Record<string, string> = {
    '--normal-bg': 'var(--popover)',
    '--normal-text': 'var(--popover-foreground)',
    '--normal-border': 'var(--border)',
    '--border-radius': 'var(--radius)',
  };

  protected readonly classes = computed(() =>
    mergeClasses('toaster group', toastVariants({ variant: this.variant() }), this.class()),
  );

  protected readonly mergedToastOptions = computed((): ToastOptions => {
    const custom = this.toastOptions();
    return {
      ...ZARD_DEFAULT_TOAST_OPTIONS,
      ...custom,
      classes: {
        ...ZARD_DEFAULT_TOAST_OPTIONS.classes,
        ...custom.classes,
      },
    };
  });
}
