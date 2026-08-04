import {
  CabecalhoComponent,
  SidebarMobileService
} from "./chunk-BAWSRWCL.js";
import {
  NotificacoesService
} from "./chunk-HY3FJGNT.js";
import {
  ClinicaService
} from "./chunk-KCTAH7A3.js";
import "./chunk-T5FMHWLF.js";
import {
  absoluteMediaUrl
} from "./chunk-RHN4EKXH.js";
import {
  ZmAssinaturaBloqueadaCardComponent
} from "./chunk-CAKNZVE6.js";
import "./chunk-7WBHVE2H.js";
import {
  BillingBlockedStateService
} from "./chunk-VRXV74R6.js";
import {
  TooltipDirective
} from "./chunk-LVZEGAGU.js";
import {
  AuthService
} from "./chunk-SFRXLDXR.js";
import "./chunk-IBJWGIJV.js";
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet
} from "./chunk-C2NWBPZH.js";
import {
  CommonModule,
  Component,
  HostListener,
  UpperCasePipe,
  ViewChild,
  filter,
  inject,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵqueryRefresh,
  ɵɵresetView,
  ɵɵresolveDocument,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵviewQuery
} from "./chunk-GRLISYEV.js";

// src/app/componentes/layout/barra-lateral/barra-lateral.component.ts
var _c0 = ["userMenuContainer"];
var _c1 = () => ({ exact: true });
function BarraLateralComponent_Conditional_8_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 26);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("src", ctx_r1.logoUrlClinica, \u0275\u0275sanitizeUrl)("alt", "Logo " + ctx_r1.nomeClinica);
  }
}
function BarraLateralComponent_Conditional_8_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "uppercase");
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(1, 1, ctx_r1.nomeClinica.charAt(0)), " ");
  }
}
function BarraLateralComponent_Conditional_8_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 28);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.enderecoClinica);
  }
}
function BarraLateralComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8)(1, "div", 24)(2, "div", 25);
    \u0275\u0275conditionalCreate(3, BarraLateralComponent_Conditional_8_Conditional_3_Template, 1, 2, "img", 26)(4, BarraLateralComponent_Conditional_8_Conditional_4_Template, 2, 3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 27)(6, "p", 20);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(8, BarraLateralComponent_Conditional_8_Conditional_8_Template, 2, 1, "p", 28);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r1.logoUrlClinica ? 3 : 4);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.nomeClinica);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.enderecoClinica ? 8 : -1);
  }
}
function BarraLateralComponent_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 11)(1, "span", 29);
    \u0275\u0275text(2, "dashboard");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 30);
    \u0275\u0275text(4, "Painel");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275property("routerLinkActiveOptions", \u0275\u0275pureFunction0(1, _c1));
  }
}
function BarraLateralComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 12)(1, "span", 29);
    \u0275\u0275text(2, "description");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 30);
    \u0275\u0275text(4, "Modelos");
    \u0275\u0275elementEnd()();
  }
}
function BarraLateralComponent_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 31)(1, "span", 29);
    \u0275\u0275text(2, "link");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 30);
    \u0275\u0275text(4, "Links p\xFAblicos");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "a", 32)(6, "span", 29);
    \u0275\u0275text(7, "send");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span", 30);
    \u0275\u0275text(9, "Envios");
    \u0275\u0275elementEnd()();
  }
}
function BarraLateralComponent_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 33)(1, "span", 29);
    \u0275\u0275text(2, "inbox");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 30);
    \u0275\u0275text(4, "Protocolos");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "a", 34)(6, "span", 29);
    \u0275\u0275text(7, "group");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span", 30);
    \u0275\u0275text(9, "Pessoas");
    \u0275\u0275elementEnd()();
  }
}
function BarraLateralComponent_Conditional_16_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 35);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.notificacoesNaoLidas > 99 ? "99+" : ctx_r1.notificacoesNaoLidas, " ");
  }
}
function BarraLateralComponent_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 13)(1, "span", 29);
    \u0275\u0275text(2, "notifications");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 30);
    \u0275\u0275text(4, "Notifica\xE7\xF5es");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(5, BarraLateralComponent_Conditional_16_Conditional_5_Template, 2, 1, "span", 35);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275conditional(ctx_r1.notificacoesNaoLidas > 0 ? 5 : -1);
  }
}
function BarraLateralComponent_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 14);
    \u0275\u0275text(1, "ADMINISTRA\xC7\xC3O");
    \u0275\u0275elementEnd();
  }
}
function BarraLateralComponent_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 36)(1, "span", 29);
    \u0275\u0275text(2, "business");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 30);
    \u0275\u0275text(4, "Empresa");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "a", 37)(6, "span", 29);
    \u0275\u0275text(7, "link");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span", 30);
    \u0275\u0275text(9, "P\xE1gina de links");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "a", 38)(11, "span", 29);
    \u0275\u0275text(12, "api");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "span", 30);
    \u0275\u0275text(14, "Integra\xE7\xF5es");
    \u0275\u0275elementEnd()();
  }
}
function BarraLateralComponent_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 39)(1, "span", 29);
    \u0275\u0275text(2, "group");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 30);
    \u0275\u0275text(4, "Usu\xE1rios");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "a", 40)(6, "span", 29);
    \u0275\u0275text(7, "admin_panel_settings");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span", 30);
    \u0275\u0275text(9, "Permiss\xF5es");
    \u0275\u0275elementEnd()();
  }
}
function BarraLateralComponent_Conditional_33_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "a", 47);
    \u0275\u0275listener("click", function BarraLateralComponent_Conditional_33_Conditional_1_Template_a_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.fecharMenuUsuario());
    });
    \u0275\u0275elementStart(1, "span", 46);
    \u0275\u0275text(2, "swap_horiz");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Trocar empresa ");
    \u0275\u0275elementEnd();
  }
}
function BarraLateralComponent_Conditional_33_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "a", 48);
    \u0275\u0275listener("click", function BarraLateralComponent_Conditional_33_Conditional_2_Template_a_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.fecharMenuUsuario());
    });
    \u0275\u0275elementStart(1, "span", 46);
    \u0275\u0275text(2, "admin_panel_settings");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Admin da plataforma ");
    \u0275\u0275elementEnd();
  }
}
function BarraLateralComponent_Conditional_33_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "a", 49);
    \u0275\u0275listener("click", function BarraLateralComponent_Conditional_33_Conditional_3_Template_a_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.fecharMenuUsuario());
    });
    \u0275\u0275elementStart(1, "span", 46);
    \u0275\u0275text(2, "settings");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Configura\xE7\xF5es ");
    \u0275\u0275elementEnd();
  }
}
function BarraLateralComponent_Conditional_33_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "a", 50);
    \u0275\u0275listener("click", function BarraLateralComponent_Conditional_33_Conditional_4_Template_a_click_0_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.fecharMenuUsuario());
    });
    \u0275\u0275elementStart(1, "span", 46);
    \u0275\u0275text(2, "credit_card");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Assinatura ");
    \u0275\u0275elementEnd();
  }
}
function BarraLateralComponent_Conditional_33_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 23);
    \u0275\u0275conditionalCreate(1, BarraLateralComponent_Conditional_33_Conditional_1_Template, 4, 0, "a", 41);
    \u0275\u0275conditionalCreate(2, BarraLateralComponent_Conditional_33_Conditional_2_Template, 4, 0, "a", 42);
    \u0275\u0275conditionalCreate(3, BarraLateralComponent_Conditional_33_Conditional_3_Template, 4, 0, "a", 43);
    \u0275\u0275conditionalCreate(4, BarraLateralComponent_Conditional_33_Conditional_4_Template, 4, 0, "a", 44);
    \u0275\u0275elementStart(5, "button", 45);
    \u0275\u0275listener("click", function BarraLateralComponent_Conditional_33_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.sair());
    });
    \u0275\u0275elementStart(6, "span", 46);
    \u0275\u0275text(7, "logout");
    \u0275\u0275elementEnd();
    \u0275\u0275text(8, " Sair ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.exibirTrocarEmpresa ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.ehAdminPlataforma ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.podeGerenciarClinica ? 3 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.podeVerBilling ? 4 : -1);
  }
}
var BarraLateralComponent = class _BarraLateralComponent {
  nomeUsuario = "Usu\xE1rio";
  iniciaisUsuario = "U";
  emailUsuario = "";
  nomeClinica = null;
  enderecoClinica = null;
  /** URL absoluta da logo da empresa (API pode devolver /storage/...). */
  logoUrlClinica = null;
  notificacoesNaoLidas = 0;
  menuUsuarioAberto = false;
  exibirTrocarEmpresa = false;
  ehAdminPlataforma = false;
  podeVerDashboard = false;
  podeVerNotificacoes = false;
  podeVerBilling = false;
  podeGerenciarClinica = false;
  podeGerenciarTemplates = false;
  podeVerSubmissoes = false;
  podeGerenciarUsuarios = false;
  /** Links públicos / envios: templates ou ao menos ver submissões. */
  podeAcessarLinksEEnvios = false;
  userMenuContainer;
  auth = inject(AuthService);
  router = inject(Router);
  clinicaService = inject(ClinicaService);
  sidebarMobile = inject(SidebarMobileService);
  sidebarOpenMobile = false;
  onDocumentClick(e) {
    if (!this.menuUsuarioAberto)
      return;
    const el = this.userMenuContainer?.nativeElement;
    if (el && el.contains(e.target))
      return;
    this.fecharMenuUsuario();
  }
  ngOnInit() {
    this.atualizarDados();
    this.clinicaService.clinicBrandingUpdated$.subscribe(() => this.atualizarDados());
    this.sidebarMobile.getOpen().subscribe((open) => {
      this.sidebarOpenMobile = open;
      if (typeof document !== "undefined") {
        document.body.style.overflow = open ? "hidden" : "";
      }
    });
  }
  atualizarDados() {
    const u = this.auth.getUser();
    if (u) {
      this.nomeUsuario = u.name || "Usu\xE1rio";
      this.emailUsuario = u.email || "";
      this.iniciaisUsuario = this.nomeUsuario.slice(0, 2).toUpperCase() || "U";
      this.ehAdminPlataforma = u.role === "platform_admin";
      this.podeVerDashboard = this.auth.hasPermission("dashboard.access");
      this.podeVerNotificacoes = this.auth.hasPermission("notifications.access");
      this.podeVerBilling = this.auth.hasPermission("billing.manage");
      this.podeGerenciarClinica = this.auth.hasPermission("organization.manage");
      this.podeGerenciarUsuarios = this.auth.hasPermission("users.manage");
      this.podeGerenciarTemplates = this.auth.hasPermission("templates.manage");
      this.podeVerSubmissoes = this.auth.hasPermission("submissions.view");
      this.podeAcessarLinksEEnvios = this.auth.hasPermission("templates.manage") || this.auth.hasPermission("submissions.view");
    } else {
      this.podeVerDashboard = false;
      this.podeVerNotificacoes = false;
      this.podeVerBilling = false;
      this.podeGerenciarClinica = false;
      this.podeGerenciarUsuarios = false;
      this.podeGerenciarTemplates = false;
      this.podeVerSubmissoes = false;
      this.podeAcessarLinksEEnvios = false;
    }
    this.exibirTrocarEmpresa = this.auth.canSwitchClinic();
    const clinic = this.auth.getCurrentClinic();
    this.logoUrlClinica = null;
    if (clinic) {
      this.nomeClinica = clinic.name ?? null;
      this.enderecoClinica = clinic.address ?? null;
    }
    if (this.auth.getCurrentClinicId()) {
      this.clinicaService.getConfiguracoes().subscribe({
        next: (config) => {
          this.nomeClinica = config.name ?? this.nomeClinica;
          this.enderecoClinica = config.address ?? this.enderecoClinica ?? null;
          const raw = config.logo_url;
          if (raw != null && String(raw).trim() !== "") {
            const abs = absoluteMediaUrl(String(raw));
            this.logoUrlClinica = abs ?? String(raw);
          } else {
            this.logoUrlClinica = null;
          }
        },
        error: () => {
        }
      });
    }
  }
  alternarMenuUsuario() {
    this.menuUsuarioAberto = !this.menuUsuarioAberto;
  }
  fecharMenuUsuario() {
    this.menuUsuarioAberto = false;
  }
  fecharSidebarMobile() {
    this.sidebarMobile.setOpen(false);
  }
  sair() {
    this.menuUsuarioAberto = false;
    this.auth.logout().subscribe(() => this.router.navigate(["/autenticacao"]));
  }
  static \u0275fac = function BarraLateralComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _BarraLateralComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _BarraLateralComponent, selectors: [["app-barra-lateral"]], viewQuery: function BarraLateralComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c0, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.userMenuContainer = _t.first);
    }
  }, hostBindings: function BarraLateralComponent_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("click", function BarraLateralComponent_click_HostBindingHandler($event) {
        return ctx.onDocumentClick($event);
      }, \u0275\u0275resolveDocument);
    }
  }, decls: 34, vars: 17, consts: [["userMenuContainer", ""], ["aria-hidden", "true", 1, "sidebar-overlay-mobile", "fixed", "inset-0", "z-20", "bg-black/55", "backdrop-blur-sm", "cursor-pointer", "lg:hidden", 3, "click"], ["id", "sidebar", 1, "sidebar", "fixed", "inset-y-0", "left-0", "z-30", "flex", "flex-col", "lg:translate-x-0"], [1, "h-14", "flex", "items-center", "px-3.5", "shrink-0", 2, "border-bottom", "1px solid var(--c-border)"], [1, "sidebar-brand", "flex", "items-center", "gap-2.5", "min-w-0", "w-full"], [1, "shrink-0", "w-7", "h-7", "rounded-md", "flex", "items-center", "justify-center", 2, "background", "var(--c-primary)"], ["src", "assets/logo/logo.png", "alt", "Gestgo", "onerror", "this.style.display='none'", 1, "w-full", "h-full", "rounded-md", "object-contain", 2, "padding", "2px"], [1, "sidebar-label", "font-semibold", "text-sm", "truncate", 2, "color", "var(--c-text)"], [1, "sidebar-clinic", "px-2", "py-2", "shrink-0", 2, "border-bottom", "1px solid var(--c-border)"], [1, "flex-1", "px-2", "py-3", "overflow-y-auto", "space-y-0.5"], [1, "sidebar-section-label", "mt-1", "mb-2"], ["routerLink", "/dashboard", "routerLinkActive", "ativo", "appTooltip", "Painel", 1, "nav-link", 3, "routerLinkActiveOptions"], ["routerLink", "/templates", "routerLinkActive", "ativo", "appTooltip", "Modelos de formul\xE1rio", 1, "nav-link"], ["routerLink", "/notificacoes", "routerLinkActive", "ativo", "appTooltip", "Notifica\xE7\xF5es", 1, "nav-link", "relative"], [1, "sidebar-section-label", "mt-5", "mb-2"], [1, "shrink-0", "px-2", "py-2", "overflow-visible", 2, "border-top", "1px solid var(--c-border)"], [1, "relative"], ["type", "button", "id", "user-menu-btn", "aria-label", "Menu do usu\xE1rio", 1, "flex", "items-center", "gap-2.5", "w-full", "px-2", "py-2", "rounded-lg", "text-left", "transition-colors", "hover:bg-[var(--c-soft)]", "cursor-pointer", 3, "click"], [1, "w-7", "h-7", "rounded-full", "shrink-0", "flex", "items-center", "justify-center", "text-xs", "font-bold", 2, "background", "var(--c-primary)", "color", "#fff"], [1, "sidebar-label", "flex-1", "min-w-0"], [1, "text-xs", "font-semibold", "truncate", 2, "color", "var(--c-text)"], [1, "truncate", "text-[0.7rem]", 2, "color", "var(--c-muted)"], [1, "material-symbols-outlined", "sidebar-label", "shrink-0", 2, "font-size", "15px", "color", "var(--c-muted)"], [1, "user-dropdown", "absolute", "left-0", "right-0", "bottom-full", "mb-1", "py-1", "rounded-lg", "shadow-lg", "z-[100]", 2, "background", "var(--c-elevated)", "border", "1px solid var(--c-border)", "min-width", "200px", "box-shadow", "0 8px 32px rgba(0,0,0,0.22)"], [1, "flex", "items-center", "gap-2.5", "min-w-0"], [1, "w-9", "h-9", "rounded-lg", "shrink-0", "overflow-hidden", "flex", "items-center", "justify-center", "text-sm", "font-bold", "flex-shrink-0", 2, "background", "var(--c-soft)", "color", "var(--c-primary)"], ["loading", "lazy", 1, "w-full", "h-full", "object-cover", 3, "src", "alt"], [1, "sidebar-label", "min-w-0", "flex-1"], [1, "text-[0.65rem]", "truncate", "mt-0.5", 2, "color", "var(--c-muted)"], [1, "material-symbols-outlined", "shrink-0", 2, "font-size", "19px"], [1, "sidebar-label"], ["routerLink", "/links-publicos", "routerLinkActive", "ativo", "appTooltip", "Links para enviar", 1, "nav-link"], ["routerLink", "/envios", "routerLinkActive", "ativo", "appTooltip", "Envios de documento", 1, "nav-link"], ["routerLink", "/protocolos", "routerLinkActive", "ativo", "appTooltip", "Protocolos", 1, "nav-link"], ["routerLink", "/pessoas", "routerLinkActive", "ativo", "appTooltip", "Pessoas", 1, "nav-link"], [1, "sidebar-label", "ml-auto", "min-w-[18px]", "h-[18px]", "rounded-full", "flex", "items-center", "justify-center", "text-[0.6rem]", "font-bold", "px-1", 2, "background", "var(--c-primary)", "color", "#fff"], ["routerLink", "/clinica/configuracoes", "routerLinkActive", "ativo", "appTooltip", "Empresa", 1, "nav-link"], ["routerLink", "/link-bio", "routerLinkActive", "ativo", "appTooltip", "P\xE1gina de links (bio)", 1, "nav-link"], ["routerLink", "/clinica/integracoes", "routerLinkActive", "ativo", "appTooltip", "Integra\xE7\xF5es", 1, "nav-link"], ["routerLink", "/usuarios", "routerLinkActive", "ativo", "appTooltip", "Usu\xE1rios", 1, "nav-link"], ["routerLink", "/organizacao/permissoes", "routerLinkActive", "ativo", "appTooltip", "Permiss\xF5es", 1, "nav-link"], ["routerLink", "/clinica/escolher", "appTooltip", "Trocar empresa", 1, "flex", "items-center", "gap-2", "px-3", "py-2", "text-sm", "hover:bg-[var(--c-soft)]", 2, "color", "var(--c-text)", "text-decoration", "none"], ["routerLink", "/plataforma", "appTooltip", "Admin da plataforma", 1, "flex", "items-center", "gap-2", "px-3", "py-2", "text-sm", "hover:bg-[var(--c-soft)]", 2, "color", "var(--c-text)", "text-decoration", "none"], ["routerLink", "/clinica/configuracoes", "appTooltip", "Configura\xE7\xF5es", 1, "flex", "items-center", "gap-2", "px-3", "py-2", "text-sm", "hover:bg-[var(--c-soft)]", 2, "color", "var(--c-text)", "text-decoration", "none"], ["routerLink", "/assinatura", "appTooltip", "Assinatura", 1, "flex", "items-center", "gap-2", "px-3", "py-2", "text-sm", "hover:bg-[var(--c-soft)]", 2, "color", "var(--c-text)", "text-decoration", "none"], ["type", "button", "appTooltip", "Sair", 1, "w-full", "flex", "items-center", "gap-2", "px-3", "py-2", "text-sm", "hover:bg-[var(--c-soft)]", "text-left", "border-0", "bg-transparent", "cursor-pointer", 2, "color", "var(--c-text)", 3, "click"], [1, "material-symbols-outlined", 2, "font-size", "16px"], ["routerLink", "/clinica/escolher", "appTooltip", "Trocar empresa", 1, "flex", "items-center", "gap-2", "px-3", "py-2", "text-sm", "hover:bg-[var(--c-soft)]", 2, "color", "var(--c-text)", "text-decoration", "none", 3, "click"], ["routerLink", "/plataforma", "appTooltip", "Admin da plataforma", 1, "flex", "items-center", "gap-2", "px-3", "py-2", "text-sm", "hover:bg-[var(--c-soft)]", 2, "color", "var(--c-text)", "text-decoration", "none", 3, "click"], ["routerLink", "/clinica/configuracoes", "appTooltip", "Configura\xE7\xF5es", 1, "flex", "items-center", "gap-2", "px-3", "py-2", "text-sm", "hover:bg-[var(--c-soft)]", 2, "color", "var(--c-text)", "text-decoration", "none", 3, "click"], ["routerLink", "/assinatura", "appTooltip", "Assinatura", 1, "flex", "items-center", "gap-2", "px-3", "py-2", "text-sm", "hover:bg-[var(--c-soft)]", 2, "color", "var(--c-text)", "text-decoration", "none", 3, "click"]], template: function BarraLateralComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "div", 1);
      \u0275\u0275listener("click", function BarraLateralComponent_Template_div_click_0_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.fecharSidebarMobile());
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(1, "aside", 2)(2, "div", 3)(3, "div", 4)(4, "div", 5);
      \u0275\u0275element(5, "img", 6);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "span", 7);
      \u0275\u0275text(7, "Gestgo");
      \u0275\u0275elementEnd()()();
      \u0275\u0275conditionalCreate(8, BarraLateralComponent_Conditional_8_Template, 9, 3, "div", 8);
      \u0275\u0275elementStart(9, "nav", 9)(10, "p", 10);
      \u0275\u0275text(11, "MENU");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(12, BarraLateralComponent_Conditional_12_Template, 5, 2, "a", 11);
      \u0275\u0275conditionalCreate(13, BarraLateralComponent_Conditional_13_Template, 5, 0, "a", 12);
      \u0275\u0275conditionalCreate(14, BarraLateralComponent_Conditional_14_Template, 10, 0);
      \u0275\u0275conditionalCreate(15, BarraLateralComponent_Conditional_15_Template, 10, 0);
      \u0275\u0275conditionalCreate(16, BarraLateralComponent_Conditional_16_Template, 6, 1, "a", 13);
      \u0275\u0275conditionalCreate(17, BarraLateralComponent_Conditional_17_Template, 2, 0, "p", 14);
      \u0275\u0275conditionalCreate(18, BarraLateralComponent_Conditional_18_Template, 15, 0);
      \u0275\u0275conditionalCreate(19, BarraLateralComponent_Conditional_19_Template, 10, 0);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(20, "div", 15)(21, "div", 16, 0)(23, "button", 17);
      \u0275\u0275listener("click", function BarraLateralComponent_Template_button_click_23_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.alternarMenuUsuario());
      });
      \u0275\u0275elementStart(24, "div", 18);
      \u0275\u0275text(25);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(26, "div", 19)(27, "p", 20);
      \u0275\u0275text(28);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(29, "p", 21);
      \u0275\u0275text(30);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(31, "span", 22);
      \u0275\u0275text(32, "unfold_more");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(33, BarraLateralComponent_Conditional_33_Template, 9, 4, "div", 23);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275classProp("hidden", !ctx.sidebarOpenMobile);
      \u0275\u0275advance();
      \u0275\u0275classProp("-translate-x-full", !ctx.sidebarOpenMobile);
      \u0275\u0275advance(7);
      \u0275\u0275conditional(ctx.nomeClinica ? 8 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275conditional(ctx.podeVerDashboard ? 12 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.podeGerenciarTemplates ? 13 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.podeAcessarLinksEEnvios ? 14 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.podeVerSubmissoes ? 15 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.podeVerNotificacoes ? 16 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.podeGerenciarClinica || ctx.podeGerenciarUsuarios ? 17 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.podeGerenciarClinica ? 18 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.podeGerenciarUsuarios ? 19 : -1);
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate1(" ", ctx.iniciaisUsuario, " ");
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.nomeUsuario);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.emailUsuario);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.menuUsuarioAberto ? 33 : -1);
    }
  }, dependencies: [CommonModule, RouterLink, RouterLinkActive, TooltipDirective, UpperCasePipe], styles: ["\n\n.user-dropdown[_ngcontent-%COMP%]   a[_ngcontent-%COMP%], \n.user-dropdown[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  width: 100%;\n}\n/*# sourceMappingURL=barra-lateral.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BarraLateralComponent, [{
    type: Component,
    args: [{ selector: "app-barra-lateral", standalone: true, imports: [CommonModule, RouterLink, RouterLinkActive, TooltipDirective], template: `<!-- Igual ao backend: overlay hidden por padr\xE3o; JS remove "hidden" ao abrir. Sidebar: -translate-x-full removido ao abrir. -->\r
<div class="sidebar-overlay-mobile fixed inset-0 z-20 bg-black/55 backdrop-blur-sm cursor-pointer lg:hidden"\r
     [class.hidden]="!sidebarOpenMobile"\r
     aria-hidden="true"\r
     (click)="fecharSidebarMobile()"></div>\r
<aside id="sidebar"\r
       class="sidebar fixed inset-y-0 left-0 z-30 flex flex-col lg:translate-x-0"\r
       [class.-translate-x-full]="!sidebarOpenMobile">\r
  <!-- Cabe\xE7alho da sidebar: logo -->\r
  <div class="h-14 flex items-center px-3.5 shrink-0" style="border-bottom: 1px solid var(--c-border)">\r
    <div class="sidebar-brand flex items-center gap-2.5 min-w-0 w-full">\r
      <div class="shrink-0 w-7 h-7 rounded-md flex items-center justify-center" style="background: var(--c-primary)">\r
        <img src="assets/logo/logo.png" alt="Gestgo" class="w-full h-full rounded-md object-contain" style="padding: 2px" onerror="this.style.display='none'">\r
      </div>\r
      <span class="sidebar-label font-semibold text-sm truncate" style="color: var(--c-text)">Gestgo</span>\r
    </div>\r
  </div>\r
\r
  <!-- Empresa atual -->\r
  @if (nomeClinica) {\r
    <div class="sidebar-clinic px-2 py-2 shrink-0" style="border-bottom: 1px solid var(--c-border)">\r
      <div class="flex items-center gap-2.5 min-w-0">\r
        <div class="w-9 h-9 rounded-lg shrink-0 overflow-hidden flex items-center justify-center text-sm font-bold flex-shrink-0" style="background: var(--c-soft); color: var(--c-primary)">\r
          @if (logoUrlClinica) {\r
            <img [src]="logoUrlClinica" [alt]="'Logo ' + nomeClinica" class="w-full h-full object-cover" loading="lazy" />\r
          } @else {\r
            {{ nomeClinica.charAt(0) | uppercase }}\r
          }\r
        </div>\r
        <div class="sidebar-label min-w-0 flex-1">\r
          <p class="text-xs font-semibold truncate" style="color: var(--c-text)">{{ nomeClinica }}</p>\r
          @if (enderecoClinica) {\r
            <p class="text-[0.65rem] truncate mt-0.5" style="color: var(--c-muted)">{{ enderecoClinica }}</p>\r
          }\r
        </div>\r
      </div>\r
    </div>\r
  }\r
\r
  <!-- Navega\xE7\xE3o -->\r
  <nav class="flex-1 px-2 py-3 overflow-y-auto space-y-0.5">\r
    <p class="sidebar-section-label mt-1 mb-2">MENU</p>\r
\r
    @if (podeVerDashboard) {\r
      <a routerLink="/dashboard" routerLinkActive="ativo" [routerLinkActiveOptions]="{ exact: true }" class="nav-link" appTooltip="Painel">\r
        <span class="material-symbols-outlined shrink-0" style="font-size: 19px">dashboard</span>\r
        <span class="sidebar-label">Painel</span>\r
      </a>\r
    }\r
\r
    @if (podeGerenciarTemplates) {\r
      <a routerLink="/templates" routerLinkActive="ativo" class="nav-link" appTooltip="Modelos de formul\xE1rio">\r
        <span class="material-symbols-outlined shrink-0" style="font-size: 19px">description</span>\r
        <span class="sidebar-label">Modelos</span>\r
      </a>\r
    }\r
\r
    @if (podeAcessarLinksEEnvios) {\r
      <a routerLink="/links-publicos" routerLinkActive="ativo" class="nav-link" appTooltip="Links para enviar">\r
        <span class="material-symbols-outlined shrink-0" style="font-size: 19px">link</span>\r
        <span class="sidebar-label">Links p\xFAblicos</span>\r
      </a>\r
      <a routerLink="/envios" routerLinkActive="ativo" class="nav-link" appTooltip="Envios de documento">\r
        <span class="material-symbols-outlined shrink-0" style="font-size: 19px">send</span>\r
        <span class="sidebar-label">Envios</span>\r
      </a>\r
    }\r
\r
    @if (podeVerSubmissoes) {\r
      <a routerLink="/protocolos" routerLinkActive="ativo" class="nav-link" appTooltip="Protocolos">\r
        <span class="material-symbols-outlined shrink-0" style="font-size: 19px">inbox</span>\r
        <span class="sidebar-label">Protocolos</span>\r
      </a>\r
      <a routerLink="/pessoas" routerLinkActive="ativo" class="nav-link" appTooltip="Pessoas">\r
        <span class="material-symbols-outlined shrink-0" style="font-size: 19px">group</span>\r
        <span class="sidebar-label">Pessoas</span>\r
      </a>\r
    }\r
\r
    @if (podeVerNotificacoes) {\r
      <a routerLink="/notificacoes" routerLinkActive="ativo" class="nav-link relative" appTooltip="Notifica\xE7\xF5es">\r
        <span class="material-symbols-outlined shrink-0" style="font-size: 19px">notifications</span>\r
        <span class="sidebar-label">Notifica\xE7\xF5es</span>\r
        @if (notificacoesNaoLidas > 0) {\r
          <span class="sidebar-label ml-auto min-w-[18px] h-[18px] rounded-full flex items-center justify-center text-[0.6rem] font-bold px-1" style="background: var(--c-primary); color: #fff">\r
            {{ notificacoesNaoLidas > 99 ? '99+' : notificacoesNaoLidas }}\r
          </span>\r
        }\r
      </a>\r
    }\r
\r
    @if (podeGerenciarClinica || podeGerenciarUsuarios) {\r
      <p class="sidebar-section-label mt-5 mb-2">ADMINISTRA\xC7\xC3O</p>\r
    }\r
\r
    @if (podeGerenciarClinica) {\r
      <a routerLink="/clinica/configuracoes" routerLinkActive="ativo" class="nav-link" appTooltip="Empresa">\r
        <span class="material-symbols-outlined shrink-0" style="font-size: 19px">business</span>\r
        <span class="sidebar-label">Empresa</span>\r
      </a>\r
      <a routerLink="/link-bio" routerLinkActive="ativo" class="nav-link" appTooltip="P\xE1gina de links (bio)">\r
        <span class="material-symbols-outlined shrink-0" style="font-size: 19px">link</span>\r
        <span class="sidebar-label">P\xE1gina de links</span>\r
      </a>\r
      <a routerLink="/clinica/integracoes" routerLinkActive="ativo" class="nav-link" appTooltip="Integra\xE7\xF5es">\r
        <span class="material-symbols-outlined shrink-0" style="font-size: 19px">api</span>\r
        <span class="sidebar-label">Integra\xE7\xF5es</span>\r
      </a>\r
    }\r
\r
    @if (podeGerenciarUsuarios) {\r
      <a routerLink="/usuarios" routerLinkActive="ativo" class="nav-link" appTooltip="Usu\xE1rios">\r
        <span class="material-symbols-outlined shrink-0" style="font-size: 19px">group</span>\r
        <span class="sidebar-label">Usu\xE1rios</span>\r
      </a>\r
      <a routerLink="/organizacao/permissoes" routerLinkActive="ativo" class="nav-link" appTooltip="Permiss\xF5es">\r
        <span class="material-symbols-outlined shrink-0" style="font-size: 19px">admin_panel_settings</span>\r
        <span class="sidebar-label">Permiss\xF5es</span>\r
      </a>\r
    }\r
  </nav>\r
\r
  <!-- Rodap\xE9: usu\xE1rio -->\r
  <div class="shrink-0 px-2 py-2 overflow-visible" style="border-top: 1px solid var(--c-border)">\r
    <div class="relative" #userMenuContainer>\r
      <button type="button" id="user-menu-btn" (click)="alternarMenuUsuario()" class="flex items-center gap-2.5 w-full px-2 py-2 rounded-lg text-left transition-colors hover:bg-[var(--c-soft)] cursor-pointer" aria-label="Menu do usu\xE1rio">\r
        <div class="w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-xs font-bold" style="background: var(--c-primary); color: #fff">\r
          {{ iniciaisUsuario }}\r
        </div>\r
        <div class="sidebar-label flex-1 min-w-0">\r
          <p class="text-xs font-semibold truncate" style="color: var(--c-text)">{{ nomeUsuario }}</p>\r
          <p class="truncate text-[0.7rem]" style="color: var(--c-muted)">{{ emailUsuario }}</p>\r
        </div>\r
        <span class="material-symbols-outlined sidebar-label shrink-0" style="font-size: 15px; color: var(--c-muted)">unfold_more</span>\r
      </button>\r
\r
      @if (menuUsuarioAberto) {\r
        <div class="user-dropdown absolute left-0 right-0 bottom-full mb-1 py-1 rounded-lg shadow-lg z-[100]" style="background: var(--c-elevated); border: 1px solid var(--c-border); min-width: 200px; box-shadow: 0 8px 32px rgba(0,0,0,0.22)">\r
          @if (exibirTrocarEmpresa) {\r
            <a routerLink="/clinica/escolher" (click)="fecharMenuUsuario()" class="flex items-center gap-2 px-3 py-2 text-sm hover:bg-[var(--c-soft)]" style="color: var(--c-text); text-decoration: none" appTooltip="Trocar empresa">\r
              <span class="material-symbols-outlined" style="font-size: 16px">swap_horiz</span>\r
              Trocar empresa\r
            </a>\r
          }\r
          @if (ehAdminPlataforma) {\r
            <a routerLink="/plataforma" (click)="fecharMenuUsuario()" class="flex items-center gap-2 px-3 py-2 text-sm hover:bg-[var(--c-soft)]" style="color: var(--c-text); text-decoration: none" appTooltip="Admin da plataforma">\r
              <span class="material-symbols-outlined" style="font-size: 16px">admin_panel_settings</span>\r
              Admin da plataforma\r
            </a>\r
          }\r
          @if (podeGerenciarClinica) {\r
            <a routerLink="/clinica/configuracoes" (click)="fecharMenuUsuario()" class="flex items-center gap-2 px-3 py-2 text-sm hover:bg-[var(--c-soft)]" style="color: var(--c-text); text-decoration: none" appTooltip="Configura\xE7\xF5es">\r
              <span class="material-symbols-outlined" style="font-size: 16px">settings</span>\r
              Configura\xE7\xF5es\r
            </a>\r
          }\r
          @if (podeVerBilling) {\r
            <a routerLink="/assinatura" (click)="fecharMenuUsuario()" class="flex items-center gap-2 px-3 py-2 text-sm hover:bg-[var(--c-soft)]" style="color: var(--c-text); text-decoration: none" appTooltip="Assinatura">\r
              <span class="material-symbols-outlined" style="font-size: 16px">credit_card</span>\r
              Assinatura\r
            </a>\r
          }\r
          <button type="button" (click)="sair()" class="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-[var(--c-soft)] text-left border-0 bg-transparent cursor-pointer" style="color: var(--c-text)" appTooltip="Sair">\r
            <span class="material-symbols-outlined" style="font-size: 16px">logout</span>\r
            Sair\r
          </button>\r
        </div>\r
      }\r
    </div>\r
  </div>\r
</aside>\r
`, styles: ["/* src/app/componentes/layout/barra-lateral/barra-lateral.component.css */\n.user-dropdown a,\n.user-dropdown button {\n  display: flex;\n  align-items: center;\n  width: 100%;\n}\n/*# sourceMappingURL=barra-lateral.component.css.map */\n"] }]
  }], null, { userMenuContainer: [{
    type: ViewChild,
    args: ["userMenuContainer"]
  }], onDocumentClick: [{
    type: HostListener,
    args: ["document:click", ["$event"]]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(BarraLateralComponent, { className: "BarraLateralComponent", filePath: "src/app/componentes/layout/barra-lateral/barra-lateral.component.ts", lineNumber: 17 });
})();

// src/app/componentes/layout/layout-app/layout-app.component.ts
function LayoutAppComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2)(1, "span", 5)(2, "span", 6);
    \u0275\u0275text(3, "schedule");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "a", 7);
    \u0275\u0275text(6, "Ver assinatura");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.trialNotice.message, " ");
  }
}
function LayoutAppComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 3);
    \u0275\u0275element(1, "zm-assinatura-bloqueada-card", 8);
    \u0275\u0275elementEnd();
  }
}
var LayoutAppComponent = class _LayoutAppComponent {
  tituloPagina = "Painel";
  breadcrumbs = [];
  urlVoltar = null;
  labelVoltar = null;
  notificacoesNaoLidas = 0;
  trialNotice = null;
  router = inject(Router);
  notif = inject(NotificacoesService);
  sidebarMobile = inject(SidebarMobileService);
  auth = inject(AuthService);
  billingBlockedState = inject(BillingBlockedStateService);
  updateFromActivatedRoute() {
    let route = this.router.routerState.snapshot.root;
    while (route.firstChild) {
      route = route.firstChild;
    }
    const data = route.data ?? {};
    this.tituloPagina = data.titulo ?? "Gestgo";
    this.urlVoltar = data.urlVoltar ?? null;
    this.labelVoltar = data.labelVoltar ?? null;
    const path = this.router.url.split("?")[0].replace(/\/$/, "") || "/";
    if (path === "/dashboard") {
      this.breadcrumbs = [{ label: this.tituloPagina, url: null }];
    } else {
      this.breadcrumbs = [
        { label: "In\xEDcio", url: "/dashboard" },
        { label: this.tituloPagina, url: null }
      ];
    }
  }
  /** Aviso global de cobrança (exceto na própria página de assinatura). */
  mostrarAvisoCobrancaGlobal() {
    if (!this.billingBlockedState.isActive())
      return false;
    const path = this.router.url.split("?")[0].replace(/\/$/, "") || "/";
    return path !== "/assinatura";
  }
  ngOnInit() {
    if (this.auth.isAuthenticated()) {
      this.auth.me().subscribe({
        next: () => {
          this.trialNotice = this.auth.getTrialNotice();
        },
        error: () => {
        }
      });
    }
    this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe(() => {
      this.sidebarMobile.setOpen(false);
      this.billingBlockedState.clear();
      this.updateFromActivatedRoute();
    });
    this.updateFromActivatedRoute();
    this.notif.getNaoLidasCount().subscribe((n) => this.notificacoesNaoLidas = n);
  }
  static \u0275fac = function LayoutAppComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LayoutAppComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LayoutAppComponent, selectors: [["app-layout-app"]], decls: 7, vars: 7, consts: [[1, "main-wrapper", "flex", "flex-col", "min-h-screen"], [3, "titulo", "breadcrumbs", "urlVoltar", "labelVoltar", "notificacoesNaoLidas"], ["role", "status", 1, "trial-banner", "px-4", "sm:px-6", "lg:px-8", "py-3", "text-sm", "flex", "flex-wrap", "items-center", "justify-between", "gap-3", 2, "background", "color-mix(in srgb, var(--c-primary) 14%, transparent)", "border-bottom", "1px solid var(--c-border)", "color", "var(--c-text)"], [1, "px-4", "sm:px-6", "lg:px-8", "pt-3"], [1, "flex-1", "px-4", "sm:px-6", "lg:px-8", "py-6", "lg:py-8"], [1, "flex", "items-center", "gap-2"], ["aria-hidden", "true", 1, "material-symbols-outlined", "text-lg", 2, "color", "var(--c-primary)"], ["routerLink", "/assinatura", 1, "font-semibold", "shrink-0", 2, "color", "var(--c-primary)"], ["variant", "compact"]], template: function LayoutAppComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275element(0, "app-barra-lateral");
      \u0275\u0275elementStart(1, "div", 0);
      \u0275\u0275element(2, "app-cabecalho", 1);
      \u0275\u0275conditionalCreate(3, LayoutAppComponent_Conditional_3_Template, 7, 1, "div", 2);
      \u0275\u0275conditionalCreate(4, LayoutAppComponent_Conditional_4_Template, 2, 0, "div", 3);
      \u0275\u0275elementStart(5, "main", 4);
      \u0275\u0275element(6, "router-outlet");
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(2);
      \u0275\u0275property("titulo", ctx.tituloPagina)("breadcrumbs", ctx.breadcrumbs)("urlVoltar", ctx.urlVoltar)("labelVoltar", ctx.labelVoltar ?? "Voltar")("notificacoesNaoLidas", ctx.notificacoesNaoLidas);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.trialNotice ? 3 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.mostrarAvisoCobrancaGlobal() ? 4 : -1);
    }
  }, dependencies: [
    CommonModule,
    RouterLink,
    RouterOutlet,
    BarraLateralComponent,
    CabecalhoComponent,
    ZmAssinaturaBloqueadaCardComponent
  ], styles: ["\n\n/*# sourceMappingURL=layout-app.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LayoutAppComponent, [{
    type: Component,
    args: [{ selector: "app-layout-app", standalone: true, imports: [
      CommonModule,
      RouterLink,
      RouterOutlet,
      BarraLateralComponent,
      CabecalhoComponent,
      ZmAssinaturaBloqueadaCardComponent
    ], template: `<app-barra-lateral />\r
<div class="main-wrapper flex flex-col min-h-screen">\r
  <app-cabecalho [titulo]="tituloPagina" [breadcrumbs]="breadcrumbs" [urlVoltar]="urlVoltar" [labelVoltar]="labelVoltar ?? 'Voltar'" [notificacoesNaoLidas]="notificacoesNaoLidas" />\r
  @if (trialNotice) {\r
    <div\r
      class="trial-banner px-4 sm:px-6 lg:px-8 py-3 text-sm flex flex-wrap items-center justify-between gap-3"\r
      style="background: color-mix(in srgb, var(--c-primary) 14%, transparent); border-bottom: 1px solid var(--c-border); color: var(--c-text)"\r
      role="status"\r
    >\r
      <span class="flex items-center gap-2">\r
        <span class="material-symbols-outlined text-lg" style="color: var(--c-primary)" aria-hidden="true">schedule</span>\r
        {{ trialNotice.message }}\r
      </span>\r
      <a routerLink="/assinatura" class="font-semibold shrink-0" style="color: var(--c-primary)">Ver assinatura</a>\r
    </div>\r
  }\r
  @if (mostrarAvisoCobrancaGlobal()) {\r
    <div class="px-4 sm:px-6 lg:px-8 pt-3">\r
      <zm-assinatura-bloqueada-card variant="compact" />\r
    </div>\r
  }\r
  <main class="flex-1 px-4 sm:px-6 lg:px-8 py-6 lg:py-8">\r
    <router-outlet />\r
  </main>\r
</div>\r
`, styles: ["/* src/app/componentes/layout/layout-app/layout-app.component.css */\n/*# sourceMappingURL=layout-app.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LayoutAppComponent, { className: "LayoutAppComponent", filePath: "src/app/componentes/layout/layout-app/layout-app.component.ts", lineNumber: 28 });
})();
export {
  LayoutAppComponent
};
//# sourceMappingURL=chunk-GUW2AXHR.js.map
