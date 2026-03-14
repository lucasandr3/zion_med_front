import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IntegracoesService, IntegracoesState, IntegracoesWebhook, IntegracoesToken } from '../../core/services/integracoes.service';

type AbaIntegracao = 'api' | 'webhooks' | 'entregas';

@Component({
  selector: 'app-clinica-integracoes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './clinica-integracoes.component.html',
  styleUrl: './clinica-integracoes.component.css',
})
export class ClinicaIntegracoesComponent implements OnInit {
  private service = inject(IntegracoesService);

  state: IntegracoesState | null = null;
  carregando = false;
  erro = '';
  abaAtiva: AbaIntegracao = 'api';

  // token
  novoTokenNome = '';
  ultimoTokenGerado: { token: string; name: string } | null = null;

  // webhooks
  novoWebhookUrl = '';
  novoWebhookEventos: string[] = [];
  novoWebhookSecret = '';
  novoWebhookDescricao = '';

  ngOnInit(): void {
    this.carregar();
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
    this.service.criarToken(this.novoTokenNome.trim()).subscribe({
      next: (res) => {
        this.ultimoTokenGerado = { token: res.token, name: res.name };
        this.novoTokenNome = '';
        this.carregar();
      },
    });
  }

  revogarToken(token: IntegracoesToken): void {
    if (!confirm('Revogar este token?')) return;
    this.service.revogarToken(token.id).subscribe(() => this.carregar());
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
    const payload = {
      url: this.novoWebhookUrl.trim(),
      events: this.novoWebhookEventos,
      secret: this.novoWebhookSecret || undefined,
      description: this.novoWebhookDescricao || undefined,
    };
    this.service.criarWebhook(payload).subscribe({
      next: () => {
        this.novoWebhookUrl = '';
        this.novoWebhookEventos = [];
        this.novoWebhookSecret = '';
        this.novoWebhookDescricao = '';
        this.carregar();
      },
    });
  }

  removerWebhook(wh: IntegracoesWebhook): void {
    if (!confirm('Remover este webhook?')) return;
    this.service.removerWebhook(wh.id).subscribe(() => this.carregar());
  }

  formatarEventosWebhook(wh: IntegracoesWebhook): string {
    if (!wh?.events?.length) return '';
    return wh.events.map((ev) => this.eventLabels[ev] || ev).join(', ');
  }
}

