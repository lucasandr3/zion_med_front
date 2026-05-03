import { Injectable, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ApiService } from './api.service';
import { AuthService, User } from './auth.service';

export interface ElectronicSignaturePatchResponse {
  data: { user: User };
}

@Injectable({ providedIn: 'root' })
export class ContaPerfilService {
  private api = inject(ApiService);
  private auth = inject(AuthService);

  patchElectronicSignature(body: { image_base64?: string; clear?: boolean }): Observable<ElectronicSignaturePatchResponse> {
    return this.api.patch<ElectronicSignaturePatchResponse>('/me/electronic-signature', body).pipe(
      tap((res) => {
        const u = res.data?.user;
        if (u) {
          this.auth.mergeUserFromApi(u);
          this.auth.notifyAppearanceApplied();
        }
      })
    );
  }
}
