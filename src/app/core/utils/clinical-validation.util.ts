import { HttpErrorResponse } from '@angular/common/http';
import type { ClinicalValidationIssue } from '../services/templates.service';

function isIssueLike(value: unknown): value is ClinicalValidationIssue {
  if (!value || typeof value !== 'object') return false;
  const v = value as Record<string, unknown>;
  const message = v['message'];
  return typeof message === 'string' && message.trim().length > 0;
}

function normalizeIssues(raw: unknown[]): ClinicalValidationIssue[] {
  return raw.filter(isIssueLike).map((item) => {
    const level = item['level'];
    const code = item['code'];
    const message = item['message'];
    return {
      level: level === 'warning' ? 'warning' : 'error',
      code: typeof code === 'string' ? code : '',
      message: String(message).trim(),
    };
  });
}

/** Extrai issues de validação clínica de respostas 4xx (vários formatos da API). */
export function extractClinicalValidationIssues(err: unknown): ClinicalValidationIssue[] {
  const body =
    err instanceof HttpErrorResponse
      ? err.error
      : err && typeof err === 'object' && 'error' in err
        ? (err as { error: unknown }).error
        : err;

  if (Array.isArray(body)) {
    return normalizeIssues(body);
  }

  if (!body || typeof body !== 'object') {
    return [];
  }

  const obj = body as Record<string, unknown>;
  const candidates: unknown[] = [
    obj['clinical_validation'],
    obj['issues'],
    obj['errors'],
  ];

  const data = obj['data'];
  if (data && typeof data === 'object') {
    const d = data as Record<string, unknown>;
    candidates.push(d['clinical_validation'], d['issues'], d['errors']);
  }

  for (const candidate of candidates) {
    if (Array.isArray(candidate) && candidate.some(isIssueLike)) {
      return normalizeIssues(candidate);
    }
  }

  return [];
}

export function formatClinicalValidationMessage(issues: ClinicalValidationIssue[]): string {
  if (!issues.length) return '';
  return issues
    .map((i) => (i.level === 'warning' ? `• Aviso: ${i.message}` : `• ${i.message}`))
    .join('\n\n');
}

export function extractApiErrorMessage(err: unknown, fallback: string): string {
  const body =
    err instanceof HttpErrorResponse
      ? err.error
      : err && typeof err === 'object' && 'error' in err
        ? (err as { error: unknown }).error
        : err;

  if (typeof body === 'string' && body.trim()) return body.trim();
  if (body && typeof body === 'object') {
    const msg = (body as Record<string, unknown>)['message'];
    if (typeof msg === 'string' && msg.trim()) return msg.trim();
  }
  return fallback;
}
