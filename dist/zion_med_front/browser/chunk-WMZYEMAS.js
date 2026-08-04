import {
  ZmEmptyStateComponent
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
  ConfirmDialogService
} from "./chunk-RISAXZFK.js";
import {
  ToastService
} from "./chunk-EZUVP6MG.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel
} from "./chunk-USROZ7PW.js";
import "./chunk-SFRXLDXR.js";
import "./chunk-IBJWGIJV.js";
import {
  RouterLink
} from "./chunk-C2NWBPZH.js";
import {
  CommonModule,
  Component,
  __async,
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
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-GRLISYEV.js";

// src/app/paginas/templates/templates-listagem.component.ts
var _c0 = (a0) => ["/templates", a0, "campos"];
var _c1 = (a0) => ["/templates", a0, "editar"];
var _forTrack0 = ($index, $item) => $item.key;
var _forTrack1 = ($index, $item) => $item.id;
function TemplatesListagemComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 3)(1, "span", 11);
    \u0275\u0275text(2, "search");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "input", 12);
    \u0275\u0275twoWayListener("ngModelChange", function TemplatesListagemComponent_Conditional_3_Template_input_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.buscaTexto, $event) || (ctx_r1.buscaTexto = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.buscaTexto);
  }
}
function TemplatesListagemComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 5)(1, "button", 13);
    \u0275\u0275listener("click", function TemplatesListagemComponent_Conditional_5_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setFiltro("all"));
    });
    \u0275\u0275text(2, "Todos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 14);
    \u0275\u0275listener("click", function TemplatesListagemComponent_Conditional_5_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setFiltro("ativo"));
    });
    \u0275\u0275text(4, "Ativos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 15);
    \u0275\u0275listener("click", function TemplatesListagemComponent_Conditional_5_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setFiltro("publico"));
    });
    \u0275\u0275text(6, "P\xFAblicos");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275classProp("active", ctx_r1.filtroAtual === "all");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx_r1.filtroAtual === "ativo");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx_r1.filtroAtual === "publico");
  }
}
function TemplatesListagemComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 8);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.erro);
  }
}
function TemplatesListagemComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "zm-skeleton-list", 9);
  }
  if (rf & 2) {
    \u0275\u0275property("rows", 6);
  }
}
function TemplatesListagemComponent_Conditional_12_Template(rf, ctx) {
}
function TemplatesListagemComponent_Conditional_13_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "zm-empty-state", 17);
  }
}
function TemplatesListagemComponent_Conditional_13_Conditional_3_For_11_Conditional_0_For_10_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 34);
    \u0275\u0275element(1, "span", 44);
    \u0275\u0275text(2, " Ativo ");
    \u0275\u0275elementEnd();
  }
}
function TemplatesListagemComponent_Conditional_13_Conditional_3_For_11_Conditional_0_For_10_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 35);
    \u0275\u0275text(1, "Inativo");
    \u0275\u0275elementEnd();
  }
}
function TemplatesListagemComponent_Conditional_13_Conditional_3_For_11_Conditional_0_For_10_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 36)(1, "span", 45);
    \u0275\u0275text(2, "public");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " P\xFAblico ");
    \u0275\u0275elementEnd();
  }
}
function TemplatesListagemComponent_Conditional_13_Conditional_3_For_11_Conditional_0_For_10_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 43);
  }
}
function TemplatesListagemComponent_Conditional_13_Conditional_3_For_11_Conditional_0_For_10_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 40);
    \u0275\u0275text(1, "delete");
    \u0275\u0275elementEnd();
  }
}
function TemplatesListagemComponent_Conditional_13_Conditional_3_For_11_Conditional_0_For_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 29)(1, "td", 30)(2, "span", 31);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "td", 32)(5, "div", 33);
    \u0275\u0275conditionalCreate(6, TemplatesListagemComponent_Conditional_13_Conditional_3_For_11_Conditional_0_For_10_Conditional_6_Template, 3, 0, "span", 34)(7, TemplatesListagemComponent_Conditional_13_Conditional_3_For_11_Conditional_0_For_10_Conditional_7_Template, 2, 0, "span", 35);
    \u0275\u0275conditionalCreate(8, TemplatesListagemComponent_Conditional_13_Conditional_3_For_11_Conditional_0_For_10_Conditional_8_Template, 4, 0, "span", 36);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "td", 37)(10, "div", 38)(11, "a", 39)(12, "span", 40);
    \u0275\u0275text(13, "tune");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "a", 41)(15, "span", 40);
    \u0275\u0275text(16, "edit");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "button", 42);
    \u0275\u0275listener("click", function TemplatesListagemComponent_Conditional_13_Conditional_3_For_11_Conditional_0_For_10_Template_button_click_17_listener($event) {
      const t_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r1.remover(t_r7, $event));
    });
    \u0275\u0275conditionalCreate(18, TemplatesListagemComponent_Conditional_13_Conditional_3_For_11_Conditional_0_For_10_Conditional_18_Template, 1, 0, "span", 43)(19, TemplatesListagemComponent_Conditional_13_Conditional_3_For_11_Conditional_0_For_10_Conditional_19_Template, 2, 0, "span", 40);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const t_r7 = ctx.$implicit;
    const grupo_r5 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275styleProp("display", ctx_r1.collapsed[grupo_r5.key] ? "none" : "");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(t_r7.name);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(t_r7.is_active ? 6 : 7);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(t_r7.public_enabled ? 8 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(9, _c0, t_r7.id));
    \u0275\u0275advance(3);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(11, _c1, t_r7.id));
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r1.removendoId === t_r7.id);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.removendoId === t_r7.id ? 18 : 19);
  }
}
function TemplatesListagemComponent_Conditional_13_Conditional_3_For_11_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 22);
    \u0275\u0275listener("click", function TemplatesListagemComponent_Conditional_13_Conditional_3_For_11_Conditional_0_Template_tr_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const grupo_r5 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.toggleGrupo(grupo_r5.key));
    });
    \u0275\u0275elementStart(1, "td", 23)(2, "div", 24)(3, "span", 25);
    \u0275\u0275text(4, "expand_more");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 26);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 27);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275repeaterCreate(9, TemplatesListagemComponent_Conditional_13_Conditional_3_For_11_Conditional_0_For_10_Template, 20, 13, "tr", 28, _forTrack1);
  }
  if (rf & 2) {
    const grupo_r5 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("collapsed", ctx_r1.collapsed[grupo_r5.key]);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(grupo_r5.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(grupo_r5.items.length);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.itensVisiveis(grupo_r5));
  }
}
function TemplatesListagemComponent_Conditional_13_Conditional_3_For_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, TemplatesListagemComponent_Conditional_13_Conditional_3_For_11_Conditional_0_Template, 11, 4);
  }
  if (rf & 2) {
    const grupo_r5 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275conditional(ctx_r1.grupoVisivel(grupo_r5) ? 0 : -1);
  }
}
function TemplatesListagemComponent_Conditional_13_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 18)(1, "thead")(2, "tr")(3, "th", 20);
    \u0275\u0275text(4, "Nome");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th");
    \u0275\u0275text(6, "Status");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th", 21);
    \u0275\u0275text(8, "A\xE7\xF5es");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "tbody");
    \u0275\u0275repeaterCreate(10, TemplatesListagemComponent_Conditional_13_Conditional_3_For_11_Template, 1, 1, null, null, _forTrack0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(10);
    \u0275\u0275repeater(ctx_r1.grupos);
  }
}
function TemplatesListagemComponent_Conditional_13_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 19);
    \u0275\u0275text(1, "Clique no grupo para expandir ou recolher");
    \u0275\u0275elementEnd();
  }
}
function TemplatesListagemComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10)(1, "div", 16);
    \u0275\u0275conditionalCreate(2, TemplatesListagemComponent_Conditional_13_Conditional_2_Template, 1, 0, "zm-empty-state", 17)(3, TemplatesListagemComponent_Conditional_13_Conditional_3_Template, 12, 0, "table", 18);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(4, TemplatesListagemComponent_Conditional_13_Conditional_4_Template, 2, 0, "p", 19);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.grupos.length === 0 ? 2 : 3);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.templates.length > 0 ? 4 : -1);
  }
}
var CATEGORY_LABELS = {
  personalizado: "Personalizado",
  geral: "Geral (todos os tenants)",
  clinica_medica: "Cl\xEDnica M\xE9dica",
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
var TemplatesListagemComponent = class _TemplatesListagemComponent {
  templates = [];
  showSkeleton;
  listaPronta = false;
  erro = "";
  /** Filtro: 'all' | 'ativo' | 'publico' */
  filtroAtual = "all";
  buscaTexto = "";
  /** Grupos por categoria (chave = category ou 'personalizado') */
  grupos = [];
  /** Grupo colapsado: key -> boolean */
  collapsed = {};
  categoryLabels = CATEGORY_LABELS;
  removendoId = null;
  templatesService = inject(TemplatesService);
  loadingService = inject(LoadingService);
  toast = inject(ToastService);
  confirm = inject(ConfirmDialogService);
  ngOnInit() {
    const { data$, showSkeleton } = this.loadingService.loadWithThreshold(this.templatesService.list());
    this.showSkeleton = showSkeleton;
    data$.subscribe({
      next: (list) => {
        this.listaPronta = true;
        this.templates = list;
        this.montarGrupos();
      },
      error: () => {
        this.listaPronta = true;
        this.erro = "N\xE3o foi poss\xEDvel carregar os templates.";
      }
    });
  }
  montarGrupos() {
    const byCategory = /* @__PURE__ */ new Map();
    for (const t of this.templates) {
      const key = t.category ?? "personalizado";
      if (!byCategory.has(key))
        byCategory.set(key, []);
      byCategory.get(key).push(t);
    }
    const order = ["personalizado", ...Object.keys(CATEGORY_LABELS).filter((k) => k !== "personalizado")];
    this.grupos = order.filter((key) => byCategory.has(key)).map((key) => ({
      key,
      label: CATEGORY_LABELS[key] ?? key,
      items: byCategory.get(key)
    }));
    this.grupos.forEach((g) => {
      if (this.collapsed[g.key] === void 0)
        this.collapsed[g.key] = true;
    });
  }
  setFiltro(f) {
    this.filtroAtual = f;
  }
  toggleGrupo(key) {
    this.collapsed[key] = !this.collapsed[key];
  }
  /** Retorna os itens do grupo que passam no filtro e na busca */
  itensVisiveis(grupo) {
    const search = this.buscaTexto.trim().toLowerCase();
    const matchFilter = (t) => {
      if (this.filtroAtual === "ativo")
        return !!t.is_active;
      if (this.filtroAtual === "publico")
        return !!t.public_enabled;
      return true;
    };
    const matchSearch = (t) => !search || (t.name ?? "").toLowerCase().includes(search);
    return grupo.items.filter((t) => matchFilter(t) && matchSearch(t));
  }
  /** Esconde grupo se não houver itens visíveis */
  grupoVisivel(grupo) {
    return this.itensVisiveis(grupo).length > 0;
  }
  remover(t, event) {
    return __async(this, null, function* () {
      event.preventDefault();
      event.stopPropagation();
      const nome = t.name?.trim() || "este template";
      const ok = yield this.confirm.request({
        title: "Deletar template?",
        messageBefore: "O template ",
        emphasis: nome,
        messageAfter: " ser\xE1 removido permanentemente. Esta a\xE7\xE3o n\xE3o pode ser desfeita.",
        confirmLabel: "Sim, deletar",
        variant: "danger"
      });
      if (!ok)
        return;
      this.removendoId = t.id;
      this.templatesService.delete(t.id).subscribe({
        next: () => {
          this.removendoId = null;
          this.templates = this.templates.filter((x) => x.id !== t.id);
          this.montarGrupos();
          this.toast.success("Template removido", `${nome} foi exclu\xEDdo.`);
        },
        error: () => {
          this.removendoId = null;
          this.toast.error("Erro ao remover", "N\xE3o foi poss\xEDvel remover o template.");
        }
      });
    });
  }
  static \u0275fac = function TemplatesListagemComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TemplatesListagemComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TemplatesListagemComponent, selectors: [["app-templates-listagem"]], decls: 14, vars: 4, consts: [[1, "relative", "min-h-[320px]"], [1, "page-header", "mb-5"], [1, "page-title"], [1, "form-search-wrap", "mb-3", "max-w-xs"], [1, "flex", "items-center", "gap-2", "flex-wrap"], [1, "templates-filter-wrap", "flex", "gap-0.5", "rounded-lg", "border", "p-0.5", 2, "background", "var(--c-surface)", "border-color", "var(--c-border)"], ["routerLink", "/templates/criar", "title", "Criar novo modelo", 1, "btn-primary"], [1, "material-symbols-outlined", 2, "font-size", "16px"], [1, "text-sm", "mb-4", 2, "color", "var(--c-error, #dc2626)"], [3, "rows"], [1, "zm-content-enter"], [1, "material-symbols-outlined", "form-search-icon"], ["type", "text", "placeholder", "Buscar por nome...", "aria-label", "Buscar modelo por nome", 1, "form-input", "form-search-input", "text-sm", 3, "ngModelChange", "ngModel"], ["type", "button", "title", "Mostrar todos os modelos", 1, "templates-filter-btn", "rounded-md", "text-xs", "font-medium", "px-3", "py-1", "transition-all", 3, "click"], ["type", "button", "title", "Mostrar apenas ativos", 1, "templates-filter-btn", "rounded-md", "text-xs", "font-medium", "px-3", "py-1", "transition-all", 3, "click"], ["type", "button", "title", "Mostrar apenas com link p\xFAblico", 1, "templates-filter-btn", "rounded-md", "text-xs", "font-medium", "px-3", "py-1", "transition-all", 3, "click"], [1, "data-table-wrap", "rounded-2xl"], ["icon", "description", "title", "Nenhum modelo cadastrado.", "actionLabel", "Criar modelo", "actionLink", "/templates/criar"], [1, "data-table", "templates-table", "w-full", "border-collapse"], [1, "text-xs", "mt-3", "text-center", 2, "color", "var(--c-muted)"], [1, "w-1/2"], [1, "text-right"], [1, "templates-group-header", "cursor-pointer", "select-none", "border-t", "transition-colors", 2, "border-color", "var(--c-border)", 3, "click"], ["colspan", "3", 1, "py-2", "px-5", "!bg-[var(--c-soft)]"], [1, "flex", "items-center", "gap-2"], [1, "material-symbols-outlined", "templates-chevron", "text-sm", "transition-transform", 2, "color", "var(--c-muted)"], [1, "text-xs", "font-semibold", "uppercase", "tracking-wide", 2, "color", "var(--c-muted)"], [1, "text-xs", "rounded", "px-1.5", "py-0.5", "font-medium", 2, "background", "color-mix(in srgb, var(--c-primary) 14%, transparent)", "color", "var(--c-primary)"], [1, "templates-group-rows", "border-t", "transition-colors", "hover:bg-[var(--c-soft)]", 2, "border-color", "var(--c-border)", 3, "display"], [1, "templates-group-rows", "border-t", "transition-colors", "hover:bg-[var(--c-soft)]", 2, "border-color", "var(--c-border)"], [1, "py-3", "px-5", "text-[0.8125rem]"], [1, "font-medium", 2, "color", "var(--c-text)"], [1, "py-3", "px-4"], [1, "flex", "gap-1.5", "flex-wrap"], [1, "templates-badge-ativo", "inline-flex", "items-center", "gap-1", "text-[0.6875rem]", "font-semibold", "py-0.5", "px-2", "rounded-full"], [1, "templates-badge-inativo", "text-[0.6875rem]", "font-semibold", "py-0.5", "px-2", "rounded-full", 2, "background", "var(--c-soft)", "color", "var(--c-muted)"], [1, "templates-badge-publico", "inline-flex", "items-center", "gap-1", "text-[0.6875rem]", "font-semibold", "py-0.5", "px-2", "rounded-full"], [1, "py-3", "px-5", "text-right"], [1, "flex", "items-center", "justify-end", "gap-0.5"], ["title", "Campos", "aria-label", "Campos do modelo", 1, "templates-action-btn", "p-1", "rounded-md", "inline-flex", "items-center", "justify-center", "no-underline", 2, "color", "var(--c-muted)", 3, "routerLink"], [1, "material-symbols-outlined", "text-lg"], ["title", "Editar", "aria-label", "Editar modelo", 1, "templates-action-btn", "p-1", "rounded-md", "inline-flex", "items-center", "justify-center", "no-underline", 2, "color", "var(--c-muted)", 3, "routerLink"], ["type", "button", "title", "Remover", "aria-label", "Remover modelo", 1, "templates-action-btn", "danger", "p-1", "rounded-md", "border-0", "cursor-pointer", "inline-flex", "items-center", "justify-center", "bg-transparent", 2, "color", "var(--c-muted)", 3, "click", "disabled"], [1, "btn-spinner", 2, "width", "18px", "height", "18px", "border-width", "2px"], [1, "templates-dot", "w-1.5", "h-1.5", "rounded-full", "inline-block", 2, "background", "var(--c-primary)"], [1, "material-symbols-outlined", "text-xs"]], template: function TemplatesListagemComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2);
      \u0275\u0275conditionalCreate(3, TemplatesListagemComponent_Conditional_3_Template, 4, 1, "div", 3);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "div", 4);
      \u0275\u0275conditionalCreate(5, TemplatesListagemComponent_Conditional_5_Template, 7, 6, "div", 5);
      \u0275\u0275elementStart(6, "a", 6)(7, "span", 7);
      \u0275\u0275text(8, "add");
      \u0275\u0275elementEnd();
      \u0275\u0275text(9, " Novo modelo ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275conditionalCreate(10, TemplatesListagemComponent_Conditional_10_Template, 2, 1, "p", 8);
      \u0275\u0275conditionalCreate(11, TemplatesListagemComponent_Conditional_11_Template, 1, 1, "zm-skeleton-list", 9)(12, TemplatesListagemComponent_Conditional_12_Template, 0, 0)(13, TemplatesListagemComponent_Conditional_13_Template, 5, 2, "div", 10);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.templates.length > 0 ? 3 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.templates.length > 0 ? 5 : -1);
      \u0275\u0275advance(5);
      \u0275\u0275conditional(ctx.erro ? 10 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showSkeleton() ? 11 : !ctx.listaPronta ? 12 : 13);
    }
  }, dependencies: [CommonModule, RouterLink, FormsModule, DefaultValueAccessor, NgControlStatus, NgModel, ZmSkeletonListComponent, ZmEmptyStateComponent], styles: ["\n\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 1rem;\n}\n.data-table.templates-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:last-child, \n.data-table.templates-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:last-child {\n  text-align: right;\n}\n.data-table.templates-table[_ngcontent-%COMP%]   tr.templates-group-header[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  text-align: left;\n}\n.templates-filter-btn[_ngcontent-%COMP%] {\n  background: transparent;\n  color: var(--c-muted);\n  border: none;\n  cursor: pointer;\n}\n.templates-filter-btn.active[_ngcontent-%COMP%] {\n  background: var(--c-primary);\n  color: #fff;\n}\n.templates-group-header[_ngcontent-%COMP%]:hover {\n  background-color: var(--c-soft);\n}\n.templates-chevron[_ngcontent-%COMP%] {\n  transition: transform 0.2s ease;\n}\n.templates-group-header.collapsed[_ngcontent-%COMP%]   .templates-chevron[_ngcontent-%COMP%] {\n  transform: rotate(-90deg);\n}\n.templates-badge-ativo[_ngcontent-%COMP%] {\n  background: color-mix(in srgb, var(--c-primary) 18%, transparent);\n  color: var(--c-primary);\n}\n.templates-badge-publico[_ngcontent-%COMP%] {\n  background: color-mix(in srgb, var(--c-primary) 12%, transparent);\n  color: var(--c-primary);\n}\n.templates-action-btn[_ngcontent-%COMP%] {\n  transition: background 0.15s, color 0.15s;\n}\n.templates-action-btn[_ngcontent-%COMP%]:hover {\n  background: var(--c-soft);\n  color: var(--c-text);\n}\n.templates-action-btn.danger[_ngcontent-%COMP%]:hover {\n  color: #f87171;\n  background: rgba(239, 68, 68, 0.08);\n}\n/*# sourceMappingURL=templates-listagem.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TemplatesListagemComponent, [{
    type: Component,
    args: [{ selector: "app-templates-listagem", standalone: true, imports: [CommonModule, RouterLink, FormsModule, ZmSkeletonListComponent, ZmEmptyStateComponent], template: `<div class="relative min-h-[320px]">\r
  <div class="page-header mb-5">\r
    <div class="page-title">\r
      <!-- <div class="page-title-icon">\r
        <span class="material-symbols-outlined">description</span>\r
      </div>\r
      <div>\r
        <h1>Modelos de formul\xE1rio</h1>\r
        @if (templates.length > 0) {\r
          <p class="page-header-subtitle">{{ templates.length }} {{ templates.length === 1 ? 'modelo' : 'modelos' }}</p>\r
        }\r
      </div> -->\r
      @if (templates.length > 0) {\r
        <div class="form-search-wrap mb-3 max-w-xs">\r
          <span class="material-symbols-outlined form-search-icon">search</span>\r
          <input\r
            type="text"\r
            [(ngModel)]="buscaTexto"\r
            placeholder="Buscar por nome..."\r
            class="form-input form-search-input text-sm"\r
            aria-label="Buscar modelo por nome"\r
          />\r
        </div>\r
      }\r
    </div>\r
    <div class="flex items-center gap-2 flex-wrap">\r
      @if (templates.length > 0) {\r
        <div class="templates-filter-wrap flex gap-0.5 rounded-lg border p-0.5" style="background: var(--c-surface); border-color: var(--c-border)">\r
          <button type="button" class="templates-filter-btn rounded-md text-xs font-medium px-3 py-1 transition-all" [class.active]="filtroAtual === 'all'" (click)="setFiltro('all')" title="Mostrar todos os modelos">Todos</button>\r
          <button type="button" class="templates-filter-btn rounded-md text-xs font-medium px-3 py-1 transition-all" [class.active]="filtroAtual === 'ativo'" (click)="setFiltro('ativo')" title="Mostrar apenas ativos">Ativos</button>\r
          <button type="button" class="templates-filter-btn rounded-md text-xs font-medium px-3 py-1 transition-all" [class.active]="filtroAtual === 'publico'" (click)="setFiltro('publico')" title="Mostrar apenas com link p\xFAblico">P\xFAblicos</button>\r
        </div>\r
      }\r
      <a routerLink="/templates/criar" class="btn-primary" title="Criar novo modelo">\r
        <span class="material-symbols-outlined" style="font-size: 16px">add</span>\r
        Novo modelo\r
      </a>\r
    </div>\r
  </div>\r
\r
  @if (erro) {\r
    <p class="text-sm mb-4" style="color: var(--c-error, #dc2626)">{{ erro }}</p>\r
  }\r
\r
  @if (showSkeleton()) {\r
    <zm-skeleton-list [rows]="6" />\r
  } @else if (!listaPronta) {\r
  } @else {\r
    <div class="zm-content-enter">\r
      <!-- @if (templates.length > 0) {\r
        <div class="form-search-wrap mb-3 max-w-xs">\r
          <span class="material-symbols-outlined form-search-icon">search</span>\r
          <input\r
            type="text"\r
            [(ngModel)]="buscaTexto"\r
            placeholder="Buscar por nome..."\r
            class="form-input form-search-input text-sm"\r
            aria-label="Buscar modelo por nome"\r
          />\r
        </div>\r
      } -->\r
\r
      <div class="data-table-wrap rounded-2xl">\r
        @if (grupos.length === 0) {\r
          <zm-empty-state\r
            icon="description"\r
            title="Nenhum modelo cadastrado."\r
            actionLabel="Criar modelo"\r
            actionLink="/templates/criar"\r
          />\r
        } @else {\r
        <table class="data-table templates-table w-full border-collapse">\r
          <thead>\r
            <tr>\r
              <th class="w-1/2">Nome</th>\r
              <th>Status</th>\r
              <th class="text-right">A\xE7\xF5es</th>\r
            </tr>\r
          </thead>\r
          <tbody>\r
            @for (grupo of grupos; track grupo.key) {\r
              @if (grupoVisivel(grupo)) {\r
                <tr class="templates-group-header cursor-pointer select-none border-t transition-colors" style="border-color: var(--c-border)" (click)="toggleGrupo(grupo.key)" [class.collapsed]="collapsed[grupo.key]">\r
                  <td colspan="3" class="py-2 px-5 !bg-[var(--c-soft)]">\r
                    <div class="flex items-center gap-2">\r
                      <span class="material-symbols-outlined templates-chevron text-sm transition-transform" style="color: var(--c-muted)">expand_more</span>\r
                      <span class="text-xs font-semibold uppercase tracking-wide" style="color: var(--c-muted)">{{ grupo.label }}</span>\r
                      <span class="text-xs rounded px-1.5 py-0.5 font-medium" style="background: color-mix(in srgb, var(--c-primary) 14%, transparent); color: var(--c-primary)">{{ grupo.items.length }}</span>\r
                    </div>\r
                  </td>\r
                </tr>\r
                @for (t of itensVisiveis(grupo); track t.id) {\r
                  <tr class="templates-group-rows border-t transition-colors hover:bg-[var(--c-soft)]" style="border-color: var(--c-border)" [style.display]="collapsed[grupo.key] ? 'none' : ''">\r
                    <td class="py-3 px-5 text-[0.8125rem]">\r
                      <span class="font-medium" style="color: var(--c-text)">{{ t.name }}</span>\r
                    </td>\r
                    <td class="py-3 px-4">\r
                      <div class="flex gap-1.5 flex-wrap">\r
                        @if (t.is_active) {\r
                          <span class="templates-badge-ativo inline-flex items-center gap-1 text-[0.6875rem] font-semibold py-0.5 px-2 rounded-full">\r
                            <span class="templates-dot w-1.5 h-1.5 rounded-full inline-block" style="background: var(--c-primary)"></span>\r
                            Ativo\r
                          </span>\r
                        } @else {\r
                          <span class="templates-badge-inativo text-[0.6875rem] font-semibold py-0.5 px-2 rounded-full" style="background: var(--c-soft); color: var(--c-muted)">Inativo</span>\r
                        }\r
                        @if (t.public_enabled) {\r
                          <span class="templates-badge-publico inline-flex items-center gap-1 text-[0.6875rem] font-semibold py-0.5 px-2 rounded-full">\r
                            <span class="material-symbols-outlined text-xs">public</span>\r
                            P\xFAblico\r
                          </span>\r
                        }\r
                      </div>\r
                    </td>\r
                    <td class="py-3 px-5 text-right">\r
                      <div class="flex items-center justify-end gap-0.5">\r
                        <a [routerLink]="['/templates', t.id, 'campos']" class="templates-action-btn p-1 rounded-md inline-flex items-center justify-center no-underline" style="color: var(--c-muted)" title="Campos" aria-label="Campos do modelo">\r
                          <span class="material-symbols-outlined text-lg">tune</span>\r
                        </a>\r
                        <a [routerLink]="['/templates', t.id, 'editar']" class="templates-action-btn p-1 rounded-md inline-flex items-center justify-center no-underline" style="color: var(--c-muted)" title="Editar" aria-label="Editar modelo">\r
                          <span class="material-symbols-outlined text-lg">edit</span>\r
                        </a>\r
                        <button type="button" class="templates-action-btn danger p-1 rounded-md border-0 cursor-pointer inline-flex items-center justify-center bg-transparent" style="color: var(--c-muted)" title="Remover" aria-label="Remover modelo" [disabled]="removendoId === t.id" (click)="remover(t, $event)">\r
                          @if (removendoId === t.id) {\r
                            <span class="btn-spinner" style="width:18px;height:18px;border-width:2px"></span>\r
                          } @else {\r
                            <span class="material-symbols-outlined text-lg">delete</span>\r
                          }\r
                        </button>\r
                      </div>\r
                    </td>\r
                  </tr>\r
                }\r
              }\r
            }\r
          </tbody>\r
        </table>\r
        }\r
      </div>\r
\r
      @if (templates.length > 0) {\r
        <p class="text-xs mt-3 text-center" style="color: var(--c-muted)">Clique no grupo para expandir ou recolher</p>\r
      }\r
    </div>\r
  }\r
</div>\r
`, styles: ["/* src/app/paginas/templates/templates-listagem.component.css */\n.page-header {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 1rem;\n}\n.data-table.templates-table th:last-child,\n.data-table.templates-table td:last-child {\n  text-align: right;\n}\n.data-table.templates-table tr.templates-group-header td {\n  text-align: left;\n}\n.templates-filter-btn {\n  background: transparent;\n  color: var(--c-muted);\n  border: none;\n  cursor: pointer;\n}\n.templates-filter-btn.active {\n  background: var(--c-primary);\n  color: #fff;\n}\n.templates-group-header:hover {\n  background-color: var(--c-soft);\n}\n.templates-chevron {\n  transition: transform 0.2s ease;\n}\n.templates-group-header.collapsed .templates-chevron {\n  transform: rotate(-90deg);\n}\n.templates-badge-ativo {\n  background: color-mix(in srgb, var(--c-primary) 18%, transparent);\n  color: var(--c-primary);\n}\n.templates-badge-publico {\n  background: color-mix(in srgb, var(--c-primary) 12%, transparent);\n  color: var(--c-primary);\n}\n.templates-action-btn {\n  transition: background 0.15s, color 0.15s;\n}\n.templates-action-btn:hover {\n  background: var(--c-soft);\n  color: var(--c-text);\n}\n.templates-action-btn.danger:hover {\n  color: #f87171;\n  background: rgba(239, 68, 68, 0.08);\n}\n/*# sourceMappingURL=templates-listagem.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TemplatesListagemComponent, { className: "TemplatesListagemComponent", filePath: "src/app/paginas/templates/templates-listagem.component.ts", lineNumber: 35 });
})();
export {
  TemplatesListagemComponent
};
//# sourceMappingURL=chunk-WMZYEMAS.js.map
