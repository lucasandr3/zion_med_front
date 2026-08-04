import {
  ApiService
} from "./chunk-7WBHVE2H.js";
import {
  Injectable,
  inject,
  map,
  setClassMetadata,
  ɵɵdefineInjectable
} from "./chunk-GRLISYEV.js";

// src/app/core/services/usuarios.service.ts
var UsuariosService = class _UsuariosService {
  api = inject(ApiService);
  list() {
    return this.api.get("/usuarios").pipe(map((r) => r.data));
  }
  get(id) {
    return this.api.get(`/usuarios/${id}`).pipe(map((r) => r.data));
  }
  roles() {
    return this.api.get("/usuarios/roles").pipe(map((r) => {
      const arr = Array.isArray(r.data) ? r.data : [];
      return arr.map((x) => typeof x === "object" && x && "value" in x ? { value: x.value, label: x.label ?? x.value } : { value: String(x), label: String(x) });
    }));
  }
  create(payload) {
    return this.api.post("/usuarios", payload).pipe(map((r) => r.data));
  }
  update(id, payload) {
    return this.api.put(`/usuarios/${id}`, payload).pipe(map((r) => r.data));
  }
  delete(id) {
    return this.api.delete(`/usuarios/${id}`).pipe(map(() => void 0));
  }
  static \u0275fac = function UsuariosService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _UsuariosService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _UsuariosService, factory: _UsuariosService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UsuariosService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

export {
  UsuariosService
};
//# sourceMappingURL=chunk-GQYQFEJU.js.map
