import {
  RouterLink
} from "./chunk-C2NWBPZH.js";
import {
  Component,
  DatePipe,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵpipe,
  ɵɵpipeBind3,
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-GRLISYEV.js";

// src/app/paginas/termos/termos.component.ts
var TermosComponent = class _TermosComponent {
  dataAtual = /* @__PURE__ */ new Date();
  static \u0275fac = function TermosComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TermosComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TermosComponent, selectors: [["app-pagina-termos"]], decls: 54, vars: 5, consts: [[1, "min-h-screen", "py-12", "px-4", 2, "background", "var(--c-bg)", "color", "var(--c-text)"], [1, "max-w-3xl", "mx-auto"], [1, "text-2xl", "font-bold", "mb-6"], [1, "text-sm", "mb-6", 2, "color", "var(--c-muted)"], [1, "space-y-6", "text-sm", 2, "color", "var(--c-text)"], [1, "font-semibold", "text-base", "mb-2"], [1, "mt-10", "text-sm", 2, "color", "var(--c-muted)"], ["routerLink", "/", 1, "underline", "hover:no-underline"], ["routerLink", "/privacidade", 1, "underline", "hover:no-underline"]], template: function TermosComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1", 2);
      \u0275\u0275text(3, "Termos de Uso");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "p", 3);
      \u0275\u0275text(5);
      \u0275\u0275pipe(6, "date");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "div", 4)(8, "section")(9, "h2", 5);
      \u0275\u0275text(10, "1. Aceita\xE7\xE3o");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "p");
      \u0275\u0275text(12, "Ao acessar e utilizar o Gestgo, voc\xEA concorda com estes Termos de Uso. Se n\xE3o concordar, n\xE3o utilize o servi\xE7o.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(13, "section")(14, "h2", 5);
      \u0275\u0275text(15, "2. Descri\xE7\xE3o do servi\xE7o");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "p");
      \u0275\u0275text(17, "O Gestgo \xE9 uma plataforma de governan\xE7a documental para cl\xEDnicas, que permite a cria\xE7\xE3o de formul\xE1rios operacionais, coleta de consentimentos, assinatura eletr\xF4nica, gera\xE7\xE3o de PDF e fluxo de aprova\xE7\xE3o de protocolos. O uso \xE9 destinado a profissionais e estabelecimentos de sa\xFAde.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(18, "section")(19, "h2", 5);
      \u0275\u0275text(20, "3. Uso adequado");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "p");
      \u0275\u0275text(22, "O usu\xE1rio compromete-se a utilizar o servi\xE7o de forma l\xEDcita, em conformidade com a legisla\xE7\xE3o vigente (incluindo LGPD e normas do setor de sa\xFAde), e a n\xE3o utilizar a plataforma para fins il\xEDcitos, fraudulentos ou que violem direitos de terceiros.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(23, "section")(24, "h2", 5);
      \u0275\u0275text(25, "4. Conta e responsabilidade");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(26, "p");
      \u0275\u0275text(27, "As cl\xEDnicas e usu\xE1rios s\xE3o respons\xE1veis pela veracidade dos dados cadastrais e pelo uso de suas credenciais. O Gestgo n\xE3o se responsabiliza por uso indevido da conta em caso de neglig\xEAncia do titular.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(28, "section")(29, "h2", 5);
      \u0275\u0275text(30, "5. Propriedade intelectual");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(31, "p");
      \u0275\u0275text(32, "O software, marcas e conte\xFAdos da plataforma Gestgo s\xE3o de propriedade do titular do servi\xE7o. O usu\xE1rio n\xE3o adquire direitos sobre eles, exceto o direito de uso conforme contratado.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(33, "section")(34, "h2", 5);
      \u0275\u0275text(35, "6. Limita\xE7\xE3o de responsabilidade");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(36, "p");
      \u0275\u0275text(37, 'O Gestgo \xE9 oferecido \\"como est\xE1\\". Na medida permitida pela lei, n\xE3o nos responsabilizamos por danos indiretos, incidentais ou consequenciais decorrentes do uso ou da indisponibilidade do servi\xE7o. A responsabilidade pela adequa\xE7\xE3o dos formul\xE1rios e do fluxo de trabalho \xE0s normas aplic\xE1veis \xE9 da cl\xEDnica contratante.');
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(38, "section")(39, "h2", 5);
      \u0275\u0275text(40, "7. Altera\xE7\xF5es");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(41, "p");
      \u0275\u0275text(42, "Estes termos podem ser alterados a qualquer momento. O uso continuado do servi\xE7o ap\xF3s a publica\xE7\xE3o de altera\xE7\xF5es constitui aceita\xE7\xE3o dos novos termos. Recomendamos a leitura peri\xF3dica desta p\xE1gina.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(43, "section")(44, "h2", 5);
      \u0275\u0275text(45, "8. Contato");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(46, "p");
      \u0275\u0275text(47, "Para d\xFAvidas sobre estes Termos de Uso, entre em contato atrav\xE9s do canal dispon\xEDvel no site ou na plataforma.");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(48, "p", 6)(49, "a", 7);
      \u0275\u0275text(50, "Voltar ao in\xEDcio");
      \u0275\u0275elementEnd();
      \u0275\u0275text(51, " \xA0\xB7\xA0 ");
      \u0275\u0275elementStart(52, "a", 8);
      \u0275\u0275text(53, "Pol\xEDtica de Privacidade");
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate1(" \xDAltima atualiza\xE7\xE3o: ", \u0275\u0275pipeBind3(6, 1, ctx.dataAtual, "dd/MM/yyyy", "pt-BR"), " ");
    }
  }, dependencies: [RouterLink, DatePipe], styles: ["\n\n/*# sourceMappingURL=termos.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TermosComponent, [{
    type: Component,
    args: [{ selector: "app-pagina-termos", standalone: true, imports: [RouterLink, DatePipe], template: `<div class="min-h-screen py-12 px-4" style="background: var(--c-bg); color: var(--c-text)">
  <div class="max-w-3xl mx-auto">
    <h1 class="text-2xl font-bold mb-6">Termos de Uso</h1>
    <p class="text-sm mb-6" style="color: var(--c-muted)">
      \xDAltima atualiza\xE7\xE3o: {{ dataAtual | date:'dd/MM/yyyy':'pt-BR' }}
    </p>

    <div class="space-y-6 text-sm" style="color: var(--c-text)">
      <section>
        <h2 class="font-semibold text-base mb-2">1. Aceita\xE7\xE3o</h2>
        <p>Ao acessar e utilizar o Gestgo, voc\xEA concorda com estes Termos de Uso. Se n\xE3o concordar, n\xE3o utilize o servi\xE7o.</p>
      </section>

      <section>
        <h2 class="font-semibold text-base mb-2">2. Descri\xE7\xE3o do servi\xE7o</h2>
        <p>O Gestgo \xE9 uma plataforma de governan\xE7a documental para cl\xEDnicas, que permite a cria\xE7\xE3o de formul\xE1rios operacionais, coleta de consentimentos, assinatura eletr\xF4nica, gera\xE7\xE3o de PDF e fluxo de aprova\xE7\xE3o de protocolos. O uso \xE9 destinado a profissionais e estabelecimentos de sa\xFAde.</p>
      </section>

      <section>
        <h2 class="font-semibold text-base mb-2">3. Uso adequado</h2>
        <p>O usu\xE1rio compromete-se a utilizar o servi\xE7o de forma l\xEDcita, em conformidade com a legisla\xE7\xE3o vigente (incluindo LGPD e normas do setor de sa\xFAde), e a n\xE3o utilizar a plataforma para fins il\xEDcitos, fraudulentos ou que violem direitos de terceiros.</p>
      </section>

      <section>
        <h2 class="font-semibold text-base mb-2">4. Conta e responsabilidade</h2>
        <p>As cl\xEDnicas e usu\xE1rios s\xE3o respons\xE1veis pela veracidade dos dados cadastrais e pelo uso de suas credenciais. O Gestgo n\xE3o se responsabiliza por uso indevido da conta em caso de neglig\xEAncia do titular.</p>
      </section>

      <section>
        <h2 class="font-semibold text-base mb-2">5. Propriedade intelectual</h2>
        <p>O software, marcas e conte\xFAdos da plataforma Gestgo s\xE3o de propriedade do titular do servi\xE7o. O usu\xE1rio n\xE3o adquire direitos sobre eles, exceto o direito de uso conforme contratado.</p>
      </section>

      <section>
        <h2 class="font-semibold text-base mb-2">6. Limita\xE7\xE3o de responsabilidade</h2>
        <p>O Gestgo \xE9 oferecido \\"como est\xE1\\". Na medida permitida pela lei, n\xE3o nos responsabilizamos por danos indiretos, incidentais ou consequenciais decorrentes do uso ou da indisponibilidade do servi\xE7o. A responsabilidade pela adequa\xE7\xE3o dos formul\xE1rios e do fluxo de trabalho \xE0s normas aplic\xE1veis \xE9 da cl\xEDnica contratante.</p>
      </section>

      <section>
        <h2 class="font-semibold text-base mb-2">7. Altera\xE7\xF5es</h2>
        <p>Estes termos podem ser alterados a qualquer momento. O uso continuado do servi\xE7o ap\xF3s a publica\xE7\xE3o de altera\xE7\xF5es constitui aceita\xE7\xE3o dos novos termos. Recomendamos a leitura peri\xF3dica desta p\xE1gina.</p>
      </section>

      <section>
        <h2 class="font-semibold text-base mb-2">8. Contato</h2>
        <p>Para d\xFAvidas sobre estes Termos de Uso, entre em contato atrav\xE9s do canal dispon\xEDvel no site ou na plataforma.</p>
      </section>
    </div>

    <p class="mt-10 text-sm" style="color: var(--c-muted)">
      <a routerLink="/" class="underline hover:no-underline">Voltar ao in\xEDcio</a>
      &nbsp;\xB7&nbsp;
      <a routerLink="/privacidade" class="underline hover:no-underline">Pol\xEDtica de Privacidade</a>
    </p>
  </div>
</div>
`, styles: ["/* src/app/paginas/termos/termos.component.css */\n/*# sourceMappingURL=termos.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TermosComponent, { className: "TermosComponent", filePath: "src/app/paginas/termos/termos.component.ts", lineNumber: 12 });
})();
export {
  TermosComponent
};
//# sourceMappingURL=chunk-ZBUPYI2R.js.map
