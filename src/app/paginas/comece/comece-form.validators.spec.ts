import { FormBuilder, Validators } from '@angular/forms';
import {
  billingDocumentValidator,
  passwordMatchValidator,
  phoneMinDigitsValidator,
} from './comece-form.validators';

describe('comece-form.validators', () => {
  const fb = new FormBuilder();

  it('billingDocumentValidator accepts empty, CPF and CNPJ lengths', () => {
    const control = fb.control('', billingDocumentValidator());
    expect(control.valid).toBe(true);

    control.setValue('52998224725');
    expect(control.valid).toBe(true);

    control.setValue('12345678000199');
    expect(control.valid).toBe(true);

    control.setValue('1234567');
    expect(control.valid).toBe(false);
  });

  it('phoneMinDigitsValidator requires minimum digits', () => {
    const control = fb.control('11987654321', phoneMinDigitsValidator(10));
    expect(control.valid).toBe(true);

    control.setValue('123');
    expect(control.valid).toBe(false);
  });

  it('passwordMatchValidator detects mismatch', () => {
    const group = fb.group(
      {
        password: ['secret123', Validators.required],
        passwordConfirmation: ['other', Validators.required],
      },
      { validators: passwordMatchValidator },
    );
    expect(group.hasError('passwordMismatch')).toBe(true);

    group.patchValue({ passwordConfirmation: 'secret123' });
    expect(group.hasError('passwordMismatch')).toBe(false);
  });
});
