import { ChangeDetectionStrategy, Component, computed, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit, Signal, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PlataformaService, PlatformTenant } from '../../../core/services/plataforma.service';
import { LoadingService } from '../../../shared/services/loading.service';
import { ZmPageBackLinkComponent } from '../../../shared/components/ui';
import { ZmSkeletonListComponent } from '../../../shared/components/skeletons';

@Component({
  selector: 'app-plataforma-clientes-visao',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  host: { class: 'n-page clientes-overview-page' },
  imports: [RouterLink, ZmPageBackLinkComponent, ZmSkeletonListComponent],
  templateUrl: './plataforma-clientes-visao.component.html',
  styleUrl: './plataforma-clientes-visao.component.css',
})
export class PlataformaClientesVisaoComponent implements OnInit {
  showSkeleton!: Signal<boolean>;
  readonly listaPronta = signal(false);
  readonly estadoErro = signal(false);
  readonly tenants = signal<PlatformTenant[]>([]);

  readonly nomesDuplicados = computed(() => {
    const contagem = new Map<string, number>();
    this.tenants().forEach((tenant) => {
      const nome = this.normalizar(tenant.name);
      contagem.set(nome, (contagem.get(nome) ?? 0) + 1);
    });
    return new Set([...contagem.entries()].filter(([, total]) => total > 1).map(([nome]) => nome));
  });

  readonly metricas = computed(() => ({
    total: this.tenants().length,
    ativos: this.tenants().filter((tenant) => this.statusContem(tenant, ['active', 'ativo', 'ok', 'paid', 'pago'])).length,
    trial: this.tenants().filter((tenant) => this.statusContem(tenant, ['trial', 'trialing', 'teste'])).length,
    inativos: this.tenants().filter((tenant) => this.statusContem(tenant, ['inactive', 'inativo', 'cancelled', 'canceled', 'cancelado'])).length,
    bloqueados: this.tenants().filter((tenant) => this.statusContem(tenant, ['blocked', 'bloqueado', 'overdue', 'vencido'])).length,
    duplicados: this.nomesDuplicados().size,
  }));

  private readonly plataforma = inject(PlataformaService);
  private readonly loading = inject(LoadingService);

  ngOnInit(): void {
    const { data$, showSkeleton } = this.loading.loadWithThreshold(this.plataforma.getTenants());
    this.showSkeleton = showSkeleton;
    data$.subscribe({
      next: (response) => {
        this.tenants.set(response.data ?? []);
        this.listaPronta.set(true);
      },
      error: () => {
        this.estadoErro.set(true);
        this.listaPronta.set(true);
      },
    });
  }

  private statusContem(tenant: PlatformTenant, valores: string[]): boolean {
    const statuses = [tenant.subscription_status, tenant.billing_status].map((status) => this.normalizar(status));
    return valores.some((valor) => statuses.includes(valor));
  }

  private normalizar(valor?: string | null): string {
    return (valor ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim().toLowerCase();
  }
}
