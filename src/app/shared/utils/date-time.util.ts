/** Converte `YYYY-MM-DD` (API) → `Date` local (meio-dia evita timezone). */
export function parseYmdToDate(value: string | Date | null | undefined): Date | null {
  if (value == null || value === '') return null;
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value;
  }
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(value).trim());
  if (!m) return null;
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]), 12, 0, 0, 0);
  return Number.isNaN(d.getTime()) ? null : d;
}

/** Converte `Date` → `YYYY-MM-DD` para API. */
export function formatDateToYmd(value: Date | string | null | undefined): string {
  if (value == null || value === '') return '';
  if (typeof value === 'string') {
    const m = /^(\d{4}-\d{2}-\d{2})/.exec(value.trim());
    if (m) return m[1];
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) return '';
    return formatDateToYmd(parsed);
  }
  const y = value.getFullYear();
  const mo = String(value.getMonth() + 1).padStart(2, '0');
  const d = String(value.getDate()).padStart(2, '0');
  return `${y}-${mo}-${d}`;
}

/** Converte `HH:mm` → `Date` (hoje + horário). */
export function parseHmToDate(value: string | Date | null | undefined): Date | null {
  if (value == null || value === '') return null;
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value;
  }
  const m = /^(\d{1,2}):(\d{2})/.exec(String(value).trim());
  if (!m) return null;
  const d = new Date();
  d.setHours(Number(m[1]), Number(m[2]), 0, 0);
  return d;
}

/** Converte `Date` → `HH:mm`. */
export function formatDateToHm(value: Date | string | null | undefined): string {
  if (value == null || value === '') return '';
  if (typeof value === 'string') {
    const m = /^(\d{1,2}):(\d{2})/.exec(value.trim());
    if (m) return `${m[1].padStart(2, '0')}:${m[2]}`;
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) return '';
    return formatDateToHm(parsed);
  }
  const h = String(value.getHours()).padStart(2, '0');
  const min = String(value.getMinutes()).padStart(2, '0');
  return `${h}:${min}`;
}
