export const environment = {
  production: true,
  apiUrl: 'https://api-homolog.gestgo.com.br',
  errorHub: {
    enabled: true,
    apiUrl: 'https://api-errorhub.zionai.com.br/api/v1/events',
    apiKey: 'ek_live_d363ba2ab74edc029ab59420a078eacd',
    environment: 'production' as const,
  },
};
