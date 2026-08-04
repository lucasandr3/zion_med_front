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
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate3
} from "./chunk-GRLISYEV.js";

// src/app/paginas/plataforma/plataforma-logs/plataforma-logs.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function PlataformaLogsComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "zm-skeleton-list", 7);
  }
  if (rf & 2) {
    \u0275\u0275property("rows", 6);
  }
}
function PlataformaLogsComponent_Conditional_12_Template(rf, ctx) {
}
function PlataformaLogsComponent_Conditional_13_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8)(1, "p", 16);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.error);
  }
}
function PlataformaLogsComponent_Conditional_13_For_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 17);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 18)(4, "span", 19)(5, "span", 20);
    \u0275\u0275text(6, "info");
    \u0275\u0275elementEnd();
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "td", 21);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "td", 22);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const log_r2 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.formatarData(log_r2.created_at));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r0.actionLabel(log_r2.action), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(log_r2.organization_name ?? "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.detalheTexto(log_r2));
  }
}
function PlataformaLogsComponent_Conditional_13_ForEmpty_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 23)(2, "span", 24);
    \u0275\u0275text(3, "history");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 25);
    \u0275\u0275text(5, "Nenhum registro de auditoria.");
    \u0275\u0275elementEnd()()();
  }
}
function PlataformaLogsComponent_Conditional_13_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 15)(1, "span", 26);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 27)(4, "button", 28);
    \u0275\u0275listener("click", function PlataformaLogsComponent_Conditional_13_Conditional_18_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.goToPage(ctx_r0.currentPage - 1));
    });
    \u0275\u0275text(5, "Anterior");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 29);
    \u0275\u0275listener("click", function PlataformaLogsComponent_Conditional_13_Conditional_18_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.goToPage(ctx_r0.currentPage + 1));
    });
    \u0275\u0275text(7, "Pr\xF3xima");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate3("P\xE1gina ", ctx_r0.currentPage, " de ", ctx_r0.lastPage, " (", ctx_r0.total, " registros)");
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r0.currentPage <= 1);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r0.currentPage >= ctx_r0.lastPage);
  }
}
function PlataformaLogsComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, PlataformaLogsComponent_Conditional_13_Conditional_0_Template, 3, 1, "div", 8);
    \u0275\u0275elementStart(1, "div", 9)(2, "div", 10)(3, "table", 11)(4, "thead")(5, "tr")(6, "th", 12);
    \u0275\u0275text(7, "Data / Hora");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th", 13);
    \u0275\u0275text(9, "A\xE7\xE3o");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th", 13);
    \u0275\u0275text(11, "Empresa");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th", 14);
    \u0275\u0275text(13, "Detalhe");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(14, "tbody");
    \u0275\u0275repeaterCreate(15, PlataformaLogsComponent_Conditional_13_For_16_Template, 12, 4, "tr", null, _forTrack0, false, PlataformaLogsComponent_Conditional_13_ForEmpty_17_Template, 6, 0, "tr");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(18, PlataformaLogsComponent_Conditional_13_Conditional_18_Template, 8, 5, "div", 15);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r0.error ? 0 : -1);
    \u0275\u0275advance(15);
    \u0275\u0275repeater(ctx_r0.logs);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r0.lastPage > 1 ? 18 : -1);
  }
}
var PlataformaLogsComponent = class _PlataformaLogsComponent {
  showSkeleton;
  listaPronta = false;
  error = "";
  logs = [];
  currentPage = 1;
  lastPage = 1;
  total = 0;
  plataformaService = inject(PlataformaService);
  loadingService = inject(LoadingService);
  ngOnInit() {
    this.carregar();
  }
  carregar() {
    const { data$, showSkeleton } = this.loadingService.loadWithThreshold(this.plataformaService.getPlatformLogs(this.currentPage));
    this.showSkeleton = showSkeleton;
    data$.subscribe({
      next: (res) => {
        this.listaPronta = true;
        this.error = "";
        this.logs = res.data ?? [];
        this.currentPage = res.meta?.current_page ?? 1;
        this.lastPage = res.meta?.last_page ?? 1;
        this.total = res.meta?.total ?? 0;
      },
      error: () => {
        this.listaPronta = true;
        this.error = "N\xE3o foi poss\xEDvel carregar os logs.";
      }
    });
  }
  goToPage(page) {
    if (page < 1 || page > this.lastPage)
      return;
    this.currentPage = page;
    this.carregar();
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
  actionLabel(action) {
    const map = {
      create: "Criar",
      update: "Atualizar",
      delete: "Excluir",
      login: "Login",
      logout: "Logout",
      view: "Visualizar"
    };
    return map[action] ?? action;
  }
  entityTypeLabel(type) {
    if (!type)
      return "";
    const map = {
      plan: "Plano",
      tenant: "Cliente",
      clinic: "Empresa",
      user: "Usu\xE1rio",
      settings: "Configura\xE7\xE3o"
    };
    return map[type] ?? type;
  }
  detalheTexto(log) {
    const parts = [];
    if (log.entity_type) {
      parts.push(this.entityTypeLabel(log.entity_type) + (log.entity_id != null ? " #" + log.entity_id : ""));
    }
    const meta = log.meta_json;
    if (meta && typeof meta === "object") {
      Object.entries(meta).forEach(([k, v]) => {
        if (v !== null && v !== void 0 && typeof v !== "object") {
          parts.push(k + ": " + String(v));
        }
      });
    }
    return parts.length ? parts.join(" \xB7 ") : "\u2014";
  }
  static \u0275fac = function PlataformaLogsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PlataformaLogsComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PlataformaLogsComponent, selectors: [["app-plataforma-logs"]], decls: 14, vars: 1, consts: [[1, "relative", "min-h-[300px]"], [1, "flex", "items-center", "justify-between", "mb-4"], [1, "flex", "items-center", "gap-3"], [1, "w-10", "h-10", "rounded-lg", "flex", "items-center", "justify-center", 2, "background", "var(--c-soft)"], [1, "material-symbols-outlined", 2, "color", "var(--c-primary)"], [1, "text-base", "font-semibold", "m-0", 2, "color", "var(--c-text)"], [1, "text-sm", "mt-0.5", "mb-0", 2, "color", "var(--c-muted)"], [3, "rows"], [1, "card", "p-4", "rounded-xl", "mb-4", 2, "background", "rgba(239,68,68,0.08)", "border", "1px solid rgba(239,68,68,0.3)"], [1, "zm-content-enter"], [1, "overflow-x-auto", "rounded-xl", "border", 2, "border-color", "var(--c-border)", "background", "var(--c-surface)"], [1, "platform-table"], [1, "py-2", "pr-3"], [1, "py-2", "px-3"], [1, "py-2", "pl-3"], [1, "px-4", "py-3", "flex", "items-center", "justify-between", "border-t", 2, "border-color", "var(--c-border)"], [1, "text-sm", "m-0", 2, "color", "var(--c-text)"], [1, "py-2.5", "pr-3", "whitespace-nowrap", "cell-muted", "text-xs"], [1, "py-2.5", "px-3"], [1, "inline-flex", "items-center", "gap-1", "text-xs", "font-semibold", 2, "color", "var(--c-text)"], [1, "material-symbols-outlined", 2, "font-size", "16px", "color", "var(--c-primary)"], [1, "py-2.5", "px-3", 2, "color", "var(--c-text)"], [1, "py-2.5", "pl-3", "text-xs", "cell-muted"], ["colspan", "4", 1, "py-12", "text-center"], [1, "material-symbols-outlined", "block", "mb-2", "text-4xl", 2, "color", "var(--c-border)"], [1, "text-sm", 2, "color", "var(--c-muted)"], [1, "text-xs", 2, "color", "var(--c-muted)"], [1, "flex", "gap-2"], ["type", "button", "title", "P\xE1gina anterior", 1, "btn-ghost", "text-sm", "px-2", "py-1", "rounded", 3, "click", "disabled"], ["type", "button", "title", "Pr\xF3xima p\xE1gina", 1, "btn-ghost", "text-sm", "px-2", "py-1", "rounded", 3, "click", "disabled"]], template: function PlataformaLogsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "span", 4);
      \u0275\u0275text(5, "history");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "div")(7, "h2", 5);
      \u0275\u0275text(8, "Meus logs de auditoria");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "p", 6);
      \u0275\u0275text(10, "A\xE7\xF5es realizadas por voc\xEA na plataforma");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275conditionalCreate(11, PlataformaLogsComponent_Conditional_11_Template, 1, 1, "zm-skeleton-list", 7)(12, PlataformaLogsComponent_Conditional_12_Template, 0, 0)(13, PlataformaLogsComponent_Conditional_13_Template, 19, 3);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(11);
      \u0275\u0275conditional(ctx.showSkeleton() ? 11 : !ctx.listaPronta ? 12 : 13);
    }
  }, dependencies: [CommonModule, ZmSkeletonListComponent], styles: ["\n\n/*# sourceMappingURL=plataforma-logs.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PlataformaLogsComponent, [{
    type: Component,
    args: [{ selector: "app-plataforma-logs", standalone: true, imports: [CommonModule, ZmSkeletonListComponent], template: `<!-- Igual ao backend: platform/logs/index -->\r
<div class="relative min-h-[300px]">\r
  <div class="flex items-center justify-between mb-4">\r
  <div class="flex items-center gap-3">\r
    <div class="w-10 h-10 rounded-lg flex items-center justify-center" style="background: var(--c-soft)">\r
      <span class="material-symbols-outlined" style="color: var(--c-primary)">history</span>\r
    </div>\r
    <div>\r
      <h2 class="text-base font-semibold m-0" style="color: var(--c-text)">Meus logs de auditoria</h2>\r
      <p class="text-sm mt-0.5 mb-0" style="color: var(--c-muted)">A\xE7\xF5es realizadas por voc\xEA na plataforma</p>\r
    </div>\r
  </div>\r
</div>\r
\r
@if (showSkeleton()) {\r
  <zm-skeleton-list [rows]="6" />\r
} @else if (!listaPronta) {\r
} @else {\r
@if (error) {\r
  <div class="card p-4 rounded-xl mb-4" style="background: rgba(239,68,68,0.08); border: 1px solid rgba(239,68,68,0.3)">\r
    <p class="text-sm m-0" style="color: var(--c-text)">{{ error }}</p>\r
  </div>\r
}\r
\r
<div class="zm-content-enter">\r
<div class="overflow-x-auto rounded-xl border" style="border-color: var(--c-border); background: var(--c-surface)">\r
  <table class="platform-table">\r
    <thead>\r
      <tr>\r
        <th class="py-2 pr-3">Data / Hora</th>\r
        <th class="py-2 px-3">A\xE7\xE3o</th>\r
        <th class="py-2 px-3">Empresa</th>\r
        <th class="py-2 pl-3">Detalhe</th>\r
      </tr>\r
    </thead>\r
    <tbody>\r
      @for (log of logs; track log.id) {\r
        <tr>\r
          <td class="py-2.5 pr-3 whitespace-nowrap cell-muted text-xs">{{ formatarData(log.created_at) }}</td>\r
          <td class="py-2.5 px-3">\r
            <span class="inline-flex items-center gap-1 text-xs font-semibold" style="color: var(--c-text)">\r
              <span class="material-symbols-outlined" style="font-size: 16px; color: var(--c-primary)">info</span>\r
              {{ actionLabel(log.action) }}\r
            </span>\r
          </td>\r
          <td class="py-2.5 px-3" style="color: var(--c-text)">{{ log.organization_name ?? '\u2014' }}</td>\r
          <td class="py-2.5 pl-3 text-xs cell-muted">{{ detalheTexto(log) }}</td>\r
        </tr>\r
      } @empty {\r
        <tr>\r
          <td colspan="4" class="py-12 text-center">\r
            <span class="material-symbols-outlined block mb-2 text-4xl" style="color: var(--c-border)">history</span>\r
            <span class="text-sm" style="color: var(--c-muted)">Nenhum registro de auditoria.</span>\r
          </td>\r
        </tr>\r
      }\r
    </tbody>\r
  </table>\r
  @if (lastPage > 1) {\r
    <div class="px-4 py-3 flex items-center justify-between border-t" style="border-color: var(--c-border)">\r
      <span class="text-xs" style="color: var(--c-muted)">P\xE1gina {{ currentPage }} de {{ lastPage }} ({{ total }} registros)</span>\r
      <div class="flex gap-2">\r
        <button type="button" class="btn-ghost text-sm px-2 py-1 rounded" [disabled]="currentPage <= 1" (click)="goToPage(currentPage - 1)" title="P\xE1gina anterior">Anterior</button>\r
        <button type="button" class="btn-ghost text-sm px-2 py-1 rounded" [disabled]="currentPage >= lastPage" (click)="goToPage(currentPage + 1)" title="Pr\xF3xima p\xE1gina">Pr\xF3xima</button>\r
      </div>\r
    </div>\r
  }\r
</div>\r
</div>\r
}\r
</div>\r
`, styles: ["/* src/app/paginas/plataforma/plataforma-logs/plataforma-logs.component.css */\n/*# sourceMappingURL=plataforma-logs.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PlataformaLogsComponent, { className: "PlataformaLogsComponent", filePath: "src/app/paginas/plataforma/plataforma-logs/plataforma-logs.component.ts", lineNumber: 14 });
})();
export {
  PlataformaLogsComponent
};
//# sourceMappingURL=chunk-V3C2UHIB.js.map
