import {
  buildHeaderMetaLinha,
  buildRecepcaoKioskUrl,
  resolvePublicUrlForBrowser,
} from './link-bio-public-url.util';

describe('link-bio-public-url.util', () => {
  it('monta URL kiosk com query param', () => {
    expect(buildRecepcaoKioskUrl('https://app.test/l/clinica')).toBe('https://app.test/l/clinica?kiosk=1');
  });

  it('monta meta do header com visitas e cliques', () => {
    const meta = buildHeaderMetaLinha({
      visitas_hoje: 3,
      total_clicks_last_30: 12,
    } as never);
    expect(meta).toBe('3 visitas hoje · 12 cliques');
  });

  it('resolve URL no browser quando slug existe', () => {
    const url = resolvePublicUrlForBrowser('https://other.test/l/x', 'clinica', false);
    expect(url).toBe('https://other.test/l/x');
  });
});
