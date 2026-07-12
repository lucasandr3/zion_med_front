const LARGE_TEXT_STORAGE_KEY = 'gestgo_form_large_text';

export function fpRestoreLargeTextPreference(): boolean {
  try {
    return localStorage.getItem(LARGE_TEXT_STORAGE_KEY) === '1';
  } catch {
    return false;
  }
}

export function fpPersistLargeTextPreference(enabled: boolean): void {
  try {
    localStorage.setItem(LARGE_TEXT_STORAGE_KEY, enabled ? '1' : '0');
  } catch {
    /* ignore */
  }
}

export function fpApplyLargeTextClass(enabled: boolean): void {
  if (typeof document === 'undefined' || !document.body) {
    return;
  }
  document.body.classList.toggle('gestgo-fp-large-text', enabled);
}

export function fpPrefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) {
    return false;
  }
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function fpFocusElement(element: HTMLElement | null | undefined, delayMs = 0): void {
  if (!element || typeof document === 'undefined') {
    return;
  }
  const run = (): void => {
    if (!element.isConnected) {
      return;
    }
    if (!element.hasAttribute('tabindex')) {
      element.setAttribute('tabindex', '-1');
    }
    element.focus({ preventScroll: true });
  };
  if (delayMs > 0) {
    window.setTimeout(run, delayMs);
    return;
  }
  queueMicrotask(run);
}

export function fpAnnounceLiveRegion(message: string, liveRegionId = 'fp-a11y-live'): void {
  if (typeof document === 'undefined') {
    return;
  }
  let region = document.getElementById(liveRegionId);
  if (!region) {
    region = document.createElement('div');
    region.id = liveRegionId;
    region.setAttribute('role', 'status');
    region.setAttribute('aria-live', 'polite');
    region.setAttribute('aria-atomic', 'true');
    region.className = 'fp-visually-hidden';
    document.body.appendChild(region);
  }
  region.textContent = '';
  window.setTimeout(() => {
    region!.textContent = message;
  }, 30);
}

export function fpBuildTypedSignatureValue(fullName: string): string {
  const trimmed = fullName.trim();
  if (!trimmed) {
    return '';
  }
  return `typed:${trimmed}`;
}

export function fpIsTypedSignatureValue(value: unknown): boolean {
  return typeof value === 'string' && value.startsWith('typed:');
}

export function fpTypedSignatureDisplay(value: string): string {
  return value.replace(/^typed:/, '').trim();
}

export function fpSignatureIsFilled(value: unknown): boolean {
  if (typeof value !== 'string') {
    return false;
  }
  const trimmed = value.trim();
  if (trimmed.startsWith('typed:')) {
    return fpTypedSignatureDisplay(trimmed).length >= 3;
  }
  return trimmed.length > 80;
}
