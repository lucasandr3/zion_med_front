import type {
  ProtocoloDetalheData,
  ProtocoloEvent,
  ProtocoloField,
  ProtocoloSignature,
} from '../services/protocolos.service';

/** Rótulos PT-BR para tipos de evento (paridade Laravel SubmissionEvent). */
const EVENT_TYPE_LABELS: Record<string, string> = {
  created: 'Protocolo criado',
  submitted: 'Enviado',
  viewed: 'Documento visualizado',
  accepted: 'Texto aceito',
  signed: 'Assinado',
  approved: 'Aprovado',
  rejected: 'Reprovado',
  comment: 'Comentário',
  comentario: 'Comentário',
  internal_comment: 'Comentário interno',
  revoked: 'Consentimento revogado',
  reconsent_requested: 'Reconsentimento solicitado',
  staff_values: 'Campos da equipe atualizados',
  patient_copy_token_issued: 'Token de cópia do paciente emitido',
  patient_copy_emailed: 'Cópia enviada por e-mail ao paciente',
  patient_copy_downloaded: 'Paciente baixou a cópia',
};

export function protocoloEventoLabel(event: ProtocoloEvent | null | undefined): string {
  if (!event) return 'Evento';
  const type = (event.type ?? '').trim();
  const rawLabel = (event.type_label ?? '').trim();
  const looksLikeCode =
    !rawLabel ||
    rawLabel === type ||
    /^[a-z0-9_]+$/i.test(rawLabel);
  if (type && EVENT_TYPE_LABELS[type]) {
    if (looksLikeCode) return EVENT_TYPE_LABELS[type];
  }
  if (rawLabel && !looksLikeCode) return rawLabel;
  if (type && EVENT_TYPE_LABELS[type]) return EVENT_TYPE_LABELS[type];
  return rawLabel || type || 'Evento';
}

export function protocoloEventoUserName(event: ProtocoloEvent): string | undefined {
  const fromUser = event.user?.name?.trim();
  if (fromUser) return fromUser;
  const legacy = (event as ProtocoloEvent & { user_name?: string }).user_name?.trim();
  return legacy || undefined;
}

function extractImageUrl(raw: unknown): string | null {
  if (raw == null) return null;
  if (typeof raw === 'string') {
    const t = raw.trim();
    if (t.startsWith('data:image') || t.startsWith('http://') || t.startsWith('https://')) {
      return t;
    }
    return null;
  }
  if (typeof raw === 'object' && !Array.isArray(raw)) {
    const o = raw as Record<string, unknown>;
    for (const k of ['url', 'image', 'data', 'value', 'value_text']) {
      const u = extractImageUrl(o[k]);
      if (u) return u;
    }
  }
  return null;
}

function signatureKeysFromFields(p: ProtocoloDetalheData): Set<string> {
  const keys = new Set<string>();
  const sources = [
    p.document_snapshot?.fields_snapshot,
    p.template_version?.fields_snapshot,
    p.template?.fields,
  ];
  for (const list of sources) {
    if (!list?.length) continue;
    for (const f of list) {
      const type = String((f as { type?: string }).type || '').toLowerCase();
      const key = String((f as { name_key?: string }).name_key || '').trim();
      if (type === 'signature' && key) keys.add(key);
    }
  }
  return keys;
}

/** Monta assinaturas a partir de values quando a API devolve `signatures: []` (ex.: Java QA). */
export function synthesizeSignaturesFromValues(p: ProtocoloDetalheData): ProtocoloSignature[] {
  if (p.signatures?.length) return p.signatures;

  const keyed = resolveValuesMap(p);
  const sigKeys = signatureKeysFromFields(p);
  const out: ProtocoloSignature[] = [];
  const seen = new Set<string>();

  const bag = keyed['_signature'];
  if (bag && typeof bag === 'object' && !Array.isArray(bag)) {
    for (const [key, val] of Object.entries(bag as Record<string, unknown>)) {
      const url = extractImageUrl(val);
      if (!url || seen.has(key)) continue;
      seen.add(key);
      out.push({ field_key: key, url, channel: 'web', status: 'completed' });
    }
  }

  for (const [key, val] of Object.entries(keyed)) {
    if (!key || key.startsWith('_') || seen.has(key)) continue;
    const url = extractImageUrl(val);
    if (!url) continue;
    if (!sigKeys.has(key) && !url.startsWith('data:image')) continue;
    seen.add(key);
    out.push({ field_key: key, url, channel: 'web', status: 'completed' });
  }

  return out;
}

/** Unifica values / values_keyed / form_data (array ou mapa). */
export function resolveValuesMap(p: ProtocoloDetalheData): Record<string, unknown> {
  const out: Record<string, unknown> = {};

  const mergeEntry = (key: string, val: unknown) => {
    if (!key || key in out) return;
    out[key] = val;
  };

  if (p.values_keyed && typeof p.values_keyed === 'object') {
    for (const [k, v] of Object.entries(p.values_keyed)) {
      mergeEntry(k, v);
    }
  }

  if (p.form_data && typeof p.form_data === 'object' && !Array.isArray(p.form_data)) {
    for (const [k, v] of Object.entries(p.form_data)) {
      mergeEntry(k, v);
    }
  }

  if (p.values && typeof p.values === 'object' && !Array.isArray(p.values)) {
    for (const [k, v] of Object.entries(p.values as Record<string, unknown>)) {
      mergeEntry(k, v);
    }
  }

  if (Array.isArray(p.values)) {
    for (const row of p.values as Array<Record<string, unknown>>) {
      const key = String(row['key'] ?? row['field_key'] ?? row['name_key'] ?? '').trim();
      if (!key) continue;
      const val =
        row['value_json'] != null
          ? row['value_json']
          : row['value_text'] != null
            ? row['value_text']
            : row['value'];
      mergeEntry(key, val);
    }
  }

  const snapVals = p.document_snapshot?.values;
  if (snapVals && typeof snapVals === 'object' && !Array.isArray(snapVals)) {
    for (const [k, v] of Object.entries(snapVals)) {
      mergeEntry(k, v);
    }
  }

  return out;
}

export function resolveFieldRawValue(
  valuesMap: Record<string, unknown>,
  nameKey: string,
): unknown {
  const keyed = valuesMap[nameKey];
  if (keyed == null) return null;
  if (typeof keyed === 'object' && !Array.isArray(keyed)) {
    const entry = keyed as Record<string, unknown>;
    if ('value_json' in entry && entry['value_json'] != null) return entry['value_json'];
    if ('value_text' in entry && entry['value_text'] != null) return entry['value_text'];
  }
  return keyed;
}

/** Campos sintéticos a partir das chaves de valores, quando a API não manda fields_snapshot. */
export function synthesizeFieldsFromValues(
  valuesMap: Record<string, unknown>,
): ProtocoloField[] {
  const keys = Object.keys(valuesMap).filter((k) => k && !k.startsWith('_'));
  return keys.map((name_key, i) => ({
    name_key,
    label: name_key.replace(/_/g, ' '),
    type: extractImageUrl(valuesMap[name_key]) ? 'signature' : 'text',
    sort_order: i,
  }));
}

/** Normaliza o detalhe do protocolo para o front (Java QA + Laravel). */
export function normalizeProtocoloDetalhe(p: ProtocoloDetalheData): ProtocoloDetalheData {
  const signatures = synthesizeSignaturesFromValues(p);
  const events = (p.events ?? []).map((e) => ({
    ...e,
    type_label: protocoloEventoLabel(e),
    user: e.user?.name
      ? e.user
      : protocoloEventoUserName(e)
        ? { name: protocoloEventoUserName(e) }
        : e.user,
  }));

  return {
    ...p,
    signatures,
    events,
  };
}
