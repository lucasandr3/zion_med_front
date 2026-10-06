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

export const NORD_FORM_CONTROL_IMPORTS = [NordCheckboxValueAccessor, NordToggleValueAccessor];
