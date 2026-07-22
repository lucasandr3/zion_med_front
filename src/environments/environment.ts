export const environment = {
  production: false,
  apiUrl: 'http://localhost:8000',
  errorHub: {
    enabled: false,
    apiUrl: 'https://api-errorhub.zionai.com.br/api/v1/events',
    apiKey: '',
    environment: 'development' as const,
  },
};
