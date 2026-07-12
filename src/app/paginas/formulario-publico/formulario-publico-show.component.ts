import { Component, OnDestroy, OnInit, ViewChild, Signal, signal, ChangeDetectorRef, ElementRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

import { PublicPageBodyService } from '../../core/services/public-page-body.service';
import {
  FormularioPublicoService,
  FormularioPublicoData,
  FormularioPublicoField,
} from '../../core/services/formulario-publico.service';
import { LoadingService } from '../../shared/services/loading.service';
import { ToastService } from '../../core/services/toast.service';
import { digitsOnlyCpf, formatCpfDisplay, isValidCpfDigits } from '../../core/utils/cpf';
import { buildFormFieldStepState } from './formulario-publico-steps.util';
import {
  clinicalStepRequiresTermScroll,
  clinicalStepShowsComprehension,
  clinicalStepShowsPrivacy,
  clinicalStepShowsSignatures,
} from '../../core/utils/clinical-step.util';
import {
  fpAnnounceLiveRegion,
  fpApplyLargeTextClass,
  fpFocusElement,
  fpPersistLargeTextPreference,
  fpPrefersReducedMotion,
  fpRestoreLargeTextPreference,
} from './formulario-publico-a11y.util';
import {
  applyPersonPrefillToFields,
  PersonPrefill,
  resolveSubmitterFromPrefill,
} from './formulario-publico-person-prefill.util';
import {
  fpClearCpfGateAuthorization,
  fpClearSubmitterIdentity,
  fpPersistCpfGateAuthorization,
  fpPersistSubmitterIdentity,
  fpRestoreCpfGateAuthorization,
  fpRestoreSubmitterIdentity,
} from './formulario-publico-identity.util';
import { buildFormularioPublicoSubmitPayload } from './formulario-publico-submit.util';
import {
  hasFilledSignatures,
  signingSecurityReinforced,
  templateHasSignatureFields,
} from './formulario-publico-signing.util';
import { computeFormularioPublicoProgress } from './formulario-publico-progress.util';
import { findPendingRequiredFields, findStepIndexForField } from './formulario-publico-validation.util';
import {
  filterVisibleFields,
  requiresGuardianName,
  shouldShowActorsBlock,
} from '../../core/utils/field-visibility.util';
import { initFormularioPublicoValores, resetFormularioPublicoValores } from './formulario-publico-init.util';
import { fieldType } from './formulario-publico-field.util';
import {
  hasProfessionalCosignFilled,
  resolveProfessionalCosignFieldKey,
  shouldShowAssistedCosignBlock,
} from './formulario-publico-cosign.util';
import {
  clearFileInputByKey,
  FORM_PUBLIC_FILE_MAX_BYTES,
  readFileAsDataUrl,
} from './formulario-publico-file.util';
import { FormularioPublicoGateComponent } from './formulario-publico-gate.component';
import { FormularioPublicoHeaderComponent } from './formulario-publico-header.component';
import { FormularioPublicoFeegowComponent } from './formulario-publico-feegow.component';
import { FormularioPublicoPreenchedoraComponent } from './formulario-publico-preenchedora.component';
import { FormularioPublicoOtpComponent } from './formulario-publico-otp.component';
import { FormularioPublicoFieldsComponent } from './formulario-publico-fields.component';
import { FormularioPublicoConsentComponent } from './formulario-publico-consent.component';
import { FormularioPublicoFooterComponent } from './formulario-publico-footer.component';
import {
  allNoticesScrolled,
  hasNoticeFields,
  noticeFieldKeys,
} from './formulario-publico-term-scroll.util';
import {
  buildFormularioPublicoThemeVars,
  formularioPublicoHasBranding,
} from './formulario-publico-theme.util';

@Component({
  selector: 'app-formulario-publico-show',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    FormularioPublicoGateComponent,
    FormularioPublicoHeaderComponent,
    FormularioPublicoFeegowComponent,
    FormularioPublicoPreenchedoraComponent,
    FormularioPublicoOtpComponent,
    FormularioPublicoFieldsComponent,
    FormularioPublicoConsentComponent,
    FormularioPublicoFooterComponent,
  ],
  templateUrl: './formulario-publico-show.component.html',
  styleUrl: './formulario-publico-show.component.css',
})
export class FormularioPublicoShowComponent implements OnInit, OnDestroy {
  @ViewChild('publicForm') ngForm!: NgForm;
  @ViewChild('fpScroll') fpScrollRef?: ElementRef<HTMLElement>;
  @ViewChild('fpStepHeading') fpStepHeadingRef?: ElementRef<HTMLElement>;
  @ViewChild(FormularioPublicoFeegowComponent) feegowBlock?: FormularioPublicoFeegowComponent;

  token = '';
  data: FormularioPublicoData | null = null;
  valores: Record<string, string | number | boolean | Date> = {};
  submitterName = '';
  submitterEmail = '';
  personGateOk = false;
  personCpfDigits = '';
  personCpfDisplay = '';
  personCode = '';
  personBirthDate = '';
  personGateErro = '';
  validandoPerson = false;
  personValidatedName: string | null = null;
  personValidatedId: number | null = null;
  procedureSchedulingAllowed = true;
  consentSummaryLabel = '';
  kioskMode = false;
  acceptTerms = false;
  comprehensionAck = false;
  noticeScrollState: Record<string, boolean> = {};
  termScrollCompleted = true;
  private termScrolledAt: string | null = null;
  guardianName = '';
  guardianRelation = '';
  witnessName = '';
  professionalExplained = false;
  professionalSignerName = '';
  assistedMode = false;
  quizAnswers: Record<string, number | null> = {};
  otpChannel: 'email' | 'whatsapp' = 'email';
  otpPhone = '';
  otpCode = '';
  otpVerified = false;
  otpSending = false;
  otpVerifying = false;
  otpErro = '';
  showSkeleton!: Signal<boolean>;
  enviando = false;
  erro = '';
  dark = false;
  logoImageFailed = signal(false);
  currentStepIndex = 0;
  largeTextMode = false;
  invalidFieldKeys = new Set<string>();
  private clinicalStepsCompleted: { kind: string; completed_at: string }[] = [];

  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);
  private router = inject(Router);
  private formularioService = inject(FormularioPublicoService);
  private loadingService = inject(LoadingService);
  private toast = inject(ToastService);
  private publicPageBody = inject(PublicPageBodyService);

  constructor() {
    this.token = this.route.snapshot.paramMap.get('token') ?? '';
    this.kioskMode = this.route.snapshot.queryParamMap.get('kiosk') === '1';
    this.assistedMode = this.route.snapshot.queryParamMap.get('assistido') === '1';
  }

  ngOnInit(): void {
    this.publicPageBody.enterPublicPage();
    this.lockPageScroll();
    try {
      this.dark = localStorage.getItem('gestgo_form_dark_mode') === '1';
      this.largeTextMode = fpRestoreLargeTextPreference();
      fpApplyLargeTextClass(this.largeTextMode);
    } catch {}
    this.syncPublicBodyClasses();
    if (!this.token) {
      this.showSkeleton = signal(false).asReadonly();
      this.erro = 'Link inválido.';
      return;
    }
    const { data$, showSkeleton } = this.loadingService.loadWithThreshold(this.formularioService.getByToken(this.token));
    this.showSkeleton = showSkeleton;
    data$.subscribe({
      next: (d) => this.onFormLoaded(d),
      error: (err) => {
        this.erro = err.error?.message ?? 'Formulário não encontrado ou não disponível.';
      },
    });
  }

  private onFormLoaded(d: FormularioPublicoData): void {
    this.logoImageFailed.set(false);
    this.data = d;
    this.personGateOk = false;
    this.personCpfDigits = '';
    this.personCpfDisplay = '';
    this.personCode = '';
    this.personBirthDate = '';
    this.personGateErro = '';
    this.personValidatedName = null;
    this.personValidatedId = null;
    this.procedureSchedulingAllowed = true;
    this.consentSummaryLabel = '';
    this.acceptTerms = false;
    this.comprehensionAck = false;
    this.resetTermScrollState();
    this.guardianName = '';
    this.guardianRelation = '';
    this.witnessName = '';
    this.professionalExplained = false;
    this.professionalSignerName = '';
    this.quizAnswers = {};
    this.otpVerified = false;
    this.otpCode = '';
    this.otpPhone = '';
    this.otpErro = '';
    this.otpChannel = d.otp_whatsapp_available ? 'whatsapp' : 'email';
    if (d.person_link?.enabled) {
      this.submitterName = '';
      this.submitterEmail = '';
      fpClearSubmitterIdentity();
    } else {
      const identity = fpRestoreSubmitterIdentity();
      this.submitterName = identity.name;
      this.submitterEmail = identity.email;
    }
    this.feegowBlock?.resetAvailabilityState();
    this.valores = initFormularioPublicoValores(d.fields, !!d.feegow?.enabled);
    this.resetFormSteps();
    this.restoreCpfGateAuthorization();
    this.syncPublicBodyClasses();
  }

  toggleDark(): void {
    this.dark = !this.dark;
    try {
      localStorage.setItem('gestgo_form_dark_mode', this.dark ? '1' : '0');
    } catch {}
    this.syncPublicBodyClasses();
  }

  onSubmitterIdentityChange(): void {
    if (this.personLinkRequired() && !this.personGateOk) {
      this.submitterName = '';
      this.submitterEmail = '';
      fpClearSubmitterIdentity();
      return;
    }
    fpPersistSubmitterIdentity(this.submitterName, this.submitterEmail);
  }

  toggleAcceptTermsFromBlock(event: MouseEvent): void {
    const target = event.target as HTMLElement | null;
    if (!target) return;
    if (target.closest('a') || target.closest('input') || target.closest('label')) return;
    this.acceptTerms = !this.acceptTerms;
  }

  personLinkRequired(): boolean {
    return !!this.data?.person_link?.enabled;
  }

  personLinkMode(): 'cpf' | 'code' {
    const mode = (this.data?.person_link?.mode || 'code').toLowerCase();
    return mode === 'cpf' ? 'cpf' : 'code';
  }

  personFormUnlocked(): boolean {
    return !this.personLinkRequired() || this.personGateOk;
  }

  onPersonCpfChange(raw: string): void {
    this.personCpfDigits = digitsOnlyCpf(raw);
    this.personCpfDisplay = formatCpfDisplay(this.personCpfDigits);
  }

  onPersonCodeChange(raw: string): void {
    this.personCode = (raw || '').trim();
  }

  onPersonBirthDateChange(raw: string): void {
    this.personBirthDate = (raw || '').trim();
  }

  validarIdentificacao(): void {
    this.personGateErro = '';
    if (!this.personLinkRequired()) {
      this.personGateOk = true;
      return;
    }

    if (this.personLinkMode() === 'cpf') {
      const cpf = this.personCpfDigits;
      if (cpf.length !== 11) {
        this.personGateErro = 'Informe o CPF completo (11 dígitos).';
        return;
      }
      if (!isValidCpfDigits(cpf)) {
        this.personGateErro = 'CPF inválido. Verifique os números.';
        return;
      }
      this.validandoPerson = true;
      this.formularioService.validatePerson(this.token, { cpf }).subscribe({
        next: (r) => {
          this.validandoPerson = false;
          this.personGateOk = true;
          this.personValidatedName = r.name;
          this.personValidatedId = r.person_id;
          this.procedureSchedulingAllowed = r.procedure_scheduling_allowed !== false;
          this.consentSummaryLabel = r.consent_summary?.label ?? '';
          fpPersistCpfGateAuthorization(this.token, cpf);
          this.applyPersonPrefill(r.prefill, r.name);
        },
        error: (err) => {
          this.validandoPerson = false;
          const msg = err.error?.errors ? Object.values(err.error.errors).flat().join(' ') : err.error?.message;
          this.personGateErro = msg ?? 'CPF não autorizado para este formulário.';
        },
      });
      return;
    }

    const code = this.personCode.trim();
    const birthDate = this.personBirthDate.trim();
    if (!code) {
      this.personGateErro = 'Informe o código cadastrado na clínica.';
      return;
    }
    if (!birthDate) {
      this.personGateErro = 'Informe a data de nascimento.';
      return;
    }
    this.validandoPerson = true;
    this.formularioService.validatePerson(this.token, { code, birth_date: birthDate }).subscribe({
      next: (r) => {
        this.validandoPerson = false;
        this.personGateOk = true;
        this.personValidatedName = r.name;
        this.personValidatedId = r.person_id;
        this.procedureSchedulingAllowed = r.procedure_scheduling_allowed !== false;
        this.consentSummaryLabel = r.consent_summary?.label ?? '';
        this.applyPersonPrefill(r.prefill, r.name);
      },
      error: (err) => {
        this.validandoPerson = false;
        const msg = err.error?.errors ? Object.values(err.error.errors).flat().join(' ') : err.error?.message;
        this.personGateErro = msg ?? 'Código ou data de nascimento não conferem.';
      },
    });
  }

  enviarOtp(): void {
    if (!this.token || !this.data || this.otpSending) return;
    this.otpErro = '';
    this.otpSending = true;
    if (this.otpChannel === 'email') {
      const em = this.submitterEmail.trim();
      if (!em) {
        this.otpSending = false;
        this.otpErro = 'Informe seu e-mail acima para receber o código.';
        return;
      }
      this.formularioService.sendOtp(this.token, { channel: 'email', email: em }).subscribe({
        next: (r) => this.onOtpSent(r.message),
        error: (err) => this.onOtpFailed(err),
      });
      return;
    }
    const ph = this.otpPhone.trim();
    if (ph.replace(/\D/g, '').length < 10) {
      this.otpSending = false;
      this.otpErro = 'Informe o celular com DDD para receber o código no WhatsApp.';
      return;
    }
    this.formularioService.sendOtp(this.token, { channel: 'whatsapp', phone: ph }).subscribe({
      next: (r) => this.onOtpSent(r.message),
      error: (err) => this.onOtpFailed(err),
    });
  }

  verificarOtp(): void {
    if (!this.token || this.otpVerifying) return;
    const code = this.otpCode.replace(/\D/g, '');
    if (code.length !== 6) {
      this.otpErro = 'Digite o código de 6 dígitos.';
      return;
    }
    this.otpErro = '';
    this.otpVerifying = true;
    const payload =
      this.otpChannel === 'email'
        ? { channel: 'email' as const, email: this.submitterEmail.trim(), code }
        : { channel: 'whatsapp' as const, phone: this.otpPhone.trim(), code };
    this.formularioService.verifyOtp(this.token, payload).subscribe({
      next: () => {
        this.otpVerifying = false;
        this.otpVerified = true;
        this.toast.success('Verificado', 'Código confirmado.');
      },
      error: (err) => {
        this.otpVerifying = false;
        this.otpErro = err.error?.message ?? 'Código inválido.';
      },
    });
  }

  enviar(): void {
    if (!this.data || this.enviando || !this.personFormUnlocked()) return;
    if (this.usesFormSteps && !this.isLastFormStep) {
      this.avancarEtapa();
      return;
    }
    if (!this.validarCamposObrigatorios(this.visibleFormFields)) return;
    if (this.ngForm && !this.ngForm.valid) {
      this.toast.warning('Campos obrigatórios', 'Preencha ou corrija os campos marcados com * antes de enviar.');
      return;
    }
    const fields = this.data.fields;
    const hasSignatures = templateHasSignatureFields(fields) && hasFilledSignatures(fields, this.valores);
    if (this.isConsentimentoDocumento() && !this.comprehensionAck) {
      this.toast.warning('Compreensão clínica', 'Marque que leu e compreendeu riscos, benefícios, alternativas e o direito de recusa.');
      return;
    }
    if (this.termScrollRequired && !this.termScrollCompleted) {
      this.toast.warning('Leitura do termo', 'Role até o final de todas as seções do termo antes de confirmar a compreensão.');
      return;
    }
    if (!this.quizCompleto()) {
      this.toast.warning('Quiz de compreensão', 'Responda todas as perguntas de compreensão antes de enviar.');
      return;
    }
    if (hasSignatures && !this.acceptTerms) {
      this.toast.warning('Termo de ciência', 'Marque a caixa confirmando que leu o aviso de privacidade antes de assinar e enviar.');
      return;
    }
    if (this.assistedMode && !this.professionalExplained) {
      this.toast.warning('Modo assistido', 'O profissional deve confirmar que explicou o termo antes do envio.');
      return;
    }
    if (this.assistedMode && !this.professionalSignerName.trim()) {
      this.toast.warning('Modo assistido', 'Informe o nome do profissional que assina o documento.');
      return;
    }
    if (
      this.assistedMode &&
      !hasProfessionalCosignFilled(this.data.fields, this.valores, true)
    ) {
      const usesDedicatedBlock = shouldShowAssistedCosignBlock(this.data.fields, true);
      this.toast.warning(
        'Assinatura do profissional',
        usesDedicatedBlock
          ? 'Assine no bloco de co-assinatura do profissional antes de enviar.'
          : 'Preencha o campo de assinatura do profissional no formulário antes de enviar.',
      );
      return;
    }
    if (this.requireGuardianBlock() && !this.guardianName.trim()) {
      this.toast.warning('Responsável legal', 'Informe o nome do responsável legal.');
      return;
    }
    if (signingSecurityReinforced(this.data.signing_security_level) && hasSignatures && !this.otpVerified) {
      this.toast.warning('Verificação', 'Envie e confirme o código OTP (e-mail ou WhatsApp) antes de enviar o formulário.');
      return;
    }

    this.enviando = true;
    this.erro = '';
    this.recordClinicalStepCompletion();
    const payload = buildFormularioPublicoSubmitPayload({
      fields: this.visibleFormFields,
      valores: this.valores,
      submitterName: this.submitterName,
      submitterEmail: this.submitterEmail,
      personCpfDigits: this.personCpfDigits,
      personCode: this.personCode,
      personBirthDate: this.personBirthDate,
      signingSecurityLevel: this.data.signing_security_level,
      otpChannel: this.otpChannel,
      otpPhone: this.otpPhone,
      acceptTerms: this.acceptTerms,
      comprehensionAck: this.comprehensionAck,
      requireComprehension: this.isConsentimentoDocumento(),
      requireTermScroll: this.termScrollRequired,
      termScrolledAt: this.termScrolledAt,
      assistedMode: this.assistedMode,
      professionalExplained: this.professionalExplained,
      professionalSignerName: this.professionalSignerName,
      quizAnswers: this.quizAnswersPayload(),
      actors: {
        guardian_name: this.guardianName,
        guardian_relation: this.guardianRelation,
        witness_name: this.witnessName,
      },
      clinicalStepsCompleted: this.clinicalStepsCompleted,
    });

    this.formularioService.submit(this.token, payload).subscribe({
      next: (r) => {
        this.enviando = false;
        if (r.feegow?.code === 'consent_blocks_procedure') {
          this.toast.warning(
            'Agendamento Feegow',
            r.feegow.message ?? 'O formulário foi enviado, mas o agendamento foi bloqueado por pendência de consentimento.',
          );
        }
        if (this.kioskMode) {
          this.toast.success('Enviado', `Protocolo ${r.protocol_number ?? ''} registrado.`);
          this.resetAfterKioskSubmit();
          return;
        }
        fpClearCpfGateAuthorization(this.token);
        fpPersistSubmitterIdentity(this.submitterName, this.submitterEmail);
        this.router.navigate(['/f/sucesso'], {
          state: {
            protocol_number: r.protocol_number,
            clinic_name: this.data?.clinic_name,
            clinic_logo_url: this.data?.logo_url ?? null,
          },
        });
      },
      error: (err) => {
        this.enviando = false;
        this.erro = err.error?.message ?? (err.error?.errors ? Object.values(err.error.errors).flat().join(' ') : 'Não foi possível enviar. Tente novamente.');
        this.toast.error('Não foi possível enviar', this.erro);
      },
    });
  }

  feegowEnabled(): boolean {
    return !!this.data?.feegow?.enabled;
  }

  feegowMeta() {
    return this.data?.feegow ?? null;
  }

  clinicLogoDisplayUrl(): string | null {
    if (this.logoImageFailed()) return null;
    const u = this.data?.logo_url;
    return u != null && String(u).trim() !== '' ? String(u) : null;
  }

  onClinicLogoError(): void {
    this.logoImageFailed.set(true);
  }

  clinicNameInitial(): string {
    const n = (this.data?.clinic_name ?? 'Z').trim();
    return n ? n.charAt(0).toUpperCase() : 'Z';
  }

  private get visibleFormFields(): FormularioPublicoField[] {
    if (!this.data?.fields?.length) return [];
    return filterVisibleFields(this.data.fields, this.valores);
  }

  private get stepState() {
    return buildFormFieldStepState(this.visibleFormFields, this.currentStepIndex, this.data?.uses_clinical_steps);
  }

  get usesClinicalSteps(): boolean {
    return this.stepState.usesClinicalSteps;
  }

  get currentStepTitle(): string {
    return this.stepState.currentStepTitle;
  }

  get clinicalStepMetas() {
    return this.stepState.clinicalSteps;
  }

  get stepStateForTemplate() {
    return this.stepState;
  }

  get usesFormSteps(): boolean {
    return this.stepState.usesFormSteps;
  }

  get isFirstFormStep(): boolean {
    return this.stepState.isFirstFormStep;
  }

  get isLastFormStep(): boolean {
    return this.stepState.isLastFormStep;
  }

  get currentStepFields(): FormularioPublicoField[] {
    const fields = this.stepState.currentStepFields;
    if (!this.usesClinicalSteps) {
      return fields;
    }
    if (this.stepState.currentStepKind === 'assinaturas') {
      return fields;
    }
    return fields.filter((f) => fieldType(f) !== 'signature');
  }

  get showFeegowOnCurrentStep(): boolean {
    return (
      this.feegowEnabled() &&
      this.personFormUnlocked() &&
      (this.isFirstFormStep || this.stepState.currentStepKind === 'dados_paciente')
    );
  }

  feegowSchedulingBlocked(): boolean {
    return this.feegowEnabled() && this.personLinkRequired() && !this.procedureSchedulingAllowed;
  }

  showAssistedCosignBlock(): boolean {
    if (!this.data) return false;
    return shouldShowAssistedCosignBlock(this.data.fields, this.assistedMode);
  }

  professionalCosignFieldKey(): string {
    if (!this.data) return resolveProfessionalCosignFieldKey([]);
    return resolveProfessionalCosignFieldKey(this.data.fields);
  }

  get showPreenchedoraOnCurrentStep(): boolean {
    if (this.personLinkRequired()) {
      return false;
    }
    return this.isFirstFormStep || this.stepState.currentStepKind === 'dados_paciente';
  }

  get showOtpOnCurrentStep(): boolean {
    const onSignatureStep =
      !this.usesClinicalSteps ||
      this.stepState.currentStepKind === 'assinaturas' ||
      this.isLastFormStep;
    return (
      signingSecurityReinforced(this.data?.signing_security_level) &&
      templateHasSignatureFields(this.visibleFormFields) &&
      onSignatureStep
    );
  }

  get showConsentOnCurrentStep(): boolean {
    if (this.usesClinicalSteps) {
      const kind = this.stepState.currentStepKind;
      return (
        clinicalStepShowsComprehension(kind) ||
        clinicalStepShowsPrivacy(kind) ||
        clinicalStepShowsSignatures(kind) ||
        (this.isLastFormStep &&
          (this.isConsentimentoDocumento() || this.quizQuestions().length > 0 || this.assistedMode))
      );
    }
    return (
      this.isLastFormStep &&
      (templateHasSignatureFields(this.visibleFormFields) ||
        this.isConsentimentoDocumento() ||
        this.assistedMode ||
        this.quizQuestions().length > 0)
    );
  }

  get showComprehensionSection(): boolean {
    if (!this.showConsentOnCurrentStep) {
      return false;
    }
    if (!this.usesClinicalSteps) {
      return this.isConsentimentoDocumento() || this.quizQuestions().length > 0;
    }
    return clinicalStepShowsComprehension(this.stepState.currentStepKind) || this.quizQuestions().length > 0;
  }

  get showPrivacySection(): boolean {
    if (!this.showConsentOnCurrentStep) {
      return false;
    }
    if (!this.usesClinicalSteps) {
      return true;
    }
    return clinicalStepShowsPrivacy(this.stepState.currentStepKind) || this.isLastFormStep;
  }

  get showActorsAssistedSection(): boolean {
    if (!this.showConsentOnCurrentStep) {
      return false;
    }
    if (!this.usesClinicalSteps) {
      return this.showActorsBlock() || this.assistedMode;
    }
    return (
      clinicalStepShowsSignatures(this.stepState.currentStepKind) &&
      (this.showActorsBlock() || this.assistedMode)
    );
  }

  showActorsBlock(): boolean {
    if (!this.data) return false;
    return shouldShowActorsBlock(
      this.data.template.document_kind,
      this.data.template.category,
      this.data.actors_visibility_rules,
      this.valores,
    );
  }

  requireGuardianBlock(): boolean {
    if (!this.data) return false;
    return requiresGuardianName(
      this.data.template.document_kind,
      this.data.template.category,
      this.data.actors_visibility_rules,
      this.valores,
    );
  }

  isConsentimentoDocumento(): boolean {
    const kind = (this.data?.template?.document_kind || '').toLowerCase();
    const category = (this.data?.template?.category || '').toLowerCase();
    return kind === 'consentimento' || category === 'consentimento';
  }

  get termScrollRequired(): boolean {
    return this.isConsentimentoDocumento() && hasNoticeFields(this.visibleFormFields);
  }

  onNoticeScrolled(event: { key: string; scrolled: boolean }): void {
    if (!event.scrolled || this.noticeScrollState[event.key]) return;
    const wasComplete = this.termScrollCompleted;
    this.noticeScrollState = { ...this.noticeScrollState, [event.key]: true };
    this.recomputeTermScrollCompleted();
    if (!wasComplete && this.termScrollCompleted && !this.termScrolledAt) {
      this.termScrolledAt = new Date().toISOString();
    }
    if (this.comprehensionAck && !this.termScrollCompleted) {
      this.comprehensionAck = false;
    }
    this.cdr.markForCheck();
  }

  quizQuestions(): { id: string; prompt: string; options: string[] }[] {
    const list = this.data?.comprehension_quiz;
    if (!Array.isArray(list)) return [];
    return list.filter((q) => q?.id && q?.prompt && Array.isArray(q.options) && q.options.length >= 2);
  }

  onQuizAnswerChange(event: { id: string; index: number }): void {
    this.quizAnswers = { ...this.quizAnswers, [event.id]: event.index };
  }

  private quizCompleto(): boolean {
    const questions = this.quizQuestions();
    if (questions.length === 0) return true;
    return questions.every((q) => typeof this.quizAnswers[q.id] === 'number');
  }

  private quizAnswersPayload(): Record<string, number> | undefined {
    const questions = this.quizQuestions();
    if (questions.length === 0) return undefined;
    const out: Record<string, number> = {};
    for (const q of questions) {
      const v = this.quizAnswers[q.id];
      if (typeof v === 'number') out[q.id] = v;
    }
    return out;
  }

  get progressPercent(): number {
    if (!this.data) return 0;
    return computeFormularioPublicoProgress({
      fields: this.visibleFormFields,
      valores: this.valores,
      usesFormSteps: this.usesFormSteps,
      currentStepNumber: this.stepState.currentStepNumber,
      totalFormSteps: this.stepState.totalFormSteps,
      currentStepTitle: this.currentStepTitle,
    }).percent;
  }

  get progressCountLabel(): string {
    if (!this.data) return '';
    return computeFormularioPublicoProgress({
      fields: this.visibleFormFields,
      valores: this.valores,
      usesFormSteps: this.usesFormSteps,
      currentStepNumber: this.stepState.currentStepNumber,
      totalFormSteps: this.stepState.totalFormSteps,
      currentStepTitle: this.currentStepTitle,
    }).countLabel;
  }

  toggleLargeText(): void {
    this.largeTextMode = !this.largeTextMode;
    fpPersistLargeTextPreference(this.largeTextMode);
    fpApplyLargeTextClass(this.largeTextMode);
    fpAnnounceLiveRegion(this.largeTextMode ? 'Texto ampliado ativado.' : 'Texto ampliado desativado.');
  }

  hidePlatformBranding(): boolean {
    return !!this.data?.hide_platform_branding;
  }

  get themeVars(): Record<string, string> {
    return buildFormularioPublicoThemeVars(this.data);
  }

  get isBranded(): boolean {
    return formularioPublicoHasBranding(this.data);
  }

  onCampoAlterado(): void {
    this.recomputeTermScrollCompleted();
    this.cdr.markForCheck();
  }

  onSignatureChange(event: { key: string; dataUrl: string }): void {
    this.valores[event.key] = event.dataUrl;
    this.onCampoAlterado();
  }

  onSignatureClear(key: string): void {
    this.valores[key] = '';
    this.onCampoAlterado();
  }

  avancarEtapa(): void {
    if (!this.validarCamposObrigatorios(this.currentStepFields)) return;
    if (!this.validarTermoDaEtapaAtual()) return;
    if (!this.validarConsentimentoDaEtapaAtual()) return;
    if (!this.isLastFormStep) {
      this.recordClinicalStepCompletion();
      this.currentStepIndex++;
      this.afterStepChange('forward');
    }
  }

  voltarEtapa(): void {
    if (!this.isFirstFormStep) {
      this.currentStepIndex--;
      this.afterStepChange('back');
    }
  }

  private validarConsentimentoDaEtapaAtual(): boolean {
    if (!this.showConsentOnCurrentStep) {
      return true;
    }
    if (this.showComprehensionSection && this.isConsentimentoDocumento() && !this.comprehensionAck) {
      this.toast.warning('Compreensão clínica', 'Marque que leu e compreendeu riscos, benefícios, alternativas e o direito de recusa.');
      return false;
    }
    if (this.showComprehensionSection && !this.quizCompleto()) {
      this.toast.warning('Quiz de compreensão', 'Responda todas as perguntas de compreensão antes de continuar.');
      return false;
    }
    if (this.showPrivacySection && templateHasSignatureFields(this.visibleFormFields) && !this.acceptTerms) {
      this.toast.warning('Termo de ciência', 'Marque a caixa de privacidade antes de continuar.');
      return false;
    }
    return true;
  }

  private recordClinicalStepCompletion(): void {
    if (!this.usesClinicalSteps) {
      return;
    }
    const kind = this.stepState.currentStepKind;
    const completedAt = new Date().toISOString();
    this.clinicalStepsCompleted = [
      ...this.clinicalStepsCompleted.filter((s) => s.kind !== kind),
      { kind, completed_at: completedAt },
    ];
  }

  private afterStepChange(direction: 'forward' | 'back'): void {
    const title = this.currentStepTitle;
    const msg =
      direction === 'forward'
        ? `Avançou para a etapa ${this.stepState.currentStepNumber} de ${this.stepState.totalFormSteps}: ${title}.`
        : `Voltou para a etapa ${this.stepState.currentStepNumber} de ${this.stepState.totalFormSteps}: ${title}.`;
    fpAnnounceLiveRegion(msg);
    this.scrollToFormTop();
    fpFocusElement(this.fpStepHeadingRef?.nativeElement, fpPrefersReducedMotion() ? 0 : 120);
  }

  onFileSelected(event: Event, key: string): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) {
      this.valores[key] = '';
      return;
    }
    if (file.size > FORM_PUBLIC_FILE_MAX_BYTES) {
      this.toast.error('Arquivo grande demais', 'Escolha um arquivo de até 15 MB.');
      input.value = '';
      this.valores[key] = '';
      return;
    }
    readFileAsDataUrl(file)
      .then((dataUrl) => {
        this.valores[key] = dataUrl;
      })
      .catch(() => {
        this.toast.error('Erro ao ler arquivo', 'Tente outro arquivo.');
        input.value = '';
        this.valores[key] = '';
      });
  }

  clearFile(key: string): void {
    this.valores[key] = '';
    clearFileInputByKey(key);
  }

  ngOnDestroy(): void {
    this.unlockPageScroll();
    this.publicPageBody.leavePublicPage();
    if (typeof document !== 'undefined' && document.body) {
      document.body.classList.remove('gestgo-public-dark', 'gestgo-public-branded');
      document.body.style.removeProperty('--fp-brand-500');
      document.body.style.removeProperty('--fp-accent-contrast');
    }
  }

  private applyPersonPrefill(prefill: PersonPrefill | undefined, validatedName?: string): void {
    if (!this.data) return;
    applyPersonPrefillToFields(this.data.fields, this.valores, prefill);
    const submitter = resolveSubmitterFromPrefill(prefill, validatedName);
    this.submitterName = submitter.name;
    this.submitterEmail = submitter.email;
    fpPersistSubmitterIdentity(this.submitterName, this.submitterEmail);
  }

  private onOtpSent(message: string): void {
    this.otpSending = false;
    this.toast.success('Código enviado', message);
    this.otpVerified = false;
  }

  private onOtpFailed(err: { error?: { message?: string } }): void {
    this.otpSending = false;
    this.otpErro = err.error?.message ?? 'Não foi possível enviar o código.';
  }

  private validarTermoDaEtapaAtual(): boolean {
    if (!this.termScrollRequired) return true;
    const requiresStepScroll =
      this.usesClinicalSteps && clinicalStepRequiresTermScroll(this.stepState.currentStepKind);
    const fieldsToCheck = requiresStepScroll ? this.currentStepFields : this.currentStepFields;
    const pending = noticeFieldKeys(fieldsToCheck).filter((key) => !this.noticeScrollState[key]);
    if (pending.length === 0) return true;
    this.toast.warning('Leitura do termo', 'Role até o final de cada seção do termo nesta etapa antes de continuar.');
    fpAnnounceLiveRegion('Leia todas as seções do termo nesta etapa antes de continuar.');
    return false;
  }

  private resetTermScrollState(): void {
    this.noticeScrollState = {};
    this.termScrolledAt = null;
    this.recomputeTermScrollCompleted();
  }

  private recomputeTermScrollCompleted(): void {
    if (!this.termScrollRequired) {
      this.termScrollCompleted = true;
      return;
    }
    this.termScrollCompleted = allNoticesScrolled(noticeFieldKeys(this.visibleFormFields), this.noticeScrollState);
  }

  private validarCamposObrigatorios(fields: FormularioPublicoField[]): boolean {
    if (!this.data) return false;
    const pendentes = findPendingRequiredFields(fields, this.valores);
    if (!pendentes.length) {
      this.invalidFieldKeys = new Set();
      return true;
    }

    this.invalidFieldKeys = new Set(pendentes.map((f) => f.name_key));
    if (this.usesFormSteps) {
      const stepIndex = findStepIndexForField(this.visibleFormFields, pendentes[0]!.name_key, this.data.uses_clinical_steps);
      if (stepIndex >= 0 && stepIndex !== this.currentStepIndex) {
        this.currentStepIndex = stepIndex;
        this.afterStepChange('back');
      }
    }
    const firstKey = pendentes[0]!.name_key;
    fpAnnounceLiveRegion(`Campo obrigatório pendente: ${pendentes[0]!.label}.`);
    queueMicrotask(() => {
      const el = document.getElementById(`field_${firstKey}`) as HTMLElement | null;
      fpFocusElement(el);
    });
    this.toast.warning(
      'Campos obrigatórios',
      this.usesFormSteps
        ? 'Preencha os campos marcados com * nesta etapa antes de continuar.'
        : 'Preencha os campos marcados com * antes de enviar.',
    );
    return false;
  }

  private resetAfterKioskSubmit(): void {
    fpClearCpfGateAuthorization(this.token);
    this.personGateOk = false;
    this.personCpfDigits = '';
    this.personCpfDisplay = '';
    this.acceptTerms = false;
    this.comprehensionAck = false;
    this.resetTermScrollState();
    this.guardianName = '';
    this.guardianRelation = '';
    this.witnessName = '';
    this.professionalExplained = false;
    this.professionalSignerName = '';
    this.quizAnswers = {};
    this.otpVerified = false;
    this.otpCode = '';
    if (this.data) {
      resetFormularioPublicoValores(this.data.fields, this.valores);
    }
    this.feegowBlock?.resetAvailabilityState();
    this.resetFormSteps();
  }

  private restoreCpfGateAuthorization(): void {
    if (this.personLinkMode() !== 'cpf') return;
    const restored = fpRestoreCpfGateAuthorization(this.token);
    if (!restored) return;
    this.personCpfDigits = restored.cpfDigits;
    this.personCpfDisplay = restored.cpfDisplay;
    this.personGateOk = true;
  }

  private syncPublicBodyClasses(): void {
    if (typeof document === 'undefined' || !document.body) return;
    const body = document.body;
    body.classList.toggle('gestgo-public-dark', this.dark);
    const branded = this.isBranded;
    body.classList.toggle('gestgo-public-branded', branded);
    if (branded) {
      const vars = this.themeVars;
      body.style.setProperty('--fp-brand-500', vars['--fp-brand-500'] ?? '#0a0a0a');
      body.style.setProperty('--fp-accent-contrast', vars['--fp-accent-contrast'] ?? '#ffffff');
    } else {
      body.style.removeProperty('--fp-brand-500');
      body.style.removeProperty('--fp-accent-contrast');
    }
  }

  private scrollToFormTop(): void {
    if (typeof document === 'undefined') return;
    const el = this.fpScrollRef?.nativeElement;
    const behavior = fpPrefersReducedMotion() ? 'auto' : 'smooth';
    if (el) {
      el.scrollTo({ top: 0, behavior });
      return;
    }
    window.scrollTo({ top: 0, behavior });
  }

  private lockPageScroll(): void {
    if (typeof document === 'undefined') return;
    document.documentElement.style.overflow = 'hidden';
    document.documentElement.style.height = '100dvh';
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100dvh';
  }

  private unlockPageScroll(): void {
    if (typeof document === 'undefined') return;
    document.documentElement.style.overflow = '';
    document.documentElement.style.height = '';
    document.body.style.overflow = '';
    document.body.style.height = '';
  }

  private resetFormSteps(): void {
    this.currentStepIndex = 0;
    this.clinicalStepsCompleted = [];
    this.invalidFieldKeys = new Set();
  }
}
