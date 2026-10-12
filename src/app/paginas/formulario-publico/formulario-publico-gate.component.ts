import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NORD_FORM_IMPORTS } from '@/shared/nord';

@Component({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'zm-formulario-publico-gate',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, ...NORD_FORM_IMPORTS],
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
  /** Após validate-person: nome cadastrado para confirmação (Opção B). */
  @Input() pendingConfirmName: string | null = null;
  @Input() nameConfirmed = false;

  @Output() cpfChange = new EventEmitter<string>();
  @Output() codeChange = new EventEmitter<string>();
  @Output() birthDateChange = new EventEmitter<string>();
  @Output() validate = new EventEmitter<void>();
  @Output() nameConfirmedChange = new EventEmitter<boolean>();
  @Output() confirmIdentity = new EventEmitter<void>();
  @Output() backToCredentials = new EventEmitter<void>();

  get isCpfMode(): boolean {
    return (this.mode || 'cpf').toLowerCase() === 'cpf';
  }

  get isConfirmStep(): boolean {
    return !!(this.pendingConfirmName && this.pendingConfirmName.trim());
  }

  get leadText(): string {
    if (this.isConfirmStep) {
      return 'Confirme que você é a pessoa abaixo para continuar o preenchimento.';
    }
    if (this.description?.trim()) return this.description.trim();
    return this.isCpfMode
      ? 'Para iniciar o preenchimento, informe seu CPF e a data de nascimento cadastrados na clínica.'
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

  onNameConfirmedInput(value: boolean): void {
    this.nameConfirmedChange.emit(!!value);
  }
}
