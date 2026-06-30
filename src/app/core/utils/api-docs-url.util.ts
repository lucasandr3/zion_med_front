import { environment } from '../../../environments/environment';

/** URL da documentação Scramble (UI interativa). */
export function scrambleDocsUiUrl(): string {
  return `${environment.apiUrl.replace(/\/$/, '')}/docs/api`;
}

/** URL do OpenAPI JSON exportado pelo Scramble. */
export function scrambleOpenApiJsonUrl(): string {
  return `${environment.apiUrl.replace(/\/$/, '')}/docs/api.json`;
}
