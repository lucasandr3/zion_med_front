/** Textos curtos de ano/fundação que não devem virar bloco de citação grande. */
export function isTrivialSignatureText(text: string): boolean {
  const t = text.trim();
  if (!t) return true;
  if (/^desde\s+\d{4}$/i.test(t)) return true;
  if (/^atendendo\s+desde\s+\d{4}$/i.test(t)) return true;
  if (/^pediatria\s+desde\s+\d{4}$/i.test(t)) return true;
  return false;
}
