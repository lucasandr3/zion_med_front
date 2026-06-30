import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  input,
  output,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { type ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import type { ClassValue } from 'clsx';

import { ZardIdDirective } from '@/shared/core';
import { mergeClasses, noopFn } from '@/shared/utils/merge-classes';

import {
  checkboxLabelVariants,
  type ZardCheckboxShapeVariants,
  type ZardCheckboxSizeVariants,
  type ZardCheckboxTypeVariants,
} from './checkbox.variants';

type OnTouchedType = () => void;
type OnChangeType = (value: boolean) => void;

@Component({
  selector: 'z-checkbox, [z-checkbox]',
  imports: [ZardIdDirective],
  template: `
    <label [class]="wrapperClasses()" [attr.aria-disabled]="disabled() || null">
      <input
        #input
        type="checkbox"
        zardId="checkbox"
        #z="zardId"
        [id]="z.id()"
        [class]="inputClasses()"
        [checked]="checked()"
        [disabled]="disabled()"
        (blur)="onCheckboxBlur()"
        (change)="onCheckboxChange($event)"
      />
      <span [class]="textClasses()">
        <ng-content />
      </span>
    </label>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ZardCheckboxComponent),
      multi: true,
    },
  ],
  styles: `
    /* Usa o mesmo visual de input[type=checkbox] / .form-checkbox em styles.css */
    z-checkbox .z-checkbox-wrapper,
    [z-checkbox] .z-checkbox-wrapper {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
      margin: 0;
    }

    z-checkbox .z-checkbox-wrapper[aria-disabled='true'],
    [z-checkbox] .z-checkbox-wrapper[aria-disabled='true'] {
      cursor: not-allowed;
      opacity: 0.5;
    }

    z-checkbox .z-checkbox-native,
    [z-checkbox] .z-checkbox-native {
      margin: 0;
      flex-shrink: 0;
    }

    z-checkbox .z-checkbox-native.z-checkbox-native--lg,
    [z-checkbox] .z-checkbox-native.z-checkbox-native--lg {
      width: 1.5rem;
      height: 1.5rem;
    }

    z-checkbox.z-checkbox--destructive .z-checkbox-native:checked,
    [z-checkbox].z-checkbox--destructive .z-checkbox-native:checked {
      background-color: var(--c-danger);
      border-color: var(--c-danger);
    }

    z-checkbox .z-checkbox-native.z-checkbox-native--circle,
    [z-checkbox] .z-checkbox-native.z-checkbox-native--circle {
      border-radius: 9999px;
    }

    z-checkbox .z-checkbox-native.z-checkbox-native--square,
    [z-checkbox] .z-checkbox-native.z-checkbox-native--square {
      border-radius: 0;
    }

    z-checkbox .z-checkbox-text,
    [z-checkbox] .z-checkbox-text {
      flex: 1;
      min-width: 0;
      line-height: 1.25;
      padding: 0;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'z-checkbox-root inline-block max-w-full',
    '[class.z-checkbox--destructive]': 'zType() === "destructive"',
  },
  exportAs: 'zCheckbox',
})
export class ZardCheckboxComponent implements ControlValueAccessor {
  readonly checkChange = output<boolean>();

  readonly class = input<ClassValue>('');
  readonly zDisabled = input(false, { transform: booleanAttribute });
  readonly zType = input<ZardCheckboxTypeVariants>('default');
  readonly zSize = input<ZardCheckboxSizeVariants>('default');
  readonly zShape = input<ZardCheckboxShapeVariants>('default');

  private onChange: OnChangeType = noopFn;
  private onTouched: OnTouchedType = noopFn;

  protected readonly wrapperClasses = computed(() =>
    mergeClasses('z-checkbox-wrapper', this.class(), this.disabled() ? 'pointer-events-none' : ''),
  );

  protected readonly inputClasses = computed(() => {
    const shape =
      this.zShape() === 'circle'
        ? 'z-checkbox-native--circle'
        : this.zShape() === 'square'
          ? 'z-checkbox-native--square'
          : '';
    const size = this.zSize() === 'lg' ? 'z-checkbox-native--lg' : '';
    return mergeClasses('form-checkbox z-checkbox-native', shape, size);
  });

  protected readonly textClasses = computed(() =>
    mergeClasses('z-checkbox-text', checkboxLabelVariants({ zSize: this.zSize() })),
  );

  readonly disabledByForm = signal(false);
  protected readonly disabled = computed(() => this.zDisabled() || this.disabledByForm());
  readonly checked = signal(false);

  writeValue(val: boolean): void {
    this.checked.set(!!val);
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabledByForm.set(isDisabled);
  }

  registerOnChange(fn: OnChangeType): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: OnTouchedType): void {
    this.onTouched = fn;
  }

  onCheckboxBlur(): void {
    this.onTouched();
  }

  onCheckboxChange(ev: Event): void {
    if (this.disabled()) {
      return;
    }

    const next = (ev.target as HTMLInputElement).checked;
    this.checked.set(next);
    this.onChange(next);
    this.checkChange.emit(next);
  }
}
