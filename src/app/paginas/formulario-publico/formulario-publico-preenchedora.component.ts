import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'zm-formulario-publico-preenchedora',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './formulario-publico-preenchedora.component.html',
})
export class FormularioPublicoPreenchedoraComponent {
  @Input() submitterName = '';
  @Input() submitterEmail = '';
  @Input() personLinkRequired = false;

  @Output() submitterNameChange = new EventEmitter<string>();
  @Output() submitterEmailChange = new EventEmitter<string>();
  @Output() identityChange = new EventEmitter<void>();

  onNameInput(event: Event): void {
    const value = (event.target as { value?: string } | null)?.value ?? '';
    this.submitterNameChange.emit(value);
    this.identityChange.emit();
  }

  onEmailInput(event: Event): void {
    const value = (event.target as { value?: string } | null)?.value ?? '';
    this.submitterEmailChange.emit(value);
    this.identityChange.emit();
  }
}
