import { Component, OnDestroy, inject, signal } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { filter, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'zm-top-progress-bar',
  standalone: true,
  template: `
    @if (active() || fadeOut()) {
      <div
        class="zm-top-progress-host"
        [class.zm-top-progress-host--fade]="fadeOut()"
        role="progressbar"
        [attr.aria-valuenow]="Math.round(widthPct())"
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <div class="zm-top-progress-bar" [style.width.%]="widthPct()"></div>
      </div>
    }
  `,
  styleUrl: './top-progress-bar.component.scss',
})
export class ZmTopProgressBarComponent implements OnDestroy {
  private router = inject(Router);
  private destroy$ = new Subject<void>();

  protected readonly Math = Math;

  active = signal(false);
  fadeOut = signal(false);
  widthPct = signal(0);

  private creepTimer: ReturnType<typeof setInterval> | null = null;
  private hideTimer: ReturnType<typeof setTimeout> | null = null;
  private completeTimer: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    this.router.events
      .pipe(
        takeUntil(this.destroy$),
        filter(
          (e: Event): e is NavigationStart | NavigationEnd | NavigationCancel | NavigationError =>
            e instanceof NavigationStart ||
            e instanceof NavigationEnd ||
            e instanceof NavigationCancel ||
            e instanceof NavigationError,
        ),
      )
      .subscribe((e) => {
        if (e instanceof NavigationStart) {
          this.onNavStart();
        } else {
          this.onNavFinish();
        }
      });
  }

  private clearTimers(): void {
    if (this.creepTimer !== null) {
      clearInterval(this.creepTimer);
      this.creepTimer = null;
    }
    if (this.hideTimer !== null) {
      clearTimeout(this.hideTimer);
      this.hideTimer = null;
    }
    if (this.completeTimer !== null) {
      clearTimeout(this.completeTimer);
      this.completeTimer = null;
    }
  }

  private onNavStart(): void {
    this.clearTimers();
    this.fadeOut.set(false);
    this.active.set(true);
    this.widthPct.set(15);

    this.creepTimer = setInterval(() => {
      const w = this.widthPct();
      if (w >= 85) return;
      const delta = 3 + Math.random() * 8;
      this.widthPct.set(Math.min(85, w + delta));
    }, 280);
  }

  private onNavFinish(): void {
    if (!this.active()) return;
    if (this.creepTimer !== null) {
      clearInterval(this.creepTimer);
      this.creepTimer = null;
    }
    this.widthPct.set(100);

    this.completeTimer = setTimeout(() => {
      this.fadeOut.set(true);
      this.hideTimer = setTimeout(() => {
        this.active.set(false);
        this.fadeOut.set(false);
        this.widthPct.set(0);
      }, 380);
    }, 160);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.clearTimers();
  }
}
