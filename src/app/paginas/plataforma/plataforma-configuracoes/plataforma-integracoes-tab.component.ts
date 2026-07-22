import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  BusinessHubIntegration,
  PlatformIntegrationItem,
  PlataformaIntegracoesService,
} from '../../../core/services/plataforma-integracoes.service';
import { ToastService } from '../../../core/services/toast.service';
import { ZardCardComponent } from '@/shared/components/card/card.component';
import { ZardBadgeComponent } from '@/shared/components/badge';
import { MAT_FORM_IMPORTS } from '@/shared/material';
import type { ZardBadgeTypeVariants } from '@/shared/components/badge/badge.variants';

@Component({
  selector: 'app-plataforma-integracoes-tab',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ZardCardComponent,
    ZardBadgeComponent,
    ...MAT_FORM_IMPORTS,
  ],
  templateUrl: './plataforma-integracoes-tab.component.html',
  styleUrl: './plataforma-integracoes-tab.component.css',
})
export class PlataformaIntegracoesTabComponent implements OnInit {
  private readonly service = inject(PlataformaIntegracoesService);
  private readonly toast = inject(ToastService);

  readonly carregando = signal(true);
  readonly erro = signal('');
  readonly integracoes = signal<PlatformIntegrationItem[]>([]);
  readonly selecionada = signal<string>('business_hub');
  readonly businessHub = signal<BusinessHubIntegration | null>(null);
  readonly ultimoTokenGerado = signal<string | null>(null);
  readonly salvando = signal(false);
  readonly regenerando = signal(false);
  readonly testando = signal(false);

  enabled = true;
  connectorType = 'BILLING';
  systemName = '';
  version = '1.0.0';

  readonly connectorTypes = [
    { value: 'CRM', label: 'CRM' },
    { value: 'ERP', label: 'ERP' },
    { value: 'BILLING', label: 'Billing' },
    { value: 'FINANCEIRO', label: 'Financeiro' },
    { value: 'CUSTOM', label: 'Personalizado' },
  ];

  ngOnInit(): void {
    this.carregar();
  }

  carregar(): void {
    this.carregando.set(true);
    this.erro.set('');
    this.service.list().subscribe({
      next: (res) => {
        this.integracoes.set(res.data.integrations ?? []);
        this.carregarBusinessHub();
      },
      error: () => {
        this.carregando.set(false);
        this.erro.set('Não foi possível carregar as integrações.');
      },
    });
  }

  selecionar(integracao: PlatformIntegrationItem): void {
    this.selecionada.set(integracao.key);
    if (integracao.key === 'business_hub' && !this.businessHub()) {
      this.carregarBusinessHub();
    }
  }

  salvarBusinessHub(): void {
    this.salvando.set(true);
    this.service
      .updateBusinessHub({
        enabled: this.enabled,
        connector_type: this.connectorType,
        system_name: this.systemName.trim(),
        version: this.version.trim(),
      })
      .subscribe({
        next: (res) => {
          this.salvando.set(false);
          this.businessHub.set(res.data);
          this.integracoes.update((items) =>
            items.map((item) => (item.key === 'business_hub' ? { ...item, ...res.data } : item)),
          );
          this.toast.success('Integração salva', res.message);
        },
        error: () => {
          this.salvando.set(false);
          this.toast.error('Erro', 'Não foi possível salvar a integração Business Hub.');
        },
      });
  }

  regenerarToken(): void {
    this.regenerando.set(true);
    this.ultimoTokenGerado.set(null);
    this.service.regenerateBusinessHubToken().subscribe({
      next: (res) => {
        this.regenerando.set(false);
        this.businessHub.set(res.data);
        this.ultimoTokenGerado.set(res.data.token ?? null);
        this.enabled = res.data.enabled;
        this.toast.success('Token gerado', 'Copie o token e configure no Business Hub.');
      },
      error: () => {
        this.regenerando.set(false);
        this.toast.error('Erro', 'Não foi possível gerar um novo token.');
      },
    });
  }

  testarConexao(): void {
    this.testando.set(true);
    this.service.testBusinessHub().subscribe({
      next: (res) => {
        this.testando.set(false);
        this.toast.success('Conexão OK', res.message);
      },
      error: (err) => {
        this.testando.set(false);
        const msg = err?.error?.message ?? 'Falha ao testar a conexão com o conector.';
        this.toast.error('Teste falhou', msg);
      },
    });
  }

  copiar(texto: string): void {
    navigator.clipboard.writeText(texto).then(
      () => this.toast.success('Copiado', 'Conteúdo copiado para a área de transferência.'),
      () => this.toast.error('Erro', 'Não foi possível copiar.'),
    );
  }

  statusBadgeType(status: string): ZardBadgeTypeVariants {
    const map: Record<string, ZardBadgeTypeVariants> = {
      active: 'default',
      inactive: 'secondary',
      not_configured: 'outline',
      error: 'destructive',
    };
    return map[status] ?? 'secondary';
  }

  statusLabel(status: string): string {
    const map: Record<string, string> = {
      active: 'Ativa',
      inactive: 'Inativa',
      not_configured: 'Não configurada',
      error: 'Erro',
    };
    return map[status] ?? status;
  }

  connectorTypeLabel(value: string): string {
    return this.connectorTypes.find((t) => t.value === value)?.label ?? value;
  }

  private carregarBusinessHub(): void {
    this.service.getBusinessHub().subscribe({
      next: (res) => {
        this.businessHub.set(res.data);
        this.enabled = res.data.enabled;
        this.connectorType = res.data.connector_type;
        this.systemName = res.data.system_name;
        this.version = res.data.version;
        this.carregando.set(false);
      },
      error: () => {
        this.carregando.set(false);
        this.erro.set('Não foi possível carregar a integração Business Hub.');
      },
    });
  }
}
