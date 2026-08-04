import {
  RouterLink
} from "./chunk-C2NWBPZH.js";
import {
  CommonModule,
  Component,
  EventEmitter,
  Input,
  Output,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomListener,
  ɵɵdomProperty,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-GRLISYEV.js";

// src/app/shared/components/ui/zm-pagination.component.ts
function ZmPaginationComponent_Conditional_0_For_8_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "span", 5);
    \u0275\u0275text(1, "\u2026");
    \u0275\u0275domElementEnd();
  }
}
function ZmPaginationComponent_Conditional_0_For_8_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 7);
    \u0275\u0275domListener("click", function ZmPaginationComponent_Conditional_0_For_8_Conditional_1_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const b_r4 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.goPage(b_r4));
    });
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const b_r4 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("zm-pagination__page--active", b_r4 === ctx_r1.currentPage);
    \u0275\u0275attribute("aria-current", b_r4 === ctx_r1.currentPage ? "page" : null);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", b_r4, " ");
  }
}
function ZmPaginationComponent_Conditional_0_For_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, ZmPaginationComponent_Conditional_0_For_8_Conditional_0_Template, 2, 0, "span", 5)(1, ZmPaginationComponent_Conditional_0_For_8_Conditional_1_Template, 2, 4, "button", 6);
  }
  if (rf & 2) {
    const b_r4 = ctx.$implicit;
    \u0275\u0275conditional(b_r4 === "ellipsis" ? 0 : 1);
  }
}
function ZmPaginationComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "div", 0)(1, "span", 1);
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "div", 2)(4, "button", 3);
    \u0275\u0275domListener("click", function ZmPaginationComponent_Conditional_0_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.prev());
    });
    \u0275\u0275text(5, " Anterior ");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(6, "div", 4);
    \u0275\u0275repeaterCreate(7, ZmPaginationComponent_Conditional_0_For_8_Template, 2, 1, null, null, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(9, "button", 3);
    \u0275\u0275domListener("click", function ZmPaginationComponent_Conditional_0_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.next());
    });
    \u0275\u0275text(10, " Pr\xF3xima ");
    \u0275\u0275domElementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("P\xE1gina ", ctx_r1.currentPage, " de ", ctx_r1.lastPage);
    \u0275\u0275advance(2);
    \u0275\u0275domProperty("disabled", ctx_r1.currentPage <= 1);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r1.blocks());
    \u0275\u0275advance(2);
    \u0275\u0275domProperty("disabled", ctx_r1.currentPage >= ctx_r1.lastPage);
  }
}
var ZmPaginationComponent = class _ZmPaginationComponent {
  currentPage = 1;
  lastPage = 1;
  pageChange = new EventEmitter();
  blocks() {
    const L = this.lastPage;
    const c = this.currentPage;
    if (L <= 1) {
      return [];
    }
    if (L <= 7) {
      return Array.from({ length: L }, (_, i) => i + 1);
    }
    const out = [];
    const push = (b) => {
      const prev = out[out.length - 1];
      if (b === "ellipsis" && prev === "ellipsis") {
        return;
      }
      out.push(b);
    };
    push(1);
    const start = Math.max(2, c - 1);
    const end = Math.min(L - 1, c + 1);
    if (start > 2) {
      push("ellipsis");
    }
    for (let p = start; p <= end; p++) {
      push(p);
    }
    if (end < L - 1) {
      push("ellipsis");
    }
    push(L);
    return out;
  }
  goPage(p) {
    if (p === this.currentPage || p < 1 || p > this.lastPage) {
      return;
    }
    this.pageChange.emit(p);
  }
  prev() {
    this.goPage(this.currentPage - 1);
  }
  next() {
    this.goPage(this.currentPage + 1);
  }
  static \u0275fac = function ZmPaginationComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ZmPaginationComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ZmPaginationComponent, selectors: [["zm-pagination"]], inputs: { currentPage: "currentPage", lastPage: "lastPage" }, outputs: { pageChange: "pageChange" }, decls: 1, vars: 1, consts: [[1, "zm-pagination"], [1, "zm-pagination__meta"], [1, "zm-pagination__actions"], ["type", "button", 1, "btn-ghost", "btn-default-bg", "zm-pagination__nav", 3, "click", "disabled"], [1, "zm-pagination__pages"], ["aria-hidden", "true", 1, "zm-pagination__ellipsis"], ["type", "button", 1, "zm-pagination__page", 3, "zm-pagination__page--active"], ["type", "button", 1, "zm-pagination__page", 3, "click"]], template: function ZmPaginationComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275conditionalCreate(0, ZmPaginationComponent_Conditional_0_Template, 11, 4, "div", 0);
    }
    if (rf & 2) {
      \u0275\u0275conditional(ctx.lastPage > 1 ? 0 : -1);
    }
  }, dependencies: [CommonModule], styles: ["\n\n.zm-pagination[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  justify-content: space-between;\n  gap: var(--space-3);\n  padding: var(--space-3) var(--space-4);\n  border-top: 1px solid var(--c-border);\n}\n.zm-pagination__meta[_ngcontent-%COMP%] {\n  font-size: var(--text-xs);\n  color: var(--c-muted);\n}\n.zm-pagination__actions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: var(--space-2);\n}\n.zm-pagination__nav[_ngcontent-%COMP%] {\n  font-size: var(--text-sm) !important;\n  padding: 0.375rem 0.75rem !important;\n}\n.zm-pagination__pages[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 0.25rem;\n}\n.zm-pagination__page[_ngcontent-%COMP%] {\n  min-width: 2rem;\n  height: 2rem;\n  padding: 0 0.35rem;\n  border-radius: var(--radius-md);\n  border: 1px solid var(--c-border);\n  background: var(--c-surface);\n  color: var(--c-muted);\n  font-size: var(--text-xs);\n  font-weight: 600;\n  font-family: inherit;\n  cursor: pointer;\n  transition:\n    background 0.12s,\n    color 0.12s,\n    border-color 0.12s;\n}\n.zm-pagination__page[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: var(--c-soft);\n  color: var(--c-text);\n  border-color: var(--c-muted);\n}\n.zm-pagination__page--active[_ngcontent-%COMP%] {\n  background: color-mix(in srgb, var(--c-primary) 16%, var(--c-surface));\n  border-color: var(--c-primary);\n  color: var(--c-primary);\n}\n.zm-pagination__ellipsis[_ngcontent-%COMP%] {\n  padding: 0 0.25rem;\n  font-size: var(--text-sm);\n  color: var(--c-muted);\n  -webkit-user-select: none;\n  user-select: none;\n}\n/*# sourceMappingURL=zm-pagination.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ZmPaginationComponent, [{
    type: Component,
    args: [{ selector: "zm-pagination", standalone: true, imports: [CommonModule], template: `@if (lastPage > 1) {\r
  <div class="zm-pagination">\r
    <span class="zm-pagination__meta">P\xE1gina {{ currentPage }} de {{ lastPage }}</span>\r
    <div class="zm-pagination__actions">\r
      <button type="button" class="btn-ghost btn-default-bg zm-pagination__nav" [disabled]="currentPage <= 1" (click)="prev()">\r
        Anterior\r
      </button>\r
      <div class="zm-pagination__pages">\r
        @for (b of blocks(); track $index) {\r
          @if (b === 'ellipsis') {\r
            <span class="zm-pagination__ellipsis" aria-hidden="true">\u2026</span>\r
          } @else {\r
            <button\r
              type="button"\r
              class="zm-pagination__page"\r
              [class.zm-pagination__page--active]="b === currentPage"\r
              [attr.aria-current]="b === currentPage ? 'page' : null"\r
              (click)="goPage(b)"\r
            >\r
              {{ b }}\r
            </button>\r
          }\r
        }\r
      </div>\r
      <button type="button" class="btn-ghost btn-default-bg zm-pagination__nav" [disabled]="currentPage >= lastPage" (click)="next()">\r
        Pr\xF3xima\r
      </button>\r
    </div>\r
  </div>\r
}\r
`, styles: ["/* src/app/shared/components/ui/zm-pagination.component.css */\n.zm-pagination {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  justify-content: space-between;\n  gap: var(--space-3);\n  padding: var(--space-3) var(--space-4);\n  border-top: 1px solid var(--c-border);\n}\n.zm-pagination__meta {\n  font-size: var(--text-xs);\n  color: var(--c-muted);\n}\n.zm-pagination__actions {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: var(--space-2);\n}\n.zm-pagination__nav {\n  font-size: var(--text-sm) !important;\n  padding: 0.375rem 0.75rem !important;\n}\n.zm-pagination__pages {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 0.25rem;\n}\n.zm-pagination__page {\n  min-width: 2rem;\n  height: 2rem;\n  padding: 0 0.35rem;\n  border-radius: var(--radius-md);\n  border: 1px solid var(--c-border);\n  background: var(--c-surface);\n  color: var(--c-muted);\n  font-size: var(--text-xs);\n  font-weight: 600;\n  font-family: inherit;\n  cursor: pointer;\n  transition:\n    background 0.12s,\n    color 0.12s,\n    border-color 0.12s;\n}\n.zm-pagination__page:hover:not(:disabled) {\n  background: var(--c-soft);\n  color: var(--c-text);\n  border-color: var(--c-muted);\n}\n.zm-pagination__page--active {\n  background: color-mix(in srgb, var(--c-primary) 16%, var(--c-surface));\n  border-color: var(--c-primary);\n  color: var(--c-primary);\n}\n.zm-pagination__ellipsis {\n  padding: 0 0.25rem;\n  font-size: var(--text-sm);\n  color: var(--c-muted);\n  -webkit-user-select: none;\n  user-select: none;\n}\n/*# sourceMappingURL=zm-pagination.component.css.map */\n"] }]
  }], null, { currentPage: [{
    type: Input,
    args: [{ required: true }]
  }], lastPage: [{
    type: Input,
    args: [{ required: true }]
  }], pageChange: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ZmPaginationComponent, { className: "ZmPaginationComponent", filePath: "src/app/shared/components/ui/zm-pagination.component.ts", lineNumber: 13 });
})();

// src/app/shared/components/ui/zm-empty-state.component.ts
function ZmEmptyStateComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 3);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.description);
  }
}
function ZmEmptyStateComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 4);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("routerLink", ctx_r0.actionLink);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.actionLabel, " ");
  }
}
var ZmEmptyStateComponent = class _ZmEmptyStateComponent {
  /** Nome do ícone Material Symbols Outlined */
  icon;
  title;
  description = null;
  actionLabel = null;
  actionLink = null;
  static \u0275fac = function ZmEmptyStateComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ZmEmptyStateComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ZmEmptyStateComponent, selectors: [["zm-empty-state"]], inputs: { icon: "icon", title: "title", description: "description", actionLabel: "actionLabel", actionLink: "actionLink" }, decls: 7, vars: 4, consts: [["role", "status", 1, "zm-empty-state"], ["aria-hidden", "true", 1, "material-symbols-outlined", "zm-empty-state__icon"], [1, "zm-empty-state__title"], [1, "zm-empty-state__desc"], [1, "btn-primary", "zm-empty-state__action", "inline-flex", "items-center", "gap-2", "no-underline", "mt-2", 3, "routerLink"]], template: function ZmEmptyStateComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "span", 1);
      \u0275\u0275text(2);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "p", 2);
      \u0275\u0275text(4);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(5, ZmEmptyStateComponent_Conditional_5_Template, 2, 1, "p", 3);
      \u0275\u0275conditionalCreate(6, ZmEmptyStateComponent_Conditional_6_Template, 2, 2, "a", 4);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.icon);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.title);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.description ? 5 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.actionLabel && ctx.actionLink ? 6 : -1);
    }
  }, dependencies: [CommonModule, RouterLink], styles: ["\n\n.zm-empty-state[_ngcontent-%COMP%] {\n  padding: var(--space-10) var(--space-4);\n  text-align: center;\n}\n.zm-empty-state__icon[_ngcontent-%COMP%] {\n  display: block;\n  margin: 0 auto var(--space-3);\n  font-size: 2.75rem;\n  color: var(--c-muted);\n  opacity: 0.85;\n}\n.zm-empty-state__title[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: var(--text-sm);\n  font-weight: 500;\n  color: var(--c-text);\n}\n.zm-empty-state__desc[_ngcontent-%COMP%] {\n  margin: var(--space-2) auto 0;\n  max-width: 22rem;\n  font-size: var(--text-xs);\n  line-height: 1.5;\n  color: var(--c-muted);\n}\n.zm-empty-state__action[_ngcontent-%COMP%] {\n  margin-top: var(--space-3);\n}\n/*# sourceMappingURL=zm-empty-state.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ZmEmptyStateComponent, [{
    type: Component,
    args: [{ selector: "zm-empty-state", standalone: true, imports: [CommonModule, RouterLink], template: '<div class="zm-empty-state" role="status">\r\n  <span class="material-symbols-outlined zm-empty-state__icon" aria-hidden="true">{{ icon }}</span>\r\n  <p class="zm-empty-state__title">{{ title }}</p>\r\n  @if (description) {\r\n    <p class="zm-empty-state__desc">{{ description }}</p>\r\n  }\r\n  @if (actionLabel && actionLink) {\r\n    <a [routerLink]="actionLink" class="btn-primary zm-empty-state__action inline-flex items-center gap-2 no-underline mt-2">\r\n      {{ actionLabel }}\r\n    </a>\r\n  }\r\n</div>\r\n', styles: ["/* src/app/shared/components/ui/zm-empty-state.component.css */\n.zm-empty-state {\n  padding: var(--space-10) var(--space-4);\n  text-align: center;\n}\n.zm-empty-state__icon {\n  display: block;\n  margin: 0 auto var(--space-3);\n  font-size: 2.75rem;\n  color: var(--c-muted);\n  opacity: 0.85;\n}\n.zm-empty-state__title {\n  margin: 0;\n  font-size: var(--text-sm);\n  font-weight: 500;\n  color: var(--c-text);\n}\n.zm-empty-state__desc {\n  margin: var(--space-2) auto 0;\n  max-width: 22rem;\n  font-size: var(--text-xs);\n  line-height: 1.5;\n  color: var(--c-muted);\n}\n.zm-empty-state__action {\n  margin-top: var(--space-3);\n}\n/*# sourceMappingURL=zm-empty-state.component.css.map */\n"] }]
  }], null, { icon: [{
    type: Input,
    args: [{ required: true }]
  }], title: [{
    type: Input,
    args: [{ required: true }]
  }], description: [{
    type: Input
  }], actionLabel: [{
    type: Input
  }], actionLink: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ZmEmptyStateComponent, { className: "ZmEmptyStateComponent", filePath: "src/app/shared/components/ui/zm-empty-state.component.ts", lineNumber: 12 });
})();

export {
  ZmPaginationComponent,
  ZmEmptyStateComponent
};
//# sourceMappingURL=chunk-5YRLWGMM.js.map
