import {
  DOCUMENT,
  Directive,
  ElementRef,
  Input,
  PLATFORM_ID,
  inject,
  isPlatformBrowser,
  setClassMetadata,
  ɵɵdefineDirective
} from "./chunk-GRLISYEV.js";

// src/app/core/directives/tooltip.directive.ts
var TOOLTIP_ID = "global-tooltip";
var SHOW_DELAY_MS = 400;
var HIDE_DELAY_MS = 50;
var TooltipDirective = class _TooltipDirective {
  appTooltip = "";
  el = inject(ElementRef);
  doc = inject(DOCUMENT);
  platformId = inject(PLATFORM_ID);
  tooltipEl = null;
  showTimer = null;
  hideTimer = null;
  ngOnInit() {
    if (!isPlatformBrowser(this.platformId) || !this.appTooltip?.trim())
      return;
    const host = this.el.nativeElement;
    host.addEventListener("mouseenter", this.onEnter);
    host.addEventListener("mouseleave", this.onLeave);
    host.addEventListener("focus", this.onEnter);
    host.addEventListener("blur", this.onLeave);
  }
  ngOnDestroy() {
    this.clearTimers();
    const host = this.el.nativeElement;
    host.removeEventListener("mouseenter", this.onEnter);
    host.removeEventListener("mouseleave", this.onLeave);
    host.removeEventListener("focus", this.onEnter);
    host.removeEventListener("blur", this.onLeave);
    this.hide();
  }
  onEnter = () => {
    this.clearTimers();
    this.hideTimer = setTimeout(() => this.show(), SHOW_DELAY_MS);
  };
  onLeave = () => {
    this.clearTimers();
    this.hideTimer = setTimeout(() => this.hide(), HIDE_DELAY_MS);
  };
  clearTimers() {
    if (this.showTimer) {
      clearTimeout(this.showTimer);
      this.showTimer = null;
    }
    if (this.hideTimer) {
      clearTimeout(this.hideTimer);
      this.hideTimer = null;
    }
  }
  getOrCreateTooltip() {
    let el = this.doc.getElementById(TOOLTIP_ID);
    if (!el) {
      el = this.doc.createElement("div");
      el.id = TOOLTIP_ID;
      el.setAttribute("role", "tooltip");
      el.setAttribute("aria-hidden", "true");
      this.doc.body.appendChild(el);
    }
    this.tooltipEl = el;
    return el;
  }
  show() {
    const text = (this.appTooltip ?? "").trim();
    if (!text)
      return;
    const tip = this.getOrCreateTooltip();
    tip.textContent = text;
    tip.style.visibility = "hidden";
    tip.classList.add("is-visible");
    if (!tip.parentElement) {
      this.doc.body.appendChild(tip);
    }
    const hostRect = this.el.nativeElement.getBoundingClientRect();
    const rect = tip.getBoundingClientRect();
    const gap = 6;
    let left = hostRect.left + (hostRect.width - rect.width) / 2;
    let top = hostRect.bottom + gap;
    const maxLeft = this.doc.documentElement.clientWidth - rect.width - 8;
    const minLeft = 8;
    left = Math.max(minLeft, Math.min(maxLeft, left));
    if (top + rect.height > this.doc.documentElement.clientHeight - 8) {
      top = hostRect.top - rect.height - gap;
    }
    top = Math.max(8, top);
    tip.style.left = `${left}px`;
    tip.style.top = `${top}px`;
    tip.style.visibility = "";
  }
  hide() {
    this.tooltipEl?.classList.remove("is-visible");
  }
  static \u0275fac = function TooltipDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TooltipDirective)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({ type: _TooltipDirective, selectors: [["", "appTooltip", ""]], inputs: { appTooltip: "appTooltip" } });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TooltipDirective, [{
    type: Directive,
    args: [{
      selector: "[appTooltip]",
      standalone: true
    }]
  }], null, { appTooltip: [{
    type: Input
  }] });
})();

export {
  TooltipDirective
};
//# sourceMappingURL=chunk-LVZEGAGU.js.map
