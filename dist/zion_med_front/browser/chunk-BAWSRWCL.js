import {
  ApiService
} from "./chunk-7WBHVE2H.js";
import {
  TooltipDirective
} from "./chunk-LVZEGAGU.js";
import {
  AuthService,
  applyUserAppearanceToBrowser
} from "./chunk-SFRXLDXR.js";
import {
  RouterLink
} from "./chunk-C2NWBPZH.js";
import {
  BehaviorSubject,
  CommonModule,
  Component,
  HostListener,
  Injectable,
  Input,
  ViewChild,
  inject,
  setClassMetadata,
  tap,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵresolveDocument,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵviewQuery
} from "./chunk-GRLISYEV.js";

// src/app/core/services/sidebar-mobile.service.ts
var SidebarMobileService = class _SidebarMobileService {
  open$ = new BehaviorSubject(false);
  setOpen(open) {
    this.open$.next(open);
  }
  getOpen() {
    return this.open$.asObservable();
  }
  get isOpen() {
    return this.open$.value;
  }
  static \u0275fac = function SidebarMobileService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SidebarMobileService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _SidebarMobileService, factory: _SidebarMobileService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SidebarMobileService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

// src/app/core/services/user-appearance.service.ts
var UserAppearanceService = class _UserAppearanceService {
  api = inject(ApiService);
  auth = inject(AuthService);
  /** PATCH parcial; atualiza sessão local e DOM se a API devolver o usuário. */
  patchAppearance(body) {
    return this.api.patch("/me/appearance", body).pipe(tap((res) => {
      const u = res.data?.user;
      if (u) {
        this.auth.mergeUserFromApi(u);
        applyUserAppearanceToBrowser(u);
        this.auth.notifyAppearanceApplied();
      }
    }));
  }
  static \u0275fac = function UserAppearanceService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _UserAppearanceService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _UserAppearanceService, factory: _UserAppearanceService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UserAppearanceService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

// src/app/componentes/layout/cabecalho/cabecalho.component.ts
var _c0 = ["themePicker"];
var _forTrack0 = ($index, $item) => $item.key;
function CabecalhoComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 3)(1, "span", 5);
    \u0275\u0275text(2, "arrow_back");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("routerLink", ctx_r1.urlVoltar)("appTooltip", ctx_r1.labelVoltar);
    \u0275\u0275attribute("aria-label", ctx_r1.labelVoltar);
  }
}
function CabecalhoComponent_Conditional_7_For_4_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 14);
    \u0275\u0275text(1, "/");
    \u0275\u0275elementEnd();
  }
}
function CabecalhoComponent_Conditional_7_For_4_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 15);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r3 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("routerLink", c_r3.url);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(c_r3.label);
  }
}
function CabecalhoComponent_Conditional_7_For_4_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 16);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r3 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(c_r3.label);
  }
}
function CabecalhoComponent_Conditional_7_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, CabecalhoComponent_Conditional_7_For_4_Conditional_0_Template, 2, 0, "span", 14);
    \u0275\u0275conditionalCreate(1, CabecalhoComponent_Conditional_7_For_4_Conditional_1_Template, 2, 2, "a", 15)(2, CabecalhoComponent_Conditional_7_For_4_Conditional_2_Template, 2, 1, "span", 16);
  }
  if (rf & 2) {
    const c_r3 = ctx.$implicit;
    const \u0275$index_24_r4 = ctx.$index;
    \u0275\u0275conditional(\u0275$index_24_r4 > 0 ? 0 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(c_r3.url ? 1 : 2);
  }
}
function CabecalhoComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "h2", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "nav", 13);
    \u0275\u0275repeaterCreate(3, CabecalhoComponent_Conditional_7_For_4_Template, 3, 2, null, null, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.titulo);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.breadcrumbs);
  }
}
function CabecalhoComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 7);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.subtitulo);
  }
}
function CabecalhoComponent_Conditional_15_For_25_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 36);
    \u0275\u0275text(1, "check");
    \u0275\u0275elementEnd();
  }
}
function CabecalhoComponent_Conditional_15_For_25_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 34);
    \u0275\u0275listener("click", function CabecalhoComponent_Conditional_15_For_25_Template_button_click_0_listener() {
      const t_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.aplicarTema(t_r7.key));
    });
    \u0275\u0275elementStart(1, "span", 35);
    \u0275\u0275conditionalCreate(2, CabecalhoComponent_Conditional_15_For_25_Conditional_2_Template, 2, 0, "span", 36);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const t_r7 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("theme-swatch--selected", ctx_r1.temaAtual === t_r7.key);
    \u0275\u0275attribute("aria-label", "Cor do tema: " + t_r7.labelPt)("aria-pressed", ctx_r1.temaAtual === t_r7.key);
    \u0275\u0275advance();
    \u0275\u0275styleProp("background", t_r7.color);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.temaAtual === t_r7.key ? 2 : -1);
  }
}
function CabecalhoComponent_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 17);
    \u0275\u0275listener("click", function CabecalhoComponent_Conditional_15_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.fecharMenuTema());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(1, "div", 18);
    \u0275\u0275listener("click", function CabecalhoComponent_Conditional_15_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r5);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 19)(3, "h3", 20);
    \u0275\u0275text(4, "Tema e apar\xEAncia");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 21);
    \u0275\u0275listener("click", function CabecalhoComponent_Conditional_15_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.fecharMenuTema());
    });
    \u0275\u0275elementStart(6, "span", 22);
    \u0275\u0275text(7, "close");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(8, "p", 23);
    \u0275\u0275text(9, "Modo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 24)(11, "button", 25);
    \u0275\u0275listener("click", function CabecalhoComponent_Conditional_15_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.aplicarModoEscuro(false));
    });
    \u0275\u0275elementStart(12, "span", 26);
    \u0275\u0275text(13, "wb_sunny");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "span", 27);
    \u0275\u0275text(15, "Claro");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "button", 25);
    \u0275\u0275listener("click", function CabecalhoComponent_Conditional_15_Template_button_click_16_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.aplicarModoEscuro(true));
    });
    \u0275\u0275elementStart(17, "span", 26);
    \u0275\u0275text(18, "dark_mode");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "span", 27);
    \u0275\u0275text(20, "Escuro");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(21, "p", 28);
    \u0275\u0275text(22, "Cor do tema");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "div", 29);
    \u0275\u0275repeaterCreate(24, CabecalhoComponent_Conditional_15_For_25_Template, 3, 7, "button", 30, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "div", 31);
    \u0275\u0275element(27, "span", 32);
    \u0275\u0275elementStart(28, "span", 33);
    \u0275\u0275text(29, " Selecionado: ");
    \u0275\u0275elementStart(30, "strong");
    \u0275\u0275text(31);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(11);
    \u0275\u0275classProp("theme-drawer-mode-btn--active", !ctx_r1.modoEscuro);
    \u0275\u0275attribute("aria-pressed", !ctx_r1.modoEscuro);
    \u0275\u0275advance(5);
    \u0275\u0275classProp("theme-drawer-mode-btn--active", ctx_r1.modoEscuro);
    \u0275\u0275attribute("aria-pressed", ctx_r1.modoEscuro);
    \u0275\u0275advance(8);
    \u0275\u0275repeater(ctx_r1.temasOrdemGrade);
    \u0275\u0275advance(3);
    \u0275\u0275styleProp("background", (ctx_r1.temaAtualMeta == null ? null : ctx_r1.temaAtualMeta.color) ?? "#2563eb");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate((ctx_r1.temaAtualMeta == null ? null : ctx_r1.temaAtualMeta.labelPt) ?? "\u2014");
  }
}
function CabecalhoComponent_Conditional_16_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 40);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.notificacoesNaoLidas > 99 ? "99+" : ctx_r1.notificacoesNaoLidas, " ");
  }
}
function CabecalhoComponent_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 37);
    \u0275\u0275elementStart(1, "a", 38)(2, "span", 39);
    \u0275\u0275text(3, "notifications");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(4, CabecalhoComponent_Conditional_16_Conditional_4_Template, 2, 1, "span", 40);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("routerLink", ctx_r1.notificacoesRouterLink);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r1.notificacoesNaoLidas > 0 ? 4 : -1);
  }
}
var TEMAS = [
  { key: "zion-blue", label: "Royal blue", labelPt: "Azul royal", color: "#1e40af" },
  { key: "ocean-blue", label: "Ocean Blue", labelPt: "Azul oceano", color: "#1d4ed8" },
  { key: "indigo-night", label: "Indigo Night", labelPt: "Anil", color: "#3730a3" },
  { key: "emerald-fresh", label: "Emerald Fresh", labelPt: "Esmeralda", color: "#15803d" },
  { key: "rose-elegant", label: "Rose Elegant", labelPt: "Rosa", color: "#be185d" },
  { key: "amber-warm", label: "Amber Warm", labelPt: "\xC2mbar", color: "#b45309" },
  { key: "violet-dream", label: "Violet Dream", labelPt: "Violeta", color: "#6d28d9" },
  { key: "teal-ocean", label: "Teal Ocean", labelPt: "Verde-\xE1gua", color: "#0f766e" },
  { key: "slate-pro", label: "Slate Pro", labelPt: "Ard\xF3sia", color: "#334155" },
  { key: "cyan-tech", label: "Cyan Tech", labelPt: "Ciano", color: "#0369a1" },
  { key: "fuchsia-bold", label: "Fuchsia Bold", labelPt: "Magenta", color: "#a21caf" }
];
var TEMAS_GRADE_ORDER = [
  "zion-blue",
  "indigo-night",
  "rose-elegant",
  "violet-dream",
  "slate-pro",
  "fuchsia-bold",
  "ocean-blue",
  "emerald-fresh",
  "amber-warm",
  "teal-ocean",
  "cyan-tech"
];
var CabecalhoComponent = class _CabecalhoComponent {
  titulo = "Gestgo";
  /** Subtítulo exibido abaixo do título no header (ex.: "Visão geral dos clientes utilizando o Gestgo."). */
  subtitulo = null;
  /** Trilha opcional (Início → página atual). */
  breadcrumbs = null;
  urlVoltar = null;
  labelVoltar = "Voltar";
  notificacoesNaoLidas = 0;
  /** Quando informado, o ícone de notificações no header usa esta rota (ex.: /plataforma/notificacoes). */
  notificacoesRouterLink = "/notificacoes";
  temas = TEMAS;
  /** Temas na ordem da grade de círculos (6 + 5). */
  get temasOrdemGrade() {
    const byKey = new Map(this.temas.map((t) => [t.key, t]));
    return TEMAS_GRADE_ORDER.map((k) => byKey.get(k)).filter((t) => t != null);
  }
  get temaAtualMeta() {
    return this.temas.find((t) => t.key === this.temaAtual);
  }
  /** Ícone de notificações só para quem tem permissão no contexto atual (tenant ou plataforma). */
  get podeVerNotificacoesNoHeader() {
    return this.auth.hasPermission("notifications.access");
  }
  temaAtual = "ocean-blue";
  modoEscuro = false;
  sidebarColapsada = false;
  menuTemaAberto = false;
  appearanceSub;
  themePickerRef;
  auth = inject(AuthService);
  appearance = inject(UserAppearanceService);
  sidebarMobile = inject(SidebarMobileService);
  onDocumentClick(e) {
    if (!this.menuTemaAberto)
      return;
    const el = this.themePickerRef?.nativeElement;
    if (el && el.contains(e.target))
      return;
    this.fecharMenuTema();
  }
  ngOnInit() {
    this.syncTemaControlsFromBrowser();
    this.appearanceSub = this.auth.appearanceApplied$.subscribe(() => this.syncTemaControlsFromBrowser());
  }
  ngOnDestroy() {
    this.appearanceSub?.unsubscribe();
  }
  /** Alinha estado do drawer com `body`/`localStorage` (inclui após `/me`). */
  syncTemaControlsFromBrowser() {
    try {
      const saved = localStorage.getItem("gestgo_theme");
      if (saved)
        this.temaAtual = saved;
      else {
        const m = document.body.className.match(/theme-([a-z-]+)/);
        if (m)
          this.temaAtual = m[1];
      }
      this.modoEscuro = document.body.classList.contains("dark") || localStorage.getItem("gestgo_dark_mode") === "1";
    } catch {
    }
  }
  alternarSidebar() {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 1024;
    if (isMobile) {
      this.sidebarMobile.setOpen(!this.sidebarMobile.isOpen);
      return;
    }
    this.sidebarColapsada = !this.sidebarColapsada;
    document.body.classList.toggle("sidebar-collapsed", this.sidebarColapsada);
    try {
      localStorage.setItem("gestgo_sidebar_collapsed", this.sidebarColapsada ? "1" : "0");
    } catch {
    }
  }
  /** Define modo escuro (true) ou claro (false); usado no drawer de tema */
  aplicarModoEscuro(escuro) {
    this.modoEscuro = escuro;
    document.body.classList.toggle("dark", this.modoEscuro);
    try {
      localStorage.setItem("gestgo_dark_mode", this.modoEscuro ? "1" : "0");
    } catch {
    }
    if (this.auth.isAuthenticated()) {
      this.appearance.patchAppearance({ ui_dark_mode: escuro }).subscribe({ error: () => {
      } });
    }
  }
  alternarMenuTema() {
    this.menuTemaAberto = !this.menuTemaAberto;
  }
  fecharMenuTema() {
    this.menuTemaAberto = false;
  }
  aplicarTema(key) {
    const list = Array.from(document.body.classList).filter((c) => c.startsWith("theme-"));
    list.forEach((c) => document.body.classList.remove(c));
    document.body.classList.add("theme-" + key);
    this.temaAtual = key;
    try {
      localStorage.setItem("gestgo_theme", key);
    } catch {
    }
    if (this.auth.isAuthenticated()) {
      this.appearance.patchAppearance({ ui_theme: key }).subscribe({ error: () => {
      } });
    }
  }
  static \u0275fac = function CabecalhoComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CabecalhoComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CabecalhoComponent, selectors: [["app-cabecalho"]], viewQuery: function CabecalhoComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c0, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.themePickerRef = _t.first);
    }
  }, hostBindings: function CabecalhoComponent_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("click", function CabecalhoComponent_click_HostBindingHandler($event) {
        return ctx.onDocumentClick($event);
      }, \u0275\u0275resolveDocument);
    }
  }, inputs: { titulo: "titulo", subtitulo: "subtitulo", breadcrumbs: "breadcrumbs", urlVoltar: "urlVoltar", labelVoltar: "labelVoltar", notificacoesNaoLidas: "notificacoesNaoLidas", notificacoesRouterLink: "notificacoesRouterLink" }, decls: 17, vars: 7, consts: [["themePicker", ""], ["id", "top-header", 1, "top-header", "h-14", "flex", "items-center", "justify-between", "px-3", "lg:px-5", "sticky", "top-0", "z-10", "shrink-0"], [1, "flex", "items-center", "gap-3"], [1, "flex", "items-center", "justify-center", "w-8", "h-8", "rounded-lg", "transition-colors", "shrink-0", "hover:bg-[var(--c-soft)]", 2, "color", "var(--c-muted)", 3, "routerLink", "appTooltip"], ["type", "button", "aria-label", "Abrir ou fechar menu", "appTooltip", "Abrir ou fechar menu", 1, "flex", "items-center", "justify-center", "w-8", "h-8", "rounded-lg", "transition-colors", "hover:bg-[var(--c-soft)]", 2, "color", "var(--c-muted)", 3, "click"], [1, "material-symbols-outlined", 2, "font-size", "21px"], [1, "min-w-0"], [1, "text-xs", "mt-0.5", "truncate", 2, "color", "var(--c-muted)"], [1, "flex", "items-center", "gap-2"], [1, "relative"], ["type", "button", "aria-label", "Tema e apar\xEAncia", "appTooltip", "Tema e apar\xEAncia", 1, "flex", "items-center", "justify-center", "w-8", "h-8", "rounded-md", "border", "transition-colors", "hover:bg-[var(--c-soft)]", 2, "color", "var(--c-muted)", "border-color", "var(--c-border)", "background", "transparent", 3, "click"], [1, "material-symbols-outlined", 2, "font-size", "22px"], [1, "font-semibold", "text-[0.9375rem]", 2, "color", "var(--c-text)"], ["aria-label", "Navega\xE7\xE3o estrutural", 1, "app-breadcrumbs"], ["aria-hidden", "true", 1, "app-breadcrumbs__sep"], [1, "app-breadcrumbs__link", 3, "routerLink"], [1, "app-breadcrumbs__current"], ["aria-hidden", "true", 1, "theme-drawer-overlay", "fixed", "inset-0", "z-[199]", "bg-black/40", 3, "click"], ["id", "theme-drawer", "role", "dialog", "aria-labelledby", "theme-drawer-title", 1, "theme-drawer-panel", "theme-drawer-shell", "fixed", "top-0", "right-0", "bottom-0", "z-[200]", "flex", "flex-col", "overflow-y-auto", 3, "click"], [1, "theme-drawer-header"], ["id", "theme-drawer-title", 1, "theme-drawer-title"], ["type", "button", "aria-label", "Fechar painel de tema", "appTooltip", "Fechar", 1, "theme-drawer-close", 3, "click"], [1, "material-symbols-outlined", 2, "font-size", "20px"], [1, "theme-drawer-section-label"], [1, "theme-drawer-mode-row"], ["type", "button", 1, "theme-drawer-mode-btn", 3, "click"], [1, "material-symbols-outlined", "theme-drawer-mode-icon"], [1, "theme-drawer-mode-text"], [1, "theme-drawer-section-label", "theme-drawer-section-label--mt"], [1, "theme-swatch-grid"], ["type", "button", 1, "theme-swatch", 3, "theme-swatch--selected"], [1, "theme-drawer-footer"], [1, "theme-drawer-footer-dot"], [1, "theme-drawer-footer-text"], ["type", "button", 1, "theme-swatch", 3, "click"], [1, "theme-swatch-inner"], ["aria-hidden", "true", 1, "material-symbols-outlined", "theme-swatch-check"], [1, "w-px", "h-5", "bg-[var(--c-border)]", "mx-0.5"], ["aria-label", "Notifica\xE7\xF5es", "appTooltip", "Notifica\xE7\xF5es", 1, "relative", "flex", "items-center", "justify-center", "w-8", "h-8", "rounded-md", "border", "transition-colors", "no-underline", "hover:bg-[var(--c-soft)]", 2, "border-color", "var(--c-border)", "background", "transparent", "color", "var(--c-muted)", 3, "routerLink"], [1, "material-symbols-outlined", 2, "font-size", "19px"], [1, "absolute", "-top-0.5", "-right-0.5", "min-w-4", "h-4", "rounded-full", "flex", "items-center", "justify-center", "px-1", "text-[0.55rem]", "font-bold", "leading-none", 2, "background", "var(--c-primary)", "color", "#fff", "border", "2px solid var(--c-bg)"]], template: function CabecalhoComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "header", 1)(1, "div", 2);
      \u0275\u0275conditionalCreate(2, CabecalhoComponent_Conditional_2_Template, 3, 3, "a", 3);
      \u0275\u0275elementStart(3, "button", 4);
      \u0275\u0275listener("click", function CabecalhoComponent_Template_button_click_3_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.alternarSidebar());
      });
      \u0275\u0275elementStart(4, "span", 5);
      \u0275\u0275text(5, "menu");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "div", 6);
      \u0275\u0275conditionalCreate(7, CabecalhoComponent_Conditional_7_Template, 5, 1);
      \u0275\u0275conditionalCreate(8, CabecalhoComponent_Conditional_8_Template, 2, 1, "p", 7);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(9, "div", 8)(10, "div", 9, 0)(12, "button", 10);
      \u0275\u0275listener("click", function CabecalhoComponent_Template_button_click_12_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.alternarMenuTema());
      });
      \u0275\u0275elementStart(13, "span", 11);
      \u0275\u0275text(14, "palette");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(15, CabecalhoComponent_Conditional_15_Template, 32, 9);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(16, CabecalhoComponent_Conditional_16_Template, 5, 2);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275classProp("theme-drawer-open", ctx.menuTemaAberto);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.urlVoltar ? 2 : -1);
      \u0275\u0275advance(5);
      \u0275\u0275conditional((ctx.breadcrumbs == null ? null : ctx.breadcrumbs.length) ? 7 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.subtitulo ? 8 : -1);
      \u0275\u0275advance(7);
      \u0275\u0275conditional(ctx.menuTemaAberto ? 15 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.podeVerNotificacoesNoHeader ? 16 : -1);
    }
  }, dependencies: [CommonModule, RouterLink, TooltipDirective], styles: ['\n\n.theme-drawer-open[_ngcontent-%COMP%] {\n  z-index: 300;\n}\n.theme-drawer-panel[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_theme-drawer-slide-in 0.25s ease-out;\n}\n@keyframes _ngcontent-%COMP%_theme-drawer-slide-in {\n  from {\n    transform: translateX(100%);\n    opacity: 0.7;\n  }\n  to {\n    transform: translateX(0);\n    opacity: 1;\n  }\n}\n.theme-drawer-shell[_ngcontent-%COMP%] {\n  width: min(22rem, 92vw);\n  padding: 1.25rem 1.25rem 1.5rem;\n  background: var(--c-elevated);\n  border-left: 1px solid var(--c-border);\n  border-top-left-radius: 1rem;\n  border-bottom-left-radius: 1rem;\n  box-shadow: -8px 0 32px rgba(15, 23, 42, 0.12);\n  color: var(--c-text);\n}\n.dark[_ngcontent-%COMP%]   .theme-drawer-shell[_ngcontent-%COMP%] {\n  box-shadow: -12px 0 40px rgba(0, 0, 0, 0.45);\n}\n.theme-drawer-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.75rem;\n  padding-bottom: 1rem;\n  margin-bottom: 1rem;\n  border-bottom: 1px solid var(--c-border);\n  flex-shrink: 0;\n}\n.theme-drawer-title[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1rem;\n  font-weight: 700;\n  letter-spacing: -0.02em;\n  color: var(--c-text);\n  line-height: 1.25;\n}\n.theme-drawer-close[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 2.25rem;\n  height: 2.25rem;\n  padding: 0;\n  border-radius: 0.5rem;\n  border: 1px solid var(--c-border);\n  background: transparent;\n  color: var(--c-muted);\n  cursor: pointer;\n  transition:\n    background 0.15s,\n    color 0.15s,\n    border-color 0.15s;\n}\n.theme-drawer-close[_ngcontent-%COMP%]:hover {\n  background: var(--c-soft);\n  color: var(--c-text);\n  border-color: var(--c-muted);\n}\n.theme-drawer-section-label[_ngcontent-%COMP%] {\n  margin: 0 0 0.625rem;\n  font-size: 0.65rem;\n  font-weight: 700;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n  color: var(--c-muted);\n}\n.theme-drawer-section-label--mt[_ngcontent-%COMP%] {\n  margin-top: 1.25rem;\n}\n.theme-drawer-mode-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.5rem;\n  margin-bottom: 0.25rem;\n}\n.theme-drawer-mode-btn[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.5rem;\n  min-height: 2.75rem;\n  padding: 0.5rem 0.75rem;\n  border-radius: 0.625rem;\n  border: 1px solid var(--c-border);\n  background: var(--c-soft);\n  color: var(--c-text);\n  cursor: pointer;\n  transition:\n    background 0.15s,\n    border-color 0.15s,\n    color 0.15s;\n}\n.theme-drawer-mode-btn[_ngcontent-%COMP%]:hover {\n  background: color-mix(in srgb, var(--c-primary) 8%, var(--c-soft));\n  border-color: color-mix(in srgb, var(--c-primary) 35%, var(--c-border));\n}\n.theme-drawer-mode-btn--active[_ngcontent-%COMP%] {\n  border-color: var(--c-primary);\n  background: color-mix(in srgb, var(--c-primary) 14%, var(--c-soft));\n  color: var(--c-primary);\n}\n.theme-drawer-mode-icon[_ngcontent-%COMP%] {\n  font-size: 1.125rem;\n  font-variation-settings: "FILL" 0;\n}\n.theme-drawer-mode-text[_ngcontent-%COMP%] {\n  font-size: 0.8125rem;\n  font-weight: 600;\n}\n.theme-swatch-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(6, 1fr);\n  gap: 0.625rem 0.375rem;\n  justify-items: center;\n  margin-bottom: 1.25rem;\n}\n.theme-swatch[_ngcontent-%COMP%] {\n  padding: 0.1875rem;\n  border: none;\n  border-radius: 50%;\n  background: none;\n  cursor: pointer;\n  line-height: 0;\n  transition: transform 0.12s ease;\n}\n.theme-swatch[_ngcontent-%COMP%]:hover {\n  transform: scale(1.06);\n}\n.theme-swatch[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--c-focus, var(--c-primary));\n  outline-offset: 2px;\n}\n.theme-swatch-inner[_ngcontent-%COMP%] {\n  width: 2.375rem;\n  height: 2.375rem;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  box-sizing: border-box;\n  transition: box-shadow 0.15s ease;\n}\n.theme-swatch--selected[_ngcontent-%COMP%]   .theme-swatch-inner[_ngcontent-%COMP%] {\n  box-shadow: 0 0 0 3px var(--c-primary);\n}\n.theme-swatch-check[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  color: #ffffff;\n  font-variation-settings: "FILL" 1, "wght" 600;\n  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.45));\n}\n.theme-drawer-footer[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  margin-top: auto;\n  padding-top: 0.25rem;\n  font-size: 0.8125rem;\n  color: var(--c-muted);\n}\n.theme-drawer-footer-dot[_ngcontent-%COMP%] {\n  width: 0.5rem;\n  height: 0.5rem;\n  border-radius: 50%;\n  flex-shrink: 0;\n  box-shadow: 0 0 0 1px var(--c-border);\n}\n.theme-drawer-footer-text[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: var(--c-text);\n  font-weight: 600;\n}\n.app-breadcrumbs[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 0.25rem 0.35rem;\n  margin-bottom: 0.2rem;\n  font-size: 0.65rem;\n  font-weight: 600;\n  letter-spacing: 0.04em;\n  text-transform: uppercase;\n}\n.app-breadcrumbs__sep[_ngcontent-%COMP%] {\n  color: var(--c-border);\n  -webkit-user-select: none;\n  user-select: none;\n}\n.app-breadcrumbs__link[_ngcontent-%COMP%] {\n  color: var(--c-muted);\n  text-decoration: none;\n  transition: color 0.12s ease;\n}\n.app-breadcrumbs__link[_ngcontent-%COMP%]:hover {\n  color: var(--c-primary);\n}\n.app-breadcrumbs__current[_ngcontent-%COMP%] {\n  color: var(--c-primary);\n  max-width: 12rem;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n/*# sourceMappingURL=cabecalho.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CabecalhoComponent, [{
    type: Component,
    args: [{ selector: "app-cabecalho", standalone: true, imports: [CommonModule, RouterLink, TooltipDirective], template: `<header id="top-header" class="top-header h-14 flex items-center justify-between px-3 lg:px-5 sticky top-0 z-10 shrink-0" [class.theme-drawer-open]="menuTemaAberto">\r
  <div class="flex items-center gap-3">\r
    @if (urlVoltar) {\r
      <a [routerLink]="urlVoltar" class="flex items-center justify-center w-8 h-8 rounded-lg transition-colors shrink-0 hover:bg-[var(--c-soft)]" style="color: var(--c-muted)" [attr.aria-label]="labelVoltar" [appTooltip]="labelVoltar">\r
        <span class="material-symbols-outlined" style="font-size: 21px">arrow_back</span>\r
      </a>\r
    }\r
    <button type="button" (click)="alternarSidebar()" class="flex items-center justify-center w-8 h-8 rounded-lg transition-colors hover:bg-[var(--c-soft)]" style="color: var(--c-muted)" aria-label="Abrir ou fechar menu" appTooltip="Abrir ou fechar menu">\r
      <span class="material-symbols-outlined" style="font-size: 21px">menu</span>\r
    </button>\r
    <div class="min-w-0">\r
      @if (breadcrumbs?.length) {\r
        <h2 class="font-semibold text-[0.9375rem]" style="color: var(--c-text)">{{ titulo }}</h2>\r
        <nav class="app-breadcrumbs" aria-label="Navega\xE7\xE3o estrutural">\r
          @for (c of breadcrumbs!; track $index; let i = $index) {\r
            @if (i > 0) {\r
              <span class="app-breadcrumbs__sep" aria-hidden="true">/</span>\r
            }\r
            @if (c.url) {\r
              <a [routerLink]="c.url" class="app-breadcrumbs__link">{{ c.label }}</a>\r
            } @else {\r
              <span class="app-breadcrumbs__current">{{ c.label }}</span>\r
            }\r
          }\r
        </nav>\r
      }\r
      <!-- <h2 class="font-semibold text-[0.9375rem]" style="color: var(--c-text)">{{ titulo }}</h2> -->\r
      @if (subtitulo) {\r
        <p class="text-xs mt-0.5 truncate" style="color: var(--c-muted)">{{ subtitulo }}</p>\r
      }\r
    </div>\r
  </div>\r
\r
  <div class="flex items-center gap-2">\r
    <!-- Tema (cores + modo escuro): \xEDcone palette abre drawer em mobile e desktop -->\r
    <div class="relative" #themePicker>\r
      <button type="button" (click)="alternarMenuTema()" class="flex items-center justify-center w-8 h-8 rounded-md border transition-colors hover:bg-[var(--c-soft)]" style="color: var(--c-muted); border-color: var(--c-border); background: transparent" aria-label="Tema e apar\xEAncia" appTooltip="Tema e apar\xEAncia">\r
        <span class="material-symbols-outlined" style="font-size: 22px">palette</span>\r
      </button>\r
      @if (menuTemaAberto) {\r
        <!-- Overlay: fecha ao clicar fora (mobile e desktop) -->\r
        <div class="theme-drawer-overlay fixed inset-0 z-[199] bg-black/40" (click)="fecharMenuTema()" aria-hidden="true"></div>\r
        <!-- Drawer: tema + modo escuro (mesmo em mobile e desktop) -->\r
        <div\r
          id="theme-drawer"\r
          class="theme-drawer-panel theme-drawer-shell fixed top-0 right-0 bottom-0 z-[200] flex flex-col overflow-y-auto"\r
          (click)="$event.stopPropagation()"\r
          role="dialog"\r
          aria-labelledby="theme-drawer-title"\r
        >\r
          <div class="theme-drawer-header">\r
            <h3 id="theme-drawer-title" class="theme-drawer-title">Tema e apar\xEAncia</h3>\r
            <button type="button" (click)="fecharMenuTema()" class="theme-drawer-close" aria-label="Fechar painel de tema" appTooltip="Fechar">\r
              <span class="material-symbols-outlined" style="font-size: 20px">close</span>\r
            </button>\r
          </div>\r
\r
          <p class="theme-drawer-section-label">Modo</p>\r
          <div class="theme-drawer-mode-row">\r
            <button\r
              type="button"\r
              (click)="aplicarModoEscuro(false)"\r
              class="theme-drawer-mode-btn"\r
              [class.theme-drawer-mode-btn--active]="!modoEscuro"\r
              [attr.aria-pressed]="!modoEscuro"\r
            >\r
              <span class="material-symbols-outlined theme-drawer-mode-icon">wb_sunny</span>\r
              <span class="theme-drawer-mode-text">Claro</span>\r
            </button>\r
            <button\r
              type="button"\r
              (click)="aplicarModoEscuro(true)"\r
              class="theme-drawer-mode-btn"\r
              [class.theme-drawer-mode-btn--active]="modoEscuro"\r
              [attr.aria-pressed]="modoEscuro"\r
            >\r
              <span class="material-symbols-outlined theme-drawer-mode-icon">dark_mode</span>\r
              <span class="theme-drawer-mode-text">Escuro</span>\r
            </button>\r
          </div>\r
\r
          <p class="theme-drawer-section-label theme-drawer-section-label--mt">Cor do tema</p>\r
          <div class="theme-swatch-grid">\r
            @for (t of temasOrdemGrade; track t.key) {\r
              <button\r
                type="button"\r
                class="theme-swatch"\r
                [class.theme-swatch--selected]="temaAtual === t.key"\r
                (click)="aplicarTema(t.key)"\r
                [attr.aria-label]="'Cor do tema: ' + t.labelPt"\r
                [attr.aria-pressed]="temaAtual === t.key"\r
              >\r
                <span class="theme-swatch-inner" [style.background]="t.color">\r
                  @if (temaAtual === t.key) {\r
                    <span class="material-symbols-outlined theme-swatch-check" aria-hidden="true">check</span>\r
                  }\r
                </span>\r
              </button>\r
            }\r
          </div>\r
\r
          <div class="theme-drawer-footer">\r
            <span class="theme-drawer-footer-dot" [style.background]="temaAtualMeta?.color ?? '#2563eb'"></span>\r
            <span class="theme-drawer-footer-text">\r
              Selecionado: <strong>{{ temaAtualMeta?.labelPt ?? '\u2014' }}</strong>\r
            </span>\r
          </div>\r
        </div>\r
      }\r
    </div>\r
\r
    @if (podeVerNotificacoesNoHeader) {\r
      <div class="w-px h-5 bg-[var(--c-border)] mx-0.5"></div>\r
      <a [routerLink]="notificacoesRouterLink" class="relative flex items-center justify-center w-8 h-8 rounded-md border transition-colors no-underline hover:bg-[var(--c-soft)]" style="border-color: var(--c-border); background: transparent; color: var(--c-muted)" aria-label="Notifica\xE7\xF5es" appTooltip="Notifica\xE7\xF5es">\r
        <span class="material-symbols-outlined" style="font-size: 19px">notifications</span>\r
        @if (notificacoesNaoLidas > 0) {\r
          <span class="absolute -top-0.5 -right-0.5 min-w-4 h-4 rounded-full flex items-center justify-center px-1 text-[0.55rem] font-bold leading-none" style="background: var(--c-primary); color: #fff; border: 2px solid var(--c-bg)">\r
            {{ notificacoesNaoLidas > 99 ? '99+' : notificacoesNaoLidas }}\r
          </span>\r
        }\r
      </a>\r
    }\r
  </div>\r
</header>\r
`, styles: ['/* src/app/componentes/layout/cabecalho/cabecalho.component.css */\n.theme-drawer-open {\n  z-index: 300;\n}\n.theme-drawer-panel {\n  animation: theme-drawer-slide-in 0.25s ease-out;\n}\n@keyframes theme-drawer-slide-in {\n  from {\n    transform: translateX(100%);\n    opacity: 0.7;\n  }\n  to {\n    transform: translateX(0);\n    opacity: 1;\n  }\n}\n.theme-drawer-shell {\n  width: min(22rem, 92vw);\n  padding: 1.25rem 1.25rem 1.5rem;\n  background: var(--c-elevated);\n  border-left: 1px solid var(--c-border);\n  border-top-left-radius: 1rem;\n  border-bottom-left-radius: 1rem;\n  box-shadow: -8px 0 32px rgba(15, 23, 42, 0.12);\n  color: var(--c-text);\n}\n.dark .theme-drawer-shell {\n  box-shadow: -12px 0 40px rgba(0, 0, 0, 0.45);\n}\n.theme-drawer-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.75rem;\n  padding-bottom: 1rem;\n  margin-bottom: 1rem;\n  border-bottom: 1px solid var(--c-border);\n  flex-shrink: 0;\n}\n.theme-drawer-title {\n  margin: 0;\n  font-size: 1rem;\n  font-weight: 700;\n  letter-spacing: -0.02em;\n  color: var(--c-text);\n  line-height: 1.25;\n}\n.theme-drawer-close {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 2.25rem;\n  height: 2.25rem;\n  padding: 0;\n  border-radius: 0.5rem;\n  border: 1px solid var(--c-border);\n  background: transparent;\n  color: var(--c-muted);\n  cursor: pointer;\n  transition:\n    background 0.15s,\n    color 0.15s,\n    border-color 0.15s;\n}\n.theme-drawer-close:hover {\n  background: var(--c-soft);\n  color: var(--c-text);\n  border-color: var(--c-muted);\n}\n.theme-drawer-section-label {\n  margin: 0 0 0.625rem;\n  font-size: 0.65rem;\n  font-weight: 700;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n  color: var(--c-muted);\n}\n.theme-drawer-section-label--mt {\n  margin-top: 1.25rem;\n}\n.theme-drawer-mode-row {\n  display: flex;\n  gap: 0.5rem;\n  margin-bottom: 0.25rem;\n}\n.theme-drawer-mode-btn {\n  flex: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.5rem;\n  min-height: 2.75rem;\n  padding: 0.5rem 0.75rem;\n  border-radius: 0.625rem;\n  border: 1px solid var(--c-border);\n  background: var(--c-soft);\n  color: var(--c-text);\n  cursor: pointer;\n  transition:\n    background 0.15s,\n    border-color 0.15s,\n    color 0.15s;\n}\n.theme-drawer-mode-btn:hover {\n  background: color-mix(in srgb, var(--c-primary) 8%, var(--c-soft));\n  border-color: color-mix(in srgb, var(--c-primary) 35%, var(--c-border));\n}\n.theme-drawer-mode-btn--active {\n  border-color: var(--c-primary);\n  background: color-mix(in srgb, var(--c-primary) 14%, var(--c-soft));\n  color: var(--c-primary);\n}\n.theme-drawer-mode-icon {\n  font-size: 1.125rem;\n  font-variation-settings: "FILL" 0;\n}\n.theme-drawer-mode-text {\n  font-size: 0.8125rem;\n  font-weight: 600;\n}\n.theme-swatch-grid {\n  display: grid;\n  grid-template-columns: repeat(6, 1fr);\n  gap: 0.625rem 0.375rem;\n  justify-items: center;\n  margin-bottom: 1.25rem;\n}\n.theme-swatch {\n  padding: 0.1875rem;\n  border: none;\n  border-radius: 50%;\n  background: none;\n  cursor: pointer;\n  line-height: 0;\n  transition: transform 0.12s ease;\n}\n.theme-swatch:hover {\n  transform: scale(1.06);\n}\n.theme-swatch:focus-visible {\n  outline: 2px solid var(--c-focus, var(--c-primary));\n  outline-offset: 2px;\n}\n.theme-swatch-inner {\n  width: 2.375rem;\n  height: 2.375rem;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  box-sizing: border-box;\n  transition: box-shadow 0.15s ease;\n}\n.theme-swatch--selected .theme-swatch-inner {\n  box-shadow: 0 0 0 3px var(--c-primary);\n}\n.theme-swatch-check {\n  font-size: 1rem;\n  color: #ffffff;\n  font-variation-settings: "FILL" 1, "wght" 600;\n  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.45));\n}\n.theme-drawer-footer {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  margin-top: auto;\n  padding-top: 0.25rem;\n  font-size: 0.8125rem;\n  color: var(--c-muted);\n}\n.theme-drawer-footer-dot {\n  width: 0.5rem;\n  height: 0.5rem;\n  border-radius: 50%;\n  flex-shrink: 0;\n  box-shadow: 0 0 0 1px var(--c-border);\n}\n.theme-drawer-footer-text strong {\n  color: var(--c-text);\n  font-weight: 600;\n}\n.app-breadcrumbs {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 0.25rem 0.35rem;\n  margin-bottom: 0.2rem;\n  font-size: 0.65rem;\n  font-weight: 600;\n  letter-spacing: 0.04em;\n  text-transform: uppercase;\n}\n.app-breadcrumbs__sep {\n  color: var(--c-border);\n  -webkit-user-select: none;\n  user-select: none;\n}\n.app-breadcrumbs__link {\n  color: var(--c-muted);\n  text-decoration: none;\n  transition: color 0.12s ease;\n}\n.app-breadcrumbs__link:hover {\n  color: var(--c-primary);\n}\n.app-breadcrumbs__current {\n  color: var(--c-primary);\n  max-width: 12rem;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n/*# sourceMappingURL=cabecalho.component.css.map */\n'] }]
  }], null, { titulo: [{
    type: Input
  }], subtitulo: [{
    type: Input
  }], breadcrumbs: [{
    type: Input
  }], urlVoltar: [{
    type: Input
  }], labelVoltar: [{
    type: Input
  }], notificacoesNaoLidas: [{
    type: Input
  }], notificacoesRouterLink: [{
    type: Input
  }], themePickerRef: [{
    type: ViewChild,
    args: ["themePicker"]
  }], onDocumentClick: [{
    type: HostListener,
    args: ["document:click", ["$event"]]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CabecalhoComponent, { className: "CabecalhoComponent", filePath: "src/app/componentes/layout/cabecalho/cabecalho.component.ts", lineNumber: 51 });
})();

export {
  SidebarMobileService,
  CabecalhoComponent
};
//# sourceMappingURL=chunk-BAWSRWCL.js.map
