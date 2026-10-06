import { Component, OnInit, inject, Signal, ChangeDetectionStrategy, signal, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PlataformaService, PlatformSettingsData } from '../../../core/services/plataforma.service';
import { LoadingService } from '../../../shared/services/loading.service';
import { ZmSkeletonConfiguracoesComponent } from '../../../shared/components/skeletons';
import { ToastService } from '../../../core/services/toast.service';
import { GestgoCardComponent } from '@/shared/components/card/card.component';

import { NORD_FORM_IMPORTS } from '@/shared/nord';
import { GestgoTabComponent, GestgoTabGroupComponent } from '@/shared/components/tabs';
import { PlataformaIntegracoesTabComponent } from './plataforma-integracoes-tab.component';
import { PlataformaServicosTabComponent } from './plataforma-servicos-tab.component';

@Component({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-plataforma-configuracoes',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'n-page n-page--flush' },
  imports: [
    FormsModule,
    GestgoCardComponent,
    ...NORD_FORM_IMPORTS,
    ZmSkeletonConfiguracoesComponent,
    GestgoTabComponent,
    GestgoTabGroupComponent,
    PlataformaIntegracoesTabComponent,
    PlataformaServicosTabComponent],
  templateUrl: './plataforma-configuracoes.component.html',
  styleUrl: './plataforma-configuracoes.component.css',
})
export class PlataformaConfiguracoesComponent implements OnInit {
  showSkeleton!: Signal<boolean>;
  readonly listaPronta = signal(false);
  readonly savingSettings = signal(false);
  readonly error = signal('');
  readonly successSettings = signal('');

  readonly data = signal<PlatformSettingsData | null>(null);

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
        this.listaPronta.set(true);
        this.applySettingsData(res.data);
      },
      error: () => {
        this.listaPronta.set(true);
        this.data.set(null);
      },
    });
  }

  submitPlatformParams(): void {
    const data = this.data();
    if (!data) {
      this.error.set('Carregue as configurações antes de salvar.');
      return;
    }

    this.error.set('');
    this.successSettings.set('');
    this.savingSettings.set(true);

    this.plataformaService
      .updateSettings({
        ...this.platformParams,
        asaas_base_url: data.base_url ?? '',
        asaas_api_key: null,
        asaas_webhook_secret: null,
        minio_endpoint: data.minio?.endpoint ?? '',
        minio_access_key: data.minio?.access_key ?? '',
        minio_secret_key: null,
        minio_region: data.minio?.region ?? 'us-east-1',
        minio_submissions_bucket: data.minio?.submissions_bucket ?? '',
        minio_attachments_bucket: data.minio?.attachments_bucket ?? '',
        minio_assets_bucket: data.minio?.assets_bucket ?? '',
        minio_invoices_bucket: data.minio?.invoices_bucket ?? '',
        mail_mailer: data.resend?.mailer === 'log' ? 'log' : 'resend',
        resend_api_key: null,
        mail_from_address: data.resend?.from_address ?? '',
        mail_from_name: data.resend?.from_name ?? '',
        mail_support_email: data.resend?.support_email ?? null,
        mail_logo_url: data.resend?.logo_url ?? null,
        mail_sender_name: data.resend?.sender_name ?? null,
        mail_sender_role: data.resend?.sender_role ?? null,
        mail_whatsapp_number: data.resend?.whatsapp_number ?? null,
        mail_primary_color: data.resend?.primary_color ?? null,
        mail_product_name: data.resend?.product_name ?? null,
      })
      .subscribe({
        next: (res) => {
          this.savingSettings.set(false);
          this.successSettings.set('Parâmetros salvos.');
          this.toast.success('Parâmetros salvos', 'As configurações da plataforma foram atualizadas.');
          if (res.data) {
            this.applySettingsData(res.data);
          }
        },
        error: () => {
          this.savingSettings.set(false);
          this.error.set('Não foi possível salvar os parâmetros.');
          this.toast.error('Erro', this.error());
        },
      });
  }

  onSettingsUpdated(data: PlatformSettingsData): void {
    this.applySettingsData(data);
  }

  private applySettingsData(d: PlatformSettingsData): void {
    this.data.set(d);
    this.productName = d.product_name ?? '';
    this.trialDays = d.trial_days ?? 14;
    this.graceDays = d.grace_days ?? 7;
    this.blockMode = d.block_mode ?? 'soft';
    this.multiEmpresaPlan = d.multi_empresa_plan ?? '';
  }
}
