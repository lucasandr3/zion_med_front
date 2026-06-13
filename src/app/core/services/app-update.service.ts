import { ApplicationRef, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { filter, first, interval } from 'rxjs';

import { ToastService } from './toast.service';

const CHECK_INTERVAL_MS = 60 * 60 * 1000;

@Injectable({ providedIn: 'root' })
export class AppUpdateService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly appRef = inject(ApplicationRef);
  private readonly toast = inject(ToastService);
  private readonly swUpdate = inject(SwUpdate, { optional: true });

  private promptShown = false;
  private updating = false;

  init(): void {
    if (!isPlatformBrowser(this.platformId) || !this.swUpdate?.isEnabled) {
      return;
    }

    this.swUpdate.versionUpdates
      .pipe(filter((event): event is VersionReadyEvent => event.type === 'VERSION_READY'))
      .subscribe(() => this.notifyUpdateReady());

    this.swUpdate.unrecoverable.subscribe(() => {
      this.toast.show(
        'warning',
        'Atualização necessária',
        'Não foi possível carregar a versão mais recente. Recarregue a página.',
        Number.POSITIVE_INFINITY,
        'Recarregar',
        () => this.reloadPage(),
      );
    });

    this.appRef.isStable.pipe(first((stable) => stable)).subscribe(() => {
      void this.checkForUpdate();
    });

    interval(CHECK_INTERVAL_MS).subscribe(() => {
      void this.checkForUpdate();
    });

    window.addEventListener('focus', this.onWindowFocus);
    document.addEventListener('visibilitychange', this.onVisibilityChange);
  }

  private readonly onWindowFocus = (): void => {
    void this.checkForUpdate();
  };

  private readonly onVisibilityChange = (): void => {
    if (document.visibilityState === 'visible') {
      void this.checkForUpdate();
    }
  };

  private notifyUpdateReady(): void {
    if (this.promptShown || this.updating) {
      return;
    }
    this.promptShown = true;

    this.toast.show(
      'info',
      'Nova versão disponível',
      'Uma atualização do sistema está pronta. Clique para aplicar agora.',
      Number.POSITIVE_INFINITY,
      'Atualizar',
      () => void this.applyUpdate(),
    );
  }

  private async checkForUpdate(): Promise<void> {
    if (!this.swUpdate?.isEnabled || this.updating) {
      return;
    }
    try {
      await this.swUpdate.checkForUpdate();
    } catch {
      // Rede indisponível ou SW ainda inicializando.
    }
  }

  private async applyUpdate(): Promise<void> {
    if (!this.swUpdate?.isEnabled || this.updating) {
      this.reloadPage();
      return;
    }

    this.updating = true;
    try {
      await this.swUpdate.activateUpdate();
    } catch {
      // Mesmo com falha na ativação, recarrega para buscar assets novos.
    }
    this.reloadPage();
  }

  private reloadPage(): void {
    document.location.reload();
  }
}
