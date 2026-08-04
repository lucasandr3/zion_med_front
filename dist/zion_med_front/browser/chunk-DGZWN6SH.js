import {
  PlataformaService
} from "./chunk-YNOSNX2Z.js";
import {
  statusFaturaPt
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

// src/app/paginas/plataforma/plataforma-faturas/plataforma-faturas.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function PlataformaFaturasComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "zm-skeleton-list", 3);
  }
  if (rf & 2) {
    \u0275\u0275property("rows", 6);
  }
}
function PlataformaFaturasComponent_Conditional_5_Template(rf, ctx) {
}
function PlataformaFaturasComponent_Conditional_6_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4)(1, "p", 6);
    \u0275\u0275text(2, "N\xE3o foi poss\xEDvel carregar as faturas.");
    \u0275\u0275elementEnd()();
  }
}
function PlataformaFaturasComponent_Conditional_6_Conditional_1_For_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 13)(2, "span", 14);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "td", 15);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "td", 15);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td", 16);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "td", 15);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "td", 15);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "td", 17);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const f_r1 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(f_r1.tenant_name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(f_r1.clinic_name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(f_r1.reference || "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.formatarValor(f_r1.amount, f_r1.currency));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.formatarData(f_r1.due_date));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.rotuloStatusFatura(f_r1.status));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.formatarData(f_r1.paid_at));
  }
}
function PlataformaFaturasComponent_Conditional_6_Conditional_1_ForEmpty_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 18);
    \u0275\u0275text(2, " Nenhuma fatura cadastrada. ");
    \u0275\u0275elementEnd()();
  }
}
function PlataformaFaturasComponent_Conditional_6_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5)(1, "div", 7)(2, "table", 8)(3, "thead")(4, "tr")(5, "th", 9);
    \u0275\u0275text(6, "Cliente");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th", 10);
    \u0275\u0275text(8, "Empresa");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th", 10);
    \u0275\u0275text(10, "Refer\xEAncia");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "th", 11);
    \u0275\u0275text(12, "Valor");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "th", 10);
    \u0275\u0275text(14, "Vencimento");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "th", 10);
    \u0275\u0275text(16, "Status");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "th", 12);
    \u0275\u0275text(18, "Pago em");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(19, "tbody");
    \u0275\u0275repeaterCreate(20, PlataformaFaturasComponent_Conditional_6_Conditional_1_For_21_Template, 16, 7, "tr", null, _forTrack0, false, PlataformaFaturasComponent_Conditional_6_Conditional_1_ForEmpty_22_Template, 3, 0, "tr");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(20);
    \u0275\u0275repeater(ctx_r1.faturas);
  }
}
function PlataformaFaturasComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, PlataformaFaturasComponent_Conditional_6_Conditional_0_Template, 3, 0, "div", 4)(1, PlataformaFaturasComponent_Conditional_6_Conditional_1_Template, 23, 1, "div", 5);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r1.estadoErro ? 0 : 1);
  }
}
var PlataformaFaturasComponent = class _PlataformaFaturasComponent {
  rotuloStatusFatura = statusFaturaPt;
  showSkeleton;
  listaPronta = false;
  estadoErro = false;
  faturas = [];
  plataformaService = inject(PlataformaService);
  loadingService = inject(LoadingService);
  ngOnInit() {
    const { data$, showSkeleton } = this.loadingService.loadWithThreshold(this.plataformaService.getInvoices());
    this.showSkeleton = showSkeleton;
    data$.subscribe({
      next: (res) => {
        this.listaPronta = true;
        this.faturas = res.data ?? [];
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
  formatarValor(valor, moeda) {
    if (valor == null)
      return "\u2014";
    const symbol = moeda === "BRL" || !moeda ? "R$" : moeda;
    return symbol + " " + valor.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
  static \u0275fac = function PlataformaFaturasComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PlataformaFaturasComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PlataformaFaturasComponent, selectors: [["app-plataforma-faturas"]], decls: 7, vars: 3, consts: [[1, "relative", "min-h-[300px]"], [1, "flex", "items-center", "justify-between", "mb-4"], [1, "text-xs", 2, "color", "var(--c-muted)"], [3, "rows"], [1, "card", "p-4", "rounded-xl", "mt-4", 2, "background", "rgba(239,68,68,0.08)", "border", "1px solid rgba(239,68,68,0.3)"], [1, "zm-content-enter"], [1, "text-sm", 2, "color", "var(--c-text)"], [1, "overflow-x-auto", "rounded-xl", "border", 2, "border-color", "var(--c-border)", "background", "var(--c-surface)"], [1, "platform-table"], [1, "py-2", "pr-3"], [1, "py-2", "px-3"], [1, "py-2", "px-3", "text-right"], [1, "py-2", "pl-3"], [1, "py-2.5", "pr-3"], [1, "text-xs", "font-semibold", 2, "color", "var(--c-text)"], [1, "py-2.5", "px-3", "cell-muted"], [1, "py-2.5", "px-3", "text-right", "cell-muted"], [1, "py-2.5", "pl-3", "cell-muted"], ["colspan", "7", 1, "py-6", "text-center", "text-xs", "cell-muted"]], template: function PlataformaFaturasComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "p", 2);
      \u0275\u0275text(3);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(4, PlataformaFaturasComponent_Conditional_4_Template, 1, 1, "zm-skeleton-list", 3)(5, PlataformaFaturasComponent_Conditional_5_Template, 0, 0)(6, PlataformaFaturasComponent_Conditional_6_Template, 2, 1);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate2(" ", ctx.faturas.length, " ", ctx.faturas.length === 1 ? "fatura" : "faturas", ". ");
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showSkeleton() ? 4 : !ctx.listaPronta ? 5 : 6);
    }
  }, dependencies: [CommonModule, ZmSkeletonListComponent], styles: ["\n\n/*# sourceMappingURL=plataforma-faturas.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PlataformaFaturasComponent, [{
    type: Component,
    args: [{ selector: "app-plataforma-faturas", standalone: true, imports: [CommonModule, ZmSkeletonListComponent], template: `<!-- Listagem de faturas e cobran\xE7as da plataforma -->\r
<div class="relative min-h-[300px]">\r
  <div class="flex items-center justify-between mb-4">\r
  <p class="text-xs" style="color: var(--c-muted)">\r
    {{ faturas.length }} {{ faturas.length === 1 ? 'fatura' : 'faturas' }}.\r
  </p>\r
</div>\r
\r
@if (showSkeleton()) {\r
  <zm-skeleton-list [rows]="6" />\r
} @else if (!listaPronta) {\r
} @else {\r
@if (estadoErro) {\r
  <div class="card p-4 rounded-xl mt-4" style="background: rgba(239,68,68,0.08); border: 1px solid rgba(239,68,68,0.3)">\r
    <p class="text-sm" style="color: var(--c-text)">N\xE3o foi poss\xEDvel carregar as faturas.</p>\r
  </div>\r
} @else {\r
<div class="zm-content-enter">\r
<div class="overflow-x-auto rounded-xl border" style="border-color: var(--c-border); background: var(--c-surface)">\r
  <table class="platform-table">\r
    <thead>\r
      <tr>\r
        <th class="py-2 pr-3">Cliente</th>\r
        <th class="py-2 px-3">Empresa</th>\r
        <th class="py-2 px-3">Refer\xEAncia</th>\r
        <th class="py-2 px-3 text-right">Valor</th>\r
        <th class="py-2 px-3">Vencimento</th>\r
        <th class="py-2 px-3">Status</th>\r
        <th class="py-2 pl-3">Pago em</th>\r
      </tr>\r
    </thead>\r
    <tbody>\r
      @for (f of faturas; track f.id) {\r
        <tr>\r
          <td class="py-2.5 pr-3">\r
            <span class="text-xs font-semibold" style="color: var(--c-text)">{{ f.tenant_name }}</span>\r
          </td>\r
          <td class="py-2.5 px-3 cell-muted">{{ f.clinic_name }}</td>\r
          <td class="py-2.5 px-3 cell-muted">{{ f.reference || '\u2014' }}</td>\r
          <td class="py-2.5 px-3 text-right cell-muted">{{ formatarValor(f.amount, f.currency) }}</td>\r
          <td class="py-2.5 px-3 cell-muted">{{ formatarData(f.due_date) }}</td>\r
          <td class="py-2.5 px-3 cell-muted">{{ rotuloStatusFatura(f.status) }}</td>\r
          <td class="py-2.5 pl-3 cell-muted">{{ formatarData(f.paid_at) }}</td>\r
        </tr>\r
      } @empty {\r
        <tr>\r
          <td colspan="7" class="py-6 text-center text-xs cell-muted">\r
            Nenhuma fatura cadastrada.\r
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
`, styles: ["/* src/app/paginas/plataforma/plataforma-faturas/plataforma-faturas.component.css */\n/*# sourceMappingURL=plataforma-faturas.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PlataformaFaturasComponent, { className: "PlataformaFaturasComponent", filePath: "src/app/paginas/plataforma/plataforma-faturas/plataforma-faturas.component.ts", lineNumber: 15 });
})();
export {
  PlataformaFaturasComponent
};
//# sourceMappingURL=chunk-DGZWN6SH.js.map
