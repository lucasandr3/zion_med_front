import {
  PlataformaService
} from "./chunk-YNOSNX2Z.js";
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

// src/app/paginas/plataforma/plataforma-leads/plataforma-leads.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function PlataformaLeadsComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "zm-skeleton-list", 3);
  }
  if (rf & 2) {
    \u0275\u0275property("rows", 6);
  }
}
function PlataformaLeadsComponent_Conditional_5_Template(rf, ctx) {
}
function PlataformaLeadsComponent_Conditional_6_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4)(1, "p", 6);
    \u0275\u0275text(2, "N\xE3o foi poss\xEDvel carregar os leads.");
    \u0275\u0275elementEnd()();
  }
}
function PlataformaLeadsComponent_Conditional_6_Conditional_1_For_19_Template(rf, ctx) {
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
    \u0275\u0275elementStart(10, "td", 15);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "td", 16);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const lead_r1 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(lead_r1.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(lead_r1.email);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(lead_r1.phone || "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(lead_r1.clinic || "\u2014");
    \u0275\u0275advance();
    \u0275\u0275property("title", lead_r1.message || "");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(lead_r1.message || "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.formatarData(lead_r1.created_at));
  }
}
function PlataformaLeadsComponent_Conditional_6_Conditional_1_ForEmpty_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 17);
    \u0275\u0275text(2, " Nenhum lead cadastrado. ");
    \u0275\u0275elementEnd()();
  }
}
function PlataformaLeadsComponent_Conditional_6_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5)(1, "div", 7)(2, "table", 8)(3, "thead")(4, "tr")(5, "th", 9);
    \u0275\u0275text(6, "Nome");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th", 10);
    \u0275\u0275text(8, "Email");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th", 10);
    \u0275\u0275text(10, "Telefone");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "th", 10);
    \u0275\u0275text(12, "Cl\xEDnica");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "th", 10);
    \u0275\u0275text(14, "Mensagem");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "th", 11);
    \u0275\u0275text(16, "Data");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(17, "tbody");
    \u0275\u0275repeaterCreate(18, PlataformaLeadsComponent_Conditional_6_Conditional_1_For_19_Template, 14, 7, "tr", null, _forTrack0, false, PlataformaLeadsComponent_Conditional_6_Conditional_1_ForEmpty_20_Template, 3, 0, "tr");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(18);
    \u0275\u0275repeater(ctx_r1.leads);
  }
}
function PlataformaLeadsComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, PlataformaLeadsComponent_Conditional_6_Conditional_0_Template, 3, 0, "div", 4)(1, PlataformaLeadsComponent_Conditional_6_Conditional_1_Template, 21, 1, "div", 5);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r1.estadoErro ? 0 : 1);
  }
}
var PlataformaLeadsComponent = class _PlataformaLeadsComponent {
  showSkeleton;
  listaPronta = false;
  estadoErro = false;
  leads = [];
  plataformaService = inject(PlataformaService);
  loadingService = inject(LoadingService);
  ngOnInit() {
    const { data$, showSkeleton } = this.loadingService.loadWithThreshold(this.plataformaService.getLeads());
    this.showSkeleton = showSkeleton;
    data$.subscribe({
      next: (res) => {
        this.listaPronta = true;
        this.leads = res.data ?? [];
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
      return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
    } catch {
      return iso;
    }
  }
  static \u0275fac = function PlataformaLeadsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PlataformaLeadsComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PlataformaLeadsComponent, selectors: [["app-plataforma-leads"]], decls: 7, vars: 3, consts: [[1, "relative", "min-h-[300px]"], [1, "flex", "items-center", "justify-between", "mb-4"], [1, "text-xs", 2, "color", "var(--c-muted)"], [3, "rows"], [1, "card", "p-4", "rounded-xl", "mt-4", 2, "background", "rgba(239,68,68,0.08)", "border", "1px solid rgba(239,68,68,0.3)"], [1, "zm-content-enter"], [1, "text-sm", 2, "color", "var(--c-text)"], [1, "overflow-x-auto", "rounded-xl", "border", 2, "border-color", "var(--c-border)", "background", "var(--c-surface)"], [1, "platform-table"], [1, "py-2", "pr-3"], [1, "py-2", "px-3"], [1, "py-2", "pl-3"], [1, "py-2.5", "pr-3"], [1, "text-xs", "font-semibold", 2, "color", "var(--c-text)"], [1, "py-2.5", "px-3", "cell-muted"], [1, "py-2.5", "px-3", "cell-muted", "max-w-[200px]", "truncate", 3, "title"], [1, "py-2.5", "pl-3", "cell-muted"], ["colspan", "6", 1, "py-6", "text-center", "text-xs", "cell-muted"]], template: function PlataformaLeadsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "p", 2);
      \u0275\u0275text(3);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(4, PlataformaLeadsComponent_Conditional_4_Template, 1, 1, "zm-skeleton-list", 3)(5, PlataformaLeadsComponent_Conditional_5_Template, 0, 0)(6, PlataformaLeadsComponent_Conditional_6_Template, 2, 1);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate2(" ", ctx.leads.length, " ", ctx.leads.length === 1 ? "lead" : "leads", " cadastrados. ");
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showSkeleton() ? 4 : !ctx.listaPronta ? 5 : 6);
    }
  }, dependencies: [CommonModule, ZmSkeletonListComponent], styles: ["\n\n/*# sourceMappingURL=plataforma-leads.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PlataformaLeadsComponent, [{
    type: Component,
    args: [{ selector: "app-plataforma-leads", standalone: true, imports: [CommonModule, ZmSkeletonListComponent], template: `<!-- Igual ao backend: listagem de leads da plataforma -->\r
<div class="relative min-h-[300px]">\r
  <div class="flex items-center justify-between mb-4">\r
  <p class="text-xs" style="color: var(--c-muted)">\r
    {{ leads.length }} {{ leads.length === 1 ? 'lead' : 'leads' }} cadastrados.\r
  </p>\r
</div>\r
\r
@if (showSkeleton()) {\r
  <zm-skeleton-list [rows]="6" />\r
} @else if (!listaPronta) {\r
} @else {\r
@if (estadoErro) {\r
  <div class="card p-4 rounded-xl mt-4" style="background: rgba(239,68,68,0.08); border: 1px solid rgba(239,68,68,0.3)">\r
    <p class="text-sm" style="color: var(--c-text)">N\xE3o foi poss\xEDvel carregar os leads.</p>\r
  </div>\r
} @else {\r
<div class="zm-content-enter">\r
<div class="overflow-x-auto rounded-xl border" style="border-color: var(--c-border); background: var(--c-surface)">\r
  <table class="platform-table">\r
    <thead>\r
      <tr>\r
        <th class="py-2 pr-3">Nome</th>\r
        <th class="py-2 px-3">Email</th>\r
        <th class="py-2 px-3">Telefone</th>\r
        <th class="py-2 px-3">Cl\xEDnica</th>\r
        <th class="py-2 px-3">Mensagem</th>\r
        <th class="py-2 pl-3">Data</th>\r
      </tr>\r
    </thead>\r
    <tbody>\r
      @for (lead of leads; track lead.id) {\r
        <tr>\r
          <td class="py-2.5 pr-3">\r
            <span class="text-xs font-semibold" style="color: var(--c-text)">{{ lead.name }}</span>\r
          </td>\r
          <td class="py-2.5 px-3 cell-muted">{{ lead.email }}</td>\r
          <td class="py-2.5 px-3 cell-muted">{{ lead.phone || '\u2014' }}</td>\r
          <td class="py-2.5 px-3 cell-muted">{{ lead.clinic || '\u2014' }}</td>\r
          <td class="py-2.5 px-3 cell-muted max-w-[200px] truncate" [title]="lead.message || ''">{{ lead.message || '\u2014' }}</td>\r
          <td class="py-2.5 pl-3 cell-muted">{{ formatarData(lead.created_at) }}</td>\r
        </tr>\r
      } @empty {\r
        <tr>\r
          <td colspan="6" class="py-6 text-center text-xs cell-muted">\r
            Nenhum lead cadastrado.\r
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
`, styles: ["/* src/app/paginas/plataforma/plataforma-leads/plataforma-leads.component.css */\n/*# sourceMappingURL=plataforma-leads.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PlataformaLeadsComponent, { className: "PlataformaLeadsComponent", filePath: "src/app/paginas/plataforma/plataforma-leads/plataforma-leads.component.ts", lineNumber: 14 });
})();
export {
  PlataformaLeadsComponent
};
//# sourceMappingURL=chunk-3DU6XPFU.js.map
