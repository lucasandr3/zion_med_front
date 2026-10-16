/**
 * Formatação de datas para exibição em pt-BR (dd/mm/aaaa).
 * Datas só com dia (`YYYY-MM-DD`) são convertidas sem deslocar fuso.
 */

const ISO_DATE_ONLY = /^(\d{4})-(\d{2})-(\d{2})$/;
const ISO_DATE_PREFIX = /^(\d{4})-(\d{2})-(\d{2})(?:[T\s]|$)/;
const BR_DATE_PREFIX = /^\d{2}\/\d{2}\/\d{4}/;

export type FormatarDataBrOpts = {
  /** Inclui hora (dd/mm/aaaa HH:mm). */
  withTime?: boolean;
};

/** Formata data/hora para o padrão brasileiro. */
export function formatarDataBr(
  valor: string | Date | null | undefined,
  opts: FormatarDataBrOpts = {},
): string {
  if (valor == null || valor === '') return '';

  if (valor instanceof Date) {
    if (Number.isNaN(valor.getTime())) return '';
    return opts.withTime ? formatDateTimeLocal(valor) : formatDateLocal(valor);
  }

  const s = String(valor).trim();
  if (!s) return '';
  if (BR_DATE_PREFIX.test(s)) return opts.withTime ? s : s.slice(0, 10);

  const only = ISO_DATE_ONLY.exec(s);
  if (only) {
    return `${only[3]}/${only[2]}/${only[1]}`;
  }

  const prefix = ISO_DATE_PREFIX.exec(s);
  if (prefix) {
    const rest = s.slice(10);
    const midnight = !rest || /^[T\s]00:00:00/.test(rest);
    if (!opts.withTime || midnight) {
      return `${prefix[3]}/${prefix[2]}/${prefix[1]}`;
    }
  }

  const d = new Date(s);
  if (Number.isNaN(d.getTime())) return s;
  return opts.withTime ? formatDateTimeLocal(d) : formatDateLocal(d);
}

/** Atalho para dd/mm/aaaa HH:mm. */
export function formatarDataHoraBr(valor: string | Date | null | undefined): string {
  return formatarDataBr(valor, { withTime: true });
}

/**
 * Se o valor inteiro for uma data ISO (com ou sem hora), formata em pt-BR.
 * Caso contrário devolve o texto original.
 */
export function formatarSeDataIso(valor: string): string {
  const t = valor.trim();
  if (!t) return valor;
  if (ISO_DATE_ONLY.test(t) || ISO_DATE_PREFIX.test(t)) {
    return formatarDataBr(t);
  }
  return valor;
}

function formatDateLocal(d: Date): string {
  return d.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

function formatDateTimeLocal(d: Date): string {
  return d.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
