import {
  PlataformaHeaderService
} from "./chunk-Y5AJ4MLH.js";
import {
  PlataformaService
} from "./chunk-YNOSNX2Z.js";
import {
  LoadingService,
  ZmSkeletonCardComponent
} from "./chunk-GKI5AWTV.js";
import "./chunk-7WBHVE2H.js";
import {
  ToastService
} from "./chunk-EZUVP6MG.js";
import {
  CheckboxControlValueAccessor,
  DefaultValueAccessor,
  FormsModule,
  MaxLengthValidator,
  MinValidator,
  NgControlStatus,
  NgControlStatusGroup,
  NgForm,
  NgModel,
  NumberValueAccessor,
  PatternValidator,
  RequiredValidator,
  ɵNgNoValidate
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
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-GRLISYEV.js";

// src/app/paginas/plataforma/plataforma-plano-form/plataforma-plano-form.component.ts
function PlataformaPlanoFormComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "zm-skeleton-card", 1);
  }
  if (rf & 2) {
    \u0275\u0275property("height", 320);
  }
}
function PlataformaPlanoFormComponent_Conditional_2_Template(rf, ctx) {
}
function PlataformaPlanoFormComponent_Conditional_3_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 4);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.error);
  }
}
function PlataformaPlanoFormComponent_Conditional_3_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 7);
    \u0275\u0275text(1, "A chave n\xE3o pode ser alterada ap\xF3s cria\xE7\xE3o.");
    \u0275\u0275elementEnd();
  }
}
function PlataformaPlanoFormComponent_Conditional_3_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 21);
  }
}
function PlataformaPlanoFormComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 2)(1, "form", 3);
    \u0275\u0275listener("ngSubmit", function PlataformaPlanoFormComponent_Conditional_3_Template_form_ngSubmit_1_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.submit());
    });
    \u0275\u0275conditionalCreate(2, PlataformaPlanoFormComponent_Conditional_3_Conditional_2_Template, 2, 1, "p", 4);
    \u0275\u0275elementStart(3, "div")(4, "label", 5);
    \u0275\u0275text(5, "Chave (\xFAnica, ex: core, enterprise)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "input", 6);
    \u0275\u0275twoWayListener("ngModelChange", function PlataformaPlanoFormComponent_Conditional_3_Template_input_ngModelChange_6_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.key, $event) || (ctx_r1.key = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(7, PlataformaPlanoFormComponent_Conditional_3_Conditional_7_Template, 2, 0, "p", 7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div")(9, "label", 8);
    \u0275\u0275text(10, "Nome");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "input", 9);
    \u0275\u0275twoWayListener("ngModelChange", function PlataformaPlanoFormComponent_Conditional_3_Template_input_ngModelChange_11_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.name, $event) || (ctx_r1.name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div")(13, "label", 10);
    \u0275\u0275text(14, "Valor (R$/m\xEAs)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "input", 11);
    \u0275\u0275listener("ngModelChange", function PlataformaPlanoFormComponent_Conditional_3_Template_input_ngModelChange_15_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onValueInput($event));
    })("blur", function PlataformaPlanoFormComponent_Conditional_3_Template_input_blur_15_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onValueBlur());
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "div")(17, "label", 12);
    \u0275\u0275text(18, "Descri\xE7\xE3o");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "textarea", 13);
    \u0275\u0275twoWayListener("ngModelChange", function PlataformaPlanoFormComponent_Conditional_3_Template_textarea_ngModelChange_19_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.description, $event) || (ctx_r1.description = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "div")(21, "label", 14);
    \u0275\u0275text(22, "Ordem de exibi\xE7\xE3o");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "input", 15);
    \u0275\u0275twoWayListener("ngModelChange", function PlataformaPlanoFormComponent_Conditional_3_Template_input_ngModelChange_23_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.sortOrder, $event) || (ctx_r1.sortOrder = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "div", 16)(25, "input", 17);
    \u0275\u0275twoWayListener("ngModelChange", function PlataformaPlanoFormComponent_Conditional_3_Template_input_ngModelChange_25_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.isActive, $event) || (ctx_r1.isActive = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "label", 18);
    \u0275\u0275text(27, "Plano ativo (dispon\xEDvel para assinatura)");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(28, "div", 19)(29, "button", 20);
    \u0275\u0275conditionalCreate(30, PlataformaPlanoFormComponent_Conditional_3_Conditional_30_Template, 1, 0, "span", 21);
    \u0275\u0275text(31);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "a", 22);
    \u0275\u0275text(33, "Cancelar");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.error ? 2 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.key);
    \u0275\u0275property("readonly", ctx_r1.isEdit);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.isEdit ? 7 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.name);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngModel", ctx_r1.valueDisplay);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.description);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.sortOrder);
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.isActive);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r1.saving);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.saving ? 30 : -1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.saving ? "Salvando\u2026" : ctx_r1.isEdit ? "Salvar" : "Criar plano", " ");
  }
}
var PlataformaPlanoFormComponent = class _PlataformaPlanoFormComponent {
  isEdit = false;
  id = null;
  showSkeleton;
  listaPronta = false;
  saving = false;
  error = "";
  key = "";
  name = "";
  valueDisplay = "";
  valueNumber = 0;
  description = "";
  sortOrder = 0;
  isActive = true;
  route = inject(ActivatedRoute);
  router = inject(Router);
  plataformaService = inject(PlataformaService);
  headerService = inject(PlataformaHeaderService);
  loadingService = inject(LoadingService);
  toast = inject(ToastService);
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id");
    this.isEdit = !!this.id;
    if (this.isEdit && this.id) {
      this.headerService.setHeader("Editar plano", "");
      const { data$, showSkeleton } = this.loadingService.loadWithThreshold(this.plataformaService.getPlan(this.id));
      this.showSkeleton = showSkeleton;
      data$.subscribe({
        next: (res) => {
          this.listaPronta = true;
          const p = res.data ?? res;
          this.preencherFormulario(p);
        },
        error: () => {
          this.plataformaService.getPlans().subscribe({
            next: (listRes) => {
              this.listaPronta = true;
              const list = listRes.data ?? [];
              const idNum = Number(this.id);
              const p = list.find((x) => x.id === this.id || x.id === idNum || String(x.id) === this.id);
              if (p) {
                this.preencherFormulario(p);
              } else {
                this.error = "Plano n\xE3o encontrado.";
              }
            },
            error: () => {
              this.listaPronta = true;
              this.error = "N\xE3o foi poss\xEDvel carregar o plano.";
            }
          });
        }
      });
    } else {
      this.showSkeleton = signal(false).asReadonly();
      this.listaPronta = true;
      this.headerService.setHeader("Novo plano", "Criar plano de assinatura.");
    }
  }
  ngOnDestroy() {
    this.headerService.clearHeader();
  }
  preencherFormulario(p) {
    if (!p)
      return;
    this.key = p.key ?? "";
    this.name = p.name ?? "";
    this.valueNumber = Number(p.value) ?? 0;
    this.valueDisplay = this.formatBrl(this.valueNumber);
    this.description = p.description ?? "";
    this.sortOrder = p.sort_order ?? 0;
    this.isActive = p.is_active !== false;
    this.headerService.setHeader("Editar plano", p.name);
  }
  onValueInput(raw) {
    const digits = (raw ?? this.valueDisplay).replace(/\D/g, "");
    const padded = digits.padStart(2, "0");
    const cents = padded.slice(-2);
    const intPart = padded.slice(0, -2) || "0";
    const withDots = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    this.valueDisplay = withDots + "," + cents;
    this.valueNumber = digits.length === 0 ? 0 : parseInt(digits, 10) / 100;
  }
  onValueBlur() {
    if (this.valueNumber >= 0) {
      this.valueDisplay = this.formatBrl(this.valueNumber);
    }
  }
  formatBrl(n) {
    const fixed = n.toFixed(2);
    const [intPart, decPart] = fixed.split(".");
    const withDots = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return withDots + "," + decPart;
  }
  submit() {
    this.error = "";
    const name = this.name.trim();
    if (!name) {
      this.error = "Nome \xE9 obrigat\xF3rio.";
      return;
    }
    if (!this.isEdit && !this.key.trim()) {
      this.error = "Chave \xE9 obrigat\xF3ria.";
      return;
    }
    if (!/^[a-z0-9_-]+$/.test(this.key.trim()) && !this.isEdit) {
      this.error = "Chave deve conter apenas letras min\xFAsculas, n\xFAmeros, _ e -.";
      return;
    }
    if (this.valueNumber < 0) {
      this.error = "Valor deve ser maior ou igual a zero.";
      return;
    }
    this.saving = true;
    if (this.isEdit && this.id) {
      this.plataformaService.updatePlan(this.id, {
        name,
        value: this.valueNumber,
        description: this.description.trim() || null,
        sort_order: this.sortOrder,
        is_active: this.isActive
      }).subscribe({
        next: () => {
          this.saving = false;
          this.toast.success("Plano salvo", `${name} foi atualizado.`);
          this.router.navigate(["/plataforma/planos"]);
        },
        error: () => {
          this.saving = false;
          this.error = "N\xE3o foi poss\xEDvel salvar o plano.";
          this.toast.error("Erro", this.error);
        }
      });
    } else {
      this.plataformaService.createPlan({
        key: this.key.trim(),
        name,
        value: this.valueNumber,
        description: this.description.trim() || null,
        sort_order: this.sortOrder,
        is_active: this.isActive
      }).subscribe({
        next: () => {
          this.saving = false;
          this.toast.success("Plano criado", `${name} foi cadastrado.`);
          this.router.navigate(["/plataforma/planos"]);
        },
        error: () => {
          this.saving = false;
          this.error = "N\xE3o foi poss\xEDvel criar o plano.";
          this.toast.error("Erro", this.error);
        }
      });
    }
  }
  static \u0275fac = function PlataformaPlanoFormComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PlataformaPlanoFormComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PlataformaPlanoFormComponent, selectors: [["app-plataforma-plano-form"]], decls: 4, vars: 1, consts: [[1, "relative", "min-h-[300px]", "w-full", "max-w-4xl"], [3, "height"], [1, "zm-content-enter"], [1, "card", "space-y-4", "rounded-xl", "p-4", 2, "border", "1px solid var(--c-border)", 3, "ngSubmit"], [1, "text-xs", "m-0", 2, "color", "var(--c-primary)"], ["for", "key", 1, "block", "text-xs", "font-medium", "mb-1", 2, "color", "var(--c-text)"], ["type", "text", "id", "key", "name", "key", "maxlength", "64", "required", "", "pattern", "[a-z0-9_-]+", "placeholder", "Ex: core, enterprise", 1, "form-input", 3, "ngModelChange", "ngModel", "readonly"], [1, "text-xs", "mt-1", "m-0", 2, "color", "var(--c-muted)"], ["for", "name", 1, "block", "text-xs", "font-medium", "mb-1", 2, "color", "var(--c-text)"], ["type", "text", "id", "name", "name", "name", "maxlength", "128", "required", "", "placeholder", "Ex: Core", 1, "form-input", 3, "ngModelChange", "ngModel"], ["for", "value_display", 1, "block", "text-xs", "font-medium", "mb-1", 2, "color", "var(--c-text)"], ["type", "text", "id", "value_display", "placeholder", "0,00", "inputmode", "decimal", "autocomplete", "off", "name", "value_display", 1, "form-input", "w-40", 3, "ngModelChange", "blur", "ngModel"], ["for", "description", 1, "block", "text-xs", "font-medium", "mb-1", 2, "color", "var(--c-text)"], ["id", "description", "name", "description", "rows", "3", "maxlength", "500", "placeholder", "Ex: Para cl\xEDnicas pequenas e m\xE9dias que precisam padronizar formul\xE1rios...", 1, "form-input", 3, "ngModelChange", "ngModel"], ["for", "sort_order", 1, "block", "text-xs", "font-medium", "mb-1", 2, "color", "var(--c-text)"], ["type", "number", "id", "sort_order", "name", "sort_order", "min", "0", "placeholder", "0", 1, "form-input", "w-24", 3, "ngModelChange", "ngModel"], [1, "flex", "items-center", "gap-2"], ["type", "checkbox", "id", "is_active", "name", "is_active", 3, "ngModelChange", "ngModel"], ["for", "is_active", 1, "text-sm", 2, "color", "var(--c-text)"], [1, "flex", "gap-2", "pt-2"], ["type", "submit", 1, "btn-primary", "inline-flex", "items-center", "gap-2", 3, "disabled"], ["aria-hidden", "true", 1, "btn-spinner"], ["routerLink", "/plataforma/planos", 1, "btn-ghost"]], template: function PlataformaPlanoFormComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275conditionalCreate(1, PlataformaPlanoFormComponent_Conditional_1_Template, 1, 1, "zm-skeleton-card", 1)(2, PlataformaPlanoFormComponent_Conditional_2_Template, 0, 0)(3, PlataformaPlanoFormComponent_Conditional_3_Template, 34, 12, "div", 2);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showSkeleton() ? 1 : !ctx.listaPronta ? 2 : 3);
    }
  }, dependencies: [CommonModule, FormsModule, \u0275NgNoValidate, DefaultValueAccessor, NumberValueAccessor, CheckboxControlValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, MaxLengthValidator, PatternValidator, MinValidator, NgModel, NgForm, RouterLink, ZmSkeletonCardComponent], styles: ["\n\n.space-y-4[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%]    + *[_ngcontent-%COMP%] {\n  margin-top: 1rem;\n}\n/*# sourceMappingURL=plataforma-plano-form.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PlataformaPlanoFormComponent, [{
    type: Component,
    args: [{ selector: "app-plataforma-plano-form", standalone: true, imports: [CommonModule, FormsModule, RouterLink, ZmSkeletonCardComponent], template: `<!-- Igual ao backend: platform/plans/edit - formul\xE1rio novo/editar -->\r
<div class="relative min-h-[300px] w-full max-w-4xl">\r
  @if (showSkeleton()) {\r
    <zm-skeleton-card [height]="320" />\r
  } @else if (!listaPronta) {\r
  } @else {\r
    <div class="zm-content-enter">\r
    <form (ngSubmit)="submit()" class="card space-y-4 rounded-xl p-4" style="border: 1px solid var(--c-border)">\r
      @if (error) {\r
        <p class="text-xs m-0" style="color: var(--c-primary)">{{ error }}</p>\r
      }\r
\r
      <div>\r
        <label for="key" class="block text-xs font-medium mb-1" style="color: var(--c-text)">Chave (\xFAnica, ex: core, enterprise)</label>\r
        <input type="text" id="key" [(ngModel)]="key" name="key" class="form-input" maxlength="64" required\r
               pattern="[a-z0-9_-]+" placeholder="Ex: core, enterprise"\r
               [readonly]="isEdit">\r
        @if (isEdit) {\r
          <p class="text-xs mt-1 m-0" style="color: var(--c-muted)">A chave n\xE3o pode ser alterada ap\xF3s cria\xE7\xE3o.</p>\r
        }\r
      </div>\r
\r
      <div>\r
        <label for="name" class="block text-xs font-medium mb-1" style="color: var(--c-text)">Nome</label>\r
        <input type="text" id="name" [(ngModel)]="name" name="name" class="form-input" maxlength="128" required\r
               placeholder="Ex: Core">\r
      </div>\r
\r
      <div>\r
        <label for="value_display" class="block text-xs font-medium mb-1" style="color: var(--c-text)">Valor (R$/m\xEAs)</label>\r
        <input type="text" id="value_display" class="form-input w-40" placeholder="0,00" inputmode="decimal" autocomplete="off"\r
               [ngModel]="valueDisplay" (ngModelChange)="onValueInput($event)" name="value_display"\r
               (blur)="onValueBlur()">\r
      </div>\r
\r
      <div>\r
        <label for="description" class="block text-xs font-medium mb-1" style="color: var(--c-text)">Descri\xE7\xE3o</label>\r
        <textarea id="description" [(ngModel)]="description" name="description" rows="3" class="form-input" maxlength="500"\r
                  placeholder="Ex: Para cl\xEDnicas pequenas e m\xE9dias que precisam padronizar formul\xE1rios..."></textarea>\r
      </div>\r
\r
      <div>\r
        <label for="sort_order" class="block text-xs font-medium mb-1" style="color: var(--c-text)">Ordem de exibi\xE7\xE3o</label>\r
        <input type="number" id="sort_order" [(ngModel)]="sortOrder" name="sort_order" class="form-input w-24" min="0" placeholder="0">\r
      </div>\r
\r
      <div class="flex items-center gap-2">\r
        <input type="checkbox" id="is_active" [(ngModel)]="isActive" name="is_active">\r
        <label for="is_active" class="text-sm" style="color: var(--c-text)">Plano ativo (dispon\xEDvel para assinatura)</label>\r
      </div>\r
\r
      <div class="flex gap-2 pt-2">\r
        <button type="submit" class="btn-primary inline-flex items-center gap-2" [disabled]="saving">\r
          @if (saving) {\r
            <span class="btn-spinner" aria-hidden="true"></span>\r
          }\r
          {{ saving ? 'Salvando\u2026' : (isEdit ? 'Salvar' : 'Criar plano') }}\r
        </button>\r
        <a routerLink="/plataforma/planos" class="btn-ghost">Cancelar</a>\r
      </div>\r
    </form>\r
    </div>\r
  }\r
</div>\r
`, styles: ["/* src/app/paginas/plataforma/plataforma-plano-form/plataforma-plano-form.component.css */\n.space-y-4 > * + * {\n  margin-top: 1rem;\n}\n/*# sourceMappingURL=plataforma-plano-form.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PlataformaPlanoFormComponent, { className: "PlataformaPlanoFormComponent", filePath: "src/app/paginas/plataforma/plataforma-plano-form/plataforma-plano-form.component.ts", lineNumber: 18 });
})();
export {
  PlataformaPlanoFormComponent
};
//# sourceMappingURL=chunk-RRMMMWBM.js.map
