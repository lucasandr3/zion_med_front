import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage } from 'pdf-lib';
import type { PrintLayout, PrintLayoutPlacement } from './print-layout.util';

export interface FillSourcePdfFieldValue {
  name_key: string;
  text?: string;
  checked?: boolean;
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
      if (value.checked) drawCheckmark(page, placement);
      continue;
    }

    if ((kind === 'signature' || kind === 'image') && value.imageBytes?.length) {
      await drawImage(pdfDoc, page, placement, value.imageBytes, value.imageMime || 'png');
      continue;
    }

    const text = (value.text || '').trim();
    if (!text) continue;
    drawTextInBox(page, font, placement, text);
  }

  const out = await pdfDoc.save();
  const ab = new ArrayBuffer(out.byteLength);
  new Uint8Array(ab).set(out);
  return new Blob([ab], { type: 'application/pdf' });
}

function pageBox(page: PDFPage, placement: PrintLayoutPlacement) {
  const { width, height } = page.getSize();
  const boxW = placement.w * width;
  const boxH = placement.h * height;
  const x = placement.x * width;
  // UI usa origem no topo; pdf-lib no canto inferior esquerdo
  const yBottom = height - placement.y * height - boxH;
  return { x, yBottom, boxW, boxH, pageHeight: height };
}

function drawTextInBox(page: PDFPage, font: PDFFont, placement: PrintLayoutPlacement, text: string): void {
  const { x, yBottom, boxW, boxH } = pageBox(page, placement);
  const fontSize = placement.font_size ?? Math.max(8, Math.min(14, boxH * 0.7));
  const maxWidth = Math.max(8, boxW - 2);
  const lines = wrapText(text, font, fontSize, maxWidth);
  const lineHeight = fontSize * 1.2;
  const totalH = lines.length * lineHeight;
  let cursorY = yBottom + boxH - fontSize - 1;
  if (totalH < boxH) {
    // alinha no topo da caixa
    cursorY = yBottom + boxH - fontSize - 1;
  }

  for (const line of lines) {
    if (cursorY < yBottom - 2) break;
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
      maxWidth,
    });
    cursorY -= lineHeight;
  }
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

export async function fetchImageBytes(url: string): Promise<{ bytes: Uint8Array; mime: 'png' | 'jpg' } | null> {
  try {
    const res = await fetch(url, { credentials: 'include' });
    if (!res.ok) return null;
    const buf = new Uint8Array(await res.arrayBuffer());
    const ct = (res.headers.get('content-type') || '').toLowerCase();
    if (ct.includes('jpeg') || ct.includes('jpg') || url.toLowerCase().includes('.jpg')) {
      return { bytes: buf, mime: 'jpg' };
    }
    return { bytes: buf, mime: 'png' };
  } catch {
    return null;
  }
}
