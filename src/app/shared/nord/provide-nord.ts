import { makeEnvironmentProviders, type EnvironmentProviders } from '@angular/core';
import { EVENT_MANAGER_PLUGINS } from '@angular/platform-browser';

import { GestgoDebounceEventManagerPlugin } from '../core/provider/event-manager-plugins/gestgo-debounce-event-manager-plugin';
import { GestgoEventManagerPlugin } from '../core/provider/event-manager-plugins/gestgo-event-manager-plugin';

/**
 * Providers do app com Nord Design System.
 * Web Components em `src/nord-setup.ts`.
 */
export function provideNord(): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: EVENT_MANAGER_PLUGINS,
      useClass: GestgoEventManagerPlugin,
      multi: true,
    },
    {
      provide: EVENT_MANAGER_PLUGINS,
      useClass: GestgoDebounceEventManagerPlugin,
      multi: true,
    },
  ]);
}
