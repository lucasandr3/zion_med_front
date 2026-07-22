import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  QueryList,
  SimpleChanges,
  ViewChildren,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_FORM_IMPORTS } from '@/shared/material';
import { OpenPickerOnInteractDirective } from '@/shared/directives/open-picker-on-interact.directive';
import { formatDateToYmd, parseYmdToDate } from '@/shared/utils/date-time.util';
import { FormularioPublicoField } from '../../core/services/formulario-publico.service';
import { fieldPlaceholder, fieldType, getFieldOptions } from './formulario-publico-field.util';
import {
  clearSignatureCanvas,
  endSignatureDraw,
  moveSignatureDraw,
  startSignatureDraw,
} from './formulario-publico-signature.util';
import {
  fpBuildTypedSignatureValue,
  fpIsTypedSignatureValue,
  fpTypedSignatureDisplay,
} from './formulario-publico-a11y.util';
import {
  elementNeedsVerticalScroll,
  isElementScrolledToBottom,
} from './formulario-publico-term-scroll.util';

@Component({
  selector: 'zm-formulario-publico-fields',
  standalone: true,
  imports: [CommonModule, FormsModule, ...MAT_FORM_IMPORTS, OpenPickerOnInteractDirective],
  templateUrl: './formulario-publico-fields.component.html',
})
export class FormularioPublicoFieldsComponent implements AfterViewInit, OnChanges {
  @Input({ required: true }) fields!: FormularioPublicoField[];
  @Input({ required: true }) valores!: Record<string, string | number | boolean | Date>;
  @Input() termScrollRequired = false;
  @Input() noticeScrollState: Record<string, boolean> = {};
  @Input() invalidFieldKeys = new Set<string>();

  @Output() fieldChange = new EventEmitter<void>();
  @Output() noticeScroll = new EventEmitter<{ key: string; scrolled: boolean }>();
  @Output() fileSelected = new EventEmitter<{ event: Event; key: string }>();
  @Output() fileClear = new EventEmitter<string>();
  @Output() signatureChange = new EventEmitter<{ key: string; dataUrl: string }>();
  @Output() signatureClear = new EventEmitter<string>();

  @ViewChildren('termNoticeWrap') termNoticeRefs?: QueryList<ElementRef<HTMLElement>>;

  readonly fieldType = fieldType;
  readonly getFieldOptions = getFieldOptions;
  readonly fieldPlaceholder = fieldPlaceholder;

  trackByKey(_index: number, f: FormularioPublicoField): string {
    return f.name_key;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['fields'] || changes['termScrollRequired']) {
      this.scheduleAutoScrollCheck();
    }
  }

  ngAfterViewInit(): void {
    this.scheduleAutoScrollCheck();
  }

  isNoticeScrolled(nameKey: string): boolean {
    return this.noticeScrollState[nameKey] === true;
  }

  onTermNoticeScroll(nameKey: string, event: Event): void {
    const element = event.target as HTMLElement;
    if (isElementScrolledToBottom(element)) {
      this.noticeScroll.emit({ key: nameKey, scrolled: true });
    }
  }

  private scheduleAutoScrollCheck(): void {
    if (!this.termScrollRequired) return;
    queueMicrotask(() => this.checkAutoScrolledNotices());
  }

  private checkAutoScrolledNotices(): void {
    if (!this.termScrollRequired) return;
    this.termNoticeRefs?.forEach((ref) => {
      const element = ref.nativeElement;
      const key = element.dataset['noticeKey'];
      if (!key || this.noticeScrollState[key]) return;
      if (!elementNeedsVerticalScroll(element) || isElementScrolledToBottom(element)) {
        this.noticeScroll.emit({ key, scrolled: true });
      }
    });
  }

  onCampoAlterado(): void {
    this.fieldChange.emit();
  }

  dateValue(key: string): Date | null {
    return parseYmdToDate(this.valores[key] as string | Date | null | undefined);
  }

  onDateChange(key: string, value: Date | null): void {
    this.valores[key] = formatDateToYmd(value);
    this.onCampoAlterado();
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

  isFieldInvalid(key: string): boolean {
    return this.invalidFieldKeys.has(key);
  }

  signatureUsesTypedMode(key: string): boolean {
    const value = this.valores[key];
    return typeof value === 'string' && (value.startsWith('typed:') || value === '');
  }

  typedSignatureValue(key: string): string {
    const value = this.valores[key];
    if (typeof value === 'string' && fpIsTypedSignatureValue(value)) {
      return fpTypedSignatureDisplay(value);
    }
    return '';
  }

  onTypedSignatureInput(key: string, fullName: string): void {
    const encoded = fpBuildTypedSignatureValue(fullName);
    this.signatureChange.emit({ key, dataUrl: encoded });
  }
}
