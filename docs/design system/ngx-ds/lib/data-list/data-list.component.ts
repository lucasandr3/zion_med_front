import {
    AfterViewInit,
    Component,
    EventEmitter,
    inject,
    Input, OnDestroy,
    OnInit,
    Output,
    QueryList,
    Renderer2,
    ViewChildren,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import { LoadingComponent } from '../loading/loading.component';
import { upxDataListInterface } from './data-list.interface';
import { AvatarComponent } from '../avatar/avatar.component';
import { BadgeComponent } from '../badge/badge.component';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { ScreenService } from '../services/screen.service';
import { FormControl } from "@angular/forms";
import { CurrencyUtil } from 'projects/up/src/app/utils/currency.util';
import { MatTooltipModule, MAT_TOOLTIP_DEFAULT_OPTIONS, MatTooltipDefaultOptions } from "@angular/material/tooltip";
import { IconsFontAwesomeModule } from "projects/up/src/app/icons-font-awesome/icons-font-awesome.module";
import { FinancaService } from 'projects/up/src/app/services/api/financa.service';
import { Router } from '@angular/router';
import { AuxFunctions } from 'projects/up/src/app/utils/auxiliaryfunctions.util';
import { VixCadService } from 'projects/up/src/app/services/api/vixcad.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { TemaUtil } from 'projects/up/src/app/utils/tema.util';

export const myCustomTooltipDefaults: MatTooltipDefaultOptions = {
    showDelay: 200,
    hideDelay: 200,
    touchendHideDelay: 200,
};

@Component({
    selector: 'upx-data-list',
    standalone: true,
    imports: [
        CommonModule,
        IconComponent,
        LoadingComponent,
        AvatarComponent,
        BadgeComponent,
        CheckboxComponent,
        MatTooltipModule,
        IconsFontAwesomeModule,
		MatIconModule,
        MatButtonToggleModule,
    ],
    templateUrl: './data-list.component.html',
    styleUrls: ['./data-list.component.scss'],
})
export class DataListComponent implements OnInit, AfterViewInit, OnDestroy {
    renderer2: Renderer2 = inject(Renderer2);
    screenService = inject(ScreenService);
    temaUtil = inject(TemaUtil);
    financaService: FinancaService = inject(FinancaService);
    vicCadService: VixCadService = inject(VixCadService);

    @Input() columns?: any;
    @Input() serviceInject!: upxDataListInterface;
    @Input() serviceFields?: string[];
    @Input() serviceConditions?: any;
    @Input() serviceOrders?: any;
    @Input() serviceLimit: number = 10;
    @Input() serviceOffset: number = 0;
    @Input() serviceParams?: any;
    @Input() financeFilterType: any[] = [];
    @Input() nameFinancialFilters: any;
    @Input() serviceMarkAll = false;
	@Input() hasCheckBox = true;
    @Input() onListSearch?: EventEmitter<boolean>;
    @Input() onListAppend?: EventEmitter<boolean>;
    @Input() onListLoadAll?: EventEmitter<boolean>;
    @Input() saveMemory?: EventEmitter<boolean>;
    @Input() onFiltersSidebarToggle?: EventEmitter<boolean>;
    @Input() onChangeAllRegistersCheck?: EventEmitter<boolean>;
    @Input() codNatureza?: number;
    @Input() arrPermissoes?: (string | number)[];
    @Input() deferInitialLoad = false;


    @Output() changeListData = new EventEmitter<any[]>();
    @Output() changeLoadingListData = new EventEmitter<boolean>();
    @Output() openRegister = new EventEmitter<any>();
    @Output() alterarVisualizacaoDataList = new EventEmitter<any>();
    @Output() applyDisable = new EventEmitter<boolean>();

    @ViewChildren('elementList') elementList: QueryList<any> | undefined;

    @Output() listData: any[] = [];

    listDataElement: any;
    listDataChecked: any[] = [];
    listDataCount: number = 0;
    listDataValueAccumulated: number | string = 0;
    listTituloValueAccumulated: any = 0;
    tituloEmAberto: any = 0;
    tituloPago: any = 0;
    titAberto: any = 0;
    titPago: any = 0;
    listAllFetched: boolean = false;
    listFieldCheckAll = new FormControl(false);
    router: Router = inject(Router);
    urlPage: any[] = [];
    isFinancial = false;
    isClassTributaria = false;
    isCadastro: boolean = false;
    cadTipCliFor: number = 0;
    totalSelecao: number = 0;
    loadingListData: boolean;
    filtersSidebarVisible: boolean = false;
    colorOrderIcon: boolean = false;
    totalData!: number;
    totalVendas: number = 0;
    tipoSelecionado: string = 'normal';

    columnsMobile: any = {};

    registerTouchTimeout: any;

    removeList: any;

    valorClasse: string = '';
    extrato: boolean = false;
	receita: boolean = false;
	despesas: boolean = false;
    totalReceitas = 0;
    totalDespesas = 0;
    totalParcial = 0;
    totalAcumulado = 0;

    totCadInativo: any;
    totCadAtivo: any;
    totCadNovo: any;

    situacaoTitulo: any = {};
    isProdutos: boolean = false;
    isServicos: boolean = false;


    constructor() {
        this.loadingListData = false;
    }

    ngOnInit(): void {

        if(localStorage.getItem('isUpdate') && localStorage.getItem('isUpdate') === '1'){
            if (this.isFinancial && !this.extrato) {
                this.totais(this.serviceConditions, null);
            }
            localStorage.removeItem('isUpdate');
        }

        if(localStorage.getItem('isDelete')){   
            this.removeList = JSON.parse(localStorage.getItem('isDelete') ?? '')         
            localStorage.removeItem('isDelete');
        }

        this.urlPage = this.router.url.split('/');
        
        switch (this.urlPage[1]) {

            case 'financas':
				switch (this.urlPage[2]) {
					case 'extrato':
							this.extrato = true;
							this.receita = false
							this.despesas = false;
						break;
					case 'receitas':
						this.extrato = false;
						this.receita = true
						this.despesas = false;
					break;
					case 'despesas':
						this.extrato = false;
						this.receita = false
						this.despesas = true;
					break;
					case 'regua-cobranca':
					case 'cadastrar-regua-cobranca':
						// Não definir isFinancial para régua de cobrança
						break;
					default:
						break;
				}
				// Só define isFinancial se não for régua de cobrança
				if (this.urlPage[1] == 'financas' && this.urlPage[2] !== 'regua-cobranca' && this.urlPage[2] !== 'cadastrar-regua-cobranca' && this.urlPage[2] !== 'resgate') {
					this.isFinancial = true;
				}
                break;

            case 'clientes':

                this.isCadastro = true;
                this.cadTipCliFor = 1;
                this.getTotaisCadastros();
                break;

            case 'fornecedores':
                this.isCadastro = true;
                this.cadTipCliFor = 2;
                this.getTotaisCadastros();
                break;

            case 'transportadoras':
                this.isCadastro = true;
                this.cadTipCliFor = 3;
                this.getTotaisCadastros();
                break;
            case 'produtos':
				this.isProdutos = true;
				break;

                
            case 'servicos':
				this.isServicos = true;
				break;

            case 'configuracao-tributaria':
                this.isClassTributaria = true;
                break;    

			default:
				break;

        }
        this.onListSearch?.subscribe(() => {
            
            // this.totalVendas = 0;
            this.listSearch();
        });

        this.onListAppend?.subscribe(() => {
            this.listAppend();
        });

        this.onListLoadAll?.subscribe(() => {
            this.serviceLimit = this.listDataCount;
            this.listSearch();
        });

        this.saveMemory?.subscribe(() => {
            if (this.isFinancial && this.extrato) {
				localStorage.setItem('memorySearchExtrato', JSON.stringify(this.listData));
                localStorage.setItem('memorySearchTotalExtrado', JSON.stringify({
                    'totalReceitas': this.totalReceitas,
                    'totalDespesas': this.totalDespesas,
                    'totalParcial': this.totalParcial,

                }));
				localStorage.setItem('memorySearchTotalExtrato', JSON.stringify(this.listDataCount));
            }
            if (this.isFinancial && !this.extrato) {
				if (this.receita) {
					localStorage.setItem('memorySearchReceita', JSON.stringify(this.listData));
					localStorage.setItem('memorySearchTotalReceita', String(this.listDataCount));
					localStorage.setItem('memorySearchTotalFinReceita', JSON.stringify({
						'titAberto': this.titAberto,
						'totalDespesas': this.titPago,
						'valorAcumulado': this.listTituloValueAccumulated
					}));
				}
				else if(this.despesas){
					localStorage.setItem('memorySearchDespesas', JSON.stringify(this.listData));
					localStorage.setItem('memorySearchTotalDespesas', String(this.listDataCount));
					localStorage.setItem('memorySearchTotalFinDespesas', JSON.stringify({
						'titAberto': this.titAberto,
						'totalDespesas': this.titPago,
						'valorAcumulado': this.listTituloValueAccumulated
					}));
				}

            }
        });
        this.onFiltersSidebarToggle?.subscribe(() => {
            this.filtersSidebarToggle();
        });

        this.onChangeAllRegistersCheck?.subscribe((value: boolean) => {
            this.listCheckAllRegisters(value);
        });

        this.columns?.forEach((column: any, index: number) => {
            this.columnsMobile[column.mobile?.position] = column;
            if (column.order)

            if (!column.colorOrderIcon)
                column.colorOrderIcon = false;

          if (column.name === 'pro_ncm') {
              if (this.isProdutos) {
                column.title = 'NCM';
              }

              if (this.isServicos) {
                column.title = 'CNAE';
              }
          }
        });
    }

    ngAfterViewInit() {

        setTimeout(() => {
            this.listDataElement = this.renderer2.selectRootElement(
                `#upxDataList-listDataElement`,
                true
            );
        }, 0)

        this.elementList?.changes.subscribe(() => {

            if (!this.listAllFetched)
                if (this.listDataElement) {

                    this.listDataElement.addEventListener(
                        'scroll',
                        this.listLoadMore
                    );
                }
        });

        if (this.deferInitialLoad) {
            this.setLoadingList(true);
        } else {
            setTimeout(() => {
                this.listLoadMore();
            }, 0);
        }
    }

    ngOnDestroy(): void {
        this.onListSearch?.unsubscribe();
        this.onListAppend?.unsubscribe();
        this.onListLoadAll?.unsubscribe();
        this.saveMemory?.unsubscribe();
        this.onFiltersSidebarToggle?.unsubscribe();
        this.onChangeAllRegistersCheck?.unsubscribe();
    }

    getColorTheme() {
        return this.temaUtil.getColorTheme();
    }

    listFind(): void {
        
        this.setLoadingList(true);
        let search = true;

		if (this.isFinancial) {
            
			let itens : any;
			if (this.receita) {
				itens = localStorage.getItem('memorySearchReceita');
				localStorage.removeItem('memorySearchReceita');
			}else if(this.despesas)
			{
				itens = localStorage.getItem('memorySearchDespesas');
				localStorage.removeItem('memorySearchDespesas');
			}else if(this.extrato){
				itens = localStorage.getItem('memorySearchExtrato');
				localStorage.removeItem('memorySearchExtrato');
			}
			if (itens) {
                
				itens = JSON.parse(itens);
                
                if(this.removeList){
                    itens = itens.filter((item: any, index: number) => this.removeList.tit_fin_nro_lan != item.tit_fin_nro_lan && this.removeList.tit_fin_nro_lan != item.tit_fatura_seq);    
                }

				itens.forEach((item: any, index: number) => {
					delete itens[index].upxDataList;
					itens[index].upxDataList = {
						fieldCheck: new FormControl(false)
					}
				});
                

				this.listDataUpdate(itens);
				search = false;
				let total : any ;
				if (this.receita) {
					total = localStorage.getItem('memorySearchTotalReceita');
					localStorage.removeItem('memorySearchTotalReceita');
				}else if(this.despesas)
				{
					total = localStorage.getItem('memorySearchTotalDespesas');
					localStorage.removeItem('memorySearchTotalDespesas');
				}else if(this.extrato){
					total = localStorage.getItem('memorySearchTotalExtrato');
					localStorage.removeItem('memorySearchTotalExtrato');
				}
				if (total) {
					this.listDataCount = parseInt(total);
					this.serviceOffset = this.listData.length;
				}
				if (this.extrato) {
				  let itemExtrato  : any = localStorage.getItem('memorySearchTotalExtrado');
				  if (itemExtrato) {
					itemExtrato =  JSON.parse(itemExtrato);
					this.totalReceitas = itemExtrato.totalReceitas;
					this.totalDespesas = itemExtrato.totalDespesas;
					this.totalParcial = itemExtrato.totalParcial;
					localStorage.removeItem('memorySearchTotalExtrado');
				  }

				}
				else{
					let	itemfin  : any;
					if (this.receita) {
						itemfin = localStorage.getItem('memorySearchTotalFinReceita');
						localStorage.removeItem('memorySearchTotalFinReceita');
					}else if(this.despesas)
					{
						itemfin = localStorage.getItem('memorySearchTotalFinDespesas');
						localStorage.removeItem('memorySearchTotalFinDespesas');
					}
					if (itemfin) {
						itemfin =  JSON.parse(itemfin);
					  this.titAberto = itemfin.titAberto;
					  this.titPago = itemfin.totalDespesas;
					  this.listTituloValueAccumulated = itemfin.valorAcumulado;
					}
				}
				this.listCalculate();
				this.setLoadingList(false);
                if ( this.serviceMarkAll) {
                    this.listCheckAllRegisters(true);
                }
                if (this.extrato) {
                    let itemExtrato: any = localStorage.getItem('memorySearchTotalExtrado');
                    if (itemExtrato) {
                        itemExtrato = JSON.parse(itemExtrato);
                        this.totalReceitas = itemExtrato.totalReceitas;
                        this.totalDespesas = itemExtrato.totalDespesas;
                        this.totalParcial = itemExtrato.totalParcial;
                        localStorage.removeItem('memorySearchTotalExtrado');
                    }
                }
            }
            else {
                let	itemfin  : any;
					if (this.receita) {
						itemfin = localStorage.getItem('memorySearchTotalFinReceita');
						localStorage.removeItem('memorySearchTotalFinReceita');
					}else if(this.despesas)
					{
						itemfin = localStorage.getItem('memorySearchTotalFinDespesas');
						localStorage.removeItem('memorySearchTotalFinDespesas');
					}
                if (itemfin) {
                    itemfin = JSON.parse(itemfin);
                    this.titAberto = itemfin.titAberto;
                    this.titPago = itemfin.totalDespesas;
                    this.listTituloValueAccumulated = itemfin.valorAcumulado;

                }
            }

            this.listCalculate();
            this.setLoadingList(false);
            if (this.serviceMarkAll) {
                this.listCheckAllRegisters(true);
            }
        }


        if (search) {
            this.setLoadingList(true);
            let situacao: any = localStorage.getItem(this.nameFinancialFilters);
            this.situacaoTitulo = JSON.parse(situacao);
			if (this.situacaoTitulo == null){
				if (this.isFinancial) {
						this.situacaoTitulo ={
							emAberto : true,
							pago: false,
							vencido:false
						}
					}
			}
			if (this.isFinancial && this.extrato) {
				this.serviceConditions.isExtrato = true;
			}
            this.serviceInject
                .getList(
                    this.serviceFields,
                    this.serviceConditions,
                    this.serviceOrders,
                    this.serviceLimit,
                    this.serviceOffset,
                    this.serviceParams
                )
                .subscribe((response: any) => {

                    this.totalData = response.records.total;

                    let newList = [];
                    if (response.records.error) {
                      
                        /*this.alert = this.vixCadService.formatResponseMessage(
                        response.records
                    );*/
                    this.applyDisable.emit(false);
                    } else {

                        let sistema = response.records.sistema;
                        
                        response.records.lista.forEach((item: any, index: number) => {
                            

                          //  this.checkNonAggregatedExpense(response, index); ajustado para não agreghar a despesa no valor liquido, por isso essa função não se faz mais necessária. card 1777
                            
                            response.records.lista[index].upxDataList = {
                                fieldCheck: new FormControl(this.serviceMarkAll)
                            }

                            if(localStorage.getItem('parametrosGerais')){

                                const parametrosGerais = JSON.parse(localStorage.getItem('parametrosGerais') || '{}');
                                
                                if(parametrosGerais && parametrosGerais.par_i27 == 1 && item.fin_6035_situacao == 100){
                                    response.records.lista[index].par_6035_situacao_descricao = 'Emitir NF-e';
                                }else if(parametrosGerais && parametrosGerais.par_i27 == 2 && item.fin_6035_situacao == 100){
                                    response.records.lista[index].par_6035_situacao_descricao = 'Emitir NFC-e';
                                }

                            }

                        });

                        this.listDataUpdate(this.listData?.concat(
                            response.records.lista
                        ));

                        this.listDataCount = response.records.total;

                        if (response.records.valor)
                            if (!this.isFinancial && !this.extrato) {
                                this.listDataValueAccumulated = CurrencyUtil.formatCurrency(response.records.valor);
                            }
                           
                            if(response.records.valor !== undefined){                                
                                this.listTituloValueAccumulated = CurrencyUtil.formatCurrency(response.records.valor);
                            }
                        if (this.extrato) {

                            this.totalReceitas = (response.records.totalReceitas ? response.records.totalReceitas : 0);
                            this.totalDespesas = (response.records.totalDespesas ? response.records.totalDespesas : 0);
                            this.totalParcial = (response.records.totalParcial ? response.records.totalParcial : 0);
                            this.totalAcumulado = (response.records.totalAcumulado ? response.records.totalAcumulado : 0);
                        }

                        if (this.isFinancial && !this.extrato) {
                            this.totais(this.serviceConditions, sistema)
                        }

                        this.serviceOffset += this.serviceLimit;

                    }
                    this.listCalculate();
                    this.setLoadingList(false);

                    this.applyDisable.emit(false);

                });
        }


    }


    checkNonAggregatedExpense(response: any, index: number) {

        if(response.records.lista[index].hasOwnProperty('fin_agrega_despesa') && response.records.lista[index].fin_agrega_despesa === 0){

            response.records.lista[index].fin_doc_vlr_liquido = (parseFloat(response.records.lista[index].fin_doc_vlr_liquido) - parseFloat(response.records.lista[index].fin_doc_vlr_despesas)).toString();
        }
    }

    calculateTotalValue(item: any): string {

        const desconto = parseFloat(item.fin_doc_vlr_descontos);

        const despesas = parseFloat(item.fin_doc_vlr_despesas);

        const frete = parseFloat(item.fin_doc_vlr_frete);
        
        const finDocVlrRetencoes = parseFloat(item.fin_doc_vlr_retencoes);

        const valorBruto = parseFloat(item.fin_doc_vlr_bruto);

        return (valorBruto + ((despesas + frete + finDocVlrRetencoes) - desconto)).toString();

    }

    setDataListPropertiesFinancialFilter(newList: any, allActiveFilters: boolean = false) {

        this.loadingListData = false;
        this.listAllFetched = newList.length > 25 ? false : true;
        this.listDataCount = newList.length;

        if (allActiveFilters) {
            this.listData = [];
            this.listDataCount = 0;

        }

    }

    financeFilter(list: any, typeFinance: any[]) {

        let invoiceDue: any[] = []

        if (typeFinance[0] === true && typeFinance[1] === true && typeFinance[2] === true && typeFinance[3] === true) {
            return list;
        }

        list.forEach((item: any) => {

            const dueDate = new Date(item.tit_dat_int.split(' ')[0]);
            const currentDate = new Date();


            if ((dueDate.getTime() < currentDate.getTime() && item.tit_faturado === 0) && typeFinance[1] === true) {

                invoiceDue.push(item);

            } else if ((dueDate.getTime() >= currentDate.getTime() && item.tit_faturado === 0) && (typeFinance[0] === true)) {

                invoiceDue.push(item);

            } else if (item.tit_faturado === 3 && typeFinance[2] === true && item.tit_con_cod_con == null) {

                invoiceDue.push(item);

            }
            else if ((item.tit_faturado === 3 && typeFinance[3] === true && item.tit_con_cod_con != null) || (item.tit_faturado === 3 && typeFinance[3] === true && typeFinance[2] === true && item.tit_con_cod_con != null) || (item.tit_faturado === 3 && typeFinance[3] === true && typeFinance[1] === true && typeFinance[0] === true && item.tit_con_cod_con != null)) {

                invoiceDue.push(item);

            }


        });

        return invoiceDue;


    }

    totais(conditions: any, sistema: any) {

        let objFiltro = AuxFunctions.formatarPesquisar(conditions);

        let totAberto: any;
        let totPago: any;

        this.financaService.totalizacao(objFiltro).subscribe((dados: any) => {

            if (dados.records) {

                this.listTituloValueAccumulated = dados.records.extrato;
                this.titAberto = dados.records.em_aberto;
                this.titPago = dados.records.pago;

            }

        });

    }

    listLoadMore = () => {

        if (this.listDataElement) {
            if (
                this.listDataElement.scrollHeight -
                this.listDataElement.scrollTop -
                (this.listDataElement.offsetHeight + 200) <=
                this.listDataElement.clientHeight
            ) {
                this.listDataElement.removeEventListener(
                    'scroll',
                    this.listLoadMore
                );
                this.listAppend();
            }
        }
    };

    listSearch(): void {
        this.listReset();
        this.listFind();
    }

    listAppend(): void {
        if (!this.listAllFetched) {
            this.listFind();
        }
    }

    listReset(): void {
        this.listDataUpdate([]);
        this.serviceOffset = 0;
        this.listDataCount = 0;
        this.listDataValueAccumulated = 0;
        this.listTituloValueAccumulated = 0;
        this.tituloEmAberto = 0;
        this.tituloPago = 0;
    }

		listOrderBy(column: any, index: number): void {
			if (!this.serviceOrders[column.name]) {
				this.serviceOrders[column.name] = 'desc';
				this.colorOrderIcon = true;
			} else if (this.serviceOrders[column.name] === 'desc') {
				this.serviceOrders[column.name] = 'asc';
				this.colorOrderIcon = true;
			} else {
				delete this.serviceOrders[column.name];
				this.colorOrderIcon = false;
			}
	
			this.columns[index].order = this.serviceOrders[column.name];
			this.columns[index].colorOrderIcon = this.colorOrderIcon;

			this.listSearch();
		}

    listCalculate(): void {
        this.listAllFetched = this.listData.length >= this.listDataCount;

    }

    listCheckAllRegisters(value: boolean = (this.listFieldCheckAll.value || false)) {


        this.listData.forEach((item: any, index: number) => {
            item.upxDataList.fieldCheck.setValue(value)
        });
        this.listFieldCheckAll.setValue(value);

        this.listDataUpdate();
    }

    listDataUpdate(listData?: any[]): void {
        if (listData)
            this.listData = listData;
        this.listDataChecked = this.listData.filter((item: any) => {
            return item.upxDataList.fieldCheck.value === true
        });
        let valorTotal = 0;
        this.listDataChecked.forEach((element: any) => {
            valorTotal += element.tit_doc_vlr_liquido_float;
        });
        this.totalSelecao = valorTotal;
        this.changeListData.emit(this.listData);
    }

    registerCheck(item?: any) {

        if (item)
            setTimeout(() => {
                item.upxDataList.fieldCheck.setValue(!item.upxDataList.fieldCheck.value);
                if ('vibrate' in navigator)
                    navigator.vibrate(10);
                this.listDataUpdate();
            }, 0);

        this.listDataUpdate();
    }

    registerTouchStart(item: any) {
        if (!this.listDataChecked.length)
            this.registerTouchTimeout = setTimeout(() => {
                item.upxDataList.fieldCheck.setValue(!item.upxDataList.fieldCheck.value);
                if ('vibrate' in navigator)
                    navigator.vibrate(10);
                this.listDataUpdate();
            }, 700);
    }

    registerTouchEnd() {
        if (this.registerTouchTimeout)
            clearTimeout(this.registerTouchTimeout);
    }

    registerOpen(registerData: any) {
        this.openRegister.emit(registerData);
    }

    setLoadingList(loading: boolean) {
        this.loadingListData = loading;
        this.changeLoadingListData.emit(loading);
    }

    filtersSidebarToggle(): void {
        this.filtersSidebarVisible = !this.filtersSidebarVisible;
    }

    getColumnValue(row: any, column: any) {
        if (!row || !column) return undefined;
        return column.formatter
            ? column.formatter(row[column.name], row)
            : row[column.name];
    }

    hasMultilineRow(): boolean {
        return this.columns?.some((column: { options?: { multiline?: boolean } }) => column.options?.multiline) ?? false;
    }

    isMultilineColumn(column: { options?: { multiline?: boolean } }): boolean {
        return !!column?.options?.multiline;
    }

    getRowValue(row: any, columnName: string) {
        if (!row || !columnName) return undefined;
        const value = row[columnName];
        // Para evitar undefined sendo passado para componentes que esperam string
        return value === undefined || value === null ? '' : value;
    }

    getColumnUpxAvatarIcon(row: any, column: any) {
        if (!row || !column) return '';
        let icon = column.options?.upxAvatar?.icon;
        let iconName = '';
        if (typeof icon === 'function') {
            iconName = icon(this.getColumnValue(row, column), row);
        } else if (typeof icon === 'string') {
            iconName = icon;
        }
        return iconName;
    }

    getColumnUpxAvatarTooltip(row: any, column: any) {
        if (!row || !column) return '';
        let tooltip = column.options?.upxAvatar?.matTooltip;
        let tooltipName = '';
        if (typeof tooltip === 'function') {
            tooltipName = tooltip(this.getColumnValue(row, column), row);
        } else if (typeof tooltip === 'string') {
            tooltipName = tooltip;
        }
        return tooltipName;
    }

    /** Texto exibido no badge (com truncamento opcional por `maxTextLength`). */
    getUpxBadgeFullText(row: any, column: any): string {
        if (!row || !column?.options?.upxBadge) {
            return '';
        }
        const ub = column.options.upxBadge;
        if (ub.binds) {
            const key = this.getColumnValue(row, column);
            const bind = ub.binds[key as number];
            const t = bind?.text;
            return t !== undefined && t !== null ? String(t) : '';
        }
        if (!ub.columnText) {
            return '';
        }
        return String(this.getRowValue(row, ub.columnText) ?? '');
    }

    getUpxBadgeDisplayText(row: any, column: any): string {
        const full = this.getUpxBadgeFullText(row, column);
        const max = column?.options?.upxBadge?.maxTextLength;
        if (max != null && max > 0 && full.length > max) {
            return `${full.substring(0, max)}...`;
        }
        return full;
    }

    /** Tooltip com o texto integral quando houve truncamento por `maxTextLength`. */
    getUpxBadgeMatTooltip(row: any, column: any): string {
        const full = this.getUpxBadgeFullText(row, column);
        const max = column?.options?.upxBadge?.maxTextLength;
        if (max != null && max > 0 && full.length > max) {
            return full;
        }
        return '';
    }

    getColumnUpxTooltip(row: any, column: any) {
        if (!row || !column) return '';
        let tooltip = column.tooltip;
        let tooltipName = '';
        if (typeof tooltip === 'function') {
            tooltipName = tooltip(this.getColumnValue(row, column), row);
        } else if (typeof tooltip === 'string') {
            tooltipName = tooltip;
        }
        return tooltipName;
    }

    getColumnUpxIcon(row: any, column: any, tipo: any) {

        if (!row || !column) return '';

        let icon: any;

        switch (tipo) {
            case 1:
                icon = column.icon;
                break;
            case 2:
                icon = column.icon2;
                break;
            default:
                icon = column.icon;
                break;
        }

        let iconName = '';
        if (typeof icon === 'function') {
            iconName = icon(this.getColumnValue(row, column), row);
        } else if (typeof icon === 'string') {
            iconName = icon;
        }
        return iconName;

    }

    getColumnUpxStyle(row: any, column: any) {
        if (!row || !column) return '';
        let styleIcon = column.styleIcon;
        let styleIconName = '';
        if (typeof styleIcon === 'function') {
            styleIconName = styleIcon(this.getColumnValue(row, column), row);
        } else if (typeof styleIcon === 'string') {
            styleIconName = styleIcon;
        }
        return styleIconName;
    }

    getColumnUpxIconClass(row: any, column: any) {
        if (!row || !column) return '';
        let ngClass = column.ngClass;
        let ngClassName = '';
        if (typeof ngClass === 'function') {
            ngClassName = ngClass(this.getColumnValue(row, column), row);
        } else if (typeof ngClass === 'string') {
            ngClassName = ngClass;
        }
        return ngClassName;
    }

    getColumnUpxIconFontAwesomeClass(row: any, column: any) {
        if (!row || !column) return '';
        let ngClassFontAw = column.ngClassFontAw;
        let ngClassName = '';
        if (typeof ngClassFontAw === 'function') {
            ngClassName = ngClassFontAw(this.getColumnValue(row, column), row);
        } else if (typeof ngClassFontAw === 'string') {
            ngClassName = ngClassFontAw;
        }
        return ngClassName;
    }

    classeDinamica(row: any, column: any) {

        if (!row || !column) return '';
        let ngClass = column.options?.upxAvatar?.ngClass;
        let ngClassName = '';
        if (typeof ngClass === 'function') {
            ngClassName = ngClass(this.getColumnValue(row, column), row);
        } else if (typeof ngClass === 'string') {
            ngClassName = ngClass;
        }
        this.valorClasse = ngClassName;

        return ngClassName;

    }

    getColumnUpxIconFontAwesome(row: any, column: any, tipo: any) {

        if (!row || !column) return '';

        let iconFontAwesome: any;

        switch (tipo) {
            case 1:
                iconFontAwesome = column.iconFontAwesome;
                break;
            case 2:
                iconFontAwesome = column.iconFontAwesome2;
                break;
            default:
                iconFontAwesome = column.iconFontAwesome;
                break;
        }

        let iconFontAwesomeName: any = '';
        if (typeof iconFontAwesome === 'function') {
            iconFontAwesomeName = iconFontAwesome(this.getColumnValue(row, column), row);
        } else if (typeof iconFontAwesome === 'string') {
            iconFontAwesomeName = iconFontAwesome;
        }
        return iconFontAwesomeName;

    }

    getColumnUpxIconFaClass(row: any, column: any) {

        if (!row || !column) return '';
        let ngClassFa = column.ngClassFa;
        let ngClassName = '';
        if (typeof ngClassFa === 'function') {
            ngClassName = ngClassFa(this.getColumnValue(row, column), row);
        } else if (typeof ngClassFa === 'string') {
            ngClassName = ngClassFa;
        }
        return ngClassName;

    }

    getColumnUpxIconFaClass2(row: any, column: any) {

        if (!row || !column) return '';
        let ngClassFa2 = column.ngClassFa2;
        let ngClassName = '';
        if (typeof ngClassFa2 === 'function') {
            ngClassName = ngClassFa2(this.getColumnValue(row, column), row);
        } else if (typeof ngClassFa2 === 'string') {
            ngClassName = ngClassFa2;
        }
        return ngClassName;

    }

    /**
     * Metodo responsavel em retornar o total de clientes ou fornecedores ativos, inativos e novos.
    */
    getTotaisCadastros() {

        let objFiltro = AuxFunctions.formatarPesquisar({
            'cad_tip_cli_for': this.cadTipCliFor,
            'cad_status': 'T'
        });

        this.vicCadService.getTotais(objFiltro).subscribe((dados: any) => {

            if (dados.records) {

                for (let i = 0; i < Object.keys(dados.records).length; i++) {

                    if (dados.records[i].tipo == 'I') {
                        this.totCadInativo = dados.records[i].qtde;
                    }

                    if (dados.records[i].tipo == 'A') {
                        this.totCadAtivo = dados.records[i].qtde;
                    }

                    if (dados.records[i].tipo == 'N') {
                        this.totCadNovo = dados.records[i].qtde;
                    }

                }

            }

        });

    }

    screenIsMobile(): boolean {
        return this.screenService.isMobile();
    }

    isNumber = (value: any) => {

        if(isNaN(value))
            return true;
        else
            return false;

    }

    alterarVisualizacao(tipo: string) {
        this.tipoSelecionado = tipo;
        this.alterarVisualizacaoDataList.emit(tipo)
    }

    /**
     * Verifica se o usuário possui a permissão especificada
     */
    getPermissao(modCorrente: string | number): boolean {
        if (this.arrPermissoes && this.arrPermissoes.length > 0) {
            const permissaoStr = String(modCorrente);
            return this.arrPermissoes.some(p => String(p) === permissaoStr);
        }
        return false;
    }

    /**
     * Verifica se pode exibir o total de valores no rodapé
     * Regras: natureza diferente de 21 e 22, e permissão 91
     */
    podeExibirTotal(): boolean {
        // Se não tiver natureza definida, verifica apenas a permissão
        if (!this.codNatureza) {
            return this.getPermissao(91);
        }
        // Natureza 21 e 22 não exibem total
        if (this.codNatureza === 21 || this.codNatureza === 22) {
            return false;
        }
        // Verifica permissão 91
        return this.getPermissao(91);
    }

    // onScroll(event: Event | HTMLElement){
    //     this.listDataElement = event instanceof Event ?  event.target : event;
    //     this.listLoadMore()
    //     // console.log(event.target);
    // }
}
