export const environment = {
  production: true,
  apiUrl: 'https://api-homolog.gestgo.com.br',
  errorHub: {
    enabled: true,
    apiUrl: 'https://api-errorhub.zionai.com.br/api/v1/events',
    apiKey: 'ek_live_36fe4e60513f189042e19b1acc44b275',
    environment: 'production' as const,
  },
};
