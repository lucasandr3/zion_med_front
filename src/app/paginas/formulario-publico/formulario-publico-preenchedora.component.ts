import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'zm-formulario-publico-preenchedora',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './formulario-publico-preenchedora.component.html',
})
export class FormularioPublicoPreenchedoraComponent {
  @Input() submitterName = '';
  @Input() submitterEmail = '';
  @Input() personLinkRequired = false;

  @Output() submitterNameChange = new EventEmitter<string>();
  @Output() submitterEmailChange = new EventEmitter<string>();
  @Output() identityChange = new EventEmitter<void>();
}
