import { Directive, HostListener, input } from '@angular/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatTimepicker } from '@angular/material/timepicker';

/**
 * Abre o datepicker/timepicker ao clicar no input (não só no ícone).
 * Timepicker já tem `matTimepickerOpenOnClick` true por padrão; a diretiva cobre o datepicker.
 */
@Directive({
  selector: '[appOpenPickerOnInteract]',
  standalone: true,
})
export class OpenPickerOnInteractDirective {
  readonly datepicker = input<MatDatepicker<Date> | null>(null);
  readonly timepicker = input<MatTimepicker<Date> | null>(null);

  @HostListener('click')
  open(): void {
    const dp = this.datepicker();
    if (dp && !dp.opened) {
      dp.open();
      return;
    }
    const tp = this.timepicker();
    if (tp && !tp.isOpen()) {
      tp.open();
    }
  }
}
