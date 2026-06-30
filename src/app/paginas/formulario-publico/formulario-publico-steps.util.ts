import { FormularioPublicoField } from '../../core/services/formulario-publico.service';

/** Mínimo de campos para ativar navegação por etapas. */
export const FORM_STEP_MIN_FIELDS = 12;

/** Máximo de campos por etapa (exceto agrupamento de checkboxes). */
export const FORM_STEP_MAX_FIELDS = 8;

const STEP_BREAK_TYPES = new Set(['heading', 'section', 'section_break', 'page_break', 'step_break']);

export function isFormStepBreakField(field: FormularioPublicoField): boolean {
  return STEP_BREAK_TYPES.has((field.type ?? '').toLowerCase());
}

/** Campos que entram no cálculo de progresso (exclui quebras de etapa). */
export function isTrackableFormField(field: FormularioPublicoField): boolean {
  return !isFormStepBreakField(field);
}

function isCheckboxField(field: FormularioPublicoField): boolean {
  return (field.type ?? '').toLowerCase() === 'checkbox';
}

/**
 * Divide os campos em etapas para formulários longos.
 * Quebras explícitas (`heading`, `section`, etc.) iniciam nova etapa.
 */
export function buildFormFieldSteps(fields: FormularioPublicoField[]): FormularioPublicoField[][] {
  const sorted = [...fields].sort((a, b) => a.sort_order - b.sort_order);
  if (sorted.length <= FORM_STEP_MIN_FIELDS) {
    return [sorted];
  }

  const hasExplicitBreaks = sorted.some(isFormStepBreakField);
  if (hasExplicitBreaks) {
    return buildStepsByExplicitBreaks(sorted);
  }

  return buildStepsByChunkSize(sorted);
}

function buildStepsByExplicitBreaks(sorted: FormularioPublicoField[]): FormularioPublicoField[][] {
  const steps: FormularioPublicoField[][] = [];
  let current: FormularioPublicoField[] = [];

  for (const field of sorted) {
    if (isFormStepBreakField(field)) {
      if (current.length) {
        steps.push(current);
        current = [];
      }
      continue;
    }
    current.push(field);
  }

  if (current.length) {
    steps.push(current);
  }

  return steps.length ? steps : [sorted];
}

function buildStepsByChunkSize(sorted: FormularioPublicoField[]): FormularioPublicoField[][] {
  const steps: FormularioPublicoField[][] = [];
  let i = 0;

  while (i < sorted.length) {
    let chunkEnd = Math.min(i + FORM_STEP_MAX_FIELDS, sorted.length);

    if (chunkEnd < sorted.length && isCheckboxField(sorted[chunkEnd - 1]!)) {
      while (
        chunkEnd < sorted.length &&
        isCheckboxField(sorted[chunkEnd - 1]!) &&
        isCheckboxField(sorted[chunkEnd]!) &&
        chunkEnd - i < FORM_STEP_MAX_FIELDS + 8
      ) {
        chunkEnd++;
      }
    }

    steps.push(sorted.slice(i, chunkEnd));
    i = chunkEnd;
  }

  return steps;
}

export interface FormFieldStepState {
  steps: FormularioPublicoField[][];
  currentStepIndex: number;
  usesFormSteps: boolean;
  totalFormSteps: number;
  currentStepNumber: number;
  isFirstFormStep: boolean;
  isLastFormStep: boolean;
  currentStepFields: FormularioPublicoField[];
}

export function buildFormFieldStepState(
  fields: FormularioPublicoField[],
  currentStepIndex: number,
): FormFieldStepState {
  const steps = fields.length ? buildFormFieldSteps(fields) : [];
  const totalFormSteps = steps.length || 1;
  const safeIndex = Math.min(Math.max(currentStepIndex, 0), totalFormSteps - 1);

  return {
    steps,
    currentStepIndex: safeIndex,
    usesFormSteps: steps.length > 1,
    totalFormSteps,
    currentStepNumber: safeIndex + 1,
    isFirstFormStep: safeIndex <= 0,
    isLastFormStep: safeIndex >= totalFormSteps - 1,
    currentStepFields: steps[safeIndex] ?? [],
  };
}
