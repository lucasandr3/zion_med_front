const SENSITIVE_KEYS = new Set([
  'password',
  'password_confirmation',
  'token',
  'authorization',
  'access_token',
  'refresh_token',
  'secret',
  'api_key',
  'apikey',
]);

const MAX_STRING_LENGTH = 500;
const MAX_DEPTH = 4;

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
      if (SENSITIVE_KEYS.has(key.toLowerCase())) {
        out[key] = '[redacted]';
        continue;
      }
      out[key] = sanitizeErrorHubPayload(nested, depth + 1);
    }
    return out;
  }

  return value;
}
