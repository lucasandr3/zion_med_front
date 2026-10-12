import {
  buildRecepcaoTotemUrl,
  isTotemQueryParam,
} from './link-bio-public-url.util';

describe('link-bio-public-url.util', () => {
  it('monta URL totem com query param', () => {
    expect(buildRecepcaoTotemUrl('https://app.test/l/clinica')).toBe(
      'https://app.test/l/clinica?totem=1',
    );
  });

  it('substitui kiosk legado por totem', () => {
    expect(buildRecepcaoTotemUrl('https://app.test/l/clinica?kiosk=1')).toBe(
      'https://app.test/l/clinica?totem=1',
    );
  });

  it('reconhece totem e kiosk legado', () => {
    expect(isTotemQueryParam((k) => (k === 'totem' ? '1' : null))).toBe(true);
    expect(isTotemQueryParam((k) => (k === 'kiosk' ? '1' : null))).toBe(true);
    expect(isTotemQueryParam(() => null)).toBe(false);
  });
});
