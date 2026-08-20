import { Component, EventEmitter, Input, Output } from '@angular/core';


@Component({
  selector: 'zm-formulario-publico-footer',
  standalone: true,
  imports: [],
  templateUrl: './formulario-publico-footer.component.html',
})
export class FormularioPublicoFooterComponent {
  @Input() usesFormSteps = false;
  @Input() isFirstFormStep = true;
  @Input() isLastFormStep = true;
  @Input() enviando = false;

  @Output() voltarEtapa = new EventEmitter<void>();
  @Output() avancarEtapa = new EventEmitter<void>();
}
