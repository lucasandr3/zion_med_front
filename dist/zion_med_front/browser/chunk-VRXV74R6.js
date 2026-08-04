import {
  Injectable,
  setClassMetadata,
  signal,
  ɵɵdefineInjectable
} from "./chunk-GRLISYEV.js";

// src/app/core/services/billing-blocked-state.service.ts
var BillingBlockedStateService = class _BillingBlockedStateService {
  active = signal(false, ...ngDevMode ? [{ debugName: "active" }] : []);
  isActive = this.active.asReadonly();
  activate() {
    this.active.set(true);
  }
  clear() {
    this.active.set(false);
  }
  static \u0275fac = function BillingBlockedStateService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _BillingBlockedStateService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _BillingBlockedStateService, factory: _BillingBlockedStateService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BillingBlockedStateService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

export {
  BillingBlockedStateService
};
//# sourceMappingURL=chunk-VRXV74R6.js.map
