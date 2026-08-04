import {
  PlataformaHeaderService
} from "./chunk-Y5AJ4MLH.js";
import {
  PlataformaService
} from "./chunk-YNOSNX2Z.js";
import {
  LoadingService,
  ZmSkeletonListComponent
} from "./chunk-GKI5AWTV.js";
import "./chunk-7WBHVE2H.js";
import {
  ConfirmDialogService
} from "./chunk-RISAXZFK.js";
import {
  ToastService
} from "./chunk-EZUVP6MG.js";
import "./chunk-IBJWGIJV.js";
import {
  RouterLink
} from "./chunk-C2NWBPZH.js";
import {
  CommonModule,
  Component,
  __async,
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
  ɵɵpureFunction1,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-GRLISYEV.js";

// src/app/paginas/plataforma/plataforma-planos/plataforma-planos.component.ts
var _c0 = (a0) => ["/plataforma/planos", a0, "editar"];
var _forTrack0 = ($index, $item) => $item.id;
function PlataformaPlanosComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "zm-skeleton-list", 5);
  }
  if (rf & 2) {
    \u0275\u0275property("rows", 6);
  }
}
function PlataformaPlanosComponent_Conditional_9_Template(rf, ctx) {
}
function PlataformaPlanosComponent_Conditional_10_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6)(1, "p", 8);
    \u0275\u0275text(2, "N\xE3o foi poss\xEDvel carregar os planos.");
    \u0275\u0275elementEnd()();
  }
}
function PlataformaPlanosComponent_Conditional_10_Conditional_1_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9)(1, "p", 11);
    \u0275\u0275text(2, "Nenhum plano cadastrado.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "a", 12);
    \u0275\u0275text(4, "Criar primeiro plano");
    \u0275\u0275elementEnd()();
  }
}
function PlataformaPlanosComponent_Conditional_10_Conditional_1_Conditional_2_For_2_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 19);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(p_r2.description);
  }
}
function PlataformaPlanosComponent_Conditional_10_Conditional_1_Conditional_2_For_2_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 21);
    \u0275\u0275text(1, "Inativo");
    \u0275\u0275elementEnd();
  }
}
function PlataformaPlanosComponent_Conditional_10_Conditional_1_Conditional_2_For_2_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 25);
  }
}
function PlataformaPlanosComponent_Conditional_10_Conditional_1_Conditional_2_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 13)(1, "div", 14)(2, "span", 15);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 16);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "p", 17);
    \u0275\u0275text(7);
    \u0275\u0275elementStart(8, "span", 18);
    \u0275\u0275text(9, "/m\xEAs");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(10, PlataformaPlanosComponent_Conditional_10_Conditional_1_Conditional_2_For_2_Conditional_10_Template, 2, 1, "p", 19);
    \u0275\u0275elementStart(11, "div", 20);
    \u0275\u0275conditionalCreate(12, PlataformaPlanosComponent_Conditional_10_Conditional_1_Conditional_2_For_2_Conditional_12_Template, 2, 0, "span", 21);
    \u0275\u0275elementStart(13, "a", 22)(14, "span", 23);
    \u0275\u0275text(15, "edit");
    \u0275\u0275elementEnd();
    \u0275\u0275text(16, " Editar ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "button", 24);
    \u0275\u0275listener("click", function PlataformaPlanosComponent_Conditional_10_Conditional_1_Conditional_2_For_2_Template_button_click_17_listener() {
      const p_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r2.excluir(p_r2));
    })("mouseenter", function PlataformaPlanosComponent_Conditional_10_Conditional_1_Conditional_2_For_2_Template_button_mouseenter_17_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r2.btnExcluirHover($event, true));
    })("mouseleave", function PlataformaPlanosComponent_Conditional_10_Conditional_1_Conditional_2_For_2_Template_button_mouseleave_17_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r2.btnExcluirHover($event, false));
    });
    \u0275\u0275conditionalCreate(18, PlataformaPlanosComponent_Conditional_10_Conditional_1_Conditional_2_For_2_Conditional_18_Template, 1, 0, "span", 25);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const p_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(p_r2.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(p_r2.key);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" R$ ", ctx_r2.formatarValor(p_r2.value), " ");
    \u0275\u0275advance(3);
    \u0275\u0275conditional(p_r2.description ? 10 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(!p_r2.is_active ? 12 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(9, _c0, p_r2.id));
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r2.excluindoId === p_r2.id);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.excluindoId === p_r2.id ? 18 : -1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.excluindoId === p_r2.id ? "Removendo\u2026" : "Excluir", " ");
  }
}
function PlataformaPlanosComponent_Conditional_10_Conditional_1_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10);
    \u0275\u0275repeaterCreate(1, PlataformaPlanosComponent_Conditional_10_Conditional_1_Conditional_2_For_2_Template, 20, 11, "div", 13, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.planos);
  }
}
function PlataformaPlanosComponent_Conditional_10_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7);
    \u0275\u0275conditionalCreate(1, PlataformaPlanosComponent_Conditional_10_Conditional_1_Conditional_1_Template, 5, 0, "div", 9)(2, PlataformaPlanosComponent_Conditional_10_Conditional_1_Conditional_2_Template, 3, 0, "div", 10);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.planos.length === 0 ? 1 : 2);
  }
}
function PlataformaPlanosComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, PlataformaPlanosComponent_Conditional_10_Conditional_0_Template, 3, 0, "div", 6);
    \u0275\u0275conditionalCreate(1, PlataformaPlanosComponent_Conditional_10_Conditional_1_Template, 3, 1, "div", 7);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r2.estadoErro ? 0 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r2.estadoErro ? 1 : -1);
  }
}
var PlataformaPlanosComponent = class _PlataformaPlanosComponent {
  showSkeleton;
  listaPronta = false;
  estadoErro = false;
  planos = [];
  excluindoId = null;
  plataformaService = inject(PlataformaService);
  headerService = inject(PlataformaHeaderService);
  loadingService = inject(LoadingService);
  toast = inject(ToastService);
  confirm = inject(ConfirmDialogService);
  ngOnInit() {
    this.carregar(true);
  }
  ngOnDestroy() {
    this.headerService.clearHeader();
  }
  formatarValor(valor) {
    return valor.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
  btnExcluirHover(el, enter) {
    const target = el.target;
    if (enter) {
      target.style.color = "#ef4444";
      target.style.borderColor = "#ef4444";
    } else {
      target.style.color = "var(--c-muted)";
      target.style.borderColor = "var(--c-border)";
    }
  }
  excluir(p) {
    return __async(this, null, function* () {
      const nome = p.name?.trim() || String(p.key);
      const ok = yield this.confirm.request({
        title: "Remover plano?",
        messageBefore: "O plano ",
        emphasis: nome,
        messageAfter: " ser\xE1 removido permanentemente.",
        confirmLabel: "Sim, remover",
        variant: "danger"
      });
      if (!ok)
        return;
      this.excluindoId = p.id;
      this.plataformaService.deletePlan(p.id).subscribe({
        next: () => {
          this.excluindoId = null;
          this.carregar(false);
          this.toast.success("Plano removido", `${nome} foi exclu\xEDdo.`);
        },
        error: () => {
          this.excluindoId = null;
          this.estadoErro = true;
          this.toast.error("Erro", "N\xE3o foi poss\xEDvel remover o plano.");
        }
      });
    });
  }
  carregar(setHeader) {
    const { data$, showSkeleton } = this.loadingService.loadWithThreshold(this.plataformaService.getPlans());
    this.showSkeleton = showSkeleton;
    data$.subscribe({
      next: (res) => {
        this.listaPronta = true;
        this.estadoErro = false;
        this.planos = res.data ?? [];
        if (setHeader) {
          const trialDays = res.trial_days ?? 14;
          this.headerService.setHeader("Planos", "Planos dispon\xEDveis para assinatura. Trial padr\xE3o: " + trialDays + " dias.");
        }
      },
      error: () => {
        this.listaPronta = true;
        this.estadoErro = true;
      }
    });
  }
  static \u0275fac = function PlataformaPlanosComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PlataformaPlanosComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PlataformaPlanosComponent, selectors: [["app-plataforma-planos"]], decls: 11, vars: 3, consts: [[1, "relative", "min-h-[300px]"], [1, "flex", "items-center", "justify-between", "mb-4"], [1, "text-xs", 2, "color", "var(--c-muted)"], ["routerLink", "/plataforma/planos/novo", "title", "Criar novo plano", 1, "btn-primary", "inline-flex", "items-center", "gap-1.5"], [1, "material-symbols-outlined", 2, "font-size", "18px"], [3, "rows"], [1, "card", "p-4", "rounded-xl", "mb-4", 2, "background", "rgba(239,68,68,0.08)", "border", "1px solid rgba(239,68,68,0.3)"], [1, "zm-content-enter"], [1, "text-sm", "m-0", 2, "color", "var(--c-text)"], [1, "card", "text-center", "py-8", "rounded-xl", 2, "border", "1px solid var(--c-border)", "color", "var(--c-muted)"], [1, "grid", "grid-cols-1", "md:grid-cols-2", "lg:grid-cols-3", "gap-4"], [1, "text-sm", "mb-3", "m-0"], ["routerLink", "/plataforma/planos/novo", "title", "Criar primeiro plano", 1, "btn-primary"], [1, "card", "flex", "flex-col", "rounded-xl", "p-4", 2, "border", "1px solid var(--c-border)", "background", "var(--c-surface)"], [1, "flex", "items-center", "justify-between", "mb-2"], [1, "text-sm", "font-semibold", 2, "color", "var(--c-text)"], [1, "text-xs", "font-medium", "px-2", "py-0.5", "rounded", 2, "background", "var(--c-soft)", "color", "var(--c-muted)"], [1, "text-2xl", "font-bold", "mb-1", "m-0", 2, "color", "var(--c-primary)"], [1, "text-sm", "font-normal", 2, "color", "var(--c-muted)"], [1, "text-xs", "mt-2", "leading-relaxed", "flex-1", "m-0", 2, "color", "var(--c-muted)"], [1, "flex", "items-center", "gap-2", "mt-3", "pt-3", "flex-wrap", 2, "border-top", "1px solid var(--c-border)"], [1, "text-xs", "px-2", "py-0.5", "rounded", 2, "background", "var(--c-soft)", "color", "var(--c-muted)"], ["title", "Editar plano", 1, "btn-cell", "text-xs", "inline-flex", "items-center", "gap-1", 3, "routerLink"], [1, "material-symbols-outlined", 2, "font-size", "14px"], ["type", "button", "title", "Excluir plano", 1, "text-xs", "px-2", "py-1", "rounded", "transition-colors", "border", "inline-flex", "items-center", "gap-1.5", 2, "color", "var(--c-muted)", "border-color", "var(--c-border)", "background", "transparent", 3, "click", "mouseenter", "mouseleave", "disabled"], [1, "btn-spinner", 2, "width", "12px", "height", "12px", "border-width", "2px"]], template: function PlataformaPlanosComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "p", 2);
      \u0275\u0275text(3);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "a", 3)(5, "span", 4);
      \u0275\u0275text(6, "add");
      \u0275\u0275elementEnd();
      \u0275\u0275text(7, " Novo plano ");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(8, PlataformaPlanosComponent_Conditional_8_Template, 1, 1, "zm-skeleton-list", 5)(9, PlataformaPlanosComponent_Conditional_9_Template, 0, 0)(10, PlataformaPlanosComponent_Conditional_10_Template, 2, 2);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate2(" ", ctx.planos.length, " ", ctx.planos.length === 1 ? "plano" : "planos", ". ");
      \u0275\u0275advance(5);
      \u0275\u0275conditional(ctx.showSkeleton() ? 8 : !ctx.listaPronta ? 9 : 10);
    }
  }, dependencies: [CommonModule, RouterLink, ZmSkeletonListComponent], styles: ["\n\n/*# sourceMappingURL=plataforma-planos.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PlataformaPlanosComponent, [{
    type: Component,
    args: [{ selector: "app-plataforma-planos", standalone: true, imports: [CommonModule, RouterLink, ZmSkeletonListComponent], template: `<!-- Igual ao backend: platform/plans/index - grid de cards -->\r
<div class="relative min-h-[300px]">\r
  <div class="flex items-center justify-between mb-4">\r
  <p class="text-xs" style="color: var(--c-muted)">\r
    {{ planos.length }} {{ planos.length === 1 ? 'plano' : 'planos' }}.\r
  </p>\r
  <a routerLink="/plataforma/planos/novo" class="btn-primary inline-flex items-center gap-1.5" title="Criar novo plano">\r
    <span class="material-symbols-outlined" style="font-size: 18px">add</span>\r
    Novo plano\r
  </a>\r
</div>\r
\r
@if (showSkeleton()) {\r
  <zm-skeleton-list [rows]="6" />\r
} @else if (!listaPronta) {\r
} @else {\r
@if (estadoErro) {\r
  <div class="card p-4 rounded-xl mb-4" style="background: rgba(239,68,68,0.08); border: 1px solid rgba(239,68,68,0.3)">\r
    <p class="text-sm m-0" style="color: var(--c-text)">N\xE3o foi poss\xEDvel carregar os planos.</p>\r
  </div>\r
}\r
@if (!estadoErro) {\r
  <div class="zm-content-enter">\r
  @if (planos.length === 0) {\r
    <div class="card text-center py-8 rounded-xl" style="border: 1px solid var(--c-border); color: var(--c-muted)">\r
      <p class="text-sm mb-3 m-0">Nenhum plano cadastrado.</p>\r
      <a routerLink="/plataforma/planos/novo" class="btn-primary" title="Criar primeiro plano">Criar primeiro plano</a>\r
    </div>\r
  } @else {\r
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">\r
      @for (p of planos; track p.id) {\r
        <div class="card flex flex-col rounded-xl p-4" style="border: 1px solid var(--c-border); background: var(--c-surface)">\r
          <div class="flex items-center justify-between mb-2">\r
            <span class="text-sm font-semibold" style="color: var(--c-text)">{{ p.name }}</span>\r
            <span class="text-xs font-medium px-2 py-0.5 rounded" style="background: var(--c-soft); color: var(--c-muted)">{{ p.key }}</span>\r
          </div>\r
          <p class="text-2xl font-bold mb-1 m-0" style="color: var(--c-primary)">\r
            R$ {{ formatarValor(p.value) }}\r
            <span class="text-sm font-normal" style="color: var(--c-muted)">/m\xEAs</span>\r
          </p>\r
          @if (p.description) {\r
            <p class="text-xs mt-2 leading-relaxed flex-1 m-0" style="color: var(--c-muted)">{{ p.description }}</p>\r
          }\r
          <div class="flex items-center gap-2 mt-3 pt-3 flex-wrap" style="border-top: 1px solid var(--c-border)">\r
            @if (!p.is_active) {\r
              <span class="text-xs px-2 py-0.5 rounded" style="background: var(--c-soft); color: var(--c-muted)">Inativo</span>\r
            }\r
            <a [routerLink]="['/plataforma/planos', p.id, 'editar']" class="btn-cell text-xs inline-flex items-center gap-1" title="Editar plano">\r
              <span class="material-symbols-outlined" style="font-size: 14px">edit</span>\r
              Editar\r
            </a>\r
            <button type="button" class="text-xs px-2 py-1 rounded transition-colors border inline-flex items-center gap-1.5" style="color: var(--c-muted); border-color: var(--c-border); background: transparent" [disabled]="excluindoId === p.id" (click)="excluir(p)" (mouseenter)="btnExcluirHover($event, true)" (mouseleave)="btnExcluirHover($event, false)" title="Excluir plano">\r
              @if (excluindoId === p.id) {\r
                <span class="btn-spinner" style="width:12px;height:12px;border-width:2px"></span>\r
              }\r
              {{ excluindoId === p.id ? 'Removendo\u2026' : 'Excluir' }}\r
            </button>\r
          </div>\r
        </div>\r
      }\r
    </div>\r
  }\r
  </div>\r
}\r
}\r
</div>\r
`, styles: ["/* src/app/paginas/plataforma/plataforma-planos/plataforma-planos.component.css */\n/*# sourceMappingURL=plataforma-planos.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PlataformaPlanosComponent, { className: "PlataformaPlanosComponent", filePath: "src/app/paginas/plataforma/plataforma-planos/plataforma-planos.component.ts", lineNumber: 18 });
})();
export {
  PlataformaPlanosComponent
};
//# sourceMappingURL=chunk-QXXSYCON.js.map
