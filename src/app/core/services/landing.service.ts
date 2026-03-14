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

@Injectable({ providedIn: 'root' })
export class LandingService {
  private http = inject(HttpClient);

  getLanding(): Observable<LandingData> {
    return this.http.get<ApiResponse>(`${BASE}/landing`).pipe(map((r) => r.data));
  }

  /** Status do sistema (público, mesma fonte que o banner da landing no backend) */
  getStatus(): Observable<ServiceStatusPayload> {
    return this.http.get<ServiceStatusPayload>(`${BASE}/status`);
  }
}
