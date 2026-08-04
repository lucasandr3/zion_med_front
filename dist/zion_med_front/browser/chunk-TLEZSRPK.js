import {
  PublicPageBodyService
} from "./chunk-IQRZ5S5Y.js";
import {
  Router,
  RouterLink
} from "./chunk-C2NWBPZH.js";
import {
  CommonModule,
  Component,
  UpperCasePipe,
  inject,
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
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵproperty,
  ɵɵsanitizeUrl,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-GRLISYEV.js";

// src/app/paginas/formulario-publico/formulario-publico-sucesso.component.ts
function FormularioPublicoSucessoComponent_Conditional_8_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 12);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("src", ctx_r0.clinicLogoUrl, \u0275\u0275sanitizeUrl);
  }
}
function FormularioPublicoSucessoComponent_Conditional_8_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 13);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "uppercase");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(2, 1, ctx_r0.clinicName.charAt(0)));
  }
}
function FormularioPublicoSucessoComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10)(1, "div", 11);
    \u0275\u0275conditionalCreate(2, FormularioPublicoSucessoComponent_Conditional_8_Conditional_2_Template, 1, 1, "img", 12)(3, FormularioPublicoSucessoComponent_Conditional_8_Conditional_3_Template, 3, 3, "span", 13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 14);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "p", 7);
    \u0275\u0275text(7, "Recebemos seu formul\xE1rio. Obrigado!");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275classProp("logo-wrap--img", !!ctx_r0.clinicLogoUrl);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.clinicLogoUrl ? 2 : 3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.clinicName);
  }
}
function FormularioPublicoSucessoComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 7);
    \u0275\u0275text(1, "Seu protocolo foi registrado com sucesso.");
    \u0275\u0275elementEnd();
  }
}
function FormularioPublicoSucessoComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15)(1, "p", 16);
    \u0275\u0275text(2, "Protocolo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 17);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "p", 18)(6, "span", 19);
    \u0275\u0275text(7, "info");
    \u0275\u0275elementEnd();
    \u0275\u0275text(8, " Guarde este n\xFAmero para acompanhamento. ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.protocolNumber);
  }
}
var FormularioPublicoSucessoComponent = class _FormularioPublicoSucessoComponent {
  protocolNumber = null;
  clinicName = null;
  clinicLogoUrl = null;
  dark = false;
  router = inject(Router);
  publicPageBody = inject(PublicPageBodyService);
  constructor() {
    const state = this.router.getCurrentNavigation()?.extras?.state;
    this.protocolNumber = state?.protocol_number ?? null;
    this.clinicName = state?.clinic_name ?? null;
    const logo = state?.clinic_logo_url;
    this.clinicLogoUrl = logo != null && String(logo).trim() !== "" ? String(logo) : null;
  }
  ngOnInit() {
    this.publicPageBody.enterPublicPage();
    try {
      this.dark = localStorage.getItem("gestgo_form_dark_mode") === "1";
    } catch {
    }
  }
  ngOnDestroy() {
    this.publicPageBody.leavePublicPage();
  }
  static \u0275fac = function FormularioPublicoSucessoComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FormularioPublicoSucessoComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _FormularioPublicoSucessoComponent, selectors: [["app-formulario-publico-sucesso"]], decls: 14, vars: 4, consts: [[1, "sucesso-page"], [1, "sucesso-inner", "max-w-md", "mx-auto", "px-4"], [1, "sucesso-card", 2, "border-width", "1px"], ["aria-hidden", "true", 1, "success-icon-wrap"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", 1, "w-10", "h-10", "text-white"], ["points", "20 6 9 17 4 12"], [1, "sucesso-title"], [1, "bio-muted", "text-sm", "mb-5", "leading-relaxed"], [1, "mt-6"], ["routerLink", "/", 1, "btn-primary", "inline-flex", "items-center", "justify-center", "gap-2"], [1, "flex", "items-center", "justify-center", "gap-2", "mb-3"], [1, "logo-wrap", "shrink-0"], ["alt", "", "loading", "lazy", 3, "src"], [1, "logo-initial"], [1, "bio-text", "font-semibold", "text-sm"], [1, "protocol-box", "bio-bg-soft", "bio-border", "rounded-xl", "py-4", "px-5", 2, "border-width", "1px"], [1, "text-xs", "bio-muted", "uppercase", "tracking-wider", "mb-1", "font-semibold"], [1, "text-xl", "font-mono", "font-semibold", "bio-text"], [1, "text-xs", "bio-muted", "mt-3", "flex", "items-center", "justify-center", "gap-1"], [1, "material-symbols-outlined", 2, "font-size", "14px"]], template: function FormularioPublicoSucessoComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(4, "svg", 4);
      \u0275\u0275element(5, "polyline", 5);
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(6, "h1", 6);
      \u0275\u0275text(7, "Ficha enviada!");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(8, FormularioPublicoSucessoComponent_Conditional_8_Template, 8, 4)(9, FormularioPublicoSucessoComponent_Conditional_9_Template, 2, 0, "p", 7);
      \u0275\u0275conditionalCreate(10, FormularioPublicoSucessoComponent_Conditional_10_Template, 9, 1);
      \u0275\u0275elementStart(11, "div", 8)(12, "a", 9);
      \u0275\u0275text(13, "Voltar ao in\xEDcio");
      \u0275\u0275elementEnd()()()()();
    }
    if (rf & 2) {
      \u0275\u0275classProp("dark", ctx.dark);
      \u0275\u0275advance(8);
      \u0275\u0275conditional(ctx.clinicName ? 8 : 9);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.protocolNumber ? 10 : -1);
    }
  }, dependencies: [CommonModule, RouterLink, UpperCasePipe], styles: ['@import "https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600&family=Instrument+Serif:ital,wght@0,400&display=swap";\n\n\n\n[_nghost-%COMP%] {\n  display: block;\n  font-family:\n    "DM Sans",\n    system-ui,\n    sans-serif;\n  -webkit-font-smoothing: antialiased;\n}\n.sucesso-page[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  background: #faf8f4;\n  color: #1e1b18;\n}\n.sucesso-page.dark[_ngcontent-%COMP%] {\n  background: #0f0e0c;\n  color: #f0ebe3;\n}\n.sucesso-inner[_ngcontent-%COMP%] {\n  padding-top: 4rem;\n  padding-bottom: 3rem;\n}\n.sucesso-card[_ngcontent-%COMP%] {\n  border-radius: 1rem;\n  padding: 2rem 1.5rem;\n  text-align: center;\n  background: #fff;\n  border: 1px solid #e8dece;\n}\n.sucesso-page.dark[_ngcontent-%COMP%]   .sucesso-card[_ngcontent-%COMP%] {\n  background: #1a1814;\n  border-color: #2e2a24;\n}\n.success-icon-wrap[_ngcontent-%COMP%] {\n  width: 5rem;\n  height: 5rem;\n  border-radius: 50%;\n  background: #3a6b5d;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin: 0 auto 1.5rem;\n  box-shadow: 0 10px 30px rgba(58, 107, 93, 0.25);\n  animation: _ngcontent-%COMP%_sucessoPop 0.5s ease both;\n}\n.success-icon-wrap[_ngcontent-%COMP%]   .material-symbols-outlined[_ngcontent-%COMP%] {\n  font-size: 2.25rem;\n  color: #fff;\n}\n.sucesso-page.dark[_ngcontent-%COMP%]   .success-icon-wrap[_ngcontent-%COMP%] {\n  background: #4a7c6e;\n  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);\n}\n@keyframes _ngcontent-%COMP%_sucessoPop {\n  0% {\n    transform: scale(0) rotate(-12deg);\n  }\n  70% {\n    transform: scale(1.08) rotate(4deg);\n  }\n  100% {\n    transform: scale(1) rotate(0);\n  }\n}\n.sucesso-title[_ngcontent-%COMP%] {\n  font-family:\n    "Instrument Serif",\n    Georgia,\n    serif;\n  font-size: 1.75rem;\n  font-weight: 400;\n  font-style: normal;\n  font-synthesis: none;\n  margin: 0 0 0.5rem;\n  color: #1e1b18;\n}\n.sucesso-page.dark[_ngcontent-%COMP%]   .sucesso-title[_ngcontent-%COMP%] {\n  color: #faf8f4;\n}\n.bio-text[_ngcontent-%COMP%] {\n  color: #1e1b18;\n}\n.sucesso-page.dark[_ngcontent-%COMP%]   .bio-text[_ngcontent-%COMP%] {\n  color: #f0ebe3;\n}\n.bio-muted[_ngcontent-%COMP%] {\n  color: #9e7f5e;\n}\n.sucesso-page.dark[_ngcontent-%COMP%]   .bio-muted[_ngcontent-%COMP%] {\n  color: #a89880;\n}\n.bio-border[_ngcontent-%COMP%] {\n  border-color: #e8dece;\n}\n.sucesso-page.dark[_ngcontent-%COMP%]   .bio-border[_ngcontent-%COMP%] {\n  border-color: #2e2a24;\n}\n.bio-bg-soft[_ngcontent-%COMP%] {\n  background: #f3ede3;\n}\n.sucesso-page.dark[_ngcontent-%COMP%]   .bio-bg-soft[_ngcontent-%COMP%] {\n  background: #161814;\n}\n.logo-wrap[_ngcontent-%COMP%] {\n  width: 3rem;\n  height: 3rem;\n  border-radius: 0.75rem;\n  background: #110f0d;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.logo-wrap--img[_ngcontent-%COMP%] {\n  padding: 2px;\n  background: #fff;\n  overflow: hidden;\n  border: 1px solid #e8dece;\n}\n.logo-wrap--img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: contain;\n  display: block;\n  border-radius: 0.55rem;\n}\n.sucesso-page.dark[_ngcontent-%COMP%]   .logo-wrap[_ngcontent-%COMP%] {\n  background: #f3ede3;\n}\n.sucesso-page.dark[_ngcontent-%COMP%]   .logo-wrap--img[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.08);\n  border-color: #2e2a24;\n}\n.logo-initial[_ngcontent-%COMP%] {\n  font-family:\n    "Instrument Serif",\n    Georgia,\n    serif;\n  font-size: 1.125rem;\n  font-weight: 600;\n  color: #faf8f4;\n}\n.sucesso-page.dark[_ngcontent-%COMP%]   .logo-initial[_ngcontent-%COMP%] {\n  color: #110f0d;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  background: #1e1b18;\n  color: #fff;\n  border: none;\n  padding: 0.875rem 1.25rem;\n  border-radius: 0.875rem;\n  font-size: 0.875rem;\n  font-weight: 600;\n  font-family: inherit;\n  text-decoration: none;\n  cursor: pointer;\n  transition: background 0.15s;\n}\n.sucesso-page.dark[_ngcontent-%COMP%]   .btn-primary[_ngcontent-%COMP%] {\n  background: #f0ebe3;\n  color: #110f0d;\n}\n.btn-primary[_ngcontent-%COMP%]:hover {\n  background: #2d2a26;\n}\n.sucesso-page.dark[_ngcontent-%COMP%]   .btn-primary[_ngcontent-%COMP%]:hover {\n  background: #fff;\n}\n/*# sourceMappingURL=formulario-publico-sucesso.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FormularioPublicoSucessoComponent, [{
    type: Component,
    args: [{ selector: "app-formulario-publico-sucesso", standalone: true, imports: [CommonModule, RouterLink], template: '<div class="sucesso-page" [class.dark]="dark">\n  <div class="sucesso-inner max-w-md mx-auto px-4">\n    <div class="sucesso-card" style="border-width: 1px">\n      <div class="success-icon-wrap" aria-hidden="true">\n        <svg class="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">\n          <polyline points="20 6 9 17 4 12" />\n        </svg>\n      </div>\n      <h1 class="sucesso-title">Ficha enviada!</h1>\n      @if (clinicName) {\n        <div class="flex items-center justify-center gap-2 mb-3">\n          <div class="logo-wrap shrink-0" [class.logo-wrap--img]="!!clinicLogoUrl">\n            @if (clinicLogoUrl) {\n              <img [src]="clinicLogoUrl" alt="" loading="lazy" />\n            } @else {\n              <span class="logo-initial">{{ clinicName.charAt(0) | uppercase }}</span>\n            }\n          </div>\n          <p class="bio-text font-semibold text-sm">{{ clinicName }}</p>\n        </div>\n        <p class="bio-muted text-sm mb-5 leading-relaxed">Recebemos seu formul\xE1rio. Obrigado!</p>\n      } @else {\n        <p class="bio-muted text-sm mb-5 leading-relaxed">Seu protocolo foi registrado com sucesso.</p>\n      }\n      @if (protocolNumber) {\n        <div class="protocol-box bio-bg-soft bio-border rounded-xl py-4 px-5" style="border-width: 1px">\n          <p class="text-xs bio-muted uppercase tracking-wider mb-1 font-semibold">Protocolo</p>\n          <p class="text-xl font-mono font-semibold bio-text">{{ protocolNumber }}</p>\n        </div>\n        <p class="text-xs bio-muted mt-3 flex items-center justify-center gap-1">\n          <span class="material-symbols-outlined" style="font-size: 14px">info</span>\n          Guarde este n\xFAmero para acompanhamento.\n        </p>\n      }\n      <div class="mt-6">\n        <a routerLink="/" class="btn-primary inline-flex items-center justify-center gap-2">Voltar ao in\xEDcio</a>\n      </div>\n    </div>\n  </div>\n</div>\n', styles: ['@import "https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600&family=Instrument+Serif:ital,wght@0,400&display=swap";\n\n/* src/app/paginas/formulario-publico/formulario-publico-sucesso.component.css */\n:host {\n  display: block;\n  font-family:\n    "DM Sans",\n    system-ui,\n    sans-serif;\n  -webkit-font-smoothing: antialiased;\n}\n.sucesso-page {\n  min-height: 100vh;\n  background: #faf8f4;\n  color: #1e1b18;\n}\n.sucesso-page.dark {\n  background: #0f0e0c;\n  color: #f0ebe3;\n}\n.sucesso-inner {\n  padding-top: 4rem;\n  padding-bottom: 3rem;\n}\n.sucesso-card {\n  border-radius: 1rem;\n  padding: 2rem 1.5rem;\n  text-align: center;\n  background: #fff;\n  border: 1px solid #e8dece;\n}\n.sucesso-page.dark .sucesso-card {\n  background: #1a1814;\n  border-color: #2e2a24;\n}\n.success-icon-wrap {\n  width: 5rem;\n  height: 5rem;\n  border-radius: 50%;\n  background: #3a6b5d;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin: 0 auto 1.5rem;\n  box-shadow: 0 10px 30px rgba(58, 107, 93, 0.25);\n  animation: sucessoPop 0.5s ease both;\n}\n.success-icon-wrap .material-symbols-outlined {\n  font-size: 2.25rem;\n  color: #fff;\n}\n.sucesso-page.dark .success-icon-wrap {\n  background: #4a7c6e;\n  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);\n}\n@keyframes sucessoPop {\n  0% {\n    transform: scale(0) rotate(-12deg);\n  }\n  70% {\n    transform: scale(1.08) rotate(4deg);\n  }\n  100% {\n    transform: scale(1) rotate(0);\n  }\n}\n.sucesso-title {\n  font-family:\n    "Instrument Serif",\n    Georgia,\n    serif;\n  font-size: 1.75rem;\n  font-weight: 400;\n  font-style: normal;\n  font-synthesis: none;\n  margin: 0 0 0.5rem;\n  color: #1e1b18;\n}\n.sucesso-page.dark .sucesso-title {\n  color: #faf8f4;\n}\n.bio-text {\n  color: #1e1b18;\n}\n.sucesso-page.dark .bio-text {\n  color: #f0ebe3;\n}\n.bio-muted {\n  color: #9e7f5e;\n}\n.sucesso-page.dark .bio-muted {\n  color: #a89880;\n}\n.bio-border {\n  border-color: #e8dece;\n}\n.sucesso-page.dark .bio-border {\n  border-color: #2e2a24;\n}\n.bio-bg-soft {\n  background: #f3ede3;\n}\n.sucesso-page.dark .bio-bg-soft {\n  background: #161814;\n}\n.logo-wrap {\n  width: 3rem;\n  height: 3rem;\n  border-radius: 0.75rem;\n  background: #110f0d;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.logo-wrap--img {\n  padding: 2px;\n  background: #fff;\n  overflow: hidden;\n  border: 1px solid #e8dece;\n}\n.logo-wrap--img img {\n  width: 100%;\n  height: 100%;\n  object-fit: contain;\n  display: block;\n  border-radius: 0.55rem;\n}\n.sucesso-page.dark .logo-wrap {\n  background: #f3ede3;\n}\n.sucesso-page.dark .logo-wrap--img {\n  background: rgba(255, 255, 255, 0.08);\n  border-color: #2e2a24;\n}\n.logo-initial {\n  font-family:\n    "Instrument Serif",\n    Georgia,\n    serif;\n  font-size: 1.125rem;\n  font-weight: 600;\n  color: #faf8f4;\n}\n.sucesso-page.dark .logo-initial {\n  color: #110f0d;\n}\n.btn-primary {\n  background: #1e1b18;\n  color: #fff;\n  border: none;\n  padding: 0.875rem 1.25rem;\n  border-radius: 0.875rem;\n  font-size: 0.875rem;\n  font-weight: 600;\n  font-family: inherit;\n  text-decoration: none;\n  cursor: pointer;\n  transition: background 0.15s;\n}\n.sucesso-page.dark .btn-primary {\n  background: #f0ebe3;\n  color: #110f0d;\n}\n.btn-primary:hover {\n  background: #2d2a26;\n}\n.sucesso-page.dark .btn-primary:hover {\n  background: #fff;\n}\n/*# sourceMappingURL=formulario-publico-sucesso.component.css.map */\n'] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(FormularioPublicoSucessoComponent, { className: "FormularioPublicoSucessoComponent", filePath: "src/app/paginas/formulario-publico/formulario-publico-sucesso.component.ts", lineNumber: 13 });
})();
export {
  FormularioPublicoSucessoComponent
};
//# sourceMappingURL=chunk-TLEZSRPK.js.map
