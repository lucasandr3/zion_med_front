import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap, catchError, of } from 'rxjs';
import { environment } from '../../../environments/environment';

const TOKEN_KEY = 'zionmed_token';
const USER_KEY = 'zionmed_user';
const CLINICS_KEY = 'zionmed_clinics';
const CURRENT_CLINIC_KEY = 'zionmed_clinic_id';

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  role_label: string;
  active: boolean;
  can_switch_clinic: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Clinic {
  id: number;
  name: string;
  address?: string;
  [key: string]: unknown;
}

export interface LoginResponse {
  data: {
    token: string;
    token_type: string;
    user: User;
    current_clinic_id: number | null;
    clinics: Clinic[];
  };
}

export interface MeResponse {
  data: {
    user: User;
    clinic: Clinic | null;
  };
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private baseUrl = environment.apiUrl;

  private _user: User | null = null;
  private _clinics: Clinic[] = [];
  private _currentClinicId: string | null = null;

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    if (typeof localStorage === 'undefined') return;
    try {
      const u = localStorage.getItem(USER_KEY);
      const c = localStorage.getItem(CLINICS_KEY);
      const cid = localStorage.getItem(CURRENT_CLINIC_KEY);
      if (u) this._user = JSON.parse(u);
      if (c) this._clinics = JSON.parse(c);
      if (cid) this._currentClinicId = cid;
    } catch {}
  }

  private persist(): void {
    try {
      if (this._user) localStorage.setItem(USER_KEY, JSON.stringify(this._user));
      localStorage.setItem(CLINICS_KEY, JSON.stringify(this._clinics));
      if (this._currentClinicId != null) localStorage.setItem(CURRENT_CLINIC_KEY, this._currentClinicId);
      else localStorage.removeItem(CURRENT_CLINIC_KEY);
    } catch {}
  }

  /** Usado após login ou cadastro (comece) para definir token e contexto. */
  setSessionFromLoginData(data: LoginResponse['data']): void {
    if (typeof localStorage !== 'undefined' && data.token) {
      localStorage.setItem(TOKEN_KEY, data.token);
    }
    this._user = data.user;
    this._clinics = data.clinics ?? [];
    this._currentClinicId = data.current_clinic_id != null ? String(data.current_clinic_id) : null;
    this.persist();
  }

  getToken(): string | null {
    return typeof localStorage !== 'undefined' ? localStorage.getItem(TOKEN_KEY) : null;
  }

  getUser(): User | null {
    return this._user;
  }

  getClinics(): Clinic[] {
    return this._clinics;
  }

  getCurrentClinicId(): string | null {
    return this._currentClinicId;
  }

  getCurrentClinic(): Clinic | null {
    const id = this._currentClinicId;
    if (!id) return null;
    return this._clinics.find((c) => String(c.id) === id) ?? null;
  }

  setCurrentClinicId(id: number | string | null): void {
    this._currentClinicId = id != null ? String(id) : null;
    this.persist();
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  canSwitchClinic(): boolean {
    return this._user?.can_switch_clinic ?? false;
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
          this._clinics = d.clinics ?? [];
          this._currentClinicId = d.current_clinic_id != null ? String(d.current_clinic_id) : null;
          this.persist();
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
      localStorage.removeItem(CLINICS_KEY);
      localStorage.removeItem(CURRENT_CLINIC_KEY);
    }
    this._user = null;
    this._clinics = [];
    this._currentClinicId = null;
  }

  me(): Observable<MeResponse> {
    return this.http.get<MeResponse>(`${this.baseUrl}/api/v1/me`).pipe(
      tap((res) => {
        this._user = res.data.user;
        if (res.data.clinic) {
          this._currentClinicId = String(res.data.clinic.id);
          const idx = this._clinics.findIndex((c) => c.id === res.data.clinic!.id);
          if (idx >= 0) this._clinics[idx] = res.data.clinic;
          else this._clinics.push(res.data.clinic);
        }
        this.persist();
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
