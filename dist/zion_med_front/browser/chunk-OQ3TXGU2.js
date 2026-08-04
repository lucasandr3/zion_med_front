import {
  ApiService
} from "./chunk-7WBHVE2H.js";
import {
  Injectable,
  __spreadProps,
  __spreadValues,
  inject,
  map,
  setClassMetadata,
  ɵɵdefineInjectable
} from "./chunk-GRLISYEV.js";

// src/app/core/services/protocolos.service.ts
var ProtocolosService = class _ProtocolosService {
  api = inject(ApiService);
  list(params) {
    const p = __spreadValues({}, params);
    if (params?.page)
      p["page"] = params.page;
    return this.api.get("/protocols", p).pipe(map((r) => ({
      data: r.data,
      meta: r.meta
    })));
  }
  get(id) {
    return this.api.get(`/protocols/${id}`).pipe(map((r) => r.data));
  }
  pdf(id) {
    return this.api.getBlob(`/protocols/${id}/pdf`);
  }
  aprovar(id, aprovado, comentario) {
    return this.api.post(`/protocols/${id}/revisao`, { approved: aprovado, comment: comentario });
  }
  comentario(id, comentario) {
    return this.api.post(`/protocols/${id}/comentario`, { comment: comentario });
  }
  exportarCsv(params) {
    return this.api.getBlob("/protocols/exportar", params);
  }
  /** Exportar PDF em lote (até 50). Backend pode expor GET /protocols/exportar-pdf?limit=50 */
  exportarPdf(params) {
    const p = __spreadProps(__spreadValues({}, params), { limit: params?.limit ?? 50 });
    return this.api.getBlob("/protocols/exportar-pdf", p);
  }
  static \u0275fac = function ProtocolosService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ProtocolosService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ProtocolosService, factory: _ProtocolosService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ProtocolosService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

export {
  ProtocolosService
};
//# sourceMappingURL=chunk-OQ3TXGU2.js.map
