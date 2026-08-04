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

// src/app/core/services/templates.service.ts
var TemplatesService = class _TemplatesService {
  api = inject(ApiService);
  list(params) {
    return this.api.get("/templates", params).pipe(map((r) => r.data));
  }
  get(id) {
    return this.api.get(`/templates/${id}`).pipe(map((r) => r.data));
  }
  create(payload) {
    return this.api.post("/templates", payload).pipe(map((r) => r.data));
  }
  /** Cria um template a partir de outro (cópia do modelo). */
  createFromTemplate(templateId) {
    return this.api.post(`/templates/a-partir-de/${templateId}`, {}).pipe(map((r) => r.data));
  }
  update(id, payload) {
    return this.api.put(`/templates/${id}`, payload).pipe(map((r) => r.data));
  }
  delete(id) {
    return this.api.delete(`/templates/${id}`).pipe(map(() => void 0));
  }
  getCampos(templateId) {
    return this.api.get(`/templates/${templateId}/campos`).pipe(map((r) => r.data ?? []));
  }
  storeCampo(templateId, payload) {
    return this.api.post(`/templates/${templateId}/campos`, payload);
  }
  updateCampo(templateId, campoId, payload) {
    return this.api.put(`/templates/${templateId}/campos/${campoId}`, payload);
  }
  destroyCampo(templateId, campoId) {
    return this.api.delete(`/templates/${templateId}/campos/${campoId}`).pipe(map(() => void 0));
  }
  gerarLink(templateId) {
    return this.api.post(`/templates/${templateId}/link-publico`, {});
  }
  desativarLink(templateId) {
    return this.api.delete(`/templates/${templateId}/link-publico`).pipe(map(() => void 0));
  }
  /** Envia link do documento por e-mail ou WhatsApp (body: channel?, recipient_email ou recipient_phone, expires_at?). */
  enviarDocumento(templateId, payload) {
    return this.api.post(`/templates/${templateId}/enviar`, payload);
  }
  static \u0275fac = function TemplatesService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TemplatesService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _TemplatesService, factory: _TemplatesService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TemplatesService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

export {
  TemplatesService
};
//# sourceMappingURL=chunk-E3NIIMGP.js.map
