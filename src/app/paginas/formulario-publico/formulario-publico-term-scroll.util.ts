import { FormularioPublicoField } from '../../core/services/formulario-publico.service';
import { fieldType } from './formulario-publico-field.util';

export const TERM_SCROLL_THRESHOLD_PX = 48;

export function hasNoticeFields(fields: FormularioPublicoField[]): boolean {
  return fields.some((f) => fieldType(f) === 'notice');
}

export function noticeFieldKeys(fields: FormularioPublicoField[]): string[] {
  return fields.filter((f) => fieldType(f) === 'notice').map((f) => f.name_key);
}

export function isElementScrolledToBottom(element: HTMLElement, thresholdPx = TERM_SCROLL_THRESHOLD_PX): boolean {
  const { scrollTop, clientHeight, scrollHeight } = element;
  return scrollTop + clientHeight >= scrollHeight - thresholdPx;
}

export function elementNeedsVerticalScroll(element: HTMLElement, thresholdPx = 4): boolean {
  return element.scrollHeight > element.clientHeight + thresholdPx;
}

export function allNoticesScrolled(noticeKeys: string[], scrollState: Record<string, boolean>): boolean {
  if (noticeKeys.length === 0) return true;
  return noticeKeys.every((key) => scrollState[key] === true);
}
