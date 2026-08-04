import {
  environment
} from "./chunk-IBJWGIJV.js";
import {
  HttpClient,
  HttpParams,
  Injectable,
  inject,
  setClassMetadata,
  ɵɵdefineInjectable
} from "./chunk-GRLISYEV.js";

// src/app/core/services/api.service.ts
var ApiService = class _ApiService {
  http = inject(HttpClient);
  base = `${environment.apiUrl}/api/v1`;
  get(path, params) {
    let httpParams = new HttpParams();
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        if (v !== void 0 && v !== null && v !== "")
          httpParams = httpParams.set(k, String(v));
      });
    }
    return this.http.get(`${this.base}${path}`, { params: httpParams });
  }
  post(path, body) {
    return this.http.post(`${this.base}${path}`, body);
  }
  put(path, body) {
    return this.http.put(`${this.base}${path}`, body);
  }
  /** PUT com FormData (ex.: upload de logo). */
  putFormData(path, form) {
    return this.http.put(`${this.base}${path}`, form);
  }
  patch(path, body) {
    return this.http.patch(`${this.base}${path}`, body);
  }
  delete(path) {
    return this.http.delete(`${this.base}${path}`);
  }
  getBlob(path, params) {
    let httpParams = new HttpParams();
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        if (v !== void 0 && v !== null && v !== "")
          httpParams = httpParams.set(k, String(v));
      });
    }
    return this.http.get(`${this.base}${path}`, { params: httpParams, responseType: "blob" });
  }
  get baseUrl() {
    return this.base;
  }
  static \u0275fac = function ApiService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ApiService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ApiService, factory: _ApiService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ApiService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

export {
  ApiService
};
//# sourceMappingURL=chunk-7WBHVE2H.js.map
