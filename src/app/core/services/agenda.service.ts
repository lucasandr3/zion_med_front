import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface AgendaServiceItem {
  id: number;
  name: string;
  duration_minutes: number;
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
  service?: { id: number; name: string; duration_minutes: number };
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

  updateAppointment(id: number, payload: { status: string; notes?: string | null }): Observable<AgendaAppointment> {
    return this.api
      .patch<{ data: AgendaAppointment }>(`/agenda/reservas/${id}`, payload)
      .pipe(map((r) => r.data));
  }

  publicShow(slug: string): Observable<{
    clinic: { id: number; name: string; slug: string };
    services: AgendaServiceItem[];
  }> {
    return this.api
      .get<{ data: { clinic: { id: number; name: string; slug: string }; services: AgendaServiceItem[] } }>(
        `/agenda/public/${encodeURIComponent(slug)}`,
      )
      .pipe(map((r) => r.data));
  }

  publicSlots(slug: string, serviceId: number, date: string): Observable<AgendaPublicSlot[]> {
    return this.api
      .get<{ data: { slots: AgendaPublicSlot[] } }>(`/agenda/public/${encodeURIComponent(slug)}/slots`, {
        service_id: serviceId,
        date,
      })
      .pipe(map((r) => r.data.slots));
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
  }> {
    return this.api
      .post<{ data: any }>(`/agenda/public/${encodeURIComponent(slug)}/reservas`, payload)
      .pipe(map((r) => r.data));
  }
}
