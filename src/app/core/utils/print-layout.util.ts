/** Mapa de aparência: posições das respostas sobre o PDF original da clínica. */

export type PrintLayoutAlign = 'left' | 'center' | 'right';
export type PrintLayoutKind = 'text' | 'checkbox' | 'signature' | 'image';

export interface PrintLayoutPlacement {
  name_key: string;
  /**
   * Para radio/checkbox: marca só se a resposta for esta opção.
   * Para date: `day` | `month` | `month_name` | `year` (preenche só essa parte).
   * Sem option = área do campo inteiro (texto ou checkbox booleano).
   */
  option?: string | null;
  /** Identifica uma caixa específica (permite repetir Dia/Mês/Ano em vários pontos do PDF). */
  uid?: string;
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

export interface PrintLayoutTarget {
  name_key: string;
  option?: string | null;
}

/** Extras opcionais (não vêm dos campos do formulário). */
export const SYSTEM_PRINT_TARGETS: Array<{
  name_key: string;
  label: string;
  hint: string;
  kind: PrintLayoutKind;
}> = [
  {
    name_key: '__clinic_logo',
    label: 'Logo da clínica',
    hint: 'Opcional · carimbo/logo no PDF',
    kind: 'image',
  },
  {
    name_key: '__clinic_signature',
    label: 'Assinatura da clínica',
    hint: 'Opcional · assinatura eletrônica do profissional (Conta) ou co-assinatura do protocolo',
    kind: 'signature',
  },
  {
    name_key: '__verify_qr',
    label: 'QR de verificação',
    hint: 'Opcional · QR Code do link /verificar (autenticidade)',
    kind: 'image',
  },
  {
    name_key: '__verify_code',
    label: 'Código de verificação',
    hint: 'Opcional · código curto (8 caracteres) do documento',
    kind: 'text',
  },
];

export function isSystemPrintTarget(nameKey: string): boolean {
  return nameKey.startsWith('__');
}

export function emptyPrintLayout(): PrintLayout {
  return { version: 1, placements: [] };
}

export function placementIdentity(p: PrintLayoutTarget): string {
  const opt = (p.option ?? '').trim();
  return opt ? `${p.name_key}::${opt}` : p.name_key;
}

export function samePlacement(a: PrintLayoutTarget, b: PrintLayoutTarget): boolean {
  return a.name_key === b.name_key && (a.option ?? '').trim() === (b.option ?? '').trim();
}

/** Mesma caixa física (uid); fallback legado por chave+posição. */
export function samePlacementBox(
  a: Pick<PrintLayoutPlacement, 'uid' | 'name_key' | 'option' | 'page' | 'x' | 'y' | 'w' | 'h'>,
  b: Pick<PrintLayoutPlacement, 'uid' | 'name_key' | 'option' | 'page' | 'x' | 'y' | 'w' | 'h'>,
): boolean {
  if (a.uid && b.uid) return a.uid === b.uid;
  return (
    samePlacement(a, b) &&
    a.page === b.page &&
    Math.abs(a.x - b.x) < 1e-6 &&
    Math.abs(a.y - b.y) < 1e-6 &&
    Math.abs(a.w - b.w) < 1e-6 &&
    Math.abs(a.h - b.h) < 1e-6
  );
}

export function newPlacementUid(): string {
  return `p_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 9)}`;
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
    const optionRaw = p['option'];
    const option =
      typeof optionRaw === 'string' && optionRaw.trim() !== '' ? optionRaw.trim() : null;
    const uidRaw = p['uid'];
    const uid =
      typeof uidRaw === 'string' && uidRaw.trim() !== '' ? uidRaw.trim() : newPlacementUid();

    placements.push({
      name_key,
      option,
      uid,
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

export function inferPlacementKind(
  fieldType: string | null | undefined,
  hasOption = false,
): PrintLayoutKind {
  const t = (fieldType || '').toLowerCase();
  if (t === 'signature') return 'signature';
  if (t === 'file') return 'image';
  // Opção específica → ✓ ; sem opção em rádio/select → texto da resposta (“Casado”)
  if (hasOption && (t === 'checkbox' || t === 'radio' || t === 'select')) return 'checkbox';
  if (t === 'checkbox' && !hasOption) return 'checkbox';
  return 'text';
}

export function normalizeOptionValue(value: string | null | undefined): string {
  return String(value ?? '')
    .trim()
    .toLowerCase();
}

export type DatePartOption = 'day' | 'month' | 'month_name' | 'year';

/** Partes de data — dá para mapear a mesma parte várias vezes (ex.: ___/___/____ e “São Paulo, __ de ____ de ____”). */
export const DATE_PART_TARGETS: Array<{ option: DatePartOption; label: string }> = [
  { option: 'day', label: 'Dia' },
  { option: 'month', label: 'Mês (número)' },
  { option: 'month_name', label: 'Mês (extenso)' },
  { option: 'year', label: 'Ano' },
];

const MONTH_NAMES_PT = [
  'janeiro',
  'fevereiro',
  'março',
  'abril',
  'maio',
  'junho',
  'julho',
  'agosto',
  'setembro',
  'outubro',
  'novembro',
  'dezembro',
] as const;

export function isDatePartOption(option: string | null | undefined): option is DatePartOption {
  const o = (option || '').trim().toLowerCase();
  return o === 'day' || o === 'month' || o === 'month_name' || o === 'year';
}

/** Extrai dia/mês/ano (ou mês por extenso) de texto BR (dd/mm/aaaa) ou ISO (aaaa-mm-dd). */
export function extractDatePart(text: string, part: DatePartOption): string {
  const raw = String(text || '').trim();
  if (!raw) return '';

  let day = '';
  let month = '';
  let year = '';

  const br = /^(\d{1,2})[\/\-.](\d{1,2})[\/\-.](\d{2,4})$/.exec(raw);
  if (br) {
    day = br[1]!.padStart(2, '0');
    month = br[2]!.padStart(2, '0');
    year = br[3]!;
    if (year.length === 2) year = `20${year}`;
  } else {
    const iso = /^(\d{4})-(\d{2})-(\d{2})/.exec(raw);
    if (iso) {
      year = iso[1]!;
      month = iso[2]!;
      day = iso[3]!;
    }
  }

  if (!day || !month || !year) return '';
  if (part === 'day') return day;
  if (part === 'month') return month;
  if (part === 'year') return year;
  const idx = Number(month) - 1;
  return MONTH_NAMES_PT[idx] ?? '';
}

function clamp01(n: number): number {
  return Math.min(1, Math.max(0, n));
}
