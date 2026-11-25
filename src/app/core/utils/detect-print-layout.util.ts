import { newPlacementUid, type PrintLayoutKind, type PrintLayoutPlacement } from './print-layout.util';

/** Sugestão determinística (PDF-01B) — distinta de placement aprovado. */
export interface PrintLayoutSuggestion {
  temporary_id: string;
  label: string;
  name_key: string;
  kind: PrintLayoutKind;
  page: number;
  x: number;
  y: number;
  w: number;
  h: number;
  confidence: number;
  source: 'acroform' | 'pdf_text' | 'pdf_line' | 'pdf_vision' | 'pdf_ai' | 'pdf_field_match';
  needs_review: true;
}

/** Campos digitais do modelo usados na correspondência assistida (PDF-01C). */
export interface KnownTemplateField {
  name_key: string;
  label: string;
  type?: string;
}

export interface DetectPrintLayoutResult {
  mode: 'acroform' | 'text' | 'mixed' | 'scanned' | 'empty' | 'ai_disabled' | 'ai_unavailable';
  page_count: number;
  has_text: boolean;
  suggestions: PrintLayoutSuggestion[];
  message: string;
}

type PdfJsPageLike = {
  getViewport: (opts: { scale: number }) => { width: number; height: number };
  getTextContent: () => Promise<{ items: Array<{ str?: string; transform?: number[]; width?: number; height?: number }> }>;
  getAnnotations: () => Promise<Array<Record<string, unknown>>>;
};

type PdfJsDocLike = {
  numPages: number;
  getPage: (n: number) => Promise<PdfJsPageLike>;
};

/**
 * Detecção determinística no browser (pdf.js): AcroForm/widgets + rótulos de texto.
 * Não envia PDF a provedores externos.
 */
export async function detectPrintLayoutSuggestions(
  pdfDoc: PdfJsDocLike,
): Promise<DetectPrintLayoutResult> {
  const suggestions: PrintLayoutSuggestion[] = [];
  let hasText = false;
  let hasAcro = false;

  for (let pageIndex = 0; pageIndex < pdfDoc.numPages; pageIndex++) {
    const page = await pdfDoc.getPage(pageIndex + 1);
    const viewport = page.getViewport({ scale: 1 });
    const pageW = Math.max(1, viewport.width);
    const pageH = Math.max(1, viewport.height);

    const annotations = await page.getAnnotations().catch(() => []);
    for (const ann of annotations) {
      const subtype = String(ann['subtype'] || ann['SubType'] || '');
      if (subtype !== 'Widget') continue;
      const rect = ann['rect'] as number[] | undefined;
      if (!Array.isArray(rect) || rect.length < 4) continue;
      hasAcro = true;
      const box = pdfRectToNorm(rect, pageW, pageH);
      if (box.w < 0.01 || box.h < 0.006) continue;
      const fieldName = String(ann['fieldName'] || ann['alternativeText'] || `campo_${suggestions.length + 1}`);
      const fieldType = String(ann['fieldType'] || ann['ft'] || '');
      const kind = inferKindFromAcro(fieldType, fieldName);
      suggestions.push({
        temporary_id: `sug-${newPlacementUid()}`,
        label: humanizeKey(fieldName),
        name_key: sanitizeNameKey(fieldName),
        kind,
        page: pageIndex,
        ...box,
        confidence: 0.95,
        source: 'acroform',
        needs_review: true,
      });
    }

    const textContent = await page.getTextContent().catch(() => ({ items: [] }));
    const items = (textContent.items || [])
      .map((it) => {
        const str = String(it.str || '').trim();
        const t = it.transform || [];
        const x = Number(t[4] ?? 0);
        const y = Number(t[5] ?? 0);
        const w = Number(it.width ?? 0);
        const h = Math.abs(Number(t[3] ?? it.height ?? 10)) || 10;
        return { str, x, y, w, h };
      })
      .filter((it) => it.str.length > 0);

    if (items.length > 8) hasText = true;

    for (const item of items) {
      const label = item.str;
      if (!looksLikeFieldLabel(label)) continue;
      const box = textLabelToInputBox(item, pageW, pageH);
      if (!box) continue;
      suggestions.push({
        temporary_id: `sug-${newPlacementUid()}`,
        label: cleanLabel(label),
        name_key: sanitizeNameKey(cleanLabel(label)),
        kind: inferKindFromLabel(label),
        page: pageIndex,
        ...box,
        confidence: 0.62,
        source: label.includes('_') ? 'pdf_line' : 'pdf_text',
        needs_review: true,
      });
    }
  }

  const deduped = dedupeSuggestions(suggestions);
  let mode: DetectPrintLayoutResult['mode'] = 'empty';
  if (hasAcro && hasText) mode = 'mixed';
  else if (hasAcro) mode = 'acroform';
  else if (hasText) mode = 'text';
  else mode = 'scanned';

  let message = 'Nenhuma sugestão encontrada. Continue o mapeamento manual.';
  if (mode === 'scanned') {
    message =
      'PDF sem texto pesquisável (provável escaneado). A detecção automática fica limitada — mapeie manualmente ou use OCR/IA depois.';
  } else if (deduped.length > 0) {
    message = `${deduped.length} sugestão(ões) encontradas. Revise e aceite as que fizerem sentido.`;
  }

  return {
    mode,
    page_count: pdfDoc.numPages,
    has_text: hasText,
    suggestions: deduped.slice(0, 120),
    message,
  };
}

export function suggestionToPlacement(s: PrintLayoutSuggestion): PrintLayoutPlacement {
  return {
    name_key: s.name_key,
    uid: newPlacementUid(),
    page: s.page,
    x: s.x,
    y: s.y,
    w: s.w,
    h: s.h,
    kind: s.kind,
    align: 'left',
    font_size: s.kind === 'checkbox' ? 10 : 9,
  };
}

/** Normaliza payload do endpoint `/print-layout/detect` para o contrato do editor. */
export function normalizeApiDetectResult(raw: {
  mode?: string;
  page_count?: number;
  has_text?: boolean;
  message?: string;
  suggestions?: Array<Record<string, unknown>>;
}): DetectPrintLayoutResult {
  const suggestions: PrintLayoutSuggestion[] = [];
  for (const item of raw.suggestions || []) {
    const kindRaw = String(item['kind'] || 'text');
    const kind: PrintLayoutKind =
      kindRaw === 'checkbox' || kindRaw === 'signature' || kindRaw === 'image' ? kindRaw : 'text';
    const sourceRaw = String(item['source'] || 'acroform');
    const source: PrintLayoutSuggestion['source'] =
      sourceRaw === 'pdf_text' ||
      sourceRaw === 'pdf_line' ||
      sourceRaw === 'pdf_vision' ||
      sourceRaw === 'pdf_ai' ||
      sourceRaw === 'pdf_field_match'
        ? sourceRaw
        : 'acroform';
    const label = String(item['label'] || item['name_key'] || 'Campo');
    suggestions.push({
      temporary_id: String(item['temporary_id'] || `sug-${newPlacementUid()}`),
      label,
      name_key: sanitizeNameKey(String(item['name_key'] || label)),
      kind,
      page: Math.max(0, Math.floor(Number(item['page'] ?? 0))),
      x: clamp01(Number(item['x'] ?? 0)),
      y: clamp01(Number(item['y'] ?? 0)),
      w: Math.max(0.01, Math.min(1, Number(item['w'] ?? 0.2))),
      h: Math.max(0.008, Math.min(1, Number(item['h'] ?? 0.03))),
      confidence: Math.min(1, Math.max(0, Number(item['confidence'] ?? 0.9))),
      source,
      needs_review: true,
    });
  }
  const modeRaw = String(raw.mode || 'empty');
  const mode: DetectPrintLayoutResult['mode'] =
    modeRaw === 'acroform' ||
    modeRaw === 'text' ||
    modeRaw === 'mixed' ||
    modeRaw === 'scanned' ||
    modeRaw === 'empty' ||
    modeRaw === 'ai_disabled' ||
    modeRaw === 'ai_unavailable'
      ? modeRaw
      : 'empty';
  return {
    mode,
    page_count: Number(raw.page_count ?? 0),
    has_text: Boolean(raw.has_text),
    message: String(raw.message || 'Detecção concluída.'),
    suggestions: dedupeSuggestions(suggestions).slice(0, 120),
  };
}

/** Une sugestões locais e da API, priorizando maior confiança / AcroForm. */
export function mergeDetectResults(
  local: DetectPrintLayoutResult,
  remote: DetectPrintLayoutResult | null,
): DetectPrintLayoutResult {
  if (!remote || remote.suggestions.length === 0) return local;
  if (local.suggestions.length === 0) return remote;
  const merged = dedupeSuggestions([...local.suggestions, ...remote.suggestions]);
  const hasAcro = merged.some((s) => s.source === 'acroform');
  const hasText = local.has_text || remote.has_text;
  let mode: DetectPrintLayoutResult['mode'] = 'empty';
  if (hasAcro && hasText) mode = 'mixed';
  else if (hasAcro) mode = 'acroform';
  else if (hasText) mode = 'text';
  else mode = local.mode === 'scanned' || remote.mode === 'scanned' ? 'scanned' : 'empty';
  return {
    mode,
    page_count: Math.max(local.page_count, remote.page_count),
    has_text: hasText,
    suggestions: merged.slice(0, 120),
    message:
      merged.length > 0
        ? `${merged.length} sugestão(ões) encontradas. Revise e aceite as que fizerem sentido.`
        : local.message || remote.message,
  };
}

/**
 * PDF-01C (sem provedor externo) — localiza no PDF os rótulos dos campos já
 * definidos no modelo e propõe caixas à direita (exige revisão humana).
 */
export async function suggestFromKnownFields(
  pdfDoc: PdfJsDocLike,
  fields: KnownTemplateField[],
): Promise<PrintLayoutSuggestion[]> {
  const usable = fields.filter((f) => {
    const key = (f.name_key || '').trim();
    const label = (f.label || '').trim();
    if (!key || !label) return false;
    const type = (f.type || '').toLowerCase();
    return !['heading', 'notice', 'section_break', 'page_break', 'step_break', 'file'].includes(type);
  });
  if (!usable.length) return [];

  const out: PrintLayoutSuggestion[] = [];
  const usedKeys = new Set<string>();

  for (let pageIndex = 0; pageIndex < pdfDoc.numPages; pageIndex++) {
    const page = await pdfDoc.getPage(pageIndex + 1);
    const viewport = page.getViewport({ scale: 1 });
    const pageW = Math.max(1, viewport.width);
    const pageH = Math.max(1, viewport.height);
    const textContent = await page.getTextContent().catch(() => ({ items: [] }));
    const items = (textContent.items || [])
      .map((it) => {
        const str = String(it.str || '').trim();
        const t = it.transform || [];
        return {
          str,
          x: Number(t[4] ?? 0),
          y: Number(t[5] ?? 0),
          w: Number(it.width ?? 0),
          h: Math.abs(Number(t[3] ?? it.height ?? 10)) || 10,
        };
      })
      .filter((it) => it.str.length > 1);

    for (const field of usable) {
      if (usedKeys.has(field.name_key)) continue;
      const match = findBestTextMatch(items, field.label, field.name_key);
      if (!match) continue;
      const box = textLabelToInputBox(match, pageW, pageH) ?? {
        x: clamp01((match.x + match.w + 4) / pageW),
        y: clamp01((pageH - match.y - match.h) / pageH),
        w: 0.28,
        h: Math.max(0.018, Math.min(0.04, (match.h * 1.35) / pageH)),
      };
      if (box.x + box.w > 0.99) box.w = Math.max(0.08, 0.99 - box.x);
      out.push({
        temporary_id: `sug-${newPlacementUid()}`,
        label: field.label.trim(),
        name_key: field.name_key,
        kind: inferPlacementKindFromFieldType(field.type),
        page: pageIndex,
        ...box,
        confidence: match.score >= 0.92 ? 0.82 : 0.68,
        source: 'pdf_field_match',
        needs_review: true,
      });
      usedKeys.add(field.name_key);
    }
  }

  return dedupeSuggestions(out).slice(0, 80);
}

function findBestTextMatch(
  items: Array<{ str: string; x: number; y: number; w: number; h: number }>,
  label: string,
  nameKey: string,
): ({ str: string; x: number; y: number; w: number; h: number; score: number }) | null {
  const targetLabel = normalizeMatch(label);
  const targetKey = normalizeMatch(nameKey.replace(/_/g, ' '));
  if (targetLabel.length < 2) return null;

  let best: { item: (typeof items)[number]; score: number } | null = null;
  for (const item of items) {
    const raw = cleanLabel(item.str);
    const norm = normalizeMatch(raw);
    if (norm.length < 2) continue;
    let score = 0;
    if (norm === targetLabel) score = 1;
    else if (norm.includes(targetLabel) || targetLabel.includes(norm)) score = 0.9;
    else if (targetKey && (norm === targetKey || norm.includes(targetKey))) score = 0.85;
    else continue;
    // Prefer labels that look like form prompts
    if (item.str.trim().endsWith(':') || item.str.trim().endsWith('：')) score += 0.05;
    if (!best || score > best.score) best = { item, score };
  }
  if (!best || best.score < 0.85) return null;
  return { ...best.item, score: best.score };
}

function normalizeMatch(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[:：]+$/u, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function inferPlacementKindFromFieldType(type: string | undefined): PrintLayoutKind {
  const t = (type || '').toLowerCase();
  if (t === 'checkbox' || t === 'radio') return 'checkbox';
  if (t === 'signature') return 'signature';
  return 'text';
}

function pdfRectToNorm(rect: number[], pageW: number, pageH: number): {
  x: number;
  y: number;
  w: number;
  h: number;
} {
  const x1 = Math.min(rect[0], rect[2]);
  const x2 = Math.max(rect[0], rect[2]);
  const y1 = Math.min(rect[1], rect[3]);
  const y2 = Math.max(rect[1], rect[3]);
  // PDF origin = bottom-left → editor top-left
  const x = x1 / pageW;
  const w = (x2 - x1) / pageW;
  const h = (y2 - y1) / pageH;
  const y = 1 - y2 / pageH;
  return {
    x: clamp01(x),
    y: clamp01(y),
    w: Math.max(0.01, Math.min(1, w)),
    h: Math.max(0.008, Math.min(1, h)),
  };
}

function textLabelToInputBox(
  item: { str: string; x: number; y: number; w: number; h: number },
  pageW: number,
  pageH: number,
): { x: number; y: number; w: number; h: number } | null {
  const label = item.str;
  // PDF text y is baseline from bottom
  const topY = pageH - item.y - item.h;
  let x = (item.x + item.w + 4) / pageW;
  let y = topY / pageH;
  let w = 0.28;
  let h = Math.max(0.018, Math.min(0.04, (item.h * 1.35) / pageH));

  if (/_{3,}/.test(label) || /…{2,}|\.{4,}/.test(label)) {
    x = item.x / pageW;
    w = Math.max(0.12, Math.min(0.55, item.w / pageW));
  } else if (label.endsWith(':') || label.endsWith('：')) {
    w = Math.max(0.18, Math.min(0.45, 1 - x - 0.04));
  } else {
    return null;
  }

  if (x + w > 0.98) w = Math.max(0.08, 0.98 - x);
  if (y < 0 || y > 0.98 || w < 0.08) return null;
  return {
    x: clamp01(x),
    y: clamp01(y),
    w: Math.min(1, w),
    h: Math.min(1, h),
  };
}

function looksLikeFieldLabel(raw: string): boolean {
  const s = raw.trim();
  if (s.length < 2 || s.length > 64) return false;
  if (/_{3,}/.test(s) || /…{2,}|\.{4,}/.test(s)) return true;
  if (!(s.endsWith(':') || s.endsWith('：'))) return false;
  if (/^\d+[:.)]/.test(s)) return false;
  return /[A-Za-zÀ-ÿ]/.test(s);
}

function cleanLabel(raw: string): string {
  return raw
    .replace(/[:：]+\s*$/u, '')
    .replace(/[_….]{2,}/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function sanitizeNameKey(label: string): string {
  const base = label
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, 48);
  return base || `campo_${Date.now().toString(36)}`;
}

function humanizeKey(key: string): string {
  return key.replace(/[_./]+/g, ' ').replace(/\s+/g, ' ').trim() || key;
}

function inferKindFromAcro(fieldType: string, name: string): PrintLayoutKind {
  const t = fieldType.toLowerCase();
  const n = name.toLowerCase();
  if (t.includes('btn') || t.includes('check') || n.includes('check') || n.includes('aceite')) {
    return 'checkbox';
  }
  if (t.includes('sig') || n.includes('assin') || n.includes('signature')) return 'signature';
  return 'text';
}

function inferKindFromLabel(label: string): PrintLayoutKind {
  const n = label.toLowerCase();
  if (/assinatura|rubrica|signature/.test(n)) return 'signature';
  if (/^\s*[\[\(]?\s*[x×_]?\s*[\]\)]?\s*$/i.test(label) || /checkbox|concordo|aceite|li e/.test(n)) {
    return 'checkbox';
  }
  return 'text';
}

function dedupeSuggestions(list: PrintLayoutSuggestion[]): PrintLayoutSuggestion[] {
  const out: PrintLayoutSuggestion[] = [];
  for (const s of list) {
    const overlap = out.some(
      (o) =>
        o.page === s.page &&
        Math.abs(o.x - s.x) < 0.03 &&
        Math.abs(o.y - s.y) < 0.02 &&
        Math.abs(o.w - s.w) < 0.08,
    );
    if (!overlap) out.push(s);
  }
  // Prefer acroform over text when similar
  return out.sort((a, b) => b.confidence - a.confidence);
}

function clamp01(n: number): number {
  return Math.min(1, Math.max(0, n));
}
