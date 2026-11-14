import { Injectable, inject, signal } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { Observable, catchError, firstValueFrom, from, map, of, switchMap, tap } from 'rxjs';
import { ApiService } from './api.service';

interface PushConfigResponse {
  data: { enabled: boolean; vapid_public_key: string | null };
}

interface PushStatusResponse {
  data: { subscribed: boolean; devices: number };
}

@Injectable({ providedIn: 'root' })
export class PushNotificationsService {
  private readonly api = inject(ApiService);
  private readonly swPush = inject(SwPush, { optional: true });

  readonly permission = signal<NotificationPermission>(
    typeof Notification !== 'undefined' ? Notification.permission : 'denied',
  );
  readonly subscribed = signal(false);
  readonly supported = signal(this.detectSupport());
  readonly busy = signal(false);
  readonly lastError = signal<string | null>(null);

  private detectSupport(): boolean {
    if (typeof window === 'undefined') return false;
    return 'Notification' in window && 'serviceWorker' in navigator && 'PushManager' in window;
  }

  refreshStatus(): Observable<boolean> {
    if (!this.supported()) {
      this.subscribed.set(false);
      return of(false);
    }
    return this.api.get<PushStatusResponse>('/me/push/status').pipe(
      map((r) => !!r.data?.subscribed),
      tap((ok) => this.subscribed.set(ok)),
      catchError(() => {
        this.subscribed.set(false);
        return of(false);
      }),
    );
  }

  enable(): Observable<boolean> {
    this.busy.set(true);
    this.lastError.set(null);
    return this.api.get<PushConfigResponse>('/me/push/config').pipe(
      switchMap((cfg) => {
        if (!cfg.data?.enabled || !cfg.data.vapid_public_key) {
          throw new Error(
            'Push ainda não está configurado no servidor (VAPID). Gere as chaves em Plataforma → Configurações → Serviços → Web Push.',
          );
        }
        return from(this.subscribeBrowser(cfg.data.vapid_public_key)).pipe(
          switchMap((sub) =>
            this.api
              .post('/me/push/subscribe', {
                endpoint: sub.endpoint,
                keys: {
                  p256dh: this.toBase64(sub.getKey('p256dh')),
                  auth: this.toBase64(sub.getKey('auth')),
                },
                contentEncoding: 'aes128gcm',
              })
              .pipe(map(() => true)),
          ),
        );
      }),
      tap(() => {
        this.subscribed.set(true);
        this.permission.set(Notification.permission);
        this.busy.set(false);
      }),
      catchError((err: unknown) => {
        this.busy.set(false);
        const msg =
          err instanceof Error
            ? err.message
            : 'Não foi possível ativar as notificações.';
        this.lastError.set(msg);
        this.permission.set(
          typeof Notification !== 'undefined' ? Notification.permission : 'denied',
        );
        return of(false);
      }),
    );
  }

  disable(): Observable<boolean> {
    this.busy.set(true);
    this.lastError.set(null);
    return from(this.unsubscribeBrowser()).pipe(
      switchMap((endpoint) =>
        this.api.delete('/me/push/subscribe', endpoint ? { endpoint } : {}).pipe(
          catchError(() => of(null)),
          map(() => true),
        ),
      ),
      tap(() => {
        this.subscribed.set(false);
        this.busy.set(false);
      }),
      catchError(() => {
        this.busy.set(false);
        this.subscribed.set(false);
        return of(true);
      }),
    );
  }

  private async subscribeBrowser(vapidPublicKey: string): Promise<PushSubscription> {
    const permission = await Notification.requestPermission();
    this.permission.set(permission);
    if (permission !== 'granted') {
      throw new Error('Permissão de notificação negada no navegador.');
    }

    if (this.swPush?.isEnabled) {
      return await this.swPush.requestSubscription({ serverPublicKey: vapidPublicKey });
    }

    // Dev / sem ngsw: registra SW mínimo se necessário
    let reg = await navigator.serviceWorker.getRegistration();
    if (!reg) {
      reg = await navigator.serviceWorker.register('/push-dev-sw.js');
      await navigator.serviceWorker.ready;
    }
    const existing = await reg.pushManager.getSubscription();
    if (existing) return existing;
    return await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: this.urlBase64ToUint8Array(vapidPublicKey),
    });
  }

  private async unsubscribeBrowser(): Promise<string | null> {
    try {
      if (this.swPush?.isEnabled) {
        try {
          const sub = await firstValueFrom(this.swPush.subscription);
          const endpoint = sub?.endpoint ?? null;
          await sub?.unsubscribe();
          return endpoint;
        } catch {
          // fall through
        }
      }
      const reg = await navigator.serviceWorker.getRegistration();
      const sub = await reg?.pushManager.getSubscription();
      const endpoint = sub?.endpoint ?? null;
      await sub?.unsubscribe();
      return endpoint;
    } catch {
      return null;
    }
  }

  private toBase64(buf: ArrayBuffer | null): string {
    if (!buf) return '';
    const bytes = new Uint8Array(buf);
    let binary = '';
    bytes.forEach((b) => {
      binary += String.fromCharCode(b);
    });
    return btoa(binary);
  }

  private urlBase64ToUint8Array(base64String: string): BufferSource {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const raw = atob(base64);
    const out = new Uint8Array(raw.length);
    for (let i = 0; i < raw.length; i++) out[i] = raw.charCodeAt(i);
    return out;
  }
}
