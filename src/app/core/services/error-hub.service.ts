import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';
import {
  ErrorHubEvent,
  ErrorHubLevel,
  ErrorHubReportOptions,
} from './error-hub.types';
import { sanitizeErrorHubPayload } from '../utils/error-hub-sanitize';
import {
  getErrorMessage,
  getErrorStack,
  getExceptionName,
  parseStackFrame,
} from '../utils/error-hub-stack';
import { isBillingBlockedError } from '../utils/billing-blocked-error';

export const ERROR_HUB_FEATURE = 'Gestgo Front';

@Injectable({ providedIn: 'root' })
export class ErrorHubService {
  private auth = inject(AuthService);
  private router = inject(Router);

  private readonly config = environment.errorHub;
  private recentFingerprints = new Map<string, number>();
  private unhandledRejectionRegistered = false;

  constructor() {
    this.registerUnhandledRejectionListener();
  }

  report(options: ErrorHubReportOptions): void {
    if (!this.isEnabled()) return;

    const error = options.error;
    const stack = getErrorStack(error);
    const { file, line } = parseStackFrame(stack);
    const org = this.auth.getCurrentOrganization();

    const payload: ErrorHubEvent = {
      environment: this.config.environment,
      level: options.level ?? this.inferLevel(error),
      message: getErrorMessage(error).slice(0, 2000),
      exception: getExceptionName(error),
      file: file ?? this.resolveFallbackFile(),
      line: line ?? 1,
      trace: stack.slice(0, 8000),
      business_title: options.business_title,
      business_context: {
        feature: ERROR_HUB_FEATURE,
        customer_id: org ? String(org.id) : undefined,
        customer_name: org?.name,
        route: this.router.url,
        ...options.business_context,
      },
      user: this.buildUserContext(),
    };

    this.send(payload);
  }

  reportRuntimeError(error: unknown, options?: Omit<ErrorHubReportOptions, 'error'>): void {
    this.report({
      error,
      business_title: options?.business_title ?? 'Erro não tratado na aplicação',
      business_context: options?.business_context,
      level: options?.level,
    });
  }

  reportHttpError(
    err: HttpErrorResponse,
    req: HttpRequest<unknown>,
    options?: Omit<ErrorHubReportOptions, 'error'>,
  ): void {
    if (!this.shouldReportHttpError(err, req.url)) return;

    const backendTrace =
      typeof err.error === 'object' && err.error !== null && 'trace' in err.error
        ? String((err.error as { trace: unknown }).trace)
        : '';

    const payload = this.buildHttpPayload(err, req, backendTrace, options);
    this.send(payload);
  }

  private buildHttpPayload(
    err: HttpErrorResponse,
    req: HttpRequest<unknown>,
    backendTrace: string,
    options?: Omit<ErrorHubReportOptions, 'error'>,
  ): ErrorHubEvent {
    const org = this.auth.getCurrentOrganization();
    const stack = backendTrace || getErrorStack(err.error ?? err);

    const requestUrl = this.normalizeRequestUrl(req.url);

    return {
      environment: this.config.environment,
      level: options?.level ?? (err.status >= 500 ? 'critical' : 'high'),
      message: this.extractHttpMessage(err).slice(0, 2000),
      exception: 'HttpErrorResponse',
      file: requestUrl,
      line: err.status >= 1 ? err.status : 1,
      trace: stack.slice(0, 8000),
      business_title: options?.business_title ?? 'Falha na requisição HTTP',
      business_context: {
        feature: ERROR_HUB_FEATURE,
        action: `${req.method} ${requestUrl}`,
        customer_id: org ? String(org.id) : undefined,
        customer_name: org?.name,
        route: this.router.url,
        status: err.status,
        ...options?.business_context,
      },
      request: {
        method: req.method,
        url: requestUrl,
        payload: sanitizeErrorHubPayload(req.body),
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
      },
      user: this.buildUserContext(),
    };
  }

  private send(payload: ErrorHubEvent): void {
    if (!this.isEnabled()) return;

    const fingerprint = `${payload.level}:${payload.message}:${payload.trace.slice(0, 200)}`;
    if (this.isDuplicate(fingerprint)) return;

    void fetch(this.config.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.config.apiKey}`,
      },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {});
  }

  private shouldReportHttpError(err: HttpErrorResponse, url: string): boolean {
    if (!this.isEnabled()) return false;
    if (url.includes('api-errorhub.zionai.com.br')) return false;
    if (err.status === 401) return false;
    if (isBillingBlockedError(err)) return false;
    if (err.status === 0) return true;
    if (err.status >= 500) return true;
    if (err.status === 422) return false;
    return err.status >= 400;
  }

  private isEnabled(): boolean {
    return Boolean(this.config?.enabled && this.config.apiKey && this.config.apiUrl);
  }

  private isDuplicate(fingerprint: string): boolean {
    const now = Date.now();
    const last = this.recentFingerprints.get(fingerprint);
    if (last != null && now - last < 3000) return true;
    this.recentFingerprints.set(fingerprint, now);
    return false;
  }

  private inferLevel(error: unknown): ErrorHubLevel {
    if (error instanceof HttpErrorResponse) {
      return error.status >= 500 ? 'critical' : 'high';
    }
    return 'critical';
  }

  private resolveFallbackFile(): string {
    if (typeof window !== 'undefined' && window.location.pathname) {
      return window.location.pathname;
    }
    return 'unknown';
  }

  private extractHttpMessage(err: HttpErrorResponse): string {
    if (typeof err.error === 'string' && err.error.trim()) return err.error;
    if (err.error && typeof err.error === 'object') {
      const body = err.error as Record<string, unknown>;
      const message = body['message'];
      const nestedError = body['error'];
      if (typeof message === 'string' && message.trim()) return message;
      if (typeof nestedError === 'string' && nestedError.trim()) return nestedError;
    }
    return err.message || `HTTP ${err.status || 0}`;
  }

  private normalizeRequestUrl(url: string): string {
    try {
      const parsed = new URL(url, environment.apiUrl);
      return `${parsed.pathname}${parsed.search}`;
    } catch {
      return url;
    }
  }

  private buildUserContext(): ErrorHubEvent['user'] {
    const user = this.auth.getUser();
    if (!user) return undefined;
    return {
      id: String(user.id),
      name: user.name,
      email: user.email,
    };
  }

  private registerUnhandledRejectionListener(): void {
    if (this.unhandledRejectionRegistered || typeof window === 'undefined') return;
    this.unhandledRejectionRegistered = true;

    window.addEventListener('unhandledrejection', (event) => {
      this.reportRuntimeError(event.reason, {
        business_title: 'Promise rejeitada sem tratamento',
      });
    });
  }
}
