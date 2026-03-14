import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { map, Observable } from 'rxjs';

export interface Usuario {
  id: number;
  name: string;
  email: string;
  role: string;
  role_label?: string;
  active?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Role {
  value: string;
  label: string;
}

interface ListResponse {
  data: Usuario[];
}

interface OneResponse {
  data: Usuario;
}

interface RolesResponse {
  data: Role[] | { value: string; label: string }[];
}

@Injectable({ providedIn: 'root' })
export class UsuariosService {
  private api = inject(ApiService);

  list(): Observable<Usuario[]> {
    return this.api.get<ListResponse>('/usuarios').pipe(map((r) => r.data));
  }

  get(id: number): Observable<Usuario> {
    return this.api.get<OneResponse>(`/usuarios/${id}`).pipe(map((r) => r.data));
  }

  roles(): Observable<Role[]> {
    return this.api.get<RolesResponse>('/usuarios/roles').pipe(
      map((r) => {
        const arr = Array.isArray(r.data) ? r.data : [];
        return arr.map((x: Role | { value: string; label: string }) =>
          typeof x === 'object' && x && 'value' in x ? { value: x.value, label: x.label ?? x.value } : { value: String(x), label: String(x) }
        );
      })
    );
  }

  create(payload: { name: string; email: string; password: string; role: string }): Observable<Usuario> {
    return this.api.post<OneResponse>('/usuarios', payload).pipe(map((r) => r.data));
  }

  update(id: number, payload: Partial<Usuario> & { password?: string }): Observable<Usuario> {
    return this.api.put<OneResponse>(`/usuarios/${id}`, payload).pipe(map((r) => r.data));
  }

  delete(id: number): Observable<void> {
    return this.api.delete(`/usuarios/${id}`).pipe(map(() => undefined));
  }
}
