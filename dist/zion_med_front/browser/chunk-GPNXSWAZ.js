import {
  TooltipDirective
} from "./chunk-LVZEGAGU.js";
import {
  CheckboxControlValueAccessor,
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
  Router,
  RouterLink
} from "./chunk-C2NWBPZH.js";
import {
  CommonModule,
  Component,
  Inject,
  PLATFORM_ID,
  isPlatformBrowser,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
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

// src/app/paginas/login/login.component.ts
function LoginComponent_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 20)(1, "p");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.mensagemErro);
  }
}
function LoginComponent_Conditional_57_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Entrando\u2026");
    \u0275\u0275elementEnd();
  }
}
function LoginComponent_Conditional_58_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Acessar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "span", 37);
    \u0275\u0275text(3, "arrow_forward");
    \u0275\u0275elementEnd();
  }
}
var LoginComponent = class _LoginComponent {
  platformId;
  router;
  auth;
  email = "";
  senha = "";
  lembrar = false;
  mostrarSenha = false;
  estadoCarregando = false;
  estadoErro = false;
  mensagemErro = "";
  ano = (/* @__PURE__ */ new Date()).getFullYear();
  iconeTema = "dark_mode";
  constructor(platformId, router, auth) {
    this.platformId = platformId;
    this.router = router;
    this.auth = auth;
  }
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const saved = localStorage.getItem("gestgo_login_email");
      if (saved)
        this.email = saved;
      this.atualizarIconeTema();
    }
  }
  alternarTema() {
    if (isPlatformBrowser(this.platformId)) {
      document.body.classList.toggle("dark");
      localStorage.setItem("gestgo_dark_mode", document.body.classList.contains("dark") ? "1" : "0");
      this.atualizarIconeTema();
    }
  }
  atualizarIconeTema() {
    this.iconeTema = document.body.classList.contains("dark") ? "light_mode" : "dark_mode";
  }
  enviar() {
    this.estadoErro = false;
    this.mensagemErro = "";
    this.estadoCarregando = true;
    if (isPlatformBrowser(this.platformId) && this.email) {
      localStorage.setItem("gestgo_login_email", this.email);
    }
    this.auth.login(this.email, this.senha).subscribe({
      next: (res) => {
        this.estadoCarregando = false;
        const isPlatformAdmin = res.data.user?.role === "platform_admin";
        if (isPlatformAdmin) {
          this.router.navigate(["/plataforma"]);
          return;
        }
        const hasOrg = res.data.current_organization_id != null || res.data.current_clinic_id != null;
        if (hasOrg) {
          void this.router.navigateByUrl(this.auth.getDefaultTenantPath());
        } else {
          this.router.navigate(["/clinica/escolher"]);
        }
      },
      error: (err) => {
        this.estadoCarregando = false;
        this.estadoErro = true;
        const msg = err.error?.message ?? err.error?.errors?.email?.[0] ?? "Credenciais inv\xE1lidas. Tente novamente.";
        this.mensagemErro = typeof msg === "string" ? msg : "Credenciais inv\xE1lidas. Tente novamente.";
      }
    });
  }
  static \u0275fac = function LoginComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LoginComponent)(\u0275\u0275directiveInject(PLATFORM_ID), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(AuthService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LoginComponent, selectors: [["app-pagina-login"]], decls: 63, vars: 10, consts: [["formLogin", "ngForm"], ["type", "button", "id", "login-dark-btn", "aria-label", "Alternar modo escuro", "appTooltip", "Alternar modo escuro", 3, "click"], [1, "material-symbols-outlined", 2, "font-size", "17px", 3, "textContent"], [1, "login-page"], [1, "login-bg-gradient"], [1, "login-blob-tr"], [1, "login-blob-bl"], [1, "login-wrap"], [1, "login-brand"], [1, "login-brand-logo"], [1, "login-brand-logo-icon"], ["src", "assets/logo/logo.png", "alt", "Gestgo"], [1, "login-brand-logo-name"], [1, "login-brand-text"], [1, "hl"], [1, "login-brand-footer"], [1, "login-card"], [1, "login-card-inner"], [1, "login-card-title"], [1, "login-card-subtitle"], [1, "login-error", 2, "margin-bottom", "1.5rem"], [1, "login-form", 3, "ngSubmit"], [1, "login-field"], [1, "login-label-row"], ["for", "login-email", 1, "login-label"], [1, "login-input-wrap"], [1, "material-symbols-outlined", "login-input-icon-l"], ["type", "email", "name", "email", "id", "login-email", "placeholder", "seu@email.com.br", "required", "", "autofocus", "", 1, "login-input", 3, "ngModelChange", "ngModel"], ["for", "login-password", 1, "login-label"], ["routerLink", "/esqueci-a-senha", 1, "login-forgot"], ["name", "password", "id", "login-password", "placeholder", "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", "required", "", 1, "login-input", "pr", 3, "ngModelChange", "type", "ngModel"], ["role", "button", "aria-label", "Mostrar ou ocultar senha", "tabindex", "0", "appTooltip", "Mostrar ou ocultar senha", 1, "material-symbols-outlined", "login-input-icon-r", 3, "click"], [1, "login-remember"], ["type", "checkbox", "name", "remember", 3, "ngModelChange", "ngModel"], ["type", "submit", 1, "login-btn", 3, "disabled"], [1, "login-register"], ["routerLink", "/comece"], [1, "material-symbols-outlined", "btn-arrow"]], template: function LoginComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "button", 1);
      \u0275\u0275listener("click", function LoginComponent_Template_button_click_0_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.alternarTema());
      });
      \u0275\u0275element(1, "span", 2);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(2, "div", 3);
      \u0275\u0275element(3, "div", 4)(4, "div", 5)(5, "div", 6);
      \u0275\u0275elementStart(6, "div", 7)(7, "div", 8)(8, "div", 9)(9, "div", 10);
      \u0275\u0275element(10, "img", 11);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "span", 12);
      \u0275\u0275text(12, "Gestgo");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(13, "div", 13)(14, "h1");
      \u0275\u0275text(15, " Fichas digitais que chegam");
      \u0275\u0275element(16, "br");
      \u0275\u0275elementStart(17, "span", 14);
      \u0275\u0275text(18, "antes do paciente.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(19, "p");
      \u0275\u0275text(20, " Fichas e consentimentos digitais para sua cl\xEDnica: o paciente preenche pelo link antes da consulta \u2014 protocolo, PDF autom\xE1tico e hist\xF3rico organizados. ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(21, "p", 15);
      \u0275\u0275text(22);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(23, "div", 16)(24, "div", 17)(25, "h2", 18);
      \u0275\u0275text(26, "Bem-vindo de volta");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(27, "p", 19);
      \u0275\u0275text(28, "Entre para acessar o painel da sua cl\xEDnica, fichas e protocolos.");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(29, LoginComponent_Conditional_29_Template, 3, 1, "div", 20);
      \u0275\u0275elementStart(30, "form", 21, 0);
      \u0275\u0275listener("ngSubmit", function LoginComponent_Template_form_ngSubmit_30_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.enviar());
      });
      \u0275\u0275elementStart(32, "div", 22)(33, "div", 23)(34, "label", 24);
      \u0275\u0275text(35, "E-mail");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(36, "div", 25)(37, "span", 26);
      \u0275\u0275text(38, "mail");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(39, "input", 27);
      \u0275\u0275twoWayListener("ngModelChange", function LoginComponent_Template_input_ngModelChange_39_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.email, $event) || (ctx.email = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(40, "div", 22)(41, "div", 23)(42, "label", 28);
      \u0275\u0275text(43, "Senha");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(44, "a", 29);
      \u0275\u0275text(45, "Esqueceu a senha?");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(46, "div", 25)(47, "span", 26);
      \u0275\u0275text(48, "lock");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(49, "input", 30);
      \u0275\u0275twoWayListener("ngModelChange", function LoginComponent_Template_input_ngModelChange_49_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.senha, $event) || (ctx.senha = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(50, "span", 31);
      \u0275\u0275listener("click", function LoginComponent_Template_span_click_50_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.mostrarSenha = !ctx.mostrarSenha);
      });
      \u0275\u0275text(51);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(52, "label", 32)(53, "input", 33);
      \u0275\u0275twoWayListener("ngModelChange", function LoginComponent_Template_input_ngModelChange_53_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.lembrar, $event) || (ctx.lembrar = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(54, "span");
      \u0275\u0275text(55, "Lembrar neste dispositivo");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(56, "button", 34);
      \u0275\u0275conditionalCreate(57, LoginComponent_Conditional_57_Template, 2, 0, "span")(58, LoginComponent_Conditional_58_Template, 4, 0);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(59, "p", 35);
      \u0275\u0275text(60, " Ainda n\xE3o tem conta? ");
      \u0275\u0275elementStart(61, "a", 36);
      \u0275\u0275text(62, "Criar conta gr\xE1tis");
      \u0275\u0275elementEnd()()()()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275property("textContent", ctx.iconeTema);
      \u0275\u0275advance(21);
      \u0275\u0275textInterpolate1("\xA9 ", ctx.ano, " Gestgo. Todos os direitos reservados.");
      \u0275\u0275advance(7);
      \u0275\u0275conditional(ctx.estadoErro ? 29 : -1);
      \u0275\u0275advance(10);
      \u0275\u0275twoWayProperty("ngModel", ctx.email);
      \u0275\u0275advance(10);
      \u0275\u0275property("type", ctx.mostrarSenha ? "text" : "password");
      \u0275\u0275twoWayProperty("ngModel", ctx.senha);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.mostrarSenha ? "visibility_off" : "visibility");
      \u0275\u0275advance(2);
      \u0275\u0275twoWayProperty("ngModel", ctx.lembrar);
      \u0275\u0275advance(3);
      \u0275\u0275property("disabled", ctx.estadoCarregando);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.estadoCarregando ? 57 : 58);
    }
  }, dependencies: [CommonModule, RouterLink, FormsModule, \u0275NgNoValidate, DefaultValueAccessor, CheckboxControlValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, NgModel, NgForm, TooltipDirective], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n  height: 100%;\n}\n.login-page[_ngcontent-%COMP%] {\n  height: 100vh;\n  min-height: 100vh;\n  max-height: 100dvh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  position: relative;\n  overflow: hidden;\n}\n.login-bg-gradient[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  background:\n    linear-gradient(\n      135deg,\n      var(--c-soft),\n      var(--c-bg));\n  z-index: 0;\n}\n.login-blob-tr[_ngcontent-%COMP%] {\n  position: absolute;\n  top: -10%;\n  right: -10%;\n  width: 50%;\n  height: 50%;\n  background: var(--c-focus);\n  filter: blur(120px);\n  border-radius: 50%;\n  z-index: 0;\n}\n.login-blob-bl[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: -10%;\n  left: -10%;\n  width: 50%;\n  height: 50%;\n  background: var(--c-focus);\n  filter: blur(100px);\n  border-radius: 50%;\n  z-index: 0;\n}\n.login-wrap[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 10;\n  width: 100%;\n  max-width: 1100px;\n  margin: 0 auto;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: space-between;\n  gap: 2.5rem;\n  padding: 2rem 3rem;\n  max-height: 100%;\n  overflow: hidden;\n}\n.login-brand[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 2.5rem;\n  min-width: 0;\n}\n.login-brand-logo[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.login-brand-logo-icon[_ngcontent-%COMP%] {\n  width: 38px;\n  height: 38px;\n  background: var(--c-primary);\n  border-radius: 10px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.login-brand-logo-icon[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: contain;\n  padding: 6px;\n}\n.login-brand-logo-name[_ngcontent-%COMP%] {\n  font-size: 1.25rem;\n  font-weight: 700;\n  letter-spacing: -0.02em;\n  color: var(--c-text);\n}\n.login-brand-text[_ngcontent-%COMP%] {\n  margin-top: 0.5rem;\n}\n.login-brand-text[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: clamp(1.75rem, 3.5vw, 2.75rem);\n  font-weight: 800;\n  line-height: 1.2;\n  letter-spacing: -0.03em;\n  color: var(--c-text);\n  margin-bottom: 1rem;\n}\n.login-brand-text[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]   .hl[_ngcontent-%COMP%] {\n  color: var(--c-primary);\n}\n.login-brand-text[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 0.9375rem;\n  line-height: 1.7;\n  color: var(--c-muted);\n  max-width: 380px;\n  font-weight: 400;\n}\n.login-brand-footer[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: var(--c-muted);\n  font-weight: 500;\n  opacity: 0.75;\n}\n.login-card[_ngcontent-%COMP%] {\n  flex: 0 0 400px;\n  width: 400px;\n  max-width: 100%;\n}\n.login-card-inner[_ngcontent-%COMP%] {\n  background: var(--login-card-bg, rgba(255, 255, 255, 0.6));\n  backdrop-filter: blur(12px);\n  -webkit-backdrop-filter: blur(12px);\n  border: 1px solid var(--login-card-border, rgba(0, 0, 0, 0.07));\n  border-radius: 24px;\n  padding: 1.75rem 1.5rem 2rem;\n  position: relative;\n  overflow: hidden;\n}\n.dark[_nghost-%COMP%]   .login-card-inner[_ngcontent-%COMP%], .dark   [_nghost-%COMP%]   .login-card-inner[_ngcontent-%COMP%] {\n  background: rgba(17, 17, 24, 0.65);\n  border-color: rgba(255, 255, 255, 0.05);\n}\n.login-card-title[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  font-weight: 700;\n  letter-spacing: -0.02em;\n  color: var(--c-text);\n  margin-bottom: 0.25rem;\n}\n.login-card-subtitle[_ngcontent-%COMP%] {\n  font-size: 0.8125rem;\n  color: var(--c-muted);\n  margin-bottom: 1.25rem;\n}\n.login-form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n  width: 100%;\n}\n.login-field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n  width: 100%;\n}\n.login-label-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 0 2px;\n}\n.login-label[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  font-weight: 500;\n  color: var(--c-text);\n}\n.login-forgot[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  font-weight: 500;\n  color: var(--c-primary);\n  text-decoration: none;\n  transition: opacity 0.15s;\n}\n.login-forgot[_ngcontent-%COMP%]:hover {\n  opacity: 0.75;\n}\n.login-input-wrap[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  align-items: stretch;\n  width: 100%;\n}\n.login-input-wrap[_ngcontent-%COMP%]:focus-within   .login-input-icon-l[_ngcontent-%COMP%] {\n  color: var(--c-primary);\n}\n.login-input-icon-l[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 0.75rem;\n  top: 50%;\n  transform: translateY(-50%);\n  color: var(--c-muted);\n  pointer-events: none;\n  font-size: 18px;\n  transition: color 0.15s;\n}\n.login-input-icon-r[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 0.75rem;\n  top: 50%;\n  transform: translateY(-50%);\n  color: var(--c-muted);\n  cursor: pointer;\n  font-size: 18px;\n  transition: color 0.15s;\n}\n.login-input-icon-r[_ngcontent-%COMP%]:hover {\n  color: var(--c-primary);\n}\n.login-input[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 0.5rem 0.75rem 0.5rem 2.75rem;\n  border-radius: 0.5rem;\n  border: 1px solid var(--c-border);\n  background-color: var(--c-surface);\n  color: var(--c-text);\n  font-size: 0.875rem;\n  line-height: 1.5;\n  font-family: inherit;\n  outline: none;\n  transition:\n    border-color 0.15s,\n    box-shadow 0.15s,\n    background-color 0.25s;\n  box-sizing: border-box;\n}\n.login-input[_ngcontent-%COMP%]::placeholder {\n  color: var(--c-muted);\n  opacity: 0.7;\n}\n.login-input[_ngcontent-%COMP%]:focus {\n  border-color: var(--c-primary);\n  box-shadow: 0 0 0 3px var(--c-focus);\n}\n.login-input.pr[_ngcontent-%COMP%] {\n  padding-right: 2.75rem;\n}\n.login-remember[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  margin-left: 0;\n  margin-top: 0;\n  cursor: pointer;\n}\n.login-remember[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  font-weight: 500;\n  color: var(--c-muted);\n  -webkit-user-select: none;\n  user-select: none;\n  transition: color 0.15s;\n}\n.login-remember[_ngcontent-%COMP%]:hover   span[_ngcontent-%COMP%] {\n  color: var(--c-text);\n}\n.login-btn[_ngcontent-%COMP%] {\n  width: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  background: var(--c-primary);\n  color: #fff;\n  font-size: 0.9375rem;\n  font-weight: 700;\n  padding: 0.5rem 1.25rem;\n  border-radius: 0.5rem;\n  border: none;\n  cursor: pointer;\n  font-family: inherit;\n  transition: opacity 0.2s, transform 0.1s;\n}\n.login-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  opacity: 0.9;\n}\n.login-btn[_ngcontent-%COMP%]:active:not(:disabled) {\n  transform: scale(0.98);\n}\n.login-btn[_ngcontent-%COMP%]   .btn-arrow[_ngcontent-%COMP%] {\n  font-size: 18px;\n  transition: transform 0.2s;\n}\n.login-btn[_ngcontent-%COMP%]:hover:not(:disabled)   .btn-arrow[_ngcontent-%COMP%] {\n  transform: translateX(4px);\n}\n.login-register[_ngcontent-%COMP%] {\n  text-align: center;\n  font-size: 0.8125rem;\n  font-weight: 500;\n  color: var(--c-muted);\n  padding-top: 0.5rem;\n}\n.login-register[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: var(--c-primary);\n  font-weight: 700;\n  text-decoration: none;\n  margin-left: 4px;\n  transition: opacity 0.15s;\n}\n.login-register[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n  opacity: 0.75;\n}\n.login-error[_ngcontent-%COMP%] {\n  border-radius: 12px;\n  border: 1px solid rgba(239, 68, 68, 0.25);\n  background: rgba(239, 68, 68, 0.08);\n  padding: 0.875rem 1rem;\n  font-size: 0.8rem;\n  color: #ef4444;\n}\n#login-dark-btn[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 1rem;\n  right: 1rem;\n  width: 34px;\n  height: 34px;\n  border-radius: 8px;\n  border: 1px solid var(--c-border);\n  background: var(--c-surface);\n  color: var(--c-muted);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  transition: all 0.15s;\n  z-index: 50;\n}\n#login-dark-btn[_ngcontent-%COMP%]:hover {\n  background: var(--c-soft);\n  color: var(--c-text);\n}\n@media (max-width: 900px) {\n  .login-brand[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .login-wrap[_ngcontent-%COMP%] {\n    justify-content: center;\n    padding: 1.5rem 1.25rem;\n  }\n  .login-card[_ngcontent-%COMP%] {\n    flex: none;\n    width: 100%;\n    max-width: 380px;\n  }\n  .login-card-inner[_ngcontent-%COMP%] {\n    padding: 1.5rem 1.25rem 1.75rem;\n    border-radius: 20px;\n  }\n}\n/*# sourceMappingURL=login.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LoginComponent, [{
    type: Component,
    args: [{ selector: "app-pagina-login", standalone: true, imports: [CommonModule, RouterLink, FormsModule, TooltipDirective], template: `<button type="button" id="login-dark-btn" (click)="alternarTema()" aria-label="Alternar modo escuro" appTooltip="Alternar modo escuro">
  <span class="material-symbols-outlined" [textContent]="iconeTema" style="font-size:17px"></span>
</button>

<div class="login-page">
  <div class="login-bg-gradient"></div>
  <div class="login-blob-tr"></div>
  <div class="login-blob-bl"></div>

  <div class="login-wrap">
    <div class="login-brand">
      <div class="login-brand-logo">
        <div class="login-brand-logo-icon">
          <img src="assets/logo/logo.png" alt="Gestgo">
        </div>
        <span class="login-brand-logo-name">Gestgo</span>
      </div>
      <div class="login-brand-text">
        <h1>
          Fichas digitais que chegam<br>
          <span class="hl">antes do paciente.</span>
        </h1>
        <p>
          Fichas e consentimentos digitais para sua cl\xEDnica: o paciente preenche pelo link antes da consulta \u2014 protocolo, PDF autom\xE1tico e hist\xF3rico organizados.
        </p>
      </div>
      <p class="login-brand-footer">\xA9 {{ ano }} Gestgo. Todos os direitos reservados.</p>
    </div>

    <div class="login-card">
      <div class="login-card-inner">
        <h2 class="login-card-title">Bem-vindo de volta</h2>
        <p class="login-card-subtitle">Entre para acessar o painel da sua cl\xEDnica, fichas e protocolos.</p>

        @if (estadoErro) {
          <div class="login-error" style="margin-bottom:1.5rem">
            <p>{{ mensagemErro }}</p>
          </div>
        }

        <form (ngSubmit)="enviar()" class="login-form" #formLogin="ngForm">
          <div class="login-field">
            <div class="login-label-row">
              <label class="login-label" for="login-email">E-mail</label>
            </div>
            <div class="login-input-wrap">
              <span class="material-symbols-outlined login-input-icon-l">mail</span>
              <input type="email" name="email" id="login-email" [(ngModel)]="email"
                     class="login-input" placeholder="seu@email.com.br" required autofocus>
            </div>
          </div>

          <div class="login-field">
            <div class="login-label-row">
              <label class="login-label" for="login-password">Senha</label>
              <a routerLink="/esqueci-a-senha" class="login-forgot">Esqueceu a senha?</a>
            </div>
            <div class="login-input-wrap">
              <span class="material-symbols-outlined login-input-icon-l">lock</span>
              <input [type]="mostrarSenha ? 'text' : 'password'" name="password" id="login-password" [(ngModel)]="senha"
                     class="login-input pr" placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" required>
              <span class="material-symbols-outlined login-input-icon-r" (click)="mostrarSenha = !mostrarSenha"
                    role="button" aria-label="Mostrar ou ocultar senha" tabindex="0" appTooltip="Mostrar ou ocultar senha">{{ mostrarSenha ? 'visibility_off' : 'visibility' }}</span>
            </div>
          </div>

          <label class="login-remember">
            <input type="checkbox" name="remember" [(ngModel)]="lembrar">
            <span>Lembrar neste dispositivo</span>
          </label>

          <button type="submit" class="login-btn" [disabled]="estadoCarregando">
            @if (estadoCarregando) {
              <span>Entrando\u2026</span>
            } @else {
              <span>Acessar</span>
              <span class="material-symbols-outlined btn-arrow">arrow_forward</span>
            }
          </button>

          <p class="login-register">
            Ainda n\xE3o tem conta? <a routerLink="/comece">Criar conta gr\xE1tis</a>
          </p>
        </form>
      </div>
    </div>
  </div>
</div>
`, styles: ["/* src/app/paginas/login/login.component.css */\n:host {\n  display: block;\n  height: 100%;\n}\n.login-page {\n  height: 100vh;\n  min-height: 100vh;\n  max-height: 100dvh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  position: relative;\n  overflow: hidden;\n}\n.login-bg-gradient {\n  position: absolute;\n  inset: 0;\n  background:\n    linear-gradient(\n      135deg,\n      var(--c-soft),\n      var(--c-bg));\n  z-index: 0;\n}\n.login-blob-tr {\n  position: absolute;\n  top: -10%;\n  right: -10%;\n  width: 50%;\n  height: 50%;\n  background: var(--c-focus);\n  filter: blur(120px);\n  border-radius: 50%;\n  z-index: 0;\n}\n.login-blob-bl {\n  position: absolute;\n  bottom: -10%;\n  left: -10%;\n  width: 50%;\n  height: 50%;\n  background: var(--c-focus);\n  filter: blur(100px);\n  border-radius: 50%;\n  z-index: 0;\n}\n.login-wrap {\n  position: relative;\n  z-index: 10;\n  width: 100%;\n  max-width: 1100px;\n  margin: 0 auto;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: space-between;\n  gap: 2.5rem;\n  padding: 2rem 3rem;\n  max-height: 100%;\n  overflow: hidden;\n}\n.login-brand {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 2.5rem;\n  min-width: 0;\n}\n.login-brand-logo {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.login-brand-logo-icon {\n  width: 38px;\n  height: 38px;\n  background: var(--c-primary);\n  border-radius: 10px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.login-brand-logo-icon img {\n  width: 100%;\n  height: 100%;\n  object-fit: contain;\n  padding: 6px;\n}\n.login-brand-logo-name {\n  font-size: 1.25rem;\n  font-weight: 700;\n  letter-spacing: -0.02em;\n  color: var(--c-text);\n}\n.login-brand-text {\n  margin-top: 0.5rem;\n}\n.login-brand-text h1 {\n  font-size: clamp(1.75rem, 3.5vw, 2.75rem);\n  font-weight: 800;\n  line-height: 1.2;\n  letter-spacing: -0.03em;\n  color: var(--c-text);\n  margin-bottom: 1rem;\n}\n.login-brand-text h1 .hl {\n  color: var(--c-primary);\n}\n.login-brand-text p {\n  font-size: 0.9375rem;\n  line-height: 1.7;\n  color: var(--c-muted);\n  max-width: 380px;\n  font-weight: 400;\n}\n.login-brand-footer {\n  font-size: 0.75rem;\n  color: var(--c-muted);\n  font-weight: 500;\n  opacity: 0.75;\n}\n.login-card {\n  flex: 0 0 400px;\n  width: 400px;\n  max-width: 100%;\n}\n.login-card-inner {\n  background: var(--login-card-bg, rgba(255, 255, 255, 0.6));\n  backdrop-filter: blur(12px);\n  -webkit-backdrop-filter: blur(12px);\n  border: 1px solid var(--login-card-border, rgba(0, 0, 0, 0.07));\n  border-radius: 24px;\n  padding: 1.75rem 1.5rem 2rem;\n  position: relative;\n  overflow: hidden;\n}\n:host-context(.dark) .login-card-inner {\n  background: rgba(17, 17, 24, 0.65);\n  border-color: rgba(255, 255, 255, 0.05);\n}\n.login-card-title {\n  font-size: 1.5rem;\n  font-weight: 700;\n  letter-spacing: -0.02em;\n  color: var(--c-text);\n  margin-bottom: 0.25rem;\n}\n.login-card-subtitle {\n  font-size: 0.8125rem;\n  color: var(--c-muted);\n  margin-bottom: 1.25rem;\n}\n.login-form {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n  width: 100%;\n}\n.login-field {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n  width: 100%;\n}\n.login-label-row {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 0 2px;\n}\n.login-label {\n  font-size: 0.875rem;\n  font-weight: 500;\n  color: var(--c-text);\n}\n.login-forgot {\n  font-size: 0.875rem;\n  font-weight: 500;\n  color: var(--c-primary);\n  text-decoration: none;\n  transition: opacity 0.15s;\n}\n.login-forgot:hover {\n  opacity: 0.75;\n}\n.login-input-wrap {\n  position: relative;\n  display: flex;\n  align-items: stretch;\n  width: 100%;\n}\n.login-input-wrap:focus-within .login-input-icon-l {\n  color: var(--c-primary);\n}\n.login-input-icon-l {\n  position: absolute;\n  left: 0.75rem;\n  top: 50%;\n  transform: translateY(-50%);\n  color: var(--c-muted);\n  pointer-events: none;\n  font-size: 18px;\n  transition: color 0.15s;\n}\n.login-input-icon-r {\n  position: absolute;\n  right: 0.75rem;\n  top: 50%;\n  transform: translateY(-50%);\n  color: var(--c-muted);\n  cursor: pointer;\n  font-size: 18px;\n  transition: color 0.15s;\n}\n.login-input-icon-r:hover {\n  color: var(--c-primary);\n}\n.login-input {\n  width: 100%;\n  padding: 0.5rem 0.75rem 0.5rem 2.75rem;\n  border-radius: 0.5rem;\n  border: 1px solid var(--c-border);\n  background-color: var(--c-surface);\n  color: var(--c-text);\n  font-size: 0.875rem;\n  line-height: 1.5;\n  font-family: inherit;\n  outline: none;\n  transition:\n    border-color 0.15s,\n    box-shadow 0.15s,\n    background-color 0.25s;\n  box-sizing: border-box;\n}\n.login-input::placeholder {\n  color: var(--c-muted);\n  opacity: 0.7;\n}\n.login-input:focus {\n  border-color: var(--c-primary);\n  box-shadow: 0 0 0 3px var(--c-focus);\n}\n.login-input.pr {\n  padding-right: 2.75rem;\n}\n.login-remember {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  margin-left: 0;\n  margin-top: 0;\n  cursor: pointer;\n}\n.login-remember span {\n  font-size: 0.875rem;\n  font-weight: 500;\n  color: var(--c-muted);\n  -webkit-user-select: none;\n  user-select: none;\n  transition: color 0.15s;\n}\n.login-remember:hover span {\n  color: var(--c-text);\n}\n.login-btn {\n  width: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  background: var(--c-primary);\n  color: #fff;\n  font-size: 0.9375rem;\n  font-weight: 700;\n  padding: 0.5rem 1.25rem;\n  border-radius: 0.5rem;\n  border: none;\n  cursor: pointer;\n  font-family: inherit;\n  transition: opacity 0.2s, transform 0.1s;\n}\n.login-btn:hover:not(:disabled) {\n  opacity: 0.9;\n}\n.login-btn:active:not(:disabled) {\n  transform: scale(0.98);\n}\n.login-btn .btn-arrow {\n  font-size: 18px;\n  transition: transform 0.2s;\n}\n.login-btn:hover:not(:disabled) .btn-arrow {\n  transform: translateX(4px);\n}\n.login-register {\n  text-align: center;\n  font-size: 0.8125rem;\n  font-weight: 500;\n  color: var(--c-muted);\n  padding-top: 0.5rem;\n}\n.login-register a {\n  color: var(--c-primary);\n  font-weight: 700;\n  text-decoration: none;\n  margin-left: 4px;\n  transition: opacity 0.15s;\n}\n.login-register a:hover {\n  opacity: 0.75;\n}\n.login-error {\n  border-radius: 12px;\n  border: 1px solid rgba(239, 68, 68, 0.25);\n  background: rgba(239, 68, 68, 0.08);\n  padding: 0.875rem 1rem;\n  font-size: 0.8rem;\n  color: #ef4444;\n}\n#login-dark-btn {\n  position: fixed;\n  top: 1rem;\n  right: 1rem;\n  width: 34px;\n  height: 34px;\n  border-radius: 8px;\n  border: 1px solid var(--c-border);\n  background: var(--c-surface);\n  color: var(--c-muted);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  transition: all 0.15s;\n  z-index: 50;\n}\n#login-dark-btn:hover {\n  background: var(--c-soft);\n  color: var(--c-text);\n}\n@media (max-width: 900px) {\n  .login-brand {\n    display: none;\n  }\n  .login-wrap {\n    justify-content: center;\n    padding: 1.5rem 1.25rem;\n  }\n  .login-card {\n    flex: none;\n    width: 100%;\n    max-width: 380px;\n  }\n  .login-card-inner {\n    padding: 1.5rem 1.25rem 1.75rem;\n    border-radius: 20px;\n  }\n}\n/*# sourceMappingURL=login.component.css.map */\n"] }]
  }], () => [{ type: void 0, decorators: [{
    type: Inject,
    args: [PLATFORM_ID]
  }] }, { type: Router }, { type: AuthService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LoginComponent, { className: "LoginComponent", filePath: "src/app/paginas/login/login.component.ts", lineNumber: 16 });
})();
export {
  LoginComponent
};
//# sourceMappingURL=chunk-GPNXSWAZ.js.map
