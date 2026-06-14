import { LinkBioClinic, LinkBioExtra } from '../services/link-bio.service';

function trim(value: unknown): string {
  return String(value ?? '').trim();
}

/** Converte `link_bio_extra` (objeto ou JSON string) em objeto tipado. */
export function parseLinkBioExtra(raw: unknown): LinkBioExtra {
  if (raw == null || raw === '') return {};

  if (typeof raw === 'string') {
    try {
      return parseLinkBioExtra(JSON.parse(raw));
    } catch {
      return {};
    }
  }

  if (typeof raw !== 'object' || Array.isArray(raw)) return {};

  const obj = { ...(raw as Record<string, unknown>) };

  if (!trim(obj['council_registration'])) {
    const councilType = trim(obj['council_type']);
    const councilNumber = trim(obj['council_number']);
    if (councilType && councilNumber) {
      obj['council_registration'] = `${councilType} ${councilNumber}`;
    }
  }

  return obj as LinkBioExtra;
}

/** Lista de especialidades para chips/bento (API, string CSV ou legado no extra). */
export function linkBioSpecialtiesList(clinic: LinkBioClinic): string[] {
  const fromApi = clinic.specialties_list?.map((item) => trim(item)).filter(Boolean) ?? [];
  if (fromApi.length) return fromApi;

  const extra = parseLinkBioExtra(clinic.link_bio_extra);
  const legacy = (extra as Record<string, unknown>)['specialties_list'];
  if (Array.isArray(legacy)) {
    const parsed = legacy.map((item) => trim(item)).filter(Boolean);
    if (parsed.length) return parsed;
  }

  const csv = trim(clinic.specialties);
  if (!csv) return [];

  return csv
    .split(/[,;|/]/)
    .map((part) => part.trim())
    .filter(Boolean);
}

/** Normaliza clínica vinda da API antes de renderizar Link Bio (admin ou público). */
export function normalizeLinkBioClinic(clinic: LinkBioClinic): LinkBioClinic {
  const link_bio_extra = parseLinkBioExtra(clinic.link_bio_extra);
  const specialties_list = linkBioSpecialtiesList({ ...clinic, link_bio_extra });

  return {
    ...clinic,
    link_bio_extra,
    specialties_list,
  };
}
