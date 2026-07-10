/** Converte padrão `/pessoas/:id/editar` em RegExp. */
export function routePatternToRegex(pattern: string): RegExp {
  const escaped = pattern
    .replace(/\/+$/, '')
    .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    .replace(/\\:([A-Za-z0-9_]+)/g, '[^/]+');
  return new RegExp(`^${escaped}$`);
}

export function normalizeRoutePath(url: string): string {
  const path = url.split('?')[0].split('#')[0] || '/';
  if (path.length > 1 && path.endsWith('/')) {
    return path.slice(0, -1);
  }
  return path || '/';
}

/** Escolhe o padrão mais específico que casa com a rota. */
export function matchRoutePattern(
  path: string,
  patterns: { id: string; routePatterns: string[] }[],
): string | null {
  const normalized = normalizeRoutePath(path);
  let bestId: string | null = null;
  let bestScore = -1;

  for (const item of patterns) {
    for (const pattern of item.routePatterns) {
      const clean = pattern.replace(/\/+$/, '') || '/';
      if (!routePatternToRegex(clean).test(normalized)) {
        continue;
      }
      const specificity = clean.split('/').filter(Boolean).length * 10 - (clean.includes(':') ? 1 : 0);
      if (specificity > bestScore) {
        bestScore = specificity;
        bestId = item.id;
      }
    }
  }

  return bestId;
}
