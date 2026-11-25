import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface SupportAttachment {
  id: number;
  original_name: string;
  mime?: string | null;
  size?: number;
  created_at?: string | null;
}

export interface SupportMessage {
  id: number;
  author_user_id?: number | null;
  author_role: string;
  author_name?: string | null;
  body: string;
  is_internal?: boolean;
  created_at?: string | null;
  attachments?: SupportAttachment[];
}

export interface SupportNote {
  id: number;
  author_user_id?: number | null;
  author_name?: string | null;
  body: string;
  created_at?: string | null;
}

export interface SupportTicket {
  id: number;
  protocol: string;
  subject: string;
  category: string;
  priority: string;
  status: string;
  organization_id?: number;
  organization_name?: string | null;
  plan_key?: string | null;
  requester_name?: string | null;
  requester_email?: string | null;
  assignee_user_id?: number | null;
  assignee_name?: string | null;
  satisfaction_score?: number | null;
  created_at?: string | null;
  updated_at?: string | null;
  last_message_at?: string | null;
  first_response_at?: string | null;
  resolved_at?: string | null;
  messages?: SupportMessage[];
  notes?: SupportNote[];
  context?: Record<string, unknown>;
}

const SUPPORT_ACCEPT = '.pdf,.png,.jpg,.jpeg,.webp,.txt,application/pdf,image/jpeg,image/png,image/webp,text/plain';

@Injectable({ providedIn: 'root' })
export class SupportService {
  private readonly api = inject(ApiService);

  readonly acceptTypes = SUPPORT_ACCEPT;
  readonly maxFiles = 3;
  readonly maxBytes = 5 * 1024 * 1024;

  listClinic(): Observable<{ data: SupportTicket[] }> {
    return this.api.get<{ data: SupportTicket[] }>('/support/tickets');
  }

  getClinic(id: number): Observable<{ data: SupportTicket }> {
    return this.api.get<{ data: SupportTicket }>(`/support/tickets/${id}`);
  }

  createClinic(payload: {
    subject: string;
    category?: string;
    priority?: string;
    message: string;
    context?: Record<string, string>;
    files?: File[];
  }): Observable<{ data: SupportTicket }> {
    const files = payload.files?.filter(Boolean) ?? [];
    if (files.length === 0) {
      return this.api.post<{ data: SupportTicket }>('/support/tickets', {
        subject: payload.subject,
        category: payload.category,
        priority: payload.priority,
        message: payload.message,
        context: payload.context,
      });
    }
    const form = new FormData();
    form.append('subject', payload.subject);
    if (payload.category) form.append('category', payload.category);
    if (payload.priority) form.append('priority', payload.priority);
    form.append('message', payload.message);
    const ctx = payload.context ?? {};
    for (const key of ['module', 'route', 'frontend_version', 'browser', 'device'] as const) {
      if (ctx[key]) form.append(key, ctx[key]);
    }
    for (const file of files.slice(0, this.maxFiles)) {
      form.append('files', file, file.name);
    }
    return this.api.postFormData<{ data: SupportTicket }>('/support/tickets', form);
  }

  replyClinic(id: number, message: string, files?: File[]): Observable<{ data: SupportTicket }> {
    const list = files?.filter(Boolean) ?? [];
    if (list.length === 0) {
      return this.api.post<{ data: SupportTicket }>(`/support/tickets/${id}/messages`, { message });
    }
    const form = new FormData();
    if (message.trim()) form.append('message', message);
    for (const file of list.slice(0, this.maxFiles)) {
      form.append('files', file, file.name);
    }
    return this.api.postFormData<{ data: SupportTicket }>(`/support/tickets/${id}/messages`, form);
  }

  downloadClinicAttachment(ticketId: number, attachmentId: number): Observable<Blob> {
    return this.api.getBlob(`/support/tickets/${ticketId}/attachments/${attachmentId}`);
  }

  rateClinic(id: number, score: number): Observable<{ data: SupportTicket }> {
    return this.api.post<{ data: SupportTicket }>(`/support/tickets/${id}/rate`, { score });
  }

  validateFiles(files: File[]): string | null {
    if (files.length > this.maxFiles) {
      return `Máximo de ${this.maxFiles} anexos por mensagem.`;
    }
    for (const file of files) {
      if (file.size > this.maxBytes) {
        return `"${file.name}" ultrapassa 5 MB.`;
      }
    }
    return null;
  }
}
