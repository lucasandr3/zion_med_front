import { environment } from '../../../environments/environment';

function apiOrigin(): string {
  return environment.apiUrl.replace(/\/$/, '');
}

/** Base REST usada pelos tokens de integração (`/api/v1`). */
export function apiV1BaseUrl(): string {
  return `${apiOrigin()}/api/v1`;
}

/** URL da documentação Scramble (UI interativa). */
export function scrambleDocsUiUrl(): string {
  return `${apiOrigin()}/docs/api`;
}

/** URL do OpenAPI JSON exportado pelo Scramble. */
export function scrambleOpenApiJsonUrl(): string {
  return `${apiOrigin()}/docs/api.json`;
}
