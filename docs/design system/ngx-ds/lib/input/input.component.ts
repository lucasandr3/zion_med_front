import {
	Component,
	ElementRef,
	EventEmitter,
	HostBinding,
	inject,
	Input,
	OnInit,
	Output,
	ViewChild,
	ViewEncapsulation,
} from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { UpxBrPhoneNumberMask } from '../mask/phone/br-phone';
import { UpxCpfCnpjMask } from '../mask/cpf-cnpj/cpf-cnpj';
import { HttpClient } from '@angular/common/http';
import { UpxMoneyMask } from '../mask/money/money';
import { UpxPercentMask } from '../mask/percent/percent';
import { UpxPercent4DecimalsMask } from '../mask/percent/percent-4-decimals';
import { Clipboard, ClipboardModule } from '@angular/cdk/clipboard';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ToastService } from '../toast/toast.service';
import { UpxNcmMask } from '../mask/ncm/ncm';
import { UpxNumberMask } from '../mask/only-number/number';
import { UpxWeightMask } from '../mask/weight/weight';
import { UpxCepMask } from '../mask/cep/cep';
import { VixCadService } from 'projects/up/src/app/services/api/vixcad.service';
import { PaginaService } from 'projects/up/src/app/services/pagina.service';
import { UpxCreditCardMask } from '../mask/credit-card/credit-card';
import { UpxPlacaMask } from '../mask/placa/placa';
import { UpxCestMask } from '../mask/cest/cest';
import { UpxDecimalAliquotaMask } from '../mask/aliquota/money';
import { AppHttpsAutoDirective } from '../../../../directives/app-https-auto.directive';
import { UpxDecimalMask } from '../mask/decimal/decimal';
import { UpxDateBRMask } from '../mask/date/UpxDateBRMask';
import { UpxNbsMask } from '../mask/nbs/nbs';

@Component({
	selector: 'upx-input',
	standalone: true,
	imports: [
		CommonModule,
		ReactiveFormsModule,
		ClipboardModule,
		MatIconModule,
		MatInputModule,
		AppHttpsAutoDirective,
	],
	templateUrl: './input.component.html',
	styleUrls: ['./input.component.scss'],
	host: {
		class: 'upx-input',
		'[class.upx-input--readonly]': 'this.readOnly',
		'[class.upx-input--disabled]': 'this.disabled',
		'[class.upx-input--feedback-disabled]': 'this.feedbackDisabled',
		'[class.upx-input--size-1]': 'this.icon',
		'[class.upx-input--size-xs]': 'this.size === "xs"',
		'[class.upx-input--size-sm]': 'this.size === "sm"',
		'[class.upx-input--size-md]': 'this.size === "md"',
		'[class.upx-input--size-lg]': 'this.size === "lg"',
		'[class.upx-input--size-xl]': 'this.size === "xl"',
	},
	providers: [CurrencyPipe],
	encapsulation: ViewEncapsulation.None,
})
export class InputComponent implements OnInit {
	httpClient: HttpClient = inject(HttpClient);
	currencyPipe: CurrencyPipe = inject(CurrencyPipe);
	clipboard: Clipboard = inject(Clipboard);
	toastService: ToastService = inject(ToastService);
	vixCadService: VixCadService = inject(VixCadService);
	paginaService: PaginaService = inject(PaginaService);

	@Input() enableChangeFieldWithEnter: boolean = false;
	@Input() enableClickNextButtonOnEnter: boolean = false;
	@Input() subscriptSizing: boolean = false;
	@Input() floatLabel: boolean = false;
	@Input() buttonIdToClickOnEnter?: string;
	@Input() type: string = 'text';
	@Input() placeholderText: string = '';
	@Input() suffixText!: string;
	@Input() icon?: string;
	@Input() isIconEmail: boolean = true;
	@Input() isIconTel: boolean = true;
	@Input() isIconCel: boolean = true;
	@Input() iconFa?: string;
	@Input() size: string = 'md'; // xs, sm, md, lg, xl
	@Input() required: boolean = false;
	@Input() disabled: boolean = false;
	@Input() readOnly: boolean = false;
	@Input() feedbackDisabled: boolean = false;
	@Input() autocomplete?: string;
	@Input() minlength?: string;
	@Input() maxlength?: string;
	@Input() min?: string;
	@Input() max?: string;
	@Input() step?: string;
	@Input() inputmode?: string;
	@Input() pattern?: string;
	@Input() accept?: string;
	@Input() multiple?: string;
	@Input() isCopyEnabled = true;
	@Input() isResetEnabled = true;
	@Input() mask?: string;
	@Input() maskOptions?: any;
	@Input() reference?: string;
	@Input() showStartArrow: boolean = false;
	@Input() integerValue: boolean = false;
	@Input() showEndArrow: boolean = false;
	@Input() dateMask: boolean = false;
	@Input() fieldId: string = `upx-input-${Math.random().toString(36).substr(2, 8)}`;
	@Input() versionInput: string = 'v1';
	@Input() field!: FormControl;
	@Input() onAction?: (args?: any) => void;
	@Input() responseAction?: any;
	@Input() functionIconClose: ((event: any, data: any) => any) | undefined;
	@Input() dataIconClose: any = null;
	@Input() backGroundColor: string = '';
	@Input() httpsDirective: boolean = false;
	@Input() redeSocial: string = ''; // 'instagram', 'facebook', 'linkedin', 'youtube', 'google+', 'twitter'
	@Output() responseActionChange = new EventEmitter<any>();
	@Output() responseActionChangeIcon = new EventEmitter<any>();
	@Output() changeClear = new EventEmitter<boolean>();

	@Output() fieldChange = new EventEmitter<FormControl>();
	@Output() inputChange = new EventEmitter<FormControl>();

	@Output() changeDate = new EventEmitter<boolean>();

	@Output() changeMask = new EventEmitter<boolean>();

	@Output() onBlur: EventEmitter<void> = new EventEmitter<void>();

	@ViewChild('upxInput') upxInput: ElementRef | undefined;

	typeInput: string = 'text';

	@HostBinding('class')
	get classes() {
		return {
			/*'upx-input-valid': this.field ? this.field.valid : false,
			'upx-input-invalid': this.field ? this.field.invalid && (this.field.dirty || this.field.touched) : false,

			'upx-input-size-1': this.icon,*/
			//'upx-input-size-2': (!this.icon && this.field.value) || (this.icon && !this.field.value),
			//'upx-input-size-3': this.field.value && this.icon,
			/*'upx-input--size-xs': this.size === 'xs',
			'upx-input--size-sm': this.size === 'sm',
			'upx-input--size-md': this.size === 'md',
			'upx-input--size-lg': this.size === 'lg',
			'upx-input--size-xl': this.size === 'xl',

			'upx-input-readonly': this.readOnly,
			'upx-input-disabled': this.disabled,*/
		};
	}

	icons: any = {
		number: 'pin',
		email: 'email',
		tel: 'phone',
		date: 'today',
		password: 'visibility_off',
		url: 'public',
		'cpf-cnpj': 'find_replace',
		money: 'money',
		cube: '3d_rotation',
		percent: 'percent',
		format_quote: 'format_quote'
	};

	@HostBinding('class.is-date')
	get isDateInput(): boolean {
		return this.type === 'date';
	}

	iconsFa: any = '';

	constructor() {
		if (this.disabled) this.field.disable();
	}

	ngOnInit(): void {
		this.typeInput = this.type;

		switch (this.type) {
			case 'email':
				if (this.isIconEmail) {
					if (!this.icon) this.icon = this.icons['email'];
					if (!this.onAction) {
						this.onAction = () => {
							if (this.field && this.field.valid)
								window.location.href = `mailto:${this.field.value}`;
						};
					}
				}
				break;

			case 'tel':
				if (this.isIconTel) {
					if (!this.icon) this.icon = this.icons['tel'];
					if (!this.onAction) {
						this.onAction = () => {
							if (this.field && this.field.valid)
								window.location.href = `tel:${this.field.value}`;
						};
					}
				}
				break;

			case 'cel':
				if (this.isIconCel) {
					this.isCopyEnabled = false;
					if (!this.icon) this.icon = this.icons['tel'];
					if (!this.iconFa) this.iconFa = 'fab fa-whatsap';
					if (!this.onAction) {
						this.onAction = (x: number = 0) => {
							if (this.field && this.field.valid) {
								if (x == 1) {
									let value = this.field.value
										.replace(/[^\w\s]/gi, '')
										.replace(' ', '')
										.replace(' ', '');
									window.open(`https://wa.me/+55${value}`, '_blank');
								} else {
									window.location.href = `tel:${this.field.value}`;
								}
							}
						};
					}
				}
				break;

			case 'password':
				if (!this.icon) this.icon = this.icons['password'];
				if (!this.onAction) {
					this.onAction = () => {
						this.typeInput =
							this.typeInput === 'password' ? 'text' : 'password';
					};
				}
				break;

			case 'url':
				if (!this.icon) this.icon = this.icons['url'];
				if (!this.onAction) {
					this.onAction = () => {
						if (this.field && this.field.valid)
							window.open(`https://${this.field.value}`, '_blank');
					};
				}
				break;

			case 'month':
			case 'week':
			case 'time':
			case 'datetime-local':
			case 'date':
				if (!this.icon) this.icon = this.icons['date'];
				if (!this.onAction) {
					this.onAction = () => {
						try {
							this.upxInput?.nativeElement?.showPicker();
						} catch (error) {}
					};
				}
				break;

			case 'cpf-cnpj':
				this.typeInput = 'text';
				this.mask = 'cpf-cnpj';
				//if (!this.icon) this.icon = this.icons['cpf-cnpj'];
				if (!this.onAction) {
					this.onAction = () => {
						if (this.field && this.field.valid) {
							const isCNPJ = new UpxCpfCnpjMask().isCNPJ(this.field.value);
							if (isCNPJ) {
								const cnpj = new UpxCpfCnpjMask().clearValue(this.field.value);

								this.paginaService.setLoading(true);

								this.vixCadService
									.getdadosEndereco(cnpj)
									.subscribe((response: any) => {
										if (response.records && !response.records.error) {
											this.paginaService.setLoading(false);
											this.responseActionChange.emit(response.records);
										} else {
											this.paginaService.setLoading(false);
											this.toastService.error("CNPJ Inválido!");
										}
									});
							}
						}
					};
				}
				this.field.valueChanges.subscribe(() => {
					const isCNPJ = new UpxCpfCnpjMask().isCNPJ(this.field.value ?? '');
					this.icon = isCNPJ ? this.icons['cpf-cnpj'] : undefined;
				});
				break;

			case 'money':
				this.typeInput = 'text';
				this.mask = 'money';
				if (!this.icon) this.icon = this.icons['money'];
				if (!this.onAction) {
					this.onAction = () => {
						this.responseActionChangeIcon.emit(this.onAction);
					};
				}
				break;

			case 'moneyTot':
				this.typeInput = 'text';
				this.mask = 'money';
				if (!this.icon) this.icon = this.icons['money'];
				if (!this.onAction) {
					this.onAction = () => {
						//if (this.field && this.field.valid) window.location.href = `${this.field.value}`;
					};
				}
				break;

			case 'moneyPorc':
				this.typeInput = 'text';
				this.mask = 'money';
				if (!this.icon) this.icon = this.icons['money'];
				if (!this.onAction) {
					this.onAction = () => {
						this.responseActionChangeIcon.emit(this.onAction);
					};
				}
				break;

			case 'percentMoney':
				this.typeInput = 'text';
				if (!this.mask) {
					this.mask = 'percent';
				}
				if (!this.icon) this.icon = this.icons['percent'];
				if (!this.onAction) {
					this.onAction = () => {
						this.responseActionChangeIcon.emit(this.onAction);
					};
				}
				break;

			case 'decimal':
				this.typeInput = 'text';
				this.mask = 'decimal';
				if (!this.icon) this.icon = this.icons['format_quote'];
				if (!this.onAction) {
					this.onAction = () => {
						this.responseActionChangeIcon.emit(this.onAction);
					};
				}
				break;

			case 'percentAliquota':
				this.typeInput = 'text';
				this.mask = 'aliquota';
				if (!this.icon) this.icon = this.icons['percent'];
				if (!this.onAction) {
					this.onAction = () => {
						this.responseActionChangeIcon.emit(this.onAction);
					};
				}
				break;

			case 'cube':
				if (!this.icon) this.icon = this.icons['cube'];
				break;

			case 'text':
				this.typeInput = 'text';
				if (!this.onAction) {
					this.onAction = () => {
						this.responseActionChangeIcon.emit(this.onAction);
					};
				}
				break;
		}

		this.field.valueChanges.subscribe(() => {
			this.formatMask();
		});

		if (this.field && this.disabled) this.field.disable();
	}

	clearField(event: any) {
		if (
			this.functionIconClose &&
			typeof this.functionIconClose !== 'undefined'
		) {
			this.functionIconClose(event, this.dataIconClose);
		}

		this.field.reset();
		this.changeClear.emit(true);
	}

	getIcon() {
		switch (this.type) {
			case 'password':
				return this.field.value
					? this.typeInput === 'password'
						? 'visibility_off'
						: 'visibility'
					: 'lock';
			default:
				return this.icon ? this.icon : this.icons[this.type];
		}
	}

	changeEmit() {
		this.fieldChange.emit(this.field);
	}

	inputChangeEvent = () => {
		this.inputChange.emit(this.field);
	};

	clear() {
		if (this.field) {
			this.field.reset();
			this.field.markAsDirty();
			this.changeEmit();
		}
	}

	action() {
		if (this.onAction) {
			this.responseActionChange.emit(this.onAction());
		}
	}

	action2(x: any) {
		if (this.onAction) {
			this.responseActionChange.emit(this.onAction(x));
		}
	}

	inputOnKeyUp(event: KeyboardEvent) {
		if (this.type === 'date') {
			const input = event.target as HTMLInputElement;
			if (input.value.length > 10) {
				const truncated = input.value.slice(0, 10);
				this.field.setValue(truncated, { emitEvent: false });
				return;
			}
		}
		this.handleChangeFieldWithEnter(event);
	}

	// funcao para passar para o próximo elemento ao pressionar enter
	handleChangeFieldWithEnter(event: KeyboardEvent) {
		if (event.key === 'Enter' && this.enableChangeFieldWithEnter) {
			const inputs = Array.from(
				document.querySelectorAll('input, select, textarea')
			).filter(
				(element: any) => !element.disabled && element.offsetParent !== null
			);

			const currentIndex = inputs.indexOf(event.target as HTMLInputElement);
			const nextInput = inputs[currentIndex + 1] as HTMLInputElement;

			if (nextInput) {
				nextInput.focus();
			}
		}
	}

	// funcao para emitir o evento de click no botao com id btn-save
	saveOnPressEnter(event: KeyboardEvent) {
		if (
			this.buttonIdToClickOnEnter &&
			this.enableClickNextButtonOnEnter &&
			event.key === 'Enter'
		) {
			const btn = document.getElementById(
				this.buttonIdToClickOnEnter
			) as HTMLButtonElement;
			if (btn) {
				btn.click();
			}
		}
	}

	formatMask() {
		if (!this.mask) {
			return;
		}

		if (this.field.value === null || this.field.value === undefined) {
			return;
		}

		const maskedValue = this.getMaskedValue();
		if (maskedValue !== false) {
			setTimeout(() => {
				this.field.setValue(maskedValue, { emitEvent: false });
			}, 0);
		}
	}

	getMaskedValue() {
		let value;
		let maskOptions = this.maskOptions ? this.maskOptions : {};
		switch (this.mask) {
			case 'phone':
				value = new UpxBrPhoneNumberMask(maskOptions).getValue(
					this.field.value
				);
				break;
			case 'cpf-cnpj':
				value = new UpxCpfCnpjMask().getValue(this.field.value);
				break;
			case 'money':
				value = new UpxMoneyMask().getValueFormated(this.field.value);
				break;
			case 'percent':
				value = new UpxPercentMask().getValueFormated(this.field.value);
				break;
			case 'percent4':
				value = new UpxPercent4DecimalsMask().getValueFormated(this.field.value);
				break;
			case 'percentAliquota':
			case 'aliquota':
				value = new UpxDecimalAliquotaMask().getValueFormated(this.field.value);
				break;
			case 'number':
				value = new UpxNumberMask().getValueFormated(this.field.value);
				break;
			case 'ncm':
				value = new UpxNcmMask().getValueFormated(this.field.value);
				break;
			case 'cep':
				value = new UpxCepMask().getValueFormated(this.field.value);
				break;
			case 'weight':
				value = new UpxWeightMask().getValueFormated(this.field.value);
				break;
			case 'credit-card':
				value = new UpxCreditCardMask().getValueFormatted(
					this.field.value,
					this.mask
				);
				break;
			case 'date-card':
				value = new UpxCreditCardMask().getValueFormatted(
					this.field.value,
					this.mask
				);
				break;
			case 'cest':
				value = new UpxCestMask().getValueFormated(this.field.value);
				break;
			case 'placa':
				value = new UpxPlacaMask().getValueFormated(this.field.value);
				break;
			case 'decimal':
				value = new UpxDecimalMask().getValueFormatted(this.field.value);
				break;
			case 'nbs':
				value = new UpxNbsMask().getValueFormated(this.field.value);
				break;
			default:
				value = false;
		}

		return value;
	}

	copy() {
		this.clipboard.copy(this.field.value);
		this.toastService.info('Copiado com sucesso!');
	}

	changeDateFn() {
		this.changeDate.emit();
	}

	changeMaskInput() {
		this.changeMask.emit();
	}


	getErrorMessage() {
		if (this.field.hasError('required')) {
			return 'Você deve inserir um valor.';
		}
		if (this.field.hasError('email')) {
			return 'Não é um e-mail válido.';
		}
		if (this.field.hasError('minlength')) {
			const minLengthError = this.field.getError('minlength');
			return (
				'Deve ter pelo menos ' + minLengthError.requiredLength + ' caracteres!'
			);
		}

		if (this.field.hasError('cepInvalido')) {
			return 'O cep é inválido.';
		}

		if (this.field.hasError('telefoneInvalido')) {
			return 'O telefone é inválido.';
		}

		if (this.field.hasError('senhaForte')) {
			const senhaForteError = this.field.getError('senhaForte');
			// if (!senhaForteError.hasUpperCase) {
			// 	return 'A senha deve conter pelo menos uma letra maiúscula.';
			// }
			if (!senhaForteError.hasLowerCase) {
				return 'A senha deve conter pelo menos uma letra minúscula.';
			}
			if (!senhaForteError.hasNumeric) {
				return 'A senha deve conter pelo menos um número.';
			}
			// if (!senhaForteError.hasSpecialChar) {
			// 	return 'A senha deve conter pelo menos um caractere especial.';
			// }
		}
		return '';
	}


	mascaraPorcentagem(valor: any) {
		if (typeof valor !== 'string') valor = valor.toString();

		// Remove tudo que não for número ou vírgula/ponto
		valor = valor.replace(/[^\d.,]/g, '');

		// Troca vírgula por ponto para unificar
		valor = valor.replace(',', '.');

		// Se houver mais de um ponto, mantém só o primeiro
		const partes = valor.split('.');
		if (partes.length > 2) {
			valor = partes[0] + '.' + partes.slice(1).join('');
		}

		let numero = parseFloat(valor);
		if (isNaN(numero)) return '';

		// Arredonda para no máximo 4 casas decimais
		numero = Math.round(numero * 10000) / 10000;

		// Converte para string com no máximo 4 casas decimais, removendo zeros desnecessários
		const formatado = numero.toLocaleString('pt-BR', {
			minimumFractionDigits: 0,
			maximumFractionDigits: 4,
		});

		return formatado;
	}
}
