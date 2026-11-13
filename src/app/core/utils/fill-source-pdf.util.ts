import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage } from 'pdf-lib';
import {
  extractDatePart,
  isDatePartOption,
  normalizeOptionValue,
  type PrintLayout,
  type PrintLayoutPlacement,
} from './print-layout.util';

export interface FillSourcePdfFieldValue {
  name_key: string;
  text?: string;
  /** Checkbox booleano (sem opções). */
  checked?: boolean;
  /** Opções selecionadas (radio/checkbox múltiplo), já normalizadas ou brutas. */
  selected_options?: string[];
  /** Data URL ou bytes de PNG/JPEG (assinatura). */
  imageBytes?: Uint8Array;
  imageMime?: 'png' | 'jpg';
}

export interface FillSourcePdfInput {
  sourcePdfBytes: ArrayBuffer | Uint8Array;
  layout: PrintLayout;
  values: FillSourcePdfFieldValue[];
}

/**
 * Gera PDF preenchido usando o PDF original da clínica como fundo
 * e as áreas mapeadas em `print_layout`.
 */
export async function fillSourcePdf(input: FillSourcePdfInput): Promise<Blob> {
  const bytes =
    input.sourcePdfBytes instanceof Uint8Array
      ? input.sourcePdfBytes
      : new Uint8Array(input.sourcePdfBytes);

  const pdfDoc = await PDFDocument.load(bytes, { ignoreEncryption: true });
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const pages = pdfDoc.getPages();
  const byKey = new Map(input.values.map((v) => [v.name_key, v]));

  for (const placement of input.layout.placements) {
    const page = pages[placement.page];
    if (!page) continue;
    const value = byKey.get(placement.name_key);
    if (!value) continue;

    const kind = placement.kind || 'text';

    if (kind === 'checkbox') {
      const option = (placement.option ?? '').trim();
      if (option) {
        const selected = (value.selected_options || []).map(normalizeOptionValue);
        if (selected.includes(normalizeOptionValue(option))) {
          drawCheckmark(page, placement);
        }
      } else if (value.checked) {
        drawCheckmark(page, placement);
      }
      continue;
    }

    // Assinatura/imagem: usa bytes mesmo se kind veio como text por mapeamento antigo
    if (value.imageBytes?.length && (kind === 'signature' || kind === 'image' || !value.text)) {
      await drawImage(pdfDoc, page, placement, value.imageBytes, value.imageMime || 'png');
      continue;
    }

    const text = resolvePlacementText(value, placement);
    if (!text) continue;
    drawTextInBox(page, font, placement, text);
  }

  const out = await pdfDoc.save();
  const ab = new ArrayBuffer(out.byteLength);
  new Uint8Array(ab).set(out);
  return new Blob([ab], { type: 'application/pdf' });
}

function resolvePlacementText(
  value: FillSourcePdfFieldValue,
  placement: PrintLayoutPlacement,
): string {
  const raw = (value.text || '').trim();
  if (!raw) return '';
  const opt = (placement.option ?? '').trim();
  if (isDatePartOption(opt)) {
    return extractDatePart(raw, opt);
  }
  return raw;
}

function pageBox(page: PDFPage, placement: PrintLayoutPlacement) {
  const { width, height } = page.getSize();
  const boxW = placement.w * width;
  const boxH = placement.h * height;
  const x = placement.x * width;
  const yBottom = height - placement.y * height - boxH;
  return { x, yBottom, boxW, boxH, pageHeight: height };
}

/**
 * Desenha texto cabendo na caixa: reduz fonte em vez de quebrar no meio
 * (evita datas tipo 12/11/2026 virarem "1" + "2/11/2026").
 */
function drawTextInBox(page: PDFPage, font: PDFFont, placement: PrintLayoutPlacement, text: string): void {
  const { x, yBottom, boxW, boxH } = pageBox(page, placement);
  const maxWidth = Math.max(6, boxW - 2);
  const preferred = placement.font_size ?? Math.max(8, Math.min(12, boxH * 0.65));
  const singleLine = !/\s/.test(text) || text.length <= 24 || isDatePartOption(placement.option);

  if (singleLine) {
    const fontSize = fitFontSize(text, font, maxWidth, boxH, preferred);
    const lineWidth = font.widthOfTextAtSize(text, fontSize);
    let drawX = x + 1;
    if (placement.align === 'center') drawX = x + (boxW - lineWidth) / 2;
    if (placement.align === 'right') drawX = x + boxW - lineWidth - 1;
    const drawY = yBottom + (boxH - fontSize) / 2;
    page.drawText(text, {
      x: Math.max(0, drawX),
      y: Math.max(yBottom, drawY),
      size: fontSize,
      font,
      color: rgb(0.06, 0.09, 0.16),
    });
    return;
  }

  let fontSize = preferred;
  let lines = wrapText(text, font, fontSize, maxWidth);
  while (fontSize > 6 && lines.length * fontSize * 1.2 > boxH) {
    fontSize -= 0.5;
    lines = wrapText(text, font, fontSize, maxWidth);
  }
  while (fontSize > 6) {
    const tooWide = lines.some((ln) => font.widthOfTextAtSize(ln, fontSize) > maxWidth + 0.5);
    if (!tooWide) break;
    fontSize -= 0.5;
    lines = wrapText(text, font, fontSize, maxWidth);
  }

  const lineHeight = fontSize * 1.2;
  let cursorY = yBottom + boxH - fontSize - 1;
  for (const line of lines) {
    if (cursorY < yBottom - 1) break;
    const lineWidth = font.widthOfTextAtSize(line, fontSize);
    let drawX = x + 1;
    if (placement.align === 'center') drawX = x + (boxW - lineWidth) / 2;
    if (placement.align === 'right') drawX = x + boxW - lineWidth - 1;
    page.drawText(line, {
      x: Math.max(0, drawX),
      y: cursorY,
      size: fontSize,
      font,
      color: rgb(0.06, 0.09, 0.16),
    });
    cursorY -= lineHeight;
  }
}

function fitFontSize(
  text: string,
  font: PDFFont,
  maxWidth: number,
  maxHeight: number,
  preferred: number,
): number {
  let size = preferred;
  while (size > 6 && font.widthOfTextAtSize(text, size) > maxWidth) {
    size -= 0.5;
  }
  while (size > 6 && size > maxHeight * 0.95) {
    size -= 0.5;
  }
  return size;
}

function drawCheckmark(page: PDFPage, placement: PrintLayoutPlacement): void {
  const { x, yBottom, boxW, boxH } = pageBox(page, placement);
  const size = Math.min(boxW, boxH);
  const pad = size * 0.15;
  const left = x + pad;
  const bottom = yBottom + pad;
  const right = x + size - pad;
  const top = yBottom + size - pad;
  const midX = left + (right - left) * 0.35;
  const midY = bottom + (top - bottom) * 0.15;

  page.drawLine({
    start: { x: left, y: midY + (top - bottom) * 0.35 },
    end: { x: midX, y: midY },
    thickness: Math.max(1.2, size * 0.08),
    color: rgb(0.06, 0.09, 0.16),
  });
  page.drawLine({
    start: { x: midX, y: midY },
    end: { x: right, y: top },
    thickness: Math.max(1.2, size * 0.08),
    color: rgb(0.06, 0.09, 0.16),
  });
}

async function drawImage(
  pdfDoc: PDFDocument,
  page: PDFPage,
  placement: PrintLayoutPlacement,
  imageBytes: Uint8Array,
  mime: 'png' | 'jpg',
): Promise<void> {
  const { x, yBottom, boxW, boxH } = pageBox(page, placement);
  const image =
    mime === 'jpg' ? await pdfDoc.embedJpg(imageBytes) : await pdfDoc.embedPng(imageBytes);
  const iw = image.width;
  const ih = image.height;
  const scale = Math.min(boxW / iw, boxH / ih);
  const drawW = iw * scale;
  const drawH = ih * scale;
  const drawX = x + (boxW - drawW) / 2;
  const drawY = yBottom + (boxH - drawH) / 2;
  page.drawImage(image, { x: drawX, y: drawY, width: drawW, height: drawH });
}

function wrapText(text: string, font: PDFFont, fontSize: number, maxWidth: number): string[] {
  const normalized = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  const paragraphs = normalized.split('\n');
  const lines: string[] = [];

  for (const paragraph of paragraphs) {
    const words = paragraph.split(/\s+/).filter(Boolean);
    if (words.length === 0) {
      lines.push('');
      continue;
    }
    let current = '';
    for (const word of words) {
      const next = current ? `${current} ${word}` : word;
      if (font.widthOfTextAtSize(next, fontSize) <= maxWidth) {
        current = next;
      } else {
        if (current) lines.push(current);
        current = word;
      }
    }
    if (current) lines.push(current);
  }

  return lines.length ? lines : [''];
}

function dataUrlToBytes(dataUrl: string): { bytes: Uint8Array; mime: 'png' | 'jpg' } | null {
  const m = /^data:(image\/(?:png|jpe?g));base64,(.+)$/i.exec(dataUrl.trim());
  if (!m) return null;
  const mime: 'png' | 'jpg' = /jpe?g/i.test(m[1]!) ? 'jpg' : 'png';
  try {
    const bin = atob(m[2]!);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return { bytes, mime };
  } catch {
    return null;
  }
}

function sniffMime(bytes: Uint8Array, hint?: string | null, url?: string): 'png' | 'jpg' {
  if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return 'jpg';
  const h = (hint || '').toLowerCase();
  if (h.includes('jpeg') || h.includes('jpg')) return 'jpg';
  if ((url || '').toLowerCase().includes('.jpg') || (url || '').toLowerCase().includes('.jpeg')) return 'jpg';
  return 'png';
}

async function fetchBytesOnce(
  url: string,
  credentials: RequestCredentials,
): Promise<{ bytes: Uint8Array; mime: 'png' | 'jpg' } | null> {
  const res = await fetch(url, { credentials, mode: 'cors' });
  if (!res.ok) return null;
  const buf = new Uint8Array(await res.arrayBuffer());
  if (!buf.length) return null;
  return { bytes: buf, mime: sniffMime(buf, res.headers.get('content-type'), url) };
}

/** Fallback quando o MinIO não envia CORS no fetch, mas libera no <img>. */
async function imageElementToBytes(url: string): Promise<{ bytes: Uint8Array; mime: 'png' | 'jpg' } | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    const timer = window.setTimeout(() => {
      img.src = '';
      resolve(null);
    }, 12000);
    img.onload = () => {
      window.clearTimeout(timer);
      try {
        const canvas = document.createElement('canvas');
        canvas.width = Math.max(1, img.naturalWidth || img.width);
        canvas.height = Math.max(1, img.naturalHeight || img.height);
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(null);
          return;
        }
        ctx.drawImage(img, 0, 0);
        const dataUrl = canvas.toDataURL('image/png');
        resolve(dataUrlToBytes(dataUrl));
      } catch {
        resolve(null);
      }
    };
    img.onerror = () => {
      window.clearTimeout(timer);
      resolve(null);
    };
    img.src = url;
  });
}

/**
 * Baixa bytes de imagem para embutir no PDF.
 * URLs assinadas do MinIO costumam falhar com credentials:include — tenta omit + canvas.
 */
export async function fetchImageBytes(url: string): Promise<{ bytes: Uint8Array; mime: 'png' | 'jpg' } | null> {
  const trimmed = (url || '').trim();
  if (!trimmed) return null;

  if (trimmed.startsWith('data:')) {
    return dataUrlToBytes(trimmed);
  }

  const absolute = /^https?:\/\//i.test(trimmed);
  const attempts: RequestCredentials[] = absolute ? ['omit', 'include'] : ['include', 'omit'];

  for (const cred of attempts) {
    try {
      const got = await fetchBytesOnce(trimmed, cred);
      if (got) return got;
    } catch {
      // tenta próxima estratégia
    }
  }

  try {
    return await imageElementToBytes(trimmed);
  } catch {
    return null;
  }
}
