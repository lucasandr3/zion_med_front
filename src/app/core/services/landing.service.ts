import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface LandingSegmentFaq {
  q: string;
  a: string;
}

export interface LandingSegment {
  slug: string;
  seo_title?: string;
  h1: string;
  subtitle: string;
  cta_primary?: string;
  cta_secondary?: string;
  demo_model?: number;
  pain?: string;
  outcomes?: string[];
  faq?: LandingSegmentFaq[];
}

export interface LandingHowItWorks {
  slug: string;
  seo_title?: string;
  h1: string;
  subtitle: string;
  steps?: string[];
  cta_primary?: string;
  cta_secondary?: string;
}

export interface LandingPublicData {
  trial_days?: number;
  plans?: { key: string; name: string; value: number }[];
  segments?: LandingSegment[];
  how_it_works?: LandingHowItWorks[];
  headline?: string;
  subheadline?: string;
}

@Injectable({ providedIn: 'root' })
export class LandingService {
  private api = inject(ApiService);

  getLanding(): Observable<LandingPublicData> {
    return this.api.get<{ data: LandingPublicData }>('/landing').pipe(map((r) => r.data));
  }

  getSegment(slug: string): Observable<LandingSegment> {
    return this.api.get<{ data: LandingSegment }>(`/landing/segments/${encodeURIComponent(slug)}`).pipe(map((r) => r.data));
  }

  getHowItWorks(slug: string): Observable<LandingHowItWorks> {
    return this.api
      .get<{ data: LandingHowItWorks }>(`/landing/como-funciona/${encodeURIComponent(slug)}`)
      .pipe(map((r) => r.data));
  }

  recordView(path: string): Observable<unknown> {
    return this.api.post('/landing/analytics/view', { path });
  }

  recordCta(channel: string, path?: string): Observable<unknown> {
    return this.api.post('/landing/analytics/cta', { channel, path });
  }
}
