import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface AgendaServiceItem {
  id: number;
  name: string;
  duration_minutes: number;
  /** Valor em BRL; na API pública só vem preenchido se show_price=true. */
  price?: number | string | null;
  /** Se true, o valor aparece na agenda pública. */
  show_price?: boolean;
  /** Foto do serviço (miniatura na agenda pública). */
  photo_url?: string | null;
  form_template_id?: number | null;
  is_active?: boolean;
  sort_order?: number;
}

export interface AgendaAvailabilityRule {
  id?: number;
  weekday: number;
  start_time: string;
  end_time: string;
  is_active?: boolean;
}

export interface AgendaAppointment {
  id: number;
  starts_at: string;
  ends_at: string;
  status: string;
  patient_name: string;
  patient_email?: string | null;
  patient_phone?: string | null;
  notes?: string | null;
  form_template_id?: number | null;
  form_status?: 'not_applicable' | 'pending' | 'completed' | string;
  form_template_name?: string | null;
  service?: { id: number; name: string; duration_minutes: number };
}

export interface AgendaPublicFormInvite {
  name: string;
  public_url: string;
  status: string;
}

export interface AgendaPublicSlot {
  starts_at: string;
  ends_at: string;
}

@Injectable({ providedIn: 'root' })
export class AgendaService {
  private api = inject(ApiService);

  listServices(): Observable<AgendaServiceItem[]> {
    return this.api.get<{ data: AgendaServiceItem[] }>('/agenda/servicos').pipe(map((r) => r.data));
  }

  createService(payload: Partial<AgendaServiceItem>): Observable<AgendaServiceItem> {
    return this.api.post<{ data: AgendaServiceItem }>('/agenda/servicos', payload).pipe(map((r) => r.data));
  }

  updateService(id: number, payload: Partial<AgendaServiceItem>): Observable<AgendaServiceItem> {
    return this.api.put<{ data: AgendaServiceItem }>(`/agenda/servicos/${id}`, payload).pipe(map((r) => r.data));
  }

  deleteService(id: number): Observable<unknown> {
    return this.api.delete(`/agenda/servicos/${id}`);
  }

  uploadServicePhoto(id: number, file: File): Observable<AgendaServiceItem> {
    const form = new FormData();
    form.append('photo', file, file.name);
    return this.api
      .postFormData<{ data: AgendaServiceItem }>(`/agenda/servicos/${id}/foto`, form)
      .pipe(map((r) => r.data));
  }

  deleteServicePhoto(id: number): Observable<AgendaServiceItem> {
    return this.api
      .delete<{ data: AgendaServiceItem }>(`/agenda/servicos/${id}/foto`)
      .pipe(map((r) => r.data));
  }

  listAvailability(): Observable<AgendaAvailabilityRule[]> {
    return this.api.get<{ data: AgendaAvailabilityRule[] }>('/agenda/disponibilidade').pipe(map((r) => r.data));
  }

  syncAvailability(rules: AgendaAvailabilityRule[]): Observable<AgendaAvailabilityRule[]> {
    return this.api
      .put<{ data: AgendaAvailabilityRule[] }>('/agenda/disponibilidade', { rules })
      .pipe(map((r) => r.data));
  }

  listAppointments(from?: string, to?: string): Observable<AgendaAppointment[]> {
    return this.api
      .get<{ data: AgendaAppointment[] }>('/agenda/reservas', { from, to })
      .pipe(map((r) => r.data));
  }

  createAppointment(payload: {
    service_id: number;
    starts_at: string;
    patient_name: string;
    patient_email?: string;
    patient_phone?: string;
    notes?: string;
    status?: string;
  }): Observable<AgendaAppointment> {
    return this.api
      .post<{ data: AgendaAppointment }>('/agenda/reservas', payload)
      .pipe(map((r) => r.data));
  }

  updateAppointment(id: number, payload: { status: string; notes?: string | null }): Observable<AgendaAppointment> {
    return this.api
      .patch<{ data: AgendaAppointment }>(`/agenda/reservas/${id}`, payload)
      .pipe(map((r) => r.data));
  }

  publicShow(slug: string): Observable<{
    clinic: {
      id: number;
      name: string;
      slug: string;
      link_bio_model?: number | null;
      public_theme?: string | null;
      accent_hex?: string | null;
    };
    services: AgendaServiceItem[];
  }> {
    return this.api
      .get<{
        data: {
          clinic: {
            id: number;
            name: string;
            slug: string;
            link_bio_model?: number | null;
            public_theme?: string | null;
            accent_hex?: string | null;
          };
          services: AgendaServiceItem[];
        };
      }>(`/agenda/public/${encodeURIComponent(slug)}`)
      .pipe(map((r) => r.data));
  }

  publicSlots(slug: string, serviceId: number, date: string): Observable<AgendaPublicSlot[]> {
    return this.api
      .get<{ data: { slots: AgendaPublicSlot[] } }>(`/agenda/public/${encodeURIComponent(slug)}/slots`, {
        service_id: serviceId,
        date,
      })
      .pipe(map((r) => r.data?.slots ?? []));
  }

  publicBook(
    slug: string,
    payload: {
      service_id: number;
      starts_at: string;
      patient_name: string;
      patient_email?: string;
      patient_phone?: string;
      notes?: string;
    },
  ): Observable<{
    id: number;
    public_token: string;
    starts_at: string;
    ends_at: string;
    status: string;
    service_name: string;
    form_template_id?: number | null;
    form_status?: string;
    form?: AgendaPublicFormInvite | null;
  }> {
    return this.api
      .post<{ data: any }>(`/agenda/public/${encodeURIComponent(slug)}/reservas`, payload)
      .pipe(map((r) => r.data));
  }
}
