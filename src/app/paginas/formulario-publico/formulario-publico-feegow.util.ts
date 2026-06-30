import { FeegowSimpleOption } from '../../core/services/formulario-publico.service';

export const FEEGOW_VALUE_DEFAULTS: Record<string, string> = {
  feegow_paciente_id: '',
  feegow_profissional_id: '',
  feegow_especialidade_id: '',
  feegow_procedimento_id: '',
  feegow_local_id: '',
  feegow_convenio_id: '',
  feegow_canal_id: '',
  feegow_data: '',
  feegow_horario: '',
  feegow_notas: '',
  feegow_celular: '',
  feegow_telefone: '',
  feegow_email: '',
};

export function optionsFromList(
  list: FeegowSimpleOption[] | undefined,
  labelKeys: string[],
  idKeys: string[] = ['id'],
): { value: string; label: string }[] {
  if (!Array.isArray(list)) return [];
  return list
    .map((item) => {
      const value =
        idKeys.map((k) => item[k]).find((v) => v !== null && v !== undefined && String(v).trim() !== '') ?? null;
      const label = labelKeys
        .map((k) => item[k])
        .find((v) => typeof v === 'string' && v.trim().length > 0) as string | undefined;
      if (value === null || value === undefined) return null;
      return { value: String(value), label: label ?? `ID ${String(value)}` };
    })
    .filter((v): v is { value: string; label: string } => v !== null);
}

export function extractScheduleHours(input: unknown): string[] {
  const out: string[] = [];
  const walk = (v: unknown): void => {
    if (Array.isArray(v)) {
      v.forEach(walk);
      return;
    }
    if (v && typeof v === 'object') {
      Object.values(v as Record<string, unknown>).forEach(walk);
      return;
    }
    if (typeof v === 'string' && /^\d{2}:\d{2}(:\d{2})?$/.test(v.trim())) {
      out.push(v.trim().length === 5 ? `${v.trim()}:00` : v.trim());
    }
  };
  walk(input);
  return out.sort();
}

export function extractAvailabilityByProfessional(input: unknown): {
  professionals: { value: string; label: string }[];
  hoursByProfessional: Record<string, string[]>;
  allHours: string[];
} {
  const hoursByProfessional: Record<string, string[]> = {};
  const root = input && typeof input === 'object' ? (input as Record<string, unknown>) : null;
  const byProfessional =
    root && root['profissional_id'] && typeof root['profissional_id'] === 'object'
      ? (root['profissional_id'] as Record<string, unknown>)
      : null;

  if (!byProfessional) {
    const fallbackHours = extractScheduleHours(input);
    return { professionals: [], hoursByProfessional: {}, allHours: fallbackHours };
  }

  const professionals: { value: string; label: string }[] = [];
  Object.entries(byProfessional).forEach(([profId, data]) => {
    const hours = Array.from(new Set(extractScheduleHours(data))).sort();
    if (hours.length > 0) {
      hoursByProfessional[profId] = hours;
      professionals.push({ value: profId, label: `Profissional ${profId}` });
    }
  });

  const allHours = Array.from(new Set(Object.values(hoursByProfessional).flat())).sort();
  return { professionals, hoursByProfessional, allHours };
}
