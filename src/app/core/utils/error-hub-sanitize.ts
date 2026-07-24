const SENSITIVE_EXACT = new Set([
  'password',
  'password_confirmation',
  'token',
  'authorization',
  'access_token',
  'refresh_token',
  'secret',
  'api_key',
  'apikey',
  'cpf',
  'rg',
]);

const SENSITIVE_SUBSTRINGS = [
  'password',
  'secret',
  'token',
  'api_key',
  'apikey',
  'access_key',
  'private_key',
  'webhook_secret',
  'authorization',
  'cpf',
  'card_number',
];

const MAX_STRING_LENGTH = 500;
const MAX_DEPTH = 4;

function isSensitiveKey(key: string): boolean {
  const lower = key.toLowerCase();
  if (SENSITIVE_EXACT.has(lower)) return true;
  return SENSITIVE_SUBSTRINGS.some((part) => lower.includes(part));
}

export function sanitizeErrorHubPayload(value: unknown, depth = 0): unknown {
  if (value == null) return value;
  if (depth > MAX_DEPTH) return '[truncado]';

  if (value instanceof FormData) {
    return { _type: 'FormData' };
  }

  if (value instanceof Blob) {
    return { _type: 'Blob', size: value.size, mime: value.type || null };
  }

  if (typeof value === 'string') {
    return value.length > MAX_STRING_LENGTH
      ? `${value.slice(0, MAX_STRING_LENGTH)}…`
      : value;
  }

  if (Array.isArray(value)) {
    return value.slice(0, 20).map((item) => sanitizeErrorHubPayload(item, depth + 1));
  }

  if (typeof value === 'object') {
    const out: Record<string, unknown> = {};
    for (const [key, nested] of Object.entries(value as Record<string, unknown>)) {
      if (isSensitiveKey(key)) {
        out[key] = '[redacted]';
        continue;
      }
      out[key] = sanitizeErrorHubPayload(nested, depth + 1);
    }
    return out;
  }

  return value;
}
