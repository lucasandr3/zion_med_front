import { Component, OnInit, inject, Signal, ChangeDetectionStrategy, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';
import { PlataformaService, PlatformTenant, PlatformLead, PlatformAuditLog } from '../../../core/services/plataforma.service';
import { LoadingService } from '../../../shared/services/loading.service';
import { ZmSkeletonListComponent } from '../../../shared/components/skeletons';
import { ZmEmptyStateComponent } from '../../../shared/components/ui';


@Component({
  selector: 'app-plataforma-dashboard',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'n-page' },
  imports: [CommonModule, RouterLink, ZmSkeletonListComponent, ZmEmptyStateComponent],
  templateUrl: './plataforma-dashboard.component.html',
  styleUrl: './plataforma-dashboard.component.css',
})
export class PlataformaDashboardComponent implements OnInit {
  showSkeleton!: Signal<boolean>;
  readonly listaPronta = signal(false);
  readonly estadoErro = signal(false);
  readonly tenantsCount = signal(0);
  readonly clinicsCount = signal(0);
  readonly usersCount = signal(0);
  readonly leadsCount = signal(0);

  readonly ultimosTenants = signal<PlatformTenant[]>([]);
  readonly ultimosLeads = signal<PlatformLead[]>([]);
  readonly ultimosLogs = signal<PlatformAuditLog[]>([]);

  private plataformaService = inject(PlataformaService);
  private loadingService = inject(LoadingService);

  ngOnInit(): void {
    const load$ = forkJoin({
      dashboard: this.plataformaService.getDashboard(),
      tenants: this.plataformaService.getTenants(),
      leads: this.plataformaService.getLeads(),
      logs: this.plataformaService.getPlatformLogs(1),
    });
    const { data$, showSkeleton } = this.loadingService.loadWithThreshold(load$);
    this.showSkeleton = showSkeleton;
    data$.subscribe({
      next: ({ dashboard, tenants, leads, logs }) => {
        this.listaPronta.set(true);
        this.tenantsCount.set(dashboard.data.tenants_count ?? 0);
        this.clinicsCount.set(dashboard.data.clinics_count ?? 0);
        this.usersCount.set(dashboard.data.users_count ?? 0);
        this.leadsCount.set(dashboard.data.leads_count ?? 0);

        this.ultimosTenants.set((tenants.data ?? []).slice(0, 5));
        this.ultimosLeads.set((leads.data ?? []).slice(0, 5));
        this.ultimosLogs.set((logs.data ?? []).slice(0, 5));
      },
      error: () => {
        this.listaPronta.set(true);
        this.estadoErro.set(true);
      },
    });
  }

  formatarData(iso?: string | null): string {
    if (!iso) return '';
    try {
      const d = new Date(iso);
      return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' });
    } catch {
      return iso;
    }
  }

  logActionLabel(action: string): string {
    const map: Record<string, string> = {
      create: 'Criou',
      update: 'Atualizou',
      delete: 'Excluiu',
      login: 'Login',
      logout: 'Logout',
      view: 'Visualizou',
    };
    return map[action] ?? action;
  }

  logIcon(action: string): string {
    const map: Record<string, string> = {
      create: 'add_circle',
      update: 'edit',
      delete: 'delete',
      login: 'login',
      logout: 'logout',
      view: 'visibility',
    };
    return map[action] ?? 'info';
  }

  logDetalhe(log: PlatformAuditLog): string {
    const parts: string[] = [];
    if (log.entity_type) {
      const typeMap: Record<string, string> = { plan: 'Plano', tenant: 'Cliente', clinic: 'Empresa', user: 'Usuário', settings: 'Configuração' };
      parts.push((typeMap[log.entity_type] ?? log.entity_type) + (log.entity_id != null ? ' #' + log.entity_id : ''));
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
