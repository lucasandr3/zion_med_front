import {
  booleanAttribute,
  Directive,
  ElementRef,
  forwardRef,
  HostListener,
  inject,
  Input,
  Renderer2,
} from '@angular/core';
import { type ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

type NordCheckable = HTMLElement & { checked: boolean; disabled: boolean };
type NordStringControl = HTMLElement & { value: string; disabled: boolean };

@Directive({
  selector: 'nord-checkbox[ngModel], nord-checkbox[formControl], nord-checkbox[formControlName]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NordCheckboxValueAccessor),
      multi: true,
    },
  ],
  standalone: true,
})
export class NordCheckboxValueAccessor implements ControlValueAccessor {
  private readonly el = inject(ElementRef<NordCheckable>);
  private readonly renderer = inject(Renderer2);
  private onChange: (v: boolean) => void = () => undefined;
  private onTouched: () => void = () => undefined;

  @Input({ transform: booleanAttribute })
  set disabled(value: boolean) {
    this.setDisabledState(value);
  }

  writeValue(value: boolean): void {
    this.el.nativeElement.checked = !!value;
  }

  registerOnChange(fn: (v: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.renderer.setProperty(this.el.nativeElement, 'disabled', isDisabled);
  }

  @HostListener('change', ['$event'])
  onHostChange(ev: Event): void {
    const checked = !!(ev.target as NordCheckable).checked;
    this.onChange(checked);
  }

  @HostListener('blur')
  onHostBlur(): void {
    this.onTouched();
  }
}

@Directive({
  selector: 'nord-toggle[ngModel], nord-toggle[formControl], nord-toggle[formControlName]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NordToggleValueAccessor),
      multi: true,
    },
  ],
  standalone: true,
})
export class NordToggleValueAccessor implements ControlValueAccessor {
  private readonly el = inject(ElementRef<NordCheckable>);
  private readonly renderer = inject(Renderer2);
  private onChange: (v: boolean) => void = () => undefined;
  private onTouched: () => void = () => undefined;

  @Input({ transform: booleanAttribute })
  set disabled(value: boolean) {
    this.setDisabledState(value);
  }

  writeValue(value: boolean): void {
    this.el.nativeElement.checked = !!value;
  }

  registerOnChange(fn: (v: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.renderer.setProperty(this.el.nativeElement, 'disabled', isDisabled);
  }

  @HostListener('change', ['$event'])
  onHostChange(ev: Event): void {
    const checked = !!(ev.target as NordCheckable).checked;
    this.onChange(checked);
  }

  @HostListener('blur')
  onHostBlur(): void {
    this.onTouched();
  }
}

/** `nord-date-picker` — valor ISO `YYYY-MM-DD`. */
@Directive({
  selector: 'nord-date-picker[ngModel], nord-date-picker[formControl], nord-date-picker[formControlName]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NordDatePickerValueAccessor),
      multi: true,
    },
  ],
  standalone: true,
})
export class NordDatePickerValueAccessor implements ControlValueAccessor {
  private readonly el = inject(ElementRef<NordStringControl>);
  private readonly renderer = inject(Renderer2);
  private onChange: (v: string) => void = () => undefined;
  private onTouched: () => void = () => undefined;

  @Input({ transform: booleanAttribute })
  set disabled(value: boolean) {
    this.setDisabledState(value);
  }

  writeValue(value: string | Date | null | undefined): void {
    this.renderer.setProperty(this.el.nativeElement, 'value', toIsoDate(value));
  }

  registerOnChange(fn: (v: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.renderer.setProperty(this.el.nativeElement, 'disabled', isDisabled);
  }

  @HostListener('change', ['$event'])
  onHostChange(ev: Event): void {
    const raw = String((ev.target as NordStringControl).value ?? '');
    this.onChange(raw);
  }

  @HostListener('blur')
  onHostBlur(): void {
    this.onTouched();
  }
}

/** `nord-time-picker` — valor ISO `HH:mm`. */
@Directive({
  selector: 'nord-time-picker[ngModel], nord-time-picker[formControl], nord-time-picker[formControlName]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NordTimePickerValueAccessor),
      multi: true,
    },
  ],
  standalone: true,
})
export class NordTimePickerValueAccessor implements ControlValueAccessor {
  private readonly el = inject(ElementRef<NordStringControl>);
  private readonly renderer = inject(Renderer2);
  private onChange: (v: string) => void = () => undefined;
  private onTouched: () => void = () => undefined;

  @Input({ transform: booleanAttribute })
  set disabled(value: boolean) {
    this.setDisabledState(value);
  }

  writeValue(value: string | null | undefined): void {
    this.renderer.setProperty(this.el.nativeElement, 'value', value ?? '');
  }

  registerOnChange(fn: (v: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.renderer.setProperty(this.el.nativeElement, 'disabled', isDisabled);
  }

  @HostListener('change', ['$event'])
  onHostChange(ev: Event): void {
    const raw = String((ev.target as NordStringControl).value ?? '');
    this.onChange(raw);
  }

  @HostListener('blur')
  onHostBlur(): void {
    this.onTouched();
  }
}

function toIsoDate(value: string | Date | null | undefined): string {
  if (value == null || value === '') return '';
  if (value instanceof Date) {
    if (Number.isNaN(value.getTime())) return '';
    const y = value.getFullYear();
    const m = String(value.getMonth() + 1).padStart(2, '0');
    const d = String(value.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }
  const s = String(value).trim();
  if (/^\d{4}-\d{2}-\d{2}/.test(s)) return s.slice(0, 10);
  return s;
}

export const NORD_FORM_CONTROL_IMPORTS = [
  NordCheckboxValueAccessor,
  NordToggleValueAccessor,
  NordDatePickerValueAccessor,
  NordTimePickerValueAccessor,
];
