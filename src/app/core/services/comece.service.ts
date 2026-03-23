import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { LoginResponse } from './auth.service';

const BASE = `${environment.apiUrl}/api/v1`;

export interface ComecePayload {
  company_name: string;
  responsible_name: string;
  email: string;
  /** CPF (11) ou CNPJ (14) dígitos — obrigatório quando a API exige faturamento (Asaas). */
  billing_document: string;
  phone?: string;
  password: string;
  password_confirmation: string;
  plan_key: string;
  accepted_terms: boolean;
}

interface ComeceResponse {
  data: LoginResponse['data'] & { message?: string };
}

@Injectable({ providedIn: 'root' })
export class ComeceService {
  private http = inject(HttpClient);

  store(payload: ComecePayload): Observable<ComeceResponse['data']> {
    const body: Record<string, unknown> = {
      company_name: payload.company_name,
      responsible_name: payload.responsible_name,
      email: payload.email,
      billing_document: payload.billing_document.trim(),
      password: payload.password,
      password_confirmation: payload.password_confirmation,
      plan_key: payload.plan_key,
      accepted_terms: payload.accepted_terms ? '1' : '',
    };
    if (payload.phone?.trim()) body['phone'] = payload.phone.trim();
    return this.http.post<ComeceResponse>(`${BASE}/comece`, body).pipe(map((r) => r.data));
  }
}
