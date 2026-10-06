import { Component, computed, inject, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';



import { AppUpdateService } from '../../../core/services/app-update.service';

@Component({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'zm-app-update-banner',
  standalone: true,
  imports: [],
  template: `
    @if (updates.updateReady() || updates.updateBlocked()) {
      <div class="zm-app-update-banner" role="alertdialog" aria-modal="true" aria-live="assertive">
        <div class="zm-app-update-banner__inner">
          <div class="zm-app-update-banner__content">
            <span class="material-symbols-outlined zm-app-update-banner__icon" aria-hidden="true">system_update</span>
            <div class="zm-app-update-banner__text">
              <p class="zm-app-update-banner__title">{{ title() }}</p>
              <p class="zm-app-update-banner__desc">{{ description() }}</p>
            </div>
          </div>
          <nord-button variant="primary" size="s" type="button" class="zm-app-update-banner__action gap-2" (click)="updates.applyUpdate()" [attr.loading]="updates.applying()" [attr.disabled]="updates.applying()">
            {{ updates.applying() ? 'Atualizando…' : 'Atualizar agora' }}
          </nord-button>
        </div>
      </div>
    }
  `,
  styles: [
    `
      .zm-app-update-banner {
        position: fixed;
        inset: 0 0 auto 0;
        z-index: 10000;
        padding: 0.625rem 1rem;
        background: color-mix(in srgb, var(--primary) 92%, #000);
        color: var(--primary-foreground);
        border-bottom: 1px solid color-mix(in srgb, var(--primary-foreground) 18%, transparent);
        box-shadow: 0 4px 24px color-mix(in srgb, #000 28%, transparent);
      }

      .zm-app-update-banner__inner {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        gap: 0.75rem 1rem;
        max-width: 80rem;
        margin: 0 auto;
      }

      .zm-app-update-banner__content {
        display: flex;
        align-items: flex-start;
        gap: 0.75rem;
        min-width: 0;
        flex: 1 1 16rem;
      }

      .zm-app-update-banner__icon {
        font-size: 1.5rem;
        flex-shrink: 0;
        margin-top: 0.1rem;
      }

      .zm-app-update-banner__text {
        min-width: 0;
      }

      .zm-app-update-banner__title {
        margin: 0;
        font-size: 0.875rem;
        font-weight: 700;
        line-height: 1.35;
      }

      .zm-app-update-banner__desc {
        margin: 0.15rem 0 0;
        font-size: 0.8125rem;
        line-height: 1.45;
        opacity: 0.92;
      }

      .zm-app-update-banner__action {
        flex-shrink: 0;
        font-weight: 600;
      }
    `],
})
export class ZmAppUpdateBannerComponent {
  readonly updates = inject(AppUpdateService);

  readonly title = computed(() =>
    this.updates.updateBlocked() ? 'Atualização obrigatória' : 'Nova versão disponível',
  );

  readonly description = computed(() =>
    this.updates.updateBlocked()
      ? 'Não foi possível carregar a versão mais recente. Atualize agora para continuar usando o sistema.'
      : 'Uma atualização do Gestgo está pronta. Clique em atualizar — a página será recarregada automaticamente.',
  );
}
