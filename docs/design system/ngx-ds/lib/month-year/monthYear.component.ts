import { Component, forwardRef, Input, Output,EventEmitter } from '@angular/core';
import { ControlValueAccessor,  FormControl, NG_VALUE_ACCESSOR, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, NativeDateAdapter } from '@angular/material/core';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import * as _moment from 'moment';
import { default as _rollupMoment, Moment } from 'moment';

const moment = _rollupMoment || _moment;
moment.locale('pt-br');


export class UpperCaseDateAdapter extends NativeDateAdapter {
  override format(date: Date, displayFormat: Object): string {
    if (displayFormat === 'input') {
      const month = date.toLocaleString('default', { month: 'short' }).toUpperCase();
      const year = date.getFullYear();
      return `${month}/${year}`;
    }
    return super.format(date, displayFormat);
  }
}
// Define o formato MM/YYYY
export const MY_FORMATS = {
  parse: { dateInput: 'MM/YYYY' },
  display: {
    dateInput: 'MMMM/YYYY', // Exibirá "Jan/2025"
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({

  selector: 'upx-month-year',
  standalone: true,
  templateUrl: 'monthYear.component.html',
  styleUrls: ['monthYear.component.scss'],
  host: {
    'class': 'upx-input',
    '[class.upx-input--readonly]': 'readOnly',
    '[class.upx-input--disabled]': 'disabled',
    '[class.upx-input--feedback-disabled]': 'feedbackDisabled',
    '[class.upx-input--size-1]': 'icon',
    '[class.upx-input--size-xs]': 'size === "xs"',
    '[class.upx-input--size-sm]': 'size === "sm"',
    '[class.upx-input--size-md]': 'size === "md"',
    '[class.upx-input--size-lg]': 'size === "lg"',
    '[class.upx-input--size-xl]': 'size === "xl"',
  },
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MonthYearComponent),
      multi: true,
    },
  ],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule
  ],
})
export class MonthYearComponent implements ControlValueAccessor {
  @Input() field!: FormControl;
  @Input() size: string = 'md';
  @Output() dateChangeEventEmitter = new EventEmitter<any>();


  private onTouched: () => void = () => {};
  private onChange: (value: any) => void = () => {};

  writeValue(value: moment.Moment | null): void {
    this.field.setValue(value ? moment(value) : null, { emitEvent: false });
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
    this.field.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.field.disable();
    } else {
      this.field.enable();
    }
  }

  setYear(normalizedYear: Moment) {
    let ctrlValue = this.field.value ? moment(this.field.value) : moment();
    ctrlValue.year(normalizedYear.year()); // Atualiza o ano, mas mantém o mês

    this.field.setValue(ctrlValue);
  }

  setMonth(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    let ctrlValue = this.field.value ? moment(this.field.value) : moment();
    ctrlValue.month(normalizedMonth.month()); // Atualiza o mês, mas mantém o ano

    this.field.setValue(ctrlValue);
    datepicker.close(); // Fecha apenas após selecionar o mês
  }

  openDatepicker(datepicker: MatDatepicker<Moment>) {
    datepicker.open(); // Garante que o calendário abre
    setTimeout(() => datepicker.startView = 'multi-year'); // Força a seleção do ano
  }
  formatMomentToMonthYear(date: moment.Moment): string {
    moment.locale('pt-br'); // Garante o idioma correto
    return date.format('MMM/YYYY').toUpperCase(); // Exemplo: "JAN/2025"
  }

  onDateChange(event: any) {
     this.dateChangeEventEmitter.emit(event); // Emite o evento quando a data muda
  }

}
