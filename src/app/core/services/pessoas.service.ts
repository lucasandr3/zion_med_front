import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { map, Observable } from 'rxjs';
import { Protocolo } from './protocolos.service';

export interface Pessoa {
  id: number;
  code: string;
  name: string;
  phone?: string | null;
  phone_alt?: string | null;
  email?: string | null;
  birth_date?: string | null;
  age?: number | null;
  sex?: 'F' | 'M' | 'O' | null;
  cpf?: string | null;
  rg?: string | null;
  marital_status?: string | null;
  profession?: string | null;
  referred_by?: string | null;
  address?: string | null;
  neighborhood?: string | null;
  city?: string | null;
  cep?: string | null;
  lead_source_instagram?: boolean | null;
  lead_source_google?: boolean | null;
  lead_source_facebook?: boolean | null;
  lead_source_indicacao_amigo?: boolean | null;
  lead_source_indicacao_medica?: boolean | null;
  lead_source_plano_saude?: boolean | null;
  lead_source_outro?: string | null;
  has_health_plan?: 'sim' | 'nao' | null;
  health_plan_operator?: string | null;
  health_plan_card_number?: string | null;
  lgpd_accept_comms?: boolean | null;
  lgpd_accept_reminders?: boolean | null;
  notes?: string | null;
  status: string;
  protocols_count?: number | null;
  last_protocol_at?: string | null;
  created_at: string;
  updated_at: string;
}

export interface PessoaDetalhe extends Pessoa {
  stats?: {
    protocols_count: number;
    pending_protocols: number;
    approved_protocols: number;
    rejected_protocols: number;
  };
  recent_protocols?: Protocolo[];
}

interface ListResponse {
  data: Pessoa[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
  links?: { first: string; last: string; prev: string | null; next: string | null };
}

interface OneResponse {
  data: PessoaDetalhe;
}

interface OnePessoaResponse {
  data: Pessoa;
}

@Injectable({ providedIn: 'root' })
export class PessoasService {
  private api = inject(ApiService);

  list(params?: {
    search?: string;
    status?: string;
    has_protocols?: string;
    created_from?: string;
    created_to?: string;
    per_page?: number;
    page?: number;
  }): Observable<{ data: Pessoa[]; meta: ListResponse['meta'] }> {
    const p: Record<string, string | number | undefined> = { ...params };
    if (params?.page) p['page'] = params.page;
    return this.api.get<ListResponse>('/pessoas', p).pipe(
      map((r) => ({
        data: r.data,
        meta: r.meta,
      }))
    );
  }

  get(id: number): Observable<PessoaDetalhe> {
    return this.api.get<OneResponse>(`/pessoas/${id}`).pipe(map((r) => r.data));
  }

  create(payload: {
    name: string;
    phone?: string | null;
    phone_alt?: string | null;
    email?: string | null;
    birth_date?: string | null;
    age?: number | null;
    sex?: 'F' | 'M' | 'O' | null;
    cpf?: string | null;
    rg?: string | null;
    marital_status?: string | null;
    profession?: string | null;
    referred_by?: string | null;
    address?: string | null;
    neighborhood?: string | null;
    city?: string | null;
    cep?: string | null;
    lead_source_instagram?: boolean;
    lead_source_google?: boolean;
    lead_source_facebook?: boolean;
    lead_source_indicacao_amigo?: boolean;
    lead_source_indicacao_medica?: boolean;
    lead_source_plano_saude?: boolean;
    lead_source_outro?: string | null;
    has_health_plan?: 'sim' | 'nao' | null;
    health_plan_operator?: string | null;
    health_plan_card_number?: string | null;
    lgpd_accept_comms?: boolean;
    lgpd_accept_reminders?: boolean;
    notes?: string | null;
    status?: string;
  }): Observable<Pessoa> {
    return this.api.post<OnePessoaResponse>('/pessoas', payload).pipe(map((r) => r.data));
  }

  update(
    id: number,
    payload: Partial<{
      name: string;
      phone: string | null;
      phone_alt: string | null;
      email: string | null;
      birth_date: string | null;
      age: number | null;
      sex: 'F' | 'M' | 'O' | null;
      cpf: string | null;
      rg: string | null;
      marital_status: string | null;
      profession: string | null;
      referred_by: string | null;
      address: string | null;
      neighborhood: string | null;
      city: string | null;
      cep: string | null;
      lead_source_instagram: boolean;
      lead_source_google: boolean;
      lead_source_facebook: boolean;
      lead_source_indicacao_amigo: boolean;
      lead_source_indicacao_medica: boolean;
      lead_source_plano_saude: boolean;
      lead_source_outro: string | null;
      has_health_plan: 'sim' | 'nao' | null;
      health_plan_operator: string | null;
      health_plan_card_number: string | null;
      lgpd_accept_comms: boolean;
      lgpd_accept_reminders: boolean;
      notes: string | null;
      status: string;
    }>
  ): Observable<Pessoa> {
    return this.api.put<OnePessoaResponse>(`/pessoas/${id}`, payload).pipe(map((r) => r.data));
  }

  destroy(id: number): Observable<{ message: string }> {
    return this.api.delete<{ data: { message: string } }>(`/pessoas/${id}`).pipe(map((r) => r.data));
  }
}
