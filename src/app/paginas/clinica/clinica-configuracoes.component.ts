import { Component, OnInit, OnDestroy, inject, Signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FlatpickrDirective, provideFlatpickrDefaults } from 'angularx-flatpickr';
import { Portuguese } from 'flatpickr/dist/l10n/pt';
import { finalize } from 'rxjs';
import { isBillingBlockedError } from '../../core/utils/billing-blocked-error';
import {
  ClinicaService,
  ClinicaConfig,
  ClinicaOption,
  ClinicaAuditLog,
  ConfigPageData,
  BusinessHoursSlot,
  OrganizationAddressData,
} from '../../core/services/clinica.service';
import { ViaCepService } from '../../core/services/via-cep.service';
import { LoadingService } from '../../shared/services/loading.service';
import { ZmAssinaturaBloqueadaCardComponent } from '../../shared/components/ui/zm-assinatura-bloqueada-card/zm-assinatura-bloqueada-card.component';
import { ZmSkeletonListComponent } from '../../shared/components/skeletons';
import { ToastService } from '../../core/services/toast.service';
import { WhatsappEvolutionService, WhatsappEvolutionState } from '../../core/services/whatsapp-evolution.service';
import { ConfirmDialogService } from '../../core/services/confirm-dialog.service';
import { applyUserAppearanceToBrowser, normalizeThemeKey } from '../../core/services/user-appearance.sync';

const DAYS: { id: string; label: string }[] = [
  { id: '1', label: 'Segunda' },
  { id: '2', label: 'Terça' },
  { id: '3', label: 'Quarta' },
  { id: '4', label: 'Quinta' },
  { id: '5', label: 'Sexta' },
  { id: '6', label: 'Sábado' },
  { id: '7', label: 'Domingo' },
];

const UI_TO_API_DAY_MAP: Record<string, string> = {
  '1': '0',
  '2': '1',
  '3': '2',
  '4': '3',
  '5': '4',
  '6': '5',
  '7': '6',
};

const API_TO_UI_DAY_MAP: Record<string, string> = {
  '0': '1',
  '1': '2',
  '2': '3',
  '3': '4',
  '4': '5',
  '5': '6',
  '6': '7',
};

const TEMA_LABEL_PT_MAP: Record<string, string> = {
  'gestgo-blue': 'Azul Gestgo',
  'ocean-blue': 'Azul oceano',
  'indigo-night': 'Anil',
  'emerald-fresh': 'Esmeralda',
  'rose-elegant': 'Rosa',
  'amber-warm': 'Âmbar',
  'violet-dream': 'Violeta',
  'teal-ocean': 'Verde-água',
  'slate-pro': 'Ardósia',
  'cyan-tech': 'Ciano',
  'fuchsia-bold': 'Magenta',
};

@Component({
  selector: 'app-clinica-configuracoes',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    ZmSkeletonListComponent,
    ZmAssinaturaBloqueadaCardComponent,
    FlatpickrDirective,
  ],
  providers: [
    provideFlatpickrDefaults({
      locale: Portuguese,
      static: true,
      allowInput: true,
      disableMobile: true,
    }),
  ],
  templateUrl: './clinica-configuracoes.component.html',
  styleUrl: './clinica-configuracoes.component.css',
})
export class ClinicaConfiguracoesComponent implements OnInit, OnDestroy {
  pageData: ConfigPageData | null = null;
  form: Partial<ClinicaConfig> & {
    business_hours?: Record<string, { open: string; close: string }>;
  } = {};
  showSkeleton!: Signal<boolean>;
  themeMode: 'light' | 'dark' | 'auto' = 'light';
  private _sysDarkMql: MediaQueryList | null = null;
  private _sysListener = () => this._applyAutoTheme();
  listaPronta = false;
  salvando = false;
  erro = '';
  sucesso = false;
  activeTab = 'dados';
  logoFile: File | null = null;
  readonly days = DAYS;

  novaEmpresaNome = '';
  salvandoNovaEmpresa = false;
  erroNovaEmpresa = '';

  // Logs
  logs: ClinicaAuditLog[] = [];
  logsLoading = false;
  logsLoaded = false;
  logsError = '';
  /** API retornou 403 billing_blocked — assinatura/pagamento pendente. */
  logsErroCobranca = false;
  logsPage = 1;
  logsLastPage = 1;
  logsTotal = 0;

  /** Aba WhatsApp (Evolution Go) */
  waState: WhatsappEvolutionState | null = null;
  waLoading = false;
  waError = '';
  waCriandoInstancia = false;
  waTokenExibicaoUnica: string | null = null;
  waPhoneConectar = '';
  waWebhookUrl = '';
  waConectando = false;
  waQrSrc: string | null = null;
  waQrLinkCode: string | null = null;
  waQrCarregando = false;
  waPhonePair = '';
  waPairCarregando = false;
  waPairingCode: string | null = null;
  waDesconectando = false;
  waRemovendo = false;
  waTestPhone = '';
  waTestText = '';
  waTestEnviando = false;
  enderecoForm = {
    cep: '',
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    uf: '',
  };
  enderecoLoading = false;
  enderecoErro = '';
  enderecoSucesso = false;

  private route = inject(ActivatedRoute);
  private clinicaService = inject(ClinicaService);
  private viaCepService = inject(ViaCepService);
  private loadingService = inject(LoadingService);
  private toast = inject(ToastService);
  private waService = inject(WhatsappEvolutionService);
  private confirm = inject(ConfirmDialogService);

  get clinic(): ClinicaConfig | undefined {
    return this.pageData?.organization ?? this.pageData?.clinic;
  }

  get availableThemes(): Record<string, { label?: string; primary?: string }> {
    return this.pageData?.available_themes ?? {};
  }

  get canAddMultiEmpresa(): boolean {
    return !!this.pageData?.can_add_multi_empresa;
  }

  get tenantClinics(): ClinicaOption[] {
    return this.pageData?.tenant_organizations ?? this.pageData?.tenant_clinics ?? [];
  }

  get showStickyFooter(): boolean {
    return this.activeTab !== 'empresas' && this.activeTab !== 'logs' && this.activeTab !== 'whatsapp';
  }

  /** Footer fixo na aba WhatsApp (mesmo padrão visual das outras abas com ações). */
  get showWhatsappStickyFooter(): boolean {
    return this.activeTab === 'whatsapp' && this.listaPronta && !!this.pageData;
  }

  get waPodeEnviarTesteNoFooter(): boolean {
    return this.waTestPhone.replace(/\D/g, '').length >= 10;
  }

  get themeKeys(): string[] {
    return Object.keys(this.availableThemes);
  }

  getThemeLabel(themeKey: string): string {
    const canonicalThemeKey = normalizeThemeKey(themeKey);
    return TEMA_LABEL_PT_MAP[canonicalThemeKey] ?? this.availableThemes[themeKey]?.label ?? themeKey;
  }

  onThemeChanged(value: string): void {
    const canonicalThemeKey = normalizeThemeKey(value);
    this.form.theme = canonicalThemeKey;
    applyUserAppearanceToBrowser({ ui_theme: canonicalThemeKey });
  }

  onThemeModeChanged(mode: 'light' | 'dark' | 'auto'): void {
    this.themeMode = mode;
    if (mode === 'auto') {
      this._sysDarkMql = window.matchMedia('(prefers-color-scheme: dark)');
      this._sysDarkMql.addEventListener('change', this._sysListener);
      this._applyAutoTheme();
    } else {
      this._removeSysListener();
      const dark = mode === 'dark';
      this.form.dark_mode = dark;
      applyUserAppearanceToBrowser({ ui_dark_mode: dark });
    }
  }

  private _applyAutoTheme(): void {
    const dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.form.dark_mode = dark;
    applyUserAppearanceToBrowser({ ui_dark_mode: dark });
  }

  private _removeSysListener(): void {
    this._sysDarkMql?.removeEventListener('change', this._sysListener);
    this._sysDarkMql = null;
  }

  onDarkModeChanged(value: boolean): void {
    this.form.dark_mode = value;
    applyUserAppearanceToBrowser({ ui_dark_mode: value });
  }

  ngOnDestroy(): void {
    this._removeSysListener();
  }

  private traduzirAcao(action?: string | null): string {
    if (!action) return '';
    const map: Record<string, string> = {
      'clinic.created': 'Empresa criada',
      'clinic.updated': 'Empresa atualizada',
      'user.created': 'Usuário criado',
      'user.deactivated': 'Usuário desativado',
      'template.created': 'Modelo criado',
      'template.updated': 'Modelo atualizado',
      'template.deleted': 'Modelo excluído',
      'submission.created': 'Protocolo criado',
      'submission.reviewed': 'Protocolo revisado',
      'submission.comment': 'Comentário em protocolo',
    };
    if (map[action]) return map[action];
    return action.replace(/\./g, ' ');
  }

  private traduzirEntidade(entityType?: string | null): string {
    if (!entityType) return '';
    const basename = entityType.split('\\').pop() ?? entityType;
    const map: Record<string, string> = {
      FormSubmission: 'Protocolo',
      User: 'Usuário',
      FormTemplate: 'Modelo de formulário',
      Clinic: 'Empresa',
      Organization: 'Empresa',
    };
    return map[basename] ?? basename;
  }

  ngOnInit(): void {
    const rawTab = this.route.snapshot.queryParamMap.get('tab');
    const tabQ = rawTab === 'assinatura' ? null : rawTab;
    const pageQuery = tabQ ? { tab: tabQ } : undefined;
    const { data$, showSkeleton } = this.loadingService.loadWithThreshold(this.clinicaService.getConfiguracoesPage(pageQuery));
    this.showSkeleton = showSkeleton;
    data$.subscribe({
      next: (data) => {
        this.listaPronta = true;
        this.pageData = data;
        let tab = data.active_config_tab ?? 'dados';
        if (tab === 'assinatura') tab = 'dados';
        this.activeTab = tab;
        this.patchFormFromClinic(data.organization ?? data.clinic!);
      },
      error: () => {
        this.listaPronta = true;
        this.erro = 'Não foi possível carregar as configurações.';
      },
    });
  }

  private patchFormFromClinic(c: ClinicaConfig): void {
    const bh = (c.business_hours ?? {}) as Record<string, BusinessHoursSlot>;
    const normalizedBusinessHours = this.normalizeBusinessHoursFromApi(bh);
    const businessHours: Record<string, { open: string; close: string }> = {};
    DAYS.forEach((d) => {
      const slot = normalizedBusinessHours[d.id];
      businessHours[d.id] = {
        open: (slot?.open as string) ?? '',
        close: (slot?.close as string) ?? '',
      };
    });
    this.form = {
      name: c.name ?? '',
      notification_email: c.notification_email ?? '',
      contact_email: c.contact_email ?? '',
      phone: this.maskPhone(c.phone ?? ''),
      address: c.address ?? '',
      billing_name: c.billing_name ?? '',
      billing_email: c.billing_email ?? '',
      billing_document: this.maskBillingDocument(c.billing_document ?? ''),
      business_hours: businessHours,
      whatsapp_notifications_enabled: c.whatsapp_notifications_enabled ?? false,
      whatsapp_notify_cobranca: c.whatsapp_notify_cobranca ?? true,
      whatsapp_notify_faturas_boleto: c.whatsapp_notify_faturas_boleto ?? true,
      whatsapp_notify_avisos: c.whatsapp_notify_avisos ?? true,
      theme: c.theme ?? 'ocean-blue',
      dark_mode: c.dark_mode ?? false,
    };
    this.themeMode = (c.dark_mode ?? false) ? 'dark' : 'light';
    if (c.address_data) {
      this.patchEnderecoFromAddressData(c.address_data);
    } else {
      this.patchEnderecoFromAddress(c.address ?? '');
    }
  }

  private patchEnderecoFromAddressData(addressData: OrganizationAddressData): void {
    this.enderecoErro = '';
    this.enderecoSucesso = false;
    this.enderecoForm = {
      cep: this.maskCep(addressData.cep ?? ''),
      logradouro: (addressData.logradouro ?? '').trim(),
      numero: (addressData.numero ?? '').trim(),
      complemento: (addressData.complemento ?? '').trim(),
      bairro: (addressData.bairro ?? '').trim(),
      cidade: (addressData.cidade ?? '').trim(),
      uf: (addressData.uf ?? '').trim().toUpperCase(),
    };
  }

  private patchEnderecoFromAddress(address: string): void {
    const value = (address ?? '').trim();
    this.enderecoErro = '';
    this.enderecoSucesso = false;
    if (!value) {
      this.enderecoForm = {
        cep: '',
        logradouro: '',
        numero: '',
        complemento: '',
        bairro: '',
        cidade: '',
        uf: '',
      };
      return;
    }
    const parts = value.split(' - ').map((part) => part.trim()).filter(Boolean);
    this.enderecoForm = {
      cep: '',
      logradouro: parts[0] ?? value,
      numero: '',
      complemento: '',
      bairro: parts[1] ?? '',
      cidade: parts[2] ?? '',
      uf: parts[3] ?? '',
    };
  }

  onCepInput(value: string): void {
    this.enderecoForm.cep = this.maskCep(value);
    if (this.enderecoErro) this.enderecoErro = '';
    this.enderecoSucesso = false;
  }

  onPhoneInput(value: string): void {
    this.form.phone = this.maskPhone(value);
  }

  onBillingDocumentInput(value: string): void {
    this.form.billing_document = this.maskBillingDocument(value);
  }

  private maskCep(value: string): string {
    const digits = value.replace(/\D/g, '').slice(0, 8);
    return digits.length > 5 ? `${digits.slice(0, 5)}-${digits.slice(5)}` : digits;
  }

  private maskPhone(value: string): string {
    const digits = value.replace(/\D/g, '').slice(0, 11);
    if (digits.length <= 2) return digits ? `(${digits}` : '';
    if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  }

  private maskBillingDocument(value: string): string {
    const digits = value.replace(/\D/g, '').slice(0, 14);
    if (digits.length <= 11) {
      if (digits.length <= 3) return digits;
      if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`;
      if (digits.length <= 9) return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
      return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`;
    }
    if (digits.length <= 2) return digits;
    if (digits.length <= 5) return `${digits.slice(0, 2)}.${digits.slice(2)}`;
    if (digits.length <= 8) return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5)}`;
    if (digits.length <= 12) return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8)}`;
    return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8, 12)}-${digits.slice(12)}`;
  }

  buscarEnderecoPorCep(): void {
    const cep = this.enderecoForm.cep.replace(/\D/g, '');
    this.enderecoErro = '';
    this.enderecoSucesso = false;
    if (!cep) return;
    if (cep.length !== 8) {
      this.enderecoErro = 'CEP inválido. Informe 8 dígitos.';
      return;
    }
    if (this.enderecoLoading) return;
    this.enderecoLoading = true;
    this.viaCepService
      .consultarCep(cep)
      .pipe(finalize(() => (this.enderecoLoading = false)))
      .subscribe({
        next: (res) => {
          if (res.erro) {
            this.enderecoErro = 'CEP não encontrado.';
            return;
          }
          this.enderecoForm = {
            ...this.enderecoForm,
            cep: res.cep ?? this.enderecoForm.cep,
            logradouro: res.logradouro ?? this.enderecoForm.logradouro,
            bairro: res.bairro ?? this.enderecoForm.bairro,
            cidade: res.localidade ?? this.enderecoForm.cidade,
            uf: res.uf ?? this.enderecoForm.uf,
          };
          this.enderecoSucesso = true;
        },
        error: () => {
          this.enderecoErro = 'Não foi possível consultar o CEP no momento.';
        },
      });
  }

  private mountAddressFromEndereco(): string {
    const cep = this.enderecoForm.cep.trim();
    const logradouro = this.enderecoForm.logradouro.trim();
    const numero = this.enderecoForm.numero.trim();
    const complemento = this.enderecoForm.complemento.trim();
    const bairro = this.enderecoForm.bairro.trim();
    const cidade = this.enderecoForm.cidade.trim();
    const uf = this.enderecoForm.uf.trim().toUpperCase();
    const logradouroNumero = [logradouro, numero].filter(Boolean).join(', ');
    const local = [bairro, cidade, uf].filter(Boolean).join(' - ');
    const base = [logradouroNumero, complemento, local].filter(Boolean).join(' - ');
    return [base, cep].filter(Boolean).join(' - ');
  }

  private normalizeBusinessHoursFromApi(
    businessHours: Record<string, BusinessHoursSlot>
  ): Record<string, BusinessHoursSlot> {
    const normalized: Record<string, BusinessHoursSlot> = {};
    Object.entries(businessHours).forEach(([dayKey, slot]) => {
      const uiDayKey = API_TO_UI_DAY_MAP[dayKey] ?? dayKey;
      if (!uiDayKey || !slot) return;
      normalized[uiDayKey] = slot;
    });
    return normalized;
  }

  setTab(tab: string): void {
    this.activeTab = tab;
    if (tab === 'logs') {
      this.carregarLogs();
    }
    if (tab === 'whatsapp') {
      this.carregarWhatsapp();
    }
  }

  carregarWhatsapp(): void {
    this.waLoading = true;
    this.waError = '';
    this.waService.getState().subscribe({
      next: (s) => {
        this.waState = s;
        this.waLoading = false;
      },
      error: (err: unknown) => {
        this.waLoading = false;
        this.waError = this.mensagemErroWhatsapp(err);
      },
    });
  }

  criarInstanciaWhatsapp(): void {
    if (this.waCriandoInstancia) return;
    this.waCriandoInstancia = true;
    this.waError = '';
    this.waService
      .createInstance()
      .pipe(finalize(() => (this.waCriandoInstancia = false)))
      .subscribe({
        next: (res) => {
          this.waTokenExibicaoUnica = res.instance_token;
          this.toast.success('Instância criada', 'Guarde o token com segurança. Ele não será exibido de novo nesta tela.');
          this.carregarWhatsapp();
        },
        error: (err: unknown) => {
          this.waError = this.mensagemErroWhatsapp(err);
          this.toast.error('Erro', this.waError);
        },
      });
  }

  iniciarConexaoWhatsapp(): void {
    if (this.waConectando) return;
    this.waConectando = true;
    this.waError = '';
    const phone = this.waPhoneConectar.replace(/\D/g, '');
    const webhook = this.waWebhookUrl.trim();
    this.waService
      .connect({
        phone: phone || undefined,
        webhook_url: webhook || undefined,
      })
      .pipe(finalize(() => (this.waConectando = false)))
      .subscribe({
        next: () => {
          this.toast.success('Conexão iniciada', 'Obtenha o QR Code ou o código de pareamento abaixo.');
          this.carregarWhatsapp();
        },
        error: (err: unknown) => {
          this.waError = this.mensagemErroWhatsapp(err);
          this.toast.error('Erro', this.waError);
        },
      });
  }

  buscarQrWhatsapp(): void {
    if (this.waQrCarregando) return;
    this.waQrCarregando = true;
    this.waQrSrc = null;
    this.waQrLinkCode = null;
    this.waError = '';
    this.waService
      .getQr()
      .pipe(finalize(() => (this.waQrCarregando = false)))
      .subscribe({
        next: (d) => {
          this.waQrSrc = this.normalizarQrDataUrl(d.qrcode);
          this.waQrLinkCode = d.link_code ?? null;
          if (!this.waQrSrc && d.link_code) {
            this.toast.success('Código obtido', 'Use o código no WhatsApp se o QR não estiver disponível.');
          }
        },
        error: (err: unknown) => {
          this.waError = this.mensagemErroWhatsapp(err);
          this.toast.error('Erro', this.waError);
        },
      });
  }

  solicitarPairWhatsapp(): void {
    const phone = this.waPhonePair.replace(/\D/g, '');
    if (phone.length < 10) {
      this.toast.error('Número inválido', 'Informe DDI + DDD + número (ex.: 5511999999999).');
      return;
    }
    if (this.waPairCarregando) return;
    this.waPairCarregando = true;
    this.waPairingCode = null;
    this.waError = '';
    this.waService
      .requestPair(phone)
      .pipe(finalize(() => (this.waPairCarregando = false)))
      .subscribe({
        next: (r) => {
          this.waPairingCode = r.pairing_code;
          if (!r.pairing_code) {
            this.toast.success('Solicitação enviada', 'Verifique a resposta no servidor ou tente novamente.');
          }
        },
        error: (err: unknown) => {
          this.waError = this.mensagemErroWhatsapp(err);
          this.toast.error('Erro', this.waError);
        },
      });
  }

  async copiarTextoWhatsapp(text: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(text);
      this.toast.success('Copiado', 'Conteúdo copiado para a área de transferência.');
    } catch {
      this.toast.error('Não foi possível copiar', 'Copie manualmente.');
    }
  }

  desconectarWhatsapp(): void {
    if (this.waDesconectando) return;
    this.waDesconectando = true;
    this.waError = '';
    this.waService
      .disconnect()
      .pipe(finalize(() => (this.waDesconectando = false)))
      .subscribe({
        next: () => {
          this.waQrSrc = null;
          this.waPairingCode = null;
          this.toast.success('Desconectado', 'A sessão WhatsApp foi encerrada na Evolution Go.');
          this.carregarWhatsapp();
        },
        error: (err: unknown) => {
          this.waError = this.mensagemErroWhatsapp(err);
          this.toast.error('Erro', this.waError);
        },
      });
  }

  async removerIntegracaoWhatsapp(): Promise<void> {
    const ok = await this.confirm.request({
      title: 'Remover integração WhatsApp',
      messageBefore: 'A instância será excluída na Evolution Go e os dados de conexão desta empresa serão apagados.',
      variant: 'danger',
      confirmLabel: 'Remover',
    });
    if (!ok || this.waRemovendo) return;
    this.waRemovendo = true;
    this.waError = '';
    this.waService
      .destroyInstance()
      .pipe(finalize(() => (this.waRemovendo = false)))
      .subscribe({
        next: () => {
          this.waTokenExibicaoUnica = null;
          this.waQrSrc = null;
          this.waPairingCode = null;
          this.waState = null;
          this.toast.success('Removido', 'Integração WhatsApp removida.');
          this.carregarWhatsapp();
        },
        error: (err: unknown) => {
          this.waError = this.mensagemErroWhatsapp(err);
          this.toast.error('Erro', this.waError);
        },
      });
  }

  enviarTesteWhatsapp(): void {
    const phone = this.waTestPhone.replace(/\D/g, '');
    if (phone.length < 10) {
      this.toast.error('Número inválido', 'Informe o destino com DDI e DDD.');
      return;
    }
    if (this.waTestEnviando) return;
    this.waTestEnviando = true;
    this.waError = '';
    const text = this.waTestText.trim();
    this.waService
      .sendTest(phone, text || undefined)
      .pipe(finalize(() => (this.waTestEnviando = false)))
      .subscribe({
        next: () => this.toast.success('Enviado', 'Mensagem de teste enviada.'),
        error: (err: unknown) => {
          this.waError = this.mensagemErroWhatsapp(err);
          this.toast.error('Erro', this.waError);
        },
      });
  }

  private normalizarQrDataUrl(raw: string | null): string | null {
    if (!raw) return null;
    const t = raw.trim();
    if (t.startsWith('data:')) return t;
    return `data:image/png;base64,${t}`;
  }

  private mensagemErroWhatsapp(err: unknown): string {
    if (err instanceof HttpErrorResponse) {
      const b = err.error as { message?: string } | null;
      if (typeof b?.message === 'string' && b.message.trim()) return b.message.trim();
      if (err.status === 503) return 'Servidor Evolution Go não configurado. Contate o administrador.';
    }
    return 'Não foi possível concluir a operação. Tente novamente.';
  }

  /** Atualiza horário (abre/fecha) a partir da seleção do Flatpickr. */
  setTime(dayId: string, field: 'open' | 'close', dates: Date[]): void {
    if (!this.form.business_hours || !dates?.length) return;
    const d = dates[0];
    const h = d.getHours().toString().padStart(2, '0');
    const m = d.getMinutes().toString().padStart(2, '0');
    this.form.business_hours[dayId][field] = `${h}:${m}`;
  }

  carregarLogs(page = 1): void {
    this.logsLoading = true;
    this.logsError = '';
    this.logsErroCobranca = false;
    this.clinicaService.getClinicaLogs(page).subscribe({
      next: (res) => {
        this.logsLoading = false;
        this.logsLoaded = true;
        this.logsErroCobranca = false;
        this.logs = (res.data ?? []).map((log) => ({
          ...log,
          action: this.traduzirAcao(log.action),
          entity_type: this.traduzirEntidade(log.entity_type ?? undefined),
        }));
        this.logsPage = res.meta?.current_page ?? 1;
        this.logsLastPage = res.meta?.last_page ?? 1;
        this.logsTotal = res.meta?.total ?? this.logs.length;
      },
      error: (err: unknown) => {
        this.logsLoading = false;
        this.logsLoaded = true;
        if (isBillingBlockedError(err)) {
          this.logsErroCobranca = true;
          this.logsError = '';
          return;
        }
        this.logsErroCobranca = false;
        const http = err instanceof HttpErrorResponse ? err : null;
        const apiMsg = (http?.error as { message?: string } | null)?.message;
        this.logsError =
          typeof apiMsg === 'string' && apiMsg.trim()
            ? apiMsg.trim()
            : 'Não foi possível carregar os logs. Tente novamente em instantes.';
      },
    });
  }

  isScheduleActive(dayId: string): boolean {
    const slot = this.form.business_hours?.[dayId];
    return !!(slot && (slot.open || slot.close));
  }

  toggleScheduleDay(dayId: string, checked: boolean): void {
    if (!this.form.business_hours) this.form.business_hours = {};
    if (checked) {
      this.form.business_hours[dayId] = { open: '08:00', close: '18:00' };
    } else {
      this.form.business_hours[dayId] = { open: '', close: '' };
    }
  }

  copyFirstDayToAll(): void {
    const first = this.form.business_hours?.['1'];
    if (!first) return;
    const open = first.open || '08:00';
    const close = first.close || '18:00';
    DAYS.forEach((d) => {
      if (d.id === '1') return;
      if (!this.form.business_hours) this.form.business_hours = {};
      this.form.business_hours[d.id] = { open, close };
    });
  }

  onLogoChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.logoFile = input.files?.[0] ?? null;
  }

  criarNovaEmpresa(): void {
    const nome = this.novaEmpresaNome.trim();
    if (!nome || this.salvandoNovaEmpresa) return;
    this.erroNovaEmpresa = '';
    this.salvandoNovaEmpresa = true;
    this.clinicaService
      .createClinicInTenant(nome)
      .pipe(finalize(() => (this.salvandoNovaEmpresa = false)))
      .subscribe({
        next: (data) => {
          this.pageData = data;
          this.novaEmpresaNome = '';
          this.patchFormFromClinic(data.organization ?? data.clinic!);
          this.toast.success('Empresa criada', 'A nova empresa foi adicionada ao grupo. Você pode trocar para ela em "Escolher empresa".');
        },
        error: (err: unknown) => {
          const msg = this.mensagemErroApi(err);
          this.erroNovaEmpresa = msg;
          this.toast.error('Não foi possível criar', msg);
        },
      });
  }

  private mensagemErroApi(err: unknown): string {
    if (err instanceof HttpErrorResponse) {
      const b = err.error as { message?: string; errors?: Record<string, string[]> } | null;
      if (b?.errors) {
        const first = Object.values(b.errors)[0];
        if (Array.isArray(first) && first[0]) return String(first[0]);
      }
      if (typeof b?.message === 'string' && b.message.trim()) return b.message;
      if (err.status === 404) return 'Endpoint não encontrado. Confirme no backend a rota POST /api/v1/clinica/clinics.';
    }
    return 'Não foi possível criar a empresa.';
  }

  salvar(): void {
    this.salvando = true;
    this.erro = '';
    this.sucesso = false;
    const bh = this.form.business_hours ?? {};
    const cleaned: Record<string, { open: string; close: string }> = {};
    Object.entries(bh).forEach(([d, slot]) => {
      const open = (slot?.open ?? '').trim();
      const close = (slot?.close ?? '').trim();
      if (open && close) cleaned[d] = { open, close };
    });
    const payload: Record<string, unknown> = {
      name: this.form.name,
      notification_email: this.form.notification_email ?? null,
      contact_email: this.form.contact_email ?? null,
      phone: this.form.phone ?? null,
      address: this.mountAddressFromEndereco() || this.form.address || null,
      address_data: {
        cep: this.enderecoForm.cep.replace(/\D/g, '') || null,
        logradouro: this.enderecoForm.logradouro.trim() || null,
        numero: this.enderecoForm.numero.trim() || null,
        complemento: this.enderecoForm.complemento.trim() || null,
        bairro: this.enderecoForm.bairro.trim() || null,
        cidade: this.enderecoForm.cidade.trim() || null,
        uf: this.enderecoForm.uf.trim().toUpperCase() || null,
      },
      billing_name: this.form.billing_name ?? null,
      billing_email: this.form.billing_email ?? null,
      billing_document: this.form.billing_document ?? null,
      business_hours: Object.keys(cleaned).length ? this.mapBusinessHoursToApi(cleaned) : null,
      whatsapp_notifications_enabled: !!this.form.whatsapp_notifications_enabled,
      whatsapp_notify_cobranca: !!this.form.whatsapp_notify_cobranca,
      whatsapp_notify_faturas_boleto: !!this.form.whatsapp_notify_faturas_boleto,
      whatsapp_notify_avisos: !!this.form.whatsapp_notify_avisos,
      theme: this.form.theme ?? undefined,
      dark_mode: !!this.form.dark_mode,
    };
    this.clinicaService.updateConfiguracoes(payload as Partial<ClinicaConfig>, this.logoFile ?? undefined).subscribe({
      next: (updated) => {
        this.salvando = false;
        this.sucesso = true;
        this.logoFile = null;
        if (this.pageData) {
          const cur = this.pageData.organization ?? this.pageData.clinic;
          if (cur) this.pageData.organization = { ...cur, ...updated };
        }
        this.patchFormFromClinic(updated);
        applyUserAppearanceToBrowser({
          ui_theme: normalizeThemeKey(String(updated.theme ?? this.form.theme ?? 'ocean-blue')),
          ui_dark_mode: updated.dark_mode ?? !!this.form.dark_mode,
        });
        this.toast.success('Configurações salvas', 'As alterações da empresa foram gravadas.');
      },
      error: () => {
        this.salvando = false;
        this.erro = 'Não foi possível salvar.';
        this.toast.error('Erro ao salvar', this.erro);
      },
    });
  }

  private mapBusinessHoursToApi(
    businessHours: Record<string, { open: string; close: string }>
  ): Record<string, { open: string; close: string }> {
    const mapped: Record<string, { open: string; close: string }> = {};
    Object.entries(businessHours).forEach(([uiDay, slot]) => {
      const apiDay = UI_TO_API_DAY_MAP[uiDay] ?? uiDay;
      mapped[apiDay] = slot;
    });
    return mapped;
  }

  progressFilled(): number {
    const f = this.form;
    let n = 0;
    if ((f.name ?? '').trim()) n++;
    if ((f.notification_email ?? '').trim()) n++;
    if (this.mountAddressFromEndereco().trim()) n++;
    if ((f.phone ?? '').trim()) n++;
    if ((f.contact_email ?? '').trim()) n++;
    return Math.min(8, n);
  }
}
