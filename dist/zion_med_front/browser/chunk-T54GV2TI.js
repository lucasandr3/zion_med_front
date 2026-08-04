import {
  ProtocolosService
} from "./chunk-OQ3TXGU2.js";
import {
  ZmEmptyStateComponent,
  ZmPaginationComponent
} from "./chunk-5YRLWGMM.js";
import {
  TemplatesService
} from "./chunk-E3NIIMGP.js";
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
  ɵɵpureFunction1,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-GRLISYEV.js";

// src/app/paginas/protocolos/protocolos-listagem.component.ts
var _c0 = (a0) => ["/pessoas", a0];
var _forTrack0 = ($index, $item) => $item.id;
function ProtocolosListagemComponent_Conditional_12_Template(rf, ctx) {
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
function ProtocolosListagemComponent_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 13);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.contagemTexto());
  }
}
function ProtocolosListagemComponent_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 14);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.erro);
  }
}
function ProtocolosListagemComponent_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "zm-skeleton-list", 15);
  }
  if (rf & 2) {
    \u0275\u0275property("rows", 6);
  }
}
function ProtocolosListagemComponent_Conditional_25_Template(rf, ctx) {
}
function ProtocolosListagemComponent_Conditional_26_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "zm-empty-state", 18);
  }
}
function ProtocolosListagemComponent_Conditional_26_Conditional_3_For_20_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 34);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div", 35);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(3, _c0, p_r4.person.id));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(p_r4.person.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(p_r4.person.code);
  }
}
function ProtocolosListagemComponent_Conditional_26_Conditional_3_For_20_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 29);
    \u0275\u0275text(1, "\u2014");
    \u0275\u0275elementEnd();
  }
}
function ProtocolosListagemComponent_Conditional_26_Conditional_3_For_20_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 30)(1, "span", 36);
    \u0275\u0275text(2, "schedule");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r4 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.statusLabel(p_r4.status), " ");
  }
}
function ProtocolosListagemComponent_Conditional_26_Conditional_3_For_20_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 31)(1, "span", 36);
    \u0275\u0275text(2, "check_circle");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r4 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.statusLabel(p_r4.status), " ");
  }
}
function ProtocolosListagemComponent_Conditional_26_Conditional_3_For_20_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 32)(1, "span", 36);
    \u0275\u0275text(2, "cancel");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r4 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.statusLabel(p_r4.status), " ");
  }
}
function ProtocolosListagemComponent_Conditional_26_Conditional_3_For_20_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 33);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(p_r4.submitter_email);
  }
}
function ProtocolosListagemComponent_Conditional_26_Conditional_3_For_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 24);
    \u0275\u0275listener("click", function ProtocolosListagemComponent_Conditional_26_Conditional_3_For_20_Template_tr_click_0_listener($event) {
      const p_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.irParaDetalhe(p_r4, $event));
    });
    \u0275\u0275elementStart(1, "td")(2, "div", 25);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 26);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "td", 27);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td", 28);
    \u0275\u0275listener("click", function ProtocolosListagemComponent_Conditional_26_Conditional_3_For_20_Template_td_click_8_listener($event) {
      \u0275\u0275restoreView(_r3);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275conditionalCreate(9, ProtocolosListagemComponent_Conditional_26_Conditional_3_For_20_Conditional_9_Template, 4, 5)(10, ProtocolosListagemComponent_Conditional_26_Conditional_3_For_20_Conditional_10_Template, 2, 0, "span", 29);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "td");
    \u0275\u0275conditionalCreate(12, ProtocolosListagemComponent_Conditional_26_Conditional_3_For_20_Conditional_12_Template, 4, 1, "span", 30)(13, ProtocolosListagemComponent_Conditional_26_Conditional_3_For_20_Conditional_13_Template, 4, 1, "span", 31)(14, ProtocolosListagemComponent_Conditional_26_Conditional_3_For_20_Conditional_14_Template, 4, 1, "span", 32);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "td")(16, "div", 27);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(18, ProtocolosListagemComponent_Conditional_26_Conditional_3_For_20_Conditional_18_Template, 2, 1, "div", 33);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "td", 29);
    \u0275\u0275text(20);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "td", 27);
    \u0275\u0275text(22);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const p_r4 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(p_r4.protocol_number || p_r4.id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.dataFormatada(p_r4.submitted_at || p_r4.created_at));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(p_r4.template_name ?? "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(p_r4.person ? 9 : 10);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(p_r4.status === "pending" || p_r4.status && p_r4.status.toLowerCase() === "pending" ? 12 : p_r4.status === "approved" || p_r4.status && p_r4.status.toLowerCase() === "approved" ? 13 : 14);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(p_r4.submitter_name ?? "\u2014");
    \u0275\u0275advance();
    \u0275\u0275conditional(p_r4.submitter_email ? 18 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.dataFormatada(p_r4.approved_at));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(p_r4.approved_by_name ?? "\u2014");
  }
}
function ProtocolosListagemComponent_Conditional_26_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 19)(1, "table", 20)(2, "thead")(3, "tr")(4, "th");
    \u0275\u0275text(5, "Protocolo / Data");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "th");
    \u0275\u0275text(7, "Template");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th");
    \u0275\u0275text(9, "Pessoa");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th");
    \u0275\u0275text(11, "Situa\xE7\xE3o");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th");
    \u0275\u0275text(13, "Submetente");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "th");
    \u0275\u0275text(15, "Revisado em");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "th");
    \u0275\u0275text(17, "Revisado por");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(18, "tbody", 21);
    \u0275\u0275repeaterCreate(19, ProtocolosListagemComponent_Conditional_26_Conditional_3_For_20_Template, 23, 9, "tr", 22, _forTrack0);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(21, "zm-pagination", 23);
    \u0275\u0275listener("pageChange", function ProtocolosListagemComponent_Conditional_26_Conditional_3_Template_zm_pagination_pageChange_21_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.carregar($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(19);
    \u0275\u0275repeater(ctx_r0.protocolos);
    \u0275\u0275advance(2);
    \u0275\u0275property("currentPage", ctx_r0.meta.current_page)("lastPage", ctx_r0.meta.last_page);
  }
}
function ProtocolosListagemComponent_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16)(1, "div", 17);
    \u0275\u0275conditionalCreate(2, ProtocolosListagemComponent_Conditional_26_Conditional_2_Template, 1, 0, "zm-empty-state", 18)(3, ProtocolosListagemComponent_Conditional_26_Conditional_3_Template, 22, 2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.protocolos.length === 0 ? 2 : 3);
  }
}
function ProtocolosListagemComponent_Conditional_27_For_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 49);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r6 = ctx.$implicit;
    \u0275\u0275property("value", t_r6.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(t_r6.name);
  }
}
function ProtocolosListagemComponent_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 37);
    \u0275\u0275listener("click", function ProtocolosListagemComponent_Conditional_27_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.closeFilterDrawer());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(1, "div", 38)(2, "div", 39)(3, "div", 40)(4, "span", 41);
    \u0275\u0275text(5, "tune");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "h2", 42);
    \u0275\u0275text(7, "Filtros");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "button", 43);
    \u0275\u0275listener("click", function ProtocolosListagemComponent_Conditional_27_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.closeFilterDrawer());
    });
    \u0275\u0275elementStart(9, "span", 44);
    \u0275\u0275text(10, "close");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(11, "div", 45)(12, "div")(13, "label", 46);
    \u0275\u0275text(14, "Template");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "select", 47);
    \u0275\u0275twoWayListener("ngModelChange", function ProtocolosListagemComponent_Conditional_27_Template_select_ngModelChange_15_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.template_id, $event) || (ctx_r0.template_id = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(16, "option", 48);
    \u0275\u0275text(17, "Todos");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(18, ProtocolosListagemComponent_Conditional_27_For_19_Template, 2, 2, "option", 49, _forTrack0);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "div")(21, "label", 46);
    \u0275\u0275text(22, "Situa\xE7\xE3o");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "select", 47);
    \u0275\u0275twoWayListener("ngModelChange", function ProtocolosListagemComponent_Conditional_27_Template_select_ngModelChange_23_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.status, $event) || (ctx_r0.status = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(24, "option", 48);
    \u0275\u0275text(25, "Todas");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "option", 50);
    \u0275\u0275text(27, "Pendente");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "option", 51);
    \u0275\u0275text(29, "Aprovado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "option", 52);
    \u0275\u0275text(31, "Reprovado");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(32, "div")(33, "label", 46);
    \u0275\u0275text(34, "Data in\xEDcio");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "input", 53);
    \u0275\u0275twoWayListener("ngModelChange", function ProtocolosListagemComponent_Conditional_27_Template_input_ngModelChange_35_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.data_inicio, $event) || (ctx_r0.data_inicio = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(36, "div")(37, "label", 46);
    \u0275\u0275text(38, "Data fim");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "input", 53);
    \u0275\u0275twoWayListener("ngModelChange", function ProtocolosListagemComponent_Conditional_27_Template_input_ngModelChange_39_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.data_fim, $event) || (ctx_r0.data_fim = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(40, "div", 54)(41, "button", 55);
    \u0275\u0275listener("click", function ProtocolosListagemComponent_Conditional_27_Template_button_click_41_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.limparFiltros());
    });
    \u0275\u0275elementStart(42, "span", 8);
    \u0275\u0275text(43, "filter_alt_off");
    \u0275\u0275elementEnd();
    \u0275\u0275text(44, " Limpar ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(45, "button", 56);
    \u0275\u0275listener("click", function ProtocolosListagemComponent_Conditional_27_Template_button_click_45_listener() {
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
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.template_id);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r0.templates);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.status);
    \u0275\u0275advance(12);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.data_inicio);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.data_fim);
  }
}
var ProtocolosListagemComponent = class _ProtocolosListagemComponent {
  protocolos = [];
  templates = [];
  meta = {
    current_page: 1,
    last_page: 1,
    per_page: 20,
    total: 0
  };
  showSkeleton;
  listaPronta = false;
  erro = "";
  exportando = false;
  busca = "";
  template_id = "";
  status = "";
  data_inicio = "";
  data_fim = "";
  filterDrawerOpen = false;
  protocolosService = inject(ProtocolosService);
  templatesService = inject(TemplatesService);
  loadingService = inject(LoadingService);
  router = inject(Router);
  ngOnInit() {
    this.templatesService.list().subscribe({ next: (t) => this.templates = t });
    this.carregar();
  }
  get temFiltrosAtivos() {
    return !!(this.template_id !== "" || this.status !== "" || this.data_inicio !== "" || this.data_fim !== "");
  }
  get quantidadeFiltrosAtivos() {
    let n = 0;
    if (this.template_id !== "")
      n++;
    if (this.status !== "")
      n++;
    if (this.data_inicio !== "")
      n++;
    if (this.data_fim !== "")
      n++;
    return n;
  }
  carregar(page = 1) {
    const params = { per_page: 20, page };
    if (this.busca?.trim())
      params.busca = this.busca.trim();
    if (this.template_id !== "")
      params.template_id = Number(this.template_id);
    if (this.status)
      params.status = this.status;
    if (this.data_inicio)
      params.data_inicio = this.data_inicio;
    if (this.data_fim)
      params.data_fim = this.data_fim;
    const { data$, showSkeleton } = this.loadingService.loadWithThreshold(this.protocolosService.list(params));
    this.showSkeleton = showSkeleton;
    data$.subscribe({
      next: (res) => {
        this.listaPronta = true;
        this.protocolos = res.data;
        this.meta = res.meta;
      },
      error: () => {
        this.listaPronta = true;
        this.erro = "N\xE3o foi poss\xEDvel carregar os protocolos.";
      }
    });
  }
  aplicarFiltros() {
    this.filterDrawerOpen = false;
    this.carregar(1);
  }
  limparFiltros() {
    this.template_id = "";
    this.status = "";
    this.data_inicio = "";
    this.data_fim = "";
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
    this.router.navigate(["/protocolos", p.id]);
  }
  statusLabel(s) {
    const map = {
      pending: "Pendente",
      approved: "Aprovado",
      rejected: "Reprovado"
    };
    return map[s?.toLowerCase()] ?? s;
  }
  dataFormatada(val) {
    if (!val)
      return "\u2014";
    const d = new Date(val);
    if (isNaN(d.getTime()))
      return val;
    return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
  }
  exportarCsv() {
    this.exportando = true;
    const params = {};
    if (this.template_id !== "")
      params.template_id = Number(this.template_id);
    if (this.status)
      params.status = this.status;
    if (this.data_inicio)
      params.data_inicio = this.data_inicio;
    if (this.data_fim)
      params.data_fim = this.data_fim;
    this.protocolosService.exportarCsv(params).subscribe({
      next: (blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `protocolos-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.csv`;
        a.click();
        URL.revokeObjectURL(url);
        this.exportando = false;
      },
      error: () => this.exportando = false
    });
  }
  exportarPdf() {
    this.exportando = true;
    const params = { limit: 50 };
    if (this.template_id !== "")
      params.template_id = Number(this.template_id);
    if (this.status)
      params.status = this.status;
    if (this.data_inicio)
      params.data_inicio = this.data_inicio;
    if (this.data_fim)
      params.data_fim = this.data_fim;
    this.protocolosService.exportarPdf(params).subscribe({
      next: (blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `protocolos-pdf-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.pdf`;
        a.click();
        URL.revokeObjectURL(url);
        this.exportando = false;
      },
      error: () => this.exportando = false
    });
  }
  contagemTexto() {
    const n = this.meta.total;
    return n === 1 ? "1 registro" : `${n} registros`;
  }
  static \u0275fac = function ProtocolosListagemComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ProtocolosListagemComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ProtocolosListagemComponent, selectors: [["app-protocolos-listagem"]], decls: 28, vars: 10, consts: [[1, "protocolos-page", "relative", "min-h-[320px]"], [1, "page-header", "mb-5"], [1, "page-title", "flex", "items-center", "gap-3"], [1, "flex", "flex-wrap", "items-center", "gap-3", "mb-4"], [1, "form-search-wrap", "flex-1", "min-w-[200px]"], [1, "material-symbols-outlined", "form-search-icon"], ["type", "text", "placeholder", "Buscar...", "aria-label", "Buscar protocolos", 1, "form-input", "form-search-input", "text-sm", 3, "ngModelChange", "keydown.enter", "ngModel"], ["type", "button", "title", "Filtros", 1, "btn-ghost", "btn-default-bg", "inline-flex", "items-center", "gap-2", 3, "click"], [1, "material-symbols-outlined", "text-lg"], [1, "text-xs", "rounded-full", "px-1.5", "py-0.5", "font-medium", 2, "background", "var(--c-primary)", "color", "white"], [1, "flex", "items-center", "gap-2", "flex-wrap"], ["type", "button", "title", "Exportar CSV", 1, "btn-ghost", "btn-default-bg", "inline-flex", "items-center", "gap-2", 3, "click", "disabled"], ["type", "button", "title", "Exportar PDF (at\xE9 50)", 1, "btn-ghost", "btn-default-bg", "inline-flex", "items-center", "gap-2", 3, "click", "disabled"], [1, "text-sm", "mb-3", 2, "color", "var(--c-muted)"], [1, "text-sm", "mb-4", 2, "color", "var(--c-error, #dc2626)"], [3, "rows"], [1, "zm-content-enter"], [1, "data-table-wrap"], ["icon", "inbox", "title", "Nenhum protocolo encontrado."], [1, "overflow-x-auto"], [1, "data-table"], ["id", "protocolos-tbody"], [1, "protocolo-row", "cursor-pointer"], [3, "pageChange", "currentPage", "lastPage"], [1, "protocolo-row", "cursor-pointer", 3, "click"], [1, "font-medium", 2, "color", "var(--c-text)"], [1, "text-xs", "mt-0.5", 2, "color", "var(--c-muted)"], [2, "color", "var(--c-text)"], [3, "click"], [2, "color", "var(--c-muted)"], [1, "inline-flex", "items-center", "gap-1", "text-xs", "font-medium", 2, "color", "var(--c-warning)"], [1, "inline-flex", "items-center", "gap-1", "text-xs", "font-semibold", 2, "color", "var(--c-success)"], [1, "inline-flex", "items-center", "gap-1", "text-xs", "font-semibold", 2, "color", "var(--c-danger)"], [1, "text-xs", 2, "color", "var(--c-muted)"], [1, "text-sm", "no-underline", "font-medium", 2, "color", "var(--c-primary)", 3, "routerLink"], [1, "text-xs", "font-mono", "mt-0.5", 2, "color", "var(--c-muted)"], [1, "material-symbols-outlined", "text-base"], ["aria-hidden", "true", 1, "drawer-overlay", "fixed", "inset-0", "z-40", "bg-black/30", 3, "click"], [1, "filter-drawer", "fixed", "top-0", "right-0", "h-full", "w-full", "max-w-sm", "z-50", "shadow-xl", "flex", "flex-col", 2, "background", "var(--c-surface)", "border-left", "1px solid var(--c-border)"], [1, "flex", "items-center", "justify-between", "px-5", "py-4", 2, "border-bottom", "1px solid var(--c-border)"], [1, "flex", "items-center", "gap-2"], [1, "material-symbols-outlined", 2, "color", "var(--c-primary)"], [1, "text-lg", "font-semibold", "m-0", 2, "color", "var(--c-text)"], ["type", "button", "aria-label", "Fechar", 1, "p-2", "rounded-lg", "hover:bg-[var(--c-soft)]", 3, "click"], [1, "material-symbols-outlined"], [1, "flex-1", "overflow-auto", "p-5", "space-y-4"], [1, "block", "text-xs", "font-semibold", "uppercase", "tracking-wider", "mb-1.5", 2, "color", "var(--c-muted)"], [1, "form-select", "text-sm", 3, "ngModelChange", "ngModel"], ["value", ""], [3, "value"], ["value", "pending"], ["value", "approved"], ["value", "rejected"], ["type", "date", 1, "form-input", "text-sm", 3, "ngModelChange", "ngModel"], [1, "flex", "gap-2", "p-5", 2, "border-top", "1px solid var(--c-border)"], ["type", "button", 1, "btn-ghost", "btn-default-bg", "flex-1", "inline-flex", "items-center", "justify-center", "gap-2", 3, "click"], ["type", "button", 1, "btn-primary", "flex-1", "inline-flex", "items-center", "justify-center", "gap-2", 3, "click"]], template: function ProtocolosListagemComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "div", 4)(5, "span", 5);
      \u0275\u0275text(6, "search");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "input", 6);
      \u0275\u0275twoWayListener("ngModelChange", function ProtocolosListagemComponent_Template_input_ngModelChange_7_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.busca, $event) || (ctx.busca = $event);
        return $event;
      });
      \u0275\u0275listener("keydown.enter", function ProtocolosListagemComponent_Template_input_keydown_enter_7_listener() {
        return ctx.carregar(1);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(8, "button", 7);
      \u0275\u0275listener("click", function ProtocolosListagemComponent_Template_button_click_8_listener() {
        return ctx.openFilterDrawer();
      });
      \u0275\u0275elementStart(9, "span", 8);
      \u0275\u0275text(10, "tune");
      \u0275\u0275elementEnd();
      \u0275\u0275text(11, " Filtros ");
      \u0275\u0275conditionalCreate(12, ProtocolosListagemComponent_Conditional_12_Template, 2, 1, "span", 9);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(13, "div", 10)(14, "button", 11);
      \u0275\u0275listener("click", function ProtocolosListagemComponent_Template_button_click_14_listener() {
        return ctx.exportarCsv();
      });
      \u0275\u0275elementStart(15, "span", 8);
      \u0275\u0275text(16, "download");
      \u0275\u0275elementEnd();
      \u0275\u0275text(17, " Exportar CSV ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(18, "button", 12);
      \u0275\u0275listener("click", function ProtocolosListagemComponent_Template_button_click_18_listener() {
        return ctx.exportarPdf();
      });
      \u0275\u0275elementStart(19, "span", 8);
      \u0275\u0275text(20, "picture_as_pdf");
      \u0275\u0275elementEnd();
      \u0275\u0275text(21, " Exportar PDF (at\xE9 50) ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275conditionalCreate(22, ProtocolosListagemComponent_Conditional_22_Template, 2, 1, "p", 13);
      \u0275\u0275conditionalCreate(23, ProtocolosListagemComponent_Conditional_23_Template, 2, 1, "p", 14);
      \u0275\u0275conditionalCreate(24, ProtocolosListagemComponent_Conditional_24_Template, 1, 1, "zm-skeleton-list", 15)(25, ProtocolosListagemComponent_Conditional_25_Template, 0, 0)(26, ProtocolosListagemComponent_Conditional_26_Template, 4, 1, "div", 16);
      \u0275\u0275conditionalCreate(27, ProtocolosListagemComponent_Conditional_27_Template, 49, 4);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(7);
      \u0275\u0275twoWayProperty("ngModel", ctx.busca);
      \u0275\u0275advance();
      \u0275\u0275classProp("ring-2", ctx.temFiltrosAtivos);
      \u0275\u0275advance(4);
      \u0275\u0275conditional(ctx.temFiltrosAtivos ? 12 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.exportando);
      \u0275\u0275advance(4);
      \u0275\u0275property("disabled", ctx.exportando);
      \u0275\u0275advance(4);
      \u0275\u0275conditional(ctx.listaPronta && !ctx.erro ? 22 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.erro ? 23 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showSkeleton() ? 24 : !ctx.listaPronta && !ctx.erro ? 25 : !ctx.erro ? 26 : -1);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.filterDrawerOpen ? 27 : -1);
    }
  }, dependencies: [CommonModule, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel, RouterLink, ZmSkeletonListComponent, ZmPaginationComponent, ZmEmptyStateComponent], styles: ["\n\n.protocolo-row[_ngcontent-%COMP%]:hover {\n  background-color: var(--c-soft);\n}\n.filter-drawer[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_proto-drawer-in 0.2s ease-out;\n}\n@keyframes _ngcontent-%COMP%_proto-drawer-in {\n  from {\n    transform: translateX(100%);\n  }\n  to {\n    transform: translateX(0);\n  }\n}\n/*# sourceMappingURL=protocolos-listagem.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ProtocolosListagemComponent, [{
    type: Component,
    args: [{ selector: "app-protocolos-listagem", standalone: true, imports: [CommonModule, FormsModule, RouterLink, ZmSkeletonListComponent, ZmPaginationComponent, ZmEmptyStateComponent], template: `<div class="protocolos-page relative min-h-[320px]">\r
  <div class="page-header mb-5">\r
    <div class="page-title flex items-center gap-3">\r
      <!-- <div class="page-title-icon w-10 h-10 rounded-lg flex items-center justify-center" style="background: var(--c-soft)">\r
        <span class="material-symbols-outlined" style="color: var(--c-primary)">inbox</span>\r
      </div>\r
      <div>\r
        <h1 class="text-xl font-semibold m-0" style="color: var(--c-text)">Protocolos</h1>\r
      </div> -->\r
      <div class="flex flex-wrap items-center gap-3 mb-4">\r
        <div class="form-search-wrap flex-1 min-w-[200px]">\r
          <span class="material-symbols-outlined form-search-icon">search</span>\r
          <input\r
            type="text"\r
            [(ngModel)]="busca"\r
            (keydown.enter)="carregar(1)"\r
            placeholder="Buscar..."\r
            class="form-input form-search-input text-sm"\r
            aria-label="Buscar protocolos"\r
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
    <div class="flex items-center gap-2 flex-wrap">\r
      <button type="button" class="btn-ghost btn-default-bg inline-flex items-center gap-2" (click)="exportarCsv()" [disabled]="exportando" title="Exportar CSV">\r
        <span class="material-symbols-outlined text-lg">download</span>\r
        Exportar CSV\r
      </button>\r
      <button type="button" class="btn-ghost btn-default-bg inline-flex items-center gap-2" (click)="exportarPdf()" [disabled]="exportando" title="Exportar PDF (at\xE9 50)">\r
        <span class="material-symbols-outlined text-lg">picture_as_pdf</span>\r
        Exportar PDF (at\xE9 50)\r
      </button>\r
    </div>\r
  </div>\r
\r
  <!-- <div class="flex flex-wrap items-center gap-3 mb-4">\r
    <div class="form-search-wrap flex-1 min-w-[200px]">\r
      <span class="material-symbols-outlined form-search-icon">search</span>\r
      <input\r
        type="text"\r
        [(ngModel)]="busca"\r
        (keydown.enter)="carregar(1)"\r
        placeholder="Buscar..."\r
        class="form-input form-search-input text-sm"\r
        aria-label="Buscar protocolos"\r
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
        @if (protocolos.length === 0) {\r
          <zm-empty-state icon="inbox" title="Nenhum protocolo encontrado." />\r
        } @else {\r
          <div class="overflow-x-auto">\r
            <table class="data-table">\r
              <thead>\r
                <tr>\r
                  <th>Protocolo / Data</th>\r
                  <th>Template</th>\r
                  <th>Pessoa</th>\r
                  <th>Situa\xE7\xE3o</th>\r
                  <th>Submetente</th>\r
                  <th>Revisado em</th>\r
                  <th>Revisado por</th>\r
                </tr>\r
              </thead>\r
              <tbody id="protocolos-tbody">\r
                @for (p of protocolos; track p.id) {\r
                  <tr class="protocolo-row cursor-pointer" (click)="irParaDetalhe(p, $event)">\r
                    <td>\r
                      <div class="font-medium" style="color: var(--c-text)">{{ p.protocol_number || p.id }}</div>\r
                      <div class="text-xs mt-0.5" style="color: var(--c-muted)">{{ dataFormatada(p.submitted_at || p.created_at) }}</div>\r
                    </td>\r
                    <td style="color: var(--c-text)">{{ p.template_name ?? '\u2014' }}</td>\r
                    <td (click)="$event.stopPropagation()">\r
                      @if (p.person) {\r
                        <a [routerLink]="['/pessoas', p.person.id]" class="text-sm no-underline font-medium" style="color: var(--c-primary)">{{ p.person.name }}</a>\r
                        <div class="text-xs font-mono mt-0.5" style="color: var(--c-muted)">{{ p.person.code }}</div>\r
                      } @else {\r
                        <span style="color: var(--c-muted)">\u2014</span>\r
                      }\r
                    </td>\r
                    <td>\r
                      @if (p.status === 'pending' || (p.status && p.status.toLowerCase() === 'pending')) {\r
                        <span class="inline-flex items-center gap-1 text-xs font-medium" style="color: var(--c-warning)">\r
                          <span class="material-symbols-outlined text-base">schedule</span>\r
                          {{ statusLabel(p.status) }}\r
                        </span>\r
                      } @else if (p.status === 'approved' || (p.status && p.status.toLowerCase() === 'approved')) {\r
                        <span class="inline-flex items-center gap-1 text-xs font-semibold" style="color: var(--c-success)">\r
                          <span class="material-symbols-outlined text-base">check_circle</span>\r
                          {{ statusLabel(p.status) }}\r
                        </span>\r
                      } @else {\r
                        <span class="inline-flex items-center gap-1 text-xs font-semibold" style="color: var(--c-danger)">\r
                          <span class="material-symbols-outlined text-base">cancel</span>\r
                          {{ statusLabel(p.status) }}\r
                        </span>\r
                      }\r
                    </td>\r
                    <td>\r
                      <div style="color: var(--c-text)">{{ p.submitter_name ?? '\u2014' }}</div>\r
                      @if (p.submitter_email) {\r
                        <div class="text-xs" style="color: var(--c-muted)">{{ p.submitter_email }}</div>\r
                      }\r
                    </td>\r
                    <td style="color: var(--c-muted)">{{ dataFormatada(p.approved_at) }}</td>\r
                    <td style="color: var(--c-text)">{{ p.approved_by_name ?? '\u2014' }}</td>\r
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
          <label class="block text-xs font-semibold uppercase tracking-wider mb-1.5" style="color: var(--c-muted)">Template</label>\r
          <select [(ngModel)]="template_id" class="form-select text-sm">\r
            <option value="">Todos</option>\r
            @for (t of templates; track t.id) {\r
              <option [value]="t.id">{{ t.name }}</option>\r
            }\r
          </select>\r
        </div>\r
        <div>\r
          <label class="block text-xs font-semibold uppercase tracking-wider mb-1.5" style="color: var(--c-muted)">Situa\xE7\xE3o</label>\r
          <select [(ngModel)]="status" class="form-select text-sm">\r
            <option value="">Todas</option>\r
            <option value="pending">Pendente</option>\r
            <option value="approved">Aprovado</option>\r
            <option value="rejected">Reprovado</option>\r
          </select>\r
        </div>\r
        <div>\r
          <label class="block text-xs font-semibold uppercase tracking-wider mb-1.5" style="color: var(--c-muted)">Data in\xEDcio</label>\r
          <input type="date" [(ngModel)]="data_inicio" class="form-input text-sm" />\r
        </div>\r
        <div>\r
          <label class="block text-xs font-semibold uppercase tracking-wider mb-1.5" style="color: var(--c-muted)">Data fim</label>\r
          <input type="date" [(ngModel)]="data_fim" class="form-input text-sm" />\r
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
`, styles: ["/* src/app/paginas/protocolos/protocolos-listagem.component.css */\n.protocolo-row:hover {\n  background-color: var(--c-soft);\n}\n.filter-drawer {\n  animation: proto-drawer-in 0.2s ease-out;\n}\n@keyframes proto-drawer-in {\n  from {\n    transform: translateX(100%);\n  }\n  to {\n    transform: translateX(0);\n  }\n}\n/*# sourceMappingURL=protocolos-listagem.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProtocolosListagemComponent, { className: "ProtocolosListagemComponent", filePath: "src/app/paginas/protocolos/protocolos-listagem.component.ts", lineNumber: 18 });
})();
export {
  ProtocolosListagemComponent
};
//# sourceMappingURL=chunk-T54GV2TI.js.map
