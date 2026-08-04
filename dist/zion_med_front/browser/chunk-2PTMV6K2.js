import {
  TemplatesService
} from "./chunk-E3NIIMGP.js";
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
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-GRLISYEV.js";

// src/app/paginas/templates/templates-criar-em-branco.component.ts
function TemplatesCriarEmBrancoComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 5);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.erro);
  }
}
function TemplatesCriarEmBrancoComponent_Conditional_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 19);
    \u0275\u0275text(1, " Criando\u2026 ");
  }
}
function TemplatesCriarEmBrancoComponent_Conditional_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 20);
    \u0275\u0275text(1, "save");
    \u0275\u0275elementEnd();
    \u0275\u0275text(2, " Criar modelo ");
  }
}
var TemplatesCriarEmBrancoComponent = class _TemplatesCriarEmBrancoComponent {
  name = "";
  description = "";
  is_active = true;
  public_enabled = false;
  salvando = false;
  erro = "";
  templatesService = inject(TemplatesService);
  router = inject(Router);
  toast = inject(ToastService);
  salvar() {
    if (!this.name.trim())
      return;
    this.salvando = true;
    this.erro = "";
    this.templatesService.create({
      name: this.name.trim(),
      description: this.description.trim() || void 0,
      is_active: this.is_active,
      public_enabled: this.public_enabled
    }).subscribe({
      next: (t) => {
        this.salvando = false;
        this.toast.success("Template criado!", `${this.name.trim()} foi criado.`);
        this.router.navigate(["/templates", t.id, "campos"]);
      },
      error: () => {
        this.salvando = false;
        this.erro = "N\xE3o foi poss\xEDvel criar o template.";
        this.toast.error("Erro ao criar", this.erro);
      }
    });
  }
  static \u0275fac = function TemplatesCriarEmBrancoComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TemplatesCriarEmBrancoComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TemplatesCriarEmBrancoComponent, selectors: [["app-templates-criar-em-branco"]], decls: 35, vars: 7, consts: [[1, "relative", "min-h-[200px]"], [1, "page-header", "mb-5"], [1, "page-title"], [1, "page-title-icon"], [1, "material-symbols-outlined"], [1, "text-sm", "mb-4", 2, "color", "var(--c-error, #dc2626)"], [1, "card"], [1, "flex", "flex-col", "gap-5", 3, "ngSubmit"], [1, "form-label"], ["type", "text", "name", "name", "required", "", "placeholder", "Ex: Ficha de Anamnese", 1, "form-input", 3, "ngModelChange", "ngModel"], ["name", "description", "rows", "3", "placeholder", "Breve descri\xE7\xE3o do modelo...", 1, "form-input", 3, "ngModelChange", "ngModel"], [1, "flex", "items-center", "gap-6"], [1, "flex", "items-center", "gap-2", "cursor-pointer"], ["type", "checkbox", "name", "is_active", 1, "form-checkbox", 3, "ngModelChange", "ngModel"], [1, "form-label", "mb-0"], ["type", "checkbox", "name", "public_enabled", 1, "form-checkbox", 3, "ngModelChange", "ngModel"], [1, "flex", "items-center", "gap-3", "pt-2"], ["type", "submit", 1, "btn-primary", 3, "disabled"], ["routerLink", "/templates/criar", "title", "Voltar \xE0 escolha de modelo", 1, "text-sm", "no-underline", 2, "color", "var(--c-muted)"], ["aria-hidden", "true", 1, "btn-spinner"], [1, "material-symbols-outlined", "text-base"]], template: function TemplatesCriarEmBrancoComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "span", 4);
      \u0275\u0275text(5, "add_circle");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "div")(7, "h1");
      \u0275\u0275text(8, "Novo modelo (em branco)");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275conditionalCreate(9, TemplatesCriarEmBrancoComponent_Conditional_9_Template, 2, 1, "p", 5);
      \u0275\u0275elementStart(10, "div", 6)(11, "form", 7);
      \u0275\u0275listener("ngSubmit", function TemplatesCriarEmBrancoComponent_Template_form_ngSubmit_11_listener() {
        return ctx.salvar();
      });
      \u0275\u0275elementStart(12, "div")(13, "label", 8);
      \u0275\u0275text(14, "Nome");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(15, "input", 9);
      \u0275\u0275twoWayListener("ngModelChange", function TemplatesCriarEmBrancoComponent_Template_input_ngModelChange_15_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.name, $event) || (ctx.name = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(16, "div")(17, "label", 8);
      \u0275\u0275text(18, "Descri\xE7\xE3o");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "textarea", 10);
      \u0275\u0275twoWayListener("ngModelChange", function TemplatesCriarEmBrancoComponent_Template_textarea_ngModelChange_19_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.description, $event) || (ctx.description = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(20, "div", 11)(21, "label", 12)(22, "input", 13);
      \u0275\u0275twoWayListener("ngModelChange", function TemplatesCriarEmBrancoComponent_Template_input_ngModelChange_22_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.is_active, $event) || (ctx.is_active = $event);
        return $event;
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "span", 14);
      \u0275\u0275text(24, "Ativo");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(25, "label", 12)(26, "input", 15);
      \u0275\u0275twoWayListener("ngModelChange", function TemplatesCriarEmBrancoComponent_Template_input_ngModelChange_26_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.public_enabled, $event) || (ctx.public_enabled = $event);
        return $event;
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(27, "span", 14);
      \u0275\u0275text(28, "Formul\xE1rio p\xFAblico");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(29, "div", 16)(30, "button", 17);
      \u0275\u0275conditionalCreate(31, TemplatesCriarEmBrancoComponent_Conditional_31_Template, 2, 0)(32, TemplatesCriarEmBrancoComponent_Conditional_32_Template, 3, 0);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(33, "a", 18);
      \u0275\u0275text(34, "Cancelar");
      \u0275\u0275elementEnd()()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(9);
      \u0275\u0275conditional(ctx.erro ? 9 : -1);
      \u0275\u0275advance(6);
      \u0275\u0275twoWayProperty("ngModel", ctx.name);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.description);
      \u0275\u0275advance(3);
      \u0275\u0275twoWayProperty("ngModel", ctx.is_active);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.public_enabled);
      \u0275\u0275advance(4);
      \u0275\u0275property("disabled", ctx.salvando || !ctx.name.trim());
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.salvando ? 31 : 32);
    }
  }, dependencies: [CommonModule, RouterLink, FormsModule, \u0275NgNoValidate, DefaultValueAccessor, CheckboxControlValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, NgModel, NgForm], styles: ["\n\n/*# sourceMappingURL=templates-criar-em-branco.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TemplatesCriarEmBrancoComponent, [{
    type: Component,
    args: [{ selector: "app-templates-criar-em-branco", standalone: true, imports: [CommonModule, RouterLink, FormsModule], template: '<div class="relative min-h-[200px]">\r\n  <div class="page-header mb-5">\r\n    <div class="page-title">\r\n      <div class="page-title-icon">\r\n        <span class="material-symbols-outlined">add_circle</span>\r\n      </div>\r\n      <div>\r\n        <h1>Novo modelo (em branco)</h1>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n  @if (erro) {\r\n    <p class="text-sm mb-4" style="color: var(--c-error, #dc2626)">{{ erro }}</p>\r\n  }\r\n\r\n  <div class="card">\r\n    <form (ngSubmit)="salvar()" class="flex flex-col gap-5">\r\n      <div>\r\n        <label class="form-label">Nome</label>\r\n        <input type="text" [(ngModel)]="name" name="name" required class="form-input" placeholder="Ex: Ficha de Anamnese" />\r\n      </div>\r\n      <div>\r\n        <label class="form-label">Descri\xE7\xE3o</label>\r\n        <textarea [(ngModel)]="description" name="description" rows="3" class="form-input" placeholder="Breve descri\xE7\xE3o do modelo..."></textarea>\r\n      </div>\r\n      <div class="flex items-center gap-6">\r\n        <label class="flex items-center gap-2 cursor-pointer">\r\n          <input type="checkbox" [(ngModel)]="is_active" name="is_active" class="form-checkbox" />\r\n          <span class="form-label mb-0">Ativo</span>\r\n        </label>\r\n        <label class="flex items-center gap-2 cursor-pointer">\r\n          <input type="checkbox" [(ngModel)]="public_enabled" name="public_enabled" class="form-checkbox" />\r\n          <span class="form-label mb-0">Formul\xE1rio p\xFAblico</span>\r\n        </label>\r\n      </div>\r\n      <div class="flex items-center gap-3 pt-2">\r\n        <button type="submit" class="btn-primary" [disabled]="salvando || !name.trim()">\r\n          @if (salvando) {\r\n            <span class="btn-spinner" aria-hidden="true"></span>\r\n            Criando\u2026\r\n          } @else {\r\n            <span class="material-symbols-outlined text-base">save</span>\r\n            Criar modelo\r\n          }\r\n        </button>\r\n        <a routerLink="/templates/criar" class="text-sm no-underline" style="color: var(--c-muted)" title="Voltar \xE0 escolha de modelo">Cancelar</a>\r\n      </div>\r\n    </form>\r\n  </div>\r\n</div>\r\n', styles: ["/* src/app/paginas/templates/templates-criar-em-branco.component.css */\n/*# sourceMappingURL=templates-criar-em-branco.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TemplatesCriarEmBrancoComponent, { className: "TemplatesCriarEmBrancoComponent", filePath: "src/app/paginas/templates/templates-criar-em-branco.component.ts", lineNumber: 15 });
})();
export {
  TemplatesCriarEmBrancoComponent
};
//# sourceMappingURL=chunk-2PTMV6K2.js.map
