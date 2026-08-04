import {
  PlataformaService
} from "./chunk-YNOSNX2Z.js";
import {
  LoadingService,
  ZmSkeletonListComponent
} from "./chunk-GKI5AWTV.js";
import "./chunk-7WBHVE2H.js";
import {
  ToastService
} from "./chunk-EZUVP6MG.js";
import {
  DefaultValueAccessor,
  FormsModule,
  MaxLengthValidator,
  MaxValidator,
  MinValidator,
  NgControlStatus,
  NgControlStatusGroup,
  NgForm,
  NgModel,
  NgSelectOption,
  NumberValueAccessor,
  RequiredValidator,
  SelectControlValueAccessor,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption
} from "./chunk-USROZ7PW.js";
import {
  environment
} from "./chunk-IBJWGIJV.js";
import {
  CommonModule,
  Component,
  __spreadValues,
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
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
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

// src/app/paginas/plataforma/plataforma-configuracoes/plataforma-configuracoes.component.ts
function PlataformaConfiguracoesComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "zm-skeleton-list", 1);
  }
  if (rf & 2) {
    \u0275\u0275property("rows", 8);
  }
}
function PlataformaConfiguracoesComponent_Conditional_2_Template(rf, ctx) {
}
function PlataformaConfiguracoesComponent_Conditional_3_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 3);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.error);
  }
}
function PlataformaConfiguracoesComponent_Conditional_3_Conditional_51_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 28);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.successSettings);
  }
}
function PlataformaConfiguracoesComponent_Conditional_3_Conditional_53_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 30);
  }
}
function PlataformaConfiguracoesComponent_Conditional_3_Conditional_63_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 28);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.successStatus);
  }
}
function PlataformaConfiguracoesComponent_Conditional_3_For_100_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 50)(1, "span", 51);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "select", 52);
    \u0275\u0275twoWayListener("ngModelChange", function PlataformaConfiguracoesComponent_Conditional_3_For_100_Template_select_ngModelChange_3_listener($event) {
      const key_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.serviceComponents[key_r4], $event) || (ctx_r1.serviceComponents[key_r4] = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(4, "option", 35);
    \u0275\u0275text(5, "Operacional");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "option", 36);
    \u0275\u0275text(7, "Degradado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "option", 37);
    \u0275\u0275text(9, "Indispon\xEDvel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "option", 38);
    \u0275\u0275text(11, "Manuten\xE7\xE3o");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const key_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.componentOptions[key_r4]);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.serviceComponents[key_r4]);
    \u0275\u0275property("name", "comp_" + key_r4);
  }
}
function PlataformaConfiguracoesComponent_Conditional_3_Conditional_102_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 30);
  }
}
function PlataformaConfiguracoesComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 2);
    \u0275\u0275conditionalCreate(1, PlataformaConfiguracoesComponent_Conditional_3_Conditional_1_Template, 2, 1, "p", 3);
    \u0275\u0275elementStart(2, "div", 4)(3, "h3", 5);
    \u0275\u0275text(4, "Asaas \u2014 ambiente (.env)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "dl", 6)(6, "div", 7)(7, "dt", 8);
    \u0275\u0275text(8, "URL da API");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "dd", 9);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 7)(12, "dt", 8);
    \u0275\u0275text(13, "API configurada");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "dd", 10);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(16, "p", 11);
    \u0275\u0275text(17, "Para alterar base URL e chave da API, edite o ");
    \u0275\u0275elementStart(18, "code", 12);
    \u0275\u0275text(19, ".env");
    \u0275\u0275elementEnd();
    \u0275\u0275text(20, ".");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "form", 13);
    \u0275\u0275listener("ngSubmit", function PlataformaConfiguracoesComponent_Conditional_3_Template_form_ngSubmit_21_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.submitSettings());
    });
    \u0275\u0275elementStart(22, "h3", 5);
    \u0275\u0275text(23, "Par\xE2metros da plataforma (banco)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "div")(25, "label", 14);
    \u0275\u0275text(26, "Nome do produto");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "input", 15);
    \u0275\u0275twoWayListener("ngModelChange", function PlataformaConfiguracoesComponent_Conditional_3_Template_input_ngModelChange_27_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.productName, $event) || (ctx_r1.productName = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(28, "div", 16)(29, "div")(30, "label", 17);
    \u0275\u0275text(31, "Trial (dias)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "input", 18);
    \u0275\u0275twoWayListener("ngModelChange", function PlataformaConfiguracoesComponent_Conditional_3_Template_input_ngModelChange_32_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.trialDays, $event) || (ctx_r1.trialDays = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(33, "div")(34, "label", 19);
    \u0275\u0275text(35, "Grace (dias)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "input", 20);
    \u0275\u0275twoWayListener("ngModelChange", function PlataformaConfiguracoesComponent_Conditional_3_Template_input_ngModelChange_36_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.graceDays, $event) || (ctx_r1.graceDays = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(37, "div")(38, "label", 21);
    \u0275\u0275text(39, "Modo de bloqueio");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "select", 22);
    \u0275\u0275twoWayListener("ngModelChange", function PlataformaConfiguracoesComponent_Conditional_3_Template_select_ngModelChange_40_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.blockMode, $event) || (ctx_r1.blockMode = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(41, "option", 23);
    \u0275\u0275text(42, "soft");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "option", 24);
    \u0275\u0275text(44, "hard");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(45, "p", 25);
    \u0275\u0275text(46, "soft = bloqueia app e libera /assinatura; hard = bloqueia tudo exceto logout.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(47, "div")(48, "label", 26);
    \u0275\u0275text(49, "Plano multi-empresa (chave do plano)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(50, "input", 27);
    \u0275\u0275twoWayListener("ngModelChange", function PlataformaConfiguracoesComponent_Conditional_3_Template_input_ngModelChange_50_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.multiEmpresaPlan, $event) || (ctx_r1.multiEmpresaPlan = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(51, PlataformaConfiguracoesComponent_Conditional_3_Conditional_51_Template, 2, 1, "p", 28);
    \u0275\u0275elementStart(52, "button", 29);
    \u0275\u0275conditionalCreate(53, PlataformaConfiguracoesComponent_Conditional_3_Conditional_53_Template, 1, 0, "span", 30);
    \u0275\u0275text(54);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(55, "form", 13);
    \u0275\u0275listener("ngSubmit", function PlataformaConfiguracoesComponent_Conditional_3_Template_form_ngSubmit_55_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.submitStatus());
    });
    \u0275\u0275elementStart(56, "h3", 5);
    \u0275\u0275text(57, "Status do servi\xE7o (/status)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(58, "p", 31);
    \u0275\u0275text(59, " O status, criticidade e componentes s\xE3o exibidos na p\xE1gina p\xFAblica em ");
    \u0275\u0275elementStart(60, "a", 32);
    \u0275\u0275text(61);
    \u0275\u0275elementEnd();
    \u0275\u0275text(62, " e no banner da landing page. ");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(63, PlataformaConfiguracoesComponent_Conditional_3_Conditional_63_Template, 2, 1, "p", 28);
    \u0275\u0275elementStart(64, "div", 16)(65, "div")(66, "label", 33);
    \u0275\u0275text(67, "Status geral");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(68, "select", 34);
    \u0275\u0275twoWayListener("ngModelChange", function PlataformaConfiguracoesComponent_Conditional_3_Template_select_ngModelChange_68_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.serviceStatus, $event) || (ctx_r1.serviceStatus = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(69, "option", 35);
    \u0275\u0275text(70, "Operacional");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(71, "option", 36);
    \u0275\u0275text(72, "Degradado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(73, "option", 37);
    \u0275\u0275text(74, "Indispon\xEDvel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(75, "option", 38);
    \u0275\u0275text(76, "Manuten\xE7\xE3o");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(77, "div")(78, "label", 39);
    \u0275\u0275text(79, "Criticidade");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(80, "select", 40);
    \u0275\u0275twoWayListener("ngModelChange", function PlataformaConfiguracoesComponent_Conditional_3_Template_select_ngModelChange_80_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.serviceStatusSeverity, $event) || (ctx_r1.serviceStatusSeverity = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(81, "option", 41);
    \u0275\u0275text(82, "Nenhuma");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(83, "option", 42);
    \u0275\u0275text(84, "Baixa");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(85, "option", 43);
    \u0275\u0275text(86, "M\xE9dia");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(87, "option", 44);
    \u0275\u0275text(88, "Alta");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(89, "option", 45);
    \u0275\u0275text(90, "Cr\xEDtica");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(91, "div")(92, "label", 46);
    \u0275\u0275text(93, "Mensagem (opcional)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(94, "textarea", 47);
    \u0275\u0275twoWayListener("ngModelChange", function PlataformaConfiguracoesComponent_Conditional_3_Template_textarea_ngModelChange_94_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.serviceStatusMessage, $event) || (ctx_r1.serviceStatusMessage = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(95, "div")(96, "p", 48);
    \u0275\u0275text(97, "Componentes");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(98, "div", 49);
    \u0275\u0275repeaterCreate(99, PlataformaConfiguracoesComponent_Conditional_3_For_100_Template, 12, 3, "div", 50, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(101, "button", 29);
    \u0275\u0275conditionalCreate(102, PlataformaConfiguracoesComponent_Conditional_3_Conditional_102_Template, 1, 0, "span", 30);
    \u0275\u0275text(103);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.error ? 1 : -1);
    \u0275\u0275advance(8);
    \u0275\u0275property("title", ctx_r1.baseUrl);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.baseUrl || "\u2014");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.apiConfigured ? "Sim" : "N\xE3o");
    \u0275\u0275advance(12);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.productName);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.trialDays);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.graceDays);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.blockMode);
    \u0275\u0275advance(10);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.multiEmpresaPlan);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.successSettings ? 51 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.savingSettings);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.savingSettings ? 53 : -1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.savingSettings ? "Salvando\u2026" : "Salvar configura\xE7\xF5es", " ");
    \u0275\u0275advance(6);
    \u0275\u0275property("href", ctx_r1.statusPageUrl, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.statusPageUrl);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.successStatus ? 63 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.serviceStatus);
    \u0275\u0275advance(12);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.serviceStatusSeverity);
    \u0275\u0275advance(14);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.serviceStatusMessage);
    \u0275\u0275advance(5);
    \u0275\u0275repeater(ctx_r1.getComponentKeys());
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.savingStatus);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.savingStatus ? 102 : -1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.savingStatus ? "Atualizando\u2026" : "Atualizar status", " ");
  }
}
var COMPONENT_OPTIONS = {
  platform: "Plataforma (App)",
  api: "API REST",
  forms: "Formul\xE1rios P\xFAblicos",
  billing: "Pagamentos & Billing"
};
var PlataformaConfiguracoesComponent = class _PlataformaConfiguracoesComponent {
  showSkeleton;
  listaPronta = false;
  savingSettings = false;
  savingStatus = false;
  error = "";
  successSettings = "";
  successStatus = "";
  data = null;
  componentOptions = COMPONENT_OPTIONS;
  productName = "";
  trialDays = 14;
  graceDays = 7;
  blockMode = "soft";
  multiEmpresaPlan = "";
  baseUrl = "";
  apiConfigured = false;
  serviceStatus = "operational";
  serviceStatusSeverity = "none";
  serviceStatusMessage = "";
  serviceComponents = {};
  /** URL da página pública de status no backend (abre em nova aba; não é rota do Angular). */
  get statusPageUrl() {
    const base = (environment.apiUrl || "").replace(/\/$/, "");
    return base ? `${base}/status` : "#";
  }
  plataformaService = inject(PlataformaService);
  loadingService = inject(LoadingService);
  toast = inject(ToastService);
  ngOnInit() {
    const { data$, showSkeleton } = this.loadingService.loadWithThreshold(this.plataformaService.getSettings());
    this.showSkeleton = showSkeleton;
    data$.subscribe({
      next: (res) => {
        this.listaPronta = true;
        const d = res.data;
        this.data = d;
        this.productName = d.product_name ?? "";
        this.trialDays = d.trial_days ?? 14;
        this.graceDays = d.grace_days ?? 7;
        this.blockMode = d.block_mode ?? "soft";
        this.multiEmpresaPlan = d.multi_empresa_plan ?? "";
        this.baseUrl = d.base_url ?? "";
        this.apiConfigured = d.api_configured ?? false;
        this.serviceStatus = d.service_status ?? "operational";
        this.serviceStatusSeverity = d.service_status_severity ?? "none";
        this.serviceStatusMessage = d.service_status_message ?? "";
        this.serviceComponents = __spreadValues({}, d.service_status_components ?? {});
        Object.keys(COMPONENT_OPTIONS).forEach((k) => {
          if (!(k in this.serviceComponents))
            this.serviceComponents[k] = "operational";
        });
      },
      error: () => {
        this.listaPronta = true;
        this.data = null;
        this.serviceComponents = {};
        Object.keys(COMPONENT_OPTIONS).forEach((k) => this.serviceComponents[k] = "operational");
      }
    });
  }
  submitSettings() {
    this.error = "";
    this.successSettings = "";
    this.savingSettings = true;
    this.plataformaService.updateSettings({
      product_name: this.productName.trim(),
      trial_days: this.trialDays,
      grace_days: this.graceDays,
      block_mode: this.blockMode,
      multi_empresa_plan: this.multiEmpresaPlan.trim()
    }).subscribe({
      next: () => {
        this.savingSettings = false;
        this.successSettings = "Configura\xE7\xF5es salvas.";
        this.toast.success("Configura\xE7\xF5es salvas", "Os par\xE2metros da plataforma foram atualizados.");
      },
      error: () => {
        this.savingSettings = false;
        this.error = "N\xE3o foi poss\xEDvel salvar as configura\xE7\xF5es.";
        this.toast.error("Erro", this.error);
      }
    });
  }
  submitStatus() {
    this.error = "";
    this.successStatus = "";
    this.savingStatus = true;
    this.plataformaService.updateStatus({
      status: this.serviceStatus,
      severity: this.serviceStatusSeverity,
      message: this.serviceStatusMessage.trim() || null,
      components: this.serviceComponents
    }).subscribe({
      next: () => {
        this.savingStatus = false;
        this.successStatus = "Status atualizado.";
        this.toast.success("Status atualizado", "O status operacional foi gravado.");
      },
      error: () => {
        this.savingStatus = false;
        this.error = "N\xE3o foi poss\xEDvel atualizar o status.";
        this.toast.error("Erro", this.error);
      }
    });
  }
  getComponentKeys() {
    return Object.keys(this.componentOptions);
  }
  static \u0275fac = function PlataformaConfiguracoesComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PlataformaConfiguracoesComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PlataformaConfiguracoesComponent, selectors: [["app-plataforma-configuracoes"]], decls: 4, vars: 1, consts: [[1, "relative", "min-h-[300px]", "w-full", "space-y-4"], [3, "rows"], [1, "zm-content-enter", "space-y-4"], [1, "text-xs", "m-0", 2, "color", "var(--c-primary)"], [1, "card", "rounded-xl", "p-4", 2, "border", "1px solid var(--c-border)"], [1, "text-xs", "font-semibold", "tracking-wider", "uppercase", "mb-3", "m-0", 2, "color", "var(--c-muted)"], [1, "space-y-2", "text-sm", "m-0"], [1, "flex", "justify-between", "gap-4"], [2, "color", "var(--c-muted)"], [1, "font-mono", "text-xs", "truncate", "max-w-[240px]", "m-0", 2, "color", "var(--c-text)", 3, "title"], [1, "font-medium", "m-0", 2, "color", "var(--c-text)"], [1, "text-xs", "mt-3", "m-0", 2, "color", "var(--c-muted)"], [1, "px-1", "rounded", 2, "background", "var(--c-soft)", "color", "var(--c-text)"], [1, "card", "space-y-4", "rounded-xl", "p-4", 2, "border", "1px solid var(--c-border)", 3, "ngSubmit"], ["for", "product_name", 1, "block", "text-xs", "font-medium", "mb-1", 2, "color", "var(--c-text)"], ["type", "text", "id", "product_name", "name", "product_name", "required", "", "maxlength", "128", "placeholder", "Ex: Gestgo", 1, "form-input", "w-full", "max-w-md", 3, "ngModelChange", "ngModel"], [1, "flex", "flex-wrap", "gap-6"], ["for", "trial_days", 1, "block", "text-xs", "font-medium", "mb-1", 2, "color", "var(--c-text)"], ["type", "number", "id", "trial_days", "name", "trial_days", "min", "0", "max", "365", "required", "", "placeholder", "14", 1, "form-input", "w-24", 3, "ngModelChange", "ngModel"], ["for", "grace_days", 1, "block", "text-xs", "font-medium", "mb-1", 2, "color", "var(--c-text)"], ["type", "number", "id", "grace_days", "name", "grace_days", "min", "0", "max", "90", "required", "", "placeholder", "7", 1, "form-input", "w-24", 3, "ngModelChange", "ngModel"], ["for", "block_mode", 1, "block", "text-xs", "font-medium", "mb-1", 2, "color", "var(--c-text)"], ["id", "block_mode", "name", "block_mode", 1, "form-select", "w-40", 3, "ngModelChange", "ngModel"], ["value", "soft"], ["value", "hard"], [1, "text-xs", "mt-1", "m-0", 2, "color", "var(--c-muted)"], ["for", "multi_empresa_plan", 1, "block", "text-xs", "font-medium", "mb-1", 2, "color", "var(--c-text)"], ["type", "text", "id", "multi_empresa_plan", "name", "multi_empresa_plan", "maxlength", "64", "required", "", "placeholder", "ex: enterprise", 1, "form-input", "w-48", 3, "ngModelChange", "ngModel"], [1, "text-xs", "rounded", "px-3", "py-2", "m-0", 2, "background", "var(--c-soft)", "color", "var(--c-text)"], ["type", "submit", 1, "btn-primary", "inline-flex", "items-center", "gap-2", 3, "disabled"], ["aria-hidden", "true", 1, "btn-spinner"], [1, "text-xs", "m-0", 2, "color", "var(--c-muted)"], ["target", "_blank", "rel", "noopener", 1, "underline", 2, "color", "var(--c-primary)", 3, "href"], ["for", "service_status", 1, "block", "text-xs", "font-medium", "mb-1", 2, "color", "var(--c-text)"], ["id", "service_status", "name", "status", 1, "form-select", "w-48", 3, "ngModelChange", "ngModel"], ["value", "operational"], ["value", "degraded"], ["value", "outage"], ["value", "maintenance"], ["for", "service_severity", 1, "block", "text-xs", "font-medium", "mb-1", 2, "color", "var(--c-text)"], ["id", "service_severity", "name", "severity", 1, "form-select", "w-40", 3, "ngModelChange", "ngModel"], ["value", "none"], ["value", "low"], ["value", "medium"], ["value", "high"], ["value", "critical"], ["for", "service_status_message", 1, "block", "text-xs", "font-medium", "mb-1", 2, "color", "var(--c-text)"], ["id", "service_status_message", "name", "message", "rows", "2", "maxlength", "500", "placeholder", "Ex: Manuten\xE7\xE3o programada amanh\xE3 2h\u20134h", 1, "form-input", "w-full", "max-w-md", 3, "ngModelChange", "ngModel"], [1, "block", "text-xs", "font-medium", "mb-2", "m-0", 2, "color", "var(--c-text)"], [1, "space-y-2"], [1, "flex", "items-center", "gap-3"], [1, "text-xs", "w-40", 2, "color", "var(--c-text)"], [1, "form-select", "text-xs", "w-40", 3, "ngModelChange", "ngModel", "name"]], template: function PlataformaConfiguracoesComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275conditionalCreate(1, PlataformaConfiguracoesComponent_Conditional_1_Template, 1, 1, "zm-skeleton-list", 1)(2, PlataformaConfiguracoesComponent_Conditional_2_Template, 0, 0)(3, PlataformaConfiguracoesComponent_Conditional_3_Template, 104, 22, "div", 2);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showSkeleton() ? 1 : !ctx.listaPronta ? 2 : 3);
    }
  }, dependencies: [CommonModule, FormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, MaxLengthValidator, MinValidator, MaxValidator, NgModel, NgForm, ZmSkeletonListComponent], styles: ["\n\n.space-y-4[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%]    + *[_ngcontent-%COMP%] {\n  margin-top: 1rem;\n}\n.space-y-2[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%]    + *[_ngcontent-%COMP%] {\n  margin-top: 0.5rem;\n}\n/*# sourceMappingURL=plataforma-configuracoes.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PlataformaConfiguracoesComponent, [{
    type: Component,
    args: [{ selector: "app-plataforma-configuracoes", standalone: true, imports: [CommonModule, FormsModule, ZmSkeletonListComponent], template: `<!-- Igual ao backend: platform/settings/index -->\r
<div class="relative min-h-[300px] w-full space-y-4">\r
  @if (showSkeleton()) {\r
    <zm-skeleton-list [rows]="8" />\r
  } @else if (!listaPronta) {\r
  } @else {\r
    <div class="zm-content-enter space-y-4">\r
    @if (error) {\r
      <p class="text-xs m-0" style="color: var(--c-primary)">{{ error }}</p>\r
    }\r
\r
    <!-- Card 1: Asaas (somente leitura) -->\r
    <div class="card rounded-xl p-4" style="border: 1px solid var(--c-border)">\r
      <h3 class="text-xs font-semibold tracking-wider uppercase mb-3 m-0" style="color: var(--c-muted)">Asaas \u2014 ambiente (.env)</h3>\r
      <dl class="space-y-2 text-sm m-0">\r
        <div class="flex justify-between gap-4">\r
          <dt style="color: var(--c-muted)">URL da API</dt>\r
          <dd class="font-mono text-xs truncate max-w-[240px] m-0" style="color: var(--c-text)" [title]="baseUrl">{{ baseUrl || '\u2014' }}</dd>\r
        </div>\r
        <div class="flex justify-between gap-4">\r
          <dt style="color: var(--c-muted)">API configurada</dt>\r
          <dd class="font-medium m-0" style="color: var(--c-text)">{{ apiConfigured ? 'Sim' : 'N\xE3o' }}</dd>\r
        </div>\r
      </dl>\r
      <p class="text-xs mt-3 m-0" style="color: var(--c-muted)">Para alterar base URL e chave da API, edite o <code class="px-1 rounded" style="background: var(--c-soft); color: var(--c-text)">.env</code>.</p>\r
    </div>\r
\r
    <!-- Card 2: Par\xE2metros da plataforma -->\r
    <form (ngSubmit)="submitSettings()" class="card space-y-4 rounded-xl p-4" style="border: 1px solid var(--c-border)">\r
      <h3 class="text-xs font-semibold tracking-wider uppercase mb-3 m-0" style="color: var(--c-muted)">Par\xE2metros da plataforma (banco)</h3>\r
\r
      <div>\r
        <label for="product_name" class="block text-xs font-medium mb-1" style="color: var(--c-text)">Nome do produto</label>\r
        <input type="text" id="product_name" [(ngModel)]="productName" name="product_name" class="form-input w-full max-w-md" required maxlength="128" placeholder="Ex: Gestgo">\r
      </div>\r
\r
      <div class="flex flex-wrap gap-6">\r
        <div>\r
          <label for="trial_days" class="block text-xs font-medium mb-1" style="color: var(--c-text)">Trial (dias)</label>\r
          <input type="number" id="trial_days" [(ngModel)]="trialDays" name="trial_days" class="form-input w-24" min="0" max="365" required placeholder="14">\r
        </div>\r
        <div>\r
          <label for="grace_days" class="block text-xs font-medium mb-1" style="color: var(--c-text)">Grace (dias)</label>\r
          <input type="number" id="grace_days" [(ngModel)]="graceDays" name="grace_days" class="form-input w-24" min="0" max="90" required placeholder="7">\r
        </div>\r
      </div>\r
\r
      <div>\r
        <label for="block_mode" class="block text-xs font-medium mb-1" style="color: var(--c-text)">Modo de bloqueio</label>\r
        <select id="block_mode" [(ngModel)]="blockMode" name="block_mode" class="form-select w-40">\r
          <option value="soft">soft</option>\r
          <option value="hard">hard</option>\r
        </select>\r
        <p class="text-xs mt-1 m-0" style="color: var(--c-muted)">soft = bloqueia app e libera /assinatura; hard = bloqueia tudo exceto logout.</p>\r
      </div>\r
\r
      <div>\r
        <label for="multi_empresa_plan" class="block text-xs font-medium mb-1" style="color: var(--c-text)">Plano multi-empresa (chave do plano)</label>\r
        <input type="text" id="multi_empresa_plan" [(ngModel)]="multiEmpresaPlan" name="multi_empresa_plan" class="form-input w-48" maxlength="64" required placeholder="ex: enterprise">\r
      </div>\r
\r
      @if (successSettings) {\r
        <p class="text-xs rounded px-3 py-2 m-0" style="background: var(--c-soft); color: var(--c-text)">{{ successSettings }}</p>\r
      }\r
      <button type="submit" class="btn-primary inline-flex items-center gap-2" [disabled]="savingSettings">\r
        @if (savingSettings) {\r
          <span class="btn-spinner" aria-hidden="true"></span>\r
        }\r
        {{ savingSettings ? 'Salvando\u2026' : 'Salvar configura\xE7\xF5es' }}\r
      </button>\r
    </form>\r
\r
    <!-- Card 3: Status do servi\xE7o -->\r
    <form (ngSubmit)="submitStatus()" class="card space-y-4 rounded-xl p-4" style="border: 1px solid var(--c-border)">\r
      <h3 class="text-xs font-semibold tracking-wider uppercase mb-3 m-0" style="color: var(--c-muted)">Status do servi\xE7o (/status)</h3>\r
      <p class="text-xs m-0" style="color: var(--c-muted)">\r
        O status, criticidade e componentes s\xE3o exibidos na p\xE1gina p\xFAblica em\r
        <a [href]="statusPageUrl" target="_blank" rel="noopener" class="underline" style="color: var(--c-primary)">{{ statusPageUrl }}</a>\r
        e no banner da landing page.\r
      </p>\r
\r
      @if (successStatus) {\r
        <p class="text-xs rounded px-3 py-2 m-0" style="background: var(--c-soft); color: var(--c-text)">{{ successStatus }}</p>\r
      }\r
\r
      <div class="flex flex-wrap gap-6">\r
        <div>\r
          <label for="service_status" class="block text-xs font-medium mb-1" style="color: var(--c-text)">Status geral</label>\r
          <select id="service_status" [(ngModel)]="serviceStatus" name="status" class="form-select w-48">\r
            <option value="operational">Operacional</option>\r
            <option value="degraded">Degradado</option>\r
            <option value="outage">Indispon\xEDvel</option>\r
            <option value="maintenance">Manuten\xE7\xE3o</option>\r
          </select>\r
        </div>\r
        <div>\r
          <label for="service_severity" class="block text-xs font-medium mb-1" style="color: var(--c-text)">Criticidade</label>\r
          <select id="service_severity" [(ngModel)]="serviceStatusSeverity" name="severity" class="form-select w-40">\r
            <option value="none">Nenhuma</option>\r
            <option value="low">Baixa</option>\r
            <option value="medium">M\xE9dia</option>\r
            <option value="high">Alta</option>\r
            <option value="critical">Cr\xEDtica</option>\r
          </select>\r
        </div>\r
      </div>\r
\r
      <div>\r
        <label for="service_status_message" class="block text-xs font-medium mb-1" style="color: var(--c-text)">Mensagem (opcional)</label>\r
        <textarea id="service_status_message" [(ngModel)]="serviceStatusMessage" name="message" rows="2" class="form-input w-full max-w-md" maxlength="500" placeholder="Ex: Manuten\xE7\xE3o programada amanh\xE3 2h\u20134h"></textarea>\r
      </div>\r
\r
      <div>\r
        <p class="block text-xs font-medium mb-2 m-0" style="color: var(--c-text)">Componentes</p>\r
        <div class="space-y-2">\r
          @for (key of getComponentKeys(); track key) {\r
            <div class="flex items-center gap-3">\r
              <span class="text-xs w-40" style="color: var(--c-text)">{{ componentOptions[key] }}</span>\r
              <select [(ngModel)]="serviceComponents[key]" [name]="'comp_' + key" class="form-select text-xs w-40">\r
                <option value="operational">Operacional</option>\r
                <option value="degraded">Degradado</option>\r
                <option value="outage">Indispon\xEDvel</option>\r
                <option value="maintenance">Manuten\xE7\xE3o</option>\r
              </select>\r
            </div>\r
          }\r
        </div>\r
      </div>\r
\r
      <button type="submit" class="btn-primary inline-flex items-center gap-2" [disabled]="savingStatus">\r
        @if (savingStatus) {\r
          <span class="btn-spinner" aria-hidden="true"></span>\r
        }\r
        {{ savingStatus ? 'Atualizando\u2026' : 'Atualizar status' }}\r
      </button>\r
    </form>\r
    </div>\r
  }\r
</div>\r
`, styles: ["/* src/app/paginas/plataforma/plataforma-configuracoes/plataforma-configuracoes.component.css */\n.space-y-4 > * + * {\n  margin-top: 1rem;\n}\n.space-y-2 > * + * {\n  margin-top: 0.5rem;\n}\n/*# sourceMappingURL=plataforma-configuracoes.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PlataformaConfiguracoesComponent, { className: "PlataformaConfiguracoesComponent", filePath: "src/app/paginas/plataforma/plataforma-configuracoes/plataforma-configuracoes.component.ts", lineNumber: 24 });
})();
export {
  PlataformaConfiguracoesComponent
};
//# sourceMappingURL=chunk-3SDR3ZEE.js.map
