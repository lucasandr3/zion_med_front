import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';
import { environment } from '../../../environments/environment';

/** Eventos do mapeador PDF (BI-12). Sem PII clínica. */
export type PdfMapperEventName =
  | 'pdf_detect_ran'
  | 'pdf_detect_ai_ran'
  | 'pdf_suggestion_accepted'
  | 'pdf_suggestion_rejected'
  | 'pdf_print_layout_saved'
  | 'pdf_mapping_reused';

/** MSG-03A — intenção de compartilhar (não é entrega). */
export type ShareEventName = 'document_share_initiated' | 'share_intent_opened';

/** UX-04 — especialidade escolhida no wizard. */
export type OnboardingEventName = 'onboarding_segment_selected';

/** PAC-05 / OPS-11 — recorrência e revalidação (sem PII). */
export type PacienteRecorrenteEventName =
  | 'reconsent_requested'
  | 'recurring_patient_document_send';

export type AppProductEventName =
  | PdfMapperEventName
  | ShareEventName
  | OnboardingEventName
  | PacienteRecorrenteEventName;

export type ShareSource =
  | 'envios'
  | 'agenda'
  | 'agenda_publica'
  | 'pessoas'
  | 'links_publicos'
  | 'templates_campos'
  | 'protocolos'
  | 'other';

@Injectable({ providedIn: 'root' })
export class ProductTelemetryService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/product-events/app`;

  /**
   * Fire-and-forget: falha de telemetria não deve atrapalhar o fluxo do editor.
   */
  trackPdfMapper(
    eventName: PdfMapperEventName,
    properties: Record<string, string | number | boolean | null | undefined> = {},
  ): void {
    this.track(eventName, properties);
  }

  /**
   * MSG-03A — registrou intenção de abrir WhatsApp/compartilhar.
   * Properties: channel, source, template_id?, document_send_id?, appointment_id? — sem telefone/PII.
   */
  trackDocumentShare(properties: {
    channel?: string;
    source: ShareSource;
    template_id?: number | null;
    document_send_id?: number | null;
    appointment_id?: number | null;
  }): void {
    this.track('document_share_initiated', {
      channel: properties.channel ?? 'whatsapp',
      source: properties.source,
      template_id: properties.template_id ?? null,
      document_send_id: properties.document_send_id ?? null,
      appointment_id: properties.appointment_id ?? null,
    });
  }

  /** UX-04 — especialidade/nicho no onboarding (sem PII). */
  trackOnboardingSegment(properties: { segment: string; niche: string }): void {
    this.track('onboarding_segment_selected', {
      segment: properties.segment,
      niche: properties.niche,
    });
  }

  /** PAC-05 — clínica solicitou novo termo (reconsentimento). */
  trackReconsentRequested(properties: {
    template_id?: number | null;
    document_send_id?: number | null;
    delivery_mode?: string | null;
    consent_status?: string | null;
  }): void {
    this.track('reconsent_requested', {
      template_id: properties.template_id ?? null,
      document_send_id: properties.document_send_id ?? null,
      delivery_mode: properties.delivery_mode ?? null,
      consent_status: properties.consent_status ?? null,
    });
  }

  /** PAC-05 — “Enviar documento” a partir da ficha de paciente existente. */
  trackRecurringPatientDocumentSend(properties: {
    template_id?: number | null;
    consent_status?: string | null;
  }): void {
    this.track('recurring_patient_document_send', {
      template_id: properties.template_id ?? null,
      consent_status: properties.consent_status ?? null,
      source: 'pessoas',
    });
  }

  private track(
    eventName: AppProductEventName,
    properties: Record<string, string | number | boolean | null | undefined> = {},
  ): void {
    const safe: Record<string, string | number | boolean> = {};
    for (const [k, v] of Object.entries(properties)) {
      if (v === undefined || v === null) continue;
      if (typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean') {
        safe[k] = v;
      }
    }

    this.http
      .post<{ data?: { recorded?: boolean } }>(this.base, {
        event_name: eventName,
        properties: safe,
      })
      .pipe(catchError(() => of(null)))
      .subscribe();
  }
}
