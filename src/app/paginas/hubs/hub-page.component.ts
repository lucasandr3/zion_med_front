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
  NavigationHubCard,
  NavigationHubConfig,
} from '../../core/config/navigation-hubs.config';
import { AuthService } from '../../core/services/auth.service';
import { ClinicaService } from '../../core/services/clinica.service';
import { DashboardData, DashboardService } from '../../core/services/dashboard.service';
import { LinksPublicosService } from '../../core/services/links-publicos.service';
import { PlataformaService } from '../../core/services/plataforma.service';
import { ProtocolosService } from '../../core/services/protocolos.service';
import { TemplatesService } from '../../core/services/templates.service';
import {
  NavigationHubKpiValues,
  ZmNavigationHubComponent,
} from '../../shared/components/ui/zm-navigation-hub/zm-navigation-hub.component';

/** UX-04 — próximo passo solo no hub Documentos (estado via GET /dashboard). */
export interface SoloNextStep {
  title: string;
  text: string;
  ctaLabel: string;
  route: string;
  icon: string;
}

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

    @if (soloNextStep(); as step) {
      <nord-banner variant="info" class="hub-solo-banner">
        <div class="hub-solo-banner__body">
          <div>
            <strong>{{ step.title }}</strong>
            <p class="n-muted n-small m-0">{{ step.text }}</p>
          </div>
          <nord-button
            variant="primary"
            size="s"
            type="button"
            [routerLink]="routePath(step.route)"
            [queryParams]="routeQueryParams(step.route)"
          >
            <span class="material-symbols-outlined gestgo-mi gestgo-mi--s" aria-hidden="true">{{ step.icon }}</span>
            {{ step.ctaLabel }}
          </nord-button>
        </div>
      </nord-banner>
    }

    @if (config(); as hub) {
      <zm-navigation-hub
        [config]="hub"
        [kpiValues]="kpiValues()"
        [kpisLoading]="kpisLoading()"
      />
    }
  `,
  styles: `
    .hub-solo-banner {
      display: block;
      margin-block: var(--n-space-m, 1rem) var(--n-space-l, 1.5rem);
    }
    .hub-solo-banner__body {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: var(--n-space-m, 1rem);
    }
    .hub-solo-banner__body p {
      margin-block-start: 0.25rem;
    }
  `,
})
export class HubPageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private auth = inject(AuthService);
  private clinica = inject(ClinicaService);
  private templates = inject(TemplatesService);
  private protocolos = inject(ProtocolosService);
  private linksPublicos = inject(LinksPublicosService);
  private dashboard = inject(DashboardService);
  private plataforma = inject(PlataformaService);

  readonly config = signal<NavigationHubConfig | null>(null);
  readonly kpiValues = signal<NavigationHubKpiValues>({});
  readonly kpisLoading = signal(false);
  readonly soloNextStep = signal<SoloNextStep | null>(null);

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

    if (hubId === 'configuracoes') {
      const canSwitch = this.auth.canSwitchClinic();
      if (this.auth.hasPermission('organization.manage')) {
        this.clinica.getConfiguracoesPage().subscribe({
          next: (data) =>
            this.applyHub(hubId, hub, {
              canMultiEmpresa: !!data.can_add_multi_empresa,
              canSwitchClinic: canSwitch,
            }),
          error: () =>
            this.applyHub(hubId, hub, { canMultiEmpresa: false, canSwitchClinic: canSwitch }),
        });
        return;
      }
      this.applyHub(hubId, hub, { canMultiEmpresa: false, canSwitchClinic: canSwitch });
      return;
    }

    this.applyHub(hubId, hub, { canMultiEmpresa: false, canSwitchClinic: false });
  }

  private applyHub(
    hubId: string,
    hub: NavigationHubConfig,
    opts: { canMultiEmpresa: boolean; canSwitchClinic: boolean },
  ): void {
    const cards = hub.cards.filter((card) => this.cardVisible(card, opts));

    // Solo com 1 card no hub de configurações: ir direto.
    if (hubId === 'configuracoes' && cards.length === 1) {
      const only = cards[0]!;
      void this.router.navigate([this.routePath(only.route)], {
        queryParams: this.routeQueryParams(only.route),
      });
      return;
    }

    this.config.set({ ...hub, cards });
    if (hubId === 'documentos' && (hub.kpis?.length ?? 0) > 0) {
      this.carregarKpisDocumentos();
      this.carregarSoloNextStep();
    }
    if (hubId === 'plataforma-filas' && (hub.kpis?.length ?? 0) > 0) {
      this.carregarKpisFilas();
    }
    if (hubId === 'plataforma-relacionamento' && (hub.kpis?.length ?? 0) > 0) {
      this.carregarKpisRelacionamento();
    }
  }

  private cardVisible(
    card: NavigationHubCard,
    opts: { canMultiEmpresa: boolean; canSwitchClinic: boolean },
  ): boolean {
    if (card.requiresMultiEmpresa && !opts.canMultiEmpresa) return false;
    if (card.requiresSwitchClinic && !opts.canSwitchClinic) return false;
    return this.allowed(card);
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

  private carregarSoloNextStep(): void {
    this.dashboard.getDashboard().pipe(catchError(() => of(null))).subscribe((data) => {
      if (!data?.onboarding || data.onboarding.completed) {
        this.soloNextStep.set(null);
        return;
      }
      this.soloNextStep.set(this.resolveSoloNextStep(data.onboarding));
    });
  }

  private resolveSoloNextStep(onboarding: NonNullable<DashboardData['onboarding']>): SoloNextStep {
    const templates = onboarding.templates_count ?? 0;
    const publicLinks = onboarding.public_links_count ?? 0;
    const sends = onboarding.sends_count ?? 0;
    const submissions = onboarding.submissions_count ?? 0;

    if (templates === 0 && this.auth.hasPermission('templates.manage')) {
      return {
        title: 'Comece pela sua ficha',
        text: 'Importe o PDF que você já usa no consultório e mapeie os campos.',
        ctaLabel: 'Usar minha ficha atual',
        route: '/templates/importar',
        icon: 'upload_file',
      };
    }

    if (templates > 0 && publicLinks === 0 && this.auth.hasPermission('templates.manage')) {
      return {
        title: 'Publique um formulário',
        text: 'Ative o link público do modelo para poder enviar ou compartilhar.',
        ctaLabel: 'Formulários públicos',
        route: '/links-publicos',
        icon: 'list_alt',
      };
    }

    if (
      publicLinks > 0 &&
      sends + submissions === 0 &&
      (this.auth.hasPermission('templates.manage') || this.auth.hasPermission('submissions.view'))
    ) {
      return {
        title: 'Envie a primeira ficha',
        text: 'Compartilhe o link com um paciente ou colega para validar o fluxo.',
        ctaLabel: 'Novo envio',
        route: '/envios?novo=1',
        icon: 'send',
      };
    }

    return {
      title: 'Acompanhe as respostas',
      text: 'Veja os protocolos recebidos e o status de cada documento.',
      ctaLabel: 'Abrir protocolos',
      route: '/protocolos',
      icon: 'article_person',
    };
  }

  private carregarKpisRelacionamento(): void {
    this.kpisLoading.set(true);
    this.plataforma.getRelationshipOverview().pipe(catchError(() => of(null))).subscribe({
      next: (res) => {
        const o = res?.data;
        this.kpiValues.set({
          tickets_waiting: o?.tickets_waiting ?? null,
          tasks_open: o?.tasks_open ?? null,
          automations_active: o?.automations_active ?? null,
          executions_failed: o?.executions_failed ?? null,
          trials_ending_3d: o?.trials_ending_3d ?? null,
          articles_published: o?.articles_published ?? null,
        });
        this.kpisLoading.set(false);
      },
      error: () => {
        this.kpiValues.set({
          tickets_waiting: null,
          tasks_open: null,
          automations_active: null,
          executions_failed: null,
          trials_ending_3d: null,
          articles_published: null,
        });
        this.kpisLoading.set(false);
      },
    });
  }

  private carregarKpisFilas(): void {
    this.kpisLoading.set(true);
    this.plataforma.getJobsOverview().pipe(catchError(() => of(null))).subscribe({
      next: (res) => {
        const o = res?.data;
        this.kpiValues.set({
          pending: o ? o.pending + o.reserved : null,
          failed: o?.failed ?? null,
          email_pending: o?.email_pending ?? null,
          schedules_count: o?.schedules_count ?? null,
        });
        this.kpisLoading.set(false);
      },
      error: () => {
        this.kpiValues.set({
          pending: null,
          failed: null,
          email_pending: null,
          schedules_count: null,
        });
        this.kpisLoading.set(false);
      },
    });
  }

  private carregarKpisDocumentos(): void {
    this.kpisLoading.set(true);

    const podeModelos = this.auth.hasPermission('templates.manage');
    const podeProtocolos = this.auth.hasPermission('submissions.view');
    const podeFormularios =
      this.auth.hasPermission('templates.manage') || this.auth.hasPermission('submissions.view');

    const modelos$ = podeModelos
      ? this.templates.list().pipe(catchError(() => of(null)))
      : of(null);

    const protocolos$ = podeProtocolos
      ? this.protocolos.list({ per_page: 1, page: 1 }).pipe(
          catchError(() => of({ meta: { total: null as number | null } })),
        )
      : of({ meta: { total: null as number | null } });

    const formularios$ = podeFormularios
      ? this.linksPublicos.list({ per_page: 1, page: 1 }).pipe(
          catchError(() => of({ meta: { total: null as number | null } })),
        )
      : of({ meta: { total: null as number | null } });

    forkJoin({ modelos: modelos$, protocolos: protocolos$, formularios: formularios$ }).subscribe({
      next: ({ modelos, protocolos, formularios }) => {
        this.kpiValues.set({
          modelos: modelos == null ? null : modelos.length,
          protocolos: protocolos.meta?.total ?? null,
          formularios: formularios.meta?.total ?? null,
        });
        this.kpisLoading.set(false);
      },
      error: () => {
        this.kpiValues.set({ modelos: null, protocolos: null, formularios: null });
        this.kpisLoading.set(false);
      },
    });
  }
}
