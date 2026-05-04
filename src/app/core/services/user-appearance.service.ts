import { Injectable, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ApiService } from './api.service';
import { AuthService, User } from './auth.service';
import { applyUserAppearanceToBrowser } from './user-appearance.sync';

interface AppearancePatchResponse {
  data: { user: User };
}

@Injectable({ providedIn: 'root' })
export class UserAppearanceService {
  private api = inject(ApiService);
  private auth = inject(AuthService);

  /** PATCH parcial; atualiza sessão local e DOM se a API devolver o usuário. */
  patchAppearance(body: {
    ui_theme?: string | null;
    ui_dark_mode?: boolean | null;
    ui_shell_preset?: string | null;
  }): Observable<AppearancePatchResponse> {
    return this.api.patch<AppearancePatchResponse>('/me/appearance', body).pipe(
      tap((res) => {
        const u = res.data?.user;
        if (u) {
          this.auth.mergeUserFromApi(u);
          applyUserAppearanceToBrowser(u);
          this.auth.notifyAppearanceApplied();
        }
      })
    );
  }
}
