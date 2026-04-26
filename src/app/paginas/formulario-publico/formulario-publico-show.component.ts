import { Component, OnDestroy, OnInit, inject, ViewChild, Signal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { FlatpickrDirective, provideFlatpickrDefaults } from 'angularx-flatpickr';
import { Portuguese } from 'flatpickr/dist/l10n/pt';
import { RouterLink } from '@angular/router';
import { PublicPageBodyService } from '../../core/services/public-page-body.service';
import {
  FormularioPublicoService,
  FormularioPublicoData,
  FormularioPublicoField,
  FormularioPublicoFeegowMeta,
  FeegowSimpleOption,
} from '../../core/services/formulario-publico.service';
import { LoadingService } from '../../shared/services/loading.service';
import { ToastService } from '../../core/services/toast.service';
import { digitsOnlyCpf, formatCpfDisplay, isValidCpfDigits } from '../../core/utils/cpf';

interface PersonPrefill {
  name?: string;
  cpf?: string | null;
  rg?: string | null;
  email?: string | null;
  phone?: string | null;
  phone_alt?: string | null;
  birth_date?: string | null;
  age?: number | null;
  sex?: string | null;
  marital_status?: string | null;
  profession?: string | null;
  address?: string | null;
  neighborhood?: string | null;
  city?: string | null;
  cep?: string | null;
  referred_by?: string | null;
  notes?: string | null;
  has_health_plan?: string | null;
  health_plan_operator?: string | null;
  health_plan_card_number?: string | null;
}

@Component({
  selector: 'app-formulario-publico-show',
  standalone: true,
  imports: [CommonModule, FormsModule, FlatpickrDirective, RouterLink],
  providers: [
    provideFlatpickrDefaults({
      locale: Portuguese,
      dateFormat: 'Y-m-d',
      altInput: true,
      altFormat: 'd/m/Y',
      altInputClass: 'fp-input',
      allowInput: true,
      disableMobile: true,
      static: false,
    }),
  ],
  templateUrl: './formulario-publico-show.component.html',
  styleUrl: './formulario-publico-show.component.css',
})
export class FormularioPublicoShowComponent implements OnInit, OnDestroy {
  private static readonly PERSON_PREFILL_KEY_ALIASES: Record<string, string[]> = {
    name: ['nome', 'name', 'paciente', 'cliente'],
    cpf: ['cpf'],
    rg: ['rg'],
    email: ['email', 'e-mail', 'mail'],
    phone: ['telefone', 'celular', 'whatsapp', 'fone', 'phone', 'contato'],
    birth_date: ['nascimento', 'birth', 'data_nascimento'],
    age: ['idade', 'age'],
    sex: ['sexo', 'genero', 'gênero', 'sex'],
    marital_status: ['estado_civil', 'marital'],
    profession: ['profissao', 'profissão', 'profession'],
    address: ['endereco', 'endereço', 'logradouro', 'rua', 'address'],
    neighborhood: ['bairro', 'neighborhood'],
    city: ['cidade', 'city'],
    cep: ['cep'],
    referred_by: ['indicacao', 'indicação', 'referencia', 'referência', 'referred'],
    notes: ['observacao', 'observação', 'anotacao', 'anotação', 'notas', 'notes'],
    has_health_plan: ['plano_saude', 'plano de saude', 'plano de saúde', 'convenio', 'convênio'],
    health_plan_operator: ['operadora', 'health_plan_operator'],
    health_plan_card_number: ['carteirinha', 'numero_carteirinha', 'nro_carteirinha', 'health_plan_card_number'],
  };

  /** Lembra nome/e-mail opcionais do preenchedor entre formulários públicos (mesmo navegador). */
  private static readonly LS_SUBMITTER_NAME = 'gestgo_public_form_submitter_name';
  private static readonly LS_SUBMITTER_EMAIL = 'gestgo_public_form_submitter_email';
  /** CPF já autorizado para este token (evita pedir de novo ao recarregar a mesma página). */
  private static readonly LS_CPF_AUTH_PREFIX = 'gestgo_public_form_cpf_auth_';

  @ViewChild('publicForm') ngForm!: NgForm;
  token = '';
  data: FormularioPublicoData | null = null;
  valores: Record<string, string | number | boolean | Date> = {};
  /** Par de valor + rótulo para select/radio. A API pode enviar:
   *  - string[]                         → ["Sim","Não"]
   *  - { options: string[] }            → { options: ["Sim","Não"] }
   *  - string (separada por , ou \n)    → "Sim,Não"
   *  - string JSON                      → "[\"Sim\",\"Não\"]"
   */
  getFieldOptions(f: FormularioPublicoField): { value: string; label: string }[] {
    let raw: unknown = f.options;
    if (!raw) return [];

    // API envolve em { options: [...] }
    if (raw && typeof raw === 'object' && !Array.isArray(raw) && 'options' in raw) {
      raw = (raw as Record<string, unknown>)['options'];
    }

    // String JSON ou separada por vírgula/quebra de linha
    if (typeof raw === 'string') {
      const str = raw.trim();
      if (str.startsWith('[') || str.startsWith('{')) {
        try { raw = JSON.parse(raw) as unknown; } catch { /* ignora */ }
      }
      if (typeof raw === 'string') {
        raw = str.split(/\n|,/).map((s: string) => s.trim()).filter(Boolean);
      }
    }

    if (Array.isArray(raw)) {
      return raw.map((o: unknown) => {
        if (typeof o === 'string') return { value: o, label: o };
        if (o && typeof o === 'object') {
          const obj = o as Record<string, unknown>;
          const label = String(obj['label'] ?? obj['name'] ?? obj['value'] ?? obj['text'] ?? '');
          const value = String(obj['value'] ?? obj['id'] ?? obj['label'] ?? obj['name'] ?? label);
          return { value, label: label || value };
        }
        return { value: String(o), label: String(o) };
      });
    }

    return [];
  }

  /** Tipo do campo normalizado (minúsculo) para o template. */
  fieldType(f: FormularioPublicoField): string {
    const t = (f.type ?? '').toLowerCase();
    if (t === 'anexo' || t === 'attachment') return 'file';
    return t;
  }

  /**
   * Placeholder contextual para inputs genéricos (text, textarea, number, email, tel).
   * Usa heurística leve no label para oferecer um exemplo útil sem poluir o layout.
   */
  fieldPlaceholder(f: FormularioPublicoField): string {
    const t = this.fieldType(f);
    const label = (f.label ?? '').trim();
    const l = label.toLowerCase();

    if (t === 'number') return 'Ex.: 0';
    if (t === 'textarea') return label ? `Escreva aqui sobre "${label.toLowerCase()}"...` : 'Escreva aqui...';

    if (l.includes('e-mail') || l.includes('email')) return 'email@exemplo.com';
    if (l.includes('cpf')) return '000.000.000-00';
    if (l.includes('cnpj')) return '00.000.000/0000-00';
    if (l.includes('telefone') || l.includes('celular') || l.includes('whatsapp') || l.includes('fone')) {
      return '(00) 00000-0000';
    }
    if (l.includes('cep')) return '00000-000';
    if (l.includes('nome')) return 'Digite seu nome completo';
    if (l.includes('idade')) return 'Ex.: 30';
    if (l.includes('peso')) return 'Ex.: 70';
    if (l.includes('altura')) return 'Ex.: 1.70';
    if (l.includes('endere')) return 'Rua, número, complemento';
    if (l.includes('cidade')) return 'Sua cidade';
    if (l.includes('estado')) return 'UF';
    if (l.includes('profiss')) return 'Sua profissão';
    if (l.includes('observa') || l.includes('coment')) return 'Escreva aqui...';

    return label ? `Informe ${label.toLowerCase()}` : 'Digite aqui';
  }
  submitterName = '';
  submitterEmail = '';
  /** Formulários com vínculo à ficha (código + nascimento). */
  personGateOk = false;
  personCode = '';
  personBirthDate = '';
  /** Gate por CPF (`person_link.mode === 'cpf'`). */
  personCpfDigits = '';
  personCpfDisplay = '';
  personGateErro = '';
  validandoPerson = false;
  personValidatedName: string | null = null;
  /** Modo totem: URL `?kiosk=1` — sem cabeçalho completo e volta ao gate após envio. */
  kioskMode = false;
  acceptTerms = false;
  otpChannel: 'email' | 'whatsapp' = 'email';
  otpPhone = '';
  otpCode = '';
  otpVerified = false;
  otpSending = false;
  otpVerifying = false;
  otpErro = '';
  feegowBuscandoDisponibilidade = false;
  feegowDisponibilidadeErro = '';
  feegowHorariosDisponiveis: string[] = [];
  feegowProfissionaisDisponiveis: { value: string; label: string }[] = [];
  feegowHorasPorProfissional: Record<string, string[]> = {};
  showSkeleton!: Signal<boolean>;
  enviando = false;
  erro = '';
  dark = false;
  /** Se a URL da logo existir mas a imagem falhar (404, CORS, host interno). */
  logoImageFailed = signal(false);
  private route = inject(ActivatedRoute);
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
    try {
      this.dark = localStorage.getItem('gestgo_form_dark_mode') === '1';
    } catch {}
    this.applyPublicDarkBodyClass();
    if (!this.token) {
      this.showSkeleton = signal(false).asReadonly();
      this.erro = 'Link inválido.';
      return;
    }
    const { data$, showSkeleton } = this.loadingService.loadWithThreshold(this.formularioService.getByToken(this.token));
    this.showSkeleton = showSkeleton;
    data$.subscribe({
      next: (d) => {
        this.logoImageFailed.set(false);
        this.data = d;
        this.personGateOk = false;
        this.personCode = '';
        this.personBirthDate = '';
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
          this.clearSubmitterIdentity();
        } else {
          this.restoreSubmitterIdentity();
        }
        this.feegowBuscandoDisponibilidade = false;
        this.feegowDisponibilidadeErro = '';
        this.feegowHorariosDisponiveis = [];
        this.feegowProfissionaisDisponiveis = [];
        this.feegowHorasPorProfissional = {};
        d.fields.forEach((f) => {
          const ft = this.fieldType(f);
          if (ft === 'checkbox') this.valores[f.name_key] = false;
          else this.valores[f.name_key] = '';
        });
        if (this.feegowEnabled()) {
          this.initFeegowValues();
        }
        this.restoreCpfGateAuthorization();
      },
      error: (err) => {
        this.erro = err.error?.message ?? 'Formulário não encontrado ou não disponível.';
      },
    });
  }

  toggleDark(): void {
    this.dark = !this.dark;
    try {
      localStorage.setItem('gestgo_form_dark_mode', this.dark ? '1' : '0');
    } catch {}
    this.applyPublicDarkBodyClass();
  }

  /** Sincroniza a classe `gestgo-public-dark` no <body> — necessária para estilizar o popup do Flatpickr (anexado ao body). */
  private applyPublicDarkBodyClass(): void {
    if (typeof document === 'undefined' || !document.body) return;
    document.body.classList.toggle('gestgo-public-dark', this.dark);
  }

  /** Chamado ao digitar nome/e-mail opcionais — persiste para o próximo link de formulário público. */
  onSubmitterIdentityChange(): void {
    // Em formulários com identificação obrigatória, não reaproveitar identidade antiga.
    if (this.personLinkRequired() && !this.personGateOk) {
      this.submitterName = '';
      this.submitterEmail = '';
      this.clearSubmitterIdentity();
      return;
    }
    this.persistSubmitterIdentity();
  }

  /** Permite marcar/desmarcar ao clicar no card pontilhado inteiro. */
  toggleAcceptTermsFromBlock(event: MouseEvent): void {
    const target = event.target as HTMLElement | null;
    if (!target) return;
    if (target.closest('a') || target.closest('input') || target.closest('label')) return;
    this.acceptTerms = !this.acceptTerms;
  }

  private restoreSubmitterIdentity(): void {
    try {
      const n = localStorage.getItem(FormularioPublicoShowComponent.LS_SUBMITTER_NAME);
      const e = localStorage.getItem(FormularioPublicoShowComponent.LS_SUBMITTER_EMAIL);
      if (n != null && n !== '') this.submitterName = n;
      if (e != null && e !== '') this.submitterEmail = e;
    } catch {
      /* private mode / quota */
    }
  }

  private cpfAuthStorageKey(): string {
    return `${FormularioPublicoShowComponent.LS_CPF_AUTH_PREFIX}${encodeURIComponent(this.token)}`;
  }

  /** Salva CPF autorizado para este link (recarregar não volta ao gate). */
  private persistCpfGateAuthorization(): void {
    const cpf = this.personCpfDigits;
    if (cpf.length !== 11 || !isValidCpfDigits(cpf)) return;
    try {
      localStorage.setItem(this.cpfAuthStorageKey(), cpf);
    } catch {
      /* private mode / quota */
    }
  }

  /** Recupera CPF já autorizado nesta sessão de navegador para o mesmo token. */
  private restoreCpfGateAuthorization(): void {
    if (!this.token) return;
    try {
      const raw = localStorage.getItem(this.cpfAuthStorageKey());
      if (!raw) return;
      const cpf = digitsOnlyCpf(raw);
      if (cpf.length !== 11 || !isValidCpfDigits(cpf)) {
        localStorage.removeItem(this.cpfAuthStorageKey());
        return;
      }
      this.personCpfDigits = cpf;
      this.personCpfDisplay = formatCpfDisplay(cpf);
      this.personGateOk = true;
    } catch {
      /* private mode */
    }
  }

  /** Remove após envio com sucesso (próxima visita exige CPF de novo). */
  private clearCpfGateAuthorization(): void {
    if (!this.token) return;
    try {
      localStorage.removeItem(this.cpfAuthStorageKey());
    } catch {
      /* private mode */
    }
  }

  private persistSubmitterIdentity(): void {
    try {
      const n = this.submitterName.trim();
      const e = this.submitterEmail.trim();
      if (n) {
        localStorage.setItem(FormularioPublicoShowComponent.LS_SUBMITTER_NAME, n);
      } else {
        localStorage.removeItem(FormularioPublicoShowComponent.LS_SUBMITTER_NAME);
      }
      if (e) {
        localStorage.setItem(FormularioPublicoShowComponent.LS_SUBMITTER_EMAIL, e);
      } else {
        localStorage.removeItem(FormularioPublicoShowComponent.LS_SUBMITTER_EMAIL);
      }
    } catch {
      /* private mode / quota */
    }
  }

  private clearSubmitterIdentity(): void {
    try {
      localStorage.removeItem(FormularioPublicoShowComponent.LS_SUBMITTER_NAME);
      localStorage.removeItem(FormularioPublicoShowComponent.LS_SUBMITTER_EMAIL);
    } catch {
      /* private mode / quota */
    }
  }

  personLinkRequired(): boolean {
    return !!this.data?.person_link?.enabled;
  }

  personFormUnlocked(): boolean {
    return !this.personLinkRequired() || this.personGateOk;
  }

  /** Fluxo público usa gate por CPF antes de exibir o formulário. */
  personLinkUsesCpf(): boolean {
    return true;
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
      this.persistCpfGateAuthorization();
      return;
    }
    this.validandoPerson = true;
    this.formularioService.validatePerson(this.token, { cpf }).subscribe({
      next: (r) => {
        this.validandoPerson = false;
        this.personGateOk = true;
        this.personValidatedName = r.name;
        this.persistCpfGateAuthorization();
        this.applyPersonPrefill(r.prefill, r.name);
      },
      error: (err) => {
        this.validandoPerson = false;
        const msg = err.error?.errors ? Object.values(err.error.errors).flat().join(' ') : err.error?.message;
        this.personGateErro = msg ?? 'CPF não autorizado para este formulário.';
      },
    });
  }

  private normalizeText(value: string): string {
    return value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, ' ')
      .trim();
  }

  private resolvePersonPrefillValue(
    key: string,
    prefill: PersonPrefill
  ): string | number | boolean | null {
    const normalizedKey = this.normalizeText(key).replace(/\s+/g, '_');
    const direct = (prefill as Record<string, unknown>)[normalizedKey];
    if (direct !== undefined && direct !== null && String(direct).trim() !== '') {
      return direct as string | number | boolean;
    }

    for (const [prefillKey, aliases] of Object.entries(FormularioPublicoShowComponent.PERSON_PREFILL_KEY_ALIASES)) {
      const matched = aliases.some((alias) => normalizedKey.includes(this.normalizeText(alias).replace(/\s+/g, '_')));
      if (!matched) continue;
      const value = (prefill as Record<string, unknown>)[prefillKey];
      if (value !== undefined && value !== null && String(value).trim() !== '') {
        return value as string | number | boolean;
      }
    }

    return null;
  }

  private applyPersonPrefill(
    prefill: PersonPrefill | undefined,
    validatedName?: string
  ): void {
    if (!this.data) return;

    this.data.fields.forEach((field) => {
      const fieldKey = field.name_key;
      const currentValue = this.valores[fieldKey];
      if (String(currentValue ?? '').trim() !== '') return;

      const byNameKey = prefill ? this.resolvePersonPrefillValue(fieldKey, prefill) : null;
      const byLabel = prefill ? this.resolvePersonPrefillValue(field.label, prefill) : null;
      const nextValue = byNameKey ?? byLabel;
      if (nextValue === null || nextValue === undefined) return;

      if (this.fieldType(field) === 'number') {
        const n = Number(nextValue);
        if (!Number.isNaN(n)) this.valores[fieldKey] = n;
        return;
      }

      this.valores[fieldKey] = String(nextValue);
    });

    // Ao localizar pessoa no backend, não reaproveita localStorage:
    // usa os dados do backend (ou vazio quando não houver dado).
    const backendName = prefill?.name && String(prefill.name).trim() ? String(prefill.name).trim() : '';
    const backendEmail = prefill?.email && String(prefill.email).trim() ? String(prefill.email).trim() : '';
    const fallbackValidatedName = validatedName && String(validatedName).trim() ? String(validatedName).trim() : '';
    this.submitterName = backendName || fallbackValidatedName;
    this.submitterEmail = backendEmail;
    this.persistSubmitterIdentity();
  }

  signingSecurityReinforced(): boolean {
    return (this.data?.signing_security_level ?? 'basic') === 'reinforced';
  }

  templateHasSignatureFields(): boolean {
    return !!this.data?.fields.some((f) => this.fieldType(f) === 'signature');
  }

  hasFilledSignatures(): boolean {
    if (!this.data) return false;
    return this.data.fields.some(
      (f) => this.fieldType(f) === 'signature' && typeof this.valores[f.name_key] === 'string' && String(this.valores[f.name_key]).length > 80
    );
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
        next: (r) => {
          this.otpSending = false;
          this.toast.success('Código enviado', r.message);
          this.otpVerified = false;
        },
        error: (err) => {
          this.otpSending = false;
          this.otpErro = err.error?.message ?? 'Não foi possível enviar o código.';
        },
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
      next: (r) => {
        this.otpSending = false;
        this.toast.success('Código enviado', r.message);
        this.otpVerified = false;
      },
      error: (err) => {
        this.otpSending = false;
        this.otpErro = err.error?.message ?? 'Não foi possível enviar o código.';
      },
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
    if (this.otpChannel === 'email') {
      const em = this.submitterEmail.trim();
      this.formularioService.verifyOtp(this.token, { channel: 'email', email: em, code }).subscribe({
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
      return;
    }
    this.formularioService.verifyOtp(this.token, { channel: 'whatsapp', phone: this.otpPhone.trim(), code }).subscribe({
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
    if (!this.data || this.enviando) return;
    if (!this.personFormUnlocked()) return;
    if (this.ngForm && !this.ngForm.valid) {
      this.toast.warning('Campos obrigatórios', 'Preencha ou corrija os campos marcados com * antes de enviar.');
      return;
    }
    if (this.templateHasSignatureFields() && this.hasFilledSignatures() && !this.acceptTerms) {
      this.toast.warning('Termo de ciência', 'Marque a caixa confirmando que leu o aviso antes de assinar e enviar.');
      return;
    }
    if (
      this.signingSecurityReinforced() &&
      this.templateHasSignatureFields() &&
      this.hasFilledSignatures() &&
      !this.otpVerified
    ) {
      this.toast.warning('Verificação', 'Envie e confirme o código OTP (e-mail ou WhatsApp) antes de enviar o formulário.');
      return;
    }
    this.enviando = true;
    this.erro = '';
    const normalized = Object.fromEntries(
      Object.entries(this.valores).map(([k, v]) => [
        k,
        v instanceof Date ? v.toISOString().slice(0, 10) : v,
      ])
    );
    const signatures = this.data.fields
      .filter((f) => this.fieldType(f) === 'signature')
      .reduce<Record<string, string>>((acc, f) => {
        const value = normalized[f.name_key];
        if (typeof value === 'string' && value.trim().length > 0) {
          acc[f.name_key] = value;
        }
        return acc;
      }, {});
    const payload: Record<string, unknown> = {
      _submitter_name: this.submitterName || undefined,
      _submitter_email: this.submitterEmail || undefined,
      ...normalized,
    };
    if (Object.keys(signatures).length > 0) {
      payload['_signature'] = signatures;
    }
    if (this.templateHasSignatureFields() && this.hasFilledSignatures()) {
      payload['_accept_terms'] = true;
      payload['_accepted_text_at'] = new Date().toISOString();
    }
    if (this.signingSecurityReinforced() && this.templateHasSignatureFields() && this.hasFilledSignatures()) {
      payload['_otp_channel'] = this.otpChannel;
      if (this.otpChannel === 'whatsapp') {
        payload['_otp_recipient'] = this.otpPhone.trim();
      }
    }
    if (this.personCpfDigits) {
      payload['_person_cpf'] = this.personCpfDigits;
    }
    this.formularioService.submit(this.token, payload).subscribe({
      next: (r) => {
        this.enviando = false;
        if (this.kioskMode) {
          this.toast.success('Enviado', `Protocolo ${r.protocol_number ?? ''} registrado.`);
          this.clearCpfGateAuthorization();
          this.personGateOk = false;
          this.personCpfDigits = '';
          this.personCpfDisplay = '';
          this.acceptTerms = false;
          this.otpVerified = false;
          this.otpCode = '';
          if (this.data) {
            this.data.fields.forEach((f) => {
              const ft = this.fieldType(f);
              if (ft === 'checkbox') this.valores[f.name_key] = false;
              else this.valores[f.name_key] = '';
            });
          }
          return;
        }
        this.clearCpfGateAuthorization();
        this.persistSubmitterIdentity();
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

  feegowMeta(): FormularioPublicoFeegowMeta | null {
    return this.data?.feegow ?? null;
  }

  private initFeegowValues(): void {
    const defaults: Record<string, string> = {
      feegow_paciente_id: '',
      feegow_profissional_id: '',
      feegow_especialidade_id: '',
      feegow_procedimento_id: '',
      feegow_local_id: '',
      feegow_convenio_id: '',
      feegow_canal_id: '',
      feegow_data: '',
      feegow_horario: '',
      feegow_notas: '',
      feegow_celular: '',
      feegow_telefone: '',
      feegow_email: '',
    };
    Object.entries(defaults).forEach(([key, value]) => {
      if (!(key in this.valores)) this.valores[key] = value;
    });
  }

  optionsFromList(list: FeegowSimpleOption[] | undefined, labelKeys: string[], idKeys: string[] = ['id']): { value: string; label: string }[] {
    if (!Array.isArray(list)) return [];
    return list
      .map((item) => {
        const value =
          idKeys.map((k) => item[k]).find((v) => v !== null && v !== undefined && String(v).trim() !== '') ?? null;
        const label = labelKeys
          .map((k) => item[k])
          .find((v) => typeof v === 'string' && v.trim().length > 0) as string | undefined;
        if (value === null || value === undefined) return null;
        return { value: String(value), label: label ?? `ID ${String(value)}` };
      })
      .filter((v): v is { value: string; label: string } => v !== null);
  }

  feegowSpecialtiesOptions(): { value: string; label: string }[] {
    return this.optionsFromList(this.feegowMeta()?.specialties, ['nome', 'name'], ['especialidade_id', 'id']);
  }

  feegowInsurancesOptions(): { value: string; label: string }[] {
    return this.optionsFromList(this.feegowMeta()?.insurances, ['nome', 'convenio', 'name'], ['convenio_id', 'id']);
  }

  feegowLocalsOptions(): { value: string; label: string }[] {
    return this.optionsFromList(this.feegowMeta()?.locals, ['local', 'nome', 'name'], ['id', 'local_id']);
  }

  feegowChannelsOptions(): { value: string; label: string }[] {
    return this.optionsFromList(this.feegowMeta()?.channels, ['canal', 'nome', 'name'], ['id', 'canal_id']);
  }

  feegowProceduresOptions(): { value: string; label: string }[] {
    return this.optionsFromList(this.feegowMeta()?.procedures, ['procedimento', 'nome', 'name'], ['procedimento_id', 'id']);
  }

  feegowProfessionalsOptions(): { value: string; label: string }[] {
    const fromMeta = this.optionsFromList(
      this.feegowMeta()?.professionals,
      ['nome', 'name'],
      ['profissional_id', 'id', 'sys_user']
    );
    const merged = new Map<string, { value: string; label: string }>();
    [...fromMeta, ...this.feegowProfissionaisDisponiveis].forEach((opt) => merged.set(opt.value, opt));
    return Array.from(merged.values());
  }

  hasFeegowProcedureOptions(): boolean {
    return this.feegowProceduresOptions().length > 0;
  }

  hasFeegowProfessionalOptions(): boolean {
    return this.feegowProfessionalsOptions().length > 0;
  }

  onFeegowProfissionalChange(): void {
    const selected = String(this.valores['feegow_profissional_id'] || '');
    if (selected && this.feegowHorasPorProfissional[selected]?.length) {
      this.feegowHorariosDisponiveis = this.feegowHorasPorProfissional[selected];
      const current = String(this.valores['feegow_horario'] || '');
      if (current && !this.feegowHorariosDisponiveis.includes(current)) {
        this.valores['feegow_horario'] = '';
      }
      return;
    }
    const all = Array.from(new Set(Object.values(this.feegowHorasPorProfissional).flat())).sort();
    if (all.length > 0) {
      this.feegowHorariosDisponiveis = all;
    }
  }

  consultarDisponibilidadeFeegow(): void {
    if (!this.feegowEnabled() || !this.data) return;

    const especialidadeId = Number(this.valores['feegow_especialidade_id'] || 0);
    const procedimentoId = Number(this.valores['feegow_procedimento_id'] || 0);
    const dataRaw = String(this.valores['feegow_data'] || '');
    if (!especialidadeId || !procedimentoId || !dataRaw) {
      this.feegowDisponibilidadeErro = 'Informe especialidade, procedimento e data para consultar horários.';
      return;
    }

    this.feegowBuscandoDisponibilidade = true;
    this.feegowDisponibilidadeErro = '';
    this.feegowHorariosDisponiveis = [];

    const [yyyy, mm, dd] = dataRaw.split('-');
    const dateBr = yyyy && mm && dd ? `${dd}-${mm}-${yyyy}` : '';
    this.formularioService
      .getFeegowDisponibilidade(this.token, {
        tipo: 'P',
        procedimento_id: procedimentoId,
        especialidade_id: especialidadeId,
        data_start: dateBr,
        data_end: dateBr,
        convenio_id: this.valores['feegow_convenio_id'] ? Number(this.valores['feegow_convenio_id']) : undefined,
      })
      .subscribe({
        next: (resp) => {
          this.feegowBuscandoDisponibilidade = false;
          const availability = this.extractAvailabilityByProfessional(resp.schedule);
          this.feegowHorasPorProfissional = availability.hoursByProfessional;
          this.feegowProfissionaisDisponiveis = availability.professionals;
          this.feegowHorariosDisponiveis = availability.allHours;
          this.onFeegowProfissionalChange();
          if (this.feegowHorariosDisponiveis.length === 0) {
            this.feegowDisponibilidadeErro = 'Nenhum horário disponível para os filtros informados.';
          }
        },
        error: (err) => {
          this.feegowBuscandoDisponibilidade = false;
          this.feegowDisponibilidadeErro = err?.error?.message ?? 'Não foi possível consultar a disponibilidade.';
        },
      });
  }

  private extractScheduleHours(input: unknown): string[] {
    const out: string[] = [];
    const walk = (v: unknown): void => {
      if (Array.isArray(v)) {
        v.forEach(walk);
        return;
      }
      if (v && typeof v === 'object') {
        Object.values(v as Record<string, unknown>).forEach(walk);
        return;
      }
      if (typeof v === 'string' && /^\d{2}:\d{2}(:\d{2})?$/.test(v.trim())) {
        out.push(v.trim().length === 5 ? `${v.trim()}:00` : v.trim());
      }
    };
    walk(input);
    return out.sort();
  }

  private extractAvailabilityByProfessional(input: unknown): {
    professionals: { value: string; label: string }[];
    hoursByProfessional: Record<string, string[]>;
    allHours: string[];
  } {
    const hoursByProfessional: Record<string, string[]> = {};
    const root = input && typeof input === 'object' ? (input as Record<string, unknown>) : null;
    const byProfessional =
      root && root['profissional_id'] && typeof root['profissional_id'] === 'object'
        ? (root['profissional_id'] as Record<string, unknown>)
        : null;

    if (!byProfessional) {
      const fallbackHours = this.extractScheduleHours(input);
      return { professionals: [], hoursByProfessional: {}, allHours: fallbackHours };
    }

    const professionals: { value: string; label: string }[] = [];
    Object.entries(byProfessional).forEach(([profId, data]) => {
      const hours = Array.from(new Set(this.extractScheduleHours(data))).sort();
      if (hours.length > 0) {
        hoursByProfessional[profId] = hours;
        professionals.push({ value: profId, label: `Profissional ${profId}` });
      }
    });

    const allHours = Array.from(new Set(Object.values(hoursByProfessional).flat())).sort();
    return { professionals, hoursByProfessional, allHours };
  }

  trackByKey(_index: number, f: FormularioPublicoField): string {
    return f.name_key;
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

  /** Campos obrigatórios (para barra de progresso). */
  get requiredFieldsTotal(): number {
    return this.data?.fields.filter((f) => f.required).length ?? 0;
  }

  get requiredFieldsFilled(): number {
    if (!this.data) return 0;
    return this.data.fields.filter((f) => f.required && this.isFieldFilled(f)).length;
  }

  get progressPercent(): number {
    const t = this.requiredFieldsTotal;
    if (t <= 0) return 100;
    return Math.round((this.requiredFieldsFilled / t) * 100);
  }

  isFieldFilled(f: FormularioPublicoField): boolean {
    const v = this.valores[f.name_key];
    const t = this.fieldType(f);
    switch (t) {
      case 'checkbox':
        return v === true;
      case 'number':
        if (v === '' || v === null || v === undefined) return false;
        return !Number.isNaN(Number(v));
      case 'date':
        return v instanceof Date || (typeof v === 'string' && v.trim().length > 0);
      case 'signature':
        return typeof v === 'string' && v.length > 80;
      case 'file':
        return typeof v === 'string' && v.startsWith('data:') && v.length > 64;
      case 'select':
      case 'radio':
        return typeof v === 'string' && v.trim().length > 0;
      default:
        return String(v ?? '').trim().length > 0;
    }
  }

  /** Usa traço escuro para manter legibilidade da assinatura no protocolo/PDF. */
  private signatureStrokeColor(): string {
    return '#0a0a0a';
  }

  /** Inicia desenho da assinatura no canvas. */
  startSignature(e: MouseEvent | TouchEvent, key: string): void {
    e.preventDefault();
    const canvas = this.getSignatureCanvas(key);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.strokeStyle = this.signatureStrokeColor();
    ctx.lineWidth = 2.2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    const pos = this.getSignaturePoint(e, canvas);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    (canvas as unknown as { _signing: boolean })._signing = true;
  }

  /** Desenha na assinatura. */
  moveSignature(e: MouseEvent | TouchEvent, key: string): void {
    e.preventDefault();
    const canvas = this.getSignatureCanvas(key);
    if (!canvas || !(canvas as unknown as { _signing?: boolean })._signing) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.strokeStyle = this.signatureStrokeColor();
    ctx.lineWidth = 2.2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    const pos = this.getSignaturePoint(e, canvas);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  }

  /** Finaliza traço da assinatura e atualiza o valor (base64). */
  endSignature(key: string): void {
    const canvas = this.getSignatureCanvas(key);
    if (canvas) {
      (canvas as unknown as { _signing: boolean })._signing = false;
      this.valores[key] = canvas.toDataURL('image/png');
    }
  }

  /** Obtém canvas da assinatura pelo name_key. */
  private getSignatureCanvas(key: string): HTMLCanvasElement | null {
    return typeof document !== 'undefined' ? document.getElementById('signature_' + key) as HTMLCanvasElement | null : null;
  }

  private getSignaturePoint(e: MouseEvent | TouchEvent, canvas: HTMLCanvasElement): { x: number; y: number } {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    if (e instanceof TouchEvent && e.touches.length) {
      return { x: (e.touches[0].clientX - rect.left) * scaleX, y: (e.touches[0].clientY - rect.top) * scaleY };
    }
    const me = e as MouseEvent;
    return { x: (me.clientX - rect.left) * scaleX, y: (me.clientY - rect.top) * scaleY };
  }

  private static readonly FILE_MAX_BYTES = 15 * 1024 * 1024;

  onFileSelected(event: Event, key: string): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) {
      this.valores[key] = '';
      return;
    }
    if (file.size > FormularioPublicoShowComponent.FILE_MAX_BYTES) {
      this.toast.error('Arquivo grande demais', 'Escolha um arquivo de até 15 MB.');
      input.value = '';
      this.valores[key] = '';
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const r = reader.result;
      this.valores[key] = typeof r === 'string' ? r : '';
    };
    reader.onerror = () => {
      this.toast.error('Erro ao ler arquivo', 'Tente outro arquivo.');
      input.value = '';
      this.valores[key] = '';
    };
    reader.readAsDataURL(file);
  }

  clearFile(key: string): void {
    this.valores[key] = '';
    const el = typeof document !== 'undefined' ? (document.getElementById('field_' + key) as HTMLInputElement | null) : null;
    if (el?.type === 'file') el.value = '';
  }

  /** Limpa o canvas e atualiza o valor da assinatura. */
  clearSignature(key: string): void {
    const canvas = this.getSignatureCanvas(key);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    this.valores[key] = '';
  }

  ngOnDestroy(): void {
    this.publicPageBody.leavePublicPage();
    if (typeof document !== 'undefined' && document.body) {
      document.body.classList.remove('gestgo-public-dark');
    }
  }
}
