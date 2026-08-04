import {
  TemplatesService
} from "./chunk-E3NIIMGP.js";
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
  NgControlStatus,
  NgControlStatusGroup,
  NgForm,
  NgModel,
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
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-GRLISYEV.js";

// src/app/paginas/templates/templates-editar.component.ts
function TemplatesEditarComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "zm-skeleton-card", 1);
  }
  if (rf & 2) {
    \u0275\u0275property("height", 280);
  }
}
function TemplatesEditarComponent_Conditional_2_Template(rf, ctx) {
}
function TemplatesEditarComponent_Conditional_3_Template(rf, ctx) {
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
function TemplatesEditarComponent_Conditional_4_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 15);
    \u0275\u0275text(1, " Antes de preencher, a pessoa informa o c\xF3digo da ficha e a data de nascimento (\xFAtil para acompanhamentos). ");
    \u0275\u0275elementEnd();
  }
}
function TemplatesEditarComponent_Conditional_4_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 19);
    \u0275\u0275text(1, " Salvando\u2026 ");
  }
}
function TemplatesEditarComponent_Conditional_4_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 20);
    \u0275\u0275text(1, "save");
    \u0275\u0275elementEnd();
    \u0275\u0275text(2, " Salvar altera\xE7\xF5es ");
  }
}
function TemplatesEditarComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 3)(1, "div", 4)(2, "form", 5);
    \u0275\u0275listener("ngSubmit", function TemplatesEditarComponent_Conditional_4_Template_form_ngSubmit_2_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.salvar());
    });
    \u0275\u0275elementStart(3, "div")(4, "label", 6);
    \u0275\u0275text(5, "Nome");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "input", 7);
    \u0275\u0275twoWayListener("ngModelChange", function TemplatesEditarComponent_Conditional_4_Template_input_ngModelChange_6_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.name, $event) || (ctx_r0.name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div")(8, "label", 6);
    \u0275\u0275text(9, "Descri\xE7\xE3o");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "textarea", 8);
    \u0275\u0275twoWayListener("ngModelChange", function TemplatesEditarComponent_Conditional_4_Template_textarea_ngModelChange_10_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.description, $event) || (ctx_r0.description = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 9)(12, "label", 10)(13, "input", 11);
    \u0275\u0275twoWayListener("ngModelChange", function TemplatesEditarComponent_Conditional_4_Template_input_ngModelChange_13_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.is_active, $event) || (ctx_r0.is_active = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "span", 12);
    \u0275\u0275text(15, "Ativo");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "label", 10)(17, "input", 13);
    \u0275\u0275twoWayListener("ngModelChange", function TemplatesEditarComponent_Conditional_4_Template_input_ngModelChange_17_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.public_enabled, $event) || (ctx_r0.public_enabled = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "span", 12);
    \u0275\u0275text(19, "Formul\xE1rio p\xFAblico");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "label", 10)(21, "input", 14);
    \u0275\u0275twoWayListener("ngModelChange", function TemplatesEditarComponent_Conditional_4_Template_input_ngModelChange_21_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.public_require_person_link, $event) || (ctx_r0.public_require_person_link = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "span", 12);
    \u0275\u0275text(23, "Exigir c\xF3digo + data de nascimento");
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(24, TemplatesEditarComponent_Conditional_4_Conditional_24_Template, 2, 0, "p", 15);
    \u0275\u0275elementStart(25, "div", 16)(26, "button", 17);
    \u0275\u0275conditionalCreate(27, TemplatesEditarComponent_Conditional_4_Conditional_27_Template, 2, 0)(28, TemplatesEditarComponent_Conditional_4_Conditional_28_Template, 3, 0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "a", 18);
    \u0275\u0275text(30, "Cancelar");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.name);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.description);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.is_active);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.public_enabled);
    \u0275\u0275advance(3);
    \u0275\u0275classProp("opacity-50", !ctx_r0.public_enabled);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.public_require_person_link);
    \u0275\u0275property("disabled", !ctx_r0.public_enabled);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r0.public_enabled && ctx_r0.public_require_person_link ? 24 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r0.salvando || !ctx_r0.name.trim());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.salvando ? 27 : 28);
  }
}
var TemplatesEditarComponent = class _TemplatesEditarComponent {
  template = null;
  name = "";
  description = "";
  is_active = true;
  public_enabled = false;
  public_require_person_link = false;
  showSkeleton;
  listaPronta = false;
  salvando = false;
  erro = "";
  route = inject(ActivatedRoute);
  router = inject(Router);
  templatesService = inject(TemplatesService);
  loadingService = inject(LoadingService);
  toast = inject(ToastService);
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id");
    if (!id) {
      this.showSkeleton = signal(false).asReadonly();
      this.listaPronta = true;
      this.erro = "ID inv\xE1lido";
      return;
    }
    const { data$, showSkeleton } = this.loadingService.loadWithThreshold(this.templatesService.get(Number(id)));
    this.showSkeleton = showSkeleton;
    data$.subscribe({
      next: (t) => {
        this.listaPronta = true;
        this.template = t;
        this.name = t.name ?? "";
        this.description = t.description ?? "";
        this.is_active = t.is_active ?? true;
        this.public_enabled = t.public_enabled ?? false;
        this.public_require_person_link = t.public_require_person_link ?? false;
      },
      error: () => {
        this.listaPronta = true;
        this.erro = "Template n\xE3o encontrado.";
      }
    });
  }
  salvar() {
    if (!this.template || !this.name.trim())
      return;
    this.salvando = true;
    this.erro = "";
    this.templatesService.update(this.template.id, {
      name: this.name.trim(),
      description: this.description.trim() || void 0,
      is_active: this.is_active,
      public_enabled: this.public_enabled,
      public_require_person_link: this.public_enabled ? this.public_require_person_link : false
    }).subscribe({
      next: () => {
        this.salvando = false;
        const label = this.name.trim();
        this.toast.success("Template salvo!", `${label} foi salvo com sucesso.`);
        this.router.navigate(["/templates"]);
      },
      error: () => {
        this.salvando = false;
        this.erro = "N\xE3o foi poss\xEDvel salvar.";
        this.toast.error("Erro ao salvar", "N\xE3o foi poss\xEDvel salvar as altera\xE7\xF5es.");
      }
    });
  }
  static \u0275fac = function TemplatesEditarComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TemplatesEditarComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TemplatesEditarComponent, selectors: [["app-templates-editar"]], decls: 5, vars: 1, consts: [[1, "relative", "min-h-[200px]"], [3, "height"], [1, "text-sm", "mb-4", 2, "color", "var(--c-error, #dc2626)"], [1, "zm-content-enter"], [1, "card"], [1, "flex", "flex-col", "gap-5", 3, "ngSubmit"], [1, "form-label"], ["type", "text", "name", "name", "required", "", 1, "form-input", 3, "ngModelChange", "ngModel"], ["name", "description", "rows", "3", 1, "form-input", 3, "ngModelChange", "ngModel"], [1, "flex", "items-center", "gap-6"], [1, "flex", "items-center", "gap-2", "cursor-pointer"], ["type", "checkbox", "name", "is_active", 1, "form-checkbox", 3, "ngModelChange", "ngModel"], [1, "form-label", "mb-0"], ["type", "checkbox", "name", "public_enabled", 1, "form-checkbox", 3, "ngModelChange", "ngModel"], ["type", "checkbox", "name", "public_require_person_link", 1, "form-checkbox", 3, "ngModelChange", "ngModel", "disabled"], [1, "text-xs", "m-0", 2, "color", "var(--c-muted)"], [1, "flex", "items-center", "gap-3", "pt-2"], ["type", "submit", 1, "btn-primary", 3, "disabled"], ["routerLink", "/templates", "title", "Voltar para modelos", 1, "text-sm", "no-underline", 2, "color", "var(--c-muted)"], ["aria-hidden", "true", 1, "btn-spinner"], [1, "material-symbols-outlined", "text-base"]], template: function TemplatesEditarComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275conditionalCreate(1, TemplatesEditarComponent_Conditional_1_Template, 1, 1, "zm-skeleton-card", 1)(2, TemplatesEditarComponent_Conditional_2_Template, 0, 0)(3, TemplatesEditarComponent_Conditional_3_Template, 2, 1, "p", 2)(4, TemplatesEditarComponent_Conditional_4_Template, 31, 11, "div", 3);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showSkeleton() ? 1 : !ctx.listaPronta ? 2 : ctx.erro ? 3 : ctx.template ? 4 : -1);
    }
  }, dependencies: [CommonModule, RouterLink, FormsModule, \u0275NgNoValidate, DefaultValueAccessor, CheckboxControlValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, NgModel, NgForm, ZmSkeletonCardComponent], styles: ["\n\n/*# sourceMappingURL=templates-editar.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TemplatesEditarComponent, [{
    type: Component,
    args: [{ selector: "app-templates-editar", standalone: true, imports: [CommonModule, RouterLink, FormsModule, ZmSkeletonCardComponent], template: '<div class="relative min-h-[200px]">\r\n  <!-- <div class="page-header mb-5">\r\n    <div class="page-title">\r\n      <div class="page-title-icon">\r\n        <span class="material-symbols-outlined">edit_note</span>\r\n      </div>\r\n      <div>\r\n        <h1>Editar modelo</h1>\r\n      </div>\r\n    </div>\r\n  </div> -->\r\n\r\n  @if (showSkeleton()) {\r\n    <zm-skeleton-card [height]="280" />\r\n  } @else if (!listaPronta) {\r\n  } @else if (erro) {\r\n    <p class="text-sm mb-4" style="color: var(--c-error, #dc2626)">{{ erro }}</p>\r\n  } @else if (template) {\r\n    <div class="zm-content-enter">\r\n    <div class="card">\r\n      <form (ngSubmit)="salvar()" class="flex flex-col gap-5">\r\n        <div>\r\n          <label class="form-label">Nome</label>\r\n          <input type="text" [(ngModel)]="name" name="name" required class="form-input" />\r\n        </div>\r\n        <div>\r\n          <label class="form-label">Descri\xE7\xE3o</label>\r\n          <textarea [(ngModel)]="description" name="description" rows="3" class="form-input"></textarea>\r\n        </div>\r\n        <div class="flex items-center gap-6">\r\n          <label class="flex items-center gap-2 cursor-pointer">\r\n            <input type="checkbox" [(ngModel)]="is_active" name="is_active" class="form-checkbox" />\r\n            <span class="form-label mb-0">Ativo</span>\r\n          </label>\r\n          <label class="flex items-center gap-2 cursor-pointer">\r\n            <input type="checkbox" [(ngModel)]="public_enabled" name="public_enabled" class="form-checkbox" />\r\n            <span class="form-label mb-0">Formul\xE1rio p\xFAblico</span>\r\n          </label>\r\n          <label class="flex items-center gap-2 cursor-pointer" [class.opacity-50]="!public_enabled">\r\n            <input\r\n              type="checkbox"\r\n              [(ngModel)]="public_require_person_link"\r\n              name="public_require_person_link"\r\n              class="form-checkbox"\r\n              [disabled]="!public_enabled"\r\n            />\r\n            <span class="form-label mb-0">Exigir c\xF3digo + data de nascimento</span>\r\n          </label>\r\n        </div>\r\n        @if (public_enabled && public_require_person_link) {\r\n          <p class="text-xs m-0" style="color: var(--c-muted)">\r\n            Antes de preencher, a pessoa informa o c\xF3digo da ficha e a data de nascimento (\xFAtil para acompanhamentos).\r\n          </p>\r\n        }\r\n        <div class="flex items-center gap-3 pt-2">\r\n          <button type="submit" class="btn-primary" [disabled]="salvando || !name.trim()">\r\n            @if (salvando) {\r\n              <span class="btn-spinner" aria-hidden="true"></span>\r\n              Salvando\u2026\r\n            } @else {\r\n              <span class="material-symbols-outlined text-base">save</span>\r\n              Salvar altera\xE7\xF5es\r\n            }\r\n          </button>\r\n          <a routerLink="/templates" class="text-sm no-underline" style="color: var(--c-muted)" title="Voltar para modelos">Cancelar</a>\r\n        </div>\r\n      </form>\r\n    </div>\r\n    </div>\r\n  }\r\n</div>\r\n', styles: ["/* src/app/paginas/templates/templates-editar.component.css */\n/*# sourceMappingURL=templates-editar.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TemplatesEditarComponent, { className: "TemplatesEditarComponent", filePath: "src/app/paginas/templates/templates-editar.component.ts", lineNumber: 17 });
})();
export {
  TemplatesEditarComponent
};
//# sourceMappingURL=chunk-7LMRBZ7W.js.map
