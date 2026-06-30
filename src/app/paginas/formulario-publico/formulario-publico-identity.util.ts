import { digitsOnlyCpf, formatCpfDisplay, isValidCpfDigits } from '../../core/utils/cpf';

export const FP_LS_SUBMITTER_NAME = 'gestgo_public_form_submitter_name';
export const FP_LS_SUBMITTER_EMAIL = 'gestgo_public_form_submitter_email';
const FP_LS_CPF_AUTH_PREFIX = 'gestgo_public_form_cpf_auth_';

export function fpCpfAuthStorageKey(token: string): string {
  return `${FP_LS_CPF_AUTH_PREFIX}${encodeURIComponent(token)}`;
}

export function fpRestoreSubmitterIdentity(): { name: string; email: string } {
  let name = '';
  let email = '';
  try {
    const n = localStorage.getItem(FP_LS_SUBMITTER_NAME);
    const e = localStorage.getItem(FP_LS_SUBMITTER_EMAIL);
    if (n != null && n !== '') name = n;
    if (e != null && e !== '') email = e;
  } catch {}
  return { name, email };
}

export function fpPersistSubmitterIdentity(name: string, email: string): void {
  try {
    const n = name.trim();
    const e = email.trim();
    if (n) localStorage.setItem(FP_LS_SUBMITTER_NAME, n);
    else localStorage.removeItem(FP_LS_SUBMITTER_NAME);
    if (e) localStorage.setItem(FP_LS_SUBMITTER_EMAIL, e);
    else localStorage.removeItem(FP_LS_SUBMITTER_EMAIL);
  } catch {}
}

export function fpClearSubmitterIdentity(): void {
  try {
    localStorage.removeItem(FP_LS_SUBMITTER_NAME);
    localStorage.removeItem(FP_LS_SUBMITTER_EMAIL);
  } catch {}
}

export function fpPersistCpfGateAuthorization(token: string, cpf: string): void {
  if (cpf.length !== 11 || !isValidCpfDigits(cpf)) return;
  try {
    localStorage.setItem(fpCpfAuthStorageKey(token), cpf);
  } catch {}
}

export function fpRestoreCpfGateAuthorization(token: string): { cpfDigits: string; cpfDisplay: string } | null {
  if (!token) return null;
  try {
    const raw = localStorage.getItem(fpCpfAuthStorageKey(token));
    if (!raw) return null;
    const cpfDigits = digitsOnlyCpf(raw);
    if (cpfDigits.length !== 11 || !isValidCpfDigits(cpfDigits)) {
      localStorage.removeItem(fpCpfAuthStorageKey(token));
      return null;
    }
    return { cpfDigits, cpfDisplay: formatCpfDisplay(cpfDigits) };
  } catch {
    return null;
  }
}

export function fpClearCpfGateAuthorization(token: string): void {
  if (!token) return;
  try {
    localStorage.removeItem(fpCpfAuthStorageKey(token));
  } catch {}
}
