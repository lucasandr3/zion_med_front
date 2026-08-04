import {
  LandingService
} from "./chunk-3W5QFCP6.js";
import {
  NgxMaskDirective
} from "./chunk-4HPDM2KW.js";
import {
  CheckboxControlValueAccessor,
  DefaultValueAccessor,
  FormsModule,
  MinLengthValidator,
  NgControlStatus,
  NgControlStatusGroup,
  NgForm,
  NgModel,
  NgSelectOption,
  RequiredValidator,
  SelectControlValueAccessor,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption
} from "./chunk-USROZ7PW.js";
import {
  AuthService
} from "./chunk-SFRXLDXR.js";
import {
  environment
} from "./chunk-IBJWGIJV.js";
import {
  ActivatedRoute,
  Router,
  RouterLink
} from "./chunk-C2NWBPZH.js";
import {
  CommonModule,
  Component,
  DecimalPipe,
  HttpClient,
  Inject,
  Injectable,
  PLATFORM_ID,
  inject,
  isPlatformBrowser,
  map,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind3,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-GRLISYEV.js";

// src/app/core/services/comece.service.ts
var BASE = `${environment.apiUrl}/api/v1`;
var ComeceService = class _ComeceService {
  http = inject(HttpClient);
  store(payload) {
    const body = {
      company_name: payload.company_name,
      responsible_name: payload.responsible_name,
      email: payload.email,
      billing_document: payload.billing_document.trim(),
      password: payload.password,
      password_confirmation: payload.password_confirmation,
      plan_key: payload.plan_key,
      accepted_terms: payload.accepted_terms ? "1" : ""
    };
    if (payload.phone?.trim())
      body["phone"] = payload.phone.trim();
    return this.http.post(`${BASE}/comece`, body).pipe(map((r) => r.data));
  }
  static \u0275fac = function ComeceService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ComeceService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ComeceService, factory: _ComeceService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ComeceService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

// src/app/paginas/comece/comece.component.ts
var _forTrack0 = ($index, $item) => $item.key;
function ComeceComponent_Conditional_131_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 62)(1, "div", 53);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 54);
    \u0275\u0275element(3, "path", 55)(4, "path", 56);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(5, "div", 57)(6, "div", 58);
    \u0275\u0275text(7, "Prefere falar por WhatsApp?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 59);
    \u0275\u0275text(9, "D\xFAvidas ou ajuda no cadastro? Fale com a equipe.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "span", 60);
    \u0275\u0275text(11, "Falar agora");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("href", ctx_r0.waCadastroUrl, \u0275\u0275sanitizeUrl);
  }
}
function ComeceComponent_Conditional_135_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 66);
    \u0275\u0275element(1, "polyline", 6);
    \u0275\u0275elementEnd();
  }
}
function ComeceComponent_Conditional_136_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " 1 ");
  }
}
function ComeceComponent_Conditional_142_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 66);
    \u0275\u0275element(1, "polyline", 6);
    \u0275\u0275elementEnd();
  }
}
function ComeceComponent_Conditional_143_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " 2 ");
  }
}
function ComeceComponent_Conditional_149_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 66);
    \u0275\u0275element(1, "polyline", 6);
    \u0275\u0275elementEnd();
  }
}
function ComeceComponent_Conditional_150_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " 3 ");
  }
}
function ComeceComponent_Conditional_153_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 71);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.mensagemErro);
  }
}
function ComeceComponent_Conditional_153_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 76);
    \u0275\u0275text(1, "Carregando planos\u2026");
    \u0275\u0275elementEnd();
  }
}
function ComeceComponent_Conditional_153_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 76);
    \u0275\u0275text(1, "Nenhum plano dispon\xEDvel. Tente mais tarde ou fale pelo WhatsApp.");
    \u0275\u0275elementEnd();
  }
}
function ComeceComponent_Conditional_153_Conditional_14_For_1_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 117);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(p_r4.description);
  }
}
function ComeceComponent_Conditional_153_Conditional_14_For_1_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " R$0");
    \u0275\u0275elementStart(1, "span");
    \u0275\u0275text(2, "/m\xEAs");
    \u0275\u0275elementEnd();
  }
}
function ComeceComponent_Conditional_153_Conditional_14_For_1_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "number");
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "/m\xEAs");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275textInterpolate1(" R$ ", \u0275\u0275pipeBind3(1, 1, p_r4.value, "1.0-0", "pt-BR"));
  }
}
function ComeceComponent_Conditional_153_Conditional_14_For_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 112);
    \u0275\u0275listener("click", function ComeceComponent_Conditional_153_Conditional_14_For_1_Template_button_click_0_listener() {
      const p_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.selecionarPlano(p_r4.key));
    });
    \u0275\u0275elementStart(1, "div", 113);
    \u0275\u0275element(2, "div", 114);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 115)(4, "div", 116);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(6, ComeceComponent_Conditional_153_Conditional_14_For_1_Conditional_6_Template, 2, 1, "div", 117);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 118);
    \u0275\u0275conditionalCreate(8, ComeceComponent_Conditional_153_Conditional_14_For_1_Conditional_8_Template, 3, 0)(9, ComeceComponent_Conditional_153_Conditional_14_For_1_Conditional_9_Template, 4, 5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const p_r4 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("selected", ctx_r0.planKey === p_r4.key);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(p_r4.name);
    \u0275\u0275advance();
    \u0275\u0275conditional(p_r4.description ? 6 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.isPlanoGratis(p_r4) ? 8 : 9);
  }
}
function ComeceComponent_Conditional_153_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, ComeceComponent_Conditional_153_Conditional_14_For_1_Template, 10, 5, "button", 111, _forTrack0);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275repeater(ctx_r0.planos);
  }
}
function ComeceComponent_Conditional_153_Conditional_59_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 38);
    \u0275\u0275element(1, "path", 119)(2, "line", 120);
    \u0275\u0275elementEnd();
  }
}
function ComeceComponent_Conditional_153_Conditional_60_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 38);
    \u0275\u0275element(1, "path", 121)(2, "circle", 122);
    \u0275\u0275elementEnd();
  }
}
function ComeceComponent_Conditional_153_Conditional_76_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 38);
    \u0275\u0275element(1, "path", 119)(2, "line", 120);
    \u0275\u0275elementEnd();
  }
}
function ComeceComponent_Conditional_153_Conditional_77_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 38);
    \u0275\u0275element(1, "path", 121)(2, "circle", 122);
    \u0275\u0275elementEnd();
  }
}
function ComeceComponent_Conditional_153_Conditional_92_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 123);
    \u0275\u0275element(1, "path", 124)(2, "path", 125);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Criando conta\u2026 ");
  }
}
function ComeceComponent_Conditional_153_Conditional_93_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 5);
    \u0275\u0275element(1, "polyline", 126)(2, "polyline", 127);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Criar conta e iniciar trial ");
  }
}
function ComeceComponent_Conditional_153_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 68)(1, "div", 69);
    \u0275\u0275text(2, "Criar conta");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 70);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(5, ComeceComponent_Conditional_153_Conditional_5_Template, 2, 1, "div", 71);
    \u0275\u0275elementStart(6, "form", 72);
    \u0275\u0275listener("ngSubmit", function ComeceComponent_Conditional_153_Template_form_ngSubmit_6_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.enviar());
    });
    \u0275\u0275elementStart(7, "div", 73)(8, "div", 74);
    \u0275\u0275text(9, "Plano ");
    \u0275\u0275elementStart(10, "span", 75);
    \u0275\u0275text(11, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(12, ComeceComponent_Conditional_153_Conditional_12_Template, 2, 0, "p", 76)(13, ComeceComponent_Conditional_153_Conditional_13_Template, 2, 0, "p", 76)(14, ComeceComponent_Conditional_153_Conditional_14_Template, 2, 0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "div", 77)(16, "div", 78)(17, "label", 79);
    \u0275\u0275text(18, "Nome do neg\xF3cio ");
    \u0275\u0275elementStart(19, "span", 75);
    \u0275\u0275text(20, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "input", 80);
    \u0275\u0275twoWayListener("ngModelChange", function ComeceComponent_Conditional_153_Template_input_ngModelChange_21_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.companyName, $event) || (ctx_r0.companyName = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "div", 78)(23, "label", 81);
    \u0275\u0275text(24, "Seu nome ");
    \u0275\u0275elementStart(25, "span", 75);
    \u0275\u0275text(26, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "input", 82);
    \u0275\u0275twoWayListener("ngModelChange", function ComeceComponent_Conditional_153_Template_input_ngModelChange_27_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.responsibleName, $event) || (ctx_r0.responsibleName = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(28, "div", 78)(29, "label", 83);
    \u0275\u0275text(30, "E-mail ");
    \u0275\u0275elementStart(31, "span", 75);
    \u0275\u0275text(32, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(33, "input", 84);
    \u0275\u0275twoWayListener("ngModelChange", function ComeceComponent_Conditional_153_Template_input_ngModelChange_33_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.email, $event) || (ctx_r0.email = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "div", 85);
    \u0275\u0275text(35, "Usado para acesso, cobran\xE7a e comunica\xE7\xF5es importantes.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(36, "div", 78)(37, "label", 86);
    \u0275\u0275text(38, "CPF ou CNPJ ");
    \u0275\u0275elementStart(39, "span", 75);
    \u0275\u0275text(40, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(41, "input", 87);
    \u0275\u0275twoWayListener("ngModelChange", function ComeceComponent_Conditional_153_Template_input_ngModelChange_41_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.billingDocument, $event) || (ctx_r0.billingDocument = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(42, "div", 85);
    \u0275\u0275text(43, "Documento da empresa ou do respons\xE1vel legal \u2014 necess\xE1rio para gerar a assinatura e o boleto no sistema de pagamento.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(44, "div", 78)(45, "label", 88);
    \u0275\u0275text(46, "WhatsApp");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(47, "input", 89);
    \u0275\u0275twoWayListener("ngModelChange", function ComeceComponent_Conditional_153_Template_input_ngModelChange_47_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.phone, $event) || (ctx_r0.phone = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(48, "div", 85);
    \u0275\u0275text(49, "Opcional \u2014 para suporte durante o onboarding.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(50, "div", 77)(51, "div", 78)(52, "label", 90);
    \u0275\u0275text(53, "Senha ");
    \u0275\u0275elementStart(54, "span", 75);
    \u0275\u0275text(55, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(56, "div", 91)(57, "input", 92);
    \u0275\u0275twoWayListener("ngModelChange", function ComeceComponent_Conditional_153_Template_input_ngModelChange_57_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.password, $event) || (ctx_r0.password = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("ngModelChange", function ComeceComponent_Conditional_153_Template_input_ngModelChange_57_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.atualizarForcaSenha());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(58, "button", 93);
    \u0275\u0275listener("click", function ComeceComponent_Conditional_153_Template_button_click_58_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.mostrarSenha = !ctx_r0.mostrarSenha);
    });
    \u0275\u0275conditionalCreate(59, ComeceComponent_Conditional_153_Conditional_59_Template, 3, 0, ":svg:svg", 38)(60, ComeceComponent_Conditional_153_Conditional_60_Template, 3, 0, ":svg:svg", 38);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(61, "div", 94);
    \u0275\u0275element(62, "div", 95)(63, "div", 95)(64, "div", 95)(65, "div", 95);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(66, "div", 85);
    \u0275\u0275text(67);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(68, "div", 78)(69, "label", 96);
    \u0275\u0275text(70, "Confirmar senha ");
    \u0275\u0275elementStart(71, "span", 75);
    \u0275\u0275text(72, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(73, "div", 91)(74, "input", 97);
    \u0275\u0275twoWayListener("ngModelChange", function ComeceComponent_Conditional_153_Template_input_ngModelChange_74_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.passwordConfirmation, $event) || (ctx_r0.passwordConfirmation = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(75, "button", 93);
    \u0275\u0275listener("click", function ComeceComponent_Conditional_153_Template_button_click_75_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.mostrarSenhaConf = !ctx_r0.mostrarSenhaConf);
    });
    \u0275\u0275conditionalCreate(76, ComeceComponent_Conditional_153_Conditional_76_Template, 3, 0, ":svg:svg", 38)(77, ComeceComponent_Conditional_153_Conditional_77_Template, 3, 0, ":svg:svg", 38);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(78, "label", 98)(79, "input", 99);
    \u0275\u0275twoWayListener("ngModelChange", function ComeceComponent_Conditional_153_Template_input_ngModelChange_79_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.acceptedTerms, $event) || (ctx_r0.acceptedTerms = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(80, "span", 100);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(81, "svg", 101);
    \u0275\u0275element(82, "polyline", 102);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(83, "span", 103);
    \u0275\u0275text(84, " Li e concordo com os ");
    \u0275\u0275elementStart(85, "a", 104);
    \u0275\u0275listener("click", function ComeceComponent_Conditional_153_Template_a_click_85_listener($event) {
      \u0275\u0275restoreView(_r2);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275text(86, "Termos de Uso");
    \u0275\u0275elementEnd();
    \u0275\u0275text(87, " e a ");
    \u0275\u0275elementStart(88, "a", 105);
    \u0275\u0275listener("click", function ComeceComponent_Conditional_153_Template_a_click_88_listener($event) {
      \u0275\u0275restoreView(_r2);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275text(89, "Pol\xEDtica de Privacidade");
    \u0275\u0275elementEnd();
    \u0275\u0275text(90, ". ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(91, "button", 106);
    \u0275\u0275conditionalCreate(92, ComeceComponent_Conditional_153_Conditional_92_Template, 4, 0)(93, ComeceComponent_Conditional_153_Conditional_93_Template, 4, 0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(94, "div", 107)(95, "div", 108);
    \u0275\u0275text(96, "J\xE1 tem conta? ");
    \u0275\u0275elementStart(97, "a", 109);
    \u0275\u0275text(98, "Entrar");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(99, "div", 110);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(100, "svg", 38);
    \u0275\u0275element(101, "rect", 43)(102, "path", 44);
    \u0275\u0275elementEnd();
    \u0275\u0275text(103, " Conex\xE3o segura \xB7 Dados criptografados ");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("Seu trial de ", ctx_r0.diasTrial, " dias come\xE7a imediatamente ap\xF3s o cadastro \u2014 sem cart\xE3o.");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.estadoErro ? 5 : -1);
    \u0275\u0275advance(7);
    \u0275\u0275conditional(ctx_r0.carregandoPlanos ? 12 : ctx_r0.planos.length === 0 ? 13 : 14);
    \u0275\u0275advance(9);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.companyName);
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.responsibleName);
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.email);
    \u0275\u0275advance(8);
    \u0275\u0275property("dropSpecialCharacters", true);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.billingDocument);
    \u0275\u0275advance(6);
    \u0275\u0275property("dropSpecialCharacters", true);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.phone);
    \u0275\u0275advance(10);
    \u0275\u0275property("type", ctx_r0.mostrarSenha ? "text" : "password");
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.password);
    \u0275\u0275advance();
    \u0275\u0275attribute("aria-label", ctx_r0.mostrarSenha ? "Ocultar senha" : "Mostrar senha");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.mostrarSenha ? 59 : 60);
    \u0275\u0275advance(3);
    \u0275\u0275classProp("on1", ctx_r0.forcaSenha >= 1);
    \u0275\u0275advance();
    \u0275\u0275classProp("on2", ctx_r0.forcaSenha >= 2);
    \u0275\u0275advance();
    \u0275\u0275classProp("on3", ctx_r0.forcaSenha >= 3);
    \u0275\u0275advance();
    \u0275\u0275classProp("on4", ctx_r0.forcaSenha >= 4);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.labelForcaSenha);
    \u0275\u0275advance(7);
    \u0275\u0275property("type", ctx_r0.mostrarSenhaConf ? "text" : "password");
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.passwordConfirmation);
    \u0275\u0275advance();
    \u0275\u0275attribute("aria-label", ctx_r0.mostrarSenhaConf ? "Ocultar senha" : "Mostrar senha");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.mostrarSenhaConf ? 76 : 77);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.acceptedTerms);
    \u0275\u0275advance();
    \u0275\u0275classProp("checked", ctx_r0.acceptedTerms);
    \u0275\u0275advance(11);
    \u0275\u0275property("disabled", ctx_r0.estadoCarregando || ctx_r0.carregandoPlanos || ctx_r0.planos.length === 0);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.estadoCarregando ? 92 : 93);
  }
}
function ComeceComponent_Conditional_154_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 68)(1, "div", 69);
    \u0275\u0275text(2, "Configura\xE7\xE3o inicial");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 70);
    \u0275\u0275text(4, "Conta criada! Agora vamos preparar seu perfil (opcional \u2014 voc\xEA pode ajustar depois no painel).");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 78)(6, "label", 128);
    \u0275\u0275text(7, "Especialidade principal");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "select", 129);
    \u0275\u0275twoWayListener("ngModelChange", function ComeceComponent_Conditional_154_Template_select_ngModelChange_8_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.especialidadePrincipal, $event) || (ctx_r0.especialidadePrincipal = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(9, "option", 130);
    \u0275\u0275text(10, "Selecione sua especialidade");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "option", 131);
    \u0275\u0275text(12, "Cl\xEDnica Geral");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "option", 132);
    \u0275\u0275text(14, "Est\xE9tica & Harmoniza\xE7\xE3o");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "option", 133);
    \u0275\u0275text(16, "Odontologia");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "option", 134);
    \u0275\u0275text(18, "Psicologia & Psiquiatria");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "option", 135);
    \u0275\u0275text(20, "Pediatria");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "option", 136);
    \u0275\u0275text(22, "Veterin\xE1ria");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "option", 137);
    \u0275\u0275text(24, "Fisioterapia");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "option", 138);
    \u0275\u0275text(26, "Dermatologia");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "option", 139);
    \u0275\u0275text(28, "Oftalmologia");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "option", 140);
    \u0275\u0275text(30, "Outra");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(31, "div", 78)(32, "label", 141);
    \u0275\u0275text(33, "Tamanho da equipe");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "select", 142);
    \u0275\u0275twoWayListener("ngModelChange", function ComeceComponent_Conditional_154_Template_select_ngModelChange_34_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.tamanhoEquipe, $event) || (ctx_r0.tamanhoEquipe = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(35, "option");
    \u0275\u0275text(36, "S\xF3 eu (profissional solo)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "option");
    \u0275\u0275text(38, "2 a 5 profissionais");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "option");
    \u0275\u0275text(40, "6 a 20 profissionais");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "option");
    \u0275\u0275text(42, "Mais de 20");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(43, "div", 78)(44, "label", 143);
    \u0275\u0275text(45, "Como ficou sabendo do Gestgo?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(46, "select", 144);
    \u0275\u0275twoWayListener("ngModelChange", function ComeceComponent_Conditional_154_Template_select_ngModelChange_46_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.comoConheceu, $event) || (ctx_r0.comoConheceu = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(47, "option", 130);
    \u0275\u0275text(48, "Opcional");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(49, "option", 145);
    \u0275\u0275text(50, "Instagram");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(51, "option", 146);
    \u0275\u0275text(52, "Google");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(53, "option", 147);
    \u0275\u0275text(54, "Indica\xE7\xE3o de colega");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(55, "option", 148);
    \u0275\u0275text(56, "LinkedIn");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(57, "option", 149);
    \u0275\u0275text(58, "Outro");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(59, "button", 150);
    \u0275\u0275listener("click", function ComeceComponent_Conditional_154_Template_button_click_59_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.finalizarConfiguracao());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(60, "svg", 5);
    \u0275\u0275element(61, "polyline", 126)(62, "polyline", 127);
    \u0275\u0275elementEnd();
    \u0275\u0275text(63, " Ir para o painel ");
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(64, "div", 107)(65, "a", 151);
    \u0275\u0275text(66, "Pular e ir direto ao painel \u2192");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.especialidadePrincipal);
    \u0275\u0275advance(26);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.tamanhoEquipe);
    \u0275\u0275advance(12);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.comoConheceu);
  }
}
var ComeceComponent = class _ComeceComponent {
  planos = [];
  diasTrial = 14;
  carregandoPlanos = true;
  planKey = "";
  companyName = "";
  responsibleName = "";
  email = "";
  /** CPF ou CNPJ para faturamento / Asaas (com ou sem máscara). */
  billingDocument = "";
  phone = "";
  password = "";
  passwordConfirmation = "";
  acceptedTerms = false;
  estadoCarregando = false;
  estadoErro = false;
  mensagemErro = "";
  mostrarSenha = false;
  mostrarSenhaConf = false;
  forcaSenha = 0;
  labelForcaSenha = "Use no m\xEDnimo 8 caracteres";
  /** 1 = formulário cadastro; 2 = configuração pós-sucesso (só UI) */
  uiStep = 1;
  showSuccessOverlay = false;
  especialidadePrincipal = "";
  tamanhoEquipe = "S\xF3 eu (profissional solo)";
  comoConheceu = "";
  lpTheme = "dark";
  waCadastroUrl = "https://wa.me/5534996460818?text=" + encodeURIComponent("Ol\xE1! Estou criando minha conta no Gestgo e queria tirar uma d\xFAvida.");
  platformId;
  router = inject(Router);
  route = inject(ActivatedRoute);
  landingService = inject(LandingService);
  comeceService = inject(ComeceService);
  auth = inject(AuthService);
  constructor(platformId) {
    this.platformId = platformId;
  }
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      let saved = localStorage.getItem("gestgo-lp-theme");
      if (saved !== "dark" && saved !== "light") {
        const legacy = localStorage.getItem("zm-lp-theme");
        if (legacy === "dark" || legacy === "light") {
          saved = legacy;
          localStorage.setItem("gestgo-lp-theme", legacy);
          localStorage.removeItem("zm-lp-theme");
        }
      }
      if (saved === "dark" || saved === "light") {
        this.lpTheme = saved;
      } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
        this.lpTheme = "light";
      }
    }
    const qe = this.route.snapshot.queryParamMap.get("email");
    if (qe?.trim())
      this.email = qe.trim();
    const qp = this.route.snapshot.queryParamMap.get("plan");
    if (qp?.trim())
      this.planKey = qp.trim();
    this.landingService.getLanding().subscribe({
      next: (d) => {
        this.diasTrial = d.trial_days ?? 14;
        this.planos = d.plans ?? [];
        this.carregandoPlanos = false;
        if (this.planos.length && !this.planos.some((p) => p.key === this.planKey)) {
          this.planKey = this.planos[0].key;
        }
      },
      error: () => {
        this.diasTrial = 14;
        this.planos = [];
        this.carregandoPlanos = false;
      }
    });
  }
  toggleLpTheme() {
    this.lpTheme = this.lpTheme === "dark" ? "light" : "dark";
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem("gestgo-lp-theme", this.lpTheme);
      localStorage.removeItem("zm-lp-theme");
    }
  }
  get progressPct() {
    if (this.showSuccessOverlay)
      return 100;
    return this.uiStep === 1 ? 33 : 66;
  }
  isPlanoGratis(plan) {
    return plan.value <= 0 || /grat/i.test(plan.name) || plan.key === "free";
  }
  selecionarPlano(key) {
    this.planKey = key;
  }
  billingDocDigits() {
    return (this.billingDocument || "").replace(/\D/g, "");
  }
  /** Alinhado à API: 11 (CPF) ou 14 (CNPJ) dígitos. */
  billingDocValid() {
    const d = this.billingDocDigits();
    return d.length === 11 || d.length === 14;
  }
  atualizarForcaSenha() {
    const p = this.password || "";
    let score = 0;
    if (p.length >= 8)
      score++;
    if (p.length >= 12)
      score++;
    if (/[A-Z]/.test(p) && /[a-z]/.test(p))
      score++;
    if (/[0-9]/.test(p))
      score++;
    if (/[^A-Za-z0-9]/.test(p))
      score++;
    this.forcaSenha = Math.min(4, score);
    const labels = ["", "Senha muito fraca", "Senha fraca", "Senha razo\xE1vel", "Senha forte"];
    this.labelForcaSenha = labels[this.forcaSenha] || "Use no m\xEDnimo 8 caracteres";
  }
  enviar() {
    this.estadoErro = false;
    this.mensagemErro = "";
    if (!this.planKey || !this.companyName?.trim() || !this.responsibleName?.trim() || !this.email?.trim() || !this.password || this.password !== this.passwordConfirmation || !this.acceptedTerms) {
      this.estadoErro = true;
      this.mensagemErro = "Preencha todos os campos obrigat\xF3rios, confirme a senha e aceite os termos.";
      return;
    }
    if (this.password.length < 8) {
      this.estadoErro = true;
      this.mensagemErro = "A senha deve ter no m\xEDnimo 8 caracteres.";
      return;
    }
    if (!this.billingDocValid()) {
      this.estadoErro = true;
      this.mensagemErro = "Informe um CPF (11 d\xEDgitos) ou CNPJ (14 d\xEDgitos) v\xE1lido para faturamento e emiss\xE3o do boleto.";
      return;
    }
    this.estadoCarregando = true;
    this.comeceService.store({
      company_name: this.companyName.trim(),
      responsible_name: this.responsibleName.trim(),
      email: this.email.trim(),
      billing_document: this.billingDocument.trim(),
      phone: this.phone.trim() || void 0,
      password: this.password,
      password_confirmation: this.passwordConfirmation,
      plan_key: this.planKey,
      accepted_terms: this.acceptedTerms
    }).subscribe({
      next: (data) => {
        this.auth.setSessionFromLoginData(data);
        this.estadoCarregando = false;
        this.uiStep = 2;
        if (isPlatformBrowser(this.platformId)) {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      },
      error: (err) => {
        this.estadoCarregando = false;
        this.estadoErro = true;
        let msg = err.error?.message;
        if (!msg && err.error?.errors) {
          msg = Object.values(err.error.errors).flat().join(" ");
        }
        this.mensagemErro = typeof msg === "string" && msg.trim() ? msg : "N\xE3o foi poss\xEDvel criar a conta. Tente novamente.";
      }
    });
  }
  finalizarConfiguracao() {
    this.showSuccessOverlay = true;
    if (isPlatformBrowser(this.platformId)) {
      window.setTimeout(() => void this.router.navigateByUrl(this.auth.getDefaultTenantPath()), 1600);
    }
  }
  static \u0275fac = function ComeceComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ComeceComponent)(\u0275\u0275directiveInject(PLATFORM_ID));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ComeceComponent, selectors: [["app-pagina-comece"]], decls: 155, vars: 29, consts: [[1, "comece-page"], [1, "grid-bg"], [1, "progress-bar"], [1, "success-screen"], [1, "success-check"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5"], ["points", "20 6 9 17 4 12"], [1, "success-h"], [1, "success-p"], [1, "nav-inner"], ["routerLink", "/", 1, "nav-logo"], [1, "logo-mark"], ["src", "assets/logo/logo.png", "alt", "Gestgo", "width", "24", "height", "24"], [1, "logo-name"], [1, "nav-right"], ["type", "button", "aria-label", "Alternar tema", 1, "theme-btn", 3, "click"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", 1, "i-moon"], ["d", "M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", 1, "i-sun"], ["cx", "12", "cy", "12", "r", "5"], ["x1", "12", "y1", "1", "x2", "12", "y2", "3"], ["x1", "12", "y1", "21", "x2", "12", "y2", "23"], ["x1", "4.22", "y1", "4.22", "x2", "5.64", "y2", "5.64"], ["x1", "18.36", "y1", "18.36", "x2", "19.78", "y2", "19.78"], ["x1", "1", "y1", "12", "x2", "3", "y2", "12"], ["x1", "21", "y1", "12", "x2", "23", "y2", "12"], ["x1", "4.22", "y1", "19.78", "x2", "5.64", "y2", "18.36"], ["x1", "18.36", "y1", "5.64", "x2", "19.78", "y2", "4.22"], ["routerLink", "/autenticacao", 1, "nav-login"], [1, "page"], [1, "main"], [1, "left"], [1, "left-eyebrow"], [1, "left-eyebrow-dot"], [1, "left-sub"], [1, "benefits"], [1, "benefit"], [1, "benefit-icon"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["d", "M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z"], ["points", "13 2 13 9 20 9"], [1, "benefit-title"], [1, "benefit-desc"], ["x", "3", "y", "11", "width", "18", "height", "11", "rx", "2"], ["d", "M7 11V7a5 5 0 0110 0v4"], ["d", "M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"], ["d", "M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"], ["d", "M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"], ["points", "7 10 12 15 17 10"], ["x1", "12", "y1", "15", "x2", "12", "y2", "3"], [1, "trust-pills"], [1, "trust-pill"], ["target", "_blank", "rel", "noopener noreferrer", 1, "wpp-strip", 3, "href"], ["aria-hidden", "true", 1, "wpp-icon"], ["viewBox", "0 0 24 24", "fill", "currentColor"], ["d", "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"], ["d", "M12 0C5.373 0 0 5.373 0 12c0 2.108.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"], [1, "wpp-text"], [1, "wpp-title"], [1, "wpp-sub"], [1, "wpp-btn"], [1, "right"], ["target", "_blank", "rel", "noopener noreferrer", 1, "wpp-strip", "wpp-strip--mobile", 3, "href"], [1, "stepper"], [1, "step-item"], [1, "step-circle"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "3"], [1, "step-line"], [1, "form-card"], [1, "form-title"], [1, "form-sub"], [1, "alert-err"], [3, "ngSubmit"], [1, "plan-selector"], [1, "plan-label"], [1, "req"], [1, "plans-loading"], [1, "form-row"], [1, "field"], ["for", "company_name", 1, "field-label"], ["id", "company_name", "type", "text", "name", "company_name", "placeholder", "Ex.: Studio Belle, Dr. Jo\xE3o Silva", "required", "", "autocomplete", "organization", 1, "fi", 3, "ngModelChange", "ngModel"], ["for", "responsible_name", 1, "field-label"], ["id", "responsible_name", "type", "text", "name", "responsible_name", "placeholder", "Ex.: Dr. Jo\xE3o Silva", "required", "", "autocomplete", "name", 1, "fi", 3, "ngModelChange", "ngModel"], ["for", "email", 1, "field-label"], ["id", "email", "type", "email", "name", "email", "placeholder", "voce@clinica.com.br", "required", "", "autocomplete", "email", 1, "fi", 3, "ngModelChange", "ngModel"], [1, "field-hint"], ["for", "billing_document", 1, "field-label"], ["id", "billing_document", "type", "text", "mask", "000.000.000-00||00.000.000/0000-00", "name", "billing_document", "placeholder", "000.000.000-00 ou 00.000.000/0001-00", "required", "", "autocomplete", "off", "inputmode", "numeric", 1, "fi", 3, "ngModelChange", "dropSpecialCharacters", "ngModel"], ["for", "phone", 1, "field-label"], ["id", "phone", "type", "tel", "mask", "(00) 0000-0000||(00) 00000-0000", "name", "phone", "placeholder", "(11) 99999-9999", "inputmode", "numeric", "autocomplete", "tel", 1, "fi", 3, "ngModelChange", "dropSpecialCharacters", "ngModel"], ["for", "password", 1, "field-label"], [1, "pw-wrap"], ["id", "password", "name", "password", "placeholder", "M\xEDnimo 8 caracteres", "required", "", "minlength", "8", "autocomplete", "new-password", 1, "fi", 3, "ngModelChange", "type", "ngModel"], ["type", "button", 1, "pw-toggle", 3, "click"], [1, "pw-strength"], [1, "pw-bar"], ["for", "password_confirmation", 1, "field-label"], ["id", "password_confirmation", "name", "password_confirmation", "placeholder", "Repita a senha", "required", "", "minlength", "8", "autocomplete", "new-password", 1, "fi", 3, "ngModelChange", "type", "ngModel"], ["for", "accepted_terms", 1, "check-row"], ["type", "checkbox", "id", "accepted_terms", "name", "accepted_terms", 1, "sr-only", 3, "ngModelChange", "ngModel"], ["aria-hidden", "true", 1, "check-box"], ["viewBox", "0 0 12 12", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5"], ["points", "2 6 5 9 10 3"], [1, "check-text"], ["routerLink", "/termos-de-uso", "target", "_blank", "rel", "noopener noreferrer", 3, "click"], ["routerLink", "/privacidade", "target", "_blank", "rel", "noopener noreferrer", 3, "click"], ["type", "submit", 1, "submit-btn", 3, "disabled"], [1, "form-bottom"], [1, "form-login"], ["routerLink", "/autenticacao"], [1, "form-secure"], ["type", "button", 1, "plan-option", 3, "selected"], ["type", "button", 1, "plan-option", 3, "click"], [1, "plan-radio"], [1, "plan-radio-inner"], [1, "plan-info"], [1, "plan-name"], [1, "plan-desc"], [1, "plan-price"], ["d", "M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"], ["x1", "1", "y1", "1", "x2", "23", "y2", "23"], ["d", "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"], ["cx", "12", "cy", "12", "r", "3"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", 1, "spinner"], ["d", "M21 12a9 9 0 11-18 0 9 9 0 0118 0z", "opacity", ".2"], ["d", "M21 12a9 9 0 00-9-9"], ["points", "13 17 18 12 13 7"], ["points", "6 17 11 12 6 7"], ["for", "esp", 1, "field-label"], ["id", "esp", "name", "esp", 1, "fi", 2, "cursor", "pointer", 3, "ngModelChange", "ngModel"], ["value", ""], ["value", "geral"], ["value", "estetica"], ["value", "odonto"], ["value", "psi"], ["value", "ped"], ["value", "vet"], ["value", "fisio"], ["value", "derma"], ["value", "oftalmo"], ["value", "outra"], ["for", "equipe", 1, "field-label"], ["id", "equipe", "name", "equipe", 1, "fi", 2, "cursor", "pointer", 3, "ngModelChange", "ngModel"], ["for", "origem", 1, "field-label"], ["id", "origem", "name", "origem", 1, "fi", 2, "cursor", "pointer", 3, "ngModelChange", "ngModel"], ["value", "ig"], ["value", "google"], ["value", "indica"], ["value", "in"], ["value", "outro"], ["type", "button", 1, "submit-btn", 3, "click"], ["routerLink", "/dashboard", 1, "form-login", 2, "font-size", "12px"]], template: function ComeceComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275element(1, "div", 1)(2, "div", 2);
      \u0275\u0275elementStart(3, "div", 3)(4, "div", 4);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(5, "svg", 5);
      \u0275\u0275element(6, "polyline", 6);
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(7, "h2", 7);
      \u0275\u0275text(8, "Conta criada com ");
      \u0275\u0275elementStart(9, "em");
      \u0275\u0275text(10, "sucesso!");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(11, "p", 8);
      \u0275\u0275text(12);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(13, "nav")(14, "div", 9)(15, "a", 10)(16, "div", 11);
      \u0275\u0275element(17, "img", 12);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(18, "span", 13);
      \u0275\u0275text(19, "Gestgo");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(20, "div", 14)(21, "button", 15);
      \u0275\u0275listener("click", function ComeceComponent_Template_button_click_21_listener() {
        return ctx.toggleLpTheme();
      });
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(22, "svg", 16);
      \u0275\u0275element(23, "path", 17);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "svg", 18);
      \u0275\u0275element(25, "circle", 19)(26, "line", 20)(27, "line", 21)(28, "line", 22)(29, "line", 23)(30, "line", 24)(31, "line", 25)(32, "line", 26)(33, "line", 27);
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(34, "a", 28);
      \u0275\u0275text(35, "Entrar");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(36, "div", 29)(37, "div", 30)(38, "div", 31)(39, "div", 32);
      \u0275\u0275element(40, "div", 33);
      \u0275\u0275text(41);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(42, "h1");
      \u0275\u0275text(43, "Comece com seu");
      \u0275\u0275element(44, "br");
      \u0275\u0275text(45, "neg\xF3cio ");
      \u0275\u0275elementStart(46, "em");
      \u0275\u0275text(47, "sem papel");
      \u0275\u0275elementEnd();
      \u0275\u0275element(48, "br");
      \u0275\u0275text(49, "agora mesmo.");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(50, "p", 34);
      \u0275\u0275text(51, " Fichas digitais, assinatura eletr\xF4nica e PDF autom\xE1tico \u2014 tudo no ");
      \u0275\u0275elementStart(52, "strong");
      \u0275\u0275text(53, "link da bio");
      \u0275\u0275elementEnd();
      \u0275\u0275text(54, " do seu neg\xF3cio. O cliente preenche antes de chegar. ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(55, "div", 35)(56, "div", 36)(57, "div", 37);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(58, "svg", 38);
      \u0275\u0275element(59, "path", 39)(60, "polyline", 40);
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(61, "div")(62, "div", 41);
      \u0275\u0275text(63, "86+ templates prontos");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(64, "div", 42);
      \u0275\u0275text(65, "Fichas de anamnese, termos e acompanhamentos para 11 especialidades, prontos para usar.");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(66, "div", 36)(67, "div", 37);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(68, "svg", 38);
      \u0275\u0275element(69, "rect", 43)(70, "path", 44);
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(71, "div")(72, "div", 41);
      \u0275\u0275text(73, "Assinatura digital com validade legal");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(74, "div", 42);
      \u0275\u0275text(75, "Assinatura com o dedo no celular. Conformidade LGPD e exig\xEAncias do conselho de classe desde o dia 1.");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(76, "div", 36)(77, "div", 37);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(78, "svg", 38);
      \u0275\u0275element(79, "path", 45)(80, "path", 46);
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(81, "div")(82, "div", 41);
      \u0275\u0275text(83, "Link na bio que substitui o Linktree");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(84, "div", 42);
      \u0275\u0275text(85, "P\xE1gina p\xFAblica profissional com v\xE1rios modelos de layout \u2014 muito mais que um simples link na bio.");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(86, "div", 36)(87, "div", 37);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(88, "svg", 38);
      \u0275\u0275element(89, "path", 47)(90, "polyline", 48)(91, "line", 49);
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(92, "div")(93, "div", 41);
      \u0275\u0275text(94, "PDF autom\xE1tico a cada resposta");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(95, "div", 42);
      \u0275\u0275text(96, "Cada ficha preenchida gera um PDF formatado. Zero digita\xE7\xE3o, zero formata\xE7\xE3o manual.");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(97, "div", 50)(98, "span", 51);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(99, "svg", 5);
      \u0275\u0275element(100, "polyline", 6);
      \u0275\u0275elementEnd();
      \u0275\u0275text(101);
      \u0275\u0275elementEnd();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(102, "span", 51);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(103, "svg", 5);
      \u0275\u0275element(104, "polyline", 6);
      \u0275\u0275elementEnd();
      \u0275\u0275text(105, "Sem cart\xE3o de cr\xE9dito");
      \u0275\u0275elementEnd();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(106, "span", 51);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(107, "svg", 5);
      \u0275\u0275element(108, "polyline", 6);
      \u0275\u0275elementEnd();
      \u0275\u0275text(109, "Acesso imediato");
      \u0275\u0275elementEnd();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(110, "span", 51);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(111, "svg", 5);
      \u0275\u0275element(112, "polyline", 6);
      \u0275\u0275elementEnd();
      \u0275\u0275text(113, "Cancele quando quiser");
      \u0275\u0275elementEnd();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(114, "span", 51);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(115, "svg", 5);
      \u0275\u0275element(116, "polyline", 6);
      \u0275\u0275elementEnd();
      \u0275\u0275text(117, "100% LGPD");
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(118, "a", 52)(119, "div", 53);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(120, "svg", 54);
      \u0275\u0275element(121, "path", 55)(122, "path", 56);
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(123, "div", 57)(124, "div", 58);
      \u0275\u0275text(125, "Prefere falar por WhatsApp?");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(126, "div", 59);
      \u0275\u0275text(127, "D\xFAvidas ou quer ajuda no cadastro? Fale com a equipe.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(128, "span", 60);
      \u0275\u0275text(129, "Falar agora");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(130, "div", 61);
      \u0275\u0275conditionalCreate(131, ComeceComponent_Conditional_131_Template, 12, 1, "a", 62);
      \u0275\u0275elementStart(132, "div", 63)(133, "div", 64)(134, "div", 65);
      \u0275\u0275conditionalCreate(135, ComeceComponent_Conditional_135_Template, 2, 0, ":svg:svg", 66)(136, ComeceComponent_Conditional_136_Template, 1, 0);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(137, "span");
      \u0275\u0275text(138, "Cadastro");
      \u0275\u0275elementEnd()();
      \u0275\u0275element(139, "div", 67);
      \u0275\u0275elementStart(140, "div", 64)(141, "div", 65);
      \u0275\u0275conditionalCreate(142, ComeceComponent_Conditional_142_Template, 2, 0, ":svg:svg", 66)(143, ComeceComponent_Conditional_143_Template, 1, 0);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(144, "span");
      \u0275\u0275text(145, "Configura\xE7\xE3o");
      \u0275\u0275elementEnd()();
      \u0275\u0275element(146, "div", 67);
      \u0275\u0275elementStart(147, "div", 64)(148, "div", 65);
      \u0275\u0275conditionalCreate(149, ComeceComponent_Conditional_149_Template, 2, 0, ":svg:svg", 66)(150, ComeceComponent_Conditional_150_Template, 1, 0);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(151, "span");
      \u0275\u0275text(152, "Pronto!");
      \u0275\u0275elementEnd()()();
      \u0275\u0275conditionalCreate(153, ComeceComponent_Conditional_153_Template, 104, 32, "div", 68);
      \u0275\u0275conditionalCreate(154, ComeceComponent_Conditional_154_Template, 67, 3, "div", 68);
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275attribute("data-theme", ctx.lpTheme);
      \u0275\u0275advance(2);
      \u0275\u0275styleProp("width", ctx.progressPct, "%");
      \u0275\u0275advance();
      \u0275\u0275classProp("show", ctx.showSuccessOverlay);
      \u0275\u0275advance(9);
      \u0275\u0275textInterpolate1("Seu per\xEDodo de teste de ", ctx.diasTrial, " dias come\xE7a agora. Redirecionando para o painel\u2026");
      \u0275\u0275advance(29);
      \u0275\u0275textInterpolate1(" ", ctx.diasTrial, " dias gr\xE1tis \xB7 Sem cart\xE3o ");
      \u0275\u0275advance(60);
      \u0275\u0275textInterpolate1("", ctx.diasTrial, " dias gr\xE1tis");
      \u0275\u0275advance(17);
      \u0275\u0275property("href", ctx.waCadastroUrl, \u0275\u0275sanitizeUrl);
      \u0275\u0275advance(13);
      \u0275\u0275conditional(ctx.uiStep === 1 ? 131 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275classProp("active", ctx.uiStep === 1)("done", ctx.uiStep >= 2);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.uiStep >= 2 ? 135 : 136);
      \u0275\u0275advance(4);
      \u0275\u0275classProp("done", ctx.uiStep >= 2);
      \u0275\u0275advance();
      \u0275\u0275classProp("active", ctx.uiStep === 2 && !ctx.showSuccessOverlay)("done", ctx.showSuccessOverlay);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.showSuccessOverlay ? 142 : 143);
      \u0275\u0275advance(4);
      \u0275\u0275classProp("done", ctx.showSuccessOverlay);
      \u0275\u0275advance();
      \u0275\u0275classProp("active", ctx.showSuccessOverlay);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.showSuccessOverlay ? 149 : 150);
      \u0275\u0275advance(4);
      \u0275\u0275conditional(ctx.uiStep === 1 ? 153 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.uiStep === 2 ? 154 : -1);
    }
  }, dependencies: [CommonModule, RouterLink, FormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, CheckboxControlValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, MinLengthValidator, NgModel, NgForm, NgxMaskDirective, DecimalPipe], styles: ['\n\n[_nghost-%COMP%] {\n  display: block;\n}\n.comece-page[_ngcontent-%COMP%]   .sr-only[_ngcontent-%COMP%] {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  border: 0;\n}\n.comece-page[_ngcontent-%COMP%] {\n  --sans:\n    "Geist",\n    system-ui,\n    sans-serif;\n  font-family: var(--sans);\n  background: var(--bg);\n  color: var(--text);\n  line-height: 1.6;\n  min-height: 100vh;\n  position: relative;\n  transition: background 0.25s, color 0.25s;\n}\n.comece-page[data-theme=dark][_ngcontent-%COMP%] {\n  --bg: #09090b;\n  --bg2: #111113;\n  --bg3: #18181b;\n  --surface: #111113;\n  --border: rgba(255, 255, 255, 0.07);\n  --border2: rgba(255, 255, 255, 0.13);\n  --border3: rgba(255, 255, 255, 0.22);\n  --text: #fafafa;\n  --text2: #a1a1aa;\n  --text3: #52525b;\n  --input-bg: #18181b;\n  --input-border: rgba(255, 255, 255, 0.1);\n  --nav-bg: rgba(9, 9, 11, 0.9);\n  --card: rgba(255, 255, 255, 0.03);\n  --brand: #3b82f6;\n  --brand-dark: #1d4ed8;\n  --brand-bg: rgba(59, 130, 246, 0.12);\n  --brand-bd: rgba(59, 130, 246, 0.28);\n  --wpp-strip-bg: rgba(22, 163, 74, 0.12);\n  --wpp-strip-border: rgba(34, 197, 94, 0.28);\n}\n.comece-page[data-theme=light][_ngcontent-%COMP%] {\n  --bg: #ffffff;\n  --bg2: #f8f8fa;\n  --bg3: #f1f1f5;\n  --surface: #ffffff;\n  --border: rgba(0, 0, 0, 0.07);\n  --border2: rgba(0, 0, 0, 0.12);\n  --border3: rgba(0, 0, 0, 0.2);\n  --text: #09090b;\n  --text2: #52525b;\n  --text3: #a1a1aa;\n  --input-bg: #ffffff;\n  --input-border: rgba(0, 0, 0, 0.12);\n  --nav-bg: rgba(255, 255, 255, 0.92);\n  --card: rgba(0, 0, 0, 0.02);\n  --brand: #1d4ed8;\n  --brand-dark: #1e40af;\n  --brand-bg: rgba(29, 78, 216, 0.1);\n  --brand-bd: rgba(30, 64, 175, 0.22);\n  --wpp-strip-bg: #ecfdf5;\n  --wpp-strip-border: rgba(34, 197, 94, 0.35);\n}\n.comece-page[_ngcontent-%COMP%]   *[_ngcontent-%COMP%], \n.comece-page[_ngcontent-%COMP%]   *[_ngcontent-%COMP%]::before, \n.comece-page[_ngcontent-%COMP%]   *[_ngcontent-%COMP%]::after {\n  box-sizing: border-box;\n}\n.comece-page[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: inherit;\n  text-decoration: none;\n}\n.comece-page[_ngcontent-%COMP%]   .grid-bg[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: 0;\n  pointer-events: none;\n  background-image:\n    linear-gradient(var(--border) 1px, transparent 1px),\n    linear-gradient(\n      90deg,\n      var(--border) 1px,\n      transparent 1px);\n  background-size: 48px 48px;\n  -webkit-mask-image:\n    radial-gradient(\n      ellipse 60% 50% at 50% 0%,\n      black 30%,\n      transparent 100%);\n  mask-image:\n    radial-gradient(\n      ellipse 60% 50% at 50% 0%,\n      black 30%,\n      transparent 100%);\n}\n.comece-page[_ngcontent-%COMP%]   .progress-bar[_ngcontent-%COMP%] {\n  height: 3px;\n  background: var(--brand);\n  position: fixed;\n  top: 58px;\n  left: 0;\n  z-index: 99;\n  transition: width 0.4s ease;\n}\n.comece-page[_ngcontent-%COMP%]   nav[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  z-index: 100;\n  -webkit-backdrop-filter: blur(20px);\n  backdrop-filter: blur(20px);\n  background: var(--nav-bg);\n  border-bottom: 1px solid var(--border);\n  transition: background 0.25s, border-color 0.25s;\n}\n.comece-page[_ngcontent-%COMP%]   .nav-inner[_ngcontent-%COMP%] {\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 0 24px;\n  height: 58px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n.comece-page[_ngcontent-%COMP%]   .nav-logo[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 9px;\n}\n.comece-page[_ngcontent-%COMP%]   .logo-mark[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  border-radius: 8px;\n  background: var(--brand);\n  border: 1px solid rgba(255, 255, 255, 0.22);\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.12);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  overflow: hidden;\n  padding: 4px;\n}\n.comece-page[data-theme=light][_ngcontent-%COMP%]   .logo-mark[_ngcontent-%COMP%] {\n  border-color: rgba(30, 64, 175, 0.35);\n}\n.comece-page[_ngcontent-%COMP%]   .logo-mark[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: contain;\n}\n.comece-page[_ngcontent-%COMP%]   .logo-name[_ngcontent-%COMP%] {\n  font-size: 15px;\n  font-weight: 700;\n  letter-spacing: -0.4px;\n}\n.comece-page[_ngcontent-%COMP%]   .nav-right[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.comece-page[_ngcontent-%COMP%]   .theme-btn[_ngcontent-%COMP%] {\n  width: 34px;\n  height: 34px;\n  border-radius: 8px;\n  border: 1px solid var(--border2);\n  background: transparent;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: var(--text2);\n  transition: all 0.15s;\n}\n.comece-page[_ngcontent-%COMP%]   .theme-btn[_ngcontent-%COMP%]:hover {\n  background: var(--bg3);\n  color: var(--text);\n}\n.comece-page[_ngcontent-%COMP%]   .theme-btn[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 15px;\n  height: 15px;\n}\n.comece-page[_ngcontent-%COMP%]   .i-sun[_ngcontent-%COMP%] {\n  display: none;\n}\n.comece-page[_ngcontent-%COMP%]   .i-moon[_ngcontent-%COMP%] {\n  display: block;\n}\n.comece-page[data-theme=light][_ngcontent-%COMP%]   .i-sun[_ngcontent-%COMP%] {\n  display: block;\n}\n.comece-page[data-theme=light][_ngcontent-%COMP%]   .i-moon[_ngcontent-%COMP%] {\n  display: none;\n}\n.comece-page[_ngcontent-%COMP%]   a.nav-login[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text2);\n  padding: 7px 16px;\n  border-radius: 8px;\n  border: 1px solid var(--border2);\n  transition: all 0.15s;\n}\n.comece-page[_ngcontent-%COMP%]   a.nav-login[_ngcontent-%COMP%]:hover {\n  color: var(--text);\n  border-color: var(--border3);\n}\n.comece-page[_ngcontent-%COMP%]   .page[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  padding-top: 58px;\n  min-height: 100vh;\n  display: flex;\n  flex-direction: column;\n}\n.comece-page[_ngcontent-%COMP%]   .main[_ngcontent-%COMP%] {\n  flex: 1;\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  max-width: 1200px;\n  margin: 0 auto;\n  width: 100%;\n  padding: 0;\n}\n.comece-page[_ngcontent-%COMP%]   .left[_ngcontent-%COMP%] {\n  padding: 56px 56px 56px 48px;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  border-right: 1px solid var(--border);\n  transition: border-color 0.25s;\n}\n.comece-page[_ngcontent-%COMP%]   .left-eyebrow[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 7px;\n  font-size: 11px;\n  font-weight: 700;\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n  color: var(--brand);\n  margin-bottom: 20px;\n}\n.comece-page[_ngcontent-%COMP%]   .left-eyebrow-dot[_ngcontent-%COMP%] {\n  width: 5px;\n  height: 5px;\n  border-radius: 50%;\n  background: var(--brand);\n}\n.comece-page[_ngcontent-%COMP%]   .left[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: clamp(28px, 3vw, 40px);\n  font-weight: 700;\n  letter-spacing: -0.03em;\n  line-height: 1.1;\n  margin-bottom: 14px;\n}\n.comece-page[_ngcontent-%COMP%]   .left[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]   em[_ngcontent-%COMP%] {\n  font-family: inherit;\n  font-style: normal;\n  font-weight: 700;\n  color: var(--brand);\n}\n.comece-page[_ngcontent-%COMP%]   .left-sub[_ngcontent-%COMP%] {\n  font-size: 15px;\n  color: var(--text2);\n  line-height: 1.65;\n  max-width: 400px;\n  margin-bottom: 36px;\n}\n.comece-page[_ngcontent-%COMP%]   .left-sub[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: var(--text);\n  font-weight: 500;\n}\n.comece-page[_ngcontent-%COMP%]   .benefits[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n  margin-bottom: 36px;\n}\n.comece-page[_ngcontent-%COMP%]   .benefit[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 12px;\n}\n.comece-page[_ngcontent-%COMP%]   .benefit-icon[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  border-radius: 8px;\n  background: var(--brand-bg);\n  border: 1px solid var(--brand-bd);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n  margin-top: 1px;\n}\n.comece-page[_ngcontent-%COMP%]   .benefit-icon[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 15px;\n  height: 15px;\n  color: var(--brand);\n}\n.comece-page[_ngcontent-%COMP%]   .benefit-title[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 600;\n  margin-bottom: 2px;\n}\n.comece-page[_ngcontent-%COMP%]   .benefit-desc[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text2);\n  line-height: 1.5;\n}\n.comece-page[_ngcontent-%COMP%]   .trust-pills[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n  margin-bottom: 32px;\n}\n.comece-page[_ngcontent-%COMP%]   .trust-pill[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 5px;\n  font-size: 12px;\n  font-weight: 500;\n  color: var(--text2);\n  padding: 5px 12px;\n  border-radius: 20px;\n  border: 1px solid var(--border2);\n  background: var(--card);\n}\n.comece-page[_ngcontent-%COMP%]   .trust-pill[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 13px;\n  height: 13px;\n  color: var(--brand);\n  flex-shrink: 0;\n}\n.comece-page[_ngcontent-%COMP%]   .wpp-strip[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 16px 18px;\n  border-radius: 12px;\n  border: 1px solid var(--wpp-strip-border);\n  background: var(--wpp-strip-bg);\n  text-decoration: none;\n  color: inherit;\n  transition: border-color 0.15s, background 0.15s;\n}\n.comece-page[_ngcontent-%COMP%]   .wpp-strip[_ngcontent-%COMP%]:hover {\n  border-color: #22c55e;\n  filter: brightness(1.02);\n}\n.comece-page[_ngcontent-%COMP%]   .wpp-icon[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  border-radius: 50%;\n  background: #22c55e;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n  box-shadow: 0 2px 8px rgba(34, 197, 94, 0.35);\n}\n.comece-page[_ngcontent-%COMP%]   .wpp-icon[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 22px;\n  height: 22px;\n  color: #fff;\n}\n.comece-page[_ngcontent-%COMP%]   .wpp-text[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n.comece-page[_ngcontent-%COMP%]   .wpp-title[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 700;\n  color: var(--text);\n  letter-spacing: -0.02em;\n}\n.comece-page[_ngcontent-%COMP%]   .wpp-sub[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--text2);\n  margin-top: 2px;\n  line-height: 1.45;\n}\n.comece-page[_ngcontent-%COMP%]   .wpp-btn[_ngcontent-%COMP%] {\n  padding: 9px 18px;\n  border-radius: 999px;\n  background: #22c55e;\n  color: #fff;\n  font-size: 13px;\n  font-weight: 700;\n  font-family: var(--sans);\n  border: none;\n  cursor: pointer;\n  white-space: nowrap;\n  flex-shrink: 0;\n  transition: background 0.15s;\n  box-shadow: 0 2px 6px rgba(34, 197, 94, 0.35);\n}\n.comece-page[_ngcontent-%COMP%]   .wpp-btn[_ngcontent-%COMP%]:hover {\n  background: #16a34a;\n}\n.comece-page[_ngcontent-%COMP%]   .right[_ngcontent-%COMP%] {\n  padding: 40px 48px 56px;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n}\n.comece-page[_ngcontent-%COMP%]   .stepper[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0;\n  margin-bottom: 36px;\n}\n.comece-page[_ngcontent-%COMP%]   .step-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 13px;\n  font-weight: 500;\n  color: var(--text3);\n}\n.comece-page[_ngcontent-%COMP%]   .step-item.active[_ngcontent-%COMP%] {\n  color: var(--text);\n}\n.comece-page[_ngcontent-%COMP%]   .step-item.done[_ngcontent-%COMP%] {\n  color: var(--brand);\n}\n.comece-page[_ngcontent-%COMP%]   .step-circle[_ngcontent-%COMP%] {\n  width: 26px;\n  height: 26px;\n  border-radius: 50%;\n  border: 1.5px solid var(--border2);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 11px;\n  font-weight: 700;\n  flex-shrink: 0;\n  transition: all 0.2s;\n}\n.comece-page[_ngcontent-%COMP%]   .step-item.active[_ngcontent-%COMP%]   .step-circle[_ngcontent-%COMP%] {\n  background: var(--brand);\n  border-color: var(--brand);\n  color: #fff;\n}\n.comece-page[_ngcontent-%COMP%]   .step-item.done[_ngcontent-%COMP%]   .step-circle[_ngcontent-%COMP%] {\n  background: var(--brand);\n  border-color: var(--brand);\n  color: #fff;\n}\n.comece-page[_ngcontent-%COMP%]   .step-circle[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 12px;\n  height: 12px;\n}\n.comece-page[_ngcontent-%COMP%]   .step-line[_ngcontent-%COMP%] {\n  flex: 1;\n  height: 1px;\n  background: var(--border);\n  margin: 0 12px;\n  min-width: 12px;\n}\n.comece-page[_ngcontent-%COMP%]   .step-line.done[_ngcontent-%COMP%] {\n  background: var(--brand);\n}\n.comece-page[_ngcontent-%COMP%]   .form-card[_ngcontent-%COMP%] {\n  background: var(--surface);\n  border: 1px solid var(--border2);\n  border-radius: 16px;\n  padding: 32px;\n  transition: background 0.25s, border-color 0.25s;\n}\n.comece-page[_ngcontent-%COMP%]   .form-title[_ngcontent-%COMP%] {\n  font-size: 20px;\n  font-weight: 700;\n  letter-spacing: -0.02em;\n  margin-bottom: 4px;\n}\n.comece-page[_ngcontent-%COMP%]   .form-sub[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text2);\n  margin-bottom: 28px;\n}\n.comece-page[_ngcontent-%COMP%]   .plan-selector[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n}\n.comece-page[_ngcontent-%COMP%]   .plan-label[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 600;\n  margin-bottom: 10px;\n  display: flex;\n  align-items: center;\n  gap: 4px;\n}\n.comece-page[_ngcontent-%COMP%]   .req[_ngcontent-%COMP%] {\n  color: var(--brand);\n}\n.comece-page[_ngcontent-%COMP%]   .plan-option[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 14px 16px;\n  border-radius: 12px;\n  border: 1.5px solid var(--border);\n  background: transparent;\n  cursor: pointer;\n  transition: all 0.15s;\n  margin-bottom: 8px;\n  width: 100%;\n  text-align: left;\n  font: inherit;\n  color: inherit;\n}\n.comece-page[_ngcontent-%COMP%]   .plan-option.selected[_ngcontent-%COMP%] {\n  border-color: var(--brand);\n  background: var(--brand-bg);\n}\n.comece-page[_ngcontent-%COMP%]   .plan-option[_ngcontent-%COMP%]:hover:not(.selected) {\n  border-color: var(--border2);\n}\n.comece-page[_ngcontent-%COMP%]   .plan-radio[_ngcontent-%COMP%] {\n  width: 18px;\n  height: 18px;\n  border-radius: 50%;\n  border: 2px solid var(--border2);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n  transition: border-color 0.15s;\n}\n.comece-page[_ngcontent-%COMP%]   .plan-option.selected[_ngcontent-%COMP%]   .plan-radio[_ngcontent-%COMP%] {\n  border-color: var(--brand);\n}\n.comece-page[_ngcontent-%COMP%]   .plan-radio-inner[_ngcontent-%COMP%] {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  background: var(--brand);\n  opacity: 0;\n  transform: scale(0);\n  transition: opacity 0.15s, transform 0.15s;\n}\n.comece-page[_ngcontent-%COMP%]   .plan-option.selected[_ngcontent-%COMP%]   .plan-radio-inner[_ngcontent-%COMP%] {\n  opacity: 1;\n  transform: scale(1);\n}\n.comece-page[_ngcontent-%COMP%]   .plan-info[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n.comece-page[_ngcontent-%COMP%]   .plan-name[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 600;\n}\n.comece-page[_ngcontent-%COMP%]   .plan-desc[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--text2);\n  margin-top: 1px;\n}\n.comece-page[_ngcontent-%COMP%]   .plan-price[_ngcontent-%COMP%] {\n  font-size: 15px;\n  font-weight: 700;\n  color: var(--brand);\n  white-space: nowrap;\n}\n.comece-page[_ngcontent-%COMP%]   .plan-price[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 400;\n  color: var(--text3);\n}\n.comece-page[_ngcontent-%COMP%]   .form-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 12px;\n}\n.comece-page[_ngcontent-%COMP%]   .field[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.comece-page[_ngcontent-%COMP%]   .field-label[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 600;\n  margin-bottom: 6px;\n  display: flex;\n  align-items: center;\n  gap: 3px;\n}\n.comece-page[_ngcontent-%COMP%]   .field-hint[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: var(--text3);\n  margin-top: 4px;\n}\n.comece-page[_ngcontent-%COMP%]   .fi[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 11px 14px;\n  border-radius: 10px;\n  border: 1.5px solid var(--input-border);\n  background: var(--input-bg);\n  color: var(--text);\n  font-size: 14px;\n  font-family: var(--sans);\n  outline: none;\n  transition:\n    border-color 0.15s,\n    box-shadow 0.15s,\n    background 0.25s;\n}\n.comece-page[_ngcontent-%COMP%]   .fi[_ngcontent-%COMP%]::placeholder {\n  color: var(--text3);\n}\n.comece-page[_ngcontent-%COMP%]   .fi[_ngcontent-%COMP%]:focus {\n  border-color: var(--brand);\n  box-shadow: 0 0 0 3px var(--brand-bg);\n}\n.comece-page[_ngcontent-%COMP%]   .pw-wrap[_ngcontent-%COMP%] {\n  position: relative;\n}\n.comece-page[_ngcontent-%COMP%]   .pw-wrap[_ngcontent-%COMP%]   .fi[_ngcontent-%COMP%] {\n  padding-right: 42px;\n}\n.comece-page[_ngcontent-%COMP%]   .pw-toggle[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 12px;\n  top: 50%;\n  transform: translateY(-50%);\n  background: transparent;\n  border: none;\n  cursor: pointer;\n  color: var(--text3);\n  transition: color 0.15s;\n  padding: 4px;\n}\n.comece-page[_ngcontent-%COMP%]   .pw-toggle[_ngcontent-%COMP%]:hover {\n  color: var(--text2);\n}\n.comece-page[_ngcontent-%COMP%]   .pw-toggle[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 16px;\n  height: 16px;\n}\n.comece-page[_ngcontent-%COMP%]   .pw-strength[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 4px;\n  margin-top: 6px;\n}\n.comece-page[_ngcontent-%COMP%]   .pw-bar[_ngcontent-%COMP%] {\n  height: 3px;\n  border-radius: 2px;\n  flex: 1;\n  background: var(--border2);\n  transition: background 0.3s;\n}\n.comece-page[_ngcontent-%COMP%]   .pw-bar.on1[_ngcontent-%COMP%] {\n  background: #ef4444;\n}\n.comece-page[_ngcontent-%COMP%]   .pw-bar.on2[_ngcontent-%COMP%] {\n  background: #f59e0b;\n}\n.comece-page[_ngcontent-%COMP%]   .pw-bar.on3[_ngcontent-%COMP%] {\n  background: #eab308;\n}\n.comece-page[_ngcontent-%COMP%]   .pw-bar.on4[_ngcontent-%COMP%] {\n  background: var(--brand);\n}\n.comece-page[_ngcontent-%COMP%]   .check-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 10px;\n  margin-bottom: 20px;\n  cursor: pointer;\n}\n.comece-page[_ngcontent-%COMP%]   .check-box[_ngcontent-%COMP%] {\n  width: 18px;\n  height: 18px;\n  border-radius: 5px;\n  border: 1.5px solid var(--border2);\n  background: transparent;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n  margin-top: 1px;\n  transition: all 0.15s;\n  cursor: pointer;\n}\n.comece-page[_ngcontent-%COMP%]   .check-box.checked[_ngcontent-%COMP%] {\n  background: var(--brand);\n  border-color: var(--brand);\n}\n.comece-page[_ngcontent-%COMP%]   .check-box[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 11px;\n  height: 11px;\n  color: #fff;\n  opacity: 0;\n  transition: opacity 0.15s;\n}\n.comece-page[_ngcontent-%COMP%]   .check-box.checked[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  opacity: 1;\n}\n.comece-page[_ngcontent-%COMP%]   .check-text[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text2);\n  line-height: 1.5;\n}\n.comece-page[_ngcontent-%COMP%]   .check-text[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: var(--brand);\n  text-decoration: underline;\n  text-underline-offset: 2px;\n}\n.comece-page[_ngcontent-%COMP%]   .submit-btn[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 14px;\n  border-radius: 12px;\n  background: var(--brand);\n  color: #fff;\n  border: none;\n  font-size: 15px;\n  font-weight: 600;\n  font-family: var(--sans);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  transition: background 0.15s, transform 0.1s;\n}\n.comece-page[_ngcontent-%COMP%]   .submit-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: var(--brand-dark);\n}\n.comece-page[_ngcontent-%COMP%]   .submit-btn[_ngcontent-%COMP%]:active:not(:disabled) {\n  transform: scale(0.99);\n}\n.comece-page[_ngcontent-%COMP%]   .submit-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.comece-page[_ngcontent-%COMP%]   .submit-btn[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 15px;\n  height: 15px;\n}\n.comece-page[_ngcontent-%COMP%]   .form-bottom[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 8px;\n  margin-top: 16px;\n}\n.comece-page[_ngcontent-%COMP%]   .form-login[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text2);\n}\n.comece-page[_ngcontent-%COMP%]   .form-login[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: var(--brand);\n  font-weight: 500;\n}\n.comece-page[_ngcontent-%COMP%]   .form-secure[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 5px;\n  font-size: 11px;\n  color: var(--text3);\n}\n.comece-page[_ngcontent-%COMP%]   .form-secure[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 12px;\n  height: 12px;\n}\n.comece-page[_ngcontent-%COMP%]   .alert-err[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n  padding: 14px 16px;\n  border-radius: 12px;\n  border: 1px solid rgba(239, 68, 68, 0.35);\n  background: rgba(239, 68, 68, 0.1);\n  color: #f87171;\n  font-size: 13px;\n  line-height: 1.5;\n}\n.comece-page[data-theme=light][_ngcontent-%COMP%]   .alert-err[_ngcontent-%COMP%] {\n  color: #b91c1c;\n  background: rgba(254, 226, 226, 0.6);\n}\n.comece-page[_ngcontent-%COMP%]   .spinner[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_comece-spin 0.7s linear infinite;\n  width: 16px;\n  height: 16px;\n}\n@keyframes _ngcontent-%COMP%_comece-spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.comece-page[_ngcontent-%COMP%]   .success-screen[_ngcontent-%COMP%] {\n  display: none;\n  position: fixed;\n  inset: 0;\n  z-index: 200;\n  background: var(--bg);\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  text-align: center;\n  padding: 24px;\n}\n.comece-page[_ngcontent-%COMP%]   .success-screen.show[_ngcontent-%COMP%] {\n  display: flex;\n}\n@keyframes _ngcontent-%COMP%_comece-check-pop {\n  0% {\n    transform: scale(0) rotate(-20deg);\n  }\n  70% {\n    transform: scale(1.12) rotate(5deg);\n  }\n  100% {\n    transform: scale(1) rotate(0);\n  }\n}\n.comece-page[_ngcontent-%COMP%]   .success-check[_ngcontent-%COMP%] {\n  width: 72px;\n  height: 72px;\n  border-radius: 50%;\n  background: var(--brand);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin-bottom: 24px;\n  animation: _ngcontent-%COMP%_comece-check-pop 0.5s 0.1s ease both;\n}\n.comece-page[_ngcontent-%COMP%]   .success-check[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  color: #fff;\n}\n.comece-page[_ngcontent-%COMP%]   .success-h[_ngcontent-%COMP%] {\n  font-size: 28px;\n  font-weight: 700;\n  letter-spacing: -0.02em;\n  margin-bottom: 10px;\n}\n.comece-page[_ngcontent-%COMP%]   .success-h[_ngcontent-%COMP%]   em[_ngcontent-%COMP%] {\n  font-family: inherit;\n  font-style: normal;\n  font-weight: 700;\n  color: var(--brand);\n}\n.comece-page[_ngcontent-%COMP%]   .success-p[_ngcontent-%COMP%] {\n  font-size: 15px;\n  color: var(--text2);\n  max-width: 380px;\n  line-height: 1.6;\n}\n.comece-page[_ngcontent-%COMP%]   .plans-loading[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text3);\n  padding: 12px 0;\n}\n.comece-page[_ngcontent-%COMP%]   .wpp-strip--mobile[_ngcontent-%COMP%] {\n  display: none;\n  margin-bottom: 24px;\n}\n@media (max-width: 900px) {\n  .comece-page[_ngcontent-%COMP%]   .main[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .comece-page[_ngcontent-%COMP%]   .left[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .comece-page[_ngcontent-%COMP%]   .right[_ngcontent-%COMP%] {\n    padding: 32px 24px 56px;\n  }\n  .comece-page[_ngcontent-%COMP%]   .wpp-strip[_ngcontent-%COMP%] {\n    flex-wrap: wrap;\n  }\n  .comece-page[_ngcontent-%COMP%]   .wpp-btn[_ngcontent-%COMP%] {\n    width: 100%;\n    margin-top: 4px;\n  }\n  .comece-page[_ngcontent-%COMP%]   .wpp-strip--mobile[_ngcontent-%COMP%] {\n    display: flex;\n  }\n}\n@media (max-width: 500px) {\n  .comece-page[_ngcontent-%COMP%]   .form-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .comece-page[_ngcontent-%COMP%]   .stepper[_ngcontent-%COMP%] {\n    flex-wrap: wrap;\n    gap: 8px;\n  }\n  .comece-page[_ngcontent-%COMP%]   .step-line[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n/*# sourceMappingURL=comece.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ComeceComponent, [{
    type: Component,
    args: [{ selector: "app-pagina-comece", standalone: true, imports: [CommonModule, RouterLink, FormsModule, NgxMaskDirective], template: `<div class="comece-page" [attr.data-theme]="lpTheme">\r
  <div class="grid-bg"></div>\r
  <div class="progress-bar" [style.width.%]="progressPct"></div>\r
\r
  <div class="success-screen" [class.show]="showSuccessOverlay">\r
    <div class="success-check">\r
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>\r
    </div>\r
    <h2 class="success-h">Conta criada com <em>sucesso!</em></h2>\r
    <p class="success-p">Seu per\xEDodo de teste de {{ diasTrial }} dias come\xE7a agora. Redirecionando para o painel\u2026</p>\r
  </div>\r
\r
  <nav>\r
    <div class="nav-inner">\r
      <a routerLink="/" class="nav-logo">\r
        <div class="logo-mark">\r
          <img src="assets/logo/logo.png" alt="Gestgo" width="24" height="24" />\r
        </div>\r
        <span class="logo-name">Gestgo</span>\r
      </a>\r
      <div class="nav-right">\r
        <button type="button" class="theme-btn" (click)="toggleLpTheme()" aria-label="Alternar tema">\r
          <svg class="i-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>\r
          <svg class="i-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>\r
        </button>\r
        <a routerLink="/autenticacao" class="nav-login">Entrar</a>\r
      </div>\r
    </div>\r
  </nav>\r
\r
  <div class="page">\r
    <div class="main">\r
      <div class="left">\r
        <div class="left-eyebrow">\r
          <div class="left-eyebrow-dot"></div>\r
          {{ diasTrial }} dias gr\xE1tis \xB7 Sem cart\xE3o\r
        </div>\r
        <h1>Comece com seu<br />neg\xF3cio <em>sem papel</em><br />agora mesmo.</h1>\r
        <p class="left-sub">\r
          Fichas digitais, assinatura eletr\xF4nica e PDF autom\xE1tico \u2014 tudo no <strong>link da bio</strong> do seu neg\xF3cio. O cliente preenche antes de chegar.\r
        </p>\r
\r
        <div class="benefits">\r
          <div class="benefit">\r
            <div class="benefit-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z"/><polyline points="13 2 13 9 20 9"/></svg></div>\r
            <div>\r
              <div class="benefit-title">86+ templates prontos</div>\r
              <div class="benefit-desc">Fichas de anamnese, termos e acompanhamentos para 11 especialidades, prontos para usar.</div>\r
            </div>\r
          </div>\r
          <div class="benefit">\r
            <div class="benefit-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg></div>\r
            <div>\r
              <div class="benefit-title">Assinatura digital com validade legal</div>\r
              <div class="benefit-desc">Assinatura com o dedo no celular. Conformidade LGPD e exig\xEAncias do conselho de classe desde o dia 1.</div>\r
            </div>\r
          </div>\r
          <div class="benefit">\r
            <div class="benefit-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg></div>\r
            <div>\r
              <div class="benefit-title">Link na bio que substitui o Linktree</div>\r
              <div class="benefit-desc">P\xE1gina p\xFAblica profissional com v\xE1rios modelos de layout \u2014 muito mais que um simples link na bio.</div>\r
            </div>\r
          </div>\r
          <div class="benefit">\r
            <div class="benefit-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg></div>\r
            <div>\r
              <div class="benefit-title">PDF autom\xE1tico a cada resposta</div>\r
              <div class="benefit-desc">Cada ficha preenchida gera um PDF formatado. Zero digita\xE7\xE3o, zero formata\xE7\xE3o manual.</div>\r
            </div>\r
          </div>\r
        </div>\r
\r
        <div class="trust-pills">\r
          <span class="trust-pill"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>{{ diasTrial }} dias gr\xE1tis</span>\r
          <span class="trust-pill"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>Sem cart\xE3o de cr\xE9dito</span>\r
          <span class="trust-pill"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>Acesso imediato</span>\r
          <span class="trust-pill"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>Cancele quando quiser</span>\r
          <span class="trust-pill"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>100% LGPD</span>\r
        </div>\r
\r
        <a [href]="waCadastroUrl" target="_blank" rel="noopener noreferrer" class="wpp-strip">\r
          <div class="wpp-icon" aria-hidden="true">\r
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.108.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>\r
          </div>\r
          <div class="wpp-text">\r
            <div class="wpp-title">Prefere falar por WhatsApp?</div>\r
            <div class="wpp-sub">D\xFAvidas ou quer ajuda no cadastro? Fale com a equipe.</div>\r
          </div>\r
          <span class="wpp-btn">Falar agora</span>\r
        </a>\r
      </div>\r
\r
      <div class="right">\r
        @if (uiStep === 1) {\r
          <a [href]="waCadastroUrl" target="_blank" rel="noopener noreferrer" class="wpp-strip wpp-strip--mobile">\r
            <div class="wpp-icon" aria-hidden="true">\r
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.108.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>\r
            </div>\r
            <div class="wpp-text">\r
              <div class="wpp-title">Prefere falar por WhatsApp?</div>\r
              <div class="wpp-sub">D\xFAvidas ou ajuda no cadastro? Fale com a equipe.</div>\r
            </div>\r
            <span class="wpp-btn">Falar agora</span>\r
          </a>\r
        }\r
        <div class="stepper">\r
          <div class="step-item" [class.active]="uiStep === 1" [class.done]="uiStep >= 2">\r
            <div class="step-circle">\r
              @if (uiStep >= 2) {\r
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>\r
              } @else {\r
                1\r
              }\r
            </div>\r
            <span>Cadastro</span>\r
          </div>\r
          <div class="step-line" [class.done]="uiStep >= 2"></div>\r
          <div class="step-item" [class.active]="uiStep === 2 && !showSuccessOverlay" [class.done]="showSuccessOverlay">\r
            <div class="step-circle">\r
              @if (showSuccessOverlay) {\r
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>\r
              } @else {\r
                2\r
              }\r
            </div>\r
            <span>Configura\xE7\xE3o</span>\r
          </div>\r
          <div class="step-line" [class.done]="showSuccessOverlay"></div>\r
          <div class="step-item" [class.active]="showSuccessOverlay">\r
            <div class="step-circle">\r
              @if (showSuccessOverlay) {\r
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>\r
              } @else {\r
                3\r
              }\r
            </div>\r
            <span>Pronto!</span>\r
          </div>\r
        </div>\r
\r
        @if (uiStep === 1) {\r
          <div class="form-card">\r
            <div class="form-title">Criar conta</div>\r
            <div class="form-sub">Seu trial de {{ diasTrial }} dias come\xE7a imediatamente ap\xF3s o cadastro \u2014 sem cart\xE3o.</div>\r
\r
            @if (estadoErro) {\r
              <div class="alert-err">{{ mensagemErro }}</div>\r
            }\r
\r
            <form (ngSubmit)="enviar()">\r
              <div class="plan-selector">\r
                <div class="plan-label">Plano <span class="req">*</span></div>\r
                @if (carregandoPlanos) {\r
                  <p class="plans-loading">Carregando planos\u2026</p>\r
                } @else if (planos.length === 0) {\r
                  <p class="plans-loading">Nenhum plano dispon\xEDvel. Tente mais tarde ou fale pelo WhatsApp.</p>\r
                } @else {\r
                  @for (p of planos; track p.key) {\r
                    <button type="button" class="plan-option" [class.selected]="planKey === p.key" (click)="selecionarPlano(p.key)">\r
                      <div class="plan-radio"><div class="plan-radio-inner"></div></div>\r
                      <div class="plan-info">\r
                        <div class="plan-name">{{ p.name }}</div>\r
                        @if (p.description) {\r
                          <div class="plan-desc">{{ p.description }}</div>\r
                        }\r
                      </div>\r
                      <div class="plan-price">\r
                        @if (isPlanoGratis(p)) {\r
                          R$0<span>/m\xEAs</span>\r
                        } @else {\r
                          R$ {{ p.value | number: '1.0-0' : 'pt-BR' }}<span>/m\xEAs</span>\r
                        }\r
                      </div>\r
                    </button>\r
                  }\r
                }\r
              </div>\r
\r
              <div class="form-row">\r
                <div class="field">\r
                  <label class="field-label" for="company_name">Nome do neg\xF3cio <span class="req">*</span></label>\r
                  <input class="fi" id="company_name" type="text" [(ngModel)]="companyName" name="company_name" placeholder="Ex.: Studio Belle, Dr. Jo\xE3o Silva" required autocomplete="organization" />\r
                </div>\r
                <div class="field">\r
                  <label class="field-label" for="responsible_name">Seu nome <span class="req">*</span></label>\r
                  <input class="fi" id="responsible_name" type="text" [(ngModel)]="responsibleName" name="responsible_name" placeholder="Ex.: Dr. Jo\xE3o Silva" required autocomplete="name" />\r
                </div>\r
              </div>\r
\r
              <div class="field">\r
                <label class="field-label" for="email">E-mail <span class="req">*</span></label>\r
                <input class="fi" id="email" type="email" [(ngModel)]="email" name="email" placeholder="voce@clinica.com.br" required autocomplete="email" />\r
                <div class="field-hint">Usado para acesso, cobran\xE7a e comunica\xE7\xF5es importantes.</div>\r
              </div>\r
\r
              <div class="field">\r
                <label class="field-label" for="billing_document">CPF ou CNPJ <span class="req">*</span></label>\r
                <input\r
                  class="fi"\r
                  id="billing_document"\r
                  type="text"\r
                  mask="000.000.000-00||00.000.000/0000-00"\r
                  [dropSpecialCharacters]="true"\r
                  [(ngModel)]="billingDocument"\r
                  name="billing_document"\r
                  placeholder="000.000.000-00 ou 00.000.000/0001-00"\r
                  required\r
                  autocomplete="off"\r
                  inputmode="numeric"\r
                />\r
                <div class="field-hint">Documento da empresa ou do respons\xE1vel legal \u2014 necess\xE1rio para gerar a assinatura e o boleto no sistema de pagamento.</div>\r
              </div>\r
\r
              <div class="field">\r
                <label class="field-label" for="phone">WhatsApp</label>\r
                <input\r
                  class="fi"\r
                  id="phone"\r
                  type="tel"\r
                  mask="(00) 0000-0000||(00) 00000-0000"\r
                  [dropSpecialCharacters]="true"\r
                  [(ngModel)]="phone"\r
                  name="phone"\r
                  placeholder="(11) 99999-9999"\r
                  inputmode="numeric"\r
                  autocomplete="tel"\r
                />\r
                <div class="field-hint">Opcional \u2014 para suporte durante o onboarding.</div>\r
              </div>\r
\r
              <div class="form-row">\r
                <div class="field">\r
                  <label class="field-label" for="password">Senha <span class="req">*</span></label>\r
                  <div class="pw-wrap">\r
                    <input class="fi" [type]="mostrarSenha ? 'text' : 'password'" id="password" [(ngModel)]="password" (ngModelChange)="atualizarForcaSenha()" name="password" placeholder="M\xEDnimo 8 caracteres" required minlength="8" autocomplete="new-password" />\r
                    <button type="button" class="pw-toggle" (click)="mostrarSenha = !mostrarSenha" [attr.aria-label]="mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'">\r
                      @if (mostrarSenha) {\r
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>\r
                      } @else {\r
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>\r
                      }\r
                    </button>\r
                  </div>\r
                  <div class="pw-strength">\r
                    <div class="pw-bar" [class.on1]="forcaSenha >= 1"></div>\r
                    <div class="pw-bar" [class.on2]="forcaSenha >= 2"></div>\r
                    <div class="pw-bar" [class.on3]="forcaSenha >= 3"></div>\r
                    <div class="pw-bar" [class.on4]="forcaSenha >= 4"></div>\r
                  </div>\r
                  <div class="field-hint">{{ labelForcaSenha }}</div>\r
                </div>\r
                <div class="field">\r
                  <label class="field-label" for="password_confirmation">Confirmar senha <span class="req">*</span></label>\r
                  <div class="pw-wrap">\r
                    <input class="fi" [type]="mostrarSenhaConf ? 'text' : 'password'" id="password_confirmation" [(ngModel)]="passwordConfirmation" name="password_confirmation" placeholder="Repita a senha" required minlength="8" autocomplete="new-password" />\r
                    <button type="button" class="pw-toggle" (click)="mostrarSenhaConf = !mostrarSenhaConf" [attr.aria-label]="mostrarSenhaConf ? 'Ocultar senha' : 'Mostrar senha'">\r
                      @if (mostrarSenhaConf) {\r
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>\r
                      } @else {\r
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>\r
                      }\r
                    </button>\r
                  </div>\r
                </div>\r
              </div>\r
\r
              <label class="check-row" for="accepted_terms">\r
                <input type="checkbox" id="accepted_terms" [(ngModel)]="acceptedTerms" name="accepted_terms" class="sr-only" />\r
                <span class="check-box" [class.checked]="acceptedTerms" aria-hidden="true">\r
                  <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="2 6 5 9 10 3"/></svg>\r
                </span>\r
                <span class="check-text">\r
                  Li e concordo com os\r
                  <a routerLink="/termos-de-uso" target="_blank" rel="noopener noreferrer" (click)="$event.stopPropagation()">Termos de Uso</a>\r
                  e a\r
                  <a routerLink="/privacidade" target="_blank" rel="noopener noreferrer" (click)="$event.stopPropagation()">Pol\xEDtica de Privacidade</a>.\r
                </span>\r
              </label>\r
\r
              <button type="submit" class="submit-btn" [disabled]="estadoCarregando || carregandoPlanos || planos.length === 0">\r
                @if (estadoCarregando) {\r
                  <svg class="spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" opacity=".2"/><path d="M21 12a9 9 0 00-9-9"/></svg>\r
                  Criando conta\u2026\r
                } @else {\r
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="13 17 18 12 13 7"/><polyline points="6 17 11 12 6 7"/></svg>\r
                  Criar conta e iniciar trial\r
                }\r
              </button>\r
\r
              <div class="form-bottom">\r
                <div class="form-login">J\xE1 tem conta? <a routerLink="/autenticacao">Entrar</a></div>\r
                <div class="form-secure">\r
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>\r
                  Conex\xE3o segura \xB7 Dados criptografados\r
                </div>\r
              </div>\r
            </form>\r
          </div>\r
        }\r
\r
        @if (uiStep === 2) {\r
          <div class="form-card">\r
            <div class="form-title">Configura\xE7\xE3o inicial</div>\r
            <div class="form-sub">Conta criada! Agora vamos preparar seu perfil (opcional \u2014 voc\xEA pode ajustar depois no painel).</div>\r
\r
            <div class="field">\r
              <label class="field-label" for="esp">Especialidade principal</label>\r
              <select class="fi" id="esp" [(ngModel)]="especialidadePrincipal" name="esp" style="cursor: pointer">\r
                <option value="">Selecione sua especialidade</option>\r
                <option value="geral">Cl\xEDnica Geral</option>\r
                <option value="estetica">Est\xE9tica & Harmoniza\xE7\xE3o</option>\r
                <option value="odonto">Odontologia</option>\r
                <option value="psi">Psicologia & Psiquiatria</option>\r
                <option value="ped">Pediatria</option>\r
                <option value="vet">Veterin\xE1ria</option>\r
                <option value="fisio">Fisioterapia</option>\r
                <option value="derma">Dermatologia</option>\r
                <option value="oftalmo">Oftalmologia</option>\r
                <option value="outra">Outra</option>\r
              </select>\r
            </div>\r
\r
            <div class="field">\r
              <label class="field-label" for="equipe">Tamanho da equipe</label>\r
              <select class="fi" id="equipe" [(ngModel)]="tamanhoEquipe" name="equipe" style="cursor: pointer">\r
                <option>S\xF3 eu (profissional solo)</option>\r
                <option>2 a 5 profissionais</option>\r
                <option>6 a 20 profissionais</option>\r
                <option>Mais de 20</option>\r
              </select>\r
            </div>\r
\r
            <div class="field">\r
              <label class="field-label" for="origem">Como ficou sabendo do Gestgo?</label>\r
              <select class="fi" id="origem" [(ngModel)]="comoConheceu" name="origem" style="cursor: pointer">\r
                <option value="">Opcional</option>\r
                <option value="ig">Instagram</option>\r
                <option value="google">Google</option>\r
                <option value="indica">Indica\xE7\xE3o de colega</option>\r
                <option value="in">LinkedIn</option>\r
                <option value="outro">Outro</option>\r
              </select>\r
            </div>\r
\r
            <button type="button" class="submit-btn" (click)="finalizarConfiguracao()">\r
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="13 17 18 12 13 7"/><polyline points="6 17 11 12 6 7"/></svg>\r
              Ir para o painel\r
            </button>\r
\r
            <div class="form-bottom">\r
              <a routerLink="/dashboard" class="form-login" style="font-size: 12px">Pular e ir direto ao painel \u2192</a>\r
            </div>\r
          </div>\r
        }\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
`, styles: ['/* src/app/paginas/comece/comece.component.css */\n:host {\n  display: block;\n}\n.comece-page .sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  border: 0;\n}\n.comece-page {\n  --sans:\n    "Geist",\n    system-ui,\n    sans-serif;\n  font-family: var(--sans);\n  background: var(--bg);\n  color: var(--text);\n  line-height: 1.6;\n  min-height: 100vh;\n  position: relative;\n  transition: background 0.25s, color 0.25s;\n}\n.comece-page[data-theme=dark] {\n  --bg: #09090b;\n  --bg2: #111113;\n  --bg3: #18181b;\n  --surface: #111113;\n  --border: rgba(255, 255, 255, 0.07);\n  --border2: rgba(255, 255, 255, 0.13);\n  --border3: rgba(255, 255, 255, 0.22);\n  --text: #fafafa;\n  --text2: #a1a1aa;\n  --text3: #52525b;\n  --input-bg: #18181b;\n  --input-border: rgba(255, 255, 255, 0.1);\n  --nav-bg: rgba(9, 9, 11, 0.9);\n  --card: rgba(255, 255, 255, 0.03);\n  --brand: #3b82f6;\n  --brand-dark: #1d4ed8;\n  --brand-bg: rgba(59, 130, 246, 0.12);\n  --brand-bd: rgba(59, 130, 246, 0.28);\n  --wpp-strip-bg: rgba(22, 163, 74, 0.12);\n  --wpp-strip-border: rgba(34, 197, 94, 0.28);\n}\n.comece-page[data-theme=light] {\n  --bg: #ffffff;\n  --bg2: #f8f8fa;\n  --bg3: #f1f1f5;\n  --surface: #ffffff;\n  --border: rgba(0, 0, 0, 0.07);\n  --border2: rgba(0, 0, 0, 0.12);\n  --border3: rgba(0, 0, 0, 0.2);\n  --text: #09090b;\n  --text2: #52525b;\n  --text3: #a1a1aa;\n  --input-bg: #ffffff;\n  --input-border: rgba(0, 0, 0, 0.12);\n  --nav-bg: rgba(255, 255, 255, 0.92);\n  --card: rgba(0, 0, 0, 0.02);\n  --brand: #1d4ed8;\n  --brand-dark: #1e40af;\n  --brand-bg: rgba(29, 78, 216, 0.1);\n  --brand-bd: rgba(30, 64, 175, 0.22);\n  --wpp-strip-bg: #ecfdf5;\n  --wpp-strip-border: rgba(34, 197, 94, 0.35);\n}\n.comece-page *,\n.comece-page *::before,\n.comece-page *::after {\n  box-sizing: border-box;\n}\n.comece-page a {\n  color: inherit;\n  text-decoration: none;\n}\n.comece-page .grid-bg {\n  position: fixed;\n  inset: 0;\n  z-index: 0;\n  pointer-events: none;\n  background-image:\n    linear-gradient(var(--border) 1px, transparent 1px),\n    linear-gradient(\n      90deg,\n      var(--border) 1px,\n      transparent 1px);\n  background-size: 48px 48px;\n  -webkit-mask-image:\n    radial-gradient(\n      ellipse 60% 50% at 50% 0%,\n      black 30%,\n      transparent 100%);\n  mask-image:\n    radial-gradient(\n      ellipse 60% 50% at 50% 0%,\n      black 30%,\n      transparent 100%);\n}\n.comece-page .progress-bar {\n  height: 3px;\n  background: var(--brand);\n  position: fixed;\n  top: 58px;\n  left: 0;\n  z-index: 99;\n  transition: width 0.4s ease;\n}\n.comece-page nav {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  z-index: 100;\n  -webkit-backdrop-filter: blur(20px);\n  backdrop-filter: blur(20px);\n  background: var(--nav-bg);\n  border-bottom: 1px solid var(--border);\n  transition: background 0.25s, border-color 0.25s;\n}\n.comece-page .nav-inner {\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 0 24px;\n  height: 58px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n.comece-page .nav-logo {\n  display: flex;\n  align-items: center;\n  gap: 9px;\n}\n.comece-page .logo-mark {\n  width: 32px;\n  height: 32px;\n  border-radius: 8px;\n  background: var(--brand);\n  border: 1px solid rgba(255, 255, 255, 0.22);\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.12);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  overflow: hidden;\n  padding: 4px;\n}\n.comece-page[data-theme=light] .logo-mark {\n  border-color: rgba(30, 64, 175, 0.35);\n}\n.comece-page .logo-mark img {\n  width: 100%;\n  height: 100%;\n  object-fit: contain;\n}\n.comece-page .logo-name {\n  font-size: 15px;\n  font-weight: 700;\n  letter-spacing: -0.4px;\n}\n.comece-page .nav-right {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.comece-page .theme-btn {\n  width: 34px;\n  height: 34px;\n  border-radius: 8px;\n  border: 1px solid var(--border2);\n  background: transparent;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: var(--text2);\n  transition: all 0.15s;\n}\n.comece-page .theme-btn:hover {\n  background: var(--bg3);\n  color: var(--text);\n}\n.comece-page .theme-btn svg {\n  width: 15px;\n  height: 15px;\n}\n.comece-page .i-sun {\n  display: none;\n}\n.comece-page .i-moon {\n  display: block;\n}\n.comece-page[data-theme=light] .i-sun {\n  display: block;\n}\n.comece-page[data-theme=light] .i-moon {\n  display: none;\n}\n.comece-page a.nav-login {\n  font-size: 13px;\n  color: var(--text2);\n  padding: 7px 16px;\n  border-radius: 8px;\n  border: 1px solid var(--border2);\n  transition: all 0.15s;\n}\n.comece-page a.nav-login:hover {\n  color: var(--text);\n  border-color: var(--border3);\n}\n.comece-page .page {\n  position: relative;\n  z-index: 1;\n  padding-top: 58px;\n  min-height: 100vh;\n  display: flex;\n  flex-direction: column;\n}\n.comece-page .main {\n  flex: 1;\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  max-width: 1200px;\n  margin: 0 auto;\n  width: 100%;\n  padding: 0;\n}\n.comece-page .left {\n  padding: 56px 56px 56px 48px;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  border-right: 1px solid var(--border);\n  transition: border-color 0.25s;\n}\n.comece-page .left-eyebrow {\n  display: inline-flex;\n  align-items: center;\n  gap: 7px;\n  font-size: 11px;\n  font-weight: 700;\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n  color: var(--brand);\n  margin-bottom: 20px;\n}\n.comece-page .left-eyebrow-dot {\n  width: 5px;\n  height: 5px;\n  border-radius: 50%;\n  background: var(--brand);\n}\n.comece-page .left h1 {\n  font-size: clamp(28px, 3vw, 40px);\n  font-weight: 700;\n  letter-spacing: -0.03em;\n  line-height: 1.1;\n  margin-bottom: 14px;\n}\n.comece-page .left h1 em {\n  font-family: inherit;\n  font-style: normal;\n  font-weight: 700;\n  color: var(--brand);\n}\n.comece-page .left-sub {\n  font-size: 15px;\n  color: var(--text2);\n  line-height: 1.65;\n  max-width: 400px;\n  margin-bottom: 36px;\n}\n.comece-page .left-sub strong {\n  color: var(--text);\n  font-weight: 500;\n}\n.comece-page .benefits {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n  margin-bottom: 36px;\n}\n.comece-page .benefit {\n  display: flex;\n  align-items: flex-start;\n  gap: 12px;\n}\n.comece-page .benefit-icon {\n  width: 32px;\n  height: 32px;\n  border-radius: 8px;\n  background: var(--brand-bg);\n  border: 1px solid var(--brand-bd);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n  margin-top: 1px;\n}\n.comece-page .benefit-icon svg {\n  width: 15px;\n  height: 15px;\n  color: var(--brand);\n}\n.comece-page .benefit-title {\n  font-size: 14px;\n  font-weight: 600;\n  margin-bottom: 2px;\n}\n.comece-page .benefit-desc {\n  font-size: 13px;\n  color: var(--text2);\n  line-height: 1.5;\n}\n.comece-page .trust-pills {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n  margin-bottom: 32px;\n}\n.comece-page .trust-pill {\n  display: inline-flex;\n  align-items: center;\n  gap: 5px;\n  font-size: 12px;\n  font-weight: 500;\n  color: var(--text2);\n  padding: 5px 12px;\n  border-radius: 20px;\n  border: 1px solid var(--border2);\n  background: var(--card);\n}\n.comece-page .trust-pill svg {\n  width: 13px;\n  height: 13px;\n  color: var(--brand);\n  flex-shrink: 0;\n}\n.comece-page .wpp-strip {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 16px 18px;\n  border-radius: 12px;\n  border: 1px solid var(--wpp-strip-border);\n  background: var(--wpp-strip-bg);\n  text-decoration: none;\n  color: inherit;\n  transition: border-color 0.15s, background 0.15s;\n}\n.comece-page .wpp-strip:hover {\n  border-color: #22c55e;\n  filter: brightness(1.02);\n}\n.comece-page .wpp-icon {\n  width: 44px;\n  height: 44px;\n  border-radius: 50%;\n  background: #22c55e;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n  box-shadow: 0 2px 8px rgba(34, 197, 94, 0.35);\n}\n.comece-page .wpp-icon svg {\n  width: 22px;\n  height: 22px;\n  color: #fff;\n}\n.comece-page .wpp-text {\n  flex: 1;\n  min-width: 0;\n}\n.comece-page .wpp-title {\n  font-size: 14px;\n  font-weight: 700;\n  color: var(--text);\n  letter-spacing: -0.02em;\n}\n.comece-page .wpp-sub {\n  font-size: 12px;\n  color: var(--text2);\n  margin-top: 2px;\n  line-height: 1.45;\n}\n.comece-page .wpp-btn {\n  padding: 9px 18px;\n  border-radius: 999px;\n  background: #22c55e;\n  color: #fff;\n  font-size: 13px;\n  font-weight: 700;\n  font-family: var(--sans);\n  border: none;\n  cursor: pointer;\n  white-space: nowrap;\n  flex-shrink: 0;\n  transition: background 0.15s;\n  box-shadow: 0 2px 6px rgba(34, 197, 94, 0.35);\n}\n.comece-page .wpp-btn:hover {\n  background: #16a34a;\n}\n.comece-page .right {\n  padding: 40px 48px 56px;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n}\n.comece-page .stepper {\n  display: flex;\n  align-items: center;\n  gap: 0;\n  margin-bottom: 36px;\n}\n.comece-page .step-item {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 13px;\n  font-weight: 500;\n  color: var(--text3);\n}\n.comece-page .step-item.active {\n  color: var(--text);\n}\n.comece-page .step-item.done {\n  color: var(--brand);\n}\n.comece-page .step-circle {\n  width: 26px;\n  height: 26px;\n  border-radius: 50%;\n  border: 1.5px solid var(--border2);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 11px;\n  font-weight: 700;\n  flex-shrink: 0;\n  transition: all 0.2s;\n}\n.comece-page .step-item.active .step-circle {\n  background: var(--brand);\n  border-color: var(--brand);\n  color: #fff;\n}\n.comece-page .step-item.done .step-circle {\n  background: var(--brand);\n  border-color: var(--brand);\n  color: #fff;\n}\n.comece-page .step-circle svg {\n  width: 12px;\n  height: 12px;\n}\n.comece-page .step-line {\n  flex: 1;\n  height: 1px;\n  background: var(--border);\n  margin: 0 12px;\n  min-width: 12px;\n}\n.comece-page .step-line.done {\n  background: var(--brand);\n}\n.comece-page .form-card {\n  background: var(--surface);\n  border: 1px solid var(--border2);\n  border-radius: 16px;\n  padding: 32px;\n  transition: background 0.25s, border-color 0.25s;\n}\n.comece-page .form-title {\n  font-size: 20px;\n  font-weight: 700;\n  letter-spacing: -0.02em;\n  margin-bottom: 4px;\n}\n.comece-page .form-sub {\n  font-size: 13px;\n  color: var(--text2);\n  margin-bottom: 28px;\n}\n.comece-page .plan-selector {\n  margin-bottom: 24px;\n}\n.comece-page .plan-label {\n  font-size: 13px;\n  font-weight: 600;\n  margin-bottom: 10px;\n  display: flex;\n  align-items: center;\n  gap: 4px;\n}\n.comece-page .req {\n  color: var(--brand);\n}\n.comece-page .plan-option {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 14px 16px;\n  border-radius: 12px;\n  border: 1.5px solid var(--border);\n  background: transparent;\n  cursor: pointer;\n  transition: all 0.15s;\n  margin-bottom: 8px;\n  width: 100%;\n  text-align: left;\n  font: inherit;\n  color: inherit;\n}\n.comece-page .plan-option.selected {\n  border-color: var(--brand);\n  background: var(--brand-bg);\n}\n.comece-page .plan-option:hover:not(.selected) {\n  border-color: var(--border2);\n}\n.comece-page .plan-radio {\n  width: 18px;\n  height: 18px;\n  border-radius: 50%;\n  border: 2px solid var(--border2);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n  transition: border-color 0.15s;\n}\n.comece-page .plan-option.selected .plan-radio {\n  border-color: var(--brand);\n}\n.comece-page .plan-radio-inner {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  background: var(--brand);\n  opacity: 0;\n  transform: scale(0);\n  transition: opacity 0.15s, transform 0.15s;\n}\n.comece-page .plan-option.selected .plan-radio-inner {\n  opacity: 1;\n  transform: scale(1);\n}\n.comece-page .plan-info {\n  flex: 1;\n  min-width: 0;\n}\n.comece-page .plan-name {\n  font-size: 14px;\n  font-weight: 600;\n}\n.comece-page .plan-desc {\n  font-size: 12px;\n  color: var(--text2);\n  margin-top: 1px;\n}\n.comece-page .plan-price {\n  font-size: 15px;\n  font-weight: 700;\n  color: var(--brand);\n  white-space: nowrap;\n}\n.comece-page .plan-price span {\n  font-size: 11px;\n  font-weight: 400;\n  color: var(--text3);\n}\n.comece-page .form-row {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 12px;\n}\n.comece-page .field {\n  margin-bottom: 16px;\n}\n.comece-page .field-label {\n  font-size: 13px;\n  font-weight: 600;\n  margin-bottom: 6px;\n  display: flex;\n  align-items: center;\n  gap: 3px;\n}\n.comece-page .field-hint {\n  font-size: 11px;\n  color: var(--text3);\n  margin-top: 4px;\n}\n.comece-page .fi {\n  width: 100%;\n  padding: 11px 14px;\n  border-radius: 10px;\n  border: 1.5px solid var(--input-border);\n  background: var(--input-bg);\n  color: var(--text);\n  font-size: 14px;\n  font-family: var(--sans);\n  outline: none;\n  transition:\n    border-color 0.15s,\n    box-shadow 0.15s,\n    background 0.25s;\n}\n.comece-page .fi::placeholder {\n  color: var(--text3);\n}\n.comece-page .fi:focus {\n  border-color: var(--brand);\n  box-shadow: 0 0 0 3px var(--brand-bg);\n}\n.comece-page .pw-wrap {\n  position: relative;\n}\n.comece-page .pw-wrap .fi {\n  padding-right: 42px;\n}\n.comece-page .pw-toggle {\n  position: absolute;\n  right: 12px;\n  top: 50%;\n  transform: translateY(-50%);\n  background: transparent;\n  border: none;\n  cursor: pointer;\n  color: var(--text3);\n  transition: color 0.15s;\n  padding: 4px;\n}\n.comece-page .pw-toggle:hover {\n  color: var(--text2);\n}\n.comece-page .pw-toggle svg {\n  width: 16px;\n  height: 16px;\n}\n.comece-page .pw-strength {\n  display: flex;\n  gap: 4px;\n  margin-top: 6px;\n}\n.comece-page .pw-bar {\n  height: 3px;\n  border-radius: 2px;\n  flex: 1;\n  background: var(--border2);\n  transition: background 0.3s;\n}\n.comece-page .pw-bar.on1 {\n  background: #ef4444;\n}\n.comece-page .pw-bar.on2 {\n  background: #f59e0b;\n}\n.comece-page .pw-bar.on3 {\n  background: #eab308;\n}\n.comece-page .pw-bar.on4 {\n  background: var(--brand);\n}\n.comece-page .check-row {\n  display: flex;\n  align-items: flex-start;\n  gap: 10px;\n  margin-bottom: 20px;\n  cursor: pointer;\n}\n.comece-page .check-box {\n  width: 18px;\n  height: 18px;\n  border-radius: 5px;\n  border: 1.5px solid var(--border2);\n  background: transparent;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n  margin-top: 1px;\n  transition: all 0.15s;\n  cursor: pointer;\n}\n.comece-page .check-box.checked {\n  background: var(--brand);\n  border-color: var(--brand);\n}\n.comece-page .check-box svg {\n  width: 11px;\n  height: 11px;\n  color: #fff;\n  opacity: 0;\n  transition: opacity 0.15s;\n}\n.comece-page .check-box.checked svg {\n  opacity: 1;\n}\n.comece-page .check-text {\n  font-size: 13px;\n  color: var(--text2);\n  line-height: 1.5;\n}\n.comece-page .check-text a {\n  color: var(--brand);\n  text-decoration: underline;\n  text-underline-offset: 2px;\n}\n.comece-page .submit-btn {\n  width: 100%;\n  padding: 14px;\n  border-radius: 12px;\n  background: var(--brand);\n  color: #fff;\n  border: none;\n  font-size: 15px;\n  font-weight: 600;\n  font-family: var(--sans);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  transition: background 0.15s, transform 0.1s;\n}\n.comece-page .submit-btn:hover:not(:disabled) {\n  background: var(--brand-dark);\n}\n.comece-page .submit-btn:active:not(:disabled) {\n  transform: scale(0.99);\n}\n.comece-page .submit-btn:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.comece-page .submit-btn svg {\n  width: 15px;\n  height: 15px;\n}\n.comece-page .form-bottom {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 8px;\n  margin-top: 16px;\n}\n.comece-page .form-login {\n  font-size: 13px;\n  color: var(--text2);\n}\n.comece-page .form-login a {\n  color: var(--brand);\n  font-weight: 500;\n}\n.comece-page .form-secure {\n  display: flex;\n  align-items: center;\n  gap: 5px;\n  font-size: 11px;\n  color: var(--text3);\n}\n.comece-page .form-secure svg {\n  width: 12px;\n  height: 12px;\n}\n.comece-page .alert-err {\n  margin-bottom: 20px;\n  padding: 14px 16px;\n  border-radius: 12px;\n  border: 1px solid rgba(239, 68, 68, 0.35);\n  background: rgba(239, 68, 68, 0.1);\n  color: #f87171;\n  font-size: 13px;\n  line-height: 1.5;\n}\n.comece-page[data-theme=light] .alert-err {\n  color: #b91c1c;\n  background: rgba(254, 226, 226, 0.6);\n}\n.comece-page .spinner {\n  animation: comece-spin 0.7s linear infinite;\n  width: 16px;\n  height: 16px;\n}\n@keyframes comece-spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.comece-page .success-screen {\n  display: none;\n  position: fixed;\n  inset: 0;\n  z-index: 200;\n  background: var(--bg);\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  text-align: center;\n  padding: 24px;\n}\n.comece-page .success-screen.show {\n  display: flex;\n}\n@keyframes comece-check-pop {\n  0% {\n    transform: scale(0) rotate(-20deg);\n  }\n  70% {\n    transform: scale(1.12) rotate(5deg);\n  }\n  100% {\n    transform: scale(1) rotate(0);\n  }\n}\n.comece-page .success-check {\n  width: 72px;\n  height: 72px;\n  border-radius: 50%;\n  background: var(--brand);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin-bottom: 24px;\n  animation: comece-check-pop 0.5s 0.1s ease both;\n}\n.comece-page .success-check svg {\n  width: 36px;\n  height: 36px;\n  color: #fff;\n}\n.comece-page .success-h {\n  font-size: 28px;\n  font-weight: 700;\n  letter-spacing: -0.02em;\n  margin-bottom: 10px;\n}\n.comece-page .success-h em {\n  font-family: inherit;\n  font-style: normal;\n  font-weight: 700;\n  color: var(--brand);\n}\n.comece-page .success-p {\n  font-size: 15px;\n  color: var(--text2);\n  max-width: 380px;\n  line-height: 1.6;\n}\n.comece-page .plans-loading {\n  font-size: 13px;\n  color: var(--text3);\n  padding: 12px 0;\n}\n.comece-page .wpp-strip--mobile {\n  display: none;\n  margin-bottom: 24px;\n}\n@media (max-width: 900px) {\n  .comece-page .main {\n    grid-template-columns: 1fr;\n  }\n  .comece-page .left {\n    display: none;\n  }\n  .comece-page .right {\n    padding: 32px 24px 56px;\n  }\n  .comece-page .wpp-strip {\n    flex-wrap: wrap;\n  }\n  .comece-page .wpp-btn {\n    width: 100%;\n    margin-top: 4px;\n  }\n  .comece-page .wpp-strip--mobile {\n    display: flex;\n  }\n}\n@media (max-width: 500px) {\n  .comece-page .form-row {\n    grid-template-columns: 1fr;\n  }\n  .comece-page .stepper {\n    flex-wrap: wrap;\n    gap: 8px;\n  }\n  .comece-page .step-line {\n    display: none;\n  }\n}\n/*# sourceMappingURL=comece.component.css.map */\n'] }]
  }], () => [{ type: void 0, decorators: [{
    type: Inject,
    args: [PLATFORM_ID]
  }] }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ComeceComponent, { className: "ComeceComponent", filePath: "src/app/paginas/comece/comece.component.ts", lineNumber: 18 });
})();
export {
  ComeceComponent
};
//# sourceMappingURL=chunk-3R34UGKU.js.map
