import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  CUSTOM_ELEMENTS_SCHEMA,
  effect,
  ElementRef,
  forwardRef,
  input,
  linkedSignal,
  output,
  signal,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';
import { type ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import type { ClassValue } from 'clsx';

import { comboboxVariants, type GestgoComboboxWidthVariants } from '@/shared/components/combobox/combobox.variants';
import { mergeClasses } from '@/shared/utils/merge-classes';

export interface GestgoComboboxOption {
  value: string;
  label: string;
  disabled?: boolean;
  /** Ícone legado (ignorado no nord-combobox). */
  icon?: string;
}

export interface GestgoComboboxGroup {
  label?: string;
  options: GestgoComboboxOption[];
}

/** Variantes legadas do trigger (mantidas por compatibilidade de API). */
export type GestgoButtonTypeVariants =
  | 'default'
  | 'destructive'
  | 'outline'
  | 'secondary'
  | 'ghost'
  | 'link';
export type GestgoButtonSizeVariants =
  | 'control'
  | 'default'
  | 'xs'
  | 'sm'
  | 'lg'
  | 'icon'
  | 'icon-xs'
  | 'icon-sm'
  | 'icon-lg';

type NordComboboxElement = HTMLElement & {
  options: Array<{ value: string; label: string; disabled?: boolean; group?: string }>;
  value: string | string[];
  disabled: boolean;
  clearable: boolean;
  size: 's' | 'm' | 'l';
};

/**
 * Wrapper Angular do `nord-combobox` (Nord Design System).
 * Mantém a API `z-combobox` / CVA usada nas telas do Gestgo.
 */
@Component({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'z-combobox',
  imports: [],
  template: `
    <nord-combobox
      #nord
      class="z-combobox__control"
      [attr.placeholder]="placeholder() || null"
      [attr.disabled]="disabledState() || null"
      [attr.size]="nordSize()"
      [attr.no-results-text]="emptyText() || null"
      [attr.aria-label]="ariaLabel() || null"
      [attr.aria-labelledby]="ariaLabelledby() || null"
      [attr.aria-describedby]="ariaDescribedBy() || null"
      (change)="onNordChange($event)"
      (clear)="onNordClear()"
      (blur)="onTouched()"
    ></nord-combobox>
  `,
  styles: `
    :host {
      display: block;
      width: 100%;
      max-width: 100%;
      min-width: 0;
      box-sizing: border-box;
      background: transparent !important;
      border: none !important;
      box-shadow: none !important;
      padding: 0 !important;
      margin: 0;
    }

    .z-combobox__control,
    :host nord-combobox {
      display: block;
      width: 100%;
      max-width: 100%;
      min-width: 0;
      inline-size: 100%;
      box-sizing: border-box;
      background: transparent !important;
      border: none !important;
      box-shadow: none !important;
      padding: 0 !important;
      --n-combobox-block-size: var(--control-height, var(--n-space-xl));
    }
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GestgoComboboxComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'classes()',
  },
  exportAs: 'zCombobox',
})
export class GestgoComboboxComponent implements ControlValueAccessor {
  private readonly nordRef = viewChild<ElementRef<NordComboboxElement>>('nord');

  readonly class = input<ClassValue>('');
  /** @deprecated Sem efeito visual — o controle é nord-combobox. */
  readonly buttonVariant = input<GestgoButtonTypeVariants>('outline');
  /** @deprecated Mapeado apenas para size do nord-combobox. */
  readonly buttonSize = input<GestgoButtonSizeVariants>('control');
  readonly zWidth = input<GestgoComboboxWidthVariants>('full');
  readonly placeholder = input<string>('Selecione…');
  /** @deprecated Nord usa o mesmo campo para filtro; mantido por compat. */
  readonly searchPlaceholder = input<string>('Buscar…');
  readonly emptyText = input<string>('Nenhum resultado encontrado.');
  readonly zDisabled = input(false, { transform: booleanAttribute });
  /** @deprecated nord-combobox sempre filtra ao digitar. */
  readonly searchable = input(true, { transform: booleanAttribute });
  readonly clearable = input(true, { transform: booleanAttribute });
  readonly value = input<string | null>(null);
  readonly options = input<GestgoComboboxOption[]>([]);
  readonly groups = input<GestgoComboboxGroup[]>([]);
  readonly ariaLabel = input<string>('');
  readonly ariaLabelledby = input<string>('');
  readonly ariaDescribedBy = input<string>('');

  readonly zValueChange = output<string | null>();
  readonly zComboSelected = output<GestgoComboboxOption>();

  protected readonly disabledState = linkedSignal(() => this.zDisabled());
  protected readonly internalValue = signal<string | null>(null);

  protected readonly classes = computed(() =>
    mergeClasses(
      comboboxVariants({
        zWidth: this.zWidth(),
      }),
      this.class(),
    ),
  );

  protected readonly nordSize = computed((): 's' | 'm' | 'l' => {
    const size = this.buttonSize();
    if (size === 'xs' || size === 'sm' || size === 'icon-xs' || size === 'icon-sm' || size === 'control') {
      return 's';
    }
    if (size === 'lg' || size === 'icon-lg') {
      return 'l';
    }
    return 'm';
  });

  protected readonly currentValue = computed(() => this.value() ?? this.internalValue());

  protected readonly nordOptions = computed(() => {
    const groups = this.groups();
    if (groups.length > 0) {
      const list: Array<{ value: string; label: string; disabled?: boolean; group?: string }> = [];
      for (const group of groups) {
        for (const opt of group.options) {
          list.push({
            value: opt.value,
            label: opt.label,
            disabled: opt.disabled,
            group: group.label || undefined,
          });
        }
      }
      return list;
    }
    return this.options().map((opt) => ({
      value: opt.value,
      label: opt.label,
      disabled: opt.disabled,
    }));
  });

  private onChange: (value: string | null) => void = () => undefined;
  protected onTouched: () => void = () => undefined;

  constructor() {
    effect(() => {
      const el = this.nordRef()?.nativeElement;
      if (!el) return;

      el.options = this.nordOptions();
      el.clearable = this.clearable();
      el.size = this.nordSize();
      el.disabled = this.disabledState();

      const next = this.currentValue() ?? '';
      if (el.value !== next) {
        el.value = next;
      }
    });
  }

  onNordChange(event: Event): void {
    const el = event.target as NordComboboxElement;
    const raw = el?.value;
    const next = Array.isArray(raw) ? (raw[0] ?? '') : String(raw ?? '');
    this.commitValue(next === '' ? null : next);
  }

  onNordClear(): void {
    this.commitValue(null);
  }

  private commitValue(next: string | null): void {
    this.internalValue.set(next);
    this.onChange(next);
    this.zValueChange.emit(next);

    if (next) {
      const selected =
        this.options().find((o) => o.value === next) ??
        this.groups()
          .flatMap((g) => g.options)
          .find((o) => o.value === next);
      if (selected) {
        this.zComboSelected.emit(selected);
      }
    }
  }

  writeValue(value: string | null): void {
    this.internalValue.set(value);
  }

  registerOnChange(fn: (value: string | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabledState.set(isDisabled);
  }
}
