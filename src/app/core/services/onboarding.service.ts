import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { map, Observable } from 'rxjs';
import { Template } from './templates.service';

interface TemplatesResponse {
  data: Template[];
}

interface LinkResponse {
  data: {
    message?: string;
    public_url?: string;
  };
}

@Injectable({ providedIn: 'root' })
export class OnboardingService {
  private api = inject(ApiService);

  listTemplates(): Observable<Template[]> {
    return this.api.get<TemplatesResponse>('/onboarding/templates').pipe(map((r) => r.data ?? []));
  }

  gerarLinkPublico(templateId: number): Observable<string> {
    return this.api.post<LinkResponse>(`/onboarding/templates/${templateId}/link-publico`, {}).pipe(
      map((r) => r.data?.public_url ?? ''),
    );
  }
}
