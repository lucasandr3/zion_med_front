export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080',
  /** Base do SPA para links públicos; vazio = usar window.location.origin. */
  appUrl: '',
  /** Painel completo (mesmo origin em dev). */
  painelUrl: '',
  /** Experiência mobile — path /m no mesmo origin até migrar DNS. */
  mobileAppUrl: '',
  /** Liga/desliga a experiência Gestgo Mobile (`/m`). */
  mobileExperienceEnabled: true,
  /** PDF-01C — detecção assistida (front). Backend: PRINT_LAYOUT_AI_ENABLED + OpenAI. */
  printLayoutAiEnabled: false,
  /** Hosts que forçam experiência mobile (vazio até painel. estar no ar). */
  mobileHosts: [] as string[],
  painelHosts: [] as string[],
  errorHub: {
    enabled: false,
    apiUrl: 'https://api-errorhub.zionai.com.br/api/v1/events',
    apiKey: '',
    environment: 'development' as const,
  },
};
