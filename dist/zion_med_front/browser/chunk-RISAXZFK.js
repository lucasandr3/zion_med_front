import {
  Injectable,
  __spreadValues,
  setClassMetadata,
  signal,
  ɵɵdefineInjectable
} from "./chunk-GRLISYEV.js";

// src/app/core/services/confirm-dialog.service.ts
var ConfirmDialogService = class _ConfirmDialogService {
  _options = signal(null, ...ngDevMode ? [{ debugName: "_options" }] : []);
  /** Opções do modal aberto (somente leitura para o template). */
  options = this._options.asReadonly();
  resolve;
  /** Abre o modal e retorna uma Promise: `true` se confirmou, `false` se cancelou. */
  request(opts) {
    return new Promise((resolve) => {
      this.resolve = resolve;
      this._options.set(__spreadValues({
        cancelLabel: "Cancelar",
        confirmLabel: "Confirmar",
        variant: "neutral"
      }, opts));
    });
  }
  respond(confirmed) {
    if (!this._options())
      return;
    this._options.set(null);
    const r = this.resolve;
    this.resolve = void 0;
    r?.(confirmed);
  }
  static \u0275fac = function ConfirmDialogService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ConfirmDialogService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ConfirmDialogService, factory: _ConfirmDialogService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ConfirmDialogService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

export {
  ConfirmDialogService
};
//# sourceMappingURL=chunk-RISAXZFK.js.map
