import {
  ApplicationConfig,
  ErrorHandler,
  inject,
  provideAppInitializer,
  provideZoneChangeDetection,
  isDevMode,
} from '@angular/core';
import { IMAGE_LOADER, type ImageLoaderConfig } from '@angular/common';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { provideFlatpickrDefaults } from 'angularx-flatpickr';
import { provideEnvironmentNgxMask } from 'ngx-mask';
import { Portuguese } from 'flatpickr/dist/l10n/pt';

import { provideZard } from '@/shared/core/provider/providezard';
import { routes } from './app.routes';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { errorHubInterceptor } from './core/interceptors/error-hub.interceptor';
import { GlobalErrorHandler } from './core/handlers/global-error.handler';
import { provideServiceWorker } from '@angular/service-worker';
import { TemaUtil } from './shared/utils/tema.util';

/** Permite `ngSrc` em logos e mídias com URL absoluta vindas da API. */
function absoluteMediaImageLoader(config: ImageLoaderConfig): string {
  return config.src;
}

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    { provide: IMAGE_LOADER, useValue: absoluteMediaImageLoader },
    provideAppInitializer(() => {
      inject(TemaUtil).initialize();
    }),
    provideAnimationsAsync(),
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline', subscriptSizing: 'dynamic' },
    },
    provideZard(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor, errorHubInterceptor])),
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
    }),
  ],
};
