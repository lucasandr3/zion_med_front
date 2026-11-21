export interface ShellTema {
  key: string;
  label: string;
  labelPt: string;
  color: string;
}

export const TEMAS: ShellTema[] = [
  { key: 'ocean-blue', label: 'Brand green', labelPt: 'Verde marca', color: '#14B87A' },
  { key: 'oceano', label: 'Ocean', labelPt: 'Oceano', color: '#0ea5e9' },
  { key: 'grafite', label: 'Graphite', labelPt: 'Grafite', color: '#64748b' },
  { key: 'indigo', label: 'Indigo', labelPt: 'Índigo', color: '#6366f1' },
  { key: 'rosa', label: 'Pink', labelPt: 'Rosa', color: '#f472b6' },
  { key: 'lavanda', label: 'Lavender', labelPt: 'Lavanda', color: '#a78bfa' },
  { key: 'coral', label: 'Coral', labelPt: 'Coral', color: '#fb7185' },
  { key: 'pessego', label: 'Peach', labelPt: 'Pêssego', color: '#fb923c' },
];

/** Ordem na grade 6+5 (alinhada ao painel visual de referência). */
export const TEMAS_GRADE_ORDER = [
  'ocean-blue',
  'oceano',
  'grafite',
  'indigo',
  'rosa',
  'lavanda',
  'coral',
  'pessego',
] as const;

/** Temas na ordem da grade de círculos (6 + 5). */
export function temasOrdemGrade(): ShellTema[] {
  const byKey = new Map(TEMAS.map((t) => [t.key, t]));
  return TEMAS_GRADE_ORDER.map((k) => byKey.get(k)).filter((t): t is ShellTema => t != null);
}
