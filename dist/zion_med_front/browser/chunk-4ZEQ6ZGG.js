import {
  ClinicaService
} from "./chunk-KCTAH7A3.js";
import "./chunk-T5FMHWLF.js";
import {
  LoadingService,
  ZmSkeletonListComponent
} from "./chunk-GKI5AWTV.js";
import "./chunk-7WBHVE2H.js";
import {
  ToastService
} from "./chunk-EZUVP6MG.js";
import {
  AuthService
} from "./chunk-SFRXLDXR.js";
import "./chunk-IBJWGIJV.js";
import {
  Router
} from "./chunk-C2NWBPZH.js";
import {
  CommonModule,
  Component,
  inject,
  setClassMetadata,
  switchMap,
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
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-GRLISYEV.js";

// src/app/paginas/clinica/clinica-escolher.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function ClinicaEscolherComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "zm-skeleton-list", 7);
  }
  if (rf & 2) {
    \u0275\u0275property("rows", 5);
  }
}
function ClinicaEscolherComponent_Conditional_12_Template(rf, ctx) {
}
function ClinicaEscolherComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 8);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.erro);
  }
}
function ClinicaEscolherComponent_Conditional_14_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11);
    \u0275\u0275text(1, "Nenhuma cl\xEDnica dispon\xEDvel.");
    \u0275\u0275elementEnd();
  }
}
function ClinicaEscolherComponent_Conditional_14_Conditional_3_For_2_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 15);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r3 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", c_r3.users_count, " usu\xE1rio(s)");
  }
}
function ClinicaEscolherComponent_Conditional_14_Conditional_3_For_2_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 17);
    \u0275\u0275text(1, " Selecionando\u2026 ");
  }
}
function ClinicaEscolherComponent_Conditional_14_Conditional_3_For_2_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Selecionar ");
  }
}
function ClinicaEscolherComponent_Conditional_14_Conditional_3_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "li", 13)(1, "div")(2, "p", 14);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(4, ClinicaEscolherComponent_Conditional_14_Conditional_3_For_2_Conditional_4_Template, 2, 1, "p", 15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 16);
    \u0275\u0275listener("click", function ClinicaEscolherComponent_Conditional_14_Conditional_3_For_2_Template_button_click_5_listener() {
      const c_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.escolher(c_r3.id));
    });
    \u0275\u0275conditionalCreate(6, ClinicaEscolherComponent_Conditional_14_Conditional_3_For_2_Conditional_6_Template, 2, 0)(7, ClinicaEscolherComponent_Conditional_14_Conditional_3_For_2_Conditional_7_Template, 1, 0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const c_r3 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(c_r3.name);
    \u0275\u0275advance();
    \u0275\u0275conditional(c_r3.users_count != null ? 4 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r0.escolhendoId !== null);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.escolhendoId === c_r3.id ? 6 : 7);
  }
}
function ClinicaEscolherComponent_Conditional_14_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ul", 12);
    \u0275\u0275repeaterCreate(1, ClinicaEscolherComponent_Conditional_14_Conditional_3_For_2_Template, 8, 4, "li", 13, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.clinicas);
  }
}
function ClinicaEscolherComponent_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9)(1, "div", 10);
    \u0275\u0275conditionalCreate(2, ClinicaEscolherComponent_Conditional_14_Conditional_2_Template, 2, 0, "div", 11)(3, ClinicaEscolherComponent_Conditional_14_Conditional_3_Template, 3, 0, "ul", 12);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.clinicas.length === 0 ? 2 : 3);
  }
}
var ClinicaEscolherComponent = class _ClinicaEscolherComponent {
  clinicas = [];
  showSkeleton;
  listaPronta = false;
  erro = "";
  escolhendoId = null;
  auth = inject(AuthService);
  clinicaService = inject(ClinicaService);
  loadingService = inject(LoadingService);
  router = inject(Router);
  toast = inject(ToastService);
  ngOnInit() {
    const { data$, showSkeleton } = this.loadingService.loadWithThreshold(this.clinicaService.listParaEscolher());
    this.showSkeleton = showSkeleton;
    data$.subscribe({
      next: (list) => {
        this.listaPronta = true;
        this.clinicas = list;
      },
      error: () => {
        this.listaPronta = true;
        this.erro = "N\xE3o foi poss\xEDvel carregar as cl\xEDnicas.";
      }
    });
  }
  escolher(clinicId) {
    this.escolhendoId = clinicId;
    this.clinicaService.escolher(clinicId).pipe(switchMap(() => this.auth.me())).subscribe({
      next: () => {
        this.escolhendoId = null;
        this.toast.success("Empresa selecionada", "Redirecionando\u2026");
        this.router.navigateByUrl(this.auth.getDefaultTenantPath());
      },
      error: () => {
        this.escolhendoId = null;
        this.erro = "N\xE3o foi poss\xEDvel trocar de cl\xEDnica.";
        this.toast.error("Erro", this.erro);
      }
    });
  }
  static \u0275fac = function ClinicaEscolherComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ClinicaEscolherComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ClinicaEscolherComponent, selectors: [["app-clinica-escolher"]], decls: 15, vars: 1, consts: [[1, "relative", "min-h-[320px]"], [1, "page-header", "mb-6"], [1, "page-title", "flex", "items-center", "gap-3"], [1, "page-title-icon", "w-10", "h-10", "rounded-lg", "flex", "items-center", "justify-center", 2, "background", "var(--c-soft)"], [1, "material-symbols-outlined", 2, "color", "var(--c-primary)"], [1, "text-xl", "font-semibold", "m-0", 2, "color", "var(--c-text)"], [1, "text-sm", "mt-1", "mb-0", 2, "color", "var(--c-muted)"], [3, "rows"], [1, "text-sm", 2, "color", "var(--c-error, #dc2626)"], [1, "zm-content-enter"], [1, "card", "rounded-xl", "overflow-hidden", 2, "border", "1px solid var(--c-border)"], [1, "p-8", "text-center", 2, "color", "var(--c-muted)"], [1, "divide-y", 2, "border-color", "var(--c-border)"], [1, "flex", "items-center", "justify-between", "px-5", "py-4"], [1, "font-medium", "m-0", 2, "color", "var(--c-text)"], [1, "text-xs", "m-0", "mt-0.5", 2, "color", "var(--c-muted)"], ["type", "button", "title", "Selecionar esta empresa", 1, "btn-primary", "inline-flex", "items-center", "gap-2", 3, "click", "disabled"], ["aria-hidden", "true", 1, "btn-spinner"]], template: function ClinicaEscolherComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "span", 4);
      \u0275\u0275text(5, "swap_horiz");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "div")(7, "h1", 5);
      \u0275\u0275text(8, "Escolher empresa");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "p", 6);
      \u0275\u0275text(10, "Fiel ao clinica/escolher.blade.php");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275conditionalCreate(11, ClinicaEscolherComponent_Conditional_11_Template, 1, 1, "zm-skeleton-list", 7)(12, ClinicaEscolherComponent_Conditional_12_Template, 0, 0)(13, ClinicaEscolherComponent_Conditional_13_Template, 2, 1, "p", 8)(14, ClinicaEscolherComponent_Conditional_14_Template, 4, 1, "div", 9);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(11);
      \u0275\u0275conditional(ctx.showSkeleton() ? 11 : !ctx.listaPronta ? 12 : ctx.erro ? 13 : 14);
    }
  }, dependencies: [CommonModule, ZmSkeletonListComponent], styles: ["\n\n/*# sourceMappingURL=clinica-escolher.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ClinicaEscolherComponent, [{
    type: Component,
    args: [{ selector: "app-clinica-escolher", standalone: true, imports: [CommonModule, ZmSkeletonListComponent], template: '<div class="relative min-h-[320px]">\n  <div class="page-header mb-6">\n    <div class="page-title flex items-center gap-3">\n      <div class="page-title-icon w-10 h-10 rounded-lg flex items-center justify-center" style="background: var(--c-soft)">\n        <span class="material-symbols-outlined" style="color: var(--c-primary)">swap_horiz</span>\n      </div>\n      <div>\n        <h1 class="text-xl font-semibold m-0" style="color: var(--c-text)">Escolher empresa</h1>\n        <p class="text-sm mt-1 mb-0" style="color: var(--c-muted)">Fiel ao clinica/escolher.blade.php</p>\n      </div>\n    </div>\n  </div>\n  @if (showSkeleton()) {\n    <zm-skeleton-list [rows]="5" />\n  } @else if (!listaPronta) {\n  } @else if (erro) {\n    <p class="text-sm" style="color: var(--c-error, #dc2626)">{{ erro }}</p>\n  } @else {\n    <div class="zm-content-enter">\n  <div class="card rounded-xl overflow-hidden" style="border: 1px solid var(--c-border)">\n    @if (clinicas.length === 0) {\n      <div class="p-8 text-center" style="color: var(--c-muted)">Nenhuma cl\xEDnica dispon\xEDvel.</div>\n    } @else {\n      <ul class="divide-y" style="border-color: var(--c-border)">\n        @for (c of clinicas; track c.id) {\n          <li class="flex items-center justify-between px-5 py-4">\n            <div>\n              <p class="font-medium m-0" style="color: var(--c-text)">{{ c.name }}</p>\n              @if (c.users_count != null) {\n                <p class="text-xs m-0 mt-0.5" style="color: var(--c-muted)">{{ c.users_count }} usu\xE1rio(s)</p>\n              }\n            </div>\n            <button type="button" class="btn-primary inline-flex items-center gap-2" [disabled]="escolhendoId !== null" (click)="escolher(c.id)" title="Selecionar esta empresa">\n              @if (escolhendoId === c.id) {\n                <span class="btn-spinner" aria-hidden="true"></span>\n                Selecionando\u2026\n              } @else {\n                Selecionar\n              }\n            </button>\n          </li>\n        }\n      </ul>\n    }\n  </div>\n    </div>\n  }\n</div>\n', styles: ["/* src/app/paginas/clinica/clinica-escolher.component.css */\n/*# sourceMappingURL=clinica-escolher.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ClinicaEscolherComponent, { className: "ClinicaEscolherComponent", filePath: "src/app/paginas/clinica/clinica-escolher.component.ts", lineNumber: 18 });
})();
export {
  ClinicaEscolherComponent
};
//# sourceMappingURL=chunk-4ZEQ6ZGG.js.map
