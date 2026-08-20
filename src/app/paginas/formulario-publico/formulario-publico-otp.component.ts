import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'zm-formulario-publico-otp',
  standalone: true,
  imports: [FormsModule],
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
}
