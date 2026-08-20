import { Component, computed, inject } from '@angular/core';
import { GoAssistantTourService } from '../services/go-assistant-tour.service';

@Component({
  selector: 'go-assistant-tour-overlay',
  standalone: true,
  imports: [],
  template: `
    @if (tour.state(); as state) {
      <div class="go-tour-root" role="dialog" aria-modal="true" aria-label="Tour guiado">
        <div class="go-tour-dim" (click)="tour.skip()"></div>

        @if (spotlight()) {
          <div
            class="go-tour-spotlight"
            [style.top.px]="spotlight()!.top"
            [style.left.px]="spotlight()!.left"
            [style.width.px]="spotlight()!.width"
            [style.height.px]="spotlight()!.height"
          ></div>
        }

        <div
          class="go-tour-card"
          [style.top.px]="cardTop()"
          [style.left.px]="cardLeft()"
        >
          <p class="go-tour-progress">
            Passo {{ state.stepIndex + 1 }} de {{ state.tour.steps.length }}
          </p>
          <h3>{{ state.step.title }}</h3>
          <p>{{ state.step.body }}</p>
          @if (!state.targetRect) {
            <p class="go-tour-hint">
              Este destaque ainda não está marcado nesta tela. Siga a explicação e avance.
            </p>
          }
          <div class="go-tour-actions">
            <button type="button" class="ghost" (click)="tour.skip()">Pular</button>
            <div class="go-tour-nav">
              <button type="button" class="ghost" (click)="tour.prev()" [disabled]="state.stepIndex === 0">
                Anterior
              </button>
              <button type="button" class="primary" (click)="tour.next()">
                {{ state.stepIndex + 1 >= state.tour.steps.length ? 'Concluir' : 'Próximo' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    }
  `,
  styles: [
    `
      .go-tour-root {
        position: fixed;
        inset: 0;
        z-index: 60;
        pointer-events: none;
      }
      .go-tour-dim {
        position: absolute;
        inset: 0;
        background: rgb(0 0 0 / 0.45);
        pointer-events: auto;
      }
      .go-tour-card {
        position: absolute;
        width: min(calc(100vw - 2rem), 22rem);
        pointer-events: auto;
        background: var(--background);
        color: var(--foreground);
        border: 1px solid var(--border);
        border-radius: var(--radius, 0.5rem);
        padding: 1rem;
        box-shadow: 0 18px 40px -20px rgb(0 0 0 / 0.45);
      }
      .go-tour-card h3 {
        margin: 0 0 0.35rem;
        font-size: 1rem;
        font-weight: 600;
        color: var(--foreground);
      }
      .go-tour-card p {
        margin: 0;
        font-size: 0.875rem;
        line-height: 1.45;
        color: var(--muted-foreground);
      }
      .go-tour-progress {
        margin-bottom: 0.45rem !important;
        font-size: 0.72rem !important;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        font-weight: 600;
      }
      .go-tour-hint {
        margin-top: 0.55rem !important;
        font-size: 0.78rem !important;
      }
      .go-tour-actions {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.5rem;
        margin-top: 0.9rem;
      }
      .go-tour-nav {
        display: flex;
        gap: 0.4rem;
      }
      .go-tour-card button {
        border-radius: var(--radius, 0.5rem);
        border: 1px solid var(--border);
        background: var(--card, var(--background));
        color: var(--foreground);
        padding: 0.4rem 0.65rem;
        font-size: 0.8rem;
        cursor: pointer;
      }
      .go-tour-card button.primary {
        background: var(--primary);
        border-color: var(--primary);
        color: var(--primary-foreground);
      }
      .go-tour-card button.ghost {
        background: transparent;
      }
      .go-tour-card button:disabled {
        opacity: 0.45;
        cursor: not-allowed;
      }
      .go-tour-spotlight {
        position: absolute;
        border-radius: 0.75rem;
        box-shadow:
          0 0 0 9999px rgb(0 0 0 / 0.45),
          0 0 0 2px var(--primary);
        background: transparent;
        pointer-events: none;
        transition: all 0.2s ease;
      }
    `,
  ],
})
export class GoAssistantTourOverlayComponent {
  readonly tour = inject(GoAssistantTourService);

  readonly spotlight = computed(() => {
    const rect = this.tour.state()?.targetRect;
    if (!rect) return null;
    const pad = 6;
    return {
      top: Math.max(8, rect.top - pad),
      left: Math.max(8, rect.left - pad),
      width: rect.width + pad * 2,
      height: rect.height + pad * 2,
    };
  });

  readonly cardTop = computed(() => {
    const rect = this.tour.state()?.targetRect;
    if (!rect) return 96;
    const below = rect.bottom + 12;
    if (below + 180 < window.innerHeight) return below;
    return Math.max(16, rect.top - 190);
  });

  readonly cardLeft = computed(() => {
    const rect = this.tour.state()?.targetRect;
    if (!rect) return Math.max(16, window.innerWidth - 380);
    return Math.min(Math.max(16, rect.left), window.innerWidth - 360);
  });
}
