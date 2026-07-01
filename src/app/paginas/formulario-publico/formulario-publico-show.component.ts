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
import { initFormularioPublicoValores, resetFormularioPublicoValores } from './formulario-publico-init.util';
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
  @ViewChild(FormularioPublicoFeegowComponent) feegowBlock?: FormularioPublicoFeegowComponent;

  token = '';
  data: FormularioPublicoData | null = null;
  valores: Record<string, string | number | boolean | Date> = {};
  submitterName = '';
  submitterEmail = '';
  personGateOk = false;
  personCpfDigits = '';
  personCpfDisplay = '';
  personGateErro = '';
  validandoPerson = false;
  personValidatedName: string | null = null;
  kioskMode = false;
  acceptTerms = false;
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
  }

  ngOnInit(): void {
    this.publicPageBody.enterPublicPage();
    this.lockPageScroll();
    try {
      this.dark = localStorage.getItem('gestgo_form_dark_mode') === '1';
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
    this.personGateErro = '';
    this.personValidatedName = null;
    this.acceptTerms = false;
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

  personFormUnlocked(): boolean {
    return !this.personLinkRequired() || this.personGateOk;
  }

  onPersonCpfChange(raw: string): void {
    this.personCpfDigits = digitsOnlyCpf(raw);
    this.personCpfDisplay = formatCpfDisplay(this.personCpfDigits);
  }

  validarIdentificacao(): void {
    this.personGateErro = '';
    const cpf = this.personCpfDigits;
    if (cpf.length !== 11) {
      this.personGateErro = 'Informe o CPF completo (11 dígitos).';
      return;
    }
    if (!isValidCpfDigits(cpf)) {
      this.personGateErro = 'CPF inválido. Verifique os números.';
      return;
    }
    if (!this.personLinkRequired()) {
      this.personGateOk = true;
      fpPersistCpfGateAuthorization(this.token, cpf);
      return;
    }
    this.validandoPerson = true;
    this.formularioService.validatePerson(this.token, { cpf }).subscribe({
      next: (r) => {
        this.validandoPerson = false;
        this.personGateOk = true;
        this.personValidatedName = r.name;
        fpPersistCpfGateAuthorization(this.token, cpf);
        this.applyPersonPrefill(r.prefill, r.name);
      },
      error: (err) => {
        this.validandoPerson = false;
        const msg = err.error?.errors ? Object.values(err.error.errors).flat().join(' ') : err.error?.message;
        this.personGateErro = msg ?? 'CPF não autorizado para este formulário.';
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
    if (!this.validarCamposObrigatorios(this.data.fields)) return;
    if (this.ngForm && !this.ngForm.valid) {
      this.toast.warning('Campos obrigatórios', 'Preencha ou corrija os campos marcados com * antes de enviar.');
      return;
    }
    const fields = this.data.fields;
    const hasSignatures = templateHasSignatureFields(fields) && hasFilledSignatures(fields, this.valores);
    if (hasSignatures && !this.acceptTerms) {
      this.toast.warning('Termo de ciência', 'Marque a caixa confirmando que leu o aviso antes de assinar e enviar.');
      return;
    }
    if (signingSecurityReinforced(this.data.signing_security_level) && hasSignatures && !this.otpVerified) {
      this.toast.warning('Verificação', 'Envie e confirme o código OTP (e-mail ou WhatsApp) antes de enviar o formulário.');
      return;
    }

    this.enviando = true;
    this.erro = '';
    const payload = buildFormularioPublicoSubmitPayload({
      fields,
      valores: this.valores,
      submitterName: this.submitterName,
      submitterEmail: this.submitterEmail,
      personCpfDigits: this.personCpfDigits,
      signingSecurityLevel: this.data.signing_security_level,
      otpChannel: this.otpChannel,
      otpPhone: this.otpPhone,
    });

    this.formularioService.submit(this.token, payload).subscribe({
      next: (r) => {
        this.enviando = false;
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

  private get stepState() {
    return buildFormFieldStepState(this.data?.fields ?? [], this.currentStepIndex);
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
    return this.stepState.currentStepFields;
  }

  get showFeegowOnCurrentStep(): boolean {
    return this.feegowEnabled() && this.isFirstFormStep;
  }

  get showPreenchedoraOnCurrentStep(): boolean {
    return !this.personLinkRequired() && this.isFirstFormStep;
  }

  get showOtpOnCurrentStep(): boolean {
    const fields = this.data?.fields ?? [];
    return signingSecurityReinforced(this.data?.signing_security_level) && templateHasSignatureFields(fields) && this.isLastFormStep;
  }

  get showConsentOnCurrentStep(): boolean {
    const fields = this.data?.fields ?? [];
    return templateHasSignatureFields(fields) && this.isLastFormStep;
  }

  get progressPercent(): number {
    if (!this.data) return 0;
    return computeFormularioPublicoProgress({
      fields: this.data.fields,
      valores: this.valores,
      usesFormSteps: this.usesFormSteps,
      currentStepNumber: this.stepState.currentStepNumber,
      totalFormSteps: this.stepState.totalFormSteps,
    }).percent;
  }

  get progressCountLabel(): string {
    if (!this.data) return '';
    return computeFormularioPublicoProgress({
      fields: this.data.fields,
      valores: this.valores,
      usesFormSteps: this.usesFormSteps,
      currentStepNumber: this.stepState.currentStepNumber,
      totalFormSteps: this.stepState.totalFormSteps,
    }).countLabel;
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
    if (!this.isLastFormStep) {
      this.currentStepIndex++;
      this.scrollToFormTop();
    }
  }

  voltarEtapa(): void {
    if (!this.isFirstFormStep) {
      this.currentStepIndex--;
      this.scrollToFormTop();
    }
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

  private validarCamposObrigatorios(fields: FormularioPublicoField[]): boolean {
    if (!this.data) return false;
    const pendentes = findPendingRequiredFields(fields, this.valores);
    if (!pendentes.length) return true;

    if (this.usesFormSteps) {
      const stepIndex = findStepIndexForField(this.data.fields, pendentes[0]!.name_key);
      if (stepIndex >= 0 && stepIndex !== this.currentStepIndex) {
        this.currentStepIndex = stepIndex;
        this.scrollToFormTop();
      }
    }
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
    this.otpVerified = false;
    this.otpCode = '';
    if (this.data) {
      resetFormularioPublicoValores(this.data.fields, this.valores);
    }
    this.feegowBlock?.resetAvailabilityState();
    this.resetFormSteps();
  }

  private restoreCpfGateAuthorization(): void {
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
    if (el) {
      el.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
  }
}
