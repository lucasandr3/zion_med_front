import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideFlatpickrDefaults } from 'angularx-flatpickr';
import { provideEnvironmentNgxMask } from 'ngx-mask';
import { Portuguese } from 'flatpickr/dist/l10n/pt';

import { routes } from './app.routes';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { provideServiceWorker } from '@angular/service-worker';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
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
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
};
