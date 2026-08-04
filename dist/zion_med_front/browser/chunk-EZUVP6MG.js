import {
  Injectable,
  setClassMetadata,
  signal,
  ɵɵdefineInjectable
} from "./chunk-GRLISYEV.js";

// src/app/core/services/toast.service.ts
var ToastService = class _ToastService {
  _id = 0;
  toasts = signal([], ...ngDevMode ? [{ debugName: "toasts" }] : []);
  show(type, title, desc, duration = 4e3) {
    const toast = { id: ++this._id, type, title, desc, duration };
    this.toasts.update((t) => [...t, toast]);
    setTimeout(() => this.remove(toast.id), duration);
  }
  success(title, desc) {
    this.show("success", title, desc);
  }
  error(title, desc) {
    this.show("error", title, desc);
  }
  warning(title, desc) {
    this.show("warning", title, desc);
  }
  info(title, desc) {
    this.show("info", title, desc);
  }
  remove(id) {
    this.toasts.update((t) => t.filter((x) => x.id !== id));
  }
  static \u0275fac = function ToastService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ToastService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ToastService, factory: _ToastService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ToastService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

export {
  ToastService
};
//# sourceMappingURL=chunk-EZUVP6MG.js.map
