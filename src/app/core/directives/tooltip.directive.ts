import {
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DOCUMENT } from '@angular/common';

const TOOLTIP_ID = 'global-tooltip';
const SHOW_DELAY_MS = 400;
const HIDE_DELAY_MS = 50;

@Directive({
  selector: '[appTooltip]',
  standalone: true,
})
export class TooltipDirective implements OnInit, OnDestroy {
  @Input() appTooltip = '';

  private el = inject(ElementRef<HTMLElement>);
  private doc = inject(DOCUMENT);
  private platformId = inject(PLATFORM_ID);

  private tooltipEl: HTMLElement | null = null;
  private showTimer: ReturnType<typeof setTimeout> | null = null;
  private hideTimer: ReturnType<typeof setTimeout> | null = null;

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId) || !this.appTooltip?.trim()) return;

    const host = this.el.nativeElement;
    host.addEventListener('mouseenter', this.onEnter);
    host.addEventListener('mouseleave', this.onLeave);
    host.addEventListener('focus', this.onEnter);
    host.addEventListener('blur', this.onLeave);
  }

  ngOnDestroy(): void {
    this.clearTimers();
    const host = this.el.nativeElement;
    host.removeEventListener('mouseenter', this.onEnter);
    host.removeEventListener('mouseleave', this.onLeave);
    host.removeEventListener('focus', this.onEnter);
    host.removeEventListener('blur', this.onLeave);
    this.hide();
  }

  private onEnter = (): void => {
    this.clearTimers();
    this.hideTimer = setTimeout(() => this.show(), SHOW_DELAY_MS);
  };

  private onLeave = (): void => {
    this.clearTimers();
    this.hideTimer = setTimeout(() => this.hide(), HIDE_DELAY_MS);
  };

  private clearTimers(): void {
    if (this.showTimer) {
      clearTimeout(this.showTimer);
      this.showTimer = null;
    }
    if (this.hideTimer) {
      clearTimeout(this.hideTimer);
      this.hideTimer = null;
    }
  }

  private getOrCreateTooltip(): HTMLElement {
    let el = this.doc.getElementById(TOOLTIP_ID);
    if (!el) {
      el = this.doc.createElement('div');
      el.id = TOOLTIP_ID;
      el.setAttribute('role', 'tooltip');
      el.setAttribute('aria-hidden', 'true');
      this.doc.body.appendChild(el);
    }
    this.tooltipEl = el;
    return el;
  }

  private show(): void {
    const text = (this.appTooltip ?? '').trim();
    if (!text) return;

    const tip = this.getOrCreateTooltip();
    tip.textContent = text;
    tip.style.visibility = 'hidden';
    tip.classList.add('is-visible');
    if (!tip.parentElement) {
      this.doc.body.appendChild(tip);
    }

    const hostRect = this.el.nativeElement.getBoundingClientRect();
    const rect = tip.getBoundingClientRect();
    const gap = 6;
    let left = hostRect.left + (hostRect.width - rect.width) / 2;
    let top = hostRect.bottom + gap;

    const maxLeft = this.doc.documentElement.clientWidth - rect.width - 8;
    const minLeft = 8;
    left = Math.max(minLeft, Math.min(maxLeft, left));

    if (top + rect.height > this.doc.documentElement.clientHeight - 8) {
      top = hostRect.top - rect.height - gap;
    }
    top = Math.max(8, top);

    tip.style.left = `${left}px`;
    tip.style.top = `${top}px`;
    tip.style.visibility = '';
  }

  private hide(): void {
    this.tooltipEl?.classList.remove('is-visible');
  }
}
