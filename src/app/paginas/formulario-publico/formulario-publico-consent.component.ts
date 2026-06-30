import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ZardCheckboxComponent } from '@/shared/components/checkbox';

@Component({
  selector: 'zm-formulario-publico-consent',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, ZardCheckboxComponent],
  templateUrl: './formulario-publico-consent.component.html',
})
export class FormularioPublicoConsentComponent {
  @Input() acceptTerms = false;

  @Output() acceptTermsChange = new EventEmitter<boolean>();
  @Output() toggleFromBlock = new EventEmitter<MouseEvent>();

  onToggleBlock(event: MouseEvent): void {
    this.toggleFromBlock.emit(event);
  }
}
