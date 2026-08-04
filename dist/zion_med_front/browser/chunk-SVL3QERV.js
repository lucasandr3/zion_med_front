import {
  ProtocolosService
} from "./chunk-OQ3TXGU2.js";
import {
  LoadingService,
  ZmSkeletonCardComponent
} from "./chunk-GKI5AWTV.js";
import "./chunk-7WBHVE2H.js";
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
  SelectControlValueAccessor,
  ɵNgSelectMultipleOption
} from "./chunk-USROZ7PW.js";
import {
  AuthService
} from "./chunk-SFRXLDXR.js";
import "./chunk-IBJWGIJV.js";
import {
  ActivatedRoute,
  RouterLink
} from "./chunk-C2NWBPZH.js";
import {
  CommonModule,
  Component,
  __async,
  inject,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-GRLISYEV.js";

// src/app/paginas/protocolos/protocolos-detalhe.component.ts
var _c0 = (a0) => ["/pessoas", a0];
var _forTrack0 = ($index, $item) => $item.name_key;
function ProtocolosDetalheComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 1);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.erro);
  }
}
function ProtocolosDetalheComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2);
    \u0275\u0275element(1, "zm-skeleton-card", 4)(2, "zm-skeleton-card", 4)(3, "zm-skeleton-card", 4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("height", 56);
    \u0275\u0275advance();
    \u0275\u0275property("height", 200);
    \u0275\u0275advance();
    \u0275\u0275property("height", 160);
  }
}
function ProtocolosDetalheComponent_Conditional_3_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 11)(1, "span", 33);
    \u0275\u0275text(2, "schedule");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.statusLabel(), " ");
  }
}
function ProtocolosDetalheComponent_Conditional_3_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 12)(1, "span", 33);
    \u0275\u0275text(2, "check_circle");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.statusLabel(), " ");
  }
}
function ProtocolosDetalheComponent_Conditional_3_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 13)(1, "span", 33);
    \u0275\u0275text(2, "cancel");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.statusLabel(), " ");
  }
}
function ProtocolosDetalheComponent_Conditional_3_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 34);
    \u0275\u0275listener("click", function ProtocolosDetalheComponent_Conditional_3_Conditional_19_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.toggleFormRevisao());
    });
    \u0275\u0275elementStart(1, "span", 16);
    \u0275\u0275text(2, "rate_review");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Aprovar / Reprovar ");
    \u0275\u0275elementEnd();
  }
}
function ProtocolosDetalheComponent_Conditional_3_Conditional_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "dt", 22);
    \u0275\u0275text(2, "Pessoa (ficha)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "dd", 35)(4, "a", 36);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "dd", 37);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(3, _c0, ctx_r0.protocolo.person.id));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.protocolo.person.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.protocolo.person.code);
  }
}
function ProtocolosDetalheComponent_Conditional_3_Conditional_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "dd", 24);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.protocolo.submitter_email);
  }
}
function ProtocolosDetalheComponent_Conditional_3_Conditional_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "dt", 22);
    \u0275\u0275text(2, "Revisado em");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "dd", 23);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div")(6, "dt", 22);
    \u0275\u0275text(7, "Revisado por");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "dd", 23);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.dataFormatada(ctx_r0.protocolo.approved_at));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.protocolo.approved_by_name || "\u2014");
  }
}
function ProtocolosDetalheComponent_Conditional_3_For_48_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 39);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const event_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" \u2014 ", event_r4.body);
  }
}
function ProtocolosDetalheComponent_Conditional_3_For_48_Conditional_4_Conditional_1_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " \xB7 ");
  }
}
function ProtocolosDetalheComponent_Conditional_3_For_48_Conditional_4_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275conditionalCreate(1, ProtocolosDetalheComponent_Conditional_3_For_48_Conditional_4_Conditional_1_Conditional_1_Template, 1, 0);
  }
  if (rf & 2) {
    const event_r4 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275textInterpolate1(" ", event_r4.user == null ? null : event_r4.user.name, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(event_r4.created_at ? 1 : -1);
  }
}
function ProtocolosDetalheComponent_Conditional_3_For_48_Conditional_4_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const event_r4 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.dataFormatada(event_r4.created_at), " ");
  }
}
function ProtocolosDetalheComponent_Conditional_3_For_48_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 40);
    \u0275\u0275conditionalCreate(1, ProtocolosDetalheComponent_Conditional_3_For_48_Conditional_4_Conditional_1_Template, 2, 2);
    \u0275\u0275conditionalCreate(2, ProtocolosDetalheComponent_Conditional_3_For_48_Conditional_4_Conditional_2_Template, 1, 1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const event_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional((event_r4.user == null ? null : event_r4.user.name) ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(event_r4.created_at ? 2 : -1);
  }
}
function ProtocolosDetalheComponent_Conditional_3_For_48_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li", 26)(1, "span", 38);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(3, ProtocolosDetalheComponent_Conditional_3_For_48_Conditional_3_Template, 2, 1, "span", 39);
    \u0275\u0275conditionalCreate(4, ProtocolosDetalheComponent_Conditional_3_For_48_Conditional_4_Template, 3, 2, "p", 40);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const event_r4 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(event_r4.type_label || "Coment\xE1rio");
    \u0275\u0275advance();
    \u0275\u0275conditional(event_r4.body ? 3 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional((event_r4.user == null ? null : event_r4.user.name) || event_r4.created_at ? 4 : -1);
  }
}
function ProtocolosDetalheComponent_Conditional_3_Conditional_56_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 31);
  }
}
function ProtocolosDetalheComponent_Conditional_3_Conditional_57_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 16);
    \u0275\u0275text(1, "add_comment");
    \u0275\u0275elementEnd();
  }
}
function ProtocolosDetalheComponent_Conditional_3_Conditional_59_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 31);
  }
}
function ProtocolosDetalheComponent_Conditional_3_Conditional_59_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 16);
    \u0275\u0275text(1, "send");
    \u0275\u0275elementEnd();
  }
}
function ProtocolosDetalheComponent_Conditional_3_Conditional_59_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 32)(1, "div", 19)(2, "span", 8);
    \u0275\u0275text(3, "rate_review");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "h2", 20);
    \u0275\u0275text(5, "Revisar protocolo");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 41)(7, "div")(8, "label", 42);
    \u0275\u0275text(9, "Situa\xE7\xE3o");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "select", 43);
    \u0275\u0275twoWayListener("ngModelChange", function ProtocolosDetalheComponent_Conditional_3_Conditional_59_Template_select_ngModelChange_10_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.revisaoAprovado, $event) || (ctx_r0.revisaoAprovado = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(11, "option", 44);
    \u0275\u0275text(12, "Aprovado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "option", 44);
    \u0275\u0275text(14, "Reprovado");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(15, "div")(16, "label", 42);
    \u0275\u0275text(17, "Coment\xE1rio (opcional)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "textarea", 45);
    \u0275\u0275twoWayListener("ngModelChange", function ProtocolosDetalheComponent_Conditional_3_Conditional_59_Template_textarea_ngModelChange_18_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.comentarioRevisao, $event) || (ctx_r0.comentarioRevisao = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "button", 30);
    \u0275\u0275listener("click", function ProtocolosDetalheComponent_Conditional_3_Conditional_59_Template_button_click_19_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.enviarRevisao());
    });
    \u0275\u0275conditionalCreate(20, ProtocolosDetalheComponent_Conditional_3_Conditional_59_Conditional_20_Template, 1, 0, "span", 31)(21, ProtocolosDetalheComponent_Conditional_3_Conditional_59_Conditional_21_Template, 2, 0, "span", 16);
    \u0275\u0275text(22);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(10);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.revisaoAprovado);
    \u0275\u0275advance();
    \u0275\u0275property("ngValue", true);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngValue", false);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.comentarioRevisao);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r0.revisaoEnviando);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.revisaoEnviando ? 20 : 21);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.revisaoEnviando ? "Enviando\u2026" : "Enviar revis\xE3o", " ");
  }
}
function ProtocolosDetalheComponent_Conditional_3_Conditional_60_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 47);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" Por ", ctx_r0.protocolo.approved_by_name || "\u2014", " em ", ctx_r0.dataFormatada(ctx_r0.protocolo.approved_at), " ");
  }
}
function ProtocolosDetalheComponent_Conditional_3_Conditional_60_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18)(1, "div", 19)(2, "span", 8);
    \u0275\u0275text(3, "comment");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "h2", 20);
    \u0275\u0275text(5, "Coment\xE1rio da revis\xE3o");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 46)(7, "p", 23);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(9, ProtocolosDetalheComponent_Conditional_3_Conditional_60_Conditional_9_Template, 2, 2, "p", 47);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r0.protocolo.review_comment);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.protocolo.approved_by_name || ctx_r0.protocolo.approved_at ? 9 : -1);
  }
}
function ProtocolosDetalheComponent_Conditional_3_Conditional_61_For_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 50)(1, "td", 52);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 53);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const field_r6 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(field_r6.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.valorCampo(field_r6));
  }
}
function ProtocolosDetalheComponent_Conditional_3_Conditional_61_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18)(1, "div", 48)(2, "table", 49)(3, "thead")(4, "tr", 50)(5, "th", 51);
    \u0275\u0275text(6, "Campo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th", 51);
    \u0275\u0275text(8, "Resposta");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "tbody");
    \u0275\u0275repeaterCreate(10, ProtocolosDetalheComponent_Conditional_3_Conditional_61_For_11_Template, 5, 2, "tr", 50, _forTrack0);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(10);
    \u0275\u0275repeater(ctx_r0.camposTemplate());
  }
}
function ProtocolosDetalheComponent_Conditional_3_Conditional_62_For_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 54);
    \u0275\u0275text(1, "Assinatura registrada");
    \u0275\u0275elementEnd();
  }
}
function ProtocolosDetalheComponent_Conditional_3_Conditional_62_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18)(1, "div", 19)(2, "span", 8);
    \u0275\u0275text(3, "draw");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "h2", 20);
    \u0275\u0275text(5, "Assinatura(s)");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 28);
    \u0275\u0275repeaterCreate(7, ProtocolosDetalheComponent_Conditional_3_Conditional_62_For_8_Template, 2, 0, "div", 54, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(7);
    \u0275\u0275repeater(ctx_r0.protocolo.signatures);
  }
}
function ProtocolosDetalheComponent_Conditional_3_Conditional_63_For_8_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 58);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const att_r7 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", (att_r7.size / 1024).toFixed(1), " KB");
  }
}
function ProtocolosDetalheComponent_Conditional_3_Conditional_63_For_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li", 56)(1, "span", 57);
    \u0275\u0275text(2, "description");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 39);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(5, ProtocolosDetalheComponent_Conditional_3_Conditional_63_For_8_Conditional_5_Template, 2, 1, "span", 58);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const att_r7 = ctx.$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(att_r7.original_name || "Anexo");
    \u0275\u0275advance();
    \u0275\u0275conditional(att_r7.size != null ? 5 : -1);
  }
}
function ProtocolosDetalheComponent_Conditional_3_Conditional_63_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18)(1, "div", 19)(2, "span", 8);
    \u0275\u0275text(3, "attach_file");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "h2", 20);
    \u0275\u0275text(5, "Anexos");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "ul", 55);
    \u0275\u0275repeaterCreate(7, ProtocolosDetalheComponent_Conditional_3_Conditional_63_For_8_Template, 6, 2, "li", 56, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(7);
    \u0275\u0275repeater(ctx_r0.protocolo.attachments);
  }
}
function ProtocolosDetalheComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 3)(1, "div", 5)(2, "div", 6)(3, "div", 7)(4, "span", 8);
    \u0275\u0275text(5, "article");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div")(7, "h1", 9);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "p", 10);
    \u0275\u0275text(10);
    \u0275\u0275conditionalCreate(11, ProtocolosDetalheComponent_Conditional_3_Conditional_11_Template, 4, 1, "span", 11)(12, ProtocolosDetalheComponent_Conditional_3_Conditional_12_Template, 4, 1, "span", 12)(13, ProtocolosDetalheComponent_Conditional_3_Conditional_13_Template, 4, 1, "span", 13);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(14, "div", 14)(15, "button", 15);
    \u0275\u0275listener("click", function ProtocolosDetalheComponent_Conditional_3_Template_button_click_15_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.baixarPdf());
    });
    \u0275\u0275elementStart(16, "span", 16);
    \u0275\u0275text(17, "picture_as_pdf");
    \u0275\u0275elementEnd();
    \u0275\u0275text(18, " Baixar PDF ");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(19, ProtocolosDetalheComponent_Conditional_3_Conditional_19_Template, 4, 0, "button", 17);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "div", 18)(21, "div", 19)(22, "span", 8);
    \u0275\u0275text(23, "info");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "h2", 20);
    \u0275\u0275text(25, "Dados do protocolo");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "dl", 21)(27, "div")(28, "dt", 22);
    \u0275\u0275text(29, "Data de submiss\xE3o");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "dd", 23);
    \u0275\u0275text(31);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(32, ProtocolosDetalheComponent_Conditional_3_Conditional_32_Template, 8, 5, "div");
    \u0275\u0275elementStart(33, "div")(34, "dt", 22);
    \u0275\u0275text(35, "Submetente");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "dd", 23);
    \u0275\u0275text(37);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(38, ProtocolosDetalheComponent_Conditional_3_Conditional_38_Template, 2, 1, "dd", 24);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(39, ProtocolosDetalheComponent_Conditional_3_Conditional_39_Template, 10, 2);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(40, "div", 18)(41, "div", 19)(42, "span", 8);
    \u0275\u0275text(43, "history");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(44, "h2", 20);
    \u0275\u0275text(45, "Hist\xF3rico por data");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(46, "ul", 25);
    \u0275\u0275repeaterCreate(47, ProtocolosDetalheComponent_Conditional_3_For_48_Template, 5, 3, "li", 26, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(49, "div", 18)(50, "div", 27)(51, "h2", 20);
    \u0275\u0275text(52, "Novo coment\xE1rio interno");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(53, "div", 28)(54, "textarea", 29);
    \u0275\u0275twoWayListener("ngModelChange", function ProtocolosDetalheComponent_Conditional_3_Template_textarea_ngModelChange_54_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.novoComentario, $event) || (ctx_r0.novoComentario = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(55, "button", 30);
    \u0275\u0275listener("click", function ProtocolosDetalheComponent_Conditional_3_Template_button_click_55_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.enviarComentario());
    });
    \u0275\u0275conditionalCreate(56, ProtocolosDetalheComponent_Conditional_3_Conditional_56_Template, 1, 0, "span", 31)(57, ProtocolosDetalheComponent_Conditional_3_Conditional_57_Template, 2, 0, "span", 16);
    \u0275\u0275text(58);
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(59, ProtocolosDetalheComponent_Conditional_3_Conditional_59_Template, 23, 7, "div", 32);
    \u0275\u0275conditionalCreate(60, ProtocolosDetalheComponent_Conditional_3_Conditional_60_Template, 10, 2, "div", 18);
    \u0275\u0275conditionalCreate(61, ProtocolosDetalheComponent_Conditional_3_Conditional_61_Template, 12, 0, "div", 18);
    \u0275\u0275conditionalCreate(62, ProtocolosDetalheComponent_Conditional_3_Conditional_62_Template, 9, 0, "div", 18);
    \u0275\u0275conditionalCreate(63, ProtocolosDetalheComponent_Conditional_3_Conditional_63_Template, 9, 0, "div", 18);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate1("Protocolo ", ctx_r0.protocolo.protocol_number || ctx_r0.protocolo.id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.templateNome(), " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.isPending ? 11 : ctx_r0.protocolo.status && ctx_r0.protocolo.status.toLowerCase() === "approved" ? 12 : 13);
    \u0275\u0275advance(8);
    \u0275\u0275conditional(ctx_r0.isPending && ctx_r0.podeRevisarProtocolo ? 19 : -1);
    \u0275\u0275advance(12);
    \u0275\u0275textInterpolate(ctx_r0.dataFormatada(ctx_r0.protocolo.submitted_at || ctx_r0.protocolo.created_at));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.protocolo.person ? 32 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.protocolo.submitter_name || "\u2014");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.protocolo.submitter_email ? 38 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.protocolo.approved_at || ctx_r0.protocolo.approved_by_name ? 39 : -1);
    \u0275\u0275advance(8);
    \u0275\u0275repeater(ctx_r0.eventosTimeline());
    \u0275\u0275advance(7);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.novoComentario);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", !ctx_r0.novoComentario.trim() || ctx_r0.comentarioEnviando);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.comentarioEnviando ? 56 : 57);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.comentarioEnviando ? "Enviando\u2026" : "Adicionar coment\xE1rio", " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.isPending && ctx_r0.revisaoFormVisible && ctx_r0.podeRevisarProtocolo ? 59 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.protocolo.review_comment ? 60 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.camposTemplate().length > 0 ? 61 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.protocolo.signatures && ctx_r0.protocolo.signatures.length > 0 ? 62 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.protocolo.attachments && ctx_r0.protocolo.attachments.length > 0 ? 63 : -1);
  }
}
var ProtocolosDetalheComponent = class _ProtocolosDetalheComponent {
  protocolo = null;
  showSkeleton;
  erro = "";
  comentarioEnviando = false;
  revisaoEnviando = false;
  revisaoFormVisible = false;
  revisaoAprovado = true;
  comentarioRevisao = "";
  novoComentario = "";
  route = inject(ActivatedRoute);
  protocolosService = inject(ProtocolosService);
  loadingService = inject(LoadingService);
  toast = inject(ToastService);
  confirm = inject(ConfirmDialogService);
  auth = inject(AuthService);
  get podeRevisarProtocolo() {
    return this.auth.hasPermission("submissions.approve");
  }
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id");
    if (!id)
      return;
    this.carregar(+id);
  }
  carregar(id) {
    this.erro = "";
    const { data$, showSkeleton } = this.loadingService.loadWithThreshold(this.protocolosService.get(id));
    this.showSkeleton = showSkeleton;
    data$.subscribe({
      next: (p) => {
        this.protocolo = p;
      },
      error: () => {
        this.erro = "N\xE3o foi poss\xEDvel carregar o protocolo.";
      }
    });
  }
  get isPending() {
    const s = this.protocolo?.status?.toLowerCase();
    return s === "pending" || s === "pendente";
  }
  statusLabel() {
    const s = this.protocolo?.status;
    if (!s)
      return "";
    const map = {
      pending: "Pendente",
      approved: "Aprovado",
      rejected: "Reprovado"
    };
    return map[s.toLowerCase()] ?? s;
  }
  templateNome() {
    if (!this.protocolo)
      return "\u2014";
    if (this.protocolo.template_name)
      return this.protocolo.template_name;
    return this.protocolo.template?.name ?? "\u2014";
  }
  dataFormatada(val) {
    if (!val)
      return "\u2014";
    const d = new Date(val);
    if (isNaN(d.getTime()))
      return val;
    return d.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  }
  toggleFormRevisao() {
    if (!this.podeRevisarProtocolo)
      return;
    this.revisaoFormVisible = !this.revisaoFormVisible;
  }
  baixarPdf() {
    if (!this.protocolo)
      return;
    this.protocolosService.pdf(this.protocolo.id).subscribe({
      next: (blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `protocolo-${this.protocolo.protocol_number || this.protocolo.id}.pdf`;
        a.click();
        URL.revokeObjectURL(url);
      }
    });
  }
  enviarRevisao() {
    return __async(this, null, function* () {
      if (!this.protocolo || !this.podeRevisarProtocolo)
        return;
      if (this.revisaoAprovado === false) {
        const ok = yield this.confirm.request({
          title: "Reprovar protocolo?",
          message: "Tem certeza que deseja reprovar este protocolo? O submetente pode ser notificado.",
          confirmLabel: "Sim, reprovar",
          variant: "danger"
        });
        if (!ok)
          return;
      }
      this.revisaoEnviando = true;
      this.protocolosService.aprovar(this.protocolo.id, this.revisaoAprovado, this.comentarioRevisao || void 0).subscribe({
        next: () => {
          this.revisaoEnviando = false;
          this.revisaoFormVisible = false;
          this.comentarioRevisao = "";
          if (this.revisaoAprovado) {
            this.toast.success("Protocolo aprovado", "A revis\xE3o foi registrada.");
          } else {
            this.toast.warning("Protocolo reprovado", "A revis\xE3o foi registrada.");
          }
          this.carregar(this.protocolo.id);
        },
        error: () => {
          this.revisaoEnviando = false;
          this.erro = "N\xE3o foi poss\xEDvel enviar a revis\xE3o.";
          this.toast.error("Erro", this.erro);
        }
      });
    });
  }
  enviarComentario() {
    if (!this.protocolo || !this.novoComentario.trim())
      return;
    this.comentarioEnviando = true;
    this.protocolosService.comentario(this.protocolo.id, this.novoComentario.trim()).subscribe({
      next: () => {
        this.comentarioEnviando = false;
        this.novoComentario = "";
        this.toast.success("Coment\xE1rio adicionado", "Seu coment\xE1rio foi publicado.");
        this.carregar(this.protocolo.id);
      },
      error: () => {
        this.comentarioEnviando = false;
        this.erro = "N\xE3o foi poss\xEDvel adicionar o coment\xE1rio.";
        this.toast.error("Erro", this.erro);
      }
    });
  }
  eventosTimeline() {
    const p = this.protocolo;
    if (!p)
      return [];
    if (p.events?.length)
      return p.events;
    return [
      {
        type: "created",
        type_label: "Protocolo criado",
        body: void 0,
        user: void 0,
        created_at: p.created_at
      }
    ];
  }
  camposTemplate() {
    const fields = this.protocolo?.template?.fields;
    if (!fields?.length)
      return [];
    return fields.filter((f) => f.type !== "file" && f.type !== "signature");
  }
  valorCampo(field) {
    const p = this.protocolo;
    if (!p)
      return "\u2014";
    const key = field.name_key;
    const val = p.values_keyed?.[key] ?? p.form_data?.[key];
    if (val == null)
      return "\u2014";
    if (typeof val === "object" && "value_text" in val && val.value_text != null)
      return String(val.value_text);
    if (typeof val === "object" && "value_json" in val) {
      const j = val.value_json;
      if (Array.isArray(j))
        return j.join(", ");
      if (j != null)
        return String(j);
    }
    if (typeof val === "string")
      return val;
    if (Array.isArray(val))
      return val.join(", ");
    return String(val);
  }
  static \u0275fac = function ProtocolosDetalheComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ProtocolosDetalheComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ProtocolosDetalheComponent, selectors: [["app-protocolos-detalhe"]], decls: 4, vars: 3, consts: [[1, "protocolo-detalhe", "relative", "min-h-[320px]"], [1, "text-sm", "mb-4", 2, "color", "var(--c-error, #dc2626)"], [1, "space-y-4"], [1, "zm-content-enter", "space-y-6"], [3, "height"], [1, "flex", "flex-wrap", "items-start", "justify-between", "gap-4"], [1, "flex", "items-start", "gap-3"], [1, "w-10", "h-10", "rounded-lg", "flex", "items-center", "justify-center", "flex-shrink-0", 2, "background", "var(--c-soft)"], [1, "material-symbols-outlined", 2, "color", "var(--c-primary)"], [1, "text-xl", "font-semibold", "m-0", 2, "color", "var(--c-text)"], [1, "text-sm", "mt-1", "mb-0", 2, "color", "var(--c-muted)"], [1, "inline-flex", "items-center", "gap-1", "ml-2"], [1, "inline-flex", "items-center", "gap-1", "ml-2", 2, "color", "#22c55e"], [1, "inline-flex", "items-center", "gap-1", "ml-2", 2, "color", "#dc2626"], [1, "flex", "items-center", "gap-2", "flex-wrap"], ["type", "button", "title", "Baixar PDF", 1, "btn-ghost", "btn-default-bg", "inline-flex", "items-center", "gap-2", 3, "click"], [1, "material-symbols-outlined", "text-lg"], ["type", "button", "id", "btn-aprovar-reprovar", "title", "Aprovar / Reprovar", 1, "btn-primary", "inline-flex", "items-center", "gap-2"], [1, "card", "rounded-xl", "overflow-hidden", 2, "border", "1px solid var(--c-border)"], [1, "flex", "items-center", "gap-2", "px-5", "py-4", 2, "border-bottom", "1px solid var(--c-border)"], [1, "text-base", "font-semibold", "m-0", 2, "color", "var(--c-text)"], [1, "grid", "gap-3", "p-5", "text-sm"], [1, "font-semibold", "uppercase", "tracking-wider", "mb-0.5", 2, "color", "var(--c-muted)"], [1, "m-0", 2, "color", "var(--c-text)"], [1, "m-0", "text-xs", "mt-0.5", 2, "color", "var(--c-muted)"], [1, "p-5", "space-y-3", "list-none", "m-0"], [1, "text-sm", "border-l-2", "pl-4", "py-1", 2, "border-color", "var(--c-border)"], [1, "px-5", "py-4", 2, "border-bottom", "1px solid var(--c-border)"], [1, "p-5"], ["rows", "3", "placeholder", "Digite seu coment\xE1rio...", 1, "w-full", "py-2", "px-3", "text-sm", "border", "rounded-lg", "mb-3", 2, "border-color", "var(--c-border)", "background", "var(--c-surface)", "color", "var(--c-text)", 3, "ngModelChange", "ngModel"], ["type", "button", 1, "btn-primary", "inline-flex", "items-center", "gap-2", 3, "click", "disabled"], ["aria-hidden", "true", 1, "btn-spinner"], ["id", "revisao_form", 1, "card", "rounded-xl", "overflow-hidden", 2, "border", "1px solid var(--c-border)"], [1, "material-symbols-outlined", "text-base"], ["type", "button", "id", "btn-aprovar-reprovar", "title", "Aprovar / Reprovar", 1, "btn-primary", "inline-flex", "items-center", "gap-2", 3, "click"], [1, "m-0"], [1, "text-sm", "font-medium", "no-underline", 2, "color", "var(--c-primary)", 3, "routerLink"], [1, "m-0", "text-xs", "mt-0.5", "font-mono", 2, "color", "var(--c-muted)"], [1, "font-medium", 2, "color", "var(--c-text)"], [2, "color", "var(--c-text)"], [1, "text-xs", "mt-0.5", "mb-0", 2, "color", "var(--c-muted)"], [1, "p-5", "space-y-4"], [1, "block", "text-xs", "font-semibold", "uppercase", "tracking-wider", "mb-1.5", 2, "color", "var(--c-muted)"], [1, "w-full", "py-2", "px-3", "text-sm", "border", "rounded-lg", 2, "border-color", "var(--c-border)", "background", "var(--c-surface)", "color", "var(--c-text)", 3, "ngModelChange", "ngModel"], [3, "ngValue"], ["rows", "3", "placeholder", "Coment\xE1rio da revis\xE3o...", 1, "w-full", "py-2", "px-3", "text-sm", "border", "rounded-lg", 2, "border-color", "var(--c-border)", "background", "var(--c-surface)", "color", "var(--c-text)", 3, "ngModelChange", "ngModel"], [1, "p-5", "text-sm"], [1, "text-xs", "mt-2", "mb-0", 2, "color", "var(--c-muted)"], [1, "overflow-x-auto"], [1, "w-full", "text-sm", "border-collapse"], [2, "border-bottom", "1px solid var(--c-border)"], [1, "text-left", "py-3", "px-4", "font-semibold", 2, "color", "var(--c-text)"], [1, "py-3", "px-4", "font-medium", 2, "color", "var(--c-text)"], [1, "py-3", "px-4", 2, "color", "var(--c-text)"], [1, "text-sm", 2, "color", "var(--c-text)"], [1, "p-5", "space-y-2", "list-none", "m-0"], [1, "flex", "items-center", "gap-2", "text-sm"], [1, "material-symbols-outlined", "text-lg", 2, "color", "var(--c-muted)"], [1, "text-xs", 2, "color", "var(--c-muted)"]], template: function ProtocolosDetalheComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275conditionalCreate(1, ProtocolosDetalheComponent_Conditional_1_Template, 2, 1, "p", 1);
      \u0275\u0275conditionalCreate(2, ProtocolosDetalheComponent_Conditional_2_Template, 4, 3, "div", 2);
      \u0275\u0275conditionalCreate(3, ProtocolosDetalheComponent_Conditional_3_Template, 64, 18, "div", 3);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.erro ? 1 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showSkeleton() && !ctx.protocolo ? 2 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.erro && ctx.protocolo ? 3 : -1);
    }
  }, dependencies: [CommonModule, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel, RouterLink, ZmSkeletonCardComponent], styles: ["\n\n/*# sourceMappingURL=protocolos-detalhe.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ProtocolosDetalheComponent, [{
    type: Component,
    args: [{ selector: "app-protocolos-detalhe", standalone: true, imports: [CommonModule, FormsModule, RouterLink, ZmSkeletonCardComponent], template: `<div class="protocolo-detalhe relative min-h-[320px]">\r
  @if (erro) {\r
    <p class="text-sm mb-4" style="color: var(--c-error, #dc2626)">{{ erro }}</p>\r
  }\r
\r
  @if (showSkeleton() && !protocolo) {\r
    <div class="space-y-4">\r
      <zm-skeleton-card [height]="56" />\r
      <zm-skeleton-card [height]="200" />\r
      <zm-skeleton-card [height]="160" />\r
    </div>\r
  }\r
\r
  @if (!erro && protocolo) {\r
    <div class="zm-content-enter space-y-6">\r
      <!-- Header da p\xE1gina (igual \xE0 view antiga) -->\r
      <div class="flex flex-wrap items-start justify-between gap-4">\r
        <div class="flex items-start gap-3">\r
          <div class="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style="background: var(--c-soft)">\r
            <span class="material-symbols-outlined" style="color: var(--c-primary)">article</span>\r
          </div>\r
          <div>\r
            <h1 class="text-xl font-semibold m-0" style="color: var(--c-text)">Protocolo {{ protocolo.protocol_number || protocolo.id }}</h1>\r
            <p class="text-sm mt-1 mb-0" style="color: var(--c-muted)">\r
              {{ templateNome() }}\r
              @if (isPending) {\r
                <span class="inline-flex items-center gap-1 ml-2">\r
                  <span class="material-symbols-outlined text-base">schedule</span>\r
                  {{ statusLabel() }}\r
                </span>\r
              } @else if (protocolo.status && protocolo.status.toLowerCase() === 'approved') {\r
                <span class="inline-flex items-center gap-1 ml-2" style="color: #22c55e">\r
                  <span class="material-symbols-outlined text-base">check_circle</span>\r
                  {{ statusLabel() }}\r
                </span>\r
              } @else {\r
                <span class="inline-flex items-center gap-1 ml-2" style="color: #dc2626">\r
                  <span class="material-symbols-outlined text-base">cancel</span>\r
                  {{ statusLabel() }}\r
                </span>\r
              }\r
            </p>\r
          </div>\r
        </div>\r
        <div class="flex items-center gap-2 flex-wrap">\r
          <button type="button" class="btn-ghost btn-default-bg inline-flex items-center gap-2" (click)="baixarPdf()" title="Baixar PDF">\r
            <span class="material-symbols-outlined text-lg">picture_as_pdf</span>\r
            Baixar PDF\r
          </button>\r
          @if (isPending && podeRevisarProtocolo) {\r
            <button type="button" class="btn-primary inline-flex items-center gap-2" (click)="toggleFormRevisao()" id="btn-aprovar-reprovar" title="Aprovar / Reprovar">\r
              <span class="material-symbols-outlined text-lg">rate_review</span>\r
              Aprovar / Reprovar\r
            </button>\r
          }\r
        </div>\r
      </div>\r
\r
      <!-- Dados do protocolo -->\r
      <div class="card rounded-xl overflow-hidden" style="border: 1px solid var(--c-border)">\r
        <div class="flex items-center gap-2 px-5 py-4" style="border-bottom: 1px solid var(--c-border)">\r
          <span class="material-symbols-outlined" style="color: var(--c-primary)">info</span>\r
          <h2 class="text-base font-semibold m-0" style="color: var(--c-text)">Dados do protocolo</h2>\r
        </div>\r
        <dl class="grid gap-3 p-5 text-sm">\r
          <div>\r
            <dt class="font-semibold uppercase tracking-wider mb-0.5" style="color: var(--c-muted)">Data de submiss\xE3o</dt>\r
            <dd class="m-0" style="color: var(--c-text)">{{ dataFormatada(protocolo.submitted_at || protocolo.created_at) }}</dd>\r
          </div>\r
          @if (protocolo.person) {\r
            <div>\r
              <dt class="font-semibold uppercase tracking-wider mb-0.5" style="color: var(--c-muted)">Pessoa (ficha)</dt>\r
              <dd class="m-0">\r
                <a [routerLink]="['/pessoas', protocolo.person.id]" class="text-sm font-medium no-underline" style="color: var(--c-primary)">{{ protocolo.person.name }}</a>\r
              </dd>\r
              <dd class="m-0 text-xs mt-0.5 font-mono" style="color: var(--c-muted)">{{ protocolo.person.code }}</dd>\r
            </div>\r
          }\r
          <div>\r
            <dt class="font-semibold uppercase tracking-wider mb-0.5" style="color: var(--c-muted)">Submetente</dt>\r
            <dd class="m-0" style="color: var(--c-text)">{{ protocolo.submitter_name || '\u2014' }}</dd>\r
            @if (protocolo.submitter_email) {\r
              <dd class="m-0 text-xs mt-0.5" style="color: var(--c-muted)">{{ protocolo.submitter_email }}</dd>\r
            }\r
          </div>\r
          @if (protocolo.approved_at || protocolo.approved_by_name) {\r
            <div>\r
              <dt class="font-semibold uppercase tracking-wider mb-0.5" style="color: var(--c-muted)">Revisado em</dt>\r
              <dd class="m-0" style="color: var(--c-text)">{{ dataFormatada(protocolo.approved_at) }}</dd>\r
            </div>\r
            <div>\r
              <dt class="font-semibold uppercase tracking-wider mb-0.5" style="color: var(--c-muted)">Revisado por</dt>\r
              <dd class="m-0" style="color: var(--c-text)">{{ protocolo.approved_by_name || '\u2014' }}</dd>\r
            </div>\r
          }\r
        </dl>\r
      </div>\r
\r
      <!-- Hist\xF3rico -->\r
      <div class="card rounded-xl overflow-hidden" style="border: 1px solid var(--c-border)">\r
        <div class="flex items-center gap-2 px-5 py-4" style="border-bottom: 1px solid var(--c-border)">\r
          <span class="material-symbols-outlined" style="color: var(--c-primary)">history</span>\r
          <h2 class="text-base font-semibold m-0" style="color: var(--c-text)">Hist\xF3rico por data</h2>\r
        </div>\r
        <ul class="p-5 space-y-3 list-none m-0">\r
          @for (event of eventosTimeline(); track $index) {\r
            <li class="text-sm border-l-2 pl-4 py-1" style="border-color: var(--c-border)">\r
              <span class="font-medium" style="color: var(--c-text)">{{ event.type_label || 'Coment\xE1rio' }}</span>\r
              @if (event.body) {\r
                <span style="color: var(--c-text)"> \u2014 {{ event.body }}</span>\r
              }\r
              @if (event.user?.name || event.created_at) {\r
                <p class="text-xs mt-0.5 mb-0" style="color: var(--c-muted)">\r
                  @if (event.user?.name) {\r
                    {{ event.user?.name }}\r
                    @if (event.created_at) { \xB7 }\r
                  }\r
                  @if (event.created_at) {\r
                    {{ dataFormatada(event.created_at) }}\r
                  }\r
                </p>\r
              }\r
            </li>\r
          }\r
        </ul>\r
      </div>\r
\r
      <!-- Novo coment\xE1rio interno -->\r
      <div class="card rounded-xl overflow-hidden" style="border: 1px solid var(--c-border)">\r
        <div class="px-5 py-4" style="border-bottom: 1px solid var(--c-border)">\r
          <h2 class="text-base font-semibold m-0" style="color: var(--c-text)">Novo coment\xE1rio interno</h2>\r
        </div>\r
        <div class="p-5">\r
          <textarea [(ngModel)]="novoComentario" rows="3" class="w-full py-2 px-3 text-sm border rounded-lg mb-3" style="border-color: var(--c-border); background: var(--c-surface); color: var(--c-text)" placeholder="Digite seu coment\xE1rio..."></textarea>\r
          <button type="button" class="btn-primary inline-flex items-center gap-2" (click)="enviarComentario()" [disabled]="!novoComentario.trim() || comentarioEnviando">\r
            @if (comentarioEnviando) {\r
              <span class="btn-spinner" aria-hidden="true"></span>\r
            } @else {\r
              <span class="material-symbols-outlined text-lg">add_comment</span>\r
            }\r
            {{ comentarioEnviando ? 'Enviando\u2026' : 'Adicionar coment\xE1rio' }}\r
          </button>\r
        </div>\r
      </div>\r
\r
      <!-- Formul\xE1rio de revis\xE3o (se pendente) -->\r
      @if (isPending && revisaoFormVisible && podeRevisarProtocolo) {\r
        <div class="card rounded-xl overflow-hidden" id="revisao_form" style="border: 1px solid var(--c-border)">\r
          <div class="flex items-center gap-2 px-5 py-4" style="border-bottom: 1px solid var(--c-border)">\r
            <span class="material-symbols-outlined" style="color: var(--c-primary)">rate_review</span>\r
            <h2 class="text-base font-semibold m-0" style="color: var(--c-text)">Revisar protocolo</h2>\r
          </div>\r
          <div class="p-5 space-y-4">\r
            <div>\r
              <label class="block text-xs font-semibold uppercase tracking-wider mb-1.5" style="color: var(--c-muted)">Situa\xE7\xE3o</label>\r
              <select [(ngModel)]="revisaoAprovado" class="w-full py-2 px-3 text-sm border rounded-lg" style="border-color: var(--c-border); background: var(--c-surface); color: var(--c-text)">\r
                <option [ngValue]="true">Aprovado</option>\r
                <option [ngValue]="false">Reprovado</option>\r
              </select>\r
            </div>\r
            <div>\r
              <label class="block text-xs font-semibold uppercase tracking-wider mb-1.5" style="color: var(--c-muted)">Coment\xE1rio (opcional)</label>\r
              <textarea [(ngModel)]="comentarioRevisao" rows="3" class="w-full py-2 px-3 text-sm border rounded-lg" style="border-color: var(--c-border); background: var(--c-surface); color: var(--c-text)" placeholder="Coment\xE1rio da revis\xE3o..."></textarea>\r
            </div>\r
            <button type="button" class="btn-primary inline-flex items-center gap-2" (click)="enviarRevisao()" [disabled]="revisaoEnviando">\r
              @if (revisaoEnviando) {\r
                <span class="btn-spinner" aria-hidden="true"></span>\r
              } @else {\r
                <span class="material-symbols-outlined text-lg">send</span>\r
              }\r
              {{ revisaoEnviando ? 'Enviando\u2026' : 'Enviar revis\xE3o' }}\r
            </button>\r
          </div>\r
        </div>\r
      }\r
\r
      <!-- Coment\xE1rio da revis\xE3o -->\r
      @if (protocolo.review_comment) {\r
        <div class="card rounded-xl overflow-hidden" style="border: 1px solid var(--c-border)">\r
          <div class="flex items-center gap-2 px-5 py-4" style="border-bottom: 1px solid var(--c-border)">\r
            <span class="material-symbols-outlined" style="color: var(--c-primary)">comment</span>\r
            <h2 class="text-base font-semibold m-0" style="color: var(--c-text)">Coment\xE1rio da revis\xE3o</h2>\r
          </div>\r
          <div class="p-5 text-sm">\r
            <p class="m-0" style="color: var(--c-text)">{{ protocolo.review_comment }}</p>\r
            @if (protocolo.approved_by_name || protocolo.approved_at) {\r
              <p class="text-xs mt-2 mb-0" style="color: var(--c-muted)">\r
                Por {{ protocolo.approved_by_name || '\u2014' }} em {{ dataFormatada(protocolo.approved_at) }}\r
              </p>\r
            }\r
          </div>\r
        </div>\r
      }\r
\r
      <!-- Tabela Campo / Resposta -->\r
      @if (camposTemplate().length > 0) {\r
        <div class="card rounded-xl overflow-hidden" style="border: 1px solid var(--c-border)">\r
          <div class="overflow-x-auto">\r
            <table class="w-full text-sm border-collapse">\r
              <thead>\r
                <tr style="border-bottom: 1px solid var(--c-border)">\r
                  <th class="text-left py-3 px-4 font-semibold" style="color: var(--c-text)">Campo</th>\r
                  <th class="text-left py-3 px-4 font-semibold" style="color: var(--c-text)">Resposta</th>\r
                </tr>\r
              </thead>\r
              <tbody>\r
                @for (field of camposTemplate(); track field.name_key) {\r
                  <tr style="border-bottom: 1px solid var(--c-border)">\r
                    <td class="py-3 px-4 font-medium" style="color: var(--c-text)">{{ field.label }}</td>\r
                    <td class="py-3 px-4" style="color: var(--c-text)">{{ valorCampo(field) }}</td>\r
                  </tr>\r
                }\r
              </tbody>\r
            </table>\r
          </div>\r
        </div>\r
      }\r
\r
      <!-- Assinatura(s) -->\r
      @if (protocolo.signatures && protocolo.signatures.length > 0) {\r
        <div class="card rounded-xl overflow-hidden" style="border: 1px solid var(--c-border)">\r
          <div class="flex items-center gap-2 px-5 py-4" style="border-bottom: 1px solid var(--c-border)">\r
            <span class="material-symbols-outlined" style="color: var(--c-primary)">draw</span>\r
            <h2 class="text-base font-semibold m-0" style="color: var(--c-text)">Assinatura(s)</h2>\r
          </div>\r
          <div class="p-5">\r
            @for (sig of protocolo.signatures; track $index) {\r
              <div class="text-sm" style="color: var(--c-text)">Assinatura registrada</div>\r
            }\r
          </div>\r
        </div>\r
      }\r
\r
      <!-- Anexos -->\r
      @if (protocolo.attachments && protocolo.attachments.length > 0) {\r
        <div class="card rounded-xl overflow-hidden" style="border: 1px solid var(--c-border)">\r
          <div class="flex items-center gap-2 px-5 py-4" style="border-bottom: 1px solid var(--c-border)">\r
            <span class="material-symbols-outlined" style="color: var(--c-primary)">attach_file</span>\r
            <h2 class="text-base font-semibold m-0" style="color: var(--c-text)">Anexos</h2>\r
          </div>\r
          <ul class="p-5 space-y-2 list-none m-0">\r
            @for (att of protocolo.attachments; track $index) {\r
              <li class="flex items-center gap-2 text-sm">\r
                <span class="material-symbols-outlined text-lg" style="color: var(--c-muted)">description</span>\r
                <span style="color: var(--c-text)">{{ att.original_name || 'Anexo' }}</span>\r
                @if (att.size != null) {\r
                  <span class="text-xs" style="color: var(--c-muted)">{{ (att.size / 1024).toFixed(1) }} KB</span>\r
                }\r
              </li>\r
            }\r
          </ul>\r
        </div>\r
      }\r
    </div>\r
  }\r
</div>\r
`, styles: ["/* src/app/paginas/protocolos/protocolos-detalhe.component.css */\n/*# sourceMappingURL=protocolos-detalhe.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProtocolosDetalheComponent, { className: "ProtocolosDetalheComponent", filePath: "src/app/paginas/protocolos/protocolos-detalhe.component.ts", lineNumber: 24 });
})();
export {
  ProtocolosDetalheComponent
};
//# sourceMappingURL=chunk-SVL3QERV.js.map
