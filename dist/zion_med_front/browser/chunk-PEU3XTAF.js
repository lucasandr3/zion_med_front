import {
  TemplatesService
} from "./chunk-E3NIIMGP.js";
import {
  LoadingService,
  ZmSkeletonListComponent
} from "./chunk-GKI5AWTV.js";
import "./chunk-7WBHVE2H.js";
import {
  ToastService
} from "./chunk-EZUVP6MG.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel
} from "./chunk-USROZ7PW.js";
import "./chunk-IBJWGIJV.js";
import {
  Router,
  RouterLink
} from "./chunk-C2NWBPZH.js";
import {
  CommonModule,
  Component,
  __spreadProps,
  __spreadValues,
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
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-GRLISYEV.js";

// src/app/paginas/templates/templates-criar.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function TemplatesCriarComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 2);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.erro);
  }
}
function TemplatesCriarComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "zm-skeleton-list", 3);
  }
  if (rf & 2) {
    \u0275\u0275property("rows", 6);
  }
}
function TemplatesCriarComponent_Conditional_4_Template(rf, ctx) {
}
function TemplatesCriarComponent_Conditional_5_For_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 11);
    \u0275\u0275listener("click", function TemplatesCriarComponent_Conditional_5_For_12_Template_button_click_0_listener() {
      const cat_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.setFiltro(cat_r4));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementStart(2, "span", 12);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const cat_r4 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("active", ctx_r0.filtroAtual === cat_r4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.categoryLabels[cat_r4], " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.contagemFiltro(cat_r4));
  }
}
function TemplatesCriarComponent_Conditional_5_For_20_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 31);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r6 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.categoryLabels[t_r6.category]);
  }
}
function TemplatesCriarComponent_Conditional_5_For_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 18)(1, "div", 25)(2, "div", 26);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "div")(5, "div", 27)(6, "span", 28);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "p", 29);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 30);
    \u0275\u0275conditionalCreate(11, TemplatesCriarComponent_Conditional_5_For_20_Conditional_11_Template, 2, 1, "span", 31);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 32)(13, "button", 33);
    \u0275\u0275listener("click", function TemplatesCriarComponent_Conditional_5_For_20_Template_button_click_13_listener($event) {
      const t_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      ctx_r0.abrirPreview(t_r6);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275text(14, "Pr\xE9-visualizar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "button", 34);
    \u0275\u0275listener("click", function TemplatesCriarComponent_Conditional_5_For_20_Template_button_click_15_listener($event) {
      const t_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.usarModeloDoCard(t_r6, $event));
    });
    \u0275\u0275text(16, "Usar modelo");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const t_r6 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.categoryEmoji[t_r6.category || "geral"]);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(t_r6.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.descricaoResumo(t_r6));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(t_r6.category && ctx_r0.categoryLabels[t_r6.category] ? 11 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r0.usandoModelo);
  }
}
function TemplatesCriarComponent_Conditional_5_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 19)(1, "div", 35);
    \u0275\u0275text(2, "\u{1F50D}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 36);
    \u0275\u0275text(4, "Nenhum modelo encontrado.");
    \u0275\u0275elementEnd()();
  }
}
function TemplatesCriarComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 4)(1, "div", 6)(2, "div", 7)(3, "span", 8);
    \u0275\u0275text(4, "search");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "input", 9);
    \u0275\u0275twoWayListener("ngModelChange", function TemplatesCriarComponent_Conditional_5_Template_input_ngModelChange_5_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.buscaTexto, $event) || (ctx_r0.buscaTexto = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(6, "div", 10)(7, "button", 11);
    \u0275\u0275listener("click", function TemplatesCriarComponent_Conditional_5_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.setFiltro("todos"));
    });
    \u0275\u0275text(8, " Todos ");
    \u0275\u0275elementStart(9, "span", 12);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275repeaterCreate(11, TemplatesCriarComponent_Conditional_5_For_12_Template, 4, 4, "button", 13, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 14)(14, "span", 15);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "span", 16);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "div", 17);
    \u0275\u0275repeaterCreate(19, TemplatesCriarComponent_Conditional_5_For_20_Template, 17, 5, "div", 18, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(21, TemplatesCriarComponent_Conditional_5_Conditional_21_Template, 5, 0, "div", 19);
    \u0275\u0275elementStart(22, "a", 20)(23, "div")(24, "p", 21);
    \u0275\u0275text(25, "Criar modelo em branco");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "p", 22);
    \u0275\u0275text(27, "Comece do zero com total liberdade");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(28, "div", 23)(29, "span", 24);
    \u0275\u0275text(30, "add");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.buscaTexto);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx_r0.filtroAtual === "todos");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.contagemFiltro("todos"));
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.categoryKeys);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.categoryLabels["geral"]);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", ctx_r0.cardsVisiveis.length, " ", ctx_r0.cardsVisiveis.length === 1 ? "modelo" : "modelos");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r0.cardsVisiveis);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.cardsVisiveis.length === 0 ? 21 : -1);
  }
}
function TemplatesCriarComponent_Conditional_6_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 45);
    \u0275\u0275text(1, "Carregando...");
    \u0275\u0275elementEnd();
  }
}
function TemplatesCriarComponent_Conditional_6_Conditional_12_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "label", 50);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 51);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const f_r8 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", f_r8.label, "", f_r8.required ? " *" : "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.previewFieldText(f_r8));
  }
}
function TemplatesCriarComponent_Conditional_6_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 46);
    \u0275\u0275repeaterCreate(1, TemplatesCriarComponent_Conditional_6_Conditional_12_For_2_Template, 5, 3, "div", null, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.previewTemplate.fields);
  }
}
function TemplatesCriarComponent_Conditional_6_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 45);
    \u0275\u0275text(1, "Este modelo n\xE3o possui campos definidos.");
    \u0275\u0275elementEnd();
  }
}
function TemplatesCriarComponent_Conditional_6_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 52);
    \u0275\u0275listener("click", function TemplatesCriarComponent_Conditional_6_Conditional_17_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.usarModelo(ctx_r0.previewTemplate));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("disabled", ctx_r0.usandoModelo);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.usandoModelo ? "Criando\u2026" : "Usar este modelo");
  }
}
function TemplatesCriarComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 37);
    \u0275\u0275listener("click", function TemplatesCriarComponent_Conditional_6_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.fecharPreview());
    });
    \u0275\u0275elementStart(1, "div", 38);
    \u0275\u0275listener("click", function TemplatesCriarComponent_Conditional_6_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r7);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 39)(3, "h2", 40);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 41);
    \u0275\u0275listener("click", function TemplatesCriarComponent_Conditional_6_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.fecharPreview());
    });
    \u0275\u0275elementStart(6, "span", 42);
    \u0275\u0275text(7, "close");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(8, "p", 43);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 44);
    \u0275\u0275conditionalCreate(11, TemplatesCriarComponent_Conditional_6_Conditional_11_Template, 2, 0, "p", 45)(12, TemplatesCriarComponent_Conditional_6_Conditional_12_Template, 3, 0, "div", 46)(13, TemplatesCriarComponent_Conditional_6_Conditional_13_Template, 2, 0, "p", 45);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div", 47)(15, "button", 48);
    \u0275\u0275listener("click", function TemplatesCriarComponent_Conditional_6_Template_button_click_15_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.fecharPreview());
    });
    \u0275\u0275text(16, "Cancelar");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(17, TemplatesCriarComponent_Conditional_6_Conditional_17_Template, 2, 2, "button", 49);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate((ctx_r0.previewTemplate == null ? null : ctx_r0.previewTemplate.name) ?? "Modelo");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate((ctx_r0.previewTemplate == null ? null : ctx_r0.previewTemplate.description) || "");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.previewCarregando ? 11 : (ctx_r0.previewTemplate == null ? null : ctx_r0.previewTemplate.fields == null ? null : ctx_r0.previewTemplate.fields.length) ? 12 : 13);
    \u0275\u0275advance(6);
    \u0275\u0275conditional(ctx_r0.previewTemplate ? 17 : -1);
  }
}
var CATEGORY_LABELS = {
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
var CATEGORY_EMOJI = {
  geral: "\u{1F4C4}",
  clinica_medica: "\u{1FA7A}",
  odontologia: "\u{1F9B7}",
  estetica: "\u2728",
  fisioterapia: "\u{1F4AA}",
  psicologia: "\u{1F9E0}",
  pediatria: "\u{1F476}",
  ginecologia: "\u{1F469}",
  oftalmologia: "\u{1F441}\uFE0F",
  dermatologia: "\u{1F9F4}",
  laboratorio: "\u{1F52C}"
};
var TemplatesCriarComponent = class _TemplatesCriarComponent {
  /** Todos os templates com categoria (modelos) */
  modelos = [];
  showSkeleton;
  listaPronta = false;
  erro = "";
  buscaTexto = "";
  filtroAtual = "todos";
  categoryKeys = [];
  categoryLabels = CATEGORY_LABELS;
  categoryEmoji = CATEGORY_EMOJI;
  /** Modal de pré-visualização */
  previewAberto = false;
  previewTemplate = null;
  previewCarregando = false;
  usandoModelo = false;
  templatesService = inject(TemplatesService);
  loadingService = inject(LoadingService);
  router = inject(Router);
  toast = inject(ToastService);
  ngOnInit() {
    const { data$, showSkeleton } = this.loadingService.loadWithThreshold(this.templatesService.list());
    this.showSkeleton = showSkeleton;
    data$.subscribe({
      next: (list) => {
        this.listaPronta = true;
        this.modelos = list.filter((t) => t.category != null && t.category !== "");
        const keys = [...new Set(this.modelos.map((t) => t.category).filter(Boolean))].sort();
        this.categoryKeys = keys;
      },
      error: () => {
        this.listaPronta = true;
        this.erro = "N\xE3o foi poss\xEDvel carregar os modelos.";
      }
    });
  }
  get cardsVisiveis() {
    const q = this.buscaTexto.trim().toLowerCase();
    return this.modelos.filter((t) => {
      const matchSearch = !q || (t.name ?? "").toLowerCase().includes(q);
      const matchFilter = this.filtroAtual === "todos" || (t.category ?? "") === this.filtroAtual;
      return matchSearch && matchFilter;
    });
  }
  setFiltro(cat) {
    this.filtroAtual = cat;
  }
  abrirPreview(t) {
    this.previewAberto = true;
    this.previewTemplate = null;
    this.previewCarregando = true;
    this.templatesService.get(t.id).subscribe({
      next: (full) => {
        this.previewTemplate = full;
        this.previewCarregando = false;
      },
      error: () => {
        this.previewCarregando = false;
        this.previewTemplate = __spreadProps(__spreadValues({}, t), { fields: [] });
      }
    });
  }
  fecharPreview() {
    this.previewAberto = false;
    this.previewTemplate = null;
  }
  usarModelo(t) {
    if (this.usandoModelo)
      return;
    this.usandoModelo = true;
    this.templatesService.createFromTemplate(t.id).subscribe({
      next: (novo) => {
        this.usandoModelo = false;
        this.fecharPreview();
        this.router.navigate(["/templates", novo.id, "campos"]);
      },
      error: () => {
        this.usandoModelo = false;
        this.toast.error("Erro", "N\xE3o foi poss\xEDvel criar o template a partir do modelo.");
      }
    });
  }
  usarModeloDoCard(t, event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.usandoModelo)
      return;
    this.usandoModelo = true;
    this.templatesService.createFromTemplate(t.id).subscribe({
      next: (novo) => {
        this.usandoModelo = false;
        this.router.navigate(["/templates", novo.id, "campos"]);
      },
      error: () => {
        this.usandoModelo = false;
        this.toast.error("Erro", "N\xE3o foi poss\xEDvel criar o template a partir do modelo.");
      }
    });
  }
  contagemFiltro(cat) {
    if (cat === "todos")
      return this.modelos.length;
    return this.modelos.filter((t) => (t.category ?? "") === cat).length;
  }
  descricaoResumo(t, max = 120) {
    const d = t.description?.trim() ?? "";
    if (!d)
      return "Sem descri\xE7\xE3o.";
    return d.length <= max ? d : d.slice(0, max) + "\u2026";
  }
  /** Texto do campo para pré-visualização */
  previewFieldText(f) {
    const type = (f.type || "text").toLowerCase();
    if (type === "textarea")
      return "...";
    const raw = f.options;
    const opts = Array.isArray(raw) ? raw : raw?.options;
    if ((type === "select" || type === "radio") && opts?.length)
      return opts.join(" \xB7 ");
    if (type === "checkbox")
      return "\u2610";
    if (type === "file")
      return "Escolher arquivo";
    if (type === "signature")
      return "Assinatura";
    if (type === "date")
      return "dd/mm/aaaa";
    if (type === "number")
      return "0";
    return "...";
  }
  static \u0275fac = function TemplatesCriarComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TemplatesCriarComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TemplatesCriarComponent, selectors: [["app-templates-criar"]], decls: 7, vars: 3, consts: [[1, "templates-criar-page", "min-h-full", 2, "background", "var(--c-bg)", "color", "var(--c-text)"], [1, "max-w-5xl", "mx-auto"], [1, "text-sm", "mb-4", 2, "color", "var(--c-error, #dc2626)"], [3, "rows"], [1, "zm-content-enter"], [1, "fixed", "inset-0", "z-50", "flex", "items-center", "justify-center", "p-4", 2, "background", "rgba(0,0,0,0.7)", "backdrop-filter", "blur(4px)"], [1, "mb-4"], [1, "relative", "w-full"], [1, "material-symbols-outlined", "absolute", "left-3", "top-1/2", "-translate-y-1/2", "pointer-events-none", "text-lg", 2, "color", "var(--c-muted)"], ["type", "text", "placeholder", "Buscar modelo...", 1, "w-full", "pl-10", "pr-4", "py-2.5", "rounded-lg", "text-sm", "min-w-0", "border", "font-sans", 2, "background", "var(--c-surface)", "border-color", "var(--c-border)", "color", "var(--c-text)", 3, "ngModelChange", "ngModel"], [1, "flex", "gap-2", "flex-wrap", "mb-6"], ["type", "button", 1, "filter-btn", "text-xs", "font-medium", "px-3", "py-2", "rounded-lg", "border", "transition-all", 3, "click"], [1, "ml-1", "tabular-nums", "filter-count"], ["type", "button", 1, "filter-btn", "text-xs", "font-medium", "px-3", "py-2", "rounded-lg", "border", "transition-all", 3, "active"], [1, "flex", "items-center", "justify-between", "mb-4"], [1, "text-[11px]", "font-semibold", "uppercase", "tracking-wider", 2, "color", "var(--c-muted)"], [1, "text-xs", "tabular-nums", 2, "color", "var(--c-muted)"], [1, "grid", "grid-cols-1", "sm:grid-cols-2", "lg:grid-cols-3", "gap-3"], [1, "card-criar", "rounded-xl", "p-5", "flex", "flex-col", "gap-3", "cursor-pointer", "border", "transition-all", 2, "background", "var(--c-surface)", "border-color", "var(--c-border)"], [1, "text-center", "py-16", 2, "color", "var(--c-muted)"], ["routerLink", "/templates/criar-em-branco", 1, "blank-cta", "mt-6", "border", "border-dashed", "rounded-xl", "p-5", "flex", "items-center", "justify-between", "transition-colors", "no-underline", "block", 2, "border-color", "var(--c-border)", "color", "var(--c-text)"], [1, "text-sm", "font-medium", "transition-colors", 2, "color", "var(--c-muted)"], [1, "text-xs", "mt-0.5", 2, "color", "var(--c-muted)"], [1, "w-8", "h-8", "rounded-full", "border", "flex", "items-center", "justify-center", "transition-all", 2, "border-color", "var(--c-border)", "color", "var(--c-muted)"], [1, "material-symbols-outlined", "text-sm"], [1, "flex", "items-start"], [1, "w-9", "h-9", "rounded-lg", "flex", "items-center", "justify-center", "text-lg", "transition-all", 2, "background", "var(--c-soft)", "color", "var(--c-muted)"], [1, "flex", "items-center", "gap-2", "mb-1"], [1, "text-sm", "font-medium", 2, "color", "var(--c-text)"], [1, "text-xs", "leading-relaxed", 2, "color", "var(--c-muted)"], [1, "flex", "gap-1.5", "flex-wrap"], [1, "card-tag", "px-2", "py-0.5", "rounded-full", "text-[10px]", "font-medium", 2, "background", "var(--c-soft)", "color", "var(--c-muted)", "border", "1px solid var(--c-border)"], [1, "flex", "gap-2", "mt-auto", "pt-1"], ["type", "button", 1, "preview-btn", "flex-1", "text-xs", "py-2", "rounded-lg", "border", "transition-colors", 2, "background", "transparent", "color", "var(--c-muted)", "border-color", "var(--c-border)", 3, "click"], ["type", "button", 1, "use-btn", "flex-1", "text-xs", "py-2", "rounded-lg", "font-medium", "border", "transition-all", 2, "background", "var(--c-primary)", "color", "#fff", "border-color", "var(--c-primary)", 3, "click", "disabled"], [1, "text-4xl", "mb-3"], [1, "text-sm"], [1, "fixed", "inset-0", "z-50", "flex", "items-center", "justify-center", "p-4", 2, "background", "rgba(0,0,0,0.7)", "backdrop-filter", "blur(4px)", 3, "click"], [1, "modal-box", "rounded-2xl", "p-7", "w-full", "max-w-[42rem]", "max-h-[90vh]", "flex", "flex-col", "border", 2, "background", "var(--c-surface)", "border-color", "var(--c-border)", 3, "click"], [1, "flex", "items-center", "justify-between", "mb-4", "shrink-0"], [1, "text-lg", "font-semibold", 2, "color", "var(--c-text)"], ["type", "button", "aria-label", "Fechar", "title", "Fechar preview", 1, "p-1", "rounded-lg", "transition-colors", "hover:bg-[var(--c-soft)]", 2, "color", "var(--c-muted)", 3, "click"], [1, "material-symbols-outlined", "text-xl"], [1, "text-sm", "mb-4", "shrink-0", 2, "color", "var(--c-muted)"], [1, "flex-1", "min-h-0", "overflow-y-auto", "pr-1", "max-h-[50vh]"], [1, "text-sm", 2, "color", "var(--c-muted)"], [1, "space-y-4", "mb-6"], [1, "flex", "gap-3", "shrink-0", "pt-2"], ["type", "button", 1, "flex-1", "text-sm", "py-2.5", "rounded-lg", "font-medium", "border", "transition-colors", 2, "background", "transparent", "color", "var(--c-muted)", "border-color", "var(--c-border)", 3, "click"], ["type", "button", 1, "flex-1", "text-sm", "py-2.5", "rounded-lg", "font-medium", "border", "transition-all", "text-white", 2, "background", "var(--c-primary)", "border-color", "var(--c-primary)", 3, "disabled"], [1, "block", "text-xs", "font-medium", "mb-1", 2, "color", "var(--c-muted)"], [1, "rounded-lg", "border", "py-2", "px-3", "text-sm", "min-h-[2.25rem]", 2, "background", "var(--c-soft)", "border-color", "var(--c-border)", "color", "var(--c-muted)"], ["type", "button", 1, "flex-1", "text-sm", "py-2.5", "rounded-lg", "font-medium", "border", "transition-all", "text-white", 2, "background", "var(--c-primary)", "border-color", "var(--c-primary)", 3, "click", "disabled"]], template: function TemplatesCriarComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1);
      \u0275\u0275conditionalCreate(2, TemplatesCriarComponent_Conditional_2_Template, 2, 1, "p", 2);
      \u0275\u0275conditionalCreate(3, TemplatesCriarComponent_Conditional_3_Template, 1, 1, "zm-skeleton-list", 3)(4, TemplatesCriarComponent_Conditional_4_Template, 0, 0)(5, TemplatesCriarComponent_Conditional_5_Template, 31, 8, "div", 4);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(6, TemplatesCriarComponent_Conditional_6_Template, 18, 4, "div", 5);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.erro ? 2 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showSkeleton() ? 3 : !ctx.listaPronta ? 4 : 5);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.previewAberto ? 6 : -1);
    }
  }, dependencies: [CommonModule, RouterLink, FormsModule, DefaultValueAccessor, NgControlStatus, NgModel, ZmSkeletonListComponent], styles: ["\n\n.templates-criar-page[_ngcontent-%COMP%]   .card-criar[_ngcontent-%COMP%] {\n  transition:\n    border-color 0.2s,\n    transform 0.2s,\n    box-shadow 0.2s;\n}\n.templates-criar-page[_ngcontent-%COMP%]   .card-criar[_ngcontent-%COMP%]:hover {\n  border-color: var(--c-primary);\n  transform: translateY(-2px);\n  box-shadow: 0 8px 32px var(--c-focus);\n}\n.templates-criar-page[_ngcontent-%COMP%]   .card-criar[_ngcontent-%COMP%]:hover   .w-9[_ngcontent-%COMP%] {\n  background: var(--c-focus);\n  color: var(--c-primary);\n}\n.templates-criar-page[_ngcontent-%COMP%]   .card-criar[_ngcontent-%COMP%]   .use-btn[_ngcontent-%COMP%] {\n  opacity: 0;\n}\n.templates-criar-page[_ngcontent-%COMP%]   .card-criar[_ngcontent-%COMP%]:hover   .use-btn[_ngcontent-%COMP%] {\n  opacity: 1;\n}\n.templates-criar-page[_ngcontent-%COMP%]   .filter-btn[_ngcontent-%COMP%] {\n  background: var(--c-surface);\n  border: 1px solid var(--c-border);\n  color: var(--c-muted);\n  cursor: pointer;\n}\n.templates-criar-page[_ngcontent-%COMP%]   .filter-btn[_ngcontent-%COMP%]   .filter-count[_ngcontent-%COMP%] {\n  color: inherit;\n}\n.templates-criar-page[_ngcontent-%COMP%]   .filter-btn[_ngcontent-%COMP%]:hover:not(.active) {\n  border-color: var(--c-primary);\n  color: var(--c-primary);\n  background: var(--c-soft);\n}\n.templates-criar-page[_ngcontent-%COMP%]   .filter-btn.active[_ngcontent-%COMP%] {\n  background: var(--c-primary);\n  border-color: var(--c-primary);\n  color: #fff;\n}\n.templates-criar-page[_ngcontent-%COMP%]   .filter-btn.active[_ngcontent-%COMP%]   .filter-count[_ngcontent-%COMP%] {\n  color: #fff;\n}\n.templates-criar-page[_ngcontent-%COMP%]   .blank-cta[_ngcontent-%COMP%]:hover {\n  border-color: var(--c-primary);\n}\n.templates-criar-page[_ngcontent-%COMP%]   .blank-cta[_ngcontent-%COMP%]:hover   .text-sm.font-medium[_ngcontent-%COMP%] {\n  color: var(--c-text);\n}\n.templates-criar-page[_ngcontent-%COMP%]   .blank-cta[_ngcontent-%COMP%]:hover   .w-8[_ngcontent-%COMP%] {\n  border-color: var(--c-primary);\n  color: var(--c-primary);\n}\n/*# sourceMappingURL=templates-criar.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TemplatesCriarComponent, [{
    type: Component,
    args: [{ selector: "app-templates-criar", standalone: true, imports: [CommonModule, RouterLink, FormsModule, ZmSkeletonListComponent], template: `<div class="templates-criar-page min-h-full" style="background: var(--c-bg); color: var(--c-text)">\r
  <div class="max-w-5xl mx-auto">\r
    <!-- T\xEDtulo + subt\xEDtulo (igual backend: \xEDcone circular, "Novo template", descri\xE7\xE3o) -->\r
    <!-- <div class="flex items-center gap-3 mb-2">\r
      <div class="w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0" style="border-color: var(--c-primary); color: var(--c-primary)">\r
        <span class="material-symbols-outlined text-base">add_circle</span>\r
      </div>\r
      <h1 class="text-xl font-semibold tracking-tight m-0" style="color: var(--c-text)">Novo modelo</h1>\r
    </div>\r
    <p class="text-sm mb-7 ml-11" style="color: var(--c-muted)">Escolha um modelo para come\xE7ar ou crie um template em branco.</p> -->\r
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
      <!-- Busca -->\r
      <div class="mb-4">\r
        <div class="relative w-full">\r
          <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-lg" style="color: var(--c-muted)">search</span>\r
          <input type="text" [(ngModel)]="buscaTexto" placeholder="Buscar modelo..." class="w-full pl-10 pr-4 py-2.5 rounded-lg text-sm min-w-0 border font-sans" style="background: var(--c-surface); border-color: var(--c-border); color: var(--c-text)" />\r
        </div>\r
      </div>\r
\r
      <!-- Filtros: ativo = fundo primary e texto branco (igual backend) -->\r
      <div class="flex gap-2 flex-wrap mb-6">\r
        <button type="button" class="filter-btn text-xs font-medium px-3 py-2 rounded-lg border transition-all" [class.active]="filtroAtual === 'todos'" (click)="setFiltro('todos')">\r
          Todos <span class="ml-1 tabular-nums filter-count">{{ contagemFiltro('todos') }}</span>\r
        </button>\r
        @for (cat of categoryKeys; track cat) {\r
          <button type="button" class="filter-btn text-xs font-medium px-3 py-2 rounded-lg border transition-all" [class.active]="filtroAtual === cat" (click)="setFiltro(cat)">\r
            {{ categoryLabels[cat] }} <span class="ml-1 tabular-nums filter-count">{{ contagemFiltro(cat) }}</span>\r
          </button>\r
        }\r
      </div>\r
\r
      <!-- Section -->\r
      <div class="flex items-center justify-between mb-4">\r
        <span class="text-[11px] font-semibold uppercase tracking-wider" style="color: var(--c-muted)">{{ categoryLabels['geral'] }}</span>\r
        <span class="text-xs tabular-nums" style="color: var(--c-muted)">{{ cardsVisiveis.length }} {{ cardsVisiveis.length === 1 ? 'modelo' : 'modelos' }}</span>\r
      </div>\r
\r
      <!-- Grid de cards -->\r
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">\r
        @for (t of cardsVisiveis; track t.id) {\r
          <div class="card-criar rounded-xl p-5 flex flex-col gap-3 cursor-pointer border transition-all" style="background: var(--c-surface); border-color: var(--c-border)">\r
            <div class="flex items-start">\r
              <div class="w-9 h-9 rounded-lg flex items-center justify-center text-lg transition-all" style="background: var(--c-soft); color: var(--c-muted)">{{ categoryEmoji[t.category || 'geral'] }}</div>\r
            </div>\r
            <div>\r
              <div class="flex items-center gap-2 mb-1">\r
                <span class="text-sm font-medium" style="color: var(--c-text)">{{ t.name }}</span>\r
              </div>\r
              <p class="text-xs leading-relaxed" style="color: var(--c-muted)">{{ descricaoResumo(t) }}</p>\r
            </div>\r
            <div class="flex gap-1.5 flex-wrap">\r
              @if (t.category && categoryLabels[t.category]) {\r
                <span class="card-tag px-2 py-0.5 rounded-full text-[10px] font-medium" style="background: var(--c-soft); color: var(--c-muted); border: 1px solid var(--c-border)">{{ categoryLabels[t.category] }}</span>\r
              }\r
            </div>\r
            <div class="flex gap-2 mt-auto pt-1">\r
              <button type="button" class="preview-btn flex-1 text-xs py-2 rounded-lg border transition-colors" style="background: transparent; color: var(--c-muted); border-color: var(--c-border)" (click)="abrirPreview(t); $event.stopPropagation()">Pr\xE9-visualizar</button>\r
              <button type="button" class="use-btn flex-1 text-xs py-2 rounded-lg font-medium border transition-all" style="background: var(--c-primary); color: #fff; border-color: var(--c-primary)" (click)="usarModeloDoCard(t, $event)" [disabled]="usandoModelo">Usar modelo</button>\r
            </div>\r
          </div>\r
        }\r
      </div>\r
\r
      <!-- Empty state -->\r
      @if (cardsVisiveis.length === 0) {\r
        <div class="text-center py-16" style="color: var(--c-muted)">\r
          <div class="text-4xl mb-3">\u{1F50D}</div>\r
          <p class="text-sm">Nenhum modelo encontrado.</p>\r
        </div>\r
      }\r
\r
      <!-- CTA Criar em branco -->\r
      <a routerLink="/templates/criar-em-branco" class="blank-cta mt-6 border border-dashed rounded-xl p-5 flex items-center justify-between transition-colors no-underline block" style="border-color: var(--c-border); color: var(--c-text)">\r
        <div>\r
          <p class="text-sm font-medium transition-colors" style="color: var(--c-muted)">Criar modelo em branco</p>\r
          <p class="text-xs mt-0.5" style="color: var(--c-muted)">Comece do zero com total liberdade</p>\r
        </div>\r
        <div class="w-8 h-8 rounded-full border flex items-center justify-center transition-all" style="border-color: var(--c-border); color: var(--c-muted)">\r
          <span class="material-symbols-outlined text-sm">add</span>\r
        </div>\r
      </a>\r
      </div>\r
    }\r
\r
  </div>\r
\r
  <!-- Modal Pr\xE9-visualizar -->\r
  @if (previewAberto) {\r
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4" style="background: rgba(0,0,0,0.7); backdrop-filter: blur(4px)" (click)="fecharPreview()">\r
      <div class="modal-box rounded-2xl p-7 w-full max-w-[42rem] max-h-[90vh] flex flex-col border" style="background: var(--c-surface); border-color: var(--c-border)" (click)="$event.stopPropagation()">\r
        <div class="flex items-center justify-between mb-4 shrink-0">\r
          <h2 class="text-lg font-semibold" style="color: var(--c-text)">{{ previewTemplate?.name ?? 'Modelo' }}</h2>\r
          <button type="button" class="p-1 rounded-lg transition-colors hover:bg-[var(--c-soft)]" style="color: var(--c-muted)" (click)="fecharPreview()" aria-label="Fechar" title="Fechar preview">\r
            <span class="material-symbols-outlined text-xl">close</span>\r
          </button>\r
        </div>\r
        <p class="text-sm mb-4 shrink-0" style="color: var(--c-muted)">{{ previewTemplate?.description || '' }}</p>\r
        <div class="flex-1 min-h-0 overflow-y-auto pr-1 max-h-[50vh]">\r
          @if (previewCarregando) {\r
            <p class="text-sm" style="color: var(--c-muted)">Carregando...</p>\r
          } @else if (previewTemplate?.fields?.length) {\r
            <div class="space-y-4 mb-6">\r
              @for (f of previewTemplate!.fields; track f.id) {\r
                <div>\r
                  <label class="block text-xs font-medium mb-1" style="color: var(--c-muted)">{{ f.label }}{{ f.required ? ' *' : '' }}</label>\r
                  <div class="rounded-lg border py-2 px-3 text-sm min-h-[2.25rem]" style="background: var(--c-soft); border-color: var(--c-border); color: var(--c-muted)">{{ previewFieldText(f) }}</div>\r
                </div>\r
              }\r
            </div>\r
          } @else {\r
            <p class="text-sm" style="color: var(--c-muted)">Este modelo n\xE3o possui campos definidos.</p>\r
          }\r
        </div>\r
        <div class="flex gap-3 shrink-0 pt-2">\r
          <button type="button" class="flex-1 text-sm py-2.5 rounded-lg font-medium border transition-colors" style="background: transparent; color: var(--c-muted); border-color: var(--c-border)" (click)="fecharPreview()">Cancelar</button>\r
          @if (previewTemplate) {\r
            <button type="button" class="flex-1 text-sm py-2.5 rounded-lg font-medium border transition-all text-white" style="background: var(--c-primary); border-color: var(--c-primary)" (click)="usarModelo(previewTemplate!)" [disabled]="usandoModelo">{{ usandoModelo ? 'Criando\u2026' : 'Usar este modelo' }}</button>\r
          }\r
        </div>\r
      </div>\r
    </div>\r
  }\r
</div>\r
`, styles: ["/* src/app/paginas/templates/templates-criar.component.css */\n.templates-criar-page .card-criar {\n  transition:\n    border-color 0.2s,\n    transform 0.2s,\n    box-shadow 0.2s;\n}\n.templates-criar-page .card-criar:hover {\n  border-color: var(--c-primary);\n  transform: translateY(-2px);\n  box-shadow: 0 8px 32px var(--c-focus);\n}\n.templates-criar-page .card-criar:hover .w-9 {\n  background: var(--c-focus);\n  color: var(--c-primary);\n}\n.templates-criar-page .card-criar .use-btn {\n  opacity: 0;\n}\n.templates-criar-page .card-criar:hover .use-btn {\n  opacity: 1;\n}\n.templates-criar-page .filter-btn {\n  background: var(--c-surface);\n  border: 1px solid var(--c-border);\n  color: var(--c-muted);\n  cursor: pointer;\n}\n.templates-criar-page .filter-btn .filter-count {\n  color: inherit;\n}\n.templates-criar-page .filter-btn:hover:not(.active) {\n  border-color: var(--c-primary);\n  color: var(--c-primary);\n  background: var(--c-soft);\n}\n.templates-criar-page .filter-btn.active {\n  background: var(--c-primary);\n  border-color: var(--c-primary);\n  color: #fff;\n}\n.templates-criar-page .filter-btn.active .filter-count {\n  color: #fff;\n}\n.templates-criar-page .blank-cta:hover {\n  border-color: var(--c-primary);\n}\n.templates-criar-page .blank-cta:hover .text-sm.font-medium {\n  color: var(--c-text);\n}\n.templates-criar-page .blank-cta:hover .w-8 {\n  border-color: var(--c-primary);\n  color: var(--c-primary);\n}\n/*# sourceMappingURL=templates-criar.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TemplatesCriarComponent, { className: "TemplatesCriarComponent", filePath: "src/app/paginas/templates/templates-criar.component.ts", lineNumber: 46 });
})();
export {
  TemplatesCriarComponent
};
//# sourceMappingURL=chunk-PEU3XTAF.js.map
