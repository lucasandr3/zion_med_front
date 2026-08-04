import {
  statusAssinaturaOuCobrancaPt,
  statusFaturaPt
} from "./chunk-QA27EMLR.js";
import {
  normalizeBillingUi
} from "./chunk-T5FMHWLF.js";
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
  ToastService
} from "./chunk-EZUVP6MG.js";
import "./chunk-SFRXLDXR.js";
import "./chunk-IBJWGIJV.js";
import "./chunk-C2NWBPZH.js";
import {
  CommonModule,
  Component,
  DatePipe,
  DecimalPipe,
  Injectable,
  __async,
  __spreadProps,
  __spreadValues,
  inject,
  map,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
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
  ɵɵpipeBind3,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-GRLISYEV.js";

// src/app/core/services/billing.service.ts
var BillingService = class _BillingService {
  api = inject(ApiService);
  get() {
    return this.api.get("/billing").pipe(map((r) => {
      const d = r.data;
      const organization = d.organization ?? d.clinic ?? null;
      const subscriptions = d.subscriptions ?? [];
      const billing_ui = normalizeBillingUi(d.billing_ui, subscriptions);
      return __spreadProps(__spreadValues({}, d), {
        organization,
        subscriptions,
        payments: d.payments ?? [],
        billing_ui
      });
    }));
  }
  /** Cria assinatura para o plano (plan_key). */
  checkout(planKey) {
    return this.api.post("/billing/checkout", { plan_key: planKey });
  }
  /** Cancela a assinatura. */
  cancelSubscription(subscriptionId) {
    return this.api.post(`/billing/subscriptions/${subscriptionId}/cancel`, {});
  }
  /** Troca de plano (cancela atual e cria nova com plan_key). */
  changePlan(planKey) {
    return this.api.post("/billing/change-plan", { plan_key: planKey });
  }
  static \u0275fac = function BillingService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _BillingService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _BillingService, factory: _BillingService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BillingService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

// src/app/core/utils/billing-payments-filter.ts
function temAssinaturaAtivaGerenciada(subs) {
  return subs.some((s) => String(s.status ?? "").toLowerCase() === "active" && !!s.asaas_subscription_id);
}
function isStatusPagamentoPendente(status) {
  const st = String(status).trim().toLowerCase().replace(/\s+/g, "_").replace(/-/g, "_");
  return st === "pending" || st === "open" || st === "awaiting_payment" || st === "unpaid" || st === "payment_pending";
}
function contaSemAssinaturaAtivaEncerrada(org) {
  const bs = String(org.billing_status ?? "").toLowerCase();
  const ss = String(org.subscription_status ?? "").toLowerCase();
  return bs === "blocked" || ss === "inactive" || ss === "canceled" || ss === "cancelled";
}
function filterPaymentsWhenSubscriptionCanceled(payments, opts) {
  if (opts.showPendingFirstPayment)
    return payments;
  if (temAssinaturaAtivaGerenciada(opts.subscriptions))
    return payments;
  const org = opts.organization;
  if (!org || !contaSemAssinaturaAtivaEncerrada(org))
    return payments;
  return payments.filter((p) => !isStatusPagamentoPendente(p.status));
}

// src/app/paginas/billing/billing.component.ts
var _forTrack0 = ($index, $item) => $item.id;
var _forTrack1 = ($index, $item) => $item.key;
function BillingComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "zm-skeleton-list", 1);
  }
  if (rf & 2) {
    \u0275\u0275property("rows", 5);
  }
}
function BillingComponent_Conditional_2_Template(rf, ctx) {
}
function BillingComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "zm-assinatura-bloqueada-card", 2);
  }
  if (rf & 2) {
    \u0275\u0275property("permitirIrAssinatura", false);
  }
}
function BillingComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 3);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.erro);
  }
}
function BillingComponent_Conditional_5_Conditional_12_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 21);
  }
}
function BillingComponent_Conditional_5_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 12)(1, "p", 17);
    \u0275\u0275text(2, "Assinatura ativa");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 18);
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 19)(7, "button", 20);
    \u0275\u0275listener("click", function BillingComponent_Conditional_5_Conditional_12_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.cancelarAssinatura(ctx_r0.assinaturaAtiva));
    });
    \u0275\u0275conditionalCreate(8, BillingComponent_Conditional_5_Conditional_12_Conditional_8_Template, 1, 0, "span", 21);
    \u0275\u0275text(9, " Cancelar assinatura ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("Plano atual \xB7 Pr\xF3xima cobran\xE7a: ", \u0275\u0275pipeBind2(5, 3, ctx_r0.assinaturaAtiva.next_due_date, "dd/MM/yyyy"));
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r0.acaoEmAndamento);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.acaoEmAndamento ? 8 : -1);
  }
}
function BillingComponent_Conditional_5_Conditional_13_Conditional_5_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 21);
  }
}
function BillingComponent_Conditional_5_Conditional_13_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 19)(1, "button", 20);
    \u0275\u0275listener("click", function BillingComponent_Conditional_5_Conditional_13_Conditional_5_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.cancelarAssinatura(ctx_r0.assinaturaAtiva));
    });
    \u0275\u0275conditionalCreate(2, BillingComponent_Conditional_5_Conditional_13_Conditional_5_Conditional_2_Template, 1, 0, "span", 21);
    \u0275\u0275text(3, " Cancelar assinatura pendente ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r0.acaoEmAndamento);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.acaoEmAndamento ? 2 : -1);
  }
}
function BillingComponent_Conditional_5_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13)(1, "p", 17);
    \u0275\u0275text(2, "Pagamento da assinatura pendente");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 18);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(5, BillingComponent_Conditional_5_Conditional_13_Conditional_5_Template, 4, 2, "div", 19);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.mensagemPendenciaPrimeiroPagamento);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.assinaturaAtiva ? 5 : -1);
  }
}
function BillingComponent_Conditional_5_Conditional_14_For_5_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 28);
    \u0275\u0275text(1, "Abrir boleto / fatura");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("href", p_r4.bank_slip_url, \u0275\u0275sanitizeUrl);
  }
}
function BillingComponent_Conditional_5_Conditional_14_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li", 24)(1, "span", 25);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 26);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 27);
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(9, BillingComponent_Conditional_5_Conditional_14_For_5_Conditional_9_Template, 2, 1, "a", 28);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r4 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(3, 4, p_r4.due_date, "dd/MM/yyyy"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.rotuloStatusFatura(p_r4.status));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("R$ ", \u0275\u0275pipeBind3(8, 7, p_r4.value, "1.2-2", "pt-BR"));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(p_r4.bank_slip_url ? 9 : -1);
  }
}
function BillingComponent_Conditional_5_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14)(1, "p", 22);
    \u0275\u0275text(2, "Cobran\xE7as recentes");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "ul", 23);
    \u0275\u0275repeaterCreate(4, BillingComponent_Conditional_5_Conditional_14_For_5_Template, 10, 11, "li", 24, _forTrack0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275repeater(ctx_r0.pagamentos);
  }
}
function BillingComponent_Conditional_5_Conditional_15_For_2_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 31);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const plano_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(plano_r5.description);
  }
}
function BillingComponent_Conditional_5_Conditional_15_For_2_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 32);
    \u0275\u0275text(1, "Plano atual");
    \u0275\u0275elementEnd();
  }
}
function BillingComponent_Conditional_5_Conditional_15_For_2_Conditional_7_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 21);
  }
}
function BillingComponent_Conditional_5_Conditional_15_For_2_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 34);
    \u0275\u0275listener("click", function BillingComponent_Conditional_5_Conditional_15_For_2_Conditional_7_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const plano_r5 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.acaoPlano(plano_r5));
    });
    \u0275\u0275conditionalCreate(1, BillingComponent_Conditional_5_Conditional_15_For_2_Conditional_7_Conditional_1_Template, 1, 0, "span", 21);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const plano_r5 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275property("disabled", ctx_r0.acaoEmAndamento);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.acaoEmAndamento ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.acaoEmAndamento ? "Processando\u2026" : ctx_r0.rotuloBotaoPlano(plano_r5), " ");
  }
}
function BillingComponent_Conditional_5_Conditional_15_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 29)(1, "p", 17);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 30);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(5, BillingComponent_Conditional_5_Conditional_15_For_2_Conditional_5_Template, 2, 1, "p", 31);
    \u0275\u0275conditionalCreate(6, BillingComponent_Conditional_5_Conditional_15_For_2_Conditional_6_Template, 2, 0, "span", 32)(7, BillingComponent_Conditional_5_Conditional_15_For_2_Conditional_7_Template, 3, 3, "button", 33);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const plano_r5 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(plano_r5.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("R$ ", plano_r5.value);
    \u0275\u0275advance();
    \u0275\u0275conditional(plano_r5.description ? 5 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.somenteRotuloPlanoAtual(plano_r5) ? 6 : 7);
  }
}
function BillingComponent_Conditional_5_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15);
    \u0275\u0275repeaterCreate(1, BillingComponent_Conditional_5_Conditional_15_For_2_Template, 8, 4, "div", 29, _forTrack1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.planos);
  }
}
function BillingComponent_Conditional_5_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 16);
    \u0275\u0275text(1, "Seu plano est\xE1 ativo. Use cancelar acima se precisar encerrar a assinatura.");
    \u0275\u0275elementEnd();
  }
}
function BillingComponent_Conditional_5_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 16);
    \u0275\u0275text(1, "Nenhum plano dispon\xEDvel no momento.");
    \u0275\u0275elementEnd();
  }
}
function BillingComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4)(1, "div", 5)(2, "div", 6)(3, "div", 7)(4, "span", 8);
    \u0275\u0275text(5, "payments");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div")(7, "p", 9);
    \u0275\u0275text(8, "Status da assinatura");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "p", 10);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(11, "div", 11);
    \u0275\u0275conditionalCreate(12, BillingComponent_Conditional_5_Conditional_12_Template, 10, 6, "div", 12);
    \u0275\u0275conditionalCreate(13, BillingComponent_Conditional_5_Conditional_13_Template, 6, 2, "div", 13);
    \u0275\u0275conditionalCreate(14, BillingComponent_Conditional_5_Conditional_14_Template, 6, 0, "div", 14);
    \u0275\u0275conditionalCreate(15, BillingComponent_Conditional_5_Conditional_15_Template, 3, 0, "div", 15)(16, BillingComponent_Conditional_5_Conditional_16_Template, 2, 0, "p", 16)(17, BillingComponent_Conditional_5_Conditional_17_Template, 2, 0, "p", 16);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate2("", ctx_r0.statusAssinatura, "", ctx_r0.trialAte ? " \xB7 Per\xEDodo de teste at\xE9 " + ctx_r0.trialAte : "");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.mostrarCartaoGerenciado && ctx_r0.assinaturaAtiva ? 12 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.mostrarPendenciaPrimeiroPagamento ? 13 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.pagamentos.length > 0 ? 14 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.planos.length > 0 && ctx_r0.mostrarSelecaoPlano ? 15 : ctx_r0.planos.length > 0 && !ctx_r0.mostrarSelecaoPlano ? 16 : 17);
  }
}
var BillingComponent = class _BillingComponent {
  rotuloStatusFatura = statusFaturaPt;
  billingService = inject(BillingService);
  loadingService = inject(LoadingService);
  toast = inject(ToastService);
  confirm = inject(ConfirmDialogService);
  state = null;
  planos = [];
  assinaturaAtiva = null;
  showSkeleton;
  listaPronta = false;
  erro = "";
  erroCobrancaBloqueada = false;
  acaoEmAndamento = false;
  ngOnInit() {
    this.carregar();
  }
  carregar() {
    this.erro = "";
    this.erroCobrancaBloqueada = false;
    const { data$, showSkeleton } = this.loadingService.loadWithThreshold(this.billingService.get());
    this.showSkeleton = showSkeleton;
    data$.subscribe({
      next: (data) => {
        this.listaPronta = true;
        this.erroCobrancaBloqueada = false;
        this.state = data;
        this.planos = Object.entries(data.plans ?? {}).map(([key, p]) => __spreadProps(__spreadValues({}, p), { key }));
        this.assinaturaAtiva = data.subscriptions.find((s) => String(s.status).toLowerCase() === "active" && s.asaas_subscription_id) ?? null;
      },
      error: (err) => {
        this.listaPronta = true;
        if (isBillingBlockedError(err)) {
          this.erroCobrancaBloqueada = true;
          this.erro = "";
          return;
        }
        this.erroCobrancaBloqueada = false;
        this.erro = "N\xE3o foi poss\xEDvel carregar os dados da assinatura.";
      }
    });
  }
  get statusAssinatura() {
    const o = this.state?.organization ?? this.state?.clinic;
    const raw = o?.subscription_status ?? o?.billing_status ?? "trial";
    return statusAssinaturaOuCobrancaPt(raw);
  }
  /** Cartão “Assinatura ativa” + cancelar — só quando a API indica gestão normal. */
  get mostrarCartaoGerenciado() {
    return !!this.state?.billing_ui?.show_managed_subscription_card;
  }
  get mostrarPendenciaPrimeiroPagamento() {
    return !!this.state?.billing_ui?.show_pending_first_payment;
  }
  get mensagemPendenciaPrimeiroPagamento() {
    return this.state?.billing_ui?.pending_first_payment_message ?? "";
  }
  get mostrarSelecaoPlano() {
    return this.state?.billing_ui?.show_plan_selection !== false;
  }
  get pagamentos() {
    const all = this.state?.payments ?? [];
    return filterPaymentsWhenSubscriptionCanceled(all, {
      subscriptions: this.state?.subscriptions ?? [],
      organization: this.state?.organization ?? this.state?.clinic,
      showPendingFirstPayment: this.mostrarPendenciaPrimeiroPagamento
    });
  }
  get trialAte() {
    const o = this.state?.organization;
    if (!o?.is_on_trial || !o?.trial_ends_at) {
      return "";
    }
    try {
      return new Date(o.trial_ends_at).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
      });
    } catch {
      return "";
    }
  }
  /** Só “Plano atual” sem botão quando a assinatura está em modo gerenciado (não pendência pós-trial). */
  somenteRotuloPlanoAtual(plano) {
    return !!this.assinaturaAtiva && this.assinaturaAtiva.plan_key === plano.key && this.mostrarCartaoGerenciado;
  }
  rotuloBotaoPlano(plano) {
    if (!this.assinaturaAtiva) {
      return "Assinar";
    }
    if (this.mostrarPendenciaPrimeiroPagamento) {
      return this.assinaturaAtiva.plan_key === plano.key ? "Assinar novamente" : "Assinar com este plano";
    }
    if (this.assinaturaAtiva.plan_key === plano.key) {
      return "Assinar";
    }
    return "Trocar para este plano";
  }
  acaoPlano(plano) {
    if (!this.assinaturaAtiva || this.mostrarPendenciaPrimeiroPagamento) {
      this.checkout(plano.key);
      return;
    }
    this.trocarPlano(plano.key);
  }
  checkout(planKey) {
    this.acaoEmAndamento = true;
    this.erro = "";
    this.billingService.checkout(planKey).subscribe({
      next: (res) => {
        this.acaoEmAndamento = false;
        this.toast.success("Assinatura", res.data?.message ?? "Assinatura ativa.");
        this.carregar();
      },
      error: (err) => {
        this.acaoEmAndamento = false;
        this.erro = err.error?.message ?? "N\xE3o foi poss\xEDvel assinar.";
        this.toast.error("Erro na assinatura", this.erro);
      }
    });
  }
  cancelarAssinatura(sub) {
    return __async(this, null, function* () {
      const ok = yield this.confirm.request({
        title: "Cancelar assinatura?",
        message: "Tem certeza que deseja cancelar esta assinatura? O acesso pode ser encerrado ao fim do per\xEDodo pago.",
        confirmLabel: "Sim, cancelar",
        variant: "danger"
      });
      if (!ok)
        return;
      this.acaoEmAndamento = true;
      this.erro = "";
      this.billingService.cancelSubscription(sub.id).subscribe({
        next: (res) => {
          this.acaoEmAndamento = false;
          this.toast.success("Assinatura cancelada", res.data?.message ?? "Sua assinatura foi cancelada.");
          this.carregar();
        },
        error: (err) => {
          this.acaoEmAndamento = false;
          this.erro = err.error?.message ?? "N\xE3o foi poss\xEDvel cancelar.";
          this.toast.error("Erro", this.erro);
        }
      });
    });
  }
  trocarPlano(planKey) {
    return __async(this, null, function* () {
      const ok = yield this.confirm.request({
        title: "Trocar de plano?",
        message: "A assinatura atual ser\xE1 cancelada e uma nova ser\xE1 criada para o plano selecionado.",
        confirmLabel: "Sim, trocar plano",
        variant: "neutral"
      });
      if (!ok)
        return;
      this.acaoEmAndamento = true;
      this.erro = "";
      this.billingService.changePlan(planKey).subscribe({
        next: (res) => {
          this.acaoEmAndamento = false;
          this.toast.success("Plano alterado", res.data?.message ?? "O plano foi atualizado.");
          this.carregar();
        },
        error: (err) => {
          this.acaoEmAndamento = false;
          this.erro = err.error?.message ?? "N\xE3o foi poss\xEDvel trocar o plano.";
          this.toast.error("Erro", this.erro);
        }
      });
    });
  }
  static \u0275fac = function BillingComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _BillingComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _BillingComponent, selectors: [["app-pagina-billing"]], decls: 6, vars: 1, consts: [[1, "billing-page", "relative", "min-h-[320px]"], [3, "rows"], ["titulo", "Assinatura temporariamente indispon\xEDvel", "descricao", "N\xE3o foi poss\xEDvel carregar os dados de cobran\xE7a enquanto a conta estiver bloqueada. Se voc\xEA j\xE1 efetuou o pagamento, aguarde a confirma\xE7\xE3o ou entre em contato com o suporte.", 3, "permitirIrAssinatura"], [1, "text-sm", 2, "color", "var(--c-error, #dc2626)"], [1, "zm-content-enter"], [1, "section-card", "card", "rounded-xl", "overflow-hidden", "mb-5", 2, "border", "1px solid var(--c-border)"], [1, "section-header", "flex", "items-center", "gap-2.5", "px-5", "py-4", 2, "border-bottom", "1px solid var(--c-border)"], [1, "icon-wrap", "w-7", "h-7", "rounded-lg", "flex", "items-center", "justify-center", 2, "background", "color-mix(in srgb, var(--c-primary) 12%, transparent)"], [1, "material-symbols-outlined", "text-sm", 2, "color", "var(--c-primary)"], [1, "section-title", "text-xs", "font-bold", "uppercase", "tracking-wider", 2, "color", "var(--c-muted)"], [1, "mt-1", "text-sm", 2, "color", "var(--c-text)"], [1, "section-body", "p-5"], [1, "rounded-xl", "p-4", "border", "mb-5", 2, "border-color", "var(--c-border)", "background", "color-mix(in srgb, var(--c-primary) 6%, transparent)"], [1, "rounded-xl", "p-4", "border", "mb-5", 2, "border-color", "color-mix(in srgb, var(--c-warning, #ca8a04) 35%, var(--c-border))", "background", "color-mix(in srgb, var(--c-warning, #ca8a04) 8%, transparent)"], [1, "mb-5"], [1, "grid", "gap-4", "sm:grid-cols-2", "lg:grid-cols-3"], [1, "text-sm", "m-0", 2, "color", "var(--c-muted)"], [1, "font-semibold", "m-0", 2, "color", "var(--c-text)"], [1, "text-sm", "m-0", "mt-1", 2, "color", "var(--c-muted)"], [1, "flex", "gap-3", "mt-3", "flex-wrap"], ["type", "button", 1, "btn-ghost", "text-sm", "inline-flex", "items-center", "gap-2", 3, "click", "disabled"], ["aria-hidden", "true", 1, "btn-spinner"], [1, "text-xs", "font-bold", "uppercase", "tracking-wider", "m-0", "mb-2", 2, "color", "var(--c-muted)"], [1, "list-none", "p-0", "m-0"], [1, "flex", "flex-wrap", "items-center", "gap-2", "justify-between", "rounded-lg", "border", "px-3", "py-2", "text-sm", "mb-2", "last:mb-0", 2, "border-color", "var(--c-border)"], [2, "color", "var(--c-muted)"], [2, "color", "var(--c-text)"], [1, "font-semibold", 2, "color", "var(--c-text)"], ["target", "_blank", "rel", "noopener noreferrer", 1, "text-sm", "font-medium", 2, "color", "var(--c-primary)", 3, "href"], [1, "rounded-xl", "p-4", "border", 2, "border-color", "var(--c-border)"], [1, "text-lg", "font-bold", "mt-1", "m-0", 2, "color", "var(--c-primary)"], [1, "text-sm", "mt-2", "mb-3", "m-0", 2, "color", "var(--c-muted)"], [1, "text-sm", 2, "color", "var(--c-muted)"], ["type", "button", 1, "btn-primary", "w-full", "inline-flex", "items-center", "justify-center", "gap-2", 3, "disabled"], ["type", "button", 1, "btn-primary", "w-full", "inline-flex", "items-center", "justify-center", "gap-2", 3, "click", "disabled"]], template: function BillingComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275conditionalCreate(1, BillingComponent_Conditional_1_Template, 1, 1, "zm-skeleton-list", 1)(2, BillingComponent_Conditional_2_Template, 0, 0)(3, BillingComponent_Conditional_3_Template, 1, 1, "zm-assinatura-bloqueada-card", 2)(4, BillingComponent_Conditional_4_Template, 2, 1, "p", 3)(5, BillingComponent_Conditional_5_Template, 18, 6, "div", 4);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showSkeleton() ? 1 : !ctx.listaPronta ? 2 : ctx.erroCobrancaBloqueada ? 3 : ctx.erro ? 4 : ctx.state ? 5 : -1);
    }
  }, dependencies: [CommonModule, ZmSkeletonListComponent, ZmAssinaturaBloqueadaCardComponent, DecimalPipe, DatePipe], styles: ["\n\n.billing-page[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  min-height: 0;\n  width: 100%;\n}\n/*# sourceMappingURL=billing.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BillingComponent, [{
    type: Component,
    args: [{ selector: "app-pagina-billing", standalone: true, imports: [CommonModule, ZmSkeletonListComponent, ZmAssinaturaBloqueadaCardComponent], template: `<div class="billing-page relative min-h-[320px]">\r
  @if (showSkeleton()) {\r
    <zm-skeleton-list [rows]="5" />\r
  } @else if (!listaPronta) {\r
  } @else if (erroCobrancaBloqueada) {\r
    <zm-assinatura-bloqueada-card\r
      titulo="Assinatura temporariamente indispon\xEDvel"\r
      descricao="N\xE3o foi poss\xEDvel carregar os dados de cobran\xE7a enquanto a conta estiver bloqueada. Se voc\xEA j\xE1 efetuou o pagamento, aguarde a confirma\xE7\xE3o ou entre em contato com o suporte."\r
      [permitirIrAssinatura]="false"\r
    />\r
  } @else if (erro) {\r
    <p class="text-sm" style="color: var(--c-error, #dc2626)">{{ erro }}</p>\r
  } @else if (state) {\r
  <div class="zm-content-enter">\r
  <div class="section-card card rounded-xl overflow-hidden mb-5" style="border: 1px solid var(--c-border)">\r
    <div class="section-header flex items-center gap-2.5 px-5 py-4" style="border-bottom: 1px solid var(--c-border)">\r
      <div class="icon-wrap w-7 h-7 rounded-lg flex items-center justify-center" style="background: color-mix(in srgb, var(--c-primary) 12%, transparent)">\r
        <span class="material-symbols-outlined text-sm" style="color: var(--c-primary)">payments</span>\r
      </div>\r
      <div>\r
        <p class="section-title text-xs font-bold uppercase tracking-wider" style="color: var(--c-muted)">Status da assinatura</p>\r
        <p class="mt-1 text-sm" style="color: var(--c-text)">{{ statusAssinatura }}{{ trialAte ? ' \xB7 Per\xEDodo de teste at\xE9 ' + trialAte : '' }}</p>\r
      </div>\r
    </div>\r
    <div class="section-body p-5">\r
      @if (mostrarCartaoGerenciado && assinaturaAtiva) {\r
        <div class="rounded-xl p-4 border mb-5" style="border-color: var(--c-border); background: color-mix(in srgb, var(--c-primary) 6%, transparent)">\r
          <p class="font-semibold m-0" style="color: var(--c-text)">Assinatura ativa</p>\r
          <p class="text-sm m-0 mt-1" style="color: var(--c-muted)">Plano atual \xB7 Pr\xF3xima cobran\xE7a: {{ assinaturaAtiva.next_due_date | date:'dd/MM/yyyy' }}</p>\r
          <div class="flex gap-3 mt-3 flex-wrap">\r
            <button type="button" class="btn-ghost text-sm inline-flex items-center gap-2" (click)="cancelarAssinatura(assinaturaAtiva)" [disabled]="acaoEmAndamento">\r
              @if (acaoEmAndamento) {\r
                <span class="btn-spinner" aria-hidden="true"></span>\r
              }\r
              Cancelar assinatura\r
            </button>\r
          </div>\r
        </div>\r
      }\r
      @if (mostrarPendenciaPrimeiroPagamento) {\r
        <div class="rounded-xl p-4 border mb-5" style="border-color: color-mix(in srgb, var(--c-warning, #ca8a04) 35%, var(--c-border)); background: color-mix(in srgb, var(--c-warning, #ca8a04) 8%, transparent)">\r
          <p class="font-semibold m-0" style="color: var(--c-text)">Pagamento da assinatura pendente</p>\r
          <p class="text-sm m-0 mt-1" style="color: var(--c-muted)">{{ mensagemPendenciaPrimeiroPagamento }}</p>\r
          @if (assinaturaAtiva) {\r
            <div class="flex gap-3 mt-3 flex-wrap">\r
              <button type="button" class="btn-ghost text-sm inline-flex items-center gap-2" (click)="cancelarAssinatura(assinaturaAtiva)" [disabled]="acaoEmAndamento">\r
                @if (acaoEmAndamento) {\r
                  <span class="btn-spinner" aria-hidden="true"></span>\r
                }\r
                Cancelar assinatura pendente\r
              </button>\r
            </div>\r
          }\r
        </div>\r
      }\r
      @if (pagamentos.length > 0) {\r
        <div class="mb-5">\r
          <p class="text-xs font-bold uppercase tracking-wider m-0 mb-2" style="color: var(--c-muted)">Cobran\xE7as recentes</p>\r
          <ul class="list-none p-0 m-0">\r
            @for (p of pagamentos; track p.id) {\r
              <li class="flex flex-wrap items-center gap-2 justify-between rounded-lg border px-3 py-2 text-sm mb-2 last:mb-0" style="border-color: var(--c-border)">\r
                <span style="color: var(--c-muted)">{{ p.due_date | date:'dd/MM/yyyy' }}</span>\r
                <span style="color: var(--c-text)">{{ rotuloStatusFatura(p.status) }}</span>\r
                <span class="font-semibold" style="color: var(--c-text)">R$ {{ p.value | number:'1.2-2':'pt-BR' }}</span>\r
                @if (p.bank_slip_url) {\r
                  <a [href]="p.bank_slip_url" target="_blank" rel="noopener noreferrer" class="text-sm font-medium" style="color: var(--c-primary)">Abrir boleto / fatura</a>\r
                }\r
              </li>\r
            }\r
          </ul>\r
        </div>\r
      }\r
      @if (planos.length > 0 && mostrarSelecaoPlano) {\r
        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">\r
          @for (plano of planos; track plano.key) {\r
            <div class="rounded-xl p-4 border" style="border-color: var(--c-border)">\r
              <p class="font-semibold m-0" style="color: var(--c-text)">{{ plano.name }}</p>\r
              <p class="text-lg font-bold mt-1 m-0" style="color: var(--c-primary)">R$ {{ plano.value }}</p>\r
              @if (plano.description) {\r
                <p class="text-sm mt-2 mb-3 m-0" style="color: var(--c-muted)">{{ plano.description }}</p>\r
              }\r
              @if (somenteRotuloPlanoAtual(plano)) {\r
                <span class="text-sm" style="color: var(--c-muted)">Plano atual</span>\r
              } @else {\r
                <button type="button" class="btn-primary w-full inline-flex items-center justify-center gap-2" (click)="acaoPlano(plano)" [disabled]="acaoEmAndamento">\r
                  @if (acaoEmAndamento) {\r
                    <span class="btn-spinner" aria-hidden="true"></span>\r
                  }\r
                  {{ acaoEmAndamento ? 'Processando\u2026' : rotuloBotaoPlano(plano) }}\r
                </button>\r
              }\r
            </div>\r
          }\r
        </div>\r
      } @else if (planos.length > 0 && !mostrarSelecaoPlano) {\r
        <p class="text-sm m-0" style="color: var(--c-muted)">Seu plano est\xE1 ativo. Use cancelar acima se precisar encerrar a assinatura.</p>\r
      } @else {\r
        <p class="text-sm m-0" style="color: var(--c-muted)">Nenhum plano dispon\xEDvel no momento.</p>\r
      }\r
    </div>\r
  </div>\r
  </div>\r
  }\r
</div>\r
`, styles: ["/* src/app/paginas/billing/billing.component.css */\n.billing-page {\n  display: flex;\n  flex-direction: column;\n  min-height: 0;\n  width: 100%;\n}\n/*# sourceMappingURL=billing.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(BillingComponent, { className: "BillingComponent", filePath: "src/app/paginas/billing/billing.component.ts", lineNumber: 26 });
})();
export {
  BillingComponent
};
//# sourceMappingURL=chunk-B6IRJM4E.js.map
