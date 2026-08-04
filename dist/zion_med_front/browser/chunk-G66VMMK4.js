import {
  ZmEmptyStateComponent,
  ZmPaginationComponent
} from "./chunk-5YRLWGMM.js";
import {
  PessoasService
} from "./chunk-OC6MFLDL.js";
import {
  TemplatesService
} from "./chunk-E3NIIMGP.js";
import {
  LoadingService,
  ZmSkeletonListComponent
} from "./chunk-GKI5AWTV.js";
import "./chunk-CAKNZVE6.js";
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
  NgModel,
  NgSelectOption,
  RadioControlValueAccessor,
  SelectControlValueAccessor,
  ɵNgSelectMultipleOption
} from "./chunk-USROZ7PW.js";
import "./chunk-SFRXLDXR.js";
import "./chunk-IBJWGIJV.js";
import "./chunk-C2NWBPZH.js";
import {
  CommonModule,
  Component,
  Injectable,
  __async,
  __spreadValues,
  inject,
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
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-GRLISYEV.js";

// src/app/core/services/document-sends.service.ts
var DocumentSendsService = class _DocumentSendsService {
  api = inject(ApiService);
  list(params) {
    const p = {};
    if (params.caixa)
      p["caixa"] = params.caixa;
    if (params.template_id != null)
      p["template_id"] = params.template_id;
    if (params.channel)
      p["channel"] = params.channel;
    if (params.per_page != null)
      p["per_page"] = params.per_page;
    if (params.page != null)
      p["page"] = params.page;
    return this.api.get("/document-sends", p);
  }
  cancel(id) {
    return this.api.post(`/document-sends/${id}/cancel`, {});
  }
  reenvio(id) {
    return this.api.post(`/document-sends/${id}/reenvio`, {});
  }
  store(payload) {
    const body = __spreadValues(__spreadValues(__spreadValues(__spreadValues({
      template_id: payload.template_id,
      channel: payload.channel
    }, payload.person_id != null ? { person_id: payload.person_id } : {}), payload.channel === "email" && payload.recipient_email != null && String(payload.recipient_email).trim() !== "" ? { recipient_email: payload.recipient_email } : {}), payload.channel === "whatsapp" && payload.recipient_phone != null && String(payload.recipient_phone).trim() !== "" ? { recipient_phone: payload.recipient_phone } : {}), payload.expires_at ? { expires_at: payload.expires_at } : {});
    return this.api.post("/document-sends", body);
  }
  static \u0275fac = function DocumentSendsService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DocumentSendsService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _DocumentSendsService, factory: _DocumentSendsService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DocumentSendsService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

// src/app/paginas/envios/envios.component.ts
var _forTrack0 = ($index, $item) => $item.key;
var _forTrack1 = ($index, $item) => $item.id;
function EnviosComponent_For_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 11);
    \u0275\u0275listener("click", function EnviosComponent_For_5_Template_button_click_0_listener() {
      const c_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.setCaixa(c_r2.key));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classProp("ativo", ctx_r2.caixaAtual === c_r2.key);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", c_r2.label, " ");
  }
}
function EnviosComponent_Conditional_10_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 13);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.erroNovo);
  }
}
function EnviosComponent_Conditional_10_For_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 18);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r5 = ctx.$implicit;
    \u0275\u0275property("value", t_r5.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(t_r5.name);
  }
}
function EnviosComponent_Conditional_10_Conditional_35_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 38);
    \u0275\u0275listener("click", function EnviosComponent_Conditional_10_Conditional_35_Conditional_7_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.limparPessoa());
    });
    \u0275\u0275text(1, "Limpar");
    \u0275\u0275elementEnd();
  }
}
function EnviosComponent_Conditional_10_Conditional_35_Conditional_8_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "li")(1, "button", 39);
    \u0275\u0275listener("click", function EnviosComponent_Conditional_10_Conditional_35_Conditional_8_For_2_Template_button_click_1_listener() {
      const p_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r2.selecionarPessoa(p_r9));
    });
    \u0275\u0275text(2);
    \u0275\u0275elementStart(3, "span", 40);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const p_r9 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", p_r9.name, " \xB7 ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(p_r9.code);
  }
}
function EnviosComponent_Conditional_10_Conditional_35_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ul", 37);
    \u0275\u0275repeaterCreate(1, EnviosComponent_Conditional_10_Conditional_35_Conditional_8_For_2_Template, 5, 2, "li", null, _forTrack1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.pessoaSugestoes);
  }
}
function EnviosComponent_Conditional_10_Conditional_35_Conditional_9_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(4);
    \u0275\u0275textInterpolate1(" E-mail: ", ctx_r2.pessoaSelecionada.email || "\u2014", " ");
  }
}
function EnviosComponent_Conditional_10_Conditional_35_Conditional_9_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(4);
    \u0275\u0275textInterpolate1(" Telefone: ", ctx_r2.pessoaSelecionada.phone || "\u2014", " ");
  }
}
function EnviosComponent_Conditional_10_Conditional_35_Conditional_9_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 42);
    \u0275\u0275text(1, "Voc\xEA pode informar manualmente abaixo se faltar dado na ficha.");
    \u0275\u0275elementEnd();
  }
}
function EnviosComponent_Conditional_10_Conditional_35_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 41);
    \u0275\u0275conditionalCreate(1, EnviosComponent_Conditional_10_Conditional_35_Conditional_9_Conditional_1_Template, 1, 1)(2, EnviosComponent_Conditional_10_Conditional_35_Conditional_9_Conditional_2_Template, 1, 1);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(3, EnviosComponent_Conditional_10_Conditional_35_Conditional_9_Conditional_3_Template, 2, 0, "p", 42);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.novoEnvio.channel === "email" ? 1 : 2);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.novoEnvio.channel === "email" && !ctx_r2.pessoaSelecionada.email || ctx_r2.novoEnvio.channel === "whatsapp" && !ctx_r2.pessoaSelecionada.phone ? 3 : -1);
  }
}
function EnviosComponent_Conditional_10_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 28)(1, "label", 16);
    \u0275\u0275text(2, "Buscar pessoa");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 19)(4, "input", 34);
    \u0275\u0275twoWayListener("ngModelChange", function EnviosComponent_Conditional_10_Conditional_35_Template_input_ngModelChange_4_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r2.pessoaBusca, $event) || (ctx_r2.pessoaBusca = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("keyup.enter", function EnviosComponent_Conditional_10_Conditional_35_Template_input_keyup_enter_4_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.buscarPessoas());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 35);
    \u0275\u0275listener("click", function EnviosComponent_Conditional_10_Conditional_35_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.buscarPessoas());
    });
    \u0275\u0275text(6, "Buscar");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(7, EnviosComponent_Conditional_10_Conditional_35_Conditional_7_Template, 2, 0, "button", 36);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(8, EnviosComponent_Conditional_10_Conditional_35_Conditional_8_Template, 3, 0, "ul", 37);
    \u0275\u0275conditionalCreate(9, EnviosComponent_Conditional_10_Conditional_35_Conditional_9_Template, 4, 2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.pessoaBusca);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r2.buscandoPessoas);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.pessoaSelecionada ? 7 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.pessoaSugestoes.length > 0 ? 8 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.pessoaSelecionada ? 9 : -1);
  }
}
function EnviosComponent_Conditional_10_Conditional_36_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 29)(1, "label", 16);
    \u0275\u0275text(2, "E-mail do destinat\xE1rio");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "input", 43);
    \u0275\u0275twoWayListener("ngModelChange", function EnviosComponent_Conditional_10_Conditional_36_Template_input_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r2 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r2.novoEnvio.recipient_email, $event) || (ctx_r2.novoEnvio.recipient_email = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.novoEnvio.recipient_email);
  }
}
function EnviosComponent_Conditional_10_Conditional_37_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 30)(1, "label", 16);
    \u0275\u0275text(2, "Telefone (WhatsApp)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "input", 44);
    \u0275\u0275twoWayListener("ngModelChange", function EnviosComponent_Conditional_10_Conditional_37_Template_input_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r11);
      const ctx_r2 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r2.novoEnvio.recipient_phone, $event) || (ctx_r2.novoEnvio.recipient_phone = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.novoEnvio.recipient_phone);
  }
}
function EnviosComponent_Conditional_10_Conditional_38_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 29)(1, "label", 16);
    \u0275\u0275text(2, "E-mail (obrigat\xF3rio)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "input", 43);
    \u0275\u0275twoWayListener("ngModelChange", function EnviosComponent_Conditional_10_Conditional_38_Template_input_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r12);
      const ctx_r2 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r2.novoEnvio.recipient_email, $event) || (ctx_r2.novoEnvio.recipient_email = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.novoEnvio.recipient_email);
  }
}
function EnviosComponent_Conditional_10_Conditional_39_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 30)(1, "label", 16);
    \u0275\u0275text(2, "Telefone (obrigat\xF3rio)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "input", 44);
    \u0275\u0275twoWayListener("ngModelChange", function EnviosComponent_Conditional_10_Conditional_39_Template_input_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r13);
      const ctx_r2 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r2.novoEnvio.recipient_phone, $event) || (ctx_r2.novoEnvio.recipient_phone = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.novoEnvio.recipient_phone);
  }
}
function EnviosComponent_Conditional_10_Conditional_42_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 32);
  }
}
function EnviosComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 7)(1, "h3", 12);
    \u0275\u0275text(2, "Enviar link do documento");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(3, EnviosComponent_Conditional_10_Conditional_3_Template, 2, 1, "p", 13);
    \u0275\u0275elementStart(4, "div", 14)(5, "div", 15)(6, "label", 16);
    \u0275\u0275text(7, "Template");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "select", 17);
    \u0275\u0275twoWayListener("ngModelChange", function EnviosComponent_Conditional_10_Template_select_ngModelChange_8_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.novoEnvio.template_id, $event) || (ctx_r2.novoEnvio.template_id = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275repeaterCreate(9, EnviosComponent_Conditional_10_For_10_Template, 2, 2, "option", 18, _forTrack1);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div")(12, "label", 16);
    \u0275\u0275text(13, "Canal");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div", 19)(15, "label", 20)(16, "input", 21);
    \u0275\u0275twoWayListener("ngModelChange", function EnviosComponent_Conditional_10_Template_input_ngModelChange_16_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.novoEnvio.channel, $event) || (ctx_r2.novoEnvio.channel = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "span", 22);
    \u0275\u0275text(18, "E-mail");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "label", 20)(20, "input", 23);
    \u0275\u0275twoWayListener("ngModelChange", function EnviosComponent_Conditional_10_Template_input_ngModelChange_20_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.novoEnvio.channel, $event) || (ctx_r2.novoEnvio.channel = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "span", 22);
    \u0275\u0275text(22, "WhatsApp");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(23, "div", 24)(24, "label", 16);
    \u0275\u0275text(25, "Destinat\xE1rio");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "div", 25)(27, "label", 20)(28, "input", 26);
    \u0275\u0275twoWayListener("ngModelChange", function EnviosComponent_Conditional_10_Template_input_ngModelChange_28_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.novoEnvio.destino, $event) || (ctx_r2.novoEnvio.destino = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("change", function EnviosComponent_Conditional_10_Template_input_change_28_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.limparPessoa());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "span", 22);
    \u0275\u0275text(30, "Manual");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(31, "label", 20)(32, "input", 27);
    \u0275\u0275twoWayListener("ngModelChange", function EnviosComponent_Conditional_10_Template_input_ngModelChange_32_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.novoEnvio.destino, $event) || (ctx_r2.novoEnvio.destino = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "span", 22);
    \u0275\u0275text(34, "Pessoa cadastrada");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275conditionalCreate(35, EnviosComponent_Conditional_10_Conditional_35_Template, 10, 5, "div", 28);
    \u0275\u0275conditionalCreate(36, EnviosComponent_Conditional_10_Conditional_36_Template, 4, 1, "div", 29);
    \u0275\u0275conditionalCreate(37, EnviosComponent_Conditional_10_Conditional_37_Template, 4, 1, "div", 30);
    \u0275\u0275conditionalCreate(38, EnviosComponent_Conditional_10_Conditional_38_Template, 4, 1, "div", 29);
    \u0275\u0275conditionalCreate(39, EnviosComponent_Conditional_10_Conditional_39_Template, 4, 1, "div", 30);
    \u0275\u0275elementStart(40, "div", 19)(41, "button", 31);
    \u0275\u0275listener("click", function EnviosComponent_Conditional_10_Template_button_click_41_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.enviarNovo());
    });
    \u0275\u0275conditionalCreate(42, EnviosComponent_Conditional_10_Conditional_42_Template, 1, 0, "span", 32);
    \u0275\u0275text(43);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(44, "button", 33);
    \u0275\u0275listener("click", function EnviosComponent_Conditional_10_Template_button_click_44_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.fecharNovoEnvio());
    });
    \u0275\u0275text(45, "Cancelar");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r2.erroNovo ? 3 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.novoEnvio.template_id);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.templates);
    \u0275\u0275advance(7);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.novoEnvio.channel);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.novoEnvio.channel);
    \u0275\u0275advance(8);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.novoEnvio.destino);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.novoEnvio.destino);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r2.novoEnvio.destino === "pessoa" ? 35 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.novoEnvio.destino === "manual" && ctx_r2.novoEnvio.channel === "email" ? 36 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.novoEnvio.destino === "manual" && ctx_r2.novoEnvio.channel === "whatsapp" ? 37 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.novoEnvio.destino === "pessoa" && ctx_r2.novoEnvio.channel === "email" && ctx_r2.pessoaSelecionada && !ctx_r2.pessoaSelecionada.email ? 38 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.novoEnvio.destino === "pessoa" && ctx_r2.novoEnvio.channel === "whatsapp" && ctx_r2.pessoaSelecionada && !ctx_r2.pessoaSelecionada.phone ? 39 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r2.enviando);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.enviando ? 42 : -1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.enviando ? "Enviando\u2026" : "Enviar", " ");
  }
}
function EnviosComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 8);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.erro);
  }
}
function EnviosComponent_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "zm-skeleton-list", 9);
  }
  if (rf & 2) {
    \u0275\u0275property("rows", 6);
  }
}
function EnviosComponent_Conditional_13_Template(rf, ctx) {
}
function EnviosComponent_Conditional_14_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "zm-empty-state", 46);
  }
}
function EnviosComponent_Conditional_14_Conditional_3_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 50);
    \u0275\u0275text(1, "A\xE7\xF5es");
    \u0275\u0275elementEnd();
  }
}
function EnviosComponent_Conditional_14_Conditional_3_For_17_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td", 50)(1, "div", 55)(2, "button", 56);
    \u0275\u0275listener("click", function EnviosComponent_Conditional_14_Conditional_3_For_17_Conditional_12_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r15);
      const e_r16 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.reenviar(e_r16));
    });
    \u0275\u0275elementStart(3, "span", 57);
    \u0275\u0275text(4, "refresh");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "button", 58);
    \u0275\u0275listener("click", function EnviosComponent_Conditional_14_Conditional_3_For_17_Conditional_12_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r15);
      const e_r16 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.cancelar(e_r16));
    });
    \u0275\u0275elementStart(6, "span", 57);
    \u0275\u0275text(7, "cancel");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r2.acaoId !== null);
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r2.acaoId !== null);
  }
}
function EnviosComponent_Conditional_14_Conditional_3_For_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 52);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 52);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td", 53);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td", 53);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td")(10, "span", 54);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(12, EnviosComponent_Conditional_14_Conditional_3_For_17_Conditional_12_Template, 8, 2, "td", 50);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const e_r16 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(e_r16.template_name ?? "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.destinatario(e_r16));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.canalLabel(e_r16.channel));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.dataFormatada(e_r16.sent_at));
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("color", ctx_r2.corStatusEnvio(e_r16.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.statusLabel(e_r16.status), " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.caixaAtual === "pendentes" ? 12 : -1);
  }
}
function EnviosComponent_Conditional_14_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 48)(1, "table", 49)(2, "thead")(3, "tr")(4, "th");
    \u0275\u0275text(5, "Template");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "th");
    \u0275\u0275text(7, "Destinat\xE1rio");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th");
    \u0275\u0275text(9, "Canal");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th");
    \u0275\u0275text(11, "Enviado em");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th");
    \u0275\u0275text(13, "Status");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(14, EnviosComponent_Conditional_14_Conditional_3_Conditional_14_Template, 2, 0, "th", 50);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "tbody");
    \u0275\u0275repeaterCreate(16, EnviosComponent_Conditional_14_Conditional_3_For_17_Template, 13, 8, "tr", null, _forTrack1);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(18, "zm-pagination", 51);
    \u0275\u0275listener("pageChange", function EnviosComponent_Conditional_14_Conditional_3_Template_zm_pagination_pageChange_18_listener($event) {
      \u0275\u0275restoreView(_r14);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.carregar($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(14);
    \u0275\u0275conditional(ctx_r2.caixaAtual === "pendentes" ? 14 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.envios);
    \u0275\u0275advance(2);
    \u0275\u0275property("currentPage", ctx_r2.meta.current_page)("lastPage", ctx_r2.meta.last_page);
  }
}
function EnviosComponent_Conditional_14_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 47);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", ctx_r2.meta.total, " envio(s) nesta caixa");
  }
}
function EnviosComponent_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10)(1, "div", 45);
    \u0275\u0275conditionalCreate(2, EnviosComponent_Conditional_14_Conditional_2_Template, 1, 0, "zm-empty-state", 46)(3, EnviosComponent_Conditional_14_Conditional_3_Template, 19, 3);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(4, EnviosComponent_Conditional_14_Conditional_4_Template, 2, 1, "p", 47);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.envios.length === 0 ? 2 : 3);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.meta.total > 0 ? 4 : -1);
  }
}
var EnviosComponent = class _EnviosComponent {
  envios = [];
  templates = [];
  caixaAtual = "pendentes";
  meta = { current_page: 1, last_page: 1, per_page: 20, total: 0 };
  showSkeleton;
  listaPronta = false;
  erro = "";
  acaoId = null;
  mostrarNovoEnvio = false;
  novoEnvio = {
    template_id: 0,
    channel: "email",
    destino: "manual",
    person_id: null,
    recipient_email: "",
    recipient_phone: ""
  };
  pessoaBusca = "";
  pessoaSugestoes = [];
  pessoaSelecionada = null;
  buscandoPessoas = false;
  enviando = false;
  erroNovo = "";
  documentSendsService = inject(DocumentSendsService);
  pessoasService = inject(PessoasService);
  templatesService = inject(TemplatesService);
  loadingService = inject(LoadingService);
  toast = inject(ToastService);
  confirm = inject(ConfirmDialogService);
  caixas = [
    { key: "pendentes", label: "Pendentes" },
    { key: "assinados", label: "Assinados" },
    { key: "expirados", label: "Expirados" },
    { key: "cancelados", label: "Cancelados" }
  ];
  ngOnInit() {
    this.templatesService.list({ is_active: true }).subscribe({ next: (t) => this.templates = t });
    this.carregar();
  }
  setCaixa(c) {
    this.caixaAtual = c;
    this.carregar(1);
  }
  carregar(page = 1) {
    this.erro = "";
    const { data$, showSkeleton } = this.loadingService.loadWithThreshold(this.documentSendsService.list({ caixa: this.caixaAtual, per_page: 20, page }));
    this.showSkeleton = showSkeleton;
    data$.subscribe({
      next: (res) => {
        this.listaPronta = true;
        this.envios = res.data;
        this.meta = res.meta;
      },
      error: () => {
        this.listaPronta = true;
        this.erro = "N\xE3o foi poss\xEDvel carregar os envios.";
      }
    });
  }
  dataFormatada(s) {
    if (!s)
      return "\u2014";
    try {
      const d = new Date(s);
      return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
    } catch {
      return s;
    }
  }
  statusLabel(status) {
    const map = { pendente: "Pendente", assinado: "Assinado", expirado: "Expirado", cancelado: "Cancelado" };
    return map[status] ?? status;
  }
  corStatusEnvio(status) {
    switch (status) {
      case "assinado":
        return "var(--c-success)";
      case "expirado":
        return "var(--c-warning)";
      case "cancelado":
        return "var(--c-muted)";
      default:
        return "var(--c-muted)";
    }
  }
  canalLabel(channel) {
    return channel === "whatsapp" ? "WhatsApp" : "E-mail";
  }
  destinatario(item) {
    if (item.channel === "whatsapp" && item.recipient_phone)
      return item.recipient_phone;
    return item.recipient_email ?? "\u2014";
  }
  cancelar(item) {
    return __async(this, null, function* () {
      if (item.status !== "pendente")
        return;
      const ok = yield this.confirm.request({
        title: "Cancelar envio?",
        message: "O destinat\xE1rio n\xE3o poder\xE1 mais usar o link deste envio.",
        confirmLabel: "Sim, cancelar",
        variant: "danger"
      });
      if (!ok)
        return;
      this.acaoId = item.id;
      this.documentSendsService.cancel(item.id).subscribe({
        next: () => {
          this.acaoId = null;
          this.carregar();
          this.toast.success("Envio cancelado", "O link foi invalidado.");
        },
        error: (err) => {
          this.acaoId = null;
          this.erro = err.error?.message ?? "N\xE3o foi poss\xEDvel cancelar.";
          this.toast.error("Erro", this.erro);
        }
      });
    });
  }
  reenviar(item) {
    if (item.status !== "pendente")
      return;
    this.acaoId = item.id;
    this.documentSendsService.reenvio(item.id).subscribe({
      next: () => {
        this.acaoId = null;
        this.carregar();
        this.toast.success("Link reenviado", "Uma nova tentativa foi registrada.");
      },
      error: (err) => {
        this.acaoId = null;
        this.erro = err.error?.message ?? "N\xE3o foi poss\xEDvel reenviar.";
        this.toast.error("Erro", this.erro);
      }
    });
  }
  abrirNovoEnvio() {
    this.mostrarNovoEnvio = true;
    this.erroNovo = "";
    this.pessoaBusca = "";
    this.pessoaSugestoes = [];
    this.pessoaSelecionada = null;
    this.novoEnvio = {
      template_id: this.templates[0]?.id ?? 0,
      channel: "email",
      destino: "manual",
      person_id: null,
      recipient_email: "",
      recipient_phone: ""
    };
  }
  buscarPessoas() {
    const q = this.pessoaBusca.trim();
    if (q.length < 2) {
      this.pessoaSugestoes = [];
      return;
    }
    this.buscandoPessoas = true;
    this.pessoasService.list({ search: q, per_page: 15, page: 1 }).subscribe({
      next: (res) => {
        this.buscandoPessoas = false;
        this.pessoaSugestoes = res.data.filter((p) => p.status === "active");
      },
      error: () => {
        this.buscandoPessoas = false;
        this.pessoaSugestoes = [];
      }
    });
  }
  selecionarPessoa(p) {
    this.pessoaSelecionada = p;
    this.novoEnvio.person_id = p.id;
    this.pessoaSugestoes = [];
    this.pessoaBusca = `${p.name} \xB7 ${p.code}`;
  }
  limparPessoa() {
    this.pessoaSelecionada = null;
    this.novoEnvio.person_id = null;
    this.pessoaBusca = "";
    this.pessoaSugestoes = [];
  }
  fecharNovoEnvio() {
    this.mostrarNovoEnvio = false;
  }
  enviarNovo() {
    this.erroNovo = "";
    if (this.novoEnvio.template_id <= 0) {
      this.erroNovo = "Selecione um template.";
      return;
    }
    if (this.novoEnvio.destino === "pessoa") {
      if (!this.novoEnvio.person_id) {
        this.erroNovo = "Busque e selecione uma pessoa.";
        return;
      }
      if (this.novoEnvio.channel === "email" && !this.pessoaSelecionada?.email && !this.novoEnvio.recipient_email?.trim()) {
        this.erroNovo = "A pessoa n\xE3o tem e-mail cadastrado. Informe manualmente ou cadastre o e-mail na ficha.";
        return;
      }
      if (this.novoEnvio.channel === "whatsapp" && !this.pessoaSelecionada?.phone && !this.novoEnvio.recipient_phone?.trim()) {
        this.erroNovo = "A pessoa n\xE3o tem telefone cadastrado. Informe manualmente ou cadastre na ficha.";
        return;
      }
    } else {
      if (this.novoEnvio.channel === "email") {
        if (!this.novoEnvio.recipient_email?.trim()) {
          this.erroNovo = "Informe o e-mail do destinat\xE1rio.";
          return;
        }
      } else {
        if (!this.novoEnvio.recipient_phone?.trim()) {
          this.erroNovo = "Informe o telefone (WhatsApp).";
          return;
        }
      }
    }
    this.enviando = true;
    const payload = {
      template_id: this.novoEnvio.template_id,
      channel: this.novoEnvio.channel
    };
    if (this.novoEnvio.destino === "pessoa" && this.novoEnvio.person_id) {
      payload.person_id = this.novoEnvio.person_id;
      if (this.novoEnvio.channel === "email" && this.novoEnvio.recipient_email?.trim()) {
        payload.recipient_email = this.novoEnvio.recipient_email.trim();
      }
      if (this.novoEnvio.channel === "whatsapp" && this.novoEnvio.recipient_phone?.trim()) {
        payload.recipient_phone = this.novoEnvio.recipient_phone.trim();
      }
    } else {
      if (this.novoEnvio.channel === "email") {
        payload.recipient_email = this.novoEnvio.recipient_email.trim();
      } else {
        payload.recipient_phone = this.novoEnvio.recipient_phone.trim();
      }
    }
    this.documentSendsService.store(payload).subscribe({
      next: () => {
        this.enviando = false;
        this.fecharNovoEnvio();
        this.setCaixa("pendentes");
        this.toast.success("Envio criado", "O link do documento foi enviado.");
      },
      error: (err) => {
        this.enviando = false;
        this.erroNovo = err.error?.message ?? "N\xE3o foi poss\xEDvel enviar.";
        this.toast.error("Erro no envio", this.erroNovo);
      }
    });
  }
  static \u0275fac = function EnviosComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _EnviosComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _EnviosComponent, selectors: [["app-envios"]], decls: 15, vars: 3, consts: [[1, "relative", "min-h-[320px]"], [1, "page-header", "mb-5"], [1, "page-title", "flex", "items-center", "gap-3"], [1, "flex", "gap-0.5", "rounded-lg", "border", "p-0.5", "mb-4", 2, "background", "var(--c-surface)", "border-color", "var(--c-border)", "max-width", "fit-content"], ["type", "button", 1, "envios-tab", "rounded-md", "text-sm", "font-medium", "px-4", "py-2", "transition-all", 3, "ativo"], ["type", "button", "title", "Novo envio", 1, "btn-primary", "inline-flex", "items-center", "gap-2", 3, "click"], [1, "material-symbols-outlined", 2, "font-size", "18px"], [1, "card", "rounded-xl", "p-5", "mb-5", 2, "border", "1px solid var(--c-border)"], [1, "text-sm", "mb-4", 2, "color", "var(--c-error, #dc2626)"], [3, "rows"], [1, "zm-content-enter"], ["type", "button", 1, "envios-tab", "rounded-md", "text-sm", "font-medium", "px-4", "py-2", "transition-all", 3, "click"], [1, "text-base", "font-semibold", "m-0", "mb-4", 2, "color", "var(--c-text)"], [1, "text-sm", "mb-3", 2, "color", "var(--c-error, #dc2626)"], [1, "flex", "flex-wrap", "gap-4", "items-end"], [1, "min-w-[200px]"], [1, "block", "text-xs", "font-medium", "mb-1", 2, "color", "var(--c-muted)"], [1, "w-full", "py-2", "px-3", "text-sm", "border", "rounded-lg", 2, "border-color", "var(--c-border)", "background", "var(--c-surface)", "color", "var(--c-text)", 3, "ngModelChange", "ngModel"], [3, "value"], [1, "flex", "gap-2"], [1, "inline-flex", "items-center", "gap-1.5", "cursor-pointer"], ["type", "radio", "name", "novoChannel", "value", "email", 3, "ngModelChange", "ngModel"], [1, "text-sm", 2, "color", "var(--c-text)"], ["type", "radio", "name", "novoChannel", "value", "whatsapp", 3, "ngModelChange", "ngModel"], [1, "w-full", "min-w-[200px]"], [1, "flex", "gap-3", "flex-wrap"], ["type", "radio", "name", "novoDestino", "value", "manual", 3, "ngModelChange", "change", "ngModel"], ["type", "radio", "name", "novoDestino", "value", "pessoa", 3, "ngModelChange", "ngModel"], [1, "w-full", "min-w-[260px]", "max-w-md", "relative"], [1, "min-w-[220px]"], [1, "min-w-[180px]"], ["type", "button", 1, "btn-primary", "inline-flex", "items-center", "gap-2", 3, "click", "disabled"], ["aria-hidden", "true", 1, "btn-spinner"], ["type", "button", 1, "btn-ghost", "btn-default-bg", 3, "click"], ["type", "text", "placeholder", "Nome, c\xF3digo ou telefone\u2026", 1, "flex-1", "py-2", "px-3", "text-sm", "border", "rounded-lg", 2, "border-color", "var(--c-border)", "background", "var(--c-surface)", "color", "var(--c-text)", 3, "ngModelChange", "keyup.enter", "ngModel"], ["type", "button", 1, "btn-ghost", "btn-default-bg", "text-sm", "shrink-0", 3, "click", "disabled"], ["type", "button", 1, "btn-ghost", "btn-default-bg", "text-sm", "shrink-0"], [1, "absolute", "z-10", "left-0", "right-0", "mt-1", "max-h-48", "overflow-auto", "rounded-lg", "border", "text-sm", "shadow-lg", "m-0", "p-0", "list-none", 2, "background", "var(--c-surface)", "border-color", "var(--c-border)"], ["type", "button", 1, "btn-ghost", "btn-default-bg", "text-sm", "shrink-0", 3, "click"], ["type", "button", 1, "w-full", "text-left", "px-3", "py-2", "border-0", "cursor-pointer", "hover:bg-[var(--c-soft)]", 2, "background", "transparent", "color", "var(--c-text)", 3, "click"], [1, "font-mono", "text-xs"], [1, "text-xs", "mt-2", "mb-0", 2, "color", "var(--c-muted)"], [1, "text-xs", "mt-1", "mb-0", 2, "color", "var(--c-muted)"], ["type", "email", "placeholder", "email@exemplo.com", 1, "w-full", "py-2", "px-3", "text-sm", "border", "rounded-lg", 2, "border-color", "var(--c-border)", "background", "var(--c-surface)", "color", "var(--c-text)", 3, "ngModelChange", "ngModel"], ["type", "text", "placeholder", "5511999999999", 1, "w-full", "py-2", "px-3", "text-sm", "border", "rounded-lg", 2, "border-color", "var(--c-border)", "background", "var(--c-surface)", "color", "var(--c-text)", 3, "ngModelChange", "ngModel"], [1, "data-table-wrap", "rounded-xl"], ["icon", "send", "title", "Nenhum envio nesta caixa."], [1, "text-xs", "mt-3", 2, "color", "var(--c-muted)"], [1, "overflow-x-auto"], [1, "data-table"], [1, "text-right"], [3, "pageChange", "currentPage", "lastPage"], [2, "color", "var(--c-text)"], [2, "color", "var(--c-muted)"], [1, "inline-flex", "items-center", "gap-1", "text-xs", "font-semibold"], [1, "flex", "items-center", "justify-end", "gap-1"], ["type", "button", "title", "Reenviar", 1, "p-1.5", "rounded-md", "border-0", "cursor-pointer", 2, "color", "var(--c-muted)", "background", "transparent", 3, "click", "disabled"], [1, "material-symbols-outlined", "text-lg"], ["type", "button", "title", "Cancelar envio", 1, "p-1.5", "rounded-md", "border-0", "cursor-pointer", 2, "color", "var(--c-danger)", "background", "transparent", 3, "click", "disabled"]], template: function EnviosComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3);
      \u0275\u0275repeaterCreate(4, EnviosComponent_For_5_Template, 2, 3, "button", 4, _forTrack0);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "button", 5);
      \u0275\u0275listener("click", function EnviosComponent_Template_button_click_6_listener() {
        return ctx.abrirNovoEnvio();
      });
      \u0275\u0275elementStart(7, "span", 6);
      \u0275\u0275text(8, "add");
      \u0275\u0275elementEnd();
      \u0275\u0275text(9, " Novo envio ");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(10, EnviosComponent_Conditional_10_Template, 46, 14, "div", 7);
      \u0275\u0275conditionalCreate(11, EnviosComponent_Conditional_11_Template, 2, 1, "p", 8);
      \u0275\u0275conditionalCreate(12, EnviosComponent_Conditional_12_Template, 1, 1, "zm-skeleton-list", 9)(13, EnviosComponent_Conditional_13_Template, 0, 0)(14, EnviosComponent_Conditional_14_Template, 5, 2, "div", 10);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(4);
      \u0275\u0275repeater(ctx.caixas);
      \u0275\u0275advance(6);
      \u0275\u0275conditional(ctx.mostrarNovoEnvio ? 10 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.erro ? 11 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showSkeleton() ? 12 : !ctx.listaPronta ? 13 : 14);
    }
  }, dependencies: [CommonModule, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, RadioControlValueAccessor, NgControlStatus, NgModel, ZmSkeletonListComponent, ZmPaginationComponent, ZmEmptyStateComponent], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n}\n.envios-tab[_ngcontent-%COMP%] {\n  background: transparent;\n  border: none;\n  cursor: pointer;\n  color: var(--c-muted);\n}\n.envios-tab[_ngcontent-%COMP%]:hover {\n  color: var(--c-text);\n}\n.envios-tab.ativo[_ngcontent-%COMP%] {\n  background: var(--c-soft);\n  color: var(--c-primary);\n  font-weight: 600;\n}\n/*# sourceMappingURL=envios.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EnviosComponent, [{
    type: Component,
    args: [{ selector: "app-envios", standalone: true, imports: [CommonModule, FormsModule, ZmSkeletonListComponent, ZmPaginationComponent, ZmEmptyStateComponent], template: `<div class="relative min-h-[320px]">\r
  <div class="page-header mb-5">\r
    <div class="page-title flex items-center gap-3">\r
      <!-- <div class="page-title-icon w-10 h-10 rounded-lg flex items-center justify-center" style="background: var(--c-soft)">\r
        <span class="material-symbols-outlined" style="color: var(--c-primary)">send</span>\r
      </div>\r
      <div>\r
        <h1 class="text-xl font-semibold m-0" style="color: var(--c-text)">Envios de documento</h1>\r
        <p class="page-header-subtitle text-sm mt-1 mb-0" style="color: var(--c-muted)">Links enviados por e-mail ou WhatsApp. Reenvie ou cancele envios pendentes.</p>\r
      </div> -->\r
      <div class="flex gap-0.5 rounded-lg border p-0.5 mb-4" style="background: var(--c-surface); border-color: var(--c-border); max-width: fit-content">\r
        @for (c of caixas; track c.key) {\r
          <button type="button" class="envios-tab rounded-md text-sm font-medium px-4 py-2 transition-all" [class.ativo]="caixaAtual === c.key" (click)="setCaixa(c.key)">\r
            {{ c.label }}\r
          </button>\r
        }\r
      </div>\r
    </div>\r
    <button type="button" class="btn-primary inline-flex items-center gap-2" (click)="abrirNovoEnvio()" title="Novo envio">\r
      <span class="material-symbols-outlined" style="font-size: 18px">add</span>\r
      Novo envio\r
    </button>\r
  </div>\r
\r
  @if (mostrarNovoEnvio) {\r
    <div class="card rounded-xl p-5 mb-5" style="border: 1px solid var(--c-border)">\r
      <h3 class="text-base font-semibold m-0 mb-4" style="color: var(--c-text)">Enviar link do documento</h3>\r
      @if (erroNovo) {\r
        <p class="text-sm mb-3" style="color: var(--c-error, #dc2626)">{{ erroNovo }}</p>\r
      }\r
      <div class="flex flex-wrap gap-4 items-end">\r
        <div class="min-w-[200px]">\r
          <label class="block text-xs font-medium mb-1" style="color: var(--c-muted)">Template</label>\r
          <select [(ngModel)]="novoEnvio.template_id" class="w-full py-2 px-3 text-sm border rounded-lg" style="border-color: var(--c-border); background: var(--c-surface); color: var(--c-text)">\r
            @for (t of templates; track t.id) {\r
              <option [value]="t.id">{{ t.name }}</option>\r
            }\r
          </select>\r
        </div>\r
        <div>\r
          <label class="block text-xs font-medium mb-1" style="color: var(--c-muted)">Canal</label>\r
          <div class="flex gap-2">\r
            <label class="inline-flex items-center gap-1.5 cursor-pointer">\r
              <input type="radio" [(ngModel)]="novoEnvio.channel" name="novoChannel" value="email" />\r
              <span class="text-sm" style="color: var(--c-text)">E-mail</span>\r
            </label>\r
            <label class="inline-flex items-center gap-1.5 cursor-pointer">\r
              <input type="radio" [(ngModel)]="novoEnvio.channel" name="novoChannel" value="whatsapp" />\r
              <span class="text-sm" style="color: var(--c-text)">WhatsApp</span>\r
            </label>\r
          </div>\r
        </div>\r
        <div class="w-full min-w-[200px]">\r
          <label class="block text-xs font-medium mb-1" style="color: var(--c-muted)">Destinat\xE1rio</label>\r
          <div class="flex gap-3 flex-wrap">\r
            <label class="inline-flex items-center gap-1.5 cursor-pointer">\r
              <input type="radio" [(ngModel)]="novoEnvio.destino" name="novoDestino" value="manual" (change)="limparPessoa()" />\r
              <span class="text-sm" style="color: var(--c-text)">Manual</span>\r
            </label>\r
            <label class="inline-flex items-center gap-1.5 cursor-pointer">\r
              <input type="radio" [(ngModel)]="novoEnvio.destino" name="novoDestino" value="pessoa" />\r
              <span class="text-sm" style="color: var(--c-text)">Pessoa cadastrada</span>\r
            </label>\r
          </div>\r
        </div>\r
        @if (novoEnvio.destino === 'pessoa') {\r
          <div class="w-full min-w-[260px] max-w-md relative">\r
            <label class="block text-xs font-medium mb-1" style="color: var(--c-muted)">Buscar pessoa</label>\r
            <div class="flex gap-2">\r
              <input\r
                type="text"\r
                [(ngModel)]="pessoaBusca"\r
                (keyup.enter)="buscarPessoas()"\r
                placeholder="Nome, c\xF3digo ou telefone\u2026"\r
                class="flex-1 py-2 px-3 text-sm border rounded-lg"\r
                style="border-color: var(--c-border); background: var(--c-surface); color: var(--c-text)"\r
              />\r
              <button type="button" class="btn-ghost btn-default-bg text-sm shrink-0" (click)="buscarPessoas()" [disabled]="buscandoPessoas">Buscar</button>\r
              @if (pessoaSelecionada) {\r
                <button type="button" class="btn-ghost btn-default-bg text-sm shrink-0" (click)="limparPessoa()">Limpar</button>\r
              }\r
            </div>\r
            @if (pessoaSugestoes.length > 0) {\r
              <ul class="absolute z-10 left-0 right-0 mt-1 max-h-48 overflow-auto rounded-lg border text-sm shadow-lg m-0 p-0 list-none" style="background: var(--c-surface); border-color: var(--c-border)">\r
                @for (p of pessoaSugestoes; track p.id) {\r
                  <li>\r
                    <button type="button" class="w-full text-left px-3 py-2 border-0 cursor-pointer hover:bg-[var(--c-soft)]" style="background: transparent; color: var(--c-text)" (click)="selecionarPessoa(p)">\r
                      {{ p.name }} \xB7 <span class="font-mono text-xs">{{ p.code }}</span>\r
                    </button>\r
                  </li>\r
                }\r
              </ul>\r
            }\r
            @if (pessoaSelecionada) {\r
              <p class="text-xs mt-2 mb-0" style="color: var(--c-muted)">\r
                @if (novoEnvio.channel === 'email') {\r
                  E-mail: {{ pessoaSelecionada.email || '\u2014' }}\r
                } @else {\r
                  Telefone: {{ pessoaSelecionada.phone || '\u2014' }}\r
                }\r
              </p>\r
              @if ((novoEnvio.channel === 'email' && !pessoaSelecionada.email) || (novoEnvio.channel === 'whatsapp' && !pessoaSelecionada.phone)) {\r
                <p class="text-xs mt-1 mb-0" style="color: var(--c-muted)">Voc\xEA pode informar manualmente abaixo se faltar dado na ficha.</p>\r
              }\r
            }\r
          </div>\r
        }\r
        @if (novoEnvio.destino === 'manual' && novoEnvio.channel === 'email') {\r
          <div class="min-w-[220px]">\r
            <label class="block text-xs font-medium mb-1" style="color: var(--c-muted)">E-mail do destinat\xE1rio</label>\r
            <input type="email" [(ngModel)]="novoEnvio.recipient_email" placeholder="email@exemplo.com" class="w-full py-2 px-3 text-sm border rounded-lg" style="border-color: var(--c-border); background: var(--c-surface); color: var(--c-text)" />\r
          </div>\r
        }\r
        @if (novoEnvio.destino === 'manual' && novoEnvio.channel === 'whatsapp') {\r
          <div class="min-w-[180px]">\r
            <label class="block text-xs font-medium mb-1" style="color: var(--c-muted)">Telefone (WhatsApp)</label>\r
            <input type="text" [(ngModel)]="novoEnvio.recipient_phone" placeholder="5511999999999" class="w-full py-2 px-3 text-sm border rounded-lg" style="border-color: var(--c-border); background: var(--c-surface); color: var(--c-text)" />\r
          </div>\r
        }\r
        @if (novoEnvio.destino === 'pessoa' && novoEnvio.channel === 'email' && pessoaSelecionada && !pessoaSelecionada.email) {\r
          <div class="min-w-[220px]">\r
            <label class="block text-xs font-medium mb-1" style="color: var(--c-muted)">E-mail (obrigat\xF3rio)</label>\r
            <input type="email" [(ngModel)]="novoEnvio.recipient_email" placeholder="email@exemplo.com" class="w-full py-2 px-3 text-sm border rounded-lg" style="border-color: var(--c-border); background: var(--c-surface); color: var(--c-text)" />\r
          </div>\r
        }\r
        @if (novoEnvio.destino === 'pessoa' && novoEnvio.channel === 'whatsapp' && pessoaSelecionada && !pessoaSelecionada.phone) {\r
          <div class="min-w-[180px]">\r
            <label class="block text-xs font-medium mb-1" style="color: var(--c-muted)">Telefone (obrigat\xF3rio)</label>\r
            <input type="text" [(ngModel)]="novoEnvio.recipient_phone" placeholder="5511999999999" class="w-full py-2 px-3 text-sm border rounded-lg" style="border-color: var(--c-border); background: var(--c-surface); color: var(--c-text)" />\r
          </div>\r
        }\r
        <div class="flex gap-2">\r
          <button type="button" class="btn-primary inline-flex items-center gap-2" (click)="enviarNovo()" [disabled]="enviando">\r
            @if (enviando) {\r
              <span class="btn-spinner" aria-hidden="true"></span>\r
            }\r
            {{ enviando ? 'Enviando\u2026' : 'Enviar' }}\r
          </button>\r
          <button type="button" class="btn-ghost btn-default-bg" (click)="fecharNovoEnvio()">Cancelar</button>\r
        </div>\r
      </div>\r
    </div>\r
  }\r
\r
  <!-- <div class="flex gap-0.5 rounded-lg border p-0.5 mb-4" style="background: var(--c-surface); border-color: var(--c-border); max-width: fit-content">\r
    @for (c of caixas; track c.key) {\r
      <button type="button" class="envios-tab rounded-md text-sm font-medium px-4 py-2 transition-all" [class.ativo]="caixaAtual === c.key" (click)="setCaixa(c.key)">\r
        {{ c.label }}\r
      </button>\r
    }\r
  </div> -->\r
\r
  @if (erro) {\r
    <p class="text-sm mb-4" style="color: var(--c-error, #dc2626)">{{ erro }}</p>\r
  }\r
\r
  @if (showSkeleton()) {\r
    <zm-skeleton-list [rows]="6" />\r
  } @else if (!listaPronta) {\r
  } @else {\r
    <div class="zm-content-enter">\r
      <div class="data-table-wrap rounded-xl">\r
        @if (envios.length === 0) {\r
          <zm-empty-state icon="send" title="Nenhum envio nesta caixa." />\r
        } @else {\r
          <div class="overflow-x-auto">\r
            <table class="data-table">\r
              <thead>\r
                <tr>\r
                  <th>Template</th>\r
                  <th>Destinat\xE1rio</th>\r
                  <th>Canal</th>\r
                  <th>Enviado em</th>\r
                  <th>Status</th>\r
                  @if (caixaAtual === 'pendentes') {\r
                    <th class="text-right">A\xE7\xF5es</th>\r
                  }\r
                </tr>\r
              </thead>\r
              <tbody>\r
                @for (e of envios; track e.id) {\r
                  <tr>\r
                    <td style="color: var(--c-text)">{{ e.template_name ?? '\u2014' }}</td>\r
                    <td style="color: var(--c-text)">{{ destinatario(e) }}</td>\r
                    <td style="color: var(--c-muted)">{{ canalLabel(e.channel) }}</td>\r
                    <td style="color: var(--c-muted)">{{ dataFormatada(e.sent_at) }}</td>\r
                    <td>\r
                      <span class="inline-flex items-center gap-1 text-xs font-semibold" [style.color]="corStatusEnvio(e.status)">\r
                        {{ statusLabel(e.status) }}\r
                      </span>\r
                    </td>\r
                    @if (caixaAtual === 'pendentes') {\r
                      <td class="text-right">\r
                        <div class="flex items-center justify-end gap-1">\r
                          <button type="button" class="p-1.5 rounded-md border-0 cursor-pointer" style="color: var(--c-muted); background: transparent" title="Reenviar" (click)="reenviar(e)" [disabled]="acaoId !== null">\r
                            <span class="material-symbols-outlined text-lg">refresh</span>\r
                          </button>\r
                          <button type="button" class="p-1.5 rounded-md border-0 cursor-pointer" style="color: var(--c-danger); background: transparent" title="Cancelar envio" (click)="cancelar(e)" [disabled]="acaoId !== null">\r
                            <span class="material-symbols-outlined text-lg">cancel</span>\r
                          </button>\r
                        </div>\r
                      </td>\r
                    }\r
                  </tr>\r
                }\r
              </tbody>\r
            </table>\r
          </div>\r
          <zm-pagination [currentPage]="meta.current_page" [lastPage]="meta.last_page" (pageChange)="carregar($event)" />\r
        }\r
      </div>\r
\r
      @if (meta.total > 0) {\r
        <p class="text-xs mt-3" style="color: var(--c-muted)">{{ meta.total }} envio(s) nesta caixa</p>\r
      }\r
    </div>\r
  }\r
</div>\r
`, styles: ["/* src/app/paginas/envios/envios.component.css */\n:host {\n  display: block;\n}\n.envios-tab {\n  background: transparent;\n  border: none;\n  cursor: pointer;\n  color: var(--c-muted);\n}\n.envios-tab:hover {\n  color: var(--c-text);\n}\n.envios-tab.ativo {\n  background: var(--c-soft);\n  color: var(--c-primary);\n  font-weight: 600;\n}\n/*# sourceMappingURL=envios.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(EnviosComponent, { className: "EnviosComponent", filePath: "src/app/paginas/envios/envios.component.ts", lineNumber: 22 });
})();
export {
  EnviosComponent
};
//# sourceMappingURL=chunk-G66VMMK4.js.map
