const STORAGE_PREFIX = 'gestgo-public-form-qr:v1:';

const QR_OPTIONS = {
  width: 512,
  margin: 2,
  color: { dark: '#0d1410', light: '#ffffff' },
} as const;

function storageKey(publicUrl: string): string {
  return `${STORAGE_PREFIX}${publicUrl}`;
}

async function generateQrDataUrl(publicUrl: string): Promise<string> {
  const QRCode = await import('qrcode');
  const qrFn = QRCode.toDataURL ?? QRCode.default?.toDataURL;
  if (!qrFn) {
    throw new Error('QR indisponível');
  }
  const fn = qrFn.bind(QRCode.default ?? QRCode);
  return fn(publicUrl, QR_OPTIONS);
}

/** Gera ou recupera do cache local o QR do formulário público. */
export async function getOrCreatePublicFormQrDataUrl(publicUrl: string): Promise<string> {
  if (typeof window === 'undefined' || !publicUrl) {
    throw new Error('URL inválida');
  }

  const key = storageKey(publicUrl);
  try {
    const cached = localStorage.getItem(key);
    if (cached?.startsWith('data:image/')) {
      return cached;
    }
  } catch {
    /* quota / modo privado — segue sem cache persistente */
  }

  const dataUrl = await generateQrDataUrl(publicUrl);

  try {
    localStorage.setItem(key, dataUrl);
  } catch {
    /* ignora falha de persistência */
  }

  return dataUrl;
}

/** Pré-gera QR em segundo plano (não bloqueia a UI). */
export function prefetchPublicFormQr(publicUrl: string): void {
  if (!publicUrl) return;
  void getOrCreatePublicFormQrDataUrl(publicUrl).catch(() => undefined);
}

/** Baixa o PNG do QR code no dispositivo do usuário. */
export function downloadPublicFormQrPng(dataUrl: string, fileBaseName: string): void {
  if (typeof document === 'undefined' || !dataUrl) return;

  const slug = fileBaseName
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();

  const anchor = document.createElement('a');
  anchor.href = dataUrl;
  anchor.download = `${slug || 'formulario'}-qr-code.png`;
  anchor.rel = 'noopener';
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
}
