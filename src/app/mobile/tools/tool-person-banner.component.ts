import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

/** Chip de contexto quando o utilitário foi aberto a partir de uma pessoa. */
@Component({
  selector: 'app-tool-person-banner',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (nome) {
      <div class="ft-person" [class.ft-person--mobile]="mobile">
        <span class="material-symbols-outlined gestgo-mi gestgo-mi--s" aria-hidden="true">person</span>
        <div class="ft-person__text">
          <strong>{{ nome }}</strong>
          @if (phone) {
            <small>{{ phone }}</small>
          } @else {
            <small>Proposta e WhatsApp vinculados a esta pessoa</small>
          }
        </div>
      </div>
    }
  `,
  styles: [
    `
      .ft-person {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        margin-bottom: 1rem;
        padding: 0.75rem 0.9rem;
        border: 1px solid var(--border, #e2e8f0);
        border-radius: 0.75rem;
        background: color-mix(in srgb, var(--c-primary, #00877A) 8%, transparent);
      }
      .ft-person--mobile {
        margin: 0 0 12px;
        border-radius: 14px;
      }
      .ft-person .material-symbols-outlined {
        color: var(--c-primary, #00877A);
      }
      .ft-person__text {
        display: flex;
        flex-direction: column;
        gap: 0.1rem;
        min-width: 0;
      }
      .ft-person__text strong {
        font-size: 0.875rem;
        font-weight: 600;
        line-height: 1.3;
      }
      .ft-person__text small {
        font-size: 0.75rem;
        color: var(--muted-foreground, #64748b);
      }
    `,
  ],
})
export class ToolPersonBannerComponent {
  @Input() nome = '';
  @Input() phone = '';
  @Input() mobile = false;
}
