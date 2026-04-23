import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

const BASE = `${environment.apiUrl}/api/v1`;

export interface PlanoLanding {
  key: string;
  name: string;
  value: number;
  description: string;
}

export interface LandingData {
  trial_days: number;
  plans: PlanoLanding[];
  headline?: string;
  subheadline?: string;
  niches?: string[];
  trust_points?: string[];
}

/** Payload do status do serviço (igual ao backend PlatformSetting::getServiceStatusPayload) */
export interface ServiceStatusPayload {
  service_name: string;
  status: string;
  severity: string;
  message: string | null;
  components: { key: string; label: string; status: string }[];
  updated_at?: string | null;
}

interface ApiResponse {
  data: LandingData;
}

export interface DemonstracaoPayload {
  name: string;
  clinic: string;
  email: string;
  phone: string;
  message: string;
}

export interface DemonstracaoResponse {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
}

@Injectable({ providedIn: 'root' })
export class LandingService {
  private http = inject(HttpClient);

  getLanding(): Observable<LandingData> {
    return this.http.get<ApiResponse>(`${BASE}/landing`).pipe(map((r) => r.data));
  }

  getStatus(): Observable<ServiceStatusPayload> {
    return this.http.get<ServiceStatusPayload>(`${BASE}/status`);
  }

  enviarDemonstracao(payload: DemonstracaoPayload): Observable<DemonstracaoResponse> {
    return this.http.post<DemonstracaoResponse>(`${BASE}/demonstracao`, payload);
  }
}
