import {
  ConfirmDialogService
} from "./chunk-RISAXZFK.js";
import {
  provideFlatpickrDefaults,
  require_pt
} from "./chunk-C34MPJIL.js";
import {
  ToastService
} from "./chunk-EZUVP6MG.js";
import {
  BillingBlockedStateService
} from "./chunk-VRXV74R6.js";
import {
  provideEnvironmentNgxMask
} from "./chunk-4HPDM2KW.js";
import "./chunk-USROZ7PW.js";
import {
  AuthService
} from "./chunk-SFRXLDXR.js";
import "./chunk-IBJWGIJV.js";
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterOutlet,
  bootstrapApplication,
  provideRouter
} from "./chunk-C2NWBPZH.js";
import {
  CommonModule,
  Component,
  HostListener,
  Subject,
  __toESM,
  catchError,
  filter,
  inject,
  provideHttpClient,
  provideZoneChangeDetection,
  registerLocaleData,
  setClassMetadata,
  signal,
  takeUntil,
  throwError,
  withInterceptors,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdomElement,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomListener,
  ɵɵelement,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵresolveDocument,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-GRLISYEV.js";

// node_modules/@angular/common/locales/pt.js
var u = void 0;
function plural(val) {
  const n = val, i = Math.floor(Math.abs(val)), v = val.toString().replace(/^[^.]*\.?/, "").length, e = parseInt(val.toString().replace(/^[^e]*(e([-+]?\d+))?/, "$2")) || 0;
  if (i === Math.floor(i) && (i >= 0 && i <= 1))
    return 1;
  if (e === 0 && (!(i === 0) && (i % 1e6 === 0 && v === 0)) || !(e >= 0 && e <= 5))
    return 4;
  return 5;
}
var pt_default = ["pt", [["AM", "PM"]], u, [["D", "S", "T", "Q", "Q", "S", "S"], ["dom.", "seg.", "ter.", "qua.", "qui.", "sex.", "s\xE1b."], ["domingo", "segunda-feira", "ter\xE7a-feira", "quarta-feira", "quinta-feira", "sexta-feira", "s\xE1bado"], ["dom.", "seg.", "ter.", "qua.", "qui.", "sex.", "s\xE1b."]], u, [["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"], ["jan.", "fev.", "mar.", "abr.", "mai.", "jun.", "jul.", "ago.", "set.", "out.", "nov.", "dez."], ["janeiro", "fevereiro", "mar\xE7o", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"]], u, [["a.C.", "d.C."], u, ["antes de Cristo", "depois de Cristo"]], 0, [6, 0], ["dd/MM/y", "d 'de' MMM 'de' y", "d 'de' MMMM 'de' y", "EEEE, d 'de' MMMM 'de' y"], ["HH:mm", "HH:mm:ss", "HH:mm:ss z", "HH:mm:ss zzzz"], ["{1} {0}", u, u, u], [",", ".", ";", "%", "+", "-", "E", "\xD7", "\u2030", "\u221E", "NaN", ":"], ["#,##0.###", "#,##0%", "\xA4\xA0#,##0.00", "#E0"], "BRL", "R$", "Real brasileiro", { "AUD": ["AU$", "$"], "BYN": [u, "\u0440."], "JPY": ["JP\xA5", "\xA5"], "PHP": [u, "\u20B1"], "PTE": ["Esc."], "RON": [u, "L"], "SYP": [u, "S\xA3"], "THB": ["\u0E3F"], "TWD": ["NT$"], "USD": ["US$", "$"] }, "ltr", plural];

// src/app/app.config.ts
var import_pt = __toESM(require_pt());

// src/app/core/guards/auth.guard.ts
var authGuard = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (!auth.isAuthenticated()) {
    router.navigate(["/autenticacao"]);
    return false;
  }
  return true;
};

// src/app/core/guards/platform.guard.ts
var platformGuard = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (!auth.isAuthenticated()) {
    router.navigate(["/autenticacao"]);
    return false;
  }
  const user = auth.getUser();
  if (user?.role !== "platform_admin") {
    router.navigate(["/dashboard"]);
    return false;
  }
  return true;
};

// src/app/core/guards/permission.guard.ts
function normalizePath(url) {
  const path = url.split("?")[0] ?? url;
  return path.endsWith("/") && path.length > 1 ? path.slice(0, -1) : path;
}
var permissionGuard = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const perm = route.data["permission"];
  const perms = route.data["permissions"];
  const anyOf = route.data["permissionAny"];
  let allowed = true;
  if (perm)
    allowed = auth.hasPermission(perm);
  if (allowed && perms?.length)
    allowed = perms.every((p) => auth.hasPermission(p));
  if (allowed && anyOf?.length)
    allowed = anyOf.some((p) => auth.hasPermission(p));
  if (allowed)
    return true;
  const fallback = auth.getDefaultTenantPath();
  const current = normalizePath(state.url);
  const next = normalizePath(fallback);
  if (current === next) {
    void router.navigateByUrl("/404");
    return false;
  }
  void router.navigateByUrl(fallback);
  return false;
};

// src/app/core/guards/can-switch-organization.guard.ts
var canSwitchOrganizationGuard = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (auth.canSwitchClinic())
    return true;
  const fallback = auth.getDefaultTenantPath();
  const current = (state.url.split("?")[0] ?? state.url).replace(/\/$/, "") || "/";
  const next = fallback.replace(/\/$/, "") || "/";
  if (current === next) {
    void router.navigateByUrl("/404");
    return false;
  }
  void router.navigateByUrl(fallback);
  return false;
};

// src/app/app.routes.ts
var routes = [
  { path: "", loadComponent: () => import("./chunk-M62U5VWV.js").then((m) => m.InicioComponent) },
  { path: "autenticacao", loadComponent: () => import("./chunk-GPNXSWAZ.js").then((m) => m.LoginComponent) },
  { path: "esqueci-a-senha", loadComponent: () => import("./chunk-3DNAMDWX.js").then((m) => m.EsqueciSenhaComponent) },
  { path: "redefinir-senha", loadComponent: () => import("./chunk-GIOAFDYI.js").then((m) => m.RedefinirSenhaComponent) },
  { path: "verificar-email", loadComponent: () => import("./chunk-KY43MJPX.js").then((m) => m.VerificarEmailComponent) },
  { path: "verificacao-pendente", loadComponent: () => import("./chunk-QQIOUOJY.js").then((m) => m.VerificacaoPendenteComponent) },
  { path: "comece", loadComponent: () => import("./chunk-3R34UGKU.js").then((m) => m.ComeceComponent) },
  { path: "termos-de-uso", loadComponent: () => import("./chunk-ZBUPYI2R.js").then((m) => m.TermosComponent) },
  { path: "privacidade", loadComponent: () => import("./chunk-KU5S2UQN.js").then((m) => m.PrivacidadeComponent) },
  { path: "f/sucesso", loadComponent: () => import("./chunk-TLEZSRPK.js").then((m) => m.FormularioPublicoSucessoComponent) },
  { path: "f/:token", loadComponent: () => import("./chunk-ZDNAII66.js").then((m) => m.FormularioPublicoShowComponent) },
  { path: "l/demo/:model", loadComponent: () => import("./chunk-VZFOT53H.js").then((m) => m.DemoLinkBioComponent) },
  { path: "l/:slug", loadComponent: () => import("./chunk-BU225ZC5.js").then((m) => m.LinkBioPublicComponent) },
  {
    path: "",
    loadComponent: () => import("./chunk-GUW2AXHR.js").then((m) => m.LayoutAppComponent),
    canActivate: [authGuard],
    children: [
      { path: "dashboard", canActivate: [permissionGuard], loadComponent: () => import("./chunk-H5JHTNOD.js").then((m) => m.DashboardComponent), data: { titulo: "Painel", permission: "dashboard.access" } },
      { path: "billing", redirectTo: "assinatura", pathMatch: "full" },
      {
        path: "assinatura",
        canActivate: [permissionGuard],
        loadComponent: () => import("./chunk-B6IRJM4E.js").then((m) => m.BillingComponent),
        data: { titulo: "Assinatura", permission: "billing.manage" }
      },
      { path: "links-publicos", canActivate: [permissionGuard], loadComponent: () => import("./chunk-VZT5ZORO.js").then((m) => m.LinksPublicosComponent), data: { titulo: "Links para enviar", permissionAny: ["templates.manage", "submissions.view"] } },
      { path: "envios", canActivate: [permissionGuard], loadComponent: () => import("./chunk-G66VMMK4.js").then((m) => m.EnviosComponent), data: { titulo: "Envios de documento", permissionAny: ["templates.manage", "submissions.view"] } },
      { path: "protocolos", canActivate: [permissionGuard], loadComponent: () => import("./chunk-T54GV2TI.js").then((m) => m.ProtocolosListagemComponent), data: { titulo: "Protocolos", permission: "submissions.view" } },
      { path: "protocolos/:id", canActivate: [permissionGuard], loadComponent: () => import("./chunk-SVL3QERV.js").then((m) => m.ProtocolosDetalheComponent), data: { titulo: "Detalhe do protocolo", permission: "submissions.view", urlVoltar: "/protocolos", labelVoltar: "Voltar para Protocolos" } },
      { path: "pessoas", canActivate: [permissionGuard], loadComponent: () => import("./chunk-PEORJFJ7.js").then((m) => m.PessoasListagemComponent), data: { titulo: "Pessoas", permission: "submissions.view" } },
      { path: "pessoas/criar", canActivate: [permissionGuard], loadComponent: () => import("./chunk-E7ADXGOQ.js").then((m) => m.PessoasFormularioComponent), data: { titulo: "Nova pessoa", permission: "submissions.view", urlVoltar: "/pessoas", labelVoltar: "Voltar para Pessoas" } },
      { path: "pessoas/:id/editar", canActivate: [permissionGuard], loadComponent: () => import("./chunk-E7ADXGOQ.js").then((m) => m.PessoasFormularioComponent), data: { titulo: "Editar pessoa", permission: "submissions.view", urlVoltar: "/pessoas", labelVoltar: "Voltar para Pessoas" } },
      { path: "pessoas/:id", canActivate: [permissionGuard], loadComponent: () => import("./chunk-H44LTBQT.js").then((m) => m.PessoasDetalheComponent), data: { titulo: "Ficha da pessoa", permission: "submissions.view", urlVoltar: "/pessoas", labelVoltar: "Voltar para Pessoas" } },
      { path: "notificacoes", canActivate: [permissionGuard], loadComponent: () => import("./chunk-CKUOTZKE.js").then((m) => m.NotificacoesComponent), data: { titulo: "Notifica\xE7\xF5es", permission: "notifications.access" } },
      { path: "templates", canActivate: [permissionGuard], loadComponent: () => import("./chunk-WMZYEMAS.js").then((m) => m.TemplatesListagemComponent), data: { titulo: "Modelos de formul\xE1rio", permission: "templates.manage" } },
      { path: "templates/criar", canActivate: [permissionGuard], loadComponent: () => import("./chunk-PEU3XTAF.js").then((m) => m.TemplatesCriarComponent), data: { titulo: "Novo modelo", permission: "templates.manage", urlVoltar: "/templates", labelVoltar: "Voltar para modelos" } },
      { path: "templates/criar-em-branco", canActivate: [permissionGuard], loadComponent: () => import("./chunk-2PTMV6K2.js").then((m) => m.TemplatesCriarEmBrancoComponent), data: { titulo: "Novo modelo (em branco)", permission: "templates.manage", urlVoltar: "/templates/criar", labelVoltar: "Voltar \xE0 escolha de modelo" } },
      { path: "templates/:id/editar", canActivate: [permissionGuard], loadComponent: () => import("./chunk-7LMRBZ7W.js").then((m) => m.TemplatesEditarComponent), data: { titulo: "Editar modelo", permission: "templates.manage", urlVoltar: "/templates", labelVoltar: "Voltar para modelos" } },
      { path: "templates/:id/campos", canActivate: [permissionGuard], loadComponent: () => import("./chunk-A3NHBQAQ.js").then((m) => m.TemplatesCamposComponent), data: { titulo: "Campos do modelo", permission: "templates.manage", urlVoltar: "/templates", labelVoltar: "Voltar para modelos" } },
      { path: "clinica/configuracoes", canActivate: [permissionGuard], loadComponent: () => import("./chunk-P7KK4S5M.js").then((m) => m.ClinicaConfiguracoesComponent), data: { titulo: "Configura\xE7\xF5es", permission: "organization.manage" } },
      { path: "clinica/escolher", canActivate: [canSwitchOrganizationGuard], loadComponent: () => import("./chunk-4ZEQ6ZGG.js").then((m) => m.ClinicaEscolherComponent), data: { titulo: "Escolher empresa", urlVoltar: "/dashboard", labelVoltar: "Painel" } },
      { path: "clinica/integracoes", canActivate: [permissionGuard], loadComponent: () => import("./chunk-DC4IDSM3.js").then((m) => m.ClinicaIntegracoesComponent), data: { titulo: "Integra\xE7\xF5es", permission: "organization.manage", urlVoltar: "/clinica/configuracoes", labelVoltar: "Empresa" } },
      { path: "link-bio", canActivate: [permissionGuard], loadComponent: () => import("./chunk-UD47M4Z7.js").then((m) => m.LinkBioComponent), data: { titulo: "P\xE1gina de links", permission: "organization.manage", urlVoltar: "/clinica/configuracoes", labelVoltar: "Empresa" } },
      { path: "usuarios", canActivate: [permissionGuard], loadComponent: () => import("./chunk-I77MC64Q.js").then((m) => m.UsuariosListagemComponent), data: { titulo: "Usu\xE1rios", permission: "users.manage" } },
      { path: "usuarios/criar", canActivate: [permissionGuard], loadComponent: () => import("./chunk-37CX7PZV.js").then((m) => m.UsuariosFormularioComponent), data: { titulo: "Novo usu\xE1rio", permission: "users.manage", urlVoltar: "/usuarios", labelVoltar: "Voltar para Usu\xE1rios" } },
      { path: "usuarios/:id/editar", canActivate: [permissionGuard], loadComponent: () => import("./chunk-37CX7PZV.js").then((m) => m.UsuariosFormularioComponent), data: { titulo: "Editar usu\xE1rio", permission: "users.manage", urlVoltar: "/usuarios", labelVoltar: "Voltar para Usu\xE1rios" } },
      { path: "organizacao/permissoes", canActivate: [permissionGuard], loadComponent: () => import("./chunk-MBATBIH7.js").then((m) => m.OrganizacaoPapeisListagemComponent), data: { titulo: "Permiss\xF5es", permission: "users.manage", urlVoltar: "/usuarios", labelVoltar: "Usu\xE1rios" } },
      { path: "organizacao/permissoes/:slug", canActivate: [permissionGuard], loadComponent: () => import("./chunk-DA3YI4U2.js").then((m) => m.OrganizacaoPapelFormularioComponent), data: { titulo: "Permiss\xF5es", permission: "users.manage", urlVoltar: "/organizacao/permissoes", labelVoltar: "Voltar \xE0s permiss\xF5es" } }
    ]
  },
  {
    path: "plataforma",
    loadComponent: () => import("./chunk-2C7FHRDD.js").then((m) => m.LayoutPlataformaComponent),
    canActivate: [authGuard, platformGuard],
    children: [
      { path: "", loadComponent: () => import("./chunk-VAXY2LAZ.js").then((m) => m.PlataformaDashboardComponent), data: { titulo: "Vis\xE3o geral" } },
      { path: "clientes", loadComponent: () => import("./chunk-HNLRRWQ5.js").then((m) => m.PlataformaClientesComponent), data: { titulo: "Clientes (tenants)", subtitulo: "Vis\xE3o geral dos clientes utilizando o Gestgo." } },
      { path: "clientes/:id", loadComponent: () => import("./chunk-YGSXRJEO.js").then((m) => m.PlataformaClienteDetalheComponent), data: { titulo: "Cliente", urlVoltar: "/plataforma/clientes", labelVoltar: "Voltar para Clientes" } },
      { path: "leads", loadComponent: () => import("./chunk-3DU6XPFU.js").then((m) => m.PlataformaLeadsComponent), data: { titulo: "Leads", subtitulo: "Solicita\xE7\xF5es de demonstra\xE7\xE3o da landing." } },
      { path: "notificacoes", loadComponent: () => import("./chunk-CKUOTZKE.js").then((m) => m.NotificacoesComponent), data: { titulo: "Notifica\xE7\xF5es", subtitulo: "Central de notifica\xE7\xF5es." } },
      { path: "assinaturas", loadComponent: () => import("./chunk-2LKCDVZJ.js").then((m) => m.PlataformaAssinaturasComponent), data: { titulo: "Assinaturas", subtitulo: "Vis\xE3o geral das assinaturas por cliente e empresa." } },
      { path: "faturas", loadComponent: () => import("./chunk-DGZWN6SH.js").then((m) => m.PlataformaFaturasComponent), data: { titulo: "Faturas / cobran\xE7as", subtitulo: "Vis\xE3o geral das faturas e cobran\xE7as por cliente e empresa." } },
      { path: "planos", loadComponent: () => import("./chunk-QXXSYCON.js").then((m) => m.PlataformaPlanosComponent), data: { titulo: "Planos" } },
      { path: "planos/novo", loadComponent: () => import("./chunk-RRMMMWBM.js").then((m) => m.PlataformaPlanoFormComponent), data: { titulo: "Novo plano", urlVoltar: "/plataforma/planos", labelVoltar: "Voltar para Planos" } },
      { path: "planos/:id/editar", loadComponent: () => import("./chunk-RRMMMWBM.js").then((m) => m.PlataformaPlanoFormComponent), data: { titulo: "Editar plano", urlVoltar: "/plataforma/planos", labelVoltar: "Voltar para Planos" } },
      { path: "configuracoes", loadComponent: () => import("./chunk-3SDR3ZEE.js").then((m) => m.PlataformaConfiguracoesComponent), data: { titulo: "Configura\xE7\xF5es da plataforma", subtitulo: "Par\xE2metros edit\xE1veis (banco). API e URL continuam no .env." } },
      { path: "logs", loadComponent: () => import("./chunk-V3C2UHIB.js").then((m) => m.PlataformaLogsComponent), data: { titulo: "Meus logs de auditoria", subtitulo: "A\xE7\xF5es realizadas por voc\xEA na plataforma" } }
    ]
  },
  { path: "404", loadComponent: () => import("./chunk-TRWR45L5.js").then((m) => m.Erro404Component) },
  { path: "**", redirectTo: "404" }
];

// src/app/core/interceptors/auth.interceptor.ts
var authInterceptor = (req, next) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const billingBlockedState = inject(BillingBlockedStateService);
  const token = auth.getToken();
  const organizationId = auth.getCurrentOrganizationId();
  let clone = req;
  const isPublicForm = req.url.includes("formulario-publico");
  if (token && req.url.includes("/api/") && !isPublicForm) {
    const isMultipart = req.body instanceof FormData;
    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: "application/json"
    };
    if (organizationId != null && organizationId !== "") {
      headers["X-Organization-Id"] = String(organizationId);
      headers["X-Clinic-Id"] = String(organizationId);
    }
    if (!isMultipart) {
      headers["Content-Type"] = req.headers.get("Content-Type") ?? "application/json";
    }
    clone = req.clone({ setHeaders: headers });
  }
  return next(clone).pipe(catchError((err) => {
    if (err.status === 401) {
      auth.clearSession();
      router.navigate(["/autenticacao"]);
    } else if (err.status === 403 && token && req.url.includes("/api/v1/") && !req.url.includes("auth/send-verification-email")) {
      const code = err.error?.code;
      if (code === "billing_blocked") {
        const url = req.url;
        const skipGlobalBanner = url.includes("/clinica/logs") || url.includes("/api/v1/dashboard") || url.includes("/api/v1/billing");
        if (!skipGlobalBanner) {
          billingBlockedState.activate();
        }
        return throwError(() => err);
      } else {
        router.navigate(["/verificacao-pendente"]);
      }
    }
    return throwError(() => err);
  }));
};

// src/app/app.config.ts
var appConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideFlatpickrDefaults({
      locale: import_pt.Portuguese,
      dateFormat: "Y-m-d",
      altInput: true,
      altFormat: "d/m/Y",
      allowInput: true,
      disableMobile: true,
      static: true
    }),
    provideEnvironmentNgxMask({
      validation: false,
      dropSpecialCharacters: false
    })
  ]
};

// src/app/componentes/ui/toast-container/toast-container.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function ToastContainerComponent_For_2_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 7);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const t_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(t_r2.desc);
  }
}
function ToastContainerComponent_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "div", 2)(1, "div", 3)(2, "span", 4);
    \u0275\u0275text(3);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(4, "div", 5)(5, "div", 6);
    \u0275\u0275text(6);
    \u0275\u0275domElementEnd();
    \u0275\u0275conditionalCreate(7, ToastContainerComponent_For_2_Conditional_7_Template, 2, 1, "div", 7);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(8, "button", 8);
    \u0275\u0275domListener("click", function ToastContainerComponent_For_2_Template_button_click_8_listener() {
      const t_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.dismiss(t_r2.id));
    });
    \u0275\u0275domElementStart(9, "span", 4);
    \u0275\u0275text(10, "close");
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElement(11, "div", 9);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const t_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classProp("toast-success", t_r2.type === "success")("toast-error", t_r2.type === "error")("toast-warning", t_r2.type === "warning")("toast-info", t_r2.type === "info");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.icon(t_r2.type));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(t_r2.title);
    \u0275\u0275advance();
    \u0275\u0275conditional(t_r2.desc ? 7 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275styleProp("animation-duration", t_r2.duration + "ms");
  }
}
var ToastContainerComponent = class _ToastContainerComponent {
  toastService = inject(ToastService);
  toasts = this.toastService.toasts;
  icon(type) {
    const m = {
      success: "check",
      error: "error",
      warning: "warning",
      info: "info"
    };
    return m[type];
  }
  dismiss(id) {
    this.toastService.remove(id);
  }
  static \u0275fac = function ToastContainerComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ToastContainerComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ToastContainerComponent, selectors: [["app-toast-container"]], decls: 3, vars: 0, consts: [["aria-live", "polite", "aria-relevant", "additions removals", 1, "toast-host"], ["role", "status", 1, "toast", 3, "toast-success", "toast-error", "toast-warning", "toast-info"], ["role", "status", 1, "toast"], ["aria-hidden", "true", 1, "toast-icon"], [1, "material-symbols-outlined"], [1, "toast-body"], [1, "toast-title"], [1, "toast-desc"], ["type", "button", "aria-label", "Fechar notifica\xE7\xE3o", 1, "toast-close", 3, "click"], [1, "toast-progress"]], template: function ToastContainerComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "div", 0);
      \u0275\u0275repeaterCreate(1, ToastContainerComponent_For_2_Template, 12, 13, "div", 1, _forTrack0);
      \u0275\u0275domElementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.toasts());
    }
  }, dependencies: [CommonModule], styles: ['\n\n.toast-host[_ngcontent-%COMP%] {\n  position: fixed;\n  z-index: 10000;\n  top: 1rem;\n  right: 1rem;\n  left: 1rem;\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  gap: 0.5rem;\n  pointer-events: none;\n  max-width: 26rem;\n  margin-left: auto;\n}\n@media (min-width: 640px) {\n  .toast-host[_ngcontent-%COMP%] {\n    left: auto;\n    width: 100%;\n    max-width: 26rem;\n  }\n}\n.toast[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  align-items: flex-start;\n  gap: 0.75rem;\n  width: 100%;\n  padding: 0.875rem 2.25rem 0.875rem 0.875rem;\n  border-radius: 0.875rem;\n  border: 1px solid transparent;\n  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.18);\n  pointer-events: auto;\n  overflow: hidden;\n}\n.toast-success[_ngcontent-%COMP%] {\n  background: #ecfdf5;\n  border-color: #a7f3d0;\n  color: #065f46;\n}\n.dark[_ngcontent-%COMP%]   .toast-success[_ngcontent-%COMP%] {\n  background: rgba(6, 95, 70, 0.35);\n  border-color: rgba(52, 211, 153, 0.45);\n  color: #d1fae5;\n}\n.toast-error[_ngcontent-%COMP%] {\n  background: #fef2f2;\n  border-color: #fecaca;\n  color: #991b1b;\n}\n.dark[_ngcontent-%COMP%]   .toast-error[_ngcontent-%COMP%] {\n  background: rgba(127, 29, 29, 0.35);\n  border-color: rgba(248, 113, 113, 0.45);\n  color: #fecaca;\n}\n.toast-warning[_ngcontent-%COMP%] {\n  background: #fffbeb;\n  border-color: #fde68a;\n  color: #92400e;\n}\n.dark[_ngcontent-%COMP%]   .toast-warning[_ngcontent-%COMP%] {\n  background: rgba(146, 64, 14, 0.35);\n  border-color: rgba(251, 191, 36, 0.45);\n  color: #fef3c7;\n}\n.toast-info[_ngcontent-%COMP%] {\n  background: #eff6ff;\n  border-color: #bfdbfe;\n  color: #1e40af;\n}\n.dark[_ngcontent-%COMP%]   .toast-info[_ngcontent-%COMP%] {\n  background: rgba(30, 64, 175, 0.35);\n  border-color: rgba(147, 197, 253, 0.45);\n  color: #dbeafe;\n}\n.toast-icon[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  width: 2rem;\n  height: 2rem;\n  border-radius: 9999px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.toast-success[_ngcontent-%COMP%]   .toast-icon[_ngcontent-%COMP%] {\n  background: #059669;\n  color: #fff;\n}\n.toast-error[_ngcontent-%COMP%]   .toast-icon[_ngcontent-%COMP%] {\n  background: #dc2626;\n  color: #fff;\n}\n.toast-warning[_ngcontent-%COMP%]   .toast-icon[_ngcontent-%COMP%] {\n  background: #d97706;\n  color: #fff;\n}\n.toast-info[_ngcontent-%COMP%]   .toast-icon[_ngcontent-%COMP%] {\n  background: #2563eb;\n  color: #fff;\n}\n.toast-icon[_ngcontent-%COMP%]   .material-symbols-outlined[_ngcontent-%COMP%] {\n  font-size: 1.125rem;\n  font-variation-settings: "FILL" 1;\n}\n.toast-body[_ngcontent-%COMP%] {\n  min-width: 0;\n  flex: 1;\n  padding-top: 0.125rem;\n}\n.toast-title[_ngcontent-%COMP%] {\n  font-weight: 700;\n  font-size: 0.875rem;\n  line-height: 1.3;\n}\n.toast-desc[_ngcontent-%COMP%] {\n  margin-top: 0.125rem;\n  font-size: 0.8125rem;\n  line-height: 1.4;\n  opacity: 0.92;\n}\n.toast-success[_ngcontent-%COMP%]   .toast-desc[_ngcontent-%COMP%] {\n  color: #047857;\n}\n.dark[_ngcontent-%COMP%]   .toast-success[_ngcontent-%COMP%]   .toast-desc[_ngcontent-%COMP%] {\n  color: #a7f3d0;\n}\n.toast-error[_ngcontent-%COMP%]   .toast-desc[_ngcontent-%COMP%] {\n  color: #b91c1c;\n}\n.dark[_ngcontent-%COMP%]   .toast-error[_ngcontent-%COMP%]   .toast-desc[_ngcontent-%COMP%] {\n  color: #fca5a5;\n}\n.toast-warning[_ngcontent-%COMP%]   .toast-desc[_ngcontent-%COMP%] {\n  color: #b45309;\n}\n.dark[_ngcontent-%COMP%]   .toast-warning[_ngcontent-%COMP%]   .toast-desc[_ngcontent-%COMP%] {\n  color: #fcd34d;\n}\n.toast-info[_ngcontent-%COMP%]   .toast-desc[_ngcontent-%COMP%] {\n  color: #1d4ed8;\n}\n.dark[_ngcontent-%COMP%]   .toast-info[_ngcontent-%COMP%]   .toast-desc[_ngcontent-%COMP%] {\n  color: #93c5fd;\n}\n.toast-close[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0.35rem;\n  right: 0.35rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 1.75rem;\n  height: 1.75rem;\n  padding: 0;\n  border: 1px solid rgba(0, 0, 0, 0.08);\n  border-radius: 0.375rem;\n  background: transparent;\n  color: inherit;\n  opacity: 0.45;\n  cursor: pointer;\n  transition: opacity 0.15s;\n}\n.toast-close[_ngcontent-%COMP%]:hover {\n  opacity: 0.85;\n}\n.dark[_ngcontent-%COMP%]   .toast-close[_ngcontent-%COMP%] {\n  border-color: rgba(255, 255, 255, 0.12);\n}\n.toast-close[_ngcontent-%COMP%]   .material-symbols-outlined[_ngcontent-%COMP%] {\n  font-size: 1rem;\n}\n.toast-progress[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 0;\n  bottom: 0;\n  height: 3px;\n  width: 100%;\n  transform-origin: left center;\n  animation-name: _ngcontent-%COMP%_toast-progress-shrink;\n  animation-timing-function: linear;\n  animation-fill-mode: forwards;\n}\n.toast-success[_ngcontent-%COMP%]   .toast-progress[_ngcontent-%COMP%] {\n  background: #059669;\n}\n.toast-error[_ngcontent-%COMP%]   .toast-progress[_ngcontent-%COMP%] {\n  background: #dc2626;\n}\n.toast-warning[_ngcontent-%COMP%]   .toast-progress[_ngcontent-%COMP%] {\n  background: #d97706;\n}\n.toast-info[_ngcontent-%COMP%]   .toast-progress[_ngcontent-%COMP%] {\n  background: #2563eb;\n}\n@keyframes _ngcontent-%COMP%_toast-progress-shrink {\n  from {\n    transform: scaleX(1);\n  }\n  to {\n    transform: scaleX(0);\n  }\n}\n/*# sourceMappingURL=toast-container.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ToastContainerComponent, [{
    type: Component,
    args: [{ selector: "app-toast-container", standalone: true, imports: [CommonModule], template: `<div class="toast-host" aria-live="polite" aria-relevant="additions removals">\r
  @for (t of toasts(); track t.id) {\r
    <div\r
      class="toast"\r
      [class.toast-success]="t.type === 'success'"\r
      [class.toast-error]="t.type === 'error'"\r
      [class.toast-warning]="t.type === 'warning'"\r
      [class.toast-info]="t.type === 'info'"\r
      role="status"\r
    >\r
      <div class="toast-icon" aria-hidden="true">\r
        <span class="material-symbols-outlined">{{ icon(t.type) }}</span>\r
      </div>\r
      <div class="toast-body">\r
        <div class="toast-title">{{ t.title }}</div>\r
        @if (t.desc) {\r
          <div class="toast-desc">{{ t.desc }}</div>\r
        }\r
      </div>\r
      <button type="button" class="toast-close" (click)="dismiss(t.id)" aria-label="Fechar notifica\xE7\xE3o">\r
        <span class="material-symbols-outlined">close</span>\r
      </button>\r
      <div\r
        class="toast-progress"\r
        [style.animation-duration]="t.duration + 'ms'"\r
      ></div>\r
    </div>\r
  }\r
</div>\r
`, styles: ['/* src/app/componentes/ui/toast-container/toast-container.component.css */\n.toast-host {\n  position: fixed;\n  z-index: 10000;\n  top: 1rem;\n  right: 1rem;\n  left: 1rem;\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  gap: 0.5rem;\n  pointer-events: none;\n  max-width: 26rem;\n  margin-left: auto;\n}\n@media (min-width: 640px) {\n  .toast-host {\n    left: auto;\n    width: 100%;\n    max-width: 26rem;\n  }\n}\n.toast {\n  position: relative;\n  display: flex;\n  align-items: flex-start;\n  gap: 0.75rem;\n  width: 100%;\n  padding: 0.875rem 2.25rem 0.875rem 0.875rem;\n  border-radius: 0.875rem;\n  border: 1px solid transparent;\n  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.18);\n  pointer-events: auto;\n  overflow: hidden;\n}\n.toast-success {\n  background: #ecfdf5;\n  border-color: #a7f3d0;\n  color: #065f46;\n}\n.dark .toast-success {\n  background: rgba(6, 95, 70, 0.35);\n  border-color: rgba(52, 211, 153, 0.45);\n  color: #d1fae5;\n}\n.toast-error {\n  background: #fef2f2;\n  border-color: #fecaca;\n  color: #991b1b;\n}\n.dark .toast-error {\n  background: rgba(127, 29, 29, 0.35);\n  border-color: rgba(248, 113, 113, 0.45);\n  color: #fecaca;\n}\n.toast-warning {\n  background: #fffbeb;\n  border-color: #fde68a;\n  color: #92400e;\n}\n.dark .toast-warning {\n  background: rgba(146, 64, 14, 0.35);\n  border-color: rgba(251, 191, 36, 0.45);\n  color: #fef3c7;\n}\n.toast-info {\n  background: #eff6ff;\n  border-color: #bfdbfe;\n  color: #1e40af;\n}\n.dark .toast-info {\n  background: rgba(30, 64, 175, 0.35);\n  border-color: rgba(147, 197, 253, 0.45);\n  color: #dbeafe;\n}\n.toast-icon {\n  flex-shrink: 0;\n  width: 2rem;\n  height: 2rem;\n  border-radius: 9999px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.toast-success .toast-icon {\n  background: #059669;\n  color: #fff;\n}\n.toast-error .toast-icon {\n  background: #dc2626;\n  color: #fff;\n}\n.toast-warning .toast-icon {\n  background: #d97706;\n  color: #fff;\n}\n.toast-info .toast-icon {\n  background: #2563eb;\n  color: #fff;\n}\n.toast-icon .material-symbols-outlined {\n  font-size: 1.125rem;\n  font-variation-settings: "FILL" 1;\n}\n.toast-body {\n  min-width: 0;\n  flex: 1;\n  padding-top: 0.125rem;\n}\n.toast-title {\n  font-weight: 700;\n  font-size: 0.875rem;\n  line-height: 1.3;\n}\n.toast-desc {\n  margin-top: 0.125rem;\n  font-size: 0.8125rem;\n  line-height: 1.4;\n  opacity: 0.92;\n}\n.toast-success .toast-desc {\n  color: #047857;\n}\n.dark .toast-success .toast-desc {\n  color: #a7f3d0;\n}\n.toast-error .toast-desc {\n  color: #b91c1c;\n}\n.dark .toast-error .toast-desc {\n  color: #fca5a5;\n}\n.toast-warning .toast-desc {\n  color: #b45309;\n}\n.dark .toast-warning .toast-desc {\n  color: #fcd34d;\n}\n.toast-info .toast-desc {\n  color: #1d4ed8;\n}\n.dark .toast-info .toast-desc {\n  color: #93c5fd;\n}\n.toast-close {\n  position: absolute;\n  top: 0.35rem;\n  right: 0.35rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 1.75rem;\n  height: 1.75rem;\n  padding: 0;\n  border: 1px solid rgba(0, 0, 0, 0.08);\n  border-radius: 0.375rem;\n  background: transparent;\n  color: inherit;\n  opacity: 0.45;\n  cursor: pointer;\n  transition: opacity 0.15s;\n}\n.toast-close:hover {\n  opacity: 0.85;\n}\n.dark .toast-close {\n  border-color: rgba(255, 255, 255, 0.12);\n}\n.toast-close .material-symbols-outlined {\n  font-size: 1rem;\n}\n.toast-progress {\n  position: absolute;\n  left: 0;\n  bottom: 0;\n  height: 3px;\n  width: 100%;\n  transform-origin: left center;\n  animation-name: toast-progress-shrink;\n  animation-timing-function: linear;\n  animation-fill-mode: forwards;\n}\n.toast-success .toast-progress {\n  background: #059669;\n}\n.toast-error .toast-progress {\n  background: #dc2626;\n}\n.toast-warning .toast-progress {\n  background: #d97706;\n}\n.toast-info .toast-progress {\n  background: #2563eb;\n}\n@keyframes toast-progress-shrink {\n  from {\n    transform: scaleX(1);\n  }\n  to {\n    transform: scaleX(0);\n  }\n}\n/*# sourceMappingURL=toast-container.component.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ToastContainerComponent, { className: "ToastContainerComponent", filePath: "src/app/componentes/ui/toast-container/toast-container.component.ts", lineNumber: 12 });
})();

// src/app/componentes/ui/confirm-dialog/confirm-dialog.component.ts
function ConfirmDialogComponent_Conditional_0_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const opts_r3 = \u0275\u0275nextContext();
    \u0275\u0275textInterpolate1(" ", opts_r3.message, " ");
  }
}
function ConfirmDialogComponent_Conditional_0_Conditional_9_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "strong");
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const opts_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(opts_r3.emphasis);
  }
}
function ConfirmDialogComponent_Conditional_0_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275conditionalCreate(1, ConfirmDialogComponent_Conditional_0_Conditional_9_Conditional_1_Template, 2, 1, "strong");
    \u0275\u0275text(2);
  }
  if (rf & 2) {
    const opts_r3 = \u0275\u0275nextContext();
    \u0275\u0275textInterpolate1(" ", opts_r3.messageBefore ?? "");
    \u0275\u0275advance();
    \u0275\u0275conditional(opts_r3.emphasis ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", opts_r3.messageAfter ?? "", " ");
  }
}
function ConfirmDialogComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "div", 1);
    \u0275\u0275domListener("click", function ConfirmDialogComponent_Conditional_0_Template_div_click_0_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onBackdrop($event));
    });
    \u0275\u0275domElementStart(1, "div", 2);
    \u0275\u0275domListener("click", function ConfirmDialogComponent_Conditional_0_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275domElementStart(2, "div", 3)(3, "span", 4);
    \u0275\u0275text(4);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(5, "h2", 5);
    \u0275\u0275text(6);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(7, "p", 6);
    \u0275\u0275conditionalCreate(8, ConfirmDialogComponent_Conditional_0_Conditional_8_Template, 1, 1)(9, ConfirmDialogComponent_Conditional_0_Conditional_9_Template, 3, 3);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(10, "div", 7)(11, "button", 8);
    \u0275\u0275domListener("click", function ConfirmDialogComponent_Conditional_0_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cancel());
    });
    \u0275\u0275text(12);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(13, "button", 9);
    \u0275\u0275domListener("click", function ConfirmDialogComponent_Conditional_0_Template_button_click_13_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.confirm());
    });
    \u0275\u0275text(14);
    \u0275\u0275domElementEnd()()()();
  }
  if (rf & 2) {
    const opts_r3 = ctx;
    \u0275\u0275advance();
    \u0275\u0275attribute("aria-labelledby", "confirm-title");
    \u0275\u0275advance();
    \u0275\u0275classProp("danger", opts_r3.variant === "danger");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(opts_r3.variant === "danger" ? "delete" : "help");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(opts_r3.title);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(opts_r3.message ? 8 : 9);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", opts_r3.cancelLabel, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", opts_r3.confirmLabel, " ");
  }
}
var ConfirmDialogComponent = class _ConfirmDialogComponent {
  dialog = inject(ConfirmDialogService);
  state = this.dialog.options;
  onEscape() {
    if (this.state())
      this.dialog.respond(false);
  }
  onBackdrop(event) {
    if (event.target.classList.contains("confirm-backdrop")) {
      this.dialog.respond(false);
    }
  }
  cancel() {
    this.dialog.respond(false);
  }
  confirm() {
    this.dialog.respond(true);
  }
  static \u0275fac = function ConfirmDialogComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ConfirmDialogComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ConfirmDialogComponent, selectors: [["app-confirm-dialog"]], hostBindings: function ConfirmDialogComponent_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("keydown.escape", function ConfirmDialogComponent_keydown_escape_HostBindingHandler() {
        return ctx.onEscape();
      }, \u0275\u0275resolveDocument);
    }
  }, decls: 1, vars: 1, consts: [["role", "presentation", 1, "confirm-backdrop"], ["role", "presentation", 1, "confirm-backdrop", 3, "click"], ["role", "alertdialog", "aria-modal", "true", 1, "confirm-panel", 3, "click"], [1, "confirm-icon-wrap"], [1, "material-symbols-outlined", "confirm-icon"], ["id", "confirm-title", 1, "confirm-title"], [1, "confirm-message"], [1, "confirm-actions"], ["type", "button", 1, "confirm-btn", "confirm-btn-secondary", 3, "click"], ["type", "button", 1, "confirm-btn", "confirm-btn-primary", 3, "click"]], template: function ConfirmDialogComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275conditionalCreate(0, ConfirmDialogComponent_Conditional_0_Template, 15, 8, "div", 0);
    }
    if (rf & 2) {
      let tmp_0_0;
      \u0275\u0275conditional((tmp_0_0 = ctx.state()) ? 0 : -1, tmp_0_0);
    }
  }, dependencies: [CommonModule], styles: ['\n\n.confirm-backdrop[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: 9998;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 1rem;\n  background: rgba(0, 0, 0, 0.55);\n  -webkit-backdrop-filter: blur(2px);\n  backdrop-filter: blur(2px);\n}\n.confirm-panel[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 22rem;\n  padding: 1.25rem 1.25rem 1rem;\n  border-radius: 0.875rem;\n  background: var(--c-elevated, #1e293b);\n  border: 1px solid var(--c-border, #334155);\n  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.35);\n}\n.confirm-icon-wrap[_ngcontent-%COMP%] {\n  width: 2.25rem;\n  height: 2.25rem;\n  border-radius: 0.5rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin-bottom: 0.75rem;\n  background: rgba(148, 163, 184, 0.2);\n  color: var(--c-muted, #94a3b8);\n}\n.confirm-icon-wrap.danger[_ngcontent-%COMP%] {\n  background: rgba(244, 63, 94, 0.18);\n  color: #fb7185;\n}\n.confirm-icon[_ngcontent-%COMP%] {\n  font-size: 1.25rem;\n  font-variation-settings: "FILL" 0;\n}\n.confirm-title[_ngcontent-%COMP%] {\n  margin: 0 0 0.5rem;\n  font-size: 1rem;\n  font-weight: 700;\n  color: var(--c-text, #f8fafc);\n  line-height: 1.3;\n}\n.confirm-message[_ngcontent-%COMP%] {\n  margin: 0 0 1.25rem;\n  font-size: 0.875rem;\n  line-height: 1.5;\n  color: var(--c-muted, #cbd5e1);\n}\n.confirm-message[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: var(--c-text, #f1f5f9);\n  font-weight: 600;\n}\n.confirm-actions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: flex-end;\n  gap: 0.5rem;\n}\n.confirm-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.375rem;\n  min-height: 2.25rem;\n  padding: 0 0.875rem;\n  font-size: 0.8125rem;\n  font-weight: 600;\n  border-radius: 0.5rem;\n  cursor: pointer;\n  border: 1px solid var(--c-border, #475569);\n  background: var(--c-soft, #1e293b);\n  color: var(--c-text, #f8fafc);\n  transition: background 0.15s, border-color 0.15s;\n}\n.confirm-btn[_ngcontent-%COMP%]:hover {\n  background: var(--c-bg-soft, #334155);\n  border-color: var(--c-muted, #64748b);\n}\n.confirm-btn-primary[_ngcontent-%COMP%] {\n  border-color: var(--c-border, #475569);\n}\n/*# sourceMappingURL=confirm-dialog.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ConfirmDialogComponent, [{
    type: Component,
    args: [{ selector: "app-confirm-dialog", standalone: true, imports: [CommonModule], template: `@if (state(); as opts) {\r
  <div class="confirm-backdrop" (click)="onBackdrop($event)" role="presentation">\r
    <div\r
      class="confirm-panel"\r
      role="alertdialog"\r
      aria-modal="true"\r
      [attr.aria-labelledby]="'confirm-title'"\r
      (click)="$event.stopPropagation()"\r
    >\r
      <div class="confirm-icon-wrap" [class.danger]="opts.variant === 'danger'">\r
        <span class="material-symbols-outlined confirm-icon">{{ opts.variant === 'danger' ? 'delete' : 'help' }}</span>\r
      </div>\r
      <h2 id="confirm-title" class="confirm-title">{{ opts.title }}</h2>\r
      <p class="confirm-message">\r
        @if (opts.message) {\r
          {{ opts.message }}\r
        } @else {\r
          {{ opts.messageBefore ?? '' }}@if (opts.emphasis) {\r
            <strong>{{ opts.emphasis }}</strong>\r
          }{{ opts.messageAfter ?? '' }}\r
        }\r
      </p>\r
      <div class="confirm-actions">\r
        <button type="button" class="confirm-btn confirm-btn-secondary" (click)="cancel()">\r
          {{ opts.cancelLabel }}\r
        </button>\r
        <button type="button" class="confirm-btn confirm-btn-primary" (click)="confirm()">\r
          {{ opts.confirmLabel }}\r
        </button>\r
      </div>\r
    </div>\r
  </div>\r
}\r
`, styles: ['/* src/app/componentes/ui/confirm-dialog/confirm-dialog.component.css */\n.confirm-backdrop {\n  position: fixed;\n  inset: 0;\n  z-index: 9998;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 1rem;\n  background: rgba(0, 0, 0, 0.55);\n  -webkit-backdrop-filter: blur(2px);\n  backdrop-filter: blur(2px);\n}\n.confirm-panel {\n  width: 100%;\n  max-width: 22rem;\n  padding: 1.25rem 1.25rem 1rem;\n  border-radius: 0.875rem;\n  background: var(--c-elevated, #1e293b);\n  border: 1px solid var(--c-border, #334155);\n  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.35);\n}\n.confirm-icon-wrap {\n  width: 2.25rem;\n  height: 2.25rem;\n  border-radius: 0.5rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin-bottom: 0.75rem;\n  background: rgba(148, 163, 184, 0.2);\n  color: var(--c-muted, #94a3b8);\n}\n.confirm-icon-wrap.danger {\n  background: rgba(244, 63, 94, 0.18);\n  color: #fb7185;\n}\n.confirm-icon {\n  font-size: 1.25rem;\n  font-variation-settings: "FILL" 0;\n}\n.confirm-title {\n  margin: 0 0 0.5rem;\n  font-size: 1rem;\n  font-weight: 700;\n  color: var(--c-text, #f8fafc);\n  line-height: 1.3;\n}\n.confirm-message {\n  margin: 0 0 1.25rem;\n  font-size: 0.875rem;\n  line-height: 1.5;\n  color: var(--c-muted, #cbd5e1);\n}\n.confirm-message strong {\n  color: var(--c-text, #f1f5f9);\n  font-weight: 600;\n}\n.confirm-actions {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: flex-end;\n  gap: 0.5rem;\n}\n.confirm-btn {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.375rem;\n  min-height: 2.25rem;\n  padding: 0 0.875rem;\n  font-size: 0.8125rem;\n  font-weight: 600;\n  border-radius: 0.5rem;\n  cursor: pointer;\n  border: 1px solid var(--c-border, #475569);\n  background: var(--c-soft, #1e293b);\n  color: var(--c-text, #f8fafc);\n  transition: background 0.15s, border-color 0.15s;\n}\n.confirm-btn:hover {\n  background: var(--c-bg-soft, #334155);\n  border-color: var(--c-muted, #64748b);\n}\n.confirm-btn-primary {\n  border-color: var(--c-border, #475569);\n}\n/*# sourceMappingURL=confirm-dialog.component.css.map */\n'] }]
  }], null, { onEscape: [{
    type: HostListener,
    args: ["document:keydown.escape"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ConfirmDialogComponent, { className: "ConfirmDialogComponent", filePath: "src/app/componentes/ui/confirm-dialog/confirm-dialog.component.ts", lineNumber: 12 });
})();

// src/app/shared/components/top-progress-bar/top-progress-bar.component.ts
function ZmTopProgressBarComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 1);
    \u0275\u0275domElement(1, "div", 2);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classProp("zm-top-progress-host--fade", ctx_r0.fadeOut());
    \u0275\u0275attribute("aria-valuenow", ctx_r0.Math.round(ctx_r0.widthPct()));
    \u0275\u0275advance();
    \u0275\u0275styleProp("width", ctx_r0.widthPct(), "%");
  }
}
var ZmTopProgressBarComponent = class _ZmTopProgressBarComponent {
  router = inject(Router);
  destroy$ = new Subject();
  Math = Math;
  active = signal(false, ...ngDevMode ? [{ debugName: "active" }] : []);
  fadeOut = signal(false, ...ngDevMode ? [{ debugName: "fadeOut" }] : []);
  widthPct = signal(0, ...ngDevMode ? [{ debugName: "widthPct" }] : []);
  creepTimer = null;
  hideTimer = null;
  completeTimer = null;
  constructor() {
    this.router.events.pipe(takeUntil(this.destroy$), filter((e) => e instanceof NavigationStart || e instanceof NavigationEnd || e instanceof NavigationCancel || e instanceof NavigationError)).subscribe((e) => {
      if (e instanceof NavigationStart) {
        this.onNavStart();
      } else {
        this.onNavFinish();
      }
    });
  }
  clearTimers() {
    if (this.creepTimer !== null) {
      clearInterval(this.creepTimer);
      this.creepTimer = null;
    }
    if (this.hideTimer !== null) {
      clearTimeout(this.hideTimer);
      this.hideTimer = null;
    }
    if (this.completeTimer !== null) {
      clearTimeout(this.completeTimer);
      this.completeTimer = null;
    }
  }
  onNavStart() {
    this.clearTimers();
    this.fadeOut.set(false);
    this.active.set(true);
    this.widthPct.set(15);
    this.creepTimer = setInterval(() => {
      const w = this.widthPct();
      if (w >= 85)
        return;
      const delta = 3 + Math.random() * 8;
      this.widthPct.set(Math.min(85, w + delta));
    }, 280);
  }
  onNavFinish() {
    if (!this.active())
      return;
    if (this.creepTimer !== null) {
      clearInterval(this.creepTimer);
      this.creepTimer = null;
    }
    this.widthPct.set(100);
    this.completeTimer = setTimeout(() => {
      this.fadeOut.set(true);
      this.hideTimer = setTimeout(() => {
        this.active.set(false);
        this.fadeOut.set(false);
        this.widthPct.set(0);
      }, 380);
    }, 160);
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.clearTimers();
  }
  static \u0275fac = function ZmTopProgressBarComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ZmTopProgressBarComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ZmTopProgressBarComponent, selectors: [["zm-top-progress-bar"]], decls: 1, vars: 1, consts: [["role", "progressbar", "aria-valuemin", "0", "aria-valuemax", "100", 1, "zm-top-progress-host", 3, "zm-top-progress-host--fade"], ["role", "progressbar", "aria-valuemin", "0", "aria-valuemax", "100", 1, "zm-top-progress-host"], [1, "zm-top-progress-bar"]], template: function ZmTopProgressBarComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275conditionalCreate(0, ZmTopProgressBarComponent_Conditional_0_Template, 2, 5, "div", 0);
    }
    if (rf & 2) {
      \u0275\u0275conditional(ctx.active() || ctx.fadeOut() ? 0 : -1);
    }
  }, styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n}\n.zm-top-progress-host[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 3px;\n  z-index: 99999;\n  pointer-events: none;\n  opacity: 1;\n  transition: opacity 0.35s ease;\n}\n.zm-top-progress-host--fade[_ngcontent-%COMP%] {\n  opacity: 0;\n}\n.zm-top-progress-bar[_ngcontent-%COMP%] {\n  height: 100%;\n  width: 0%;\n  background: var(--c-primary);\n  box-shadow: 0 0 10px color-mix(in srgb, var(--c-primary) 45%, transparent);\n  transition: width 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);\n}\n/*# sourceMappingURL=top-progress-bar.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ZmTopProgressBarComponent, [{
    type: Component,
    args: [{ selector: "zm-top-progress-bar", standalone: true, template: `
    @if (active() || fadeOut()) {
      <div
        class="zm-top-progress-host"
        [class.zm-top-progress-host--fade]="fadeOut()"
        role="progressbar"
        [attr.aria-valuenow]="Math.round(widthPct())"
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <div class="zm-top-progress-bar" [style.width.%]="widthPct()"></div>
      </div>
    }
  `, styles: ["/* src/app/shared/components/top-progress-bar/top-progress-bar.component.scss */\n:host {\n  display: block;\n}\n.zm-top-progress-host {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 3px;\n  z-index: 99999;\n  pointer-events: none;\n  opacity: 1;\n  transition: opacity 0.35s ease;\n}\n.zm-top-progress-host--fade {\n  opacity: 0;\n}\n.zm-top-progress-bar {\n  height: 100%;\n  width: 0%;\n  background: var(--c-primary);\n  box-shadow: 0 0 10px color-mix(in srgb, var(--c-primary) 45%, transparent);\n  transition: width 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);\n}\n/*# sourceMappingURL=top-progress-bar.component.css.map */\n"] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ZmTopProgressBarComponent, { className: "ZmTopProgressBarComponent", filePath: "src/app/shared/components/top-progress-bar/top-progress-bar.component.ts", lineNumber: 24 });
})();

// src/app/app.component.ts
var AppComponent = class _AppComponent {
  title = "Gestgo";
  static \u0275fac = function AppComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AppComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AppComponent, selectors: [["app-root"]], decls: 4, vars: 0, template: function AppComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275element(0, "zm-top-progress-bar")(1, "router-outlet")(2, "app-toast-container")(3, "app-confirm-dialog");
    }
  }, dependencies: [RouterOutlet, ZmTopProgressBarComponent, ToastContainerComponent, ConfirmDialogComponent], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AppComponent, [{
    type: Component,
    args: [{ selector: "app-root", imports: [RouterOutlet, ZmTopProgressBarComponent, ToastContainerComponent, ConfirmDialogComponent], template: "<zm-top-progress-bar />\r\n<router-outlet />\r\n<app-toast-container />\r\n<app-confirm-dialog />\r\n" }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AppComponent, { className: "AppComponent", filePath: "src/app/app.component.ts", lineNumber: 13 });
})();

// src/main.ts
registerLocaleData(pt_default, "pt-BR");
bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
/*! Bundled license information:

@angular/common/locales/pt.js:
  (**
   * @license
   * Copyright Google LLC All Rights Reserved.
   *
   * Use of this source code is governed by an MIT-style license that can be
   * found in the LICENSE file at https://angular.dev/license
   *)
*/
//# sourceMappingURL=main.js.map
