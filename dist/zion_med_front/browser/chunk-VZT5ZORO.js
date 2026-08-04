import {
  LoadingService,
  ZmSkeletonListComponent
} from "./chunk-GKI5AWTV.js";
import {
  ApiService
} from "./chunk-7WBHVE2H.js";
import "./chunk-IBJWGIJV.js";
import {
  RouterLink
} from "./chunk-C2NWBPZH.js";
import {
  CommonModule,
  Component,
  Injectable,
  inject,
  map,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinterpolate1,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-GRLISYEV.js";

// src/app/core/services/links-publicos.service.ts
var LinksPublicosService = class _LinksPublicosService {
  api = inject(ApiService);
  list() {
    return this.api.get("/links-publicos").pipe(map((r) => r.data ?? []));
  }
  static \u0275fac = function LinksPublicosService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LinksPublicosService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _LinksPublicosService, factory: _LinksPublicosService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LinksPublicosService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

// src/app/paginas/links-publicos/links-publicos.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function LinksPublicosComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "zm-skeleton-list", 1);
  }
  if (rf & 2) {
    \u0275\u0275property("rows", 5);
  }
}
function LinksPublicosComponent_Conditional_2_Template(rf, ctx) {
}
function LinksPublicosComponent_Conditional_3_Template(rf, ctx) {
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
function LinksPublicosComponent_Conditional_4_For_3_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 11);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r3 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(t_r3.category_label);
  }
}
function LinksPublicosComponent_Conditional_4_For_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 5)(1, "div", 7)(2, "span", 8);
    \u0275\u0275text(3, "description");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 9)(5, "p", 10);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(7, LinksPublicosComponent_Conditional_4_For_3_Conditional_7_Template, 2, 1, "p", 11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 12)(9, "button", 13);
    \u0275\u0275listener("click", function LinksPublicosComponent_Conditional_4_For_3_Template_button_click_9_listener() {
      const t_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.copiarLink(t_r3.public_url));
    });
    \u0275\u0275elementStart(10, "span", 14);
    \u0275\u0275text(11, "content_copy");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "span", 15);
    \u0275\u0275text(13, "Copiar link");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "a", 16)(15, "span", 14);
    \u0275\u0275text(16, "open_in_new");
    \u0275\u0275elementEnd();
    \u0275\u0275text(17, " Abrir ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "a", 17)(19, "span", 14);
    \u0275\u0275text(20, "tune");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const t_r3 = ctx.$implicit;
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(t_r3.name);
    \u0275\u0275advance();
    \u0275\u0275conditional(t_r3.category_label ? 7 : -1);
    \u0275\u0275advance(7);
    \u0275\u0275property("href", t_r3.public_url, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(4);
    \u0275\u0275property("routerLink", \u0275\u0275interpolate1("/templates/", t_r3.id, "/campos"));
  }
}
function LinksPublicosComponent_Conditional_4_ForEmpty_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6)(1, "span", 18);
    \u0275\u0275text(2, "link_off");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 10);
    \u0275\u0275text(4, "Nenhum link p\xFAblico ativo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 19);
    \u0275\u0275text(6, " Gere um link p\xFAblico em ");
    \u0275\u0275elementStart(7, "strong");
    \u0275\u0275text(8, "Templates");
    \u0275\u0275elementEnd();
    \u0275\u0275text(9, " \u2192 escolha um template \u2192 ");
    \u0275\u0275elementStart(10, "strong");
    \u0275\u0275text(11, "Campos");
    \u0275\u0275elementEnd();
    \u0275\u0275text(12, " \u2192 ");
    \u0275\u0275elementStart(13, "strong");
    \u0275\u0275text(14, "Gerar link p\xFAblico");
    \u0275\u0275elementEnd();
    \u0275\u0275text(15, ". ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "a", 20)(17, "span", 21);
    \u0275\u0275text(18, "description");
    \u0275\u0275elementEnd();
    \u0275\u0275text(19, " Ir para Templates ");
    \u0275\u0275elementEnd()();
  }
}
function LinksPublicosComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 3)(1, "div", 4);
    \u0275\u0275repeaterCreate(2, LinksPublicosComponent_Conditional_4_For_3_Template, 21, 5, "div", 5, _forTrack0, false, LinksPublicosComponent_Conditional_4_ForEmpty_4_Template, 20, 0, "div", 6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r0.templates);
  }
}
var LinksPublicosComponent = class _LinksPublicosComponent {
  templates = [];
  showSkeleton;
  listaPronta = false;
  erro = "";
  linksService = inject(LinksPublicosService);
  loadingService = inject(LoadingService);
  ngOnInit() {
    const { data$, showSkeleton } = this.loadingService.loadWithThreshold(this.linksService.list());
    this.showSkeleton = showSkeleton;
    data$.subscribe({
      next: (list) => {
        this.listaPronta = true;
        const base = typeof window !== "undefined" ? window.location.origin : "";
        this.templates = list.map((t) => ({
          id: t.id,
          name: t.template_name ?? t.name ?? "",
          category_label: t.category_label,
          public_url: t.public_url ?? (t.public_token ? `${base}/f/${t.public_token}` : ""),
          public_token: t.public_token
        }));
      },
      error: () => {
        this.listaPronta = true;
        this.erro = "N\xE3o foi poss\xEDvel carregar os links.";
      }
    });
  }
  copiarLink(url) {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
      });
    }
  }
  static \u0275fac = function LinksPublicosComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LinksPublicosComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LinksPublicosComponent, selectors: [["app-pagina-links-publicos"]], decls: 5, vars: 1, consts: [[1, "relative", "min-h-[320px]"], [3, "rows"], [1, "text-sm", 2, "color", "var(--c-error, #dc2626)"], [1, "zm-content-enter"], [1, "card", "rounded-xl", "overflow-hidden", 2, "padding", "0", "border", "1px solid var(--c-border)"], [1, "flex", "flex-wrap", "items-center", "justify-between", "gap-4", "py-4", "px-5", 2, "border-bottom", "1px solid var(--c-border)"], [1, "px-5", "py-16", "text-center"], [1, "flex", "items-center", "gap-3", "min-w-0"], [1, "material-symbols-outlined", "shrink-0", "text-xl", 2, "color", "var(--c-muted)"], [1, "min-w-0"], [1, "font-medium", "m-0", 2, "color", "var(--c-text)"], [1, "text-xs", "mt-0.5", "mb-0", 2, "color", "var(--c-muted)"], [1, "flex", "items-center", "gap-2", "shrink-0"], ["type", "button", "title", "Copiar link do formul\xE1rio", 1, "inline-flex", "items-center", "gap-2", "bg-green-600", "text-white", "font-semibold", "px-4", "py-2", "rounded-lg", "hover:bg-green-700", "transition-colors", "text-sm", 3, "click"], [1, "material-symbols-outlined", "text-lg"], [1, "copy-label"], ["target", "_blank", "rel", "noopener", "title", "Abrir formul\xE1rio em nova aba", 1, "inline-flex", "items-center", "gap-2", "px-4", "py-2", "rounded-lg", "text-sm", "font-medium", 2, "background", "var(--c-soft)", "color", "var(--c-muted)", 3, "href"], ["title", "Campos do template", 1, "inline-flex", "items-center", "gap-2", "px-4", "py-2", "rounded-lg", "text-sm", "font-medium", 2, "background", "var(--c-soft)", "color", "var(--c-muted)", 3, "routerLink"], [1, "material-symbols-outlined", "block", "mb-3", "text-5xl", 2, "color", "var(--c-border)"], [1, "text-sm", "mt-1", "mb-0", 2, "color", "var(--c-muted)"], ["routerLink", "/templates", "title", "Ir para Templates", 1, "inline-flex", "items-center", "gap-2", "mt-4", "btn-primary"], [1, "material-symbols-outlined", "text-base"]], template: function LinksPublicosComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275conditionalCreate(1, LinksPublicosComponent_Conditional_1_Template, 1, 1, "zm-skeleton-list", 1)(2, LinksPublicosComponent_Conditional_2_Template, 0, 0)(3, LinksPublicosComponent_Conditional_3_Template, 2, 1, "p", 2)(4, LinksPublicosComponent_Conditional_4_Template, 5, 1, "div", 3);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showSkeleton() ? 1 : !ctx.listaPronta ? 2 : ctx.erro ? 3 : 4);
    }
  }, dependencies: [CommonModule, RouterLink, ZmSkeletonListComponent], styles: ["\n\n/*# sourceMappingURL=links-publicos.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LinksPublicosComponent, [{
    type: Component,
    args: [{ selector: "app-pagina-links-publicos", standalone: true, imports: [CommonModule, RouterLink, ZmSkeletonListComponent], template: '<div class="relative min-h-[320px]">\r\n  <!-- <div class="page-header mb-6">\r\n    <div class="page-title flex items-center gap-3">\r\n      <div class="page-title-icon w-10 h-10 rounded-lg flex items-center justify-center" style="background: var(--c-soft)">\r\n        <span class="material-symbols-outlined" style="color: var(--c-primary)">link</span>\r\n      </div>\r\n      <div>\r\n        <h1 class="text-xl font-semibold m-0" style="color: var(--c-text)">Links para enviar</h1>\r\n        <p class="page-header-subtitle text-sm mt-1 mb-0" style="color: var(--c-muted)">Copie o link do formul\xE1rio e envie pelo WhatsApp ou outro canal. Apenas templates com link p\xFAblico ativo aparecem aqui.</p>\r\n      </div>\r\n    </div>\r\n  </div> -->\r\n  @if (showSkeleton()) {\r\n    <zm-skeleton-list [rows]="5" />\r\n  } @else if (!listaPronta) {\r\n  } @else if (erro) {\r\n    <p class="text-sm" style="color: var(--c-error, #dc2626)">{{ erro }}</p>\r\n  } @else {\r\n    <div class="zm-content-enter">\r\n<div class="card rounded-xl overflow-hidden" style="padding: 0; border: 1px solid var(--c-border)">\r\n  @for (t of templates; track t.id) {\r\n    <div class="flex flex-wrap items-center justify-between gap-4 py-4 px-5" style="border-bottom: 1px solid var(--c-border)">\r\n      <div class="flex items-center gap-3 min-w-0">\r\n        <span class="material-symbols-outlined shrink-0 text-xl" style="color: var(--c-muted)">description</span>\r\n        <div class="min-w-0">\r\n          <p class="font-medium m-0" style="color: var(--c-text)">{{ t.name }}</p>\r\n          @if (t.category_label) {\r\n            <p class="text-xs mt-0.5 mb-0" style="color: var(--c-muted)">{{ t.category_label }}</p>\r\n          }\r\n        </div>\r\n      </div>\r\n      <div class="flex items-center gap-2 shrink-0">\r\n        <button type="button" (click)="copiarLink(t.public_url)" class="inline-flex items-center gap-2 bg-green-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm" title="Copiar link do formul\xE1rio">\r\n          <span class="material-symbols-outlined text-lg">content_copy</span>\r\n          <span class="copy-label">Copiar link</span>\r\n        </button>\r\n        <a [href]="t.public_url" target="_blank" rel="noopener" class="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium" style="background: var(--c-soft); color: var(--c-muted)" title="Abrir formul\xE1rio em nova aba">\r\n          <span class="material-symbols-outlined text-lg">open_in_new</span>\r\n          Abrir\r\n        </a>\r\n        <a routerLink="/templates/{{ t.id }}/campos" class="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium" style="background: var(--c-soft); color: var(--c-muted)" title="Campos do template">\r\n          <span class="material-symbols-outlined text-lg">tune</span>\r\n        </a>\r\n      </div>\r\n    </div>\r\n  } @empty {\r\n    <div class="px-5 py-16 text-center">\r\n      <span class="material-symbols-outlined block mb-3 text-5xl" style="color: var(--c-border)">link_off</span>\r\n      <p class="font-medium m-0" style="color: var(--c-text)">Nenhum link p\xFAblico ativo</p>\r\n      <p class="text-sm mt-1 mb-0" style="color: var(--c-muted)">\r\n        Gere um link p\xFAblico em <strong>Templates</strong> \u2192 escolha um template \u2192 <strong>Campos</strong> \u2192 <strong>Gerar link p\xFAblico</strong>.\r\n      </p>\r\n      <a routerLink="/templates" class="inline-flex items-center gap-2 mt-4 btn-primary" title="Ir para Templates">\r\n        <span class="material-symbols-outlined text-base">description</span>\r\n        Ir para Templates\r\n      </a>\r\n    </div>\r\n  }\r\n</div>\r\n    </div>\r\n  }\r\n</div>\r\n', styles: ["/* src/app/paginas/links-publicos/links-publicos.component.css */\n/*# sourceMappingURL=links-publicos.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LinksPublicosComponent, { className: "LinksPublicosComponent", filePath: "src/app/paginas/links-publicos/links-publicos.component.ts", lineNumber: 15 });
})();
export {
  LinksPublicosComponent
};
//# sourceMappingURL=chunk-VZT5ZORO.js.map
