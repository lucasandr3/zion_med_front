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

// src/app/paginas/privacidade/privacidade.component.ts
var PrivacidadeComponent = class _PrivacidadeComponent {
  dataAtual = /* @__PURE__ */ new Date();
  static \u0275fac = function PrivacidadeComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PrivacidadeComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PrivacidadeComponent, selectors: [["app-pagina-privacidade"]], decls: 49, vars: 5, consts: [[1, "min-h-screen", "py-12", "px-4", 2, "background", "var(--c-bg)", "color", "var(--c-text)"], [1, "max-w-3xl", "mx-auto"], [1, "text-2xl", "font-bold", "mb-6"], [1, "text-sm", "mb-6", 2, "color", "var(--c-muted)"], [1, "space-y-6", "text-sm", 2, "color", "var(--c-text)"], [1, "font-semibold", "text-base", "mb-2"], [1, "mt-10", "text-sm", 2, "color", "var(--c-muted)"], ["routerLink", "/", 1, "underline", "hover:no-underline"], ["routerLink", "/termos-de-uso", 1, "underline", "hover:no-underline"]], template: function PrivacidadeComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1", 2);
      \u0275\u0275text(3, "Pol\xEDtica de Privacidade");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "p", 3);
      \u0275\u0275text(5);
      \u0275\u0275pipe(6, "date");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "div", 4)(8, "section")(9, "h2", 5);
      \u0275\u0275text(10, "1. Respons\xE1vel");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "p");
      \u0275\u0275text(12, "O Gestgo \xE9 um sistema que permite a cl\xEDnicas e profissionais de sa\xFAde coletar e organizar dados por meio de formul\xE1rios digitais. Cada cl\xEDnica que utiliza o servi\xE7o \xE9 respons\xE1vel pelos dados que coleta e armazena atrav\xE9s da plataforma.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(13, "section")(14, "h2", 5);
      \u0275\u0275text(15, "2. Dados que coletamos");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "p");
      \u0275\u0275text(17, "Os dados preenchidos nos formul\xE1rios (incluindo nome, e-mail, dados de sa\xFAde e assinaturas) s\xE3o fornecidos voluntariamente pelo titular e utilizados exclusivamente para finalidades de atendimento, registro de consentimento e organiza\xE7\xE3o operacional da cl\xEDnica, em conformidade com a Lei Geral de Prote\xE7\xE3o de Dados (LGPD \u2013 Lei 13.709/2018).");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(18, "section")(19, "h2", 5);
      \u0275\u0275text(20, "3. Base legal e finalidade");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "p");
      \u0275\u0275text(22, "O tratamento \xE9 realizado com base em consentimento, execu\xE7\xE3o de contrato ou obriga\xE7\xE3o legal, conforme o caso. Os dados s\xE3o utilizados apenas para as finalidades informadas em cada formul\xE1rio e para cumprimento de obriga\xE7\xF5es legais e regulat\xF3rias aplic\xE1veis ao setor de sa\xFAde.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(23, "section")(24, "h2", 5);
      \u0275\u0275text(25, "4. Reten\xE7\xE3o de dados");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(26, "p");
      \u0275\u0275text(27, "Os protocolos e documentos gerados (incluindo formul\xE1rios preenchidos e assinaturas) s\xE3o mantidos pelo per\xEDodo necess\xE1rio ao cumprimento das finalidades descritas e das obriga\xE7\xF5es legais aplic\xE1veis (incluindo prazos de guarda de prontu\xE1rios e documentos m\xE9dicos conforme legisla\xE7\xE3o vigente). Ap\xF3s esse per\xEDodo, os dados podem ser anonimizados ou eliminados conforme pol\xEDtica interna da cl\xEDnica e da plataforma.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(28, "section")(29, "h2", 5);
      \u0275\u0275text(30, "5. Compartilhamento");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(31, "p");
      \u0275\u0275text(32, "Os dados n\xE3o s\xE3o vendidos. Eles podem ser compartilhados apenas quando necess\xE1rio para cumprimento de ordem judicial ou determina\xE7\xE3o de autoridade competente, ou com seu consentimento expresso.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(33, "section")(34, "h2", 5);
      \u0275\u0275text(35, "6. Seus direitos (LGPD)");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(36, "p");
      \u0275\u0275text(37, "Voc\xEA tem direito a acesso, corre\xE7\xE3o, anonimiza\xE7\xE3o, portabilidade, elimina\xE7\xE3o dos dados desnecess\xE1rios ou excessivos, revoga\xE7\xE3o do consentimento e informa\xE7\xE3o sobre compartilhamento. Para exercer esses direitos, entre em contato com a cl\xEDnica que coletou seus dados ou, quando aplic\xE1vel, com o canal de suporte do Gestgo.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(38, "section")(39, "h2", 5);
      \u0275\u0275text(40, "7. Seguran\xE7a");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(41, "p");
      \u0275\u0275text(42, "Adotamos medidas t\xE9cnicas e organizacionais para proteger os dados contra acesso n\xE3o autorizado, altera\xE7\xE3o, divulga\xE7\xE3o ou destrui\xE7\xE3o.");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(43, "p", 6)(44, "a", 7);
      \u0275\u0275text(45, "Voltar ao in\xEDcio");
      \u0275\u0275elementEnd();
      \u0275\u0275text(46, " \xA0\xB7\xA0 ");
      \u0275\u0275elementStart(47, "a", 8);
      \u0275\u0275text(48, "Termos de Uso");
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate1(" \xDAltima atualiza\xE7\xE3o: ", \u0275\u0275pipeBind3(6, 1, ctx.dataAtual, "dd/MM/yyyy", "pt-BR"), " ");
    }
  }, dependencies: [RouterLink, DatePipe], styles: ["\n\n/*# sourceMappingURL=privacidade.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PrivacidadeComponent, [{
    type: Component,
    args: [{ selector: "app-pagina-privacidade", standalone: true, imports: [RouterLink, DatePipe], template: `<div class="min-h-screen py-12 px-4" style="background: var(--c-bg); color: var(--c-text)">
  <div class="max-w-3xl mx-auto">
    <h1 class="text-2xl font-bold mb-6">Pol\xEDtica de Privacidade</h1>
    <p class="text-sm mb-6" style="color: var(--c-muted)">
      \xDAltima atualiza\xE7\xE3o: {{ dataAtual | date:'dd/MM/yyyy':'pt-BR' }}
    </p>

    <div class="space-y-6 text-sm" style="color: var(--c-text)">
      <section>
        <h2 class="font-semibold text-base mb-2">1. Respons\xE1vel</h2>
        <p>O Gestgo \xE9 um sistema que permite a cl\xEDnicas e profissionais de sa\xFAde coletar e organizar dados por meio de formul\xE1rios digitais. Cada cl\xEDnica que utiliza o servi\xE7o \xE9 respons\xE1vel pelos dados que coleta e armazena atrav\xE9s da plataforma.</p>
      </section>

      <section>
        <h2 class="font-semibold text-base mb-2">2. Dados que coletamos</h2>
        <p>Os dados preenchidos nos formul\xE1rios (incluindo nome, e-mail, dados de sa\xFAde e assinaturas) s\xE3o fornecidos voluntariamente pelo titular e utilizados exclusivamente para finalidades de atendimento, registro de consentimento e organiza\xE7\xE3o operacional da cl\xEDnica, em conformidade com a Lei Geral de Prote\xE7\xE3o de Dados (LGPD \u2013 Lei 13.709/2018).</p>
      </section>

      <section>
        <h2 class="font-semibold text-base mb-2">3. Base legal e finalidade</h2>
        <p>O tratamento \xE9 realizado com base em consentimento, execu\xE7\xE3o de contrato ou obriga\xE7\xE3o legal, conforme o caso. Os dados s\xE3o utilizados apenas para as finalidades informadas em cada formul\xE1rio e para cumprimento de obriga\xE7\xF5es legais e regulat\xF3rias aplic\xE1veis ao setor de sa\xFAde.</p>
      </section>

      <section>
        <h2 class="font-semibold text-base mb-2">4. Reten\xE7\xE3o de dados</h2>
        <p>Os protocolos e documentos gerados (incluindo formul\xE1rios preenchidos e assinaturas) s\xE3o mantidos pelo per\xEDodo necess\xE1rio ao cumprimento das finalidades descritas e das obriga\xE7\xF5es legais aplic\xE1veis (incluindo prazos de guarda de prontu\xE1rios e documentos m\xE9dicos conforme legisla\xE7\xE3o vigente). Ap\xF3s esse per\xEDodo, os dados podem ser anonimizados ou eliminados conforme pol\xEDtica interna da cl\xEDnica e da plataforma.</p>
      </section>

      <section>
        <h2 class="font-semibold text-base mb-2">5. Compartilhamento</h2>
        <p>Os dados n\xE3o s\xE3o vendidos. Eles podem ser compartilhados apenas quando necess\xE1rio para cumprimento de ordem judicial ou determina\xE7\xE3o de autoridade competente, ou com seu consentimento expresso.</p>
      </section>

      <section>
        <h2 class="font-semibold text-base mb-2">6. Seus direitos (LGPD)</h2>
        <p>Voc\xEA tem direito a acesso, corre\xE7\xE3o, anonimiza\xE7\xE3o, portabilidade, elimina\xE7\xE3o dos dados desnecess\xE1rios ou excessivos, revoga\xE7\xE3o do consentimento e informa\xE7\xE3o sobre compartilhamento. Para exercer esses direitos, entre em contato com a cl\xEDnica que coletou seus dados ou, quando aplic\xE1vel, com o canal de suporte do Gestgo.</p>
      </section>

      <section>
        <h2 class="font-semibold text-base mb-2">7. Seguran\xE7a</h2>
        <p>Adotamos medidas t\xE9cnicas e organizacionais para proteger os dados contra acesso n\xE3o autorizado, altera\xE7\xE3o, divulga\xE7\xE3o ou destrui\xE7\xE3o.</p>
      </section>
    </div>

    <p class="mt-10 text-sm" style="color: var(--c-muted)">
      <a routerLink="/" class="underline hover:no-underline">Voltar ao in\xEDcio</a>
      &nbsp;\xB7&nbsp;
      <a routerLink="/termos-de-uso" class="underline hover:no-underline">Termos de Uso</a>
    </p>
  </div>
</div>
`, styles: ["/* src/app/paginas/privacidade/privacidade.component.css */\n/*# sourceMappingURL=privacidade.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PrivacidadeComponent, { className: "PrivacidadeComponent", filePath: "src/app/paginas/privacidade/privacidade.component.ts", lineNumber: 12 });
})();
export {
  PrivacidadeComponent
};
//# sourceMappingURL=chunk-KU5S2UQN.js.map
