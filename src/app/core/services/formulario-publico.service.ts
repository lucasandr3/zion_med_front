import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

const BASE = `${environment.apiUrl}/api/v1`;

export interface FormularioPublicoField {
  id: number;
  name_key: string;
  label: string;
  type: string;
  required: boolean;
  options: unknown[];
  sort_order: number;
}

export interface FormularioPublicoData {
  template: { id: number; name: string; description?: string };
  clinic_name?: string;
  fields: FormularioPublicoField[];
}

interface ShowResponse {
  data: FormularioPublicoData;
}

interface SubmitResponse {
  data: { message: string; protocol_number: string };
}

@Injectable({ providedIn: 'root' })
export class FormularioPublicoService {
  private http = inject(HttpClient);

  getByToken(token: string): Observable<FormularioPublicoData> {
    return this.http
      .get<ShowResponse>(`${BASE}/formulario-publico/${encodeURIComponent(token)}`)
      .pipe(map((r) => r.data));
  }

  submit(token: string, payload: Record<string, unknown>): Observable<SubmitResponse['data']> {
    return this.http
      .post<SubmitResponse>(`${BASE}/formulario-publico/${encodeURIComponent(token)}/submit`, payload)
      .pipe(map((r) => r.data));
  }
}
