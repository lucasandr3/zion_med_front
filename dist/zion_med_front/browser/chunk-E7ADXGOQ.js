import {
  PessoasService
} from "./chunk-OC6MFLDL.js";
import {
  LoadingService,
  ZmSkeletonCardComponent
} from "./chunk-GKI5AWTV.js";
import "./chunk-7WBHVE2H.js";
import {
  FlatpickrDirective,
  provideFlatpickrDefaults,
  require_pt
} from "./chunk-C34MPJIL.js";
import {
  ToastService
} from "./chunk-EZUVP6MG.js";
import {
  DefaultValueAccessor,
  FormsModule,
  MaxLengthValidator,
  NgControlStatus,
  NgControlStatusGroup,
  NgForm,
  NgModel,
  NgSelectOption,
  RequiredValidator,
  SelectControlValueAccessor,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption
} from "./chunk-USROZ7PW.js";
import "./chunk-IBJWGIJV.js";
import {
  ActivatedRoute,
  Router,
  RouterLink
} from "./chunk-C2NWBPZH.js";
import {
  CommonModule,
  Component,
  __toESM,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵProvidersFeature,
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
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-GRLISYEV.js";

// src/app/paginas/pessoas/pessoas-formulario.component.ts
var import_pt = __toESM(require_pt());
var _c0 = (a0) => ["/pessoas", a0];
function PessoasFormularioComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "zm-skeleton-card", 6);
  }
  if (rf & 2) {
    \u0275\u0275property("height", 360);
  }
}
function PessoasFormularioComponent_Conditional_12_Template(rf, ctx) {
}
function PessoasFormularioComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 7);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.erro);
  }
}
function PessoasFormularioComponent_Conditional_14_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 7);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.erro);
  }
}
function PessoasFormularioComponent_Conditional_14_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div")(1, "label", 11);
    \u0275\u0275text(2, "Situa\xE7\xE3o");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "select", 23);
    \u0275\u0275twoWayListener("ngModelChange", function PessoasFormularioComponent_Conditional_14_Conditional_28_Template_select_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.status, $event) || (ctx_r0.status = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(4, "option", 24);
    \u0275\u0275text(5, "Ativa");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "option", 25);
    \u0275\u0275text(7, "Inativa");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.status);
  }
}
function PessoasFormularioComponent_Conditional_14_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 26);
    \u0275\u0275text(1, " Salvando\u2026 ");
  }
}
function PessoasFormularioComponent_Conditional_14_Conditional_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 27);
    \u0275\u0275text(1, "save");
    \u0275\u0275elementEnd();
    \u0275\u0275text(2);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.editMode ? "Salvar altera\xE7\xF5es" : "Cadastrar", " ");
  }
}
function PessoasFormularioComponent_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 8)(1, "div", 9);
    \u0275\u0275conditionalCreate(2, PessoasFormularioComponent_Conditional_14_Conditional_2_Template, 2, 1, "p", 7);
    \u0275\u0275elementStart(3, "form", 10);
    \u0275\u0275listener("ngSubmit", function PessoasFormularioComponent_Conditional_14_Template_form_ngSubmit_3_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.salvar());
    });
    \u0275\u0275elementStart(4, "div")(5, "label", 11);
    \u0275\u0275text(6, "Nome completo *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "input", 12);
    \u0275\u0275twoWayListener("ngModelChange", function PessoasFormularioComponent_Conditional_14_Template_input_ngModelChange_7_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.name, $event) || (ctx_r0.name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 13)(9, "div")(10, "label", 11);
    \u0275\u0275text(11, "Telefone / WhatsApp");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "input", 14);
    \u0275\u0275listener("ngModelChange", function PessoasFormularioComponent_Conditional_14_Template_input_ngModelChange_12_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onPhoneModelChange($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "div")(14, "label", 11);
    \u0275\u0275text(15, "E-mail");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "input", 15);
    \u0275\u0275twoWayListener("ngModelChange", function PessoasFormularioComponent_Conditional_14_Template_input_ngModelChange_16_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.email, $event) || (ctx_r0.email = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(17, "div", 13)(18, "div")(19, "label", 11);
    \u0275\u0275text(20, "Data de nascimento");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "input", 16);
    \u0275\u0275twoWayListener("ngModelChange", function PessoasFormularioComponent_Conditional_14_Template_input_ngModelChange_21_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.birth_date, $event) || (ctx_r0.birth_date = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "p", 17);
    \u0275\u0275text(23, "Necess\xE1ria para validar o c\xF3digo em formul\xE1rios de acompanhamento.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "div")(25, "label", 11);
    \u0275\u0275text(26, "CPF");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "input", 18);
    \u0275\u0275listener("ngModelChange", function PessoasFormularioComponent_Conditional_14_Template_input_ngModelChange_27_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onCpfModelChange($event));
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(28, PessoasFormularioComponent_Conditional_14_Conditional_28_Template, 8, 1, "div");
    \u0275\u0275elementStart(29, "div")(30, "label", 11);
    \u0275\u0275text(31, "Observa\xE7\xF5es");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "textarea", 19);
    \u0275\u0275twoWayListener("ngModelChange", function PessoasFormularioComponent_Conditional_14_Template_textarea_ngModelChange_32_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.notes, $event) || (ctx_r0.notes = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(33, "div", 20)(34, "button", 21);
    \u0275\u0275conditionalCreate(35, PessoasFormularioComponent_Conditional_14_Conditional_35_Template, 2, 0)(36, PessoasFormularioComponent_Conditional_14_Conditional_36_Template, 3, 1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "a", 22);
    \u0275\u0275text(38, "Cancelar");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.erro && !ctx_r0.editMode ? 2 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.name);
    \u0275\u0275advance(5);
    \u0275\u0275property("ngModel", ctx_r0.phoneDisplay);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.email);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.birth_date);
    \u0275\u0275property("altInput", true)("convertModelValue", true);
    \u0275\u0275advance(6);
    \u0275\u0275property("ngModel", ctx_r0.cpfDisplay);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.editMode ? 28 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.notes);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r0.salvando || !ctx_r0.name.trim());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.salvando ? 35 : 36);
    \u0275\u0275advance(2);
    \u0275\u0275property("routerLink", ctx_r0.editMode && ctx_r0.pessoaId ? \u0275\u0275pureFunction1(13, _c0, ctx_r0.pessoaId) : "/pessoas");
  }
}
function formatPhoneBrDisplay(digits) {
  if (!digits)
    return "";
  if (digits.startsWith("55") && digits.length > 2) {
    const r = digits.slice(2);
    if (r.length <= 2)
      return `+55 (${r}`;
    if (r.length <= 6)
      return `+55 (${r.slice(0, 2)}) ${r.slice(2)}`;
    if (r.length <= 10)
      return `+55 (${r.slice(0, 2)}) ${r.slice(2, 6)}-${r.slice(6)}`;
    return `+55 (${r.slice(0, 2)}) ${r.slice(2, 7)}-${r.slice(7, 11)}`;
  }
  if (digits.length <= 2)
    return `(${digits}`;
  if (digits.length <= 6)
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10)
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
}
function digitsOnlyPhone(raw) {
  return raw.replace(/\D/g, "").slice(0, 13);
}
function digitsOnlyCpf(raw) {
  return raw.replace(/\D/g, "").slice(0, 11);
}
function formatCpfDisplay(digits) {
  if (!digits)
    return "";
  if (digits.length <= 3)
    return digits;
  if (digits.length <= 6)
    return `${digits.slice(0, 3)}.${digits.slice(3)}`;
  if (digits.length <= 9)
    return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9, 11)}`;
}
var PessoasFormularioComponent = class _PessoasFormularioComponent {
  editMode = false;
  pessoaId = null;
  name = "";
  /** Dígitos apenas (55 + DDD + número, até 13). */
  phoneDigits = "";
  /** Valor exibido com máscara (sincronizado com phoneDigits). */
  phoneDisplay = "";
  email = "";
  /** Data: string Y-m-d ou Date (Flatpickr com convertModelValue). */
  birth_date = "";
  /** Apenas dígitos do CPF (até 11). */
  cpfDigits = "";
  cpfDisplay = "";
  notes = "";
  status = "active";
  showSkeleton;
  listaPronta = false;
  salvando = false;
  erro = "";
  route = inject(ActivatedRoute);
  router = inject(Router);
  pessoasService = inject(PessoasService);
  loadingService = inject(LoadingService);
  toast = inject(ToastService);
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id");
    if (id) {
      this.editMode = true;
      this.pessoaId = Number(id);
      const { data$, showSkeleton } = this.loadingService.loadWithThreshold(this.pessoasService.get(this.pessoaId));
      this.showSkeleton = showSkeleton;
      data$.subscribe({
        next: (p) => {
          this.listaPronta = true;
          this.name = p.name ?? "";
          this.phoneDigits = digitsOnlyPhone(p.phone ?? "");
          this.phoneDisplay = formatPhoneBrDisplay(this.phoneDigits);
          this.email = p.email ?? "";
          this.birth_date = p.birth_date ? p.birth_date : "";
          this.cpfDigits = digitsOnlyCpf(p.cpf ?? "");
          this.cpfDisplay = formatCpfDisplay(this.cpfDigits);
          this.notes = p.notes ?? "";
          this.status = p.status === "inactive" ? "inactive" : "active";
        },
        error: () => {
          this.listaPronta = true;
          this.erro = "Pessoa n\xE3o encontrada.";
        }
      });
    } else {
      this.showSkeleton = signal(false).asReadonly();
      this.listaPronta = true;
    }
  }
  onPhoneModelChange(raw) {
    const d = digitsOnlyPhone(raw);
    this.phoneDigits = d;
    this.phoneDisplay = formatPhoneBrDisplay(d);
  }
  onCpfModelChange(raw) {
    const d = digitsOnlyCpf(raw);
    this.cpfDigits = d;
    this.cpfDisplay = formatCpfDisplay(d);
  }
  /** API: só dígitos ou null (backend costuma normalizar). */
  cpfForApi() {
    return this.cpfDigits ? this.cpfDigits : null;
  }
  /** Envia telefone no padrão WhatsApp quando possível (55…). */
  phoneForApi() {
    if (!this.phoneDigits)
      return null;
    let d = this.phoneDigits;
    if (d.length >= 10 && d.length <= 11 && !d.startsWith("55")) {
      d = "55" + d;
    }
    return d;
  }
  serializeBirthDate() {
    const v = this.birth_date;
    if (v == null || v === "")
      return null;
    if (v instanceof Date) {
      if (isNaN(v.getTime()))
        return null;
      const y = v.getFullYear();
      const m = String(v.getMonth() + 1).padStart(2, "0");
      const d = String(v.getDate()).padStart(2, "0");
      return `${y}-${m}-${d}`;
    }
    const s = String(v).trim();
    return s || null;
  }
  salvar() {
    if (!this.name.trim())
      return;
    this.salvando = true;
    this.erro = "";
    const body = {
      name: this.name.trim(),
      phone: this.phoneForApi(),
      email: this.email.trim() || null,
      birth_date: this.serializeBirthDate(),
      cpf: this.cpfForApi(),
      notes: this.notes.trim() || null,
      status: this.status
    };
    if (this.editMode && this.pessoaId != null) {
      this.pessoasService.update(this.pessoaId, body).subscribe({
        next: () => {
          this.salvando = false;
          this.toast.success("Pessoa salva", "");
          this.router.navigate(["/pessoas", this.pessoaId]);
        },
        error: (err) => {
          this.salvando = false;
          this.erro = err.error?.message ?? "N\xE3o foi poss\xEDvel salvar.";
          this.toast.error("Erro", this.erro);
        }
      });
    } else {
      this.pessoasService.create(body).subscribe({
        next: (p) => {
          this.salvando = false;
          this.toast.success("Pessoa cadastrada", `C\xF3digo: ${p.code}`);
          this.router.navigate(["/pessoas", p.id]);
        },
        error: (err) => {
          this.salvando = false;
          this.erro = err.error?.message ?? "N\xE3o foi poss\xEDvel cadastrar.";
          this.toast.error("Erro", this.erro);
        }
      });
    }
  }
  static \u0275fac = function PessoasFormularioComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PessoasFormularioComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PessoasFormularioComponent, selectors: [["app-pessoas-formulario"]], features: [\u0275\u0275ProvidersFeature([
    provideFlatpickrDefaults({
      locale: import_pt.Portuguese,
      dateFormat: "Y-m-d",
      altInput: true,
      altFormat: "d/m/Y",
      allowInput: true,
      disableMobile: true,
      static: true
    })
  ])], decls: 15, vars: 3, consts: [[1, "relative", "min-h-[200px]"], [1, "page-header", "mb-5"], [1, "page-title"], [1, "page-title-icon"], [1, "material-symbols-outlined"], [1, "page-header-subtitle", "text-sm", "m-0", "mt-1", 2, "color", "var(--c-muted)"], [3, "height"], [1, "text-sm", "mb-4", 2, "color", "var(--c-error, #dc2626)"], [1, "zm-content-enter"], [1, "card"], [1, "flex", "flex-col", "gap-5", 3, "ngSubmit"], [1, "form-label"], ["type", "text", "name", "name", "required", "", "placeholder", "Ex.: Maria da Silva", "autocomplete", "name", 1, "form-input", 3, "ngModelChange", "ngModel"], [1, "grid", "md:grid-cols-2", "gap-4"], ["type", "tel", "inputmode", "numeric", "autocomplete", "tel-national", "name", "phone", "placeholder", "(11) 98765-4321", 1, "form-input", 3, "ngModelChange", "ngModel"], ["type", "email", "name", "email", "placeholder", "nome@exemplo.com", "autocomplete", "email", 1, "form-input", 3, "ngModelChange", "ngModel"], ["type", "text", "mwlFlatpickr", "", "name", "birth_date", "placeholder", "dd/mm/aaaa", "autocomplete", "bday", 1, "form-input", "pf-fp-input", 3, "ngModelChange", "ngModel", "altInput", "convertModelValue"], [1, "text-xs", "m-0", "mt-1", 2, "color", "var(--c-muted)"], ["type", "text", "inputmode", "numeric", "autocomplete", "off", "name", "cpf", "placeholder", "000.000.000-00", "maxlength", "14", 1, "form-input", 3, "ngModelChange", "ngModel"], ["name", "notes", "rows", "3", "placeholder", "Anota\xE7\xF5es internas (opcional)", 1, "form-input", 3, "ngModelChange", "ngModel"], [1, "flex", "items-center", "gap-3", "pt-2"], ["type", "submit", 1, "btn-primary", 3, "disabled"], [1, "text-sm", "no-underline", 2, "color", "var(--c-muted)", 3, "routerLink"], ["name", "status", 1, "form-input", 3, "ngModelChange", "ngModel"], ["value", "active"], ["value", "inactive"], ["aria-hidden", "true", 1, "btn-spinner"], [1, "material-symbols-outlined", "text-base"]], template: function PessoasFormularioComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "span", 4);
      \u0275\u0275text(5);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "div")(7, "h1");
      \u0275\u0275text(8);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "p", 5);
      \u0275\u0275text(10, " O c\xF3digo de acesso (ex.: P-000001) \xE9 gerado automaticamente ao salvar. ");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275conditionalCreate(11, PessoasFormularioComponent_Conditional_11_Template, 1, 1, "zm-skeleton-card", 6)(12, PessoasFormularioComponent_Conditional_12_Template, 0, 0)(13, PessoasFormularioComponent_Conditional_13_Template, 2, 1, "p", 7)(14, PessoasFormularioComponent_Conditional_14_Template, 39, 15, "div", 8);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.editMode ? "edit_note" : "person_add");
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.editMode ? "Editar pessoa" : "Nova pessoa");
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.showSkeleton() && ctx.editMode ? 11 : !ctx.listaPronta ? 12 : ctx.erro && ctx.editMode ? 13 : 14);
    }
  }, dependencies: [CommonModule, RouterLink, FormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, MaxLengthValidator, NgModel, NgForm, ZmSkeletonCardComponent, FlatpickrDirective], styles: ["\n\n/*# sourceMappingURL=pessoas-formulario.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PessoasFormularioComponent, [{
    type: Component,
    args: [{ selector: "app-pessoas-formulario", standalone: true, imports: [CommonModule, RouterLink, FormsModule, ZmSkeletonCardComponent, FlatpickrDirective], providers: [
      provideFlatpickrDefaults({
        locale: import_pt.Portuguese,
        dateFormat: "Y-m-d",
        altInput: true,
        altFormat: "d/m/Y",
        allowInput: true,
        disableMobile: true,
        static: true
      })
    ], template: `<div class="relative min-h-[200px]">\r
  <div class="page-header mb-5">\r
    <div class="page-title">\r
      <div class="page-title-icon">\r
        <span class="material-symbols-outlined">{{ editMode ? 'edit_note' : 'person_add' }}</span>\r
      </div>\r
      <div>\r
        <h1>{{ editMode ? 'Editar pessoa' : 'Nova pessoa' }}</h1>\r
        <p class="page-header-subtitle text-sm m-0 mt-1" style="color: var(--c-muted)">\r
          O c\xF3digo de acesso (ex.: P-000001) \xE9 gerado automaticamente ao salvar.\r
        </p>\r
      </div>\r
    </div>\r
  </div>\r
\r
  @if (showSkeleton() && editMode) {\r
    <zm-skeleton-card [height]="360" />\r
  } @else if (!listaPronta) {\r
  } @else if (erro && editMode) {\r
    <p class="text-sm mb-4" style="color: var(--c-error, #dc2626)">{{ erro }}</p>\r
  } @else {\r
    <div class="zm-content-enter">\r
      <div class="card">\r
        @if (erro && !editMode) {\r
          <p class="text-sm mb-4" style="color: var(--c-error, #dc2626)">{{ erro }}</p>\r
        }\r
        <form (ngSubmit)="salvar()" class="flex flex-col gap-5">\r
          <div>\r
            <label class="form-label">Nome completo *</label>\r
            <input\r
              type="text"\r
              [(ngModel)]="name"\r
              name="name"\r
              required\r
              class="form-input"\r
              placeholder="Ex.: Maria da Silva"\r
              autocomplete="name"\r
            />\r
          </div>\r
          <div class="grid md:grid-cols-2 gap-4">\r
            <div>\r
              <label class="form-label">Telefone / WhatsApp</label>\r
              <input\r
                type="tel"\r
                inputmode="numeric"\r
                autocomplete="tel-national"\r
                class="form-input"\r
                [ngModel]="phoneDisplay"\r
                (ngModelChange)="onPhoneModelChange($event)"\r
                name="phone"\r
                placeholder="(11) 98765-4321"\r
              />\r
            </div>\r
            <div>\r
              <label class="form-label">E-mail</label>\r
              <input\r
                type="email"\r
                [(ngModel)]="email"\r
                name="email"\r
                class="form-input"\r
                placeholder="nome@exemplo.com"\r
                autocomplete="email"\r
              />\r
            </div>\r
          </div>\r
          <div class="grid md:grid-cols-2 gap-4">\r
            <div>\r
              <label class="form-label">Data de nascimento</label>\r
              <input\r
                type="text"\r
                mwlFlatpickr\r
                [(ngModel)]="birth_date"\r
                name="birth_date"\r
                class="form-input pf-fp-input"\r
                placeholder="dd/mm/aaaa"\r
                [altInput]="true"\r
                [convertModelValue]="true"\r
                autocomplete="bday"\r
              />\r
              <p class="text-xs m-0 mt-1" style="color: var(--c-muted)">Necess\xE1ria para validar o c\xF3digo em formul\xE1rios de acompanhamento.</p>\r
            </div>\r
            <div>\r
              <label class="form-label">CPF</label>\r
              <input\r
                type="text"\r
                inputmode="numeric"\r
                autocomplete="off"\r
                class="form-input"\r
                name="cpf"\r
                placeholder="000.000.000-00"\r
                maxlength="14"\r
                [ngModel]="cpfDisplay"\r
                (ngModelChange)="onCpfModelChange($event)"\r
              />\r
            </div>\r
          </div>\r
          @if (editMode) {\r
            <div>\r
              <label class="form-label">Situa\xE7\xE3o</label>\r
              <select [(ngModel)]="status" name="status" class="form-input">\r
                <option value="active">Ativa</option>\r
                <option value="inactive">Inativa</option>\r
              </select>\r
            </div>\r
          }\r
          <div>\r
            <label class="form-label">Observa\xE7\xF5es</label>\r
            <textarea\r
              [(ngModel)]="notes"\r
              name="notes"\r
              rows="3"\r
              class="form-input"\r
              placeholder="Anota\xE7\xF5es internas (opcional)"\r
            ></textarea>\r
          </div>\r
          <div class="flex items-center gap-3 pt-2">\r
            <button type="submit" class="btn-primary" [disabled]="salvando || !name.trim()">\r
              @if (salvando) {\r
                <span class="btn-spinner" aria-hidden="true"></span>\r
                Salvando\u2026\r
              } @else {\r
                <span class="material-symbols-outlined text-base">save</span>\r
                {{ editMode ? 'Salvar altera\xE7\xF5es' : 'Cadastrar' }}\r
              }\r
            </button>\r
            <a [routerLink]="editMode && pessoaId ? ['/pessoas', pessoaId] : '/pessoas'" class="text-sm no-underline" style="color: var(--c-muted)">Cancelar</a>\r
          </div>\r
        </form>\r
      </div>\r
    </div>\r
  }\r
</div>\r
`, styles: ["/* src/app/paginas/pessoas/pessoas-formulario.component.css */\n/*# sourceMappingURL=pessoas-formulario.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PessoasFormularioComponent, { className: "PessoasFormularioComponent", filePath: "src/app/paginas/pessoas/pessoas-formulario.component.ts", lineNumber: 63 });
})();
export {
  PessoasFormularioComponent
};
//# sourceMappingURL=chunk-E7ADXGOQ.js.map
