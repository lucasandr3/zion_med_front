import {
  PlataformaService
} from "./chunk-YNOSNX2Z.js";
import {
  LoadingService,
  ZmSkeletonListComponent
} from "./chunk-GKI5AWTV.js";
import "./chunk-7WBHVE2H.js";
import {
  TooltipDirective
} from "./chunk-LVZEGAGU.js";
import "./chunk-IBJWGIJV.js";
import {
  RouterLink
} from "./chunk-C2NWBPZH.js";
import {
  CommonModule,
  Component,
  UpperCasePipe,
  forkJoin,
  inject,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtextInterpolate3
} from "./chunk-GRLISYEV.js";

// src/app/paginas/plataforma/plataforma-dashboard/plataforma-dashboard.component.ts
var _c0 = (a0) => ["/plataforma/clientes", a0];
var _forTrack0 = ($index, $item) => $item.id;
function PlataformaDashboardComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "zm-skeleton-list", 1);
  }
  if (rf & 2) {
    \u0275\u0275property("rows", 6);
  }
}
function PlataformaDashboardComponent_Conditional_2_Template(rf, ctx) {
}
function PlataformaDashboardComponent_Conditional_3_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2)(1, "p", 47);
    \u0275\u0275text(2, "N\xE3o foi poss\xEDvel carregar os dados. Tente novamente.");
    \u0275\u0275elementEnd()();
  }
}
function PlataformaDashboardComponent_Conditional_3_For_97_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 40)(1, "div", 48);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "uppercase");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 8)(5, "p", 49);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 50);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "span", 51);
    \u0275\u0275text(10, "chevron_right");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const t_r1 = ctx.$implicit;
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(8, _c0, t_r1.id));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(3, 6, (t_r1.name || "").charAt(0)), " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(t_r1.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate3("", t_r1.slug, " \xB7 ", t_r1.clinics_count, " ", t_r1.clinics_count === 1 ? "empresa" : "empresas");
  }
}
function PlataformaDashboardComponent_Conditional_3_ForEmpty_98_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 41)(1, "span", 52);
    \u0275\u0275text(2, "apartment");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 53);
    \u0275\u0275text(4, "Nenhum cliente.");
    \u0275\u0275elementEnd()();
  }
}
function PlataformaDashboardComponent_Conditional_3_For_110_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 55);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const l_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.formatarData(l_r2.created_at));
  }
}
function PlataformaDashboardComponent_Conditional_3_For_110_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 44)(1, "div", 54);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "uppercase");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 8)(5, "p", 49);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 50);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(9, PlataformaDashboardComponent_Conditional_3_For_110_Conditional_9_Template, 2, 1, "span", 55);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const l_r2 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(3, 5, (l_r2.name || "").charAt(0)), " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(l_r2.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", l_r2.email, "", l_r2.clinic ? " \xB7 " + l_r2.clinic : "");
    \u0275\u0275advance();
    \u0275\u0275conditional(l_r2.created_at ? 9 : -1);
  }
}
function PlataformaDashboardComponent_Conditional_3_ForEmpty_111_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 41)(1, "span", 52);
    \u0275\u0275text(2, "request_quote");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 53);
    \u0275\u0275text(4, "Nenhum lead ainda.");
    \u0275\u0275elementEnd()();
  }
}
function PlataformaDashboardComponent_Conditional_3_For_123_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 60);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const log_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" \xB7 ", log_r4.organization_name);
  }
}
function PlataformaDashboardComponent_Conditional_3_For_123_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 44)(1, "div", 56)(2, "span", 57);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "div", 8)(5, "p", 58)(6, "span", 59);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(8, PlataformaDashboardComponent_Conditional_3_For_123_Conditional_8_Template, 2, 1, "span", 60);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "p", 50);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "span", 55);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const log_r4 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.logIcon(log_r4.action));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r2.logActionLabel(log_r4.action));
    \u0275\u0275advance();
    \u0275\u0275conditional(log_r4.organization_name ? 8 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.logDetalhe(log_r4));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.formatarData(log_r4.created_at));
  }
}
function PlataformaDashboardComponent_Conditional_3_ForEmpty_124_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 41)(1, "span", 52);
    \u0275\u0275text(2, "history");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 53);
    \u0275\u0275text(4, "Sem atividade recente.");
    \u0275\u0275elementEnd()();
  }
}
function PlataformaDashboardComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, PlataformaDashboardComponent_Conditional_3_Conditional_0_Template, 3, 0, "div", 2);
    \u0275\u0275elementStart(1, "div", 3)(2, "div", 4)(3, "a", 5)(4, "div", 6)(5, "span", 7);
    \u0275\u0275text(6, "apartment");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 8)(8, "p", 9);
    \u0275\u0275text(9, "Tenants");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p", 10);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "p", 11);
    \u0275\u0275text(13, "clientes cadastrados");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "span", 12);
    \u0275\u0275text(15, "chevron_right");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "div", 13)(17, "div", 14)(18, "span", 15);
    \u0275\u0275text(19, "business");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "div", 8)(21, "p", 9);
    \u0275\u0275text(22, "Empresas");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "p", 10);
    \u0275\u0275text(24);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "p", 11);
    \u0275\u0275text(26, "cl\xEDnicas / filiais");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(27, "div", 13)(28, "div", 16)(29, "span", 17);
    \u0275\u0275text(30, "group");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(31, "div", 8)(32, "p", 9);
    \u0275\u0275text(33, "Usu\xE1rios");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "p", 10);
    \u0275\u0275text(35);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "p", 11);
    \u0275\u0275text(37, "contas ativas");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(38, "a", 18)(39, "div", 19)(40, "span", 20);
    \u0275\u0275text(41, "request_quote");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(42, "div", 8)(43, "p", 9);
    \u0275\u0275text(44, "Leads");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(45, "p", 10);
    \u0275\u0275text(46);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(47, "p", 11);
    \u0275\u0275text(48, "da landing page");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(49, "span", 12);
    \u0275\u0275text(50, "chevron_right");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(51, "div", 21)(52, "h3", 22);
    \u0275\u0275text(53, "Acesso r\xE1pido");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(54, "div", 23)(55, "a", 24)(56, "span", 25);
    \u0275\u0275text(57, "apartment");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(58, "span", 26);
    \u0275\u0275text(59, "Clientes");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(60, "a", 27)(61, "span", 25);
    \u0275\u0275text(62, "request_quote");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(63, "span", 26);
    \u0275\u0275text(64, "Leads");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(65, "a", 28)(66, "span", 25);
    \u0275\u0275text(67, "subscriptions");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(68, "span", 26);
    \u0275\u0275text(69, "Planos");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(70, "a", 29)(71, "span", 25);
    \u0275\u0275text(72, "receipt_long");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(73, "span", 26);
    \u0275\u0275text(74, "Assinaturas");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(75, "a", 30)(76, "span", 25);
    \u0275\u0275text(77, "payments");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(78, "span", 26);
    \u0275\u0275text(79, "Faturas");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(80, "a", 31)(81, "span", 25);
    \u0275\u0275text(82, "settings");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(83, "span", 26);
    \u0275\u0275text(84, "Configura\xE7\xF5es");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(85, "div", 32)(86, "div", 33)(87, "div", 34)(88, "div", 35)(89, "span", 36);
    \u0275\u0275text(90, "apartment");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(91, "h3", 37);
    \u0275\u0275text(92, "\xDAltimos clientes");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(93, "a", 38);
    \u0275\u0275text(94, "Ver todos");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(95, "div", 39);
    \u0275\u0275repeaterCreate(96, PlataformaDashboardComponent_Conditional_3_For_97_Template, 11, 10, "a", 40, _forTrack0, false, PlataformaDashboardComponent_Conditional_3_ForEmpty_98_Template, 5, 0, "div", 41);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(99, "div", 33)(100, "div", 34)(101, "div", 35)(102, "span", 42);
    \u0275\u0275text(103, "request_quote");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(104, "h3", 37);
    \u0275\u0275text(105, "Leads recentes");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(106, "a", 43);
    \u0275\u0275text(107, "Ver todos");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(108, "div", 39);
    \u0275\u0275repeaterCreate(109, PlataformaDashboardComponent_Conditional_3_For_110_Template, 10, 7, "div", 44, _forTrack0, false, PlataformaDashboardComponent_Conditional_3_ForEmpty_111_Template, 5, 0, "div", 41);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(112, "div", 33)(113, "div", 34)(114, "div", 35)(115, "span", 45);
    \u0275\u0275text(116, "history");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(117, "h3", 37);
    \u0275\u0275text(118, "Atividade recente");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(119, "a", 46);
    \u0275\u0275text(120, "Ver todos");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(121, "div", 39);
    \u0275\u0275repeaterCreate(122, PlataformaDashboardComponent_Conditional_3_For_123_Template, 13, 5, "div", 44, _forTrack0, false, PlataformaDashboardComponent_Conditional_3_ForEmpty_124_Template, 5, 0, "div", 41);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r2.estadoErro ? 0 : -1);
    \u0275\u0275advance(11);
    \u0275\u0275textInterpolate(ctx_r2.tenantsCount);
    \u0275\u0275advance(13);
    \u0275\u0275textInterpolate(ctx_r2.clinicsCount);
    \u0275\u0275advance(11);
    \u0275\u0275textInterpolate(ctx_r2.usersCount);
    \u0275\u0275advance(11);
    \u0275\u0275textInterpolate(ctx_r2.leadsCount);
    \u0275\u0275advance(50);
    \u0275\u0275repeater(ctx_r2.ultimosTenants);
    \u0275\u0275advance(13);
    \u0275\u0275repeater(ctx_r2.ultimosLeads);
    \u0275\u0275advance(13);
    \u0275\u0275repeater(ctx_r2.ultimosLogs);
  }
}
var PlataformaDashboardComponent = class _PlataformaDashboardComponent {
  showSkeleton;
  listaPronta = false;
  estadoErro = false;
  tenantsCount = 0;
  clinicsCount = 0;
  usersCount = 0;
  leadsCount = 0;
  ultimosTenants = [];
  ultimosLeads = [];
  ultimosLogs = [];
  plataformaService = inject(PlataformaService);
  loadingService = inject(LoadingService);
  ngOnInit() {
    const load$ = forkJoin({
      dashboard: this.plataformaService.getDashboard(),
      tenants: this.plataformaService.getTenants(),
      leads: this.plataformaService.getLeads(),
      logs: this.plataformaService.getPlatformLogs(1)
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
      }
    });
  }
  formatarData(iso) {
    if (!iso)
      return "";
    try {
      const d = new Date(iso);
      return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "2-digit", hour: "2-digit", minute: "2-digit" });
    } catch {
      return iso;
    }
  }
  logActionLabel(action) {
    const map = {
      create: "Criou",
      update: "Atualizou",
      delete: "Excluiu",
      login: "Login",
      logout: "Logout",
      view: "Visualizou"
    };
    return map[action] ?? action;
  }
  logIcon(action) {
    const map = {
      create: "add_circle",
      update: "edit",
      delete: "delete",
      login: "login",
      logout: "logout",
      view: "visibility"
    };
    return map[action] ?? "info";
  }
  logDetalhe(log) {
    const parts = [];
    if (log.entity_type) {
      const typeMap = { plan: "Plano", tenant: "Cliente", clinic: "Empresa", user: "Usu\xE1rio", settings: "Configura\xE7\xE3o" };
      parts.push((typeMap[log.entity_type] ?? log.entity_type) + (log.entity_id != null ? " #" + log.entity_id : ""));
    }
    const meta = log.meta_json;
    if (meta && typeof meta === "object") {
      Object.entries(meta).forEach(([k, v]) => {
        if (v !== null && v !== void 0 && typeof v !== "object") {
          parts.push(k + ": " + String(v));
        }
      });
    }
    return parts.length ? parts.join(" \xB7 ") : "\u2014";
  }
  static \u0275fac = function PlataformaDashboardComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PlataformaDashboardComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PlataformaDashboardComponent, selectors: [["app-plataforma-dashboard"]], decls: 4, vars: 1, consts: [[1, "relative", "min-h-[300px]"], [3, "rows"], [1, "card", "p-4", "rounded-xl", "mb-6", 2, "background", "rgba(239,68,68,0.08)", "border", "1px solid rgba(239,68,68,0.3)"], [1, "zm-content-enter"], [1, "grid", "grid-cols-1", "sm:grid-cols-2", "lg:grid-cols-4", "gap-4", "mb-6"], ["routerLink", "/plataforma/clientes", "appTooltip", "Ver clientes", 1, "dash-kpi-card", "group"], [1, "dash-kpi-icon", 2, "background", "rgba(99,102,241,0.10)"], [1, "material-symbols-outlined", 2, "color", "#6366f1", "font-size", "22px"], [1, "flex-1", "min-w-0"], [1, "dash-kpi-label"], [1, "dash-kpi-value"], [1, "dash-kpi-sub"], [1, "material-symbols-outlined", "dash-kpi-arrow"], [1, "dash-kpi-card"], [1, "dash-kpi-icon", 2, "background", "rgba(16,185,129,0.10)"], [1, "material-symbols-outlined", 2, "color", "#10b981", "font-size", "22px"], [1, "dash-kpi-icon", 2, "background", "rgba(59,130,246,0.10)"], [1, "material-symbols-outlined", 2, "color", "#3b82f6", "font-size", "22px"], ["routerLink", "/plataforma/leads", "title", "Ver leads", 1, "dash-kpi-card", "group"], [1, "dash-kpi-icon", 2, "background", "rgba(245,158,11,0.10)"], [1, "material-symbols-outlined", 2, "color", "#f59e0b", "font-size", "22px"], [1, "mb-6"], [1, "text-[11px]", "font-bold", "uppercase", "tracking-[0.15em]", "mb-3", 2, "color", "var(--c-muted)"], [1, "grid", "grid-cols-2", "sm:grid-cols-3", "lg:grid-cols-6", "gap-3"], ["routerLink", "/plataforma/clientes", "appTooltip", "Gerenciar clientes", 1, "dash-shortcut"], [1, "material-symbols-outlined", "dash-shortcut-icon"], [1, "dash-shortcut-label"], ["routerLink", "/plataforma/leads", "appTooltip", "Ver leads", 1, "dash-shortcut"], ["routerLink", "/plataforma/planos", "appTooltip", "Gerenciar planos", 1, "dash-shortcut"], ["routerLink", "/plataforma/assinaturas", "appTooltip", "Ver assinaturas", 1, "dash-shortcut"], ["routerLink", "/plataforma/faturas", "appTooltip", "Ver faturas", 1, "dash-shortcut"], ["routerLink", "/plataforma/configuracoes", "appTooltip", "Configura\xE7\xF5es da plataforma", 1, "dash-shortcut"], [1, "grid", "grid-cols-1", "lg:grid-cols-2", "gap-4", "mb-6"], [1, "dash-panel"], [1, "dash-panel-header"], [1, "flex", "items-center", "gap-2"], [1, "material-symbols-outlined", "text-lg", 2, "color", "var(--c-primary)"], [1, "text-sm", "font-semibold", 2, "color", "var(--c-text)"], ["routerLink", "/plataforma/clientes", "appTooltip", "Ver todos os clientes", 1, "dash-panel-link"], [1, "dash-panel-body"], ["appTooltip", "Ver detalhes", 1, "dash-list-item", 3, "routerLink"], [1, "dash-empty"], [1, "material-symbols-outlined", "text-lg", 2, "color", "#f59e0b"], ["routerLink", "/plataforma/leads", "appTooltip", "Ver todos os leads", 1, "dash-panel-link"], [1, "dash-list-item", 2, "cursor", "default"], [1, "material-symbols-outlined", "text-lg", 2, "color", "var(--c-muted)"], ["routerLink", "/plataforma/logs", "appTooltip", "Ver todos os logs", 1, "dash-panel-link"], [1, "text-sm", 2, "color", "var(--c-text)"], [1, "dash-avatar", 2, "background", "color-mix(in srgb, var(--c-primary) 18%, transparent)", "color", "var(--c-primary)"], [1, "text-sm", "font-medium", "truncate", 2, "color", "var(--c-text)"], [1, "text-xs", "truncate", 2, "color", "var(--c-muted)"], [1, "material-symbols-outlined", "text-base", "shrink-0", 2, "color", "var(--c-border)"], [1, "material-symbols-outlined", "text-3xl", "mb-1", 2, "color", "var(--c-border)"], [1, "text-xs", 2, "color", "var(--c-muted)"], [1, "dash-avatar", 2, "background", "rgba(245,158,11,0.12)", "color", "#f59e0b"], [1, "text-[10px]", "shrink-0", "whitespace-nowrap", 2, "color", "var(--c-muted)"], [1, "w-8", "h-8", "rounded-lg", "flex", "items-center", "justify-center", "shrink-0", 2, "background", "var(--c-soft)"], [1, "material-symbols-outlined", 2, "font-size", "16px", "color", "var(--c-primary)"], [1, "text-sm", "truncate", 2, "color", "var(--c-text)"], [1, "font-medium"], [2, "color", "var(--c-muted)"]], template: function PlataformaDashboardComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275conditionalCreate(1, PlataformaDashboardComponent_Conditional_1_Template, 1, 1, "zm-skeleton-list", 1)(2, PlataformaDashboardComponent_Conditional_2_Template, 0, 0)(3, PlataformaDashboardComponent_Conditional_3_Template, 125, 8);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showSkeleton() ? 1 : !ctx.listaPronta ? 2 : 3);
    }
  }, dependencies: [CommonModule, RouterLink, ZmSkeletonListComponent, TooltipDirective, UpperCasePipe], styles: ["\n\n.dash-kpi-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.875rem;\n  padding: 1.125rem 1.25rem;\n  border-radius: 0.875rem;\n  background: var(--c-surface);\n  border: 1px solid var(--c-border);\n  text-decoration: none;\n  color: inherit;\n  transition:\n    border-color 0.18s,\n    box-shadow 0.18s,\n    transform 0.18s;\n}\na.dash-kpi-card[_ngcontent-%COMP%]:hover {\n  border-color: var(--c-primary);\n  box-shadow: 0 2px 12px color-mix(in srgb, var(--c-primary) 12%, transparent);\n  transform: translateY(-1px);\n}\n.dash-kpi-icon[_ngcontent-%COMP%] {\n  width: 2.75rem;\n  height: 2.75rem;\n  border-radius: 0.75rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.dash-kpi-label[_ngcontent-%COMP%] {\n  font-size: 0.65rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.14em;\n  color: var(--c-muted);\n  margin: 0 0 0.125rem;\n}\n.dash-kpi-value[_ngcontent-%COMP%] {\n  font-size: 1.625rem;\n  font-weight: 700;\n  line-height: 1.1;\n  color: var(--c-text);\n  margin: 0;\n}\n.dash-kpi-sub[_ngcontent-%COMP%] {\n  font-size: 0.7rem;\n  color: var(--c-muted);\n  margin: 0.125rem 0 0;\n}\n.dash-kpi-arrow[_ngcontent-%COMP%] {\n  font-size: 18px;\n  color: var(--c-border);\n  flex-shrink: 0;\n  transition: color 0.15s, transform 0.15s;\n}\na.dash-kpi-card[_ngcontent-%COMP%]:hover   .dash-kpi-arrow[_ngcontent-%COMP%] {\n  color: var(--c-primary);\n  transform: translateX(2px);\n}\n.dash-shortcut[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 1rem 0.5rem;\n  border-radius: 0.75rem;\n  background: var(--c-surface);\n  border: 1px solid var(--c-border);\n  text-decoration: none;\n  color: inherit;\n  transition:\n    border-color 0.18s,\n    box-shadow 0.18s,\n    transform 0.18s;\n}\n.dash-shortcut[_ngcontent-%COMP%]:hover {\n  border-color: var(--c-primary);\n  box-shadow: 0 2px 10px color-mix(in srgb, var(--c-primary) 10%, transparent);\n  transform: translateY(-1px);\n}\n.dash-shortcut-icon[_ngcontent-%COMP%] {\n  font-size: 24px;\n  color: var(--c-muted);\n  transition: color 0.15s;\n}\n.dash-shortcut[_ngcontent-%COMP%]:hover   .dash-shortcut-icon[_ngcontent-%COMP%] {\n  color: var(--c-primary);\n}\n.dash-shortcut-label[_ngcontent-%COMP%] {\n  font-size: 0.7rem;\n  font-weight: 600;\n  color: var(--c-muted);\n  transition: color 0.15s;\n}\n.dash-shortcut[_ngcontent-%COMP%]:hover   .dash-shortcut-label[_ngcontent-%COMP%] {\n  color: var(--c-text);\n}\n.dash-panel[_ngcontent-%COMP%] {\n  border-radius: 0.875rem;\n  background: var(--c-surface);\n  border: 1px solid var(--c-border);\n  overflow: hidden;\n}\n.dash-panel-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 0.875rem 1.125rem;\n  border-bottom: 1px solid var(--c-border);\n}\n.dash-panel-link[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  font-weight: 500;\n  color: var(--c-primary);\n  text-decoration: none;\n  transition: opacity 0.15s;\n}\n.dash-panel-link[_ngcontent-%COMP%]:hover {\n  opacity: 0.75;\n}\n.dash-panel-body[_ngcontent-%COMP%] {\n  max-height: 22rem;\n  overflow-y: auto;\n}\n.dash-list-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  padding: 0.75rem 1.125rem;\n  border-bottom: 1px solid var(--c-border);\n  text-decoration: none;\n  color: inherit;\n  transition: background-color 0.12s;\n}\na.dash-list-item[_ngcontent-%COMP%]:hover {\n  background-color: var(--c-soft);\n}\n.dash-list-item[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n.dash-avatar[_ngcontent-%COMP%] {\n  width: 2rem;\n  height: 2rem;\n  border-radius: 0.5rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 0.75rem;\n  font-weight: 700;\n  flex-shrink: 0;\n}\n.dash-empty[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 2.5rem 1rem;\n  text-align: center;\n}\n/*# sourceMappingURL=plataforma-dashboard.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PlataformaDashboardComponent, [{
    type: Component,
    args: [{ selector: "app-plataforma-dashboard", standalone: true, imports: [CommonModule, RouterLink, ZmSkeletonListComponent, TooltipDirective], template: `<div class="relative min-h-[300px]">\r
  @if (showSkeleton()) {\r
    <zm-skeleton-list [rows]="6" />\r
  } @else if (!listaPronta) {\r
  } @else {\r
  @if (estadoErro) {\r
    <div class="card p-4 rounded-xl mb-6" style="background: rgba(239,68,68,0.08); border: 1px solid rgba(239,68,68,0.3)">\r
      <p class="text-sm" style="color: var(--c-text)">N\xE3o foi poss\xEDvel carregar os dados. Tente novamente.</p>\r
    </div>\r
  }\r
\r
  <div class="zm-content-enter">\r
  <!-- KPI Cards -->\r
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">\r
    <a routerLink="/plataforma/clientes" class="dash-kpi-card group" appTooltip="Ver clientes">\r
      <div class="dash-kpi-icon" style="background: rgba(99,102,241,0.10)">\r
        <span class="material-symbols-outlined" style="color: #6366f1; font-size: 22px">apartment</span>\r
      </div>\r
      <div class="flex-1 min-w-0">\r
        <p class="dash-kpi-label">Tenants</p>\r
        <p class="dash-kpi-value">{{ tenantsCount }}</p>\r
        <p class="dash-kpi-sub">clientes cadastrados</p>\r
      </div>\r
      <span class="material-symbols-outlined dash-kpi-arrow">chevron_right</span>\r
    </a>\r
\r
    <div class="dash-kpi-card">\r
      <div class="dash-kpi-icon" style="background: rgba(16,185,129,0.10)">\r
        <span class="material-symbols-outlined" style="color: #10b981; font-size: 22px">business</span>\r
      </div>\r
      <div class="flex-1 min-w-0">\r
        <p class="dash-kpi-label">Empresas</p>\r
        <p class="dash-kpi-value">{{ clinicsCount }}</p>\r
        <p class="dash-kpi-sub">cl\xEDnicas / filiais</p>\r
      </div>\r
    </div>\r
\r
    <div class="dash-kpi-card">\r
      <div class="dash-kpi-icon" style="background: rgba(59,130,246,0.10)">\r
        <span class="material-symbols-outlined" style="color: #3b82f6; font-size: 22px">group</span>\r
      </div>\r
      <div class="flex-1 min-w-0">\r
        <p class="dash-kpi-label">Usu\xE1rios</p>\r
        <p class="dash-kpi-value">{{ usersCount }}</p>\r
        <p class="dash-kpi-sub">contas ativas</p>\r
      </div>\r
    </div>\r
\r
    <a routerLink="/plataforma/leads" class="dash-kpi-card group" title="Ver leads">\r
      <div class="dash-kpi-icon" style="background: rgba(245,158,11,0.10)">\r
        <span class="material-symbols-outlined" style="color: #f59e0b; font-size: 22px">request_quote</span>\r
      </div>\r
      <div class="flex-1 min-w-0">\r
        <p class="dash-kpi-label">Leads</p>\r
        <p class="dash-kpi-value">{{ leadsCount }}</p>\r
        <p class="dash-kpi-sub">da landing page</p>\r
      </div>\r
      <span class="material-symbols-outlined dash-kpi-arrow">chevron_right</span>\r
    </a>\r
  </div>\r
\r
  <!-- Acesso r\xE1pido -->\r
  <div class="mb-6">\r
    <h3 class="text-[11px] font-bold uppercase tracking-[0.15em] mb-3" style="color: var(--c-muted)">Acesso r\xE1pido</h3>\r
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">\r
      <a routerLink="/plataforma/clientes" class="dash-shortcut" appTooltip="Gerenciar clientes">\r
        <span class="material-symbols-outlined dash-shortcut-icon">apartment</span>\r
        <span class="dash-shortcut-label">Clientes</span>\r
      </a>\r
      <a routerLink="/plataforma/leads" class="dash-shortcut" appTooltip="Ver leads">\r
        <span class="material-symbols-outlined dash-shortcut-icon">request_quote</span>\r
        <span class="dash-shortcut-label">Leads</span>\r
      </a>\r
      <a routerLink="/plataforma/planos" class="dash-shortcut" appTooltip="Gerenciar planos">\r
        <span class="material-symbols-outlined dash-shortcut-icon">subscriptions</span>\r
        <span class="dash-shortcut-label">Planos</span>\r
      </a>\r
      <a routerLink="/plataforma/assinaturas" class="dash-shortcut" appTooltip="Ver assinaturas">\r
        <span class="material-symbols-outlined dash-shortcut-icon">receipt_long</span>\r
        <span class="dash-shortcut-label">Assinaturas</span>\r
      </a>\r
      <a routerLink="/plataforma/faturas" class="dash-shortcut" appTooltip="Ver faturas">\r
        <span class="material-symbols-outlined dash-shortcut-icon">payments</span>\r
        <span class="dash-shortcut-label">Faturas</span>\r
      </a>\r
      <a routerLink="/plataforma/configuracoes" class="dash-shortcut" appTooltip="Configura\xE7\xF5es da plataforma">\r
        <span class="material-symbols-outlined dash-shortcut-icon">settings</span>\r
        <span class="dash-shortcut-label">Configura\xE7\xF5es</span>\r
      </a>\r
    </div>\r
  </div>\r
\r
  <!-- Duas colunas: \xDAltimos clientes + Leads recentes -->\r
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">\r
    <!-- \xDAltimos clientes -->\r
    <div class="dash-panel">\r
      <div class="dash-panel-header">\r
        <div class="flex items-center gap-2">\r
          <span class="material-symbols-outlined text-lg" style="color: var(--c-primary)">apartment</span>\r
          <h3 class="text-sm font-semibold" style="color: var(--c-text)">\xDAltimos clientes</h3>\r
        </div>\r
        <a routerLink="/plataforma/clientes" class="dash-panel-link" appTooltip="Ver todos os clientes">Ver todos</a>\r
      </div>\r
      <div class="dash-panel-body">\r
        @for (t of ultimosTenants; track t.id) {\r
          <a [routerLink]="['/plataforma/clientes', t.id]" class="dash-list-item" appTooltip="Ver detalhes">\r
            <div class="dash-avatar" style="background: color-mix(in srgb, var(--c-primary) 18%, transparent); color: var(--c-primary)">\r
              {{ (t.name || '').charAt(0) | uppercase }}\r
            </div>\r
            <div class="flex-1 min-w-0">\r
              <p class="text-sm font-medium truncate" style="color: var(--c-text)">{{ t.name }}</p>\r
              <p class="text-xs truncate" style="color: var(--c-muted)">{{ t.slug }} \xB7 {{ t.clinics_count }} {{ t.clinics_count === 1 ? 'empresa' : 'empresas' }}</p>\r
            </div>\r
            <span class="material-symbols-outlined text-base shrink-0" style="color: var(--c-border)">chevron_right</span>\r
          </a>\r
        } @empty {\r
          <div class="dash-empty">\r
            <span class="material-symbols-outlined text-3xl mb-1" style="color: var(--c-border)">apartment</span>\r
            <p class="text-xs" style="color: var(--c-muted)">Nenhum cliente.</p>\r
          </div>\r
        }\r
      </div>\r
    </div>\r
\r
    <!-- Leads recentes -->\r
    <div class="dash-panel">\r
      <div class="dash-panel-header">\r
        <div class="flex items-center gap-2">\r
          <span class="material-symbols-outlined text-lg" style="color: #f59e0b">request_quote</span>\r
          <h3 class="text-sm font-semibold" style="color: var(--c-text)">Leads recentes</h3>\r
        </div>\r
        <a routerLink="/plataforma/leads" class="dash-panel-link" appTooltip="Ver todos os leads">Ver todos</a>\r
      </div>\r
      <div class="dash-panel-body">\r
        @for (l of ultimosLeads; track l.id) {\r
          <div class="dash-list-item" style="cursor: default">\r
            <div class="dash-avatar" style="background: rgba(245,158,11,0.12); color: #f59e0b">\r
              {{ (l.name || '').charAt(0) | uppercase }}\r
            </div>\r
            <div class="flex-1 min-w-0">\r
              <p class="text-sm font-medium truncate" style="color: var(--c-text)">{{ l.name }}</p>\r
              <p class="text-xs truncate" style="color: var(--c-muted)">{{ l.email }}{{ l.clinic ? ' \xB7 ' + l.clinic : '' }}</p>\r
            </div>\r
            @if (l.created_at) {\r
              <span class="text-[10px] shrink-0 whitespace-nowrap" style="color: var(--c-muted)">{{ formatarData(l.created_at) }}</span>\r
            }\r
          </div>\r
        } @empty {\r
          <div class="dash-empty">\r
            <span class="material-symbols-outlined text-3xl mb-1" style="color: var(--c-border)">request_quote</span>\r
            <p class="text-xs" style="color: var(--c-muted)">Nenhum lead ainda.</p>\r
          </div>\r
        }\r
      </div>\r
    </div>\r
  </div>\r
\r
  <!-- Logs recentes -->\r
  <div class="dash-panel">\r
    <div class="dash-panel-header">\r
      <div class="flex items-center gap-2">\r
        <span class="material-symbols-outlined text-lg" style="color: var(--c-muted)">history</span>\r
        <h3 class="text-sm font-semibold" style="color: var(--c-text)">Atividade recente</h3>\r
      </div>\r
      <a routerLink="/plataforma/logs" class="dash-panel-link" appTooltip="Ver todos os logs">Ver todos</a>\r
    </div>\r
    <div class="dash-panel-body">\r
      @for (log of ultimosLogs; track log.id) {\r
        <div class="dash-list-item" style="cursor: default">\r
          <div class="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style="background: var(--c-soft)">\r
            <span class="material-symbols-outlined" style="font-size: 16px; color: var(--c-primary)">{{ logIcon(log.action) }}</span>\r
          </div>\r
          <div class="flex-1 min-w-0">\r
            <p class="text-sm truncate" style="color: var(--c-text)">\r
              <span class="font-medium">{{ logActionLabel(log.action) }}</span>\r
              @if (log.organization_name) {\r
                <span style="color: var(--c-muted)"> \xB7 {{ log.organization_name }}</span>\r
              }\r
            </p>\r
            <p class="text-xs truncate" style="color: var(--c-muted)">{{ logDetalhe(log) }}</p>\r
          </div>\r
          <span class="text-[10px] shrink-0 whitespace-nowrap" style="color: var(--c-muted)">{{ formatarData(log.created_at) }}</span>\r
        </div>\r
      } @empty {\r
        <div class="dash-empty">\r
          <span class="material-symbols-outlined text-3xl mb-1" style="color: var(--c-border)">history</span>\r
          <p class="text-xs" style="color: var(--c-muted)">Sem atividade recente.</p>\r
        </div>\r
      }\r
    </div>\r
  </div>\r
  </div>\r
  }\r
</div>\r
`, styles: ["/* src/app/paginas/plataforma/plataforma-dashboard/plataforma-dashboard.component.css */\n.dash-kpi-card {\n  display: flex;\n  align-items: center;\n  gap: 0.875rem;\n  padding: 1.125rem 1.25rem;\n  border-radius: 0.875rem;\n  background: var(--c-surface);\n  border: 1px solid var(--c-border);\n  text-decoration: none;\n  color: inherit;\n  transition:\n    border-color 0.18s,\n    box-shadow 0.18s,\n    transform 0.18s;\n}\na.dash-kpi-card:hover {\n  border-color: var(--c-primary);\n  box-shadow: 0 2px 12px color-mix(in srgb, var(--c-primary) 12%, transparent);\n  transform: translateY(-1px);\n}\n.dash-kpi-icon {\n  width: 2.75rem;\n  height: 2.75rem;\n  border-radius: 0.75rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.dash-kpi-label {\n  font-size: 0.65rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.14em;\n  color: var(--c-muted);\n  margin: 0 0 0.125rem;\n}\n.dash-kpi-value {\n  font-size: 1.625rem;\n  font-weight: 700;\n  line-height: 1.1;\n  color: var(--c-text);\n  margin: 0;\n}\n.dash-kpi-sub {\n  font-size: 0.7rem;\n  color: var(--c-muted);\n  margin: 0.125rem 0 0;\n}\n.dash-kpi-arrow {\n  font-size: 18px;\n  color: var(--c-border);\n  flex-shrink: 0;\n  transition: color 0.15s, transform 0.15s;\n}\na.dash-kpi-card:hover .dash-kpi-arrow {\n  color: var(--c-primary);\n  transform: translateX(2px);\n}\n.dash-shortcut {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 1rem 0.5rem;\n  border-radius: 0.75rem;\n  background: var(--c-surface);\n  border: 1px solid var(--c-border);\n  text-decoration: none;\n  color: inherit;\n  transition:\n    border-color 0.18s,\n    box-shadow 0.18s,\n    transform 0.18s;\n}\n.dash-shortcut:hover {\n  border-color: var(--c-primary);\n  box-shadow: 0 2px 10px color-mix(in srgb, var(--c-primary) 10%, transparent);\n  transform: translateY(-1px);\n}\n.dash-shortcut-icon {\n  font-size: 24px;\n  color: var(--c-muted);\n  transition: color 0.15s;\n}\n.dash-shortcut:hover .dash-shortcut-icon {\n  color: var(--c-primary);\n}\n.dash-shortcut-label {\n  font-size: 0.7rem;\n  font-weight: 600;\n  color: var(--c-muted);\n  transition: color 0.15s;\n}\n.dash-shortcut:hover .dash-shortcut-label {\n  color: var(--c-text);\n}\n.dash-panel {\n  border-radius: 0.875rem;\n  background: var(--c-surface);\n  border: 1px solid var(--c-border);\n  overflow: hidden;\n}\n.dash-panel-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 0.875rem 1.125rem;\n  border-bottom: 1px solid var(--c-border);\n}\n.dash-panel-link {\n  font-size: 0.75rem;\n  font-weight: 500;\n  color: var(--c-primary);\n  text-decoration: none;\n  transition: opacity 0.15s;\n}\n.dash-panel-link:hover {\n  opacity: 0.75;\n}\n.dash-panel-body {\n  max-height: 22rem;\n  overflow-y: auto;\n}\n.dash-list-item {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  padding: 0.75rem 1.125rem;\n  border-bottom: 1px solid var(--c-border);\n  text-decoration: none;\n  color: inherit;\n  transition: background-color 0.12s;\n}\na.dash-list-item:hover {\n  background-color: var(--c-soft);\n}\n.dash-list-item:last-child {\n  border-bottom: none;\n}\n.dash-avatar {\n  width: 2rem;\n  height: 2rem;\n  border-radius: 0.5rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 0.75rem;\n  font-weight: 700;\n  flex-shrink: 0;\n}\n.dash-empty {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 2.5rem 1rem;\n  text-align: center;\n}\n/*# sourceMappingURL=plataforma-dashboard.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PlataformaDashboardComponent, { className: "PlataformaDashboardComponent", filePath: "src/app/paginas/plataforma/plataforma-dashboard/plataforma-dashboard.component.ts", lineNumber: 17 });
})();
export {
  PlataformaDashboardComponent
};
//# sourceMappingURL=chunk-VAXY2LAZ.js.map
