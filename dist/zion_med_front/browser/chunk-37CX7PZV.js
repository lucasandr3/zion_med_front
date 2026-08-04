import {
  UsuariosService
} from "./chunk-GQYQFEJU.js";
import {
  LoadingService,
  ZmSkeletonCardComponent
} from "./chunk-GKI5AWTV.js";
import "./chunk-7WBHVE2H.js";
import {
  ToastService
} from "./chunk-EZUVP6MG.js";
import {
  CheckboxControlValueAccessor,
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgControlStatusGroup,
  NgForm,
  NgModel,
  NgSelectOption,
  RequiredValidator,
  SelectControlValueAccessor,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption
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
  __spreadValues,
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
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-GRLISYEV.js";

// src/app/paginas/usuarios/usuarios-formulario.component.ts
var _forTrack0 = ($index, $item) => $item.value;
function UsuariosFormularioComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "zm-skeleton-card", 6);
  }
  if (rf & 2) {
    \u0275\u0275property("height", 420);
  }
}
function UsuariosFormularioComponent_Conditional_12_Template(rf, ctx) {
}
function UsuariosFormularioComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 7);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.erro || "N\xE3o foi poss\xEDvel carregar os dados.");
  }
}
function UsuariosFormularioComponent_Conditional_14_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 7);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.erro);
  }
}
function UsuariosFormularioComponent_Conditional_14_For_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 15);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const r_r3 = ctx.$implicit;
    \u0275\u0275property("ngValue", r_r3.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(r_r3.label);
  }
}
function UsuariosFormularioComponent_Conditional_14_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 16)(1, "div")(2, "label", 11);
    \u0275\u0275text(3, "Senha *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "input", 20);
    \u0275\u0275twoWayListener("ngModelChange", function UsuariosFormularioComponent_Conditional_14_Conditional_18_Template_input_ngModelChange_4_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.password, $event) || (ctx_r0.password = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div")(6, "label", 11);
    \u0275\u0275text(7, "Confirmar senha *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "input", 21);
    \u0275\u0275twoWayListener("ngModelChange", function UsuariosFormularioComponent_Conditional_14_Conditional_18_Template_input_ngModelChange_8_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.passwordConfirm, $event) || (ctx_r0.passwordConfirm = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.password);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.passwordConfirm);
  }
}
function UsuariosFormularioComponent_Conditional_14_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 16)(1, "div")(2, "label", 11);
    \u0275\u0275text(3, "Nova senha");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "input", 22);
    \u0275\u0275twoWayListener("ngModelChange", function UsuariosFormularioComponent_Conditional_14_Conditional_19_Template_input_ngModelChange_4_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.newPassword, $event) || (ctx_r0.newPassword = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div")(6, "label", 11);
    \u0275\u0275text(7, "Confirmar nova senha");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "input", 23);
    \u0275\u0275twoWayListener("ngModelChange", function UsuariosFormularioComponent_Conditional_14_Conditional_19_Template_input_ngModelChange_8_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.newPasswordConfirm, $event) || (ctx_r0.newPasswordConfirm = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "div")(10, "label", 11);
    \u0275\u0275text(11, "Situa\xE7\xE3o");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "label", 24)(13, "input", 25);
    \u0275\u0275twoWayListener("ngModelChange", function UsuariosFormularioComponent_Conditional_14_Conditional_19_Template_input_ngModelChange_13_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.active, $event) || (ctx_r0.active = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "span", 26);
    \u0275\u0275text(15, "Usu\xE1rio ativo (pode acessar o sistema)");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.newPassword);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.newPasswordConfirm);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.active);
  }
}
function UsuariosFormularioComponent_Conditional_14_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div")(1, "label", 24)(2, "input", 27);
    \u0275\u0275twoWayListener("ngModelChange", function UsuariosFormularioComponent_Conditional_14_Conditional_20_Template_input_ngModelChange_2_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.canSwitchClinic, $event) || (ctx_r0.canSwitchClinic = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 26);
    \u0275\u0275text(4, "Pode acessar todas as cl\xEDnicas da conta");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "p", 28);
    \u0275\u0275text(6, "Somente propriet\xE1rios podem conceder esta permiss\xE3o.");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.canSwitchClinic);
  }
}
function UsuariosFormularioComponent_Conditional_14_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 29);
    \u0275\u0275text(1, " Salvando\u2026 ");
  }
}
function UsuariosFormularioComponent_Conditional_14_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 30);
    \u0275\u0275text(1, "save");
    \u0275\u0275elementEnd();
    \u0275\u0275text(2);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.editMode ? "Salvar altera\xE7\xF5es" : "Cadastrar usu\xE1rio", " ");
  }
}
function UsuariosFormularioComponent_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 8)(1, "div", 9);
    \u0275\u0275conditionalCreate(2, UsuariosFormularioComponent_Conditional_14_Conditional_2_Template, 2, 1, "p", 7);
    \u0275\u0275elementStart(3, "form", 10);
    \u0275\u0275listener("ngSubmit", function UsuariosFormularioComponent_Conditional_14_Template_form_ngSubmit_3_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.salvar());
    });
    \u0275\u0275elementStart(4, "div")(5, "label", 11);
    \u0275\u0275text(6, "Nome *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "input", 12);
    \u0275\u0275twoWayListener("ngModelChange", function UsuariosFormularioComponent_Conditional_14_Template_input_ngModelChange_7_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.name, $event) || (ctx_r0.name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div")(9, "label", 11);
    \u0275\u0275text(10, "E-mail *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "input", 13);
    \u0275\u0275twoWayListener("ngModelChange", function UsuariosFormularioComponent_Conditional_14_Template_input_ngModelChange_11_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.email, $event) || (ctx_r0.email = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div")(13, "label", 11);
    \u0275\u0275text(14, "Permiss\xF5es (perfil) *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "select", 14);
    \u0275\u0275twoWayListener("ngModelChange", function UsuariosFormularioComponent_Conditional_14_Template_select_ngModelChange_15_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.role, $event) || (ctx_r0.role = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275repeaterCreate(16, UsuariosFormularioComponent_Conditional_14_For_17_Template, 2, 2, "option", 15, _forTrack0);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(18, UsuariosFormularioComponent_Conditional_14_Conditional_18_Template, 9, 2, "div", 16)(19, UsuariosFormularioComponent_Conditional_14_Conditional_19_Template, 16, 3);
    \u0275\u0275conditionalCreate(20, UsuariosFormularioComponent_Conditional_14_Conditional_20_Template, 7, 1, "div");
    \u0275\u0275elementStart(21, "div", 17)(22, "button", 18);
    \u0275\u0275conditionalCreate(23, UsuariosFormularioComponent_Conditional_14_Conditional_23_Template, 2, 0)(24, UsuariosFormularioComponent_Conditional_14_Conditional_24_Template, 3, 1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "a", 19);
    \u0275\u0275text(26, "Cancelar");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.erro ? 2 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.name);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.email);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.role);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.rolesList);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(!ctx_r0.editMode ? 18 : 19);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.podeConcederTrocaClinica ? 20 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r0.salvando || !ctx_r0.name.trim() || !ctx_r0.email.trim() || !ctx_r0.role || !ctx_r0.editMode && (!ctx_r0.password || !ctx_r0.passwordConfirm));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.salvando ? 23 : 24);
  }
}
function mensagemErroApi(err) {
  const e = err.error;
  if (!e)
    return "Ocorreu um erro. Tente novamente.";
  if (e.message)
    return e.message;
  if (e.errors)
    return Object.values(e.errors).flat().join(" ");
  return "Ocorreu um erro. Tente novamente.";
}
var UsuariosFormularioComponent = class _UsuariosFormularioComponent {
  editMode = false;
  usuarioId = null;
  name = "";
  email = "";
  role = "";
  password = "";
  passwordConfirm = "";
  newPassword = "";
  newPasswordConfirm = "";
  active = true;
  canSwitchClinic = false;
  rolesList = [];
  showSkeleton;
  listaPronta = false;
  salvando = false;
  erro = "";
  route = inject(ActivatedRoute);
  router = inject(Router);
  usuariosService = inject(UsuariosService);
  loadingService = inject(LoadingService);
  toast = inject(ToastService);
  auth = inject(AuthService);
  get podeConcederTrocaClinica() {
    return this.auth.getUser()?.role === "owner";
  }
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id");
    if (id) {
      this.editMode = true;
      this.usuarioId = Number(id);
      const obs = forkJoin({
        usuario: this.usuariosService.get(this.usuarioId),
        roles: this.usuariosService.roles()
      });
      const { data$, showSkeleton } = this.loadingService.loadWithThreshold(obs);
      this.showSkeleton = showSkeleton;
      data$.subscribe({
        next: ({ usuario, roles }) => {
          this.listaPronta = true;
          this.rolesList = roles;
          this.patchFromUser(usuario);
        },
        error: () => {
          this.listaPronta = true;
          this.erro = "Usu\xE1rio n\xE3o encontrado ou sem permiss\xE3o.";
        }
      });
    } else {
      const { data$, showSkeleton } = this.loadingService.loadWithThreshold(this.usuariosService.roles());
      this.showSkeleton = showSkeleton;
      data$.subscribe({
        next: (roles) => {
          this.listaPronta = true;
          this.rolesList = roles;
          if (roles.length && !this.role) {
            this.role = roles[0].value;
          }
        },
        error: () => {
          this.listaPronta = true;
          this.erro = "N\xE3o foi poss\xEDvel carregar os perfis.";
        }
      });
    }
  }
  patchFromUser(u) {
    this.name = u.name ?? "";
    this.email = u.email ?? "";
    this.role = u.role ?? "";
    this.active = u.active !== false;
    this.canSwitchClinic = !!u.can_switch_clinic;
  }
  salvar() {
    if (!this.name.trim() || !this.email.trim() || !this.role)
      return;
    if (!this.editMode) {
      if (!this.password.trim()) {
        this.toast.error("Valida\xE7\xE3o", "Informe a senha.");
        return;
      }
      if (this.password !== this.passwordConfirm) {
        this.toast.error("Valida\xE7\xE3o", "As senhas n\xE3o coincidem.");
        return;
      }
    } else if (this.newPassword.trim() || this.newPasswordConfirm.trim()) {
      if (!this.newPassword.trim()) {
        this.toast.error("Valida\xE7\xE3o", "Informe a nova senha ou deixe os campos em branco.");
        return;
      }
      if (this.newPassword !== this.newPasswordConfirm) {
        this.toast.error("Valida\xE7\xE3o", "As novas senhas n\xE3o coincidem.");
        return;
      }
    }
    this.salvando = true;
    this.erro = "";
    if (this.editMode && this.usuarioId != null) {
      const body = {
        name: this.name.trim(),
        email: this.email.trim(),
        role: this.role,
        active: this.active
      };
      if (this.newPassword.trim()) {
        body.password = this.newPassword;
        body.password_confirmation = this.newPasswordConfirm;
      }
      if (this.podeConcederTrocaClinica) {
        body.can_switch_clinic = this.canSwitchClinic;
      }
      this.usuariosService.update(this.usuarioId, body).subscribe({
        next: () => {
          this.salvando = false;
          this.toast.success("Usu\xE1rio atualizado", "");
          this.router.navigate(["/usuarios"]);
        },
        error: (err) => {
          this.salvando = false;
          this.erro = mensagemErroApi(err);
          this.toast.error("Erro", this.erro);
        }
      });
    } else {
      this.usuariosService.create(__spreadValues({
        name: this.name.trim(),
        email: this.email.trim(),
        password: this.password,
        password_confirmation: this.passwordConfirm,
        role: this.role
      }, this.podeConcederTrocaClinica ? { can_switch_clinic: this.canSwitchClinic } : {})).subscribe({
        next: () => {
          this.salvando = false;
          this.toast.success("Usu\xE1rio criado", "");
          this.router.navigate(["/usuarios"]);
        },
        error: (err) => {
          this.salvando = false;
          this.erro = mensagemErroApi(err);
          this.toast.error("Erro", this.erro);
        }
      });
    }
  }
  static \u0275fac = function UsuariosFormularioComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _UsuariosFormularioComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _UsuariosFormularioComponent, selectors: [["app-usuarios-formulario"]], decls: 15, vars: 3, consts: [[1, "relative", "min-h-[200px]"], [1, "page-header", "mb-5"], [1, "page-title"], [1, "page-title-icon"], [1, "material-symbols-outlined"], [1, "page-header-subtitle", "text-sm", "m-0", "mt-1", 2, "color", "var(--c-muted)"], [3, "height"], [1, "text-sm", "mb-4", 2, "color", "var(--c-error, #dc2626)"], [1, "zm-content-enter"], [1, "card"], [1, "flex", "flex-col", "gap-5", 3, "ngSubmit"], [1, "form-label"], ["type", "text", "name", "name", "required", "", "placeholder", "Nome completo", "autocomplete", "name", 1, "form-input", 3, "ngModelChange", "ngModel"], ["type", "email", "name", "email", "required", "", "placeholder", "nome@exemplo.com", "autocomplete", "email", 1, "form-input", 3, "ngModelChange", "ngModel"], ["name", "role", "required", "", 1, "form-input", 3, "ngModelChange", "ngModel"], [3, "ngValue"], [1, "grid", "md:grid-cols-2", "gap-4"], [1, "flex", "items-center", "gap-3", "pt-2"], ["type", "submit", 1, "btn-primary", 3, "disabled"], ["routerLink", "/usuarios", 1, "text-sm", "no-underline", 2, "color", "var(--c-muted)"], ["type", "password", "name", "password", "required", "", "placeholder", "M\xEDnimo exigido pelo sistema", "autocomplete", "new-password", 1, "form-input", 3, "ngModelChange", "ngModel"], ["type", "password", "name", "passwordConfirm", "required", "", "placeholder", "Repita a senha", "autocomplete", "new-password", 1, "form-input", 3, "ngModelChange", "ngModel"], ["type", "password", "name", "newPassword", "placeholder", "Deixe em branco para manter", "autocomplete", "new-password", 1, "form-input", 3, "ngModelChange", "ngModel"], ["type", "password", "name", "newPasswordConfirm", "placeholder", "Se alterar a senha", "autocomplete", "new-password", 1, "form-input", 3, "ngModelChange", "ngModel"], [1, "flex", "items-center", "gap-2", "cursor-pointer", "select-none", 2, "color", "var(--c-text)"], ["type", "checkbox", "name", "active", 1, "rounded", "border", 2, "accent-color", "var(--c-primary)", 3, "ngModelChange", "ngModel"], [1, "text-sm"], ["type", "checkbox", "name", "canSwitchClinic", 1, "rounded", "border", 2, "accent-color", "var(--c-primary)", 3, "ngModelChange", "ngModel"], [1, "text-xs", "m-0", "mt-1", 2, "color", "var(--c-muted)"], ["aria-hidden", "true", 1, "btn-spinner"], [1, "material-symbols-outlined", "text-base"]], template: function UsuariosFormularioComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "span", 4);
      \u0275\u0275text(5);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "div")(7, "h1");
      \u0275\u0275text(8);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "p", 5);
      \u0275\u0275text(10, " Escolha o perfil de permiss\xF5es do usu\xE1rio (conforme o que foi configurado na organiza\xE7\xE3o). ");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275conditionalCreate(11, UsuariosFormularioComponent_Conditional_11_Template, 1, 1, "zm-skeleton-card", 6)(12, UsuariosFormularioComponent_Conditional_12_Template, 0, 0)(13, UsuariosFormularioComponent_Conditional_13_Template, 2, 1, "p", 7)(14, UsuariosFormularioComponent_Conditional_14_Template, 27, 8, "div", 8);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.editMode ? "edit_note" : "person_add");
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.editMode ? "Editar usu\xE1rio" : "Novo usu\xE1rio");
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.showSkeleton() && ctx.editMode ? 11 : !ctx.listaPronta ? 12 : ctx.rolesList.length === 0 ? 13 : 14);
    }
  }, dependencies: [CommonModule, RouterLink, FormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, CheckboxControlValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, NgModel, NgForm, ZmSkeletonCardComponent], styles: ["\n\n/*# sourceMappingURL=usuarios-formulario.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UsuariosFormularioComponent, [{
    type: Component,
    args: [{ selector: "app-usuarios-formulario", standalone: true, imports: [CommonModule, RouterLink, FormsModule, ZmSkeletonCardComponent], template: `<div class="relative min-h-[200px]">\r
  <div class="page-header mb-5">\r
    <div class="page-title">\r
      <div class="page-title-icon">\r
        <span class="material-symbols-outlined">{{ editMode ? 'edit_note' : 'person_add' }}</span>\r
      </div>\r
      <div>\r
        <h1>{{ editMode ? 'Editar usu\xE1rio' : 'Novo usu\xE1rio' }}</h1>\r
        <p class="page-header-subtitle text-sm m-0 mt-1" style="color: var(--c-muted)">\r
          Escolha o perfil de permiss\xF5es do usu\xE1rio (conforme o que foi configurado na organiza\xE7\xE3o).\r
        </p>\r
      </div>\r
    </div>\r
  </div>\r
\r
  @if (showSkeleton() && editMode) {\r
    <zm-skeleton-card [height]="420" />\r
  } @else if (!listaPronta) {\r
  } @else if (rolesList.length === 0) {\r
    <p class="text-sm mb-4" style="color: var(--c-error, #dc2626)">{{ erro || 'N\xE3o foi poss\xEDvel carregar os dados.' }}</p>\r
  } @else {\r
    <div class="zm-content-enter">\r
      <div class="card">\r
        @if (erro) {\r
          <p class="text-sm mb-4" style="color: var(--c-error, #dc2626)">{{ erro }}</p>\r
        }\r
        <form (ngSubmit)="salvar()" class="flex flex-col gap-5">\r
          <div>\r
            <label class="form-label">Nome *</label>\r
            <input\r
              type="text"\r
              [(ngModel)]="name"\r
              name="name"\r
              required\r
              class="form-input"\r
              placeholder="Nome completo"\r
              autocomplete="name"\r
            />\r
          </div>\r
          <div>\r
            <label class="form-label">E-mail *</label>\r
            <input\r
              type="email"\r
              [(ngModel)]="email"\r
              name="email"\r
              required\r
              class="form-input"\r
              placeholder="nome@exemplo.com"\r
              autocomplete="email"\r
            />\r
          </div>\r
          <div>\r
            <label class="form-label">Permiss\xF5es (perfil) *</label>\r
            <select [(ngModel)]="role" name="role" class="form-input" required>\r
              @for (r of rolesList; track r.value) {\r
                <option [ngValue]="r.value">{{ r.label }}</option>\r
              }\r
            </select>\r
          </div>\r
\r
          @if (!editMode) {\r
            <div class="grid md:grid-cols-2 gap-4">\r
              <div>\r
                <label class="form-label">Senha *</label>\r
                <input\r
                  type="password"\r
                  [(ngModel)]="password"\r
                  name="password"\r
                  required\r
                  class="form-input"\r
                  placeholder="M\xEDnimo exigido pelo sistema"\r
                  autocomplete="new-password"\r
                />\r
              </div>\r
              <div>\r
                <label class="form-label">Confirmar senha *</label>\r
                <input\r
                  type="password"\r
                  [(ngModel)]="passwordConfirm"\r
                  name="passwordConfirm"\r
                  required\r
                  class="form-input"\r
                  placeholder="Repita a senha"\r
                  autocomplete="new-password"\r
                />\r
              </div>\r
            </div>\r
          } @else {\r
            <div class="grid md:grid-cols-2 gap-4">\r
              <div>\r
                <label class="form-label">Nova senha</label>\r
                <input\r
                  type="password"\r
                  [(ngModel)]="newPassword"\r
                  name="newPassword"\r
                  class="form-input"\r
                  placeholder="Deixe em branco para manter"\r
                  autocomplete="new-password"\r
                />\r
              </div>\r
              <div>\r
                <label class="form-label">Confirmar nova senha</label>\r
                <input\r
                  type="password"\r
                  [(ngModel)]="newPasswordConfirm"\r
                  name="newPasswordConfirm"\r
                  class="form-input"\r
                  placeholder="Se alterar a senha"\r
                  autocomplete="new-password"\r
                />\r
              </div>\r
            </div>\r
            <div>\r
              <label class="form-label">Situa\xE7\xE3o</label>\r
              <label class="flex items-center gap-2 cursor-pointer select-none" style="color: var(--c-text)">\r
                <input type="checkbox" [(ngModel)]="active" name="active" class="rounded border" style="accent-color: var(--c-primary)" />\r
                <span class="text-sm">Usu\xE1rio ativo (pode acessar o sistema)</span>\r
              </label>\r
            </div>\r
          }\r
\r
          @if (podeConcederTrocaClinica) {\r
            <div>\r
              <label class="flex items-center gap-2 cursor-pointer select-none" style="color: var(--c-text)">\r
                <input\r
                  type="checkbox"\r
                  [(ngModel)]="canSwitchClinic"\r
                  name="canSwitchClinic"\r
                  class="rounded border"\r
                  style="accent-color: var(--c-primary)"\r
                />\r
                <span class="text-sm">Pode acessar todas as cl\xEDnicas da conta</span>\r
              </label>\r
              <p class="text-xs m-0 mt-1" style="color: var(--c-muted)">Somente propriet\xE1rios podem conceder esta permiss\xE3o.</p>\r
            </div>\r
          }\r
\r
          <div class="flex items-center gap-3 pt-2">\r
            <button\r
              type="submit"\r
              class="btn-primary"\r
              [disabled]="salvando || !name.trim() || !email.trim() || !role || (!editMode && (!password || !passwordConfirm))"\r
            >\r
              @if (salvando) {\r
                <span class="btn-spinner" aria-hidden="true"></span>\r
                Salvando\u2026\r
              } @else {\r
                <span class="material-symbols-outlined text-base">save</span>\r
                {{ editMode ? 'Salvar altera\xE7\xF5es' : 'Cadastrar usu\xE1rio' }}\r
              }\r
            </button>\r
            <a routerLink="/usuarios" class="text-sm no-underline" style="color: var(--c-muted)">Cancelar</a>\r
          </div>\r
        </form>\r
      </div>\r
    </div>\r
  }\r
</div>\r
`, styles: ["/* src/app/paginas/usuarios/usuarios-formulario.component.css */\n/*# sourceMappingURL=usuarios-formulario.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(UsuariosFormularioComponent, { className: "UsuariosFormularioComponent", filePath: "src/app/paginas/usuarios/usuarios-formulario.component.ts", lineNumber: 27 });
})();
export {
  UsuariosFormularioComponent
};
//# sourceMappingURL=chunk-37CX7PZV.js.map
