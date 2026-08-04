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

// src/app/core/services/notificacoes.service.ts
var NotificacoesService = class _NotificacoesService {
  api = inject(ApiService);
  list() {
    return this.api.get("/notificacoes").pipe(map((r) => r.data ?? []));
  }
  getNaoLidasCount() {
    return this.list().pipe(map((list) => list.filter((n) => !n.read_at).length));
  }
  marcarComoLida(id) {
    return this.api.patch(`/notificacoes/${id}/lida`, {});
  }
  marcarTodasComoLidas() {
    return this.api.post("/notificacoes/marcar-todas", {});
  }
  limparTudo() {
    return this.api.delete("/notificacoes/limpar-tudo");
  }
  delete(id) {
    return this.api.delete(`/notificacoes/${id}`).pipe(map(() => void 0));
  }
  static \u0275fac = function NotificacoesService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NotificacoesService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _NotificacoesService, factory: _NotificacoesService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NotificacoesService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

export {
  NotificacoesService
};
//# sourceMappingURL=chunk-HY3FJGNT.js.map
