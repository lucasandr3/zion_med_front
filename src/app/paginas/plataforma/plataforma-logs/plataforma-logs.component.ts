import { Component, OnInit, inject, Signal, ChangeDetectionStrategy, signal, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PlataformaService, PlatformAuditLog } from '../../../core/services/plataforma.service';
import { LoadingService } from '../../../shared/services/loading.service';
import { ListSkeletonComponent } from '../../../shared/components/list-skeleton/list-skeleton.component';

@Component({
  selector: 'app-plataforma-logs',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'n-page-list' },
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [ListSkeletonComponent],
  templateUrl: './plataforma-logs.component.html',
  styleUrl: './plataforma-logs.component.css',
})
export class PlataformaLogsComponent implements OnInit {
  showSkeleton!: Signal<boolean>;
  readonly listaPronta = signal(false);
  readonly error = signal('');
  readonly logs = signal<PlatformAuditLog[]>([]);
  readonly currentPage = signal(1);
  readonly lastPage = signal(1);
  readonly total = signal(0);

  private plataformaService = inject(PlataformaService);
  private loadingService = inject(LoadingService);

  ngOnInit(): void {
    this.carregar();
  }

  carregar(): void {
    const { data$, showSkeleton } = this.loadingService.loadWithThreshold(
      this.plataformaService.getPlatformLogs(this.currentPage()),
    );
    this.showSkeleton = showSkeleton;
    data$.subscribe({
      next: (res) => {
        this.listaPronta.set(true);
        this.error.set('');
        this.logs.set(res.data ?? []);
        this.currentPage.set(res.meta?.current_page ?? 1);
        this.lastPage.set(res.meta?.last_page ?? 1);
        this.total.set(res.meta?.total ?? 0);
      },
      error: () => {
        this.listaPronta.set(true);
        this.error.set('Não foi possível carregar os logs.');
      },
    });
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.lastPage()) return;
    this.currentPage.set(page);
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
