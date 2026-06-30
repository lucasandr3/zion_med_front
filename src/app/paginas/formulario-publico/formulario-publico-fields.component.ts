import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlatpickrDirective, provideFlatpickrDefaults } from 'angularx-flatpickr';
import { Portuguese } from 'flatpickr/dist/l10n/pt';
import { ZardCheckboxComponent } from '@/shared/components/checkbox';
import { FormularioPublicoField } from '../../core/services/formulario-publico.service';
import { fieldPlaceholder, fieldType, getFieldOptions } from './formulario-publico-field.util';
import {
  clearSignatureCanvas,
  endSignatureDraw,
  moveSignatureDraw,
  startSignatureDraw,
} from './formulario-publico-signature.util';

@Component({
  selector: 'zm-formulario-publico-fields',
  standalone: true,
  imports: [CommonModule, FormsModule, FlatpickrDirective, ZardCheckboxComponent],
  providers: [
    provideFlatpickrDefaults({
      locale: Portuguese,
      dateFormat: 'Y-m-d',
      altInput: true,
      altFormat: 'd/m/Y',
      altInputClass: 'fp-input',
      allowInput: true,
      disableMobile: true,
      static: false,
    }),
  ],
  templateUrl: './formulario-publico-fields.component.html',
})
export class FormularioPublicoFieldsComponent {
  @Input({ required: true }) fields!: FormularioPublicoField[];
  @Input({ required: true }) valores!: Record<string, string | number | boolean | Date>;

  @Output() fieldChange = new EventEmitter<void>();
  @Output() fileSelected = new EventEmitter<{ event: Event; key: string }>();
  @Output() fileClear = new EventEmitter<string>();
  @Output() signatureChange = new EventEmitter<{ key: string; dataUrl: string }>();
  @Output() signatureClear = new EventEmitter<string>();

  readonly fieldType = fieldType;
  readonly getFieldOptions = getFieldOptions;
  readonly fieldPlaceholder = fieldPlaceholder;

  trackByKey(_index: number, f: FormularioPublicoField): string {
    return f.name_key;
  }

  onCampoAlterado(): void {
    this.fieldChange.emit();
  }

  onFileSelected(event: Event, key: string): void {
    this.fileSelected.emit({ event, key });
  }

  clearFile(key: string): void {
    this.fileClear.emit(key);
  }

  startSignature(e: MouseEvent | TouchEvent, key: string): void {
    startSignatureDraw(e, key);
  }

  moveSignature(e: MouseEvent | TouchEvent, key: string): void {
    moveSignatureDraw(e, key);
  }

  endSignature(key: string): void {
    const dataUrl = endSignatureDraw(key);
    this.signatureChange.emit({ key, dataUrl });
  }

  clearSignature(key: string): void {
    clearSignatureCanvas(key);
    this.signatureClear.emit(key);
  }
}
