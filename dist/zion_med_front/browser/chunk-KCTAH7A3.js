import {
  normalizeBillingUi
} from "./chunk-T5FMHWLF.js";
import {
  ApiService
} from "./chunk-7WBHVE2H.js";
import {
  AuthService
} from "./chunk-SFRXLDXR.js";
import {
  Injectable,
  Subject,
  __spreadProps,
  __spreadValues,
  inject,
  map,
  setClassMetadata,
  switchMap,
  tap,
  ɵɵdefineInjectable
} from "./chunk-GRLISYEV.js";

// src/app/core/services/clinica.service.ts
var ClinicaService = class _ClinicaService {
  api = inject(ApiService);
  auth = inject(AuthService);
  /** Emite após logo/capa/dados visuais da clínica mudarem (sidebar e outros ouvintes). */
  brandingUpdated = new Subject();
  clinicBrandingUpdated$ = this.brandingUpdated.asObservable();
  emitBrandingUpdated() {
    this.brandingUpdated.next();
  }
  mapConfigResponse(r) {
    const d = r.data;
    if (typeof d === "object" && d && "organization" in d && d.organization) {
      return d.organization;
    }
    return typeof d === "object" && d && "clinic" in d ? d.clinic : d;
  }
  listParaEscolher() {
    return this.api.get("/clinica/escolher").pipe(map((r) => {
      const d = r.data;
      if (Array.isArray(d))
        return d;
      return d.organizations ?? d.clinics ?? [];
    }));
  }
  escolher(organizationId) {
    return this.api.post("/clinica/escolher", { organization_id: organizationId }).pipe(tap(() => {
      this.auth.setCurrentOrganizationId(organizationId);
      this.emitBrandingUpdated();
    }));
  }
  /**
   * Cria nova empresa/filial no mesmo tenant (plano multi-empresa).
   * Backend: POST /clinica/clinics — ajuste o path se a API usar outro endpoint.
   */
  createClinicInTenant(name) {
    return this.api.post("/clinica/clinics", { name: name.trim() }).pipe(switchMap(() => this.getConfiguracoesPage()));
  }
  getConfiguracoes() {
    return this.api.get("/clinica/configuracoes").pipe(map((r) => this.mapConfigResponse(r)));
  }
  /** Retorna a resposta completa da página de configurações. */
  getConfiguracoesPage(query) {
    return this.api.get("/clinica/configuracoes", query).pipe(map((r) => {
      const raw = r.data;
      const organization = raw.organization ?? raw.clinic;
      const tenant_organizations = raw.tenant_organizations ?? raw.tenant_clinics;
      const subs = raw.billing_subscriptions ?? [];
      const billing_ui = normalizeBillingUi(raw.billing_ui, subs);
      return __spreadProps(__spreadValues({}, raw), {
        organization,
        tenant_organizations,
        billing_ui
      });
    }));
  }
  /** Logs de auditoria da clínica atual (paginados). */
  getClinicaLogs(page = 1, perPage = 50) {
    return this.api.get("/clinica/logs", { page, per_page: perPage });
  }
  updateConfiguracoes(payload, logoFile) {
    if (logoFile) {
      const form = new FormData();
      const bh = payload.business_hours;
      Object.entries(payload).forEach(([k, v]) => {
        if (k === "business_hours" || v === null || v === void 0)
          return;
        if (typeof v === "boolean") {
          form.append(k, v ? "1" : "0");
        } else {
          form.append(k, String(v));
        }
      });
      if (bh && typeof bh === "object") {
        Object.entries(bh).forEach(([day, slot]) => {
          if (slot?.open && slot?.close) {
            form.append(`business_hours[${day}][open]`, slot.open);
            form.append(`business_hours[${day}][close]`, slot.close);
          }
        });
      }
      form.append("logo", logoFile, logoFile.name);
      return this.api.putFormData("/clinica/configuracoes", form).pipe(map((r) => this.mapConfigResponse(r)), tap(() => this.emitBrandingUpdated()));
    }
    return this.api.put("/clinica/configuracoes", payload).pipe(map((r) => this.mapConfigResponse(r)));
  }
  uploadCoverImage(coverFile, clinicName) {
    const form = new FormData();
    form.append("name", clinicName);
    form.append("cover_image", coverFile, coverFile.name);
    return this.api.putFormData("/clinica/configuracoes", form).pipe(map((r) => this.mapConfigResponse(r)), tap(() => this.emitBrandingUpdated()));
  }
  static \u0275fac = function ClinicaService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ClinicaService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ClinicaService, factory: _ClinicaService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ClinicaService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

export {
  ClinicaService
};
//# sourceMappingURL=chunk-KCTAH7A3.js.map
