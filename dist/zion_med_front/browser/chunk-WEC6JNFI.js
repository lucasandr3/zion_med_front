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

// src/app/core/services/organization-roles.service.ts
var OrganizationRolesService = class _OrganizationRolesService {
  api = inject(ApiService);
  catalog() {
    return this.api.get("/permissions/catalog").pipe(map((r) => r.data));
  }
  list() {
    return this.api.get("/organization-roles").pipe(map((r) => r.data));
  }
  get(slug) {
    return this.api.get(`/organization-roles/${encodeURIComponent(slug)}`).pipe(map((r) => r.data));
  }
  create(body) {
    return this.api.post("/organization-roles", body).pipe(map((r) => r.data));
  }
  update(slug, body) {
    return this.api.put(`/organization-roles/${encodeURIComponent(slug)}`, body).pipe(map((r) => r.data));
  }
  delete(slug) {
    return this.api.delete(`/organization-roles/${encodeURIComponent(slug)}`).pipe(map(() => void 0));
  }
  static \u0275fac = function OrganizationRolesService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _OrganizationRolesService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _OrganizationRolesService, factory: _OrganizationRolesService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OrganizationRolesService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

export {
  OrganizationRolesService
};
//# sourceMappingURL=chunk-WEC6JNFI.js.map
