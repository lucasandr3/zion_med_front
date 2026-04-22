import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ZmSkeletonListComponent } from '../../shared/components/skeletons';
import {
  IntegracoesService,
  IntegracoesState,
  IntegracoesWebhook,
  IntegracoesToken,
  IntegracoesDelivery,
  IntegracaoSistemaItem,
  IntegracaoSistemaStatus,
} from '../../core/services/integracoes.service';
import { ToastService } from '../../core/services/toast.service';
import { ConfirmDialogService } from '../../core/services/confirm-dialog.service';

type AbaIntegracao = 'api' | 'webhooks' | 'entregas' | 'sistemas';

@Component({
  selector: 'app-clinica-integracoes',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, ZmSkeletonListComponent],
  templateUrl: './clinica-integracoes.component.html',
  styleUrl: './clinica-integracoes.component.css',
})
export class ClinicaIntegracoesComponent implements OnInit {
  private service = inject(IntegracoesService);
  private toast = inject(ToastService);
  private confirm = inject(ConfirmDialogService);

  state: IntegracoesState | null = null;
  carregando = false;
  erro = '';
  abaAtiva: AbaIntegracao = 'api';
  carregandoSistemas = false;
  sistemas: IntegracaoSistemaItem[] = [];

  // token
  novoTokenNome = '';
  ultimoTokenGerado: { token: string; name: string } | null = null;

  // webhooks
  novoWebhookUrl = '';
  novoWebhookEventos: string[] = [];
  novoWebhookSecret = '';
  novoWebhookDescricao = '';
  tokenCriando = false;
  webhookCriando = false;

  ngOnInit(): void {
    this.carregar();
    this.carregarSistemas();
  }

  get tokens(): IntegracoesToken[] {
    return this.state?.tokens ?? [];
  }

  get webhooks(): IntegracoesWebhook[] {
    return this.state?.webhooks ?? [];
  }

  get deliveries() {
    return this.state?.deliveries ?? [];
  }

  get eventLabels(): Record<string, string> {
    return this.state?.event_labels ?? {};
  }

  get availableEvents(): string[] {
    return this.state?.available_events ?? [];
  }

  ativarAba(aba: AbaIntegracao): void {
    this.abaAtiva = aba;
    if (aba === 'sistemas') {
      this.carregarSistemas();
    }
  }

  carregar(): void {
    this.carregando = true;
    this.service.get().subscribe({
      next: (s) => {
        this.state = s;
        this.carregando = false;
      },
      error: () => {
        this.carregando = false;
        this.erro = 'Não foi possível carregar as integrações.';
      },
    });
  }

  criarToken(): void {
    if (!this.novoTokenNome.trim()) return;
    this.tokenCriando = true;
    this.service.criarToken(this.novoTokenNome.trim()).subscribe({
      next: (res) => {
        this.tokenCriando = false;
        this.ultimoTokenGerado = { token: res.token, name: res.name };
        this.novoTokenNome = '';
        this.carregar();
        this.toast.success('Token criado', 'Guarde o token com segurança; ele não será exibido novamente.');
      },
      error: () => {
        this.tokenCriando = false;
        this.toast.error('Erro', 'Não foi possível criar o token.');
      },
    });
  }

  async revogarToken(token: IntegracoesToken): Promise<void> {
    const ok = await this.confirm.request({
      title: 'Revogar token?',
      messageBefore: 'O token ',
      emphasis: token.name ?? `#${token.id}`,
      messageAfter: ' deixará de funcionar imediatamente.',
      confirmLabel: 'Sim, revogar',
      variant: 'danger',
    });
    if (!ok) return;
    this.service.revogarToken(token.id).subscribe({
      next: () => {
        this.carregar();
        this.toast.success('Token revogado', 'O acesso por esse token foi encerrado.');
      },
      error: () => this.toast.error('Erro', 'Não foi possível revogar o token.'),
    });
  }

  toggleEvento(ev: string, checked: boolean): void {
    if (checked) {
      if (!this.novoWebhookEventos.includes(ev)) this.novoWebhookEventos.push(ev);
    } else {
      this.novoWebhookEventos = this.novoWebhookEventos.filter((e) => e !== ev);
    }
  }

  criarWebhook(): void {
    if (!this.novoWebhookUrl.trim() || this.novoWebhookEventos.length === 0) return;
    this.webhookCriando = true;
    const payload = {
      url: this.novoWebhookUrl.trim(),
      events: this.novoWebhookEventos,
      secret: this.novoWebhookSecret || undefined,
      description: this.novoWebhookDescricao || undefined,
    };
    this.service.criarWebhook(payload).subscribe({
      next: () => {
        this.webhookCriando = false;
        this.novoWebhookUrl = '';
        this.novoWebhookEventos = [];
        this.novoWebhookSecret = '';
        this.novoWebhookDescricao = '';
        this.carregar();
        this.toast.success('Webhook criado', 'O endpoint foi registrado.');
      },
      error: () => {
        this.webhookCriando = false;
        this.toast.error('Erro', 'Não foi possível criar o webhook.');
      },
    });
  }

  async removerWebhook(wh: IntegracoesWebhook): Promise<void> {
    const url = wh.url?.trim() ?? '';
    const emphasis =
      url.length > 48 ? `${url.slice(0, 48)}…` : url.length > 0 ? url : `#${wh.id}`;
    const ok = await this.confirm.request({
      title: 'Remover webhook?',
      messageBefore: 'O webhook ',
      emphasis,
      messageAfter: ' será removido.',
      confirmLabel: 'Sim, remover',
      variant: 'danger',
    });
    if (!ok) return;
    this.service.removerWebhook(wh.id).subscribe({
      next: () => {
        this.carregar();
        this.toast.success('Webhook removido', 'O endpoint foi excluído.');
      },
      error: () => this.toast.error('Erro', 'Não foi possível remover o webhook.'),
    });
  }

  reenviandoId: number | null = null;

  reenviar(d: IntegracoesDelivery): void {
    this.reenviandoId = d.id;
    this.service.reenviarDelivery(d.id).subscribe({
      next: () => {
        this.reenviandoId = null;
        this.carregar();
        this.toast.success('Reenvio solicitado', 'A entrega foi colocada na fila novamente.');
      },
      error: () => {
        this.reenviandoId = null;
        this.toast.error('Erro', 'Não foi possível reenviar.');
      },
    });
  }

  formatarEventosWebhook(wh: IntegracoesWebhook): string {
    if (!wh?.events?.length) return '';
    return wh.events.map((ev) => this.eventLabels[ev] || ev).join(', ');
  }

  carregarSistemas(): void {
    this.carregandoSistemas = true;
    this.service.getSistemas().subscribe({
      next: (sistemas) => {
        this.sistemas = sistemas;
        this.carregandoSistemas = false;
      },
      error: () => {
        this.carregandoSistemas = false;
        this.toast.error('Erro', 'Não foi possível carregar os sistemas de integração.');
      },
    });
  }

  statusSistemaLabel(status: IntegracaoSistemaStatus): string {
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

  sistemaLink(sistema: IntegracaoSistemaItem): string[] | null {
    if (sistema.key === 'feegow') {
      return ['/clinica/integracoes/sistemas/feegow'];
    }

    return null;
  }

  sistemaLogoSrc(sistema: IntegracaoSistemaItem): string | null {
    if (sistema.key === 'feegow') {
      return 'assets/sistemas/feegow.png';
    }

    return null;
  }
}

