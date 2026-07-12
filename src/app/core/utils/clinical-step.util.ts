import { FormularioPublicoField } from '../services/formulario-publico.service';

export const CLINICAL_STEP_KINDS = [
  'dados_paciente',
  'descricao_procedimento',
  'riscos_beneficios',
  'alternativas',
  'declaracoes',
  'compreensao',
  'privacidade_lgpd',
  'assinaturas',
] as const;

export type ClinicalStepKind = (typeof CLINICAL_STEP_KINDS)[number];

export const CLINICAL_STEP_LABELS: Record<ClinicalStepKind, string> = {
  dados_paciente: 'Dados do paciente',
  descricao_procedimento: 'Descrição do procedimento',
  riscos_beneficios: 'Riscos e benefícios',
  alternativas: 'Alternativas',
  declaracoes: 'Declarações',
  compreensao: 'Compreensão clínica',
  privacidade_lgpd: 'Privacidade (LGPD)',
  assinaturas: 'Assinaturas',
};

export const CLINICAL_STEPS_REQUIRING_TERM_SCROLL: ReadonlySet<ClinicalStepKind> = new Set([
  'descricao_procedimento',
  'riscos_beneficios',
  'alternativas',
  'declaracoes',
]);

export function clinicalStepLabel(kind: string | null | undefined, fallback?: string): string {
  if (kind && kind in CLINICAL_STEP_LABELS) {
    return CLINICAL_STEP_LABELS[kind as ClinicalStepKind];
  }
  if (fallback?.trim()) {
    return fallback.trim();
  }
  return 'Etapa do formulário';
}

export function templateUsesClinicalSteps(
  fields: FormularioPublicoField[],
  usesClinicalStepsFlag?: boolean,
): boolean {
  if (usesClinicalStepsFlag) {
    return true;
  }
  return fields.some((f) => !!f.clinical_step_kind?.trim());
}

export function fieldStartsClinicalStep(field: FormularioPublicoField): boolean {
  const type = (field.type ?? '').toLowerCase();
  if (type === 'section_break' || type === 'page_break' || type === 'step_break') {
    return true;
  }
  return !!field.clinical_step_kind?.trim();
}

export function resolveFieldClinicalKind(field: FormularioPublicoField): ClinicalStepKind | 'geral' {
  const kind = field.clinical_step_kind?.trim();
  if (kind && CLINICAL_STEP_KINDS.includes(kind as ClinicalStepKind)) {
    return kind as ClinicalStepKind;
  }
  if ((field.type ?? '').toLowerCase() === 'signature') {
    return 'assinaturas';
  }
  return 'geral';
}

export interface ClinicalFormStepMeta {
  kind: ClinicalStepKind | 'geral';
  title: string;
  fields: FormularioPublicoField[];
  stepNumber: number;
}

export function buildClinicalFormStepMetas(fields: FormularioPublicoField[]): ClinicalFormStepMeta[] {
  const sorted = [...fields].sort((a, b) => a.sort_order - b.sort_order);
  const steps: ClinicalFormStepMeta[] = [];
  let bucket: FormularioPublicoField[] = [];
  let currentKind: ClinicalStepKind | 'geral' = 'geral';
  let currentTitle = 'Etapa do formulário';

  const flush = (): void => {
    if (bucket.length === 0) {
      return;
    }
    steps.push({
      kind: currentKind,
      title: currentTitle,
      fields: bucket,
      stepNumber: steps.length + 1,
    });
    bucket = [];
  };

  for (const field of sorted) {
    const type = (field.type ?? '').toLowerCase();
    const explicitKind = field.clinical_step_kind?.trim() as ClinicalStepKind | undefined;
    const isBreak = type === 'section_break' || type === 'page_break' || type === 'step_break';

    if (isBreak) {
      flush();
      currentKind = explicitKind ?? 'geral';
      currentTitle = clinicalStepLabel(explicitKind, field.label);
      continue;
    }

    if (explicitKind && (bucket.length === 0 || explicitKind !== currentKind)) {
      flush();
      currentKind = explicitKind;
      currentTitle = clinicalStepLabel(explicitKind, type === 'heading' ? field.label : undefined);
    }

    if (bucket.length === 0) {
      currentKind = explicitKind ?? resolveFieldClinicalKind(field);
      currentTitle =
        type === 'heading'
          ? field.label?.trim() || clinicalStepLabel(currentKind)
          : clinicalStepLabel(currentKind);
    }

    bucket.push(field);
  }

  flush();

  return steps.map((step, index) => ({ ...step, stepNumber: index + 1 }));
}

export function clinicalStepShowsComprehension(kind: string): boolean {
  return kind === 'compreensao';
}

export function clinicalStepShowsPrivacy(kind: string): boolean {
  return kind === 'privacidade_lgpd';
}

export function clinicalStepShowsSignatures(kind: string): boolean {
  return kind === 'assinaturas';
}

export function clinicalStepRequiresTermScroll(kind: string): boolean {
  return CLINICAL_STEPS_REQUIRING_TERM_SCROLL.has(kind as ClinicalStepKind);
}
