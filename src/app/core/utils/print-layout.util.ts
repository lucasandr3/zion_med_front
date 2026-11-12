/** Mapa de aparência: posições das respostas sobre o PDF original da clínica. */

export type PrintLayoutAlign = 'left' | 'center' | 'right';
export type PrintLayoutKind = 'text' | 'checkbox' | 'signature' | 'image';

export interface PrintLayoutPlacement {
  name_key: string;
  /** Página 0-based. */
  page: number;
  /** Coordenadas normalizadas (0–1) a partir do canto superior esquerdo. */
  x: number;
  y: number;
  w: number;
  h: number;
  font_size?: number;
  align?: PrintLayoutAlign;
  kind?: PrintLayoutKind;
}

export interface PrintLayout {
  version: 1;
  placements: PrintLayoutPlacement[];
}

export function emptyPrintLayout(): PrintLayout {
  return { version: 1, placements: [] };
}

export function parsePrintLayout(raw: unknown): PrintLayout | null {
  if (!raw || typeof raw !== 'object') return null;
  const rec = raw as Record<string, unknown>;
  const placementsRaw = rec['placements'];
  if (!Array.isArray(placementsRaw)) return null;

  const placements: PrintLayoutPlacement[] = [];
  for (const item of placementsRaw) {
    if (!item || typeof item !== 'object') continue;
    const p = item as Record<string, unknown>;
    const name_key = typeof p['name_key'] === 'string' ? p['name_key'].trim() : '';
    if (!name_key) continue;
    const page = Number(p['page']);
    const x = Number(p['x']);
    const y = Number(p['y']);
    const w = Number(p['w']);
    const h = Number(p['h']);
    if (![page, x, y, w, h].every((n) => Number.isFinite(n))) continue;
    if (page < 0 || w <= 0 || h <= 0) continue;

    const kindRaw = typeof p['kind'] === 'string' ? p['kind'] : 'text';
    const kind: PrintLayoutKind =
      kindRaw === 'checkbox' || kindRaw === 'signature' || kindRaw === 'image' ? kindRaw : 'text';
    const alignRaw = typeof p['align'] === 'string' ? p['align'] : 'left';
    const align: PrintLayoutAlign =
      alignRaw === 'center' || alignRaw === 'right' ? alignRaw : 'left';
    const font_size = Number(p['font_size']);

    placements.push({
      name_key,
      page: Math.floor(page),
      x: clamp01(x),
      y: clamp01(y),
      w: clamp01(Math.max(0.005, w)),
      h: clamp01(Math.max(0.005, h)),
      font_size: Number.isFinite(font_size) ? Math.min(48, Math.max(6, font_size)) : undefined,
      align,
      kind,
    });
  }

  return { version: 1, placements };
}

export function hasUsablePrintLayout(layout: PrintLayout | null | undefined): boolean {
  return !!layout && Array.isArray(layout.placements) && layout.placements.length > 0;
}

export function inferPlacementKind(fieldType: string | null | undefined): PrintLayoutKind {
  const t = (fieldType || '').toLowerCase();
  if (t === 'signature') return 'signature';
  if (t === 'checkbox') return 'checkbox';
  if (t === 'file') return 'image';
  return 'text';
}

function clamp01(n: number): number {
  return Math.min(1, Math.max(0, n));
}
