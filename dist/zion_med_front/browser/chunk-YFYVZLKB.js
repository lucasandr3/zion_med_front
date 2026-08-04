import {
  ApiService
} from "./chunk-7WBHVE2H.js";
import {
  environment
} from "./chunk-IBJWGIJV.js";
import {
  Injectable,
  inject,
  map,
  setClassMetadata,
  ɵɵdefineInjectable
} from "./chunk-GRLISYEV.js";

// src/app/core/services/link-bio.service.ts
var LinkBioService = class _LinkBioService {
  api = inject(ApiService);
  get() {
    return this.api.get("/link-bio").pipe(map((r) => {
      const d = r.data;
      return {
        clinic: d.clinic,
        public_url: d.public_url,
        links: d.bio_links ?? [],
        forms: d.form_links_public ?? [],
        available_icons: d.available_icons ?? {},
        available_themes: d.available_themes ?? {},
        metrics: {
          visitas_hoje: d.visitas_hoje ?? 0,
          total_views: d.total_views ?? 0,
          total_clicks: d.total_clicks ?? 0,
          total_clicks_last_30: d.total_clicks_last_30 ?? 0,
          taxa_clique: d.taxa_clique ?? 0,
          formularios_total: d.formularios_total ?? 0,
          formularios_ativos: d.formularios_ativos ?? 0,
          formularios_draft: d.formularios_draft ?? 0
        },
        stats: {
          clicks_per_day: d.clicks_per_day ?? {},
          views_per_day: d.views_per_day ?? {},
          most_clicked_link: d.most_clicked_link,
          peak_day_label: d.peak_day_label
        }
      };
    }));
  }
  createLink(payload) {
    return this.api.post("/link-bio/links", payload).pipe(map((r) => r.data));
  }
  updateLink(id, payload) {
    return this.api.put(`/link-bio/links/${id}`, payload).pipe(map((r) => r.data));
  }
  deleteLink(id) {
    return this.api.delete(`/link-bio/links/${id}`).pipe(map(() => void 0));
  }
  reorderLinks(linkIds) {
    return this.api.post("/link-bio/links/reorder", { ids: linkIds });
  }
  updateAparencia(payload) {
    return this.api.put("/link-bio/aparencia", payload).pipe(map((r) => {
      const d = r.data;
      return typeof d === "object" && d && "clinic" in d ? d.clinic : d;
    }));
  }
  /**
   * URL de saída para link da bio: em prévia usa o destino direto (não conta clique).
   * Fora da prévia passa pela API, que registra o clique e redireciona.
   */
  outboundBioLinkUrl(slug, link, isPreview) {
    if (isPreview || !slug) {
      return link.url;
    }
    const root = environment.apiUrl.replace(/\/+$/, "");
    return `${root}/api/v1/link-bio/public/${encodeURIComponent(slug)}/go/${link.id}`;
  }
  /** Página pública do Link Bio por slug (sem autenticação). */
  getPublicBySlug(slug, opts) {
    const params = opts?.preview ? { preview: "1" } : void 0;
    return this.api.get(`/link-bio/public/${encodeURIComponent(slug)}`, params).pipe(map((r) => r.data));
  }
  static \u0275fac = function LinkBioService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LinkBioService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _LinkBioService, factory: _LinkBioService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LinkBioService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

export {
  LinkBioService
};
//# sourceMappingURL=chunk-YFYVZLKB.js.map
