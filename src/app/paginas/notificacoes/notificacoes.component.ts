import { Component, OnInit, inject, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NotificacoesService, Notificacao } from '../../core/services/notificacoes.service';
import { LoadingService } from '../../shared/services/loading.service';
import { ZmSkeletonListComponent } from '../../shared/components/skeletons';
import { ZmEmptyStateComponent } from '../../shared/components/ui';
import { TooltipDirective } from '../../core/directives/tooltip.directive';
import { ToastService } from '../../core/services/toast.service';
import { ConfirmDialogService } from '../../core/services/confirm-dialog.service';

@Component({
  selector: 'app-pagina-notificacoes',
  standalone: true,
  imports: [CommonModule, ZmSkeletonListComponent, ZmEmptyStateComponent, RouterLink, TooltipDirective],
  templateUrl: './notificacoes.component.html',
  styleUrl: './notificacoes.component.css',
})
export class NotificacoesComponent implements OnInit {
  notificacoes: Notificacao[] = [];
  showSkeleton!: Signal<boolean>;
  listaPronta = false;
  erro = '';
  /** Filtro "todas" ou só "não lidas" (comum à área clínica e plataforma). */
  filtroPlataforma: 'todas' | 'nao_lidas' = 'todas';

  excluindoId: string | null = null;
  limpandoTudo = false;
  marcandoTodas = false;

  private notifService = inject(NotificacoesService);
  private loadingService = inject(LoadingService);
  private toast = inject(ToastService);
  private confirm = inject(ConfirmDialogService);

  /** Lista filtrada pelo seletor "Todas / Não lidas". */
  get notificacoesFiltradas(): Notificacao[] {
    if (this.filtroPlataforma === 'nao_lidas') {
      return this.notificacoes.filter((n) => !n.read_at);
    }
    return this.notificacoes;
  }

  get quantidadeNaoLidas(): number {
    return this.notificacoes.filter((n) => !n.read_at).length;
  }

  ngOnInit(): void {
    this.carregar();
  }

  carregar(): void {
    const { data$, showSkeleton } = this.loadingService.loadWithThreshold(this.notifService.list());
    this.showSkeleton = showSkeleton;
    data$.subscribe({
      next: (list) => {
        this.listaPronta = true;
        this.notificacoes = list;
      },
      error: () => {
        this.listaPronta = true;
        this.erro = 'Não foi possível carregar as notificações.';
      },
    });
  }

  marcarComoLida(id: string): void {
    this.notifService.marcarComoLida(id).subscribe({
      next: () => this.carregar(),
      error: () => this.toast.error('Erro', 'Não foi possível marcar como lida.'),
    });
  }

  marcarTodas(): void {
    this.marcandoTodas = true;
    this.notifService.marcarTodasComoLidas().subscribe({
      next: () => {
        this.marcandoTodas = false;
        this.carregar();
        this.toast.success('Notificações', 'Todas foram marcadas como lidas.');
      },
      error: () => {
        this.marcandoTodas = false;
        this.toast.error('Erro', 'Não foi possível marcar todas como lidas.');
      },
    });
  }

  async excluir(id: string): Promise<void> {
    const ok = await this.confirm.request({
      title: 'Excluir notificação?',
      message: 'Esta notificação será removida permanentemente.',
      confirmLabel: 'Sim, excluir',
      variant: 'danger',
    });
    if (!ok) return;
    this.excluindoId = id;
    this.notifService.delete(id).subscribe({
      next: () => {
        this.excluindoId = null;
        this.carregar();
        this.toast.success('Notificação excluída', 'O item foi removido.');
      },
      error: () => {
        this.excluindoId = null;
        this.toast.error('Erro', 'Não foi possível excluir.');
      },
    });
  }

  async limparTudo(): Promise<void> {
    const ok = await this.confirm.request({
      title: 'Limpar todas as notificações?',
      message: 'Todas as notificações serão excluídas. Esta ação não pode ser desfeita.',
      confirmLabel: 'Sim, limpar tudo',
      variant: 'danger',
    });
    if (!ok) return;
    this.limpandoTudo = true;
    this.notifService.limparTudo().subscribe({
      next: () => {
        this.limpandoTudo = false;
        this.carregar();
        this.toast.success('Lista limpa', 'Todas as notificações foram removidas.');
      },
      error: () => {
        this.limpandoTudo = false;
        this.toast.error('Erro', 'Não foi possível limpar as notificações.');
      },
    });
  }

  get temNaoLidas(): boolean {
    return this.notificacoes.some((n) => !n.read_at);
  }

  getNotificacaoMensagem(n: Notificacao): string {
    const d = n.data as { message?: string } | undefined;
    return d?.message ?? n.type ?? 'Notificação';
  }

  /** Título da notificação (ex.: "Novo lead na landing"). */
  getNotificacaoTitulo(n: Notificacao): string {
    const d = this.normalizeData(n.data);
    if (typeof d === 'string') return n.type ?? 'Notificação';
    const obj = d as Record<string, unknown> | undefined;
    const t = obj?.['title'] ?? obj?.['subject'];
    return (typeof t === 'string' && t.trim()) ? t.trim() : (n.type ?? 'Notificação');
  }

  /** Corpo/descrição da notificação (ex.: "Lucas Vieira (Clinica São Lucas) solicitou demonstração."). Compatível com body, message, detail, etc. do backend. */
  getNotificacaoDetalhe(n: Notificacao): string {
    const d = this.normalizeData(n.data);
    if (typeof d === 'string' && d.trim()) return d.trim();
    if (!d || typeof d !== 'object') return '';
    const obj = d as Record<string, unknown>;
    const bodyKeys = ['body', 'message', 'detail', 'content', 'description', 'text', 'subtitle'];
    for (const key of bodyKeys) {
      const val = obj[key];
      if (typeof val === 'string' && val.trim()) return val.trim();
    }
    return '';
  }

  /** Se data vier como string JSON (ex. Laravel), parseia. */
  private normalizeData(data: unknown): unknown {
    if (typeof data === 'string') {
      const trimmed = data.trim();
      if ((trimmed.startsWith('{') && trimmed.endsWith('}')) || (trimmed.startsWith('[') && trimmed.endsWith(']'))) {
        try {
          return JSON.parse(trimmed) as unknown;
        } catch {
          return data;
        }
      }
      return data;
    }
    return data;
  }

  /** Tempo relativo em pt-BR (ex.: "há 11 minutos"). */
  tempoRelativo(iso?: string | null): string {
    if (!iso) return '';
    try {
      const d = new Date(iso);
      const now = new Date();
      const diffMs = now.getTime() - d.getTime();
      const diffMin = Math.floor(diffMs / 60000);
      const diffH = Math.floor(diffMin / 60);
      const diffD = Math.floor(diffH / 24);
      if (diffMin < 1) return 'agora';
      if (diffMin < 60) return `há ${diffMin} ${diffMin === 1 ? 'minuto' : 'minutos'}`;
      if (diffH < 24) return `há ${diffH} ${diffH === 1 ? 'hora' : 'horas'}`;
      if (diffD < 7) return `há ${diffD} ${diffD === 1 ? 'dia' : 'dias'}`;
      return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    } catch {
      return iso;
    }
  }

  /** Ícone material conforme tipo da notificação (fallback: `description`). */
  iconeNotificacao(n: Notificacao): string {
    const d = this.normalizeData(n.data);
    if (d && typeof d === 'object') {
      const obj = d as Record<string, unknown>;
      const icon = obj['icon'];
      if (typeof icon === 'string' && icon.trim()) return icon.trim();
      const tipo = typeof obj['type'] === 'string' ? obj['type'] : '';
      const mapa: Record<string, string> = {
        novo_protocolo: 'inbox',
        novo_comentario: 'chat',
        protocolo_aprovado: 'check_circle',
        protocolo_reprovado: 'cancel',
        novo_lead: 'request_quote',
        faturas_vencidas: 'payments',
        assinaturas_pendentes: 'receipt_long',
      };
      if (mapa[tipo]) return mapa[tipo];
    }
    return 'notifications';
  }

  formatarData(iso?: string | null): string {
    if (!iso) return '—';
    try {
      const d = new Date(iso);
      return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    } catch {
      return iso;
    }
  }

  /**
   * Ação contextual na listagem da plataforma (protocolo clínica vs leads vs cobranças).
   */
  notificacaoLinkAcao(
    n: Notificacao
  ): { kind: 'router'; commands: string[]; label: string } | { kind: 'href'; url: string; label: string } | null {
    const d = this.normalizeData(n.data);
    if (!d || typeof d !== 'object') return null;
    const obj = d as Record<string, unknown>;
    const tipo = typeof obj['type'] === 'string' ? obj['type'] : '';

    const sid = obj['submission_id'];
    if (sid != null && !Number.isNaN(Number(sid))) {
      return { kind: 'router', commands: ['/protocolos', String(sid)], label: 'Ver protocolo' };
    }
    if (tipo === 'novo_lead') {
      return { kind: 'router', commands: ['/plataforma/leads'], label: 'Ver leads' };
    }
    if (tipo === 'faturas_vencidas') {
      return { kind: 'router', commands: ['/plataforma/faturas'], label: 'Ver faturas' };
    }
    if (tipo === 'assinaturas_pendentes') {
      return { kind: 'router', commands: ['/plataforma/assinaturas'], label: 'Ver assinaturas' };
    }
    const url = obj['url'];
    if (typeof url === 'string' && url.trim()) {
      return { kind: 'href', url: url.trim(), label: 'Abrir' };
    }
    return null;
  }
}
