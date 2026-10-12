import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  inject,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { resolveSidebarLogoSrc } from '../../../core/utils/sidebar-logo.util';

/** Marca oficial Gestgo (PNG do sistema) — troca com o tema / preset tinted. */
@Component({
  selector: 'zm-gestgo-brand-mark',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <img
      class="gestgo-brand-mark"
      [src]="src()"
      alt=""
      aria-hidden="true"
      draggable="false"
    />
  `,
  styles: `
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      block-size: 100%;
      inline-size: 100%;
      line-height: 0;
    }

    .gestgo-brand-mark {
      display: block;
      block-size: 100%;
      inline-size: 100%;
      object-fit: contain;
    }
  `,
})
export class GestgoBrandMarkComponent implements OnInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly auth = inject(AuthService, { optional: true });
  private appearanceSub?: Subscription;

  /** `white` usa logo-white.png (painéis verdes / fundos escuros). */
  @Input() variant: 'theme' | 'white' = 'theme';

  readonly src = signal('/assets/logo/logo.png');

  ngOnInit(): void {
    this.refresh();
    if (!isPlatformBrowser(this.platformId) || !this.auth) return;
    this.appearanceSub = this.auth.appearanceApplied$.subscribe(() => this.refresh());
  }

  ngOnDestroy(): void {
    this.appearanceSub?.unsubscribe();
  }

  private refresh(): void {
    if (this.variant === 'white') {
      this.src.set('/assets/logo/logo-white.png');
      return;
    }
    if (!isPlatformBrowser(this.platformId)) return;
    this.src.set(resolveSidebarLogoSrc());
  }
}
