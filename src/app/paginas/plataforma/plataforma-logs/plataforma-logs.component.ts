import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlataformaService, PlatformAuditLog } from '../../../core/services/plataforma.service';
import { LoadingOverlayComponent } from '../../../componentes/ui/loading-overlay/loading-overlay.component';

@Component({
  selector: 'app-plataforma-logs',
  standalone: true,
  imports: [CommonModule, LoadingOverlayComponent],
  templateUrl: './plataforma-logs.component.html',
  styleUrl: './plataforma-logs.component.css',
})
export class PlataformaLogsComponent implements OnInit {
  loading = false;
  error = '';
  logs: PlatformAuditLog[] = [];
  currentPage = 1;
  lastPage = 1;
  total = 0;

  private plataformaService = inject(PlataformaService);

  ngOnInit(): void {
    this.carregar();
  }

  carregar(): void {
    this.loading = true;
    this.plataformaService.getPlatformLogs(this.currentPage).subscribe({
      next: (res) => {
        this.loading = false;
        this.logs = res.data ?? [];
        this.currentPage = res.meta?.current_page ?? 1;
        this.lastPage = res.meta?.last_page ?? 1;
        this.total = res.meta?.total ?? 0;
      },
      error: () => {
        this.loading = false;
        this.error = 'Não foi possível carregar os logs.';
      },
    });
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.lastPage) return;
    this.currentPage = page;
    this.carregar();
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

  actionLabel(action: string): string {
    const map: Record<string, string> = {
      create: 'Criar',
      update: 'Atualizar',
      delete: 'Excluir',
      login: 'Login',
      logout: 'Logout',
      view: 'Visualizar',
    };
    return map[action] ?? action;
  }

  entityTypeLabel(type: string | null | undefined): string {
    if (!type) return '';
    const map: Record<string, string> = {
      plan: 'Plano',
      tenant: 'Cliente',
      clinic: 'Empresa',
      user: 'Usuário',
      settings: 'Configuração',
    };
    return map[type] ?? type;
  }

  detalheTexto(log: PlatformAuditLog): string {
    const parts: string[] = [];
    if (log.entity_type) {
      parts.push(this.entityTypeLabel(log.entity_type) + (log.entity_id != null ? ' #' + log.entity_id : ''));
    }
    const meta = log.meta_json;
    if (meta && typeof meta === 'object') {
      Object.entries(meta).forEach(([k, v]) => {
        if (v !== null && v !== undefined && typeof v !== 'object') {
          parts.push(k + ': ' + String(v));
        }
      });
    }
    return parts.length ? parts.join(' · ') : '—';
  }
}
