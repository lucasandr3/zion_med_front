import {
  AuthService
} from "./chunk-SFRXLDXR.js";
import "./chunk-IBJWGIJV.js";
import {
  RouterLink
} from "./chunk-C2NWBPZH.js";
import {
  CommonModule,
  Component,
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
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-GRLISYEV.js";

// src/app/paginas/auth/verificacao-pendente.component.ts
function VerificacaoPendenteComponent_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "h2", 15);
    \u0275\u0275text(1, "E-mail reenviado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "p", 16);
    \u0275\u0275text(3, "Verifique sua caixa de entrada (e a pasta de spam) e clique no link para confirmar seu e-mail.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "a", 17);
    \u0275\u0275text(5, "Voltar ao login");
    \u0275\u0275elementEnd();
  }
}
function VerificacaoPendenteComponent_Conditional_23_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18)(1, "p");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.erro);
  }
}
function VerificacaoPendenteComponent_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "h2", 15);
    \u0275\u0275text(1, "E-mail n\xE3o verificado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "p", 16);
    \u0275\u0275text(3, "Clique no bot\xE3o abaixo para receber novamente o link de verifica\xE7\xE3o.");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(4, VerificacaoPendenteComponent_Conditional_23_Conditional_4_Template, 3, 1, "div", 18);
    \u0275\u0275elementStart(5, "button", 19);
    \u0275\u0275listener("click", function VerificacaoPendenteComponent_Conditional_23_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.reenviar());
    });
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 20)(8, "a", 21);
    \u0275\u0275text(9, "Voltar ao login");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx_r1.erro ? 4 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.carregando);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.carregando ? "Enviando\u2026" : "Reenviar e-mail de verifica\xE7\xE3o", " ");
  }
}
var VerificacaoPendenteComponent = class _VerificacaoPendenteComponent {
  auth = inject(AuthService);
  enviado = false;
  carregando = false;
  erro = "";
  ano = (/* @__PURE__ */ new Date()).getFullYear();
  reenviar() {
    this.erro = "";
    this.carregando = true;
    this.auth.sendVerificationEmail().subscribe({
      next: () => {
        this.carregando = false;
        this.enviado = true;
      },
      error: (err) => {
        this.carregando = false;
        this.erro = err.error?.message ?? "N\xE3o foi poss\xEDvel reenviar. Tente novamente.";
      }
    });
  }
  static \u0275fac = function VerificacaoPendenteComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _VerificacaoPendenteComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _VerificacaoPendenteComponent, selectors: [["app-verificacao-pendente"]], decls: 24, vars: 2, consts: [[1, "auth-page"], [1, "auth-bg-gradient"], [1, "auth-blob-tr"], [1, "auth-blob-bl"], [1, "auth-wrap"], [1, "auth-brand"], [1, "auth-brand-logo"], [1, "auth-brand-logo-icon"], ["src", "assets/logo/logo.png", "alt", "Gestgo"], [1, "auth-brand-logo-name"], [1, "auth-brand-text"], [1, "hl"], [1, "auth-brand-footer"], [1, "auth-card"], [1, "auth-card-inner"], [1, "auth-card-title"], [1, "auth-card-subtitle"], ["routerLink", "/autenticacao", 1, "auth-btn"], [1, "auth-error"], ["type", "button", 1, "auth-btn", 3, "click", "disabled"], [1, "auth-register"], ["routerLink", "/autenticacao"]], template: function VerificacaoPendenteComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275element(1, "div", 1)(2, "div", 2)(3, "div", 3);
      \u0275\u0275elementStart(4, "div", 4)(5, "div", 5)(6, "div", 6)(7, "div", 7);
      \u0275\u0275element(8, "img", 8);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "span", 9);
      \u0275\u0275text(10, "Gestgo");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(11, "div", 10)(12, "h1");
      \u0275\u0275text(13, "Confirme seu ");
      \u0275\u0275elementStart(14, "span", 11);
      \u0275\u0275text(15, "e-mail");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(16, "p");
      \u0275\u0275text(17, "Para acessar o sistema, confirme seu endere\xE7o de e-mail. Enviamos um link de verifica\xE7\xE3o no momento do cadastro.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(18, "p", 12);
      \u0275\u0275text(19);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(20, "div", 13)(21, "div", 14);
      \u0275\u0275conditionalCreate(22, VerificacaoPendenteComponent_Conditional_22_Template, 6, 0)(23, VerificacaoPendenteComponent_Conditional_23_Template, 10, 3);
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(19);
      \u0275\u0275textInterpolate1("\xA9 ", ctx.ano, " Gestgo.");
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.enviado ? 22 : 23);
    }
  }, dependencies: [CommonModule, RouterLink], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n  height: 100%;\n}\n.auth-page[_ngcontent-%COMP%] {\n  height: 100vh;\n  min-height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  position: relative;\n  overflow: hidden;\n}\n.auth-bg-gradient[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  background:\n    linear-gradient(\n      135deg,\n      var(--c-soft),\n      var(--c-bg));\n  z-index: 0;\n}\n.auth-blob-tr[_ngcontent-%COMP%] {\n  position: absolute;\n  top: -10%;\n  right: -10%;\n  width: 50%;\n  height: 50%;\n  background: var(--c-focus);\n  filter: blur(120px);\n  border-radius: 50%;\n  z-index: 0;\n}\n.auth-blob-bl[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: -10%;\n  left: -10%;\n  width: 50%;\n  height: 50%;\n  background: var(--c-focus);\n  filter: blur(100px);\n  border-radius: 50%;\n  z-index: 0;\n}\n.auth-wrap[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 10;\n  width: 100%;\n  max-width: 1100px;\n  margin: 0 auto;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 2.5rem;\n  padding: 2rem 3rem;\n}\n.auth-brand[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 2.5rem;\n  min-width: 0;\n}\n.auth-brand-logo[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.auth-brand-logo-icon[_ngcontent-%COMP%] {\n  width: 38px;\n  height: 38px;\n  background: var(--c-primary);\n  border-radius: 10px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.auth-brand-logo-icon[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: contain;\n  padding: 6px;\n}\n.auth-brand-logo-name[_ngcontent-%COMP%] {\n  font-size: 1.25rem;\n  font-weight: 700;\n  color: var(--c-text);\n}\n.auth-brand-text[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: clamp(1.75rem, 3.5vw, 2.75rem);\n  font-weight: 800;\n  line-height: 1.2;\n  color: var(--c-text);\n  margin-bottom: 1rem;\n}\n.auth-brand-text[_ngcontent-%COMP%]   .hl[_ngcontent-%COMP%] {\n  color: var(--c-primary);\n}\n.auth-brand-text[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 0.9375rem;\n  line-height: 1.7;\n  color: var(--c-muted);\n  max-width: 380px;\n}\n.auth-brand-footer[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: var(--c-muted);\n  opacity: 0.75;\n}\n.auth-card[_ngcontent-%COMP%] {\n  flex: 0 0 400px;\n  width: 400px;\n  max-width: 100%;\n}\n.auth-card-inner[_ngcontent-%COMP%] {\n  background: var(--login-card-bg, rgba(255, 255, 255, 0.6));\n  -webkit-backdrop-filter: blur(12px);\n  backdrop-filter: blur(12px);\n  border: 1px solid var(--login-card-border, rgba(0, 0, 0, 0.07));\n  border-radius: 24px;\n  padding: 1.75rem 1.5rem 2rem;\n}\n.dark[_nghost-%COMP%]   .auth-card-inner[_ngcontent-%COMP%], .dark   [_nghost-%COMP%]   .auth-card-inner[_ngcontent-%COMP%] {\n  background: rgba(17, 17, 24, 0.65);\n  border-color: rgba(255, 255, 255, 0.05);\n}\n.auth-card-title[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  font-weight: 700;\n  color: var(--c-text);\n  margin-bottom: 0.25rem;\n}\n.auth-card-subtitle[_ngcontent-%COMP%] {\n  font-size: 0.8125rem;\n  color: var(--c-muted);\n  margin-bottom: 1.25rem;\n}\n.auth-btn[_ngcontent-%COMP%] {\n  width: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: var(--c-primary);\n  color: #fff;\n  font-size: 0.9375rem;\n  font-weight: 700;\n  padding: 0.5rem 1.25rem;\n  border-radius: 0.5rem;\n  border: none;\n  cursor: pointer;\n  text-decoration: none;\n  transition: opacity 0.2s;\n}\n.auth-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  opacity: 0.9;\n}\n.auth-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.7;\n  cursor: not-allowed;\n}\n.auth-register[_ngcontent-%COMP%] {\n  text-align: center;\n  font-size: 0.8125rem;\n  color: var(--c-muted);\n  padding-top: 1rem;\n}\n.auth-register[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: var(--c-primary);\n  font-weight: 600;\n  text-decoration: none;\n}\n.auth-error[_ngcontent-%COMP%] {\n  border-radius: 12px;\n  border: 1px solid rgba(239, 68, 68, 0.25);\n  background: rgba(239, 68, 68, 0.08);\n  padding: 0.875rem 1rem;\n  font-size: 0.8rem;\n  color: #ef4444;\n  margin-bottom: 1rem;\n}\n@media (max-width: 900px) {\n  .auth-brand[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .auth-wrap[_ngcontent-%COMP%] {\n    justify-content: center;\n  }\n  .auth-card[_ngcontent-%COMP%] {\n    flex: none;\n    width: 100%;\n    max-width: 380px;\n  }\n}\n/*# sourceMappingURL=verificacao-pendente.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(VerificacaoPendenteComponent, [{
    type: Component,
    args: [{ selector: "app-verificacao-pendente", standalone: true, imports: [CommonModule, RouterLink], template: `<div class="auth-page">
  <div class="auth-bg-gradient"></div>
  <div class="auth-blob-tr"></div>
  <div class="auth-blob-bl"></div>
  <div class="auth-wrap">
    <div class="auth-brand">
      <div class="auth-brand-logo">
        <div class="auth-brand-logo-icon">
          <img src="assets/logo/logo.png" alt="Gestgo">
        </div>
        <span class="auth-brand-logo-name">Gestgo</span>
      </div>
      <div class="auth-brand-text">
        <h1>Confirme seu <span class="hl">e-mail</span></h1>
        <p>Para acessar o sistema, confirme seu endere\xE7o de e-mail. Enviamos um link de verifica\xE7\xE3o no momento do cadastro.</p>
      </div>
      <p class="auth-brand-footer">\xA9 {{ ano }} Gestgo.</p>
    </div>
    <div class="auth-card">
      <div class="auth-card-inner">
        @if (enviado) {
          <h2 class="auth-card-title">E-mail reenviado</h2>
          <p class="auth-card-subtitle">Verifique sua caixa de entrada (e a pasta de spam) e clique no link para confirmar seu e-mail.</p>
          <a routerLink="/autenticacao" class="auth-btn">Voltar ao login</a>
        } @else {
          <h2 class="auth-card-title">E-mail n\xE3o verificado</h2>
          <p class="auth-card-subtitle">Clique no bot\xE3o abaixo para receber novamente o link de verifica\xE7\xE3o.</p>
          @if (erro) {
            <div class="auth-error"><p>{{ erro }}</p></div>
          }
          <button type="button" class="auth-btn" [disabled]="carregando" (click)="reenviar()">
            {{ carregando ? 'Enviando\u2026' : 'Reenviar e-mail de verifica\xE7\xE3o' }}
          </button>
          <p class="auth-register">
            <a routerLink="/autenticacao">Voltar ao login</a>
          </p>
        }
      </div>
    </div>
  </div>
</div>
`, styles: ["/* src/app/paginas/auth/verificacao-pendente.component.css */\n:host {\n  display: block;\n  height: 100%;\n}\n.auth-page {\n  height: 100vh;\n  min-height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  position: relative;\n  overflow: hidden;\n}\n.auth-bg-gradient {\n  position: absolute;\n  inset: 0;\n  background:\n    linear-gradient(\n      135deg,\n      var(--c-soft),\n      var(--c-bg));\n  z-index: 0;\n}\n.auth-blob-tr {\n  position: absolute;\n  top: -10%;\n  right: -10%;\n  width: 50%;\n  height: 50%;\n  background: var(--c-focus);\n  filter: blur(120px);\n  border-radius: 50%;\n  z-index: 0;\n}\n.auth-blob-bl {\n  position: absolute;\n  bottom: -10%;\n  left: -10%;\n  width: 50%;\n  height: 50%;\n  background: var(--c-focus);\n  filter: blur(100px);\n  border-radius: 50%;\n  z-index: 0;\n}\n.auth-wrap {\n  position: relative;\n  z-index: 10;\n  width: 100%;\n  max-width: 1100px;\n  margin: 0 auto;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 2.5rem;\n  padding: 2rem 3rem;\n}\n.auth-brand {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 2.5rem;\n  min-width: 0;\n}\n.auth-brand-logo {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.auth-brand-logo-icon {\n  width: 38px;\n  height: 38px;\n  background: var(--c-primary);\n  border-radius: 10px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.auth-brand-logo-icon img {\n  width: 100%;\n  height: 100%;\n  object-fit: contain;\n  padding: 6px;\n}\n.auth-brand-logo-name {\n  font-size: 1.25rem;\n  font-weight: 700;\n  color: var(--c-text);\n}\n.auth-brand-text h1 {\n  font-size: clamp(1.75rem, 3.5vw, 2.75rem);\n  font-weight: 800;\n  line-height: 1.2;\n  color: var(--c-text);\n  margin-bottom: 1rem;\n}\n.auth-brand-text .hl {\n  color: var(--c-primary);\n}\n.auth-brand-text p {\n  font-size: 0.9375rem;\n  line-height: 1.7;\n  color: var(--c-muted);\n  max-width: 380px;\n}\n.auth-brand-footer {\n  font-size: 0.75rem;\n  color: var(--c-muted);\n  opacity: 0.75;\n}\n.auth-card {\n  flex: 0 0 400px;\n  width: 400px;\n  max-width: 100%;\n}\n.auth-card-inner {\n  background: var(--login-card-bg, rgba(255, 255, 255, 0.6));\n  -webkit-backdrop-filter: blur(12px);\n  backdrop-filter: blur(12px);\n  border: 1px solid var(--login-card-border, rgba(0, 0, 0, 0.07));\n  border-radius: 24px;\n  padding: 1.75rem 1.5rem 2rem;\n}\n:host-context(.dark) .auth-card-inner {\n  background: rgba(17, 17, 24, 0.65);\n  border-color: rgba(255, 255, 255, 0.05);\n}\n.auth-card-title {\n  font-size: 1.5rem;\n  font-weight: 700;\n  color: var(--c-text);\n  margin-bottom: 0.25rem;\n}\n.auth-card-subtitle {\n  font-size: 0.8125rem;\n  color: var(--c-muted);\n  margin-bottom: 1.25rem;\n}\n.auth-btn {\n  width: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: var(--c-primary);\n  color: #fff;\n  font-size: 0.9375rem;\n  font-weight: 700;\n  padding: 0.5rem 1.25rem;\n  border-radius: 0.5rem;\n  border: none;\n  cursor: pointer;\n  text-decoration: none;\n  transition: opacity 0.2s;\n}\n.auth-btn:hover:not(:disabled) {\n  opacity: 0.9;\n}\n.auth-btn:disabled {\n  opacity: 0.7;\n  cursor: not-allowed;\n}\n.auth-register {\n  text-align: center;\n  font-size: 0.8125rem;\n  color: var(--c-muted);\n  padding-top: 1rem;\n}\n.auth-register a {\n  color: var(--c-primary);\n  font-weight: 600;\n  text-decoration: none;\n}\n.auth-error {\n  border-radius: 12px;\n  border: 1px solid rgba(239, 68, 68, 0.25);\n  background: rgba(239, 68, 68, 0.08);\n  padding: 0.875rem 1rem;\n  font-size: 0.8rem;\n  color: #ef4444;\n  margin-bottom: 1rem;\n}\n@media (max-width: 900px) {\n  .auth-brand {\n    display: none;\n  }\n  .auth-wrap {\n    justify-content: center;\n  }\n  .auth-card {\n    flex: none;\n    width: 100%;\n    max-width: 380px;\n  }\n}\n/*# sourceMappingURL=verificacao-pendente.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(VerificacaoPendenteComponent, { className: "VerificacaoPendenteComponent", filePath: "src/app/paginas/auth/verificacao-pendente.component.ts", lineNumber: 13 });
})();
export {
  VerificacaoPendenteComponent
};
//# sourceMappingURL=chunk-QQIOUOJY.js.map
