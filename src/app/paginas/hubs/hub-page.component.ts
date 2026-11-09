import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { catchError, forkJoin, of } from 'rxjs';
import {
  NAVIGATION_HUBS,
  NavigationHubConfig,
} from '../../core/config/navigation-hubs.config';
import { AuthService } from '../../core/services/auth.service';
import { DocumentSendsService } from '../../core/services/document-sends.service';
import { TemplatesService } from '../../core/services/templates.service';
import {
  NavigationHubKpiValues,
  ZmNavigationHubComponent,
} from '../../shared/components/ui/zm-navigation-hub/zm-navigation-hub.component';

@Component({
  selector: 'app-hub-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  host: { class: 'n-page' },
  imports: [RouterLink, ZmNavigationHubComponent],
  template: `
    @if (primaryCta(); as cta) {
      <div class="n-form-toolbar">
        <div class="n-form-toolbar__start"></div>
        <div class="n-form-toolbar__end">
          <nord-button
            variant="primary"
            type="button"
            [routerLink]="routePath(cta.route)"
            [queryParams]="routeQueryParams(cta.route)"
            [attr.title]="cta.label"
          >
            <span class="material-symbols-outlined gestgo-mi gestgo-mi--s" aria-hidden="true">{{ cta.icon }}</span>
            {{ cta.label }}
          </nord-button>
        </div>
      </div>
    }

    @if (config(); as hub) {
      <zm-navigation-hub
        [config]="hub"
        [kpiValues]="kpiValues()"
        [kpisLoading]="kpisLoading()"
      />
    }
  `,
})
export class HubPageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private auth = inject(AuthService);
  private documentSends = inject(DocumentSendsService);
  private templates = inject(TemplatesService);

  readonly config = signal<NavigationHubConfig | null>(null);
  readonly kpiValues = signal<NavigationHubKpiValues>({});
  readonly kpisLoading = signal(false);

  readonly primaryCta = computed(() => {
    const cta = this.config()?.primaryCta;
    if (!cta) return null;
    return this.allowed(cta) ? cta : null;
  });

  ngOnInit(): void {
    const hubId = String(this.route.snapshot.data['hubId'] ?? '');
    const hub = NAVIGATION_HUBS[hubId];
    if (!hub) {
      void this.router.navigateByUrl('/dashboard');
      return;
    }

    const visible = hub.cards.filter((card) => this.allowed(card));

    // Solo com 1 card no hub de configurações: ir direto.
    if (hubId === 'configuracoes' && visible.length === 1) {
      void this.router.navigateByUrl(visible[0]!.route.split('?')[0]!);
      return;
    }

    this.config.set(hub);
    if (hubId === 'documentos' && (hub.kpis?.length ?? 0) > 0) {
      this.carregarKpisDocumentos();
    }
  }

  routePath(route: string): string {
    return route.split('?')[0] || route;
  }

  routeQueryParams(route: string): Record<string, string> | null {
    const q = route.split('?')[1];
    if (!q) return null;
    const params: Record<string, string> = {};
    for (const part of q.split('&')) {
      const [k, v] = part.split('=');
      if (k) params[decodeURIComponent(k)] = decodeURIComponent(v ?? '');
    }
    return params;
  }

  private allowed(item: { permission?: string; permissionsAny?: string[] }): boolean {
    if (item.permission) return this.auth.hasPermission(item.permission);
    if (item.permissionsAny?.length) {
      return item.permissionsAny.some((p) => this.auth.hasPermission(p));
    }
    return true;
  }

  private carregarKpisDocumentos(): void {
    this.kpisLoading.set(true);

    const podeEnvios =
      this.auth.hasPermission('templates.manage') || this.auth.hasPermission('submissions.view');
    const podeModelos = this.auth.hasPermission('templates.manage');

    const pendentes$ = podeEnvios
      ? this.documentSends.list({ caixa: 'pendentes', per_page: 1, page: 1 }).pipe(
          catchError(() => of({ meta: { total: null as number | null } })),
        )
      : of({ meta: { total: null as number | null } });

    const assinados$ = podeEnvios
      ? this.documentSends.list({ caixa: 'assinados', per_page: 1, page: 1 }).pipe(
          catchError(() => of({ meta: { total: null as number | null } })),
        )
      : of({ meta: { total: null as number | null } });

    const modelos$ = podeModelos
      ? this.templates.list().pipe(catchError(() => of(null)))
      : of(null);

    forkJoin({ pendentes: pendentes$, assinados: assinados$, modelos: modelos$ }).subscribe({
      next: ({ pendentes, assinados, modelos }) => {
        this.kpiValues.set({
          aguardando: pendentes.meta?.total ?? null,
          concluidos: assinados.meta?.total ?? null,
          modelos: modelos == null ? null : modelos.length,
        });
        this.kpisLoading.set(false);
      },
      error: () => {
        this.kpiValues.set({ aguardando: null, concluidos: null, modelos: null });
        this.kpisLoading.set(false);
      },
    });
  }
}
