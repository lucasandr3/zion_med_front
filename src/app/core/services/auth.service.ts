import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, Subject, tap, catchError, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { applyUserAppearanceToBrowser } from './user-appearance.sync';

const TOKEN_KEY = 'gestgo_token';
const USER_KEY = 'gestgo_user';
const ORGANIZATIONS_KEY = 'gestgo_organizations';
const CURRENT_ORG_KEY = 'gestgo_organization_id';
/** @deprecated Migrado para ORGANIZATIONS_KEY / CURRENT_ORG_KEY */
const CLINICS_KEY_LEGACY = 'gestgo_clinics';
const CLINIC_ID_KEY_LEGACY = 'gestgo_clinic_id';

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  role_label: string;
  active: boolean;
  can_switch_clinic: boolean;
  /** Permissões efetivas no contexto da organização atual (API v1). */
  permissions?: string[];
  /** Preferências de UI persistidas no servidor (`null` = ainda não salvo). */
  ui_theme?: string | null;
  ui_dark_mode?: boolean | null;
  created_at?: string;
  updated_at?: string;
}

export interface Organization {
  id: number;
  name: string;
  address?: string;
  [key: string]: unknown;
}

/** @deprecated Use Organization */
export type Clinic = Organization;

export interface LoginResponse {
  data: {
    token: string;
    token_type: string;
    user: User;
    current_organization_id: number | null;
    organizations: Organization[];
    /** Legado */
    current_clinic_id?: number | null;
    clinics?: Organization[];
  };
}

export interface TrialNotice {
  visible: boolean;
  days_remaining: number;
  trial_ends_at: string;
  message: string;
}

export interface MeResponse {
  data: {
    user: User;
    organization: Organization | null;
    /** Legado */
    clinic?: Organization | null;
    trial_notice?: TrialNotice | null;
  };
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private baseUrl = environment.apiUrl;

  private _user: User | null = null;
  private _organizations: Organization[] = [];
  private _currentOrganizationId: string | null = null;
  /** Aviso de fim de trial (preenchido após `/me`). */
  private _trialNotice: TrialNotice | null = null;

  /** Emite após tema/modo ser aplicados a partir da API (ex.: pós-`/me`). */
  private appearanceAppliedSubject = new Subject<void>();
  readonly appearanceApplied$ = this.appearanceAppliedSubject.asObservable();

  constructor() {
    this.loadFromStorage();
  }

  /** Para o cabeçalho reler `localStorage`/`body` quando a sessão sincronizar com o servidor. */
  notifyAppearanceApplied(): void {
    this.appearanceAppliedSubject.next();
  }

  private loadFromStorage(): void {
    if (typeof localStorage === 'undefined') return;
    try {
      const u = localStorage.getItem(USER_KEY);
      let orgsJson = localStorage.getItem(ORGANIZATIONS_KEY);
      if (!orgsJson) orgsJson = localStorage.getItem(CLINICS_KEY_LEGACY);
      let oid = localStorage.getItem(CURRENT_ORG_KEY);
      if (!oid) oid = localStorage.getItem(CLINIC_ID_KEY_LEGACY);
      if (u) this._user = JSON.parse(u);
      if (orgsJson) this._organizations = JSON.parse(orgsJson);
      if (oid) this._currentOrganizationId = oid;
    } catch {}
  }

  private persist(): void {
    try {
      if (this._user) localStorage.setItem(USER_KEY, JSON.stringify(this._user));
      localStorage.setItem(ORGANIZATIONS_KEY, JSON.stringify(this._organizations));
      localStorage.removeItem(CLINICS_KEY_LEGACY);
      if (this._currentOrganizationId != null) localStorage.setItem(CURRENT_ORG_KEY, this._currentOrganizationId);
      else localStorage.removeItem(CURRENT_ORG_KEY);
      localStorage.removeItem(CLINIC_ID_KEY_LEGACY);
    } catch {}
  }

  /** Usado após login ou cadastro (comece) para definir token e contexto. */
  setSessionFromLoginData(data: LoginResponse['data']): void {
    if (typeof localStorage !== 'undefined' && data.token) {
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
  mergeUserFromApi(u: User): void {
    if (!this._user || this._user.id !== u.id) return;
    this._user = { ...this._user, ...u };
    this.persist();
  }

  getToken(): string | null {
    return typeof localStorage !== 'undefined' ? localStorage.getItem(TOKEN_KEY) : null;
  }

  getUser(): User | null {
    return this._user;
  }

  getTrialNotice(): TrialNotice | null {
    return this._trialNotice;
  }

  getOrganizations(): Organization[] {
    return this._organizations;
  }

  /** @deprecated Use getOrganizations() */
  getClinics(): Organization[] {
    return this._organizations;
  }

  getCurrentOrganizationId(): string | null {
    return this._currentOrganizationId;
  }

  /** @deprecated Use getCurrentOrganizationId() */
  getCurrentClinicId(): string | null {
    return this._currentOrganizationId;
  }

  getCurrentOrganization(): Organization | null {
    const id = this._currentOrganizationId;
    if (!id) return null;
    return this._organizations.find((o) => String(o.id) === id) ?? null;
  }

  /** @deprecated Use getCurrentOrganization() */
  getCurrentClinic(): Organization | null {
    return this.getCurrentOrganization();
  }

  setCurrentOrganizationId(id: number | string | null): void {
    this._currentOrganizationId = id != null ? String(id) : null;
    this.persist();
  }

  /** @deprecated Use setCurrentOrganizationId() */
  setCurrentClinicId(id: number | string | null): void {
    this.setCurrentOrganizationId(id);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  canSwitchClinic(): boolean {
    return this._user?.can_switch_clinic ?? false;
  }

  /** Verifica permissão no contexto atual (usa `user.permissions` ou fallback por `role` legado). */
  hasPermission(key: string): boolean {
    const u = this._user;
    if (!u) return false;
    if (Array.isArray(u.permissions)) {
      return u.permissions.includes(key);
    }
    return this.permissionFallbackByRole(u.role, key);
  }

  private permissionFallbackByRole(role: string | undefined, key: string): boolean {
    if (!role) return false;
    if (role === 'owner' || role === 'super_admin') return true;
    if (role === 'platform_admin') return true;
    if (role === 'manager') {
      return [
        'dashboard.access',
        'notifications.access',
        'billing.manage',
        'templates.manage',
        'submissions.view',
        'submissions.approve',
        'people.deactivate',
      ].includes(key);
    }
    if (role === 'staff') {
      return ['dashboard.access', 'notifications.access', 'submissions.view'].includes(key);
    }
    return false;
  }

  /** Primeira rota do app tenant que o usuário pode abrir (pós-login ou após bloqueio de guard). */
  getDefaultTenantPath(): string {
    const routes: [string, () => boolean][] = [
      ['/dashboard', () => this.hasPermission('dashboard.access')],
      ['/notificacoes', () => this.hasPermission('notifications.access')],
      ['/protocolos', () => this.hasPermission('submissions.view')],
      ['/pessoas', () => this.hasPermission('submissions.view')],
      ['/templates', () => this.hasPermission('templates.manage')],
      ['/links-publicos', () => this.hasPermission('templates.manage') || this.hasPermission('submissions.view')],
      ['/envios', () => this.hasPermission('templates.manage') || this.hasPermission('submissions.view')],
      ['/assinatura', () => this.hasPermission('billing.manage')],
      ['/link-bio', () => this.hasPermission('organization.manage')],
      ['/clinica/configuracoes', () => this.hasPermission('organization.manage')],
      ['/clinica/integracoes', () => this.hasPermission('organization.manage')],
      ['/usuarios', () => this.hasPermission('users.manage')],
      ['/organizacao/permissoes', () => this.hasPermission('users.manage')],
    ];
    for (const [path, ok] of routes) {
      if (ok()) return path;
    }
    if (this.canSwitchClinic()) return '/clinica/escolher';
    return '/404';
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.baseUrl}/api/v1/auth/login`, { email, password })
      .pipe(
        tap((res) => {
          const d = res.data;
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem(TOKEN_KEY, d.token);
          }
          this._user = d.user;
          this._organizations = d.organizations ?? d.clinics ?? [];
          const cid = d.current_organization_id ?? d.current_clinic_id;
          this._currentOrganizationId = cid != null ? String(cid) : null;
          this.persist();
          applyUserAppearanceToBrowser(d.user);
          this.notifyAppearanceApplied();
        })
      );
  }

  logout(): Observable<unknown> {
    const token = this.getToken();
    if (!token) {
      this.clearSession();
      return of(null);
    }
    return this.http.post(`${this.baseUrl}/api/v1/auth/logout`, {}, { headers: { Authorization: `Bearer ${token}` } }).pipe(
      tap(() => this.clearSession()),
      catchError(() => {
        this.clearSession();
        return of(null);
      })
    );
  }

  clearSession(): void {
    if (typeof localStorage !== 'undefined') {
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

  me(): Observable<MeResponse> {
    return this.http.get<MeResponse>(`${this.baseUrl}/api/v1/me`).pipe(
      tap((res) => {
        this._user = res.data.user;
        const org = res.data.organization ?? res.data.clinic;
        if (org) {
          this._currentOrganizationId = String(org.id);
          const idx = this._organizations.findIndex((o) => o.id === org.id);
          if (idx >= 0) this._organizations[idx] = org;
          else this._organizations.push(org);
        }
        this._trialNotice = res.data.trial_notice?.visible ? res.data.trial_notice : null;
        this.persist();
        applyUserAppearanceToBrowser(res.data.user);
        this.notifyAppearanceApplied();
      })
    );
  }

  /** Envia link de redefinição de senha para o e-mail. */
  forgotPassword(email: string): Observable<{ data?: { message?: string } }> {
    return this.http.post<{ data?: { message?: string } }>(`${this.baseUrl}/api/v1/auth/forgot-password`, { email });
  }

  /** Redefine a senha com o token recebido por e-mail. */
  resetPassword(payload: {
    token: string;
    email: string;
    password: string;
    password_confirmation: string;
  }): Observable<{ data?: { message?: string } }> {
    return this.http.post<{ data?: { message?: string } }>(`${this.baseUrl}/api/v1/auth/reset-password`, payload);
  }

  /** Verifica o e-mail via link. Passar a query string exata da URL (preserva ordem e assinatura). */
  verifyEmailWithQueryString(queryString: string): Observable<{ data?: { message?: string }; message?: string }> {
    const q = queryString.startsWith('?') ? queryString.slice(1) : queryString;
    return this.http.get<{ data?: { message?: string }; message?: string }>(
      `${this.baseUrl}/api/v1/auth/verify-email?${q}`
    );
  }

  /** Verifica o e-mail via link (query params id, hash, expires, signature). Preferir verifyEmailWithQueryString para preservar ordem da assinatura. */
  verifyEmail(params: { id: string; hash: string; expires: string; signature: string }): Observable<{ data?: { message?: string }; message?: string }> {
    const searchParams = new URLSearchParams(params);
    return this.http.get<{ data?: { message?: string }; message?: string }>(
      `${this.baseUrl}/api/v1/auth/verify-email?${searchParams.toString()}`
    );
  }

  /** Reenvia o e-mail de verificação (requer autenticação). */
  sendVerificationEmail(): Observable<{ data?: { message?: string } }> {
    return this.http.post<{ data?: { message?: string } }>(`${this.baseUrl}/api/v1/auth/send-verification-email`, {});
  }
}
