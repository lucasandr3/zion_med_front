import {
  Component,
  Injectable,
  Input,
  defer,
  finalize,
  setClassMetadata,
  shareReplay,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdomElement,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵstyleProp
} from "./chunk-GRLISYEV.js";

// src/app/shared/services/loading.service.ts
var LoadingService = class _LoadingService {
  loadWithThreshold(observable, thresholdMs = 300) {
    const showSkeleton = signal(false, ...ngDevMode ? [{ debugName: "showSkeleton" }] : []);
    const data$ = defer(() => {
      let tid = setTimeout(() => showSkeleton.set(true), thresholdMs);
      return observable.pipe(finalize(() => {
        if (tid !== null) {
          clearTimeout(tid);
          tid = null;
        }
        showSkeleton.set(false);
      }));
    }).pipe(shareReplay({ bufferSize: 1, refCount: true }));
    return { data$, showSkeleton: showSkeleton.asReadonly() };
  }
  static \u0275fac = function LoadingService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LoadingService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _LoadingService, factory: _LoadingService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LoadingService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

// src/app/shared/components/skeletons/skeleton-dashboard/skeleton-dashboard.component.ts
function ZmSkeletonDashboardComponent_For_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 2);
    \u0275\u0275domElement(1, "div", 7)(2, "div", 8)(3, "div", 9);
    \u0275\u0275domElementEnd();
  }
}
function ZmSkeletonDashboardComponent_For_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 6)(1, "div", 10);
    \u0275\u0275domElement(2, "div", 11);
    \u0275\u0275domElementStart(3, "div", 12);
    \u0275\u0275domElement(4, "div", 13)(5, "div", 14);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElement(6, "div", 15);
    \u0275\u0275domElementEnd();
  }
}
var ZmSkeletonDashboardComponent = class _ZmSkeletonDashboardComponent {
  metricSlots = [0, 1, 2];
  rowSlots = [0, 1, 2, 3];
  static \u0275fac = function ZmSkeletonDashboardComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ZmSkeletonDashboardComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ZmSkeletonDashboardComponent, selectors: [["zm-skeleton-dashboard"]], decls: 9, vars: 0, consts: [[1, "skel-dash", "relative", "min-h-[300px]"], [1, "skel-dash__metrics"], [1, "skel-dash__metric"], [1, "skel-dash__panel"], [1, "skel-dash__panel-head"], [1, "zm-skeleton", "skel-dash__panel-head-line"], [1, "skel-dash__row"], [1, "zm-skeleton", "skel-dash__metric-line"], [1, "zm-skeleton", "skel-dash__metric-num"], [1, "zm-skeleton", "skel-dash__metric-sub"], [1, "flex", "items-center", "gap-3", "min-w-0", "flex-1"], [1, "zm-skeleton", "skel-dash__icon"], [1, "skel-dash__text"], [1, "zm-skeleton", "skel-dash__title-line"], [1, "zm-skeleton", "skel-dash__meta-line"], [1, "zm-skeleton", "skel-dash__badge"]], template: function ZmSkeletonDashboardComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "div", 0)(1, "div", 1);
      \u0275\u0275repeaterCreate(2, ZmSkeletonDashboardComponent_For_3_Template, 4, 0, "div", 2, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(4, "div", 3)(5, "div", 4);
      \u0275\u0275domElement(6, "div", 5);
      \u0275\u0275domElementEnd();
      \u0275\u0275repeaterCreate(7, ZmSkeletonDashboardComponent_For_8_Template, 7, 0, "div", 6, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275domElementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.metricSlots);
      \u0275\u0275advance(5);
      \u0275\u0275repeater(ctx.rowSlots);
    }
  }, styles: ["\n\n.skel-dash[_ngcontent-%COMP%] {\n  --skel-radius: 1rem;\n}\n.skel-dash__metrics[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr;\n  gap: 0.75rem;\n  margin-bottom: 1.25rem;\n}\n@media (min-width: 640px) {\n  .skel-dash__metrics[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(3, 1fr);\n  }\n}\n.skel-dash__metric[_ngcontent-%COMP%] {\n  border-radius: var(--skel-radius);\n  padding: 1.125rem 1.25rem;\n  background: var(--c-surface);\n  border: 1px solid var(--c-border);\n}\n.skel-dash__metric-line[_ngcontent-%COMP%] {\n  height: 0.6875rem;\n  width: 42%;\n  margin-bottom: 0.625rem;\n}\n.skel-dash__metric-num[_ngcontent-%COMP%] {\n  height: 1.875rem;\n  width: 38%;\n  margin-bottom: 0.5rem;\n}\n.skel-dash__metric-sub[_ngcontent-%COMP%] {\n  height: 0.75rem;\n  width: 55%;\n}\n.skel-dash__panel[_ngcontent-%COMP%] {\n  border-radius: var(--skel-radius);\n  overflow: hidden;\n  background: var(--c-surface);\n  border: 1px solid var(--c-border);\n}\n.skel-dash__panel-head[_ngcontent-%COMP%] {\n  padding: 0.875rem 1.125rem;\n  border-bottom: 1px solid var(--c-border);\n}\n.skel-dash__panel-head-line[_ngcontent-%COMP%] {\n  height: 0.875rem;\n  width: 40%;\n}\n.skel-dash__row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.75rem;\n  padding: 0.875rem 1.125rem;\n  border-bottom: 1px solid var(--c-border);\n}\n.skel-dash__row[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n.skel-dash__icon[_ngcontent-%COMP%] {\n  width: 2.5rem;\n  height: 2.5rem;\n  border-radius: 0.625rem;\n  flex-shrink: 0;\n}\n.skel-dash__text[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 0.375rem;\n}\n.skel-dash__title-line[_ngcontent-%COMP%] {\n  height: 0.875rem;\n  width: min(72%, 220px);\n}\n.skel-dash__meta-line[_ngcontent-%COMP%] {\n  height: 0.75rem;\n  width: 38%;\n}\n.skel-dash__badge[_ngcontent-%COMP%] {\n  width: 3.25rem;\n  height: 1.375rem;\n  border-radius: 9999px;\n  flex-shrink: 0;\n}\n/*# sourceMappingURL=skeleton-dashboard.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ZmSkeletonDashboardComponent, [{
    type: Component,
    args: [{ selector: "zm-skeleton-dashboard", standalone: true, template: `
    <div class="skel-dash relative min-h-[300px]">
      <div class="skel-dash__metrics">
        @for (m of metricSlots; track m) {
          <div class="skel-dash__metric">
            <div class="zm-skeleton skel-dash__metric-line"></div>
            <div class="zm-skeleton skel-dash__metric-num"></div>
            <div class="zm-skeleton skel-dash__metric-sub"></div>
          </div>
        }
      </div>
      <div class="skel-dash__panel">
        <div class="skel-dash__panel-head">
          <div class="zm-skeleton skel-dash__panel-head-line"></div>
        </div>
        @for (r of rowSlots; track r) {
          <div class="skel-dash__row">
            <div class="flex items-center gap-3 min-w-0 flex-1">
              <div class="zm-skeleton skel-dash__icon"></div>
              <div class="skel-dash__text">
                <div class="zm-skeleton skel-dash__title-line"></div>
                <div class="zm-skeleton skel-dash__meta-line"></div>
              </div>
            </div>
            <div class="zm-skeleton skel-dash__badge"></div>
          </div>
        }
      </div>
    </div>
  `, styles: ["/* src/app/shared/components/skeletons/skeleton-dashboard/skeleton-dashboard.component.scss */\n.skel-dash {\n  --skel-radius: 1rem;\n}\n.skel-dash__metrics {\n  display: grid;\n  grid-template-columns: 1fr;\n  gap: 0.75rem;\n  margin-bottom: 1.25rem;\n}\n@media (min-width: 640px) {\n  .skel-dash__metrics {\n    grid-template-columns: repeat(3, 1fr);\n  }\n}\n.skel-dash__metric {\n  border-radius: var(--skel-radius);\n  padding: 1.125rem 1.25rem;\n  background: var(--c-surface);\n  border: 1px solid var(--c-border);\n}\n.skel-dash__metric-line {\n  height: 0.6875rem;\n  width: 42%;\n  margin-bottom: 0.625rem;\n}\n.skel-dash__metric-num {\n  height: 1.875rem;\n  width: 38%;\n  margin-bottom: 0.5rem;\n}\n.skel-dash__metric-sub {\n  height: 0.75rem;\n  width: 55%;\n}\n.skel-dash__panel {\n  border-radius: var(--skel-radius);\n  overflow: hidden;\n  background: var(--c-surface);\n  border: 1px solid var(--c-border);\n}\n.skel-dash__panel-head {\n  padding: 0.875rem 1.125rem;\n  border-bottom: 1px solid var(--c-border);\n}\n.skel-dash__panel-head-line {\n  height: 0.875rem;\n  width: 40%;\n}\n.skel-dash__row {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.75rem;\n  padding: 0.875rem 1.125rem;\n  border-bottom: 1px solid var(--c-border);\n}\n.skel-dash__row:last-child {\n  border-bottom: none;\n}\n.skel-dash__icon {\n  width: 2.5rem;\n  height: 2.5rem;\n  border-radius: 0.625rem;\n  flex-shrink: 0;\n}\n.skel-dash__text {\n  flex: 1;\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 0.375rem;\n}\n.skel-dash__title-line {\n  height: 0.875rem;\n  width: min(72%, 220px);\n}\n.skel-dash__meta-line {\n  height: 0.75rem;\n  width: 38%;\n}\n.skel-dash__badge {\n  width: 3.25rem;\n  height: 1.375rem;\n  border-radius: 9999px;\n  flex-shrink: 0;\n}\n/*# sourceMappingURL=skeleton-dashboard.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ZmSkeletonDashboardComponent, { className: "ZmSkeletonDashboardComponent", filePath: "src/app/shared/components/skeletons/skeleton-dashboard/skeleton-dashboard.component.ts", lineNumber: 38 });
})();

// src/app/shared/components/skeletons/skeleton-list/skeleton-list.component.ts
function ZmSkeletonListComponent_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 1);
    \u0275\u0275domElement(1, "div", 2);
    \u0275\u0275domElementStart(2, "div", 3);
    \u0275\u0275domElement(3, "div", 4)(4, "div", 5);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElement(5, "div", 6);
    \u0275\u0275domElementEnd();
  }
}
var ZmSkeletonListComponent = class _ZmSkeletonListComponent {
  rows = 5;
  get indices() {
    const n = Math.max(0, this.rows);
    return Array.from({ length: n }, (_, i) => i);
  }
  static \u0275fac = function ZmSkeletonListComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ZmSkeletonListComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ZmSkeletonListComponent, selectors: [["zm-skeleton-list"]], inputs: { rows: "rows" }, decls: 3, vars: 0, consts: [[1, "zm-skeleton-list"], [1, "zm-skeleton-list__row"], [1, "zm-skeleton", "zm-skeleton-list__icon"], [1, "zm-skeleton-list__text"], [1, "zm-skeleton", "zm-skeleton-list__line", "zm-skeleton-list__line--lg"], [1, "zm-skeleton", "zm-skeleton-list__line", "zm-skeleton-list__line--sm"], [1, "zm-skeleton", "zm-skeleton-list__badge"]], template: function ZmSkeletonListComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "div", 0);
      \u0275\u0275repeaterCreate(1, ZmSkeletonListComponent_For_2_Template, 6, 0, "div", 1, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275domElementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.indices);
    }
  }, styles: ["\n\n.zm-skeleton-list[_ngcontent-%COMP%] {\n  border-radius: 0.75rem;\n  border: 1px solid var(--c-border);\n  background: var(--c-surface);\n  overflow: hidden;\n}\n.zm-skeleton-list__row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  padding: 0.75rem 1rem;\n  border-bottom: 1px solid var(--c-border);\n}\n.zm-skeleton-list__row[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n.zm-skeleton-list__icon[_ngcontent-%COMP%] {\n  width: 28px;\n  height: 28px;\n  border-radius: 0.5rem;\n  flex-shrink: 0;\n}\n.zm-skeleton-list__text[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 0.375rem;\n}\n.zm-skeleton-list__line[_ngcontent-%COMP%] {\n  height: 0.8125rem;\n  border-radius: 4px;\n}\n.zm-skeleton-list__line--lg[_ngcontent-%COMP%] {\n  width: min(65%, 280px);\n}\n.zm-skeleton-list__line--sm[_ngcontent-%COMP%] {\n  width: 38%;\n}\n.zm-skeleton-list__badge[_ngcontent-%COMP%] {\n  width: 3.5rem;\n  height: 1.25rem;\n  border-radius: 9999px;\n  flex-shrink: 0;\n}\n/*# sourceMappingURL=skeleton-list.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ZmSkeletonListComponent, [{
    type: Component,
    args: [{ selector: "zm-skeleton-list", standalone: true, template: `
    <div class="zm-skeleton-list">
      @for (i of indices; track i) {
        <div class="zm-skeleton-list__row">
          <div class="zm-skeleton zm-skeleton-list__icon"></div>
          <div class="zm-skeleton-list__text">
            <div class="zm-skeleton zm-skeleton-list__line zm-skeleton-list__line--lg"></div>
            <div class="zm-skeleton zm-skeleton-list__line zm-skeleton-list__line--sm"></div>
          </div>
          <div class="zm-skeleton zm-skeleton-list__badge"></div>
        </div>
      }
    </div>
  `, styles: ["/* src/app/shared/components/skeletons/skeleton-list/skeleton-list.component.scss */\n.zm-skeleton-list {\n  border-radius: 0.75rem;\n  border: 1px solid var(--c-border);\n  background: var(--c-surface);\n  overflow: hidden;\n}\n.zm-skeleton-list__row {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  padding: 0.75rem 1rem;\n  border-bottom: 1px solid var(--c-border);\n}\n.zm-skeleton-list__row:last-child {\n  border-bottom: none;\n}\n.zm-skeleton-list__icon {\n  width: 28px;\n  height: 28px;\n  border-radius: 0.5rem;\n  flex-shrink: 0;\n}\n.zm-skeleton-list__text {\n  flex: 1;\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 0.375rem;\n}\n.zm-skeleton-list__line {\n  height: 0.8125rem;\n  border-radius: 4px;\n}\n.zm-skeleton-list__line--lg {\n  width: min(65%, 280px);\n}\n.zm-skeleton-list__line--sm {\n  width: 38%;\n}\n.zm-skeleton-list__badge {\n  width: 3.5rem;\n  height: 1.25rem;\n  border-radius: 9999px;\n  flex-shrink: 0;\n}\n/*# sourceMappingURL=skeleton-list.component.css.map */\n"] }]
  }], null, { rows: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ZmSkeletonListComponent, { className: "ZmSkeletonListComponent", filePath: "src/app/shared/components/skeletons/skeleton-list/skeleton-list.component.ts", lineNumber: 22 });
})();

// src/app/shared/components/skeletons/skeleton-card/skeleton-card.component.ts
var ZmSkeletonCardComponent = class _ZmSkeletonCardComponent {
  height = 120;
  static \u0275fac = function ZmSkeletonCardComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ZmSkeletonCardComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ZmSkeletonCardComponent, selectors: [["zm-skeleton-card"]], inputs: { height: "height" }, decls: 1, vars: 4, consts: [[1, "zm-skeleton", "w-full", "rounded-xl"]], template: function ZmSkeletonCardComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElement(0, "div", 0);
    }
    if (rf & 2) {
      \u0275\u0275styleProp("height", ctx.height, "px")("border", "1px solid var(--c-border)");
    }
  }, encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ZmSkeletonCardComponent, [{
    type: Component,
    args: [{
      selector: "zm-skeleton-card",
      standalone: true,
      template: `
    <div
      class="zm-skeleton w-full rounded-xl"
      [style.height.px]="height"
      [style.border]="'1px solid var(--c-border)'"
    ></div>
  `
    }]
  }], null, { height: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ZmSkeletonCardComponent, { className: "ZmSkeletonCardComponent", filePath: "src/app/shared/components/skeletons/skeleton-card/skeleton-card.component.ts", lineNumber: 14 });
})();

export {
  LoadingService,
  ZmSkeletonDashboardComponent,
  ZmSkeletonListComponent,
  ZmSkeletonCardComponent
};
//# sourceMappingURL=chunk-GKI5AWTV.js.map
