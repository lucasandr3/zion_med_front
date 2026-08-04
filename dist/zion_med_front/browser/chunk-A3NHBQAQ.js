import {
  TemplatesService
} from "./chunk-E3NIIMGP.js";
import {
  LoadingService,
  ZmSkeletonListComponent
} from "./chunk-GKI5AWTV.js";
import "./chunk-7WBHVE2H.js";
import {
  ConfirmDialogService
} from "./chunk-RISAXZFK.js";
import {
  ToastService
} from "./chunk-EZUVP6MG.js";
import {
  CheckboxControlValueAccessor,
  DefaultValueAccessor,
  FormsModule,
  MaxLengthValidator,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  PatternValidator,
  SelectControlValueAccessor,
  ɵNgSelectMultipleOption
} from "./chunk-USROZ7PW.js";
import "./chunk-IBJWGIJV.js";
import {
  ActivatedRoute,
  RouterLink
} from "./chunk-C2NWBPZH.js";
import {
  CommonModule,
  Component,
  __async,
  catchError,
  inject,
  map,
  of,
  setClassMetadata,
  switchMap,
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
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-GRLISYEV.js";

// src/app/paginas/templates/templates-campos.component.ts
var _c0 = (a0) => ["/templates", a0, "editar"];
var _forTrack0 = ($index, $item) => $item.value;
var _forTrack1 = ($index, $item) => $item.id;
function TemplatesCamposComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "zm-skeleton-list", 1);
  }
  if (rf & 2) {
    \u0275\u0275property("rows", 6);
  }
}
function TemplatesCamposComponent_Conditional_2_Template(rf, ctx) {
}
function TemplatesCamposComponent_Conditional_3_Conditional_7_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 33);
  }
}
function TemplatesCamposComponent_Conditional_3_Conditional_7_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 8);
    \u0275\u0275text(1, "link_off");
    \u0275\u0275elementEnd();
  }
}
function TemplatesCamposComponent_Conditional_3_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 42);
    \u0275\u0275listener("click", function TemplatesCamposComponent_Conditional_3_Conditional_7_Template_button_click_0_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.copiarLink($event));
    });
    \u0275\u0275elementStart(1, "span", 8);
    \u0275\u0275text(2, "content_copy");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 43);
    \u0275\u0275text(4, "Copiar link");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "a", 44)(6, "span", 8);
    \u0275\u0275text(7, "open_in_new");
    \u0275\u0275elementEnd();
    \u0275\u0275text(8, " Abrir ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "button", 45);
    \u0275\u0275listener("click", function TemplatesCamposComponent_Conditional_3_Conditional_7_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.desativarLink());
    });
    \u0275\u0275conditionalCreate(10, TemplatesCamposComponent_Conditional_3_Conditional_7_Conditional_10_Template, 1, 0, "span", 33)(11, TemplatesCamposComponent_Conditional_3_Conditional_7_Conditional_11_Template, 2, 0, "span", 8);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275property("href", ctx_r2.linkPublicoUrl, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r2.desativandoLink);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.desativandoLink ? 10 : 11);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r2.desativandoLink ? "Desativando\u2026" : "Desativar link", " ");
  }
}
function TemplatesCamposComponent_Conditional_3_Conditional_8_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 33);
  }
}
function TemplatesCamposComponent_Conditional_3_Conditional_8_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 8);
    \u0275\u0275text(1, "link");
    \u0275\u0275elementEnd();
  }
}
function TemplatesCamposComponent_Conditional_3_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 46);
    \u0275\u0275listener("click", function TemplatesCamposComponent_Conditional_3_Conditional_8_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.gerarLink());
    });
    \u0275\u0275conditionalCreate(1, TemplatesCamposComponent_Conditional_3_Conditional_8_Conditional_1_Template, 1, 0, "span", 33)(2, TemplatesCamposComponent_Conditional_3_Conditional_8_Conditional_2_Template, 2, 0, "span", 8);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275property("disabled", ctx_r2.gerandoLink);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.gerandoLink ? 1 : 2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r2.gerandoLink ? "Gerando\u2026" : "Gerar link p\xFAblico", " ");
  }
}
function TemplatesCamposComponent_Conditional_3_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 10);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.erro);
  }
}
function TemplatesCamposComponent_Conditional_3_For_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 22);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const opt_r5 = ctx.$implicit;
    \u0275\u0275property("value", opt_r5.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(opt_r5.label);
  }
}
function TemplatesCamposComponent_Conditional_3_Conditional_40_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 27)(1, "label", 47);
    \u0275\u0275text(2, "Lista de op\xE7\xF5es que o usu\xE1rio poder\xE1 escolher");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 48);
    \u0275\u0275text(4, "Para Select e Radio. Digite uma op\xE7\xE3o por linha.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "textarea", 49);
    \u0275\u0275twoWayListener("ngModelChange", function TemplatesCamposComponent_Conditional_3_Conditional_40_Template_textarea_ngModelChange_5_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r2.novoOptionsText, $event) || (ctx_r2.novoOptionsText = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.novoOptionsText);
  }
}
function TemplatesCamposComponent_Conditional_3_Conditional_47_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 33);
  }
}
function TemplatesCamposComponent_Conditional_3_Conditional_48_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 8);
    \u0275\u0275text(1, "add");
    \u0275\u0275elementEnd();
  }
}
function TemplatesCamposComponent_Conditional_3_Conditional_73_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 50)(2, "div", 51)(3, "div", 52)(4, "span", 13);
    \u0275\u0275text(5, "view_list");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "p", 53);
    \u0275\u0275text(7, "Nenhum campo adicionado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p", 54);
    \u0275\u0275text(9, "Use o formul\xE1rio acima para adicionar campos ao modelo.");
    \u0275\u0275elementEnd()()()();
  }
}
function TemplatesCamposComponent_Conditional_3_Conditional_74_For_1_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 61);
  }
}
function TemplatesCamposComponent_Conditional_3_Conditional_74_For_1_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 62);
    \u0275\u0275text(1, "\u2014");
    \u0275\u0275elementEnd();
  }
}
function TemplatesCamposComponent_Conditional_3_Conditional_74_For_1_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 67);
  }
}
function TemplatesCamposComponent_Conditional_3_Conditional_74_For_1_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 65);
    \u0275\u0275text(1, "delete");
    \u0275\u0275elementEnd();
  }
}
function TemplatesCamposComponent_Conditional_3_Conditional_74_For_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td")(2, "span", 55);
    \u0275\u0275text(3, "\u283F");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "td", 56);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "td")(7, "span", 57)(8, "span", 13);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "td", 58);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "td")(14, "span", 59);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "td", 60);
    \u0275\u0275conditionalCreate(17, TemplatesCamposComponent_Conditional_3_Conditional_74_For_1_Conditional_17_Template, 1, 0, "span", 61)(18, TemplatesCamposComponent_Conditional_3_Conditional_74_For_1_Conditional_18_Template, 2, 0, "span", 62);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "td")(20, "div", 63)(21, "button", 64);
    \u0275\u0275listener("click", function TemplatesCamposComponent_Conditional_3_Conditional_74_For_1_Template_button_click_21_listener() {
      const c_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.abrirModalEditar(c_r8));
    });
    \u0275\u0275elementStart(22, "span", 65);
    \u0275\u0275text(23, "edit");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "button", 66);
    \u0275\u0275listener("click", function TemplatesCamposComponent_Conditional_3_Conditional_74_For_1_Template_button_click_24_listener() {
      const c_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.removerCampo(c_r8));
    });
    \u0275\u0275conditionalCreate(25, TemplatesCamposComponent_Conditional_3_Conditional_74_For_1_Conditional_25_Template, 1, 0, "span", 67)(26, TemplatesCamposComponent_Conditional_3_Conditional_74_For_1_Conditional_26_Template, 2, 0, "span", 65);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const c_r8 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r2.ordemFormatada(c_r8.sort_order));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r2.tipoIcon(c_r8.type));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", c_r8.type, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(c_r8.label);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(c_r8.name_key);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(c_r8.required ? 17 : 18);
    \u0275\u0275advance(7);
    \u0275\u0275property("disabled", ctx_r2.removendoId === c_r8.id);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.removendoId === c_r8.id ? 25 : 26);
  }
}
function TemplatesCamposComponent_Conditional_3_Conditional_74_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, TemplatesCamposComponent_Conditional_3_Conditional_74_For_1_Template, 27, 8, "tr", null, _forTrack1);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275repeater(ctx_r2.campos);
  }
}
function TemplatesCamposComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 2)(1, "div", 5)(2, "div", 6)(3, "a", 7)(4, "span", 8);
    \u0275\u0275text(5, "edit");
    \u0275\u0275elementEnd();
    \u0275\u0275text(6, " Editar modelo ");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(7, TemplatesCamposComponent_Conditional_3_Conditional_7_Template, 13, 4)(8, TemplatesCamposComponent_Conditional_3_Conditional_8_Template, 4, 3, "button", 9);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(9, TemplatesCamposComponent_Conditional_3_Conditional_9_Template, 2, 1, "p", 10);
    \u0275\u0275elementStart(10, "div", 11)(11, "div", 12)(12, "span", 13);
    \u0275\u0275text(13, "add_circle");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "span", 14);
    \u0275\u0275text(15, "Adicionar campo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "span", 15);
    \u0275\u0275text(17, "Novo");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "div", 16)(19, "div", 17)(20, "div", 18)(21, "label", 19);
    \u0275\u0275text(22, "Tipo ");
    \u0275\u0275elementStart(23, "span", 20);
    \u0275\u0275text(24, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "select", 21);
    \u0275\u0275twoWayListener("ngModelChange", function TemplatesCamposComponent_Conditional_3_Template_select_ngModelChange_25_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.novoType, $event) || (ctx_r2.novoType = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275repeaterCreate(26, TemplatesCamposComponent_Conditional_3_For_27_Template, 2, 2, "option", 22, _forTrack0);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(28, "div", 18)(29, "label", 23);
    \u0275\u0275text(30, "R\xF3tulo ");
    \u0275\u0275elementStart(31, "span", 20);
    \u0275\u0275text(32, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(33, "input", 24);
    \u0275\u0275twoWayListener("ngModelChange", function TemplatesCamposComponent_Conditional_3_Template_input_ngModelChange_33_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.novoLabel, $event) || (ctx_r2.novoLabel = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(34, "div", 18)(35, "label", 25);
    \u0275\u0275text(36, "Chave (name_key) ");
    \u0275\u0275elementStart(37, "span", 20);
    \u0275\u0275text(38, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(39, "input", 26);
    \u0275\u0275twoWayListener("ngModelChange", function TemplatesCamposComponent_Conditional_3_Template_input_ngModelChange_39_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.novoNameKey, $event) || (ctx_r2.novoNameKey = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(40, TemplatesCamposComponent_Conditional_3_Conditional_40_Template, 6, 1, "div", 27);
    \u0275\u0275elementStart(41, "div", 28)(42, "div", 29)(43, "input", 30);
    \u0275\u0275twoWayListener("ngModelChange", function TemplatesCamposComponent_Conditional_3_Template_input_ngModelChange_43_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.novoRequired, $event) || (ctx_r2.novoRequired = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(44, "label", 31);
    \u0275\u0275text(45, "Campo obrigat\xF3rio");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(46, "button", 32);
    \u0275\u0275listener("click", function TemplatesCamposComponent_Conditional_3_Template_button_click_46_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.adicionarCampo());
    });
    \u0275\u0275conditionalCreate(47, TemplatesCamposComponent_Conditional_3_Conditional_47_Template, 1, 0, "span", 33)(48, TemplatesCamposComponent_Conditional_3_Conditional_48_Template, 2, 0, "span", 8);
    \u0275\u0275text(49);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(50, "div", 34)(51, "div", 35)(52, "div", 36);
    \u0275\u0275text(53, " Campos configurados ");
    \u0275\u0275elementStart(54, "span", 37);
    \u0275\u0275text(55);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(56, "table")(57, "thead")(58, "tr");
    \u0275\u0275element(59, "th", 38);
    \u0275\u0275elementStart(60, "th", 39);
    \u0275\u0275text(61, "Ordem");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(62, "th");
    \u0275\u0275text(63, "Tipo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(64, "th");
    \u0275\u0275text(65, "R\xF3tulo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(66, "th");
    \u0275\u0275text(67, "Chave");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(68, "th", 40);
    \u0275\u0275text(69, "Req.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(70, "th", 41);
    \u0275\u0275text(71, "A\xE7\xF5es");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(72, "tbody");
    \u0275\u0275conditionalCreate(73, TemplatesCamposComponent_Conditional_3_Conditional_73_Template, 10, 0, "tr")(74, TemplatesCamposComponent_Conditional_3_Conditional_74_Template, 2, 0);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(13, _c0, ctx_r2.templateId));
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx_r2.linkPublicoUrl ? 7 : 8);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.erro ? 9 : -1);
    \u0275\u0275advance(16);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.novoType);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.typeOptions);
    \u0275\u0275advance(7);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.novoLabel);
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.novoNameKey);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.showNovoOptions ? 40 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.novoRequired);
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r2.salvandoCampo || !ctx_r2.novoLabel.trim() || !ctx_r2.novoNameKey.trim());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.salvandoCampo ? 47 : 48);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r2.salvandoCampo ? "Salvando\u2026" : "Adicionar campo", " ");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r2.campos.length);
    \u0275\u0275advance(18);
    \u0275\u0275conditional(ctx_r2.campos.length === 0 ? 73 : 74);
  }
}
function TemplatesCamposComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 3);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.erro);
  }
}
function TemplatesCamposComponent_Conditional_5_For_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 22);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const opt_r10 = ctx.$implicit;
    \u0275\u0275property("value", opt_r10.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(opt_r10.label);
  }
}
function TemplatesCamposComponent_Conditional_5_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div")(1, "label", 88);
    \u0275\u0275text(2, "Lista de op\xE7\xF5es que o usu\xE1rio poder\xE1 escolher");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 48);
    \u0275\u0275text(4, "Para Select e Radio. Digite uma op\xE7\xE3o por linha.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "textarea", 89);
    \u0275\u0275twoWayListener("ngModelChange", function TemplatesCamposComponent_Conditional_5_Conditional_29_Template_textarea_ngModelChange_5_listener($event) {
      \u0275\u0275restoreView(_r11);
      const ctx_r2 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r2.editOptionsText, $event) || (ctx_r2.editOptionsText = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.editOptionsText);
  }
}
function TemplatesCamposComponent_Conditional_5_Conditional_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 33);
  }
}
function TemplatesCamposComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 68);
    \u0275\u0275listener("click", function TemplatesCamposComponent_Conditional_5_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.fecharModal());
    });
    \u0275\u0275elementStart(1, "div", 69);
    \u0275\u0275listener("click", function TemplatesCamposComponent_Conditional_5_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r9);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 70)(3, "h2", 71);
    \u0275\u0275text(4, "Editar campo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 72);
    \u0275\u0275listener("click", function TemplatesCamposComponent_Conditional_5_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.fecharModal());
    });
    \u0275\u0275elementStart(6, "span", 73);
    \u0275\u0275text(7, "close");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(8, "div", 74)(9, "div")(10, "label", 75);
    \u0275\u0275text(11, "Tipo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "select", 76);
    \u0275\u0275twoWayListener("ngModelChange", function TemplatesCamposComponent_Conditional_5_Template_select_ngModelChange_12_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.editType, $event) || (ctx_r2.editType = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275repeaterCreate(13, TemplatesCamposComponent_Conditional_5_For_14_Template, 2, 2, "option", 22, _forTrack0);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "div")(16, "label", 77);
    \u0275\u0275text(17, "R\xF3tulo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "input", 78);
    \u0275\u0275twoWayListener("ngModelChange", function TemplatesCamposComponent_Conditional_5_Template_input_ngModelChange_18_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.editLabel, $event) || (ctx_r2.editLabel = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "div")(20, "label", 79);
    \u0275\u0275text(21, "Chave (name_key)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "input", 80);
    \u0275\u0275twoWayListener("ngModelChange", function TemplatesCamposComponent_Conditional_5_Template_input_ngModelChange_22_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.editNameKey, $event) || (ctx_r2.editNameKey = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "p", 81);
    \u0275\u0275text(24, "Apenas letras min\xFAsculas, n\xFAmeros e underscore.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "div", 82)(26, "input", 83);
    \u0275\u0275twoWayListener("ngModelChange", function TemplatesCamposComponent_Conditional_5_Template_input_ngModelChange_26_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.editRequired, $event) || (ctx_r2.editRequired = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "label", 84);
    \u0275\u0275text(28, "Obrigat\xF3rio");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(29, TemplatesCamposComponent_Conditional_5_Conditional_29_Template, 6, 1, "div");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "div", 85)(31, "button", 86);
    \u0275\u0275listener("click", function TemplatesCamposComponent_Conditional_5_Template_button_click_31_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.fecharModal());
    });
    \u0275\u0275text(32, "Cancelar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "button", 87);
    \u0275\u0275listener("click", function TemplatesCamposComponent_Conditional_5_Template_button_click_33_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.salvarEdicao());
    });
    \u0275\u0275conditionalCreate(34, TemplatesCamposComponent_Conditional_5_Conditional_34_Template, 1, 0, "span", 33);
    \u0275\u0275text(35);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(12);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.editType);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.typeOptions);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.editLabel);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.editNameKey);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.editRequired);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r2.showEditOptions ? 29 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r2.salvandoCampo);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.salvandoCampo ? 34 : -1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.salvandoCampo ? "Salvando\u2026" : "Salvar", " ");
  }
}
var TYPE_OPTIONS = [
  { value: "text", label: "Texto curto" },
  { value: "textarea", label: "Texto longo" },
  { value: "number", label: "N\xFAmero" },
  { value: "date", label: "Data" },
  { value: "select", label: "Select" },
  { value: "radio", label: "Radio" },
  { value: "checkbox", label: "Checkbox" },
  { value: "file", label: "Anexo" },
  { value: "signature", label: "Assinatura" }
];
var TYPE_ICONS = {
  text: "text_fields",
  textarea: "notes",
  number: "numbers",
  date: "calendar_today",
  select: "arrow_drop_down_circle",
  radio: "radio_button_checked",
  checkbox: "check_box",
  file: "attach_file",
  signature: "draw"
};
var TemplatesCamposComponent = class _TemplatesCamposComponent {
  templateId = "";
  template = null;
  campos = [];
  linkPublicoUrl = "";
  showSkeleton;
  listaPronta = false;
  erro = "";
  gerandoLink = false;
  desativandoLink = false;
  salvandoCampo = false;
  removendoId = null;
  /** Formulário "Adicionar campo" */
  novoType = "text";
  novoLabel = "";
  novoNameKey = "";
  novoOptionsText = "";
  novoRequired = false;
  /** Modal Editar campo */
  modalAberto = false;
  editCampo = null;
  editType = "text";
  editLabel = "";
  editNameKey = "";
  editOptionsText = "";
  editRequired = false;
  typeOptions = TYPE_OPTIONS;
  typeIcons = TYPE_ICONS;
  route = inject(ActivatedRoute);
  templatesService = inject(TemplatesService);
  loadingService = inject(LoadingService);
  toast = inject(ToastService);
  confirm = inject(ConfirmDialogService);
  get idNum() {
    return parseInt(this.templateId, 10) || 0;
  }
  get showNovoOptions() {
    return ["select", "radio"].includes(this.novoType);
  }
  get showEditOptions() {
    return ["select", "radio"].includes(this.editType);
  }
  get tipoIcon() {
    return (type) => TYPE_ICONS[type] ?? "tune";
  }
  constructor() {
    this.templateId = this.route.snapshot.paramMap.get("id") ?? "";
  }
  ngOnInit() {
    this.carregar();
  }
  carregar() {
    const id = this.idNum;
    if (!id)
      return;
    this.erro = "";
    const load$ = this.templatesService.get(id).pipe(switchMap((t) => this.templatesService.getCampos(id).pipe(map((list) => ({ t, list })), catchError(() => of({ t, list: [] })))));
    const { data$, showSkeleton } = this.loadingService.loadWithThreshold(load$);
    this.showSkeleton = showSkeleton;
    data$.subscribe({
      next: ({ t, list }) => {
        this.listaPronta = true;
        this.template = t;
        if (t.public_url)
          this.linkPublicoUrl = t.public_url;
        this.campos = list;
      },
      error: () => {
        this.listaPronta = true;
        this.erro = "N\xE3o foi poss\xEDvel carregar o template.";
      }
    });
  }
  adicionarCampo() {
    const id = this.idNum;
    if (!id)
      return;
    const label = this.novoLabel?.trim();
    const nameKey = this.novoNameKey?.trim().toLowerCase().replace(/\s+/g, "_");
    if (!label || !nameKey)
      return;
    const payload = {
      type: this.novoType,
      label,
      name_key: nameKey,
      required: this.novoRequired
    };
    if (this.showNovoOptions && this.novoOptionsText?.trim()) {
      payload.options = this.novoOptionsText.split(/\n/).map((s) => s.trim()).filter(Boolean);
    }
    this.salvandoCampo = true;
    this.templatesService.storeCampo(id, payload).subscribe({
      next: () => {
        this.salvandoCampo = false;
        this.novoLabel = "";
        this.novoNameKey = "";
        this.novoOptionsText = "";
        this.novoRequired = false;
        this.carregar();
        this.toast.success("Campo adicionado", "O novo campo foi salvo.");
      },
      error: (err) => {
        this.salvandoCampo = false;
        this.erro = err?.error?.message ?? "N\xE3o foi poss\xEDvel adicionar o campo.";
        this.toast.error("Erro", this.erro);
      }
    });
  }
  abrirModalEditar(c) {
    this.editCampo = c;
    this.editType = c.type;
    this.editLabel = c.label;
    this.editNameKey = c.name_key;
    this.editOptionsText = Array.isArray(c.options) ? c.options.join("\n") : "";
    this.editRequired = !!c.required;
    this.modalAberto = true;
  }
  fecharModal() {
    this.modalAberto = false;
    this.editCampo = null;
  }
  salvarEdicao() {
    const id = this.idNum;
    if (!id || !this.editCampo)
      return;
    const payload = {
      type: this.editType,
      label: this.editLabel?.trim() || this.editCampo.label,
      name_key: this.editNameKey?.trim().toLowerCase().replace(/\s+/g, "_") || this.editCampo.name_key,
      required: this.editRequired
    };
    if (this.showEditOptions) {
      payload.options = this.editOptionsText.split(/\n/).map((s) => s.trim()).filter(Boolean);
    }
    this.salvandoCampo = true;
    this.templatesService.updateCampo(id, this.editCampo.id, payload).subscribe({
      next: () => {
        this.salvandoCampo = false;
        this.fecharModal();
        this.carregar();
        this.toast.success("Campo atualizado", "As altera\xE7\xF5es foram salvas.");
      },
      error: (err) => {
        this.salvandoCampo = false;
        this.erro = err?.error?.message ?? "N\xE3o foi poss\xEDvel salvar.";
        this.toast.error("Erro ao salvar", this.erro);
      }
    });
  }
  removerCampo(c) {
    return __async(this, null, function* () {
      const ok = yield this.confirm.request({
        title: "Remover campo?",
        messageBefore: "O campo ",
        emphasis: c.label,
        messageAfter: " ser\xE1 removido do template. Esta a\xE7\xE3o n\xE3o pode ser desfeita.",
        confirmLabel: "Sim, remover",
        variant: "danger"
      });
      if (!ok)
        return;
      const id = this.idNum;
      if (!id)
        return;
      this.removendoId = c.id;
      this.templatesService.destroyCampo(id, c.id).subscribe({
        next: () => {
          this.removendoId = null;
          this.carregar();
          this.toast.success("Campo removido", `${c.label} foi exclu\xEDdo.`);
        },
        error: () => {
          this.removendoId = null;
          this.erro = "N\xE3o foi poss\xEDvel remover o campo.";
          this.toast.error("Erro", this.erro);
        }
      });
    });
  }
  gerarLink() {
    const id = this.idNum;
    if (!id)
      return;
    this.gerandoLink = true;
    this.templatesService.gerarLink(id).subscribe({
      next: (res) => {
        this.gerandoLink = false;
        const url = res?.data?.public_url;
        if (url)
          this.linkPublicoUrl = url;
        else if (typeof window !== "undefined") {
          const token = res?.data?.token;
          if (token)
            this.linkPublicoUrl = `${window.location.origin}/f/${token}`;
        }
        this.carregar();
        this.toast.success("Link p\xFAblico gerado", "O link est\xE1 dispon\xEDvel para copiar.");
      },
      error: () => {
        this.gerandoLink = false;
        this.erro = "N\xE3o foi poss\xEDvel gerar o link.";
        this.toast.error("Erro", this.erro);
      }
    });
  }
  desativarLink() {
    return __async(this, null, function* () {
      const ok = yield this.confirm.request({
        title: "Desativar link p\xFAblico?",
        message: "O formul\xE1rio deixar\xE1 de ser acess\xEDvel pelo link atual. Voc\xEA poder\xE1 gerar um novo link depois.",
        confirmLabel: "Sim, desativar",
        variant: "danger"
      });
      if (!ok)
        return;
      const id = this.idNum;
      if (!id)
        return;
      this.desativandoLink = true;
      this.templatesService.desativarLink(id).subscribe({
        next: () => {
          this.desativandoLink = false;
          this.linkPublicoUrl = "";
          this.carregar();
          this.toast.success("Link desativado", "O link p\xFAblico foi removido.");
        },
        error: () => {
          this.desativandoLink = false;
          this.erro = "N\xE3o foi poss\xEDvel desativar o link.";
          this.toast.error("Erro", this.erro);
        }
      });
    });
  }
  copiarLink(event) {
    if (!this.linkPublicoUrl)
      return;
    const btn = event?.currentTarget ?? null;
    navigator.clipboard.writeText(this.linkPublicoUrl).then(() => {
      const lbl = btn?.querySelector(".copy-label");
      if (lbl) {
        const t = lbl.textContent;
        lbl.textContent = "Copiado!";
        setTimeout(() => {
          lbl.textContent = t ?? "";
        }, 2e3);
      }
    });
  }
  ordemFormatada(sortOrder) {
    return String(sortOrder).padStart(2, "0");
  }
  static \u0275fac = function TemplatesCamposComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TemplatesCamposComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TemplatesCamposComponent, selectors: [["app-templates-campos"]], decls: 6, vars: 3, consts: [[1, "relative", "min-h-[320px]"], [3, "rows"], [1, "zm-content-enter"], [1, "text-sm", 2, "color", "var(--c-error, #dc2626)"], [1, "fixed", "inset-0", "z-50", "flex", "items-center", "justify-center", "p-4", 2, "background", "rgba(0,0,0,0.4)"], [1, "page-header", "mb-6"], [2, "display", "flex", "gap", "0.625rem", "flex-wrap", "wrap", "align-items", "center"], [1, "btn", "btn-ghost", 3, "routerLink"], [1, "material-symbols-outlined", 2, "font-size", "14px"], ["type", "button", 1, "btn", "btn-primary", 3, "disabled"], [1, "text-sm", "mb-4", 2, "color", "var(--c-error, #dc2626)"], [1, "campos-add-card"], [1, "campos-card-header"], [1, "material-symbols-outlined"], [1, "campos-card-header-title"], [1, "campos-badge"], [1, "campos-form-body"], [1, "campos-form-grid"], [1, "campos-form-field"], ["for", "new_type", 1, "campos-form-label"], [1, "required"], ["id", "new_type", 1, "form-select", 3, "ngModelChange", "ngModel"], [3, "value"], ["for", "new_label", 1, "campos-form-label"], ["type", "text", "id", "new_label", "placeholder", "Ex: Nome completo", 1, "form-input", 3, "ngModelChange", "ngModel"], ["for", "new_name_key", 1, "campos-form-label"], ["type", "text", "id", "new_name_key", "placeholder", "ex: nome_completo", "maxlength", "80", "pattern", "[a-z0-9_]+", 1, "form-input", 2, "font-family", "ui-monospace, monospace", "font-size", "0.8125rem", 3, "ngModelChange", "ngModel"], [1, "campos-form-field", 2, "margin-bottom", "1rem"], [1, "campos-form-footer"], [1, "campos-toggle-group"], ["type", "checkbox", "id", "new_required", 1, "form-checkbox", 3, "ngModelChange", "ngModel"], ["for", "new_required", 1, "campos-toggle-label"], ["type", "button", 1, "campos-btn-add", 3, "click", "disabled"], ["aria-hidden", "true", 1, "btn-spinner"], [1, "campos-table-card"], [1, "campos-table-topbar"], [1, "campos-table-topbar-title"], [1, "campos-count-badge"], [2, "width", "50px"], [2, "width", "60px"], [2, "width", "100px", "text-align", "center"], [2, "width", "110px", "text-align", "center"], ["type", "button", 1, "btn", "btn-primary", 3, "click"], [1, "copy-label"], ["target", "_blank", "rel", "noopener", 1, "btn", "btn-ghost", 3, "href"], ["type", "button", 1, "btn", "btn-ghost", 3, "click", "disabled"], ["type", "button", 1, "btn", "btn-primary", 3, "click", "disabled"], ["for", "new_options_text", 1, "campos-form-label"], [1, "text-xs", "mb-1.5", 2, "color", "var(--c-muted)"], ["id", "new_options_text", "rows", "3", "placeholder", "Ex.: Op\xE7\xE3o 1\nOp\xE7\xE3o 2\nOp\xE7\xE3o 3", 1, "form-input", 3, "ngModelChange", "ngModel"], ["colspan", "7", 2, "padding", "0"], [1, "campos-empty"], [1, "campos-empty-icon"], [1, "campos-empty-title"], [1, "campos-empty-sub"], ["aria-hidden", "true", 1, "campos-drag-handle"], [2, "color", "var(--c-muted)", "font-weight", "600", "font-size", "0.8125rem"], [1, "campos-type-pill"], [2, "font-weight", "500"], [1, "campos-key-chip"], [2, "text-align", "center"], ["title", "Obrigat\xF3rio", 1, "campos-required-dot"], [2, "color", "var(--c-border)", "font-size", "0.75rem"], [1, "campos-actions"], ["type", "button", "aria-label", "Editar campo", "title", "Editar campo", 1, "campos-icon-btn", 3, "click"], [1, "material-symbols-outlined", 2, "font-size", "13px"], ["type", "button", "aria-label", "Remover campo", "title", "Remover campo", 1, "campos-icon-btn", "danger", 3, "click", "disabled"], [1, "btn-spinner", 2, "width", "13px", "height", "13px", "border-width", "2px"], [1, "fixed", "inset-0", "z-50", "flex", "items-center", "justify-center", "p-4", 2, "background", "rgba(0,0,0,0.4)", 3, "click"], [1, "rounded-xl", "border", "w-full", "max-w-lg", "overflow-hidden", 2, "background", "var(--c-surface)", "border-color", "var(--c-border)", "box-shadow", "0 10px 40px rgba(0,0,0,0.2)", "color", "var(--c-text)", 3, "click"], [1, "flex", "items-center", "justify-between", "p-4", "border-b", 2, "border-color", "var(--c-border)"], [1, "font-semibold", "text-lg"], ["type", "button", "aria-label", "Fechar", "title", "Fechar", 1, "p-2", "rounded-lg", "transition-colors", "hover:bg-bg-soft", 2, "color", "var(--c-muted)", 3, "click"], [1, "material-symbols-outlined", 2, "font-size", "22px"], [1, "p-4", "space-y-4"], ["for", "edit_type", 1, "campos-form-label"], ["id", "edit_type", 1, "form-select", "w-full", 3, "ngModelChange", "ngModel"], ["for", "edit_label", 1, "campos-form-label"], ["type", "text", "id", "edit_label", "placeholder", "Ex: Nome completo", 1, "form-input", "w-full", 3, "ngModelChange", "ngModel"], ["for", "edit_name_key", 1, "campos-form-label"], ["type", "text", "id", "edit_name_key", "placeholder", "ex: nome_completo", "maxlength", "80", 1, "form-input", "w-full", 2, "font-family", "ui-monospace, monospace", 3, "ngModelChange", "ngModel"], [1, "text-xs", "mt-1", 2, "color", "var(--c-muted)"], [1, "flex", "items-center", "gap-2"], ["type", "checkbox", "id", "edit_required", 1, "form-checkbox", 3, "ngModelChange", "ngModel"], ["for", "edit_required", 1, "text-sm", 2, "color", "var(--c-text)"], [1, "flex", "justify-end", "gap-2", "p-4", "border-t", 2, "border-color", "var(--c-border)"], ["type", "button", 1, "px-4", "py-2", "rounded-lg", "font-medium", "transition-colors", 2, "background", "var(--c-soft)", "color", "var(--c-text)", 3, "click"], ["type", "button", 1, "px-4", "py-2", "rounded-lg", "font-medium", "text-white", "transition-colors", "inline-flex", "items-center", "gap-2", 2, "background", "var(--c-primary)", 3, "click", "disabled"], ["for", "edit_options_text", 1, "campos-form-label"], ["id", "edit_options_text", "rows", "3", "placeholder", "Ex.: Op\xE7\xE3o 1\nOp\xE7\xE3o 2\nOp\xE7\xE3o 3", 1, "form-input", "w-full", 3, "ngModelChange", "ngModel"]], template: function TemplatesCamposComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275conditionalCreate(1, TemplatesCamposComponent_Conditional_1_Template, 1, 1, "zm-skeleton-list", 1)(2, TemplatesCamposComponent_Conditional_2_Template, 0, 0)(3, TemplatesCamposComponent_Conditional_3_Template, 75, 15, "div", 2);
      \u0275\u0275conditionalCreate(4, TemplatesCamposComponent_Conditional_4_Template, 2, 1, "p", 3);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(5, TemplatesCamposComponent_Conditional_5_Template, 36, 8, "div", 4);
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showSkeleton() ? 1 : !ctx.listaPronta ? 2 : ctx.template ? 3 : -1);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.listaPronta && !ctx.template && ctx.erro ? 4 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.modalAberto ? 5 : -1);
    }
  }, dependencies: [CommonModule, RouterLink, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, CheckboxControlValueAccessor, SelectControlValueAccessor, NgControlStatus, MaxLengthValidator, PatternValidator, NgModel, ZmSkeletonListComponent], styles: ["\n\n/*# sourceMappingURL=templates-campos.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TemplatesCamposComponent, [{
    type: Component,
    args: [{ selector: "app-templates-campos", standalone: true, imports: [CommonModule, RouterLink, FormsModule, ZmSkeletonListComponent], template: `<div class="relative min-h-[320px]">\r
  @if (showSkeleton()) {\r
    <zm-skeleton-list [rows]="6" />\r
  } @else if (!listaPronta) {\r
  } @else if (template) {\r
    <div class="zm-content-enter">\r
    <div class="page-header mb-6">\r
      <!-- <div class="page-title">\r
        <div class="page-title-icon">\r
          <span class="material-symbols-outlined">tune</span>\r
        </div>\r
        <div>\r
          <h1>{{ template.name }}<span style="color: var(--c-muted); font-weight: 400; margin: 0 0.25rem;">\u2014</span> Campos</h1>\r
          <p class="page-header-subtitle">Gerencie os campos do seu formul\xE1rio</p>\r
        </div>\r
      </div> -->\r
      <div style="display: flex; gap: 0.625rem; flex-wrap: wrap; align-items: center;">\r
        <a [routerLink]="['/templates', templateId, 'editar']" class="btn btn-ghost">\r
          <span class="material-symbols-outlined" style="font-size:14px">edit</span>\r
          Editar modelo\r
        </a>\r
        @if (linkPublicoUrl) {\r
          <button type="button" (click)="copiarLink($event)" class="btn btn-primary">\r
            <span class="material-symbols-outlined" style="font-size:14px">content_copy</span>\r
            <span class="copy-label">Copiar link</span>\r
          </button>\r
          <a [href]="linkPublicoUrl" target="_blank" rel="noopener" class="btn btn-ghost">\r
            <span class="material-symbols-outlined" style="font-size:14px">open_in_new</span>\r
            Abrir\r
          </a>\r
          <button type="button" class="btn btn-ghost" [disabled]="desativandoLink" (click)="desativarLink()">\r
            @if (desativandoLink) {\r
              <span class="btn-spinner" aria-hidden="true"></span>\r
            } @else {\r
              <span class="material-symbols-outlined" style="font-size:14px">link_off</span>\r
            }\r
            {{ desativandoLink ? 'Desativando\u2026' : 'Desativar link' }}\r
          </button>\r
        } @else {\r
          <button type="button" class="btn btn-primary" [disabled]="gerandoLink" (click)="gerarLink()">\r
            @if (gerandoLink) {\r
              <span class="btn-spinner" aria-hidden="true"></span>\r
            } @else {\r
              <span class="material-symbols-outlined" style="font-size:14px">link</span>\r
            }\r
            {{ gerandoLink ? 'Gerando\u2026' : 'Gerar link p\xFAblico' }}\r
          </button>\r
        }\r
      </div>\r
    </div>\r
\r
    @if (erro) {\r
      <p class="text-sm mb-4" style="color: var(--c-error, #dc2626)">{{ erro }}</p>\r
    }\r
\r
    <!-- Card Adicionar campo -->\r
    <div class="campos-add-card">\r
      <div class="campos-card-header">\r
        <span class="material-symbols-outlined">add_circle</span>\r
        <span class="campos-card-header-title">Adicionar campo</span>\r
        <span class="campos-badge">Novo</span>\r
      </div>\r
      <div class="campos-form-body">\r
        <div class="campos-form-grid">\r
          <div class="campos-form-field">\r
            <label class="campos-form-label" for="new_type">Tipo <span class="required">*</span></label>\r
            <select id="new_type" class="form-select" [(ngModel)]="novoType">\r
              @for (opt of typeOptions; track opt.value) {\r
                <option [value]="opt.value">{{ opt.label }}</option>\r
              }\r
            </select>\r
          </div>\r
          <div class="campos-form-field">\r
            <label class="campos-form-label" for="new_label">R\xF3tulo <span class="required">*</span></label>\r
            <input type="text" id="new_label" class="form-input" placeholder="Ex: Nome completo" [(ngModel)]="novoLabel" />\r
          </div>\r
          <div class="campos-form-field">\r
            <label class="campos-form-label" for="new_name_key">Chave (name_key) <span class="required">*</span></label>\r
            <input type="text" id="new_name_key" class="form-input" placeholder="ex: nome_completo" maxlength="80"\r
                   pattern="[a-z0-9_]+" style="font-family: ui-monospace, monospace; font-size: 0.8125rem;"\r
                   [(ngModel)]="novoNameKey" />\r
          </div>\r
        </div>\r
        @if (showNovoOptions) {\r
          <div class="campos-form-field" style="margin-bottom: 1rem;">\r
            <label class="campos-form-label" for="new_options_text">Lista de op\xE7\xF5es que o usu\xE1rio poder\xE1 escolher</label>\r
            <p class="text-xs mb-1.5" style="color: var(--c-muted);">Para Select e Radio. Digite uma op\xE7\xE3o por linha.</p>\r
            <textarea id="new_options_text" rows="3" class="form-input" placeholder="Ex.: Op\xE7\xE3o 1&#10;Op\xE7\xE3o 2&#10;Op\xE7\xE3o 3" [(ngModel)]="novoOptionsText"></textarea>\r
          </div>\r
        }\r
        <div class="campos-form-footer">\r
          <div class="campos-toggle-group">\r
            <input type="checkbox" id="new_required" class="form-checkbox" [(ngModel)]="novoRequired" />\r
            <label for="new_required" class="campos-toggle-label">Campo obrigat\xF3rio</label>\r
          </div>\r
          <button type="button" class="campos-btn-add" [disabled]="salvandoCampo || !novoLabel.trim() || !novoNameKey.trim()" (click)="adicionarCampo()">\r
            @if (salvandoCampo) {\r
              <span class="btn-spinner" aria-hidden="true"></span>\r
            } @else {\r
              <span class="material-symbols-outlined" style="font-size:14px">add</span>\r
            }\r
            {{ salvandoCampo ? 'Salvando\u2026' : 'Adicionar campo' }}\r
          </button>\r
        </div>\r
      </div>\r
    </div>\r
\r
    <!-- Tabela de campos -->\r
    <div class="campos-table-card">\r
      <div class="campos-table-topbar">\r
        <div class="campos-table-topbar-title">\r
          Campos configurados\r
          <span class="campos-count-badge">{{ campos.length }}</span>\r
        </div>\r
      </div>\r
      <table>\r
        <thead>\r
          <tr>\r
            <th style="width:50px"></th>\r
            <th style="width:60px">Ordem</th>\r
            <th>Tipo</th>\r
            <th>R\xF3tulo</th>\r
            <th>Chave</th>\r
            <th style="width:100px; text-align:center">Req.</th>\r
            <th style="width:110px; text-align:center">A\xE7\xF5es</th>\r
          </tr>\r
        </thead>\r
        <tbody>\r
          @if (campos.length === 0) {\r
            <tr>\r
              <td colspan="7" style="padding: 0;">\r
                <div class="campos-empty">\r
                  <div class="campos-empty-icon">\r
                    <span class="material-symbols-outlined">view_list</span>\r
                  </div>\r
                  <p class="campos-empty-title">Nenhum campo adicionado</p>\r
                  <p class="campos-empty-sub">Use o formul\xE1rio acima para adicionar campos ao modelo.</p>\r
                </div>\r
              </td>\r
            </tr>\r
          } @else {\r
            @for (c of campos; track c.id) {\r
              <tr>\r
                <td><span class="campos-drag-handle" aria-hidden="true">\u283F</span></td>\r
                <td style="color: var(--c-muted); font-weight: 600; font-size: 0.8125rem;">{{ ordemFormatada(c.sort_order) }}</td>\r
                <td>\r
                  <span class="campos-type-pill">\r
                    <span class="material-symbols-outlined">{{ tipoIcon(c.type) }}</span>\r
                    {{ c.type }}\r
                  </span>\r
                </td>\r
                <td style="font-weight: 500;">{{ c.label }}</td>\r
                <td><span class="campos-key-chip">{{ c.name_key }}</span></td>\r
                <td style="text-align:center">\r
                  @if (c.required) {\r
                    <span class="campos-required-dot" title="Obrigat\xF3rio"></span>\r
                  } @else {\r
                    <span style="color: var(--c-border); font-size: 0.75rem;">\u2014</span>\r
                  }\r
                </td>\r
                <td>\r
                  <div class="campos-actions">\r
                    <button type="button" class="campos-icon-btn" aria-label="Editar campo" (click)="abrirModalEditar(c)" title="Editar campo">\r
                      <span class="material-symbols-outlined" style="font-size:13px">edit</span>\r
                    </button>\r
                    <button type="button" class="campos-icon-btn danger" aria-label="Remover campo" [disabled]="removendoId === c.id" (click)="removerCampo(c)" title="Remover campo">\r
                      @if (removendoId === c.id) {\r
                        <span class="btn-spinner" style="width:13px;height:13px;border-width:2px"></span>\r
                      } @else {\r
                        <span class="material-symbols-outlined" style="font-size:13px">delete</span>\r
                      }\r
                    </button>\r
                  </div>\r
                </td>\r
              </tr>\r
            }\r
          }\r
        </tbody>\r
      </table>\r
    </div>\r
    </div>\r
  }\r
\r
  @if (listaPronta && !template && erro) {\r
    <p class="text-sm" style="color: var(--c-error, #dc2626)">{{ erro }}</p>\r
  }\r
</div>\r
\r
<!-- Modal Editar campo -->\r
@if (modalAberto) {\r
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4" style="background: rgba(0,0,0,0.4);" (click)="fecharModal()">\r
    <div class="rounded-xl border w-full max-w-lg overflow-hidden" style="background: var(--c-surface); border-color: var(--c-border); box-shadow: 0 10px 40px rgba(0,0,0,0.2); color: var(--c-text);" (click)="$event.stopPropagation()">\r
      <div class="flex items-center justify-between p-4 border-b" style="border-color: var(--c-border);">\r
        <h2 class="font-semibold text-lg">Editar campo</h2>\r
        <button type="button" class="p-2 rounded-lg transition-colors hover:bg-bg-soft" style="color: var(--c-muted);" aria-label="Fechar" (click)="fecharModal()" title="Fechar">\r
          <span class="material-symbols-outlined" style="font-size:22px">close</span>\r
        </button>\r
      </div>\r
      <div class="p-4 space-y-4">\r
        <div>\r
          <label class="campos-form-label" for="edit_type">Tipo</label>\r
          <select id="edit_type" class="form-select w-full" [(ngModel)]="editType">\r
            @for (opt of typeOptions; track opt.value) {\r
              <option [value]="opt.value">{{ opt.label }}</option>\r
            }\r
          </select>\r
        </div>\r
        <div>\r
          <label class="campos-form-label" for="edit_label">R\xF3tulo</label>\r
          <input type="text" id="edit_label" class="form-input w-full" placeholder="Ex: Nome completo" [(ngModel)]="editLabel" />\r
        </div>\r
        <div>\r
          <label class="campos-form-label" for="edit_name_key">Chave (name_key)</label>\r
          <input type="text" id="edit_name_key" class="form-input w-full" placeholder="ex: nome_completo" maxlength="80" style="font-family: ui-monospace, monospace;" [(ngModel)]="editNameKey" />\r
          <p class="text-xs mt-1" style="color: var(--c-muted);">Apenas letras min\xFAsculas, n\xFAmeros e underscore.</p>\r
        </div>\r
        <div class="flex items-center gap-2">\r
          <input type="checkbox" id="edit_required" class="form-checkbox" [(ngModel)]="editRequired" />\r
          <label for="edit_required" class="text-sm" style="color: var(--c-text);">Obrigat\xF3rio</label>\r
        </div>\r
        @if (showEditOptions) {\r
          <div>\r
            <label class="campos-form-label" for="edit_options_text">Lista de op\xE7\xF5es que o usu\xE1rio poder\xE1 escolher</label>\r
            <p class="text-xs mb-1.5" style="color: var(--c-muted);">Para Select e Radio. Digite uma op\xE7\xE3o por linha.</p>\r
            <textarea id="edit_options_text" rows="3" class="form-input w-full" placeholder="Ex.: Op\xE7\xE3o 1&#10;Op\xE7\xE3o 2&#10;Op\xE7\xE3o 3" [(ngModel)]="editOptionsText"></textarea>\r
          </div>\r
        }\r
      </div>\r
      <div class="flex justify-end gap-2 p-4 border-t" style="border-color: var(--c-border);">\r
        <button type="button" class="px-4 py-2 rounded-lg font-medium transition-colors" style="background: var(--c-soft); color: var(--c-text);" (click)="fecharModal()">Cancelar</button>\r
        <button type="button" class="px-4 py-2 rounded-lg font-medium text-white transition-colors inline-flex items-center gap-2" style="background: var(--c-primary);" [disabled]="salvandoCampo" (click)="salvarEdicao()">\r
          @if (salvandoCampo) {\r
            <span class="btn-spinner" aria-hidden="true"></span>\r
          }\r
          {{ salvandoCampo ? 'Salvando\u2026' : 'Salvar' }}\r
        </button>\r
      </div>\r
    </div>\r
  </div>\r
}\r
`, styles: ["/* src/app/paginas/templates/templates-campos.component.css */\n/*# sourceMappingURL=templates-campos.component.css.map */\n"] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TemplatesCamposComponent, { className: "TemplatesCamposComponent", filePath: "src/app/paginas/templates/templates-campos.component.ts", lineNumber: 43 });
})();
export {
  TemplatesCamposComponent
};
//# sourceMappingURL=chunk-A3NHBQAQ.js.map
