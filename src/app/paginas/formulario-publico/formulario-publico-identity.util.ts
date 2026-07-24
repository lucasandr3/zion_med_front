import { digitsOnlyCpf, formatCpfDisplay, isValidCpfDigits } from '../../core/utils/cpf';

export const FP_LS_SUBMITTER_NAME = 'gestgo_public_form_submitter_name';
export const FP_LS_SUBMITTER_EMAIL = 'gestgo_public_form_submitter_email';
const FP_LS_CPF_AUTH_PREFIX = 'gestgo_public_form_cpf_auth_';
const CPF_AUTH_TTL_MS = 2 * 60 * 60 * 1000;

function storage(): Storage | null {
  try {
    return typeof sessionStorage !== 'undefined' ? sessionStorage : null;
  } catch {
    return null;
  }
}

export function fpCpfAuthStorageKey(token: string): string {
  return `${FP_LS_CPF_AUTH_PREFIX}${encodeURIComponent(token)}`;
}

export function fpRestoreSubmitterIdentity(): { name: string; email: string } {
  let name = '';
  let email = '';
  const s = storage();
  if (!s) return { name, email };
  try {
    const n = s.getItem(FP_LS_SUBMITTER_NAME);
    const e = s.getItem(FP_LS_SUBMITTER_EMAIL);
    if (n != null && n !== '') name = n;
    if (e != null && e !== '') email = e;
  } catch {}
  return { name, email };
}

export function fpPersistSubmitterIdentity(name: string, email: string): void {
  const s = storage();
  if (!s) return;
  try {
    const n = name.trim();
    const e = email.trim();
    if (n) s.setItem(FP_LS_SUBMITTER_NAME, n);
    else s.removeItem(FP_LS_SUBMITTER_NAME);
    if (e) s.setItem(FP_LS_SUBMITTER_EMAIL, e);
    else s.removeItem(FP_LS_SUBMITTER_EMAIL);
  } catch {}
}

export function fpClearSubmitterIdentity(): void {
  const s = storage();
  if (!s) return;
  try {
    s.removeItem(FP_LS_SUBMITTER_NAME);
    s.removeItem(FP_LS_SUBMITTER_EMAIL);
  } catch {}
}

export function fpPersistCpfGateAuthorization(token: string, cpf: string): void {
  if (cpf.length !== 11 || !isValidCpfDigits(cpf)) return;
  const s = storage();
  if (!s) return;
  try {
    s.setItem(
      fpCpfAuthStorageKey(token),
      JSON.stringify({ cpf, exp: Date.now() + CPF_AUTH_TTL_MS }),
    );
  } catch {}
}

export function fpRestoreCpfGateAuthorization(token: string): { cpfDigits: string; cpfDisplay: string } | null {
  if (!token) return null;
  const s = storage();
  if (!s) return null;
  try {
    const raw = s.getItem(fpCpfAuthStorageKey(token));
    if (!raw) return null;
    let cpfDigits = '';
    try {
      const parsed = JSON.parse(raw) as { cpf?: string; exp?: number };
      if (typeof parsed.exp === 'number' && parsed.exp < Date.now()) {
        s.removeItem(fpCpfAuthStorageKey(token));
        return null;
      }
      cpfDigits = digitsOnlyCpf(parsed.cpf ?? '');
    } catch {
      cpfDigits = digitsOnlyCpf(raw);
    }
    if (cpfDigits.length !== 11 || !isValidCpfDigits(cpfDigits)) {
      s.removeItem(fpCpfAuthStorageKey(token));
      return null;
    }
    return { cpfDigits, cpfDisplay: formatCpfDisplay(cpfDigits) };
  } catch {
    return null;
  }
}

export function fpClearCpfGateAuthorization(token: string): void {
  if (!token) return;
  const s = storage();
  if (!s) return;
  try {
    s.removeItem(fpCpfAuthStorageKey(token));
  } catch {}
}
