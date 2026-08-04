import {
  environment
} from "./chunk-IBJWGIJV.js";
import {
  Router
} from "./chunk-C2NWBPZH.js";
import {
  HttpClient,
  Injectable,
  Subject,
  __spreadValues,
  catchError,
  inject,
  of,
  setClassMetadata,
  tap,
  ɵɵdefineInjectable
} from "./chunk-GRLISYEV.js";

// src/app/core/services/user-appearance.sync.ts
var GESTGO_THEME_LS = "gestgo_theme";
var GESTGO_DARK_LS = "gestgo_dark_mode";
function applyUserAppearanceToBrowser(fields) {
  if (typeof document === "undefined" || typeof localStorage === "undefined")
    return;
  const theme = fields.ui_theme;
  if (theme != null && theme !== "") {
    const list = Array.from(document.body.classList).filter((c) => c.startsWith("theme-"));
    list.forEach((c) => document.body.classList.remove(c));
    document.body.classList.add("theme-" + theme);
    try {
      localStorage.setItem(GESTGO_THEME_LS, theme);
    } catch {
    }
  }
  if (fields.ui_dark_mode !== null && fields.ui_dark_mode !== void 0) {
    document.body.classList.toggle("dark", fields.ui_dark_mode);
    try {
      localStorage.setItem(GESTGO_DARK_LS, fields.ui_dark_mode ? "1" : "0");
    } catch {
    }
  }
}

// src/app/core/services/auth.service.ts
var TOKEN_KEY = "gestgo_token";
var USER_KEY = "gestgo_user";
var ORGANIZATIONS_KEY = "gestgo_organizations";
var CURRENT_ORG_KEY = "gestgo_organization_id";
var CLINICS_KEY_LEGACY = "gestgo_clinics";
var CLINIC_ID_KEY_LEGACY = "gestgo_clinic_id";
var AuthService = class _AuthService {
  http = inject(HttpClient);
  router = inject(Router);
  baseUrl = environment.apiUrl;
  _user = null;
  _organizations = [];
  _currentOrganizationId = null;
  /** Aviso de fim de trial (preenchido após `/me`). */
  _trialNotice = null;
  /** Emite após tema/modo ser aplicados a partir da API (ex.: pós-`/me`). */
  appearanceAppliedSubject = new Subject();
  appearanceApplied$ = this.appearanceAppliedSubject.asObservable();
  constructor() {
    this.loadFromStorage();
  }
  /** Para o cabeçalho reler `localStorage`/`body` quando a sessão sincronizar com o servidor. */
  notifyAppearanceApplied() {
    this.appearanceAppliedSubject.next();
  }
  loadFromStorage() {
    if (typeof localStorage === "undefined")
      return;
    try {
      const u = localStorage.getItem(USER_KEY);
      let orgsJson = localStorage.getItem(ORGANIZATIONS_KEY);
      if (!orgsJson)
        orgsJson = localStorage.getItem(CLINICS_KEY_LEGACY);
      let oid = localStorage.getItem(CURRENT_ORG_KEY);
      if (!oid)
        oid = localStorage.getItem(CLINIC_ID_KEY_LEGACY);
      if (u)
        this._user = JSON.parse(u);
      if (orgsJson)
        this._organizations = JSON.parse(orgsJson);
      if (oid)
        this._currentOrganizationId = oid;
    } catch {
    }
  }
  persist() {
    try {
      if (this._user)
        localStorage.setItem(USER_KEY, JSON.stringify(this._user));
      localStorage.setItem(ORGANIZATIONS_KEY, JSON.stringify(this._organizations));
      localStorage.removeItem(CLINICS_KEY_LEGACY);
      if (this._currentOrganizationId != null)
        localStorage.setItem(CURRENT_ORG_KEY, this._currentOrganizationId);
      else
        localStorage.removeItem(CURRENT_ORG_KEY);
      localStorage.removeItem(CLINIC_ID_KEY_LEGACY);
    } catch {
    }
  }
  /** Usado após login ou cadastro (comece) para definir token e contexto. */
  setSessionFromLoginData(data) {
    if (typeof localStorage !== "undefined" && data.token) {
      localStorage.setItem(TOKEN_KEY, data.token);
    }
    this._user = data.user;
    this._organizations = data.organizations ?? data.clinics ?? [];
    const cid = data.current_organization_id ?? data.current_clinic_id;
    this._currentOrganizationId = cid != null ? String(cid) : null;
    this.persist();
    applyUserAppearanceToBrowser(data.user);
    this.notifyAppearanceApplied();
  }
  /** Mescla resposta da API (ex.: PATCH aparência) no usuário em memória e no localStorage. */
  mergeUserFromApi(u) {
    if (!this._user || this._user.id !== u.id)
      return;
    this._user = __spreadValues(__spreadValues({}, this._user), u);
    this.persist();
  }
  getToken() {
    return typeof localStorage !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null;
  }
  getUser() {
    return this._user;
  }
  getTrialNotice() {
    return this._trialNotice;
  }
  getOrganizations() {
    return this._organizations;
  }
  /** @deprecated Use getOrganizations() */
  getClinics() {
    return this._organizations;
  }
  getCurrentOrganizationId() {
    return this._currentOrganizationId;
  }
  /** @deprecated Use getCurrentOrganizationId() */
  getCurrentClinicId() {
    return this._currentOrganizationId;
  }
  getCurrentOrganization() {
    const id = this._currentOrganizationId;
    if (!id)
      return null;
    return this._organizations.find((o) => String(o.id) === id) ?? null;
  }
  /** @deprecated Use getCurrentOrganization() */
  getCurrentClinic() {
    return this.getCurrentOrganization();
  }
  setCurrentOrganizationId(id) {
    this._currentOrganizationId = id != null ? String(id) : null;
    this.persist();
  }
  /** @deprecated Use setCurrentOrganizationId() */
  setCurrentClinicId(id) {
    this.setCurrentOrganizationId(id);
  }
  isAuthenticated() {
    return !!this.getToken();
  }
  canSwitchClinic() {
    return this._user?.can_switch_clinic ?? false;
  }
  /** Verifica permissão no contexto atual (usa `user.permissions` ou fallback por `role` legado). */
  hasPermission(key) {
    const u = this._user;
    if (!u)
      return false;
    if (Array.isArray(u.permissions)) {
      return u.permissions.includes(key);
    }
    return this.permissionFallbackByRole(u.role, key);
  }
  permissionFallbackByRole(role, key) {
    if (!role)
      return false;
    if (role === "owner" || role === "super_admin")
      return true;
    if (role === "platform_admin")
      return true;
    if (role === "manager") {
      return [
        "dashboard.access",
        "notifications.access",
        "billing.manage",
        "templates.manage",
        "submissions.view",
        "submissions.approve",
        "people.deactivate"
      ].includes(key);
    }
    if (role === "staff") {
      return ["dashboard.access", "notifications.access", "submissions.view"].includes(key);
    }
    return false;
  }
  /** Primeira rota do app tenant que o usuário pode abrir (pós-login ou após bloqueio de guard). */
  getDefaultTenantPath() {
    const routes = [
      ["/dashboard", () => this.hasPermission("dashboard.access")],
      ["/notificacoes", () => this.hasPermission("notifications.access")],
      ["/protocolos", () => this.hasPermission("submissions.view")],
      ["/pessoas", () => this.hasPermission("submissions.view")],
      ["/templates", () => this.hasPermission("templates.manage")],
      ["/links-publicos", () => this.hasPermission("templates.manage") || this.hasPermission("submissions.view")],
      ["/envios", () => this.hasPermission("templates.manage") || this.hasPermission("submissions.view")],
      ["/assinatura", () => this.hasPermission("billing.manage")],
      ["/link-bio", () => this.hasPermission("organization.manage")],
      ["/clinica/configuracoes", () => this.hasPermission("organization.manage")],
      ["/clinica/integracoes", () => this.hasPermission("organization.manage")],
      ["/usuarios", () => this.hasPermission("users.manage")],
      ["/organizacao/permissoes", () => this.hasPermission("users.manage")]
    ];
    for (const [path, ok] of routes) {
      if (ok())
        return path;
    }
    if (this.canSwitchClinic())
      return "/clinica/escolher";
    return "/404";
  }
  login(email, password) {
    return this.http.post(`${this.baseUrl}/api/v1/auth/login`, { email, password }).pipe(tap((res) => {
      const d = res.data;
      if (typeof localStorage !== "undefined") {
        localStorage.setItem(TOKEN_KEY, d.token);
      }
      this._user = d.user;
      this._organizations = d.organizations ?? d.clinics ?? [];
      const cid = d.current_organization_id ?? d.current_clinic_id;
      this._currentOrganizationId = cid != null ? String(cid) : null;
      this.persist();
      applyUserAppearanceToBrowser(d.user);
      this.notifyAppearanceApplied();
    }));
  }
  logout() {
    const token = this.getToken();
    if (!token) {
      this.clearSession();
      return of(null);
    }
    return this.http.post(`${this.baseUrl}/api/v1/auth/logout`, {}, { headers: { Authorization: `Bearer ${token}` } }).pipe(tap(() => this.clearSession()), catchError(() => {
      this.clearSession();
      return of(null);
    }));
  }
  clearSession() {
    if (typeof localStorage !== "undefined") {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      localStorage.removeItem(ORGANIZATIONS_KEY);
      localStorage.removeItem(CURRENT_ORG_KEY);
      localStorage.removeItem(CLINICS_KEY_LEGACY);
      localStorage.removeItem(CLINIC_ID_KEY_LEGACY);
    }
    this._user = null;
    this._organizations = [];
    this._currentOrganizationId = null;
    this._trialNotice = null;
  }
  me() {
    return this.http.get(`${this.baseUrl}/api/v1/me`).pipe(tap((res) => {
      this._user = res.data.user;
      const org = res.data.organization ?? res.data.clinic;
      if (org) {
        this._currentOrganizationId = String(org.id);
        const idx = this._organizations.findIndex((o) => o.id === org.id);
        if (idx >= 0)
          this._organizations[idx] = org;
        else
          this._organizations.push(org);
      }
      this._trialNotice = res.data.trial_notice?.visible ? res.data.trial_notice : null;
      this.persist();
      applyUserAppearanceToBrowser(res.data.user);
      this.notifyAppearanceApplied();
    }));
  }
  /** Envia link de redefinição de senha para o e-mail. */
  forgotPassword(email) {
    return this.http.post(`${this.baseUrl}/api/v1/auth/forgot-password`, { email });
  }
  /** Redefine a senha com o token recebido por e-mail. */
  resetPassword(payload) {
    return this.http.post(`${this.baseUrl}/api/v1/auth/reset-password`, payload);
  }
  /** Verifica o e-mail via link. Passar a query string exata da URL (preserva ordem e assinatura). */
  verifyEmailWithQueryString(queryString) {
    const q = queryString.startsWith("?") ? queryString.slice(1) : queryString;
    return this.http.get(`${this.baseUrl}/api/v1/auth/verify-email?${q}`);
  }
  /** Verifica o e-mail via link (query params id, hash, expires, signature). Preferir verifyEmailWithQueryString para preservar ordem da assinatura. */
  verifyEmail(params) {
    const searchParams = new URLSearchParams(params);
    return this.http.get(`${this.baseUrl}/api/v1/auth/verify-email?${searchParams.toString()}`);
  }
  /** Reenvia o e-mail de verificação (requer autenticação). */
  sendVerificationEmail() {
    return this.http.post(`${this.baseUrl}/api/v1/auth/send-verification-email`, {});
  }
  static \u0275fac = function AuthService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AuthService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AuthService, factory: _AuthService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AuthService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [], null);
})();

export {
  applyUserAppearanceToBrowser,
  AuthService
};
//# sourceMappingURL=chunk-SFRXLDXR.js.map
