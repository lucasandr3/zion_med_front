import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiService } from './api.service';
import { absoluteMediaUrl } from '../utils/absolute-media-url';
import { normalizePublicAppUrl } from '../utils/public-form-url.util';
import type {
  StudioDraft,
  StudioMedia,
  StudioMediaSlot,
  StudioMode,
  StudioSpecialtyKey,
} from '../../paginas/studio/studio.models';

export interface StudioLegacyClinic {
  id: number;
  name: string;
  slug: string;
  short_description?: string | null;
  phone?: string | null;
  address?: string | null;
  link_bio_model?: number | null;
  link_bio_extra?: Record<string, unknown> | null;
  logo_url?: string | null;
  professional_photo_url?: string | null;
  cover_image_url?: string | null;
  accent_hex?: string | null;
  public_theme?: string | null;
}

export interface StudioPublishedSummary {
  link: boolean;
  site: boolean;
  linkPublishedAt?: string | null;
  sitePublishedAt?: string | null;
}

export interface StudioState {
  draft: StudioDraft;
  published: StudioPublishedSummary;
  legacy: {
    clinic: StudioLegacyClinic;
    specialtyKey: StudioSpecialtyKey;
    legacyModel: number;
  };
  publicUrl: string;
  hasSavedDraft: boolean;
  catalog: {
    specialties: string[];
    templates: string[];
    blockTypes: string[];
  };
}

interface StudioApiResponse {
  data: {
    draft: StudioDraft;
    published?: StudioPublishedSummary;
    legacy: StudioState['legacy'];
    public_url: string;
    has_saved_draft: boolean;
    catalog: StudioState['catalog'];
  };
}

interface StudioDraftApiResponse {
  data: {
    draft: StudioDraft;
    published?: StudioPublishedSummary;
    public_url: string;
    has_saved_draft: boolean;
  };
}

interface StudioMediaApiResponse {
  data: {
    draft: StudioDraft;
    slot: StudioMediaSlot;
    path: string;
    url: string | null;
    public_url: string;
    has_saved_draft: boolean;
  };
}

@Injectable({ providedIn: 'root' })
export class StudioService {
  private readonly api = inject(ApiService);

  get(): Observable<StudioState> {
    return this.api.get<StudioApiResponse>('/studio').pipe(
      map((r) => ({
        draft: this.normalizeDraftMedia(r.data.draft),
        published: r.data.published ?? { link: false, site: false },
        legacy: r.data.legacy,
        publicUrl: normalizePublicAppUrl(r.data.public_url),
        hasSavedDraft: !!r.data.has_saved_draft,
        catalog: r.data.catalog,
      }))
    );
  }

  saveDraft(draft: StudioDraft): Observable<{
    draft: StudioDraft;
    published: StudioPublishedSummary;
    publicUrl: string;
    hasSavedDraft: boolean;
  }> {
    return this.api.put<StudioDraftApiResponse>('/studio/draft', { draft }).pipe(
      map((r) => ({
        draft: this.normalizeDraftMedia(r.data.draft),
        published: r.data.published ?? { link: false, site: false },
        publicUrl: normalizePublicAppUrl(r.data.public_url),
        hasSavedDraft: !!r.data.has_saved_draft,
      }))
    );
  }

  uploadMedia(
    slot: StudioMediaSlot,
    file: File
  ): Observable<{ draft: StudioDraft; publicUrl: string; hasSavedDraft: boolean; url: string | null }> {
    const form = new FormData();
    form.append('file', file, file.name);
    return this.api.postFormData<StudioMediaApiResponse>(`/studio/media/${slot}`, form).pipe(
      map((r) => ({
        draft: this.normalizeDraftMedia(r.data.draft),
        publicUrl: normalizePublicAppUrl(r.data.public_url),
        hasSavedDraft: !!r.data.has_saved_draft,
        url: absoluteMediaUrl(r.data.url),
      }))
    );
  }

  publish(mode: StudioMode): Observable<{
    draft: StudioDraft;
    published: StudioPublishedSummary;
    publicUrl: string;
    hasSavedDraft: boolean;
  }> {
    return this.api.post<StudioDraftApiResponse>('/studio/publish', { mode }).pipe(
      map((r) => ({
        draft: this.normalizeDraftMedia(r.data.draft),
        published: r.data.published ?? { link: false, site: false },
        publicUrl: normalizePublicAppUrl(r.data.public_url),
        hasSavedDraft: !!r.data.has_saved_draft,
      }))
    );
  }

  unpublish(mode: StudioMode): Observable<{
    draft: StudioDraft;
    published: StudioPublishedSummary;
    publicUrl: string;
    hasSavedDraft: boolean;
  }> {
    return this.api.post<StudioDraftApiResponse>('/studio/unpublish', { mode }).pipe(
      map((r) => ({
        draft: this.normalizeDraftMedia(r.data.draft),
        published: r.data.published ?? { link: false, site: false },
        publicUrl: normalizePublicAppUrl(r.data.public_url),
        hasSavedDraft: !!r.data.has_saved_draft,
      }))
    );
  }

  private normalizeDraftMedia(draft: StudioDraft): StudioDraft {
    const media = draft.shared?.media ?? {};
    const next: StudioMedia = {
      ...media,
      heroUrl: absoluteMediaUrl(media.heroUrl ?? null),
      portraitUrl: absoluteMediaUrl(media.portraitUrl ?? null),
      officeUrl: absoluteMediaUrl(media.officeUrl ?? null),
    };
    return {
      ...draft,
      shared: {
        ...draft.shared,
        media: next,
      },
    };
  }
}
