import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { map, Observable } from 'rxjs';

export interface LinkBioLink {
  id: number;
  label: string;
  url: string;
  sort_order: number;
  icon?: string;
  total_clicks?: number;
}

export interface LinkBioFormLink {
  id: number;
  name: string;
  public_url: string;
  submission_count: number;
  last_submission_at?: string | null;
}

/** IDs de layout da página pública (1 = genérico; 2–7 = temas específicos). */
export type LinkBioLayoutModel = 1 | 2 | 3 | 4 | 5 | 6 | 7;

/** Opcional: convênios, equipe, Instagram, textos, veterinária (6), pediatria (7), etc. */
export interface LinkBioExtra {
  hero_tagline?: string;
  council_registration?: string;
  brand_subtitle?: string;
  convenios?: string[];
  instagram_url?: string;
  modalities?: { title: string; subtitle?: string; available?: boolean }[];
  team?: { name: string; credential?: string; notes?: string; whatsapp?: string }[];
  /** Modelo 6 — rótulo acima do nome (ex.: Medicina veterinária). */
  layout_cover_kicker?: string;
  /** Modelo 6 — chips de espécies; `active` destaca o chip. */
  species_chips?: { label: string; active?: boolean }[];
  /** Modelo 6 — cards de serviço (emoji + título). */
  vet_service_cards?: { icon?: string; title: string }[];
  /** Modelo 6 — texto do botão WhatsApp. */
  vet_wa_cta_label?: string;
  vet_docs_section_title?: string;
  vet_docs_intro?: string;
  /** Modelo 7 — rótulo da capa (ex.: Pediatria). */
  ped_cover_kicker?: string;
  ped_parent_notice_title?: string;
  ped_parent_notice_body?: string;
  ped_first_visit_steps?: { title: string; subtitle: string; tone?: 'sky' | 'lemon' | 'mint' }[];
  ped_age_bands?: { emoji: string; title: string; range: string; theme?: 'sky' | 'lemon' | 'coral' }[];
  ped_docs_section_title?: string;
  ped_docs_intro?: string;
  ped_wa_cta_label?: string;
}

export interface LinkBioClinic {
  id: number;
  name: string;
  slug: string;
  logo_url?: string | null;
  public_theme?: string | null;
  cover_image_url?: string | null;
  cover_color?: string | null;
  cover_mode?: 'banner' | 'solid' | 'none' | null;
  link_bio_model?: LinkBioLayoutModel | null;
  link_bio_extra?: LinkBioExtra | Record<string, unknown> | null;
  address?: string | null;
  short_description?: string | null;
  specialties?: string | null;
  specialties_list?: string[];
  founded_year?: number | null;
  contact_email?: string | null;
  phone?: string | null;
  meta_description?: string | null;
  maps_url?: string | null;
  accent_hex?: string | null;
  is_open_now?: boolean | null;
  business_hours_grid?: Record<string, { label: string; text: string }>;
}

/** Item unificado para documentos / links na página pública */
export type LinkBioPublicDocItem =
  | { type: 'bio'; item: LinkBioLink }
  | { type: 'form'; item: { id: number; name: string; public_url: string } };

export interface LinkBioMetrics {
  visitas_hoje: number;
  total_views: number;
  total_clicks: number;
  total_clicks_last_30: number;
  taxa_clique: number;
  formularios_total: number;
  formularios_ativos: number;
  formularios_draft: number;
}

export interface LinkBioStats {
  clicks_per_day: Record<string, number>;
  views_per_day: Record<string, number>;
  most_clicked_link?: LinkBioLink | null;
  peak_day_label?: string | null;
}

/** Resposta do endpoint público GET /link-bio/public/:slug */
export interface LinkBioPublicData {
  clinic: LinkBioClinic;
  links: LinkBioLink[];
  form_links: { id: number; name: string; public_url: string }[];
}

export interface LinkBioState {
  clinic: LinkBioClinic;
  public_url: string;
  links: LinkBioLink[];
  forms: LinkBioFormLink[];
  available_icons: Record<string, string>;
  available_themes: Record<string, { label: string; primary: string }>;
  metrics: LinkBioMetrics;
  stats: LinkBioStats;
}

interface ApiResponse {
  data: {
    clinic: LinkBioClinic;
    bio_links: LinkBioLink[];
    form_links_public: LinkBioFormLink[];
    public_url: string;
    available_icons: Record<string, string>;
    available_themes: Record<string, { label: string; primary: string }>;
    visitas_hoje: number;
    total_views: number;
    total_clicks: number;
    total_clicks_last_30: number;
    taxa_clique: number;
    formularios_total: number;
    formularios_ativos: number;
    formularios_draft: number;
    clicks_per_day: Record<string, number>;
    views_per_day: Record<string, number>;
    most_clicked_link: LinkBioLink | null;
    peak_day_label: string | null;
  };
}

@Injectable({ providedIn: 'root' })
export class LinkBioService {
  private api = inject(ApiService);

  get(): Observable<LinkBioState> {
    return this.api.get<ApiResponse>('/link-bio').pipe(
      map((r) => {
        const d = r.data;
        return {
          clinic: d.clinic,
          public_url: d.public_url,
          links: d.bio_links ?? [],
          forms: d.form_links_public ?? [],
          available_icons: d.available_icons ?? {},
          available_themes: d.available_themes ?? {},
          metrics: {
            visitas_hoje: d.visitas_hoje ?? 0,
            total_views: d.total_views ?? 0,
            total_clicks: d.total_clicks ?? 0,
            total_clicks_last_30: d.total_clicks_last_30 ?? 0,
            taxa_clique: d.taxa_clique ?? 0,
            formularios_total: d.formularios_total ?? 0,
            formularios_ativos: d.formularios_ativos ?? 0,
            formularios_draft: d.formularios_draft ?? 0,
          },
          stats: {
            clicks_per_day: d.clicks_per_day ?? {},
            views_per_day: d.views_per_day ?? {},
            most_clicked_link: d.most_clicked_link,
            peak_day_label: d.peak_day_label,
          },
        } as LinkBioState;
      })
    );
  }

  createLink(payload: { label: string; url: string; icon?: string }): Observable<LinkBioLink> {
    return this.api.post<{ data: LinkBioLink }>('/link-bio/links', payload).pipe(map((r) => r.data));
  }

  updateLink(id: number, payload: { label: string; url: string; icon?: string }): Observable<LinkBioLink> {
    return this.api.put<{ data: LinkBioLink }>(`/link-bio/links/${id}`, payload).pipe(map((r) => r.data));
  }

  deleteLink(id: number): Observable<void> {
    return this.api.delete(`/link-bio/links/${id}`).pipe(map(() => undefined));
  }

  reorderLinks(linkIds: number[]): Observable<unknown> {
    return this.api.post('/link-bio/links/reorder', { ids: linkIds });
  }

  updateAparencia(
    payload: Partial<LinkBioClinic> & {
      public_theme?: string | null;
      cover_color?: string | null;
      cover_mode?: 'banner' | 'solid' | 'none' | null;
      link_bio_model?: LinkBioLayoutModel | null;
      link_bio_extra?: LinkBioExtra | Record<string, unknown> | null;
    }
  ): Observable<LinkBioClinic> {
    return this.api
      .put<{ data: { clinic: LinkBioClinic } | LinkBioClinic }>('/link-bio/aparencia', payload)
      .pipe(
        map((r) => {
          const d = r.data as { clinic?: LinkBioClinic } | LinkBioClinic;
          return (typeof d === 'object' && d && 'clinic' in d ? d.clinic : d) as LinkBioClinic;
        })
      );
  }

  /** Página pública do Link Bio por slug (sem autenticação). */
  getPublicBySlug(slug: string): Observable<LinkBioPublicData> {
    return this.api
      .get<{ data: LinkBioPublicData }>(`/link-bio/public/${encodeURIComponent(slug)}`)
      .pipe(map((r) => r.data));
  }
}
