import { ApplicationConfig, ErrorHandler, inject, provideAppInitializer, provideZonelessChangeDetection, isDevMode } from '@angular/core';
import { IMAGE_LOADER, type ImageLoaderConfig } from '@angular/common';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { catchError, firstValueFrom, of } from 'rxjs';
import { provideFlatpickrDefaults } from 'angularx-flatpickr';
import { provideEnvironmentNgxMask } from 'ngx-mask';
import { Portuguese } from 'flatpickr/dist/l10n/pt';

import { provideNord } from '@/shared/nord/provide-nord';
import { routes } from './app.routes';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { AuthService } from './core/services/auth.service';
import { errorHubInterceptor } from './core/interceptors/error-hub.interceptor';
import { GlobalErrorHandler } from './core/handlers/global-error.handler';
import { provideServiceWorker } from '@angular/service-worker';

/** Permite `ngSrc` em logos e mídias com URL absoluta vindas da API. */
function absoluteMediaImageLoader(config: ImageLoaderConfig): string {
  return config.src;
}

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    { provide: IMAGE_LOADER, useValue: absoluteMediaImageLoader },
    provideNord(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor, errorHubInterceptor])),
    provideAppInitializer(() => {
      const auth = inject(AuthService);
      return firstValueFrom(auth.ensureCsrf().pipe(catchError(() => of(''))));
    }),
    provideFlatpickrDefaults({
      locale: Portuguese,
      dateFormat: 'Y-m-d',
      altInput: true,
      altFormat: 'd/m/Y',
      allowInput: true,
      disableMobile: true,
      static: true,
    }),
    provideEnvironmentNgxMask({
      validation: false,
      dropSpecialCharacters: false,
    }),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:5000',
    })],
};
