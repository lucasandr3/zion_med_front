import {
  AuthService
} from "./chunk-SFRXLDXR.js";
import {
  RouterLink
} from "./chunk-C2NWBPZH.js";
import {
  Component,
  Input,
  inject,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-GRLISYEV.js";

// src/app/shared/components/ui/zm-assinatura-bloqueada-card/zm-assinatura-bloqueada-card.component.ts
function ZmAssinaturaBloqueadaCardComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 3)(1, "span", 5);
    \u0275\u0275text(2, "payments");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Ir para assinatura ");
    \u0275\u0275elementEnd();
  }
}
function ZmAssinaturaBloqueadaCardComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 4);
    \u0275\u0275text(1, " Se o pagamento j\xE1 foi identificado, aguarde alguns minutos e atualize a p\xE1gina. ");
    \u0275\u0275elementEnd();
  }
}
function ZmAssinaturaBloqueadaCardComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 4);
    \u0275\u0275text(1, " Pe\xE7a a um administrador com permiss\xE3o de assinatura para regularizar o pagamento. ");
    \u0275\u0275elementEnd();
  }
}
var ZmAssinaturaBloqueadaCardComponent = class _ZmAssinaturaBloqueadaCardComponent {
  auth = inject(AuthService);
  /** Título principal do aviso. */
  titulo = "Acesso limitado at\xE9 regularizar a cobran\xE7a";
  /** Texto explicativo (assinatura pendente / conta bloqueada). */
  descricao = "Com assinatura pendente ou conta bloqueada por pagamento, este conte\xFAdo n\xE3o fica dispon\xEDvel. Ap\xF3s a confirma\xE7\xE3o do pagamento, o acesso \xE9 restabelecido.";
  /** `compact` para faixa no layout; `default` para bloco em página. */
  variant = "default";
  /** Se false, não mostra o botão “Ir para assinatura” (ex.: já estamos em /assinatura). */
  permitirIrAssinatura = true;
  temPermissaoAssinatura() {
    return this.auth.hasPermission("billing.manage");
  }
  static \u0275fac = function ZmAssinaturaBloqueadaCardComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ZmAssinaturaBloqueadaCardComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ZmAssinaturaBloqueadaCardComponent, selectors: [["zm-assinatura-bloqueada-card"]], inputs: { titulo: "titulo", descricao: "descricao", variant: "variant", permitirIrAssinatura: "permitirIrAssinatura" }, decls: 8, vars: 6, consts: [["role", "status", 1, "zm-ab-card"], [1, "zm-ab-card__title"], [1, "zm-ab-card__desc"], ["routerLink", "/assinatura", 1, "zm-ab-card__btn"], [1, "zm-ab-card__hint"], ["aria-hidden", "true", 1, "material-symbols-outlined", 2, "font-size", "18px"]], template: function ZmAssinaturaBloqueadaCardComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "p", 1);
      \u0275\u0275text(2);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "p", 2);
      \u0275\u0275text(4);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(5, ZmAssinaturaBloqueadaCardComponent_Conditional_5_Template, 4, 0, "a", 3)(6, ZmAssinaturaBloqueadaCardComponent_Conditional_6_Template, 2, 0, "p", 4)(7, ZmAssinaturaBloqueadaCardComponent_Conditional_7_Template, 2, 0, "p", 4);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275classProp("zm-ab-card--compact", ctx.variant === "compact");
      \u0275\u0275attribute("aria-label", ctx.titulo);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.titulo);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.descricao);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.permitirIrAssinatura && ctx.temPermissaoAssinatura() ? 5 : !ctx.permitirIrAssinatura ? 6 : 7);
    }
  }, dependencies: [RouterLink], styles: ["\n\n.zm-ab-card[_ngcontent-%COMP%] {\n  border-radius: 0.75rem;\n  padding: 1rem 1.25rem;\n  border: 1px solid color-mix(in srgb, var(--c-warning, #ca8a04) 35%, var(--c-border));\n  background: color-mix(in srgb, var(--c-warning, #ca8a04) 8%, transparent);\n  color: var(--c-text);\n}\n.zm-ab-card--compact[_ngcontent-%COMP%] {\n  padding: 0.75rem 1rem;\n  border-radius: 0.625rem;\n}\n.zm-ab-card__title[_ngcontent-%COMP%] {\n  font-weight: 600;\n  margin: 0 0 0.5rem;\n  font-size: 0.9375rem;\n  color: var(--c-text);\n}\n.zm-ab-card--compact[_ngcontent-%COMP%]   .zm-ab-card__title[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  margin-bottom: 0.35rem;\n}\n.zm-ab-card__desc[_ngcontent-%COMP%] {\n  margin: 0 0 0.75rem;\n  font-size: 0.8125rem;\n  line-height: 1.5;\n  color: var(--c-muted);\n}\n.zm-ab-card--compact[_ngcontent-%COMP%]   .zm-ab-card__desc[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  margin-bottom: 0.5rem;\n}\n.zm-ab-card__hint[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.6875rem;\n  color: var(--c-muted);\n}\n.zm-ab-card__btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.5rem 1rem;\n  border-radius: 0.5rem;\n  font-size: 0.8125rem;\n  font-weight: 600;\n  text-decoration: none;\n  background: var(--c-primary);\n  color: #fff;\n  border: none;\n  cursor: pointer;\n  font-family: inherit;\n}\n.zm-ab-card__btn[_ngcontent-%COMP%]:hover {\n  filter: brightness(1.06);\n}\n/*# sourceMappingURL=zm-assinatura-bloqueada-card.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ZmAssinaturaBloqueadaCardComponent, [{
    type: Component,
    args: [{ selector: "zm-assinatura-bloqueada-card", standalone: true, imports: [RouterLink], template: `<div\r
  class="zm-ab-card"\r
  [class.zm-ab-card--compact]="variant === 'compact'"\r
  role="status"\r
  [attr.aria-label]="titulo"\r
>\r
  <p class="zm-ab-card__title">{{ titulo }}</p>\r
  <p class="zm-ab-card__desc">{{ descricao }}</p>\r
  @if (permitirIrAssinatura && temPermissaoAssinatura()) {\r
    <a routerLink="/assinatura" class="zm-ab-card__btn">\r
      <span class="material-symbols-outlined" style="font-size: 18px" aria-hidden="true">payments</span>\r
      Ir para assinatura\r
    </a>\r
  } @else if (!permitirIrAssinatura) {\r
    <p class="zm-ab-card__hint">\r
      Se o pagamento j\xE1 foi identificado, aguarde alguns minutos e atualize a p\xE1gina.\r
    </p>\r
  } @else {\r
    <p class="zm-ab-card__hint">\r
      Pe\xE7a a um administrador com permiss\xE3o de assinatura para regularizar o pagamento.\r
    </p>\r
  }\r
</div>\r
`, styles: ["/* src/app/shared/components/ui/zm-assinatura-bloqueada-card/zm-assinatura-bloqueada-card.component.scss */\n.zm-ab-card {\n  border-radius: 0.75rem;\n  padding: 1rem 1.25rem;\n  border: 1px solid color-mix(in srgb, var(--c-warning, #ca8a04) 35%, var(--c-border));\n  background: color-mix(in srgb, var(--c-warning, #ca8a04) 8%, transparent);\n  color: var(--c-text);\n}\n.zm-ab-card--compact {\n  padding: 0.75rem 1rem;\n  border-radius: 0.625rem;\n}\n.zm-ab-card__title {\n  font-weight: 600;\n  margin: 0 0 0.5rem;\n  font-size: 0.9375rem;\n  color: var(--c-text);\n}\n.zm-ab-card--compact .zm-ab-card__title {\n  font-size: 0.875rem;\n  margin-bottom: 0.35rem;\n}\n.zm-ab-card__desc {\n  margin: 0 0 0.75rem;\n  font-size: 0.8125rem;\n  line-height: 1.5;\n  color: var(--c-muted);\n}\n.zm-ab-card--compact .zm-ab-card__desc {\n  font-size: 0.75rem;\n  margin-bottom: 0.5rem;\n}\n.zm-ab-card__hint {\n  margin: 0;\n  font-size: 0.6875rem;\n  color: var(--c-muted);\n}\n.zm-ab-card__btn {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.5rem 1rem;\n  border-radius: 0.5rem;\n  font-size: 0.8125rem;\n  font-weight: 600;\n  text-decoration: none;\n  background: var(--c-primary);\n  color: #fff;\n  border: none;\n  cursor: pointer;\n  font-family: inherit;\n}\n.zm-ab-card__btn:hover {\n  filter: brightness(1.06);\n}\n/*# sourceMappingURL=zm-assinatura-bloqueada-card.component.css.map */\n"] }]
  }], null, { titulo: [{
    type: Input
  }], descricao: [{
    type: Input
  }], variant: [{
    type: Input
  }], permitirIrAssinatura: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ZmAssinaturaBloqueadaCardComponent, { className: "ZmAssinaturaBloqueadaCardComponent", filePath: "src/app/shared/components/ui/zm-assinatura-bloqueada-card/zm-assinatura-bloqueada-card.component.ts", lineNumber: 12 });
})();

export {
  ZmAssinaturaBloqueadaCardComponent
};
//# sourceMappingURL=chunk-CAKNZVE6.js.map
