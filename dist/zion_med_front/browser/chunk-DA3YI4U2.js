import {
  OrganizationRolesService
} from "./chunk-WEC6JNFI.js";
import {
  LoadingService,
  ZmSkeletonCardComponent
} from "./chunk-GKI5AWTV.js";
import "./chunk-7WBHVE2H.js";
import {
  ToastService
} from "./chunk-EZUVP6MG.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel,
  RequiredValidator
} from "./chunk-USROZ7PW.js";
import "./chunk-IBJWGIJV.js";
import {
  ActivatedRoute,
  Router,
  RouterLink
} from "./chunk-C2NWBPZH.js";
import {
  CommonModule,
  Component,
  forkJoin,
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
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-GRLISYEV.js";

// src/app/paginas/organizacao/organizacao-papel-formulario.component.ts
var _forTrack0 = ($index, $item) => $item.label;
var _forTrack1 = ($index, $item) => $item.key;
function OrganizacaoPapelFormularioComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "zm-skeleton-card", 1);
  }
  if (rf & 2) {
    \u0275\u0275property("height", 420);
  }
}
function OrganizacaoPapelFormularioComponent_Conditional_2_Template(rf, ctx) {
}
function OrganizacaoPapelFormularioComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 2);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.erro);
  }
}
function OrganizacaoPapelFormularioComponent_Conditional_4_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div")(1, "label", 6);
    \u0275\u0275text(2, "Identificador (slug)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "input", 15);
    \u0275\u0275twoWayListener("ngModelChange", function OrganizacaoPapelFormularioComponent_Conditional_4_Conditional_2_Template_input_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.slugNovo, $event) || (ctx_r0.slugNovo = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 16);
    \u0275\u0275text(5, "Min\xFAsculas, n\xFAmeros e underscore. N\xE3o pode ser alterado depois.");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.slugNovo);
  }
}
function OrganizacaoPapelFormularioComponent_Conditional_4_Conditional_3_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 17);
    \u0275\u0275text(1, "(perfil padr\xE3o do sistema)");
    \u0275\u0275elementEnd();
  }
}
function OrganizacaoPapelFormularioComponent_Conditional_4_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 5);
    \u0275\u0275text(1, " Identificador: ");
    \u0275\u0275elementStart(2, "code");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(4, OrganizacaoPapelFormularioComponent_Conditional_4_Conditional_3_Conditional_4_Template, 2, 0, "span", 17);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.slugParam);
    \u0275\u0275advance();
    \u0275\u0275conditional((ctx_r0.detalhe == null ? null : ctx_r0.detalhe.is_system) ? 4 : -1);
  }
}
function OrganizacaoPapelFormularioComponent_Conditional_4_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 8);
    \u0275\u0275text(1, " O perfil ");
    \u0275\u0275elementStart(2, "strong");
    \u0275\u0275text(3, "Propriet\xE1rio");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " sempre inclui todas as permiss\xF5es. Voc\xEA pode alterar apenas o nome exibido. ");
    \u0275\u0275elementEnd();
  }
}
function OrganizacaoPapelFormularioComponent_Conditional_4_For_13_For_5_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 23);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r5.description);
  }
}
function OrganizacaoPapelFormularioComponent_Conditional_4_For_13_For_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "li")(1, "label", 20)(2, "input", 21);
    \u0275\u0275listener("change", function OrganizacaoPapelFormularioComponent_Conditional_4_For_13_For_5_Template_input_change_2_listener() {
      const item_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.toggle(item_r5.key));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span")(4, "span", 22);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(6, OrganizacaoPapelFormularioComponent_Conditional_4_For_13_For_5_Conditional_6_Template, 2, 1, "span", 23);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const item_r5 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275property("checked", ctx_r0.isOn(item_r5.key))("disabled", ctx_r0.permissoesBloqueadas);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(item_r5.label);
    \u0275\u0275advance();
    \u0275\u0275conditional(item_r5.description ? 6 : -1);
  }
}
function OrganizacaoPapelFormularioComponent_Conditional_4_For_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11)(1, "p", 18);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "ul", 19);
    \u0275\u0275repeaterCreate(4, OrganizacaoPapelFormularioComponent_Conditional_4_For_13_For_5_Template, 7, 4, "li", null, _forTrack1);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const g_r6 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(g_r6.label);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(g_r6.items);
  }
}
function OrganizacaoPapelFormularioComponent_Conditional_4_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 24);
    \u0275\u0275text(1, " Salvando\u2026 ");
  }
}
function OrganizacaoPapelFormularioComponent_Conditional_4_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 25);
    \u0275\u0275text(1, "save");
    \u0275\u0275elementEnd();
    \u0275\u0275text(2, " Salvar ");
  }
}
function OrganizacaoPapelFormularioComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 3)(1, "div", 4);
    \u0275\u0275conditionalCreate(2, OrganizacaoPapelFormularioComponent_Conditional_4_Conditional_2_Template, 6, 1, "div")(3, OrganizacaoPapelFormularioComponent_Conditional_4_Conditional_3_Template, 5, 2, "p", 5);
    \u0275\u0275elementStart(4, "div")(5, "label", 6);
    \u0275\u0275text(6, "Nome exibido");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "input", 7);
    \u0275\u0275twoWayListener("ngModelChange", function OrganizacaoPapelFormularioComponent_Conditional_4_Template_input_ngModelChange_7_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.label, $event) || (ctx_r0.label = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(8, OrganizacaoPapelFormularioComponent_Conditional_4_Conditional_8_Template, 5, 0, "p", 8);
    \u0275\u0275elementStart(9, "div", 9)(10, "p", 10);
    \u0275\u0275text(11, "Permiss\xF5es concedidas");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(12, OrganizacaoPapelFormularioComponent_Conditional_4_For_13_Template, 6, 1, "div", 11, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div", 12)(15, "button", 13);
    \u0275\u0275listener("click", function OrganizacaoPapelFormularioComponent_Conditional_4_Template_button_click_15_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.salvar());
    });
    \u0275\u0275conditionalCreate(16, OrganizacaoPapelFormularioComponent_Conditional_4_Conditional_16_Template, 2, 0)(17, OrganizacaoPapelFormularioComponent_Conditional_4_Conditional_17_Template, 3, 0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "a", 14);
    \u0275\u0275text(19, "Cancelar");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.novo ? 2 : 3);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.label);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.permissoesBloqueadas ? 8 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275repeater(ctx_r0.grupos);
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r0.salvando || !ctx_r0.label.trim());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.salvando ? 16 : 17);
  }
}
var OrganizacaoPapelFormularioComponent = class _OrganizacaoPapelFormularioComponent {
  novo = false;
  slugParam = "";
  label = "";
  slugNovo = "";
  catalog = [];
  selecionadas = /* @__PURE__ */ new Set();
  detalhe = null;
  showSkeleton;
  listaPronta = false;
  salvando = false;
  erro = "";
  route = inject(ActivatedRoute);
  router = inject(Router);
  service = inject(OrganizationRolesService);
  loadingService = inject(LoadingService);
  toast = inject(ToastService);
  get grupos() {
    const map = /* @__PURE__ */ new Map();
    for (const item of this.catalog) {
      const g = item.group_label || item.group;
      if (!map.has(g))
        map.set(g, []);
      map.get(g).push(item);
    }
    return [...map.entries()].map(([label, items]) => ({ label, items }));
  }
  get permissoesBloqueadas() {
    return !!this.detalhe?.is_system && this.detalhe.slug === "owner";
  }
  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get("slug") ?? "";
    this.slugParam = slug;
    this.novo = slug === "novo";
    if (this.novo) {
      const { data$: data$2, showSkeleton: showSkeleton2 } = this.loadingService.loadWithThreshold(this.service.catalog());
      this.showSkeleton = showSkeleton2;
      data$2.subscribe({
        next: (c) => {
          this.catalog = c;
          this.listaPronta = true;
        },
        error: () => {
          this.listaPronta = true;
          this.erro = "N\xE3o foi poss\xEDvel carregar o cat\xE1logo de permiss\xF5es.";
        }
      });
      return;
    }
    const obs = forkJoin({
      catalog: this.service.catalog(),
      perfil: this.service.get(slug)
    });
    const { data$, showSkeleton } = this.loadingService.loadWithThreshold(obs);
    this.showSkeleton = showSkeleton;
    data$.subscribe({
      next: ({ catalog, perfil }) => {
        this.catalog = catalog;
        this.detalhe = perfil;
        this.label = perfil.label;
        this.selecionadas = new Set(perfil.permissions ?? []);
        this.listaPronta = true;
      },
      error: () => {
        this.listaPronta = true;
        this.erro = "Perfil de permiss\xF5es n\xE3o encontrado ou sem autoriza\xE7\xE3o.";
      }
    });
  }
  toggle(key) {
    if (this.permissoesBloqueadas)
      return;
    if (this.selecionadas.has(key))
      this.selecionadas.delete(key);
    else
      this.selecionadas.add(key);
  }
  isOn(key) {
    return this.selecionadas.has(key);
  }
  salvar() {
    if (this.permissoesBloqueadas) {
      this.salvarSoLabel();
      return;
    }
    const perms = [...this.selecionadas];
    if (perms.length === 0) {
      this.toast.error("Valida\xE7\xE3o", "Selecione ao menos uma permiss\xE3o.");
      return;
    }
    if (this.novo) {
      const s = this.slugNovo.trim().toLowerCase();
      if (!/^[a-z][a-z0-9_]{1,62}$/.test(s)) {
        this.toast.error("Valida\xE7\xE3o", "Identificador: letras min\xFAsculas, n\xFAmeros e underscore; 2\u201363 caracteres.");
        return;
      }
      if (!this.label.trim()) {
        this.toast.error("Valida\xE7\xE3o", "Informe o nome do perfil de permiss\xF5es.");
        return;
      }
      this.salvando = true;
      this.service.create({ slug: s, label: this.label.trim(), permissions: perms }).subscribe({
        next: () => {
          this.salvando = false;
          this.toast.success("Permiss\xF5es criadas", "");
          void this.router.navigate(["/organizacao/permissoes"]);
        },
        error: (err) => {
          this.salvando = false;
          this.toast.error("Erro", err.error?.message ?? "N\xE3o foi poss\xEDvel salvar.");
        }
      });
      return;
    }
    this.salvando = true;
    this.service.update(this.slugParam, { label: this.label.trim(), permissions: perms }).subscribe({
      next: () => {
        this.salvando = false;
        this.toast.success("Permiss\xF5es atualizadas", "");
        void this.router.navigate(["/organizacao/permissoes"]);
      },
      error: (err) => {
        this.salvando = false;
        this.toast.error("Erro", err.error?.message ?? "N\xE3o foi poss\xEDvel salvar.");
      }
    });
  }
  salvarSoLabel() {
    if (!this.detalhe)
      return;
    this.salvando = true;
    this.service.update(this.slugParam, { label: this.label.trim() }).subscribe({
      next: () => {
        this.salvando = false;
        this.toast.success("Nome atualizado", "");
        void this.router.navigate(["/organizacao/permissoes"]);
      },
      error: (err) => {
        this.salvando = false;
        this.toast.error("Erro", err.error?.message ?? "N\xE3o foi poss\xEDvel salvar.");
      }
    });
  }
  static \u0275fac = function OrganizacaoPapelFormularioComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _OrganizacaoPapelFormularioComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _OrganizacaoPapelFormularioComponent, selectors: [["app-organizacao-papel-formulario"]], decls: 5, vars: 1, consts: [[1, "relative", "min-h-[320px]"], [3, "height"], [1, "text-sm", 2, "color", "var(--c-error, #dc2626)"], [1, "zm-content-enter"], [1, "card", "flex", "flex-col", "gap-5"], [1, "text-sm", "m-0", 2, "color", "var(--c-muted)"], [1, "form-label"], ["type", "text", "name", "label", "required", "", 1, "form-input", 3, "ngModelChange", "ngModel"], [1, "text-sm", "m-0", "p-3", "rounded-lg", 2, "background", "var(--c-soft)", "color", "var(--c-text)"], [1, "flex", "flex-col", "gap-4"], [1, "form-label", "m-0"], [1, "perm-group"], [1, "flex", "items-center", "gap-3", "pt-2"], ["type", "button", 1, "btn-primary", 3, "click", "disabled"], ["routerLink", "/organizacao/permissoes", 1, "text-sm", "no-underline", 2, "color", "var(--c-muted)"], ["type", "text", "name", "slugNovo", "placeholder", "ex.: recepcao", "autocomplete", "off", 1, "form-input", 3, "ngModelChange", "ngModel"], [1, "text-xs", "m-0", "mt-1", 2, "color", "var(--c-muted)"], [1, "ml-2", "text-xs"], [1, "perm-group-title", "m-0"], [1, "perm-list", "m-0", "p-0", "list-none", "space-y-2"], [1, "flex", "items-start", "gap-2", "cursor-pointer", "select-none", 2, "color", "var(--c-text)"], ["type", "checkbox", 1, "rounded", "border", "mt-0.5", 2, "accent-color", "var(--c-primary)", 3, "change", "checked", "disabled"], [1, "font-medium", "text-sm"], [1, "block", "text-xs", "mt-0.5", 2, "color", "var(--c-muted)"], ["aria-hidden", "true", 1, "btn-spinner"], [1, "material-symbols-outlined", "text-base"]], template: function OrganizacaoPapelFormularioComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275conditionalCreate(1, OrganizacaoPapelFormularioComponent_Conditional_1_Template, 1, 1, "zm-skeleton-card", 1)(2, OrganizacaoPapelFormularioComponent_Conditional_2_Template, 0, 0)(3, OrganizacaoPapelFormularioComponent_Conditional_3_Template, 2, 1, "p", 2)(4, OrganizacaoPapelFormularioComponent_Conditional_4_Template, 20, 5, "div", 3);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showSkeleton() ? 1 : !ctx.listaPronta ? 2 : ctx.erro ? 3 : 4);
    }
  }, dependencies: [CommonModule, RouterLink, FormsModule, DefaultValueAccessor, NgControlStatus, RequiredValidator, NgModel, ZmSkeletonCardComponent], styles: ["\n\n.perm-group-title[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n  color: var(--c-muted);\n  margin-bottom: 0.5rem;\n}\n.perm-list[_ngcontent-%COMP%]   input[type=checkbox][_ngcontent-%COMP%] {\n  margin-top: 0.2rem;\n}\n/*# sourceMappingURL=organizacao-papel-formulario.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OrganizacaoPapelFormularioComponent, [{
    type: Component,
    args: [{ selector: "app-organizacao-papel-formulario", standalone: true, imports: [CommonModule, RouterLink, FormsModule, ZmSkeletonCardComponent], template: `<div class="relative min-h-[320px]">\r
  <!-- <div class="page-header mb-5">\r
    <div class="page-title">\r
      <div class="page-title-icon">\r
        <span class="material-symbols-outlined">{{ novo ? 'add' : 'edit_note' }}</span>\r
      </div>\r
      <div>\r
        <h1>{{ novo ? 'Novo perfil de permiss\xF5es' : 'Editar perfil de permiss\xF5es' }}</h1>\r
        <p class="page-header-subtitle text-sm m-0 mt-1">\r
          {{ novo ? 'Defina um identificador, o nome e quais acessos este perfil ter\xE1 na organiza\xE7\xE3o.' : 'Ajuste o nome e as permiss\xF5es associadas a este perfil.' }}\r
        </p>\r
      </div>\r
    </div>\r
  </div> -->\r
\r
  @if (showSkeleton()) {\r
    <zm-skeleton-card [height]="420" />\r
  } @else if (!listaPronta) {\r
  } @else if (erro) {\r
    <p class="text-sm" style="color: var(--c-error, #dc2626)">{{ erro }}</p>\r
  } @else {\r
    <div class="zm-content-enter">\r
      <div class="card flex flex-col gap-5">\r
        @if (novo) {\r
          <div>\r
            <label class="form-label">Identificador (slug)</label>\r
            <input type="text" [(ngModel)]="slugNovo" name="slugNovo" class="form-input" placeholder="ex.: recepcao" autocomplete="off" />\r
            <p class="text-xs m-0 mt-1" style="color: var(--c-muted)">Min\xFAsculas, n\xFAmeros e underscore. N\xE3o pode ser alterado depois.</p>\r
          </div>\r
        } @else {\r
          <p class="text-sm m-0" style="color: var(--c-muted)">\r
            Identificador: <code>{{ slugParam }}</code>\r
            @if (detalhe?.is_system) {\r
              <span class="ml-2 text-xs">(perfil padr\xE3o do sistema)</span>\r
            }\r
          </p>\r
        }\r
\r
        <div>\r
          <label class="form-label">Nome exibido</label>\r
          <input type="text" [(ngModel)]="label" name="label" class="form-input" required />\r
        </div>\r
\r
        @if (permissoesBloqueadas) {\r
          <p class="text-sm m-0 p-3 rounded-lg" style="background: var(--c-soft); color: var(--c-text)">\r
            O perfil <strong>Propriet\xE1rio</strong> sempre inclui todas as permiss\xF5es. Voc\xEA pode alterar apenas o nome exibido.\r
          </p>\r
        }\r
\r
        <div class="flex flex-col gap-4">\r
          <p class="form-label m-0">Permiss\xF5es concedidas</p>\r
          @for (g of grupos; track g.label) {\r
            <div class="perm-group">\r
              <p class="perm-group-title m-0">{{ g.label }}</p>\r
              <ul class="perm-list m-0 p-0 list-none space-y-2">\r
                @for (item of g.items; track item.key) {\r
                  <li>\r
                    <label class="flex items-start gap-2 cursor-pointer select-none" style="color: var(--c-text)">\r
                      <input\r
                        type="checkbox"\r
                        class="rounded border mt-0.5"\r
                        style="accent-color: var(--c-primary)"\r
                        [checked]="isOn(item.key)"\r
                        [disabled]="permissoesBloqueadas"\r
                        (change)="toggle(item.key)" />\r
                      <span>\r
                        <span class="font-medium text-sm">{{ item.label }}</span>\r
                        @if (item.description) {\r
                          <span class="block text-xs mt-0.5" style="color: var(--c-muted)">{{ item.description }}</span>\r
                        }\r
                      </span>\r
                    </label>\r
                  </li>\r
                }\r
              </ul>\r
            </div>\r
          }\r
        </div>\r
\r
        <div class="flex items-center gap-3 pt-2">\r
          <button type="button" class="btn-primary" [disabled]="salvando || !label.trim()" (click)="salvar()">\r
            @if (salvando) {\r
              <span class="btn-spinner" aria-hidden="true"></span>\r
              Salvando\u2026\r
            } @else {\r
              <span class="material-symbols-outlined text-base">save</span>\r
              Salvar\r
            }\r
          </button>\r
          <a routerLink="/organizacao/permissoes" class="text-sm no-underline" style="color: var(--c-muted)">Cancelar</a>\r
        </div>\r
      </div>\r
    </div>\r
  }\r
</div>\r
`, styles: ["/* src/app/paginas/organizacao/organizacao-papel-formulario.component.css */\n.perm-group-title {\n  font-size: 0.75rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n  color: var(--c-muted);\n  margin-bottom: 0.5rem;\n}\n.perm-list input[type=checkbox] {\n  margin-top: 0.2rem;\n}\n/*# sourceMappingURL=organizacao-papel-formulario.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(OrganizacaoPapelFormularioComponent, { className: "OrganizacaoPapelFormularioComponent", filePath: "src/app/paginas/organizacao/organizacao-papel-formulario.component.ts", lineNumber: 22 });
})();
export {
  OrganizacaoPapelFormularioComponent
};
//# sourceMappingURL=chunk-DA3YI4U2.js.map
