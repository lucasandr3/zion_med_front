import {
  LinkBioService
} from "./chunk-YFYVZLKB.js";
import {
  ClinicaService
} from "./chunk-KCTAH7A3.js";
import "./chunk-T5FMHWLF.js";
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
  MinValidator,
  NgControlStatus,
  NgControlStatusGroup,
  NgForm,
  NgModel,
  NgSelectOption,
  NumberValueAccessor,
  RadioControlValueAccessor,
  RequiredValidator,
  SelectControlValueAccessor,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption
} from "./chunk-USROZ7PW.js";
import "./chunk-SFRXLDXR.js";
import "./chunk-IBJWGIJV.js";
import {
  DomSanitizer,
  RouterLink
} from "./chunk-C2NWBPZH.js";
import {
  CommonModule,
  Component,
  KeyValuePipe,
  NgIf,
  PLATFORM_ID,
  __async,
  __spreadValues,
  inject,
  isPlatformBrowser,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeResourceUrl,
  ɵɵsanitizeUrl,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-GRLISYEV.js";

// src/app/paginas/link-bio/link-bio.component.ts
var _forTrack0 = ($index, $item) => $item.key;
var _forTrack1 = ($index, $item) => $item.id;
var _forTrack2 = ($index, $item) => $item.date;
function LinkBioComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "zm-skeleton-list", 1);
  }
  if (rf & 2) {
    \u0275\u0275property("rows", 8);
  }
}
function LinkBioComponent_Conditional_2_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 2);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.erro);
  }
}
function LinkBioComponent_Conditional_2_Conditional_1_div_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 28)(1, "div", 29)(2, "div", 30);
    \u0275\u0275text(3, "Visitas hoje");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 31);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 29)(7, "div", 30);
    \u0275\u0275text(8, "Cliques totais");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 32);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 33);
    \u0275\u0275text(12, "\xFAltimos 30 dias");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "div", 29)(14, "div", 30);
    \u0275\u0275text(15, "Taxa de clique");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "div", 31);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "div", 33);
    \u0275\u0275text(19, "CTR");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "div", 29)(21, "div", 30);
    \u0275\u0275text(22, "Formul\xE1rios");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "div", 32);
    \u0275\u0275text(24);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "div", 33);
    \u0275\u0275text(26);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.metrics.visitas_hoje);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.metrics.total_clicks_last_30);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate1("", ctx_r0.metrics.taxa_clique, "%");
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r0.metrics.formularios_total);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", ctx_r0.metrics.formularios_ativos, " ativos, ", ctx_r0.metrics.formularios_draft, " rascunho");
  }
}
function LinkBioComponent_Conditional_2_Conditional_1_div_51_Conditional_8_For_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 54);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const iconKey_r5 = ctx.$implicit;
    \u0275\u0275property("value", iconKey_r5.key);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(iconKey_r5.value);
  }
}
function LinkBioComponent_Conditional_2_Conditional_1_div_51_Conditional_8_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 47);
  }
}
function LinkBioComponent_Conditional_2_Conditional_1_div_51_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 38)(1, "p", 48);
    \u0275\u0275text(2, "Novo link");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 49)(4, "div")(5, "label", 50);
    \u0275\u0275text(6, "T\xEDtulo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "input", 51);
    \u0275\u0275twoWayListener("ngModelChange", function LinkBioComponent_Conditional_2_Conditional_1_div_51_Conditional_8_Template_input_ngModelChange_7_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext(4);
      \u0275\u0275twoWayBindingSet(ctx_r0.novoLabel, $event) || (ctx_r0.novoLabel = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div")(9, "label", 50);
    \u0275\u0275text(10, "URL");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "input", 52);
    \u0275\u0275twoWayListener("ngModelChange", function LinkBioComponent_Conditional_2_Conditional_1_div_51_Conditional_8_Template_input_ngModelChange_11_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext(4);
      \u0275\u0275twoWayBindingSet(ctx_r0.novoUrl, $event) || (ctx_r0.novoUrl = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div")(13, "label", 50);
    \u0275\u0275text(14, "\xCDcone");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "select", 53);
    \u0275\u0275twoWayListener("ngModelChange", function LinkBioComponent_Conditional_2_Conditional_1_div_51_Conditional_8_Template_select_ngModelChange_15_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext(4);
      \u0275\u0275twoWayBindingSet(ctx_r0.novoIcon, $event) || (ctx_r0.novoIcon = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275repeaterCreate(16, LinkBioComponent_Conditional_2_Conditional_1_div_51_Conditional_8_For_17_Template, 2, 2, "option", 54, _forTrack0);
    \u0275\u0275pipe(18, "keyvalue");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(19, "div", 55)(20, "button", 56);
    \u0275\u0275listener("click", function LinkBioComponent_Conditional_2_Conditional_1_div_51_Conditional_8_Template_button_click_20_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r0.salvarNovoLink());
    });
    \u0275\u0275conditionalCreate(21, LinkBioComponent_Conditional_2_Conditional_1_div_51_Conditional_8_Conditional_21_Template, 1, 0, "span", 47);
    \u0275\u0275text(22);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "button", 57);
    \u0275\u0275listener("click", function LinkBioComponent_Conditional_2_Conditional_1_div_51_Conditional_8_Template_button_click_23_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r0.toggleFormNovo());
    });
    \u0275\u0275text(24, "Cancelar");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(7);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.novoLabel);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.novoUrl);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.novoIcon);
    \u0275\u0275advance();
    \u0275\u0275repeater(\u0275\u0275pipeBind1(18, 6, ctx_r0.availableIcons));
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r0.salvandoNovoLink);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.salvandoNovoLink ? 21 : -1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.salvandoNovoLink ? "Salvando\u2026" : "Salvar", " ");
  }
}
function LinkBioComponent_Conditional_2_Conditional_1_div_51_Conditional_9_For_2_Conditional_3_For_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 54);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const iconKey_r8 = ctx.$implicit;
    \u0275\u0275property("value", iconKey_r8.key);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(iconKey_r8.value);
  }
}
function LinkBioComponent_Conditional_2_Conditional_1_div_51_Conditional_9_For_2_Conditional_3_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 67);
  }
}
function LinkBioComponent_Conditional_2_Conditional_1_div_51_Conditional_9_For_2_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "form", 61);
    \u0275\u0275listener("ngSubmit", function LinkBioComponent_Conditional_2_Conditional_1_div_51_Conditional_9_For_2_Conditional_3_Template_form_ngSubmit_0_listener() {
      \u0275\u0275restoreView(_r6);
      const lnk_r7 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r0.salvarEdicao(lnk_r7));
    });
    \u0275\u0275elementStart(1, "div", 62)(2, "input", 63);
    \u0275\u0275twoWayListener("ngModelChange", function LinkBioComponent_Conditional_2_Conditional_1_div_51_Conditional_9_For_2_Conditional_3_Template_input_ngModelChange_2_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r0 = \u0275\u0275nextContext(6);
      \u0275\u0275twoWayBindingSet(ctx_r0.editLabel, $event) || (ctx_r0.editLabel = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "input", 64);
    \u0275\u0275twoWayListener("ngModelChange", function LinkBioComponent_Conditional_2_Conditional_1_div_51_Conditional_9_For_2_Conditional_3_Template_input_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r0 = \u0275\u0275nextContext(6);
      \u0275\u0275twoWayBindingSet(ctx_r0.editUrl, $event) || (ctx_r0.editUrl = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "select", 65);
    \u0275\u0275twoWayListener("ngModelChange", function LinkBioComponent_Conditional_2_Conditional_1_div_51_Conditional_9_For_2_Conditional_3_Template_select_ngModelChange_4_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r0 = \u0275\u0275nextContext(6);
      \u0275\u0275twoWayBindingSet(ctx_r0.editIcon, $event) || (ctx_r0.editIcon = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275repeaterCreate(5, LinkBioComponent_Conditional_2_Conditional_1_div_51_Conditional_9_For_2_Conditional_3_For_6_Template, 2, 2, "option", 54, _forTrack0);
    \u0275\u0275pipe(7, "keyvalue");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 55)(9, "button", 66);
    \u0275\u0275conditionalCreate(10, LinkBioComponent_Conditional_2_Conditional_1_div_51_Conditional_9_For_2_Conditional_3_Conditional_10_Template, 1, 0, "span", 67);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "button", 68);
    \u0275\u0275listener("click", function LinkBioComponent_Conditional_2_Conditional_1_div_51_Conditional_9_For_2_Conditional_3_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r0 = \u0275\u0275nextContext(6);
      return \u0275\u0275resetView(ctx_r0.cancelarEdicao());
    });
    \u0275\u0275text(13, "Cancelar");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const lnk_r7 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(5);
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.editLabel);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.editUrl);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.editIcon);
    \u0275\u0275advance();
    \u0275\u0275repeater(\u0275\u0275pipeBind1(7, 6, ctx_r0.availableIcons));
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r0.salvandoEdicaoId === lnk_r7.id);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.salvandoEdicaoId === lnk_r7.id ? 10 : -1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.salvandoEdicaoId === lnk_r7.id ? "Salvando\u2026" : "Salvar", " ");
  }
}
function LinkBioComponent_Conditional_2_Conditional_1_div_51_Conditional_9_For_2_Conditional_4_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 78);
  }
}
function LinkBioComponent_Conditional_2_Conditional_1_div_51_Conditional_9_For_2_Conditional_4_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 76);
    \u0275\u0275text(1, "delete");
    \u0275\u0275elementEnd();
  }
}
function LinkBioComponent_Conditional_2_Conditional_1_div_51_Conditional_9_For_2_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 69)(1, "div", 70);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 71);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 72)(6, "span", 73);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "button", 74);
    \u0275\u0275listener("click", function LinkBioComponent_Conditional_2_Conditional_1_div_51_Conditional_9_For_2_Conditional_4_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r9);
      const lnk_r7 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r0.iniciarEdicao(lnk_r7));
    });
    \u0275\u0275text(9, "Editar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "a", 75)(11, "span", 76);
    \u0275\u0275text(12, "open_in_new");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "button", 77);
    \u0275\u0275listener("click", function LinkBioComponent_Conditional_2_Conditional_1_div_51_Conditional_9_For_2_Conditional_4_Template_button_click_13_listener() {
      \u0275\u0275restoreView(_r9);
      const lnk_r7 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r0.excluirLink(lnk_r7));
    });
    \u0275\u0275conditionalCreate(14, LinkBioComponent_Conditional_2_Conditional_1_div_51_Conditional_9_For_2_Conditional_4_Conditional_14_Template, 1, 0, "span", 78)(15, LinkBioComponent_Conditional_2_Conditional_1_div_51_Conditional_9_For_2_Conditional_4_Conditional_15_Template, 2, 0, "span", 76);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const lnk_r7 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(5);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(lnk_r7.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(lnk_r7.url);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", lnk_r7.total_clicks ?? 0, " cliques");
    \u0275\u0275advance(3);
    \u0275\u0275property("href", lnk_r7.url, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r0.excluindoLinkId === lnk_r7.id);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.excluindoLinkId === lnk_r7.id ? 14 : 15);
  }
}
function LinkBioComponent_Conditional_2_Conditional_1_div_51_Conditional_9_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li", 58)(1, "span", 59);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(3, LinkBioComponent_Conditional_2_Conditional_1_div_51_Conditional_9_For_2_Conditional_3_Template, 14, 8, "form", 60)(4, LinkBioComponent_Conditional_2_Conditional_1_div_51_Conditional_9_For_2_Conditional_4_Template, 16, 6);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const lnk_r7 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(5);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(lnk_r7.icon ?? "link");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.editandoId === lnk_r7.id ? 3 : 4);
  }
}
function LinkBioComponent_Conditional_2_Conditional_1_div_51_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ul", 39);
    \u0275\u0275repeaterCreate(1, LinkBioComponent_Conditional_2_Conditional_1_div_51_Conditional_9_For_2_Template, 5, 2, "li", 58, _forTrack1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.links);
  }
}
function LinkBioComponent_Conditional_2_Conditional_1_div_51_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 40)(1, "span", 79);
    \u0275\u0275text(2, "add_link");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 80);
    \u0275\u0275text(4, "Nenhum link cadastrado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 81);
    \u0275\u0275text(6, 'Clique em \\"Adicionar link\\" para come\xE7ar.');
    \u0275\u0275elementEnd()();
  }
}
function LinkBioComponent_Conditional_2_Conditional_1_div_51_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 43);
    \u0275\u0275text(1, "Altera\xE7\xF5es n\xE3o salvas");
    \u0275\u0275elementEnd();
  }
}
function LinkBioComponent_Conditional_2_Conditional_1_div_51_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 43);
    \u0275\u0275text(1, "Adicione ou edite um link acima para salvar aqui");
    \u0275\u0275elementEnd();
  }
}
function LinkBioComponent_Conditional_2_Conditional_1_div_51_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 47);
  }
}
function LinkBioComponent_Conditional_2_Conditional_1_div_51_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 11);
    \u0275\u0275text(1, "save");
    \u0275\u0275elementEnd();
  }
}
function LinkBioComponent_Conditional_2_Conditional_1_div_51_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 34)(1, "div", 35)(2, "p", 36);
    \u0275\u0275text(3, "Links exibidos na sua p\xE1gina");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 37);
    \u0275\u0275listener("click", function LinkBioComponent_Conditional_2_Conditional_1_div_51_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.toggleFormNovo());
    });
    \u0275\u0275elementStart(5, "span", 11);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(8, LinkBioComponent_Conditional_2_Conditional_1_div_51_Conditional_8_Template, 25, 8, "div", 38);
    \u0275\u0275conditionalCreate(9, LinkBioComponent_Conditional_2_Conditional_1_div_51_Conditional_9_Template, 3, 0, "ul", 39)(10, LinkBioComponent_Conditional_2_Conditional_1_div_51_Conditional_10_Template, 7, 0, "div", 40);
    \u0275\u0275element(11, "div", 41);
    \u0275\u0275elementStart(12, "div", 42);
    \u0275\u0275conditionalCreate(13, LinkBioComponent_Conditional_2_Conditional_1_div_51_Conditional_13_Template, 2, 0, "div", 43)(14, LinkBioComponent_Conditional_2_Conditional_1_div_51_Conditional_14_Template, 2, 0, "div", 43);
    \u0275\u0275elementStart(15, "div", 44)(16, "a", 45)(17, "span", 11);
    \u0275\u0275text(18, "close");
    \u0275\u0275elementEnd();
    \u0275\u0275text(19, " Cancelar ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "button", 46);
    \u0275\u0275listener("click", function LinkBioComponent_Conditional_2_Conditional_1_div_51_Template_button_click_20_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.salvarFooterAbaLinks());
    });
    \u0275\u0275conditionalCreate(21, LinkBioComponent_Conditional_2_Conditional_1_div_51_Conditional_21_Template, 1, 0, "span", 47)(22, LinkBioComponent_Conditional_2_Conditional_1_div_51_Conditional_22_Template, 2, 0, "span", 11);
    \u0275\u0275text(23);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r0.mostrarFormNovo ? "close" : "add");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.mostrarFormNovo ? "Cancelar" : "Adicionar link", " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.mostrarFormNovo ? 8 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.links.length > 0 ? 9 : 10);
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx_r0.mostrarFormNovo || ctx_r0.editandoId !== null ? 13 : 14);
    \u0275\u0275advance(7);
    \u0275\u0275property("disabled", ctx_r0.linkBioFooterLinksSaveDisabled);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.salvandoNovoLink || ctx_r0.salvandoEdicaoId !== null ? 21 : 22);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.salvandoNovoLink || ctx_r0.salvandoEdicaoId !== null ? "Salvando\u2026" : "Salvar configura\xE7\xF5es", " ");
  }
}
function LinkBioComponent_Conditional_2_Conditional_1_div_52_Conditional_4_For_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 85);
    \u0275\u0275element(1, "div", 86);
    \u0275\u0275elementStart(2, "div", 60)(3, "div", 87);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 88);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 89)(8, "button", 90);
    \u0275\u0275listener("click", function LinkBioComponent_Conditional_2_Conditional_1_div_52_Conditional_4_For_1_Template_button_click_8_listener() {
      const t_r11 = \u0275\u0275restoreView(_r10).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r0.copiarLinkForm(t_r11));
    });
    \u0275\u0275text(9, "Copiar link");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const t_r11 = ctx.$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(t_r11.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Respostas: ", t_r11.submission_count);
  }
}
function LinkBioComponent_Conditional_2_Conditional_1_div_52_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, LinkBioComponent_Conditional_2_Conditional_1_div_52_Conditional_4_For_1_Template, 10, 2, "div", 85, _forTrack1);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275repeater(ctx_r0.forms);
  }
}
function LinkBioComponent_Conditional_2_Conditional_1_div_52_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 83)(1, "span", 91);
    \u0275\u0275text(2, "link_off");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 92);
    \u0275\u0275text(4, "Nenhum formul\xE1rio com link p\xFAblico");
    \u0275\u0275elementEnd()();
  }
}
function LinkBioComponent_Conditional_2_Conditional_1_div_52_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 82)(1, "div", 35)(2, "p", 36);
    \u0275\u0275text(3, "Formul\xE1rios vinculados \xE0 p\xE1gina");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(4, LinkBioComponent_Conditional_2_Conditional_1_div_52_Conditional_4_Template, 2, 0)(5, LinkBioComponent_Conditional_2_Conditional_1_div_52_Conditional_5_Template, 5, 0, "div", 83);
    \u0275\u0275element(6, "div", 41);
    \u0275\u0275elementStart(7, "div", 42)(8, "div", 43);
    \u0275\u0275text(9, "Formul\xE1rios s\xE3o criados e publicados em Templates");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 44)(11, "a", 45)(12, "span", 11);
    \u0275\u0275text(13, "close");
    \u0275\u0275elementEnd();
    \u0275\u0275text(14, " Cancelar ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "a", 84)(16, "span", 11);
    \u0275\u0275text(17, "description");
    \u0275\u0275elementEnd();
    \u0275\u0275text(18, " Gerenciar templates ");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx_r0.forms.length > 0 ? 4 : 5);
  }
}
function LinkBioComponent_Conditional_2_Conditional_1_div_53_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 97);
    \u0275\u0275text(1, "Nenhum dado de cliques por dia neste per\xEDodo.");
    \u0275\u0275elementEnd();
  }
}
function LinkBioComponent_Conditional_2_Conditional_1_div_53_Conditional_8_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 98);
    \u0275\u0275text(1, " Nenhum clique nos \xFAltimos dias \u2014 barras apenas para refer\xEAncia visual. ");
    \u0275\u0275elementEnd();
  }
}
function LinkBioComponent_Conditional_2_Conditional_1_div_53_Conditional_8_For_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 100)(1, "div", 101);
    \u0275\u0275element(2, "div", 102);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 103);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const d_r13 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("height", d_r13.percent, "%");
    \u0275\u0275classProp("link-bio-bar--ghost", d_r13.ghost);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(d_r13.label);
  }
}
function LinkBioComponent_Conditional_2_Conditional_1_div_53_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, LinkBioComponent_Conditional_2_Conditional_1_div_53_Conditional_8_Conditional_0_Template, 2, 0, "p", 98);
    \u0275\u0275elementStart(1, "div", 99);
    \u0275\u0275repeaterCreate(2, LinkBioComponent_Conditional_2_Conditional_1_div_53_Conditional_8_For_3_Template, 5, 5, "div", 100, _forTrack2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275conditional((ctx_r0.diasClicks[0] == null ? null : ctx_r0.diasClicks[0].ghost) ? 0 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r0.diasClicks);
  }
}
function LinkBioComponent_Conditional_2_Conditional_1_div_53_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 47);
  }
}
function LinkBioComponent_Conditional_2_Conditional_1_div_53_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 11);
    \u0275\u0275text(1, "refresh");
    \u0275\u0275elementEnd();
  }
}
function LinkBioComponent_Conditional_2_Conditional_1_div_53_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 93)(1, "div", 94)(2, "div", 95)(3, "h3", 96);
    \u0275\u0275text(4, "Cliques por dia (\xFAltimos 7 dias)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 36);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(7, LinkBioComponent_Conditional_2_Conditional_1_div_53_Conditional_7_Template, 2, 0, "p", 97)(8, LinkBioComponent_Conditional_2_Conditional_1_div_53_Conditional_8_Template, 4, 1);
    \u0275\u0275elementEnd();
    \u0275\u0275element(9, "div", 41);
    \u0275\u0275elementStart(10, "div", 42)(11, "div", 43);
    \u0275\u0275text(12, "Dados de visitas e cliques");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 44)(14, "a", 45)(15, "span", 11);
    \u0275\u0275text(16, "close");
    \u0275\u0275elementEnd();
    \u0275\u0275text(17, " Cancelar ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "button", 46);
    \u0275\u0275listener("click", function LinkBioComponent_Conditional_2_Conditional_1_div_53_Template_button_click_18_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.atualizarDadosEstatisticas());
    });
    \u0275\u0275conditionalCreate(19, LinkBioComponent_Conditional_2_Conditional_1_div_53_Conditional_19_Template, 1, 0, "span", 47)(20, LinkBioComponent_Conditional_2_Conditional_1_div_53_Conditional_20_Template, 2, 0, "span", 11);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1("Total: ", ctx_r0.metrics == null ? null : ctx_r0.metrics.total_clicks);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.diasClicks.length === 0 ? 7 : 8);
    \u0275\u0275advance(11);
    \u0275\u0275property("disabled", ctx_r0.atualizandoStatsRodape);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.atualizandoStatsRodape ? 19 : 20);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.atualizandoStatsRodape ? "Atualizando\u2026" : "Atualizar dados", " ");
  }
}
function LinkBioComponent_Conditional_2_Conditional_1_div_54_For_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 108);
    \u0275\u0275listener("click", function LinkBioComponent_Conditional_2_Conditional_1_div_54_For_15_Template_button_click_0_listener() {
      const entry_r16 = \u0275\u0275restoreView(_r15).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r0.selecionarTema(entry_r16.key));
    });
    \u0275\u0275elementStart(1, "div", 129);
    \u0275\u0275element(2, "div", 130)(3, "div", 131)(4, "div", 132);
    \u0275\u0275elementEnd();
    \u0275\u0275element(5, "div", 133);
    \u0275\u0275elementStart(6, "div", 114);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const entry_r16 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275classProp("selected", ctx_r0.aparenciaPublicTheme === entry_r16.key);
    const p_r17 = entry_r16.value.primary;
    \u0275\u0275advance();
    \u0275\u0275styleProp("background", p_r17 + "22");
    \u0275\u0275advance();
    \u0275\u0275styleProp("background", p_r17);
    \u0275\u0275advance();
    \u0275\u0275styleProp("background", p_r17);
    \u0275\u0275advance();
    \u0275\u0275styleProp("background", p_r17);
    \u0275\u0275advance();
    \u0275\u0275styleProp("background", p_r17);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(entry_r16.value.label);
  }
}
function LinkBioComponent_Conditional_2_Conditional_1_div_54_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 119)(1, "label", 50);
    \u0275\u0275text(2, "Cor s\xF3lida");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "input", 134);
    \u0275\u0275twoWayListener("ngModelChange", function LinkBioComponent_Conditional_2_Conditional_1_div_54_Conditional_29_Template_input_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r18);
      const ctx_r0 = \u0275\u0275nextContext(4);
      \u0275\u0275twoWayBindingSet(ctx_r0.aparenciaCoverColor, $event) || (ctx_r0.aparenciaCoverColor = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.aparenciaCoverColor);
  }
}
function LinkBioComponent_Conditional_2_Conditional_1_div_54_Conditional_30_Conditional_4_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 137);
  }
}
function LinkBioComponent_Conditional_2_Conditional_1_div_54_Conditional_30_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 136);
    \u0275\u0275conditionalCreate(1, LinkBioComponent_Conditional_2_Conditional_1_div_54_Conditional_30_Conditional_4_Conditional_1_Template, 1, 0, "span", 137);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(5);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.enviandoCover ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", ctx_r0.enviandoCover ? "Enviando\u2026" : "Arquivo selecionado", ": ", ctx_r0.nomeArquivoCover, " ");
  }
}
function LinkBioComponent_Conditional_2_Conditional_1_div_54_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 119)(1, "label", 50);
    \u0275\u0275text(2, "Imagem do banner");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "input", 135);
    \u0275\u0275listener("change", function LinkBioComponent_Conditional_2_Conditional_1_div_54_Conditional_30_Template_input_change_3_listener($event) {
      \u0275\u0275restoreView(_r19);
      const ctx_r0 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r0.onSelecionarCoverImage($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(4, LinkBioComponent_Conditional_2_Conditional_1_div_54_Conditional_30_Conditional_4_Template, 3, 3, "p", 136);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r0.enviandoCover);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.nomeArquivoCover ? 4 : -1);
  }
}
function LinkBioComponent_Conditional_2_Conditional_1_div_54_Conditional_58_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 47);
  }
}
function LinkBioComponent_Conditional_2_Conditional_1_div_54_Conditional_59_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 11);
    \u0275\u0275text(1, "save");
    \u0275\u0275elementEnd();
  }
}
function LinkBioComponent_Conditional_2_Conditional_1_div_54_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 104)(1, "form", 105);
    \u0275\u0275listener("ngSubmit", function LinkBioComponent_Conditional_2_Conditional_1_div_54_Template_form_ngSubmit_1_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.salvarAparencia());
    });
    \u0275\u0275elementStart(2, "div", 94)(3, "p", 106);
    \u0275\u0275text(4, "Tema de cor da p\xE1gina");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 107)(6, "button", 108);
    \u0275\u0275listener("click", function LinkBioComponent_Conditional_2_Conditional_1_div_54_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.selecionarTema(""));
    });
    \u0275\u0275elementStart(7, "div", 109);
    \u0275\u0275element(8, "div", 110)(9, "div", 111)(10, "div", 112);
    \u0275\u0275elementEnd();
    \u0275\u0275element(11, "div", 113);
    \u0275\u0275elementStart(12, "div", 114);
    \u0275\u0275text(13, "Padr\xE3o");
    \u0275\u0275elementEnd()();
    \u0275\u0275repeaterCreate(14, LinkBioComponent_Conditional_2_Conditional_1_div_54_For_15_Template, 8, 13, "button", 115, _forTrack0);
    \u0275\u0275pipe(16, "keyvalue");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "p", 116);
    \u0275\u0275text(18, "Afeta o logo, bot\xF5es e indicador de hor\xE1rio aberto. Independente do tema do sistema.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "div", 94)(20, "p", 106);
    \u0275\u0275text(21, "Topo da p\xE1gina p\xFAblica");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "div", 117)(23, "button", 118);
    \u0275\u0275listener("click", function LinkBioComponent_Conditional_2_Conditional_1_div_54_Template_button_click_23_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.aparenciaCoverMode = "banner");
    });
    \u0275\u0275text(24, " Usar banner ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "button", 118);
    \u0275\u0275listener("click", function LinkBioComponent_Conditional_2_Conditional_1_div_54_Template_button_click_25_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.aparenciaCoverMode = "solid");
    });
    \u0275\u0275text(26, " Cor s\xF3lida ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "button", 118);
    \u0275\u0275listener("click", function LinkBioComponent_Conditional_2_Conditional_1_div_54_Template_button_click_27_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.aparenciaCoverMode = "none");
    });
    \u0275\u0275text(28, " Sem banner ");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(29, LinkBioComponent_Conditional_2_Conditional_1_div_54_Conditional_29_Template, 4, 1, "div", 119);
    \u0275\u0275conditionalCreate(30, LinkBioComponent_Conditional_2_Conditional_1_div_54_Conditional_30_Template, 5, 2, "div", 119);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "div", 94)(32, "p", 106);
    \u0275\u0275text(33, "Informa\xE7\xF5es exibidas na p\xE1gina");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "div", 120)(35, "div")(36, "label", 50);
    \u0275\u0275text(37, "Descri\xE7\xE3o / Slogan");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "input", 121);
    \u0275\u0275twoWayListener("ngModelChange", function LinkBioComponent_Conditional_2_Conditional_1_div_54_Template_input_ngModelChange_38_listener($event) {
      \u0275\u0275restoreView(_r14);
      const ctx_r0 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r0.aparenciaShortDescription, $event) || (ctx_r0.aparenciaShortDescription = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(39, "div")(40, "label", 50);
    \u0275\u0275text(41, "Especialidades");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(42, "input", 122);
    \u0275\u0275twoWayListener("ngModelChange", function LinkBioComponent_Conditional_2_Conditional_1_div_54_Template_input_ngModelChange_42_listener($event) {
      \u0275\u0275restoreView(_r14);
      const ctx_r0 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r0.aparenciaSpecialties, $event) || (ctx_r0.aparenciaSpecialties = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(43, "div", 123)(44, "div")(45, "label", 50);
    \u0275\u0275text(46, "Ano de funda\xE7\xE3o");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(47, "input", 124);
    \u0275\u0275twoWayListener("ngModelChange", function LinkBioComponent_Conditional_2_Conditional_1_div_54_Template_input_ngModelChange_47_listener($event) {
      \u0275\u0275restoreView(_r14);
      const ctx_r0 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r0.aparenciaFoundedYear, $event) || (ctx_r0.aparenciaFoundedYear = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(48, "div")(49, "label", 50);
    \u0275\u0275text(50, "E-mail de contato p\xFAblico");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(51, "input", 125);
    \u0275\u0275twoWayListener("ngModelChange", function LinkBioComponent_Conditional_2_Conditional_1_div_54_Template_input_ngModelChange_51_listener($event) {
      \u0275\u0275restoreView(_r14);
      const ctx_r0 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r0.aparenciaContactEmail, $event) || (ctx_r0.aparenciaContactEmail = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(52, "div")(53, "label", 50);
    \u0275\u0275text(54, "Link do Google Maps");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(55, "input", 126);
    \u0275\u0275twoWayListener("ngModelChange", function LinkBioComponent_Conditional_2_Conditional_1_div_54_Template_input_ngModelChange_55_listener($event) {
      \u0275\u0275restoreView(_r14);
      const ctx_r0 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r0.aparenciaMapsUrl, $event) || (ctx_r0.aparenciaMapsUrl = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(56, "div", 127)(57, "button", 128);
    \u0275\u0275conditionalCreate(58, LinkBioComponent_Conditional_2_Conditional_1_div_54_Conditional_58_Template, 1, 0, "span", 47)(59, LinkBioComponent_Conditional_2_Conditional_1_div_54_Conditional_59_Template, 2, 0, "span", 11);
    \u0275\u0275text(60);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(6);
    \u0275\u0275classProp("selected", ctx_r0.aparenciaPublicTheme === "");
    \u0275\u0275advance(8);
    \u0275\u0275repeater(\u0275\u0275pipeBind1(16, 18, ctx_r0.availableThemes));
    \u0275\u0275advance(9);
    \u0275\u0275classProp("selected", ctx_r0.aparenciaCoverMode === "banner");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("selected", ctx_r0.aparenciaCoverMode === "solid");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("selected", ctx_r0.aparenciaCoverMode === "none");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.aparenciaCoverMode === "solid" ? 29 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.aparenciaCoverMode === "banner" ? 30 : -1);
    \u0275\u0275advance(8);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.aparenciaShortDescription);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.aparenciaSpecialties);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.aparenciaFoundedYear);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.aparenciaContactEmail);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.aparenciaMapsUrl);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r0.salvandoAparencia);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.salvandoAparencia ? 58 : 59);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.salvandoAparencia ? "Salvando\u2026" : "Salvar apar\xEAncia", " ");
  }
}
function LinkBioComponent_Conditional_2_Conditional_1_Conditional_55_Conditional_45_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 47);
  }
}
function LinkBioComponent_Conditional_2_Conditional_1_Conditional_55_Conditional_46_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 11);
    \u0275\u0275text(1, "save");
    \u0275\u0275elementEnd();
  }
}
function LinkBioComponent_Conditional_2_Conditional_1_Conditional_55_For_53_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "iframe", 149);
  }
  if (rf & 2) {
    const m_r21 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275property("src", ctx, \u0275\u0275sanitizeResourceUrl)("title", "Pr\xE9via: " + ctx_r0.linkBioModelLabels[m_r21]);
  }
}
function LinkBioComponent_Conditional_2_Conditional_1_Conditional_55_For_53_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 150);
    \u0275\u0275text(1, "\u2026");
    \u0275\u0275elementEnd();
  }
}
function LinkBioComponent_Conditional_2_Conditional_1_Conditional_55_For_53_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 146)(1, "span", 147);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 148);
    \u0275\u0275conditionalCreate(4, LinkBioComponent_Conditional_2_Conditional_1_Conditional_55_For_53_Conditional_4_Template, 1, 2, "iframe", 149)(5, LinkBioComponent_Conditional_2_Conditional_1_Conditional_55_For_53_Conditional_5_Template, 2, 0, "div", 150);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_14_0;
    const m_r21 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.linkBioModelLabels[m_r21]);
    \u0275\u0275advance(2);
    \u0275\u0275conditional((tmp_14_0 = ctx_r0.modelPreviewUrlSafe(m_r21)) ? 4 : 5, tmp_14_0);
  }
}
function LinkBioComponent_Conditional_2_Conditional_1_Conditional_55_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 25)(1, "form", 105);
    \u0275\u0275listener("ngSubmit", function LinkBioComponent_Conditional_2_Conditional_1_Conditional_55_Template_form_ngSubmit_1_listener() {
      \u0275\u0275restoreView(_r20);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.salvarModelos());
    });
    \u0275\u0275elementStart(2, "div", 94)(3, "p", 106);
    \u0275\u0275text(4, "Modelo publicado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 138);
    \u0275\u0275text(6, " Escolha qual layout os visitantes veem no link p\xFAblico. Textos espec\xEDficos, conv\xEAnios, modalidades e equipe ficam na aba ");
    \u0275\u0275elementStart(7, "strong");
    \u0275\u0275text(8, "Conte\xFAdo extra");
    \u0275\u0275elementEnd();
    \u0275\u0275text(9, ". As pr\xE9vias abaixo usam esses dados ao voltar para esta aba. ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 139)(11, "label", 140)(12, "input", 141);
    \u0275\u0275twoWayListener("ngModelChange", function LinkBioComponent_Conditional_2_Conditional_1_Conditional_55_Template_input_ngModelChange_12_listener($event) {
      \u0275\u0275restoreView(_r20);
      const ctx_r0 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r0.aparenciaModelo, $event) || (ctx_r0.aparenciaModelo = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "label", 140)(15, "input", 141);
    \u0275\u0275twoWayListener("ngModelChange", function LinkBioComponent_Conditional_2_Conditional_1_Conditional_55_Template_input_ngModelChange_15_listener($event) {
      \u0275\u0275restoreView(_r20);
      const ctx_r0 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r0.aparenciaModelo, $event) || (ctx_r0.aparenciaModelo = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275text(16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "label", 140)(18, "input", 141);
    \u0275\u0275twoWayListener("ngModelChange", function LinkBioComponent_Conditional_2_Conditional_1_Conditional_55_Template_input_ngModelChange_18_listener($event) {
      \u0275\u0275restoreView(_r20);
      const ctx_r0 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r0.aparenciaModelo, $event) || (ctx_r0.aparenciaModelo = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275text(19);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "label", 140)(21, "input", 141);
    \u0275\u0275twoWayListener("ngModelChange", function LinkBioComponent_Conditional_2_Conditional_1_Conditional_55_Template_input_ngModelChange_21_listener($event) {
      \u0275\u0275restoreView(_r20);
      const ctx_r0 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r0.aparenciaModelo, $event) || (ctx_r0.aparenciaModelo = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275text(22);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "label", 140)(24, "input", 141);
    \u0275\u0275twoWayListener("ngModelChange", function LinkBioComponent_Conditional_2_Conditional_1_Conditional_55_Template_input_ngModelChange_24_listener($event) {
      \u0275\u0275restoreView(_r20);
      const ctx_r0 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r0.aparenciaModelo, $event) || (ctx_r0.aparenciaModelo = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275text(25);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "label", 140)(27, "input", 141);
    \u0275\u0275twoWayListener("ngModelChange", function LinkBioComponent_Conditional_2_Conditional_1_Conditional_55_Template_input_ngModelChange_27_listener($event) {
      \u0275\u0275restoreView(_r20);
      const ctx_r0 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r0.aparenciaModelo, $event) || (ctx_r0.aparenciaModelo = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275text(28);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "label", 142)(30, "input", 141);
    \u0275\u0275twoWayListener("ngModelChange", function LinkBioComponent_Conditional_2_Conditional_1_Conditional_55_Template_input_ngModelChange_30_listener($event) {
      \u0275\u0275restoreView(_r20);
      const ctx_r0 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r0.aparenciaModelo, $event) || (ctx_r0.aparenciaModelo = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275text(31);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "label", 142)(33, "input", 141);
    \u0275\u0275twoWayListener("ngModelChange", function LinkBioComponent_Conditional_2_Conditional_1_Conditional_55_Template_input_ngModelChange_33_listener($event) {
      \u0275\u0275restoreView(_r20);
      const ctx_r0 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r0.aparenciaModelo, $event) || (ctx_r0.aparenciaModelo = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275text(34);
    \u0275\u0275elementEnd()()();
    \u0275\u0275element(35, "div", 41);
    \u0275\u0275elementStart(36, "div", 42)(37, "div", 43);
    \u0275\u0275text(38, "Altera\xE7\xF5es n\xE3o salvas");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "div", 44)(40, "a", 45)(41, "span", 11);
    \u0275\u0275text(42, "close");
    \u0275\u0275elementEnd();
    \u0275\u0275text(43, " Cancelar ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(44, "button", 143);
    \u0275\u0275conditionalCreate(45, LinkBioComponent_Conditional_2_Conditional_1_Conditional_55_Conditional_45_Template, 1, 0, "span", 47)(46, LinkBioComponent_Conditional_2_Conditional_1_Conditional_55_Conditional_46_Template, 2, 0, "span", 11);
    \u0275\u0275text(47);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(48, "div")(49, "p", 144);
    \u0275\u0275text(50, "Pr\xE9via dos layouts");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(51, "div", 145);
    \u0275\u0275repeaterCreate(52, LinkBioComponent_Conditional_2_Conditional_1_Conditional_55_For_53_Template, 6, 2, "div", 146, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(12);
    \u0275\u0275property("value", 1);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.aparenciaModelo);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.linkBioModelLabels[1], " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("value", 2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.aparenciaModelo);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.linkBioModelLabels[2], " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("value", 3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.aparenciaModelo);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.linkBioModelLabels[3], " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("value", 4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.aparenciaModelo);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.linkBioModelLabels[4], " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("value", 5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.aparenciaModelo);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.linkBioModelLabels[5], " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("value", 6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.aparenciaModelo);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.linkBioModelLabels[6], " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("value", 7);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.aparenciaModelo);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.linkBioModelLabels[7], " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("value", 8);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.aparenciaModelo);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.linkBioModelLabels[8], " ");
    \u0275\u0275advance(10);
    \u0275\u0275property("disabled", ctx_r0.salvandoModelos);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.salvandoModelos ? 45 : 46);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.salvandoModelos ? "Salvando\u2026" : "Salvar configura\xE7\xF5es", " ");
    \u0275\u0275advance(5);
    \u0275\u0275repeater(ctx_r0.previewModelIds);
  }
}
function LinkBioComponent_Conditional_2_Conditional_1_Conditional_56_For_39_Template(rf, ctx) {
  if (rf & 1) {
    const _r23 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 163)(1, "input", 166);
    \u0275\u0275twoWayListener("ngModelChange", function LinkBioComponent_Conditional_2_Conditional_1_Conditional_56_For_39_Template_input_ngModelChange_1_listener($event) {
      const $index_r24 = \u0275\u0275restoreView(_r23).$index;
      const ctx_r0 = \u0275\u0275nextContext(4);
      \u0275\u0275twoWayBindingSet(ctx_r0.extraConveniosLinhas[$index_r24], $event) || (ctx_r0.extraConveniosLinhas[$index_r24] = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "button", 167);
    \u0275\u0275listener("click", function LinkBioComponent_Conditional_2_Conditional_1_Conditional_56_For_39_Template_button_click_2_listener() {
      const $index_r24 = \u0275\u0275restoreView(_r23).$index;
      const ctx_r0 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r0.removerConvenioLinha($index_r24));
    });
    \u0275\u0275elementStart(3, "span", 168);
    \u0275\u0275text(4, "close");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const $index_r24 = ctx.$index;
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.extraConveniosLinhas[$index_r24]);
    \u0275\u0275property("name", "extra_conv_" + $index_r24);
  }
}
function LinkBioComponent_Conditional_2_Conditional_1_Conditional_56_Conditional_51_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 164);
    \u0275\u0275text(1, "Nenhuma modalidade personalizada. Clique em Adicionar para criar (ex.: Online, Presencial).");
    \u0275\u0275elementEnd();
  }
}
function LinkBioComponent_Conditional_2_Conditional_1_Conditional_56_For_54_Template(rf, ctx) {
  if (rf & 1) {
    const _r25 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 165)(1, "div", 169)(2, "span", 170);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 68);
    \u0275\u0275listener("click", function LinkBioComponent_Conditional_2_Conditional_1_Conditional_56_For_54_Template_button_click_4_listener() {
      const $index_r26 = \u0275\u0275restoreView(_r25).$index;
      const ctx_r0 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r0.removerModalidade($index_r26));
    });
    \u0275\u0275text(5, "Remover");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 139)(7, "div")(8, "label", 50);
    \u0275\u0275text(9, "T\xEDtulo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "input", 171);
    \u0275\u0275twoWayListener("ngModelChange", function LinkBioComponent_Conditional_2_Conditional_1_Conditional_56_For_54_Template_input_ngModelChange_10_listener($event) {
      const mod_r27 = \u0275\u0275restoreView(_r25).$implicit;
      \u0275\u0275twoWayBindingSet(mod_r27.title, $event) || (mod_r27.title = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div")(12, "label", 50);
    \u0275\u0275text(13, "Subt\xEDtulo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "input", 172);
    \u0275\u0275twoWayListener("ngModelChange", function LinkBioComponent_Conditional_2_Conditional_1_Conditional_56_For_54_Template_input_ngModelChange_14_listener($event) {
      const mod_r27 = \u0275\u0275restoreView(_r25).$implicit;
      \u0275\u0275twoWayBindingSet(mod_r27.subtitle, $event) || (mod_r27.subtitle = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(15, "label", 173)(16, "input", 174);
    \u0275\u0275twoWayListener("ngModelChange", function LinkBioComponent_Conditional_2_Conditional_1_Conditional_56_For_54_Template_input_ngModelChange_16_listener($event) {
      const mod_r27 = \u0275\u0275restoreView(_r25).$implicit;
      \u0275\u0275twoWayBindingSet(mod_r27.available, $event) || (mod_r27.available = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275text(17, " Dispon\xEDvel (exibir na p\xE1gina) ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const mod_r27 = ctx.$implicit;
    const $index_r26 = ctx.$index;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Modalidade ", $index_r26 + 1);
    \u0275\u0275advance(7);
    \u0275\u0275twoWayProperty("ngModel", mod_r27.title);
    \u0275\u0275property("name", "mod_t_" + $index_r26);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", mod_r27.subtitle);
    \u0275\u0275property("name", "mod_s_" + $index_r26);
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", mod_r27.available);
    \u0275\u0275property("name", "mod_a_" + $index_r26);
  }
}
function LinkBioComponent_Conditional_2_Conditional_1_Conditional_56_Conditional_66_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 164);
    \u0275\u0275text(1, "Nenhum membro. Adicione para listar na p\xE1gina p\xFAblica.");
    \u0275\u0275elementEnd();
  }
}
function LinkBioComponent_Conditional_2_Conditional_1_Conditional_56_For_69_Template(rf, ctx) {
  if (rf & 1) {
    const _r28 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 165)(1, "div", 169)(2, "span", 170);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 68);
    \u0275\u0275listener("click", function LinkBioComponent_Conditional_2_Conditional_1_Conditional_56_For_69_Template_button_click_4_listener() {
      const $index_r29 = \u0275\u0275restoreView(_r28).$index;
      const ctx_r0 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r0.removerMembroEquipe($index_r29));
    });
    \u0275\u0275text(5, "Remover");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 139)(7, "div", 175)(8, "label", 50);
    \u0275\u0275text(9, "Nome");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "input", 176);
    \u0275\u0275twoWayListener("ngModelChange", function LinkBioComponent_Conditional_2_Conditional_1_Conditional_56_For_69_Template_input_ngModelChange_10_listener($event) {
      const mem_r30 = \u0275\u0275restoreView(_r28).$implicit;
      \u0275\u0275twoWayBindingSet(mem_r30.name, $event) || (mem_r30.name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div")(12, "label", 50);
    \u0275\u0275text(13, "Registro / credencial");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "input", 177);
    \u0275\u0275twoWayListener("ngModelChange", function LinkBioComponent_Conditional_2_Conditional_1_Conditional_56_For_69_Template_input_ngModelChange_14_listener($event) {
      const mem_r30 = \u0275\u0275restoreView(_r28).$implicit;
      \u0275\u0275twoWayBindingSet(mem_r30.credential, $event) || (mem_r30.credential = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "div")(16, "label", 50);
    \u0275\u0275text(17, "Observa\xE7\xE3o");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "input", 178);
    \u0275\u0275twoWayListener("ngModelChange", function LinkBioComponent_Conditional_2_Conditional_1_Conditional_56_For_69_Template_input_ngModelChange_18_listener($event) {
      const mem_r30 = \u0275\u0275restoreView(_r28).$implicit;
      \u0275\u0275twoWayBindingSet(mem_r30.notes, $event) || (mem_r30.notes = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "div", 175)(20, "label", 50);
    \u0275\u0275text(21, "WhatsApp (s\xF3 n\xFAmeros ou com DDD)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "input", 179);
    \u0275\u0275twoWayListener("ngModelChange", function LinkBioComponent_Conditional_2_Conditional_1_Conditional_56_For_69_Template_input_ngModelChange_22_listener($event) {
      const mem_r30 = \u0275\u0275restoreView(_r28).$implicit;
      \u0275\u0275twoWayBindingSet(mem_r30.whatsapp, $event) || (mem_r30.whatsapp = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const mem_r30 = ctx.$implicit;
    const $index_r29 = ctx.$index;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Pessoa ", $index_r29 + 1);
    \u0275\u0275advance(7);
    \u0275\u0275twoWayProperty("ngModel", mem_r30.name);
    \u0275\u0275property("name", "team_n_" + $index_r29);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", mem_r30.credential);
    \u0275\u0275property("name", "team_c_" + $index_r29);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", mem_r30.notes);
    \u0275\u0275property("name", "team_o_" + $index_r29);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", mem_r30.whatsapp);
    \u0275\u0275property("name", "team_w_" + $index_r29);
  }
}
function LinkBioComponent_Conditional_2_Conditional_1_Conditional_56_Conditional_80_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 47);
  }
}
function LinkBioComponent_Conditional_2_Conditional_1_Conditional_56_Conditional_81_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 11);
    \u0275\u0275text(1, "save");
    \u0275\u0275elementEnd();
  }
}
function LinkBioComponent_Conditional_2_Conditional_1_Conditional_56_Template(rf, ctx) {
  if (rf & 1) {
    const _r22 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 26)(1, "p", 151);
    \u0275\u0275text(2, " Preencha s\xF3 o que fizer sentido para o seu layout. Campos vazios s\xE3o ignorados. Deixe tudo em branco e salve para limpar os dados extras da p\xE1gina p\xFAblica. ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "form", 105);
    \u0275\u0275listener("ngSubmit", function LinkBioComponent_Conditional_2_Conditional_1_Conditional_56_Template_form_ngSubmit_3_listener() {
      \u0275\u0275restoreView(_r22);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.salvarConteudoExtra());
    });
    \u0275\u0275elementStart(4, "div", 94)(5, "p", 152);
    \u0275\u0275text(6, "Textos e links");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 153);
    \u0275\u0275text(8, "Usados nos layouts tem\xE1ticos (2 a 8). Veterin\xE1ria, pediatria e nutri\xE7\xE3o tamb\xE9m leem registro profissional, conv\xEAnios, modalidades e textos aqui quando aplic\xE1vel.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 120)(10, "div")(11, "label", 50);
    \u0275\u0275text(12, "Frase de destaque (hero)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "input", 154);
    \u0275\u0275twoWayListener("ngModelChange", function LinkBioComponent_Conditional_2_Conditional_1_Conditional_56_Template_input_ngModelChange_13_listener($event) {
      \u0275\u0275restoreView(_r22);
      const ctx_r0 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r0.extraHeroTagline, $event) || (ctx_r0.extraHeroTagline = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div")(15, "label", 50);
    \u0275\u0275text(16, "Registro profissional (CRO, CRM, CRP\u2026)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "input", 155);
    \u0275\u0275twoWayListener("ngModelChange", function LinkBioComponent_Conditional_2_Conditional_1_Conditional_56_Template_input_ngModelChange_17_listener($event) {
      \u0275\u0275restoreView(_r22);
      const ctx_r0 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r0.extraCouncilRegistration, $event) || (ctx_r0.extraCouncilRegistration = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "div")(19, "label", 50);
    \u0275\u0275text(20, "Subt\xEDtulo da marca (est\xE9tica)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "input", 156);
    \u0275\u0275twoWayListener("ngModelChange", function LinkBioComponent_Conditional_2_Conditional_1_Conditional_56_Template_input_ngModelChange_21_listener($event) {
      \u0275\u0275restoreView(_r22);
      const ctx_r0 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r0.extraBrandSubtitle, $event) || (ctx_r0.extraBrandSubtitle = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "div")(23, "label", 50);
    \u0275\u0275text(24, "Instagram (URL completa)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "input", 157);
    \u0275\u0275twoWayListener("ngModelChange", function LinkBioComponent_Conditional_2_Conditional_1_Conditional_56_Template_input_ngModelChange_25_listener($event) {
      \u0275\u0275restoreView(_r22);
      const ctx_r0 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r0.extraInstagramUrl, $event) || (ctx_r0.extraInstagramUrl = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(26, "div", 94)(27, "div", 158)(28, "div")(29, "p", 159);
    \u0275\u0275text(30, "Conv\xEAnios aceitos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "p", 160);
    \u0275\u0275text(32, "Layout odontologia (4)");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(33, "button", 161);
    \u0275\u0275listener("click", function LinkBioComponent_Conditional_2_Conditional_1_Conditional_56_Template_button_click_33_listener() {
      \u0275\u0275restoreView(_r22);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.adicionarConvenioLinha());
    });
    \u0275\u0275elementStart(34, "span", 11);
    \u0275\u0275text(35, "add");
    \u0275\u0275elementEnd();
    \u0275\u0275text(36, " Adicionar ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(37, "div", 162);
    \u0275\u0275repeaterCreate(38, LinkBioComponent_Conditional_2_Conditional_1_Conditional_56_For_39_Template, 5, 2, "div", 163, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(40, "div", 94)(41, "div", 158)(42, "div")(43, "p", 159);
    \u0275\u0275text(44, "Modalidades de atendimento");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(45, "p", 160);
    \u0275\u0275text(46, "Layout profissional solo (2). Se vazio, a p\xE1gina usa padr\xE3o (Online / Presencial).");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(47, "button", 161);
    \u0275\u0275listener("click", function LinkBioComponent_Conditional_2_Conditional_1_Conditional_56_Template_button_click_47_listener() {
      \u0275\u0275restoreView(_r22);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.adicionarModalidade());
    });
    \u0275\u0275elementStart(48, "span", 11);
    \u0275\u0275text(49, "add");
    \u0275\u0275elementEnd();
    \u0275\u0275text(50, " Adicionar ");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(51, LinkBioComponent_Conditional_2_Conditional_1_Conditional_56_Conditional_51_Template, 2, 0, "p", 164);
    \u0275\u0275elementStart(52, "div", 120);
    \u0275\u0275repeaterCreate(53, LinkBioComponent_Conditional_2_Conditional_1_Conditional_56_For_54_Template, 18, 7, "div", 165, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(55, "div", 94)(56, "div", 158)(57, "div")(58, "p", 159);
    \u0275\u0275text(59, "Equipe");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(60, "p", 160);
    \u0275\u0275text(61, "Layout multi profissionais (5)");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(62, "button", 161);
    \u0275\u0275listener("click", function LinkBioComponent_Conditional_2_Conditional_1_Conditional_56_Template_button_click_62_listener() {
      \u0275\u0275restoreView(_r22);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.adicionarMembroEquipe());
    });
    \u0275\u0275elementStart(63, "span", 11);
    \u0275\u0275text(64, "person_add");
    \u0275\u0275elementEnd();
    \u0275\u0275text(65, " Adicionar pessoa ");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(66, LinkBioComponent_Conditional_2_Conditional_1_Conditional_56_Conditional_66_Template, 2, 0, "p", 164);
    \u0275\u0275elementStart(67, "div", 120);
    \u0275\u0275repeaterCreate(68, LinkBioComponent_Conditional_2_Conditional_1_Conditional_56_For_69_Template, 23, 9, "div", 165, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd()();
    \u0275\u0275element(70, "div", 41);
    \u0275\u0275elementStart(71, "div", 42)(72, "div", 43);
    \u0275\u0275text(73, "Altera\xE7\xF5es n\xE3o salvas");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(74, "div", 44)(75, "a", 45)(76, "span", 11);
    \u0275\u0275text(77, "close");
    \u0275\u0275elementEnd();
    \u0275\u0275text(78, " Cancelar ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(79, "button", 143);
    \u0275\u0275conditionalCreate(80, LinkBioComponent_Conditional_2_Conditional_1_Conditional_56_Conditional_80_Template, 1, 0, "span", 47)(81, LinkBioComponent_Conditional_2_Conditional_1_Conditional_56_Conditional_81_Template, 2, 0, "span", 11);
    \u0275\u0275text(82);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(13);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.extraHeroTagline);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.extraCouncilRegistration);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.extraBrandSubtitle);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.extraInstagramUrl);
    \u0275\u0275advance(13);
    \u0275\u0275repeater(ctx_r0.extraConveniosLinhas);
    \u0275\u0275advance(13);
    \u0275\u0275conditional(ctx_r0.extraModalidades.length === 0 ? 51 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r0.extraModalidades);
    \u0275\u0275advance(13);
    \u0275\u0275conditional(ctx_r0.extraEquipe.length === 0 ? 66 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r0.extraEquipe);
    \u0275\u0275advance(11);
    \u0275\u0275property("disabled", ctx_r0.salvandoExtra);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.salvandoExtra ? 80 : 81);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.salvandoExtra ? "Salvando\u2026" : "Salvar configura\xE7\xF5es", " ");
  }
}
function LinkBioComponent_Conditional_2_Conditional_1_Conditional_57_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "iframe", 182);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275property("src", ctx_r0.previewUrlSafe, \u0275\u0275sanitizeResourceUrl);
  }
}
function LinkBioComponent_Conditional_2_Conditional_1_Conditional_57_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 183)(1, "span", 184);
    \u0275\u0275text(2, "smartphone");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4, "Carregando pr\xE9via\u2026");
    \u0275\u0275elementEnd()();
  }
}
function LinkBioComponent_Conditional_2_Conditional_1_Conditional_57_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 27)(1, "p", 180);
    \u0275\u0275text(2, "Pr\xE9via ao vivo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 181);
    \u0275\u0275conditionalCreate(4, LinkBioComponent_Conditional_2_Conditional_1_Conditional_57_Conditional_4_Template, 1, 1, "iframe", 182)(5, LinkBioComponent_Conditional_2_Conditional_1_Conditional_57_Conditional_5_Template, 5, 0, "div", 183);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx_r0.previewUrlSafe ? 4 : 5);
  }
}
function LinkBioComponent_Conditional_2_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 3)(1, "div", 4)(2, "div", 5)(3, "div")(4, "p", 6);
    \u0275\u0275text(5, "Link Bio");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "h1", 7);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 8)(9, "span", 9);
    \u0275\u0275text(10, "\u25CF Publicado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "a", 10)(12, "span", 11);
    \u0275\u0275text(13, "open_in_new");
    \u0275\u0275elementEnd();
    \u0275\u0275text(14, " Ver p\xE1gina ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "button", 12);
    \u0275\u0275listener("click", function LinkBioComponent_Conditional_2_Conditional_1_Template_button_click_15_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.copiarLinkPrincipal());
    });
    \u0275\u0275elementStart(16, "span", 11);
    \u0275\u0275text(17, "content_copy");
    \u0275\u0275elementEnd();
    \u0275\u0275text(18, " Copiar link ");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(19, "div", 13)(20, "input", 14);
    \u0275\u0275listener("click", function LinkBioComponent_Conditional_2_Conditional_1_Template_input_click_20_listener($event) {
      \u0275\u0275restoreView(_r2);
      return \u0275\u0275resetView($event.target.select());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "button", 15);
    \u0275\u0275listener("click", function LinkBioComponent_Conditional_2_Conditional_1_Template_button_click_21_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.copiarLinkPrincipal());
    });
    \u0275\u0275text(22, " Copiar ");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(23, LinkBioComponent_Conditional_2_Conditional_1_div_23_Template, 27, 6, "div", 16);
    \u0275\u0275elementStart(24, "div", 17)(25, "div")(26, "div", 18)(27, "button", 19);
    \u0275\u0275listener("click", function LinkBioComponent_Conditional_2_Conditional_1_Template_button_click_27_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.ativarAba("modelos"));
    });
    \u0275\u0275elementStart(28, "span", 20);
    \u0275\u0275text(29, "dashboard");
    \u0275\u0275elementEnd();
    \u0275\u0275text(30, " Modelos ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "button", 19);
    \u0275\u0275listener("click", function LinkBioComponent_Conditional_2_Conditional_1_Template_button_click_31_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.ativarAba("conteudoExtra"));
    });
    \u0275\u0275elementStart(32, "span", 20);
    \u0275\u0275text(33, "tune");
    \u0275\u0275elementEnd();
    \u0275\u0275text(34, " Conte\xFAdo extra ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "button", 19);
    \u0275\u0275listener("click", function LinkBioComponent_Conditional_2_Conditional_1_Template_button_click_35_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.ativarAba("links"));
    });
    \u0275\u0275elementStart(36, "span", 20);
    \u0275\u0275text(37, "link");
    \u0275\u0275elementEnd();
    \u0275\u0275text(38, " Links ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "button", 19);
    \u0275\u0275listener("click", function LinkBioComponent_Conditional_2_Conditional_1_Template_button_click_39_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.ativarAba("forms"));
    });
    \u0275\u0275elementStart(40, "span", 20);
    \u0275\u0275text(41, "description");
    \u0275\u0275elementEnd();
    \u0275\u0275text(42, " Formul\xE1rios ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "button", 19);
    \u0275\u0275listener("click", function LinkBioComponent_Conditional_2_Conditional_1_Template_button_click_43_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.ativarAba("stats"));
    });
    \u0275\u0275elementStart(44, "span", 20);
    \u0275\u0275text(45, "bar_chart");
    \u0275\u0275elementEnd();
    \u0275\u0275text(46, " Estat\xEDsticas ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(47, "button", 19);
    \u0275\u0275listener("click", function LinkBioComponent_Conditional_2_Conditional_1_Template_button_click_47_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.ativarAba("aparencia"));
    });
    \u0275\u0275elementStart(48, "span", 20);
    \u0275\u0275text(49, "palette");
    \u0275\u0275elementEnd();
    \u0275\u0275text(50, " Apar\xEAncia ");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(51, LinkBioComponent_Conditional_2_Conditional_1_div_51_Template, 24, 8, "div", 21)(52, LinkBioComponent_Conditional_2_Conditional_1_div_52_Template, 19, 1, "div", 22)(53, LinkBioComponent_Conditional_2_Conditional_1_div_53_Template, 22, 5, "div", 23)(54, LinkBioComponent_Conditional_2_Conditional_1_div_54_Template, 61, 20, "div", 24);
    \u0275\u0275conditionalCreate(55, LinkBioComponent_Conditional_2_Conditional_1_Conditional_55_Template, 54, 27, "div", 25);
    \u0275\u0275conditionalCreate(56, LinkBioComponent_Conditional_2_Conditional_1_Conditional_56_Template, 83, 9, "div", 26);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(57, LinkBioComponent_Conditional_2_Conditional_1_Conditional_57_Template, 6, 1, "div", 27);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r0.state.clinic.name);
    \u0275\u0275advance(4);
    \u0275\u0275property("href", ctx_r0.publicUrl, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(9);
    \u0275\u0275property("value", ctx_r0.publicUrl);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx_r0.metrics);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("md:col-span-2", ctx_r0.abaAtiva === "modelos" || ctx_r0.abaAtiva === "conteudoExtra");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx_r0.abaAtiva === "modelos");
    \u0275\u0275advance(4);
    \u0275\u0275classProp("active", ctx_r0.abaAtiva === "conteudoExtra");
    \u0275\u0275advance(4);
    \u0275\u0275classProp("active", ctx_r0.abaAtiva === "links");
    \u0275\u0275advance(4);
    \u0275\u0275classProp("active", ctx_r0.abaAtiva === "forms");
    \u0275\u0275advance(4);
    \u0275\u0275classProp("active", ctx_r0.abaAtiva === "stats");
    \u0275\u0275advance(4);
    \u0275\u0275classProp("active", ctx_r0.abaAtiva === "aparencia");
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", ctx_r0.abaAtiva === "links");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.abaAtiva === "forms");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.abaAtiva === "stats" && ctx_r0.stats);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.abaAtiva === "aparencia" && ctx_r0.state);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.abaAtiva === "modelos" && ctx_r0.state ? 55 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.abaAtiva === "conteudoExtra" && ctx_r0.state ? 56 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.abaAtiva !== "modelos" && ctx_r0.abaAtiva !== "conteudoExtra" ? 57 : -1);
  }
}
function LinkBioComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, LinkBioComponent_Conditional_2_Conditional_0_Template, 2, 1, "p", 2);
    \u0275\u0275conditionalCreate(1, LinkBioComponent_Conditional_2_Conditional_1_Template, 58, 25, "div", 3);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r0.erro ? 0 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.state ? 1 : -1);
  }
}
var LINK_BIO_PREVIEW_SESSION_KEY = "zm_link_bio_preview";
var LinkBioComponent = class _LinkBioComponent {
  state = null;
  showSkeleton;
  erro = "";
  abaAtiva = "modelos";
  // Form novo link
  mostrarFormNovo = false;
  novoLabel = "";
  novoUrl = "";
  novoIcon = "link";
  // Edição inline
  editandoId = null;
  editLabel = "";
  editUrl = "";
  editIcon = "link";
  // Aparência
  aparenciaPublicTheme = "";
  aparenciaCoverColor = "#1a1a2e";
  aparenciaCoverMode = "banner";
  aparenciaModelo = 1;
  aparenciaShortDescription = "";
  aparenciaSpecialties = "";
  aparenciaFoundedYear = null;
  aparenciaContactEmail = "";
  aparenciaMapsUrl = "";
  enviandoCover = false;
  salvandoExtra = false;
  salvandoNovoLink = false;
  salvandoEdicaoId = null;
  salvandoAparencia = false;
  salvandoModelos = false;
  excluindoLinkId = null;
  atualizandoStatsRodape = false;
  /** Formulário: dados extras para layouts 2–5 (persistidos em `link_bio_extra`). */
  extraHeroTagline = "";
  extraCouncilRegistration = "";
  extraBrandSubtitle = "";
  extraInstagramUrl = "";
  /** Um campo por linha; linhas vazias são ignoradas ao salvar. */
  extraConveniosLinhas = [""];
  extraModalidades = [];
  extraEquipe = [];
  nomeArquivoCover = "";
  previewUrlSafe = null;
  linkBioService = inject(LinkBioService);
  loadingService = inject(LoadingService);
  clinicaService = inject(ClinicaService);
  toast = inject(ToastService);
  confirm = inject(ConfirmDialogService);
  sanitizer = inject(DomSanitizer);
  platformId = inject(PLATFORM_ID);
  get links() {
    return this.state?.links ?? [];
  }
  get forms() {
    return this.state?.forms ?? [];
  }
  get publicUrl() {
    return this.state?.public_url ?? "";
  }
  get availableIcons() {
    return this.state?.available_icons ?? {};
  }
  get availableThemes() {
    return this.state?.available_themes ?? {};
  }
  get metrics() {
    return this.state?.metrics;
  }
  get stats() {
    return this.state?.stats;
  }
  /** IDs dos modelos para grade de prévia na aba Modelos. */
  previewModelIds = [1, 2, 3, 4, 5, 6, 7, 8];
  /** Nome exibido de cada layout (substitui “Modelo N”). */
  linkBioModelLabels = {
    1: "Gen\xE9rico atual",
    2: "Profissional solo",
    3: "Est\xE9tica e beleza",
    4: "Odontologia",
    5: "Multi profissionais",
    6: "Cl\xEDnica veterin\xE1ria",
    7: "Pediatria",
    8: "Nutricionista"
  };
  /** Bust de cache dos iframes da aba Modelos. */
  previewModelsTimestamp = Date.now();
  /** URL para o iframe de preview: mesma origem + rota /l/:slug (layout do próprio projeto). */
  getPreviewUrl(cacheBust) {
    const slug = this.state?.clinic?.slug;
    if (!slug)
      return this.publicUrl || null;
    if (!isPlatformBrowser(this.platformId))
      return this.publicUrl || null;
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    if (!origin)
      return this.publicUrl || null;
    const base = `${origin}/l/${encodeURIComponent(slug)}?preview=1`;
    return cacheBust ? `${base}&t=${Date.now()}` : base;
  }
  /** Prévia pública com modelo forçado (aba Modelos). */
  modelPreviewUrlSafe(model) {
    const slug = this.state?.clinic?.slug;
    if (!slug || !isPlatformBrowser(this.platformId))
      return null;
    const origin = window.location.origin;
    const u = `${origin}/l/${encodeURIComponent(slug)}?preview=1&preview_model=${model}&t=${this.previewModelsTimestamp}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(u);
  }
  /** Grava rascunho do formulário extra na sessão para os iframes de prévia (?preview=1). */
  syncDraftToSessionForPreviews() {
    if (!isPlatformBrowser(this.platformId))
      return;
    try {
      const payload = this.montarLinkBioExtraPayload();
      if (!payload) {
        sessionStorage.removeItem(LINK_BIO_PREVIEW_SESSION_KEY);
      } else {
        sessionStorage.setItem(LINK_BIO_PREVIEW_SESSION_KEY, JSON.stringify({ link_bio_extra: payload }));
      }
    } catch {
    }
    this.previewModelsTimestamp = Date.now();
  }
  trim(s) {
    return (s ?? "").trim();
  }
  /** Monta o objeto salvo na API a partir do formulário. */
  montarLinkBioExtraPayload() {
    const o = {};
    if (this.trim(this.extraHeroTagline))
      o.hero_tagline = this.trim(this.extraHeroTagline);
    if (this.trim(this.extraCouncilRegistration))
      o.council_registration = this.trim(this.extraCouncilRegistration);
    if (this.trim(this.extraBrandSubtitle))
      o.brand_subtitle = this.trim(this.extraBrandSubtitle);
    if (this.trim(this.extraInstagramUrl))
      o.instagram_url = this.trim(this.extraInstagramUrl);
    const convenios = this.extraConveniosLinhas.map((x) => this.trim(x)).filter(Boolean);
    if (convenios.length)
      o.convenios = convenios;
    const modalities = this.extraModalidades.filter((m) => this.trim(m.title)).map((m) => ({
      title: this.trim(m.title),
      subtitle: this.trim(m.subtitle) || void 0,
      available: m.available !== false
    }));
    if (modalities.length)
      o.modalities = modalities;
    const team = this.extraEquipe.filter((m) => this.trim(m.name)).map((m) => ({
      name: this.trim(m.name),
      credential: this.trim(m.credential) || void 0,
      notes: this.trim(m.notes) || void 0,
      whatsapp: this.trim(m.whatsapp) || void 0
    }));
    if (team.length)
      o.team = team;
    return Object.keys(o).length ? o : null;
  }
  aplicarExtraNoFormulario(extra) {
    const e = extra && typeof extra === "object" && !Array.isArray(extra) ? extra : null;
    this.extraHeroTagline = e?.hero_tagline ?? "";
    this.extraCouncilRegistration = e?.council_registration ?? "";
    this.extraBrandSubtitle = e?.brand_subtitle ?? "";
    this.extraInstagramUrl = e?.instagram_url ?? "";
    const conv = e?.convenios?.filter((x) => this.trim(String(x))) ?? [];
    this.extraConveniosLinhas = conv.length ? [...conv] : [""];
    const mods = e?.modalities ?? [];
    this.extraModalidades = mods.length ? mods.map((m) => ({
      title: m.title ?? "",
      subtitle: m.subtitle ?? "",
      available: m.available !== false
    })) : [];
    const team = e?.team ?? [];
    this.extraEquipe = team.length ? team.map((t) => ({
      name: t.name ?? "",
      credential: t.credential ?? "",
      notes: t.notes ?? "",
      whatsapp: t.whatsapp ?? ""
    })) : [];
  }
  adicionarConvenioLinha() {
    this.extraConveniosLinhas.push("");
  }
  removerConvenioLinha(index) {
    if (this.extraConveniosLinhas.length <= 1) {
      this.extraConveniosLinhas = [""];
      return;
    }
    this.extraConveniosLinhas.splice(index, 1);
  }
  adicionarModalidade() {
    this.extraModalidades.push({ title: "", subtitle: "", available: true });
  }
  removerModalidade(index) {
    this.extraModalidades.splice(index, 1);
  }
  adicionarMembroEquipe() {
    this.extraEquipe.push({ name: "", credential: "", notes: "", whatsapp: "" });
  }
  removerMembroEquipe(index) {
    this.extraEquipe.splice(index, 1);
  }
  salvarConteudoExtra() {
    if (!this.state)
      return;
    this.salvandoExtra = true;
    const link_bio_extra = this.montarLinkBioExtraPayload();
    this.linkBioService.updateAparencia({ link_bio_extra }).subscribe({
      next: (clinic) => {
        this.salvandoExtra = false;
        if (this.state) {
          this.state.clinic = __spreadValues(__spreadValues({}, this.state.clinic), clinic);
        }
        if (isPlatformBrowser(this.platformId)) {
          try {
            sessionStorage.removeItem(LINK_BIO_PREVIEW_SESSION_KEY);
          } catch {
          }
        }
        this.previewModelsTimestamp = Date.now();
        this.atualizarPreviewUrl();
        this.toast.success("Conte\xFAdo extra salvo", "As informa\xE7\xF5es foram atualizadas.");
      },
      error: () => {
        this.salvandoExtra = false;
        this.toast.error("Erro ao salvar", "N\xE3o foi poss\xEDvel salvar o conte\xFAdo extra.");
      }
    });
  }
  /** Atualiza o iframe de preview (ex.: após salvar aparência). */
  atualizarPreviewUrl() {
    const url = this.getPreviewUrl(true);
    this.previewUrlSafe = url ? this.sanitizer.bypassSecurityTrustResourceUrl(url) : null;
  }
  ngOnInit() {
    this.carregar();
  }
  carregar() {
    const { data$, showSkeleton } = this.loadingService.loadWithThreshold(this.linkBioService.get());
    this.showSkeleton = showSkeleton;
    data$.subscribe({
      next: (s) => this.aplicarEstadoLinkBio(s),
      error: () => {
        this.erro = "N\xE3o foi poss\xEDvel carregar o Link Bio.";
      }
    });
  }
  aplicarEstadoLinkBio(s) {
    this.state = s;
    const c = s.clinic;
    this.aparenciaPublicTheme = c.public_theme ?? "";
    this.aparenciaCoverColor = c.cover_color ?? "#1a1a2e";
    this.aparenciaCoverMode = c.cover_mode ?? "banner";
    this.aparenciaModelo = c.link_bio_model ?? 1;
    this.aparenciaShortDescription = c.short_description ?? "";
    this.aparenciaSpecialties = c.specialties ?? "";
    this.aparenciaFoundedYear = c.founded_year ?? null;
    this.aparenciaContactEmail = c.contact_email ?? "";
    this.aparenciaMapsUrl = c.maps_url ?? "";
    this.aplicarExtraNoFormulario(c.link_bio_extra);
    this.syncDraftToSessionForPreviews();
    const previewUrl = this.getPreviewUrl(true);
    this.previewUrlSafe = previewUrl ? this.sanitizer.bypassSecurityTrustResourceUrl(previewUrl) : null;
  }
  /** Rodapé da aba Links: salvar novo link ou edição em andamento. */
  get linkBioFooterLinksSaveDisabled() {
    if (this.salvandoNovoLink || this.salvandoEdicaoId !== null)
      return true;
    if (this.mostrarFormNovo) {
      return !this.novoLabel.trim() || !this.novoUrl.trim();
    }
    if (this.editandoId !== null) {
      return !this.editLabel.trim() || !this.editUrl.trim();
    }
    return true;
  }
  salvarFooterAbaLinks() {
    if (this.mostrarFormNovo) {
      this.salvarNovoLink();
      return;
    }
    if (this.editandoId !== null) {
      const lnk = this.links.find((l) => l.id === this.editandoId);
      if (lnk) {
        this.salvarEdicao(lnk);
      }
    }
  }
  atualizarDadosEstatisticas() {
    if (this.atualizandoStatsRodape)
      return;
    this.atualizandoStatsRodape = true;
    this.linkBioService.get().subscribe({
      next: (s) => {
        this.atualizandoStatsRodape = false;
        this.aplicarEstadoLinkBio(s);
        this.toast.success("Dados atualizados", "M\xE9tricas e estat\xEDsticas foram recarregadas.");
      },
      error: () => {
        this.atualizandoStatsRodape = false;
        this.toast.error("Erro", "N\xE3o foi poss\xEDvel atualizar os dados.");
      }
    });
  }
  ativarAba(aba) {
    this.abaAtiva = aba;
    if (aba === "modelos") {
      this.syncDraftToSessionForPreviews();
    }
  }
  copiarLinkPrincipal() {
    if (!this.publicUrl)
      return;
    navigator.clipboard.writeText(this.publicUrl);
  }
  toggleFormNovo() {
    this.mostrarFormNovo = !this.mostrarFormNovo;
    if (!this.mostrarFormNovo) {
      this.novoLabel = "";
      this.novoUrl = "";
      this.novoIcon = "link";
    }
  }
  salvarNovoLink() {
    if (!this.novoLabel.trim() || !this.novoUrl.trim())
      return;
    this.salvandoNovoLink = true;
    this.linkBioService.createLink({ label: this.novoLabel.trim(), url: this.novoUrl.trim(), icon: this.novoIcon }).subscribe({
      next: () => {
        this.salvandoNovoLink = false;
        this.toggleFormNovo();
        this.carregar();
        this.toast.success("Link adicionado", "O novo link foi salvo.");
      },
      error: () => {
        this.salvandoNovoLink = false;
        this.toast.error("Erro", "N\xE3o foi poss\xEDvel adicionar o link.");
      }
    });
  }
  iniciarEdicao(link) {
    this.editandoId = link.id;
    this.editLabel = link.label;
    this.editUrl = link.url;
    this.editIcon = link.icon ?? "link";
  }
  cancelarEdicao() {
    this.editandoId = null;
    this.editLabel = "";
    this.editUrl = "";
    this.editIcon = "link";
  }
  salvarEdicao(link) {
    if (!this.editandoId)
      return;
    this.salvandoEdicaoId = link.id;
    const payload = {
      label: this.editLabel.trim() || link.label,
      url: this.editUrl.trim() || link.url,
      icon: this.editIcon || link.icon || "link"
    };
    this.linkBioService.updateLink(link.id, payload).subscribe({
      next: () => {
        this.salvandoEdicaoId = null;
        this.cancelarEdicao();
        this.carregar();
        this.toast.success("Link atualizado", "As altera\xE7\xF5es foram salvas.");
      },
      error: () => {
        this.salvandoEdicaoId = null;
        this.toast.error("Erro", "N\xE3o foi poss\xEDvel salvar o link.");
      }
    });
  }
  excluirLink(link) {
    return __async(this, null, function* () {
      const ok = yield this.confirm.request({
        title: "Remover este link?",
        messageBefore: "O link ",
        emphasis: link.label,
        messageAfter: " ser\xE1 removido da p\xE1gina p\xFAblica.",
        confirmLabel: "Sim, remover",
        variant: "danger"
      });
      if (!ok)
        return;
      this.excluindoLinkId = link.id;
      this.linkBioService.deleteLink(link.id).subscribe({
        next: () => {
          this.excluindoLinkId = null;
          this.carregar();
          this.toast.success("Link removido", `${link.label} foi exclu\xEDdo.`);
        },
        error: () => {
          this.excluindoLinkId = null;
          this.toast.error("Erro", "N\xE3o foi poss\xEDvel remover o link.");
        }
      });
    });
  }
  copiarLinkForm(f) {
    navigator.clipboard.writeText(f.public_url);
  }
  salvarAparencia() {
    if (!this.state)
      return;
    this.salvandoAparencia = true;
    const payload = {
      public_theme: this.aparenciaPublicTheme,
      cover_color: this.aparenciaCoverColor || null,
      cover_mode: this.aparenciaCoverMode,
      short_description: this.aparenciaShortDescription || null,
      specialties: this.aparenciaSpecialties || null,
      founded_year: this.aparenciaFoundedYear || null,
      contact_email: this.aparenciaContactEmail || null,
      maps_url: this.aparenciaMapsUrl || null
    };
    this.linkBioService.updateAparencia(payload).subscribe({
      next: (clinic) => {
        this.salvandoAparencia = false;
        if (this.state) {
          this.state.clinic = __spreadValues(__spreadValues({}, this.state.clinic), clinic);
        }
        this.atualizarPreviewUrl();
        this.toast.success("Apar\xEAncia salva", "As configura\xE7\xF5es visuais foram atualizadas.");
      },
      error: () => {
        this.salvandoAparencia = false;
        this.toast.error("Erro ao salvar", "N\xE3o foi poss\xEDvel salvar a apar\xEAncia.");
      }
    });
  }
  /** Apenas o layout publicado (dados extras ficam na aba Conteúdo extra). */
  salvarModelos() {
    if (!this.state)
      return;
    this.salvandoModelos = true;
    this.linkBioService.updateAparencia({ link_bio_model: this.aparenciaModelo }).subscribe({
      next: (clinic) => {
        this.salvandoModelos = false;
        if (this.state) {
          this.state.clinic = __spreadValues(__spreadValues({}, this.state.clinic), clinic);
        }
        this.syncDraftToSessionForPreviews();
        this.previewModelsTimestamp = Date.now();
        this.atualizarPreviewUrl();
        this.toast.success("Modelo publicado", "O layout do link p\xFAblico foi atualizado.");
      },
      error: () => {
        this.salvandoModelos = false;
        this.toast.error("Erro ao salvar", "N\xE3o foi poss\xEDvel salvar o modelo.");
      }
    });
  }
  selecionarTema(themeKey) {
    this.aparenciaPublicTheme = themeKey;
  }
  onSelecionarCoverImage(event) {
    const input = event.target;
    const file = input.files?.[0];
    if (!file || !this.state?.clinic?.name)
      return;
    this.enviandoCover = true;
    this.nomeArquivoCover = file.name;
    this.clinicaService.uploadCoverImage(file, this.state.clinic.name).subscribe({
      next: (clinic) => {
        if (this.state) {
          this.state.clinic = __spreadValues(__spreadValues({}, this.state.clinic), clinic);
        }
        this.aparenciaCoverMode = "banner";
        this.atualizarPreviewUrl();
        this.enviandoCover = false;
        this.toast.success("Capa enviada", "A imagem de capa foi atualizada.");
      },
      error: () => {
        this.enviandoCover = false;
        this.toast.error("Erro no upload", "N\xE3o foi poss\xEDvel enviar a imagem.");
      }
    });
  }
  // Helpers para estatísticas
  get diasClicks() {
    const s = this.stats;
    if (!s)
      return [];
    const entries = Object.entries(s.clicks_per_day ?? {});
    if (!entries.length)
      return [];
    entries.sort(([a], [b]) => a.localeCompare(b));
    const counts = entries.map(([, v]) => Number(v) || 0);
    const maxVal = Math.max(...counts);
    const dayLabels = ["Seg", "Ter", "Qua", "Qui", "Sex", "S\xE1b", "Dom"];
    return entries.map(([date, countVal]) => {
      const c = Number(countVal) || 0;
      const d = this.parseStatsDate(date);
      const dow = d.getDay() === 0 ? 7 : d.getDay();
      const label = dayLabels[dow - 1] ?? date;
      const ghost = maxVal === 0;
      const percent = ghost ? 18 : Math.round(c / maxVal * 100);
      return { date, label, count: c, percent, ghost };
    });
  }
  /** Evita deslocar o dia da semana com fuso em strings YYYY-MM-DD. */
  parseStatsDate(date) {
    if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return /* @__PURE__ */ new Date(`${date}T12:00:00`);
    }
    return new Date(date);
  }
  static \u0275fac = function LinkBioComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LinkBioComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LinkBioComponent, selectors: [["app-pagina-link-bio"]], decls: 3, vars: 1, consts: [[1, "relative", "min-h-[320px]"], [3, "rows"], [1, "text-sm", 2, "color", "var(--c-error, #dc2626)"], [1, "zm-content-enter"], [1, "mb-6"], [1, "flex", "flex-wrap", "items-center", "justify-between", "gap-4"], [1, "text-[0.6875rem]", "uppercase", "tracking-wider", "mb-1", 2, "color", "var(--c-muted)"], [1, "text-xl", "font-bold", "leading-tight", 2, "color", "var(--c-text)"], [1, "flex", "flex-wrap", "items-center", "gap-2"], [1, "link-bio-badge", 2, "background", "color-mix(in srgb,var(--c-primary) 15%,transparent)", "color", "var(--c-primary)"], ["target", "_blank", "rel", "noopener", 1, "inline-flex", "items-center", "gap-1.5", "px-3", "py-2", "rounded-lg", "text-sm", "transition-colors", 2, "background", "var(--c-soft)", "color", "var(--c-muted)", "border", "1px solid var(--c-border)", 3, "href"], [1, "material-symbols-outlined", 2, "font-size", "16px"], ["type", "button", 1, "btn-primary", "inline-flex", "items-center", "gap-1.5", "px-3", "py-2", "rounded-lg", "text-sm", 3, "click"], [1, "flex", "flex-wrap", "items-center", "gap-2", "mb-6"], ["type", "text", "readonly", "", "id", "bio-url-input", 1, "form-input", "flex-1", "min-w-0", "max-w-md", "text-sm", "cursor-pointer", 3, "click", "value"], ["type", "button", 1, "px-3", "py-2", "rounded-lg", "text-sm", "transition-colors", "whitespace-nowrap", 2, "background", "var(--c-soft)", "color", "var(--c-muted)", "border", "1px solid var(--c-border)", 3, "click"], ["class", "grid grid-cols-2 md:grid-cols-4 gap-3 mb-6", 4, "ngIf"], [1, "link-bio-config", "grid", "grid-cols-1", "md:grid-cols-[1fr_360px]", "gap-6"], [1, "flex", "flex-wrap", "gap-1", "mb-5", "p-1", "rounded-lg", "w-fit", "max-w-full", 2, "background", "var(--c-surface)", "border", "1px solid var(--c-border)"], ["type", "button", 1, "link-bio-tab", 3, "click"], [1, "material-symbols-outlined"], ["id", "tab-links", "class", "flex flex-col gap-2.5 pb-24", 4, "ngIf"], ["id", "tab-forms", "class", "flex flex-col gap-2.5 pb-24", 4, "ngIf"], ["id", "tab-stats", "class", "pb-24", 4, "ngIf"], ["id", "tab-aparencia", "class", "pb-24", 4, "ngIf"], ["id", "tab-modelos", 1, "flex", "flex-col", "gap-6", "pb-24"], ["id", "tab-conteudo-extra", 1, "flex", "flex-col", "gap-5", "pb-24"], [1, "flex", "flex-col", "items-center", "gap-3", "md:sticky", "md:top-24"], [1, "grid", "grid-cols-2", "md:grid-cols-4", "gap-3", "mb-6"], [1, "link-bio-metric"], [1, "link-bio-metric-label", "mb-1.5"], [1, "link-bio-metric-value", 2, "color", "var(--c-primary)"], [1, "link-bio-metric-value"], [1, "text-[0.6875rem]", "mt-0.5", 2, "color", "var(--c-muted)"], ["id", "tab-links", 1, "flex", "flex-col", "gap-2.5", "pb-24"], [1, "flex", "flex-wrap", "justify-between", "items-center", "gap-2", "mb-1"], [1, "text-xs", 2, "color", "var(--c-muted)"], ["type", "button", "id", "btn-add", 1, "btn-primary", "text-sm", "px-3", "py-1.5", "inline-flex", "items-center", "gap-1.5", 3, "click"], [1, "p-4", "rounded-xl", "mb-2", 2, "background", "var(--c-soft)", "border", "1px solid var(--c-border)"], [1, "flex", "flex-col", "gap-2.5"], [1, "py-10", "text-center", "rounded-xl", 2, "background", "var(--c-soft)", "border", "1px dashed var(--c-border)"], ["aria-hidden", "true", 1, "sticky-footer-spacer"], [1, "sticky-footer"], [2, "font-size", "12px", "color", "var(--c-muted)"], [1, "footer-btns"], ["routerLink", "/dashboard", 1, "btn-secondary"], ["type", "button", 1, "btn-primary", "inline-flex", "items-center", "gap-2", 3, "click", "disabled"], ["aria-hidden", "true", 1, "btn-spinner"], [1, "text-sm", "font-semibold", "mb-3", 2, "color", "var(--c-text)"], [1, "grid", "grid-cols-1", "md:grid-cols-3", "gap-3", "mb-3"], [1, "form-label"], ["type", "text", "name", "novoLabel", "placeholder", "Ex: WhatsApp, Instagram\u2026", "maxlength", "80", 1, "form-input", 3, "ngModelChange", "ngModel"], ["type", "url", "name", "novoUrl", "placeholder", "https://\u2026", "maxlength", "500", 1, "form-input", 3, "ngModelChange", "ngModel"], ["name", "novoIcon", 1, "form-select", 3, "ngModelChange", "ngModel"], [3, "value"], [1, "flex", "gap-2"], ["type", "button", 1, "btn-primary", "text-sm", "inline-flex", "items-center", "gap-2", 3, "click", "disabled"], ["type", "button", 1, "text-sm", "px-3", "py-1.5", "rounded", 2, "color", "var(--c-muted)", 3, "click"], [1, "link-bio-link-row", "flex-wrap"], [1, "material-symbols-outlined", "shrink-0", "w-9", "h-9", "rounded-lg", "flex", "items-center", "justify-center", 2, "font-size", "18px", "background", "color-mix(in srgb,var(--c-primary) 12%,transparent)", "color", "var(--c-primary)"], [1, "flex-1", "min-w-0"], [1, "flex-1", "min-w-0", 3, "ngSubmit"], [1, "grid", "grid-cols-1", "md:grid-cols-3", "gap-2", "mb-2"], ["type", "text", "name", "label", "required", "", "maxlength", "80", "placeholder", "T\xEDtulo", 1, "form-input", "text-sm", 3, "ngModelChange", "ngModel"], ["type", "url", "name", "url", "required", "", "maxlength", "500", "placeholder", "URL", 1, "form-input", "text-sm", 3, "ngModelChange", "ngModel"], ["name", "icon", 1, "form-select", "text-sm", 3, "ngModelChange", "ngModel"], ["type", "submit", 1, "btn-primary", "text-xs", "px-2", "py-1", "inline-flex", "items-center", "gap-1.5", 3, "disabled"], ["aria-hidden", "true", 1, "btn-spinner", 2, "width", "12px", "height", "12px", "border-width", "2px"], ["type", "button", 1, "text-xs", "px-2", "py-1", "rounded", 2, "color", "var(--c-muted)", 3, "click"], [1, "flex-1", "min-w-0", "view-mode"], [1, "text-sm", "font-semibold", "truncate", 2, "color", "var(--c-text)"], [1, "text-xs", "truncate", "mt-0.5", 2, "color", "var(--c-muted)"], [1, "flex", "items-center", "gap-2", "shrink-0", "actions-mode"], [1, "text-xs", 2, "color", "var(--c-primary)"], ["type", "button", 1, "px-2.5", "py-1", "rounded-lg", "text-xs", "transition-colors", 2, "background", "var(--c-soft)", "color", "var(--c-muted)", "border", "1px solid var(--c-border)", 3, "click"], ["target", "_blank", "rel", "noopener", "aria-label", "Abrir link", "title", "Abrir link", 1, "p-1.5", "rounded-lg", 2, "color", "var(--c-muted)", 3, "href"], [1, "material-symbols-outlined", 2, "font-size", "17px"], ["type", "button", "aria-label", "Remover link", "title", "Remover link", 1, "p-1.5", "rounded-lg", "inline-flex", "items-center", "justify-center", 2, "color", "var(--c-muted)", 3, "click", "disabled"], [1, "btn-spinner", 2, "width", "14px", "height", "14px", "border-width", "2px"], [1, "material-symbols-outlined", "block", "mb-2", 2, "font-size", "40px", "color", "var(--c-muted)"], [1, "text-sm", "font-medium", 2, "color", "var(--c-text)"], [1, "text-xs", "mt-1", 2, "color", "var(--c-muted)"], ["id", "tab-forms", 1, "flex", "flex-col", "gap-2.5", "pb-24"], [1, "py-8", "text-center", "rounded-xl", 2, "background", "var(--c-soft)", "border", "1px dashed var(--c-border)"], ["routerLink", "/templates", 1, "btn-primary", "inline-flex", "items-center", "gap-2"], [1, "link-bio-form-row"], [1, "w-2", "h-2", "rounded-full", "shrink-0", 2, "background", "var(--c-primary)"], [1, "text-sm", "font-semibold", 2, "color", "var(--c-text)"], [1, "text-xs", "mt-0.5", 2, "color", "var(--c-muted)"], [1, "flex", "gap-2", "shrink-0"], ["type", "button", 1, "px-2.5", "py-1", "rounded-lg", "text-xs", "transition-colors", 2, "background", "var(--c-soft)", "color", "var(--c-primary)", "border", "1px solid var(--c-border)", 3, "click"], [1, "material-symbols-outlined", "block", "mb-2", 2, "font-size", "32px", "color", "var(--c-muted)"], [1, "text-sm", 2, "color", "var(--c-text)"], ["id", "tab-stats", 1, "pb-24"], [1, "card", "p-5"], [1, "flex", "flex-wrap", "justify-between", "items-center", "gap-2", "mb-5"], [1, "text-sm", "font-bold", 2, "color", "var(--c-text)"], [1, "text-xs", "py-6", "text-center", 2, "color", "var(--c-muted)"], [1, "text-[11px]", "mb-2", 2, "color", "var(--c-muted)"], [1, "link-bio-chart-row"], [1, "link-bio-bar-wrap"], [1, "link-bio-bar-stack"], [1, "link-bio-bar"], [1, "link-bio-bar-label"], ["id", "tab-aparencia", 1, "pb-24"], [1, "flex", "flex-col", "gap-5", 3, "ngSubmit"], [1, "text-xs", "font-bold", "uppercase", "tracking-wider", "mb-4", 2, "color", "var(--c-muted)"], [2, "display", "grid", "grid-template-columns", "repeat(auto-fill,minmax(88px,1fr))", "gap", "8px"], ["type", "button", 1, "theme-card", 2, "border", "2px solid var(--c-border)", "border-radius", "10px", "padding", "10px", "cursor", "pointer", "position", "relative", "background", "var(--c-surface)", 3, "click"], [2, "height", "28px", "border-radius", "5px", "margin-bottom", "7px", "background", "#f0ede8", "display", "flex", "gap", "2px", "align-items", "flex-end", "padding", "4px"], [2, "background", "#1a1a2e", "border-radius", "2px", "width", "5px", "height", "10px"], [2, "background", "#1a1a2e", "border-radius", "2px", "width", "5px", "height", "16px"], [2, "background", "#1a1a2e", "border-radius", "2px", "width", "5px", "height", "22px"], [2, "width", "20px", "height", "20px", "border-radius", "50%", "background", "#1a1a2e", "margin-bottom", "5px"], [2, "font-size", "10.5px", "font-weight", "500", "color", "var(--c-text)"], ["type", "button", 1, "theme-card", 2, "border", "2px solid var(--c-border)", "border-radius", "10px", "padding", "10px", "cursor", "pointer", "position", "relative", "background", "var(--c-surface)", 3, "selected"], [1, "text-[11px]", "mt-3", 2, "color", "var(--c-muted)"], [1, "cover-mode-grid"], ["type", "button", 1, "cover-mode-btn", 3, "click"], [1, "mt-4"], [1, "flex", "flex-col", "gap-4"], ["type", "text", "name", "short_description", "placeholder", "Ex: Cuidando da sua sa\xFAde com excel\xEAncia", "maxlength", "200", 1, "form-input", 3, "ngModelChange", "ngModel"], ["type", "text", "name", "specialties", "placeholder", "Cl\xEDnica geral, Pediatria, Dermatologia (v\xEDrgula para separar)", 1, "form-input", 3, "ngModelChange", "ngModel"], [1, "grid", "grid-cols-1", "md:grid-cols-2", "gap-4"], ["type", "number", "name", "founded_year", "placeholder", "2010", "min", "1900", 1, "form-input", 3, "ngModelChange", "ngModel"], ["type", "email", "name", "contact_email", "placeholder", "contato@empresa.com", 1, "form-input", 3, "ngModelChange", "ngModel"], ["type", "url", "name", "maps_url", "placeholder", "https://maps.google.com/...", 1, "form-input", 3, "ngModelChange", "ngModel"], [1, "flex", "justify-end", "gap-2"], ["type", "submit", 1, "btn-primary", "px-5", "py-2", "text-sm", "inline-flex", "items-center", "gap-2", 3, "disabled"], [2, "height", "28px", "border-radius", "5px", "margin-bottom", "7px", "display", "flex", "gap", "2px", "align-items", "flex-end", "padding", "4px"], [2, "border-radius", "2px", "width", "5px", "height", "10px"], [2, "border-radius", "2px", "width", "5px", "height", "16px"], [2, "border-radius", "2px", "width", "5px", "height", "22px"], [2, "width", "20px", "height", "20px", "border-radius", "50%", "margin-bottom", "5px"], ["type", "color", "name", "cover_color", 1, "cover-color-input", 3, "ngModelChange", "ngModel"], ["type", "file", "accept", "image/*", 1, "form-input", 3, "change", "disabled"], [1, "text-[11px]", "mt-2", "inline-flex", "items-center", "gap-2", 2, "color", "var(--c-muted)"], [1, "btn-spinner", 2, "width", "12px", "height", "12px", "border-width", "2px"], [1, "text-[11px]", "mb-3", "leading-relaxed", 2, "color", "var(--c-muted)"], [1, "grid", "grid-cols-1", "md:grid-cols-2", "gap-3"], [1, "inline-flex", "items-center", "gap-2", "text-sm", 2, "color", "var(--c-text)"], ["type", "radio", "name", "modelos_modelo", 3, "ngModelChange", "value", "ngModel"], [1, "inline-flex", "items-center", "gap-2", "text-sm", "md:col-span-2", 2, "color", "var(--c-text)"], ["type", "submit", 1, "btn-primary", "inline-flex", "items-center", "gap-2", 3, "disabled"], [1, "text-[0.6875rem]", "uppercase", "tracking-wider", "mb-3", 2, "color", "var(--c-muted)"], [1, "grid", "grid-cols-1", "sm:grid-cols-2", "md:grid-cols-3", "gap-6", "justify-items-center"], [1, "flex", "flex-col", "items-center", "gap-2", "w-full", "max-w-[300px]"], [1, "text-xs", "font-semibold", "text-center", "leading-snug", 2, "color", "var(--c-text)"], [1, "link-bio-phone", "link-bio-phone--mini", "w-full"], ["loading", "lazy", 1, "link-bio-phone-screen", "w-full", "h-full", "border-0", 3, "src", "title"], [1, "link-bio-phone-screen", "w-full", "h-full", "min-h-[200px]", "flex", "items-center", "justify-center", "text-xs", 2, "background", "var(--c-soft)", "color", "var(--c-muted)"], [1, "text-xs", "leading-relaxed", 2, "color", "var(--c-muted)"], [1, "text-xs", "font-bold", "uppercase", "tracking-wider", "mb-1", 2, "color", "var(--c-muted)"], [1, "text-[11px]", "mb-4", 2, "color", "var(--c-muted)"], ["type", "text", "name", "extra_hero_tagline", "maxlength", "300", "placeholder", "Ex.: Psicologia cl\xEDnica e organizacional", 1, "form-input", 3, "ngModelChange", "ngModel"], ["type", "text", "name", "extra_council", "maxlength", "120", "placeholder", "Ex.: CRO-SP 12345", 1, "form-input", 3, "ngModelChange", "ngModel"], ["type", "text", "name", "extra_brand_sub", "maxlength", "200", "placeholder", "Ex.: Est\xE9tica avan\xE7ada \xB7 Desde 2015", 1, "form-input", 3, "ngModelChange", "ngModel"], ["type", "url", "name", "extra_ig", "maxlength", "500", "placeholder", "https://instagram.com/sua_clinica", 1, "form-input", 3, "ngModelChange", "ngModel"], [1, "flex", "flex-wrap", "items-center", "justify-between", "gap-2", "mb-4"], [1, "text-xs", "font-bold", "uppercase", "tracking-wider", 2, "color", "var(--c-muted)"], [1, "text-[11px]", "mt-1", 2, "color", "var(--c-muted)"], ["type", "button", 1, "text-sm", "px-3", "py-1.5", "rounded-lg", "inline-flex", "items-center", "gap-1", 2, "background", "var(--c-soft)", "color", "var(--c-primary)", "border", "1px solid var(--c-border)", 3, "click"], [1, "flex", "flex-col", "gap-2"], [1, "flex", "gap-2", "items-center"], [1, "text-xs", "py-2", 2, "color", "var(--c-muted)"], [1, "p-4", "rounded-xl", "flex", "flex-col", "gap-3", 2, "background", "var(--c-soft)", "border", "1px solid var(--c-border)"], ["type", "text", "maxlength", "120", "placeholder", "Ex.: Unimed", 1, "form-input", "flex-1", "text-sm", 3, "ngModelChange", "ngModel", "name"], ["type", "button", "title", "Remover linha", "aria-label", "Remover conv\xEAnio", 1, "p-2", "rounded-lg", "shrink-0", 2, "color", "var(--c-muted)", "border", "1px solid var(--c-border)", 3, "click"], [1, "material-symbols-outlined", 2, "font-size", "18px"], [1, "flex", "justify-between", "items-start", "gap-2"], [1, "text-xs", "font-semibold", 2, "color", "var(--c-text)"], ["type", "text", "maxlength", "80", "placeholder", "Ex.: Online", 1, "form-input", "text-sm", 3, "ngModelChange", "ngModel", "name"], ["type", "text", "maxlength", "120", "placeholder", "Ex.: Atendimento remoto", 1, "form-input", "text-sm", 3, "ngModelChange", "ngModel", "name"], [1, "inline-flex", "items-center", "gap-2", "text-sm", "cursor-pointer", 2, "color", "var(--c-text)"], ["type", "checkbox", 3, "ngModelChange", "ngModel", "name"], [1, "md:col-span-2"], ["type", "text", "maxlength", "120", "placeholder", "Dra. Maria Silva", 1, "form-input", "text-sm", 3, "ngModelChange", "ngModel", "name"], ["type", "text", "maxlength", "80", "placeholder", "CRP 06/12345", 1, "form-input", "text-sm", 3, "ngModelChange", "ngModel", "name"], ["type", "text", "maxlength", "120", "placeholder", "Ex.: Atende online", 1, "form-input", "text-sm", 3, "ngModelChange", "ngModel", "name"], ["type", "text", "maxlength", "20", "placeholder", "5511999999999", 1, "form-input", "text-sm", 3, "ngModelChange", "ngModel", "name"], [1, "text-[0.6875rem]", "uppercase", "tracking-wider", 2, "color", "var(--c-muted)"], [1, "link-bio-phone", "w-full", "max-w-[320px]", "md:max-w-none"], ["title", "Preview Link Bio", "loading", "lazy", 1, "link-bio-phone-screen", "w-full", "h-full", "border-0", 3, "src"], [1, "link-bio-phone-screen", "w-full", "h-full", "min-h-[400px]", "flex", "flex-col", "items-center", "justify-center", "rounded-xl", "text-sm", 2, "background", "var(--c-soft)", "color", "var(--c-muted)", "border", "1px dashed var(--c-border)"], [1, "material-symbols-outlined", "mb-2", 2, "font-size", "32px"]], template: function LinkBioComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275conditionalCreate(1, LinkBioComponent_Conditional_1_Template, 1, 1, "zm-skeleton-list", 1)(2, LinkBioComponent_Conditional_2_Template, 2, 2);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showSkeleton() ? 1 : 2);
    }
  }, dependencies: [CommonModule, NgIf, FormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, CheckboxControlValueAccessor, SelectControlValueAccessor, RadioControlValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, MaxLengthValidator, MinValidator, NgModel, NgForm, RouterLink, ZmSkeletonListComponent, KeyValuePipe], styles: ["\n\n.link-bio-metric[_ngcontent-%COMP%] {\n  background: var(--c-surface);\n  border: 1px solid var(--c-border);\n  border-radius: 0.625rem;\n  padding: 0.875rem 1rem;\n  flex: 1;\n}\n.link-bio-metric-value[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  font-weight: 700;\n}\n.link-bio-metric-label[_ngcontent-%COMP%] {\n  font-size: 0.6875rem;\n  color: var(--c-muted);\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n.link-bio-tab[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.375rem;\n  padding: 0.375rem 0.875rem;\n  border-radius: 0.375rem;\n  font-size: 0.8125rem;\n  font-weight: 500;\n  cursor: pointer;\n  color: var(--c-muted);\n  transition: all 0.15s;\n  border: none;\n  background: transparent;\n}\n.link-bio-tab.active[_ngcontent-%COMP%] {\n  background: var(--c-primary);\n  color: #fff;\n}\n.link-bio-tab[_ngcontent-%COMP%]:not(.active):hover {\n  color: var(--c-text);\n}\n.link-bio-tab[_ngcontent-%COMP%]   .material-symbols-outlined[_ngcontent-%COMP%] {\n  font-size: 1.125rem;\n}\n.link-bio-link-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  padding: 0.75rem 0.875rem;\n  background: var(--c-surface);\n  border: 1px solid var(--c-border);\n  border-radius: 0.625rem;\n  transition: border-color 0.15s;\n}\n.link-bio-link-row[_ngcontent-%COMP%]:hover {\n  border-color: var(--c-primary);\n}\n.link-bio-form-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  padding: 0.625rem 0.875rem;\n  background: var(--c-surface);\n  border: 1px solid var(--c-border);\n  border-radius: 0.625rem;\n  transition: border-color 0.15s;\n}\n.link-bio-form-row[_ngcontent-%COMP%]:hover {\n  border-color: var(--c-border);\n}\n.link-bio-phone[_ngcontent-%COMP%] {\n  width: 320px;\n  height: 600px;\n  border-radius: 1.5rem;\n  border: 2px solid var(--c-border);\n  background: var(--c-bg);\n  overflow: hidden;\n  flex-shrink: 0;\n  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.15);\n}\n.link-bio-phone--mini[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 300px;\n  height: 360px;\n  border-radius: 1.125rem;\n  border-width: 2px;\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);\n}\n.link-bio-phone-screen[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  overflow-y: auto;\n  scrollbar-width: none;\n  display: block;\n}\n.link-bio-phone-screen[_ngcontent-%COMP%]::-webkit-scrollbar {\n  display: none;\n}\n.link-bio-chart-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: stretch;\n  gap: 0.5rem;\n  height: 5.5rem;\n}\n.link-bio-bar-wrap[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: stretch;\n  gap: 4px;\n  flex: 1;\n  min-width: 0;\n  height: 100%;\n}\n.link-bio-bar-stack[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-end;\n  min-height: 0;\n  width: 100%;\n}\n.link-bio-bar[_ngcontent-%COMP%] {\n  background: var(--c-primary);\n  border-radius: 3px 3px 0 0;\n  width: 100%;\n  min-height: 2px;\n  transition: height 0.3s;\n}\n.link-bio-bar--ghost[_ngcontent-%COMP%] {\n  background: color-mix(in srgb, var(--c-primary) 28%, var(--c-border));\n  opacity: 0.85;\n}\n.link-bio-bar-label[_ngcontent-%COMP%] {\n  font-size: 0.5625rem;\n  color: var(--c-muted);\n  text-align: center;\n  flex-shrink: 0;\n}\n.link-bio-badge[_ngcontent-%COMP%] {\n  font-size: 0.6875rem;\n  font-weight: 600;\n  letter-spacing: 0.04em;\n  padding: 2px 8px;\n  border-radius: 99px;\n  text-transform: uppercase;\n}\n.theme-card[_ngcontent-%COMP%] {\n  transition:\n    transform 0.12s ease,\n    border-color 0.12s ease,\n    box-shadow 0.12s ease;\n}\n.theme-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-1px);\n  border-color: color-mix(in srgb, var(--c-primary) 45%, var(--c-border));\n}\n.theme-card[_ngcontent-%COMP%]:active {\n  transform: scale(0.98);\n}\n.theme-card.selected[_ngcontent-%COMP%] {\n  border-color: var(--c-primary) !important;\n  box-shadow: 0 0 0 2px color-mix(in srgb, var(--c-primary) 25%, transparent);\n}\n.cover-mode-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: 0.5rem;\n}\n.cover-mode-btn[_ngcontent-%COMP%] {\n  border: 1px solid var(--c-border);\n  background: var(--c-surface);\n  color: var(--c-muted);\n  border-radius: 0.625rem;\n  padding: 0.625rem 0.75rem;\n  font-size: 0.8125rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.12s ease;\n}\n.cover-mode-btn[_ngcontent-%COMP%]:hover {\n  border-color: color-mix(in srgb, var(--c-primary) 45%, var(--c-border));\n}\n.cover-mode-btn.selected[_ngcontent-%COMP%] {\n  border-color: var(--c-primary);\n  color: var(--c-primary);\n  box-shadow: 0 0 0 2px color-mix(in srgb, var(--c-primary) 20%, transparent);\n}\n.cover-color-input[_ngcontent-%COMP%] {\n  width: 56px;\n  height: 40px;\n  border: 1px solid var(--c-border);\n  border-radius: 0.5rem;\n  background: var(--c-surface);\n  padding: 0.25rem;\n}\n/*# sourceMappingURL=link-bio.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LinkBioComponent, [{
    type: Component,
    args: [{ selector: "app-pagina-link-bio", standalone: true, imports: [CommonModule, FormsModule, RouterLink, ZmSkeletonListComponent], template: `<div class="relative min-h-[320px]">
  @if (showSkeleton()) {
    <zm-skeleton-list [rows]="8" />
  } @else {
    @if (erro) {
      <p class="text-sm" style="color: var(--c-error, #dc2626)">{{ erro }}</p>
    }
    @if (state) {
    <div class="zm-content-enter">
    <!-- Header -->
    <div class="mb-6">
      <div class="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p class="text-[0.6875rem] uppercase tracking-wider mb-1" style="color:var(--c-muted)">Link Bio</p>
          <h1 class="text-xl font-bold leading-tight" style="color:var(--c-text)">{{ state.clinic.name }}</h1>
        </div>
        <div class="flex flex-wrap items-center gap-2">
          <span class="link-bio-badge" style="background:color-mix(in srgb,var(--c-primary) 15%,transparent);color:var(--c-primary)">\u25CF Publicado</span>
          <a [href]="publicUrl" target="_blank" rel="noopener" class="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm transition-colors" style="background:var(--c-soft);color:var(--c-muted);border:1px solid var(--c-border)">
            <span class="material-symbols-outlined" style="font-size:16px">open_in_new</span>
            Ver p\xE1gina
          </a>
          <button type="button" class="btn-primary inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm" (click)="copiarLinkPrincipal()">
            <span class="material-symbols-outlined" style="font-size:16px">content_copy</span>
            Copiar link
          </button>
        </div>
      </div>
    </div>

    <!-- Barra do link -->
    <div class="flex flex-wrap items-center gap-2 mb-6">
      <input type="text" readonly [value]="publicUrl" id="bio-url-input" class="form-input flex-1 min-w-0 max-w-md text-sm cursor-pointer" (click)="$any($event.target).select()" />
      <button type="button" class="px-3 py-2 rounded-lg text-sm transition-colors whitespace-nowrap" style="background:var(--c-soft);color:var(--c-muted);border:1px solid var(--c-border)" (click)="copiarLinkPrincipal()">
        Copiar
      </button>
    </div>

    <!-- M\xE9tricas -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6" *ngIf="metrics">
      <div class="link-bio-metric">
        <div class="link-bio-metric-label mb-1.5">Visitas hoje</div>
        <div class="link-bio-metric-value" style="color:var(--c-primary)">{{ metrics!.visitas_hoje }}</div>
      </div>
      <div class="link-bio-metric">
        <div class="link-bio-metric-label mb-1.5">Cliques totais</div>
        <div class="link-bio-metric-value">{{ metrics!.total_clicks_last_30 }}</div>
        <div class="text-[0.6875rem] mt-0.5" style="color:var(--c-muted)">\xFAltimos 30 dias</div>
      </div>
      <div class="link-bio-metric">
        <div class="link-bio-metric-label mb-1.5">Taxa de clique</div>
        <div class="link-bio-metric-value" style="color:var(--c-primary)">{{ metrics!.taxa_clique }}%</div>
        <div class="text-[0.6875rem] mt-0.5" style="color:var(--c-muted)">CTR</div>
      </div>
      <div class="link-bio-metric">
        <div class="link-bio-metric-label mb-1.5">Formul\xE1rios</div>
        <div class="link-bio-metric-value">{{ metrics!.formularios_total }}</div>
        <div class="text-[0.6875rem] mt-0.5" style="color:var(--c-muted)">{{ metrics!.formularios_ativos }} ativos, {{ metrics!.formularios_draft }} rascunho</div>
      </div>
    </div>

    <!-- Conte\xFAdo principal -->
    <div class="link-bio-config grid grid-cols-1 md:grid-cols-[1fr_360px] gap-6">
      <div [class.md:col-span-2]="abaAtiva === 'modelos' || abaAtiva === 'conteudoExtra'">
        <!-- Tabs -->
        <div class="flex flex-wrap gap-1 mb-5 p-1 rounded-lg w-fit max-w-full" style="background:var(--c-surface);border:1px solid var(--c-border)">
          <button type="button" class="link-bio-tab" [class.active]="abaAtiva === 'modelos'" (click)="ativarAba('modelos')">
            <span class="material-symbols-outlined">dashboard</span> Modelos
          </button>
          <button type="button" class="link-bio-tab" [class.active]="abaAtiva === 'conteudoExtra'" (click)="ativarAba('conteudoExtra')">
            <span class="material-symbols-outlined">tune</span> Conte\xFAdo extra
          </button>
          <button type="button" class="link-bio-tab" [class.active]="abaAtiva === 'links'" (click)="ativarAba('links')">
            <span class="material-symbols-outlined">link</span> Links
          </button>
          <button type="button" class="link-bio-tab" [class.active]="abaAtiva === 'forms'" (click)="ativarAba('forms')">
            <span class="material-symbols-outlined">description</span> Formul\xE1rios
          </button>
          <button type="button" class="link-bio-tab" [class.active]="abaAtiva === 'stats'" (click)="ativarAba('stats')">
            <span class="material-symbols-outlined">bar_chart</span> Estat\xEDsticas
          </button>
          <button type="button" class="link-bio-tab" [class.active]="abaAtiva === 'aparencia'" (click)="ativarAba('aparencia')">
            <span class="material-symbols-outlined">palette</span> Apar\xEAncia
          </button>
        </div>

        <!-- Aba Links -->
        <div id="tab-links" class="flex flex-col gap-2.5 pb-24" *ngIf="abaAtiva === 'links'">
          <div class="flex flex-wrap justify-between items-center gap-2 mb-1">
            <p class="text-xs" style="color:var(--c-muted)">Links exibidos na sua p\xE1gina</p>
            <button type="button" id="btn-add" class="btn-primary text-sm px-3 py-1.5 inline-flex items-center gap-1.5" (click)="toggleFormNovo()">
              <span class="material-symbols-outlined" style="font-size:16px">{{ mostrarFormNovo ? 'close' : 'add' }}</span>
              {{ mostrarFormNovo ? 'Cancelar' : 'Adicionar link' }}
            </button>
          </div>

          @if (mostrarFormNovo) {
            <div class="p-4 rounded-xl mb-2" style="background:var(--c-soft);border:1px solid var(--c-border)">
              <p class="text-sm font-semibold mb-3" style="color:var(--c-text)">Novo link</p>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                <div>
                  <label class="form-label">T\xEDtulo</label>
                  <input type="text" class="form-input" [(ngModel)]="novoLabel" name="novoLabel" placeholder="Ex: WhatsApp, Instagram\u2026" maxlength="80" />
                </div>
                <div>
                  <label class="form-label">URL</label>
                  <input type="url" class="form-input" [(ngModel)]="novoUrl" name="novoUrl" placeholder="https://\u2026" maxlength="500" />
                </div>
                <div>
                  <label class="form-label">\xCDcone</label>
                  <select class="form-select" [(ngModel)]="novoIcon" name="novoIcon">
                    @for (iconKey of (availableIcons | keyvalue); track iconKey.key) {
                      <option [value]="iconKey.key">{{ iconKey.value }}</option>
                    }
                  </select>
                </div>
              </div>
              <div class="flex gap-2">
                <button type="button" class="btn-primary text-sm inline-flex items-center gap-2" [disabled]="salvandoNovoLink" (click)="salvarNovoLink()">
                  @if (salvandoNovoLink) {
                    <span class="btn-spinner" aria-hidden="true"></span>
                  }
                  {{ salvandoNovoLink ? 'Salvando\u2026' : 'Salvar' }}
                </button>
                <button type="button" class="text-sm px-3 py-1.5 rounded" style="color:var(--c-muted)" (click)="toggleFormNovo()">Cancelar</button>
              </div>
            </div>
          }

          @if (links.length > 0) {
            <ul class="flex flex-col gap-2.5">
              @for (lnk of links; track lnk.id) {
                <li class="link-bio-link-row flex-wrap">
                  <span class="material-symbols-outlined shrink-0 w-9 h-9 rounded-lg flex items-center justify-center" style="font-size:18px;background:color-mix(in srgb,var(--c-primary) 12%,transparent);color:var(--c-primary)">{{ lnk.icon ?? 'link' }}</span>

                  @if (editandoId === lnk.id) {
                    <form class="flex-1 min-w-0" (ngSubmit)="salvarEdicao(lnk)">
                      <div class="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2">
                        <input type="text" name="label" required maxlength="80" [(ngModel)]="editLabel" class="form-input text-sm" placeholder="T\xEDtulo" />
                        <input type="url" name="url" required maxlength="500" [(ngModel)]="editUrl" class="form-input text-sm" placeholder="URL" />
                        <select name="icon" class="form-select text-sm" [(ngModel)]="editIcon">
                          @for (iconKey of (availableIcons | keyvalue); track iconKey.key) {
                            <option [value]="iconKey.key">{{ iconKey.value }}</option>
                          }
                        </select>
                      </div>
                      <div class="flex gap-2">
                        <button type="submit" class="btn-primary text-xs px-2 py-1 inline-flex items-center gap-1.5" [disabled]="salvandoEdicaoId === lnk.id">
                          @if (salvandoEdicaoId === lnk.id) {
                            <span class="btn-spinner" style="width:12px;height:12px;border-width:2px" aria-hidden="true"></span>
                          }
                          {{ salvandoEdicaoId === lnk.id ? 'Salvando\u2026' : 'Salvar' }}
                        </button>
                        <button type="button" class="text-xs px-2 py-1 rounded" style="color:var(--c-muted)" (click)="cancelarEdicao()">Cancelar</button>
                      </div>
                    </form>
                  } @else {
                    <div class="flex-1 min-w-0 view-mode">
                      <div class="text-sm font-semibold truncate" style="color:var(--c-text)">{{ lnk.label }}</div>
                      <div class="text-xs truncate mt-0.5" style="color:var(--c-muted)">{{ lnk.url }}</div>
                    </div>
                    <div class="flex items-center gap-2 shrink-0 actions-mode">
                      <span class="text-xs" style="color:var(--c-primary)">{{ lnk.total_clicks ?? 0 }} cliques</span>
                      <button type="button" class="px-2.5 py-1 rounded-lg text-xs transition-colors" style="background:var(--c-soft);color:var(--c-muted);border:1px solid var(--c-border)" (click)="iniciarEdicao(lnk)">Editar</button>
                      <a [href]="lnk.url" target="_blank" rel="noopener" class="p-1.5 rounded-lg" style="color:var(--c-muted)" aria-label="Abrir link" title="Abrir link">
                        <span class="material-symbols-outlined" style="font-size:17px">open_in_new</span>
                      </a>
                      <button type="button" class="p-1.5 rounded-lg inline-flex items-center justify-center" style="color:var(--c-muted)" aria-label="Remover link" [disabled]="excluindoLinkId === lnk.id" (click)="excluirLink(lnk)" title="Remover link">
                        @if (excluindoLinkId === lnk.id) {
                          <span class="btn-spinner" style="width:14px;height:14px;border-width:2px"></span>
                        } @else {
                          <span class="material-symbols-outlined" style="font-size:17px">delete</span>
                        }
                      </button>
                    </div>
                  }
                </li>
              }
            </ul>
          } @else {
            <div class="py-10 text-center rounded-xl" style="background:var(--c-soft);border:1px dashed var(--c-border)">
              <span class="material-symbols-outlined block mb-2" style="font-size:40px;color:var(--c-muted)">add_link</span>
              <p class="text-sm font-medium" style="color:var(--c-text)">Nenhum link cadastrado</p>
              <p class="text-xs mt-1" style="color:var(--c-muted)">Clique em \\"Adicionar link\\" para come\xE7ar.</p>
            </div>
          }

          <div class="sticky-footer-spacer" aria-hidden="true"></div>
          <div class="sticky-footer">
            @if (mostrarFormNovo || editandoId !== null) {
              <div style="font-size:12px;color:var(--c-muted)">Altera\xE7\xF5es n\xE3o salvas</div>
            } @else {
              <div style="font-size:12px;color:var(--c-muted)">Adicione ou edite um link acima para salvar aqui</div>
            }
            <div class="footer-btns">
              <a routerLink="/dashboard" class="btn-secondary">
                <span class="material-symbols-outlined" style="font-size:16px">close</span>
                Cancelar
              </a>
              <button
                type="button"
                class="btn-primary inline-flex items-center gap-2"
                [disabled]="linkBioFooterLinksSaveDisabled"
                (click)="salvarFooterAbaLinks()"
              >
                @if (salvandoNovoLink || salvandoEdicaoId !== null) {
                  <span class="btn-spinner" aria-hidden="true"></span>
                } @else {
                  <span class="material-symbols-outlined" style="font-size:16px">save</span>
                }
                {{ salvandoNovoLink || salvandoEdicaoId !== null ? 'Salvando\u2026' : 'Salvar configura\xE7\xF5es' }}
              </button>
            </div>
          </div>
        </div>

        <!-- Aba Formul\xE1rios -->
        <div id="tab-forms" class="flex flex-col gap-2.5 pb-24" *ngIf="abaAtiva === 'forms'">
          <div class="flex flex-wrap justify-between items-center gap-2 mb-1">
            <p class="text-xs" style="color:var(--c-muted)">Formul\xE1rios vinculados \xE0 p\xE1gina</p>
          </div>
          @if (forms.length > 0) {
            @for (t of forms; track t.id) {
              <div class="link-bio-form-row">
                <div class="w-2 h-2 rounded-full shrink-0" style="background:var(--c-primary)"></div>
                <div class="flex-1 min-w-0">
                  <div class="text-sm font-semibold" style="color:var(--c-text)">{{ t.name }}</div>
                  <div class="text-xs mt-0.5" style="color:var(--c-muted)">Respostas: {{ t.submission_count }}</div>
                </div>
                <div class="flex gap-2 shrink-0">
                  <button type="button" class="px-2.5 py-1 rounded-lg text-xs transition-colors" style="background:var(--c-soft);color:var(--c-primary);border:1px solid var(--c-border)" (click)="copiarLinkForm(t)">Copiar link</button>
                </div>
              </div>
            }
          } @else {
            <div class="py-8 text-center rounded-xl" style="background:var(--c-soft);border:1px dashed var(--c-border)">
              <span class="material-symbols-outlined block mb-2" style="font-size:32px;color:var(--c-muted)">link_off</span>
              <p class="text-sm" style="color:var(--c-text)">Nenhum formul\xE1rio com link p\xFAblico</p>
            </div>
          }

          <div class="sticky-footer-spacer" aria-hidden="true"></div>
          <div class="sticky-footer">
            <div style="font-size:12px;color:var(--c-muted)">Formul\xE1rios s\xE3o criados e publicados em Templates</div>
            <div class="footer-btns">
              <a routerLink="/dashboard" class="btn-secondary">
                <span class="material-symbols-outlined" style="font-size:16px">close</span>
                Cancelar
              </a>
              <a routerLink="/templates" class="btn-primary inline-flex items-center gap-2">
                <span class="material-symbols-outlined" style="font-size:16px">description</span>
                Gerenciar templates
              </a>
            </div>
          </div>
        </div>

        <!-- Aba Estat\xEDsticas -->
        <div id="tab-stats" class="pb-24" *ngIf="abaAtiva === 'stats' && stats">
          <div class="card p-5">
            <div class="flex flex-wrap justify-between items-center gap-2 mb-5">
              <h3 class="text-sm font-bold" style="color:var(--c-text)">Cliques por dia (\xFAltimos 7 dias)</h3>
              <span class="text-xs" style="color:var(--c-muted)">Total: {{ metrics?.total_clicks }}</span>
            </div>
            @if (diasClicks.length === 0) {
              <p class="text-xs py-6 text-center" style="color:var(--c-muted)">Nenhum dado de cliques por dia neste per\xEDodo.</p>
            } @else {
              @if (diasClicks[0]?.ghost) {
                <p class="text-[11px] mb-2" style="color:var(--c-muted)">
                  Nenhum clique nos \xFAltimos dias \u2014 barras apenas para refer\xEAncia visual.
                </p>
              }
              <div class="link-bio-chart-row">
                @for (d of diasClicks; track d.date) {
                  <div class="link-bio-bar-wrap">
                    <div class="link-bio-bar-stack">
                      <div
                        class="link-bio-bar"
                        [class.link-bio-bar--ghost]="d.ghost"
                        [style.height.%]="d.percent"
                      ></div>
                    </div>
                    <div class="link-bio-bar-label">{{ d.label }}</div>
                  </div>
                }
              </div>
            }
          </div>

          <div class="sticky-footer-spacer" aria-hidden="true"></div>
          <div class="sticky-footer">
            <div style="font-size:12px;color:var(--c-muted)">Dados de visitas e cliques</div>
            <div class="footer-btns">
              <a routerLink="/dashboard" class="btn-secondary">
                <span class="material-symbols-outlined" style="font-size:16px">close</span>
                Cancelar
              </a>
              <button
                type="button"
                class="btn-primary inline-flex items-center gap-2"
                [disabled]="atualizandoStatsRodape"
                (click)="atualizarDadosEstatisticas()"
              >
                @if (atualizandoStatsRodape) {
                  <span class="btn-spinner" aria-hidden="true"></span>
                } @else {
                  <span class="material-symbols-outlined" style="font-size:16px">refresh</span>
                }
                {{ atualizandoStatsRodape ? 'Atualizando\u2026' : 'Atualizar dados' }}
              </button>
            </div>
          </div>
        </div>

        <!-- Aba Apar\xEAncia -->
        <div id="tab-aparencia" class="pb-24" *ngIf="abaAtiva === 'aparencia' && state">
          <form class="flex flex-col gap-5" (ngSubmit)="salvarAparencia()">
            <!-- Tema de cor -->
            <div class="card p-5">
              <p class="text-xs font-bold uppercase tracking-wider mb-4" style="color:var(--c-muted)">Tema de cor da p\xE1gina</p>
              <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(88px,1fr));gap:8px">
                <!-- Padr\xE3o -->
                <button type="button"
                        class="theme-card"
                        [class.selected]="aparenciaPublicTheme === ''"
                        style="border:2px solid var(--c-border);border-radius:10px;padding:10px;cursor:pointer;position:relative;background:var(--c-surface)"
                        (click)="selecionarTema('')">
                  <div style="height:28px;border-radius:5px;margin-bottom:7px;background:#f0ede8;display:flex;gap:2px;align-items:flex-end;padding:4px">
                    <div style="background:#1a1a2e;border-radius:2px;width:5px;height:10px"></div>
                    <div style="background:#1a1a2e;border-radius:2px;width:5px;height:16px"></div>
                    <div style="background:#1a1a2e;border-radius:2px;width:5px;height:22px"></div>
                  </div>
                  <div style="width:20px;height:20px;border-radius:50%;background:#1a1a2e;margin-bottom:5px"></div>
                  <div style="font-size:10.5px;font-weight:500;color:var(--c-text)">Padr\xE3o</div>
                </button>

                @for (entry of (availableThemes | keyvalue); track entry.key) {
                  <button type="button"
                          class="theme-card"
                          [class.selected]="aparenciaPublicTheme === entry.key"
                          style="border:2px solid var(--c-border);border-radius:10px;padding:10px;cursor:pointer;position:relative;background:var(--c-surface)"
                          (click)="selecionarTema(entry.key)">
                    @let p = entry.value.primary;
                    <div style="height:28px;border-radius:5px;margin-bottom:7px;display:flex;gap:2px;align-items:flex-end;padding:4px" [style.background]="p + '22'">
                      <div [style.background]="p" style="border-radius:2px;width:5px;height:10px"></div>
                      <div [style.background]="p" style="border-radius:2px;width:5px;height:16px"></div>
                      <div [style.background]="p" style="border-radius:2px;width:5px;height:22px"></div>
                    </div>
                    <div [style.background]="p" style="width:20px;height:20px;border-radius:50%;margin-bottom:5px"></div>
                    <div style="font-size:10.5px;font-weight:500;color:var(--c-text)">{{ entry.value.label }}</div>
                  </button>
                }
              </div>
              <p class="text-[11px] mt-3" style="color:var(--c-muted)">Afeta o logo, bot\xF5es e indicador de hor\xE1rio aberto. Independente do tema do sistema.</p>
            </div>

            <div class="card p-5">
              <p class="text-xs font-bold uppercase tracking-wider mb-4" style="color:var(--c-muted)">Topo da p\xE1gina p\xFAblica</p>
              <div class="cover-mode-grid">
                <button type="button" class="cover-mode-btn" [class.selected]="aparenciaCoverMode === 'banner'" (click)="aparenciaCoverMode = 'banner'">
                  Usar banner
                </button>
                <button type="button" class="cover-mode-btn" [class.selected]="aparenciaCoverMode === 'solid'" (click)="aparenciaCoverMode = 'solid'">
                  Cor s\xF3lida
                </button>
                <button type="button" class="cover-mode-btn" [class.selected]="aparenciaCoverMode === 'none'" (click)="aparenciaCoverMode = 'none'">
                  Sem banner
                </button>
              </div>
              @if (aparenciaCoverMode === 'solid') {
                <div class="mt-4">
                  <label class="form-label">Cor s\xF3lida</label>
                  <input type="color" [(ngModel)]="aparenciaCoverColor" name="cover_color" class="cover-color-input" />
                </div>
              }
              @if (aparenciaCoverMode === 'banner') {
                <div class="mt-4">
                  <label class="form-label">Imagem do banner</label>
                  <input type="file" accept="image/*" class="form-input" [disabled]="enviandoCover" (change)="onSelecionarCoverImage($event)" />
                  @if (nomeArquivoCover) {
                    <p class="text-[11px] mt-2 inline-flex items-center gap-2" style="color:var(--c-muted)">
                      @if (enviandoCover) {
                        <span class="btn-spinner" style="width:12px;height:12px;border-width:2px"></span>
                      }
                      {{ enviandoCover ? 'Enviando\u2026' : 'Arquivo selecionado' }}: {{ nomeArquivoCover }}
                    </p>
                  }
                </div>
              }
            </div>

            <!-- Informa\xE7\xF5es exibidas na p\xE1gina -->
            <div class="card p-5">
              <p class="text-xs font-bold uppercase tracking-wider mb-4" style="color:var(--c-muted)">Informa\xE7\xF5es exibidas na p\xE1gina</p>
              <div class="flex flex-col gap-4">
                <div>
                  <label class="form-label">Descri\xE7\xE3o / Slogan</label>
                  <input type="text" class="form-input" [(ngModel)]="aparenciaShortDescription" name="short_description" placeholder="Ex: Cuidando da sua sa\xFAde com excel\xEAncia" maxlength="200" />
                </div>
                <div>
                  <label class="form-label">Especialidades</label>
                  <input type="text" class="form-input" [(ngModel)]="aparenciaSpecialties" name="specialties" placeholder="Cl\xEDnica geral, Pediatria, Dermatologia (v\xEDrgula para separar)" />
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="form-label">Ano de funda\xE7\xE3o</label>
                    <input type="number" class="form-input" [(ngModel)]="aparenciaFoundedYear" name="founded_year" placeholder="2010" min="1900" />
                  </div>
                  <div>
                    <label class="form-label">E-mail de contato p\xFAblico</label>
                    <input type="email" class="form-input" [(ngModel)]="aparenciaContactEmail" name="contact_email" placeholder="contato@empresa.com" />
                  </div>
                </div>
                <div>
                  <label class="form-label">Link do Google Maps</label>
                  <input type="url" class="form-input" [(ngModel)]="aparenciaMapsUrl" name="maps_url" placeholder="https://maps.google.com/..." />
                </div>
              </div>
            </div>

            <div class="flex justify-end gap-2">
              <button type="submit" class="btn-primary px-5 py-2 text-sm inline-flex items-center gap-2" [disabled]="salvandoAparencia">
                @if (salvandoAparencia) {
                  <span class="btn-spinner" aria-hidden="true"></span>
                } @else {
                  <span class="material-symbols-outlined" style="font-size:16px">save</span>
                }
                {{ salvandoAparencia ? 'Salvando\u2026' : 'Salvar apar\xEAncia' }}
              </button>
            </div>
          </form>
        </div>

        <!-- Aba Modelos -->
        @if (abaAtiva === 'modelos' && state) {
          <div id="tab-modelos" class="flex flex-col gap-6 pb-24">
            <form class="flex flex-col gap-5" (ngSubmit)="salvarModelos()">
              <div class="card p-5">
                <p class="text-xs font-bold uppercase tracking-wider mb-4" style="color:var(--c-muted)">Modelo publicado</p>
                <p class="text-[11px] mb-3 leading-relaxed" style="color:var(--c-muted)">
                  Escolha qual layout os visitantes veem no link p\xFAblico. Textos espec\xEDficos, conv\xEAnios, modalidades e equipe ficam na aba <strong>Conte\xFAdo extra</strong>. As pr\xE9vias abaixo usam esses dados ao voltar para esta aba.
                </p>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <label class="inline-flex items-center gap-2 text-sm" style="color:var(--c-text)">
                    <input type="radio" name="modelos_modelo" [value]="1" [(ngModel)]="aparenciaModelo" />
                    {{ linkBioModelLabels[1] }}
                  </label>
                  <label class="inline-flex items-center gap-2 text-sm" style="color:var(--c-text)">
                    <input type="radio" name="modelos_modelo" [value]="2" [(ngModel)]="aparenciaModelo" />
                    {{ linkBioModelLabels[2] }}
                  </label>
                  <label class="inline-flex items-center gap-2 text-sm" style="color:var(--c-text)">
                    <input type="radio" name="modelos_modelo" [value]="3" [(ngModel)]="aparenciaModelo" />
                    {{ linkBioModelLabels[3] }}
                  </label>
                  <label class="inline-flex items-center gap-2 text-sm" style="color:var(--c-text)">
                    <input type="radio" name="modelos_modelo" [value]="4" [(ngModel)]="aparenciaModelo" />
                    {{ linkBioModelLabels[4] }}
                  </label>
                  <label class="inline-flex items-center gap-2 text-sm" style="color:var(--c-text)">
                    <input type="radio" name="modelos_modelo" [value]="5" [(ngModel)]="aparenciaModelo" />
                    {{ linkBioModelLabels[5] }}
                  </label>
                  <label class="inline-flex items-center gap-2 text-sm" style="color:var(--c-text)">
                    <input type="radio" name="modelos_modelo" [value]="6" [(ngModel)]="aparenciaModelo" />
                    {{ linkBioModelLabels[6] }}
                  </label>
                  <label class="inline-flex items-center gap-2 text-sm md:col-span-2" style="color:var(--c-text)">
                    <input type="radio" name="modelos_modelo" [value]="7" [(ngModel)]="aparenciaModelo" />
                    {{ linkBioModelLabels[7] }}
                  </label>
                  <label class="inline-flex items-center gap-2 text-sm md:col-span-2" style="color:var(--c-text)">
                    <input type="radio" name="modelos_modelo" [value]="8" [(ngModel)]="aparenciaModelo" />
                    {{ linkBioModelLabels[8] }}
                  </label>
                </div>
              </div>

              <div class="sticky-footer-spacer" aria-hidden="true"></div>
              <div class="sticky-footer">
                <div style="font-size:12px;color:var(--c-muted)">Altera\xE7\xF5es n\xE3o salvas</div>
                <div class="footer-btns">
                  <a routerLink="/dashboard" class="btn-secondary">
                    <span class="material-symbols-outlined" style="font-size:16px">close</span>
                    Cancelar
                  </a>
                  <button type="submit" class="btn-primary inline-flex items-center gap-2" [disabled]="salvandoModelos">
                    @if (salvandoModelos) {
                      <span class="btn-spinner" aria-hidden="true"></span>
                    } @else {
                      <span class="material-symbols-outlined" style="font-size:16px">save</span>
                    }
                    {{ salvandoModelos ? 'Salvando\u2026' : 'Salvar configura\xE7\xF5es' }}
                  </button>
                </div>
              </div>
            </form>

            <div>
              <p class="text-[0.6875rem] uppercase tracking-wider mb-3" style="color:var(--c-muted)">Pr\xE9via dos layouts</p>
              <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
                @for (m of previewModelIds; track m) {
                  <div class="flex flex-col items-center gap-2 w-full max-w-[300px]">
                    <span class="text-xs font-semibold text-center leading-snug" style="color:var(--c-text)">{{ linkBioModelLabels[m] }}</span>
                    <div class="link-bio-phone link-bio-phone--mini w-full">
                      @if (modelPreviewUrlSafe(m); as src) {
                        <iframe [src]="src" [title]="'Pr\xE9via: ' + linkBioModelLabels[m]" class="link-bio-phone-screen w-full h-full border-0" loading="lazy"></iframe>
                      } @else {
                        <div class="link-bio-phone-screen w-full h-full min-h-[200px] flex items-center justify-center text-xs" style="background:var(--c-soft);color:var(--c-muted)">\u2026</div>
                      }
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>
        }

        <!-- Aba Conte\xFAdo extra (formul\xE1rio \u2014 modelos 2\u20135) -->
        @if (abaAtiva === 'conteudoExtra' && state) {
          <div id="tab-conteudo-extra" class="flex flex-col gap-5 pb-24">
            <p class="text-xs leading-relaxed" style="color:var(--c-muted)">
              Preencha s\xF3 o que fizer sentido para o seu layout. Campos vazios s\xE3o ignorados. Deixe tudo em branco e salve para limpar os dados extras da p\xE1gina p\xFAblica.
            </p>

            <form class="flex flex-col gap-5" (ngSubmit)="salvarConteudoExtra()">
              <div class="card p-5">
                <p class="text-xs font-bold uppercase tracking-wider mb-1" style="color:var(--c-muted)">Textos e links</p>
                <p class="text-[11px] mb-4" style="color:var(--c-muted)">Usados nos layouts tem\xE1ticos (2 a 8). Veterin\xE1ria, pediatria e nutri\xE7\xE3o tamb\xE9m leem registro profissional, conv\xEAnios, modalidades e textos aqui quando aplic\xE1vel.</p>
                <div class="flex flex-col gap-4">
                  <div>
                    <label class="form-label">Frase de destaque (hero)</label>
                    <input type="text" class="form-input" [(ngModel)]="extraHeroTagline" name="extra_hero_tagline" maxlength="300" placeholder="Ex.: Psicologia cl\xEDnica e organizacional" />
                  </div>
                  <div>
                    <label class="form-label">Registro profissional (CRO, CRM, CRP\u2026)</label>
                    <input type="text" class="form-input" [(ngModel)]="extraCouncilRegistration" name="extra_council" maxlength="120" placeholder="Ex.: CRO-SP 12345" />
                  </div>
                  <div>
                    <label class="form-label">Subt\xEDtulo da marca (est\xE9tica)</label>
                    <input type="text" class="form-input" [(ngModel)]="extraBrandSubtitle" name="extra_brand_sub" maxlength="200" placeholder="Ex.: Est\xE9tica avan\xE7ada \xB7 Desde 2015" />
                  </div>
                  <div>
                    <label class="form-label">Instagram (URL completa)</label>
                    <input type="url" class="form-input" [(ngModel)]="extraInstagramUrl" name="extra_ig" maxlength="500" placeholder="https://instagram.com/sua_clinica" />
                  </div>
                </div>
              </div>

              <div class="card p-5">
                <div class="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <div>
                    <p class="text-xs font-bold uppercase tracking-wider" style="color:var(--c-muted)">Conv\xEAnios aceitos</p>
                    <p class="text-[11px] mt-1" style="color:var(--c-muted)">Layout odontologia (4)</p>
                  </div>
                  <button type="button" class="text-sm px-3 py-1.5 rounded-lg inline-flex items-center gap-1" style="background:var(--c-soft);color:var(--c-primary);border:1px solid var(--c-border)" (click)="adicionarConvenioLinha()">
                    <span class="material-symbols-outlined" style="font-size:16px">add</span> Adicionar
                  </button>
                </div>
                <div class="flex flex-col gap-2">
                  @for (linha of extraConveniosLinhas; track $index) {
                    <div class="flex gap-2 items-center">
                      <input type="text" class="form-input flex-1 text-sm" [(ngModel)]="extraConveniosLinhas[$index]" [name]="'extra_conv_' + $index" maxlength="120" placeholder="Ex.: Unimed" />
                      <button type="button" class="p-2 rounded-lg shrink-0" style="color:var(--c-muted);border:1px solid var(--c-border)" (click)="removerConvenioLinha($index)" title="Remover linha" aria-label="Remover conv\xEAnio">
                        <span class="material-symbols-outlined" style="font-size:18px">close</span>
                      </button>
                    </div>
                  }
                </div>
              </div>

              <div class="card p-5">
                <div class="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <div>
                    <p class="text-xs font-bold uppercase tracking-wider" style="color:var(--c-muted)">Modalidades de atendimento</p>
                    <p class="text-[11px] mt-1" style="color:var(--c-muted)">Layout profissional solo (2). Se vazio, a p\xE1gina usa padr\xE3o (Online / Presencial).</p>
                  </div>
                  <button type="button" class="text-sm px-3 py-1.5 rounded-lg inline-flex items-center gap-1" style="background:var(--c-soft);color:var(--c-primary);border:1px solid var(--c-border)" (click)="adicionarModalidade()">
                    <span class="material-symbols-outlined" style="font-size:16px">add</span> Adicionar
                  </button>
                </div>
                @if (extraModalidades.length === 0) {
                  <p class="text-xs py-2" style="color:var(--c-muted)">Nenhuma modalidade personalizada. Clique em Adicionar para criar (ex.: Online, Presencial).</p>
                }
                <div class="flex flex-col gap-4">
                  @for (mod of extraModalidades; track $index) {
                    <div class="p-4 rounded-xl flex flex-col gap-3" style="background:var(--c-soft);border:1px solid var(--c-border)">
                      <div class="flex justify-between items-start gap-2">
                        <span class="text-xs font-semibold" style="color:var(--c-text)">Modalidade {{ $index + 1 }}</span>
                        <button type="button" class="text-xs px-2 py-1 rounded" style="color:var(--c-muted)" (click)="removerModalidade($index)">Remover</button>
                      </div>
                      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label class="form-label">T\xEDtulo</label>
                          <input type="text" class="form-input text-sm" [(ngModel)]="mod.title" [name]="'mod_t_' + $index" maxlength="80" placeholder="Ex.: Online" />
                        </div>
                        <div>
                          <label class="form-label">Subt\xEDtulo</label>
                          <input type="text" class="form-input text-sm" [(ngModel)]="mod.subtitle" [name]="'mod_s_' + $index" maxlength="120" placeholder="Ex.: Atendimento remoto" />
                        </div>
                      </div>
                      <label class="inline-flex items-center gap-2 text-sm cursor-pointer" style="color:var(--c-text)">
                        <input type="checkbox" [(ngModel)]="mod.available" [name]="'mod_a_' + $index" />
                        Dispon\xEDvel (exibir na p\xE1gina)
                      </label>
                    </div>
                  }
                </div>
              </div>

              <div class="card p-5">
                <div class="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <div>
                    <p class="text-xs font-bold uppercase tracking-wider" style="color:var(--c-muted)">Equipe</p>
                    <p class="text-[11px] mt-1" style="color:var(--c-muted)">Layout multi profissionais (5)</p>
                  </div>
                  <button type="button" class="text-sm px-3 py-1.5 rounded-lg inline-flex items-center gap-1" style="background:var(--c-soft);color:var(--c-primary);border:1px solid var(--c-border)" (click)="adicionarMembroEquipe()">
                    <span class="material-symbols-outlined" style="font-size:16px">person_add</span> Adicionar pessoa
                  </button>
                </div>
                @if (extraEquipe.length === 0) {
                  <p class="text-xs py-2" style="color:var(--c-muted)">Nenhum membro. Adicione para listar na p\xE1gina p\xFAblica.</p>
                }
                <div class="flex flex-col gap-4">
                  @for (mem of extraEquipe; track $index) {
                    <div class="p-4 rounded-xl flex flex-col gap-3" style="background:var(--c-soft);border:1px solid var(--c-border)">
                      <div class="flex justify-between items-start gap-2">
                        <span class="text-xs font-semibold" style="color:var(--c-text)">Pessoa {{ $index + 1 }}</span>
                        <button type="button" class="text-xs px-2 py-1 rounded" style="color:var(--c-muted)" (click)="removerMembroEquipe($index)">Remover</button>
                      </div>
                      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div class="md:col-span-2">
                          <label class="form-label">Nome</label>
                          <input type="text" class="form-input text-sm" [(ngModel)]="mem.name" [name]="'team_n_' + $index" maxlength="120" placeholder="Dra. Maria Silva" />
                        </div>
                        <div>
                          <label class="form-label">Registro / credencial</label>
                          <input type="text" class="form-input text-sm" [(ngModel)]="mem.credential" [name]="'team_c_' + $index" maxlength="80" placeholder="CRP 06/12345" />
                        </div>
                        <div>
                          <label class="form-label">Observa\xE7\xE3o</label>
                          <input type="text" class="form-input text-sm" [(ngModel)]="mem.notes" [name]="'team_o_' + $index" maxlength="120" placeholder="Ex.: Atende online" />
                        </div>
                        <div class="md:col-span-2">
                          <label class="form-label">WhatsApp (s\xF3 n\xFAmeros ou com DDD)</label>
                          <input type="text" class="form-input text-sm" [(ngModel)]="mem.whatsapp" [name]="'team_w_' + $index" maxlength="20" placeholder="5511999999999" />
                        </div>
                      </div>
                    </div>
                  }
                </div>
              </div>

              <div class="sticky-footer-spacer" aria-hidden="true"></div>
              <div class="sticky-footer">
                <div style="font-size:12px;color:var(--c-muted)">Altera\xE7\xF5es n\xE3o salvas</div>
                <div class="footer-btns">
                  <a routerLink="/dashboard" class="btn-secondary">
                    <span class="material-symbols-outlined" style="font-size:16px">close</span>
                    Cancelar
                  </a>
                  <button type="submit" class="btn-primary inline-flex items-center gap-2" [disabled]="salvandoExtra">
                    @if (salvandoExtra) {
                      <span class="btn-spinner" aria-hidden="true"></span>
                    } @else {
                      <span class="material-symbols-outlined" style="font-size:16px">save</span>
                    }
                    {{ salvandoExtra ? 'Salvando\u2026' : 'Salvar configura\xE7\xF5es' }}
                  </button>
                </div>
              </div>
            </form>
          </div>
        }
      </div>

      <!-- Preview celular (vis\xEDvel nas abas exceto Modelos e Conte\xFAdo extra) -->
      @if (abaAtiva !== 'modelos' && abaAtiva !== 'conteudoExtra') {
      <div class="flex flex-col items-center gap-3 md:sticky md:top-24">
        <p class="text-[0.6875rem] uppercase tracking-wider" style="color:var(--c-muted)">Pr\xE9via ao vivo</p>
        <div class="link-bio-phone w-full max-w-[320px] md:max-w-none">
          @if (previewUrlSafe) {
            <iframe [src]="previewUrlSafe" title="Preview Link Bio" class="link-bio-phone-screen w-full h-full border-0" loading="lazy"></iframe>
          } @else {
            <div class="link-bio-phone-screen w-full h-full min-h-[400px] flex flex-col items-center justify-center rounded-xl text-sm" style="background:var(--c-soft);color:var(--c-muted);border:1px dashed var(--c-border)">
              <span class="material-symbols-outlined mb-2" style="font-size:32px">smartphone</span>
              <span>Carregando pr\xE9via\u2026</span>
            </div>
          }
        </div>
      </div>
      }
    </div>
    </div>
  }
  }
</div>
`, styles: ["/* src/app/paginas/link-bio/link-bio.component.css */\n.link-bio-metric {\n  background: var(--c-surface);\n  border: 1px solid var(--c-border);\n  border-radius: 0.625rem;\n  padding: 0.875rem 1rem;\n  flex: 1;\n}\n.link-bio-metric-value {\n  font-size: 1.5rem;\n  font-weight: 700;\n}\n.link-bio-metric-label {\n  font-size: 0.6875rem;\n  color: var(--c-muted);\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n.link-bio-tab {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.375rem;\n  padding: 0.375rem 0.875rem;\n  border-radius: 0.375rem;\n  font-size: 0.8125rem;\n  font-weight: 500;\n  cursor: pointer;\n  color: var(--c-muted);\n  transition: all 0.15s;\n  border: none;\n  background: transparent;\n}\n.link-bio-tab.active {\n  background: var(--c-primary);\n  color: #fff;\n}\n.link-bio-tab:not(.active):hover {\n  color: var(--c-text);\n}\n.link-bio-tab .material-symbols-outlined {\n  font-size: 1.125rem;\n}\n.link-bio-link-row {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  padding: 0.75rem 0.875rem;\n  background: var(--c-surface);\n  border: 1px solid var(--c-border);\n  border-radius: 0.625rem;\n  transition: border-color 0.15s;\n}\n.link-bio-link-row:hover {\n  border-color: var(--c-primary);\n}\n.link-bio-form-row {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  padding: 0.625rem 0.875rem;\n  background: var(--c-surface);\n  border: 1px solid var(--c-border);\n  border-radius: 0.625rem;\n  transition: border-color 0.15s;\n}\n.link-bio-form-row:hover {\n  border-color: var(--c-border);\n}\n.link-bio-phone {\n  width: 320px;\n  height: 600px;\n  border-radius: 1.5rem;\n  border: 2px solid var(--c-border);\n  background: var(--c-bg);\n  overflow: hidden;\n  flex-shrink: 0;\n  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.15);\n}\n.link-bio-phone--mini {\n  width: 100%;\n  max-width: 300px;\n  height: 360px;\n  border-radius: 1.125rem;\n  border-width: 2px;\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);\n}\n.link-bio-phone-screen {\n  width: 100%;\n  height: 100%;\n  overflow-y: auto;\n  scrollbar-width: none;\n  display: block;\n}\n.link-bio-phone-screen::-webkit-scrollbar {\n  display: none;\n}\n.link-bio-chart-row {\n  display: flex;\n  align-items: stretch;\n  gap: 0.5rem;\n  height: 5.5rem;\n}\n.link-bio-bar-wrap {\n  display: flex;\n  flex-direction: column;\n  align-items: stretch;\n  gap: 4px;\n  flex: 1;\n  min-width: 0;\n  height: 100%;\n}\n.link-bio-bar-stack {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-end;\n  min-height: 0;\n  width: 100%;\n}\n.link-bio-bar {\n  background: var(--c-primary);\n  border-radius: 3px 3px 0 0;\n  width: 100%;\n  min-height: 2px;\n  transition: height 0.3s;\n}\n.link-bio-bar--ghost {\n  background: color-mix(in srgb, var(--c-primary) 28%, var(--c-border));\n  opacity: 0.85;\n}\n.link-bio-bar-label {\n  font-size: 0.5625rem;\n  color: var(--c-muted);\n  text-align: center;\n  flex-shrink: 0;\n}\n.link-bio-badge {\n  font-size: 0.6875rem;\n  font-weight: 600;\n  letter-spacing: 0.04em;\n  padding: 2px 8px;\n  border-radius: 99px;\n  text-transform: uppercase;\n}\n.theme-card {\n  transition:\n    transform 0.12s ease,\n    border-color 0.12s ease,\n    box-shadow 0.12s ease;\n}\n.theme-card:hover {\n  transform: translateY(-1px);\n  border-color: color-mix(in srgb, var(--c-primary) 45%, var(--c-border));\n}\n.theme-card:active {\n  transform: scale(0.98);\n}\n.theme-card.selected {\n  border-color: var(--c-primary) !important;\n  box-shadow: 0 0 0 2px color-mix(in srgb, var(--c-primary) 25%, transparent);\n}\n.cover-mode-grid {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: 0.5rem;\n}\n.cover-mode-btn {\n  border: 1px solid var(--c-border);\n  background: var(--c-surface);\n  color: var(--c-muted);\n  border-radius: 0.625rem;\n  padding: 0.625rem 0.75rem;\n  font-size: 0.8125rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.12s ease;\n}\n.cover-mode-btn:hover {\n  border-color: color-mix(in srgb, var(--c-primary) 45%, var(--c-border));\n}\n.cover-mode-btn.selected {\n  border-color: var(--c-primary);\n  color: var(--c-primary);\n  box-shadow: 0 0 0 2px color-mix(in srgb, var(--c-primary) 20%, transparent);\n}\n.cover-color-input {\n  width: 56px;\n  height: 40px;\n  border: 1px solid var(--c-border);\n  border-radius: 0.5rem;\n  background: var(--c-surface);\n  padding: 0.25rem;\n}\n/*# sourceMappingURL=link-bio.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LinkBioComponent, { className: "LinkBioComponent", filePath: "src/app/paginas/link-bio/link-bio.component.ts", lineNumber: 46 });
})();
export {
  LinkBioComponent
};
//# sourceMappingURL=chunk-UD47M4Z7.js.map
