import {
  UsuariosService
} from "./chunk-GQYQFEJU.js";
import {
  ZmEmptyStateComponent
} from "./chunk-5YRLWGMM.js";
import {
  LoadingService,
  ZmSkeletonListComponent
} from "./chunk-GKI5AWTV.js";
import "./chunk-CAKNZVE6.js";
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
  ɵɵtextInterpolate1
} from "./chunk-GRLISYEV.js";

// src/app/paginas/usuarios/usuarios-listagem.component.ts
var _c0 = (a0) => ["/usuarios", a0, "editar"];
var _forTrack0 = ($index, $item) => $item.id;
function UsuariosListagemComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "zm-skeleton-list", 5);
  }
  if (rf & 2) {
    \u0275\u0275property("rows", 5);
  }
}
function UsuariosListagemComponent_Conditional_8_Template(rf, ctx) {
}
function UsuariosListagemComponent_Conditional_9_Template(rf, ctx) {
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
function UsuariosListagemComponent_Conditional_10_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "zm-empty-state", 9);
  }
}
function UsuariosListagemComponent_Conditional_10_Conditional_3_For_16_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 19)(1, "span", 25);
    \u0275\u0275text(2, "check_circle");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Ativo ");
    \u0275\u0275elementEnd();
  }
}
function UsuariosListagemComponent_Conditional_10_Conditional_3_For_16_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 20)(1, "span", 26);
    \u0275\u0275text(2, "cancel");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Inativo ");
    \u0275\u0275elementEnd();
  }
}
function UsuariosListagemComponent_Conditional_10_Conditional_3_For_16_Conditional_22_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 28);
  }
}
function UsuariosListagemComponent_Conditional_10_Conditional_3_For_16_Conditional_22_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 23);
    \u0275\u0275text(1, "person_off");
    \u0275\u0275elementEnd();
  }
}
function UsuariosListagemComponent_Conditional_10_Conditional_3_For_16_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 27);
    \u0275\u0275listener("click", function UsuariosListagemComponent_Conditional_10_Conditional_3_For_16_Conditional_22_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const u_r3 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.desativar(u_r3));
    });
    \u0275\u0275conditionalCreate(1, UsuariosListagemComponent_Conditional_10_Conditional_3_For_16_Conditional_22_Conditional_1_Template, 1, 0, "span", 28)(2, UsuariosListagemComponent_Conditional_10_Conditional_3_For_16_Conditional_22_Conditional_2_Template, 2, 0, "span", 23);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const u_r3 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275property("disabled", ctx_r0.desativandoId === u_r3.id);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.desativandoId === u_r3.id ? 1 : 2);
  }
}
function UsuariosListagemComponent_Conditional_10_Conditional_3_For_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td")(2, "div", 13)(3, "div", 14);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 15);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(7, "td", 16);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td")(10, "span", 17)(11, "span", 18);
    \u0275\u0275text(12, "badge");
    \u0275\u0275elementEnd();
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "td");
    \u0275\u0275conditionalCreate(15, UsuariosListagemComponent_Conditional_10_Conditional_3_For_16_Conditional_15_Template, 4, 0, "span", 19)(16, UsuariosListagemComponent_Conditional_10_Conditional_3_For_16_Conditional_16_Template, 4, 0, "span", 20);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "td", 12)(18, "div", 21)(19, "a", 22)(20, "span", 23);
    \u0275\u0275text(21, "edit");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(22, UsuariosListagemComponent_Conditional_10_Conditional_3_For_16_Conditional_22_Template, 3, 2, "button", 24);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const u_r3 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.inicial(u_r3.name), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(u_r3.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(u_r3.email);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", u_r3.role_label || u_r3.role, " ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(u_r3.active ? 15 : 16);
    \u0275\u0275advance(4);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(7, _c0, u_r3.id));
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r0.podeDesativar(u_r3) ? 22 : -1);
  }
}
function UsuariosListagemComponent_Conditional_10_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10)(1, "table", 11)(2, "thead")(3, "tr")(4, "th");
    \u0275\u0275text(5, "Nome");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "th");
    \u0275\u0275text(7, "E-mail");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th");
    \u0275\u0275text(9, "Permiss\xF5es");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th");
    \u0275\u0275text(11, "Status");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th", 12);
    \u0275\u0275text(13, "A\xE7\xF5es");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(14, "tbody");
    \u0275\u0275repeaterCreate(15, UsuariosListagemComponent_Conditional_10_Conditional_3_For_16_Template, 23, 9, "tr", null, _forTrack0);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(15);
    \u0275\u0275repeater(ctx_r0.usuarios);
  }
}
function UsuariosListagemComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7)(1, "div", 8);
    \u0275\u0275conditionalCreate(2, UsuariosListagemComponent_Conditional_10_Conditional_2_Template, 1, 0, "zm-empty-state", 9)(3, UsuariosListagemComponent_Conditional_10_Conditional_3_Template, 17, 0, "div", 10);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.usuarios.length === 0 ? 2 : 3);
  }
}
var UsuariosListagemComponent = class _UsuariosListagemComponent {
  usuarios = [];
  showSkeleton;
  listaPronta = false;
  erro = "";
  desativandoId = null;
  usuariosService = inject(UsuariosService);
  loadingService = inject(LoadingService);
  auth = inject(AuthService);
  toast = inject(ToastService);
  confirm = inject(ConfirmDialogService);
  currentUserId = this.auth.getUser()?.id ?? null;
  ngOnInit() {
    const { data$, showSkeleton } = this.loadingService.loadWithThreshold(this.usuariosService.list());
    this.showSkeleton = showSkeleton;
    data$.subscribe({
      next: (list) => {
        this.listaPronta = true;
        this.usuarios = list;
      },
      error: () => {
        this.listaPronta = true;
        this.erro = "N\xE3o foi poss\xEDvel carregar os usu\xE1rios.";
      }
    });
  }
  inicial(nome) {
    if (!nome)
      return "";
    return nome.trim().charAt(0).toUpperCase();
  }
  podeDesativar(u) {
    return !!u.active && (!this.currentUserId || u.id !== this.currentUserId);
  }
  desativar(u) {
    return __async(this, null, function* () {
      if (!this.podeDesativar(u))
        return;
      const ok = yield this.confirm.request({
        title: "Desativar usu\xE1rio?",
        messageBefore: "O usu\xE1rio ",
        emphasis: u.name ?? u.email ?? String(u.id),
        messageAfter: " ser\xE1 desativado e perder\xE1 o acesso.",
        confirmLabel: "Sim, desativar",
        variant: "danger"
      });
      if (!ok)
        return;
      this.desativandoId = u.id;
      this.usuariosService.delete(u.id).subscribe({
        next: () => {
          this.desativandoId = null;
          this.usuarios = this.usuarios.filter((x) => x.id !== u.id);
          this.toast.success("Usu\xE1rio desativado", "O acesso foi revogado.");
        },
        error: () => {
          this.desativandoId = null;
          this.erro = "N\xE3o foi poss\xEDvel desativar o usu\xE1rio.";
          this.toast.error("Erro", this.erro);
        }
      });
    });
  }
  static \u0275fac = function UsuariosListagemComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _UsuariosListagemComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _UsuariosListagemComponent, selectors: [["app-usuarios-listagem"]], decls: 11, vars: 1, consts: [[1, "relative", "min-h-[320px]"], [1, "page-header"], [1, "page-title"], ["routerLink", "/usuarios/criar", 1, "btn-primary"], [1, "material-symbols-outlined", 2, "font-size", "16px"], [3, "rows"], [1, "text-sm", 2, "color", "var(--c-error, #dc2626)"], [1, "zm-content-enter"], [1, "data-table-wrap"], ["icon", "group", "title", "Nenhum usu\xE1rio cadastrado.", "actionLabel", "Novo usu\xE1rio", "actionLink", "/usuarios/criar"], [1, "overflow-x-auto"], [1, "data-table"], [1, "text-right"], [1, "flex", "items-center", "gap-2.5"], [1, "w-[30px]", "h-[30px]", "rounded-full", "flex", "items-center", "justify-center", "shrink-0", "text-xs", "font-bold", 2, "background", "color-mix(in srgb, var(--c-primary) 12%, transparent)", "color", "var(--c-primary)"], [1, "font-medium", 2, "color", "var(--c-text)"], [2, "color", "var(--c-muted)"], [1, "inline-flex", "items-center", "gap-1", "text-[0.7rem]", "font-semibold", "py-0.5", "px-2", "rounded-full", 2, "background", "var(--c-soft)", "color", "var(--c-muted)"], [1, "material-symbols-outlined", "text-xs"], [1, "inline-flex", "items-center", "gap-1", "text-xs", "font-semibold", 2, "color", "var(--c-success)"], [1, "inline-flex", "items-center", "gap-1", "text-xs", "font-medium", 2, "color", "var(--c-muted)"], [1, "flex", "items-center", "justify-end", "gap-0.5"], ["aria-label", "Editar usu\xE1rio", "appTooltip", "Editar usu\xE1rio", 1, "action-btn", 3, "routerLink"], [1, "material-symbols-outlined", "text-lg"], ["type", "button", "aria-label", "Desativar usu\xE1rio", "appTooltip", "Desativar usu\xE1rio", 1, "action-btn", "danger", 3, "disabled"], [1, "material-symbols-outlined", "text-sm", 2, "font-variation-settings", "'FILL' 1"], [1, "material-symbols-outlined", "text-sm"], ["type", "button", "aria-label", "Desativar usu\xE1rio", "appTooltip", "Desativar usu\xE1rio", 1, "action-btn", "danger", 3, "click", "disabled"], [1, "btn-spinner", 2, "width", "16px", "height", "16px", "border-width", "2px"]], template: function UsuariosListagemComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1);
      \u0275\u0275element(2, "div", 2);
      \u0275\u0275elementStart(3, "a", 3)(4, "span", 4);
      \u0275\u0275text(5, "person_add");
      \u0275\u0275elementEnd();
      \u0275\u0275text(6, " Novo usu\xE1rio ");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(7, UsuariosListagemComponent_Conditional_7_Template, 1, 1, "zm-skeleton-list", 5)(8, UsuariosListagemComponent_Conditional_8_Template, 0, 0)(9, UsuariosListagemComponent_Conditional_9_Template, 2, 1, "p", 6)(10, UsuariosListagemComponent_Conditional_10_Template, 4, 1, "div", 7);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(7);
      \u0275\u0275conditional(ctx.showSkeleton() ? 7 : !ctx.listaPronta ? 8 : ctx.erro ? 9 : 10);
    }
  }, dependencies: [CommonModule, RouterLink, ZmSkeletonListComponent, ZmEmptyStateComponent, TooltipDirective], styles: ["\n\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n}\n/*# sourceMappingURL=usuarios-listagem.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UsuariosListagemComponent, [{
    type: Component,
    args: [{ selector: "app-usuarios-listagem", standalone: true, imports: [CommonModule, RouterLink, ZmSkeletonListComponent, ZmEmptyStateComponent, TooltipDirective], template: `<div class="relative min-h-[320px]">\r
  <div class="page-header">\r
    <div class="page-title">\r
      <!-- <div class="page-title-icon">\r
        <span class="material-symbols-outlined">group</span>\r
      </div>\r
      <div>\r
        <h1>Usu\xE1rios</h1>\r
      </div> -->\r
    </div>\r
    <a routerLink="/usuarios/criar" class="btn-primary">\r
      <span class="material-symbols-outlined" style="font-size:16px">person_add</span>\r
      Novo usu\xE1rio\r
    </a>\r
  </div>\r
  @if (showSkeleton()) {\r
    <zm-skeleton-list [rows]="5" />\r
  } @else if (!listaPronta) {\r
  } @else if (erro) {\r
    <p class="text-sm" style="color: var(--c-error, #dc2626)">{{ erro }}</p>\r
  } @else {\r
  <div class="zm-content-enter">\r
    <div class="data-table-wrap">\r
      @if (usuarios.length === 0) {\r
        <zm-empty-state icon="group" title="Nenhum usu\xE1rio cadastrado." actionLabel="Novo usu\xE1rio" actionLink="/usuarios/criar" />\r
      } @else {\r
        <div class="overflow-x-auto">\r
          <table class="data-table">\r
            <thead>\r
              <tr>\r
                <th>Nome</th>\r
                <th>E-mail</th>\r
                <th>Permiss\xF5es</th>\r
                <th>Status</th>\r
                <th class="text-right">A\xE7\xF5es</th>\r
              </tr>\r
            </thead>\r
            <tbody>\r
              @for (u of usuarios; track u.id) {\r
                <tr>\r
                  <td>\r
                    <div class="flex items-center gap-2.5">\r
                      <div\r
                        class="w-[30px] h-[30px] rounded-full flex items-center justify-center shrink-0 text-xs font-bold"\r
                        style="background: color-mix(in srgb, var(--c-primary) 12%, transparent); color: var(--c-primary)"\r
                      >\r
                        {{ inicial(u.name) }}\r
                      </div>\r
                      <span class="font-medium" style="color: var(--c-text)">{{ u.name }}</span>\r
                    </div>\r
                  </td>\r
                  <td style="color: var(--c-muted)">{{ u.email }}</td>\r
                  <td>\r
                    <span\r
                      class="inline-flex items-center gap-1 text-[0.7rem] font-semibold py-0.5 px-2 rounded-full"\r
                      style="background: var(--c-soft); color: var(--c-muted)"\r
                    >\r
                      <span class="material-symbols-outlined text-xs">badge</span>\r
                      {{ u.role_label || u.role }}\r
                    </span>\r
                  </td>\r
                  <td>\r
                    @if (u.active) {\r
                      <span class="inline-flex items-center gap-1 text-xs font-semibold" style="color: var(--c-success)">\r
                        <span class="material-symbols-outlined text-sm" style="font-variation-settings: 'FILL' 1">check_circle</span>\r
                        Ativo\r
                      </span>\r
                    } @else {\r
                      <span class="inline-flex items-center gap-1 text-xs font-medium" style="color: var(--c-muted)">\r
                        <span class="material-symbols-outlined text-sm">cancel</span>\r
                        Inativo\r
                      </span>\r
                    }\r
                  </td>\r
                  <td class="text-right">\r
                    <div class="flex items-center justify-end gap-0.5">\r
                      <a [routerLink]="['/usuarios', u.id, 'editar']" aria-label="Editar usu\xE1rio" class="action-btn" appTooltip="Editar usu\xE1rio">\r
                        <span class="material-symbols-outlined text-lg">edit</span>\r
                      </a>\r
                      @if (podeDesativar(u)) {\r
                        <button type="button" class="action-btn danger" aria-label="Desativar usu\xE1rio" [disabled]="desativandoId === u.id" (click)="desativar(u)" appTooltip="Desativar usu\xE1rio">\r
                          @if (desativandoId === u.id) {\r
                            <span class="btn-spinner" style="width: 16px; height: 16px; border-width: 2px"></span>\r
                          } @else {\r
                            <span class="material-symbols-outlined text-lg">person_off</span>\r
                          }\r
                        </button>\r
                      }\r
                    </div>\r
                  </td>\r
                </tr>\r
              }\r
            </tbody>\r
          </table>\r
        </div>\r
      }\r
    </div>\r
  </div>\r
  }\r
</div>\r
`, styles: ["/* src/app/paginas/usuarios/usuarios-listagem.component.css */\n.page-header {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n}\n/*# sourceMappingURL=usuarios-listagem.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(UsuariosListagemComponent, { className: "UsuariosListagemComponent", filePath: "src/app/paginas/usuarios/usuarios-listagem.component.ts", lineNumber: 20 });
})();
export {
  UsuariosListagemComponent
};
//# sourceMappingURL=chunk-I77MC64Q.js.map
