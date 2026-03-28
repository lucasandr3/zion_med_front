import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { map, Observable } from 'rxjs';

export interface PermissionCatalogItem {
  key: string;
  group: string;
  group_label: string;
  label: string;
  description: string | null;
}

export interface OrganizationRoleListItem {
  slug: string;
  label: string;
  is_system: boolean;
  is_assignable: boolean;
  user_count: number;
  permission_count: number;
}

export interface OrganizationRoleDetail {
  slug: string;
  label: string;
  is_system: boolean;
  is_assignable: boolean;
  permissions: string[];
  user_count: number;
}

export interface OrganizationRoleCreatePayload {
  slug: string;
  label: string;
  permissions: string[];
  clone_from?: string;
}

export interface OrganizationRoleUpdatePayload {
  label?: string;
  permissions?: string[];
  is_assignable?: boolean;
}

@Injectable({ providedIn: 'root' })
export class OrganizationRolesService {
  private api = inject(ApiService);

  catalog(): Observable<PermissionCatalogItem[]> {
    return this.api.get<{ data: PermissionCatalogItem[] }>('/permissions/catalog').pipe(map((r) => r.data));
  }

  list(): Observable<OrganizationRoleListItem[]> {
    return this.api.get<{ data: OrganizationRoleListItem[] }>('/organization-roles').pipe(map((r) => r.data));
  }

  get(slug: string): Observable<OrganizationRoleDetail> {
    return this.api.get<{ data: OrganizationRoleDetail }>(`/organization-roles/${encodeURIComponent(slug)}`).pipe(map((r) => r.data));
  }

  create(body: OrganizationRoleCreatePayload): Observable<OrganizationRoleDetail> {
    return this.api.post<{ data: OrganizationRoleDetail }>('/organization-roles', body).pipe(map((r) => r.data));
  }

  update(slug: string, body: OrganizationRoleUpdatePayload): Observable<OrganizationRoleDetail> {
    return this.api.put<{ data: OrganizationRoleDetail }>(`/organization-roles/${encodeURIComponent(slug)}`, body).pipe(map((r) => r.data));
  }

  delete(slug: string): Observable<void> {
    return this.api.delete<{ data: { message: string } }>(`/organization-roles/${encodeURIComponent(slug)}`).pipe(map(() => undefined));
  }
}
