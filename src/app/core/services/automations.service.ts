import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface OrgAutomationConfig {
  wait_seconds?: number;
  conditions?: Array<{ field?: string; op?: string; value?: unknown }>;
  actions?: Array<Record<string, unknown>>;
}

export interface OrgAutomationRow {
  id: number;
  name: string;
  description?: string | null;
  status: string;
  trigger_event: string;
  version?: number;
  updated_at?: string | null;
  config?: OrgAutomationConfig;
}

export interface OrgAutomationsOverview {
  active: number;
  failed_executions: number;
  items: OrgAutomationRow[];
}

export interface OrgAutomationExecutionRow {
  id: number;
  automation_id: number;
  trigger_event: string;
  status: string;
  result_message?: string | null;
  attempts?: number;
  created_at?: string | null;
  finished_at?: string | null;
}

export interface OrgOperationalTaskRow {
  id: number;
  title: string;
  description?: string | null;
  status: string;
  priority?: string | null;
  origin?: string | null;
  related_type?: string | null;
  related_id?: string | null;
  due_at?: string | null;
  created_at?: string | null;
  completed_at?: string | null;
}

export interface OrgOperationalTasksOverview {
  open: number;
  done: number;
  items: OrgOperationalTaskRow[];
}

export interface OrgAutomationPayload {
  name: string;
  description?: string;
  trigger_event: string;
  status: string;
  config: OrgAutomationConfig;
}

@Injectable({ providedIn: 'root' })
export class AutomationsService {
  private readonly api = inject(ApiService);

  list(): Observable<{ data: OrgAutomationsOverview }> {
    return this.api.get<{ data: OrgAutomationsOverview }>('/automations');
  }

  get(id: number): Observable<{ data: OrgAutomationRow }> {
    return this.api.get<{ data: OrgAutomationRow }>(`/automations/${id}`);
  }

  create(payload: OrgAutomationPayload): Observable<{ data: OrgAutomationRow }> {
    return this.api.post<{ data: OrgAutomationRow }>('/automations', payload);
  }

  update(id: number, payload: OrgAutomationPayload): Observable<{ data: OrgAutomationRow }> {
    return this.api.put<{ data: OrgAutomationRow }>(`/automations/${id}`, payload);
  }

  overview(): Observable<{ data: { active: number; failed_executions: number; tasks_open: number } }> {
    return this.api.get('/automations/overview');
  }

  executions(): Observable<{ data: OrgAutomationExecutionRow[] }> {
    return this.api.get<{ data: OrgAutomationExecutionRow[] }>('/automations/executions');
  }

  pause(id: number): Observable<{ data: { id?: number; status?: string } }> {
    return this.api.post(`/automations/${id}/pause`, {});
  }

  activate(id: number): Observable<{ data: { id?: number; status?: string } }> {
    return this.api.post(`/automations/${id}/activate`, {});
  }

  getTasks(status?: string): Observable<{ data: OrgOperationalTasksOverview }> {
    return this.api.get<{ data: OrgOperationalTasksOverview }>(
      '/automations/tasks',
      status ? { status } : undefined,
    );
  }

  createTask(payload: {
    title: string;
    description?: string;
    priority?: string;
  }): Observable<{ data: { id?: number; status?: string; message?: string } }> {
    return this.api.post('/automations/tasks', payload);
  }

  completeTask(id: number): Observable<{ data: { id?: number; status?: string } }> {
    return this.api.post(`/automations/tasks/${id}/complete`, {});
  }

  reopenTask(id: number): Observable<{ data: { id?: number; status?: string } }> {
    return this.api.post(`/automations/tasks/${id}/reopen`, {});
  }
}
