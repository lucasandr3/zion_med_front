/**
 * Temas Gestgo — fonte única de metadados + matriz hex.
 * CSS espelhado em `src/styles/theme-palettes.css`.
 *
 * Curadoria (psicologia de cores / SaaS clínico):
 * Vital · Clínico · Confiança · Acolhimento · Estética Soft · Neutro
 */

export interface GestgoThemeMeta {
  key: string;
  label: string;
  labelPt: string;
  /** Swatch da grade (cor primária light). */
  color: string;
  /** Tema recomendado no picker (ordem curada). */
  curated?: boolean;
  /** Uso sugerido (nichos / sensação). */
  hint?: string;
}

export interface GestgoThemeModeTokens {
  primary: string;
  primaryHover: string;
  primaryActive: string;
  onPrimary: string;
  accent: string;
  soft: string;
  focus: string;
}

export interface GestgoThemeTokens {
  /** RGB space-separated para `--theme-padrao` (modo claro). */
  padraoRgb: string;
  surface: string;
  floor: string;
  border: string;
  light: GestgoThemeModeTokens;
  dark: GestgoThemeModeTokens;
}

export const TEMAS: GestgoThemeMeta[] = [
  {
    key: 'ocean-blue',
    label: 'Vital',
    labelPt: 'Vital',
    color: '#16a874',
    curated: true,
    hint: 'Marca Gestgo — saúde, confiança e ação',
  },
  {
    key: 'teal-ocean',
    label: 'Clinical',
    labelPt: 'Clínico',
    color: '#0f766e',
    curated: true,
    hint: 'Protocolar — médica, lab, oftalmo',
  },
  {
    key: 'gestgo-blue',
    label: 'Trust',
    labelPt: 'Confiança',
    color: '#1e40af',
    curated: true,
    hint: 'Compliance e documento oficial',
  },
  {
    key: 'cyan-tech',
    label: 'Care',
    labelPt: 'Acolhimento',
    color: '#0891b2',
    curated: true,
    hint: 'Calma — pediatria, psicologia, fisio',
  },
  {
    key: 'emerald-fresh',
    label: 'Soft aesthetic',
    labelPt: 'Estética Soft',
    color: '#0d9488',
    curated: true,
    hint: 'Sofisticação leve — estética, dermato',
  },
  {
    key: 'slate-pro',
    label: 'Neutral',
    labelPt: 'Neutro',
    color: '#475569',
    curated: true,
    hint: 'Sobriedade — deixa a marca da clínica falar',
  },
  { key: 'indigo-night', label: 'Indigo Night', labelPt: 'Anil', color: '#3730a3' },
  { key: 'rose-elegant', label: 'Rose Elegant', labelPt: 'Rosa', color: '#be185d' },
  { key: 'amber-warm', label: 'Amber Warm', labelPt: 'Âmbar', color: '#b45309' },
  { key: 'violet-dream', label: 'Violet Dream', labelPt: 'Violeta', color: '#6d28d9' },
  { key: 'fuchsia-bold', label: 'Fuchsia Bold', labelPt: 'Magenta', color: '#a21caf' },
];

/** Grade do picker: curados primeiro, depois extras. */
export const TEMAS_GRADE_ORDER = [
  'ocean-blue',
  'teal-ocean',
  'gestgo-blue',
  'cyan-tech',
  'emerald-fresh',
  'slate-pro',
  'indigo-night',
  'rose-elegant',
  'amber-warm',
  'violet-dream',
  'fuchsia-bold',
] as const;

export const GESTGO_THEME_TOKENS: Record<string, GestgoThemeTokens> = {
  'ocean-blue': {
    padraoRgb: '22 168 116',
    surface: '#ffffff',
    floor: '#f4faf7',
    border: '#dde8e3',
    light: {
      primary: '#16a874',
      primaryHover: '#128a5f',
      primaryActive: '#0f7a56',
      onPrimary: '#ffffff',
      accent: '#9fe1cb',
      soft: '#e6f5ef',
      focus: 'rgba(22, 168, 116, 0.18)',
    },
    dark: {
      primary: '#34d399',
      primaryHover: '#6ee7b7',
      primaryActive: '#a7f3d0',
      onPrimary: '#0a3d2b',
      accent: '#6ee7b7',
      soft: '#0d1f18',
      focus: 'rgba(52, 211, 153, 0.22)',
    },
  },
  'teal-ocean': {
    padraoRgb: '15 118 110',
    surface: '#ffffff',
    floor: '#f3faf9',
    border: '#d5e8e6',
    light: {
      primary: '#0f766e',
      primaryHover: '#0c635c',
      primaryActive: '#0a524c',
      onPrimary: '#ffffff',
      accent: '#5eead4',
      soft: '#e6f7f5',
      focus: 'rgba(15, 118, 110, 0.18)',
    },
    dark: {
      primary: '#2dd4bf',
      primaryHover: '#5eead4',
      primaryActive: '#99f6e4',
      onPrimary: '#042f2e',
      accent: '#5eead4',
      soft: '#0c1f1d',
      focus: 'rgba(45, 212, 191, 0.2)',
    },
  },
  'gestgo-blue': {
    padraoRgb: '30 64 175',
    surface: '#ffffff',
    floor: '#f5f7fb',
    border: '#dce3f0',
    light: {
      primary: '#1e40af',
      primaryHover: '#1a3694',
      primaryActive: '#162e7c',
      onPrimary: '#ffffff',
      accent: '#93c5fd',
      soft: '#eff3ff',
      focus: 'rgba(30, 64, 175, 0.18)',
    },
    dark: {
      primary: '#60a5fa',
      primaryHover: '#93c5fd',
      primaryActive: '#bfdbfe',
      onPrimary: '#0c1a3d',
      accent: '#93c5fd',
      soft: '#10182a',
      focus: 'rgba(96, 165, 250, 0.2)',
    },
  },
  'cyan-tech': {
    padraoRgb: '8 145 178',
    surface: '#ffffff',
    floor: '#f2f9fb',
    border: '#d3e8ef',
    light: {
      primary: '#0891b2',
      primaryHover: '#0e7490',
      primaryActive: '#155e75',
      onPrimary: '#ffffff',
      accent: '#67e8f9',
      soft: '#e0f7fb',
      focus: 'rgba(8, 145, 178, 0.18)',
    },
    dark: {
      primary: '#22d3ee',
      primaryHover: '#67e8f9',
      primaryActive: '#a5f3fc',
      onPrimary: '#083344',
      accent: '#67e8f9',
      soft: '#0c1e24',
      focus: 'rgba(34, 211, 238, 0.2)',
    },
  },
  'emerald-fresh': {
    padraoRgb: '13 148 136',
    surface: '#ffffff',
    floor: '#f3faf8',
    border: '#d4ebe7',
    light: {
      primary: '#0d9488',
      primaryHover: '#0f766e',
      primaryActive: '#115e59',
      onPrimary: '#ffffff',
      accent: '#99f6e4',
      soft: '#e6faf7',
      focus: 'rgba(13, 148, 136, 0.18)',
    },
    dark: {
      primary: '#2dd4bf',
      primaryHover: '#5eead4',
      primaryActive: '#99f6e4',
      onPrimary: '#042f2e',
      accent: '#5eead4',
      soft: '#0c1f1c',
      focus: 'rgba(45, 212, 191, 0.2)',
    },
  },
  'slate-pro': {
    padraoRgb: '71 85 105',
    surface: '#ffffff',
    floor: '#f5f7f9',
    border: '#e2e8f0',
    light: {
      primary: '#475569',
      primaryHover: '#334155',
      primaryActive: '#1e293b',
      onPrimary: '#ffffff',
      accent: '#94a3b8',
      soft: '#f1f5f9',
      focus: 'rgba(71, 85, 105, 0.18)',
    },
    dark: {
      primary: '#94a3b8',
      primaryHover: '#cbd5e1',
      primaryActive: '#e2e8f0',
      onPrimary: '#0f172a',
      accent: '#cbd5e1',
      soft: '#151a22',
      focus: 'rgba(148, 163, 184, 0.2)',
    },
  },
  'indigo-night': {
    padraoRgb: '55 48 163',
    surface: '#ffffff',
    floor: '#f6f5fb',
    border: '#e0ddf2',
    light: {
      primary: '#3730a3',
      primaryHover: '#2e298a',
      primaryActive: '#262274',
      onPrimary: '#ffffff',
      accent: '#a5b4fc',
      soft: '#eef2ff',
      focus: 'rgba(55, 48, 163, 0.18)',
    },
    dark: {
      primary: '#818cf8',
      primaryHover: '#a5b4fc',
      primaryActive: '#c7d2fe',
      onPrimary: '#1e1b4b',
      accent: '#a5b4fc',
      soft: '#141428',
      focus: 'rgba(129, 140, 248, 0.2)',
    },
  },
  'rose-elegant': {
    padraoRgb: '190 24 93',
    surface: '#ffffff',
    floor: '#fbf5f8',
    border: '#f0d9e4',
    light: {
      primary: '#be185d',
      primaryHover: '#9d174d',
      primaryActive: '#831843',
      onPrimary: '#ffffff',
      accent: '#fda4af',
      soft: '#fff1f2',
      focus: 'rgba(190, 24, 93, 0.18)',
    },
    dark: {
      primary: '#fb7185',
      primaryHover: '#fda4af',
      primaryActive: '#fecdd3',
      onPrimary: '#4c0519',
      accent: '#fda4af',
      soft: '#241018',
      focus: 'rgba(251, 113, 133, 0.2)',
    },
  },
  'amber-warm': {
    padraoRgb: '180 83 9',
    surface: '#ffffff',
    floor: '#fbf8f3',
    border: '#efe4d4',
    light: {
      primary: '#b45309',
      primaryHover: '#92400e',
      primaryActive: '#78350f',
      onPrimary: '#ffffff',
      accent: '#fcd34d',
      soft: '#fffbeb',
      focus: 'rgba(180, 83, 9, 0.18)',
    },
    dark: {
      primary: '#fbbf24',
      primaryHover: '#fde68a',
      primaryActive: '#fef3c7',
      onPrimary: '#451a03',
      accent: '#fde68a',
      soft: '#241c0c',
      focus: 'rgba(251, 191, 36, 0.2)',
    },
  },
  'violet-dream': {
    padraoRgb: '109 40 217',
    surface: '#ffffff',
    floor: '#f8f5fc',
    border: '#e8dff5',
    light: {
      primary: '#6d28d9',
      primaryHover: '#5b21b6',
      primaryActive: '#4c1d95',
      onPrimary: '#ffffff',
      accent: '#c4b5fd',
      soft: '#f5f3ff',
      focus: 'rgba(109, 40, 217, 0.18)',
    },
    dark: {
      primary: '#a78bfa',
      primaryHover: '#c4b5fd',
      primaryActive: '#ddd6fe',
      onPrimary: '#2e1065',
      accent: '#c4b5fd',
      soft: '#1a1228',
      focus: 'rgba(167, 139, 250, 0.2)',
    },
  },
  'fuchsia-bold': {
    padraoRgb: '162 28 175',
    surface: '#ffffff',
    floor: '#fbf5fb',
    border: '#f0daf2',
    light: {
      primary: '#a21caf',
      primaryHover: '#86198f',
      primaryActive: '#701a75',
      onPrimary: '#ffffff',
      accent: '#f0abfc',
      soft: '#fdf4ff',
      focus: 'rgba(162, 28, 175, 0.18)',
    },
    dark: {
      primary: '#e879f9',
      primaryHover: '#f0abfc',
      primaryActive: '#f5d0fe',
      onPrimary: '#4a044e',
      accent: '#f0abfc',
      soft: '#221028',
      focus: 'rgba(232, 121, 249, 0.2)',
    },
  },
};

/** Alias legado zion-blue → gestgo-blue. */
GESTGO_THEME_TOKENS['zion-blue'] = GESTGO_THEME_TOKENS['gestgo-blue'];

export function getGestgoThemeTokens(themeKey: string): GestgoThemeTokens {
  return GESTGO_THEME_TOKENS[themeKey] ?? GESTGO_THEME_TOKENS['ocean-blue'];
}

export function getGestgoThemePrimary(themeKey: string, mode: 'light' | 'dark' = 'light'): string {
  const tokens = getGestgoThemeTokens(themeKey);
  return mode === 'dark' ? tokens.dark.primary : tokens.light.primary;
}
