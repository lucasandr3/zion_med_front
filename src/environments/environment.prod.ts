export const environment = {
  production: true,
  apiUrl: 'https://api.gestgo.com.br',
  /** Base canônica do SPA para /f/:token e links compartilháveis. */
  appUrl: 'https://app.gestgo.com.br',
  /**
   * Após migrar o painel para painel.gestgo.com.br, apontar aqui.
   * Enquanto o SPA completo viver em app., deixar vazio (mesmo origin) e usar /m.
   */
  painelUrl: '',
  mobileAppUrl: 'https://app.gestgo.com.br/m',
  /** Só ativar quando app. for exclusivo do mobile e o painel estiver em outro host. */
  mobileHosts: [] as string[],
  painelHosts: [] as string[],
  errorHub: {
    // Chave injetada no CI/CD (nunca commitar ek_live_*). Sem chave = desabilitado.
    enabled: false,
    apiUrl: 'https://api-errorhub.zionai.com.br/api/v1/events',
    apiKey: '',
    environment: 'production' as const,
  },
};
