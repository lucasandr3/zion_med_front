export const FORM_PUBLIC_FILE_MAX_BYTES = 15 * 1024 * 1024;

export function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const r = reader.result;
      resolve(typeof r === 'string' ? r : '');
    };
    reader.onerror = () => reject(new Error('read_failed'));
    reader.readAsDataURL(file);
  });
}

export function clearFileInputByKey(key: string): void {
  if (typeof document === 'undefined') return;
  const el = document.getElementById('field_' + key) as HTMLInputElement | null;
  if (el?.type === 'file') el.value = '';
}
