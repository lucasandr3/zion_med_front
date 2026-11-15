/** Ciphertext Laravel / JWT opaco — não é e-mail utilizável. */
export function looksEncryptedOrToken(value: string | null | undefined): boolean {
  if (!value?.trim()) return false;
  const v = value.trim();
  if (v.startsWith('eyJpdiI6') || v.includes('"iv"')) return true;
  if (v.startsWith('eyJ') && v.includes('.') && !v.includes('@') && v.length > 40) return true;
  return false;
}

/** Retorna e-mail exibível ou null. */
export function emailExibivel(email: string | null | undefined): string | null {
  if (!email?.trim()) return null;
  const trimmed = email.trim();
  if (looksEncryptedOrToken(trimmed) || !trimmed.includes('@')) return null;
  return trimmed;
}
