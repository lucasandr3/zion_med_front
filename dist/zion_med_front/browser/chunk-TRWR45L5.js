import {
  RouterLink
} from "./chunk-C2NWBPZH.js";
import {
  CommonModule,
  Component,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵdefineComponent,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵtext
} from "./chunk-GRLISYEV.js";

// src/app/paginas/erro/erro-404.component.ts
var Erro404Component = class _Erro404Component {
  static \u0275fac = function Erro404Component_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Erro404Component)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Erro404Component, selectors: [["app-erro-404"]], decls: 10, vars: 0, consts: [[1, "min-h-screen", "flex", "items-center", "justify-center", "p-4", 2, "background", "var(--c-bg)", "color", "var(--c-text)"], [1, "text-center", "max-w-md"], [1, "material-symbols-outlined", "text-6xl", "mb-4", 2, "color", "var(--c-muted)"], [1, "text-2xl", "font-semibold", "mb-2"], [1, "text-sm", "mb-6", 2, "color", "var(--c-muted)"], ["routerLink", "/", 1, "btn-primary"]], template: function Erro404Component_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "span", 2);
      \u0275\u0275text(3, "search_off");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "h1", 3);
      \u0275\u0275text(5, "P\xE1gina n\xE3o encontrada");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "p", 4);
      \u0275\u0275text(7, "Fiel ao errors/404.blade.php");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "a", 5);
      \u0275\u0275text(9, "Voltar ao in\xEDcio");
      \u0275\u0275elementEnd()()();
    }
  }, dependencies: [CommonModule, RouterLink], styles: ["\n\n/*# sourceMappingURL=erro-404.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Erro404Component, [{
    type: Component,
    args: [{ selector: "app-erro-404", standalone: true, imports: [CommonModule, RouterLink], template: '<div class="min-h-screen flex items-center justify-center p-4" style="background: var(--c-bg); color: var(--c-text)">\n  <div class="text-center max-w-md">\n    <span class="material-symbols-outlined text-6xl mb-4" style="color: var(--c-muted)">search_off</span>\n    <h1 class="text-2xl font-semibold mb-2">P\xE1gina n\xE3o encontrada</h1>\n    <p class="text-sm mb-6" style="color: var(--c-muted)">Fiel ao errors/404.blade.php</p>\n    <a routerLink="/" class="btn-primary">Voltar ao in\xEDcio</a>\n  </div>\n</div>\n', styles: ["/* src/app/paginas/erro/erro-404.component.css */\n/*# sourceMappingURL=erro-404.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(Erro404Component, { className: "Erro404Component", filePath: "src/app/paginas/erro/erro-404.component.ts", lineNumber: 12 });
})();
export {
  Erro404Component
};
//# sourceMappingURL=chunk-TRWR45L5.js.map
