import { ApplicationRef, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { filter, first, interval } from 'rxjs';

/** Verificação periódica em segundo plano (1 h). */
const CHECK_INTERVAL_MS = 60 * 60 * 1000;
const BODY_BANNER_CLASS = 'app-update-banner-visible';

@Injectable({ providedIn: 'root' })
export class AppUpdateService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly appRef = inject(ApplicationRef);
  private readonly swUpdate = inject(SwUpdate, { optional: true });

  readonly updateReady = signal(false);
  readonly updateBlocked = signal(false);
  readonly applying = signal(false);

  init(): void {
    if (!isPlatformBrowser(this.platformId) || !this.swUpdate?.isEnabled) {
      return;
    }

    this.swUpdate.versionUpdates
      .pipe(filter((event): event is VersionReadyEvent => event.type === 'VERSION_READY'))
      .subscribe(() => this.markUpdateReady());

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
  }

  /** Disparado após login/cadastro para buscar versão nova imediatamente. */
  checkNow(): void {
    void this.checkForUpdate();
  }

  applyUpdate(): void {
    void this.applyUpdateInternal();
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

  private async checkForUpdate(): Promise<void> {
    if (!this.swUpdate?.isEnabled || this.applying()) {
      return;
    }
    try {
      const hasUpdate = await this.swUpdate.checkForUpdate();
      if (hasUpdate) {
        // VERSION_READY dispara quando o download terminar; banner aparece nesse momento.
      }
    } catch {
      // Rede indisponível ou SW ainda inicializando.
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
