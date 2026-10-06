export interface ShellTema {
  key: string;
  label: string;
  labelPt: string;
  color: string;
}

export const TEMAS: ShellTema[] = [
  { key: 'gestgo-blue', label: 'Royal blue', labelPt: 'Azul Gestgo', color: '#1e40af' },
  { key: 'ocean-blue', label: 'Brand green', labelPt: 'Verde marca', color: '#14B87A' },
  { key: 'indigo-night', label: 'Indigo Night', labelPt: 'Anil', color: '#3730a3' },
  { key: 'emerald-fresh', label: 'Emerald Fresh', labelPt: 'Esmeralda', color: '#15803d' },
  { key: 'rose-elegant', label: 'Rose Elegant', labelPt: 'Rosa', color: '#be185d' },
  { key: 'amber-warm', label: 'Amber Warm', labelPt: 'Âmbar', color: '#b45309' },
  { key: 'violet-dream', label: 'Violet Dream', labelPt: 'Violeta', color: '#6d28d9' },
  { key: 'teal-ocean', label: 'Teal Ocean', labelPt: 'Verde-água', color: '#0f766e' },
  { key: 'slate-pro', label: 'Slate Pro', labelPt: 'Ardósia', color: '#334155' },
  { key: 'cyan-tech', label: 'Cyan Tech', labelPt: 'Ciano', color: '#0369a1' },
  { key: 'fuchsia-bold', label: 'Fuchsia Bold', labelPt: 'Magenta', color: '#a21caf' }];

/** Ordem na grade 6+5 (alinhada ao painel visual de referência). */
export const TEMAS_GRADE_ORDER = [
  'gestgo-blue',
  'indigo-night',
  'rose-elegant',
  'violet-dream',
  'slate-pro',
  'fuchsia-bold',
  'ocean-blue',
  'emerald-fresh',
  'amber-warm',
  'teal-ocean',
  'cyan-tech'] as const;

/** Temas na ordem da grade de círculos (6 + 5). */
export function temasOrdemGrade(): ShellTema[] {
  const byKey = new Map(TEMAS.map((t) => [t.key, t]));
  return TEMAS_GRADE_ORDER.map((k) => byKey.get(k)).filter((t): t is ShellTema => t != null);
}
