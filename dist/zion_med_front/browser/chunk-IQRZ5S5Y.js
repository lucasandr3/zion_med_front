import {
  DOCUMENT,
  Injectable,
  inject,
  setClassMetadata,
  ɵɵdefineInjectable
} from "./chunk-GRLISYEV.js";

// src/app/core/services/public-page-body.service.ts
var PublicPageBodyService = class _PublicPageBodyService {
  document = inject(DOCUMENT);
  refCount = 0;
  hadBodyDark = false;
  enterPublicPage() {
    const body = this.document?.body;
    if (!body)
      return;
    if (this.refCount === 0) {
      this.hadBodyDark = body.classList.contains("dark");
      if (this.hadBodyDark) {
        body.classList.remove("dark");
      }
    }
    this.refCount++;
  }
  leavePublicPage() {
    const body = this.document?.body;
    if (!body)
      return;
    this.refCount = Math.max(0, this.refCount - 1);
    if (this.refCount === 0 && this.hadBodyDark) {
      body.classList.add("dark");
      this.hadBodyDark = false;
    }
  }
  static \u0275fac = function PublicPageBodyService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PublicPageBodyService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _PublicPageBodyService, factory: _PublicPageBodyService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PublicPageBodyService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

export {
  PublicPageBodyService
};
//# sourceMappingURL=chunk-IQRZ5S5Y.js.map
