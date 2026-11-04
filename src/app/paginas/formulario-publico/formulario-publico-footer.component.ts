import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'zm-formulario-publico-footer',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './formulario-publico-footer.component.html',
  styles: `:host { display: contents; }`,
})
export class FormularioPublicoFooterComponent {
  /** Tela de boas-vindas (passo 0 da referência). */
  @Input() showIntro = false;
  /** Identificação / OTP antes das etapas de campos. */
  @Input() showIdentityPhase = false;
  /** Na 1ª etapa de campos, Voltar retorna à identificação. */
  @Input() canBackToIdentity = false;
  @Input() usesFormSteps = false;
  @Input() isFirstFormStep = true;
  @Input() isLastFormStep = true;
  @Input() enviando = false;

  @Output() startForm = new EventEmitter<void>();
  @Output() voltarEtapa = new EventEmitter<void>();
  @Output() avancarEtapa = new EventEmitter<void>();
}
