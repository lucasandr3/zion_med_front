import {
  environment
} from "./chunk-IBJWGIJV.js";
import {
  HttpClient,
  Injectable,
  inject,
  map,
  setClassMetadata,
  ɵɵdefineInjectable
} from "./chunk-GRLISYEV.js";

// src/app/core/services/landing.service.ts
var BASE = `${environment.apiUrl}/api/v1`;
var LandingService = class _LandingService {
  http = inject(HttpClient);
  getLanding() {
    return this.http.get(`${BASE}/landing`).pipe(map((r) => r.data));
  }
  getStatus() {
    return this.http.get(`${BASE}/status`);
  }
  enviarDemonstracao(payload) {
    return this.http.post(`${BASE}/demonstracao`, payload);
  }
  static \u0275fac = function LandingService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LandingService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _LandingService, factory: _LandingService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LandingService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

export {
  LandingService
};
//# sourceMappingURL=chunk-3W5QFCP6.js.map
