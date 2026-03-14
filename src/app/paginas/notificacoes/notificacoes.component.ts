import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { NotificacoesService, Notificacao } from '../../core/services/notificacoes.service';
import { LoadingOverlayComponent } from '../../componentes/ui/loading-overlay/loading-overlay.component';
import { TooltipDirective } from '../../core/directives/tooltip.directive';

@Component({
  selector: 'app-pagina-notificacoes',
  standalone: true,
  imports: [CommonModule, LoadingOverlayComponent, RouterLink, TooltipDirective],
  templateUrl: './notificacoes.component.html',
  styleUrl: './notificacoes.component.css',
})
export class NotificacoesComponent implements OnInit {
  notificacoes: Notificacao[] = [];
  carregando = false;
  erro = '';
  /** Filtro na área plataforma: todas ou só não lidas */
  filtroPlataforma: 'todas' | 'nao_lidas' = 'todas';

  private notifService = inject(NotificacoesService);
  private router = inject(Router);

  /** True quando a página está dentro da área da plataforma (layout já mostra título e subtítulo). */
  get isPlataforma(): boolean {
    return this.router.url.includes('/plataforma');
  }

  /** Lista filtrada para a área plataforma (Todas ou Não lidas). */
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
    this.carregando = true;
    this.notifService.list().subscribe({
      next: (list) => {
        this.notificacoes = list;
        this.carregando = false;
      },
      error: () => {
        this.carregando = false;
        this.erro = 'Não foi possível carregar as notificações.';
      },
    });
  }

  marcarComoLida(id: number): void {
    this.notifService.marcarComoLida(id).subscribe(() => this.carregar());
  }

  marcarTodas(): void {
    this.notifService.marcarTodasComoLidas().subscribe(() => this.carregar());
  }

  excluir(id: number): void {
    this.notifService.delete(id).subscribe(() => this.carregar());
  }

  limparTudo(): void {
    this.notifService.limparTudo().subscribe(() => this.carregar());
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

  formatarData(iso?: string | null): string {
    if (!iso) return '—';
    try {
      const d = new Date(iso);
      return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    } catch {
      return iso;
    }
  }
}
