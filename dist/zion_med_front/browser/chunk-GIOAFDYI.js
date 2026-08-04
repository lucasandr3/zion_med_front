import {
  DefaultValueAccessor,
  FormsModule,
  MinLengthValidator,
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
  ActivatedRoute,
  Router,
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

// src/app/paginas/auth/redefinir-senha.component.ts
function RedefinirSenhaComponent_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "h2", 15);
    \u0275\u0275text(1, "Senha alterada");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "p", 16);
    \u0275\u0275text(3, "Sua senha foi redefinida. Fa\xE7a login com a nova senha.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 17);
    \u0275\u0275listener("click", function RedefinirSenhaComponent_Conditional_22_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.irParaLogin());
    });
    \u0275\u0275text(5, "Ir para o login");
    \u0275\u0275elementEnd();
  }
}
function RedefinirSenhaComponent_Conditional_23_Conditional_4_Template(rf, ctx) {
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
function RedefinirSenhaComponent_Conditional_23_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 20)(1, "label", 31);
    \u0275\u0275text(2, "E-mail");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 32);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.email);
  }
}
function RedefinirSenhaComponent_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "h2", 15);
    \u0275\u0275text(1, "Redefinir senha");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "p", 16);
    \u0275\u0275text(3, "Digite sua nova senha abaixo.");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(4, RedefinirSenhaComponent_Conditional_23_Conditional_4_Template, 3, 1, "div", 18);
    \u0275\u0275elementStart(5, "form", 19);
    \u0275\u0275listener("ngSubmit", function RedefinirSenhaComponent_Conditional_23_Template_form_ngSubmit_5_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.enviar());
    });
    \u0275\u0275conditionalCreate(6, RedefinirSenhaComponent_Conditional_23_Conditional_6_Template, 5, 1, "div", 20);
    \u0275\u0275elementStart(7, "div", 20)(8, "label", 21);
    \u0275\u0275text(9, "Nova senha");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 22)(11, "span", 23);
    \u0275\u0275text(12, "lock");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "input", 24);
    \u0275\u0275twoWayListener("ngModelChange", function RedefinirSenhaComponent_Conditional_23_Template_input_ngModelChange_13_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.senha, $event) || (ctx_r1.senha = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "span", 25);
    \u0275\u0275listener("click", function RedefinirSenhaComponent_Conditional_23_Template_span_click_14_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.mostrarSenha = !ctx_r1.mostrarSenha);
    });
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(16, "div", 20)(17, "label", 26);
    \u0275\u0275text(18, "Confirmar senha");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "div", 22)(20, "span", 23);
    \u0275\u0275text(21, "lock");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "input", 27);
    \u0275\u0275twoWayListener("ngModelChange", function RedefinirSenhaComponent_Conditional_23_Template_input_ngModelChange_22_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.senhaConfirmacao, $event) || (ctx_r1.senhaConfirmacao = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(23, "button", 28);
    \u0275\u0275text(24);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "p", 29)(26, "a", 30);
    \u0275\u0275text(27, "Voltar ao login");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx_r1.erro ? 4 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.email ? 6 : -1);
    \u0275\u0275advance(7);
    \u0275\u0275property("type", ctx_r1.mostrarSenha ? "text" : "password");
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.senha);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.mostrarSenha ? "visibility_off" : "visibility");
    \u0275\u0275advance(7);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.senhaConfirmacao);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.carregando);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.carregando ? "Salvando\u2026" : "Redefinir senha", " ");
  }
}
var RedefinirSenhaComponent = class _RedefinirSenhaComponent {
  auth = inject(AuthService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  token = "";
  email = "";
  senha = "";
  senhaConfirmacao = "";
  mostrarSenha = false;
  sucesso = false;
  carregando = false;
  erro = "";
  ano = (/* @__PURE__ */ new Date()).getFullYear();
  ngOnInit() {
    this.token = this.route.snapshot.queryParamMap.get("token") ?? "";
    this.email = this.route.snapshot.queryParamMap.get("email") ?? "";
  }
  enviar() {
    this.erro = "";
    if (!this.token || !this.email) {
      this.erro = "Link inv\xE1lido. Use o link que enviamos por e-mail.";
      return;
    }
    if (this.senha.length < 8) {
      this.erro = "A senha deve ter no m\xEDnimo 8 caracteres.";
      return;
    }
    if (this.senha !== this.senhaConfirmacao) {
      this.erro = "As senhas n\xE3o coincidem.";
      return;
    }
    this.carregando = true;
    this.auth.resetPassword({
      token: this.token,
      email: this.email,
      password: this.senha,
      password_confirmation: this.senhaConfirmacao
    }).subscribe({
      next: () => {
        this.carregando = false;
        this.sucesso = true;
      },
      error: (err) => {
        this.carregando = false;
        const msg = err.error?.message ?? err.error?.errors?.email?.[0] ?? "Link inv\xE1lido ou expirado. Tente solicitar um novo.";
        this.erro = typeof msg === "string" ? msg : "Link inv\xE1lido ou expirado.";
      }
    });
  }
  irParaLogin() {
    this.router.navigate(["/autenticacao"]);
  }
  static \u0275fac = function RedefinirSenhaComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _RedefinirSenhaComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _RedefinirSenhaComponent, selectors: [["app-redefinir-senha"]], decls: 24, vars: 2, consts: [[1, "auth-page"], [1, "auth-bg-gradient"], [1, "auth-blob-tr"], [1, "auth-blob-bl"], [1, "auth-wrap"], [1, "auth-brand"], [1, "auth-brand-logo"], [1, "auth-brand-logo-icon"], ["src", "assets/logo/logo.png", "alt", "Gestgo"], [1, "auth-brand-logo-name"], [1, "auth-brand-text"], [1, "hl"], [1, "auth-brand-footer"], [1, "auth-card"], [1, "auth-card-inner"], [1, "auth-card-title"], [1, "auth-card-subtitle"], ["type", "button", 1, "auth-btn", 3, "click"], [1, "auth-error"], [1, "auth-form", 3, "ngSubmit"], [1, "auth-field"], ["for", "nova-senha", 1, "auth-label"], [1, "auth-input-wrap"], [1, "material-symbols-outlined", "auth-input-icon-l"], ["id", "nova-senha", "name", "senha", "placeholder", "M\xEDnimo 8 caracteres", "required", "", "minlength", "8", 1, "auth-input", "pr", 3, "ngModelChange", "type", "ngModel"], ["role", "button", "tabindex", "0", 1, "material-symbols-outlined", "auth-input-icon-r", 3, "click"], ["for", "confirma-senha", 1, "auth-label"], ["type", "password", "id", "confirma-senha", "name", "senhaConfirmacao", "placeholder", "Repita a senha", "required", "", 1, "auth-input", 3, "ngModelChange", "ngModel"], ["type", "submit", 1, "auth-btn", 3, "disabled"], [1, "auth-register"], ["routerLink", "/autenticacao"], [1, "auth-label"], [1, "auth-muted"]], template: function RedefinirSenhaComponent_Template(rf, ctx) {
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
      \u0275\u0275text(13, "Nova ");
      \u0275\u0275elementStart(14, "span", 11);
      \u0275\u0275text(15, "senha");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(16, "p");
      \u0275\u0275text(17, "Defina uma nova senha para acessar sua conta.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(18, "p", 12);
      \u0275\u0275text(19);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(20, "div", 13)(21, "div", 14);
      \u0275\u0275conditionalCreate(22, RedefinirSenhaComponent_Conditional_22_Template, 6, 0)(23, RedefinirSenhaComponent_Conditional_23_Template, 28, 8);
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(19);
      \u0275\u0275textInterpolate1("\xA9 ", ctx.ano, " Gestgo.");
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.sucesso ? 22 : 23);
    }
  }, dependencies: [CommonModule, RouterLink, FormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, MinLengthValidator, NgModel, NgForm], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n  height: 100%;\n}\n.auth-page[_ngcontent-%COMP%] {\n  height: 100vh;\n  min-height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  position: relative;\n  overflow: hidden;\n}\n.auth-bg-gradient[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  background:\n    linear-gradient(\n      135deg,\n      var(--c-soft),\n      var(--c-bg));\n  z-index: 0;\n}\n.auth-blob-tr[_ngcontent-%COMP%] {\n  position: absolute;\n  top: -10%;\n  right: -10%;\n  width: 50%;\n  height: 50%;\n  background: var(--c-focus);\n  filter: blur(120px);\n  border-radius: 50%;\n  z-index: 0;\n}\n.auth-blob-bl[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: -10%;\n  left: -10%;\n  width: 50%;\n  height: 50%;\n  background: var(--c-focus);\n  filter: blur(100px);\n  border-radius: 50%;\n  z-index: 0;\n}\n.auth-wrap[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 10;\n  width: 100%;\n  max-width: 1100px;\n  margin: 0 auto;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 2.5rem;\n  padding: 2rem 3rem;\n}\n.auth-brand[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 2.5rem;\n  min-width: 0;\n}\n.auth-brand-logo[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.auth-brand-logo-icon[_ngcontent-%COMP%] {\n  width: 38px;\n  height: 38px;\n  background: var(--c-primary);\n  border-radius: 10px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.auth-brand-logo-icon[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: contain;\n  padding: 6px;\n}\n.auth-brand-logo-name[_ngcontent-%COMP%] {\n  font-size: 1.25rem;\n  font-weight: 700;\n  color: var(--c-text);\n}\n.auth-brand-text[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: clamp(1.75rem, 3.5vw, 2.75rem);\n  font-weight: 800;\n  line-height: 1.2;\n  color: var(--c-text);\n  margin-bottom: 1rem;\n}\n.auth-brand-text[_ngcontent-%COMP%]   .hl[_ngcontent-%COMP%] {\n  color: var(--c-primary);\n}\n.auth-brand-text[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 0.9375rem;\n  line-height: 1.7;\n  color: var(--c-muted);\n  max-width: 380px;\n}\n.auth-brand-footer[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: var(--c-muted);\n  opacity: 0.75;\n}\n.auth-card[_ngcontent-%COMP%] {\n  flex: 0 0 400px;\n  width: 400px;\n  max-width: 100%;\n}\n.auth-card-inner[_ngcontent-%COMP%] {\n  background: var(--login-card-bg, rgba(255, 255, 255, 0.6));\n  -webkit-backdrop-filter: blur(12px);\n  backdrop-filter: blur(12px);\n  border: 1px solid var(--login-card-border, rgba(0, 0, 0, 0.07));\n  border-radius: 24px;\n  padding: 1.75rem 1.5rem 2rem;\n}\n.dark[_nghost-%COMP%]   .auth-card-inner[_ngcontent-%COMP%], .dark   [_nghost-%COMP%]   .auth-card-inner[_ngcontent-%COMP%] {\n  background: rgba(17, 17, 24, 0.65);\n  border-color: rgba(255, 255, 255, 0.05);\n}\n.auth-card-title[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  font-weight: 700;\n  color: var(--c-text);\n  margin-bottom: 0.25rem;\n}\n.auth-card-subtitle[_ngcontent-%COMP%] {\n  font-size: 0.8125rem;\n  color: var(--c-muted);\n  margin-bottom: 1.25rem;\n}\n.auth-form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n.auth-field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n.auth-label[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  font-weight: 500;\n  color: var(--c-text);\n}\n.auth-muted[_ngcontent-%COMP%] {\n  font-size: 0.8125rem;\n  color: var(--c-muted);\n  margin: 0;\n}\n.auth-input-wrap[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  align-items: stretch;\n}\n.auth-input-icon-l[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 0.75rem;\n  top: 50%;\n  transform: translateY(-50%);\n  color: var(--c-muted);\n  pointer-events: none;\n  font-size: 18px;\n}\n.auth-input-icon-r[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 0.75rem;\n  top: 50%;\n  transform: translateY(-50%);\n  color: var(--c-muted);\n  cursor: pointer;\n  font-size: 18px;\n}\n.auth-input[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 0.5rem 0.75rem 0.5rem 2.75rem;\n  border-radius: 0.5rem;\n  border: 1px solid var(--c-border);\n  background: var(--c-surface);\n  color: var(--c-text);\n  font-size: 0.875rem;\n  box-sizing: border-box;\n}\n.auth-input.pr[_ngcontent-%COMP%] {\n  padding-right: 2.75rem;\n}\n.auth-input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--c-primary);\n  box-shadow: 0 0 0 3px var(--c-focus);\n}\n.auth-btn[_ngcontent-%COMP%] {\n  width: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: var(--c-primary);\n  color: #fff;\n  font-size: 0.9375rem;\n  font-weight: 700;\n  padding: 0.5rem 1.25rem;\n  border-radius: 0.5rem;\n  border: none;\n  cursor: pointer;\n  text-decoration: none;\n  transition: opacity 0.2s;\n}\n.auth-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  opacity: 0.9;\n}\n.auth-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.7;\n  cursor: not-allowed;\n}\n.auth-register[_ngcontent-%COMP%] {\n  text-align: center;\n  font-size: 0.8125rem;\n  color: var(--c-muted);\n  padding-top: 1rem;\n}\n.auth-register[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: var(--c-primary);\n  font-weight: 600;\n  text-decoration: none;\n}\n.auth-error[_ngcontent-%COMP%] {\n  border-radius: 12px;\n  border: 1px solid rgba(239, 68, 68, 0.25);\n  background: rgba(239, 68, 68, 0.08);\n  padding: 0.875rem 1rem;\n  font-size: 0.8rem;\n  color: #ef4444;\n  margin-bottom: 1rem;\n}\n@media (max-width: 900px) {\n  .auth-brand[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .auth-wrap[_ngcontent-%COMP%] {\n    justify-content: center;\n  }\n  .auth-card[_ngcontent-%COMP%] {\n    flex: none;\n    width: 100%;\n    max-width: 380px;\n  }\n}\n/*# sourceMappingURL=redefinir-senha.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RedefinirSenhaComponent, [{
    type: Component,
    args: [{ selector: "app-redefinir-senha", standalone: true, imports: [CommonModule, RouterLink, FormsModule], template: `<div class="auth-page">
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
        <h1>Nova <span class="hl">senha</span></h1>
        <p>Defina uma nova senha para acessar sua conta.</p>
      </div>
      <p class="auth-brand-footer">\xA9 {{ ano }} Gestgo.</p>
    </div>
    <div class="auth-card">
      <div class="auth-card-inner">
        @if (sucesso) {
          <h2 class="auth-card-title">Senha alterada</h2>
          <p class="auth-card-subtitle">Sua senha foi redefinida. Fa\xE7a login com a nova senha.</p>
          <button type="button" class="auth-btn" (click)="irParaLogin()">Ir para o login</button>
        } @else {
          <h2 class="auth-card-title">Redefinir senha</h2>
          <p class="auth-card-subtitle">Digite sua nova senha abaixo.</p>
          @if (erro) {
            <div class="auth-error"><p>{{ erro }}</p></div>
          }
          <form (ngSubmit)="enviar()" class="auth-form">
            @if (email) {
              <div class="auth-field">
                <label class="auth-label">E-mail</label>
                <p class="auth-muted">{{ email }}</p>
              </div>
            }
            <div class="auth-field">
              <label class="auth-label" for="nova-senha">Nova senha</label>
              <div class="auth-input-wrap">
                <span class="material-symbols-outlined auth-input-icon-l">lock</span>
                <input [type]="mostrarSenha ? 'text' : 'password'" id="nova-senha" [(ngModel)]="senha" name="senha"
                       class="auth-input pr" placeholder="M\xEDnimo 8 caracteres" required minlength="8">
                <span class="material-symbols-outlined auth-input-icon-r" (click)="mostrarSenha = !mostrarSenha"
                      role="button" tabindex="0">{{ mostrarSenha ? 'visibility_off' : 'visibility' }}</span>
              </div>
            </div>
            <div class="auth-field">
              <label class="auth-label" for="confirma-senha">Confirmar senha</label>
              <div class="auth-input-wrap">
                <span class="material-symbols-outlined auth-input-icon-l">lock</span>
                <input type="password" id="confirma-senha" [(ngModel)]="senhaConfirmacao" name="senhaConfirmacao"
                       class="auth-input" placeholder="Repita a senha" required>
              </div>
            </div>
            <button type="submit" class="auth-btn" [disabled]="carregando">
              {{ carregando ? 'Salvando\u2026' : 'Redefinir senha' }}
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
`, styles: ["/* src/app/paginas/auth/redefinir-senha.component.css */\n:host {\n  display: block;\n  height: 100%;\n}\n.auth-page {\n  height: 100vh;\n  min-height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  position: relative;\n  overflow: hidden;\n}\n.auth-bg-gradient {\n  position: absolute;\n  inset: 0;\n  background:\n    linear-gradient(\n      135deg,\n      var(--c-soft),\n      var(--c-bg));\n  z-index: 0;\n}\n.auth-blob-tr {\n  position: absolute;\n  top: -10%;\n  right: -10%;\n  width: 50%;\n  height: 50%;\n  background: var(--c-focus);\n  filter: blur(120px);\n  border-radius: 50%;\n  z-index: 0;\n}\n.auth-blob-bl {\n  position: absolute;\n  bottom: -10%;\n  left: -10%;\n  width: 50%;\n  height: 50%;\n  background: var(--c-focus);\n  filter: blur(100px);\n  border-radius: 50%;\n  z-index: 0;\n}\n.auth-wrap {\n  position: relative;\n  z-index: 10;\n  width: 100%;\n  max-width: 1100px;\n  margin: 0 auto;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 2.5rem;\n  padding: 2rem 3rem;\n}\n.auth-brand {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 2.5rem;\n  min-width: 0;\n}\n.auth-brand-logo {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.auth-brand-logo-icon {\n  width: 38px;\n  height: 38px;\n  background: var(--c-primary);\n  border-radius: 10px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.auth-brand-logo-icon img {\n  width: 100%;\n  height: 100%;\n  object-fit: contain;\n  padding: 6px;\n}\n.auth-brand-logo-name {\n  font-size: 1.25rem;\n  font-weight: 700;\n  color: var(--c-text);\n}\n.auth-brand-text h1 {\n  font-size: clamp(1.75rem, 3.5vw, 2.75rem);\n  font-weight: 800;\n  line-height: 1.2;\n  color: var(--c-text);\n  margin-bottom: 1rem;\n}\n.auth-brand-text .hl {\n  color: var(--c-primary);\n}\n.auth-brand-text p {\n  font-size: 0.9375rem;\n  line-height: 1.7;\n  color: var(--c-muted);\n  max-width: 380px;\n}\n.auth-brand-footer {\n  font-size: 0.75rem;\n  color: var(--c-muted);\n  opacity: 0.75;\n}\n.auth-card {\n  flex: 0 0 400px;\n  width: 400px;\n  max-width: 100%;\n}\n.auth-card-inner {\n  background: var(--login-card-bg, rgba(255, 255, 255, 0.6));\n  -webkit-backdrop-filter: blur(12px);\n  backdrop-filter: blur(12px);\n  border: 1px solid var(--login-card-border, rgba(0, 0, 0, 0.07));\n  border-radius: 24px;\n  padding: 1.75rem 1.5rem 2rem;\n}\n:host-context(.dark) .auth-card-inner {\n  background: rgba(17, 17, 24, 0.65);\n  border-color: rgba(255, 255, 255, 0.05);\n}\n.auth-card-title {\n  font-size: 1.5rem;\n  font-weight: 700;\n  color: var(--c-text);\n  margin-bottom: 0.25rem;\n}\n.auth-card-subtitle {\n  font-size: 0.8125rem;\n  color: var(--c-muted);\n  margin-bottom: 1.25rem;\n}\n.auth-form {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n.auth-field {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n.auth-label {\n  font-size: 0.875rem;\n  font-weight: 500;\n  color: var(--c-text);\n}\n.auth-muted {\n  font-size: 0.8125rem;\n  color: var(--c-muted);\n  margin: 0;\n}\n.auth-input-wrap {\n  position: relative;\n  display: flex;\n  align-items: stretch;\n}\n.auth-input-icon-l {\n  position: absolute;\n  left: 0.75rem;\n  top: 50%;\n  transform: translateY(-50%);\n  color: var(--c-muted);\n  pointer-events: none;\n  font-size: 18px;\n}\n.auth-input-icon-r {\n  position: absolute;\n  right: 0.75rem;\n  top: 50%;\n  transform: translateY(-50%);\n  color: var(--c-muted);\n  cursor: pointer;\n  font-size: 18px;\n}\n.auth-input {\n  width: 100%;\n  padding: 0.5rem 0.75rem 0.5rem 2.75rem;\n  border-radius: 0.5rem;\n  border: 1px solid var(--c-border);\n  background: var(--c-surface);\n  color: var(--c-text);\n  font-size: 0.875rem;\n  box-sizing: border-box;\n}\n.auth-input.pr {\n  padding-right: 2.75rem;\n}\n.auth-input:focus {\n  outline: none;\n  border-color: var(--c-primary);\n  box-shadow: 0 0 0 3px var(--c-focus);\n}\n.auth-btn {\n  width: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: var(--c-primary);\n  color: #fff;\n  font-size: 0.9375rem;\n  font-weight: 700;\n  padding: 0.5rem 1.25rem;\n  border-radius: 0.5rem;\n  border: none;\n  cursor: pointer;\n  text-decoration: none;\n  transition: opacity 0.2s;\n}\n.auth-btn:hover:not(:disabled) {\n  opacity: 0.9;\n}\n.auth-btn:disabled {\n  opacity: 0.7;\n  cursor: not-allowed;\n}\n.auth-register {\n  text-align: center;\n  font-size: 0.8125rem;\n  color: var(--c-muted);\n  padding-top: 1rem;\n}\n.auth-register a {\n  color: var(--c-primary);\n  font-weight: 600;\n  text-decoration: none;\n}\n.auth-error {\n  border-radius: 12px;\n  border: 1px solid rgba(239, 68, 68, 0.25);\n  background: rgba(239, 68, 68, 0.08);\n  padding: 0.875rem 1rem;\n  font-size: 0.8rem;\n  color: #ef4444;\n  margin-bottom: 1rem;\n}\n@media (max-width: 900px) {\n  .auth-brand {\n    display: none;\n  }\n  .auth-wrap {\n    justify-content: center;\n  }\n  .auth-card {\n    flex: none;\n    width: 100%;\n    max-width: 380px;\n  }\n}\n/*# sourceMappingURL=redefinir-senha.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(RedefinirSenhaComponent, { className: "RedefinirSenhaComponent", filePath: "src/app/paginas/auth/redefinir-senha.component.ts", lineNumber: 14 });
})();
export {
  RedefinirSenhaComponent
};
//# sourceMappingURL=chunk-GIOAFDYI.js.map
