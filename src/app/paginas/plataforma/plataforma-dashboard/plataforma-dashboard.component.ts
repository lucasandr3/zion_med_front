import { Component, OnInit, inject, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';
import { PlataformaService, PlatformTenant, PlatformLead, PlatformAuditLog } from '../../../core/services/plataforma.service';
import { LoadingService } from '../../../shared/services/loading.service';
import { ZmSkeletonListComponent } from '../../../shared/components/skeletons';
import { ZmEmptyStateComponent } from '../../../shared/components/ui';
import { TooltipDirective } from '../../../core/directives/tooltip.directive';

@Component({
  selector: 'app-plataforma-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, ZmSkeletonListComponent, ZmEmptyStateComponent, TooltipDirective],
  templateUrl: './plataforma-dashboard.component.html',
  styleUrl: './plataforma-dashboard.component.css',
})
export class PlataformaDashboardComponent implements OnInit {
  showSkeleton!: Signal<boolean>;
  listaPronta = false;
  estadoErro = false;
  tenantsCount = 0;
  clinicsCount = 0;
  usersCount = 0;
  leadsCount = 0;

  ultimosTenants: PlatformTenant[] = [];
  ultimosLeads: PlatformLead[] = [];
  ultimosLogs: PlatformAuditLog[] = [];

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
        this.listaPronta = true;
        this.tenantsCount = dashboard.data.tenants_count ?? 0;
        this.clinicsCount = dashboard.data.clinics_count ?? 0;
        this.usersCount = dashboard.data.users_count ?? 0;
        this.leadsCount = dashboard.data.leads_count ?? 0;

        this.ultimosTenants = (tenants.data ?? []).slice(0, 5);
        this.ultimosLeads = (leads.data ?? []).slice(0, 5);
        this.ultimosLogs = (logs.data ?? []).slice(0, 5);
      },
      error: () => {
        this.listaPronta = true;
        this.estadoErro = true;
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
