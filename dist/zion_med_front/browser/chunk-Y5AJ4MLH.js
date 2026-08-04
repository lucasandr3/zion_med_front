import {
  BehaviorSubject,
  Injectable,
  setClassMetadata,
  ɵɵdefineInjectable
} from "./chunk-GRLISYEV.js";

// src/app/core/services/plataforma-header.service.ts
var PlataformaHeaderService = class _PlataformaHeaderService {
  override$ = new BehaviorSubject(null);
  getOverride() {
    return this.override$.asObservable();
  }
  setHeader(titulo, subtitulo = null) {
    this.override$.next({ titulo, subtitulo });
  }
  clearHeader() {
    this.override$.next(null);
  }
  static \u0275fac = function PlataformaHeaderService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PlataformaHeaderService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _PlataformaHeaderService, factory: _PlataformaHeaderService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PlataformaHeaderService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

export {
  PlataformaHeaderService
};
//# sourceMappingURL=chunk-Y5AJ4MLH.js.map
