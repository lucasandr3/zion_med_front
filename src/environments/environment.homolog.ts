export const environment = {
  production: true,
  apiUrl: 'https://api-homolog.gestgo.com.br',
  errorHub: {
    // Chave injetada no CI/CD (nunca commitar ek_live_*). Sem chave = desabilitado.
    enabled: false,
    apiUrl: 'https://api-errorhub.zionai.com.br/api/v1/events',
    apiKey: '',
    environment: 'production' as const,
  },
};
