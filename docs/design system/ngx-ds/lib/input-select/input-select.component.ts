import {
    Component,
    ElementRef,
    EventEmitter,
    HostBinding,
    inject,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
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
import { Clipboard, ClipboardModule } from '@angular/cdk/clipboard';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ToastService } from '../toast/toast.service';
import { Observable, Subject } from 'rxjs';
import { map, startWith, takeUntil, tap } from 'rxjs/operators';
import {
    MatAutocompleteModule,
    MatAutocompleteSelectedEvent,
    MatAutocompleteTrigger,
} from '@angular/material/autocomplete';
import { VixCadService } from 'projects/up/src/app/services/api/vixcad.service';
import { VixProService } from 'projects/up/src/app/services/api/vixpro.service';
import { PaginaService } from 'projects/up/src/app/services/pagina.service';
import { VixParService } from 'projects/up/src/app/services/api/vixpar.service';
import { VixTabPreService } from 'projects/up/src/app/services/api/vixTabPre.service';
import { PlanosContaModalComponent } from 'projects/up/src/app/pages/painel/configuracoes/planos-conta/planos-conta-modal-component';
import { ModalService } from '../services/modal.service';


@Component({
    selector: 'upx-input-select',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, ClipboardModule, MatIconModule, MatInputModule, MatAutocompleteModule],
    templateUrl: './input-select.component.html',
    styleUrls: ['./input-select.component.scss'],
    host: {
        'class': 'upx-input',
        '[class.upx-input--readonly]': 'this.readOnly',
        '[class.upx-input--disabled]': 'this.disabled',
        '[class.upx-input--feedback-disabled]': 'this.feedbackDisabled',
        '[class.upx-input--size-1]': 'this.icon',
        '[class.upx-input--size-xs]': 'this.size === "xs"',
        '[class.upx-input--size-sm]': 'this.size === "sm"',
        '[class.upx-input--size-md]': 'this.size === "md"',
        '[class.upx-input--size-lg]': 'this.size === "lg"',
        '[class.upx-input--size-xl]': 'this.size === "xl"'
    },
    providers: [CurrencyPipe],
    encapsulation: ViewEncapsulation.None
})
export class InputSelectComponent implements OnInit, OnChanges {
    httpClient: HttpClient = inject(HttpClient);
    currencyPipe: CurrencyPipe = inject(CurrencyPipe);
    clipboard: Clipboard = inject(Clipboard);
    toastService: ToastService = inject(ToastService);
    vixCadService: VixCadService = inject(VixCadService);
    vixProService: VixProService = inject(VixProService);
    vixParService: VixParService = inject(VixParService);
    vixTabPreService: VixTabPreService = inject(VixTabPreService);
    paginaService: PaginaService = inject(PaginaService);
    modalService: ModalService = inject(ModalService);
    showAdd = false;
    valueAdd = '';
    @Input() subscriptSizing: boolean = false;
    @Input() floatLabel: boolean = false;
    @Input() type: string = 'text';
    @Input() placeholderText: string = '';
    @Input() suffixText!: string;
    @Input() icon?: string;
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
    @Input() model: string | null = null;
    @Input() enableChangeFieldWithEnter: boolean = false;
    @Input() enableNone: boolean = false;
    /**
     * Código do vendedor favorito (ex.: `vnd_6010_cod_vnd`): quando informado, exibe estrela amarela
     * na opção correspondente do autocomplete — não no campo de texto.
     */
    @Input() vendedorFavoritoCodigo: number | null = null;

    myControl = new FormControl();
    @Input() field: FormControl = this.myControl;  // Pega e envia o nome do objeto selecionado

    @Input() fieldIdList = new FormControl();  // Pega e envia o id do objeto selecionado

    @Input() onAction?: (args?: any) => void;
    @Input() responseAction?: any;
    @Output() responseActionChange = new EventEmitter<any>();
    @Output() issueCloseFunction = new EventEmitter<any>();
    @Output() fieldChange = new EventEmitter<FormControl>();
    @Output() closeIconClick = new EventEmitter<any>();

    @ViewChild('upxInput') upxInput: ElementRef<HTMLInputElement> | undefined;
    @ViewChild(MatAutocompleteTrigger) private matAutocompleteTrigger?: MatAutocompleteTrigger;
    typeInput: string = 'text';



    @Input() valueToFilterName?: any; // Passar o Valor via componente para receber e realizar a busca pelo objeto
    @Input() valueToFilterId?: any; // Passar o Valor via componente para receber e realizar a busca pelo objeto
    @Input() selectOptions?: any[];
    @Input() isAutoCompleteStyle: boolean = false;
    @Input() addInLine: boolean = false;
    @Input() dataSend?: any;
    @Input() serviceData?: any;


    private readonly destroy$: Subject<void> = new Subject();
    options: (string | number)[][] = [];
    private optionNameCounts: Record<string, number> = {};

    @Output() optionSelected = new EventEmitter<any>(); // Recebe um evento de click dentro do <mat-option> </mat-option>
    @Output() itemSaved = new EventEmitter<any>();
    @Output() onFocus = new EventEmitter<void>();
    filteredOptions!: Observable<(string | number)[][]>;


    public limit: number = 20;
    public totalFilteredOptions: number = 0; // Nova variável para armazenar o total de opções filtradas
    public showLoadMoreButton: boolean = false; // Adicione esta linha

    @HostBinding('class')
    get classes() {
        return {
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
    };

    constructor() {
        if (this.disabled) this.field.disable();
    }

    ngOnInit(): void {

        this.typeInput = this.type;

        switch (this.type) {
            case 'email':
                if (!this.icon) this.icon = this.icons['email'];
                if (!this.onAction) {
                    this.onAction = () => {
                        if (this.field && this.field.valid) window.location.href = `mailto:${this.field.value}`;
                    };
                }
                break;

            case 'tel':
                if (!this.icon) this.icon = this.icons['tel'];
                if (!this.onAction) {
                    this.onAction = () => {
                        if (this.field && this.field.valid) window.location.href = `tel:${this.field.value}`;
                    };
                }
                break;

            case 'password':
                if (!this.icon) this.icon = this.icons['password'];
                if (!this.onAction) {
                    this.onAction = () => {
                        this.typeInput = this.typeInput === 'password' ? 'text' : 'password';
                    };
                }
                break;

            case 'url':
                if (!this.icon) this.icon = this.icons['url'];
                if (!this.onAction) {
                    this.onAction = () => {
                        if (this.field && this.field.valid) window.location.href = `${this.field.value}`;
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
                        } catch (error) { }
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
                                this.httpClient.get(`https://receitaws.com.br/v1/cnpj/${cnpj}`).subscribe((response: any) => {
                                    this.responseActionChange.emit(response);
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
                break;
        }

        this.myControl.valueChanges.subscribe(() => {
            this.formatMask();
        });

        if (this.field && this.disabled) this.field.disable();

        this.filtragemDoInput();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['selectOptions'] || changes['valueToFilterName'] || changes['valueToFilterId']) {
            this.filtragemDoInput();
        }
    }

    /** Estrela na linha da opção cujo id (`option[1]`) coincide com `vendedorFavoritoCodigo`. */
    isOpcaoVendedorFavorito(option: (string | number)[] | undefined): boolean {
        if (
            this.vendedorFavoritoCodigo === null ||
            this.vendedorFavoritoCodigo === undefined
        ) {
            return false;
        }
        const cod = Number(this.vendedorFavoritoCodigo);
        if (!Number.isFinite(cod) || cod <= 0) {
            return false;
        }
        const optId = Number(option?.[1]);
        return Number.isFinite(optId) && optId === cod;
    }

    getIcon() {
        switch (this.type) {
            case 'password':
                return this.field.value ? (this.typeInput === 'password' ? 'visibility_off' : 'visibility') : 'lock';
            default:
                return this.icon ? this.icon : this.icons[this.type];
        }
    }

    handleFocus() {
        this.onFocus.emit();
        this.changeEmit();
    }

    /** Fecha o painel do `mat-autocomplete` e remove o foco do input (ex.: modal em tela cheia no PDV). */
    public fecharPainelAutocomplete(): void {
        try {
            this.matAutocompleteTrigger?.closePanel();
        } catch {
            // noop
        }
        try {
            this.upxInput?.nativeElement?.blur();
        } catch {
            // noop
        }
    }

    changeEmit() {
        
        // const domSelect: HTMLElement | null = document.querySelector('.cdk-overlay-container');

		// if(domSelect){
		// 	(domSelect as HTMLElement).style.setProperty('pointer-events', 'auto', 'important');
		// }

        this.fieldChange.emit(this.field);
        this.filtragemDoInput()
    }

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

    inputOnKeyUp(event: KeyboardEvent) {
        this.handleChangeFieldWithEnter(event)
    }

    handleChangeFieldWithEnter(event?: KeyboardEvent) {
        if (this.enableChangeFieldWithEnter && event?.key === 'Enter') {
            const inputs = Array.from(document.querySelectorAll('input, select, textarea')).filter((element: any) => !element.disabled && element.offsetParent !== null);

            const currentIndex = inputs.indexOf(event?.target as HTMLInputElement);

            const nextInput = inputs[currentIndex + 1] as HTMLInputElement;

            if (nextInput) {
                nextInput.focus();
            }
        }
    }

    formatMask() {
        if (this.mask && this.field.value) {
            let maskedValue = this.getMaskedValue();
            if (maskedValue !== false)
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
                value = new UpxBrPhoneNumberMask(maskOptions).getValue(this.field.value);
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
            default:
                value = false;
        }

        return value;
    }

    copy() {
        this.clipboard.copy(this.field.value);
        this.toastService.info('Copiado com sucesso!');
    }

    getErrorMessage() {
        if (this.field.hasError('required')) {
            return 'Você deve inserir um valor.';
        }
        if (this.field.hasError('email')) {
            return 'Não é um e-mail válido.';
        }
        return '';
    }

    ngDoCheck(): void {
        //this.filtragemDoInput()
    }


    filtragemDoInput() {
        if (this.selectOptions) {

            const arrayOptions: any[] = []

            if(Array.isArray(this.selectOptions)) {                
                this.options = this.selectOptions.map(item => [item[this.valueToFilterName], item[this.valueToFilterId], item]);
            } else {

                for (const chave in this.selectOptions as (object)) {
                    arrayOptions.push(this.selectOptions[chave]);
                  }

                  if(arrayOptions.length > 0){
                      this.options = arrayOptions.map(item => [item[this.valueToFilterName], item[this.valueToFilterId], item]);
                  }

            }

        } else {

            this.options = [];
        }

        this.optionNameCounts = {};
        for (const opt of this.options) {
            const name = (opt?.[0] ?? '').toString().trim().toLowerCase();
            if (!name) continue;
            this.optionNameCounts[name] = (this.optionNameCounts[name] ?? 0) + 1;
        }
        this.filteredOptions = this.myControl.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value)),
        );
    }

    private normalizeDigits(value: unknown): string {
        if (value === null || value === undefined) return '';
        return String(value).replace(/\D/g, '');
    }

    getOptionLabel(option: (string | number)[]): string {
        const name = (option?.[0] ?? '').toString();
        const key = name.trim().toLowerCase();
        const item: any = option?.[2];

        if (this.valueToFilterName === 'cad_nome_razao' && this.optionNameCounts[key] > 1) {
            const doc = item?.cad_cpf_cnpj ?? item?.cad_cnpj ?? item?.cad_cpf ?? '';
            const docDigits = this.normalizeDigits(doc);
            if (docDigits) {
                return `${name} - ${docDigits}`;
            }
        }

        return name;
    }

    private _filter(value: string): (string | number)[][] {

        const filterValue = value.toLowerCase();

        this.showAdd = false;
        let length = 0;

        if (this.field && this.field.value && (typeof this.field.value === 'string')) {
            length = this.field.value.length;
        } else if (this.field && this.field.value) {
            let converteString = this.field.value.toString();
            length = converteString.length;
        }
        // let length = this.field && this.field.value ? this.field.value.length : 0;

        let filteredOptions;
        if (length > 1) {
            if (this.isAutoCompleteStyle && (this.valueToFilterId == 'pro_cod_bar' || this.valueToFilterId == 'pro_cod_ori' || this.valueToFilterId == 'pro_cod_pro' || this.valueToFilterId == 'pro_cod_ori_table' || this.valueToFilterId == 'pro_cod_interno')) {
                if (this.valueToFilterId == 'pro_cod_bar') {
                    filteredOptions = this.options.filter(option =>
                        option[1] && (option[1].toString()).toLowerCase().includes(this.field && this.field.value ? this.field.value.toString().toLowerCase() : "")
                    );
                } else if (this.valueToFilterId == 'pro_cod_pro') {
                    let isNumber = false;
                    if (this.field && this.field.value) {
                        isNumber = /^[0-9]+$/.test(this.field.value);
                    }

                    let index = isNumber ? 1 : 0;
                    if (isNumber) {
                        filteredOptions = this.options.filter(option =>
                            option[index] && (option[index] == parseInt(this.field.value))
                        );
                    } else {
                        filteredOptions = this.options.filter(option =>
                            option[index] && (option[index] as string).toLowerCase().includes(this.field && this.field.value ? this.field.value.toLowerCase() : "")
                        );
                    }

                } else if (this.valueToFilterId == 'pro_cod_ori_table') {

                    // Busca específica pelo código original na tabela (pro_cod_ori está na posição [1])
                    filteredOptions = this.options.filter((option: any) => {
                        return option[2].pro_cod_ori && option[2].pro_cod_ori.toString().toLowerCase().includes(this.field && this.field.value ? this.field.value.toString().toLowerCase() : "")
                        // option[1] && option[1].toString().toLowerCase().includes(this.field && this.field.value ? this.field.value.toString().toLowerCase() : "")
                    });

                    // filteredOptions = this.options.find((item: any) =>
                    //     String(item.pro_cod_ori) === String(this.field.value)
                    // );
                } else if (this.valueToFilterId == 'pro_cod_interno') {
                    // Busca específica pelo código interno (pro_cod_interno está na posição [1])
                    filteredOptions = this.options.filter((option: any) => {
                        return option[1] && option[1].toString().toLowerCase().includes(this.field && this.field.value ? this.field.value.toString().toLowerCase() : "")
                    });
                } else {

                    // let isNumber = false;
                    // if (this.field && this.field.value) {
                    //     isNumber = /^[0-9]+$/.test(this.field.value);
                    // }

                    // let index = isNumber ? 1 : 0;
                    filteredOptions = this.options.filter(option =>
                        option[1] && (option[1] as string).toLowerCase().includes(this.field && this.field.value ? this.field.value.toLowerCase() : "")
                    );

                    if(filteredOptions.length === 0){
                        filteredOptions = this.options.filter(option =>
                            option[0] && (option[0] as string).toLowerCase().includes(this.field && this.field.value ? this.field.value.toLowerCase() : "")
                        );  
                    }
                    
                }
                if (!filteredOptions.length) {
                    this.showAdd = true;
                    this.valueAdd = this.field.value;
                }
            } else {

							if (this.valueToFilterName == 'cad_nome_razao') {
								filteredOptions = this.options.filter(option => {
									let item: any = option[2];

                                    const needleText = (this.field?.value ?? '').toString().toLocaleString().toLowerCase();
                                    const needleDigits = this.normalizeDigits(this.field?.value ?? '');

									const campos = [
										item.cad_nome_razao?.toLowerCase() || '',
										item.cad_apelido_fantasia?.toLowerCase() || '',
                                        item.cad_cpf_cnpj?.toString().toLowerCase() || '',
									];

                                    // Busca por texto (razão/fantasia) e por dígitos (CNPJ/CPF)
									return campos.some((campo: any) => campo.includes(needleText))
                                        || (needleDigits.length >= 3 && this.normalizeDigits(item.cad_cpf_cnpj).includes(needleDigits));
								});
							} else {
								filteredOptions = this.options.filter(option =>
									option[0] && (option[0] as string).toLowerCase().includes(this.field && this.field.value ? this.field.value.toLowerCase() : "")
								);
							}

							if (!filteredOptions.length) {
									this.showAdd = true;
									this.valueAdd = this.field.value;
							}
            }


        } else {
            filteredOptions = this.options.filter(option =>
                option[0] && (option[0] as string).toLowerCase().includes(filterValue)
            );
        }
        this.showLoadMoreButton = filteredOptions.length > 20; // Atualize esta linha

        return filteredOptions.slice(0, this.limit);
    }

    onOptionSelected(event: MatAutocompleteSelectedEvent) {
        if (typeof event.option.value != 'undefined') {
            const selectedOption = event.option.value;

            this.optionSelected.emit(event.option.value);

            this.field.setValue(selectedOption[0]);
            this.fieldIdList.setValue(selectedOption[1]);
        }
        else {
            this.createData();
        }
        this.handleChangeFieldWithEnter();
    }

    public loadMore(): void {
        this.limit += 20;
        this.filtragemDoInput();

    }

    createData() {
        if (this.model != null) {
            switch (this.model) {
                case 'vix-cad':
                    if (this.serviceData.cad_tip_cli_for != null) {

                        const dataSend = {
                            cad_pf_pj: this.serviceData.cad_pf_pj ?? 1,
                            cad_tip_cli_for: this.serviceData.cad_tip_cli_for,
                            cad_nome_razao: this.valueAdd,
                            cad_eh_inativo: 0,
                            cad_cpf_cnpj: this.serviceData.cad_cpf_cnpj ?? null
                        }
                        this.paginaService.setLoading(true);
                        this.vixCadService
                            .salvarVixCad(dataSend)
                            .pipe(takeUntil(this.destroy$))
                            .subscribe({
                                next: (data: any) => {
                                    this.paginaService.setLoading(false);
                                    const dataReturn = {
                                        cad_cod_cad: data.records.cad_cod_cad,
                                        model: this.model
                                    }
                                    this.itemSaved.emit(dataReturn)
                                },
                                error: (error) => {
                                    this.paginaService.setLoading(false);
                                    console.error(error);
                                },
                            });

                    }
                    break;
                case 'vix-pro':
                    if (this.serviceData.pro_eh_servico != null) {
                        this.modalService.confirm(`Tem certeza que deseja incluir este registro ${this.valueAdd}?`).subscribe((confirm) => {
                            if (confirm) {
                                const dataSend = {
                                    pro_eh_servico: this.serviceData.pro_eh_servico,
                                    pro_descricao_longa: this.valueAdd,
                                    pro_eh_inativo: 0,
                                    pro_tip_unidade: 0
                                }
                                this.paginaService.setLoading(true);
                                this.vixProService
                                    .salvarProduto(dataSend)
                                    .pipe(takeUntil(this.destroy$))
                                    .subscribe({
                                        next: (data: any) => {
                                            this.paginaService.setLoading(false);
                                            const dataReturn = {
                                                pro_cod_pro: data.records.pro_cod_pro,
                                                model: this.model
                                            }
                                            this.itemSaved.emit(dataReturn)
                                        },
                                        error: (error) => {
                                            this.paginaService.setLoading(false);
                                            console.error(error);
                                        },
                                    });
                            }
                        });
                        
                    }
                    break;

                // 	break;
                case 'vix-pla':
                    this.fieldChange.emit(this.field);
                    this.modalService.modalForm(PlanosContaModalComponent, {
                        item: {
                            strFuncao: "Nova Categoria",
                            item: {
                                pla_descricao: this.valueAdd
                            }
                        }
                    })
                        .subscribe((returnedItem) => {
                            if (typeof returnedItem != 'undefined' && returnedItem.hasChanged) {
                                let retorno = {
                                    model: this.model,
                                    returnedItem
                                }
                                this.itemSaved.emit(retorno)
                            }

                        });
                    break;
                case 'vix-tab-pre':
                    const dataSendTabPre = {
                        descricao: this.valueAdd
                    };
                    this.paginaService.setLoading(true);
                    this.vixTabPreService
                        .criarTabelaPreco(dataSendTabPre)
                        .pipe(takeUntil(this.destroy$))
                        .subscribe({
                            next: (data: any) => {
                                this.paginaService.setLoading(false);
                                const dataReturn = {
                                    tab_cod_tab: data.records.data.tab_cod_tab,
                                    tab_descricao: data.records.data.tab_descricao,
                                    model: this.model
                                };

                                this.itemSaved.emit(dataReturn);
                            },
                            error: (error) => {
                                this.paginaService.setLoading(false);
                                console.error(error);
                            },
                        });
                    break;
                default:
                    this.updatePar();
                    break;
            }
        }
    }

    /*
          private _filter(value: string): (string | number)[][] {
            const filterValue = value.toLowerCase();
            let length = this.field.value ? this.field.value.length : 0;
            if(length > 1) {
                return this.options.filter(option =>
                    (option[0] as string).toLowerCase().includes(this.field.value.toLowerCase())
                );
            }
            return this.options.filter(option => (option[0] as string).toLowerCase().includes(filterValue));
        }
    */
	updatePar(){
		interface ObjModal {
			par_c01: string;
			par_i03?: string;
		}
		const dataSend: ObjModal = {
			par_c01: this.valueAdd
		}
		if (this.model == 'vix-cdc') {
			dataSend.par_i03 = this.serviceData.par_i03
		};
		this.paginaService.setLoading(true);
		this.vixParService.setVixPar(`/${this.model}/`, dataSend).pipe(takeUntil(this.destroy$))
				.subscribe({
					next: (data: any) => {
						this.paginaService.setLoading(false);
						if (!data.records.error) {
							const dataReturn ={
								par_pai: data.records.par_pai,
								par_descricao: data.records.params.par_c01,
								model: this.model
							}
							this.itemSaved.emit(dataReturn)
						}
						else {
							this.toastService.error(data.records.msg);
						}

                },
                error: (error) => {
                    console.error(error);
                    this.toastService.error("Erro ao processar requisição, contate o suporte!");
                    this.paginaService.setLoading(false);
                }
            })
    }


    close() {
        if (this.field) {
            this.field.reset();
            this.field.markAsDirty();
        }
        if (this.fieldIdList) {
            this.fieldIdList.reset();
            this.fieldIdList.markAsDirty();
        }
        this.changeEmit();
        this.issueCloseFunction.emit(true);
        this.closeIconClick.emit(true);
    }

}
