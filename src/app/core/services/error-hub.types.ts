export type ErrorHubLevel = 'critical' | 'high' | 'medium' | 'low' | 'info';

export interface ErrorHubBusinessContext {
  feature?: string;
  action?: string;
  customer_id?: string;
  customer_name?: string;
  route?: string;
  component?: string;
  [key: string]: unknown;
}

export interface ErrorHubRequestContext {
  method: string;
  url: string;
  payload: unknown;
  userAgent: string;
}

export interface ErrorHubUserContext {
  id: string;
  name: string;
  email: string;
}

export interface ErrorHubEvent {
  environment: string;
  level: ErrorHubLevel;
  message: string;
  exception: string;
  file: string;
  line: number;
  trace: string;
  business_title?: string;
  business_context?: ErrorHubBusinessContext;
  request?: ErrorHubRequestContext;
  user?: ErrorHubUserContext;
}

export interface ErrorHubReportOptions {
  error: unknown;
  level?: ErrorHubLevel;
  business_title?: string;
  business_context?: ErrorHubBusinessContext;
}
