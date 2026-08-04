import {
  ZmEmptyStateComponent,
  ZmPaginationComponent
} from "./chunk-5YRLWGMM.js";
import {
  PessoasService
} from "./chunk-OC6MFLDL.js";
import {
  LoadingService,
  ZmSkeletonListComponent
} from "./chunk-GKI5AWTV.js";
import "./chunk-CAKNZVE6.js";
import "./chunk-7WBHVE2H.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  SelectControlValueAccessor,
  ɵNgSelectMultipleOption
} from "./chunk-USROZ7PW.js";
import "./chunk-SFRXLDXR.js";
import "./chunk-IBJWGIJV.js";
import {
  Router,
  RouterLink
} from "./chunk-C2NWBPZH.js";
import {
  CommonModule,
  Component,
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
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-GRLISYEV.js";

// src/app/paginas/pessoas/pessoas-listagem.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function PessoasListagemComponent_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 9);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.quantidadeFiltrosAtivos);
  }
}
function PessoasListagemComponent_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.contagemTexto());
  }
}
function PessoasListagemComponent_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 13);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.erro);
  }
}
function PessoasListagemComponent_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "zm-skeleton-list", 14);
  }
  if (rf & 2) {
    \u0275\u0275property("rows", 6);
  }
}
function PessoasListagemComponent_Conditional_20_Template(rf, ctx) {
}
function PessoasListagemComponent_Conditional_21_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "zm-empty-state", 17);
  }
}
function PessoasListagemComponent_Conditional_21_Conditional_3_For_18_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(p_r4.phone);
  }
}
function PessoasListagemComponent_Conditional_21_Conditional_3_For_18_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 26);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(p_r4.email);
  }
}
function PessoasListagemComponent_Conditional_21_Conditional_3_For_18_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 27);
    \u0275\u0275text(1, "\u2014");
    \u0275\u0275elementEnd();
  }
}
function PessoasListagemComponent_Conditional_21_Conditional_3_For_18_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 28);
    \u0275\u0275text(1, "Ativa");
    \u0275\u0275elementEnd();
  }
}
function PessoasListagemComponent_Conditional_21_Conditional_3_For_18_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 29);
    \u0275\u0275text(1, "Inativa");
    \u0275\u0275elementEnd();
  }
}
function PessoasListagemComponent_Conditional_21_Conditional_3_For_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 22);
    \u0275\u0275listener("click", function PessoasListagemComponent_Conditional_21_Conditional_3_For_18_Template_tr_click_0_listener($event) {
      const p_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.irParaDetalhe(p_r4, $event));
    });
    \u0275\u0275elementStart(1, "td")(2, "div", 23);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 24);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "td", 25);
    \u0275\u0275conditionalCreate(7, PessoasListagemComponent_Conditional_21_Conditional_3_For_18_Conditional_7_Template, 2, 1, "div");
    \u0275\u0275conditionalCreate(8, PessoasListagemComponent_Conditional_21_Conditional_3_For_18_Conditional_8_Template, 2, 1, "div", 26);
    \u0275\u0275conditionalCreate(9, PessoasListagemComponent_Conditional_21_Conditional_3_For_18_Conditional_9_Template, 2, 0, "span", 27);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "td", 27);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "td", 25);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "td", 27);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "td");
    \u0275\u0275conditionalCreate(17, PessoasListagemComponent_Conditional_21_Conditional_3_For_18_Conditional_17_Template, 2, 0, "span", 28)(18, PessoasListagemComponent_Conditional_21_Conditional_3_For_18_Conditional_18_Template, 2, 0, "span", 29);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const p_r4 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(p_r4.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(p_r4.code);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(p_r4.phone ? 7 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(p_r4.email ? 8 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!p_r4.phone && !p_r4.email ? 9 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.formatarDataCurta(p_r4.birth_date));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(p_r4.protocols_count ?? 0);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.dataFormatada(p_r4.last_protocol_at));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(p_r4.status === "active" ? 17 : 18);
  }
}
function PessoasListagemComponent_Conditional_21_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 18)(1, "table", 19)(2, "thead")(3, "tr")(4, "th");
    \u0275\u0275text(5, "Pessoa / C\xF3digo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "th");
    \u0275\u0275text(7, "Contato");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th");
    \u0275\u0275text(9, "Nascimento");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th");
    \u0275\u0275text(11, "Protocolos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th");
    \u0275\u0275text(13, "\xDAltima resposta");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "th");
    \u0275\u0275text(15, "Situa\xE7\xE3o");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(16, "tbody");
    \u0275\u0275repeaterCreate(17, PessoasListagemComponent_Conditional_21_Conditional_3_For_18_Template, 19, 9, "tr", 20, _forTrack0);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(19, "zm-pagination", 21);
    \u0275\u0275listener("pageChange", function PessoasListagemComponent_Conditional_21_Conditional_3_Template_zm_pagination_pageChange_19_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.carregar($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(17);
    \u0275\u0275repeater(ctx_r0.pessoas);
    \u0275\u0275advance(2);
    \u0275\u0275property("currentPage", ctx_r0.meta.current_page)("lastPage", ctx_r0.meta.last_page);
  }
}
function PessoasListagemComponent_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15)(1, "div", 16);
    \u0275\u0275conditionalCreate(2, PessoasListagemComponent_Conditional_21_Conditional_2_Template, 1, 0, "zm-empty-state", 17)(3, PessoasListagemComponent_Conditional_21_Conditional_3_Template, 20, 2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.pessoas.length === 0 ? 2 : 3);
  }
}
function PessoasListagemComponent_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 30);
    \u0275\u0275listener("click", function PessoasListagemComponent_Conditional_22_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.closeFilterDrawer());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(1, "div", 31)(2, "div", 32)(3, "div", 33)(4, "span", 34);
    \u0275\u0275text(5, "tune");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "h2", 35);
    \u0275\u0275text(7, "Filtros");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "button", 36);
    \u0275\u0275listener("click", function PessoasListagemComponent_Conditional_22_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.closeFilterDrawer());
    });
    \u0275\u0275elementStart(9, "span", 37);
    \u0275\u0275text(10, "close");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(11, "div", 38)(12, "div")(13, "label", 39);
    \u0275\u0275text(14, "Situa\xE7\xE3o");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "select", 40);
    \u0275\u0275twoWayListener("ngModelChange", function PessoasListagemComponent_Conditional_22_Template_select_ngModelChange_15_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.status, $event) || (ctx_r0.status = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(16, "option", 41);
    \u0275\u0275text(17, "Todas");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "option", 42);
    \u0275\u0275text(19, "Ativa");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "option", 43);
    \u0275\u0275text(21, "Inativa");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(22, "div")(23, "label", 39);
    \u0275\u0275text(24, "Protocolos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "select", 40);
    \u0275\u0275twoWayListener("ngModelChange", function PessoasListagemComponent_Conditional_22_Template_select_ngModelChange_25_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.has_protocols, $event) || (ctx_r0.has_protocols = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(26, "option", 41);
    \u0275\u0275text(27, "Todos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "option", 44);
    \u0275\u0275text(29, "Com protocolos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "option", 45);
    \u0275\u0275text(31, "Sem protocolos");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(32, "div")(33, "label", 39);
    \u0275\u0275text(34, "Cadastro a partir de");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "input", 46);
    \u0275\u0275twoWayListener("ngModelChange", function PessoasListagemComponent_Conditional_22_Template_input_ngModelChange_35_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.created_from, $event) || (ctx_r0.created_from = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(36, "div")(37, "label", 39);
    \u0275\u0275text(38, "Cadastro at\xE9");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "input", 46);
    \u0275\u0275twoWayListener("ngModelChange", function PessoasListagemComponent_Conditional_22_Template_input_ngModelChange_39_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.created_to, $event) || (ctx_r0.created_to = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(40, "div", 47)(41, "button", 48);
    \u0275\u0275listener("click", function PessoasListagemComponent_Conditional_22_Template_button_click_41_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.limparFiltros());
    });
    \u0275\u0275elementStart(42, "span", 8);
    \u0275\u0275text(43, "filter_alt_off");
    \u0275\u0275elementEnd();
    \u0275\u0275text(44, " Limpar ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(45, "button", 49);
    \u0275\u0275listener("click", function PessoasListagemComponent_Conditional_22_Template_button_click_45_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.aplicarFiltros());
    });
    \u0275\u0275elementStart(46, "span", 8);
    \u0275\u0275text(47, "check");
    \u0275\u0275elementEnd();
    \u0275\u0275text(48, " Aplicar ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(15);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.status);
    \u0275\u0275advance(10);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.has_protocols);
    \u0275\u0275advance(10);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.created_from);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.created_to);
  }
}
var PessoasListagemComponent = class _PessoasListagemComponent {
  pessoas = [];
  meta = {
    current_page: 1,
    last_page: 1,
    per_page: 20,
    total: 0
  };
  showSkeleton;
  listaPronta = false;
  erro = "";
  busca = "";
  status = "";
  has_protocols = "";
  created_from = "";
  created_to = "";
  filterDrawerOpen = false;
  pessoasService = inject(PessoasService);
  loadingService = inject(LoadingService);
  router = inject(Router);
  ngOnInit() {
    this.carregar();
  }
  get temFiltrosAtivos() {
    return !!(this.status !== "" || this.has_protocols !== "" || this.created_from !== "" || this.created_to !== "");
  }
  get quantidadeFiltrosAtivos() {
    let n = 0;
    if (this.status !== "")
      n++;
    if (this.has_protocols !== "")
      n++;
    if (this.created_from !== "")
      n++;
    if (this.created_to !== "")
      n++;
    return n;
  }
  carregar(page = 1) {
    const params = { per_page: 20, page };
    if (this.busca?.trim())
      params.search = this.busca.trim();
    if (this.status)
      params.status = this.status;
    if (this.has_protocols !== "")
      params.has_protocols = this.has_protocols;
    if (this.created_from)
      params.created_from = this.created_from;
    if (this.created_to)
      params.created_to = this.created_to;
    const { data$, showSkeleton } = this.loadingService.loadWithThreshold(this.pessoasService.list(params));
    this.showSkeleton = showSkeleton;
    data$.subscribe({
      next: (res) => {
        this.listaPronta = true;
        this.pessoas = res.data;
        this.meta = res.meta;
      },
      error: () => {
        this.listaPronta = true;
        this.erro = "N\xE3o foi poss\xEDvel carregar as pessoas.";
      }
    });
  }
  aplicarFiltros() {
    this.filterDrawerOpen = false;
    this.carregar(1);
  }
  limparFiltros() {
    this.status = "";
    this.has_protocols = "";
    this.created_from = "";
    this.created_to = "";
    this.filterDrawerOpen = false;
    this.carregar(1);
  }
  openFilterDrawer() {
    this.filterDrawerOpen = true;
  }
  closeFilterDrawer() {
    this.filterDrawerOpen = false;
  }
  irParaDetalhe(p, event) {
    if (event.target.closest("a, button"))
      return;
    this.router.navigate(["/pessoas", p.id]);
  }
  dataFormatada(val) {
    if (!val)
      return "\u2014";
    const d = new Date(val);
    if (isNaN(d.getTime()))
      return val;
    return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
  }
  formatarDataCurta(val) {
    if (!val)
      return "\u2014";
    const d = new Date(val);
    if (isNaN(d.getTime()))
      return val;
    return d.toLocaleDateString("pt-BR");
  }
  contagemTexto() {
    const n = this.meta.total;
    return n === 1 ? "1 registro" : `${n} registros`;
  }
  static \u0275fac = function PessoasListagemComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PessoasListagemComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PessoasListagemComponent, selectors: [["app-pessoas-listagem"]], decls: 23, vars: 8, consts: [[1, "pessoas-page", "relative", "min-h-[320px]"], [1, "page-header", "mb-5"], [1, "page-title", "flex", "items-center", "gap-3"], [1, "flex", "flex-wrap", "items-center", "gap-3", "mb-4"], [1, "form-search-wrap", "flex-1", "min-w-[300px]"], [1, "material-symbols-outlined", "form-search-icon"], ["type", "text", "placeholder", "Nome, c\xF3digo, telefone, e-mail ou CPF\u2026", "aria-label", "Buscar pessoas", 1, "form-input", "form-search-input", "text-sm", 3, "ngModelChange", "keydown.enter", "ngModel"], ["type", "button", "title", "Filtros", 1, "btn-ghost", "btn-default-bg", "inline-flex", "items-center", "gap-2", 3, "click"], [1, "material-symbols-outlined", "text-lg"], [1, "text-xs", "rounded-full", "px-1.5", "py-0.5", "font-medium", 2, "background", "var(--c-primary)", "color", "white"], ["routerLink", "/pessoas/criar", "title", "Nova pessoa", 1, "btn-primary", "inline-flex", "items-center", "gap-2", "no-underline"], [1, "material-symbols-outlined", 2, "font-size", "18px"], [1, "text-sm", "mb-3", 2, "color", "var(--c-muted)"], [1, "text-sm", "mb-4", 2, "color", "var(--c-error, #dc2626)"], [3, "rows"], [1, "zm-content-enter"], [1, "data-table-wrap"], ["icon", "group", "title", "Nenhuma pessoa encontrada.", "actionLabel", "Cadastrar primeira pessoa", "actionLink", "/pessoas/criar"], [1, "overflow-x-auto"], [1, "data-table"], [1, "pessoa-row", "cursor-pointer"], [3, "pageChange", "currentPage", "lastPage"], [1, "pessoa-row", "cursor-pointer", 3, "click"], [1, "font-medium", 2, "color", "var(--c-text)"], [1, "text-xs", "mt-0.5", "font-mono", 2, "color", "var(--c-muted)"], [2, "color", "var(--c-text)"], [1, "text-xs", 2, "color", "var(--c-muted)"], [2, "color", "var(--c-muted)"], [1, "text-xs", "font-semibold", 2, "color", "var(--c-success)"], [1, "text-xs", "font-medium", 2, "color", "var(--c-muted)"], ["aria-hidden", "true", 1, "drawer-overlay", "fixed", "inset-0", "z-40", "bg-black/30", 3, "click"], [1, "filter-drawer", "fixed", "top-0", "right-0", "h-full", "w-full", "max-w-sm", "z-50", "shadow-xl", "flex", "flex-col", 2, "background", "var(--c-surface)", "border-left", "1px solid var(--c-border)"], [1, "flex", "items-center", "justify-between", "px-5", "py-4", 2, "border-bottom", "1px solid var(--c-border)"], [1, "flex", "items-center", "gap-2"], [1, "material-symbols-outlined", 2, "color", "var(--c-primary)"], [1, "text-lg", "font-semibold", "m-0", 2, "color", "var(--c-text)"], ["type", "button", "aria-label", "Fechar", 1, "p-2", "rounded-lg", "hover:bg-[var(--c-soft)]", 3, "click"], [1, "material-symbols-outlined"], [1, "flex-1", "overflow-auto", "p-5", "space-y-4"], [1, "block", "text-xs", "font-semibold", "uppercase", "tracking-wider", "mb-1.5", 2, "color", "var(--c-muted)"], [1, "form-select", "text-sm", 3, "ngModelChange", "ngModel"], ["value", ""], ["value", "active"], ["value", "inactive"], ["value", "1"], ["value", "0"], ["type", "date", 1, "form-input", "text-sm", 3, "ngModelChange", "ngModel"], [1, "flex", "gap-2", "p-5", 2, "border-top", "1px solid var(--c-border)"], ["type", "button", 1, "btn-ghost", "btn-default-bg", "flex-1", "inline-flex", "items-center", "justify-center", "gap-2", 3, "click"], ["type", "button", 1, "btn-primary", "flex-1", "inline-flex", "items-center", "justify-center", "gap-2", 3, "click"]], template: function PessoasListagemComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "div", 4)(5, "span", 5);
      \u0275\u0275text(6, "search");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "input", 6);
      \u0275\u0275twoWayListener("ngModelChange", function PessoasListagemComponent_Template_input_ngModelChange_7_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.busca, $event) || (ctx.busca = $event);
        return $event;
      });
      \u0275\u0275listener("keydown.enter", function PessoasListagemComponent_Template_input_keydown_enter_7_listener() {
        return ctx.carregar(1);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(8, "button", 7);
      \u0275\u0275listener("click", function PessoasListagemComponent_Template_button_click_8_listener() {
        return ctx.openFilterDrawer();
      });
      \u0275\u0275elementStart(9, "span", 8);
      \u0275\u0275text(10, "tune");
      \u0275\u0275elementEnd();
      \u0275\u0275text(11, " Filtros ");
      \u0275\u0275conditionalCreate(12, PessoasListagemComponent_Conditional_12_Template, 2, 1, "span", 9);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(13, "a", 10)(14, "span", 11);
      \u0275\u0275text(15, "person_add");
      \u0275\u0275elementEnd();
      \u0275\u0275text(16, " Nova pessoa ");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(17, PessoasListagemComponent_Conditional_17_Template, 2, 1, "p", 12);
      \u0275\u0275conditionalCreate(18, PessoasListagemComponent_Conditional_18_Template, 2, 1, "p", 13);
      \u0275\u0275conditionalCreate(19, PessoasListagemComponent_Conditional_19_Template, 1, 1, "zm-skeleton-list", 14)(20, PessoasListagemComponent_Conditional_20_Template, 0, 0)(21, PessoasListagemComponent_Conditional_21_Template, 4, 1, "div", 15);
      \u0275\u0275conditionalCreate(22, PessoasListagemComponent_Conditional_22_Template, 49, 4);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(7);
      \u0275\u0275twoWayProperty("ngModel", ctx.busca);
      \u0275\u0275advance();
      \u0275\u0275classProp("ring-2", ctx.temFiltrosAtivos);
      \u0275\u0275advance(4);
      \u0275\u0275conditional(ctx.temFiltrosAtivos ? 12 : -1);
      \u0275\u0275advance(5);
      \u0275\u0275conditional(ctx.listaPronta && !ctx.erro ? 17 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.erro ? 18 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showSkeleton() ? 19 : !ctx.listaPronta && !ctx.erro ? 20 : !ctx.erro ? 21 : -1);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.filterDrawerOpen ? 22 : -1);
    }
  }, dependencies: [CommonModule, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel, RouterLink, ZmSkeletonListComponent, ZmPaginationComponent, ZmEmptyStateComponent], styles: ["\n\n.pessoa-row[_ngcontent-%COMP%]:hover {\n  background: var(--c-soft);\n}\n.filter-drawer[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_drawer-in 0.2s ease-out;\n}\n@keyframes _ngcontent-%COMP%_drawer-in {\n  from {\n    transform: translateX(100%);\n  }\n  to {\n    transform: translateX(0);\n  }\n}\n/*# sourceMappingURL=pessoas-listagem.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PessoasListagemComponent, [{
    type: Component,
    args: [{ selector: "app-pessoas-listagem", standalone: true, imports: [CommonModule, FormsModule, RouterLink, ZmSkeletonListComponent, ZmPaginationComponent, ZmEmptyStateComponent], template: `<div class="pessoas-page relative min-h-[320px]">\r
  <div class="page-header mb-5">\r
    <div class="page-title flex items-center gap-3">\r
      <!-- <div class="page-title-icon w-10 h-10 rounded-lg flex items-center justify-center" style="background: var(--c-soft)">\r
        <span class="material-symbols-outlined" style="color: var(--c-primary)">group</span>\r
      </div>\r
      <div>\r
        <h1 class="text-xl font-semibold m-0" style="color: var(--c-text)">Pessoas</h1>\r
        <p class="text-sm m-0 mt-0.5" style="color: var(--c-muted)">Fichas com protocolos e c\xF3digo de acesso para formul\xE1rios.</p>\r
      </div> -->\r
      <div class="flex flex-wrap items-center gap-3 mb-4">\r
        <div class="form-search-wrap flex-1 min-w-[300px]">\r
          <span class="material-symbols-outlined form-search-icon">search</span>\r
          <input\r
            type="text"\r
            [(ngModel)]="busca"\r
            (keydown.enter)="carregar(1)"\r
            placeholder="Nome, c\xF3digo, telefone, e-mail ou CPF\u2026"\r
            class="form-input form-search-input text-sm"\r
            aria-label="Buscar pessoas"\r
          />\r
        </div>\r
        <button type="button" class="btn-ghost btn-default-bg inline-flex items-center gap-2" (click)="openFilterDrawer()" [class.ring-2]="temFiltrosAtivos" title="Filtros">\r
          <span class="material-symbols-outlined text-lg">tune</span>\r
          Filtros\r
          @if (temFiltrosAtivos) {\r
            <span class="text-xs rounded-full px-1.5 py-0.5 font-medium" style="background: var(--c-primary); color: white">{{ quantidadeFiltrosAtivos }}</span>\r
          }\r
        </button>\r
      </div>\r
    </div>\r
    <a routerLink="/pessoas/criar" class="btn-primary inline-flex items-center gap-2 no-underline" title="Nova pessoa">\r
      <span class="material-symbols-outlined" style="font-size: 18px">person_add</span>\r
      Nova pessoa\r
    </a>\r
  </div>\r
\r
  <!-- <div class="flex flex-wrap items-center gap-3 mb-4">\r
    <div class="form-search-wrap flex-1 min-w-[200px]">\r
      <span class="material-symbols-outlined form-search-icon">search</span>\r
      <input\r
        type="text"\r
        [(ngModel)]="busca"\r
        (keydown.enter)="carregar(1)"\r
        placeholder="Nome, c\xF3digo, telefone, e-mail ou CPF\u2026"\r
        class="form-input form-search-input text-sm"\r
        aria-label="Buscar pessoas"\r
      />\r
    </div>\r
    <button type="button" class="btn-ghost btn-default-bg inline-flex items-center gap-2" (click)="openFilterDrawer()" [class.ring-2]="temFiltrosAtivos" title="Filtros">\r
      <span class="material-symbols-outlined text-lg">tune</span>\r
      Filtros\r
      @if (temFiltrosAtivos) {\r
        <span class="text-xs rounded-full px-1.5 py-0.5 font-medium" style="background: var(--c-primary); color: white">{{ quantidadeFiltrosAtivos }}</span>\r
      }\r
    </button>\r
  </div> -->\r
\r
  @if (listaPronta && !erro) {\r
    <p class="text-sm mb-3" style="color: var(--c-muted)">{{ contagemTexto() }}</p>\r
  }\r
\r
  @if (erro) {\r
    <p class="text-sm mb-4" style="color: var(--c-error, #dc2626)">{{ erro }}</p>\r
  }\r
\r
  @if (showSkeleton()) {\r
    <zm-skeleton-list [rows]="6" />\r
  } @else if (!listaPronta && !erro) {\r
  } @else if (!erro) {\r
    <div class="zm-content-enter">\r
      <div class="data-table-wrap">\r
        @if (pessoas.length === 0) {\r
          <zm-empty-state\r
            icon="group"\r
            title="Nenhuma pessoa encontrada."\r
            actionLabel="Cadastrar primeira pessoa"\r
            actionLink="/pessoas/criar"\r
          />\r
        } @else {\r
          <div class="overflow-x-auto">\r
            <table class="data-table">\r
              <thead>\r
                <tr>\r
                  <th>Pessoa / C\xF3digo</th>\r
                  <th>Contato</th>\r
                  <th>Nascimento</th>\r
                  <th>Protocolos</th>\r
                  <th>\xDAltima resposta</th>\r
                  <th>Situa\xE7\xE3o</th>\r
                </tr>\r
              </thead>\r
              <tbody>\r
                @for (p of pessoas; track p.id) {\r
                  <tr class="pessoa-row cursor-pointer" (click)="irParaDetalhe(p, $event)">\r
                    <td>\r
                      <div class="font-medium" style="color: var(--c-text)">{{ p.name }}</div>\r
                      <div class="text-xs mt-0.5 font-mono" style="color: var(--c-muted)">{{ p.code }}</div>\r
                    </td>\r
                    <td style="color: var(--c-text)">\r
                      @if (p.phone) {\r
                        <div>{{ p.phone }}</div>\r
                      }\r
                      @if (p.email) {\r
                        <div class="text-xs" style="color: var(--c-muted)">{{ p.email }}</div>\r
                      }\r
                      @if (!p.phone && !p.email) {\r
                        <span style="color: var(--c-muted)">\u2014</span>\r
                      }\r
                    </td>\r
                    <td style="color: var(--c-muted)">{{ formatarDataCurta(p.birth_date) }}</td>\r
                    <td style="color: var(--c-text)">{{ p.protocols_count ?? 0 }}</td>\r
                    <td style="color: var(--c-muted)">{{ dataFormatada(p.last_protocol_at) }}</td>\r
                    <td>\r
                      @if (p.status === 'active') {\r
                        <span class="text-xs font-semibold" style="color: var(--c-success)">Ativa</span>\r
                      } @else {\r
                        <span class="text-xs font-medium" style="color: var(--c-muted)">Inativa</span>\r
                      }\r
                    </td>\r
                  </tr>\r
                }\r
              </tbody>\r
            </table>\r
          </div>\r
          <zm-pagination [currentPage]="meta.current_page" [lastPage]="meta.last_page" (pageChange)="carregar($event)" />\r
        }\r
      </div>\r
    </div>\r
  }\r
\r
  @if (filterDrawerOpen) {\r
    <div class="drawer-overlay fixed inset-0 z-40 bg-black/30" (click)="closeFilterDrawer()" aria-hidden="true"></div>\r
    <div class="filter-drawer fixed top-0 right-0 h-full w-full max-w-sm z-50 shadow-xl flex flex-col" style="background: var(--c-surface); border-left: 1px solid var(--c-border)">\r
      <div class="flex items-center justify-between px-5 py-4" style="border-bottom: 1px solid var(--c-border)">\r
        <div class="flex items-center gap-2">\r
          <span class="material-symbols-outlined" style="color: var(--c-primary)">tune</span>\r
          <h2 class="text-lg font-semibold m-0" style="color: var(--c-text)">Filtros</h2>\r
        </div>\r
        <button type="button" class="p-2 rounded-lg hover:bg-[var(--c-soft)]" (click)="closeFilterDrawer()" aria-label="Fechar">\r
          <span class="material-symbols-outlined">close</span>\r
        </button>\r
      </div>\r
      <div class="flex-1 overflow-auto p-5 space-y-4">\r
        <div>\r
          <label class="block text-xs font-semibold uppercase tracking-wider mb-1.5" style="color: var(--c-muted)">Situa\xE7\xE3o</label>\r
          <select [(ngModel)]="status" class="form-select text-sm">\r
            <option value="">Todas</option>\r
            <option value="active">Ativa</option>\r
            <option value="inactive">Inativa</option>\r
          </select>\r
        </div>\r
        <div>\r
          <label class="block text-xs font-semibold uppercase tracking-wider mb-1.5" style="color: var(--c-muted)">Protocolos</label>\r
          <select [(ngModel)]="has_protocols" class="form-select text-sm">\r
            <option value="">Todos</option>\r
            <option value="1">Com protocolos</option>\r
            <option value="0">Sem protocolos</option>\r
          </select>\r
        </div>\r
        <div>\r
          <label class="block text-xs font-semibold uppercase tracking-wider mb-1.5" style="color: var(--c-muted)">Cadastro a partir de</label>\r
          <input type="date" [(ngModel)]="created_from" class="form-input text-sm" />\r
        </div>\r
        <div>\r
          <label class="block text-xs font-semibold uppercase tracking-wider mb-1.5" style="color: var(--c-muted)">Cadastro at\xE9</label>\r
          <input type="date" [(ngModel)]="created_to" class="form-input text-sm" />\r
        </div>\r
      </div>\r
      <div class="flex gap-2 p-5" style="border-top: 1px solid var(--c-border)">\r
        <button type="button" class="btn-ghost btn-default-bg flex-1 inline-flex items-center justify-center gap-2" (click)="limparFiltros()">\r
          <span class="material-symbols-outlined text-lg">filter_alt_off</span>\r
          Limpar\r
        </button>\r
        <button type="button" class="btn-primary flex-1 inline-flex items-center justify-center gap-2" (click)="aplicarFiltros()">\r
          <span class="material-symbols-outlined text-lg">check</span>\r
          Aplicar\r
        </button>\r
      </div>\r
    </div>\r
  }\r
</div>\r
`, styles: ["/* src/app/paginas/pessoas/pessoas-listagem.component.css */\n.pessoa-row:hover {\n  background: var(--c-soft);\n}\n.filter-drawer {\n  animation: drawer-in 0.2s ease-out;\n}\n@keyframes drawer-in {\n  from {\n    transform: translateX(100%);\n  }\n  to {\n    transform: translateX(0);\n  }\n}\n/*# sourceMappingURL=pessoas-listagem.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PessoasListagemComponent, { className: "PessoasListagemComponent", filePath: "src/app/paginas/pessoas/pessoas-listagem.component.ts", lineNumber: 17 });
})();
export {
  PessoasListagemComponent
};
//# sourceMappingURL=chunk-PEORJFJ7.js.map
