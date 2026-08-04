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
  RouterLink
} from "./chunk-C2NWBPZH.js";
import {
  CommonModule,
  Component,
  UpperCasePipe,
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
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-GRLISYEV.js";

// src/app/paginas/plataforma/plataforma-clientes/plataforma-clientes.component.ts
var _c0 = (a0) => ["/plataforma/clientes", a0];
var _forTrack0 = ($index, $item) => $item.id;
function PlataformaClientesComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "zm-skeleton-list", 3);
  }
  if (rf & 2) {
    \u0275\u0275property("rows", 6);
  }
}
function PlataformaClientesComponent_Conditional_5_Template(rf, ctx) {
}
function PlataformaClientesComponent_Conditional_6_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4)(1, "p", 6);
    \u0275\u0275text(2, "N\xE3o foi poss\xEDvel carregar os clientes.");
    \u0275\u0275elementEnd()();
  }
}
function PlataformaClientesComponent_Conditional_6_Conditional_1_For_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 13)(2, "div", 14)(3, "div", 15);
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "uppercase");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 16);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(8, "td", 17);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "td", 18);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "td", 19)(13, "a", 20)(14, "span", 21);
    \u0275\u0275text(15, "open_in_new");
    \u0275\u0275elementEnd();
    \u0275\u0275text(16, " Ver detalhes ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const tenant_r1 = ctx.$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(5, 5, (tenant_r1.name || "").charAt(0)), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(tenant_r1.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(tenant_r1.slug);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(tenant_r1.clinics_count);
    \u0275\u0275advance(2);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(7, _c0, tenant_r1.id));
  }
}
function PlataformaClientesComponent_Conditional_6_Conditional_1_ForEmpty_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 22);
    \u0275\u0275text(2, " Nenhum tenant cadastrado. ");
    \u0275\u0275elementEnd()();
  }
}
function PlataformaClientesComponent_Conditional_6_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5)(1, "div", 7)(2, "table", 8)(3, "thead")(4, "tr")(5, "th", 9);
    \u0275\u0275text(6, "Cliente");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th", 10);
    \u0275\u0275text(8, "Slug");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th", 11);
    \u0275\u0275text(10, "Empresas");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "th", 12);
    \u0275\u0275text(12, "A\xE7\xF5es");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(13, "tbody");
    \u0275\u0275repeaterCreate(14, PlataformaClientesComponent_Conditional_6_Conditional_1_For_15_Template, 17, 9, "tr", null, _forTrack0, false, PlataformaClientesComponent_Conditional_6_Conditional_1_ForEmpty_16_Template, 3, 0, "tr");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(14);
    \u0275\u0275repeater(ctx_r1.tenants);
  }
}
function PlataformaClientesComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, PlataformaClientesComponent_Conditional_6_Conditional_0_Template, 3, 0, "div", 4)(1, PlataformaClientesComponent_Conditional_6_Conditional_1_Template, 17, 1, "div", 5);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r1.estadoErro ? 0 : 1);
  }
}
var PlataformaClientesComponent = class _PlataformaClientesComponent {
  showSkeleton;
  listaPronta = false;
  estadoErro = false;
  tenants = [];
  plataformaService = inject(PlataformaService);
  loadingService = inject(LoadingService);
  ngOnInit() {
    const { data$, showSkeleton } = this.loadingService.loadWithThreshold(this.plataformaService.getTenants());
    this.showSkeleton = showSkeleton;
    data$.subscribe({
      next: (res) => {
        this.listaPronta = true;
        this.tenants = res.data ?? [];
      },
      error: () => {
        this.listaPronta = true;
        this.estadoErro = true;
      }
    });
  }
  static \u0275fac = function PlataformaClientesComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PlataformaClientesComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PlataformaClientesComponent, selectors: [["app-plataforma-clientes"]], decls: 7, vars: 3, consts: [[1, "relative", "min-h-[300px]"], [1, "flex", "items-center", "justify-between", "mb-4"], [1, "text-xs", 2, "color", "var(--c-muted)"], [3, "rows"], [1, "card", "p-4", "rounded-xl", "mt-4", 2, "background", "rgba(239,68,68,0.08)", "border", "1px solid rgba(239,68,68,0.3)"], [1, "zm-content-enter"], [1, "text-sm", 2, "color", "var(--c-text)"], [1, "overflow-x-auto", "rounded-xl", "border", 2, "border-color", "var(--c-border)", "background", "var(--c-surface)"], [1, "platform-table"], [1, "py-2", "pr-3"], [1, "py-2", "px-3"], [1, "py-2", "px-3", "text-center"], [1, "py-2", "pl-3", "text-right"], [1, "py-2.5", "pr-3"], [1, "flex", "items-center", "gap-2"], [1, "w-7", "h-7", "rounded-lg", "flex", "items-center", "justify-center", "text-[11px]", "font-semibold", 2, "background", "color-mix(in srgb, var(--c-primary) 18%, transparent)", "color", "var(--c-primary)"], [1, "text-xs", "font-semibold", 2, "color", "var(--c-text)"], [1, "py-2.5", "px-3", "cell-muted"], [1, "py-2.5", "px-3", "text-center"], [1, "py-2.5", "pl-3", "text-right"], ["title", "Ver detalhes do cliente", 1, "btn-cell", 3, "routerLink"], [1, "material-symbols-outlined", 2, "font-size", "14px"], ["colspan", "4", 1, "py-6", "text-center", "text-xs", "cell-muted"]], template: function PlataformaClientesComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "p", 2);
      \u0275\u0275text(3);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(4, PlataformaClientesComponent_Conditional_4_Template, 1, 1, "zm-skeleton-list", 3)(5, PlataformaClientesComponent_Conditional_5_Template, 0, 0)(6, PlataformaClientesComponent_Conditional_6_Template, 2, 1);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate2(" ", ctx.tenants.length, " ", ctx.tenants.length === 1 ? "cliente" : "clientes", " cadastrados. ");
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showSkeleton() ? 4 : !ctx.listaPronta ? 5 : 6);
    }
  }, dependencies: [CommonModule, RouterLink, ZmSkeletonListComponent, UpperCasePipe], styles: ["\n\n/*# sourceMappingURL=plataforma-clientes.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PlataformaClientesComponent, [{
    type: Component,
    args: [{ selector: "app-plataforma-clientes", standalone: true, imports: [CommonModule, RouterLink, ZmSkeletonListComponent], template: `<!-- Igual ao backend: platform/tenants/index - vis\xE3o do dono da plataforma -->\r
<div class="relative min-h-[300px]">\r
  <div class="flex items-center justify-between mb-4">\r
  <p class="text-xs" style="color: var(--c-muted)">\r
    {{ tenants.length }} {{ tenants.length === 1 ? 'cliente' : 'clientes' }} cadastrados.\r
  </p>\r
</div>\r
\r
@if (showSkeleton()) {\r
  <zm-skeleton-list [rows]="6" />\r
} @else if (!listaPronta) {\r
} @else {\r
@if (estadoErro) {\r
  <div class="card p-4 rounded-xl mt-4" style="background: rgba(239,68,68,0.08); border: 1px solid rgba(239,68,68,0.3)">\r
    <p class="text-sm" style="color: var(--c-text)">N\xE3o foi poss\xEDvel carregar os clientes.</p>\r
  </div>\r
} @else {\r
<div class="zm-content-enter">\r
<div class="overflow-x-auto rounded-xl border" style="border-color: var(--c-border); background: var(--c-surface)">\r
  <table class="platform-table">\r
    <thead>\r
      <tr>\r
        <th class="py-2 pr-3">Cliente</th>\r
        <th class="py-2 px-3">Slug</th>\r
        <th class="py-2 px-3 text-center">Empresas</th>\r
        <th class="py-2 pl-3 text-right">A\xE7\xF5es</th>\r
      </tr>\r
    </thead>\r
    <tbody>\r
      @for (tenant of tenants; track tenant.id) {\r
        <tr>\r
          <td class="py-2.5 pr-3">\r
            <div class="flex items-center gap-2">\r
              <div class="w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-semibold"\r
                   style="background: color-mix(in srgb, var(--c-primary) 18%, transparent); color: var(--c-primary)">\r
                {{ (tenant.name || '').charAt(0) | uppercase }}\r
              </div>\r
              <div class="text-xs font-semibold" style="color: var(--c-text)">{{ tenant.name }}</div>\r
            </div>\r
          </td>\r
          <td class="py-2.5 px-3 cell-muted">{{ tenant.slug }}</td>\r
          <td class="py-2.5 px-3 text-center">{{ tenant.clinics_count }}</td>\r
          <td class="py-2.5 pl-3 text-right">\r
            <a [routerLink]="['/plataforma/clientes', tenant.id]" class="btn-cell" title="Ver detalhes do cliente">\r
              <span class="material-symbols-outlined" style="font-size: 14px">open_in_new</span>\r
              Ver detalhes\r
            </a>\r
          </td>\r
        </tr>\r
      } @empty {\r
        <tr>\r
          <td colspan="4" class="py-6 text-center text-xs cell-muted">\r
            Nenhum tenant cadastrado.\r
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
`, styles: ["/* src/app/paginas/plataforma/plataforma-clientes/plataforma-clientes.component.css */\n/*# sourceMappingURL=plataforma-clientes.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PlataformaClientesComponent, { className: "PlataformaClientesComponent", filePath: "src/app/paginas/plataforma/plataforma-clientes/plataforma-clientes.component.ts", lineNumber: 15 });
})();
export {
  PlataformaClientesComponent
};
//# sourceMappingURL=chunk-HNLRRWQ5.js.map
