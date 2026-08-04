import {
  ApiService
} from "./chunk-7WBHVE2H.js";
import {
  Injectable,
  __spreadValues,
  inject,
  map,
  setClassMetadata,
  ɵɵdefineInjectable
} from "./chunk-GRLISYEV.js";

// src/app/core/services/pessoas.service.ts
var PessoasService = class _PessoasService {
  api = inject(ApiService);
  list(params) {
    const p = __spreadValues({}, params);
    if (params?.page)
      p["page"] = params.page;
    return this.api.get("/pessoas", p).pipe(map((r) => ({
      data: r.data,
      meta: r.meta
    })));
  }
  get(id) {
    return this.api.get(`/pessoas/${id}`).pipe(map((r) => r.data));
  }
  create(payload) {
    return this.api.post("/pessoas", payload).pipe(map((r) => r.data));
  }
  update(id, payload) {
    return this.api.put(`/pessoas/${id}`, payload).pipe(map((r) => r.data));
  }
  destroy(id) {
    return this.api.delete(`/pessoas/${id}`).pipe(map((r) => r.data));
  }
  static \u0275fac = function PessoasService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PessoasService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _PessoasService, factory: _PessoasService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PessoasService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

export {
  PessoasService
};
//# sourceMappingURL=chunk-OC6MFLDL.js.map
