import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { map, Observable } from 'rxjs';

export interface DashboardData {
  sem_clinica: boolean;
  pendentes_hoje: number;
  ultimos_templates: { id: number; name: string; created_at: string }[];
  por_status: Record<string, number>;
  ultimos_7_dias: number;
  ultimos_30_dias: number;
  links_publicos_count: number;
}

interface ApiResponse {
  data: DashboardData;
}

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private api = inject(ApiService);

  getDashboard(): Observable<DashboardData> {
    return this.api.get<ApiResponse>('/dashboard').pipe(map((r) => r.data));
  }
}
