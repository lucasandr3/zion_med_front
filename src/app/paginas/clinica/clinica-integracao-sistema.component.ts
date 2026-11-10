import { Component, OnInit, inject, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';
import {
  ClinicorpConfigState,
  IntegracaoSistemaStatus,
  IntegracoesService,
  NinsaudeConfigState,
  TrinksConfigState,
} from '../../core/services/integracoes.service';
import { ToastService } from '../../core/services/toast.service';
import { ZmPageBackLinkComponent } from '../../shared/components/ui';
import { NORD_FORM_IMPORTS } from '@/shared/nord';
import { GestgoCardComponent } from '@/shared/components/card/card.component';
import { GestgoBadgeComponent } from '@/shared/components/badge';
import type { GestgoBadgeTypeVariants } from '@/shared/components/badge/badge.variants';

type VendorKey = 'trinks' | 'clinicorp' | 'ninsaude';
type VendorConfigState = TrinksConfigState | ClinicorpConfigState | NinsaudeConfigState;

interface VendorMeta {
  key: VendorKey;
  name: string;
  docsUrl: string;
  authHint: string;
  helpSteps: string[];
  defaultBaseUrl: string;
}

const VENDORS: Record<VendorKey, VendorMeta> = {
  trinks: {
    key: 'trinks',
    name: 'Trinks',
    docsUrl: 'https://trinks.readme.io/reference/introducao',
    authHint: 'Autenticação por X-Api-Key (Conecta Trinks).',
    defaultBaseUrl: 'https://api.trinks.com',
    helpSteps: [
      'Tenha um usuário no Trinks vinculado ao estabelecimento.',
      'Solicite liberação da API pelo Fale Conosco (até ~48h) e gere a chave em Meu Cadastro.',
      'Cole a Base URL e a API Key, salve e teste a conexão.',
    ],
  },
  clinicorp: {
    key: 'clinicorp',
    name: 'Clinicorp',
    docsUrl: 'https://sistema.clinicorp.com/api-docs/',
    authHint: 'HTTP Basic com Usuário API + Token API.',
    defaultBaseUrl: 'https://api.clinicorp.com/rest/v1',
    helpSteps: [
      'No Clinicorp, abra Gerenciar Assinatura → Acesso Externo e Integrações.',
      'Ative Integração via API e copie Usuário API, Token API e Subscriber ID.',
      'Cole os dados abaixo, salve e teste a conexão.',
    ],
  },
  ninsaude: {
    key: 'ninsaude',
    name: 'Ninsaúde',
    docsUrl: 'https://www.ninsaude.com/pt-br/desenvolvedores/',
    authHint: 'OAuth2: refresh token ou login (conta/usuário/senha).',
    defaultBaseUrl: 'https://api.ninsaude.com/v1',
    helpSteps: [
      'No painel Ninsaúde, peça/gere credenciais de API (Integrações → API).',
      'Prefira refresh token; se não tiver, use conta + usuário + senha.',
      'Salve e teste a conexão (o Gestgo troca automaticamente por access token).',
    ],
  },
};

@Component({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-clinica-integracao-sistema',
  standalone: true,
  host: { class: 'n-page' },
  imports: [
    ...NORD_FORM_IMPORTS,
    CommonModule,
    FormsModule,
    ZmPageBackLinkComponent,
    GestgoCardComponent,
    GestgoBadgeComponent,
  ],
  templateUrl: './clinica-integracao-sistema.component.html',
  styleUrl: './clinica-integracao-sistema.component.css',
})
export class ClinicaIntegracaoSistemaComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private service = inject(IntegracoesService);
  private toast = inject(ToastService);

  vendor: VendorMeta = VENDORS.trinks;
  carregando = false;
  salvando = false;
  testando = false;
  erro = '';

  status: IntegracaoSistemaStatus = 'unknown';
  lastCheckAt: string | null = null;
  lastError: string | null = null;

  form = {
    enabled: false,
    base_url: '',
    token: '',
    estabelecimento_id: '',
    api_user: '',
    subscriber_id: '',
    account: '',
    username: '',
    password: '',
    refresh_token: '',
  };

  hasToken = false;
  hasPassword = false;
  hasRefreshToken = false;

  ngOnInit(): void {
    const key = (this.route.snapshot.paramMap.get('sistema') || '').toLowerCase() as VendorKey;
    if (!VENDORS[key]) {
      this.erro = 'Sistema de integração não suportado.';
      return;
    }
    this.vendor = VENDORS[key];
    this.form.base_url = this.vendor.defaultBaseUrl;
    this.carregar();
  }

  carregar(): void {
    this.carregando = true;
    this.erro = '';

    if (this.vendor.key === 'trinks') {
      this.service
        .getTrinks()
        .pipe(finalize(() => (this.carregando = false)))
        .subscribe({
          next: (state) => this.applyState(state),
          error: () => {
            this.erro = `Não foi possível carregar a configuração da integração ${this.vendor.name}.`;
          },
        });
      return;
    }

    if (this.vendor.key === 'clinicorp') {
      this.service
        .getClinicorp()
        .pipe(finalize(() => (this.carregando = false)))
        .subscribe({
          next: (state) => this.applyState(state),
          error: () => {
            this.erro = `Não foi possível carregar a configuração da integração ${this.vendor.name}.`;
          },
        });
      return;
    }

    this.service
      .getNinsaude()
      .pipe(finalize(() => (this.carregando = false)))
      .subscribe({
        next: (state) => this.applyState(state),
        error: () => {
          this.erro = `Não foi possível carregar a configuração da integração ${this.vendor.name}.`;
        },
      });
  }

  salvar(): void {
    if (!this.form.base_url.trim()) {
      this.toast.error('Base URL obrigatória', `Informe a URL da API ${this.vendor.name}.`);
      return;
    }

    this.salvando = true;

    if (this.vendor.key === 'trinks') {
      const payload: { enabled: boolean; base_url: string; token?: string; estabelecimento_id?: string } = {
        enabled: this.form.enabled,
        base_url: this.form.base_url.trim(),
        estabelecimento_id: this.form.estabelecimento_id.trim() || undefined,
      };
      if (this.form.token.trim()) payload.token = this.form.token.trim();
      this.service
        .updateTrinks(payload)
        .pipe(finalize(() => (this.salvando = false)))
        .subscribe({
          next: (state) => {
            this.applyState(state);
            this.toast.success('Configuração salva', `${this.vendor.name} atualizado.`);
          },
          error: (err) => this.toast.error('Erro', err?.error?.message ?? 'Falha ao salvar.'),
        });
      return;
    }

    if (this.vendor.key === 'clinicorp') {
      const payload: {
        enabled: boolean;
        base_url: string;
        api_user?: string;
        token?: string;
        subscriber_id?: string;
      } = {
        enabled: this.form.enabled,
        base_url: this.form.base_url.trim(),
        api_user: this.form.api_user.trim() || undefined,
        subscriber_id: this.form.subscriber_id.trim() || undefined,
      };
      if (this.form.token.trim()) payload.token = this.form.token.trim();
      this.service
        .updateClinicorp(payload)
        .pipe(finalize(() => (this.salvando = false)))
        .subscribe({
          next: (state) => {
            this.applyState(state);
            this.toast.success('Configuração salva', `${this.vendor.name} atualizado.`);
          },
          error: (err) => this.toast.error('Erro', err?.error?.message ?? 'Falha ao salvar.'),
        });
      return;
    }

    const payload: {
      enabled: boolean;
      base_url: string;
      account?: string;
      username?: string;
      password?: string;
      refresh_token?: string;
    } = {
      enabled: this.form.enabled,
      base_url: this.form.base_url.trim(),
      account: this.form.account.trim() || undefined,
      username: this.form.username.trim() || undefined,
    };
    if (this.form.password.trim()) payload.password = this.form.password.trim();
    if (this.form.refresh_token.trim()) payload.refresh_token = this.form.refresh_token.trim();
    this.service
      .updateNinsaude(payload)
      .pipe(finalize(() => (this.salvando = false)))
      .subscribe({
        next: (state) => {
          this.applyState(state);
          this.toast.success('Configuração salva', `${this.vendor.name} atualizado.`);
        },
        error: (err) => this.toast.error('Erro', err?.error?.message ?? 'Falha ao salvar.'),
      });
  }

  testarConexao(): void {
    this.testando = true;

    if (this.vendor.key === 'trinks') {
      this.service
        .testTrinks()
        .pipe(finalize(() => (this.testando = false)))
        .subscribe({
          next: (res) => {
            this.toast.success('Conexão validada', res.message);
            this.carregar();
          },
          error: (err) => {
            const message = err?.error?.data?.message ?? err?.error?.message ?? 'Falha no teste da integração.';
            this.toast.error('Falha no teste', message);
            this.carregar();
          },
        });
      return;
    }

    if (this.vendor.key === 'clinicorp') {
      this.service
        .testClinicorp()
        .pipe(finalize(() => (this.testando = false)))
        .subscribe({
          next: (res) => {
            this.toast.success('Conexão validada', res.message);
            this.carregar();
          },
          error: (err) => {
            const message = err?.error?.data?.message ?? err?.error?.message ?? 'Falha no teste da integração.';
            this.toast.error('Falha no teste', message);
            this.carregar();
          },
        });
      return;
    }

    this.service
      .testNinsaude()
      .pipe(finalize(() => (this.testando = false)))
      .subscribe({
        next: (res) => {
          this.toast.success('Conexão validada', res.message);
          this.carregar();
        },
        error: (err) => {
          const message = err?.error?.data?.message ?? err?.error?.message ?? 'Falha no teste da integração.';
          this.toast.error('Falha no teste', message);
          this.carregar();
        },
      });
  }

  statusLabel(status: IntegracaoSistemaStatus | undefined): string {
    switch (status) {
      case 'ok':
        return 'Funcionando';
      case 'error':
        return 'Com erro';
      case 'disabled':
        return 'Desativado';
      case 'not_configured':
        return 'Não configurado';
      default:
        return 'Pendente';
    }
  }

  statusBadgeType(status: IntegracaoSistemaStatus | undefined): GestgoBadgeTypeVariants {
    switch (status) {
      case 'ok':
        return 'default';
      case 'error':
        return 'destructive';
      default:
        return 'outline';
    }
  }

  private applyState(state: VendorConfigState): void {
    this.status = state.status;
    this.lastCheckAt = state.last_check_at ?? null;
    this.lastError = state.last_error ?? null;
    this.form.enabled = state.enabled;
    this.form.base_url = state.base_url || this.vendor.defaultBaseUrl;
    this.form.token = '';
    this.form.password = '';
    this.form.refresh_token = '';

    if ('estabelecimento_id' in state) {
      this.hasToken = state.has_token;
      this.form.estabelecimento_id = state.estabelecimento_id || '';
    }
    if ('api_user' in state) {
      this.hasToken = state.has_token;
      this.form.api_user = state.api_user || '';
      this.form.subscriber_id = state.subscriber_id || '';
    }
    if ('has_refresh_token' in state) {
      this.hasPassword = state.has_password;
      this.hasRefreshToken = state.has_refresh_token;
      this.form.account = state.account || '';
      this.form.username = state.username || '';
    }
  }
}
