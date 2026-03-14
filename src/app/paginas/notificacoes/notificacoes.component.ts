import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificacoesService, Notificacao } from '../../core/services/notificacoes.service';
import { LoadingOverlayComponent } from '../../componentes/ui/loading-overlay/loading-overlay.component';

@Component({
  selector: 'app-pagina-notificacoes',
  standalone: true,
  imports: [CommonModule, LoadingOverlayComponent],
  templateUrl: './notificacoes.component.html',
  styleUrl: './notificacoes.component.css',
})
export class NotificacoesComponent implements OnInit {
  notificacoes: Notificacao[] = [];
  carregando = false;
  erro = '';
  private notifService = inject(NotificacoesService);

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

  get temNaoLidas(): boolean {
    return this.notificacoes.some((n) => !n.read_at);
  }

  getNotificacaoMensagem(n: Notificacao): string {
    const d = n.data as { message?: string } | undefined;
    return d?.message ?? n.type ?? 'Notificação';
  }
}
