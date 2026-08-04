import {
  PlataformaService
} from "./chunk-YNOSNX2Z.js";
import {
  statusAssinaturaOuCobrancaPt
} from "./chunk-QA27EMLR.js";
import {
  LoadingService,
  ZmSkeletonListComponent
} from "./chunk-GKI5AWTV.js";
import "./chunk-7WBHVE2H.js";
import "./chunk-IBJWGIJV.js";
import {
  CommonModule,
  Component,
  catchError,
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
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate2
} from "./chunk-GRLISYEV.js";

// src/app/paginas/plataforma/plataforma-assinaturas/plataforma-assinaturas.component.ts
var _forTrack0 = ($index, $item) => $item.clinic_id + "_" + $item.tenant_id;
function PlataformaAssinaturasComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "zm-skeleton-list", 3);
  }
  if (rf & 2) {
    \u0275\u0275property("rows", 6);
  }
}
function PlataformaAssinaturasComponent_Conditional_5_Template(rf, ctx) {
}
function PlataformaAssinaturasComponent_Conditional_6_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4)(1, "p", 6);
    \u0275\u0275text(2, "N\xE3o foi poss\xEDvel carregar as assinaturas.");
    \u0275\u0275elementEnd()();
  }
}
function PlataformaAssinaturasComponent_Conditional_6_Conditional_1_For_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 12)(2, "span", 13);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "td", 14);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "td", 14);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td", 14);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "td", 14);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "td", 15);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const a_r1 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(a_r1.tenant_name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(a_r1.clinic_name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(a_r1.plan_key || "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.rotuloStatusAssinaturaCobranca(a_r1.subscription_status));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.rotuloStatusAssinaturaCobranca(a_r1.billing_status));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.formatarData(a_r1.current_period_end));
  }
}
function PlataformaAssinaturasComponent_Conditional_6_Conditional_1_ForEmpty_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 16);
    \u0275\u0275text(2, " Nenhuma assinatura cadastrada. ");
    \u0275\u0275elementEnd()();
  }
}
function PlataformaAssinaturasComponent_Conditional_6_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5)(1, "div", 7)(2, "table", 8)(3, "thead")(4, "tr")(5, "th", 9);
    \u0275\u0275text(6, "Cliente");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th", 10);
    \u0275\u0275text(8, "Empresa");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th", 10);
    \u0275\u0275text(10, "Plano");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "th", 10);
    \u0275\u0275text(12, "Status assinatura");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "th", 10);
    \u0275\u0275text(14, "Status cobran\xE7a");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "th", 11);
    \u0275\u0275text(16, "Pr\xF3ximo ciclo");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(17, "tbody");
    \u0275\u0275repeaterCreate(18, PlataformaAssinaturasComponent_Conditional_6_Conditional_1_For_19_Template, 14, 6, "tr", null, _forTrack0, false, PlataformaAssinaturasComponent_Conditional_6_Conditional_1_ForEmpty_20_Template, 3, 0, "tr");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(18);
    \u0275\u0275repeater(ctx_r1.assinaturas);
  }
}
function PlataformaAssinaturasComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, PlataformaAssinaturasComponent_Conditional_6_Conditional_0_Template, 3, 0, "div", 4)(1, PlataformaAssinaturasComponent_Conditional_6_Conditional_1_Template, 21, 1, "div", 5);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r1.estadoErro ? 0 : 1);
  }
}
var PlataformaAssinaturasComponent = class _PlataformaAssinaturasComponent {
  rotuloStatusAssinaturaCobranca = statusAssinaturaOuCobrancaPt;
  showSkeleton;
  listaPronta = false;
  estadoErro = false;
  assinaturas = [];
  plataformaService = inject(PlataformaService);
  loadingService = inject(LoadingService);
  ngOnInit() {
    const load$ = this.plataformaService.getSubscriptions().pipe(catchError(() => this.plataformaService.getSubscriptionsFromTenants()));
    const { data$, showSkeleton } = this.loadingService.loadWithThreshold(load$);
    this.showSkeleton = showSkeleton;
    data$.subscribe({
      next: (res) => {
        this.listaPronta = true;
        this.assinaturas = res.data ?? [];
      },
      error: () => {
        this.listaPronta = true;
        this.estadoErro = true;
      }
    });
  }
  formatarData(iso) {
    if (!iso)
      return "\u2014";
    try {
      const d = new Date(iso);
      return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });
    } catch {
      return iso;
    }
  }
  static \u0275fac = function PlataformaAssinaturasComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PlataformaAssinaturasComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PlataformaAssinaturasComponent, selectors: [["app-plataforma-assinaturas"]], decls: 7, vars: 3, consts: [[1, "relative", "min-h-[300px]"], [1, "flex", "items-center", "justify-between", "mb-4"], [1, "text-xs", 2, "color", "var(--c-muted)"], [3, "rows"], [1, "card", "p-4", "rounded-xl", "mt-4", 2, "background", "rgba(239,68,68,0.08)", "border", "1px solid rgba(239,68,68,0.3)"], [1, "zm-content-enter"], [1, "text-sm", 2, "color", "var(--c-text)"], [1, "overflow-x-auto", "rounded-xl", "border", 2, "border-color", "var(--c-border)", "background", "var(--c-surface)"], [1, "platform-table"], [1, "py-2", "pr-3"], [1, "py-2", "px-3"], [1, "py-2", "pl-3"], [1, "py-2.5", "pr-3"], [1, "text-xs", "font-semibold", 2, "color", "var(--c-text)"], [1, "py-2.5", "px-3", "cell-muted"], [1, "py-2.5", "pl-3", "cell-muted"], ["colspan", "6", 1, "py-6", "text-center", "text-xs", "cell-muted"]], template: function PlataformaAssinaturasComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "p", 2);
      \u0275\u0275text(3);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(4, PlataformaAssinaturasComponent_Conditional_4_Template, 1, 1, "zm-skeleton-list", 3)(5, PlataformaAssinaturasComponent_Conditional_5_Template, 0, 0)(6, PlataformaAssinaturasComponent_Conditional_6_Template, 2, 1);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate2(" ", ctx.assinaturas.length, " ", ctx.assinaturas.length === 1 ? "assinatura" : "assinaturas", ". ");
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showSkeleton() ? 4 : !ctx.listaPronta ? 5 : 6);
    }
  }, dependencies: [CommonModule, ZmSkeletonListComponent], styles: ["\n\n/*# sourceMappingURL=plataforma-assinaturas.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PlataformaAssinaturasComponent, [{
    type: Component,
    args: [{ selector: "app-plataforma-assinaturas", standalone: true, imports: [CommonModule, ZmSkeletonListComponent], template: `<!-- Listagem de assinaturas da plataforma -->\r
<div class="relative min-h-[300px]">\r
  <div class="flex items-center justify-between mb-4">\r
  <p class="text-xs" style="color: var(--c-muted)">\r
    {{ assinaturas.length }} {{ assinaturas.length === 1 ? 'assinatura' : 'assinaturas' }}.\r
  </p>\r
</div>\r
\r
@if (showSkeleton()) {\r
  <zm-skeleton-list [rows]="6" />\r
} @else if (!listaPronta) {\r
} @else {\r
@if (estadoErro) {\r
  <div class="card p-4 rounded-xl mt-4" style="background: rgba(239,68,68,0.08); border: 1px solid rgba(239,68,68,0.3)">\r
    <p class="text-sm" style="color: var(--c-text)">N\xE3o foi poss\xEDvel carregar as assinaturas.</p>\r
  </div>\r
} @else {\r
<div class="zm-content-enter">\r
<div class="overflow-x-auto rounded-xl border" style="border-color: var(--c-border); background: var(--c-surface)">\r
  <table class="platform-table">\r
    <thead>\r
      <tr>\r
        <th class="py-2 pr-3">Cliente</th>\r
        <th class="py-2 px-3">Empresa</th>\r
        <th class="py-2 px-3">Plano</th>\r
        <th class="py-2 px-3">Status assinatura</th>\r
        <th class="py-2 px-3">Status cobran\xE7a</th>\r
        <th class="py-2 pl-3">Pr\xF3ximo ciclo</th>\r
      </tr>\r
    </thead>\r
    <tbody>\r
      @for (a of assinaturas; track a.clinic_id + '_' + a.tenant_id) {\r
        <tr>\r
          <td class="py-2.5 pr-3">\r
            <span class="text-xs font-semibold" style="color: var(--c-text)">{{ a.tenant_name }}</span>\r
          </td>\r
          <td class="py-2.5 px-3 cell-muted">{{ a.clinic_name }}</td>\r
          <td class="py-2.5 px-3 cell-muted">{{ a.plan_key || '\u2014' }}</td>\r
          <td class="py-2.5 px-3 cell-muted">{{ rotuloStatusAssinaturaCobranca(a.subscription_status) }}</td>\r
          <td class="py-2.5 px-3 cell-muted">{{ rotuloStatusAssinaturaCobranca(a.billing_status) }}</td>\r
          <td class="py-2.5 pl-3 cell-muted">{{ formatarData(a.current_period_end) }}</td>\r
        </tr>\r
      } @empty {\r
        <tr>\r
          <td colspan="6" class="py-6 text-center text-xs cell-muted">\r
            Nenhuma assinatura cadastrada.\r
          </td>\r
        </tr>\r
      }\r
    </tbody>\r
  </table>\r
</div>\r
</div>\r
}\r
}\r
</div>\r
`, styles: ["/* src/app/paginas/plataforma/plataforma-assinaturas/plataforma-assinaturas.component.css */\n/*# sourceMappingURL=plataforma-assinaturas.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PlataformaAssinaturasComponent, { className: "PlataformaAssinaturasComponent", filePath: "src/app/paginas/plataforma/plataforma-assinaturas/plataforma-assinaturas.component.ts", lineNumber: 16 });
})();
export {
  PlataformaAssinaturasComponent
};
//# sourceMappingURL=chunk-2LKCDVZJ.js.map
