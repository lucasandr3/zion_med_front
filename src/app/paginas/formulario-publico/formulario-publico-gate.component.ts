import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'zm-formulario-publico-gate',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './formulario-publico-gate.component.html',
})
export class FormularioPublicoGateComponent {
  @Input({ required: true }) templateName!: string;
  @Input() personCpfDisplay = '';
  @Input() personGateErro = '';
  @Input() validandoPerson = false;

  @Output() cpfChange = new EventEmitter<string>();
  @Output() validate = new EventEmitter<void>();

  onCpfInput(value: string): void {
    this.cpfChange.emit(value);
  }
}
