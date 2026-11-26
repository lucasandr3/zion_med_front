import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiService } from './api.service';
import { ServicosService, type ClinicServiceItem } from './servicos.service';

/** @deprecated Preferir ClinicServiceItem — mesmo catálogo compartilhado. */
export type AgendaServiceItem = ClinicServiceItem;

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
  form_template_optional_id?: number | null;
  form_status?: 'not_applicable' | 'pending' | 'completed' | string;
  form_status_optional?: 'not_applicable' | 'pending' | 'completed' | string;
  form_template_name?: string | null;
  /** AUT-06 — progresso do pacote (1–2 docs). */
  document_progress?: {
    required: number;
    completed: number;
    template_name?: string | null;
  } | null;
  document_send?: AgendaDocumentSendInvite | null;
  service?: { id: number; name: string; duration_minutes: number };
}

export interface AgendaPublicFormInvite {
  name: string;
  public_url: string;
  status: string;
}

/** AGD-07 — pendência criada em Envios após reserva confirmada. */
export interface AgendaDocumentSendInvite {
  id: number;
  public_url: string;
  share_message: string;
  delivery_mode: 'manual' | 'pending_email' | string;
  delivery_status?: string | null;
  recipient_phone?: string | null;
}

export interface AgendaPublicSlot {
  starts_at: string;
  ends_at: string;
}

@Injectable({ providedIn: 'root' })
export class AgendaService {
  private api = inject(ApiService);
  private readonly servicos = inject(ServicosService);

  /** Catálogo compartilhado (`/servicos`) — agenda só consome. */
  listServices(): Observable<AgendaServiceItem[]> {
    return this.servicos.list();
  }

  createService(payload: Partial<AgendaServiceItem>): Observable<AgendaServiceItem> {
    return this.servicos.create(payload);
  }

  updateService(id: number, payload: Partial<AgendaServiceItem>): Observable<AgendaServiceItem> {
    return this.servicos.update(id, payload);
  }

  deleteService(id: number): Observable<unknown> {
    return this.servicos.delete(id);
  }

  uploadServicePhoto(id: number, file: File): Observable<AgendaServiceItem> {
    return this.servicos.uploadPhoto(id, file);
  }

  deleteServicePhoto(id: number): Observable<AgendaServiceItem> {
    return this.servicos.deletePhoto(id);
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

  updateAppointment(
    id: number,
    payload: { status?: string; starts_at?: string; notes?: string | null },
  ): Observable<AgendaAppointment> {
    return this.api
      .patch<{ data: AgendaAppointment }>(`/agenda/reservas/${id}`, payload)
      .pipe(map((r) => r.data));
  }

  ensureDocumentInvite(id: number): Observable<AgendaDocumentSendInvite> {
    return this.api
      .post<{ data: AgendaDocumentSendInvite }>(`/agenda/reservas/${id}/document-invite`, {})
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
    document_send?: AgendaDocumentSendInvite | null;
  }> {
    return this.api
      .post<{ data: any }>(`/agenda/public/${encodeURIComponent(slug)}/reservas`, payload)
      .pipe(map((r) => r.data));
  }
}
