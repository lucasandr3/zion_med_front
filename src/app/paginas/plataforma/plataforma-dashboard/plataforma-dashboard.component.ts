import { Component, OnInit, inject, Signal, ChangeDetectionStrategy, computed, signal } from '@angular/core';
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
  templateUrl: './plataforma-dashboard-v2.component.html',
  styleUrl: './plataforma-dashboard-v2.component.css',
})
export class PlataformaDashboardComponent implements OnInit {
  showSkeleton!: Signal<boolean>;
  readonly listaPronta = signal(false);
  readonly estadoErro = signal(false);
  readonly tenantsCount = signal(0);
  readonly clinicsCount = signal(0);
  readonly usersCount = signal(0);
  readonly leadsCount = signal(0);
  readonly tenants = signal<PlatformTenant[]>([]);

  readonly clientesAtivos = computed(() => this.tenants().filter((tenant) => this.situacaoTenant(tenant) === 'active').length);
  readonly clientesEmTeste = computed(() => this.tenants().filter((tenant) => this.situacaoTenant(tenant) === 'trial').length);
  readonly clientesComAtencao = computed(() => this.tenants().filter((tenant) => this.situacaoTenant(tenant) === 'attention').length);
  readonly clientesInativos = computed(() => this.tenants().filter((tenant) => this.situacaoTenant(tenant) === 'inactive').length);
  readonly saudeClientes = computed(() => {
    const total = this.tenants().length;
    return total ? Math.round((this.clientesAtivos() / total) * 100) : 100;
  });
  readonly leadsRecentes = computed(() => {
    const limite = Date.now() - 30 * 24 * 60 * 60 * 1000;
    return this.ultimosLeads().filter((lead) => lead.created_at && new Date(lead.created_at).getTime() >= limite).length;
  });

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

        this.tenants.set(tenants.data ?? []);
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

  iniciais(nome: string): string {
    return nome.trim().split(/\s+/).slice(0, 2).map((parte) => parte[0]?.toUpperCase() ?? '').join('');
  }

  statusTenant(tenant: PlatformTenant): string {
    const situacao = this.situacaoTenant(tenant);
    if (situacao === 'active') return 'Ativo';
    if (situacao === 'trial') return 'Em teste';
    if (situacao === 'attention') return 'Requer atenção';
    return 'Inativo';
  }

  statusTenantClasse(tenant: PlatformTenant): string {
    return `is-${this.situacaoTenant(tenant)}`;
  }

  private situacaoTenant(tenant: PlatformTenant): 'active' | 'trial' | 'attention' | 'inactive' {
    const subscription = (tenant.subscription_status ?? '').toLowerCase();
    const billing = (tenant.billing_status ?? '').toLowerCase();
    if (['overdue', 'past_due', 'blocked', 'suspended', 'unpaid'].includes(billing) || ['suspended', 'past_due'].includes(subscription)) return 'attention';
    if (['trial', 'trialing', 'in_trial'].includes(subscription) || tenant.active_plans?.some((plan) => plan.toLowerCase().includes('trial'))) return 'trial';
    if (['inactive', 'canceled', 'cancelled', 'disabled', 'expired'].includes(subscription)) return 'inactive';
    return 'active';
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
