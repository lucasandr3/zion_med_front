import {
  isBillingBlockedError
} from "./chunk-WSL5UK4K.js";
import {
  TemplatesService
} from "./chunk-E3NIIMGP.js";
import {
  LoadingService,
  ZmSkeletonDashboardComponent
} from "./chunk-GKI5AWTV.js";
import {
  ZmAssinaturaBloqueadaCardComponent
} from "./chunk-CAKNZVE6.js";
import {
  ApiService
} from "./chunk-7WBHVE2H.js";
import {
  AuthService
} from "./chunk-SFRXLDXR.js";
import "./chunk-IBJWGIJV.js";
import {
  RouterLink
} from "./chunk-C2NWBPZH.js";
import {
  CommonModule,
  Component,
  Injectable,
  catchError,
  inject,
  map,
  of,
  setClassMetadata,
  switchMap,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵinterpolate1,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-GRLISYEV.js";

// src/app/core/services/dashboard.service.ts
var DashboardService = class _DashboardService {
  api = inject(ApiService);
  getDashboard() {
    return this.api.get("/dashboard").pipe(map((r) => r.data));
  }
  static \u0275fac = function DashboardService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DashboardService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _DashboardService, factory: _DashboardService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DashboardService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

// src/app/paginas/dashboard/dashboard.component.ts
var _forTrack0 = ($index, $item) => $item.id;
var _forTrack1 = ($index, $item) => $item.key;
function DashboardComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "zm-skeleton-dashboard");
  }
}
function DashboardComponent_Conditional_2_Template(rf, ctx) {
}
function DashboardComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "zm-assinatura-bloqueada-card", 1);
  }
}
function DashboardComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 2);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.mensagemErro);
  }
}
function DashboardComponent_Conditional_5_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4)(1, "span", 5);
    \u0275\u0275text(2, "business");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 6)(4, "p", 7);
    \u0275\u0275text(5, "Selecione uma cl\xEDnica para ver o resumo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 8);
    \u0275\u0275text(7, "Os n\xFAmeros e atalhos do painel s\xE3o exibidos por cl\xEDnica.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "a", 9);
    \u0275\u0275text(9, "Escolher empresa");
    \u0275\u0275elementEnd()();
  }
}
function DashboardComponent_Conditional_5_Conditional_2_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275textInterpolate1(", ", ctx_r0.primeiroNome);
  }
}
function DashboardComponent_Conditional_5_Conditional_2_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 20)(1, "div", 37)(2, "span", 38);
    \u0275\u0275text(3, "bar_chart");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "h2", 39);
    \u0275\u0275text(5, "Protocolos por situa\xE7\xE3o");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 40)(7, "div")(8, "div", 41)(9, "span", 42);
    \u0275\u0275text(10, "Pendente");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "span", 43);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "div", 44);
    \u0275\u0275element(14, "div", 45);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "div")(16, "div", 41)(17, "span", 42);
    \u0275\u0275text(18, "Aprovado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "span", 43);
    \u0275\u0275text(20);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "div", 44);
    \u0275\u0275element(22, "div", 46);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "div")(24, "div", 41)(25, "span", 42);
    \u0275\u0275text(26, "Reprovado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "span", 43);
    \u0275\u0275text(28);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(29, "div", 44);
    \u0275\u0275element(30, "div", 47);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(12);
    \u0275\u0275textInterpolate(ctx_r0.porStatus.pending);
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("width", ctx_r0.totalStatus ? ctx_r0.porStatus.pending / ctx_r0.totalStatus * 100 : 0, "%");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r0.porStatus.approved);
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("width", ctx_r0.totalStatus ? ctx_r0.porStatus.approved / ctx_r0.totalStatus * 100 : 0, "%");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r0.porStatus.rejected);
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("width", ctx_r0.totalStatus ? ctx_r0.porStatus.rejected / ctx_r0.totalStatus * 100 : 0, "%");
  }
}
function DashboardComponent_Conditional_5_Conditional_2_Conditional_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 26);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.linksPublicosCount);
  }
}
function DashboardComponent_Conditional_5_Conditional_2_Conditional_46_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 29);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", ctx_r0.ultimos30Dias, " respostas nos \xFAltimos 30 dias");
  }
}
function DashboardComponent_Conditional_5_Conditional_2_Conditional_51_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 33);
    \u0275\u0275text(1, "Ver todos");
    \u0275\u0275elementEnd();
  }
}
function DashboardComponent_Conditional_5_Conditional_2_For_53_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 34)(1, "div", 48)(2, "div", 49)(3, "span", 50);
    \u0275\u0275text(4, "description");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 6)(6, "span", 51);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span", 52);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(10, "span");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const t_r2 = ctx.$implicit;
    \u0275\u0275property("routerLink", \u0275\u0275interpolate1("/templates/", t_r2.id, "/campos"));
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(t_r2.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(t_r2.created_label);
    \u0275\u0275advance();
    \u0275\u0275classMap(t_r2.is_active ? "dash-badge dash-badge--ativo" : "dash-badge dash-badge--inativo");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", t_r2.is_active ? "Ativo" : "Inativo", " ");
  }
}
function DashboardComponent_Conditional_5_Conditional_2_ForEmpty_54_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 35)(1, "span", 53);
    \u0275\u0275text(2, "description");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 54);
    \u0275\u0275text(4, "Nenhum modelo ainda.");
    \u0275\u0275elementEnd()();
  }
}
function DashboardComponent_Conditional_5_Conditional_2_Conditional_55_For_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 57)(1, "div", 58);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 59);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 60);
    \u0275\u0275text(6, "chevron_right");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const c_r3 = ctx.$implicit;
    \u0275\u0275property("title", "Ver modelos em " + c_r3.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(c_r3.count);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(c_r3.label);
  }
}
function DashboardComponent_Conditional_5_Conditional_2_Conditional_55_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 36)(1, "div", 55)(2, "h2", 32);
    \u0275\u0275text(3, "Modelos por categoria");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "div", 56);
    \u0275\u0275repeaterCreate(5, DashboardComponent_Conditional_5_Conditional_2_Conditional_55_For_6_Template, 7, 3, "a", 57, _forTrack1);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(5);
    \u0275\u0275repeater(ctx_r0.categoriasResumo);
  }
}
function DashboardComponent_Conditional_5_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10)(1, "p", 11);
    \u0275\u0275text(2);
    \u0275\u0275conditionalCreate(3, DashboardComponent_Conditional_5_Conditional_2_Conditional_3_Template, 1, 1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 12);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 13)(7, "a", 14)(8, "p", 15);
    \u0275\u0275text(9, "Pendentes hoje");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p", 16);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "p", 17);
    \u0275\u0275text(13, "Aguardando revis\xE3o");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 18)(15, "p", 15);
    \u0275\u0275text(16, "Modelos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "p", 16);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "p", 17);
    \u0275\u0275text(20, "Total na cl\xEDnica");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "a", 14)(22, "p", 15);
    \u0275\u0275text(23, "Respostas");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "p", 19);
    \u0275\u0275text(25);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "p", 17);
    \u0275\u0275text(27, "\xDAltimos 7 dias");
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(28, DashboardComponent_Conditional_5_Conditional_2_Conditional_28_Template, 31, 9, "div", 20);
    \u0275\u0275elementStart(29, "div", 21)(30, "p", 22);
    \u0275\u0275text(31, "Acesso r\xE1pido");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "div", 23)(33, "a", 24)(34, "span", 25);
    \u0275\u0275text(35, "link");
    \u0275\u0275elementEnd();
    \u0275\u0275text(36, " Links para enviar ");
    \u0275\u0275conditionalCreate(37, DashboardComponent_Conditional_5_Conditional_2_Conditional_37_Template, 2, 1, "span", 26);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "a", 27)(39, "span", 25);
    \u0275\u0275text(40, "add");
    \u0275\u0275elementEnd();
    \u0275\u0275text(41, " Novo modelo ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(42, "a", 28)(43, "span", 25);
    \u0275\u0275text(44, "inbox");
    \u0275\u0275elementEnd();
    \u0275\u0275text(45, " Protocolos ");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(46, DashboardComponent_Conditional_5_Conditional_2_Conditional_46_Template, 2, 1, "p", 29);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(47, "div", 30)(48, "div", 31)(49, "h2", 32);
    \u0275\u0275text(50, "\xDAltimos modelos");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(51, DashboardComponent_Conditional_5_Conditional_2_Conditional_51_Template, 2, 0, "a", 33);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(52, DashboardComponent_Conditional_5_Conditional_2_For_53_Template, 12, 7, "a", 34, _forTrack0, false, DashboardComponent_Conditional_5_Conditional_2_ForEmpty_54_Template, 5, 0, "div", 35);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(55, DashboardComponent_Conditional_5_Conditional_2_Conditional_55_Template, 7, 0, "div", 36);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.saudacao);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.primeiroNome ? 3 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.dataHojeLegivel);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r0.pendentesHoje);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r0.totalTemplates);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r0.ultimos7Dias);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r0.totalStatus > 0 ? 28 : -1);
    \u0275\u0275advance(9);
    \u0275\u0275conditional(ctx_r0.linksPublicosCount > 0 ? 37 : -1);
    \u0275\u0275advance(9);
    \u0275\u0275conditional(ctx_r0.ultimos30Dias > 0 ? 46 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275conditional(ctx_r0.ultimosTemplates.length > 0 ? 51 : -1);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.ultimosTemplates);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r0.categoriasResumo.length > 0 ? 55 : -1);
  }
}
function DashboardComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 3);
    \u0275\u0275conditionalCreate(1, DashboardComponent_Conditional_5_Conditional_1_Template, 10, 0, "div", 4);
    \u0275\u0275conditionalCreate(2, DashboardComponent_Conditional_5_Conditional_2_Template, 56, 12);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.semClinica ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r0.semClinica ? 2 : -1);
  }
}
var CATEGORY_LABELS = {
  personalizado: "Personalizado",
  geral: "Geral",
  clinica_medica: "Cl\xEDnica m\xE9dica",
  odontologia: "Odontologia",
  estetica: "Est\xE9tica / Harmoniza\xE7\xE3o",
  fisioterapia: "Fisioterapia",
  psicologia: "Psicologia / Psiquiatria",
  pediatria: "Pediatria",
  ginecologia: "Ginecologia / Obstetr\xEDcia",
  oftalmologia: "Oftalmologia",
  dermatologia: "Dermatologia",
  laboratorio: "Laborat\xF3rio / Coleta"
};
var DashboardComponent = class _DashboardComponent {
  showSkeleton;
  dashReady = false;
  estadoErro = false;
  mensagemErro = "";
  /** 403 billing_blocked no GET do painel (cartão local; banner global não aparece nesta rota). */
  painelBloqueadoCobranca = false;
  semClinica = false;
  pendentesHoje = 0;
  totalTemplates = 0;
  ultimos7Dias = 0;
  ultimos30Dias = 0;
  linksPublicosCount = 0;
  porStatus = { pending: 0, approved: 0, rejected: 0 };
  ultimosTemplates = [];
  /** Ordenado por quantidade (maior primeiro) */
  categoriasResumo = [];
  dashboardService = inject(DashboardService);
  templatesService = inject(TemplatesService);
  loadingService = inject(LoadingService);
  auth = inject(AuthService);
  get saudacao() {
    const h = (/* @__PURE__ */ new Date()).getHours();
    if (h < 12)
      return "Bom dia";
    if (h < 18)
      return "Boa tarde";
    return "Boa noite";
  }
  get primeiroNome() {
    const n = this.auth.getUser()?.name?.trim();
    if (!n)
      return "";
    return n.split(/\s+/)[0] ?? "";
  }
  get dataHojeLegivel() {
    return (/* @__PURE__ */ new Date()).toLocaleDateString("pt-BR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  }
  get totalStatus() {
    return this.porStatus.pending + this.porStatus.approved + this.porStatus.rejected;
  }
  ngOnInit() {
    const dashboard$ = this.dashboardService.getDashboard().pipe(switchMap((dash) => {
      if (dash.sem_clinica) {
        return of({ dash, templates: [] });
      }
      return this.templatesService.list().pipe(map((templates) => ({ dash, templates })), catchError(() => of({ dash, templates: [] })));
    }));
    const { data$, showSkeleton } = this.loadingService.loadWithThreshold(dashboard$);
    this.showSkeleton = showSkeleton;
    data$.subscribe({
      next: ({ dash, templates }) => {
        this.dashReady = true;
        this.estadoErro = false;
        this.painelBloqueadoCobranca = false;
        this.semClinica = dash.sem_clinica;
        this.pendentesHoje = dash.pendentes_hoje ?? 0;
        this.ultimos7Dias = dash.ultimos_7_dias ?? 0;
        this.ultimos30Dias = dash.ultimos_30_dias ?? 0;
        this.linksPublicosCount = dash.links_publicos_count ?? 0;
        const byId = new Map(templates.map((t) => [t.id, t]));
        this.totalTemplates = templates.length;
        this.ultimosTemplates = (dash.ultimos_templates ?? []).map((t) => {
          const full = byId.get(t.id);
          return {
            id: t.id,
            name: t.name,
            created_at: t.created_at ?? "",
            created_label: this.formatarDataTemplate(t.created_at),
            is_active: full?.is_active !== false
          };
        });
        this.categoriasResumo = this.aggregateCategories(templates);
        const ps = dash.por_status ?? {};
        this.porStatus = {
          pending: Number(ps["pending"] ?? ps["Pending"] ?? 0),
          approved: Number(ps["approved"] ?? ps["Approved"] ?? 0),
          rejected: Number(ps["rejected"] ?? ps["Rejected"] ?? 0)
        };
      },
      error: (err) => {
        this.dashReady = true;
        if (isBillingBlockedError(err)) {
          this.painelBloqueadoCobranca = true;
          this.estadoErro = false;
          return;
        }
        this.painelBloqueadoCobranca = false;
        this.estadoErro = true;
        this.mensagemErro = "N\xE3o foi poss\xEDvel carregar o painel.";
      }
    });
  }
  formatarDataTemplate(s) {
    if (!s)
      return "\u2014";
    const d = new Date(s);
    if (Number.isNaN(d.getTime()))
      return s;
    const data = d.toLocaleDateString("pt-BR", { day: "numeric", month: "short" });
    const hora = d.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
    return `${data} \xB7 ${hora}`;
  }
  aggregateCategories(templates) {
    const map2 = /* @__PURE__ */ new Map();
    for (const t of templates) {
      const key = (t.category ?? "").trim() || "personalizado";
      map2.set(key, (map2.get(key) ?? 0) + 1);
    }
    return Array.from(map2.entries()).map(([key, count]) => ({
      key,
      label: CATEGORY_LABELS[key] ?? (key === "personalizado" ? "Personalizado" : key),
      count
    })).sort((a, b) => b.count - a.count);
  }
  static \u0275fac = function DashboardComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DashboardComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DashboardComponent, selectors: [["app-pagina-dashboard"]], decls: 6, vars: 1, consts: [[1, "dashboard-ref", "relative", "min-h-[300px]"], ["titulo", "Painel indispon\xEDvel at\xE9 regularizar a cobran\xE7a", "descricao", "Com assinatura pendente ou conta bloqueada por pagamento, o resumo e as m\xE9tricas do painel n\xE3o s\xE3o carregados. Ap\xF3s a confirma\xE7\xE3o do pagamento, tudo volta a aparecer aqui."], [1, "text-sm", "mb-4", 2, "color", "var(--c-error, #dc2626)"], [1, "zm-content-enter"], [1, "card", "mb-6", "flex", "items-center", "gap-4", "p-4", "rounded-xl", 2, "background", "var(--c-soft)", "border", "1px solid var(--c-border)"], [1, "material-symbols-outlined", "shrink-0", "text-[28px]", 2, "color", "var(--c-muted)"], [1, "min-w-0"], [1, "text-sm", "font-medium", 2, "color", "var(--c-text)"], [1, "text-xs", "mt-0.5", 2, "color", "var(--c-muted)"], ["routerLink", "/clinica/escolher", "title", "Escolher empresa para visualizar o painel", 1, "btn-primary", "shrink-0"], [1, "dashboard-greeting", "mb-5"], [1, "dashboard-greeting__title", "m-0"], [1, "dashboard-greeting__date", "m-0", "mt-1"], [1, "grid", "grid-cols-1", "sm:grid-cols-3", "gap-3", "mb-5"], ["routerLink", "/protocolos", 1, "dash-metric-card"], [1, "dash-metric-label"], [1, "dash-metric-value"], [1, "dash-metric-sub"], [1, "dash-metric-card"], [1, "dash-metric-value", "dash-metric-value--accent"], [1, "card", "mb-5", "p-5", "rounded-2xl"], [1, "card", "w-full", "mb-5", "rounded-2xl", "p-4"], [1, "text-xs", "font-semibold", "uppercase", "tracking-wider", "mb-3", "m-0", 2, "color", "var(--c-muted)"], [1, "flex", "flex-wrap", "gap-2"], ["routerLink", "/links-publicos", 1, "btn-ghost", "btn-default-bg", "inline-flex", "items-center", "gap-1.5"], [1, "material-symbols-outlined", "text-base"], [1, "text-[0.65rem]", "font-semibold", "px-1.5", "py-0.5", "rounded-md", 2, "background", "var(--c-kpi-accent-soft)", "color", "var(--c-kpi-accent-text)"], ["routerLink", "/templates/criar", 1, "btn-primary", "inline-flex", "items-center", "gap-1.5"], ["routerLink", "/protocolos", 1, "btn-ghost", "btn-default-bg", "inline-flex", "items-center", "gap-1.5"], [1, "text-xs", "mt-3", "mb-0", 2, "color", "var(--c-muted)"], [1, "dash-panel", "mb-5"], [1, "dash-panel__head"], [1, "dash-panel__title"], ["routerLink", "/templates", 1, "dash-link-all"], [1, "dash-row", 3, "routerLink"], [1, "px-5", "py-12", "text-center"], [1, "dash-panel", "mb-2"], [1, "flex", "items-center", "gap-2", "mb-4"], [1, "material-symbols-outlined", "text-xl", 2, "color", "var(--c-muted)"], [1, "text-sm", "font-semibold", "m-0", 2, "color", "var(--c-text)"], [1, "space-y-3"], [1, "flex", "justify-between", "text-xs", "mb-1"], [2, "color", "var(--c-muted)"], [2, "color", "var(--c-text)"], [1, "h-2", "rounded-full", "overflow-hidden", 2, "background", "color-mix(in srgb, var(--c-border) 80%, transparent)"], [1, "h-full", "rounded-full", "bar-fill", "bar-fill--warning"], [1, "h-full", "rounded-full", "bar-fill", "bar-fill--success"], [1, "h-full", "rounded-full", "bar-fill", "bar-fill--danger"], [1, "flex", "items-center", "gap-3", "min-w-0"], ["aria-hidden", "true", 1, "dash-doc-icon"], [1, "material-symbols-outlined"], [1, "text-sm", "font-semibold", "block", "truncate", 2, "color", "var(--c-text)"], [1, "text-xs", 2, "color", "var(--c-muted)"], [1, "material-symbols-outlined", "block", "mb-2", "text-4xl", 2, "color", "var(--c-border)"], [1, "text-sm", "m-0", 2, "color", "var(--c-muted)"], [1, "dash-panel__head", 2, "border-bottom", "1px solid var(--c-border)"], [1, "p-2", "flex", "flex-col", "gap-2"], ["routerLink", "/templates", 1, "dash-category-card", 3, "title"], [1, "dash-category-count"], [1, "dash-category-label", "truncate"], [1, "material-symbols-outlined", "dash-category-chevron"]], template: function DashboardComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275conditionalCreate(1, DashboardComponent_Conditional_1_Template, 1, 0, "zm-skeleton-dashboard")(2, DashboardComponent_Conditional_2_Template, 0, 0)(3, DashboardComponent_Conditional_3_Template, 1, 0, "zm-assinatura-bloqueada-card", 1)(4, DashboardComponent_Conditional_4_Template, 2, 1, "p", 2)(5, DashboardComponent_Conditional_5_Template, 3, 2, "div", 3);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showSkeleton() ? 1 : !ctx.dashReady ? 2 : ctx.painelBloqueadoCobranca ? 3 : ctx.estadoErro ? 4 : 5);
    }
  }, dependencies: [CommonModule, RouterLink, ZmSkeletonDashboardComponent, ZmAssinaturaBloqueadaCardComponent], styles: ["\n\n.dashboard-ref[_ngcontent-%COMP%] {\n  --dash-card-radius: var(--radius-xl, 1rem);\n}\n.dashboard-greeting__title[_ngcontent-%COMP%] {\n  font-size: var(--text-lg);\n  font-weight: 600;\n  color: var(--c-text);\n  letter-spacing: -0.02em;\n}\n.dashboard-greeting__date[_ngcontent-%COMP%] {\n  font-size: var(--text-sm);\n  color: var(--c-muted);\n}\n.bar-fill--warning[_ngcontent-%COMP%] {\n  background: var(--c-warning);\n}\n.bar-fill--success[_ngcontent-%COMP%] {\n  background: var(--c-success);\n}\n.bar-fill--danger[_ngcontent-%COMP%] {\n  background: var(--c-danger);\n}\n.dash-metric-card[_ngcontent-%COMP%] {\n  display: block;\n  border-radius: var(--dash-card-radius);\n  padding: 1.125rem 1.25rem;\n  text-decoration: none;\n  color: inherit;\n  background: var(--c-surface);\n  border: 1px solid var(--c-border);\n  transition:\n    border-color 0.15s ease,\n    box-shadow 0.15s ease,\n    opacity 0.15s ease;\n}\na.dash-metric-card[_ngcontent-%COMP%]:hover {\n  border-color: color-mix(in srgb, var(--c-primary) 35%, var(--c-border));\n  box-shadow: 0 1px 0 color-mix(in srgb, var(--c-kpi-accent) 10%, transparent);\n}\ndiv.dash-metric-card[_ngcontent-%COMP%] {\n  cursor: default;\n}\n.dash-metric-label[_ngcontent-%COMP%] {\n  font-size: 0.6875rem;\n  font-weight: 600;\n  letter-spacing: 0.06em;\n  text-transform: uppercase;\n  color: var(--c-muted);\n  margin: 0 0 0.625rem;\n}\n.dash-metric-value[_ngcontent-%COMP%] {\n  font-size: 1.875rem;\n  font-weight: 700;\n  font-style: normal;\n  line-height: 1.1;\n  color: var(--c-text);\n  margin: 0;\n  font-variant-numeric: tabular-nums;\n}\n.dash-metric-value--accent[_ngcontent-%COMP%] {\n  color: var(--c-kpi-accent-text);\n}\n.dash-metric-sub[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: var(--c-muted);\n  margin: 0.5rem 0 0;\n  line-height: 1.35;\n}\n.dash-doc-icon[_ngcontent-%COMP%] {\n  width: 2.5rem;\n  height: 2.5rem;\n  border-radius: 0.625rem;\n  background: var(--c-kpi-accent-soft);\n  color: var(--c-kpi-accent-text);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.dash-doc-icon[_ngcontent-%COMP%]   .material-symbols-outlined[_ngcontent-%COMP%] {\n  font-size: 1.25rem;\n}\n.dash-badge[_ngcontent-%COMP%] {\n  font-size: 0.6875rem;\n  font-weight: 600;\n  padding: 0.25rem 0.625rem;\n  border-radius: 9999px;\n  flex-shrink: 0;\n}\n.dash-badge--ativo[_ngcontent-%COMP%] {\n  background: var(--c-kpi-accent-soft);\n  color: var(--c-kpi-accent-text);\n}\n.dash-badge--inativo[_ngcontent-%COMP%] {\n  background: var(--c-soft);\n  color: var(--c-muted);\n}\n.dash-category-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.875rem;\n  padding: 0.875rem 1rem;\n  border-radius: var(--dash-card-radius);\n  background: var(--c-soft);\n  border: 1px solid var(--c-border);\n  text-decoration: none;\n  color: inherit;\n  transition: background 0.15s ease, border-color 0.15s ease;\n}\na.dash-category-card[_ngcontent-%COMP%]:hover {\n  background: color-mix(in srgb, var(--c-soft) 70%, var(--c-elevated));\n  border-color: color-mix(in srgb, var(--c-kpi-accent) 22%, var(--c-border));\n}\n.dash-category-count[_ngcontent-%COMP%] {\n  width: 2rem;\n  height: 2rem;\n  border-radius: 9999px;\n  background: var(--c-surface);\n  border: 1px solid var(--c-border);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 0.8125rem;\n  font-weight: 700;\n  color: var(--c-kpi-accent-text);\n  flex-shrink: 0;\n}\n.dash-category-label[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  font-size: 0.875rem;\n  font-weight: 500;\n  color: var(--c-text);\n}\n.dash-category-chevron[_ngcontent-%COMP%] {\n  color: var(--c-muted);\n  font-size: 1.25rem;\n  flex-shrink: 0;\n}\n.dash-panel[_ngcontent-%COMP%] {\n  border-radius: var(--dash-card-radius);\n  overflow: hidden;\n  background: var(--c-surface);\n  border: 1px solid var(--c-border);\n}\n.dash-panel__head[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.5rem;\n  padding: 0.875rem 1.125rem;\n  border-bottom: 1px solid var(--c-border);\n}\n.dash-panel__title[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  font-weight: 600;\n  font-style: normal;\n  color: var(--c-text);\n  margin: 0;\n}\n.dash-link-all[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  font-weight: 600;\n  color: var(--c-kpi-accent-text);\n  text-decoration: none;\n}\n.dash-link-all[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n  text-underline-offset: 2px;\n}\n.dash-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.75rem;\n  padding: 0.875rem 1.125rem;\n  border-bottom: 1px solid var(--c-border);\n  text-decoration: none;\n  color: inherit;\n  transition: background 0.12s ease;\n}\n.dash-row[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\na.dash-row[_ngcontent-%COMP%]:hover {\n  background: var(--c-soft);\n}\n/*# sourceMappingURL=dashboard.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DashboardComponent, [{
    type: Component,
    args: [{ selector: "app-pagina-dashboard", standalone: true, imports: [CommonModule, RouterLink, ZmSkeletonDashboardComponent, ZmAssinaturaBloqueadaCardComponent], template: `<div class="dashboard-ref relative min-h-[300px]">\r
  @if (showSkeleton()) {\r
    <zm-skeleton-dashboard />\r
  } @else if (!dashReady) {\r
  } @else if (painelBloqueadoCobranca) {\r
    <zm-assinatura-bloqueada-card\r
      titulo="Painel indispon\xEDvel at\xE9 regularizar a cobran\xE7a"\r
      descricao="Com assinatura pendente ou conta bloqueada por pagamento, o resumo e as m\xE9tricas do painel n\xE3o s\xE3o carregados. Ap\xF3s a confirma\xE7\xE3o do pagamento, tudo volta a aparecer aqui."\r
    />\r
  } @else if (estadoErro) {\r
    <p class="text-sm mb-4" style="color: var(--c-error, #dc2626)">{{ mensagemErro }}</p>\r
  } @else {\r
    <div class="zm-content-enter">\r
      @if (semClinica) {\r
        <div class="card mb-6 flex items-center gap-4 p-4 rounded-xl" style="background: var(--c-soft); border: 1px solid var(--c-border)">\r
          <span class="material-symbols-outlined shrink-0 text-[28px]" style="color: var(--c-muted)">business</span>\r
          <div class="min-w-0">\r
            <p class="text-sm font-medium" style="color: var(--c-text)">Selecione uma cl\xEDnica para ver o resumo</p>\r
            <p class="text-xs mt-0.5" style="color: var(--c-muted)">Os n\xFAmeros e atalhos do painel s\xE3o exibidos por cl\xEDnica.</p>\r
          </div>\r
          <a routerLink="/clinica/escolher" class="btn-primary shrink-0" title="Escolher empresa para visualizar o painel">Escolher empresa</a>\r
        </div>\r
      }\r
\r
      @if (!semClinica) {\r
        <div class="dashboard-greeting mb-5">\r
          <p class="dashboard-greeting__title m-0">\r
            {{ saudacao }}@if (primeiroNome) {, {{ primeiroNome }}}\r
          </p>\r
          <p class="dashboard-greeting__date m-0 mt-1">{{ dataHojeLegivel }}</p>\r
        </div>\r
\r
        <!-- M\xE9tricas (refer\xEAncia: 3 cards) -->\r
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">\r
          <a routerLink="/protocolos" class="dash-metric-card">\r
            <p class="dash-metric-label">Pendentes hoje</p>\r
            <p class="dash-metric-value">{{ pendentesHoje }}</p>\r
            <p class="dash-metric-sub">Aguardando revis\xE3o</p>\r
          </a>\r
\r
          <div class="dash-metric-card">\r
            <p class="dash-metric-label">Modelos</p>\r
            <p class="dash-metric-value">{{ totalTemplates }}</p>\r
            <p class="dash-metric-sub">Total na cl\xEDnica</p>\r
          </div>\r
\r
          <a routerLink="/protocolos" class="dash-metric-card">\r
            <p class="dash-metric-label">Respostas</p>\r
            <p class="dash-metric-value dash-metric-value--accent">{{ ultimos7Dias }}</p>\r
            <p class="dash-metric-sub">\xDAltimos 7 dias</p>\r
          </a>\r
        </div>\r
\r
        @if (totalStatus > 0) {\r
          <div class="card mb-5 p-5 rounded-2xl">\r
            <div class="flex items-center gap-2 mb-4">\r
              <span class="material-symbols-outlined text-xl" style="color: var(--c-muted)">bar_chart</span>\r
              <h2 class="text-sm font-semibold m-0" style="color: var(--c-text)">Protocolos por situa\xE7\xE3o</h2>\r
            </div>\r
            <div class="space-y-3">\r
              <div>\r
                <div class="flex justify-between text-xs mb-1">\r
                  <span style="color: var(--c-muted)">Pendente</span>\r
                  <span style="color: var(--c-text)">{{ porStatus.pending }}</span>\r
                </div>\r
                <div class="h-2 rounded-full overflow-hidden" style="background: color-mix(in srgb, var(--c-border) 80%, transparent)">\r
                  <div class="h-full rounded-full bar-fill bar-fill--warning" [style.width.%]="totalStatus ? (porStatus.pending / totalStatus * 100) : 0"></div>\r
                </div>\r
              </div>\r
              <div>\r
                <div class="flex justify-between text-xs mb-1">\r
                  <span style="color: var(--c-muted)">Aprovado</span>\r
                  <span style="color: var(--c-text)">{{ porStatus.approved }}</span>\r
                </div>\r
                <div class="h-2 rounded-full overflow-hidden" style="background: color-mix(in srgb, var(--c-border) 80%, transparent)">\r
                  <div class="h-full rounded-full bar-fill bar-fill--success" [style.width.%]="totalStatus ? (porStatus.approved / totalStatus * 100) : 0"></div>\r
                </div>\r
              </div>\r
              <div>\r
                <div class="flex justify-between text-xs mb-1">\r
                  <span style="color: var(--c-muted)">Reprovado</span>\r
                  <span style="color: var(--c-text)">{{ porStatus.rejected }}</span>\r
                </div>\r
                <div class="h-2 rounded-full overflow-hidden" style="background: color-mix(in srgb, var(--c-border) 80%, transparent)">\r
                  <div class="h-full rounded-full bar-fill bar-fill--danger" [style.width.%]="totalStatus ? (porStatus.rejected / totalStatus * 100) : 0"></div>\r
                </div>\r
              </div>\r
            </div>\r
          </div>\r
        }\r
\r
        <!-- Acesso r\xE1pido -->\r
        <div class="card w-full mb-5 rounded-2xl p-4">\r
          <p class="text-xs font-semibold uppercase tracking-wider mb-3 m-0" style="color: var(--c-muted)">Acesso r\xE1pido</p>\r
          <div class="flex flex-wrap gap-2">\r
            <a routerLink="/links-publicos" class="btn-ghost btn-default-bg inline-flex items-center gap-1.5">\r
              <span class="material-symbols-outlined text-base">link</span>\r
              Links para enviar\r
              @if (linksPublicosCount > 0) {\r
                <span class="text-[0.65rem] font-semibold px-1.5 py-0.5 rounded-md" style="background: var(--c-kpi-accent-soft); color: var(--c-kpi-accent-text)">{{ linksPublicosCount }}</span>\r
              }\r
            </a>\r
            <a routerLink="/templates/criar" class="btn-primary inline-flex items-center gap-1.5">\r
              <span class="material-symbols-outlined text-base">add</span>\r
              Novo modelo\r
            </a>\r
            <a routerLink="/protocolos" class="btn-ghost btn-default-bg inline-flex items-center gap-1.5">\r
              <span class="material-symbols-outlined text-base">inbox</span>\r
              Protocolos\r
            </a>\r
          </div>\r
          @if (ultimos30Dias > 0) {\r
            <p class="text-xs mt-3 mb-0" style="color: var(--c-muted)">{{ ultimos30Dias }} respostas nos \xFAltimos 30 dias</p>\r
          }\r
        </div>\r
\r
        <!-- \xDAltimos modelos -->\r
        <div class="dash-panel mb-5">\r
          <div class="dash-panel__head">\r
            <h2 class="dash-panel__title">\xDAltimos modelos</h2>\r
            @if (ultimosTemplates.length > 0) {\r
              <a routerLink="/templates" class="dash-link-all">Ver todos</a>\r
            }\r
          </div>\r
          @for (t of ultimosTemplates; track t.id) {\r
            <a routerLink="/templates/{{ t.id }}/campos" class="dash-row">\r
              <div class="flex items-center gap-3 min-w-0">\r
                <div class="dash-doc-icon" aria-hidden="true">\r
                  <span class="material-symbols-outlined">description</span>\r
                </div>\r
                <div class="min-w-0">\r
                  <span class="text-sm font-semibold block truncate" style="color: var(--c-text)">{{ t.name }}</span>\r
                  <span class="text-xs" style="color: var(--c-muted)">{{ t.created_label }}</span>\r
                </div>\r
              </div>\r
              <span [class]="t.is_active ? 'dash-badge dash-badge--ativo' : 'dash-badge dash-badge--inativo'">\r
                {{ t.is_active ? 'Ativo' : 'Inativo' }}\r
              </span>\r
            </a>\r
          } @empty {\r
            <div class="px-5 py-12 text-center">\r
              <span class="material-symbols-outlined block mb-2 text-4xl" style="color: var(--c-border)">description</span>\r
              <p class="text-sm m-0" style="color: var(--c-muted)">Nenhum modelo ainda.</p>\r
            </div>\r
          }\r
        </div>\r
\r
        <!-- Modelos por categoria -->\r
        @if (categoriasResumo.length > 0) {\r
          <div class="dash-panel mb-2">\r
            <div class="dash-panel__head" style="border-bottom: 1px solid var(--c-border)">\r
              <h2 class="dash-panel__title">Modelos por categoria</h2>\r
            </div>\r
            <div class="p-2 flex flex-col gap-2">\r
              @for (c of categoriasResumo; track c.key) {\r
                <a routerLink="/templates" class="dash-category-card" [title]="'Ver modelos em ' + c.label">\r
                  <div class="dash-category-count">{{ c.count }}</div>\r
                  <span class="dash-category-label truncate">{{ c.label }}</span>\r
                  <span class="material-symbols-outlined dash-category-chevron">chevron_right</span>\r
                </a>\r
              }\r
            </div>\r
          </div>\r
        }\r
      }\r
    </div>\r
  }\r
</div>\r
`, styles: ["/* src/app/paginas/dashboard/dashboard.component.css */\n.dashboard-ref {\n  --dash-card-radius: var(--radius-xl, 1rem);\n}\n.dashboard-greeting__title {\n  font-size: var(--text-lg);\n  font-weight: 600;\n  color: var(--c-text);\n  letter-spacing: -0.02em;\n}\n.dashboard-greeting__date {\n  font-size: var(--text-sm);\n  color: var(--c-muted);\n}\n.bar-fill--warning {\n  background: var(--c-warning);\n}\n.bar-fill--success {\n  background: var(--c-success);\n}\n.bar-fill--danger {\n  background: var(--c-danger);\n}\n.dash-metric-card {\n  display: block;\n  border-radius: var(--dash-card-radius);\n  padding: 1.125rem 1.25rem;\n  text-decoration: none;\n  color: inherit;\n  background: var(--c-surface);\n  border: 1px solid var(--c-border);\n  transition:\n    border-color 0.15s ease,\n    box-shadow 0.15s ease,\n    opacity 0.15s ease;\n}\na.dash-metric-card:hover {\n  border-color: color-mix(in srgb, var(--c-primary) 35%, var(--c-border));\n  box-shadow: 0 1px 0 color-mix(in srgb, var(--c-kpi-accent) 10%, transparent);\n}\ndiv.dash-metric-card {\n  cursor: default;\n}\n.dash-metric-label {\n  font-size: 0.6875rem;\n  font-weight: 600;\n  letter-spacing: 0.06em;\n  text-transform: uppercase;\n  color: var(--c-muted);\n  margin: 0 0 0.625rem;\n}\n.dash-metric-value {\n  font-size: 1.875rem;\n  font-weight: 700;\n  font-style: normal;\n  line-height: 1.1;\n  color: var(--c-text);\n  margin: 0;\n  font-variant-numeric: tabular-nums;\n}\n.dash-metric-value--accent {\n  color: var(--c-kpi-accent-text);\n}\n.dash-metric-sub {\n  font-size: 0.75rem;\n  color: var(--c-muted);\n  margin: 0.5rem 0 0;\n  line-height: 1.35;\n}\n.dash-doc-icon {\n  width: 2.5rem;\n  height: 2.5rem;\n  border-radius: 0.625rem;\n  background: var(--c-kpi-accent-soft);\n  color: var(--c-kpi-accent-text);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.dash-doc-icon .material-symbols-outlined {\n  font-size: 1.25rem;\n}\n.dash-badge {\n  font-size: 0.6875rem;\n  font-weight: 600;\n  padding: 0.25rem 0.625rem;\n  border-radius: 9999px;\n  flex-shrink: 0;\n}\n.dash-badge--ativo {\n  background: var(--c-kpi-accent-soft);\n  color: var(--c-kpi-accent-text);\n}\n.dash-badge--inativo {\n  background: var(--c-soft);\n  color: var(--c-muted);\n}\n.dash-category-card {\n  display: flex;\n  align-items: center;\n  gap: 0.875rem;\n  padding: 0.875rem 1rem;\n  border-radius: var(--dash-card-radius);\n  background: var(--c-soft);\n  border: 1px solid var(--c-border);\n  text-decoration: none;\n  color: inherit;\n  transition: background 0.15s ease, border-color 0.15s ease;\n}\na.dash-category-card:hover {\n  background: color-mix(in srgb, var(--c-soft) 70%, var(--c-elevated));\n  border-color: color-mix(in srgb, var(--c-kpi-accent) 22%, var(--c-border));\n}\n.dash-category-count {\n  width: 2rem;\n  height: 2rem;\n  border-radius: 9999px;\n  background: var(--c-surface);\n  border: 1px solid var(--c-border);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 0.8125rem;\n  font-weight: 700;\n  color: var(--c-kpi-accent-text);\n  flex-shrink: 0;\n}\n.dash-category-label {\n  flex: 1;\n  min-width: 0;\n  font-size: 0.875rem;\n  font-weight: 500;\n  color: var(--c-text);\n}\n.dash-category-chevron {\n  color: var(--c-muted);\n  font-size: 1.25rem;\n  flex-shrink: 0;\n}\n.dash-panel {\n  border-radius: var(--dash-card-radius);\n  overflow: hidden;\n  background: var(--c-surface);\n  border: 1px solid var(--c-border);\n}\n.dash-panel__head {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.5rem;\n  padding: 0.875rem 1.125rem;\n  border-bottom: 1px solid var(--c-border);\n}\n.dash-panel__title {\n  font-size: 0.875rem;\n  font-weight: 600;\n  font-style: normal;\n  color: var(--c-text);\n  margin: 0;\n}\n.dash-link-all {\n  font-size: 0.75rem;\n  font-weight: 600;\n  color: var(--c-kpi-accent-text);\n  text-decoration: none;\n}\n.dash-link-all:hover {\n  text-decoration: underline;\n  text-underline-offset: 2px;\n}\n.dash-row {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.75rem;\n  padding: 0.875rem 1.125rem;\n  border-bottom: 1px solid var(--c-border);\n  text-decoration: none;\n  color: inherit;\n  transition: background 0.12s ease;\n}\n.dash-row:last-child {\n  border-bottom: none;\n}\na.dash-row:hover {\n  background: var(--c-soft);\n}\n/*# sourceMappingURL=dashboard.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DashboardComponent, { className: "DashboardComponent", filePath: "src/app/paginas/dashboard/dashboard.component.ts", lineNumber: 44 });
})();
export {
  DashboardComponent
};
//# sourceMappingURL=chunk-H5JHTNOD.js.map
