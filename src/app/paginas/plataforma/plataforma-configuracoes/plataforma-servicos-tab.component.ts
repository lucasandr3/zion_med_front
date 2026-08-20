import { Component, Input, OnChanges, Output, EventEmitter, SimpleChanges, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  PlataformaService,
  PlatformSettingsData,
} from '../../../core/services/plataforma.service';
import { ToastService } from '../../../core/services/toast.service';
import { environment } from '../../../../environments/environment';
import { ZardCardComponent } from '@/shared/components/card/card.component';
import { ZardButtonComponent } from '@/shared/components/button/button.component';
import { ZardBadgeComponent } from '@/shared/components/badge/badge.component';
import { ZARD_FORM_CONTROL_IMPORTS } from '@/shared/components/input';

export type PlatformServiceId = 'asaas' | 'resend' | 'minio' | 'status';

export interface PlatformServiceCard {
  id: PlatformServiceId;
  name: string;
  description: string;
  icon: string;
  status: 'ok' | 'warn' | 'neutral';
  statusLabel: string;
  meta?: string;
}

const COMPONENT_OPTIONS: Record<string, string> = {
  platform: 'Plataforma (App)',
  api: 'API REST',
  forms: 'Formulários Públicos',
  billing: 'Pagamentos & Billing',
};

@Component({
  selector: 'app-plataforma-servicos-tab',
  standalone: true,
  imports: [
    FormsModule,
    ZardCardComponent,
    ZardButtonComponent,
    ZardBadgeComponent,
    ...ZARD_FORM_CONTROL_IMPORTS,
  ],
  templateUrl: './plataforma-servicos-tab.component.html',
  styleUrl: './plataforma-servicos-tab.component.css',
})
export class PlataformaServicosTabComponent implements OnChanges {
  @Input({ required: true }) settings: PlatformSettingsData | null = null;
  @Input({ required: true }) platformParams!: {
    product_name: string;
    trial_days: number;
    grace_days: number;
    block_mode: string;
    multi_empresa_plan: string;
  };

  @Output() settingsUpdated = new EventEmitter<PlatformSettingsData>();

  readonly activeServico = signal<PlatformServiceId | null>(null);
  readonly componentOptions = COMPONENT_OPTIONS;

  savingSettings = false;
  savingStatus = false;
  successSettings = '';
  successStatus = '';
  error = '';

  asaasBaseUrl = '';
  asaasApiKey = '';
  asaasWebhookSecret = '';
  apiConfigured = false;
  asaasApiKeyPreview: string | null = null;
  asaasWebhookPreview: string | null = null;

  minioEndpoint = '';
  minioAccessKey = '';
  minioSecretKey = '';
  minioRegion = 'us-east-1';
  minioSubmissionsBucket = '';
  minioAttachmentsBucket = '';
  minioAssetsBucket = '';
  minioInvoicesBucket = '';
  minioConfigured = false;
  minioSecretPreview: string | null = null;

  mailMailer: 'resend' | 'log' = 'log';
  resendApiKey = '';
  mailFromAddress = '';
  mailFromName = '';
  mailSupportEmail = '';
  mailLogoUrl = '';
  mailLogoPreviewUrl: string | null = null;
  mailSignaturePreviewUrl: string | null = null;
  mailSenderName = '';
  mailSenderRole = '';
  mailWhatsappNumber = '';
  mailPrimaryColor = '#1e40af';
  mailProductName = '';
  resendConfigured = false;
  resendApiKeyPreview: string | null = null;
  uploadingLogo = false;
  uploadingSignature = false;

  serviceStatus = 'operational';
  serviceStatusSeverity = 'none';
  serviceStatusMessage = '';
  serviceComponents: Record<string, string> = {};

  private plataformaService = inject(PlataformaService);
  private toast = inject(ToastService);

  get statusPageUrl(): string {
    const base = (environment.apiUrl || '').replace(/\/$/, '');
    return base ? `${base}/status` : '#';
  }

  get serviceCards(): PlatformServiceCard[] {
    return [
      {
        id: 'asaas',
        name: 'Asaas',
        description: 'Pagamentos, assinaturas e cobrança recorrente.',
        icon: 'payments',
        status: this.apiConfigured ? 'ok' : 'warn',
        statusLabel: this.apiConfigured ? 'Configurado' : 'Pendente',
        meta: this.asaasBaseUrl || undefined,
      },
      {
        id: 'resend',
        name: 'Resend',
        description: 'E-mails transacionais (senha, verificação, avisos).',
        icon: 'mail',
        status: this.resendConfigured ? 'ok' : 'warn',
        statusLabel: this.mailMailer === 'log' ? 'Modo log' : this.resendConfigured ? 'Configurado' : 'Pendente',
        meta: this.mailFromAddress || undefined,
      },
      {
        id: 'minio',
        name: 'MinIO',
        description: 'Armazenamento de logos, anexos, assinaturas e faturas.',
        icon: 'cloud_upload',
        status: this.minioConfigured ? 'ok' : 'warn',
        statusLabel: this.minioConfigured ? 'Configurado' : 'Pendente',
        meta: this.minioEndpoint || undefined,
      },
      {
        id: 'status',
        name: 'Status do serviço',
        description: 'Página pública /status e banner na landing.',
        icon: 'monitoring',
        status: this.serviceStatus === 'operational' ? 'ok' : 'warn',
        statusLabel: this.serviceStatusLabel(this.serviceStatus),
      },
    ];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['settings']?.currentValue) {
      this.applySettingsData(changes['settings'].currentValue as PlatformSettingsData);
    }
  }

  selecionarServico(id: PlatformServiceId): void {
    this.activeServico.set(id);
    this.error = '';
    this.successSettings = '';
    this.successStatus = '';
  }

  voltarLista(): void {
    this.activeServico.set(null);
    this.error = '';
    this.successSettings = '';
    this.successStatus = '';
  }

  statusBadgeType(status: PlatformServiceCard['status']): 'default' | 'destructive' | 'secondary' {
    if (status === 'ok') return 'default';
    if (status === 'warn') return 'destructive';
    return 'secondary';
  }

  submitSettings(): void {
    this.error = '';
    this.successSettings = '';
    this.savingSettings = true;

    this.plataformaService
      .updateSettings({
        ...this.platformParams,
        asaas_base_url: this.asaasBaseUrl.trim(),
        asaas_api_key: this.asaasApiKey.trim() || null,
        asaas_webhook_secret: this.asaasWebhookSecret.trim() || null,
        minio_endpoint: this.minioEndpoint.trim(),
        minio_access_key: this.minioAccessKey.trim(),
        minio_secret_key: this.minioSecretKey.trim() || null,
        minio_region: this.minioRegion.trim(),
        minio_submissions_bucket: this.minioSubmissionsBucket.trim(),
        minio_attachments_bucket: this.minioAttachmentsBucket.trim(),
        minio_assets_bucket: this.minioAssetsBucket.trim(),
        minio_invoices_bucket: this.minioInvoicesBucket.trim(),
        mail_mailer: this.mailMailer,
        resend_api_key: this.resendApiKey.trim() || null,
        mail_from_address: this.mailFromAddress.trim(),
        mail_from_name: this.mailFromName.trim(),
        mail_support_email: this.mailSupportEmail.trim() || null,
        mail_logo_url: this.mailLogoUrl.trim() || null,
        mail_sender_name: this.mailSenderName.trim() || null,
        mail_sender_role: this.mailSenderRole.trim() || null,
        mail_whatsapp_number: this.mailWhatsappNumber.trim() || null,
        mail_primary_color: this.mailPrimaryColor.trim() || null,
        mail_product_name: this.mailProductName.trim() || null,
      })
      .subscribe({
        next: (res) => {
          this.savingSettings = false;
          this.successSettings = 'Configurações salvas.';
          this.toast.success('Configurações salvas', 'O serviço foi atualizado.');
          if (res.data) {
            this.applySettingsData(res.data);
            this.settingsUpdated.emit(res.data);
          }
          this.asaasApiKey = '';
          this.asaasWebhookSecret = '';
          this.minioSecretKey = '';
          this.resendApiKey = '';
        },
        error: () => {
          this.savingSettings = false;
          this.error = 'Não foi possível salvar as configurações.';
          this.toast.error('Erro', this.error);
        },
      });
  }

  submitStatus(): void {
    this.error = '';
    this.successStatus = '';
    this.savingStatus = true;

    this.plataformaService
      .updateStatus({
        status: this.serviceStatus,
        severity: this.serviceStatusSeverity,
        message: this.serviceStatusMessage.trim() || null,
        components: this.serviceComponents,
      })
      .subscribe({
        next: () => {
          this.savingStatus = false;
          this.successStatus = 'Status atualizado.';
          this.toast.success('Status atualizado', 'O status operacional foi gravado.');
        },
        error: () => {
          this.savingStatus = false;
          this.error = 'Não foi possível atualizar o status.';
          this.toast.error('Erro', this.error);
        },
      });
  }

  getComponentKeys(): string[] {
    return Object.keys(this.componentOptions);
  }

  onMailLogoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = '';
    if (!file) {
      return;
    }
    this.uploadBrandingAsset('logo', file);
  }

  onMailSignatureSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = '';
    if (!file) {
      return;
    }
    this.uploadBrandingAsset('signature', file);
  }

  activeServicoTitle(): string {
    const card = this.serviceCards.find((c) => c.id === this.activeServico());
    return card?.name ?? 'Serviço';
  }

  private serviceStatusLabel(status: string): string {
    const map: Record<string, string> = {
      operational: 'Operacional',
      degraded: 'Degradado',
      outage: 'Indisponível',
      maintenance: 'Manutenção',
    };
    return map[status] ?? status;
  }

  private applySettingsData(d: PlatformSettingsData): void {
    this.asaasBaseUrl = d.base_url ?? '';
    this.apiConfigured = d.api_configured ?? false;
    this.asaasApiKeyPreview = d.api_key_preview ?? null;
    this.asaasWebhookPreview = d.webhook_secret_preview ?? null;

    const minio = d.minio;
    this.minioEndpoint = minio?.endpoint ?? '';
    this.minioAccessKey = minio?.access_key ?? '';
    this.minioRegion = minio?.region ?? 'us-east-1';
    this.minioSubmissionsBucket = minio?.submissions_bucket ?? '';
    this.minioAttachmentsBucket = minio?.attachments_bucket ?? '';
    this.minioAssetsBucket = minio?.assets_bucket ?? '';
    this.minioInvoicesBucket = minio?.invoices_bucket ?? '';
    this.minioConfigured = minio?.configured ?? false;
    this.minioSecretPreview = minio?.secret_key_preview ?? null;

    const resend = d.resend;
    this.mailMailer = resend?.mailer === 'log' ? 'log' : 'resend';
    this.mailFromAddress = resend?.from_address ?? '';
    this.mailFromName = resend?.from_name ?? '';
    this.mailSupportEmail = resend?.support_email ?? '';
    this.mailLogoUrl = resend?.logo_url ?? '';
    this.mailLogoPreviewUrl = resend?.logo_preview_url ?? resend?.logo_url ?? null;
    this.mailSignaturePreviewUrl = resend?.signature_photo_preview_url ?? null;
    this.mailSenderName = resend?.sender_name ?? '';
    this.mailSenderRole = resend?.sender_role ?? '';
    this.mailWhatsappNumber = resend?.whatsapp_number ?? '';
    this.mailPrimaryColor = resend?.primary_color ?? '#1e40af';
    this.mailProductName = resend?.product_name ?? '';
    this.resendConfigured = resend?.configured ?? false;
    this.resendApiKeyPreview = resend?.api_key_preview ?? null;

    this.serviceStatus = d.service_status ?? 'operational';
    this.serviceStatusSeverity = d.service_status_severity ?? 'none';
    this.serviceStatusMessage = d.service_status_message ?? '';
    this.serviceComponents = { ...(d.service_status_components ?? {}) };
    Object.keys(COMPONENT_OPTIONS).forEach((k) => {
      if (!(k in this.serviceComponents)) this.serviceComponents[k] = 'operational';
    });
  }

  private uploadBrandingAsset(type: 'logo' | 'signature', file: File): void {
    if (type === 'logo') {
      this.uploadingLogo = true;
    } else {
      this.uploadingSignature = true;
    }

    this.plataformaService.uploadEmailBranding(type, file).subscribe({
      next: (res) => {
        if (type === 'logo') {
          this.uploadingLogo = false;
        } else {
          this.uploadingSignature = false;
        }

        const previewUrl = res.data?.url ?? null;
        if (type === 'logo') {
          this.mailLogoPreviewUrl = previewUrl;
        } else {
          this.mailSignaturePreviewUrl = previewUrl;
        }

        if (res.data?.resend && this.settings) {
          const nextSettings: PlatformSettingsData = {
            ...this.settings,
            resend: {
              ...this.settings.resend,
              ...res.data.resend,
            },
          };
          this.applySettingsData(nextSettings);
          this.settingsUpdated.emit(nextSettings);
        }

        this.toast.success(type === 'logo' ? 'Logo enviado' : 'Foto de assinatura enviada');
      },
      error: () => {
        if (type === 'logo') {
          this.uploadingLogo = false;
        } else {
          this.uploadingSignature = false;
        }
        this.toast.error('Erro', 'Não foi possível enviar a imagem.');
      },
    });
  }
}
