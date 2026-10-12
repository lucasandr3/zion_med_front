import { Component, OnInit, inject, ChangeDetectionStrategy, signal, computed, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  ZmSkeletonIntegracoesComponent,
  ZmSkeletonIntegracoesSistemasComponent,
} from '../../shared/components/skeletons';
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
import { GestgoTableImports } from '@/shared/components/table';
import { NORD_FORM_IMPORTS } from '@/shared/nord';
import { GestgoCardComponent } from '@/shared/components/card/card.component';

import { GestgoTabComponent, GestgoTabGroupComponent } from '@/shared/components/tabs';
import { GestgoBadgeComponent } from '@/shared/components/badge';
import type { GestgoBadgeTypeVariants } from '@/shared/components/badge/badge.variants';
import { scrambleDocsUiUrl, scrambleOpenApiJsonUrl } from '../../core/utils/api-docs-url.util';

type AbaIntegracao = 'api' | 'webhooks' | 'entregas' | 'sistemas';

@Component({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-clinica-integracoes',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'n-page n-page--flush' },
  imports: [
    ...NORD_FORM_IMPORTS,
    ...GestgoTableImports,
    CommonModule,
    FormsModule,
    RouterLink,
    ZmSkeletonIntegracoesComponent,
    ZmSkeletonIntegracoesSistemasComponent,
    GestgoCardComponent,
    GestgoTabComponent,
    GestgoTabGroupComponent,
    GestgoBadgeComponent],
  templateUrl: './clinica-integracoes.component.html',
  styleUrl: './clinica-integracoes.component.css',
})
export class ClinicaIntegracoesComponent implements OnInit {
  private service = inject(IntegracoesService);
  private toast = inject(ToastService);
  private confirm = inject(ConfirmDialogService);

  private readonly tabIds: AbaIntegracao[] = ['api', 'webhooks', 'entregas', 'sistemas'];

  readonly state = signal<IntegracoesState | null>(null);
  readonly carregando = signal(false);
  readonly erro = signal('');
  readonly abaAtiva = signal<AbaIntegracao>('api');
  readonly carregandoSistemas = signal(false);
  readonly sistemas = signal<IntegracaoSistemaItem[]>([]);

  novoTokenNome = '';
  readonly ultimoTokenGerado = signal<{ token: string; name: string } | null>(null);

  novoWebhookUrl = '';
  novoWebhookEventos: string[] = [];
  novoWebhookSecret = '';
  novoWebhookDescricao = '';
  readonly tokenCriando = signal(false);
  readonly webhookCriando = signal(false);
  readonly reenviandoId = signal<number | null>(null);

  readonly docsApiUrl = scrambleDocsUiUrl();
  readonly docsApiJsonUrl = scrambleOpenApiJsonUrl();

  readonly tokens = computed(() => this.state()?.tokens ?? []);
  readonly webhooks = computed(() => this.state()?.webhooks ?? []);
  readonly deliveries = computed(() => this.state()?.deliveries ?? []);
  readonly eventLabels = computed(() => this.state()?.event_labels ?? {});
  readonly availableEvents = computed(() => this.state()?.available_events ?? []);

  ngOnInit(): void {
    this.carregar();
    this.carregarSistemas();
  }

  onGestgoTabChange(event: { index: number }): void {
    const tab = this.tabIds[event.index];
    if (tab) {
      this.ativarAba(tab);
    }
  }

  ativarAba(aba: AbaIntegracao): void {
    this.abaAtiva.set(aba);
    if (aba === 'sistemas') {
      this.carregarSistemas();
    }
  }

  carregar(): void {
    this.carregando.set(true);
    this.erro.set('');
    this.service.get().subscribe({
      next: (s) => {
        this.state.set(s);
        this.carregando.set(false);
      },
      error: () => {
        this.carregando.set(false);
        this.erro.set('Não foi possível carregar as integrações.');
      },
    });
  }

  criarToken(): void {
    if (!this.novoTokenNome.trim()) return;
    this.tokenCriando.set(true);
    this.service.criarToken(this.novoTokenNome.trim()).subscribe({
      next: (res) => {
        this.tokenCriando.set(false);
        this.ultimoTokenGerado.set({ token: res.token, name: res.name });
        this.novoTokenNome = '';
        this.carregar();
        this.toast.success('Token criado', 'Guarde o token com segurança; ele não será exibido novamente.');
      },
      error: () => {
        this.tokenCriando.set(false);
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
    this.webhookCriando.set(true);
    const payload = {
      url: this.novoWebhookUrl.trim(),
      events: this.novoWebhookEventos,
      secret: this.novoWebhookSecret || undefined,
      description: this.novoWebhookDescricao || undefined,
    };
    this.service.criarWebhook(payload).subscribe({
      next: () => {
        this.webhookCriando.set(false);
        this.novoWebhookUrl = '';
        this.novoWebhookEventos = [];
        this.novoWebhookSecret = '';
        this.novoWebhookDescricao = '';
        this.carregar();
        this.toast.success('Webhook criado', 'O endpoint foi registrado.');
      },
      error: () => {
        this.webhookCriando.set(false);
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

  reenviar(d: IntegracoesDelivery): void {
    this.reenviandoId.set(d.id);
    this.service.reenviarDelivery(d.id).subscribe({
      next: () => {
        this.reenviandoId.set(null);
        this.carregar();
        this.toast.success('Reenvio solicitado', 'A entrega foi colocada na fila novamente.');
      },
      error: () => {
        this.reenviandoId.set(null);
        this.toast.error('Erro', 'Não foi possível reenviar.');
      },
    });
  }

  formatarEventosWebhook(wh: IntegracoesWebhook): string {
    if (!wh?.events?.length) return '';
    const labels = this.eventLabels();
    return wh.events.map((ev) => labels[ev] || ev).join(', ');
  }

  carregarSistemas(): void {
    this.carregandoSistemas.set(true);
    this.service.getSistemas().subscribe({
      next: (sistemas) => {
        this.sistemas.set(sistemas);
        this.carregandoSistemas.set(false);
      },
      error: () => {
        this.carregandoSistemas.set(false);
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

  statusBadgeType(status: IntegracaoSistemaStatus): GestgoBadgeTypeVariants {
    switch (status) {
      case 'ok':
        return 'default';
      case 'error':
        return 'destructive';
      default:
        return 'outline';
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
