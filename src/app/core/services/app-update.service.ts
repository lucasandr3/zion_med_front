import { ApplicationRef, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { filter, first, interval } from 'rxjs';
import { AuthService } from './auth.service';
import { NovidadesService } from './novidades.service';

/** Verificação periódica em segundo plano (15 min). */
const CHECK_INTERVAL_MS = 15 * 60 * 1000;
const BODY_BANNER_CLASS = 'app-update-banner-visible';

export type AppUpdateCheckResult = 'ready' | 'none' | 'unavailable' | 'error';

@Injectable({ providedIn: 'root' })
export class AppUpdateService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly appRef = inject(ApplicationRef);
  private readonly swUpdate = inject(SwUpdate, { optional: true });
  private readonly novidades = inject(NovidadesService);
  private readonly auth = inject(AuthService);

  readonly updateReady = signal(false);
  readonly updateBlocked = signal(false);
  readonly applying = signal(false);
  readonly checking = signal(false);
  /** Versão publicada nas Novidades (quando houver). */
  readonly latestReleaseVersion = signal<string | null>(null);

  private started = false;
  private visibilityBound = false;

  init(): void {
    if (!isPlatformBrowser(this.platformId) || this.started) {
      return;
    }
    this.started = true;

    this.refreshReleaseMeta();

    if (!this.swUpdate?.isEnabled) {
      return;
    }

    this.swUpdate.versionUpdates
      .pipe(filter((event): event is VersionReadyEvent => event.type === 'VERSION_READY'))
      .subscribe(() => {
        this.refreshReleaseMeta();
        this.markUpdateReady();
      });

    this.swUpdate.unrecoverable.subscribe(() => {
      this.updateBlocked.set(true);
      this.syncBannerBodyClass();
    });

    this.appRef.isStable.pipe(first((stable) => stable)).subscribe(() => {
      void this.checkForUpdate();
    });

    interval(CHECK_INTERVAL_MS).subscribe(() => {
      void this.checkForUpdate();
    });

    this.bindVisibilityCheck();
  }

  /** Disparado após login/cadastro ou pelo menu Conta. */
  checkNow(): Promise<AppUpdateCheckResult> {
    this.refreshReleaseMeta();
    return this.checkForUpdate(true);
  }

  applyUpdate(): void {
    void this.applyUpdateInternal();
  }

  private bindVisibilityCheck(): void {
    if (this.visibilityBound) return;
    this.visibilityBound = true;

    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        void this.checkForUpdate();
      }
    });

    window.addEventListener('focus', () => {
      void this.checkForUpdate();
    });
  }

  private refreshReleaseMeta(): void {
    // Endpoint autenticado — não chamar em links públicos do cliente.
    if (!this.auth.isAuthenticated()) {
      return;
    }
    this.novidades.latest().subscribe({
      next: (latest) => {
        const version = latest.latest_version?.trim() || null;
        this.latestReleaseVersion.set(version);
      },
      error: () => {
        // Sem impacto no fluxo de SW.
      },
    });
  }

  private markUpdateReady(): void {
    this.updateReady.set(true);
    this.syncBannerBodyClass();
  }

  private syncBannerBodyClass(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    const visible = this.updateReady() || this.updateBlocked();
    document.body.classList.toggle(BODY_BANNER_CLASS, visible);
  }

  private async checkForUpdate(manual = false): Promise<AppUpdateCheckResult> {
    if (!this.swUpdate?.isEnabled) {
      return 'unavailable';
    }
    if (this.applying()) {
      return this.updateReady() ? 'ready' : 'none';
    }
    if (this.updateReady()) {
      return 'ready';
    }

    if (manual) {
      this.checking.set(true);
    }

    try {
      const hasUpdate = await this.swUpdate.checkForUpdate();
      // VERSION_READY dispara quando o download terminar; banner aparece nesse momento.
      if (hasUpdate || this.updateReady()) {
        return 'ready';
      }
      return 'none';
    } catch {
      return 'error';
    } finally {
      if (manual) {
        this.checking.set(false);
      }
    }
  }

  private async applyUpdateInternal(): Promise<void> {
    if (this.applying()) {
      return;
    }

    this.applying.set(true);

    if (this.swUpdate?.isEnabled) {
      try {
        await this.swUpdate.activateUpdate();
      } catch {
        // Recarrega mesmo assim para buscar assets novos no origin.
      }
    }

    this.reloadPage();
  }

  private reloadPage(): void {
    document.location.reload();
  }
}
