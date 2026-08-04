import {
  PlataformaHeaderService
} from "./chunk-Y5AJ4MLH.js";
import {
  CabecalhoComponent,
  SidebarMobileService
} from "./chunk-BAWSRWCL.js";
import {
  NotificacoesService
} from "./chunk-HY3FJGNT.js";
import "./chunk-7WBHVE2H.js";
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
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵqueryRefresh,
  ɵɵresetView,
  ɵɵresolveDocument,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵviewQuery
} from "./chunk-GRLISYEV.js";

// src/app/componentes/layout/barra-lateral-plataforma/barra-lateral-plataforma.component.ts
var _c0 = ["userMenuContainer"];
var _c1 = () => ({ exact: true });
function BarraLateralPlataformaComponent_Conditional_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 18);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.notificacoesNaoLidas > 99 ? "99+" : ctx_r1.notificacoesNaoLidas, " ");
  }
}
function BarraLateralPlataformaComponent_Conditional_72_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 31)(1, "button", 32);
    \u0275\u0275listener("click", function BarraLateralPlataformaComponent_Conditional_72_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.sair());
    });
    \u0275\u0275elementStart(2, "span", 33);
    \u0275\u0275text(3, "logout");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " Sair ");
    \u0275\u0275elementEnd()();
  }
}
var BarraLateralPlataformaComponent = class _BarraLateralPlataformaComponent {
  nomeUsuario = "Usu\xE1rio";
  iniciaisUsuario = "U";
  emailUsuario = "";
  notificacoesNaoLidas = 0;
  menuUsuarioAberto = false;
  userMenuContainer;
  auth = inject(AuthService);
  router = inject(Router);
  sidebarMobile = inject(SidebarMobileService);
  notif = inject(NotificacoesService);
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
    this.sidebarMobile.getOpen().subscribe((open) => {
      this.sidebarOpenMobile = open;
      if (typeof document !== "undefined") {
        document.body.style.overflow = open ? "hidden" : "";
      }
    });
    this.notif.getNaoLidasCount().subscribe((n) => this.notificacoesNaoLidas = n);
  }
  atualizarDados() {
    const u = this.auth.getUser();
    if (u) {
      this.nomeUsuario = u.name || "Usu\xE1rio";
      this.emailUsuario = u.email || "";
      this.iniciaisUsuario = this.nomeUsuario.slice(0, 2).toUpperCase() || "U";
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
  static \u0275fac = function BarraLateralPlataformaComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _BarraLateralPlataformaComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _BarraLateralPlataformaComponent, selectors: [["app-barra-lateral-plataforma"]], viewQuery: function BarraLateralPlataformaComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c0, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.userMenuContainer = _t.first);
    }
  }, hostBindings: function BarraLateralPlataformaComponent_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("click", function BarraLateralPlataformaComponent_click_HostBindingHandler($event) {
        return ctx.onDocumentClick($event);
      }, \u0275\u0275resolveDocument);
    }
  }, decls: 73, vars: 11, consts: [["userMenuContainer", ""], ["aria-hidden", "true", 1, "sidebar-overlay-mobile", "fixed", "inset-0", "z-20", "bg-black/55", "backdrop-blur-sm", "cursor-pointer", "lg:hidden", 3, "click"], ["id", "sidebar", 1, "sidebar", "fixed", "inset-y-0", "left-0", "z-30", "flex", "flex-col", "lg:translate-x-0"], [1, "h-14", "flex", "items-center", "px-3.5", "shrink-0", 2, "border-bottom", "1px solid var(--c-border)"], [1, "sidebar-brand", "flex", "items-center", "gap-2.5", "min-w-0", "w-full"], [1, "shrink-0", "w-7", "h-7", "rounded-lg", "flex", "items-center", "justify-center", 2, "background", "var(--c-primary)"], ["src", "assets/logo/logo.png", "alt", "Gestgo", "onerror", "this.style.display='none'", 1, "w-full", "h-full", "rounded-lg", "object-contain", 2, "padding", "2px"], [1, "sidebar-label", "font-semibold", "text-sm", "truncate", 2, "color", "var(--c-text)"], [1, "flex-1", "px-2", "py-3", "overflow-y-auto", "space-y-0.5"], [1, "sidebar-section-label", "mt-1", "mb-2"], ["routerLink", "/plataforma", "routerLinkActive", "ativo", "appTooltip", "Vis\xE3o geral", 1, "nav-link", 3, "routerLinkActiveOptions"], [1, "material-symbols-outlined", "shrink-0", 2, "font-size", "19px"], [1, "sidebar-label"], ["routerLink", "/plataforma/clientes", "routerLinkActive", "ativo", "appTooltip", "Clientes (tenants)", 1, "nav-link"], ["routerLink", "/plataforma/leads", "routerLinkActive", "ativo", "appTooltip", "Leads", 1, "nav-link"], ["routerLink", "/plataforma/assinaturas", "routerLinkActive", "ativo", "data-tooltip", "Assinaturas", "title", "Assinaturas", 1, "nav-link"], ["routerLink", "/plataforma/faturas", "routerLinkActive", "ativo", "appTooltip", "Faturas / cobran\xE7as", 1, "nav-link"], ["routerLink", "/plataforma/notificacoes", "routerLinkActive", "ativo", "appTooltip", "Notifica\xE7\xF5es", 1, "nav-link", "relative"], [1, "sidebar-label", "ml-auto", "min-w-[18px]", "h-[18px]", "rounded-full", "flex", "items-center", "justify-center", "text-[0.6rem]", "font-bold", "px-1", 2, "background", "var(--c-primary)", "color", "#fff"], [1, "sidebar-section-label", "mt-5", "mb-2"], ["routerLink", "/plataforma/planos", "routerLinkActive", "ativo", "appTooltip", "Planos", 1, "nav-link"], ["routerLink", "/plataforma/configuracoes", "routerLinkActive", "ativo", "appTooltip", "Configura\xE7\xF5es da plataforma", 1, "nav-link"], ["routerLink", "/plataforma/logs", "routerLinkActive", "ativo", "appTooltip", "Logs", 1, "nav-link"], [1, "shrink-0", "px-2", "py-2", "overflow-visible", 2, "border-top", "1px solid var(--c-border)"], [1, "relative"], ["type", "button", "appTooltip", "Menu do usu\xE1rio", "aria-label", "Menu do usu\xE1rio", 1, "flex", "items-center", "gap-2.5", "w-full", "px-2", "py-2", "rounded-lg", "text-left", "transition-colors", "hover:bg-[var(--c-soft)]", "cursor-pointer", 3, "click"], [1, "w-7", "h-7", "rounded-full", "shrink-0", "flex", "items-center", "justify-center", "text-xs", "font-bold", 2, "background", "var(--c-primary)", "color", "#fff"], [1, "sidebar-label", "flex-1", "min-w-0"], [1, "text-xs", "font-semibold", "truncate", 2, "color", "var(--c-text)"], [1, "truncate", "text-[0.7rem]", 2, "color", "var(--c-muted)"], [1, "material-symbols-outlined", "sidebar-label", "shrink-0", 2, "font-size", "15px", "color", "var(--c-muted)"], [1, "user-dropdown", "absolute", "left-0", "right-0", "bottom-full", "mb-1", "py-1", "rounded-lg", "shadow-lg", "z-[100]", 2, "background", "var(--c-elevated)", "border", "1px solid var(--c-border)", "min-width", "200px", "box-shadow", "0 8px 32px rgba(0,0,0,0.22)"], ["type", "button", "appTooltip", "Sair", 1, "w-full", "flex", "items-center", "gap-2", "px-3", "py-2", "text-sm", "hover:bg-[var(--c-soft)]", "text-left", "border-0", "bg-transparent", "cursor-pointer", 2, "color", "var(--c-text)", 3, "click"], [1, "material-symbols-outlined", 2, "font-size", "16px"]], template: function BarraLateralPlataformaComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "div", 1);
      \u0275\u0275listener("click", function BarraLateralPlataformaComponent_Template_div_click_0_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.fecharSidebarMobile());
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(1, "aside", 2)(2, "div", 3)(3, "div", 4)(4, "div", 5);
      \u0275\u0275element(5, "img", 6);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "span", 7);
      \u0275\u0275text(7, "Gestgo \u2014 Plataforma");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(8, "nav", 8)(9, "p", 9);
      \u0275\u0275text(10, "MENU");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "a", 10)(12, "span", 11);
      \u0275\u0275text(13, "analytics");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "span", 12);
      \u0275\u0275text(15, "Vis\xE3o geral");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(16, "a", 13)(17, "span", 11);
      \u0275\u0275text(18, "apartment");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "span", 12);
      \u0275\u0275text(20, "Clientes (tenants)");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(21, "a", 14)(22, "span", 11);
      \u0275\u0275text(23, "request_quote");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "span", 12);
      \u0275\u0275text(25, "Leads");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(26, "a", 15)(27, "span", 11);
      \u0275\u0275text(28, "receipt_long");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(29, "span", 12);
      \u0275\u0275text(30, "Assinaturas");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(31, "a", 16)(32, "span", 11);
      \u0275\u0275text(33, "payments");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(34, "span", 12);
      \u0275\u0275text(35, "Faturas / cobran\xE7as");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(36, "a", 17)(37, "span", 11);
      \u0275\u0275text(38, "notifications");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(39, "span", 12);
      \u0275\u0275text(40, "Notifica\xE7\xF5es");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(41, BarraLateralPlataformaComponent_Conditional_41_Template, 2, 1, "span", 18);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(42, "p", 19);
      \u0275\u0275text(43, "PLATAFORMA");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(44, "a", 20)(45, "span", 11);
      \u0275\u0275text(46, "subscriptions");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(47, "span", 12);
      \u0275\u0275text(48, "Planos");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(49, "a", 21)(50, "span", 11);
      \u0275\u0275text(51, "settings");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(52, "span", 12);
      \u0275\u0275text(53, "Configura\xE7\xF5es");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(54, "a", 22)(55, "span", 11);
      \u0275\u0275text(56, "history");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(57, "span", 12);
      \u0275\u0275text(58, "Logs");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(59, "div", 23)(60, "div", 24, 0)(62, "button", 25);
      \u0275\u0275listener("click", function BarraLateralPlataformaComponent_Template_button_click_62_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.alternarMenuUsuario());
      });
      \u0275\u0275elementStart(63, "div", 26);
      \u0275\u0275text(64);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(65, "div", 27)(66, "p", 28);
      \u0275\u0275text(67);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(68, "p", 29);
      \u0275\u0275text(69);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(70, "span", 30);
      \u0275\u0275text(71, "unfold_more");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(72, BarraLateralPlataformaComponent_Conditional_72_Template, 5, 0, "div", 31);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275classProp("hidden", !ctx.sidebarOpenMobile);
      \u0275\u0275advance();
      \u0275\u0275classProp("-translate-x-full", !ctx.sidebarOpenMobile);
      \u0275\u0275advance(10);
      \u0275\u0275property("routerLinkActiveOptions", \u0275\u0275pureFunction0(10, _c1));
      \u0275\u0275advance(30);
      \u0275\u0275conditional(ctx.notificacoesNaoLidas > 0 ? 41 : -1);
      \u0275\u0275advance(23);
      \u0275\u0275textInterpolate1(" ", ctx.iniciaisUsuario, " ");
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.nomeUsuario);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.emailUsuario);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.menuUsuarioAberto ? 72 : -1);
    }
  }, dependencies: [CommonModule, RouterLink, RouterLinkActive, TooltipDirective], styles: ["\n\n.user-dropdown[_ngcontent-%COMP%]   a[_ngcontent-%COMP%], \n.user-dropdown[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  width: 100%;\n}\n/*# sourceMappingURL=barra-lateral-plataforma.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BarraLateralPlataformaComponent, [{
    type: Component,
    args: [{ selector: "app-barra-lateral-plataforma", standalone: true, imports: [CommonModule, RouterLink, RouterLinkActive, TooltipDirective], template: `<div class="sidebar-overlay-mobile fixed inset-0 z-20 bg-black/55 backdrop-blur-sm cursor-pointer lg:hidden"
     [class.hidden]="!sidebarOpenMobile"
     aria-hidden="true"
     (click)="fecharSidebarMobile()"></div>
<aside id="sidebar"
       class="sidebar fixed inset-y-0 left-0 z-30 flex flex-col lg:translate-x-0"
       [class.-translate-x-full]="!sidebarOpenMobile">
  <div class="h-14 flex items-center px-3.5 shrink-0" style="border-bottom: 1px solid var(--c-border)">
    <div class="sidebar-brand flex items-center gap-2.5 min-w-0 w-full">
      <div class="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center" style="background: var(--c-primary)">
        <img src="assets/logo/logo.png" alt="Gestgo" class="w-full h-full rounded-lg object-contain" style="padding: 2px" onerror="this.style.display='none'">
      </div>
      <span class="sidebar-label font-semibold text-sm truncate" style="color: var(--c-text)">Gestgo \u2014 Plataforma</span>
    </div>
  </div>

  <nav class="flex-1 px-2 py-3 overflow-y-auto space-y-0.5">
    <p class="sidebar-section-label mt-1 mb-2">MENU</p>

    <a routerLink="/plataforma" routerLinkActive="ativo" [routerLinkActiveOptions]="{ exact: true }" class="nav-link" appTooltip="Vis\xE3o geral">
      <span class="material-symbols-outlined shrink-0" style="font-size: 19px">analytics</span>
      <span class="sidebar-label">Vis\xE3o geral</span>
    </a>

    <a routerLink="/plataforma/clientes" routerLinkActive="ativo" class="nav-link" appTooltip="Clientes (tenants)">
      <span class="material-symbols-outlined shrink-0" style="font-size: 19px">apartment</span>
      <span class="sidebar-label">Clientes (tenants)</span>
    </a>

    <a routerLink="/plataforma/leads" routerLinkActive="ativo" class="nav-link" appTooltip="Leads">
      <span class="material-symbols-outlined shrink-0" style="font-size: 19px">request_quote</span>
      <span class="sidebar-label">Leads</span>
    </a>

    <a routerLink="/plataforma/assinaturas" routerLinkActive="ativo" class="nav-link" data-tooltip="Assinaturas" title="Assinaturas">
      <span class="material-symbols-outlined shrink-0" style="font-size: 19px">receipt_long</span>
      <span class="sidebar-label">Assinaturas</span>
    </a>

    <a routerLink="/plataforma/faturas" routerLinkActive="ativo" class="nav-link" appTooltip="Faturas / cobran\xE7as">
      <span class="material-symbols-outlined shrink-0" style="font-size: 19px">payments</span>
      <span class="sidebar-label">Faturas / cobran\xE7as</span>
    </a>

    <a routerLink="/plataforma/notificacoes" routerLinkActive="ativo" class="nav-link relative" appTooltip="Notifica\xE7\xF5es">
      <span class="material-symbols-outlined shrink-0" style="font-size: 19px">notifications</span>
      <span class="sidebar-label">Notifica\xE7\xF5es</span>
      @if (notificacoesNaoLidas > 0) {
        <span class="sidebar-label ml-auto min-w-[18px] h-[18px] rounded-full flex items-center justify-center text-[0.6rem] font-bold px-1" style="background: var(--c-primary); color: #fff">
          {{ notificacoesNaoLidas > 99 ? '99+' : notificacoesNaoLidas }}
        </span>
      }
    </a>

    <p class="sidebar-section-label mt-5 mb-2">PLATAFORMA</p>

    <a routerLink="/plataforma/planos" routerLinkActive="ativo" class="nav-link" appTooltip="Planos">
      <span class="material-symbols-outlined shrink-0" style="font-size: 19px">subscriptions</span>
      <span class="sidebar-label">Planos</span>
    </a>

    <a routerLink="/plataforma/configuracoes" routerLinkActive="ativo" class="nav-link" appTooltip="Configura\xE7\xF5es da plataforma">
      <span class="material-symbols-outlined shrink-0" style="font-size: 19px">settings</span>
      <span class="sidebar-label">Configura\xE7\xF5es</span>
    </a>

    <a routerLink="/plataforma/logs" routerLinkActive="ativo" class="nav-link" appTooltip="Logs">
      <span class="material-symbols-outlined shrink-0" style="font-size: 19px">history</span>
      <span class="sidebar-label">Logs</span>
    </a>
  </nav>

  <div class="shrink-0 px-2 py-2 overflow-visible" style="border-top: 1px solid var(--c-border)">
    <div class="relative" #userMenuContainer>
      <button type="button" (click)="alternarMenuUsuario()" class="flex items-center gap-2.5 w-full px-2 py-2 rounded-lg text-left transition-colors hover:bg-[var(--c-soft)] cursor-pointer" appTooltip="Menu do usu\xE1rio" aria-label="Menu do usu\xE1rio">
        <div class="w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-xs font-bold" style="background: var(--c-primary); color: #fff">
          {{ iniciaisUsuario }}
        </div>
        <div class="sidebar-label flex-1 min-w-0">
          <p class="text-xs font-semibold truncate" style="color: var(--c-text)">{{ nomeUsuario }}</p>
          <p class="truncate text-[0.7rem]" style="color: var(--c-muted)">{{ emailUsuario }}</p>
        </div>
        <span class="material-symbols-outlined sidebar-label shrink-0" style="font-size: 15px; color: var(--c-muted)">unfold_more</span>
      </button>

      @if (menuUsuarioAberto) {
        <div class="user-dropdown absolute left-0 right-0 bottom-full mb-1 py-1 rounded-lg shadow-lg z-[100]" style="background: var(--c-elevated); border: 1px solid var(--c-border); min-width: 200px; box-shadow: 0 8px 32px rgba(0,0,0,0.22)">
          <button type="button" (click)="sair()" class="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-[var(--c-soft)] text-left border-0 bg-transparent cursor-pointer" style="color: var(--c-text)" appTooltip="Sair">
            <span class="material-symbols-outlined" style="font-size: 16px">logout</span>
            Sair
          </button>
        </div>
      }
    </div>
  </div>
</aside>
`, styles: ["/* src/app/componentes/layout/barra-lateral-plataforma/barra-lateral-plataforma.component.css */\n.user-dropdown a,\n.user-dropdown button {\n  display: flex;\n  align-items: center;\n  width: 100%;\n}\n/*# sourceMappingURL=barra-lateral-plataforma.component.css.map */\n"] }]
  }], null, { userMenuContainer: [{
    type: ViewChild,
    args: ["userMenuContainer"]
  }], onDocumentClick: [{
    type: HostListener,
    args: ["document:click", ["$event"]]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(BarraLateralPlataformaComponent, { className: "BarraLateralPlataformaComponent", filePath: "src/app/componentes/layout/barra-lateral-plataforma/barra-lateral-plataforma.component.ts", lineNumber: 16 });
})();

// src/app/componentes/layout/layout-plataforma/layout-plataforma.component.ts
var LayoutPlataformaComponent = class _LayoutPlataformaComponent {
  tituloPagina = "Plataforma";
  subtituloPagina = null;
  breadcrumbs = [];
  urlVoltar = null;
  labelVoltar = "Voltar";
  notificacoesNaoLidas = 0;
  router = inject(Router);
  notif = inject(NotificacoesService);
  sidebarMobile = inject(SidebarMobileService);
  headerService = inject(PlataformaHeaderService);
  auth = inject(AuthService);
  headerSub;
  updateFromActivatedRoute() {
    let route = this.router.routerState.snapshot.root;
    while (route.firstChild) {
      route = route.firstChild;
    }
    const data = route.data ?? {};
    this.tituloPagina = data.titulo ?? "Plataforma";
    this.subtituloPagina = data.subtitulo ?? null;
    this.urlVoltar = data.urlVoltar ?? null;
    this.labelVoltar = data.labelVoltar ?? this.labelVoltar;
    this.recomputeBreadcrumbs();
  }
  recomputeBreadcrumbs() {
    const path = this.router.url.split("?")[0].replace(/\/$/, "") || "/plataforma";
    if (path === "/plataforma") {
      this.breadcrumbs = [{ label: this.tituloPagina, url: null }];
    } else {
      this.breadcrumbs = [
        { label: "Plataforma", url: "/plataforma" },
        { label: this.tituloPagina, url: null }
      ];
    }
  }
  ngOnInit() {
    if (this.auth.isAuthenticated()) {
      this.auth.me().subscribe({ error: () => {
      } });
    }
    this.headerSub = this.headerService.getOverride().subscribe((override) => {
      if (override) {
        this.tituloPagina = override.titulo;
        this.subtituloPagina = override.subtitulo;
        this.recomputeBreadcrumbs();
      } else {
        this.updateFromActivatedRoute();
      }
    });
    this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe(() => {
      this.sidebarMobile.setOpen(false);
      this.headerService.clearHeader();
      this.updateFromActivatedRoute();
    });
    this.updateFromActivatedRoute();
    this.notif.getNaoLidasCount().subscribe((n) => this.notificacoesNaoLidas = n);
  }
  ngOnDestroy() {
    this.headerSub?.unsubscribe();
  }
  static \u0275fac = function LayoutPlataformaComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LayoutPlataformaComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LayoutPlataformaComponent, selectors: [["app-layout-plataforma"]], decls: 5, vars: 6, consts: [[1, "main-wrapper", "flex", "flex-col", "min-h-screen"], ["notificacoesRouterLink", "/plataforma/notificacoes", 3, "titulo", "subtitulo", "breadcrumbs", "urlVoltar", "labelVoltar", "notificacoesNaoLidas"], [1, "flex-1", "px-4", "sm:px-6", "lg:px-8", "py-6", "lg:py-8"]], template: function LayoutPlataformaComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275element(0, "app-barra-lateral-plataforma");
      \u0275\u0275elementStart(1, "div", 0);
      \u0275\u0275element(2, "app-cabecalho", 1);
      \u0275\u0275elementStart(3, "main", 2);
      \u0275\u0275element(4, "router-outlet");
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(2);
      \u0275\u0275property("titulo", ctx.tituloPagina)("subtitulo", ctx.subtituloPagina)("breadcrumbs", ctx.breadcrumbs)("urlVoltar", ctx.urlVoltar)("labelVoltar", ctx.labelVoltar)("notificacoesNaoLidas", ctx.notificacoesNaoLidas);
    }
  }, dependencies: [CommonModule, RouterOutlet, BarraLateralPlataformaComponent, CabecalhoComponent], styles: ["\n\n/*# sourceMappingURL=layout-plataforma.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LayoutPlataformaComponent, [{
    type: Component,
    args: [{ selector: "app-layout-plataforma", standalone: true, imports: [CommonModule, RouterOutlet, BarraLateralPlataformaComponent, CabecalhoComponent], template: '<app-barra-lateral-plataforma />\r\n<div class="main-wrapper flex flex-col min-h-screen">\r\n  <app-cabecalho [titulo]="tituloPagina" [subtitulo]="subtituloPagina" [breadcrumbs]="breadcrumbs" [urlVoltar]="urlVoltar" [labelVoltar]="labelVoltar" [notificacoesNaoLidas]="notificacoesNaoLidas" notificacoesRouterLink="/plataforma/notificacoes" />\r\n  <main class="flex-1 px-4 sm:px-6 lg:px-8 py-6 lg:py-8">\r\n    <router-outlet />\r\n  </main>\r\n</div>\r\n', styles: ["/* src/app/componentes/layout/layout-plataforma/layout-plataforma.component.css */\n/*# sourceMappingURL=layout-plataforma.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LayoutPlataformaComponent, { className: "LayoutPlataformaComponent", filePath: "src/app/componentes/layout/layout-plataforma/layout-plataforma.component.ts", lineNumber: 20 });
})();
export {
  LayoutPlataformaComponent
};
//# sourceMappingURL=chunk-2C7FHRDD.js.map
