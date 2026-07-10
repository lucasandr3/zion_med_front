/** Normaliza texto PT-BR para busca (sem acentos, lowercase). */
export function normalizeAssistantText(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function tokenizeAssistantQuery(value: string): string[] {
  return normalizeAssistantText(value)
    .split(' ')
    .filter((t) => t.length >= 2);
}
