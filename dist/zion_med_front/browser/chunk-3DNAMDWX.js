import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgControlStatusGroup,
  NgForm,
  NgModel,
  RequiredValidator,
  ɵNgNoValidate
} from "./chunk-USROZ7PW.js";
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
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-GRLISYEV.js";

// src/app/paginas/auth/esqueci-senha.component.ts
function EsqueciSenhaComponent_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "h2", 15);
    \u0275\u0275text(1, "E-mail enviado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "p", 16);
    \u0275\u0275text(3, " Se existir uma conta com o e-mail informado, voc\xEA receber\xE1 um link para redefinir sua senha. Verifique tamb\xE9m a pasta de spam. ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "a", 17);
    \u0275\u0275text(5, "Voltar ao login");
    \u0275\u0275elementEnd();
  }
}
function EsqueciSenhaComponent_Conditional_23_Conditional_4_Template(rf, ctx) {
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
function EsqueciSenhaComponent_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "h2", 15);
    \u0275\u0275text(1, "Esqueceu a senha?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "p", 16);
    \u0275\u0275text(3, "Digite seu e-mail e enviaremos um link para redefinir.");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(4, EsqueciSenhaComponent_Conditional_23_Conditional_4_Template, 3, 1, "div", 18);
    \u0275\u0275elementStart(5, "form", 19);
    \u0275\u0275listener("ngSubmit", function EsqueciSenhaComponent_Conditional_23_Template_form_ngSubmit_5_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.enviar());
    });
    \u0275\u0275elementStart(6, "div", 20)(7, "label", 21);
    \u0275\u0275text(8, "E-mail");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 22)(10, "span", 23);
    \u0275\u0275text(11, "mail");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "input", 24);
    \u0275\u0275twoWayListener("ngModelChange", function EsqueciSenhaComponent_Conditional_23_Template_input_ngModelChange_12_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.email, $event) || (ctx_r1.email = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(13, "button", 25);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "p", 26)(16, "a", 27);
    \u0275\u0275text(17, "Voltar ao login");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx_r1.erro ? 4 : -1);
    \u0275\u0275advance(8);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.email);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.carregando);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.carregando ? "Enviando\u2026" : "Enviar link", " ");
  }
}
var EsqueciSenhaComponent = class _EsqueciSenhaComponent {
  auth = inject(AuthService);
  email = "";
  enviado = false;
  carregando = false;
  erro = "";
  ano = (/* @__PURE__ */ new Date()).getFullYear();
  enviar() {
    this.erro = "";
    if (!this.email.trim())
      return;
    this.carregando = true;
    this.auth.forgotPassword(this.email.trim()).subscribe({
      next: () => {
        this.carregando = false;
        this.enviado = true;
      },
      error: (err) => {
        this.carregando = false;
        const msg = err.error?.message ?? err.error?.errors?.email?.[0] ?? "Ocorreu um erro. Tente novamente.";
        this.erro = typeof msg === "string" ? msg : "Ocorreu um erro. Tente novamente.";
      }
    });
  }
  static \u0275fac = function EsqueciSenhaComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _EsqueciSenhaComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _EsqueciSenhaComponent, selectors: [["app-esqueci-senha"]], decls: 24, vars: 2, consts: [[1, "auth-page"], [1, "auth-bg-gradient"], [1, "auth-blob-tr"], [1, "auth-blob-bl"], [1, "auth-wrap"], [1, "auth-brand"], [1, "auth-brand-logo"], [1, "auth-brand-logo-icon"], ["src", "assets/logo/logo.png", "alt", "Gestgo"], [1, "auth-brand-logo-name"], [1, "auth-brand-text"], [1, "hl"], [1, "auth-brand-footer"], [1, "auth-card"], [1, "auth-card-inner"], [1, "auth-card-title"], [1, "auth-card-subtitle"], ["routerLink", "/autenticacao", 1, "auth-btn"], [1, "auth-error"], [1, "auth-form", 3, "ngSubmit"], [1, "auth-field"], ["for", "esqueci-email", 1, "auth-label"], [1, "auth-input-wrap"], [1, "material-symbols-outlined", "auth-input-icon-l"], ["type", "email", "id", "esqueci-email", "name", "email", "placeholder", "seu@email.com", "required", "", "autofocus", "", 1, "auth-input", 3, "ngModelChange", "ngModel"], ["type", "submit", 1, "auth-btn", 3, "disabled"], [1, "auth-register"], ["routerLink", "/autenticacao"]], template: function EsqueciSenhaComponent_Template(rf, ctx) {
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
      \u0275\u0275text(13, "Recuperar ");
      \u0275\u0275elementStart(14, "span", 11);
      \u0275\u0275text(15, "senha");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(16, "p");
      \u0275\u0275text(17, "Informe seu e-mail e enviaremos um link para redefinir sua senha.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(18, "p", 12);
      \u0275\u0275text(19);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(20, "div", 13)(21, "div", 14);
      \u0275\u0275conditionalCreate(22, EsqueciSenhaComponent_Conditional_22_Template, 6, 0)(23, EsqueciSenhaComponent_Conditional_23_Template, 18, 4);
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(19);
      \u0275\u0275textInterpolate1("\xA9 ", ctx.ano, " Gestgo.");
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.enviado ? 22 : 23);
    }
  }, dependencies: [CommonModule, RouterLink, FormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, NgModel, NgForm], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n  height: 100%;\n}\n.auth-page[_ngcontent-%COMP%] {\n  height: 100vh;\n  min-height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  position: relative;\n  overflow: hidden;\n}\n.auth-bg-gradient[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  background:\n    linear-gradient(\n      135deg,\n      var(--c-soft),\n      var(--c-bg));\n  z-index: 0;\n}\n.auth-blob-tr[_ngcontent-%COMP%] {\n  position: absolute;\n  top: -10%;\n  right: -10%;\n  width: 50%;\n  height: 50%;\n  background: var(--c-focus);\n  filter: blur(120px);\n  border-radius: 50%;\n  z-index: 0;\n}\n.auth-blob-bl[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: -10%;\n  left: -10%;\n  width: 50%;\n  height: 50%;\n  background: var(--c-focus);\n  filter: blur(100px);\n  border-radius: 50%;\n  z-index: 0;\n}\n.auth-wrap[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 10;\n  width: 100%;\n  max-width: 1100px;\n  margin: 0 auto;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 2.5rem;\n  padding: 2rem 3rem;\n}\n.auth-brand[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 2.5rem;\n  min-width: 0;\n}\n.auth-brand-logo[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.auth-brand-logo-icon[_ngcontent-%COMP%] {\n  width: 38px;\n  height: 38px;\n  background: var(--c-primary);\n  border-radius: 10px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.auth-brand-logo-icon[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: contain;\n  padding: 6px;\n}\n.auth-brand-logo-name[_ngcontent-%COMP%] {\n  font-size: 1.25rem;\n  font-weight: 700;\n  color: var(--c-text);\n}\n.auth-brand-text[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: clamp(1.75rem, 3.5vw, 2.75rem);\n  font-weight: 800;\n  line-height: 1.2;\n  color: var(--c-text);\n  margin-bottom: 1rem;\n}\n.auth-brand-text[_ngcontent-%COMP%]   .hl[_ngcontent-%COMP%] {\n  color: var(--c-primary);\n}\n.auth-brand-text[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 0.9375rem;\n  line-height: 1.7;\n  color: var(--c-muted);\n  max-width: 380px;\n}\n.auth-brand-footer[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: var(--c-muted);\n  opacity: 0.75;\n}\n.auth-card[_ngcontent-%COMP%] {\n  flex: 0 0 400px;\n  width: 400px;\n  max-width: 100%;\n}\n.auth-card-inner[_ngcontent-%COMP%] {\n  background: var(--login-card-bg, rgba(255, 255, 255, 0.6));\n  -webkit-backdrop-filter: blur(12px);\n  backdrop-filter: blur(12px);\n  border: 1px solid var(--login-card-border, rgba(0, 0, 0, 0.07));\n  border-radius: 24px;\n  padding: 1.75rem 1.5rem 2rem;\n}\n.dark[_nghost-%COMP%]   .auth-card-inner[_ngcontent-%COMP%], .dark   [_nghost-%COMP%]   .auth-card-inner[_ngcontent-%COMP%] {\n  background: rgba(17, 17, 24, 0.65);\n  border-color: rgba(255, 255, 255, 0.05);\n}\n.auth-card-title[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  font-weight: 700;\n  color: var(--c-text);\n  margin-bottom: 0.25rem;\n}\n.auth-card-subtitle[_ngcontent-%COMP%] {\n  font-size: 0.8125rem;\n  color: var(--c-muted);\n  margin-bottom: 1.25rem;\n}\n.auth-form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n.auth-field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n.auth-label[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  font-weight: 500;\n  color: var(--c-text);\n}\n.auth-input-wrap[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  align-items: stretch;\n}\n.auth-input-icon-l[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 0.75rem;\n  top: 50%;\n  transform: translateY(-50%);\n  color: var(--c-muted);\n  pointer-events: none;\n  font-size: 18px;\n}\n.auth-input[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 0.5rem 0.75rem 0.5rem 2.75rem;\n  border-radius: 0.5rem;\n  border: 1px solid var(--c-border);\n  background: var(--c-surface);\n  color: var(--c-text);\n  font-size: 0.875rem;\n  box-sizing: border-box;\n}\n.auth-input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--c-primary);\n  box-shadow: 0 0 0 3px var(--c-focus);\n}\n.auth-btn[_ngcontent-%COMP%] {\n  width: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: var(--c-primary);\n  color: #fff;\n  font-size: 0.9375rem;\n  font-weight: 700;\n  padding: 0.5rem 1.25rem;\n  border-radius: 0.5rem;\n  border: none;\n  cursor: pointer;\n  text-decoration: none;\n  transition: opacity 0.2s;\n}\n.auth-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  opacity: 0.9;\n}\n.auth-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.7;\n  cursor: not-allowed;\n}\n.auth-register[_ngcontent-%COMP%] {\n  text-align: center;\n  font-size: 0.8125rem;\n  color: var(--c-muted);\n  padding-top: 1rem;\n}\n.auth-register[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: var(--c-primary);\n  font-weight: 600;\n  text-decoration: none;\n}\n.auth-error[_ngcontent-%COMP%] {\n  border-radius: 12px;\n  border: 1px solid rgba(239, 68, 68, 0.25);\n  background: rgba(239, 68, 68, 0.08);\n  padding: 0.875rem 1rem;\n  font-size: 0.8rem;\n  color: #ef4444;\n  margin-bottom: 1rem;\n}\n@media (max-width: 900px) {\n  .auth-brand[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .auth-wrap[_ngcontent-%COMP%] {\n    justify-content: center;\n  }\n  .auth-card[_ngcontent-%COMP%] {\n    flex: none;\n    width: 100%;\n    max-width: 380px;\n  }\n}\n/*# sourceMappingURL=esqueci-senha.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EsqueciSenhaComponent, [{
    type: Component,
    args: [{ selector: "app-esqueci-senha", standalone: true, imports: [CommonModule, RouterLink, FormsModule], template: `<div class="auth-page">
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
        <h1>Recuperar <span class="hl">senha</span></h1>
        <p>Informe seu e-mail e enviaremos um link para redefinir sua senha.</p>
      </div>
      <p class="auth-brand-footer">\xA9 {{ ano }} Gestgo.</p>
    </div>
    <div class="auth-card">
      <div class="auth-card-inner">
        @if (enviado) {
          <h2 class="auth-card-title">E-mail enviado</h2>
          <p class="auth-card-subtitle">
            Se existir uma conta com o e-mail informado, voc\xEA receber\xE1 um link para redefinir sua senha. Verifique tamb\xE9m a pasta de spam.
          </p>
          <a routerLink="/autenticacao" class="auth-btn">Voltar ao login</a>
        } @else {
          <h2 class="auth-card-title">Esqueceu a senha?</h2>
          <p class="auth-card-subtitle">Digite seu e-mail e enviaremos um link para redefinir.</p>
          @if (erro) {
            <div class="auth-error"><p>{{ erro }}</p></div>
          }
          <form (ngSubmit)="enviar()" class="auth-form">
            <div class="auth-field">
              <label class="auth-label" for="esqueci-email">E-mail</label>
              <div class="auth-input-wrap">
                <span class="material-symbols-outlined auth-input-icon-l">mail</span>
                <input type="email" id="esqueci-email" [(ngModel)]="email" name="email"
                       class="auth-input" placeholder="seu@email.com" required autofocus>
              </div>
            </div>
            <button type="submit" class="auth-btn" [disabled]="carregando">
              {{ carregando ? 'Enviando\u2026' : 'Enviar link' }}
            </button>
          </form>
          <p class="auth-register">
            <a routerLink="/autenticacao">Voltar ao login</a>
          </p>
        }
      </div>
    </div>
  </div>
</div>
`, styles: ["/* src/app/paginas/auth/esqueci-senha.component.css */\n:host {\n  display: block;\n  height: 100%;\n}\n.auth-page {\n  height: 100vh;\n  min-height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  position: relative;\n  overflow: hidden;\n}\n.auth-bg-gradient {\n  position: absolute;\n  inset: 0;\n  background:\n    linear-gradient(\n      135deg,\n      var(--c-soft),\n      var(--c-bg));\n  z-index: 0;\n}\n.auth-blob-tr {\n  position: absolute;\n  top: -10%;\n  right: -10%;\n  width: 50%;\n  height: 50%;\n  background: var(--c-focus);\n  filter: blur(120px);\n  border-radius: 50%;\n  z-index: 0;\n}\n.auth-blob-bl {\n  position: absolute;\n  bottom: -10%;\n  left: -10%;\n  width: 50%;\n  height: 50%;\n  background: var(--c-focus);\n  filter: blur(100px);\n  border-radius: 50%;\n  z-index: 0;\n}\n.auth-wrap {\n  position: relative;\n  z-index: 10;\n  width: 100%;\n  max-width: 1100px;\n  margin: 0 auto;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 2.5rem;\n  padding: 2rem 3rem;\n}\n.auth-brand {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 2.5rem;\n  min-width: 0;\n}\n.auth-brand-logo {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.auth-brand-logo-icon {\n  width: 38px;\n  height: 38px;\n  background: var(--c-primary);\n  border-radius: 10px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.auth-brand-logo-icon img {\n  width: 100%;\n  height: 100%;\n  object-fit: contain;\n  padding: 6px;\n}\n.auth-brand-logo-name {\n  font-size: 1.25rem;\n  font-weight: 700;\n  color: var(--c-text);\n}\n.auth-brand-text h1 {\n  font-size: clamp(1.75rem, 3.5vw, 2.75rem);\n  font-weight: 800;\n  line-height: 1.2;\n  color: var(--c-text);\n  margin-bottom: 1rem;\n}\n.auth-brand-text .hl {\n  color: var(--c-primary);\n}\n.auth-brand-text p {\n  font-size: 0.9375rem;\n  line-height: 1.7;\n  color: var(--c-muted);\n  max-width: 380px;\n}\n.auth-brand-footer {\n  font-size: 0.75rem;\n  color: var(--c-muted);\n  opacity: 0.75;\n}\n.auth-card {\n  flex: 0 0 400px;\n  width: 400px;\n  max-width: 100%;\n}\n.auth-card-inner {\n  background: var(--login-card-bg, rgba(255, 255, 255, 0.6));\n  -webkit-backdrop-filter: blur(12px);\n  backdrop-filter: blur(12px);\n  border: 1px solid var(--login-card-border, rgba(0, 0, 0, 0.07));\n  border-radius: 24px;\n  padding: 1.75rem 1.5rem 2rem;\n}\n:host-context(.dark) .auth-card-inner {\n  background: rgba(17, 17, 24, 0.65);\n  border-color: rgba(255, 255, 255, 0.05);\n}\n.auth-card-title {\n  font-size: 1.5rem;\n  font-weight: 700;\n  color: var(--c-text);\n  margin-bottom: 0.25rem;\n}\n.auth-card-subtitle {\n  font-size: 0.8125rem;\n  color: var(--c-muted);\n  margin-bottom: 1.25rem;\n}\n.auth-form {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n.auth-field {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n.auth-label {\n  font-size: 0.875rem;\n  font-weight: 500;\n  color: var(--c-text);\n}\n.auth-input-wrap {\n  position: relative;\n  display: flex;\n  align-items: stretch;\n}\n.auth-input-icon-l {\n  position: absolute;\n  left: 0.75rem;\n  top: 50%;\n  transform: translateY(-50%);\n  color: var(--c-muted);\n  pointer-events: none;\n  font-size: 18px;\n}\n.auth-input {\n  width: 100%;\n  padding: 0.5rem 0.75rem 0.5rem 2.75rem;\n  border-radius: 0.5rem;\n  border: 1px solid var(--c-border);\n  background: var(--c-surface);\n  color: var(--c-text);\n  font-size: 0.875rem;\n  box-sizing: border-box;\n}\n.auth-input:focus {\n  outline: none;\n  border-color: var(--c-primary);\n  box-shadow: 0 0 0 3px var(--c-focus);\n}\n.auth-btn {\n  width: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: var(--c-primary);\n  color: #fff;\n  font-size: 0.9375rem;\n  font-weight: 700;\n  padding: 0.5rem 1.25rem;\n  border-radius: 0.5rem;\n  border: none;\n  cursor: pointer;\n  text-decoration: none;\n  transition: opacity 0.2s;\n}\n.auth-btn:hover:not(:disabled) {\n  opacity: 0.9;\n}\n.auth-btn:disabled {\n  opacity: 0.7;\n  cursor: not-allowed;\n}\n.auth-register {\n  text-align: center;\n  font-size: 0.8125rem;\n  color: var(--c-muted);\n  padding-top: 1rem;\n}\n.auth-register a {\n  color: var(--c-primary);\n  font-weight: 600;\n  text-decoration: none;\n}\n.auth-error {\n  border-radius: 12px;\n  border: 1px solid rgba(239, 68, 68, 0.25);\n  background: rgba(239, 68, 68, 0.08);\n  padding: 0.875rem 1rem;\n  font-size: 0.8rem;\n  color: #ef4444;\n  margin-bottom: 1rem;\n}\n@media (max-width: 900px) {\n  .auth-brand {\n    display: none;\n  }\n  .auth-wrap {\n    justify-content: center;\n  }\n  .auth-card {\n    flex: none;\n    width: 100%;\n    max-width: 380px;\n  }\n}\n/*# sourceMappingURL=esqueci-senha.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(EsqueciSenhaComponent, { className: "EsqueciSenhaComponent", filePath: "src/app/paginas/auth/esqueci-senha.component.ts", lineNumber: 14 });
})();
export {
  EsqueciSenhaComponent
};
//# sourceMappingURL=chunk-3DNAMDWX.js.map
