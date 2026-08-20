import { Component, OnInit, inject, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PlataformaService, PlatformSettingsData } from '../../../core/services/plataforma.service';
import { LoadingService } from '../../../shared/services/loading.service';
import { ZmSkeletonConfiguracoesComponent } from '../../../shared/components/skeletons';
import { ToastService } from '../../../core/services/toast.service';
import { ZardCardComponent } from '@/shared/components/card/card.component';
import { ZardButtonComponent } from '@/shared/components/button/button.component';
import { ZARD_FORM_CONTROL_IMPORTS } from '@/shared/components/input';
import { ZardTabComponent, ZardTabGroupComponent } from '@/shared/components/tabs';
import { PlataformaIntegracoesTabComponent } from './plataforma-integracoes-tab.component';
import { PlataformaServicosTabComponent } from './plataforma-servicos-tab.component';

@Component({
  selector: 'app-plataforma-configuracoes',
  standalone: true,
  imports: [
    FormsModule,
    ZardCardComponent,
    ZardButtonComponent,
    ...ZARD_FORM_CONTROL_IMPORTS,
    ZmSkeletonConfiguracoesComponent,
    ZardTabComponent,
    ZardTabGroupComponent,
    PlataformaIntegracoesTabComponent,
    PlataformaServicosTabComponent,
  ],
  templateUrl: './plataforma-configuracoes.component.html',
  styleUrl: './plataforma-configuracoes.component.css',
})
export class PlataformaConfiguracoesComponent implements OnInit {
  showSkeleton!: Signal<boolean>;
  listaPronta = false;
  savingSettings = false;
  error = '';
  successSettings = '';

  data: PlatformSettingsData | null = null;

  productName = '';
  trialDays = 14;
  graceDays = 7;
  blockMode = 'soft';
  multiEmpresaPlan = '';

  private plataformaService = inject(PlataformaService);
  private loadingService = inject(LoadingService);
  private toast = inject(ToastService);

  get platformParams() {
    return {
      product_name: this.productName.trim(),
      trial_days: this.trialDays,
      grace_days: this.graceDays,
      block_mode: this.blockMode,
      multi_empresa_plan: this.multiEmpresaPlan.trim(),
    };
  }

  ngOnInit(): void {
    const { data$, showSkeleton } = this.loadingService.loadWithThreshold(this.plataformaService.getSettings());
    this.showSkeleton = showSkeleton;
    data$.subscribe({
      next: (res) => {
        this.listaPronta = true;
        this.applySettingsData(res.data);
      },
      error: () => {
        this.listaPronta = true;
        this.data = null;
      },
    });
  }

  submitPlatformParams(): void {
    if (!this.data) {
      this.error = 'Carregue as configurações antes de salvar.';
      return;
    }

    this.error = '';
    this.successSettings = '';
    this.savingSettings = true;

    this.plataformaService
      .updateSettings({
        ...this.platformParams,
        asaas_base_url: this.data.base_url ?? '',
        asaas_api_key: null,
        asaas_webhook_secret: null,
        minio_endpoint: this.data.minio?.endpoint ?? '',
        minio_access_key: this.data.minio?.access_key ?? '',
        minio_secret_key: null,
        minio_region: this.data.minio?.region ?? 'us-east-1',
        minio_submissions_bucket: this.data.minio?.submissions_bucket ?? '',
        minio_attachments_bucket: this.data.minio?.attachments_bucket ?? '',
        minio_assets_bucket: this.data.minio?.assets_bucket ?? '',
        minio_invoices_bucket: this.data.minio?.invoices_bucket ?? '',
        mail_mailer: this.data.resend?.mailer === 'log' ? 'log' : 'resend',
        resend_api_key: null,
        mail_from_address: this.data.resend?.from_address ?? '',
        mail_from_name: this.data.resend?.from_name ?? '',
        mail_support_email: this.data.resend?.support_email ?? null,
        mail_logo_url: this.data.resend?.logo_url ?? null,
        mail_sender_name: this.data.resend?.sender_name ?? null,
        mail_sender_role: this.data.resend?.sender_role ?? null,
        mail_whatsapp_number: this.data.resend?.whatsapp_number ?? null,
        mail_primary_color: this.data.resend?.primary_color ?? null,
        mail_product_name: this.data.resend?.product_name ?? null,
      })
      .subscribe({
        next: (res) => {
          this.savingSettings = false;
          this.successSettings = 'Parâmetros salvos.';
          this.toast.success('Parâmetros salvos', 'As configurações da plataforma foram atualizadas.');
          if (res.data) {
            this.applySettingsData(res.data);
          }
        },
        error: () => {
          this.savingSettings = false;
          this.error = 'Não foi possível salvar os parâmetros.';
          this.toast.error('Erro', this.error);
        },
      });
  }

  onSettingsUpdated(data: PlatformSettingsData): void {
    this.applySettingsData(data);
  }

  private applySettingsData(d: PlatformSettingsData): void {
    this.data = d;
    this.productName = d.product_name ?? '';
    this.trialDays = d.trial_days ?? 14;
    this.graceDays = d.grace_days ?? 7;
    this.blockMode = d.block_mode ?? 'soft';
    this.multiEmpresaPlan = d.multi_empresa_plan ?? '';
  }
}
