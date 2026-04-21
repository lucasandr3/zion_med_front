import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { IntegracoesService, FeegowConfigState } from '../../core/services/integracoes.service';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-clinica-integracao-feegow',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './clinica-integracao-feegow.component.html',
  styleUrl: './clinica-integracao-feegow.component.css',
})
export class ClinicaIntegracaoFeegowComponent implements OnInit {
  private service = inject(IntegracoesService);
  private toast = inject(ToastService);

  carregando = false;
  salvando = false;
  testando = false;
  erro = '';
  state: FeegowConfigState | null = null;
  form = {
    enabled: false,
    base_url: '',
    token: '',
  };

  ngOnInit(): void {
    this.carregar();
  }

  carregar(): void {
    this.carregando = true;
    this.erro = '';
    this.service
      .getFeegow()
      .pipe(finalize(() => (this.carregando = false)))
      .subscribe({
        next: (state) => {
          this.state = state;
          this.form.enabled = state.enabled;
          this.form.base_url = state.base_url;
          this.form.token = '';
        },
        error: () => {
          this.erro = 'Não foi possível carregar a configuração da integração Feegow.';
        },
      });
  }

  salvar(): void {
    if (!this.form.base_url.trim()) {
      this.toast.error('Base URL obrigatória', 'Informe a URL da API Feegow.');
      return;
    }

    this.salvando = true;
    const payload: { enabled: boolean; base_url: string; token?: string } = {
      enabled: this.form.enabled,
      base_url: this.form.base_url.trim(),
    };
    if (this.form.token.trim()) {
      payload.token = this.form.token.trim();
    }

    this.service
      .updateFeegow(payload)
      .pipe(finalize(() => (this.salvando = false)))
      .subscribe({
        next: (state) => {
          this.state = state;
          this.form.enabled = state.enabled;
          this.form.base_url = state.base_url;
          this.form.token = '';
          this.toast.success('Configuração salva', 'As configurações do Feegow foram atualizadas.');
        },
        error: (err) => {
          const message = err?.error?.message ?? 'Não foi possível salvar a configuração.';
          this.toast.error('Erro', message);
        },
      });
  }

  testarConexao(): void {
    this.testando = true;
    this.service
      .testFeegow()
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

  statusLabel(status: FeegowConfigState['status'] | undefined): string {
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
}
