import { Component, OnInit, inject, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NotificacoesService, Notificacao } from '../../core/services/notificacoes.service';
import { LoadingService } from '../../shared/services/loading.service';
import { ZmSkeletonListComponent } from '../../shared/components/skeletons';
import { ZmEmptyStateComponent } from '../../shared/components/ui';
import { ZardButtonComponent } from '@/shared/components/button/button.component';
import { ToastService } from '../../core/services/toast.service';
import { ConfirmDialogService } from '../../core/services/confirm-dialog.service';

interface NotificacaoGrupo {
  label: string;
  items: Notificacao[];
}

const LIMITE_INICIAL = 15;
const LIMITE_INCREMENTO = 15;
const ORDEM_GRUPOS = ['Hoje', 'Esta semana', 'Este mês', 'Anteriores'] as const;

@Component({
  selector: 'app-pagina-notificacoes',
  standalone: true,
  imports: [ZmSkeletonListComponent, ZmEmptyStateComponent, RouterLink, ZardButtonComponent],
  templateUrl: './notificacoes.component.html',
  styleUrl: './notificacoes.component.css',
})
export class NotificacoesComponent implements OnInit {
  notificacoes: Notificacao[] = [];
  showSkeleton!: Signal<boolean>;
  listaPronta = false;
  erro = '';
  filtroPlataforma: 'todas' | 'nao_lidas' = 'todas';
  limiteVisivel = LIMITE_INICIAL;

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

  get notificacoesExibidas(): Notificacao[] {
    return this.notificacoesFiltradas.slice(0, this.limiteVisivel);
  }

  alterarFiltro(filtro: 'todas' | 'nao_lidas'): void {
    this.filtroPlataforma = filtro;
    this.limiteVisivel = LIMITE_INICIAL;
  }

  carregarMais(): void {
    this.limiteVisivel += LIMITE_INCREMENTO;
  }

  podeCarregarMais(): boolean {
    return this.notificacoesFiltradas.length > this.limiteVisivel;
  }

  notificacoesAgrupadas(): NotificacaoGrupo[] {
    const mapa = new Map<string, Notificacao[]>();
    for (const notificacao of this.notificacoesExibidas) {
      const label = this.grupoTemporal(notificacao.created_at);
      const lista = mapa.get(label) ?? [];
      lista.push(notificacao);
      mapa.set(label, lista);
    }
    return ORDEM_GRUPOS.filter((label) => mapa.has(label)).map((label) => ({
      label,
      items: mapa.get(label) ?? [],
    }));
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
        novo_usuario: 'person_add',
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

  formatarDataCurta(iso?: string | null): string {
    if (!iso) return '—';
    try {
      const d = new Date(iso);
      return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    } catch {
      return iso;
    }
  }

  notificacaoCategoria(n: Notificacao): string | null {
    const d = this.normalizeData(n.data);
    if (d && typeof d === 'object') {
      const obj = d as Record<string, unknown>;
      const badge = obj['badge'] ?? obj['category'] ?? obj['label'];
      if (typeof badge === 'string' && badge.trim()) {
        return badge.trim();
      }
    }

    const tipo = this.tipoNotificacao(n);
    const mapa: Record<string, string> = {
      novo_protocolo: 'Formulário público',
      novo_comentario: 'Comentário',
      protocolo_aprovado: 'Protocolo',
      protocolo_reprovado: 'Protocolo',
      novo_lead: 'Lead',
      faturas_vencidas: 'Cobrança',
      assinaturas_pendentes: 'Assinatura',
      novo_usuario: 'Usuário',
    };
    return mapa[tipo] ?? null;
  }

  private tipoNotificacao(n: Notificacao): string {
    const d = this.normalizeData(n.data);
    if (d && typeof d === 'object') {
      const obj = d as Record<string, unknown>;
      if (typeof obj['type'] === 'string' && obj['type'].trim()) {
        return obj['type'].trim();
      }
    }
    return (n.type ?? '').trim();
  }

  private grupoTemporal(iso?: string | null): string {
    if (!iso) return 'Anteriores';
    const data = new Date(iso);
    if (Number.isNaN(data.getTime())) return 'Anteriores';

    const agora = new Date();
    const inicioHoje = new Date(agora.getFullYear(), agora.getMonth(), agora.getDate());
    const inicioSemana = new Date(inicioHoje);
    inicioSemana.setDate(inicioSemana.getDate() - 6);
    const inicioMes = new Date(agora.getFullYear(), agora.getMonth(), 1);

    if (data >= inicioHoje) return 'Hoje';
    if (data >= inicioSemana) return 'Esta semana';
    if (data >= inicioMes) return 'Este mês';
    return 'Anteriores';
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
