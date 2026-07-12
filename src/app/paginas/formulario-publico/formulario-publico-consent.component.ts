import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ZardCheckboxComponent } from '@/shared/components/checkbox';
import { FormularioPublicoQuizQuestion } from '../../core/services/formulario-publico.service';
import {
  clearSignatureCanvas,
  endSignatureDraw,
  moveSignatureDraw,
  startSignatureDraw,
} from './formulario-publico-signature.util';
import { ASSISTED_COSIGN_FIELD_KEY } from './formulario-publico-cosign.util';

@Component({
  selector: 'zm-formulario-publico-consent',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, ZardCheckboxComponent],
  templateUrl: './formulario-publico-consent.component.html',
})
export class FormularioPublicoConsentComponent {
  @Input() acceptTerms = false;
  @Input() comprehensionAck = false;
  @Input() requireComprehension = false;
  @Input() requireTermScroll = false;
  @Input() termScrollCompleted = true;
  @Input() showComprehensionSection = true;
  @Input() showPrivacySection = true;
  @Input() showActorsAssistedSection = true;
  @Input() showActors = false;
  @Input() requireGuardian = false;
  @Input() guardianName = '';
  @Input() guardianRelation = '';
  @Input() witnessName = '';
  @Input() assistedMode = false;
  @Input() professionalExplained = false;
  @Input() showAssistedCosignBlock = false;
  @Input() professionalSignerName = '';
  @Input() professionalCosignFieldKey = ASSISTED_COSIGN_FIELD_KEY;
  @Input() quizQuestions: FormularioPublicoQuizQuestion[] = [];
  @Input() quizAnswers: Record<string, number | null> = {};

  @Output() acceptTermsChange = new EventEmitter<boolean>();
  @Output() comprehensionAckChange = new EventEmitter<boolean>();
  @Output() guardianNameChange = new EventEmitter<string>();
  @Output() guardianRelationChange = new EventEmitter<string>();
  @Output() witnessNameChange = new EventEmitter<string>();
  @Output() professionalExplainedChange = new EventEmitter<boolean>();
  @Output() professionalSignerNameChange = new EventEmitter<string>();
  @Output() professionalSignatureChange = new EventEmitter<{ key: string; dataUrl: string }>();
  @Output() professionalSignatureClear = new EventEmitter<string>();
  @Output() quizAnswerChange = new EventEmitter<{ id: string; index: number }>();
  @Output() toggleFromBlock = new EventEmitter<MouseEvent>();

  onToggleBlock(event: MouseEvent): void {
    this.toggleFromBlock.emit(event);
  }

  onQuizSelect(id: string, index: number): void {
    this.quizAnswerChange.emit({ id, index });
  }

  startProfessionalSignature(e: MouseEvent | TouchEvent): void {
    startSignatureDraw(e, this.professionalCosignFieldKey);
  }

  moveProfessionalSignature(e: MouseEvent | TouchEvent): void {
    moveSignatureDraw(e, this.professionalCosignFieldKey);
  }

  endProfessionalSignature(): void {
    const dataUrl = endSignatureDraw(this.professionalCosignFieldKey);
    this.professionalSignatureChange.emit({ key: this.professionalCosignFieldKey, dataUrl });
  }

  clearProfessionalSignature(): void {
    clearSignatureCanvas(this.professionalCosignFieldKey);
    this.professionalSignatureClear.emit(this.professionalCosignFieldKey);
  }
}
