import {
  PlataformaHeaderService
} from "./chunk-Y5AJ4MLH.js";
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
  ActivatedRoute
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
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-GRLISYEV.js";

// src/app/paginas/plataforma/plataforma-cliente-detalhe/plataforma-cliente-detalhe.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function PlataformaClienteDetalheComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "zm-skeleton-list", 1);
  }
  if (rf & 2) {
    \u0275\u0275property("rows", 6);
  }
}
function PlataformaClienteDetalheComponent_Conditional_2_Template(rf, ctx) {
}
function PlataformaClienteDetalheComponent_Conditional_3_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2)(1, "p", 4);
    \u0275\u0275text(2, "N\xE3o foi poss\xEDvel carregar o cliente.");
    \u0275\u0275elementEnd()();
  }
}
function PlataformaClienteDetalheComponent_Conditional_3_Conditional_1_For_37_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 20);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r1 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(c_r1.address);
  }
}
function PlataformaClienteDetalheComponent_Conditional_3_Conditional_1_For_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 18)(2, "div", 19);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(4, PlataformaClienteDetalheComponent_Conditional_3_Conditional_1_For_37_Conditional_4_Template, 2, 1, "div", 20);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td", 21);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td", 21);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td", 21);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "td", 22);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const c_r1 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(c_r1.name);
    \u0275\u0275advance();
    \u0275\u0275conditional(c_r1.address ? 4 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(c_r1.plan_key || "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.rotuloStatusAssinaturaCobranca(c_r1.subscription_status));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.rotuloStatusAssinaturaCobranca(c_r1.billing_status));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(c_r1.users_count);
  }
}
function PlataformaClienteDetalheComponent_Conditional_3_Conditional_1_ForEmpty_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 23);
    \u0275\u0275text(2, " Nenhuma empresa vinculada a este tenant. ");
    \u0275\u0275elementEnd()();
  }
}
function PlataformaClienteDetalheComponent_Conditional_3_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 3)(1, "div", 5)(2, "div", 6)(3, "div", 7);
    \u0275\u0275text(4, " Cliente ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 8);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 9);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 6)(10, "div", 7);
    \u0275\u0275text(11, " Empresas ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 10);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 6)(15, "div", 7);
    \u0275\u0275text(16, " Atalho ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "p", 11);
    \u0275\u0275text(18, " Use esta vis\xE3o apenas para gest\xE3o executiva. O acesso operacional \xE0s empresas continua sendo feito pelo app do tenant. ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(19, "h2", 12);
    \u0275\u0275text(20, " Empresas do tenant ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "div", 13)(22, "table", 14)(23, "thead")(24, "tr")(25, "th", 15);
    \u0275\u0275text(26, "Empresa");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "th", 16);
    \u0275\u0275text(28, "Plano");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "th", 16);
    \u0275\u0275text(30, "Status ass.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "th", 16);
    \u0275\u0275text(32, "Status cobran\xE7a");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "th", 17);
    \u0275\u0275text(34, "Usu\xE1rios");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(35, "tbody");
    \u0275\u0275repeaterCreate(36, PlataformaClienteDetalheComponent_Conditional_3_Conditional_1_For_37_Template, 13, 6, "tr", null, _forTrack0, false, PlataformaClienteDetalheComponent_Conditional_3_Conditional_1_ForEmpty_38_Template, 3, 0, "tr");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.data.tenant.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Slug: ", ctx_r1.data.tenant.slug);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.data.clinics.length);
    \u0275\u0275advance(23);
    \u0275\u0275repeater(ctx_r1.data.clinics);
  }
}
function PlataformaClienteDetalheComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, PlataformaClienteDetalheComponent_Conditional_3_Conditional_0_Template, 3, 0, "div", 2);
    \u0275\u0275conditionalCreate(1, PlataformaClienteDetalheComponent_Conditional_3_Conditional_1_Template, 39, 4, "div", 3);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r1.estadoErro ? 0 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.data ? 1 : -1);
  }
}
var PlataformaClienteDetalheComponent = class _PlataformaClienteDetalheComponent {
  rotuloStatusAssinaturaCobranca = statusAssinaturaOuCobrancaPt;
  showSkeleton;
  listaPronta = false;
  estadoErro = false;
  data = null;
  route = inject(ActivatedRoute);
  plataformaService = inject(PlataformaService);
  headerService = inject(PlataformaHeaderService);
  loadingService = inject(LoadingService);
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id");
    if (!id)
      return;
    const { data$, showSkeleton } = this.loadingService.loadWithThreshold(this.plataformaService.getTenant(+id));
    this.showSkeleton = showSkeleton;
    data$.subscribe({
      next: (res) => {
        this.listaPronta = true;
        this.data = res.data;
        if (res.data?.tenant) {
          this.headerService.setHeader("Cliente: " + res.data.tenant.name, "Detalhes do cliente e empresas vinculadas.");
        }
      },
      error: () => {
        this.listaPronta = true;
        this.estadoErro = true;
      }
    });
  }
  ngOnDestroy() {
    this.headerService.clearHeader();
  }
  static \u0275fac = function PlataformaClienteDetalheComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PlataformaClienteDetalheComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PlataformaClienteDetalheComponent, selectors: [["app-plataforma-cliente-detalhe"]], decls: 4, vars: 1, consts: [[1, "relative", "min-h-[300px]"], [3, "rows"], [1, "card", "p-4", "rounded-xl", "mb-6", 2, "background", "rgba(239,68,68,0.08)", "border", "1px solid rgba(239,68,68,0.3)"], [1, "zm-content-enter"], [1, "text-sm", 2, "color", "var(--c-text)"], [1, "grid", "grid-cols-1", "md:grid-cols-3", "gap-4", "mb-5"], [1, "card"], [1, "text-[11px]", "font-semibold", "tracking-[0.18em]", "uppercase", "mb-1", 2, "color", "var(--c-muted)"], [1, "text-sm", "font-semibold", 2, "color", "var(--c-text)"], [1, "text-[11px]", "mt-1", 2, "color", "var(--c-muted)"], [1, "text-2xl", "font-semibold", 2, "color", "var(--c-text)"], [1, "text-[11px]", 2, "color", "var(--c-muted)"], [1, "text-xs", "font-semibold", "tracking-[0.18em]", "uppercase", "mb-3", 2, "color", "var(--c-muted)"], [1, "overflow-x-auto", "rounded-xl", "border", 2, "border-color", "var(--c-border)", "background", "var(--c-surface)"], [1, "platform-table"], [1, "py-2", "pr-3"], [1, "py-2", "px-3"], [1, "py-2", "pl-3", "text-center"], [1, "py-2.5", "pr-3"], [1, "text-xs", "font-semibold", 2, "color", "var(--c-text)"], [1, "text-[11px]", "cell-muted"], [1, "py-2.5", "px-3"], [1, "py-2.5", "pl-3", "text-center"], ["colspan", "5", 1, "py-6", "text-center", "text-xs", "cell-muted"]], template: function PlataformaClienteDetalheComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275conditionalCreate(1, PlataformaClienteDetalheComponent_Conditional_1_Template, 1, 1, "zm-skeleton-list", 1)(2, PlataformaClienteDetalheComponent_Conditional_2_Template, 0, 0)(3, PlataformaClienteDetalheComponent_Conditional_3_Template, 2, 2);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showSkeleton() ? 1 : !ctx.listaPronta ? 2 : 3);
    }
  }, dependencies: [CommonModule, ZmSkeletonListComponent], styles: ["\n\n/*# sourceMappingURL=plataforma-cliente-detalhe.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PlataformaClienteDetalheComponent, [{
    type: Component,
    args: [{ selector: "app-plataforma-cliente-detalhe", standalone: true, imports: [CommonModule, ZmSkeletonListComponent], template: `<!-- Igual ao backend: platform/tenants/show - vis\xE3o do dono da plataforma -->\r
<div class="relative min-h-[300px]">\r
  @if (showSkeleton()) {\r
    <zm-skeleton-list [rows]="6" />\r
  } @else if (!listaPronta) {\r
  } @else {\r
  @if (estadoErro) {\r
    <div class="card p-4 rounded-xl mb-6" style="background: rgba(239,68,68,0.08); border: 1px solid rgba(239,68,68,0.3)">\r
      <p class="text-sm" style="color: var(--c-text)">N\xE3o foi poss\xEDvel carregar o cliente.</p>\r
    </div>\r
  }\r
\r
  @if (data) {\r
  <div class="zm-content-enter">\r
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">\r
    <div class="card">\r
      <div class="text-[11px] font-semibold tracking-[0.18em] uppercase mb-1" style="color: var(--c-muted)">\r
        Cliente\r
      </div>\r
      <div class="text-sm font-semibold" style="color: var(--c-text)">{{ data.tenant.name }}</div>\r
      <div class="text-[11px] mt-1" style="color: var(--c-muted)">Slug: {{ data.tenant.slug }}</div>\r
    </div>\r
    <div class="card">\r
      <div class="text-[11px] font-semibold tracking-[0.18em] uppercase mb-1" style="color: var(--c-muted)">\r
        Empresas\r
      </div>\r
      <div class="text-2xl font-semibold" style="color: var(--c-text)">{{ data.clinics.length }}</div>\r
    </div>\r
    <div class="card">\r
      <div class="text-[11px] font-semibold tracking-[0.18em] uppercase mb-1" style="color: var(--c-muted)">\r
        Atalho\r
      </div>\r
      <p class="text-[11px]" style="color: var(--c-muted)">\r
        Use esta vis\xE3o apenas para gest\xE3o executiva. O acesso operacional \xE0s empresas continua sendo feito pelo app do tenant.\r
      </p>\r
    </div>\r
  </div>\r
\r
  <h2 class="text-xs font-semibold tracking-[0.18em] uppercase mb-3" style="color: var(--c-muted)">\r
    Empresas do tenant\r
  </h2>\r
\r
  <div class="overflow-x-auto rounded-xl border" style="border-color: var(--c-border); background: var(--c-surface)">\r
    <table class="platform-table">\r
      <thead>\r
        <tr>\r
          <th class="py-2 pr-3">Empresa</th>\r
          <th class="py-2 px-3">Plano</th>\r
          <th class="py-2 px-3">Status ass.</th>\r
          <th class="py-2 px-3">Status cobran\xE7a</th>\r
          <th class="py-2 pl-3 text-center">Usu\xE1rios</th>\r
        </tr>\r
      </thead>\r
      <tbody>\r
        @for (c of data.clinics; track c.id) {\r
          <tr>\r
            <td class="py-2.5 pr-3">\r
              <div class="text-xs font-semibold" style="color: var(--c-text)">{{ c.name }}</div>\r
              @if (c.address) {\r
                <div class="text-[11px] cell-muted">{{ c.address }}</div>\r
              }\r
            </td>\r
            <td class="py-2.5 px-3">{{ c.plan_key || '\u2014' }}</td>\r
            <td class="py-2.5 px-3">{{ rotuloStatusAssinaturaCobranca(c.subscription_status) }}</td>\r
            <td class="py-2.5 px-3">{{ rotuloStatusAssinaturaCobranca(c.billing_status) }}</td>\r
            <td class="py-2.5 pl-3 text-center">{{ c.users_count }}</td>\r
          </tr>\r
        } @empty {\r
          <tr>\r
            <td colspan="5" class="py-6 text-center text-xs cell-muted">\r
              Nenhuma empresa vinculada a este tenant.\r
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
`, styles: ["/* src/app/paginas/plataforma/plataforma-cliente-detalhe/plataforma-cliente-detalhe.component.css */\n/*# sourceMappingURL=plataforma-cliente-detalhe.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PlataformaClienteDetalheComponent, { className: "PlataformaClienteDetalheComponent", filePath: "src/app/paginas/plataforma/plataforma-cliente-detalhe/plataforma-cliente-detalhe.component.ts", lineNumber: 17 });
})();
export {
  PlataformaClienteDetalheComponent
};
//# sourceMappingURL=chunk-YGSXRJEO.js.map
