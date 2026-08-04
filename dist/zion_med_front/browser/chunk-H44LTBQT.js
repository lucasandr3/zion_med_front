import {
  PessoasService
} from "./chunk-OC6MFLDL.js";
import {
  LoadingService,
  ZmSkeletonCardComponent
} from "./chunk-GKI5AWTV.js";
import "./chunk-7WBHVE2H.js";
import {
  ConfirmDialogService
} from "./chunk-RISAXZFK.js";
import {
  ToastService
} from "./chunk-EZUVP6MG.js";
import {
  AuthService
} from "./chunk-SFRXLDXR.js";
import "./chunk-IBJWGIJV.js";
import {
  ActivatedRoute,
  Router,
  RouterLink
} from "./chunk-C2NWBPZH.js";
import {
  CommonModule,
  Component,
  UpperCasePipe,
  __async,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-GRLISYEV.js";

// src/app/paginas/pessoas/pessoas-detalhe.component.ts
var _c0 = (a0) => ["/pessoas", a0, "editar"];
var _c1 = (a0) => ["/protocolos", a0];
var _forTrack0 = ($index, $item) => $item.id;
function PessoasDetalheComponent_Conditional_1_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 9);
    \u0275\u0275listener("click", function PessoasDetalheComponent_Conditional_1_Conditional_6_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.inativar());
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("disabled", ctx_r1.inativando);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.inativando ? "Inativando\u2026" : "Inativar", " ");
  }
}
function PessoasDetalheComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 1)(1, "div", 5)(2, "a", 6)(3, "span", 7);
    \u0275\u0275text(4, "edit");
    \u0275\u0275elementEnd();
    \u0275\u0275text(5, " Editar ");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(6, PessoasDetalheComponent_Conditional_1_Conditional_6_Template, 2, 2, "button", 8);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(2, _c0, ctx_r1.pessoa.id));
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx_r1.podeInativar && ctx_r1.pessoa.status === "active" ? 6 : -1);
  }
}
function PessoasDetalheComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 2);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.erro);
  }
}
function PessoasDetalheComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 3);
    \u0275\u0275element(1, "zm-skeleton-card", 10)(2, "zm-skeleton-card", 10);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("height", 56);
    \u0275\u0275advance();
    \u0275\u0275property("height", 200);
  }
}
function PessoasDetalheComponent_Conditional_4_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 15);
    \u0275\u0275text(1, "Inativa");
    \u0275\u0275elementEnd();
  }
}
function PessoasDetalheComponent_Conditional_4_Conditional_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 23)(1, "dt", 21);
    \u0275\u0275text(2, "Observa\xE7\xF5es");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "dd", 28);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.pessoa.notes);
  }
}
function PessoasDetalheComponent_Conditional_4_Conditional_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 24)(1, "div", 29)(2, "p", 30);
    \u0275\u0275text(3, "Total");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 31);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 29)(7, "p", 30);
    \u0275\u0275text(8, "Pendentes");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "p", 31);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 29)(12, "p", 30);
    \u0275\u0275text(13, "Aprovados");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "p", 32);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "div", 29)(17, "p", 30);
    \u0275\u0275text(18, "Reprovados");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "p", 33);
    \u0275\u0275text(20);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.pessoa.stats.protocols_count);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.pessoa.stats.pending_protocols);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.pessoa.stats.approved_protocols);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.pessoa.stats.rejected_protocols);
  }
}
function PessoasDetalheComponent_Conditional_4_Conditional_47_For_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 37)(1, "td", 38);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 39);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td", 40);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td", 40);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td", 41)(10, "a", 42);
    \u0275\u0275text(11, "Abrir");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const pr_r3 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(pr_r3.protocol_number || pr_r3.id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(pr_r3.template_name ?? "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.statusProtocolo(pr_r3.status));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.dataFormatada(pr_r3.submitted_at || pr_r3.created_at));
    \u0275\u0275advance(2);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(5, _c1, pr_r3.id));
  }
}
function PessoasDetalheComponent_Conditional_4_Conditional_47_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 26)(1, "thead")(2, "tr", 34)(3, "th", 35);
    \u0275\u0275text(4, "Protocolo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th", 35);
    \u0275\u0275text(6, "Template");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th", 35);
    \u0275\u0275text(8, "Situa\xE7\xE3o");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th", 35);
    \u0275\u0275text(10, "Data");
    \u0275\u0275elementEnd();
    \u0275\u0275element(11, "th", 36);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "tbody");
    \u0275\u0275repeaterCreate(13, PessoasDetalheComponent_Conditional_4_Conditional_47_For_14_Template, 12, 7, "tr", 37, _forTrack0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(13);
    \u0275\u0275repeater(ctx_r1.pessoa.recent_protocols);
  }
}
function PessoasDetalheComponent_Conditional_4_Conditional_48_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 27);
    \u0275\u0275text(1, "Nenhum protocolo ainda.");
    \u0275\u0275elementEnd();
  }
}
function PessoasDetalheComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4)(1, "div", 11)(2, "div", 12);
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "uppercase");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div")(6, "h1", 13);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p", 14);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(10, PessoasDetalheComponent_Conditional_4_Conditional_10_Template, 2, 0, "span", 15);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 16)(12, "div", 17)(13, "span", 18);
    \u0275\u0275text(14, "contact_page");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "h2", 19);
    \u0275\u0275text(16, "Dados da ficha");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "dl", 20)(18, "div")(19, "dt", 21);
    \u0275\u0275text(20, "Telefone");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "dd", 22);
    \u0275\u0275text(22);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "div")(24, "dt", 21);
    \u0275\u0275text(25, "E-mail");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "dd", 22);
    \u0275\u0275text(27);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(28, "div")(29, "dt", 21);
    \u0275\u0275text(30, "Data de nascimento");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "dd", 22);
    \u0275\u0275text(32);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(33, "div")(34, "dt", 21);
    \u0275\u0275text(35, "CPF");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "dd", 22);
    \u0275\u0275text(37);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(38, PessoasDetalheComponent_Conditional_4_Conditional_38_Template, 5, 1, "div", 23);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(39, PessoasDetalheComponent_Conditional_4_Conditional_39_Template, 21, 4, "div", 24);
    \u0275\u0275elementStart(40, "div", 16)(41, "div", 17)(42, "span", 18);
    \u0275\u0275text(43, "inbox");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(44, "h2", 19);
    \u0275\u0275text(45, "Protocolos recentes");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(46, "div", 25);
    \u0275\u0275conditionalCreate(47, PessoasDetalheComponent_Conditional_4_Conditional_47_Template, 15, 0, "table", 26)(48, PessoasDetalheComponent_Conditional_4_Conditional_48_Template, 2, 0, "p", 27);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(4, 11, ctx_r1.pessoa.name.charAt(0)), " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.pessoa.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("C\xF3digo: ", ctx_r1.pessoa.code);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.pessoa.status !== "active" ? 10 : -1);
    \u0275\u0275advance(12);
    \u0275\u0275textInterpolate(ctx_r1.pessoa.phone || "\u2014");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.pessoa.email || "\u2014");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.formatarDataCurta(ctx_r1.pessoa.birth_date));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.pessoa.cpf || "\u2014");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.pessoa.notes ? 38 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.pessoa.stats ? 39 : -1);
    \u0275\u0275advance(8);
    \u0275\u0275conditional(ctx_r1.pessoa.recent_protocols && ctx_r1.pessoa.recent_protocols.length > 0 ? 47 : 48);
  }
}
var PessoasDetalheComponent = class _PessoasDetalheComponent {
  pessoa = null;
  showSkeleton;
  listaPronta = false;
  erro = "";
  inativando = false;
  route = inject(ActivatedRoute);
  router = inject(Router);
  pessoasService = inject(PessoasService);
  loadingService = inject(LoadingService);
  toast = inject(ToastService);
  confirm = inject(ConfirmDialogService);
  auth = inject(AuthService);
  get podeInativar() {
    return this.auth.hasPermission("people.deactivate");
  }
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id");
    if (!id) {
      this.showSkeleton = signal(false).asReadonly();
      this.listaPronta = true;
      this.erro = "ID inv\xE1lido";
      return;
    }
    const { data$, showSkeleton } = this.loadingService.loadWithThreshold(this.pessoasService.get(Number(id)));
    this.showSkeleton = showSkeleton;
    data$.subscribe({
      next: (p) => {
        this.listaPronta = true;
        this.pessoa = p;
      },
      error: () => {
        this.listaPronta = true;
        this.erro = "Pessoa n\xE3o encontrada.";
      }
    });
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
  statusProtocolo(s) {
    const map = { pending: "Pendente", approved: "Aprovado", rejected: "Reprovado" };
    return map[s?.toLowerCase()] ?? s;
  }
  inativar() {
    return __async(this, null, function* () {
      if (!this.pessoa || !this.podeInativar)
        return;
      const ok = yield this.confirm.request({
        title: "Inativar pessoa?",
        message: "A ficha ficar\xE1 inativa. Formul\xE1rios p\xFAblicos com c\xF3digo n\xE3o aceitar\xE3o mais esta pessoa at\xE9 reativar.",
        confirmLabel: "Sim, inativar",
        variant: "danger"
      });
      if (!ok)
        return;
      this.inativando = true;
      this.pessoasService.destroy(this.pessoa.id).subscribe({
        next: () => {
          this.inativando = false;
          this.toast.success("Pessoa inativada", "");
          this.router.navigate(["/pessoas"]);
        },
        error: (err) => {
          this.inativando = false;
          this.toast.error("Erro", err.error?.message ?? "N\xE3o foi poss\xEDvel inativar.");
        }
      });
    });
  }
  static \u0275fac = function PessoasDetalheComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PessoasDetalheComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PessoasDetalheComponent, selectors: [["app-pessoas-detalhe"]], decls: 5, vars: 4, consts: [[1, "pessoa-detalhe", "relative", "min-h-[320px]"], [1, "mb-4", "flex", "flex-wrap", "items-center", "gap-3", "justify-end"], [1, "text-sm", "mb-4", 2, "color", "var(--c-error, #dc2626)"], [1, "space-y-4"], [1, "zm-content-enter", "space-y-6"], [1, "flex", "gap-2"], [1, "btn-ghost", "btn-default-bg", "inline-flex", "items-center", "gap-2", "text-sm", "no-underline", 3, "routerLink"], [1, "material-symbols-outlined", "text-lg"], ["type", "button", 1, "btn-ghost", "btn-default-bg", "inline-flex", "items-center", "gap-2", "text-sm", 2, "color", "var(--c-error, #dc2626)", 3, "disabled"], ["type", "button", 1, "btn-ghost", "btn-default-bg", "inline-flex", "items-center", "gap-2", "text-sm", 2, "color", "var(--c-error, #dc2626)", 3, "click", "disabled"], [3, "height"], [1, "flex", "flex-wrap", "items-start", "gap-4"], [1, "w-12", "h-12", "rounded-xl", "flex", "items-center", "justify-center", "shrink-0", "text-lg", "font-bold", 2, "background", "var(--c-soft)", "color", "var(--c-primary)"], [1, "text-xl", "font-semibold", "m-0", 2, "color", "var(--c-text)"], [1, "text-sm", "m-0", "mt-1", "font-mono", 2, "color", "var(--c-muted)"], [1, "inline-block", "mt-2", "text-xs", "font-medium", "px-2", "py-0.5", "rounded", 2, "background", "var(--c-soft)", "color", "var(--c-muted)"], [1, "card", "rounded-xl", "overflow-hidden", 2, "border", "1px solid var(--c-border)"], [1, "flex", "items-center", "gap-2", "px-5", "py-4", 2, "border-bottom", "1px solid var(--c-border)"], [1, "material-symbols-outlined", 2, "color", "var(--c-primary)"], [1, "text-base", "font-semibold", "m-0", 2, "color", "var(--c-text)"], [1, "grid", "gap-3", "p-5", "text-sm", "md:grid-cols-2"], [1, "font-semibold", "uppercase", "tracking-wider", "mb-0.5", "text-xs", 2, "color", "var(--c-muted)"], [1, "m-0", 2, "color", "var(--c-text)"], [1, "md:col-span-2"], [1, "grid", "grid-cols-2", "md:grid-cols-4", "gap-3"], [1, "overflow-x-auto"], [1, "w-full", "text-sm", "border-collapse"], [1, "p-8", "text-center", "text-sm", "m-0", 2, "color", "var(--c-muted)"], [1, "m-0", "whitespace-pre-wrap", 2, "color", "var(--c-text)"], [1, "card", "rounded-xl", "p-4", 2, "border", "1px solid var(--c-border)"], [1, "text-xs", "m-0", "mb-1", 2, "color", "var(--c-muted)"], [1, "text-2xl", "font-semibold", "m-0", 2, "color", "var(--c-text)"], [1, "text-2xl", "font-semibold", "m-0", 2, "color", "#22c55e"], [1, "text-2xl", "font-semibold", "m-0", 2, "color", "#dc2626"], [2, "border-bottom", "1px solid var(--c-border)"], [1, "text-left", "py-3", "px-4", "font-semibold", 2, "color", "var(--c-text)"], [1, "text-right", "py-3", "px-4", "font-semibold", 2, "color", "var(--c-text)"], [1, "border-b", 2, "border-color", "var(--c-border)"], [1, "py-3", "px-4", "font-medium", 2, "color", "var(--c-text)"], [1, "py-3", "px-4", 2, "color", "var(--c-text)"], [1, "py-3", "px-4", 2, "color", "var(--c-muted)"], [1, "py-3", "px-4", "text-right"], [1, "text-sm", "no-underline", 2, "color", "var(--c-primary)", 3, "routerLink"]], template: function PessoasDetalheComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275conditionalCreate(1, PessoasDetalheComponent_Conditional_1_Template, 7, 4, "div", 1);
      \u0275\u0275conditionalCreate(2, PessoasDetalheComponent_Conditional_2_Template, 2, 1, "p", 2);
      \u0275\u0275conditionalCreate(3, PessoasDetalheComponent_Conditional_3_Template, 3, 2, "div", 3);
      \u0275\u0275conditionalCreate(4, PessoasDetalheComponent_Conditional_4_Template, 49, 13, "div", 4);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.pessoa ? 1 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.erro ? 2 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showSkeleton() && !ctx.pessoa ? 3 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.erro && ctx.pessoa ? 4 : -1);
    }
  }, dependencies: [CommonModule, RouterLink, ZmSkeletonCardComponent, UpperCasePipe], styles: ["\n\n/*# sourceMappingURL=pessoas-detalhe.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PessoasDetalheComponent, [{
    type: Component,
    args: [{ selector: "app-pessoas-detalhe", standalone: true, imports: [CommonModule, RouterLink, ZmSkeletonCardComponent], template: `<div class="pessoa-detalhe relative min-h-[320px]">\r
  @if (pessoa) {\r
    <div class="mb-4 flex flex-wrap items-center gap-3 justify-end">\r
      <div class="flex gap-2">\r
        <a [routerLink]="['/pessoas', pessoa.id, 'editar']" class="btn-ghost btn-default-bg inline-flex items-center gap-2 text-sm no-underline">\r
          <span class="material-symbols-outlined text-lg">edit</span>\r
          Editar\r
        </a>\r
        @if (podeInativar && pessoa.status === 'active') {\r
          <button type="button" class="btn-ghost btn-default-bg inline-flex items-center gap-2 text-sm" style="color: var(--c-error, #dc2626)" (click)="inativar()" [disabled]="inativando">\r
            {{ inativando ? 'Inativando\u2026' : 'Inativar' }}\r
          </button>\r
        }\r
      </div>\r
    </div>\r
  }\r
\r
  @if (erro) {\r
    <p class="text-sm mb-4" style="color: var(--c-error, #dc2626)">{{ erro }}</p>\r
  }\r
\r
  @if (showSkeleton() && !pessoa) {\r
    <div class="space-y-4">\r
      <zm-skeleton-card [height]="56" />\r
      <zm-skeleton-card [height]="200" />\r
    </div>\r
  }\r
\r
  @if (!erro && pessoa) {\r
    <div class="zm-content-enter space-y-6">\r
      <div class="flex flex-wrap items-start gap-4">\r
        <div class="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 text-lg font-bold" style="background: var(--c-soft); color: var(--c-primary)">\r
          {{ pessoa.name.charAt(0) | uppercase }}\r
        </div>\r
        <div>\r
          <h1 class="text-xl font-semibold m-0" style="color: var(--c-text)">{{ pessoa.name }}</h1>\r
          <p class="text-sm m-0 mt-1 font-mono" style="color: var(--c-muted)">C\xF3digo: {{ pessoa.code }}</p>\r
          @if (pessoa.status !== 'active') {\r
            <span class="inline-block mt-2 text-xs font-medium px-2 py-0.5 rounded" style="background: var(--c-soft); color: var(--c-muted)">Inativa</span>\r
          }\r
        </div>\r
      </div>\r
\r
      <div class="card rounded-xl overflow-hidden" style="border: 1px solid var(--c-border)">\r
        <div class="flex items-center gap-2 px-5 py-4" style="border-bottom: 1px solid var(--c-border)">\r
          <span class="material-symbols-outlined" style="color: var(--c-primary)">contact_page</span>\r
          <h2 class="text-base font-semibold m-0" style="color: var(--c-text)">Dados da ficha</h2>\r
        </div>\r
        <dl class="grid gap-3 p-5 text-sm md:grid-cols-2">\r
          <div>\r
            <dt class="font-semibold uppercase tracking-wider mb-0.5 text-xs" style="color: var(--c-muted)">Telefone</dt>\r
            <dd class="m-0" style="color: var(--c-text)">{{ pessoa.phone || '\u2014' }}</dd>\r
          </div>\r
          <div>\r
            <dt class="font-semibold uppercase tracking-wider mb-0.5 text-xs" style="color: var(--c-muted)">E-mail</dt>\r
            <dd class="m-0" style="color: var(--c-text)">{{ pessoa.email || '\u2014' }}</dd>\r
          </div>\r
          <div>\r
            <dt class="font-semibold uppercase tracking-wider mb-0.5 text-xs" style="color: var(--c-muted)">Data de nascimento</dt>\r
            <dd class="m-0" style="color: var(--c-text)">{{ formatarDataCurta(pessoa.birth_date) }}</dd>\r
          </div>\r
          <div>\r
            <dt class="font-semibold uppercase tracking-wider mb-0.5 text-xs" style="color: var(--c-muted)">CPF</dt>\r
            <dd class="m-0" style="color: var(--c-text)">{{ pessoa.cpf || '\u2014' }}</dd>\r
          </div>\r
          @if (pessoa.notes) {\r
            <div class="md:col-span-2">\r
              <dt class="font-semibold uppercase tracking-wider mb-0.5 text-xs" style="color: var(--c-muted)">Observa\xE7\xF5es</dt>\r
              <dd class="m-0 whitespace-pre-wrap" style="color: var(--c-text)">{{ pessoa.notes }}</dd>\r
            </div>\r
          }\r
        </dl>\r
      </div>\r
\r
      @if (pessoa.stats) {\r
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">\r
          <div class="card rounded-xl p-4" style="border: 1px solid var(--c-border)">\r
            <p class="text-xs m-0 mb-1" style="color: var(--c-muted)">Total</p>\r
            <p class="text-2xl font-semibold m-0" style="color: var(--c-text)">{{ pessoa.stats.protocols_count }}</p>\r
          </div>\r
          <div class="card rounded-xl p-4" style="border: 1px solid var(--c-border)">\r
            <p class="text-xs m-0 mb-1" style="color: var(--c-muted)">Pendentes</p>\r
            <p class="text-2xl font-semibold m-0" style="color: var(--c-text)">{{ pessoa.stats.pending_protocols }}</p>\r
          </div>\r
          <div class="card rounded-xl p-4" style="border: 1px solid var(--c-border)">\r
            <p class="text-xs m-0 mb-1" style="color: var(--c-muted)">Aprovados</p>\r
            <p class="text-2xl font-semibold m-0" style="color: #22c55e">{{ pessoa.stats.approved_protocols }}</p>\r
          </div>\r
          <div class="card rounded-xl p-4" style="border: 1px solid var(--c-border)">\r
            <p class="text-xs m-0 mb-1" style="color: var(--c-muted)">Reprovados</p>\r
            <p class="text-2xl font-semibold m-0" style="color: #dc2626">{{ pessoa.stats.rejected_protocols }}</p>\r
          </div>\r
        </div>\r
      }\r
\r
      <div class="card rounded-xl overflow-hidden" style="border: 1px solid var(--c-border)">\r
        <div class="flex items-center gap-2 px-5 py-4" style="border-bottom: 1px solid var(--c-border)">\r
          <span class="material-symbols-outlined" style="color: var(--c-primary)">inbox</span>\r
          <h2 class="text-base font-semibold m-0" style="color: var(--c-text)">Protocolos recentes</h2>\r
        </div>\r
        <div class="overflow-x-auto">\r
          @if (pessoa.recent_protocols && pessoa.recent_protocols.length > 0) {\r
            <table class="w-full text-sm border-collapse">\r
              <thead>\r
                <tr style="border-bottom: 1px solid var(--c-border)">\r
                  <th class="text-left py-3 px-4 font-semibold" style="color: var(--c-text)">Protocolo</th>\r
                  <th class="text-left py-3 px-4 font-semibold" style="color: var(--c-text)">Template</th>\r
                  <th class="text-left py-3 px-4 font-semibold" style="color: var(--c-text)">Situa\xE7\xE3o</th>\r
                  <th class="text-left py-3 px-4 font-semibold" style="color: var(--c-text)">Data</th>\r
                  <th class="text-right py-3 px-4 font-semibold" style="color: var(--c-text)"></th>\r
                </tr>\r
              </thead>\r
              <tbody>\r
                @for (pr of pessoa.recent_protocols; track pr.id) {\r
                  <tr class="border-b" style="border-color: var(--c-border)">\r
                    <td class="py-3 px-4 font-medium" style="color: var(--c-text)">{{ pr.protocol_number || pr.id }}</td>\r
                    <td class="py-3 px-4" style="color: var(--c-text)">{{ pr.template_name ?? '\u2014' }}</td>\r
                    <td class="py-3 px-4" style="color: var(--c-muted)">{{ statusProtocolo(pr.status) }}</td>\r
                    <td class="py-3 px-4" style="color: var(--c-muted)">{{ dataFormatada(pr.submitted_at || pr.created_at) }}</td>\r
                    <td class="py-3 px-4 text-right">\r
                      <a [routerLink]="['/protocolos', pr.id]" class="text-sm no-underline" style="color: var(--c-primary)">Abrir</a>\r
                    </td>\r
                  </tr>\r
                }\r
              </tbody>\r
            </table>\r
          } @else {\r
            <p class="p-8 text-center text-sm m-0" style="color: var(--c-muted)">Nenhum protocolo ainda.</p>\r
          }\r
        </div>\r
      </div>\r
    </div>\r
  }\r
</div>\r
`, styles: ["/* src/app/paginas/pessoas/pessoas-detalhe.component.css */\n/*# sourceMappingURL=pessoas-detalhe.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PessoasDetalheComponent, { className: "PessoasDetalheComponent", filePath: "src/app/paginas/pessoas/pessoas-detalhe.component.ts", lineNumber: 18 });
})();
export {
  PessoasDetalheComponent
};
//# sourceMappingURL=chunk-H44LTBQT.js.map
