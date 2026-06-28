export interface ParsedStackFrame {
  file: string | null;
  line: number | null;
}

export function parseStackFrame(stack: string | undefined): ParsedStackFrame {
  if (!stack) return { file: null, line: null };

  const lines = stack.split('\n').map((line) => line.trim());
  for (const line of lines) {
    if (!line.startsWith('at ')) continue;
    if (line.includes('node_modules') || line.includes('zone.js')) continue;

    const match =
      line.match(/\((.+):(\d+):(\d+)\)$/) ??
      line.match(/at (.+):(\d+):(\d+)$/);
    if (!match) continue;

    return {
      file: match[1],
      line: Number.parseInt(match[2], 10),
    };
  }

  return { file: null, line: null };
}

export function getExceptionName(error: unknown): string {
  if (error instanceof Error) return error.name || 'Error';
  if (typeof error === 'object' && error !== null && 'name' in error) {
    return String((error as { name: unknown }).name);
  }
  return 'UnknownError';
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message || error.name;
  if (typeof error === 'string') return error;
  try {
    return JSON.stringify(error);
  } catch {
    return 'Erro desconhecido';
  }
}

export function getErrorStack(error: unknown): string {
  if (error instanceof Error && error.stack) return error.stack;
  if (typeof error === 'object' && error !== null && 'stack' in error) {
    return String((error as { stack: unknown }).stack);
  }
  return getErrorMessage(error);
}
