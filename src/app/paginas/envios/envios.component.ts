import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DocumentSendsService, DocumentSendItem } from '../../core/services/document-sends.service';
import { TemplatesService, Template } from '../../core/services/templates.service';
import { LoadingOverlayComponent } from '../../componentes/ui/loading-overlay/loading-overlay.component';

type Caixa = 'pendentes' | 'assinados' | 'expirados' | 'cancelados';

@Component({
  selector: 'app-envios',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingOverlayComponent],
  templateUrl: './envios.component.html',
  styleUrl: './envios.component.css',
})
export class EnviosComponent implements OnInit {
  envios: DocumentSendItem[] = [];
  templates: Template[] = [];
  caixaAtual: Caixa = 'pendentes';
  meta = { current_page: 1, last_page: 1, per_page: 20, total: 0 };
  carregando = false;
  erro = '';
  acaoId: number | null = null;

  mostrarNovoEnvio = false;
  novoEnvio = { template_id: 0, channel: 'email' as 'email' | 'whatsapp', recipient_email: '', recipient_phone: '' };
  enviando = false;
  erroNovo = '';

  private documentSendsService = inject(DocumentSendsService);
  private templatesService = inject(TemplatesService);

  readonly caixas: { key: Caixa; label: string }[] = [
    { key: 'pendentes', label: 'Pendentes' },
    { key: 'assinados', label: 'Assinados' },
    { key: 'expirados', label: 'Expirados' },
    { key: 'cancelados', label: 'Cancelados' },
  ];

  ngOnInit(): void {
    this.templatesService.list({ is_active: true }).subscribe({ next: (t) => (this.templates = t) });
    this.carregar();
  }

  setCaixa(c: Caixa): void {
    this.caixaAtual = c;
    this.carregar(1);
  }

  carregar(page = 1): void {
    this.carregando = true;
    this.erro = '';
    this.documentSendsService.list({ caixa: this.caixaAtual, per_page: 20, page }).subscribe({
      next: (res) => {
        this.envios = res.data;
        this.meta = res.meta;
        this.carregando = false;
      },
      error: () => {
        this.carregando = false;
        this.erro = 'Não foi possível carregar os envios.';
      },
    });
  }

  dataFormatada(s: string | null): string {
    if (!s) return '—';
    try {
      const d = new Date(s);
      return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    } catch {
      return s;
    }
  }

  statusLabel(status: string): string {
    const map: Record<string, string> = { pendente: 'Pendente', assinado: 'Assinado', expirado: 'Expirado', cancelado: 'Cancelado' };
    return map[status] ?? status;
  }

  canalLabel(channel: string): string {
    return channel === 'whatsapp' ? 'WhatsApp' : 'E-mail';
  }

  destinatario(item: DocumentSendItem): string {
    if (item.channel === 'whatsapp' && item.recipient_phone) return item.recipient_phone;
    return item.recipient_email ?? '—';
  }

  cancelar(item: DocumentSendItem): void {
    if (item.status !== 'pendente') return;
    this.acaoId = item.id;
    this.documentSendsService.cancel(item.id).subscribe({
      next: () => {
        this.acaoId = null;
        this.carregar();
      },
      error: (err) => {
        this.acaoId = null;
        this.erro = err.error?.message ?? 'Não foi possível cancelar.';
      },
    });
  }

  reenviar(item: DocumentSendItem): void {
    if (item.status !== 'pendente') return;
    this.acaoId = item.id;
    this.documentSendsService.reenvio(item.id).subscribe({
      next: () => {
        this.acaoId = null;
        this.carregar();
      },
      error: (err) => {
        this.acaoId = null;
        this.erro = err.error?.message ?? 'Não foi possível reenviar.';
      },
    });
  }

  abrirNovoEnvio(): void {
    this.mostrarNovoEnvio = true;
    this.erroNovo = '';
    this.novoEnvio = { template_id: this.templates[0]?.id ?? 0, channel: 'email', recipient_email: '', recipient_phone: '' };
  }

  fecharNovoEnvio(): void {
    this.mostrarNovoEnvio = false;
  }

  enviarNovo(): void {
    this.erroNovo = '';
    if (this.novoEnvio.template_id <= 0) {
      this.erroNovo = 'Selecione um template.';
      return;
    }
    if (this.novoEnvio.channel === 'email') {
      if (!this.novoEnvio.recipient_email?.trim()) {
        this.erroNovo = 'Informe o e-mail do destinatário.';
        return;
      }
    } else {
      if (!this.novoEnvio.recipient_phone?.trim()) {
        this.erroNovo = 'Informe o telefone (WhatsApp).';
        return;
      }
    }
    this.enviando = true;
    const payload = {
      template_id: this.novoEnvio.template_id,
      channel: this.novoEnvio.channel,
      ...(this.novoEnvio.channel === 'email'
        ? { recipient_email: this.novoEnvio.recipient_email.trim() }
        : { recipient_phone: this.novoEnvio.recipient_phone.trim() }),
    };
    this.documentSendsService.store(payload).subscribe({
      next: () => {
        this.enviando = false;
        this.fecharNovoEnvio();
        this.setCaixa('pendentes');
      },
      error: (err) => {
        this.enviando = false;
        this.erroNovo = err.error?.message ?? 'Não foi possível enviar.';
      },
    });
  }
}
