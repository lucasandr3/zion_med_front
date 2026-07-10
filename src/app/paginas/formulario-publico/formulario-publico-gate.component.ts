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
  /** `cpf` | `code` — modo configurado no modelo. */
  @Input() mode: string = 'cpf';
  @Input() title = '';
  @Input() description = '';
  @Input() personCpfDisplay = '';
  @Input() personCode = '';
  @Input() personBirthDate = '';
  @Input() personGateErro = '';
  @Input() validandoPerson = false;

  @Output() cpfChange = new EventEmitter<string>();
  @Output() codeChange = new EventEmitter<string>();
  @Output() birthDateChange = new EventEmitter<string>();
  @Output() validate = new EventEmitter<void>();

  get isCpfMode(): boolean {
    return (this.mode || 'cpf').toLowerCase() === 'cpf';
  }

  get leadText(): string {
    if (this.description?.trim()) return this.description.trim();
    return this.isCpfMode
      ? 'Para iniciar o preenchimento, informe seu CPF para autorização de acesso ao formulário.'
      : 'Para iniciar o preenchimento, informe o código e a data de nascimento cadastrados na clínica.';
  }

  onCpfInput(value: string): void {
    this.cpfChange.emit(value);
  }

  onCodeInput(value: string): void {
    this.codeChange.emit(value);
  }

  onBirthDateInput(value: string): void {
    this.birthDateChange.emit(value);
  }
}
