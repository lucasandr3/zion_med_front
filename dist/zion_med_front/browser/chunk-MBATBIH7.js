import {
  OrganizationRolesService
} from "./chunk-WEC6JNFI.js";
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
import {
  TooltipDirective
} from "./chunk-LVZEGAGU.js";
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
  ɵɵtextInterpolate
} from "./chunk-GRLISYEV.js";

// src/app/paginas/organizacao/organizacao-papeis-listagem.component.ts
var _c0 = (a0) => ["/organizacao/permissoes", a0];
var _forTrack0 = ($index, $item) => $item.slug;
function OrganizacaoPapeisListagemComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "zm-skeleton-list", 5);
  }
  if (rf & 2) {
    \u0275\u0275property("rows", 5);
  }
}
function OrganizacaoPapeisListagemComponent_Conditional_8_Template(rf, ctx) {
}
function OrganizacaoPapeisListagemComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 6);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.erro);
  }
}
function OrganizacaoPapeisListagemComponent_Conditional_10_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 10)(2, "span", 11);
    \u0275\u0275text(3, "admin_panel_settings");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 12);
    \u0275\u0275text(5, "Nenhum perfil de permiss\xF5es cadastrado.");
    \u0275\u0275elementEnd()()();
  }
}
function OrganizacaoPapeisListagemComponent_Conditional_10_Conditional_17_For_1_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 16)(1, "span", 21);
    \u0275\u0275text(2, "verified_user");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Padr\xE3o ");
    \u0275\u0275elementEnd();
  }
}
function OrganizacaoPapeisListagemComponent_Conditional_10_Conditional_17_For_1_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 16)(1, "span", 21);
    \u0275\u0275text(2, "tune");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Personalizado ");
    \u0275\u0275elementEnd();
  }
}
function OrganizacaoPapeisListagemComponent_Conditional_10_Conditional_17_For_1_Conditional_17_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 23);
  }
}
function OrganizacaoPapeisListagemComponent_Conditional_10_Conditional_17_For_1_Conditional_17_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 19);
    \u0275\u0275text(1, "delete");
    \u0275\u0275elementEnd();
  }
}
function OrganizacaoPapeisListagemComponent_Conditional_10_Conditional_17_For_1_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 22);
    \u0275\u0275listener("click", function OrganizacaoPapeisListagemComponent_Conditional_10_Conditional_17_For_1_Conditional_17_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const p_r3 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.excluir(p_r3));
    });
    \u0275\u0275conditionalCreate(1, OrganizacaoPapeisListagemComponent_Conditional_10_Conditional_17_For_1_Conditional_17_Conditional_1_Template, 1, 0, "span", 23)(2, OrganizacaoPapeisListagemComponent_Conditional_10_Conditional_17_For_1_Conditional_17_Conditional_2_Template, 2, 0, "span", 19);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r3 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275property("disabled", ctx_r0.excluindoSlug === p_r3.slug);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.excluindoSlug === p_r3.slug ? 1 : 2);
  }
}
function OrganizacaoPapeisListagemComponent_Conditional_10_Conditional_17_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td")(2, "span", 13);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "td", 14)(5, "code", 15);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "td", 14);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td");
    \u0275\u0275conditionalCreate(10, OrganizacaoPapeisListagemComponent_Conditional_10_Conditional_17_For_1_Conditional_10_Template, 4, 0, "span", 16)(11, OrganizacaoPapeisListagemComponent_Conditional_10_Conditional_17_For_1_Conditional_11_Template, 4, 0, "span", 16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "td")(13, "div", 17)(14, "a", 18)(15, "span", 19);
    \u0275\u0275text(16, "edit");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(17, OrganizacaoPapeisListagemComponent_Conditional_10_Conditional_17_For_1_Conditional_17_Template, 3, 2, "button", 20);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const p_r3 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(p_r3.label);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(p_r3.slug);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(p_r3.user_count);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(p_r3.is_system ? 10 : 11);
    \u0275\u0275advance(4);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(6, _c0, p_r3.slug));
    \u0275\u0275advance(3);
    \u0275\u0275conditional(!p_r3.is_system ? 17 : -1);
  }
}
function OrganizacaoPapeisListagemComponent_Conditional_10_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, OrganizacaoPapeisListagemComponent_Conditional_10_Conditional_17_For_1_Template, 18, 8, "tr", null, _forTrack0);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275repeater(ctx_r0.papeis);
  }
}
function OrganizacaoPapeisListagemComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7)(1, "div", 8)(2, "table")(3, "thead")(4, "tr")(5, "th");
    \u0275\u0275text(6, "Nome");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th");
    \u0275\u0275text(8, "Identificador");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th");
    \u0275\u0275text(10, "Usu\xE1rios");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "th");
    \u0275\u0275text(12, "Origem");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "th", 9);
    \u0275\u0275text(14, "A\xE7\xF5es");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(15, "tbody");
    \u0275\u0275conditionalCreate(16, OrganizacaoPapeisListagemComponent_Conditional_10_Conditional_16_Template, 6, 0, "tr")(17, OrganizacaoPapeisListagemComponent_Conditional_10_Conditional_17_Template, 2, 0);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(16);
    \u0275\u0275conditional(ctx_r0.papeis.length === 0 ? 16 : 17);
  }
}
var OrganizacaoPapeisListagemComponent = class _OrganizacaoPapeisListagemComponent {
  papeis = [];
  showSkeleton;
  listaPronta = false;
  erro = "";
  excluindoSlug = null;
  service = inject(OrganizationRolesService);
  loadingService = inject(LoadingService);
  toast = inject(ToastService);
  confirm = inject(ConfirmDialogService);
  ngOnInit() {
    this.carregar();
  }
  carregar() {
    const { data$, showSkeleton } = this.loadingService.loadWithThreshold(this.service.list());
    this.showSkeleton = showSkeleton;
    data$.subscribe({
      next: (list) => {
        this.listaPronta = true;
        this.papeis = list;
      },
      error: () => {
        this.listaPronta = true;
        this.erro = "N\xE3o foi poss\xEDvel carregar os perfis de permiss\xF5es.";
      }
    });
  }
  excluir(p) {
    return __async(this, null, function* () {
      if (p.is_system)
        return;
      const ok = yield this.confirm.request({
        title: "Excluir permiss\xF5es?",
        messageBefore: "Remover o perfil de permiss\xF5es ",
        emphasis: p.label,
        messageAfter: "? S\xF3 \xE9 permitido se nenhum usu\xE1rio estiver usando.",
        confirmLabel: "Excluir",
        variant: "danger"
      });
      if (!ok)
        return;
      this.excluindoSlug = p.slug;
      this.service.delete(p.slug).subscribe({
        next: () => {
          this.excluindoSlug = null;
          this.toast.success("Permiss\xF5es removidas", "");
          this.carregar();
        },
        error: (err) => {
          this.excluindoSlug = null;
          const msg = err.error?.message ?? "N\xE3o foi poss\xEDvel excluir.";
          this.toast.error("Erro", typeof msg === "string" ? msg : "Tente novamente.");
        }
      });
    });
  }
  static \u0275fac = function OrganizacaoPapeisListagemComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _OrganizacaoPapeisListagemComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _OrganizacaoPapeisListagemComponent, selectors: [["app-organizacao-papeis-listagem"]], decls: 11, vars: 1, consts: [[1, "relative", "min-h-[320px]"], [1, "page-header"], [1, "page-title"], ["routerLink", "/organizacao/permissoes/novo", 1, "btn-primary"], [1, "material-symbols-outlined", 2, "font-size", "16px"], [3, "rows"], [1, "text-sm", 2, "color", "var(--c-error, #dc2626)"], [1, "zm-content-enter"], [1, "table-card"], [2, "text-align", "right"], ["colspan", "5", 2, "text-align", "center", "padding", "3rem 1rem"], [1, "material-symbols-outlined", 2, "font-size", "36px", "color", "var(--c-border)", "display", "block", "margin-bottom", "8px"], [2, "font-size", "0.875rem", "color", "var(--c-muted)"], [2, "font-weight", "500", "color", "var(--c-text)"], [2, "color", "var(--c-muted)"], [1, "text-xs"], [2, "display", "inline-flex", "align-items", "center", "gap", "4px", "font-size", "0.7rem", "font-weight", "600", "padding", "2px 8px", "border-radius", "9999px", "background", "var(--c-soft)", "color", "var(--c-muted)"], [2, "display", "flex", "align-items", "center", "justify-content", "flex-end", "gap", "2px"], ["aria-label", "Editar perfil", "appTooltip", "Editar perfil", 1, "action-btn", 3, "routerLink"], [1, "material-symbols-outlined", 2, "font-size", "18px"], ["type", "button", "aria-label", "Excluir perfil", "appTooltip", "Excluir perfil", 1, "action-btn", "danger", 3, "disabled"], [1, "material-symbols-outlined", 2, "font-size", "12px"], ["type", "button", "aria-label", "Excluir perfil", "appTooltip", "Excluir perfil", 1, "action-btn", "danger", 3, "click", "disabled"], [1, "btn-spinner", 2, "width", "16px", "height", "16px", "border-width", "2px"]], template: function OrganizacaoPapeisListagemComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1);
      \u0275\u0275element(2, "div", 2);
      \u0275\u0275elementStart(3, "a", 3)(4, "span", 4);
      \u0275\u0275text(5, "add");
      \u0275\u0275elementEnd();
      \u0275\u0275text(6, " Novo perfil ");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(7, OrganizacaoPapeisListagemComponent_Conditional_7_Template, 1, 1, "zm-skeleton-list", 5)(8, OrganizacaoPapeisListagemComponent_Conditional_8_Template, 0, 0)(9, OrganizacaoPapeisListagemComponent_Conditional_9_Template, 2, 1, "p", 6)(10, OrganizacaoPapeisListagemComponent_Conditional_10_Template, 18, 1, "div", 7);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(7);
      \u0275\u0275conditional(ctx.showSkeleton() ? 7 : !ctx.listaPronta ? 8 : ctx.erro ? 9 : 10);
    }
  }, dependencies: [CommonModule, RouterLink, ZmSkeletonListComponent, TooltipDirective], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OrganizacaoPapeisListagemComponent, [{
    type: Component,
    args: [{ selector: "app-organizacao-papeis-listagem", standalone: true, imports: [CommonModule, RouterLink, ZmSkeletonListComponent, TooltipDirective], template: `<div class="relative min-h-[320px]">\r
  <div class="page-header">\r
    <div class="page-title">\r
      <!-- <div class="page-title-icon">\r
        <span class="material-symbols-outlined">admin_panel_settings</span>\r
      </div>\r
      <div>\r
        <h1>Permiss\xF5es</h1>\r
        <p class="page-header-subtitle m-0 mt-1">Perfis padr\xE3o da organiza\xE7\xE3o e perfis personalizados.</p>\r
      </div> -->\r
    </div>\r
    <a routerLink="/organizacao/permissoes/novo" class="btn-primary">\r
      <span class="material-symbols-outlined" style="font-size:16px">add</span>\r
      Novo perfil\r
    </a>\r
  </div>\r
  @if (showSkeleton()) {\r
    <zm-skeleton-list [rows]="5" />\r
  } @else if (!listaPronta) {\r
  } @else if (erro) {\r
    <p class="text-sm" style="color: var(--c-error, #dc2626)">{{ erro }}</p>\r
  } @else {\r
    <div class="zm-content-enter">\r
      <div class="table-card">\r
        <table>\r
          <thead>\r
            <tr>\r
              <th>Nome</th>\r
              <th>Identificador</th>\r
              <th>Usu\xE1rios</th>\r
              <th>Origem</th>\r
              <th style="text-align:right">A\xE7\xF5es</th>\r
            </tr>\r
          </thead>\r
          <tbody>\r
            @if (papeis.length === 0) {\r
              <tr>\r
                <td colspan="5" style="text-align:center;padding:3rem 1rem">\r
                  <span class="material-symbols-outlined" style="font-size:36px;color:var(--c-border);display:block;margin-bottom:8px">admin_panel_settings</span>\r
                  <span style="font-size:0.875rem;color:var(--c-muted)">Nenhum perfil de permiss\xF5es cadastrado.</span>\r
                </td>\r
              </tr>\r
            } @else {\r
              @for (p of papeis; track p.slug) {\r
                <tr>\r
                  <td>\r
                    <span style="font-weight:500;color:var(--c-text)">{{ p.label }}</span>\r
                  </td>\r
                  <td style="color:var(--c-muted)"><code class="text-xs">{{ p.slug }}</code></td>\r
                  <td style="color:var(--c-muted)">{{ p.user_count }}</td>\r
                  <td>\r
                    @if (p.is_system) {\r
                      <span style="display:inline-flex;align-items:center;gap:4px;font-size:0.7rem;font-weight:600;padding:2px 8px;border-radius:9999px;background:var(--c-soft);color:var(--c-muted)">\r
                        <span class="material-symbols-outlined" style="font-size:12px">verified_user</span>\r
                        Padr\xE3o\r
                      </span>\r
                    } @else {\r
                      <span style="display:inline-flex;align-items:center;gap:4px;font-size:0.7rem;font-weight:600;padding:2px 8px;border-radius:9999px;background:var(--c-soft);color:var(--c-muted)">\r
                        <span class="material-symbols-outlined" style="font-size:12px">tune</span>\r
                        Personalizado\r
                      </span>\r
                    }\r
                  </td>\r
                  <td>\r
                    <div style="display:flex;align-items:center;justify-content:flex-end;gap:2px">\r
                      <a [routerLink]="['/organizacao/permissoes', p.slug]" class="action-btn" aria-label="Editar perfil" appTooltip="Editar perfil">\r
                        <span class="material-symbols-outlined" style="font-size:18px">edit</span>\r
                      </a>\r
                      @if (!p.is_system) {\r
                        <button\r
                          type="button"\r
                          class="action-btn danger"\r
                          aria-label="Excluir perfil"\r
                          [disabled]="excluindoSlug === p.slug"\r
                          (click)="excluir(p)"\r
                          appTooltip="Excluir perfil">\r
                          @if (excluindoSlug === p.slug) {\r
                            <span class="btn-spinner" style="width:16px;height:16px;border-width:2px"></span>\r
                          } @else {\r
                            <span class="material-symbols-outlined" style="font-size:18px">delete</span>\r
                          }\r
                        </button>\r
                      }\r
                    </div>\r
                  </td>\r
                </tr>\r
              }\r
            }\r
          </tbody>\r
        </table>\r
      </div>\r
    </div>\r
  }\r
</div>\r
` }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(OrganizacaoPapeisListagemComponent, { className: "OrganizacaoPapeisListagemComponent", filePath: "src/app/paginas/organizacao/organizacao-papeis-listagem.component.ts", lineNumber: 17 });
})();
export {
  OrganizacaoPapeisListagemComponent
};
//# sourceMappingURL=chunk-MBATBIH7.js.map
