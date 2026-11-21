import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiService } from './api.service';

/** Catálogo compartilhado de serviços/procedimentos da clínica. */
export interface ClinicServiceItem {
  id: number;
  name: string;
  duration_minutes: number;
  price?: number | string | null;
  show_price?: boolean;
  photo_url?: string | null;
  form_template_id?: number | null;
  is_active?: boolean;
  sort_order?: number;
}

@Injectable({ providedIn: 'root' })
export class ServicosService {
  private readonly api = inject(ApiService);

  list(activeOnly = false): Observable<ClinicServiceItem[]> {
    return this.api.get<{ data: ClinicServiceItem[] }>('/servicos').pipe(
      map((r) => {
        const list = r.data || [];
        return activeOnly ? list.filter((s) => s.is_active !== false) : list;
      }),
    );
  }

  create(payload: Partial<ClinicServiceItem>): Observable<ClinicServiceItem> {
    return this.api.post<{ data: ClinicServiceItem }>('/servicos', payload).pipe(map((r) => r.data));
  }

  update(id: number, payload: Partial<ClinicServiceItem>): Observable<ClinicServiceItem> {
    return this.api.put<{ data: ClinicServiceItem }>(`/servicos/${id}`, payload).pipe(map((r) => r.data));
  }

  delete(id: number): Observable<unknown> {
    return this.api.delete(`/servicos/${id}`);
  }

  uploadPhoto(id: number, file: File): Observable<ClinicServiceItem> {
    const form = new FormData();
    form.append('photo', file, file.name);
    return this.api
      .postFormData<{ data: ClinicServiceItem }>(`/servicos/${id}/foto`, form)
      .pipe(map((r) => r.data));
  }

  deletePhoto(id: number): Observable<ClinicServiceItem> {
    return this.api.delete<{ data: ClinicServiceItem }>(`/servicos/${id}/foto`).pipe(map((r) => r.data));
  }
}
