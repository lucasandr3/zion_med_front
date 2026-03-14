import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PlataformaService, PlatformSettingsData } from '../../../core/services/plataforma.service';
import { environment } from '../../../../environments/environment';
import { LoadingOverlayComponent } from '../../../componentes/ui/loading-overlay/loading-overlay.component';

const COMPONENT_OPTIONS: Record<string, string> = {
  platform: 'Plataforma (App)',
  api: 'API REST',
  forms: 'Formulários Públicos',
  billing: 'Pagamentos & Billing',
};

@Component({
  selector: 'app-plataforma-configuracoes',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingOverlayComponent],
  templateUrl: './plataforma-configuracoes.component.html',
  styleUrl: './plataforma-configuracoes.component.css',
})
export class PlataformaConfiguracoesComponent implements OnInit {
  loading = false;
  savingSettings = false;
  savingStatus = false;
  error = '';
  successSettings = '';
  successStatus = '';

  data: PlatformSettingsData | null = null;
  componentOptions = COMPONENT_OPTIONS;

  productName = '';
  trialDays = 14;
  graceDays = 7;
  blockMode = 'soft';
  multiEmpresaPlan = '';
  baseUrl = '';
  apiConfigured = false;

  serviceStatus = 'operational';
  serviceStatusSeverity = 'none';
  serviceStatusMessage = '';
  serviceComponents: Record<string, string> = {};

  /** URL da página pública de status no backend (abre em nova aba; não é rota do Angular). */
  get statusPageUrl(): string {
    const base = (environment.apiUrl || '').replace(/\/$/, '');
    return base ? `${base}/status` : '#';
  }

  private plataformaService = inject(PlataformaService);

  ngOnInit(): void {
    this.loading = true;
    this.plataformaService.getSettings().subscribe({
      next: (res) => {
        this.loading = false;
        const d = res.data;
        this.data = d;
        this.productName = d.product_name ?? '';
        this.trialDays = d.trial_days ?? 14;
        this.graceDays = d.grace_days ?? 7;
        this.blockMode = d.block_mode ?? 'soft';
        this.multiEmpresaPlan = d.multi_empresa_plan ?? '';
        this.baseUrl = d.base_url ?? '';
        this.apiConfigured = d.api_configured ?? false;
        this.serviceStatus = d.service_status ?? 'operational';
        this.serviceStatusSeverity = d.service_status_severity ?? 'none';
        this.serviceStatusMessage = d.service_status_message ?? '';
        this.serviceComponents = { ...(d.service_status_components ?? {}) };
        Object.keys(COMPONENT_OPTIONS).forEach((k) => {
          if (!(k in this.serviceComponents)) this.serviceComponents[k] = 'operational';
        });
      },
      error: () => {
        this.loading = false;
        this.data = null;
        this.serviceComponents = {};
        Object.keys(COMPONENT_OPTIONS).forEach((k) => (this.serviceComponents[k] = 'operational'));
      },
    });
  }

  submitSettings(): void {
    this.error = '';
    this.successSettings = '';
    this.savingSettings = true;
    this.plataformaService
      .updateSettings({
        product_name: this.productName.trim(),
        trial_days: this.trialDays,
        grace_days: this.graceDays,
        block_mode: this.blockMode,
        multi_empresa_plan: this.multiEmpresaPlan.trim(),
      })
      .subscribe({
        next: () => {
          this.savingSettings = false;
          this.successSettings = 'Configurações salvas.';
        },
        error: () => {
          this.savingSettings = false;
          this.error = 'Não foi possível salvar as configurações.';
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
        },
        error: () => {
          this.savingStatus = false;
          this.error = 'Não foi possível atualizar o status.';
        },
      });
  }

  getComponentKeys(): string[] {
    return Object.keys(this.componentOptions);
  }
}
