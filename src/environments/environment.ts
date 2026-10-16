export const environment = {
  production: false,
  apiUrl: 'http://localhost:8000',
  /** Base do SPA para links públicos; vazio = usar window.location.origin. */
  appUrl: '',
  errorHub: {
    enabled: false,
    apiUrl: 'https://api-errorhub.zionai.com.br/api/v1/events',
    apiKey: '',
    environment: 'development' as const,
  },
};
