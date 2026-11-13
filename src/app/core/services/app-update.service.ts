import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SwUpdate, VersionEvent } from '@angular/service-worker';
import { NovidadesService } from './novidades.service';

const BODY_BANNER_CLASS = 'app-update-banner-visible';
/** Mesma chave de `AuthService` — evita DI circular Auth ↔ AppUpdate. */
const SESSION_FLAG_KEY = 'gestgo_session';
/** Evita loop de reload em recuperação do SW. */
const SW_RECOVER_FLAG = 'gestgo_sw_recover';

export type AppUpdateCheckResult = 'ready' | 'none' | 'unavailable' | 'error';

/**
 * Atualização do app via Angular Service Worker.
 * Checagem automática só no login (`checkNow` via AuthService).
 * Menu Conta / Perfil também podem disparar manualmente.
 */
@Injectable({ providedIn: 'root' })
export class AppUpdateService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly swUpdate = inject(SwUpdate, { optional: true });
  private readonly novidades = inject(NovidadesService);

  readonly updateReady = signal(false);
  readonly updateBlocked = signal(false);
  readonly applying = signal(false);
  readonly checking = signal(false);
  /** Versão publicada nas Novidades (quando houver). */
  readonly latestReleaseVersion = signal<string | null>(null);

  private started = false;
  private checkInFlight: Promise<AppUpdateCheckResult> | null = null;

  init(): void {
    if (!isPlatformBrowser(this.platformId) || this.started) {
      return;
    }
    this.started = true;

    try {
      sessionStorage.removeItem(SW_RECOVER_FLAG);
    } catch {
      // ignore
    }

    if (!this.swUpdate?.isEnabled) {
      return;
    }

    // Só escuta eventos — não dispara check periódico / focus / visibility.
    this.swUpdate.versionUpdates.subscribe((event: VersionEvent) => {
      if (event.type === 'VERSION_READY') {
        this.refreshReleaseMeta();
        this.markUpdateReady();
        return;
      }
      if (event.type === 'VERSION_INSTALLATION_FAILED') {
        console.warn('[app-update] falha ao instalar versão do service worker', event);
      }
    });

    this.swUpdate.unrecoverable.subscribe(() => {
      void this.recoverBrokenServiceWorker();
    });
  }

  /** Disparado no login (e opcionalmente pelo menu Conta / Perfil). */
  checkNow(): Promise<AppUpdateCheckResult> {
    this.refreshReleaseMeta();
    return this.checkForUpdate();
  }

  applyUpdate(): void {
    void this.applyUpdateInternal();
  }

  private refreshReleaseMeta(): void {
    if (typeof localStorage === 'undefined' || localStorage.getItem(SESSION_FLAG_KEY) !== '1') {
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

  private async checkForUpdate(): Promise<AppUpdateCheckResult> {
    if (!this.swUpdate?.isEnabled) {
      return 'unavailable';
    }
    if (this.applying()) {
      return this.updateReady() ? 'ready' : 'none';
    }
    if (this.updateReady()) {
      return 'ready';
    }
    if (this.checkInFlight) {
      return this.checkInFlight;
    }

    this.checking.set(true);
    this.checkInFlight = (async () => {
      try {
        const hasUpdate = await this.swUpdate!.checkForUpdate();
        if (hasUpdate || this.updateReady()) {
          return 'ready';
        }
        return 'none';
      } catch (err) {
        console.warn('[app-update] checkForUpdate falhou', err);
        return 'error';
      } finally {
        this.checkInFlight = null;
        this.checking.set(false);
      }
    })();

    return this.checkInFlight;
  }

  /**
   * SW inconsistente (hash/cache): limpa ngsw e recarrega uma vez.
   */
  private async recoverBrokenServiceWorker(): Promise<void> {
    this.updateBlocked.set(true);
    this.syncBannerBodyClass();

    let alreadyTried = false;
    try {
      alreadyTried = sessionStorage.getItem(SW_RECOVER_FLAG) === '1';
    } catch {
      alreadyTried = false;
    }

    if (alreadyTried) {
      return;
    }

    try {
      sessionStorage.setItem(SW_RECOVER_FLAG, '1');
    } catch {
      // ignore
    }

    try {
      if ('caches' in window) {
        const keys = await caches.keys();
        await Promise.all(keys.filter((k) => k.includes('ngsw')).map((k) => caches.delete(k)));
      }
      if ('serviceWorker' in navigator) {
        const regs = await navigator.serviceWorker.getRegistrations();
        await Promise.all(regs.map((r) => r.unregister()));
      }
    } catch (err) {
      console.warn('[app-update] falha ao limpar service worker', err);
    }

    this.reloadPage();
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
