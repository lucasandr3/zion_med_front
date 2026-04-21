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
  media_semanal_ultimos_30_dias?: number;
  comparativo_semana_anterior?: {
    delta_absoluto: number;
    delta_percentual: number;
    positiva: boolean;
  };
  taxa_aprovacao?: number;
  links_publicos_count: number;
  ultimas_submissoes?: Array<{
    id: number;
    paciente: string;
    modelo: string;
    status: string;
    data: string | null;
  }>;
  modelos_mais_usados?: Array<{
    template_id: number;
    template_nome: string;
    total: number;
  }>;
  respostas_por_template?: Record<number, number>;
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
