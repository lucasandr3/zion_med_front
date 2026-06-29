import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function billingDocumentValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const digits = String(control.value ?? '').replace(/\D/g, '');
    if (digits.length === 0 || digits.length === 11 || digits.length === 14) {
      return null;
    }
    return { billingDocument: true };
  };
}

export function phoneMinDigitsValidator(minDigits: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const digits = String(control.value ?? '').replace(/\D/g, '');
    return digits.length >= minDigits ? null : { phoneMin: true };
  };
}

export function passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
  const password = group.get('password')?.value;
  const confirmation = group.get('passwordConfirmation')?.value;
  if (password === confirmation) {
    return null;
  }
  return { passwordMismatch: true };
}
