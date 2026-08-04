import {
  ApiService
} from "./chunk-7WBHVE2H.js";
import {
  ConfirmDialogService
} from "./chunk-RISAXZFK.js";
import {
  ToastService
} from "./chunk-EZUVP6MG.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgControlStatusGroup,
  NgForm,
  NgModel,
  RequiredValidator,
  ɵNgNoValidate
} from "./chunk-USROZ7PW.js";
import "./chunk-IBJWGIJV.js";
import {
  CommonModule,
  Component,
  DatePipe,
  Injectable,
  __async,
  inject,
  map,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-GRLISYEV.js";

// src/app/core/services/integracoes.service.ts
var IntegracoesService = class _IntegracoesService {
  api = inject(ApiService);
  get() {
    return this.api.get("/clinica/integracoes").pipe(map((r) => r.data));
  }
  criarToken(name) {
    return this.api.post("/clinica/integracoes/tokens", { name }).pipe(map((r) => r.data));
  }
  revogarToken(id) {
    return this.api.delete(`/clinica/integracoes/tokens/${id}`).pipe(map(() => void 0));
  }
  criarWebhook(payload) {
    return this.api.post("/clinica/integracoes/webhooks", payload).pipe(map((r) => r.data));
  }
  removerWebhook(id) {
    return this.api.delete(`/clinica/integracoes/webhooks/${id}`).pipe(map(() => void 0));
  }
  /** Reenvia uma entrega de webhook falha. */
  reenviarDelivery(deliveryId) {
    return this.api.post(`/clinica/integracoes/webhook-deliveries/${deliveryId}/retry`, {});
  }
  static \u0275fac = function IntegracoesService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _IntegracoesService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _IntegracoesService, factory: _IntegracoesService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IntegracoesService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

// src/app/paginas/clinica/clinica-integracoes.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function ClinicaIntegracoesComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 1);
    \u0275\u0275text(1, "Carregando integra\xE7\xF5es\u2026");
    \u0275\u0275elementEnd();
  }
}
function ClinicaIntegracoesComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 2);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.erro);
  }
}
function ClinicaIntegracoesComponent_Conditional_3_Conditional_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 19)(1, "div", 9)(2, "div", 10)(3, "span", 11);
    \u0275\u0275text(4, "key");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "span", 12);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 13)(8, "p", 44);
    \u0275\u0275text(9, "Copie e guarde em local seguro. Este valor n\xE3o ser\xE1 exibido novamente.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "code", 45);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1("Token criado: ", ctx_r0.ultimoTokenGerado.name);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.ultimoTokenGerado.token);
  }
}
function ClinicaIntegracoesComponent_Conditional_3_Conditional_55_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 28);
  }
}
function ClinicaIntegracoesComponent_Conditional_3_Conditional_56_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 29);
    \u0275\u0275text(1, "add");
    \u0275\u0275elementEnd();
  }
}
function ClinicaIntegracoesComponent_Conditional_3_Conditional_58_For_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 48)(1, "td", 47);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 49);
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "td", 47)(7, "button", 50);
    \u0275\u0275listener("click", function ClinicaIntegracoesComponent_Conditional_3_Conditional_58_For_10_Template_button_click_7_listener() {
      const t_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.revogarToken(t_r4));
    });
    \u0275\u0275text(8, "Revogar");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const t_r4 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(t_r4.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(5, 2, t_r4.created_at, "dd/MM/yyyy HH:mm"));
  }
}
function ClinicaIntegracoesComponent_Conditional_3_Conditional_58_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 30)(1, "thead")(2, "tr", 46)(3, "th", 47);
    \u0275\u0275text(4, "Nome");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th", 47);
    \u0275\u0275text(6, "Criado em");
    \u0275\u0275elementEnd();
    \u0275\u0275element(7, "th", 47);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "tbody");
    \u0275\u0275repeaterCreate(9, ClinicaIntegracoesComponent_Conditional_3_Conditional_58_For_10_Template, 9, 5, "tr", 48, _forTrack0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(9);
    \u0275\u0275repeater(ctx_r0.tokens);
  }
}
function ClinicaIntegracoesComponent_Conditional_3_For_88_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label", 35)(1, "input", 51);
    \u0275\u0275listener("change", function ClinicaIntegracoesComponent_Conditional_3_For_88_Template_input_change_1_listener($event) {
      const ev_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.toggleEvento(ev_r6, $event.target.checked));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ev_r6 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("checked", ctx_r0.novoWebhookEventos.includes(ev_r6));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.eventLabels[ev_r6] || ev_r6, " ");
  }
}
function ClinicaIntegracoesComponent_Conditional_3_Conditional_102_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 28);
  }
}
function ClinicaIntegracoesComponent_Conditional_3_Conditional_103_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 29);
    \u0275\u0275text(1, "add");
    \u0275\u0275elementEnd();
  }
}
function ClinicaIntegracoesComponent_Conditional_3_Conditional_105_For_2_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 54);
    \u0275\u0275text(1, " (inativo)");
    \u0275\u0275elementEnd();
  }
}
function ClinicaIntegracoesComponent_Conditional_3_Conditional_105_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 52)(1, "div", 53)(2, "div")(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 54);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(7, ClinicaIntegracoesComponent_Conditional_3_Conditional_105_For_2_Conditional_7_Template, 2, 0, "span", 54);
    \u0275\u0275elementStart(8, "div", 55);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 56)(11, "button", 57);
    \u0275\u0275listener("click", function ClinicaIntegracoesComponent_Conditional_3_Conditional_105_For_2_Template_button_click_11_listener() {
      const wh_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.removerWebhook(wh_r8));
    });
    \u0275\u0275text(12, "Excluir");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const wh_r8 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(wh_r8.description || "Webhook");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" \u2014 ", wh_r8.url);
    \u0275\u0275advance();
    \u0275\u0275conditional(!wh_r8.is_active ? 7 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.formatarEventosWebhook(wh_r8), " ");
  }
}
function ClinicaIntegracoesComponent_Conditional_3_Conditional_105_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 40);
    \u0275\u0275repeaterCreate(1, ClinicaIntegracoesComponent_Conditional_3_Conditional_105_For_2_Template, 13, 4, "div", 52, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.webhooks);
  }
}
function ClinicaIntegracoesComponent_Conditional_3_Conditional_115_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 42);
    \u0275\u0275text(1, "Nenhuma entrega registrada.");
    \u0275\u0275elementEnd();
  }
}
function ClinicaIntegracoesComponent_Conditional_3_Conditional_116_For_15_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 61);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const d_r9 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(d_r9.response_code);
  }
}
function ClinicaIntegracoesComponent_Conditional_3_Conditional_116_For_15_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 54);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const d_r9 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(d_r9.response_code ?? (d_r9.error_message || "-"));
  }
}
function ClinicaIntegracoesComponent_Conditional_3_Conditional_116_For_15_Conditional_12_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 64);
  }
}
function ClinicaIntegracoesComponent_Conditional_3_Conditional_116_For_15_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 63);
    \u0275\u0275listener("click", function ClinicaIntegracoesComponent_Conditional_3_Conditional_116_For_15_Conditional_12_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r10);
      const d_r9 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.reenviar(d_r9));
    });
    \u0275\u0275conditionalCreate(1, ClinicaIntegracoesComponent_Conditional_3_Conditional_116_For_15_Conditional_12_Conditional_1_Template, 1, 0, "span", 64);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const d_r9 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275property("disabled", ctx_r0.reenviandoId === d_r9.id);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.reenviandoId === d_r9.id ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.reenviandoId === d_r9.id ? "Reenviando\u2026" : "Reenviar", " ");
  }
}
function ClinicaIntegracoesComponent_Conditional_3_Conditional_116_For_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 48)(1, "td", 60);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "td", 59);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "td", 59);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td", 59);
    \u0275\u0275conditionalCreate(9, ClinicaIntegracoesComponent_Conditional_3_Conditional_116_For_15_Conditional_9_Template, 2, 1, "span", 61)(10, ClinicaIntegracoesComponent_Conditional_3_Conditional_116_For_15_Conditional_10_Template, 2, 1, "span", 54);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "td", 59);
    \u0275\u0275conditionalCreate(12, ClinicaIntegracoesComponent_Conditional_3_Conditional_116_For_15_Conditional_12_Template, 3, 3, "button", 62);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const d_r9 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(3, 5, d_r9.created_at, "dd/MM/yyyy HH:mm:ss"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.eventLabels[d_r9.event] || d_r9.event);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(d_r9.webhook_id);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(d_r9.response_code != null && d_r9.response_code >= 200 && d_r9.response_code < 300 ? 9 : 10);
    \u0275\u0275advance(3);
    \u0275\u0275conditional((d_r9.response_code == null || d_r9.response_code < 200 || d_r9.response_code >= 300) && d_r9.id ? 12 : -1);
  }
}
function ClinicaIntegracoesComponent_Conditional_3_Conditional_116_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 43)(1, "table", 58)(2, "thead")(3, "tr", 46)(4, "th", 59);
    \u0275\u0275text(5, "Data");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "th", 59);
    \u0275\u0275text(7, "Evento");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th", 59);
    \u0275\u0275text(9, "Webhook");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th", 59);
    \u0275\u0275text(11, "Status");
    \u0275\u0275elementEnd();
    \u0275\u0275element(12, "th", 59);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "tbody");
    \u0275\u0275repeaterCreate(14, ClinicaIntegracoesComponent_Conditional_3_Conditional_116_For_15_Template, 13, 8, "tr", 48, _forTrack0);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(14);
    \u0275\u0275repeater(ctx_r0.deliveries);
  }
}
function ClinicaIntegracoesComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 3)(1, "div", 4)(2, "button", 5);
    \u0275\u0275listener("click", function ClinicaIntegracoesComponent_Conditional_3_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.ativarAba("api"));
    });
    \u0275\u0275elementStart(3, "span", 6);
    \u0275\u0275text(4, "key");
    \u0275\u0275elementEnd();
    \u0275\u0275text(5, " API e tokens ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 5);
    \u0275\u0275listener("click", function ClinicaIntegracoesComponent_Conditional_3_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.ativarAba("webhooks"));
    });
    \u0275\u0275elementStart(7, "span", 6);
    \u0275\u0275text(8, "webhook");
    \u0275\u0275elementEnd();
    \u0275\u0275text(9, " Webhooks ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "button", 5);
    \u0275\u0275listener("click", function ClinicaIntegracoesComponent_Conditional_3_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.ativarAba("entregas"));
    });
    \u0275\u0275elementStart(11, "span", 6);
    \u0275\u0275text(12, "history");
    \u0275\u0275elementEnd();
    \u0275\u0275text(13, " Entregas ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 7)(15, "div", 8)(16, "div", 9)(17, "div", 10)(18, "span", 11);
    \u0275\u0275text(19, "menu_book");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "span", 12);
    \u0275\u0275text(21, "Documenta\xE7\xE3o da API");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "div", 13)(23, "p", 14);
    \u0275\u0275text(24, "Documenta\xE7\xE3o interativa (Scramble) e especifica\xE7\xE3o OpenAPI para integrar com outros sistemas.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "div", 15)(26, "a", 16)(27, "span", 17);
    \u0275\u0275text(28, "menu_book");
    \u0275\u0275elementEnd();
    \u0275\u0275text(29, " Documenta\xE7\xE3o interativa ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "a", 18)(31, "span", 17);
    \u0275\u0275text(32, "download");
    \u0275\u0275elementEnd();
    \u0275\u0275text(33, " OpenAPI (JSON) ");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275conditionalCreate(34, ClinicaIntegracoesComponent_Conditional_3_Conditional_34_Template, 12, 2, "div", 19);
    \u0275\u0275elementStart(35, "div", 20)(36, "div", 9)(37, "div", 10)(38, "span", 11);
    \u0275\u0275text(39, "key");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(40, "span", 12);
    \u0275\u0275text(41, "Token de API");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(42, "div", 13)(43, "p", 21);
    \u0275\u0275text(44, "Gere um token para acessar a API REST (protocolos, templates).");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(45, "p", 22);
    \u0275\u0275text(46, "Use o header: ");
    \u0275\u0275elementStart(47, "code", 23);
    \u0275\u0275text(48, "Authorization: Bearer SEU_TOKEN");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(49, "form", 24);
    \u0275\u0275listener("ngSubmit", function ClinicaIntegracoesComponent_Conditional_3_Template_form_ngSubmit_49_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.criarToken());
    });
    \u0275\u0275elementStart(50, "div", 25)(51, "label");
    \u0275\u0275text(52, "Nome do token");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(53, "input", 26);
    \u0275\u0275twoWayListener("ngModelChange", function ClinicaIntegracoesComponent_Conditional_3_Template_input_ngModelChange_53_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.novoTokenNome, $event) || (ctx_r0.novoTokenNome = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(54, "button", 27);
    \u0275\u0275conditionalCreate(55, ClinicaIntegracoesComponent_Conditional_3_Conditional_55_Template, 1, 0, "span", 28)(56, ClinicaIntegracoesComponent_Conditional_3_Conditional_56_Template, 2, 0, "span", 29);
    \u0275\u0275text(57);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(58, ClinicaIntegracoesComponent_Conditional_3_Conditional_58_Template, 11, 0, "table", 30);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(59, "div", 31)(60, "div", 20)(61, "div", 9)(62, "div", 10)(63, "span", 11);
    \u0275\u0275text(64, "webhook");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(65, "span", 12);
    \u0275\u0275text(66, "Webhooks");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(67, "div", 13)(68, "p", 21);
    \u0275\u0275text(69, "Receba notifica\xE7\xF5es em tempo real (POST na URL informada) quando uma submiss\xE3o for criada, assinada, aprovada ou reprovada.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(70, "p", 22);
    \u0275\u0275text(71, "Cada requisi\xE7\xE3o inclui o header ");
    \u0275\u0275elementStart(72, "code");
    \u0275\u0275text(73, "X-Webhook-Signature");
    \u0275\u0275elementEnd();
    \u0275\u0275text(74, " com assinatura HMAC SHA-256 do corpo (formato: ");
    \u0275\u0275elementStart(75, "code");
    \u0275\u0275text(76, "sha256=<hash>");
    \u0275\u0275elementEnd();
    \u0275\u0275text(77, ").");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(78, "form", 32);
    \u0275\u0275listener("ngSubmit", function ClinicaIntegracoesComponent_Conditional_3_Template_form_ngSubmit_78_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.criarWebhook());
    });
    \u0275\u0275elementStart(79, "div", 25)(80, "label");
    \u0275\u0275text(81, "URL");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(82, "input", 33);
    \u0275\u0275twoWayListener("ngModelChange", function ClinicaIntegracoesComponent_Conditional_3_Template_input_ngModelChange_82_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.novoWebhookUrl, $event) || (ctx_r0.novoWebhookUrl = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(83, "div", 25)(84, "label");
    \u0275\u0275text(85, "Eventos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(86, "div", 34);
    \u0275\u0275repeaterCreate(87, ClinicaIntegracoesComponent_Conditional_3_For_88_Template, 3, 2, "label", 35, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(89, "div", 25)(90, "label");
    \u0275\u0275text(91, "Secret ");
    \u0275\u0275elementStart(92, "span", 36);
    \u0275\u0275text(93, "opcional, para assinatura HMAC");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(94, "input", 37);
    \u0275\u0275twoWayListener("ngModelChange", function ClinicaIntegracoesComponent_Conditional_3_Template_input_ngModelChange_94_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.novoWebhookSecret, $event) || (ctx_r0.novoWebhookSecret = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(95, "div", 25)(96, "label");
    \u0275\u0275text(97, "Descri\xE7\xE3o ");
    \u0275\u0275elementStart(98, "span", 36);
    \u0275\u0275text(99, "opcional");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(100, "input", 38);
    \u0275\u0275twoWayListener("ngModelChange", function ClinicaIntegracoesComponent_Conditional_3_Template_input_ngModelChange_100_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.novoWebhookDescricao, $event) || (ctx_r0.novoWebhookDescricao = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(101, "button", 39);
    \u0275\u0275conditionalCreate(102, ClinicaIntegracoesComponent_Conditional_3_Conditional_102_Template, 1, 0, "span", 28)(103, ClinicaIntegracoesComponent_Conditional_3_Conditional_103_Template, 2, 0, "span", 29);
    \u0275\u0275text(104);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(105, ClinicaIntegracoesComponent_Conditional_3_Conditional_105_Template, 3, 0, "div", 40);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(106, "div", 41)(107, "div", 20)(108, "div", 9)(109, "div", 10)(110, "span", 11);
    \u0275\u0275text(111, "history");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(112, "span", 12);
    \u0275\u0275text(113, "\xDAltimas entregas de webhook");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(114, "div", 13);
    \u0275\u0275conditionalCreate(115, ClinicaIntegracoesComponent_Conditional_3_Conditional_115_Template, 2, 0, "p", 42)(116, ClinicaIntegracoesComponent_Conditional_3_Conditional_116_Template, 16, 0, "div", 43);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx_r0.abaAtiva === "api");
    \u0275\u0275advance(4);
    \u0275\u0275classProp("active", ctx_r0.abaAtiva === "webhooks");
    \u0275\u0275advance(4);
    \u0275\u0275classProp("active", ctx_r0.abaAtiva === "entregas");
    \u0275\u0275advance(4);
    \u0275\u0275classProp("active", ctx_r0.abaAtiva === "api");
    \u0275\u0275advance(20);
    \u0275\u0275conditional(ctx_r0.ultimoTokenGerado ? 34 : -1);
    \u0275\u0275advance(19);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.novoTokenNome);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r0.tokenCriando);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.tokenCriando ? 55 : 56);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.tokenCriando ? "Criando\u2026" : "Criar token", " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.tokens.length > 0 ? 58 : -1);
    \u0275\u0275advance();
    \u0275\u0275classProp("active", ctx_r0.abaAtiva === "webhooks");
    \u0275\u0275advance(23);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.novoWebhookUrl);
    \u0275\u0275advance(5);
    \u0275\u0275repeater(ctx_r0.availableEvents);
    \u0275\u0275advance(7);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.novoWebhookSecret);
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.novoWebhookDescricao);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r0.webhookCriando);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.webhookCriando ? 102 : 103);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.webhookCriando ? "Salvando\u2026" : "Adicionar webhook", " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.webhooks.length > 0 ? 105 : -1);
    \u0275\u0275advance();
    \u0275\u0275classProp("active", ctx_r0.abaAtiva === "entregas");
    \u0275\u0275advance(9);
    \u0275\u0275conditional(ctx_r0.deliveries.length === 0 ? 115 : 116);
  }
}
var ClinicaIntegracoesComponent = class _ClinicaIntegracoesComponent {
  service = inject(IntegracoesService);
  toast = inject(ToastService);
  confirm = inject(ConfirmDialogService);
  state = null;
  carregando = false;
  erro = "";
  abaAtiva = "api";
  // token
  novoTokenNome = "";
  ultimoTokenGerado = null;
  // webhooks
  novoWebhookUrl = "";
  novoWebhookEventos = [];
  novoWebhookSecret = "";
  novoWebhookDescricao = "";
  tokenCriando = false;
  webhookCriando = false;
  ngOnInit() {
    this.carregar();
  }
  get tokens() {
    return this.state?.tokens ?? [];
  }
  get webhooks() {
    return this.state?.webhooks ?? [];
  }
  get deliveries() {
    return this.state?.deliveries ?? [];
  }
  get eventLabels() {
    return this.state?.event_labels ?? {};
  }
  get availableEvents() {
    return this.state?.available_events ?? [];
  }
  ativarAba(aba) {
    this.abaAtiva = aba;
  }
  carregar() {
    this.carregando = true;
    this.service.get().subscribe({
      next: (s) => {
        this.state = s;
        this.carregando = false;
      },
      error: () => {
        this.carregando = false;
        this.erro = "N\xE3o foi poss\xEDvel carregar as integra\xE7\xF5es.";
      }
    });
  }
  criarToken() {
    if (!this.novoTokenNome.trim())
      return;
    this.tokenCriando = true;
    this.service.criarToken(this.novoTokenNome.trim()).subscribe({
      next: (res) => {
        this.tokenCriando = false;
        this.ultimoTokenGerado = { token: res.token, name: res.name };
        this.novoTokenNome = "";
        this.carregar();
        this.toast.success("Token criado", "Guarde o token com seguran\xE7a; ele n\xE3o ser\xE1 exibido novamente.");
      },
      error: () => {
        this.tokenCriando = false;
        this.toast.error("Erro", "N\xE3o foi poss\xEDvel criar o token.");
      }
    });
  }
  revogarToken(token) {
    return __async(this, null, function* () {
      const ok = yield this.confirm.request({
        title: "Revogar token?",
        messageBefore: "O token ",
        emphasis: token.name ?? `#${token.id}`,
        messageAfter: " deixar\xE1 de funcionar imediatamente.",
        confirmLabel: "Sim, revogar",
        variant: "danger"
      });
      if (!ok)
        return;
      this.service.revogarToken(token.id).subscribe({
        next: () => {
          this.carregar();
          this.toast.success("Token revogado", "O acesso por esse token foi encerrado.");
        },
        error: () => this.toast.error("Erro", "N\xE3o foi poss\xEDvel revogar o token.")
      });
    });
  }
  toggleEvento(ev, checked) {
    if (checked) {
      if (!this.novoWebhookEventos.includes(ev))
        this.novoWebhookEventos.push(ev);
    } else {
      this.novoWebhookEventos = this.novoWebhookEventos.filter((e) => e !== ev);
    }
  }
  criarWebhook() {
    if (!this.novoWebhookUrl.trim() || this.novoWebhookEventos.length === 0)
      return;
    this.webhookCriando = true;
    const payload = {
      url: this.novoWebhookUrl.trim(),
      events: this.novoWebhookEventos,
      secret: this.novoWebhookSecret || void 0,
      description: this.novoWebhookDescricao || void 0
    };
    this.service.criarWebhook(payload).subscribe({
      next: () => {
        this.webhookCriando = false;
        this.novoWebhookUrl = "";
        this.novoWebhookEventos = [];
        this.novoWebhookSecret = "";
        this.novoWebhookDescricao = "";
        this.carregar();
        this.toast.success("Webhook criado", "O endpoint foi registrado.");
      },
      error: () => {
        this.webhookCriando = false;
        this.toast.error("Erro", "N\xE3o foi poss\xEDvel criar o webhook.");
      }
    });
  }
  removerWebhook(wh) {
    return __async(this, null, function* () {
      const url = wh.url?.trim() ?? "";
      const emphasis = url.length > 48 ? `${url.slice(0, 48)}\u2026` : url.length > 0 ? url : `#${wh.id}`;
      const ok = yield this.confirm.request({
        title: "Remover webhook?",
        messageBefore: "O webhook ",
        emphasis,
        messageAfter: " ser\xE1 removido.",
        confirmLabel: "Sim, remover",
        variant: "danger"
      });
      if (!ok)
        return;
      this.service.removerWebhook(wh.id).subscribe({
        next: () => {
          this.carregar();
          this.toast.success("Webhook removido", "O endpoint foi exclu\xEDdo.");
        },
        error: () => this.toast.error("Erro", "N\xE3o foi poss\xEDvel remover o webhook.")
      });
    });
  }
  reenviandoId = null;
  reenviar(d) {
    this.reenviandoId = d.id;
    this.service.reenviarDelivery(d.id).subscribe({
      next: () => {
        this.reenviandoId = null;
        this.carregar();
        this.toast.success("Reenvio solicitado", "A entrega foi colocada na fila novamente.");
      },
      error: () => {
        this.reenviandoId = null;
        this.toast.error("Erro", "N\xE3o foi poss\xEDvel reenviar.");
      }
    });
  }
  formatarEventosWebhook(wh) {
    if (!wh?.events?.length)
      return "";
    return wh.events.map((ev) => this.eventLabels[ev] || ev).join(", ");
  }
  static \u0275fac = function ClinicaIntegracoesComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ClinicaIntegracoesComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ClinicaIntegracoesComponent, selectors: [["app-clinica-integracoes"]], decls: 4, vars: 3, consts: [[1, "relative", "min-h-[320px]"], [1, "text-sm", 2, "color", "var(--c-muted)"], [1, "text-sm", 2, "color", "var(--c-error, #dc2626)"], [1, "clinica-config", "integracoes-page"], ["role", "tablist", 1, "config-tabs"], ["type", "button", "role", "tab", 1, "config-tab", 3, "click"], [1, "material-symbols-outlined", 2, "font-size", "1rem", "vertical-align", "middle", "margin-right", "4px"], ["id", "panel-api", "role", "tabpanel", 1, "config-panel"], [1, "section-card", "section-card-docs"], [1, "section-header"], [1, "icon-wrap"], [1, "material-symbols-outlined"], [1, "section-title"], [1, "section-body"], [1, "section-body-p"], [1, "section-actions"], ["href", "/docs/api", "target", "_blank", "rel", "noopener", 1, "btn-primary", "btn-docs-primary"], [1, "material-symbols-outlined", 2, "font-size", "16px"], ["href", "/docs/api.json", "target", "_blank", "rel", "noopener", 1, "btn-ghost", "btn-docs-secondary"], [1, "section-card", "section-card-token-created"], [1, "section-card"], [2, "margin-bottom", "8px"], [1, "hint", 2, "margin-bottom", "16px"], [2, "display", "inline-block", "margin-top", "4px"], [2, "display", "flex", "gap", "8px", "align-items", "flex-end", "flex-wrap", "wrap", 3, "ngSubmit"], [1, "field", 2, "margin-bottom", "0"], ["type", "text", "name", "novoTokenNome", "placeholder", "Ex: ERP, Sistema externo", "required", "", 1, "form-input", 2, "min-width", "200px", 3, "ngModelChange", "ngModel"], ["type", "submit", 1, "btn-primary", "inline-flex", "items-center", "gap-2", 2, "padding", "10px 16px", 3, "disabled"], ["aria-hidden", "true", 1, "btn-spinner"], [1, "material-symbols-outlined", 2, "font-size", "18px"], [1, "mt-4", 2, "width", "100%", "font-size", "0.8rem", "border-collapse", "collapse"], ["id", "panel-webhooks", "role", "tabpanel", 1, "config-panel"], [2, "display", "flex", "flex-direction", "column", "gap", "1rem", "max-width", "560px", "margin-bottom", "1.5rem", 3, "ngSubmit"], ["type", "url", "name", "novoWebhookUrl", "placeholder", "https://seu-sistema.com/webhook", "required", "", 1, "form-input", 3, "ngModelChange", "ngModel"], [2, "display", "flex", "gap", "12px", "flex-wrap", "wrap", "margin-top", "6px"], [2, "display", "flex", "align-items", "center", "gap", "6px", "font-size", "0.8rem", "cursor", "pointer"], [1, "opt", 2, "font-size", "10px", "font-weight", "400", "color", "var(--c-muted)", "margin-left", "6px"], ["type", "text", "name", "novoWebhookSecret", "placeholder", "Chave secreta", 1, "form-input", 2, "max-width", "280px", 3, "ngModelChange", "ngModel"], ["type", "text", "name", "novoWebhookDescricao", "placeholder", "Ex: ERP principal", 1, "form-input", 2, "max-width", "280px", 3, "ngModelChange", "ngModel"], ["type", "submit", 1, "btn-primary", "inline-flex", "items-center", "gap-2", 2, "align-self", "flex-start", "padding", "10px 16px", 3, "disabled"], [2, "display", "flex", "flex-direction", "column", "gap", "0.75rem"], ["id", "panel-entregas", "role", "tabpanel", 1, "config-panel"], [2, "font-size", "0.8rem", "color", "var(--c-muted)"], [2, "overflow-x", "auto"], [1, "hint", 2, "margin-bottom", "10px"], ["id", "new-token", 2, "display", "block", "padding", "12px", "background", "var(--c-soft)", "border-radius", "8px", "word-break", "break-all", "font-size", "0.8rem"], [2, "border-bottom", "1px solid var(--c-border)", "text-align", "left"], [2, "padding", "8px 0"], [2, "border-bottom", "1px solid var(--c-border)"], [2, "padding", "8px 0", "color", "var(--c-muted)"], ["type", "button", 2, "color", "var(--c-muted)", "font-size", "0.75rem", "background", "none", "border", "none", "cursor", "pointer", "text-decoration", "underline", 3, "click"], ["type", "checkbox", 3, "change", "checked"], [2, "padding", "12px", "border", "1px solid var(--c-border)", "border-radius", "8px", "font-size", "0.8rem"], [2, "display", "flex", "justify-content", "space-between", "align-items", "flex-start", "flex-wrap", "wrap", "gap", "8px"], [2, "color", "var(--c-muted)"], [2, "margin-top", "4px", "color", "var(--c-muted)"], [2, "display", "flex", "gap", "8px"], ["type", "button", 2, "color", "#f87171", "font-size", "0.75rem", "background", "none", "border", "none", "cursor", "pointer", "text-decoration", "underline", 3, "click"], [2, "width", "100%", "font-size", "0.75rem", "border-collapse", "collapse"], [2, "padding", "6px 8px"], [2, "padding", "6px 8px", "color", "var(--c-muted)"], [2, "color", "#22c55e"], ["type", "button", 1, "btn-ghost", "text-sm", "inline-flex", "items-center", "gap-2", 3, "disabled"], ["type", "button", 1, "btn-ghost", "text-sm", "inline-flex", "items-center", "gap-2", 3, "click", "disabled"], [1, "btn-spinner", 2, "width", "12px", "height", "12px", "border-width", "2px"]], template: function ClinicaIntegracoesComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275conditionalCreate(1, ClinicaIntegracoesComponent_Conditional_1_Template, 2, 0, "p", 1);
      \u0275\u0275conditionalCreate(2, ClinicaIntegracoesComponent_Conditional_2_Template, 2, 1, "p", 2);
      \u0275\u0275conditionalCreate(3, ClinicaIntegracoesComponent_Conditional_3_Template, 117, 26, "div", 3);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.carregando ? 1 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.carregando && ctx.erro ? 2 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.carregando && !ctx.erro && ctx.state ? 3 : -1);
    }
  }, dependencies: [CommonModule, FormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, NgModel, NgForm, DatePipe], styles: ["\n\n.integracoes-page[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  min-height: 0;\n  width: 100%;\n}\n.integracoes-page[_ngcontent-%COMP%]   .config-panel[_ngcontent-%COMP%] {\n  display: none;\n  margin-top: 1rem;\n}\n.integracoes-page[_ngcontent-%COMP%]   .config-panel.active[_ngcontent-%COMP%] {\n  display: block;\n}\n.integracoes-page[_ngcontent-%COMP%]   .section-card[_ngcontent-%COMP%] {\n  background: var(--c-surface);\n  border: 1px solid var(--c-border);\n  border-radius: 14px;\n  overflow: hidden;\n  margin-bottom: 20px;\n}\n.integracoes-page[_ngcontent-%COMP%]   .section-card-docs[_ngcontent-%COMP%] {\n  border-left: 3px solid var(--c-primary);\n}\n.integracoes-page[_ngcontent-%COMP%]   .section-card-token-created[_ngcontent-%COMP%] {\n  border-left: 3px solid var(--c-primary);\n}\n.integracoes-page[_ngcontent-%COMP%]   .section-body-p[_ngcontent-%COMP%] {\n  margin-bottom: 1rem;\n  color: var(--c-text);\n  font-size: 0.875rem;\n  line-height: 1.5;\n}\n.integracoes-page[_ngcontent-%COMP%]   .section-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.75rem;\n  flex-wrap: wrap;\n}\n.integracoes-page[_ngcontent-%COMP%]   .btn-docs-primary[_ngcontent-%COMP%], \n.integracoes-page[_ngcontent-%COMP%]   .btn-docs-secondary[_ngcontent-%COMP%] {\n  padding: 0.5rem 0.875rem;\n  font-size: 0.8125rem;\n  text-decoration: none;\n  display: inline-flex;\n  align-items: center;\n  gap: 0.375rem;\n  border-radius: 0.5rem;\n}\n.integracoes-page[_ngcontent-%COMP%]   .btn-docs-secondary[_ngcontent-%COMP%] {\n  border: 1px solid var(--c-border);\n  color: var(--c-primary);\n  background: var(--c-surface);\n}\n.integracoes-page[_ngcontent-%COMP%]   .btn-docs-secondary[_ngcontent-%COMP%]:hover {\n  background: var(--c-soft);\n  border-color: var(--c-primary);\n}\n.integracoes-page[_ngcontent-%COMP%]   .section-header[_ngcontent-%COMP%] {\n  padding: 16px 20px;\n  border-bottom: 1px solid var(--c-border);\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.integracoes-page[_ngcontent-%COMP%]   .section-header[_ngcontent-%COMP%]   .icon-wrap[_ngcontent-%COMP%] {\n  width: 28px;\n  height: 28px;\n  background: color-mix(in srgb, var(--c-primary) 12%, transparent);\n  border-radius: 7px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.integracoes-page[_ngcontent-%COMP%]   .section-header[_ngcontent-%COMP%]   .icon-wrap[_ngcontent-%COMP%]   .material-symbols-outlined[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: var(--c-primary);\n}\n.integracoes-page[_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 700;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n  color: var(--c-muted);\n}\n.integracoes-page[_ngcontent-%COMP%]   .section-body[_ngcontent-%COMP%] {\n  padding: 20px;\n}\n.integracoes-page[_ngcontent-%COMP%]   .field[_ngcontent-%COMP%] {\n  margin-bottom: 18px;\n}\n.integracoes-page[_ngcontent-%COMP%]   .field[_ngcontent-%COMP%]:last-child {\n  margin-bottom: 0;\n}\n.integracoes-page[_ngcontent-%COMP%]   .field[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 12px;\n  font-weight: 600;\n  color: var(--c-text);\n  margin-bottom: 6px;\n}\n.integracoes-page[_ngcontent-%COMP%]   .field[_ngcontent-%COMP%]   .hint[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: var(--c-muted);\n  margin-top: 5px;\n  word-break: break-word;\n  overflow-wrap: break-word;\n}\n/*# sourceMappingURL=clinica-integracoes.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ClinicaIntegracoesComponent, [{
    type: Component,
    args: [{ selector: "app-clinica-integracoes", standalone: true, imports: [CommonModule, FormsModule], template: `<div class="relative min-h-[320px]">
  @if (carregando) {
    <p class="text-sm" style="color: var(--c-muted)">Carregando integra\xE7\xF5es\u2026</p>
  }
  @if (!carregando && erro) {
    <p class="text-sm" style="color: var(--c-error, #dc2626)">{{ erro }}</p>
  }

  @if (!carregando && !erro && state) {
    <div class="clinica-config integracoes-page">
      <!-- Abas -->
      <div class="config-tabs" role="tablist">
        <button type="button" class="config-tab" [class.active]="abaAtiva === 'api'" (click)="ativarAba('api')" role="tab">
          <span class="material-symbols-outlined" style="font-size:1rem;vertical-align:middle;margin-right:4px">key</span>
          API e tokens
        </button>
        <button type="button" class="config-tab" [class.active]="abaAtiva === 'webhooks'" (click)="ativarAba('webhooks')" role="tab">
          <span class="material-symbols-outlined" style="font-size:1rem;vertical-align:middle;margin-right:4px">webhook</span>
          Webhooks
        </button>
        <button type="button" class="config-tab" [class.active]="abaAtiva === 'entregas'" (click)="ativarAba('entregas')" role="tab">
          <span class="material-symbols-outlined" style="font-size:1rem;vertical-align:middle;margin-right:4px">history</span>
          Entregas
        </button>
      </div>

      <!-- Painel API e tokens -->
      <div id="panel-api" class="config-panel" [class.active]="abaAtiva === 'api'" role="tabpanel">
        <div class="section-card section-card-docs">
          <div class="section-header">
            <div class="icon-wrap">
              <span class="material-symbols-outlined">menu_book</span>
            </div>
            <span class="section-title">Documenta\xE7\xE3o da API</span>
          </div>
          <div class="section-body">
            <p class="section-body-p">Documenta\xE7\xE3o interativa (Scramble) e especifica\xE7\xE3o OpenAPI para integrar com outros sistemas.</p>
            <div class="section-actions">
              <a href="/docs/api" target="_blank" rel="noopener" class="btn-primary btn-docs-primary">
                <span class="material-symbols-outlined" style="font-size:16px">menu_book</span>
                Documenta\xE7\xE3o interativa
              </a>
              <a href="/docs/api.json" target="_blank" rel="noopener" class="btn-ghost btn-docs-secondary">
                <span class="material-symbols-outlined" style="font-size:16px">download</span>
                OpenAPI (JSON)
              </a>
            </div>
          </div>
        </div>

        @if (ultimoTokenGerado) {
          <div class="section-card section-card-token-created">
            <div class="section-header">
              <div class="icon-wrap">
                <span class="material-symbols-outlined">key</span>
              </div>
              <span class="section-title">Token criado: {{ ultimoTokenGerado.name }}</span>
            </div>
            <div class="section-body">
              <p class="hint" style="margin-bottom:10px">Copie e guarde em local seguro. Este valor n\xE3o ser\xE1 exibido novamente.</p>
              <code id="new-token" style="display:block;padding:12px;background:var(--c-soft);border-radius:8px;word-break:break-all;font-size:0.8rem">{{ ultimoTokenGerado.token }}</code>
            </div>
          </div>
        }

        <div class="section-card">
          <div class="section-header">
            <div class="icon-wrap">
              <span class="material-symbols-outlined">key</span>
            </div>
            <span class="section-title">Token de API</span>
          </div>
          <div class="section-body">
            <p style="margin-bottom:8px">Gere um token para acessar a API REST (protocolos, templates).</p>
            <p class="hint" style="margin-bottom:16px">Use o header: <code style="display:inline-block;margin-top:4px">Authorization: Bearer SEU_TOKEN</code></p>
            <form (ngSubmit)="criarToken()" style="display:flex;gap:8px;align-items:flex-end;flex-wrap:wrap">
              <div class="field" style="margin-bottom:0">
                <label>Nome do token</label>
                <input type="text" class="form-input" style="min-width:200px" [(ngModel)]="novoTokenNome" name="novoTokenNome" placeholder="Ex: ERP, Sistema externo" required />
              </div>
              <button type="submit" class="btn-primary inline-flex items-center gap-2" style="padding:10px 16px" [disabled]="tokenCriando">
                @if (tokenCriando) {
                  <span class="btn-spinner" aria-hidden="true"></span>
                } @else {
                  <span class="material-symbols-outlined" style="font-size:18px">add</span>
                }
                {{ tokenCriando ? 'Criando\u2026' : 'Criar token' }}
              </button>
            </form>

            @if (tokens.length > 0) {
              <table class="mt-4" style="width:100%;font-size:0.8rem;border-collapse:collapse">
                <thead>
                  <tr style="border-bottom:1px solid var(--c-border);text-align:left">
                    <th style="padding:8px 0">Nome</th>
                    <th style="padding:8px 0">Criado em</th>
                    <th style="padding:8px 0"></th>
                  </tr>
                </thead>
                <tbody>
                  @for (t of tokens; track t.id) {
                    <tr style="border-bottom:1px solid var(--c-border)">
                      <td style="padding:8px 0">{{ t.name }}</td>
                      <td style="padding:8px 0;color:var(--c-muted)">{{ t.created_at | date:'dd/MM/yyyy HH:mm' }}</td>
                      <td style="padding:8px 0">
                        <button type="button" style="color:var(--c-muted);font-size:0.75rem;background:none;border:none;cursor:pointer;text-decoration:underline" (click)="revogarToken(t)">Revogar</button>
                      </td>
                    </tr>
                  }
                </tbody>
              </table>
            }
          </div>
        </div>
      </div>

      <!-- Painel Webhooks -->
      <div id="panel-webhooks" class="config-panel" [class.active]="abaAtiva === 'webhooks'" role="tabpanel">
        <div class="section-card">
          <div class="section-header">
            <div class="icon-wrap">
              <span class="material-symbols-outlined">webhook</span>
            </div>
            <span class="section-title">Webhooks</span>
          </div>
          <div class="section-body">
            <p style="margin-bottom:8px">Receba notifica\xE7\xF5es em tempo real (POST na URL informada) quando uma submiss\xE3o for criada, assinada, aprovada ou reprovada.</p>
            <p class="hint" style="margin-bottom:16px">Cada requisi\xE7\xE3o inclui o header <code>X-Webhook-Signature</code> com assinatura HMAC SHA-256 do corpo (formato: <code>sha256=&lt;hash&gt;</code>).</p>
            <form (ngSubmit)="criarWebhook()" style="display:flex;flex-direction:column;gap:1rem;max-width:560px;margin-bottom:1.5rem">
              <div class="field" style="margin-bottom:0">
                <label>URL</label>
                <input type="url" class="form-input" [(ngModel)]="novoWebhookUrl" name="novoWebhookUrl" placeholder="https://seu-sistema.com/webhook" required />
              </div>
              <div class="field" style="margin-bottom:0">
                <label>Eventos</label>
                <div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:6px">
                  @for (ev of availableEvents; track ev) {
                    <label style="display:flex;align-items:center;gap:6px;font-size:0.8rem;cursor:pointer">
                      <input type="checkbox" [checked]="novoWebhookEventos.includes(ev)" (change)="toggleEvento(ev, $any($event.target).checked)" />
                      {{ eventLabels[ev] || ev }}
                    </label>
                  }
                </div>
              </div>
              <div class="field" style="margin-bottom:0">
                <label>Secret <span class="opt" style="font-size:10px;font-weight:400;color:var(--c-muted);margin-left:6px">opcional, para assinatura HMAC</span></label>
                <input type="text" class="form-input" [(ngModel)]="novoWebhookSecret" name="novoWebhookSecret" placeholder="Chave secreta" style="max-width:280px" />
              </div>
              <div class="field" style="margin-bottom:0">
                <label>Descri\xE7\xE3o <span class="opt" style="font-size:10px;font-weight:400;color:var(--c-muted);margin-left:6px">opcional</span></label>
                <input type="text" class="form-input" [(ngModel)]="novoWebhookDescricao" name="novoWebhookDescricao" placeholder="Ex: ERP principal" style="max-width:280px" />
              </div>
              <button type="submit" class="btn-primary inline-flex items-center gap-2" style="align-self:flex-start;padding:10px 16px" [disabled]="webhookCriando">
                @if (webhookCriando) {
                  <span class="btn-spinner" aria-hidden="true"></span>
                } @else {
                  <span class="material-symbols-outlined" style="font-size:18px">add</span>
                }
                {{ webhookCriando ? 'Salvando\u2026' : 'Adicionar webhook' }}
              </button>
            </form>

            @if (webhooks.length > 0) {
              <div style="display:flex;flex-direction:column;gap:0.75rem">
                @for (wh of webhooks; track wh.id) {
                  <div style="padding:12px;border:1px solid var(--c-border);border-radius:8px;font-size:0.8rem">
                    <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:8px">
                      <div>
                        <strong>{{ wh.description || 'Webhook' }}</strong>
                        <span style="color:var(--c-muted)"> \u2014 {{ wh.url }}</span>
                        @if (!wh.is_active) {
                          <span style="color:var(--c-muted)"> (inativo)</span>
                        }
                        <div style="margin-top:4px;color:var(--c-muted)">
                          {{ formatarEventosWebhook(wh) }}
                        </div>
                      </div>
                      <div style="display:flex;gap:8px">
                        <button type="button" style="color:#f87171;font-size:0.75rem;background:none;border:none;cursor:pointer;text-decoration:underline" (click)="removerWebhook(wh)">Excluir</button>
                      </div>
                    </div>
                  </div>
                }
              </div>
            }
          </div>
        </div>
      </div>

      <!-- Painel Entregas -->
      <div id="panel-entregas" class="config-panel" [class.active]="abaAtiva === 'entregas'" role="tabpanel">
        <div class="section-card">
          <div class="section-header">
            <div class="icon-wrap">
              <span class="material-symbols-outlined">history</span>
            </div>
            <span class="section-title">\xDAltimas entregas de webhook</span>
          </div>
          <div class="section-body">
            @if (deliveries.length === 0) {
              <p style="font-size:0.8rem;color:var(--c-muted)">Nenhuma entrega registrada.</p>
            } @else {
              <div style="overflow-x:auto">
                <table style="width:100%;font-size:0.75rem;border-collapse:collapse">
                  <thead>
                    <tr style="border-bottom:1px solid var(--c-border);text-align:left">
                      <th style="padding:6px 8px">Data</th>
                      <th style="padding:6px 8px">Evento</th>
                      <th style="padding:6px 8px">Webhook</th>
                      <th style="padding:6px 8px">Status</th>
                      <th style="padding:6px 8px"></th>
                    </tr>
                  </thead>
                  <tbody>
                    @for (d of deliveries; track d.id) {
                    <tr style="border-bottom:1px solid var(--c-border)">
                      <td style="padding:6px 8px;color:var(--c-muted)">{{ d.created_at | date:'dd/MM/yyyy HH:mm:ss' }}</td>
                        <td style="padding:6px 8px">{{ eventLabels[d.event] || d.event }}</td>
                        <td style="padding:6px 8px">{{ d.webhook_id }}</td>
                        <td style="padding:6px 8px">
                          @if (d.response_code != null && d.response_code >= 200 && d.response_code < 300) {
                            <span style="color:#22c55e">{{ d.response_code }}</span>
                          } @else {
                            <span style="color:var(--c-muted)">{{ d.response_code ?? (d.error_message || '-') }}</span>
                          }
                        </td>
                        <td style="padding:6px 8px">
                          @if ((d.response_code == null || d.response_code < 200 || d.response_code >= 300) && d.id) {
                            <button type="button" class="btn-ghost text-sm inline-flex items-center gap-2" (click)="reenviar(d)" [disabled]="reenviandoId === d.id">
                              @if (reenviandoId === d.id) {
                                <span class="btn-spinner" style="width:12px;height:12px;border-width:2px"></span>
                              }
                              {{ reenviandoId === d.id ? 'Reenviando\u2026' : 'Reenviar' }}
                            </button>
                          }
                        </td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  }
</div>
`, styles: ["/* src/app/paginas/clinica/clinica-integracoes.component.css */\n.integracoes-page {\n  display: flex;\n  flex-direction: column;\n  min-height: 0;\n  width: 100%;\n}\n.integracoes-page .config-panel {\n  display: none;\n  margin-top: 1rem;\n}\n.integracoes-page .config-panel.active {\n  display: block;\n}\n.integracoes-page .section-card {\n  background: var(--c-surface);\n  border: 1px solid var(--c-border);\n  border-radius: 14px;\n  overflow: hidden;\n  margin-bottom: 20px;\n}\n.integracoes-page .section-card-docs {\n  border-left: 3px solid var(--c-primary);\n}\n.integracoes-page .section-card-token-created {\n  border-left: 3px solid var(--c-primary);\n}\n.integracoes-page .section-body-p {\n  margin-bottom: 1rem;\n  color: var(--c-text);\n  font-size: 0.875rem;\n  line-height: 1.5;\n}\n.integracoes-page .section-actions {\n  display: flex;\n  gap: 0.75rem;\n  flex-wrap: wrap;\n}\n.integracoes-page .btn-docs-primary,\n.integracoes-page .btn-docs-secondary {\n  padding: 0.5rem 0.875rem;\n  font-size: 0.8125rem;\n  text-decoration: none;\n  display: inline-flex;\n  align-items: center;\n  gap: 0.375rem;\n  border-radius: 0.5rem;\n}\n.integracoes-page .btn-docs-secondary {\n  border: 1px solid var(--c-border);\n  color: var(--c-primary);\n  background: var(--c-surface);\n}\n.integracoes-page .btn-docs-secondary:hover {\n  background: var(--c-soft);\n  border-color: var(--c-primary);\n}\n.integracoes-page .section-header {\n  padding: 16px 20px;\n  border-bottom: 1px solid var(--c-border);\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.integracoes-page .section-header .icon-wrap {\n  width: 28px;\n  height: 28px;\n  background: color-mix(in srgb, var(--c-primary) 12%, transparent);\n  border-radius: 7px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.integracoes-page .section-header .icon-wrap .material-symbols-outlined {\n  font-size: 14px;\n  color: var(--c-primary);\n}\n.integracoes-page .section-title {\n  font-size: 12px;\n  font-weight: 700;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n  color: var(--c-muted);\n}\n.integracoes-page .section-body {\n  padding: 20px;\n}\n.integracoes-page .field {\n  margin-bottom: 18px;\n}\n.integracoes-page .field:last-child {\n  margin-bottom: 0;\n}\n.integracoes-page .field label {\n  display: block;\n  font-size: 12px;\n  font-weight: 600;\n  color: var(--c-text);\n  margin-bottom: 6px;\n}\n.integracoes-page .field .hint {\n  font-size: 11px;\n  color: var(--c-muted);\n  margin-top: 5px;\n  word-break: break-word;\n  overflow-wrap: break-word;\n}\n/*# sourceMappingURL=clinica-integracoes.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ClinicaIntegracoesComponent, { className: "ClinicaIntegracoesComponent", filePath: "src/app/paginas/clinica/clinica-integracoes.component.ts", lineNumber: 17 });
})();
export {
  ClinicaIntegracoesComponent
};
//# sourceMappingURL=chunk-DC4IDSM3.js.map
