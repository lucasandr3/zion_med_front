import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'zm-formulario-publico-otp',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './formulario-publico-otp.component.html',
})
export class FormularioPublicoOtpComponent {
  @Input() otpChannel: 'email' | 'whatsapp' = 'email';
  @Input() otpPhone = '';
  @Input() otpCode = '';
  @Input() otpVerified = false;
  @Input() otpSending = false;
  @Input() otpVerifying = false;
  @Input() otpErro = '';
  @Input() otpWhatsappAvailable = false;
  @Input() personLinkRequired = false;
  @Input() submitterEmail = '';

  @Output() otpChannelChange = new EventEmitter<'email' | 'whatsapp'>();
  @Output() otpPhoneChange = new EventEmitter<string>();
  @Output() otpCodeChange = new EventEmitter<string>();
  @Output() submitterEmailChange = new EventEmitter<string>();
  @Output() identityChange = new EventEmitter<void>();
  @Output() sendOtp = new EventEmitter<void>();
  @Output() verifyOtp = new EventEmitter<void>();

  private nordValue(event: Event): string {
    return (event.target as { value?: string } | null)?.value ?? '';
  }

  onChannelChange(event: Event): void {
    const value = this.nordValue(event);
    this.otpChannelChange.emit(value === 'whatsapp' ? 'whatsapp' : 'email');
  }

  onEmailInput(event: Event): void {
    this.submitterEmailChange.emit(this.nordValue(event));
    this.identityChange.emit();
  }

  onPhoneInput(event: Event): void {
    this.otpPhoneChange.emit(this.nordValue(event));
  }

  onCodeInput(event: Event): void {
    this.otpCodeChange.emit(this.nordValue(event));
  }
}
