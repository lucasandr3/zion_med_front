import {
  ClinicaService
} from "./chunk-KCTAH7A3.js";
import "./chunk-T5FMHWLF.js";
import {
  isBillingBlockedError
} from "./chunk-WSL5UK4K.js";
import {
  LoadingService,
  ZmSkeletonListComponent
} from "./chunk-GKI5AWTV.js";
import {
  ZmAssinaturaBloqueadaCardComponent
} from "./chunk-CAKNZVE6.js";
import {
  ApiService
} from "./chunk-7WBHVE2H.js";
import {
  ConfirmDialogService
} from "./chunk-RISAXZFK.js";
import {
  FlatpickrDirective,
  provideFlatpickrDefaults,
  require_pt
} from "./chunk-C34MPJIL.js";
import {
  ToastService
} from "./chunk-EZUVP6MG.js";
import {
  CheckboxControlValueAccessor,
  DefaultValueAccessor,
  FormsModule,
  MaxLengthValidator,
  NgControlStatus,
  NgControlStatusGroup,
  NgForm,
  NgModel,
  PatternValidator,
  RadioControlValueAccessor,
  RequiredValidator,
  ɵNgNoValidate
} from "./chunk-USROZ7PW.js";
import "./chunk-SFRXLDXR.js";
import "./chunk-IBJWGIJV.js";
import {
  ActivatedRoute,
  RouterLink
} from "./chunk-C2NWBPZH.js";
import {
  CommonModule,
  Component,
  DatePipe,
  HttpErrorResponse,
  Injectable,
  __async,
  __spreadProps,
  __spreadValues,
  __toESM,
  finalize,
  inject,
  map,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵProvidersFeature,
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
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-GRLISYEV.js";

// src/app/paginas/clinica/clinica-configuracoes.component.ts
var import_pt = __toESM(require_pt());

// src/app/core/services/whatsapp-evolution.service.ts
var WhatsappEvolutionService = class _WhatsappEvolutionService {
  api = inject(ApiService);
  base = "/clinica/whatsapp/evolution";
  getState() {
    return this.api.get(`${this.base}`).pipe(map((r) => r.data));
  }
  createInstance(payload) {
    return this.api.post(`${this.base}/instance`, payload ?? {}).pipe(map((r) => r.data));
  }
  connect(payload) {
    return this.api.post(`${this.base}/connect`, payload).pipe(map((r) => r.data));
  }
  getQr() {
    return this.api.get(`${this.base}/qr`).pipe(map((r) => r.data));
  }
  requestPair(phone, subscribe) {
    return this.api.post(`${this.base}/pair`, { phone, subscribe }).pipe(map((r) => r.data));
  }
  disconnect() {
    return this.api.post(`${this.base}/disconnect`, {}).pipe(map((r) => r.data));
  }
  destroyInstance() {
    return this.api.delete(`${this.base}/instance`).pipe(map((r) => r.data));
  }
  sendTest(phone, text) {
    return this.api.post(`${this.base}/test`, { phone, text }).pipe(map((r) => r.data));
  }
  static \u0275fac = function WhatsappEvolutionService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _WhatsappEvolutionService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _WhatsappEvolutionService, factory: _WhatsappEvolutionService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(WhatsappEvolutionService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

// src/app/paginas/clinica/clinica-configuracoes.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function ClinicaConfiguracoesComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "zm-skeleton-list", 2);
  }
  if (rf & 2) {
    \u0275\u0275property("rows", 8);
  }
}
function ClinicaConfiguracoesComponent_Conditional_2_Template(rf, ctx) {
}
function ClinicaConfiguracoesComponent_Conditional_3_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 7);
    \u0275\u0275listener("click", function ClinicaConfiguracoesComponent_Conditional_3_Conditional_15_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.setTab("empresas"));
    });
    \u0275\u0275elementStart(1, "span", 8);
    \u0275\u0275text(2, "business_center");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Empresas ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("active", ctx_r1.activeTab === "empresas");
  }
}
function ClinicaConfiguracoesComponent_Conditional_3_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 11);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.erro);
  }
}
function ClinicaConfiguracoesComponent_Conditional_3_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 12);
    \u0275\u0275text(1, "Configura\xE7\xF5es salvas com sucesso.");
    \u0275\u0275elementEnd();
  }
}
function ClinicaConfiguracoesComponent_Conditional_3_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14)(1, "div", 80)(2, "span", 81);
    \u0275\u0275text(3, "Perfil da empresa");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 82);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 83);
    \u0275\u0275element(7, "div", 84);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("", ctx_r1.progressFilled(), " de 8 campos preenchidos");
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("width", ctx_r1.progressFilled() / 8 * 100, "%");
  }
}
function ClinicaConfiguracoesComponent_Conditional_3_For_143_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 91)(1, "span", 93);
    \u0275\u0275text(2, "Abre");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "input", 94);
    \u0275\u0275twoWayListener("ngModelChange", function ClinicaConfiguracoesComponent_Conditional_3_For_143_Conditional_7_Template_input_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r6);
      const d_r5 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.form.business_hours[d_r5.id].open, $event) || (ctx_r1.form.business_hours[d_r5.id].open = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("flatpickrChange", function ClinicaConfiguracoesComponent_Conditional_3_For_143_Conditional_7_Template_input_flatpickrChange_3_listener($event) {
      \u0275\u0275restoreView(_r6);
      const d_r5 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.setTime(d_r5.id, "open", $event.selectedDates));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 95);
    \u0275\u0275text(5, "\u2192");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 93);
    \u0275\u0275text(7, "Fecha");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "input", 96);
    \u0275\u0275twoWayListener("ngModelChange", function ClinicaConfiguracoesComponent_Conditional_3_For_143_Conditional_7_Template_input_ngModelChange_8_listener($event) {
      \u0275\u0275restoreView(_r6);
      const d_r5 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.form.business_hours[d_r5.id].close, $event) || (ctx_r1.form.business_hours[d_r5.id].close = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("flatpickrChange", function ClinicaConfiguracoesComponent_Conditional_3_For_143_Conditional_7_Template_input_flatpickrChange_8_listener($event) {
      \u0275\u0275restoreView(_r6);
      const d_r5 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.setTime(d_r5.id, "close", $event.selectedDates));
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const d_r5 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.business_hours[d_r5.id].open);
    \u0275\u0275property("name", "bh_open_" + d_r5.id)("enableTime", true)("noCalendar", true)("dateFormat", "H:i")("time24hr", true)("static", true);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.business_hours[d_r5.id].close);
    \u0275\u0275property("name", "bh_close_" + d_r5.id)("enableTime", true)("noCalendar", true)("dateFormat", "H:i")("time24hr", true)("static", true);
  }
}
function ClinicaConfiguracoesComponent_Conditional_3_For_143_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 92);
    \u0275\u0275text(1, "Fechado");
    \u0275\u0275elementEnd();
  }
}
function ClinicaConfiguracoesComponent_Conditional_3_For_143_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 85)(1, "span", 86);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "label", 87)(4, "input", 88);
    \u0275\u0275listener("change", function ClinicaConfiguracoesComponent_Conditional_3_For_143_Template_input_change_4_listener($event) {
      const d_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.toggleScheduleDay(d_r5.id, $event.target.checked));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275element(5, "span", 89)(6, "span", 90);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(7, ClinicaConfiguracoesComponent_Conditional_3_For_143_Conditional_7_Template, 9, 14, "div", 91)(8, ClinicaConfiguracoesComponent_Conditional_3_For_143_Conditional_8_Template, 2, 0, "span", 92);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const d_r5 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("active", ctx_r1.isScheduleActive(d_r5.id));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(d_r5.label);
    \u0275\u0275advance(2);
    \u0275\u0275property("checked", ctx_r1.isScheduleActive(d_r5.id));
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r1.isScheduleActive(d_r5.id) ? 7 : 8);
  }
}
function ClinicaConfiguracoesComponent_Conditional_3_Conditional_155_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 55);
    \u0275\u0275element(1, "img", 97);
    \u0275\u0275elementStart(2, "span", 98);
    \u0275\u0275text(3, "Logo atual");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("src", (ctx_r1.clinic == null ? null : ctx_r1.clinic.logo_url) ?? "", \u0275\u0275sanitizeUrl);
  }
}
function ClinicaConfiguracoesComponent_Conditional_3_Conditional_167_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 61);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("Arquivo selecionado: ", ctx_r1.logoFile.name);
  }
}
function ClinicaConfiguracoesComponent_Conditional_3_For_181_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label", 99)(1, "input", 100);
    \u0275\u0275twoWayListener("ngModelChange", function ClinicaConfiguracoesComponent_Conditional_3_For_181_Template_input_ngModelChange_1_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.form.theme, $event) || (ctx_r1.form.theme = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div", 101);
    \u0275\u0275element(3, "div", 102)(4, "div", 103)(5, "div", 104);
    \u0275\u0275elementEnd();
    \u0275\u0275element(6, "div", 105);
    \u0275\u0275elementStart(7, "div", 106);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const key_r9 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    const meta_r10 = ctx_r1.availableThemes[key_r9];
    const primary_r11 = (meta_r10 == null ? null : meta_r10.primary) ?? "#2563eb";
    const bg_r12 = primary_r11 + "22";
    \u0275\u0275classProp("selected", ctx_r1.form.theme === key_r9);
    \u0275\u0275advance();
    \u0275\u0275property("value", key_r9);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.theme);
    \u0275\u0275property("name", "theme");
    \u0275\u0275advance();
    \u0275\u0275styleProp("background", bg_r12);
    \u0275\u0275advance();
    \u0275\u0275styleProp("background", primary_r11);
    \u0275\u0275advance();
    \u0275\u0275styleProp("background", primary_r11);
    \u0275\u0275advance();
    \u0275\u0275styleProp("background", primary_r11);
    \u0275\u0275advance();
    \u0275\u0275styleProp("background", primary_r11);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((meta_r10 == null ? null : meta_r10.label) ?? key_r9);
  }
}
function ClinicaConfiguracoesComponent_Conditional_3_Conditional_200_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 68);
  }
}
function ClinicaConfiguracoesComponent_Conditional_3_Conditional_201_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 111);
  }
}
function ClinicaConfiguracoesComponent_Conditional_3_Conditional_201_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 109);
    \u0275\u0275text(1, "save");
    \u0275\u0275elementEnd();
  }
}
function ClinicaConfiguracoesComponent_Conditional_3_Conditional_201_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 69)(1, "div", 98);
    \u0275\u0275text(2, "Altera\xE7\xF5es n\xE3o salvas");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 107)(4, "a", 108)(5, "span", 109);
    \u0275\u0275text(6, "close");
    \u0275\u0275elementEnd();
    \u0275\u0275text(7, " Cancelar ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "button", 110);
    \u0275\u0275conditionalCreate(9, ClinicaConfiguracoesComponent_Conditional_3_Conditional_201_Conditional_9_Template, 1, 0, "span", 111)(10, ClinicaConfiguracoesComponent_Conditional_3_Conditional_201_Conditional_10_Template, 2, 0, "span", 109);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(8);
    \u0275\u0275property("disabled", ctx_r1.salvando);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.salvando ? 9 : 10);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.salvando ? "Salvando\u2026" : "Salvar configura\xE7\xF5es", " ");
  }
}
function ClinicaConfiguracoesComponent_Conditional_3_Conditional_202_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 113);
    \u0275\u0275text(1, "Esta \xE9 a \xFAnica empresa do grupo. Adicione filiais abaixo.");
    \u0275\u0275elementEnd();
  }
}
function ClinicaConfiguracoesComponent_Conditional_3_Conditional_202_Conditional_12_For_2_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 127);
    \u0275\u0275text(1, "Atual");
    \u0275\u0275elementEnd();
  }
}
function ClinicaConfiguracoesComponent_Conditional_3_Conditional_202_Conditional_12_For_2_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 128);
    \u0275\u0275text(1, "Trocar para esta");
    \u0275\u0275elementEnd();
  }
}
function ClinicaConfiguracoesComponent_Conditional_3_Conditional_202_Conditional_12_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li", 124)(1, "span", 125);
    \u0275\u0275text(2, "business");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 126);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(5, ClinicaConfiguracoesComponent_Conditional_3_Conditional_202_Conditional_12_For_2_Conditional_5_Template, 2, 0, "span", 127)(6, ClinicaConfiguracoesComponent_Conditional_3_Conditional_202_Conditional_12_For_2_Conditional_6_Template, 2, 0, "a", 128);
    \u0275\u0275elementStart(7, "span", 95);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const tc_r14 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(tc_r14.name);
    \u0275\u0275advance();
    \u0275\u0275conditional(tc_r14.id === (ctx_r1.clinic == null ? null : ctx_r1.clinic.id) ? 5 : 6);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", tc_r14.users_count ?? 0, " usu\xE1rio(s)");
  }
}
function ClinicaConfiguracoesComponent_Conditional_3_Conditional_202_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ul", 114);
    \u0275\u0275repeaterCreate(1, ClinicaConfiguracoesComponent_Conditional_3_Conditional_202_Conditional_12_For_2_Template, 9, 3, "li", 124, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.tenantClinics);
  }
}
function ClinicaConfiguracoesComponent_Conditional_3_Conditional_202_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 120);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.erroNovaEmpresa);
  }
}
function ClinicaConfiguracoesComponent_Conditional_3_Conditional_202_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 111);
  }
}
function ClinicaConfiguracoesComponent_Conditional_3_Conditional_202_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 109);
    \u0275\u0275text(1, "add_business");
    \u0275\u0275elementEnd();
  }
}
function ClinicaConfiguracoesComponent_Conditional_3_Conditional_202_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 112)(1, "div", 16)(2, "div", 17)(3, "div", 18)(4, "span", 19);
    \u0275\u0275text(5, "business_center");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "span", 20);
    \u0275\u0275text(7, "Empresas do grupo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span", 32);
    \u0275\u0275text(9, "Dispon\xEDvel no plano Enterprise");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 21);
    \u0275\u0275conditionalCreate(11, ClinicaConfiguracoesComponent_Conditional_3_Conditional_202_Conditional_11_Template, 2, 0, "p", 113)(12, ClinicaConfiguracoesComponent_Conditional_3_Conditional_202_Conditional_12_Template, 3, 0, "ul", 114);
    \u0275\u0275elementStart(13, "div", 115)(14, "p", 116);
    \u0275\u0275text(15, "Adicionar empresa ou filial");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "div", 117)(17, "label", 118);
    \u0275\u0275text(18, "Nome da nova empresa");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "input", 119);
    \u0275\u0275twoWayListener("ngModelChange", function ClinicaConfiguracoesComponent_Conditional_3_Conditional_202_Template_input_ngModelChange_19_listener($event) {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.novaEmpresaNome, $event) || (ctx_r1.novaEmpresaNome = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("keydown.enter", function ClinicaConfiguracoesComponent_Conditional_3_Conditional_202_Template_input_keydown_enter_19_listener($event) {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext(2);
      $event.preventDefault();
      return \u0275\u0275resetView(ctx_r1.criarNovaEmpresa());
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(20, ClinicaConfiguracoesComponent_Conditional_3_Conditional_202_Conditional_20_Template, 2, 1, "p", 120);
    \u0275\u0275elementStart(21, "div", 121)(22, "button", 122);
    \u0275\u0275listener("click", function ClinicaConfiguracoesComponent_Conditional_3_Conditional_202_Template_button_click_22_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.criarNovaEmpresa());
    });
    \u0275\u0275conditionalCreate(23, ClinicaConfiguracoesComponent_Conditional_3_Conditional_202_Conditional_23_Template, 1, 0, "span", 111)(24, ClinicaConfiguracoesComponent_Conditional_3_Conditional_202_Conditional_24_Template, 2, 0, "span", 109);
    \u0275\u0275text(25);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "a", 123);
    \u0275\u0275text(27, "Ver lista para trocar de empresa \u2192");
    \u0275\u0275elementEnd()()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("active", ctx_r1.activeTab === "empresas");
    \u0275\u0275advance(11);
    \u0275\u0275conditional(ctx_r1.tenantClinics.length === 0 ? 11 : 12);
    \u0275\u0275advance(8);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.novaEmpresaNome);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.erroNovaEmpresa ? 20 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.salvandoNovaEmpresa || !ctx_r1.novaEmpresaNome.trim());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.salvandoNovaEmpresa ? 23 : 24);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.salvandoNovaEmpresa ? "Criando\u2026" : "Cadastrar nova empresa", " ");
  }
}
function ClinicaConfiguracoesComponent_Conditional_3_Conditional_214_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 76);
    \u0275\u0275text(1, "Carregando\u2026");
    \u0275\u0275elementEnd();
  }
}
function ClinicaConfiguracoesComponent_Conditional_3_Conditional_215_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p", 11);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "button", 129);
    \u0275\u0275listener("click", function ClinicaConfiguracoesComponent_Conditional_3_Conditional_215_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.carregarWhatsapp());
    });
    \u0275\u0275text(3, "Tentar novamente");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.waError);
  }
}
function ClinicaConfiguracoesComponent_Conditional_3_Conditional_216_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 11);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.waError);
  }
}
function ClinicaConfiguracoesComponent_Conditional_3_Conditional_216_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 130)(1, "div", 21)(2, "p", 131);
    \u0275\u0275text(3, " A API Evolution Go n\xE3o est\xE1 configurada no servidor. Pe\xE7a ao administrador para definir ");
    \u0275\u0275elementStart(4, "code", 132);
    \u0275\u0275text(5, "EVOLUTION_GO_BASE_URL");
    \u0275\u0275elementEnd();
    \u0275\u0275text(6, " e ");
    \u0275\u0275elementStart(7, "code", 132);
    \u0275\u0275text(8, "EVOLUTION_GO_API_KEY");
    \u0275\u0275elementEnd();
    \u0275\u0275text(9, " (GLOBAL_API_KEY do container) no backend. ");
    \u0275\u0275elementEnd()()();
  }
}
function ClinicaConfiguracoesComponent_Conditional_3_Conditional_216_Conditional_2_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 111);
  }
}
function ClinicaConfiguracoesComponent_Conditional_3_Conditional_216_Conditional_2_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 109);
    \u0275\u0275text(1, "bolt");
    \u0275\u0275elementEnd();
  }
}
function ClinicaConfiguracoesComponent_Conditional_3_Conditional_216_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 130)(1, "div", 17)(2, "div", 18)(3, "span", 19);
    \u0275\u0275text(4, "add_circle");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "span", 20);
    \u0275\u0275text(6, "Criar inst\xE2ncia");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 21)(8, "p", 113);
    \u0275\u0275text(9, " Ser\xE1 criada uma inst\xE2ncia na Evolution Go vinculada a esta empresa. O nome padr\xE3o \xE9 ");
    \u0275\u0275elementStart(10, "code", 132);
    \u0275\u0275text(11, "zion_org_{id}");
    \u0275\u0275elementEnd();
    \u0275\u0275text(12, ". Opcionalmente defina um token (UUID); caso vazio, a Evolution gera automaticamente. ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 117)(14, "label", 133);
    \u0275\u0275text(15, "Nome da inst\xE2ncia ");
    \u0275\u0275elementStart(16, "span", 30);
    \u0275\u0275text(17, "opcional");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "input", 134);
    \u0275\u0275twoWayListener("ngModelChange", function ClinicaConfiguracoesComponent_Conditional_3_Conditional_216_Conditional_2_Template_input_ngModelChange_18_listener($event) {
      \u0275\u0275restoreView(_r16);
      const ctx_r1 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r1.waNovaInstanciaNome, $event) || (ctx_r1.waNovaInstanciaNome = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "div", 36)(20, "label", 135);
    \u0275\u0275text(21, "Token (UUID) ");
    \u0275\u0275elementStart(22, "span", 30);
    \u0275\u0275text(23, "opcional");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "input", 136);
    \u0275\u0275twoWayListener("ngModelChange", function ClinicaConfiguracoesComponent_Conditional_3_Conditional_216_Conditional_2_Template_input_ngModelChange_24_listener($event) {
      \u0275\u0275restoreView(_r16);
      const ctx_r1 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r1.waNovaInstanciaToken, $event) || (ctx_r1.waNovaInstanciaToken = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "button", 122);
    \u0275\u0275listener("click", function ClinicaConfiguracoesComponent_Conditional_3_Conditional_216_Conditional_2_Template_button_click_25_listener() {
      \u0275\u0275restoreView(_r16);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.criarInstanciaWhatsapp());
    });
    \u0275\u0275conditionalCreate(26, ClinicaConfiguracoesComponent_Conditional_3_Conditional_216_Conditional_2_Conditional_26_Template, 1, 0, "span", 111)(27, ClinicaConfiguracoesComponent_Conditional_3_Conditional_216_Conditional_2_Conditional_27_Template, 2, 0, "span", 109);
    \u0275\u0275text(28);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(18);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.waNovaInstanciaNome);
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.waNovaInstanciaToken);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.waCriandoInstancia);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.waCriandoInstancia ? 26 : 27);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.waCriandoInstancia ? "Criando\u2026" : "Criar inst\xE2ncia", " ");
  }
}
function ClinicaConfiguracoesComponent_Conditional_3_Conditional_216_Conditional_3_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 137)(1, "div", 17)(2, "div", 18)(3, "span", 164);
    \u0275\u0275text(4, "key");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "span", 20);
    \u0275\u0275text(6, "Token da inst\xE2ncia (guarde agora)");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 21)(8, "p", 165);
    \u0275\u0275text(9, "Este valor n\xE3o ser\xE1 mostrado novamente nesta tela.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "code", 166);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "button", 129);
    \u0275\u0275listener("click", function ClinicaConfiguracoesComponent_Conditional_3_Conditional_216_Conditional_3_Conditional_0_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r18);
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.copiarTextoWhatsapp(ctx_r1.waTokenExibicaoUnica));
    });
    \u0275\u0275text(13, "Copiar token");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(11);
    \u0275\u0275textInterpolate(ctx_r1.waTokenExibicaoUnica);
  }
}
function ClinicaConfiguracoesComponent_Conditional_3_Conditional_216_Conditional_3_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 140);
    \u0275\u0275text(1, "sim");
    \u0275\u0275elementEnd();
  }
}
function ClinicaConfiguracoesComponent_Conditional_3_Conditional_216_Conditional_3_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 141);
    \u0275\u0275text(1, "n\xE3o");
    \u0275\u0275elementEnd();
  }
}
function ClinicaConfiguracoesComponent_Conditional_3_Conditional_216_Conditional_3_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " \u2014 ");
  }
}
function ClinicaConfiguracoesComponent_Conditional_3_Conditional_216_Conditional_3_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 140);
    \u0275\u0275text(1, "sim");
    \u0275\u0275elementEnd();
  }
}
function ClinicaConfiguracoesComponent_Conditional_3_Conditional_216_Conditional_3_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 141);
    \u0275\u0275text(1, "n\xE3o");
    \u0275\u0275elementEnd();
  }
}
function ClinicaConfiguracoesComponent_Conditional_3_Conditional_216_Conditional_3_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " \u2014 ");
  }
}
function ClinicaConfiguracoesComponent_Conditional_3_Conditional_216_Conditional_3_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 142);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("API: ", ctx_r1.waState.remote_error);
  }
}
function ClinicaConfiguracoesComponent_Conditional_3_Conditional_216_Conditional_3_Conditional_45_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 111);
  }
}
function ClinicaConfiguracoesComponent_Conditional_3_Conditional_216_Conditional_3_Conditional_46_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 109);
    \u0275\u0275text(1, "power_settings_new");
    \u0275\u0275elementEnd();
  }
}
function ClinicaConfiguracoesComponent_Conditional_3_Conditional_216_Conditional_3_Conditional_49_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 111);
  }
}
function ClinicaConfiguracoesComponent_Conditional_3_Conditional_216_Conditional_3_Conditional_50_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 109);
    \u0275\u0275text(1, "qr_code_2");
    \u0275\u0275elementEnd();
  }
}
function ClinicaConfiguracoesComponent_Conditional_3_Conditional_216_Conditional_3_Conditional_52_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 150)(1, "p", 152);
    \u0275\u0275text(2, "Escaneie no WhatsApp \xB7 Dispositivos conectados");
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "img", 167);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(3);
    \u0275\u0275property("src", ctx_r1.waQrSrc, \u0275\u0275sanitizeUrl);
  }
}
function ClinicaConfiguracoesComponent_Conditional_3_Conditional_216_Conditional_3_Conditional_53_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 168);
    \u0275\u0275text(1, "C\xF3digo de vincula\xE7\xE3o (QR)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "code", 169);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.waQrLinkCode);
  }
}
function ClinicaConfiguracoesComponent_Conditional_3_Conditional_216_Conditional_3_Conditional_62_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 111);
  }
}
function ClinicaConfiguracoesComponent_Conditional_3_Conditional_216_Conditional_3_Conditional_64_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 156);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.waPairingCode);
  }
}
function ClinicaConfiguracoesComponent_Conditional_3_Conditional_216_Conditional_3_Conditional_84_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 111);
  }
}
function ClinicaConfiguracoesComponent_Conditional_3_Conditional_216_Conditional_3_Conditional_85_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 109);
    \u0275\u0275text(1, "send");
    \u0275\u0275elementEnd();
  }
}
function ClinicaConfiguracoesComponent_Conditional_3_Conditional_216_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = \u0275\u0275getCurrentView();
    \u0275\u0275conditionalCreate(0, ClinicaConfiguracoesComponent_Conditional_3_Conditional_216_Conditional_3_Conditional_0_Template, 14, 1, "div", 137);
    \u0275\u0275elementStart(1, "div", 130)(2, "div", 17)(3, "div", 18)(4, "span", 19);
    \u0275\u0275text(5, "info");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "span", 20);
    \u0275\u0275text(7, "Status");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 21)(9, "p", 138)(10, "strong");
    \u0275\u0275text(11, "Inst\xE2ncia:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "p", 139);
    \u0275\u0275text(14, " Conectado: ");
    \u0275\u0275conditionalCreate(15, ClinicaConfiguracoesComponent_Conditional_3_Conditional_216_Conditional_3_Conditional_15_Template, 2, 0, "span", 140)(16, ClinicaConfiguracoesComponent_Conditional_3_Conditional_216_Conditional_3_Conditional_16_Template, 2, 0, "span", 141)(17, ClinicaConfiguracoesComponent_Conditional_3_Conditional_216_Conditional_3_Conditional_17_Template, 1, 0);
    \u0275\u0275text(18, " \xB7 Sess\xE3o ativa: ");
    \u0275\u0275conditionalCreate(19, ClinicaConfiguracoesComponent_Conditional_3_Conditional_216_Conditional_3_Conditional_19_Template, 2, 0, "span", 140)(20, ClinicaConfiguracoesComponent_Conditional_3_Conditional_216_Conditional_3_Conditional_20_Template, 2, 0, "span", 141)(21, ClinicaConfiguracoesComponent_Conditional_3_Conditional_216_Conditional_3_Conditional_21_Template, 1, 0);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(22, ClinicaConfiguracoesComponent_Conditional_3_Conditional_216_Conditional_3_Conditional_22_Template, 2, 1, "p", 142);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "div", 130)(24, "div", 17)(25, "div", 18)(26, "span", 19);
    \u0275\u0275text(27, "link");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(28, "span", 20);
    \u0275\u0275text(29, "Conectar dispositivo");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(30, "div", 21)(31, "p", 143);
    \u0275\u0275text(32, " N\xFAmero opcional para c\xF3digo de pareamento (somente d\xEDgitos, com DDI). Depois use \u201CObter QR Code\u201D ou \u201CObter c\xF3digo de pareamento\u201D. ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "div", 117)(34, "label", 144);
    \u0275\u0275text(35, "Telefone (pareamento)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "input", 145);
    \u0275\u0275twoWayListener("ngModelChange", function ClinicaConfiguracoesComponent_Conditional_3_Conditional_216_Conditional_3_Template_input_ngModelChange_36_listener($event) {
      \u0275\u0275restoreView(_r17);
      const ctx_r1 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r1.waPhoneConectar, $event) || (ctx_r1.waPhoneConectar = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(37, "div", 36)(38, "label", 146);
    \u0275\u0275text(39, "Webhook URL ");
    \u0275\u0275elementStart(40, "span", 30);
    \u0275\u0275text(41, "opcional");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(42, "input", 147);
    \u0275\u0275twoWayListener("ngModelChange", function ClinicaConfiguracoesComponent_Conditional_3_Conditional_216_Conditional_3_Template_input_ngModelChange_42_listener($event) {
      \u0275\u0275restoreView(_r17);
      const ctx_r1 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r1.waWebhookUrl, $event) || (ctx_r1.waWebhookUrl = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(43, "div", 148)(44, "button", 122);
    \u0275\u0275listener("click", function ClinicaConfiguracoesComponent_Conditional_3_Conditional_216_Conditional_3_Template_button_click_44_listener() {
      \u0275\u0275restoreView(_r17);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.iniciarConexaoWhatsapp());
    });
    \u0275\u0275conditionalCreate(45, ClinicaConfiguracoesComponent_Conditional_3_Conditional_216_Conditional_3_Conditional_45_Template, 1, 0, "span", 111)(46, ClinicaConfiguracoesComponent_Conditional_3_Conditional_216_Conditional_3_Conditional_46_Template, 2, 0, "span", 109);
    \u0275\u0275text(47);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(48, "button", 149);
    \u0275\u0275listener("click", function ClinicaConfiguracoesComponent_Conditional_3_Conditional_216_Conditional_3_Template_button_click_48_listener() {
      \u0275\u0275restoreView(_r17);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.buscarQrWhatsapp());
    });
    \u0275\u0275conditionalCreate(49, ClinicaConfiguracoesComponent_Conditional_3_Conditional_216_Conditional_3_Conditional_49_Template, 1, 0, "span", 111)(50, ClinicaConfiguracoesComponent_Conditional_3_Conditional_216_Conditional_3_Conditional_50_Template, 2, 0, "span", 109);
    \u0275\u0275text(51);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(52, ClinicaConfiguracoesComponent_Conditional_3_Conditional_216_Conditional_3_Conditional_52_Template, 4, 1, "div", 150);
    \u0275\u0275conditionalCreate(53, ClinicaConfiguracoesComponent_Conditional_3_Conditional_216_Conditional_3_Conditional_53_Template, 4, 1);
    \u0275\u0275elementStart(54, "div", 151)(55, "p", 152);
    \u0275\u0275text(56, "Pareamento por c\xF3digo (8 d\xEDgitos)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(57, "div", 117)(58, "label", 153);
    \u0275\u0275text(59, "Telefone do aparelho");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(60, "input", 154);
    \u0275\u0275twoWayListener("ngModelChange", function ClinicaConfiguracoesComponent_Conditional_3_Conditional_216_Conditional_3_Template_input_ngModelChange_60_listener($event) {
      \u0275\u0275restoreView(_r17);
      const ctx_r1 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r1.waPhonePair, $event) || (ctx_r1.waPhonePair = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(61, "button", 155);
    \u0275\u0275listener("click", function ClinicaConfiguracoesComponent_Conditional_3_Conditional_216_Conditional_3_Template_button_click_61_listener() {
      \u0275\u0275restoreView(_r17);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.solicitarPairWhatsapp());
    });
    \u0275\u0275conditionalCreate(62, ClinicaConfiguracoesComponent_Conditional_3_Conditional_216_Conditional_3_Conditional_62_Template, 1, 0, "span", 111);
    \u0275\u0275text(63);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(64, ClinicaConfiguracoesComponent_Conditional_3_Conditional_216_Conditional_3_Conditional_64_Template, 2, 1, "p", 156);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(65, "div", 130)(66, "div", 17)(67, "div", 18)(68, "span", 19);
    \u0275\u0275text(69, "send");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(70, "span", 20);
    \u0275\u0275text(71, "Mensagem de teste");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(72, "div", 21)(73, "div", 117)(74, "label", 157);
    \u0275\u0275text(75, "N\xFAmero destino (DDI + DDD + n\xFAmero)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(76, "input", 158);
    \u0275\u0275twoWayListener("ngModelChange", function ClinicaConfiguracoesComponent_Conditional_3_Conditional_216_Conditional_3_Template_input_ngModelChange_76_listener($event) {
      \u0275\u0275restoreView(_r17);
      const ctx_r1 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r1.waTestPhone, $event) || (ctx_r1.waTestPhone = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(77, "div", 36)(78, "label", 159);
    \u0275\u0275text(79, "Texto ");
    \u0275\u0275elementStart(80, "span", 30);
    \u0275\u0275text(81, "opcional");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(82, "textarea", 160);
    \u0275\u0275twoWayListener("ngModelChange", function ClinicaConfiguracoesComponent_Conditional_3_Conditional_216_Conditional_3_Template_textarea_ngModelChange_82_listener($event) {
      \u0275\u0275restoreView(_r17);
      const ctx_r1 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r1.waTestText, $event) || (ctx_r1.waTestText = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(83, "button", 122);
    \u0275\u0275listener("click", function ClinicaConfiguracoesComponent_Conditional_3_Conditional_216_Conditional_3_Template_button_click_83_listener() {
      \u0275\u0275restoreView(_r17);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.enviarTesteWhatsapp());
    });
    \u0275\u0275conditionalCreate(84, ClinicaConfiguracoesComponent_Conditional_3_Conditional_216_Conditional_3_Conditional_84_Template, 1, 0, "span", 111)(85, ClinicaConfiguracoesComponent_Conditional_3_Conditional_216_Conditional_3_Conditional_85_Template, 2, 0, "span", 109);
    \u0275\u0275text(86);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(87, "div", 161)(88, "button", 162);
    \u0275\u0275listener("click", function ClinicaConfiguracoesComponent_Conditional_3_Conditional_216_Conditional_3_Template_button_click_88_listener() {
      \u0275\u0275restoreView(_r17);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.desconectarWhatsapp());
    });
    \u0275\u0275text(89);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(90, "button", 163);
    \u0275\u0275listener("click", function ClinicaConfiguracoesComponent_Conditional_3_Conditional_216_Conditional_3_Template_button_click_90_listener() {
      \u0275\u0275restoreView(_r17);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.removerIntegracaoWhatsapp());
    });
    \u0275\u0275text(91);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275conditional(ctx_r1.waTokenExibicaoUnica ? 0 : -1);
    \u0275\u0275advance(12);
    \u0275\u0275textInterpolate1(" ", ctx_r1.waState.instance_name ?? "\u2014");
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r1.waState.connected === true ? 15 : ctx_r1.waState.connected === false ? 16 : 17);
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx_r1.waState.logged_in === true ? 19 : ctx_r1.waState.logged_in === false ? 20 : 21);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r1.waState.remote_error ? 22 : -1);
    \u0275\u0275advance(14);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.waPhoneConectar);
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.waWebhookUrl);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.waConectando);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.waConectando ? 45 : 46);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.waConectando ? "Iniciando\u2026" : "Iniciar conex\xE3o", " ");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.waQrCarregando);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.waQrCarregando ? 49 : 50);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.waQrCarregando ? "Carregando\u2026" : "Obter QR Code", " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.waQrSrc ? 52 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.waQrLinkCode ? 53 : -1);
    \u0275\u0275advance(7);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.waPhonePair);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.waPairCarregando);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.waPairCarregando ? 62 : -1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.waPairCarregando ? "Solicitando\u2026" : "Obter c\xF3digo de pareamento", " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.waPairingCode ? 64 : -1);
    \u0275\u0275advance(12);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.waTestPhone);
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.waTestText);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.waTestEnviando);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.waTestEnviando ? 84 : 85);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.waTestEnviando ? "Enviando\u2026" : "Enviar teste", " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.waDesconectando);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.waDesconectando ? "Desconectando\u2026" : "Desconectar sess\xE3o", " ");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.waRemovendo);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.waRemovendo ? "Removendo\u2026" : "Remover integra\xE7\xE3o", " ");
  }
}
function ClinicaConfiguracoesComponent_Conditional_3_Conditional_216_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, ClinicaConfiguracoesComponent_Conditional_3_Conditional_216_Conditional_0_Template, 2, 1, "p", 11);
    \u0275\u0275conditionalCreate(1, ClinicaConfiguracoesComponent_Conditional_3_Conditional_216_Conditional_1_Template, 10, 0, "div", 130)(2, ClinicaConfiguracoesComponent_Conditional_3_Conditional_216_Conditional_2_Template, 29, 5, "div", 130)(3, ClinicaConfiguracoesComponent_Conditional_3_Conditional_216_Conditional_3_Template, 92, 29);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275conditional(ctx_r1.waError ? 0 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r1.waState.server_configured ? 1 : !ctx_r1.waState.instance_configured ? 2 : 3);
  }
}
function ClinicaConfiguracoesComponent_Conditional_3_Conditional_228_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 76);
    \u0275\u0275text(1, "Carregando logs\u2026");
    \u0275\u0275elementEnd();
  }
}
function ClinicaConfiguracoesComponent_Conditional_3_Conditional_229_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "zm-assinatura-bloqueada-card", 78);
  }
}
function ClinicaConfiguracoesComponent_Conditional_3_Conditional_230_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 4);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.logsError);
  }
}
function ClinicaConfiguracoesComponent_Conditional_3_Conditional_231_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 170)(2, "span", 171);
    \u0275\u0275text(3, "history");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 172);
    \u0275\u0275text(5, "Nenhum registro de auditoria ainda.");
    \u0275\u0275elementEnd()()();
  }
}
function ClinicaConfiguracoesComponent_Conditional_3_Conditional_231_Conditional_14_For_1_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 178);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const log_r19 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", log_r19.entity_type, " #", log_r19.entity_id);
  }
}
function ClinicaConfiguracoesComponent_Conditional_3_Conditional_231_Conditional_14_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 173);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "td")(5, "span", 174)(6, "span", 175);
    \u0275\u0275text(7, "info");
    \u0275\u0275elementEnd();
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "td", 176);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "td", 177);
    \u0275\u0275conditionalCreate(12, ClinicaConfiguracoesComponent_Conditional_3_Conditional_231_Conditional_14_For_1_Conditional_12_Template, 2, 2, "span", 178);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const log_r19 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(3, 4, log_r19.created_at, "dd/MM/yyyy HH:mm"), " ");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", log_r19.action, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", log_r19.user_name ?? "\u2014", " ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(log_r19.entity_type && log_r19.entity_id ? 12 : -1);
  }
}
function ClinicaConfiguracoesComponent_Conditional_3_Conditional_231_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, ClinicaConfiguracoesComponent_Conditional_3_Conditional_231_Conditional_14_For_1_Template, 13, 7, "tr", null, _forTrack0);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275repeater(ctx_r1.logs);
  }
}
function ClinicaConfiguracoesComponent_Conditional_3_Conditional_231_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 79)(1, "table")(2, "thead")(3, "tr")(4, "th");
    \u0275\u0275text(5, "Data / Hora");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "th");
    \u0275\u0275text(7, "A\xE7\xE3o");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th");
    \u0275\u0275text(9, "Usu\xE1rio");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th");
    \u0275\u0275text(11, "Detalhe");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(12, "tbody");
    \u0275\u0275conditionalCreate(13, ClinicaConfiguracoesComponent_Conditional_3_Conditional_231_Conditional_13_Template, 6, 0, "tr")(14, ClinicaConfiguracoesComponent_Conditional_3_Conditional_231_Conditional_14_Template, 2, 0);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(13);
    \u0275\u0275conditional(ctx_r1.logs.length === 0 ? 13 : 14);
  }
}
function ClinicaConfiguracoesComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 3)(1, "div", 5)(2, "div", 6)(3, "button", 7);
    \u0275\u0275listener("click", function ClinicaConfiguracoesComponent_Conditional_3_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setTab("dados"));
    });
    \u0275\u0275elementStart(4, "span", 8);
    \u0275\u0275text(5, "description");
    \u0275\u0275elementEnd();
    \u0275\u0275text(6, " Dados Gerais ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 7);
    \u0275\u0275listener("click", function ClinicaConfiguracoesComponent_Conditional_3_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setTab("visual"));
    });
    \u0275\u0275elementStart(8, "span", 8);
    \u0275\u0275text(9, "palette");
    \u0275\u0275elementEnd();
    \u0275\u0275text(10, " Tema Visual ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "button", 7);
    \u0275\u0275listener("click", function ClinicaConfiguracoesComponent_Conditional_3_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setTab("whatsapp"));
    });
    \u0275\u0275elementStart(12, "span", 8);
    \u0275\u0275text(13, "chat");
    \u0275\u0275elementEnd();
    \u0275\u0275text(14, " WhatsApp ");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(15, ClinicaConfiguracoesComponent_Conditional_3_Conditional_15_Template, 4, 2, "button", 9);
    \u0275\u0275elementStart(16, "button", 10);
    \u0275\u0275listener("click", function ClinicaConfiguracoesComponent_Conditional_3_Template_button_click_16_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setTab("logs"));
    });
    \u0275\u0275elementStart(17, "span", 8);
    \u0275\u0275text(18, "history");
    \u0275\u0275elementEnd();
    \u0275\u0275text(19, " Logs ");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(20, ClinicaConfiguracoesComponent_Conditional_3_Conditional_20_Template, 2, 1, "p", 11);
    \u0275\u0275conditionalCreate(21, ClinicaConfiguracoesComponent_Conditional_3_Conditional_21_Template, 2, 0, "p", 12);
    \u0275\u0275elementStart(22, "form", 13);
    \u0275\u0275listener("ngSubmit", function ClinicaConfiguracoesComponent_Conditional_3_Template_form_ngSubmit_22_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.salvar());
    });
    \u0275\u0275conditionalCreate(23, ClinicaConfiguracoesComponent_Conditional_3_Conditional_23_Template, 8, 3, "div", 14);
    \u0275\u0275elementStart(24, "div", 15)(25, "div", 16)(26, "div", 17)(27, "div", 18)(28, "span", 19);
    \u0275\u0275text(29, "business");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(30, "span", 20);
    \u0275\u0275text(31, "Informa\xE7\xF5es B\xE1sicas");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(32, "div", 21)(33, "div", 22)(34, "label");
    \u0275\u0275text(35, "Nome da empresa ");
    \u0275\u0275elementStart(36, "span", 23);
    \u0275\u0275text(37, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(38, "input", 24);
    \u0275\u0275twoWayListener("ngModelChange", function ClinicaConfiguracoesComponent_Conditional_3_Template_input_ngModelChange_38_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.name, $event) || (ctx_r1.form.name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(39, "div", 25)(40, "div", 22)(41, "label");
    \u0275\u0275text(42, "E-mail para notifica\xE7\xF5es ");
    \u0275\u0275elementStart(43, "span", 23);
    \u0275\u0275text(44, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(45, "input", 26);
    \u0275\u0275twoWayListener("ngModelChange", function ClinicaConfiguracoesComponent_Conditional_3_Template_input_ngModelChange_45_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.notification_email, $event) || (ctx_r1.form.notification_email = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(46, "div", 22)(47, "label");
    \u0275\u0275text(48, "Telefone / WhatsApp");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(49, "input", 27);
    \u0275\u0275twoWayListener("ngModelChange", function ClinicaConfiguracoesComponent_Conditional_3_Template_input_ngModelChange_49_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.phone, $event) || (ctx_r1.form.phone = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(50, "div", 22)(51, "label");
    \u0275\u0275text(52, "Endere\xE7o");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(53, "input", 28);
    \u0275\u0275twoWayListener("ngModelChange", function ClinicaConfiguracoesComponent_Conditional_3_Template_input_ngModelChange_53_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.address, $event) || (ctx_r1.form.address = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(54, "div", 29);
    \u0275\u0275text(55, "Aparece no cabe\xE7alho dos PDFs e na p\xE1gina do Link Bio.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(56, "div", 22)(57, "label");
    \u0275\u0275text(58, "E-mail de contato p\xFAblico ");
    \u0275\u0275elementStart(59, "span", 30);
    \u0275\u0275text(60, "opcional");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(61, "input", 31);
    \u0275\u0275twoWayListener("ngModelChange", function ClinicaConfiguracoesComponent_Conditional_3_Template_input_ngModelChange_61_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.contact_email, $event) || (ctx_r1.form.contact_email = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(62, "div", 29);
    \u0275\u0275text(63, "Exibido na p\xE1gina do Link Bio. Diferente do e-mail de notifica\xE7\xF5es.");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(64, "div", 16)(65, "div", 17)(66, "div", 18)(67, "span", 19);
    \u0275\u0275text(68, "receipt_long");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(69, "span", 20);
    \u0275\u0275text(70, "Dados para Faturamento");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(71, "span", 32);
    \u0275\u0275text(72, "Necess\xE1rio para assinar planos");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(73, "div", 21)(74, "div", 22)(75, "label");
    \u0275\u0275text(76, "Nome/Raz\xE3o Social na nota ");
    \u0275\u0275elementStart(77, "span", 30);
    \u0275\u0275text(78, "opcional");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(79, "input", 33);
    \u0275\u0275twoWayListener("ngModelChange", function ClinicaConfiguracoesComponent_Conditional_3_Template_input_ngModelChange_79_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.billing_name, $event) || (ctx_r1.form.billing_name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(80, "div", 29);
    \u0275\u0275text(81, "Usado em boletos e faturas. Padr\xE3o: nome da empresa.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(82, "div", 22)(83, "label");
    \u0275\u0275text(84, "E-mail para boletos ");
    \u0275\u0275elementStart(85, "span", 30);
    \u0275\u0275text(86, "opcional");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(87, "input", 34);
    \u0275\u0275twoWayListener("ngModelChange", function ClinicaConfiguracoesComponent_Conditional_3_Template_input_ngModelChange_87_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.billing_email, $event) || (ctx_r1.form.billing_email = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(88, "div", 29);
    \u0275\u0275text(89, "Onde os boletos ser\xE3o enviados. Padr\xE3o: e-mail de notifica\xE7\xF5es.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(90, "div", 22)(91, "label");
    \u0275\u0275text(92, "CPF ou CNPJ ");
    \u0275\u0275elementStart(93, "span", 23);
    \u0275\u0275text(94, "*");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(95, "span", 30);
    \u0275\u0275text(96, "para assinatura");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(97, "input", 35);
    \u0275\u0275twoWayListener("ngModelChange", function ClinicaConfiguracoesComponent_Conditional_3_Template_input_ngModelChange_97_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.billing_document, $event) || (ctx_r1.form.billing_document = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(98, "div", 29);
    \u0275\u0275text(99, "Obrigat\xF3rio para gerar boletos. Apenas n\xFAmeros ou com pontua\xE7\xE3o.");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(100, "div", 16)(101, "div", 17)(102, "div", 18)(103, "span", 19);
    \u0275\u0275text(104, "chat");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(105, "span", 20);
    \u0275\u0275text(106, "Comunica\xE7\xE3o por WhatsApp");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(107, "div", 21)(108, "div", 36)(109, "label", 37)(110, "span")(111, "span", 38);
    \u0275\u0275text(112, "Receber comunica\xE7\xE3o por WhatsApp");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(113, "span", 39);
    \u0275\u0275text(114, "Confirma\xE7\xF5es e avisos da loja no n\xFAmero cadastrado (Telefone/WhatsApp)");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(115, "label", 40)(116, "input", 41);
    \u0275\u0275twoWayListener("ngModelChange", function ClinicaConfiguracoesComponent_Conditional_3_Template_input_ngModelChange_116_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.whatsapp_notifications_enabled, $event) || (ctx_r1.form.whatsapp_notifications_enabled = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275element(117, "span", 42)(118, "span", 43);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(119, "div", 44)(120, "p", 45);
    \u0275\u0275text(121, "Quais notifica\xE7\xF5es deseja receber:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(122, "label", 46)(123, "input", 47);
    \u0275\u0275twoWayListener("ngModelChange", function ClinicaConfiguracoesComponent_Conditional_3_Template_input_ngModelChange_123_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.whatsapp_notify_cobranca, $event) || (ctx_r1.form.whatsapp_notify_cobranca = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275text(124, " Cobran\xE7a (lembretes, vencimentos) ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(125, "label", 46)(126, "input", 48);
    \u0275\u0275twoWayListener("ngModelChange", function ClinicaConfiguracoesComponent_Conditional_3_Template_input_ngModelChange_126_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.whatsapp_notify_faturas_boleto, $event) || (ctx_r1.form.whatsapp_notify_faturas_boleto = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275text(127, " Faturas e boleto (confirma\xE7\xE3o de assinatura, boleto gerado) ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(128, "label", 49)(129, "input", 50);
    \u0275\u0275twoWayListener("ngModelChange", function ClinicaConfiguracoesComponent_Conditional_3_Template_input_ngModelChange_129_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.whatsapp_notify_avisos, $event) || (ctx_r1.form.whatsapp_notify_avisos = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275text(130, " Avisos gerais da loja ");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(131, "div", 16)(132, "div", 17)(133, "div", 18)(134, "span", 19);
    \u0275\u0275text(135, "schedule");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(136, "span", 20);
    \u0275\u0275text(137, "Hor\xE1rio de Atendimento");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(138, "span", 32);
    \u0275\u0275text(139, 'Deixe vazio para "Fechado"');
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(140, "div", 21)(141, "div", 51);
    \u0275\u0275repeaterCreate(142, ClinicaConfiguracoesComponent_Conditional_3_For_143_Template, 9, 5, "div", 52, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(144, "div", 53)(145, "button", 54);
    \u0275\u0275listener("click", function ClinicaConfiguracoesComponent_Conditional_3_Template_button_click_145_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.copyFirstDayToAll());
    });
    \u0275\u0275text(146, "Copiar segunda para todos os dias \u2192");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(147, "div", 16)(148, "div", 17)(149, "div", 18)(150, "span", 19);
    \u0275\u0275text(151, "image");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(152, "span", 20);
    \u0275\u0275text(153, "Logo da empresa");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(154, "div", 21);
    \u0275\u0275conditionalCreate(155, ClinicaConfiguracoesComponent_Conditional_3_Conditional_155_Template, 4, 1, "div", 55);
    \u0275\u0275elementStart(156, "div", 56);
    \u0275\u0275listener("click", function ClinicaConfiguracoesComponent_Conditional_3_Template_div_click_156_listener() {
      \u0275\u0275restoreView(_r1);
      const logoInput_r7 = \u0275\u0275reference(166);
      return \u0275\u0275resetView(logoInput_r7.click());
    });
    \u0275\u0275elementStart(157, "span", 19);
    \u0275\u0275text(158, "upload_file");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(159, "div", 57);
    \u0275\u0275text(160, "Arraste sua logo aqui ou ");
    \u0275\u0275elementStart(161, "span", 58);
    \u0275\u0275text(162, "clique para escolher");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(163, "div", 59);
    \u0275\u0275text(164, "PNG, JPG ou SVG \u2022 Recomendado: 512\xD7512px \u2022 M\xE1x 2MB");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(165, "input", 60, 0);
    \u0275\u0275listener("change", function ClinicaConfiguracoesComponent_Conditional_3_Template_input_change_165_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onLogoChange($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(167, ClinicaConfiguracoesComponent_Conditional_3_Conditional_167_Template, 2, 1, "p", 61);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(168, "div", 62)(169, "div", 16)(170, "div", 17)(171, "div", 18)(172, "span", 19);
    \u0275\u0275text(173, "palette");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(174, "span", 20);
    \u0275\u0275text(175, "Tema de Cores");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(176, "span", 32);
    \u0275\u0275text(177, "Aplicado para todos os usu\xE1rios");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(178, "div", 21)(179, "div", 63);
    \u0275\u0275repeaterCreate(180, ClinicaConfiguracoesComponent_Conditional_3_For_181_Template, 9, 16, "label", 64, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(182, "div", 16)(183, "div", 17)(184, "div", 18)(185, "span", 19);
    \u0275\u0275text(186, "dark_mode");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(187, "span", 20);
    \u0275\u0275text(188, "Modo Escuro");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(189, "div", 21)(190, "div", 65)(191, "div", 66)(192, "div", 38);
    \u0275\u0275text(193, "Ativar modo escuro");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(194, "div", 39);
    \u0275\u0275text(195, "Fundo escuro profundo, independente do tema de cor selecionado.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(196, "label", 40)(197, "input", 67);
    \u0275\u0275twoWayListener("ngModelChange", function ClinicaConfiguracoesComponent_Conditional_3_Template_input_ngModelChange_197_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.dark_mode, $event) || (ctx_r1.form.dark_mode = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275element(198, "span", 42)(199, "span", 43);
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275conditionalCreate(200, ClinicaConfiguracoesComponent_Conditional_3_Conditional_200_Template, 1, 0, "div", 68);
    \u0275\u0275conditionalCreate(201, ClinicaConfiguracoesComponent_Conditional_3_Conditional_201_Template, 12, 3, "div", 69);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(202, ClinicaConfiguracoesComponent_Conditional_3_Conditional_202_Template, 28, 8, "div", 70);
    \u0275\u0275elementStart(203, "div", 71)(204, "div", 72)(205, "div", 73)(206, "div", 74)(207, "span", 19);
    \u0275\u0275text(208, "chat");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(209, "div")(210, "h1");
    \u0275\u0275text(211, "WhatsApp (Evolution Go)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(212, "p", 75);
    \u0275\u0275text(213, "Conecte o n\xFAmero da empresa e envie uma mensagem de teste");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275conditionalCreate(214, ClinicaConfiguracoesComponent_Conditional_3_Conditional_214_Template, 2, 0, "p", 76)(215, ClinicaConfiguracoesComponent_Conditional_3_Conditional_215_Template, 4, 1)(216, ClinicaConfiguracoesComponent_Conditional_3_Conditional_216_Template, 4, 2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(217, "div", 77)(218, "div", 72)(219, "div", 73)(220, "div", 74)(221, "span", 19);
    \u0275\u0275text(222, "history");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(223, "div")(224, "h1");
    \u0275\u0275text(225, "Logs de auditoria");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(226, "p", 75);
    \u0275\u0275text(227, "A\xE7\xF5es realizadas nesta empresa");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275conditionalCreate(228, ClinicaConfiguracoesComponent_Conditional_3_Conditional_228_Template, 2, 0, "p", 76)(229, ClinicaConfiguracoesComponent_Conditional_3_Conditional_229_Template, 1, 0, "zm-assinatura-bloqueada-card", 78)(230, ClinicaConfiguracoesComponent_Conditional_3_Conditional_230_Template, 2, 1, "p", 4)(231, ClinicaConfiguracoesComponent_Conditional_3_Conditional_231_Template, 15, 1, "div", 79);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275classProp("active", ctx_r1.activeTab === "dados");
    \u0275\u0275advance(4);
    \u0275\u0275classProp("active", ctx_r1.activeTab === "visual");
    \u0275\u0275advance(4);
    \u0275\u0275classProp("active", ctx_r1.activeTab === "whatsapp");
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx_r1.canAddMultiEmpresa ? 15 : -1);
    \u0275\u0275advance();
    \u0275\u0275classProp("active", ctx_r1.activeTab === "logs");
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx_r1.erro ? 20 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.sucesso ? 21 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.showStickyFooter ? 23 : -1);
    \u0275\u0275advance();
    \u0275\u0275classProp("active", ctx_r1.activeTab === "dados");
    \u0275\u0275advance(14);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.name);
    \u0275\u0275advance(7);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.notification_email);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.phone);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.address);
    \u0275\u0275advance(8);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.contact_email);
    \u0275\u0275advance(18);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.billing_name);
    \u0275\u0275advance(8);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.billing_email);
    \u0275\u0275advance(10);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.billing_document);
    \u0275\u0275advance(19);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.whatsapp_notifications_enabled);
    \u0275\u0275advance(7);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.whatsapp_notify_cobranca);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.whatsapp_notify_faturas_boleto);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.whatsapp_notify_avisos);
    \u0275\u0275advance(13);
    \u0275\u0275repeater(ctx_r1.days);
    \u0275\u0275advance(13);
    \u0275\u0275conditional((ctx_r1.clinic == null ? null : ctx_r1.clinic.logo_url) ? 155 : -1);
    \u0275\u0275advance(12);
    \u0275\u0275conditional(ctx_r1.logoFile ? 167 : -1);
    \u0275\u0275advance();
    \u0275\u0275classProp("active", ctx_r1.activeTab === "visual");
    \u0275\u0275advance(12);
    \u0275\u0275repeater(ctx_r1.themeKeys);
    \u0275\u0275advance(17);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.dark_mode);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r1.showStickyFooter ? 200 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.showStickyFooter ? 201 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.canAddMultiEmpresa ? 202 : -1);
    \u0275\u0275advance();
    \u0275\u0275classProp("active", ctx_r1.activeTab === "whatsapp");
    \u0275\u0275advance(11);
    \u0275\u0275conditional(ctx_r1.waLoading ? 214 : ctx_r1.waError && !ctx_r1.waState ? 215 : ctx_r1.waState ? 216 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275classProp("active", ctx_r1.activeTab === "logs");
    \u0275\u0275advance(11);
    \u0275\u0275conditional(ctx_r1.logsLoading ? 228 : ctx_r1.logsErroCobranca ? 229 : ctx_r1.logsError ? 230 : 231);
  }
}
function ClinicaConfiguracoesComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 4);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.erro);
  }
}
var DAYS = [
  { id: "1", label: "Segunda" },
  { id: "2", label: "Ter\xE7a" },
  { id: "3", label: "Quarta" },
  { id: "4", label: "Quinta" },
  { id: "5", label: "Sexta" },
  { id: "6", label: "S\xE1bado" },
  { id: "7", label: "Domingo" }
];
var ClinicaConfiguracoesComponent = class _ClinicaConfiguracoesComponent {
  pageData = null;
  form = {};
  showSkeleton;
  listaPronta = false;
  salvando = false;
  erro = "";
  sucesso = false;
  activeTab = "dados";
  logoFile = null;
  days = DAYS;
  novaEmpresaNome = "";
  salvandoNovaEmpresa = false;
  erroNovaEmpresa = "";
  // Logs
  logs = [];
  logsLoading = false;
  logsLoaded = false;
  logsError = "";
  /** API retornou 403 billing_blocked — assinatura/pagamento pendente. */
  logsErroCobranca = false;
  logsPage = 1;
  logsLastPage = 1;
  logsTotal = 0;
  /** Aba WhatsApp (Evolution Go) */
  waState = null;
  waLoading = false;
  waError = "";
  waNovaInstanciaNome = "";
  waNovaInstanciaToken = "";
  waCriandoInstancia = false;
  waTokenExibicaoUnica = null;
  waPhoneConectar = "";
  waWebhookUrl = "";
  waConectando = false;
  waQrSrc = null;
  waQrLinkCode = null;
  waQrCarregando = false;
  waPhonePair = "";
  waPairCarregando = false;
  waPairingCode = null;
  waDesconectando = false;
  waRemovendo = false;
  waTestPhone = "";
  waTestText = "";
  waTestEnviando = false;
  route = inject(ActivatedRoute);
  clinicaService = inject(ClinicaService);
  loadingService = inject(LoadingService);
  toast = inject(ToastService);
  waService = inject(WhatsappEvolutionService);
  confirm = inject(ConfirmDialogService);
  get clinic() {
    return this.pageData?.organization ?? this.pageData?.clinic;
  }
  get availableThemes() {
    return this.pageData?.available_themes ?? {};
  }
  get canAddMultiEmpresa() {
    return !!this.pageData?.can_add_multi_empresa;
  }
  get tenantClinics() {
    return this.pageData?.tenant_organizations ?? this.pageData?.tenant_clinics ?? [];
  }
  get showStickyFooter() {
    return this.activeTab !== "empresas" && this.activeTab !== "logs" && this.activeTab !== "whatsapp";
  }
  get themeKeys() {
    return Object.keys(this.availableThemes);
  }
  traduzirAcao(action) {
    if (!action)
      return "";
    const map2 = {
      "clinic.created": "Empresa criada",
      "clinic.updated": "Empresa atualizada",
      "user.created": "Usu\xE1rio criado",
      "user.deactivated": "Usu\xE1rio desativado",
      "template.created": "Modelo criado",
      "template.updated": "Modelo atualizado",
      "template.deleted": "Modelo exclu\xEDdo",
      "submission.created": "Protocolo criado",
      "submission.reviewed": "Protocolo revisado",
      "submission.comment": "Coment\xE1rio em protocolo"
    };
    if (map2[action])
      return map2[action];
    return action.replace(/\./g, " ");
  }
  traduzirEntidade(entityType) {
    if (!entityType)
      return "";
    const basename = entityType.split("\\").pop() ?? entityType;
    const map2 = {
      FormSubmission: "Protocolo",
      User: "Usu\xE1rio",
      FormTemplate: "Modelo de formul\xE1rio",
      Clinic: "Empresa",
      Organization: "Empresa"
    };
    return map2[basename] ?? basename;
  }
  ngOnInit() {
    const rawTab = this.route.snapshot.queryParamMap.get("tab");
    const tabQ = rawTab === "assinatura" ? null : rawTab;
    const pageQuery = tabQ ? { tab: tabQ } : void 0;
    const { data$, showSkeleton } = this.loadingService.loadWithThreshold(this.clinicaService.getConfiguracoesPage(pageQuery));
    this.showSkeleton = showSkeleton;
    data$.subscribe({
      next: (data) => {
        this.listaPronta = true;
        this.pageData = data;
        let tab = data.active_config_tab ?? "dados";
        if (tab === "assinatura")
          tab = "dados";
        this.activeTab = tab;
        this.patchFormFromClinic(data.organization ?? data.clinic);
      },
      error: () => {
        this.listaPronta = true;
        this.erro = "N\xE3o foi poss\xEDvel carregar as configura\xE7\xF5es.";
      }
    });
  }
  patchFormFromClinic(c) {
    const bh = c.business_hours ?? {};
    const businessHours = {};
    DAYS.forEach((d) => {
      const slot = bh[d.id] ?? bh[d.id];
      businessHours[d.id] = {
        open: slot?.open ?? "",
        close: slot?.close ?? ""
      };
    });
    this.form = {
      name: c.name ?? "",
      notification_email: c.notification_email ?? "",
      contact_email: c.contact_email ?? "",
      phone: c.phone ?? "",
      address: c.address ?? "",
      billing_name: c.billing_name ?? "",
      billing_email: c.billing_email ?? "",
      billing_document: c.billing_document ?? "",
      business_hours: businessHours,
      whatsapp_notifications_enabled: c.whatsapp_notifications_enabled ?? false,
      whatsapp_notify_cobranca: c.whatsapp_notify_cobranca ?? true,
      whatsapp_notify_faturas_boleto: c.whatsapp_notify_faturas_boleto ?? true,
      whatsapp_notify_avisos: c.whatsapp_notify_avisos ?? true,
      theme: c.theme ?? "ocean-blue",
      dark_mode: c.dark_mode ?? false
    };
  }
  setTab(tab) {
    this.activeTab = tab;
    if (tab === "logs") {
      this.carregarLogs();
    }
    if (tab === "whatsapp") {
      this.carregarWhatsapp();
    }
  }
  carregarWhatsapp() {
    this.waLoading = true;
    this.waError = "";
    this.waService.getState().subscribe({
      next: (s) => {
        this.waState = s;
        this.waLoading = false;
      },
      error: (err) => {
        this.waLoading = false;
        this.waError = this.mensagemErroWhatsapp(err);
      }
    });
  }
  criarInstanciaWhatsapp() {
    if (this.waCriandoInstancia)
      return;
    this.waCriandoInstancia = true;
    this.waError = "";
    const name = this.waNovaInstanciaNome.trim();
    const token = this.waNovaInstanciaToken.trim();
    const payload = {};
    if (name)
      payload.name = name;
    if (token)
      payload.token = token;
    this.waService.createInstance(Object.keys(payload).length ? payload : void 0).pipe(finalize(() => this.waCriandoInstancia = false)).subscribe({
      next: (res) => {
        this.waTokenExibicaoUnica = res.instance_token;
        this.waNovaInstanciaNome = "";
        this.waNovaInstanciaToken = "";
        this.toast.success("Inst\xE2ncia criada", "Guarde o token com seguran\xE7a. Ele n\xE3o ser\xE1 exibido de novo nesta tela.");
        this.carregarWhatsapp();
      },
      error: (err) => {
        this.waError = this.mensagemErroWhatsapp(err);
        this.toast.error("Erro", this.waError);
      }
    });
  }
  iniciarConexaoWhatsapp() {
    if (this.waConectando)
      return;
    this.waConectando = true;
    this.waError = "";
    const phone = this.waPhoneConectar.replace(/\D/g, "");
    const webhook = this.waWebhookUrl.trim();
    this.waService.connect({
      phone: phone || void 0,
      webhook_url: webhook || void 0
    }).pipe(finalize(() => this.waConectando = false)).subscribe({
      next: () => {
        this.toast.success("Conex\xE3o iniciada", "Obtenha o QR Code ou o c\xF3digo de pareamento abaixo.");
        this.carregarWhatsapp();
      },
      error: (err) => {
        this.waError = this.mensagemErroWhatsapp(err);
        this.toast.error("Erro", this.waError);
      }
    });
  }
  buscarQrWhatsapp() {
    if (this.waQrCarregando)
      return;
    this.waQrCarregando = true;
    this.waQrSrc = null;
    this.waQrLinkCode = null;
    this.waError = "";
    this.waService.getQr().pipe(finalize(() => this.waQrCarregando = false)).subscribe({
      next: (d) => {
        this.waQrSrc = this.normalizarQrDataUrl(d.qrcode);
        this.waQrLinkCode = d.link_code ?? null;
        if (!this.waQrSrc && d.link_code) {
          this.toast.success("C\xF3digo obtido", "Use o c\xF3digo no WhatsApp se o QR n\xE3o estiver dispon\xEDvel.");
        }
      },
      error: (err) => {
        this.waError = this.mensagemErroWhatsapp(err);
        this.toast.error("Erro", this.waError);
      }
    });
  }
  solicitarPairWhatsapp() {
    const phone = this.waPhonePair.replace(/\D/g, "");
    if (phone.length < 10) {
      this.toast.error("N\xFAmero inv\xE1lido", "Informe DDI + DDD + n\xFAmero (ex.: 5511999999999).");
      return;
    }
    if (this.waPairCarregando)
      return;
    this.waPairCarregando = true;
    this.waPairingCode = null;
    this.waError = "";
    this.waService.requestPair(phone).pipe(finalize(() => this.waPairCarregando = false)).subscribe({
      next: (r) => {
        this.waPairingCode = r.pairing_code;
        if (!r.pairing_code) {
          this.toast.success("Solicita\xE7\xE3o enviada", "Verifique a resposta no servidor ou tente novamente.");
        }
      },
      error: (err) => {
        this.waError = this.mensagemErroWhatsapp(err);
        this.toast.error("Erro", this.waError);
      }
    });
  }
  copiarTextoWhatsapp(text) {
    return __async(this, null, function* () {
      try {
        yield navigator.clipboard.writeText(text);
        this.toast.success("Copiado", "Conte\xFAdo copiado para a \xE1rea de transfer\xEAncia.");
      } catch {
        this.toast.error("N\xE3o foi poss\xEDvel copiar", "Copie manualmente.");
      }
    });
  }
  desconectarWhatsapp() {
    if (this.waDesconectando)
      return;
    this.waDesconectando = true;
    this.waError = "";
    this.waService.disconnect().pipe(finalize(() => this.waDesconectando = false)).subscribe({
      next: () => {
        this.waQrSrc = null;
        this.waPairingCode = null;
        this.toast.success("Desconectado", "A sess\xE3o WhatsApp foi encerrada na Evolution Go.");
        this.carregarWhatsapp();
      },
      error: (err) => {
        this.waError = this.mensagemErroWhatsapp(err);
        this.toast.error("Erro", this.waError);
      }
    });
  }
  removerIntegracaoWhatsapp() {
    return __async(this, null, function* () {
      const ok = yield this.confirm.request({
        title: "Remover integra\xE7\xE3o WhatsApp",
        messageBefore: "A inst\xE2ncia ser\xE1 exclu\xEDda na Evolution Go e os dados de conex\xE3o desta empresa ser\xE3o apagados.",
        variant: "danger",
        confirmLabel: "Remover"
      });
      if (!ok || this.waRemovendo)
        return;
      this.waRemovendo = true;
      this.waError = "";
      this.waService.destroyInstance().pipe(finalize(() => this.waRemovendo = false)).subscribe({
        next: () => {
          this.waTokenExibicaoUnica = null;
          this.waQrSrc = null;
          this.waPairingCode = null;
          this.waState = null;
          this.toast.success("Removido", "Integra\xE7\xE3o WhatsApp removida.");
          this.carregarWhatsapp();
        },
        error: (err) => {
          this.waError = this.mensagemErroWhatsapp(err);
          this.toast.error("Erro", this.waError);
        }
      });
    });
  }
  enviarTesteWhatsapp() {
    const phone = this.waTestPhone.replace(/\D/g, "");
    if (phone.length < 10) {
      this.toast.error("N\xFAmero inv\xE1lido", "Informe o destino com DDI e DDD.");
      return;
    }
    if (this.waTestEnviando)
      return;
    this.waTestEnviando = true;
    this.waError = "";
    const text = this.waTestText.trim();
    this.waService.sendTest(phone, text || void 0).pipe(finalize(() => this.waTestEnviando = false)).subscribe({
      next: () => this.toast.success("Enviado", "Mensagem de teste enviada."),
      error: (err) => {
        this.waError = this.mensagemErroWhatsapp(err);
        this.toast.error("Erro", this.waError);
      }
    });
  }
  normalizarQrDataUrl(raw) {
    if (!raw)
      return null;
    const t = raw.trim();
    if (t.startsWith("data:"))
      return t;
    return `data:image/png;base64,${t}`;
  }
  mensagemErroWhatsapp(err) {
    if (err instanceof HttpErrorResponse) {
      const b = err.error;
      if (typeof b?.message === "string" && b.message.trim())
        return b.message.trim();
      if (err.status === 503)
        return "Servidor Evolution Go n\xE3o configurado. Contate o administrador.";
    }
    return "N\xE3o foi poss\xEDvel concluir a opera\xE7\xE3o. Tente novamente.";
  }
  /** Atualiza horário (abre/fecha) a partir da seleção do Flatpickr. */
  setTime(dayId, field, dates) {
    if (!this.form.business_hours || !dates?.length)
      return;
    const d = dates[0];
    const h = d.getHours().toString().padStart(2, "0");
    const m = d.getMinutes().toString().padStart(2, "0");
    this.form.business_hours[dayId][field] = `${h}:${m}`;
  }
  carregarLogs(page = 1) {
    this.logsLoading = true;
    this.logsError = "";
    this.logsErroCobranca = false;
    this.clinicaService.getClinicaLogs(page).subscribe({
      next: (res) => {
        this.logsLoading = false;
        this.logsLoaded = true;
        this.logsErroCobranca = false;
        this.logs = (res.data ?? []).map((log) => __spreadProps(__spreadValues({}, log), {
          action: this.traduzirAcao(log.action),
          entity_type: this.traduzirEntidade(log.entity_type ?? void 0)
        }));
        this.logsPage = res.meta?.current_page ?? 1;
        this.logsLastPage = res.meta?.last_page ?? 1;
        this.logsTotal = res.meta?.total ?? this.logs.length;
      },
      error: (err) => {
        this.logsLoading = false;
        this.logsLoaded = true;
        if (isBillingBlockedError(err)) {
          this.logsErroCobranca = true;
          this.logsError = "";
          return;
        }
        this.logsErroCobranca = false;
        const http = err instanceof HttpErrorResponse ? err : null;
        const apiMsg = http?.error?.message;
        this.logsError = typeof apiMsg === "string" && apiMsg.trim() ? apiMsg.trim() : "N\xE3o foi poss\xEDvel carregar os logs. Tente novamente em instantes.";
      }
    });
  }
  isScheduleActive(dayId) {
    const slot = this.form.business_hours?.[dayId];
    return !!(slot && (slot.open || slot.close));
  }
  toggleScheduleDay(dayId, checked) {
    if (!this.form.business_hours)
      this.form.business_hours = {};
    if (checked) {
      this.form.business_hours[dayId] = { open: "08:00", close: "18:00" };
    } else {
      this.form.business_hours[dayId] = { open: "", close: "" };
    }
  }
  copyFirstDayToAll() {
    const first = this.form.business_hours?.["1"];
    if (!first)
      return;
    const open = first.open || "08:00";
    const close = first.close || "18:00";
    DAYS.forEach((d) => {
      if (d.id === "1")
        return;
      if (!this.form.business_hours)
        this.form.business_hours = {};
      this.form.business_hours[d.id] = { open, close };
    });
  }
  onLogoChange(event) {
    const input = event.target;
    this.logoFile = input.files?.[0] ?? null;
  }
  criarNovaEmpresa() {
    const nome = this.novaEmpresaNome.trim();
    if (!nome || this.salvandoNovaEmpresa)
      return;
    this.erroNovaEmpresa = "";
    this.salvandoNovaEmpresa = true;
    this.clinicaService.createClinicInTenant(nome).pipe(finalize(() => this.salvandoNovaEmpresa = false)).subscribe({
      next: (data) => {
        this.pageData = data;
        this.novaEmpresaNome = "";
        this.patchFormFromClinic(data.organization ?? data.clinic);
        this.toast.success("Empresa criada", 'A nova empresa foi adicionada ao grupo. Voc\xEA pode trocar para ela em "Escolher empresa".');
      },
      error: (err) => {
        const msg = this.mensagemErroApi(err);
        this.erroNovaEmpresa = msg;
        this.toast.error("N\xE3o foi poss\xEDvel criar", msg);
      }
    });
  }
  mensagemErroApi(err) {
    if (err instanceof HttpErrorResponse) {
      const b = err.error;
      if (b?.errors) {
        const first = Object.values(b.errors)[0];
        if (Array.isArray(first) && first[0])
          return String(first[0]);
      }
      if (typeof b?.message === "string" && b.message.trim())
        return b.message;
      if (err.status === 404)
        return "Endpoint n\xE3o encontrado. Confirme no backend a rota POST /api/v1/clinica/clinics.";
    }
    return "N\xE3o foi poss\xEDvel criar a empresa.";
  }
  salvar() {
    this.salvando = true;
    this.erro = "";
    this.sucesso = false;
    const bh = this.form.business_hours ?? {};
    const cleaned = {};
    Object.entries(bh).forEach(([d, slot]) => {
      const open = (slot?.open ?? "").trim();
      const close = (slot?.close ?? "").trim();
      if (open && close)
        cleaned[d] = { open, close };
    });
    const payload = {
      name: this.form.name,
      notification_email: this.form.notification_email ?? null,
      contact_email: this.form.contact_email ?? null,
      phone: this.form.phone ?? null,
      address: this.form.address ?? null,
      billing_name: this.form.billing_name ?? null,
      billing_email: this.form.billing_email ?? null,
      billing_document: this.form.billing_document ?? null,
      business_hours: Object.keys(cleaned).length ? cleaned : null,
      whatsapp_notifications_enabled: !!this.form.whatsapp_notifications_enabled,
      whatsapp_notify_cobranca: !!this.form.whatsapp_notify_cobranca,
      whatsapp_notify_faturas_boleto: !!this.form.whatsapp_notify_faturas_boleto,
      whatsapp_notify_avisos: !!this.form.whatsapp_notify_avisos,
      theme: this.form.theme ?? void 0,
      dark_mode: !!this.form.dark_mode
    };
    this.clinicaService.updateConfiguracoes(payload, this.logoFile ?? void 0).subscribe({
      next: (updated) => {
        this.salvando = false;
        this.sucesso = true;
        this.logoFile = null;
        if (this.pageData) {
          const cur = this.pageData.organization ?? this.pageData.clinic;
          if (cur)
            this.pageData.organization = __spreadValues(__spreadValues({}, cur), updated);
        }
        this.patchFormFromClinic(updated);
        this.toast.success("Configura\xE7\xF5es salvas", "As altera\xE7\xF5es da empresa foram gravadas.");
      },
      error: () => {
        this.salvando = false;
        this.erro = "N\xE3o foi poss\xEDvel salvar.";
        this.toast.error("Erro ao salvar", this.erro);
      }
    });
  }
  progressFilled() {
    const f = this.form;
    let n = 0;
    if ((f.name ?? "").trim())
      n++;
    if ((f.notification_email ?? "").trim())
      n++;
    if ((f.address ?? "").trim())
      n++;
    if ((f.phone ?? "").trim())
      n++;
    if ((f.contact_email ?? "").trim())
      n++;
    return Math.min(8, n);
  }
  static \u0275fac = function ClinicaConfiguracoesComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ClinicaConfiguracoesComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ClinicaConfiguracoesComponent, selectors: [["app-clinica-configuracoes"]], features: [\u0275\u0275ProvidersFeature([
    provideFlatpickrDefaults({
      locale: import_pt.Portuguese,
      static: true,
      allowInput: true,
      disableMobile: true
    })
  ])], decls: 5, vars: 2, consts: [["logoInput", ""], [1, "relative", "min-h-[320px]"], [3, "rows"], [1, "zm-content-enter"], [1, "text-sm", 2, "color", "var(--c-error, #dc2626)"], [1, "clinica-config"], ["role", "tablist", 1, "config-tabs"], ["type", "button", "role", "tab", 1, "config-tab", 3, "click"], [1, "material-symbols-outlined", 2, "font-size", "1rem", "vertical-align", "middle", "margin-right", "4px"], ["type", "button", "role", "tab", 1, "config-tab", 3, "active"], ["type", "button", "role", "tab", 1, "config-tab", 2, "text-decoration", "none", 3, "click"], [1, "text-sm", "mb-4", 2, "color", "var(--c-error, #dc2626)"], [1, "text-sm", "mb-4", 2, "color", "var(--c-success, #22c55e)"], ["id", "clinica-config-form", 3, "ngSubmit"], ["id", "config-progress-block", 1, "config-progress"], ["id", "panel-dados", "role", "tabpanel", 1, "config-panel"], [1, "section-card"], [1, "section-header"], [1, "icon-wrap"], [1, "material-symbols-outlined"], [1, "section-title"], [1, "section-body"], [1, "field"], [1, "req"], ["type", "text", "name", "name", "required", "", "placeholder", "Nome da sua empresa", 1, "form-input", 3, "ngModelChange", "ngModel"], [1, "field-row"], ["type", "email", "name", "notification_email", "placeholder", "recepcao@empresa.com", 1, "form-input", 3, "ngModelChange", "ngModel"], ["type", "text", "name", "phone", "placeholder", "(11) 99999-9999", "maxlength", "16", 1, "form-input", 3, "ngModelChange", "ngModel"], ["type", "text", "name", "address", "placeholder", "Endere\xE7o completo", 1, "form-input", 3, "ngModelChange", "ngModel"], [1, "hint"], [1, "opt"], ["type", "email", "name", "contact_email", "placeholder", "contato@empresa.com", 1, "form-input", 3, "ngModelChange", "ngModel"], [2, "margin-left", "auto", "font-size", "11px", "color", "var(--c-muted)"], ["type", "text", "name", "billing_name", "placeholder", "Nome ou raz\xE3o social", 1, "form-input", 3, "ngModelChange", "ngModel"], ["type", "email", "name", "billing_email", "placeholder", "financeiro@empresa.com", 1, "form-input", 3, "ngModelChange", "ngModel"], ["type", "text", "name", "billing_document", "placeholder", "000.000.000-00 ou 00.000.000/0001-00", "maxlength", "18", 1, "form-input", 3, "ngModelChange", "ngModel"], [1, "field", 2, "margin-bottom", "16px"], [1, "dark-toggle-card", 2, "display", "flex", "align-items", "center", "justify-content", "space-between", "cursor", "pointer", "margin-bottom", "0"], [1, "dtitle"], [1, "dsub"], [1, "toggle-wrap", 2, "position", "relative", "width", "44px", "height", "24px", "flex-shrink", "0"], ["type", "checkbox", "name", "whatsapp_notifications_enabled", 2, "opacity", "0", "position", "absolute", "width", "0", "height", "0", 3, "ngModelChange", "ngModel"], [1, "toggle-track", 2, "position", "absolute", "inset", "0", "background", "var(--c-border)", "border-radius", "999px"], [1, "toggle-thumb", 2, "position", "absolute", "top", "3px", "left", "3px", "width", "18px", "height", "18px", "background", "#fff", "border-radius", "50%", "box-shadow", "0 1px 3px rgba(0,0,0,.2)"], [2, "padding-left", "4px", "border-left", "2px solid var(--c-soft)", "margin-top", "12px"], [2, "font-size", "12px", "color", "var(--c-muted)", "margin-bottom", "10px"], [2, "display", "flex", "align-items", "center", "gap", "8px", "margin-bottom", "8px", "cursor", "pointer", "font-size", "13px", "color", "var(--c-text)"], ["type", "checkbox", "name", "whatsapp_notify_cobranca", 3, "ngModelChange", "ngModel"], ["type", "checkbox", "name", "whatsapp_notify_faturas_boleto", 3, "ngModelChange", "ngModel"], [2, "display", "flex", "align-items", "center", "gap", "8px", "margin-bottom", "0", "cursor", "pointer", "font-size", "13px", "color", "var(--c-text)"], ["type", "checkbox", "name", "whatsapp_notify_avisos", 3, "ngModelChange", "ngModel"], [1, "schedule-grid"], [1, "schedule-row", 3, "active"], [2, "margin-top", "10px", "display", "flex", "justify-content", "flex-end"], ["type", "button", 1, "copy-schedule-btn", 3, "click"], [2, "display", "flex", "align-items", "center", "gap", "10px", "margin-bottom", "12px"], [1, "upload-zone", 3, "click"], [1, "upload-label"], [2, "color", "var(--c-primary)"], [1, "upload-hint"], ["type", "file", "accept", "image/*", 1, "sr-only", 3, "change"], [1, "text-xs", "mt-2", 2, "color", "var(--c-muted)"], ["id", "panel-visual", "role", "tabpanel", 1, "config-panel"], [1, "theme-grid"], [1, "theme-card", 3, "selected"], [1, "dark-toggle-card"], [1, "dark-toggle-info"], ["type", "checkbox", "name", "dark_mode", 2, "opacity", "0", "width", "0", "height", "0", 3, "ngModelChange", "ngModel"], ["aria-hidden", "true", 1, "sticky-footer-spacer"], [1, "sticky-footer"], ["id", "panel-empresas", "role", "tabpanel", 1, "config-panel", 3, "active"], ["id", "panel-whatsapp", "role", "tabpanel", 1, "config-panel"], [1, "page-header", "mb-4"], [1, "page-title"], [1, "page-title-icon"], [1, "page-header-subtitle"], [1, "text-sm", 2, "color", "var(--c-muted)"], ["id", "panel-logs", "role", "tabpanel", 1, "config-panel"], ["titulo", "Logs indispon\xEDveis at\xE9 regularizar a cobran\xE7a", "descricao", "Com assinatura pendente ou conta bloqueada por pagamento, o hist\xF3rico de auditoria n\xE3o \xE9 exibido. Depois que o pagamento for confirmado, os registros passam a aparecer nesta aba."], [1, "table-card"], [2, "display", "flex", "justify-content", "space-between", "align-items", "center", "margin-bottom", "6px"], [2, "font-size", "12px", "font-weight", "600", "color", "var(--c-muted)"], ["id", "progress-text", 2, "font-size", "11px", "color", "var(--c-primary)"], [1, "config-progress-bar"], [1, "fill"], [1, "schedule-row"], [1, "day-label"], [1, "toggle-wrap", 2, "position", "relative", "width", "34px", "height", "18px", "flex-shrink", "0"], ["type", "checkbox", 2, "opacity", "0", "width", "0", "height", "0", 3, "change", "checked"], [1, "toggle-track", 2, "position", "absolute", "inset", "0", "background", "var(--c-border)", "border-radius", "999px", "cursor", "pointer"], [1, "toggle-thumb", 2, "position", "absolute", "top", "2px", "left", "2px", "width", "14px", "height", "14px", "background", "#fff", "border-radius", "50%", "pointer-events", "none", "box-shadow", "0 1px 3px rgba(0,0,0,.2)"], [2, "display", "flex", "align-items", "center", "gap", "6px", "flex", "1", "flex-wrap", "wrap"], [1, "closed-tag"], [2, "font-size", "10px", "color", "var(--c-muted)"], ["type", "text", "mwlFlatpickr", "", "placeholder", "08:00", 1, "time-input", "form-input", 3, "ngModelChange", "flatpickrChange", "ngModel", "name", "enableTime", "noCalendar", "dateFormat", "time24hr", "static"], [2, "font-size", "11px", "color", "var(--c-muted)"], ["type", "text", "mwlFlatpickr", "", "placeholder", "18:00", 1, "time-input", "form-input", 3, "ngModelChange", "flatpickrChange", "ngModel", "name", "enableTime", "noCalendar", "dateFormat", "time24hr", "static"], ["alt", "Logo", 2, "height", "40px", "border-radius", "8px", "border", "1px solid var(--c-border)", "object-fit", "contain", "padding", "4px", "background", "var(--c-soft)", 3, "src"], [2, "font-size", "12px", "color", "var(--c-muted)"], [1, "theme-card"], ["type", "radio", 1, "sr-only", 3, "ngModelChange", "value", "ngModel", "name"], [1, "theme-preview"], [1, "bar", 2, "height", "12px", "border-radius", "2px", "width", "5px", "flex-shrink", "0"], [1, "bar", 2, "height", "18px", "border-radius", "2px", "width", "5px", "flex-shrink", "0"], [1, "bar", 2, "height", "24px", "border-radius", "2px", "width", "5px", "flex-shrink", "0"], [1, "theme-dot"], [1, "theme-name"], [1, "footer-btns"], ["routerLink", "/dashboard", 1, "btn-secondary"], [1, "material-symbols-outlined", 2, "font-size", "16px"], ["type", "submit", 1, "btn-primary", "inline-flex", "items-center", "gap-2", 3, "disabled"], ["aria-hidden", "true", 1, "btn-spinner"], ["id", "panel-empresas", "role", "tabpanel", 1, "config-panel"], [2, "font-size", "13px", "color", "var(--c-muted)", "margin-bottom", "16px"], [2, "list-style", "none", "padding", "0", "margin", "0 0 20px 0"], [2, "border-top", "1px solid var(--c-border)", "padding-top", "20px", "margin-top", "8px"], [2, "font-size", "12px", "font-weight", "600", "color", "var(--c-muted)", "margin-bottom", "12px", "text-transform", "uppercase", "letter-spacing", "0.05em"], [1, "field", 2, "margin-bottom", "12px"], ["for", "nova-empresa-nome"], ["id", "nova-empresa-nome", "type", "text", "name", "novaEmpresaNome", "maxlength", "120", "placeholder", "Ex.: Filial Centro", "autocomplete", "organization", 1, "form-input", 3, "ngModelChange", "keydown.enter", "ngModel"], [1, "text-sm", "mb-3", 2, "color", "var(--c-error, #dc2626)"], [2, "display", "flex", "flex-wrap", "wrap", "gap", "10px", "align-items", "center"], ["type", "button", 1, "btn-primary", "inline-flex", "items-center", "gap-2", 3, "click", "disabled"], ["routerLink", "/clinica/escolher", 1, "text-sm", 2, "color", "var(--c-primary)", "text-decoration", "none"], [2, "display", "flex", "align-items", "center", "gap", "10px", "padding", "12px 0", "border-bottom", "1px solid var(--c-border)"], [1, "material-symbols-outlined", 2, "font-size", "20px", "color", "var(--c-muted)"], [2, "flex", "1", "font-weight", "500", "color", "var(--c-text)"], [2, "font-size", "11px", "font-weight", "600", "color", "var(--c-primary)", "background", "color-mix(in srgb, var(--c-primary) 12%, transparent)", "padding", "4px 8px", "border-radius", "6px"], ["routerLink", "/clinica/escolher", 2, "font-size", "12px", "color", "var(--c-primary)"], ["type", "button", 1, "btn-secondary", 3, "click"], [1, "section-card", "mb-4"], [2, "font-size", "14px", "color", "var(--c-text)", "margin", "0 0 8px 0"], [2, "font-size", "12px"], ["for", "wa-nome-instancia"], ["id", "wa-nome-instancia", "type", "text", "name", "waNovaInstanciaNome", "maxlength", "64", "placeholder", "Ex.: minha-clinica", "autocomplete", "off", "pattern", "[a-zA-Z0-9_-]*", 1, "form-input", 3, "ngModelChange", "ngModel"], ["for", "wa-token-instancia"], ["id", "wa-token-instancia", "type", "text", "name", "waNovaInstanciaToken", "maxlength", "128", "placeholder", "Deixe vazio para gerar automaticamente", "autocomplete", "off", 1, "form-input", 3, "ngModelChange", "ngModel"], [1, "section-card", "mb-4", 2, "border-color", "color-mix(in srgb, var(--c-success, #22c55e) 35%, var(--c-border))"], [2, "font-size", "14px", "margin", "0 0 8px 0"], [2, "font-size", "13px", "color", "var(--c-muted)", "margin", "0 0 8px 0"], [2, "color", "var(--c-success,#22c55e)", "font-weight", "600"], [2, "font-weight", "600"], [2, "font-size", "12px", "color", "var(--c-error,#dc2626)", "margin", "0"], [2, "font-size", "13px", "color", "var(--c-muted)", "margin-bottom", "12px"], ["for", "wa-phone-conectar"], ["id", "wa-phone-conectar", "type", "text", "name", "waPhoneConectar", "placeholder", "5511999999999", "autocomplete", "tel", 1, "form-input", 3, "ngModelChange", "ngModel"], ["for", "wa-webhook"], ["id", "wa-webhook", "type", "url", "name", "waWebhookUrl", "placeholder", "https://\u2026", 1, "form-input", 3, "ngModelChange", "ngModel"], [2, "display", "flex", "flex-wrap", "wrap", "gap", "10px", "margin-bottom", "20px"], ["type", "button", 1, "btn-secondary", "inline-flex", "items-center", "gap-2", 3, "click", "disabled"], [2, "margin-bottom", "16px"], [2, "border-top", "1px solid var(--c-border)", "padding-top", "16px", "margin-top", "16px"], [2, "font-size", "12px", "font-weight", "600", "color", "var(--c-muted)", "margin-bottom", "8px"], ["for", "wa-phone-pair"], ["id", "wa-phone-pair", "type", "text", "name", "waPhonePair", "placeholder", "5511999999999", "autocomplete", "tel", 1, "form-input", 3, "ngModelChange", "ngModel"], ["type", "button", 1, "btn-secondary", "inline-flex", "items-center", "gap-2", "mb-3", 3, "click", "disabled"], [2, "font-size", "24px", "font-weight", "700", "letter-spacing", "0.2em", "font-family", "monospace", "margin", "8px 0 0 0"], ["for", "wa-test-phone"], ["id", "wa-test-phone", "type", "text", "name", "waTestPhone", "placeholder", "5511987654321", "autocomplete", "tel", 1, "form-input", 3, "ngModelChange", "ngModel"], ["for", "wa-test-text"], ["id", "wa-test-text", "rows", "2", "name", "waTestText", "placeholder", "Mensagem de teste \u2014 Zion Med", 1, "form-input", 3, "ngModelChange", "ngModel"], [2, "display", "flex", "flex-wrap", "wrap", "gap", "10px"], ["type", "button", 1, "btn-secondary", 3, "click", "disabled"], ["type", "button", 1, "btn-secondary", 2, "color", "var(--c-error,#dc2626)", "border-color", "color-mix(in srgb,var(--c-error) 40%,var(--c-border))", 3, "click", "disabled"], [1, "material-symbols-outlined", 2, "color", "var(--c-success,#22c55e)"], [2, "font-size", "12px", "color", "var(--c-muted)", "margin-bottom", "8px"], [2, "display", "block", "font-size", "12px", "word-break", "break-all", "padding", "10px", "background", "var(--c-soft)", "border-radius", "8px", "margin-bottom", "10px"], ["alt", "QR Code WhatsApp", 2, "max-width", "260px", "height", "auto", "border-radius", "8px", "border", "1px solid var(--c-border)", 3, "src"], [2, "font-size", "12px", "color", "var(--c-muted)", "margin-bottom", "4px"], [2, "display", "block", "font-size", "11px", "word-break", "break-all", "padding", "8px", "background", "var(--c-soft)", "border-radius", "8px"], ["colspan", "4", 2, "text-align", "center", "padding", "3rem 1rem"], [1, "material-symbols-outlined", 2, "font-size", "36px", "color", "var(--c-border)", "display", "block", "margin-bottom", "8px"], [2, "font-size", "0.875rem", "color", "var(--c-muted)"], [2, "white-space", "nowrap", "color", "var(--c-muted)", "font-size", "0.8125rem"], [2, "display", "inline-flex", "align-items", "center", "gap", "4px", "font-size", "0.8rem", "font-weight", "600", "color", "var(--c-text)"], [1, "material-symbols-outlined", 2, "font-size", "16px", "color", "var(--c-primary)"], [2, "color", "var(--c-text)", "font-size", "0.875rem"], [2, "font-size", "0.8125rem", "color", "var(--c-muted)"], [2, "margin-right", "6px"]], template: function ClinicaConfiguracoesComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 1);
      \u0275\u0275conditionalCreate(1, ClinicaConfiguracoesComponent_Conditional_1_Template, 1, 1, "zm-skeleton-list", 2)(2, ClinicaConfiguracoesComponent_Conditional_2_Template, 0, 0)(3, ClinicaConfiguracoesComponent_Conditional_3_Template, 232, 40, "div", 3);
      \u0275\u0275conditionalCreate(4, ClinicaConfiguracoesComponent_Conditional_4_Template, 2, 1, "p", 4);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showSkeleton() ? 1 : !ctx.listaPronta ? 2 : ctx.pageData ? 3 : -1);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.listaPronta && !ctx.pageData && ctx.erro ? 4 : -1);
    }
  }, dependencies: [
    CommonModule,
    FormsModule,
    \u0275NgNoValidate,
    DefaultValueAccessor,
    CheckboxControlValueAccessor,
    RadioControlValueAccessor,
    NgControlStatus,
    NgControlStatusGroup,
    RequiredValidator,
    MaxLengthValidator,
    PatternValidator,
    NgModel,
    NgForm,
    RouterLink,
    ZmSkeletonListComponent,
    ZmAssinaturaBloqueadaCardComponent,
    FlatpickrDirective,
    DatePipe
  ], styles: ["\n\n/*# sourceMappingURL=clinica-configuracoes.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ClinicaConfiguracoesComponent, [{
    type: Component,
    args: [{ selector: "app-clinica-configuracoes", standalone: true, imports: [
      CommonModule,
      FormsModule,
      RouterLink,
      ZmSkeletonListComponent,
      ZmAssinaturaBloqueadaCardComponent,
      FlatpickrDirective
    ], providers: [
      provideFlatpickrDefaults({
        locale: import_pt.Portuguese,
        static: true,
        allowInput: true,
        disableMobile: true
      })
    ], template: `<div class="relative min-h-[320px]">\r
  @if (showSkeleton()) {\r
    <zm-skeleton-list [rows]="8" />\r
  } @else if (!listaPronta) {\r
  } @else if (pageData) {\r
    <div class="zm-content-enter">\r
    <div class="clinica-config">\r
      <div class="config-tabs" role="tablist">\r
        <button type="button" class="config-tab" [class.active]="activeTab === 'dados'" (click)="setTab('dados')" role="tab">\r
          <span class="material-symbols-outlined" style="font-size:1rem;vertical-align:middle;margin-right:4px">description</span>\r
          Dados Gerais\r
        </button>\r
        <button type="button" class="config-tab" [class.active]="activeTab === 'visual'" (click)="setTab('visual')" role="tab">\r
          <span class="material-symbols-outlined" style="font-size:1rem;vertical-align:middle;margin-right:4px">palette</span>\r
          Tema Visual\r
        </button>\r
        <button type="button" class="config-tab" [class.active]="activeTab === 'whatsapp'" (click)="setTab('whatsapp')" role="tab">\r
          <span class="material-symbols-outlined" style="font-size:1rem;vertical-align:middle;margin-right:4px">chat</span>\r
          WhatsApp\r
        </button>\r
        @if (canAddMultiEmpresa) {\r
          <button type="button" class="config-tab" [class.active]="activeTab === 'empresas'" (click)="setTab('empresas')" role="tab">\r
            <span class="material-symbols-outlined" style="font-size:1rem;vertical-align:middle;margin-right:4px">business_center</span>\r
            Empresas\r
          </button>\r
        }\r
        <button type="button" class="config-tab" [class.active]="activeTab === 'logs'" (click)="setTab('logs')" role="tab" style="text-decoration:none">\r
          <span class="material-symbols-outlined" style="font-size:1rem;vertical-align:middle;margin-right:4px">history</span>\r
          Logs\r
        </button>\r
      </div>\r
\r
      @if (erro) {\r
        <p class="text-sm mb-4" style="color: var(--c-error, #dc2626)">{{ erro }}</p>\r
      }\r
      @if (sucesso) {\r
        <p class="text-sm mb-4" style="color: var(--c-success, #22c55e)">Configura\xE7\xF5es salvas com sucesso.</p>\r
      }\r
\r
      <form (ngSubmit)="salvar()" id="clinica-config-form">\r
        @if (showStickyFooter) {\r
          <div class="config-progress" id="config-progress-block">\r
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">\r
              <span style="font-size:12px;font-weight:600;color:var(--c-muted)">Perfil da empresa</span>\r
              <span style="font-size:11px;color:var(--c-primary)" id="progress-text">{{ progressFilled() }} de 8 campos preenchidos</span>\r
            </div>\r
            <div class="config-progress-bar"><div class="fill" [style.width.%]="(progressFilled() / 8) * 100"></div></div>\r
          </div>\r
        }\r
\r
        <!-- Painel Dados Gerais -->\r
        <div id="panel-dados" class="config-panel" [class.active]="activeTab === 'dados'" role="tabpanel">\r
          <div class="section-card">\r
            <div class="section-header">\r
              <div class="icon-wrap"><span class="material-symbols-outlined">business</span></div>\r
              <span class="section-title">Informa\xE7\xF5es B\xE1sicas</span>\r
            </div>\r
            <div class="section-body">\r
              <div class="field">\r
                <label>Nome da empresa <span class="req">*</span></label>\r
                <input type="text" [(ngModel)]="form.name" name="name" required class="form-input" placeholder="Nome da sua empresa">\r
              </div>\r
              <div class="field-row">\r
                <div class="field">\r
                  <label>E-mail para notifica\xE7\xF5es <span class="req">*</span></label>\r
                  <input type="email" [(ngModel)]="form.notification_email" name="notification_email" class="form-input" placeholder="recepcao@empresa.com">\r
                </div>\r
                <div class="field">\r
                  <label>Telefone / WhatsApp</label>\r
                  <input type="text" [(ngModel)]="form.phone" name="phone" class="form-input" placeholder="(11) 99999-9999" maxlength="16">\r
                </div>\r
              </div>\r
              <div class="field">\r
                <label>Endere\xE7o</label>\r
                <input type="text" [(ngModel)]="form.address" name="address" class="form-input" placeholder="Endere\xE7o completo">\r
                <div class="hint">Aparece no cabe\xE7alho dos PDFs e na p\xE1gina do Link Bio.</div>\r
              </div>\r
              <div class="field">\r
                <label>E-mail de contato p\xFAblico <span class="opt">opcional</span></label>\r
                <input type="email" [(ngModel)]="form.contact_email" name="contact_email" class="form-input" placeholder="contato@empresa.com">\r
                <div class="hint">Exibido na p\xE1gina do Link Bio. Diferente do e-mail de notifica\xE7\xF5es.</div>\r
              </div>\r
            </div>\r
          </div>\r
\r
          <div class="section-card">\r
            <div class="section-header">\r
              <div class="icon-wrap"><span class="material-symbols-outlined">receipt_long</span></div>\r
              <span class="section-title">Dados para Faturamento</span>\r
              <span style="margin-left:auto;font-size:11px;color:var(--c-muted)">Necess\xE1rio para assinar planos</span>\r
            </div>\r
            <div class="section-body">\r
              <div class="field">\r
                <label>Nome/Raz\xE3o Social na nota <span class="opt">opcional</span></label>\r
                <input type="text" [(ngModel)]="form.billing_name" name="billing_name" class="form-input" placeholder="Nome ou raz\xE3o social">\r
                <div class="hint">Usado em boletos e faturas. Padr\xE3o: nome da empresa.</div>\r
              </div>\r
              <div class="field">\r
                <label>E-mail para boletos <span class="opt">opcional</span></label>\r
                <input type="email" [(ngModel)]="form.billing_email" name="billing_email" class="form-input" placeholder="financeiro@empresa.com">\r
                <div class="hint">Onde os boletos ser\xE3o enviados. Padr\xE3o: e-mail de notifica\xE7\xF5es.</div>\r
              </div>\r
              <div class="field">\r
                <label>CPF ou CNPJ <span class="req">*</span> <span class="opt">para assinatura</span></label>\r
                <input type="text" [(ngModel)]="form.billing_document" name="billing_document" class="form-input" placeholder="000.000.000-00 ou 00.000.000/0001-00" maxlength="18">\r
                <div class="hint">Obrigat\xF3rio para gerar boletos. Apenas n\xFAmeros ou com pontua\xE7\xE3o.</div>\r
              </div>\r
            </div>\r
          </div>\r
\r
          <div class="section-card">\r
            <div class="section-header">\r
              <div class="icon-wrap"><span class="material-symbols-outlined">chat</span></div>\r
              <span class="section-title">Comunica\xE7\xE3o por WhatsApp</span>\r
            </div>\r
            <div class="section-body">\r
              <div class="field" style="margin-bottom:16px">\r
                <label class="dark-toggle-card" style="display:flex;align-items:center;justify-content:space-between;cursor:pointer;margin-bottom:0">\r
                  <span>\r
                    <span class="dtitle">Receber comunica\xE7\xE3o por WhatsApp</span>\r
                    <span class="dsub">Confirma\xE7\xF5es e avisos da loja no n\xFAmero cadastrado (Telefone/WhatsApp)</span>\r
                  </span>\r
                  <label class="toggle-wrap" style="position:relative;width:44px;height:24px;flex-shrink:0">\r
                    <input type="checkbox" [(ngModel)]="form.whatsapp_notifications_enabled" name="whatsapp_notifications_enabled" style="opacity:0;position:absolute;width:0;height:0">\r
                    <span class="toggle-track" style="position:absolute;inset:0;background:var(--c-border);border-radius:999px"></span>\r
                    <span class="toggle-thumb" style="position:absolute;top:3px;left:3px;width:18px;height:18px;background:#fff;border-radius:50%;box-shadow:0 1px 3px rgba(0,0,0,.2)"></span>\r
                  </label>\r
                </label>\r
              </div>\r
              <div style="padding-left:4px;border-left:2px solid var(--c-soft);margin-top:12px">\r
                <p style="font-size:12px;color:var(--c-muted);margin-bottom:10px">Quais notifica\xE7\xF5es deseja receber:</p>\r
                <label style="display:flex;align-items:center;gap:8px;margin-bottom:8px;cursor:pointer;font-size:13px;color:var(--c-text)">\r
                  <input type="checkbox" [(ngModel)]="form.whatsapp_notify_cobranca" name="whatsapp_notify_cobranca">\r
                  Cobran\xE7a (lembretes, vencimentos)\r
                </label>\r
                <label style="display:flex;align-items:center;gap:8px;margin-bottom:8px;cursor:pointer;font-size:13px;color:var(--c-text)">\r
                  <input type="checkbox" [(ngModel)]="form.whatsapp_notify_faturas_boleto" name="whatsapp_notify_faturas_boleto">\r
                  Faturas e boleto (confirma\xE7\xE3o de assinatura, boleto gerado)\r
                </label>\r
                <label style="display:flex;align-items:center;gap:8px;margin-bottom:0;cursor:pointer;font-size:13px;color:var(--c-text)">\r
                  <input type="checkbox" [(ngModel)]="form.whatsapp_notify_avisos" name="whatsapp_notify_avisos">\r
                  Avisos gerais da loja\r
                </label>\r
              </div>\r
            </div>\r
          </div>\r
\r
          <div class="section-card">\r
            <div class="section-header">\r
              <div class="icon-wrap"><span class="material-symbols-outlined">schedule</span></div>\r
              <span class="section-title">Hor\xE1rio de Atendimento</span>\r
              <span style="margin-left:auto;font-size:11px;color:var(--c-muted)">Deixe vazio para "Fechado"</span>\r
            </div>\r
            <div class="section-body">\r
              <div class="schedule-grid">\r
                @for (d of days; track d.id) {\r
                  <div class="schedule-row" [class.active]="isScheduleActive(d.id)">\r
                    <span class="day-label">{{ d.label }}</span>\r
                    <label class="toggle-wrap" style="position:relative;width:34px;height:18px;flex-shrink:0">\r
                      <input type="checkbox" [checked]="isScheduleActive(d.id)" (change)="toggleScheduleDay(d.id, $any($event.target).checked)" style="opacity:0;width:0;height:0">\r
                      <span class="toggle-track" style="position:absolute;inset:0;background:var(--c-border);border-radius:999px;cursor:pointer"></span>\r
                      <span class="toggle-thumb" style="position:absolute;top:2px;left:2px;width:14px;height:14px;background:#fff;border-radius:50%;pointer-events:none;box-shadow:0 1px 3px rgba(0,0,0,.2)"></span>\r
                    </label>\r
                    @if (isScheduleActive(d.id)) {\r
                      <div style="display:flex;align-items:center;gap:6px;flex:1;flex-wrap:wrap">\r
                        <span style="font-size:10px;color:var(--c-muted)">Abre</span>\r
                        <input type="text"\r
                          class="time-input form-input"\r
                          mwlFlatpickr\r
                          [(ngModel)]="form.business_hours![d.id].open"\r
                          (flatpickrChange)="setTime(d.id, 'open', $event.selectedDates)"\r
                          [name]="'bh_open_'+d.id"\r
                          placeholder="08:00"\r
                          [enableTime]="true"\r
                          [noCalendar]="true"\r
                          [dateFormat]="'H:i'"\r
                          [time24hr]="true"\r
                          [static]="true">\r
                        <span style="font-size:11px;color:var(--c-muted)">\u2192</span>\r
                        <span style="font-size:10px;color:var(--c-muted)">Fecha</span>\r
                        <input type="text"\r
                          class="time-input form-input"\r
                          mwlFlatpickr\r
                          [(ngModel)]="form.business_hours![d.id].close"\r
                          (flatpickrChange)="setTime(d.id, 'close', $event.selectedDates)"\r
                          [name]="'bh_close_'+d.id"\r
                          placeholder="18:00"\r
                          [enableTime]="true"\r
                          [noCalendar]="true"\r
                          [dateFormat]="'H:i'"\r
                          [time24hr]="true"\r
                          [static]="true">\r
                      </div>\r
                    } @else {\r
                      <span class="closed-tag">Fechado</span>\r
                    }\r
                  </div>\r
                }\r
              </div>\r
              <div style="margin-top:10px;display:flex;justify-content:flex-end">\r
                <button type="button" class="copy-schedule-btn" (click)="copyFirstDayToAll()">Copiar segunda para todos os dias \u2192</button>\r
              </div>\r
            </div>\r
          </div>\r
\r
          <div class="section-card">\r
            <div class="section-header">\r
              <div class="icon-wrap"><span class="material-symbols-outlined">image</span></div>\r
              <span class="section-title">Logo da empresa</span>\r
            </div>\r
            <div class="section-body">\r
              @if (clinic?.logo_url) {\r
                <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px">\r
                  <img [src]="clinic?.logo_url ?? ''" alt="Logo" style="height:40px;border-radius:8px;border:1px solid var(--c-border);object-fit:contain;padding:4px;background:var(--c-soft)">\r
                  <span style="font-size:12px;color:var(--c-muted)">Logo atual</span>\r
                </div>\r
              }\r
              <div class="upload-zone" (click)="logoInput.click()">\r
                <span class="material-symbols-outlined">upload_file</span>\r
                <div class="upload-label">Arraste sua logo aqui ou <span style="color:var(--c-primary)">clique para escolher</span></div>\r
                <div class="upload-hint">PNG, JPG ou SVG \u2022 Recomendado: 512\xD7512px \u2022 M\xE1x 2MB</div>\r
              </div>\r
              <input #logoInput type="file" accept="image/*" class="sr-only" (change)="onLogoChange($event)">\r
              @if (logoFile) {\r
                <p class="text-xs mt-2" style="color:var(--c-muted)">Arquivo selecionado: {{ logoFile.name }}</p>\r
              }\r
            </div>\r
          </div>\r
        </div>\r
\r
        <!-- Painel Tema Visual -->\r
        <div id="panel-visual" class="config-panel" [class.active]="activeTab === 'visual'" role="tabpanel">\r
          <div class="section-card">\r
            <div class="section-header">\r
              <div class="icon-wrap"><span class="material-symbols-outlined">palette</span></div>\r
              <span class="section-title">Tema de Cores</span>\r
              <span style="margin-left:auto;font-size:11px;color:var(--c-muted)">Aplicado para todos os usu\xE1rios</span>\r
            </div>\r
            <div class="section-body">\r
              <div class="theme-grid">\r
                @for (key of themeKeys; track key) {\r
                  @let meta = availableThemes[key];\r
                  @let primary = meta?.primary ?? '#2563eb';\r
                  @let bg = primary + '22';\r
                  <label class="theme-card" [class.selected]="form.theme === key">\r
                    <input type="radio" [value]="key" [(ngModel)]="form.theme" [name]="'theme'" class="sr-only">\r
                    <div class="theme-preview" [style.background]="bg">\r
                      <div class="bar" [style.background]="primary" style="height:12px;border-radius:2px;width:5px;flex-shrink:0"></div>\r
                      <div class="bar" [style.background]="primary" style="height:18px;border-radius:2px;width:5px;flex-shrink:0"></div>\r
                      <div class="bar" [style.background]="primary" style="height:24px;border-radius:2px;width:5px;flex-shrink:0"></div>\r
                    </div>\r
                    <div class="theme-dot" [style.background]="primary"></div>\r
                    <div class="theme-name">{{ meta?.label ?? key }}</div>\r
                  </label>\r
                }\r
              </div>\r
            </div>\r
          </div>\r
          <div class="section-card">\r
            <div class="section-header">\r
              <div class="icon-wrap"><span class="material-symbols-outlined">dark_mode</span></div>\r
              <span class="section-title">Modo Escuro</span>\r
            </div>\r
            <div class="section-body">\r
              <div class="dark-toggle-card">\r
                <div class="dark-toggle-info">\r
                  <div class="dtitle">Ativar modo escuro</div>\r
                  <div class="dsub">Fundo escuro profundo, independente do tema de cor selecionado.</div>\r
                </div>\r
                <label class="toggle-wrap" style="position:relative;width:44px;height:24px;flex-shrink:0">\r
                  <input type="checkbox" [(ngModel)]="form.dark_mode" name="dark_mode" style="opacity:0;width:0;height:0">\r
                  <span class="toggle-track" style="position:absolute;inset:0;background:var(--c-border);border-radius:999px"></span>\r
                  <span class="toggle-thumb" style="position:absolute;top:3px;left:3px;width:18px;height:18px;background:#fff;border-radius:50%;box-shadow:0 1px 3px rgba(0,0,0,.2)"></span>\r
                </label>\r
              </div>\r
            </div>\r
          </div>\r
        </div>\r
\r
        @if (showStickyFooter) {\r
          <div class="sticky-footer-spacer" aria-hidden="true"></div>\r
        }\r
        @if (showStickyFooter) {\r
          <div class="sticky-footer">\r
            <div style="font-size:12px;color:var(--c-muted)">Altera\xE7\xF5es n\xE3o salvas</div>\r
            <div class="footer-btns">\r
              <a routerLink="/dashboard" class="btn-secondary">\r
                <span class="material-symbols-outlined" style="font-size:16px">close</span>\r
                Cancelar\r
              </a>\r
              <button type="submit" class="btn-primary inline-flex items-center gap-2" [disabled]="salvando">\r
                @if (salvando) {\r
                  <span class="btn-spinner" aria-hidden="true"></span>\r
                } @else {\r
                  <span class="material-symbols-outlined" style="font-size:16px">save</span>\r
                }\r
                {{ salvando ? 'Salvando\u2026' : 'Salvar configura\xE7\xF5es' }}\r
              </button>\r
            </div>\r
          </div>\r
        }\r
      </form>\r
\r
      <!-- Painel Empresas (fora do form principal) -->\r
      @if (canAddMultiEmpresa) {\r
        <div id="panel-empresas" class="config-panel" [class.active]="activeTab === 'empresas'" role="tabpanel">\r
          <div class="section-card">\r
            <div class="section-header">\r
              <div class="icon-wrap"><span class="material-symbols-outlined">business_center</span></div>\r
              <span class="section-title">Empresas do grupo</span>\r
              <span style="margin-left:auto;font-size:11px;color:var(--c-muted)">Dispon\xEDvel no plano Enterprise</span>\r
            </div>\r
            <div class="section-body">\r
              @if (tenantClinics.length === 0) {\r
                <p style="font-size:13px;color:var(--c-muted);margin-bottom:16px">Esta \xE9 a \xFAnica empresa do grupo. Adicione filiais abaixo.</p>\r
              } @else {\r
                <ul style="list-style:none;padding:0;margin:0 0 20px 0">\r
                  @for (tc of tenantClinics; track tc.id) {\r
                    <li style="display:flex;align-items:center;gap:10px;padding:12px 0;border-bottom:1px solid var(--c-border)">\r
                      <span class="material-symbols-outlined" style="font-size:20px;color:var(--c-muted)">business</span>\r
                      <span style="flex:1;font-weight:500;color:var(--c-text)">{{ tc.name }}</span>\r
                      @if (tc.id === clinic?.id) {\r
                        <span style="font-size:11px;font-weight:600;color:var(--c-primary);background:color-mix(in srgb, var(--c-primary) 12%, transparent);padding:4px 8px;border-radius:6px">Atual</span>\r
                      } @else {\r
                        <a routerLink="/clinica/escolher" style="font-size:12px;color:var(--c-primary)">Trocar para esta</a>\r
                      }\r
                      <span style="font-size:11px;color:var(--c-muted)">{{ tc.users_count ?? 0 }} usu\xE1rio(s)</span>\r
                    </li>\r
                  }\r
                </ul>\r
              }\r
              <div style="border-top:1px solid var(--c-border);padding-top:20px;margin-top:8px">\r
                <p style="font-size:12px;font-weight:600;color:var(--c-muted);margin-bottom:12px;text-transform:uppercase;letter-spacing:0.05em">Adicionar empresa ou filial</p>\r
                <div class="field" style="margin-bottom:12px">\r
                  <label for="nova-empresa-nome">Nome da nova empresa</label>\r
                  <input\r
                    id="nova-empresa-nome"\r
                    type="text"\r
                    [(ngModel)]="novaEmpresaNome"\r
                    name="novaEmpresaNome"\r
                    class="form-input"\r
                    maxlength="120"\r
                    placeholder="Ex.: Filial Centro"\r
                    autocomplete="organization"\r
                    (keydown.enter)="$event.preventDefault(); criarNovaEmpresa()"\r
                  />\r
                </div>\r
                @if (erroNovaEmpresa) {\r
                  <p class="text-sm mb-3" style="color: var(--c-error, #dc2626)">{{ erroNovaEmpresa }}</p>\r
                }\r
                <div style="display:flex;flex-wrap:wrap;gap:10px;align-items:center">\r
                  <button\r
                    type="button"\r
                    class="btn-primary inline-flex items-center gap-2"\r
                    (click)="criarNovaEmpresa()"\r
                    [disabled]="salvandoNovaEmpresa || !novaEmpresaNome.trim()"\r
                  >\r
                    @if (salvandoNovaEmpresa) {\r
                      <span class="btn-spinner" aria-hidden="true"></span>\r
                    } @else {\r
                      <span class="material-symbols-outlined" style="font-size:16px">add_business</span>\r
                    }\r
                    {{ salvandoNovaEmpresa ? 'Criando\u2026' : 'Cadastrar nova empresa' }}\r
                  </button>\r
                  <a routerLink="/clinica/escolher" class="text-sm" style="color:var(--c-primary);text-decoration:none">Ver lista para trocar de empresa \u2192</a>\r
                </div>\r
              </div>\r
            </div>\r
          </div>\r
        </div>\r
      }\r
\r
      <!-- Painel WhatsApp (Evolution Go) -->\r
      <div id="panel-whatsapp" class="config-panel" [class.active]="activeTab === 'whatsapp'" role="tabpanel">\r
        <div class="page-header mb-4">\r
          <div class="page-title">\r
            <div class="page-title-icon">\r
              <span class="material-symbols-outlined">chat</span>\r
            </div>\r
            <div>\r
              <h1>WhatsApp (Evolution Go)</h1>\r
              <p class="page-header-subtitle">Conecte o n\xFAmero da empresa e envie uma mensagem de teste</p>\r
            </div>\r
          </div>\r
        </div>\r
        @if (waLoading) {\r
          <p class="text-sm" style="color: var(--c-muted)">Carregando\u2026</p>\r
        } @else if (waError && !waState) {\r
          <p class="text-sm mb-4" style="color: var(--c-error, #dc2626)">{{ waError }}</p>\r
          <button type="button" class="btn-secondary" (click)="carregarWhatsapp()">Tentar novamente</button>\r
        } @else if (waState) {\r
          @if (waError) {\r
            <p class="text-sm mb-4" style="color: var(--c-error, #dc2626)">{{ waError }}</p>\r
          }\r
          @if (!waState.server_configured) {\r
            <div class="section-card mb-4">\r
              <div class="section-body">\r
                <p style="font-size:14px;color:var(--c-text);margin:0 0 8px 0">\r
                  A API Evolution Go n\xE3o est\xE1 configurada no servidor. Pe\xE7a ao administrador para definir\r
                  <code style="font-size:12px">EVOLUTION_GO_BASE_URL</code> e\r
                  <code style="font-size:12px">EVOLUTION_GO_API_KEY</code> (GLOBAL_API_KEY do container) no backend.\r
                </p>\r
              </div>\r
            </div>\r
          } @else if (!waState.instance_configured) {\r
            <div class="section-card mb-4">\r
              <div class="section-header">\r
                <div class="icon-wrap"><span class="material-symbols-outlined">add_circle</span></div>\r
                <span class="section-title">Criar inst\xE2ncia</span>\r
              </div>\r
              <div class="section-body">\r
                <p style="font-size:13px;color:var(--c-muted);margin-bottom:16px">\r
                  Ser\xE1 criada uma inst\xE2ncia na Evolution Go vinculada a esta empresa. O nome padr\xE3o \xE9\r
                  <code style="font-size:12px">zion_org_&#123;id&#125;</code>. Opcionalmente defina um token (UUID); caso vazio, a Evolution gera automaticamente.\r
                </p>\r
                <div class="field" style="margin-bottom:12px">\r
                  <label for="wa-nome-instancia">Nome da inst\xE2ncia <span class="opt">opcional</span></label>\r
                  <input id="wa-nome-instancia" type="text" class="form-input" [(ngModel)]="waNovaInstanciaNome" name="waNovaInstanciaNome" maxlength="64" placeholder="Ex.: minha-clinica" autocomplete="off" pattern="[a-zA-Z0-9_-]*" />\r
                </div>\r
                <div class="field" style="margin-bottom:16px">\r
                  <label for="wa-token-instancia">Token (UUID) <span class="opt">opcional</span></label>\r
                  <input id="wa-token-instancia" type="text" class="form-input" [(ngModel)]="waNovaInstanciaToken" name="waNovaInstanciaToken" maxlength="128" placeholder="Deixe vazio para gerar automaticamente" autocomplete="off" />\r
                </div>\r
                <button type="button" class="btn-primary inline-flex items-center gap-2" (click)="criarInstanciaWhatsapp()" [disabled]="waCriandoInstancia">\r
                  @if (waCriandoInstancia) {\r
                    <span class="btn-spinner" aria-hidden="true"></span>\r
                  } @else {\r
                    <span class="material-symbols-outlined" style="font-size:16px">bolt</span>\r
                  }\r
                  {{ waCriandoInstancia ? 'Criando\u2026' : 'Criar inst\xE2ncia' }}\r
                </button>\r
              </div>\r
            </div>\r
          } @else {\r
            @if (waTokenExibicaoUnica) {\r
              <div class="section-card mb-4" style="border-color: color-mix(in srgb, var(--c-success, #22c55e) 35%, var(--c-border))">\r
                <div class="section-header">\r
                  <div class="icon-wrap"><span class="material-symbols-outlined" style="color:var(--c-success,#22c55e)">key</span></div>\r
                  <span class="section-title">Token da inst\xE2ncia (guarde agora)</span>\r
                </div>\r
                <div class="section-body">\r
                  <p style="font-size:12px;color:var(--c-muted);margin-bottom:8px">Este valor n\xE3o ser\xE1 mostrado novamente nesta tela.</p>\r
                  <code style="display:block;font-size:12px;word-break:break-all;padding:10px;background:var(--c-soft);border-radius:8px;margin-bottom:10px">{{ waTokenExibicaoUnica }}</code>\r
                  <button type="button" class="btn-secondary" (click)="copiarTextoWhatsapp(waTokenExibicaoUnica!)">Copiar token</button>\r
                </div>\r
              </div>\r
            }\r
            <div class="section-card mb-4">\r
              <div class="section-header">\r
                <div class="icon-wrap"><span class="material-symbols-outlined">info</span></div>\r
                <span class="section-title">Status</span>\r
              </div>\r
              <div class="section-body">\r
                <p style="font-size:14px;margin:0 0 8px 0"><strong>Inst\xE2ncia:</strong> {{ waState.instance_name ?? '\u2014' }}</p>\r
                <p style="font-size:13px;color:var(--c-muted);margin:0 0 8px 0">\r
                  Conectado:\r
                  @if (waState.connected === true) {\r
                    <span style="color:var(--c-success,#22c55e);font-weight:600">sim</span>\r
                  } @else if (waState.connected === false) {\r
                    <span style="font-weight:600">n\xE3o</span>\r
                  } @else {\r
                    \u2014\r
                  }\r
                  \xB7 Sess\xE3o ativa:\r
                  @if (waState.logged_in === true) {\r
                    <span style="color:var(--c-success,#22c55e);font-weight:600">sim</span>\r
                  } @else if (waState.logged_in === false) {\r
                    <span style="font-weight:600">n\xE3o</span>\r
                  } @else {\r
                    \u2014\r
                  }\r
                </p>\r
                @if (waState.remote_error) {\r
                  <p style="font-size:12px;color:var(--c-error,#dc2626);margin:0">API: {{ waState.remote_error }}</p>\r
                }\r
              </div>\r
            </div>\r
            <div class="section-card mb-4">\r
              <div class="section-header">\r
                <div class="icon-wrap"><span class="material-symbols-outlined">link</span></div>\r
                <span class="section-title">Conectar dispositivo</span>\r
              </div>\r
              <div class="section-body">\r
                <p style="font-size:13px;color:var(--c-muted);margin-bottom:12px">\r
                  N\xFAmero opcional para c\xF3digo de pareamento (somente d\xEDgitos, com DDI). Depois use \u201CObter QR Code\u201D ou \u201CObter c\xF3digo de pareamento\u201D.\r
                </p>\r
                <div class="field" style="margin-bottom:12px">\r
                  <label for="wa-phone-conectar">Telefone (pareamento)</label>\r
                  <input id="wa-phone-conectar" type="text" class="form-input" [(ngModel)]="waPhoneConectar" name="waPhoneConectar" placeholder="5511999999999" autocomplete="tel" />\r
                </div>\r
                <div class="field" style="margin-bottom:16px">\r
                  <label for="wa-webhook">Webhook URL <span class="opt">opcional</span></label>\r
                  <input id="wa-webhook" type="url" class="form-input" [(ngModel)]="waWebhookUrl" name="waWebhookUrl" placeholder="https://\u2026" />\r
                </div>\r
                <div style="display:flex;flex-wrap:wrap;gap:10px;margin-bottom:20px">\r
                  <button type="button" class="btn-primary inline-flex items-center gap-2" (click)="iniciarConexaoWhatsapp()" [disabled]="waConectando">\r
                    @if (waConectando) {\r
                      <span class="btn-spinner" aria-hidden="true"></span>\r
                    } @else {\r
                      <span class="material-symbols-outlined" style="font-size:16px">power_settings_new</span>\r
                    }\r
                    {{ waConectando ? 'Iniciando\u2026' : 'Iniciar conex\xE3o' }}\r
                  </button>\r
                  <button type="button" class="btn-secondary inline-flex items-center gap-2" (click)="buscarQrWhatsapp()" [disabled]="waQrCarregando">\r
                    @if (waQrCarregando) {\r
                      <span class="btn-spinner" aria-hidden="true"></span>\r
                    } @else {\r
                      <span class="material-symbols-outlined" style="font-size:16px">qr_code_2</span>\r
                    }\r
                    {{ waQrCarregando ? 'Carregando\u2026' : 'Obter QR Code' }}\r
                  </button>\r
                </div>\r
                @if (waQrSrc) {\r
                  <div style="margin-bottom:16px">\r
                    <p style="font-size:12px;font-weight:600;color:var(--c-muted);margin-bottom:8px">Escaneie no WhatsApp \xB7 Dispositivos conectados</p>\r
                    <img [src]="waQrSrc" alt="QR Code WhatsApp" style="max-width:260px;height:auto;border-radius:8px;border:1px solid var(--c-border)" />\r
                  </div>\r
                }\r
                @if (waQrLinkCode) {\r
                  <p style="font-size:12px;color:var(--c-muted);margin-bottom:4px">C\xF3digo de vincula\xE7\xE3o (QR)</p>\r
                  <code style="display:block;font-size:11px;word-break:break-all;padding:8px;background:var(--c-soft);border-radius:8px">{{ waQrLinkCode }}</code>\r
                }\r
                <div style="border-top:1px solid var(--c-border);padding-top:16px;margin-top:16px">\r
                  <p style="font-size:12px;font-weight:600;color:var(--c-muted);margin-bottom:8px">Pareamento por c\xF3digo (8 d\xEDgitos)</p>\r
                  <div class="field" style="margin-bottom:12px">\r
                    <label for="wa-phone-pair">Telefone do aparelho</label>\r
                    <input id="wa-phone-pair" type="text" class="form-input" [(ngModel)]="waPhonePair" name="waPhonePair" placeholder="5511999999999" autocomplete="tel" />\r
                  </div>\r
                  <button type="button" class="btn-secondary inline-flex items-center gap-2 mb-3" (click)="solicitarPairWhatsapp()" [disabled]="waPairCarregando">\r
                    @if (waPairCarregando) {\r
                      <span class="btn-spinner" aria-hidden="true"></span>\r
                    }\r
                    {{ waPairCarregando ? 'Solicitando\u2026' : 'Obter c\xF3digo de pareamento' }}\r
                  </button>\r
                  @if (waPairingCode) {\r
                    <p style="font-size:24px;font-weight:700;letter-spacing:0.2em;font-family:monospace;margin:8px 0 0 0">{{ waPairingCode }}</p>\r
                  }\r
                </div>\r
              </div>\r
            </div>\r
            <div class="section-card mb-4">\r
              <div class="section-header">\r
                <div class="icon-wrap"><span class="material-symbols-outlined">send</span></div>\r
                <span class="section-title">Mensagem de teste</span>\r
              </div>\r
              <div class="section-body">\r
                <div class="field" style="margin-bottom:12px">\r
                  <label for="wa-test-phone">N\xFAmero destino (DDI + DDD + n\xFAmero)</label>\r
                  <input id="wa-test-phone" type="text" class="form-input" [(ngModel)]="waTestPhone" name="waTestPhone" placeholder="5511987654321" autocomplete="tel" />\r
                </div>\r
                <div class="field" style="margin-bottom:16px">\r
                  <label for="wa-test-text">Texto <span class="opt">opcional</span></label>\r
                  <textarea id="wa-test-text" class="form-input" rows="2" [(ngModel)]="waTestText" name="waTestText" placeholder="Mensagem de teste \u2014 Zion Med"></textarea>\r
                </div>\r
                <button type="button" class="btn-primary inline-flex items-center gap-2" (click)="enviarTesteWhatsapp()" [disabled]="waTestEnviando">\r
                  @if (waTestEnviando) {\r
                    <span class="btn-spinner" aria-hidden="true"></span>\r
                  } @else {\r
                    <span class="material-symbols-outlined" style="font-size:16px">send</span>\r
                  }\r
                  {{ waTestEnviando ? 'Enviando\u2026' : 'Enviar teste' }}\r
                </button>\r
              </div>\r
            </div>\r
            <div style="display:flex;flex-wrap:wrap;gap:10px">\r
              <button type="button" class="btn-secondary" (click)="desconectarWhatsapp()" [disabled]="waDesconectando">\r
                {{ waDesconectando ? 'Desconectando\u2026' : 'Desconectar sess\xE3o' }}\r
              </button>\r
              <button type="button" class="btn-secondary" style="color:var(--c-error,#dc2626);border-color:color-mix(in srgb,var(--c-error) 40%,var(--c-border))" (click)="removerIntegracaoWhatsapp()" [disabled]="waRemovendo">\r
                {{ waRemovendo ? 'Removendo\u2026' : 'Remover integra\xE7\xE3o' }}\r
              </button>\r
            </div>\r
          }\r
        }\r
      </div>\r
\r
      <!-- Painel Logs (somente informa\xE7\xE3o, sem tabela) -->\r
      <div id="panel-logs" class="config-panel" [class.active]="activeTab === 'logs'" role="tabpanel">\r
        <div class="page-header mb-4">\r
          <div class="page-title">\r
            <div class="page-title-icon">\r
              <span class="material-symbols-outlined">history</span>\r
            </div>\r
            <div>\r
              <h1>Logs de auditoria</h1>\r
              <p class="page-header-subtitle">A\xE7\xF5es realizadas nesta empresa</p>\r
            </div>\r
          </div>\r
        </div>\r
        @if (logsLoading) {\r
          <p class="text-sm" style="color: var(--c-muted)">Carregando logs\u2026</p>\r
        } @else if (logsErroCobranca) {\r
          <zm-assinatura-bloqueada-card\r
            titulo="Logs indispon\xEDveis at\xE9 regularizar a cobran\xE7a"\r
            descricao="Com assinatura pendente ou conta bloqueada por pagamento, o hist\xF3rico de auditoria n\xE3o \xE9 exibido. Depois que o pagamento for confirmado, os registros passam a aparecer nesta aba."\r
          />\r
        } @else if (logsError) {\r
          <p class="text-sm" style="color: var(--c-error, #dc2626)">{{ logsError }}</p>\r
        } @else {\r
          <div class="table-card">\r
            <table>\r
              <thead>\r
                <tr>\r
                  <th>Data / Hora</th>\r
                  <th>A\xE7\xE3o</th>\r
                  <th>Usu\xE1rio</th>\r
                  <th>Detalhe</th>\r
                </tr>\r
              </thead>\r
              <tbody>\r
                @if (logs.length === 0) {\r
                  <tr>\r
                    <td colspan="4" style="text-align:center;padding:3rem 1rem">\r
                      <span class="material-symbols-outlined" style="font-size:36px;color:var(--c-border);display:block;margin-bottom:8px">history</span>\r
                      <span style="font-size:0.875rem;color:var(--c-muted)">Nenhum registro de auditoria ainda.</span>\r
                    </td>\r
                  </tr>\r
                } @else {\r
                  @for (log of logs; track log.id) {\r
                    <tr>\r
                      <td style="white-space:nowrap;color:var(--c-muted);font-size:0.8125rem">\r
                        {{ log.created_at | date:'dd/MM/yyyy HH:mm' }}\r
                      </td>\r
                      <td>\r
                        <span style="display:inline-flex;align-items:center;gap:4px;font-size:0.8rem;font-weight:600;color:var(--c-text)">\r
                          <span class="material-symbols-outlined" style="font-size:16px;color:var(--c-primary)">info</span>\r
                          {{ log.action }}\r
                        </span>\r
                      </td>\r
                      <td style="color:var(--c-text);font-size:0.875rem">\r
                        {{ log.user_name ?? '\u2014' }}\r
                      </td>\r
                      <td style="font-size:0.8125rem;color:var(--c-muted)">\r
                        @if (log.entity_type && log.entity_id) {\r
                          <span style="margin-right:6px">{{ log.entity_type }} #{{ log.entity_id }}</span>\r
                        }\r
                      </td>\r
                    </tr>\r
                  }\r
                }\r
              </tbody>\r
            </table>\r
          </div>\r
        }\r
      </div>\r
    </div>\r
    </div>\r
  }\r
  @if (listaPronta && !pageData && erro) {\r
    <p class="text-sm" style="color: var(--c-error, #dc2626)">{{ erro }}</p>\r
  }\r
</div>\r
`, styles: ["/* src/app/paginas/clinica/clinica-configuracoes.component.css */\n/*# sourceMappingURL=clinica-configuracoes.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ClinicaConfiguracoesComponent, { className: "ClinicaConfiguracoesComponent", filePath: "src/app/paginas/clinica/clinica-configuracoes.component.ts", lineNumber: 50 });
})();
export {
  ClinicaConfiguracoesComponent
};
//# sourceMappingURL=chunk-P7KK4S5M.js.map
