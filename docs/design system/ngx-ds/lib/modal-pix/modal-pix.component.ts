import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Inject, inject, Input, OnDestroy, OnInit, Output, Renderer2 } from '@angular/core';
import { QRCodeModule } from 'angularx-qrcode';
import { CobrancaService } from 'projects/up/src/app/services/api/cobranca.service';
import { PaginaService } from 'projects/up/src/app/services/pagina.service';
import { Subject, takeUntil } from 'rxjs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ToastService } from '../toast/toast.service';
import { FormModule } from '../form/form.module';
import { LabelComponent } from '../label/label.component';
import { IconComponent } from '../icon/icon.component';
import { Clipboard, ClipboardModule } from '@angular/cdk/clipboard';
import { ButtonComponent } from '../button/button.component';
import { ModalService } from '../services/modal.service';
import { WhatsappTelefonesModalComponent } from 'projects/up/src/app/pages/painel/financas/processos/dados-cobranca/whatsapp-telefones-modal-component';
import { MatMenuModule } from '@angular/material/menu';
import { UsuarioService } from 'projects/up/src/app/services/usuario.service';
import { UsuarioInterface } from 'projects/up/src/app/interfaces/usuario.interface';
@Component({
	selector: 'upx-pix',
	standalone: true,
	imports: [CommonModule, QRCodeModule, MatProgressBarModule, FormModule,  IconComponent, ButtonComponent, MatMenuModule],
	templateUrl: './modal-pix.component.html',
	styleUrls: ['./modal-pix.component.scss']
})
export class ModalPixComponent implements OnInit, OnDestroy {
	intervalo: any; // Referência para o `setInterval`
	contador = 0;
	maximo = 300;
	paginaService: PaginaService = inject(PaginaService);
	private readonly destroy$: Subject<void> = new Subject();
	toastService: ToastService = inject(ToastService);
	clipBoard = inject(Clipboard);
	modalService: ModalService = inject(ModalService);
	usuarioService: UsuarioService = inject(UsuarioService);
	usuario!: UsuarioInterface;

	@Input() dataPix = {
		pixLabel: "PIX",
		nroLan: 0,
		qrCode: 'pix',
		sequence: 0,
		copiaECola: '',
		txId: '',
		is_financeiro: false,
		valor: 0,
		empresa: '',
		identEmp:0,
		formaPagamento:0
	};
	@Input() show = false;
	@Output() onPixPaid = new EventEmitter<boolean>();
	@Output() onPixClose = new EventEmitter<boolean>();
	@Output() onPixCanceled = new EventEmitter<boolean>();
	@Input() clientData! : any;
	public qrCodeData = '';
	renderer: Renderer2 = inject(Renderer2);
	cobrancaService: CobrancaService = inject(CobrancaService);
	totalMinutes = 60; // Duração do contador em minutos
	remainingTime: number = this.totalMinutes * 60; // Tempo total em segundos
	private intervalId: any;
	minutes = '60';
	seconds = '00';
	ocultar(flag: boolean) {
		this.pararContador();
		if (flag) {
			//this.cancelarPix();
		}
		else {
			this.onPixClose.emit(true);
			this.show = false;
		}
	}

	ngOnInit(): void {
		this.show = true;
		this.startCountdown();
		this.iniciarContador();
		//	this.fetchQrCodeData();
		this.usuarioService.usuario$.subscribe((usuario) => {
			this.usuario = usuario;
		});
	}

	ngOnDestroy(): void {
		clearInterval(this.intervalId); // Limpa o intervalo ao destruir o component
	}

	pararContador(): void {
		if (this.intervalo) {
			clearInterval(this.intervalo); // Para o intervalo
			this.intervalo = null;
			this.contador = 0; // Reinicia o contador
		}
	}

	iniciarContador(): void {
		this.pararContador(); // Garante que não haverá múltiplos intervalos

		this.intervalo = setInterval(() => {
			this.contador++;

			// Verifica a cada 10 segundos
			const intervaloDeRequisicao = 10;
			if (this.contador % intervaloDeRequisicao === 0) {
				this.verificaPix();
			}

			// Verifica se o tempo esgotou
			const limiteDeTempo = 300;
			if (this.contador >= limiteDeTempo) {
				this.pararContador();
				this.ocultar(true);
				this.toastService.error("Tempo esgotado, gere o pix novamente!");
			}
		}, 1000); // Executa a cada 1 segundo
	}

	verificaPix() {
		//console.log("daa", this.dataPix);
		const dataSend = {
			'fin_nro_lan': this.dataPix.nroLan,
			'tit_fatura_seq': this.dataPix.sequence,
			'txId': this.dataPix.txId,
			'is_financeiro': this.dataPix.is_financeiro
		};
		this.cobrancaService.checkPixVencimento(dataSend)
			.pipe(takeUntil(this.destroy$))
			.subscribe({
				next: (retorno: any) => {

					this.paginaService.setLoading(false);
					if (retorno.records.error) {
						this.toastService.error(retorno.records.msg);
					}
					else {
						if (retorno.records.paid == 1) {
							this.toastService.success("Pix Pago com sucesso!");
							this.onPixPaid.emit(retorno.records);
							
							this.pararContador();
							this.ocultar(false);
						}
					}
				},
				error: (err) => {

					this.toastService.error("Atenção! Erro ao consultar PIX");
					console.error(err)
					this.paginaService.setLoading(false);

				},
			})
	}

	cancelarPix() {
		const dataSend = {
			'txId': this.dataPix.txId
		};
		this.cobrancaService.cancelarPix(dataSend)
			.pipe(takeUntil(this.destroy$))
			.subscribe({
				next: (retorno: any) => {

					this.paginaService.setLoading(false);
					if (retorno.records.error) {
						this.toastService.error(retorno.records.msg);
					}
					else {
						this.toastService.success("PIX cancelado!");
						this.show = false;
						this.onPixCanceled.emit(true);
					}
				},
				error: (err) => {

					this.toastService.error("Atenção! Erro ao cancelar PIX");
					console.error(err)
					this.paginaService.setLoading(false);

				},
			})
	}

	get progressValue(): number {
		const limiteDeTempo = 300; // Limite de tempo em segundos
		return (this.contador / limiteDeTempo) * 100; // Converte para escala de 0 a 100
	}

	copy() {
		this.clipBoard.copy(this.dataPix.copiaECola);
		this.toastService.success("Copiado com sucesso!");
	}

	share() {
		let dataSend = [];
		dataSend.push({
			tit_fin_nro_lan: this.dataPix.nroLan,
			tit_fatura_seq: this.dataPix.sequence,
			tit_cad_cod_cad: this.clientData.cad_cod_cad,
			emp_ident_emp:this.dataPix.identEmp,
			tit_6060_forma_pagamento: this.dataPix.formaPagamento
		})
		this.getLink({items:dataSend},1,'');

	}

	send() {
		let dataFone = '';
		if (this.dataPix.is_financeiro && this.clientData.contato.cto_fone != 'undefined') {
			dataFone = this.clientData.contato.cto_fone;
		}else{

		}
		if (dataFone != '') {
			let dataSend = [];
			 dataSend.push({
				tit_fin_nro_lan: this.dataPix.nroLan,
				tit_fatura_seq: this.dataPix.sequence,
				tit_cad_cod_cad: this.clientData.cad_cod_cad,
				emp_ident_emp:this.dataPix.identEmp,
				tit_6060_forma_pagamento: this.dataPix.formaPagamento,
				is_venda_nfe: true
			})
			this.getLink({items:dataSend},2,dataFone);

		}else{
			this.toastService.error("Nenhum contato definido.")
		}
	}

	enviarWhatsappAutomatico() {
		const contatos = this.getContatosParaWhatsapp();

		this.modalService.modalForm(WhatsappTelefonesModalComponent, {
			items: this.prepararDadosParaEnvio(),
			contatos: contatos
		}).subscribe((result: any) => {
			if (!result || !result.telefones || result.telefones.length === 0) return;

			this.paginaService.setLoading(true);
			const dataSend = {
				items: this.prepararDadosParaEnvio(),
				telefones: result.telefones
			};
			this.cobrancaService.enviarViaEvolution(dataSend)
				.pipe(takeUntil(this.destroy$))
				.subscribe({
					next: (retorno: any) => {
						this.paginaService.setLoading(false);
						if (retorno.records?.error) {
							this.toastService.error(retorno.records.msg || 'Erro ao enviar via WhatsApp.');
						} else {
							this.toastService.success('Enviado via WhatsApp com sucesso!');
						}
					},
					error: () => {
						this.paginaService.setLoading(false);
						this.toastService.error('Erro ao enviar via WhatsApp.');
					}
				});
		});
	}

	private getContatosParaWhatsapp(): any[] {
		if (this.dataPix.is_financeiro) {
			const contato = this.clientData?.contato;
			return contato ? [contato] : [];
		}
		return this.clientData?.listaContato || [];
	}

	private prepararDadosParaEnvio(): any[] {
		return [{
			tit_fin_nro_lan: this.dataPix.nroLan,
			tit_fatura_seq: this.dataPix.sequence,
			tit_cad_cod_cad: this.clientData.cad_cod_cad,
			emp_ident_emp: this.dataPix.identEmp,
			tit_6060_forma_pagamento: this.dataPix.formaPagamento,
			is_venda_nfe: true,
			dadosPix: this.dataPix
		}];
	}

	startCountdown(): void {
		this.updateTimerDisplay(); // Atualiza o display imediatamente

		this.intervalId = setInterval(() => {
		  if (this.remainingTime > 0) {
			this.remainingTime--; // Decrementa o tempo restante
			this.updateTimerDisplay();
		  } else {
			clearInterval(this.intervalId);
		  }
		}, 1000); // Executa a cada 1 segundo
	  }

	  private updateTimerDisplay(): void {
		const minutes = Math.floor(this.remainingTime / 60);
		const seconds = this.remainingTime % 60;

		this.minutes = String(minutes).padStart(2, '0'); // Adiciona zero à esquerda
		this.seconds = String(seconds).padStart(2, '0');
	}

	isMobile(){
		return this.paginaService.screenService.isMobile();
	}

	getLink(dataSend: any, funcao: number, dataEmail:string) {
		this.cobrancaService.getLinkCheckout(dataSend)
			.pipe(takeUntil(this.destroy$))
			.subscribe({
				next: (retorno: any) => {
					this.paginaService.setLoading(false);
					if (retorno.records.error) {
						this.toastService.error(retorno.records.msg);
					}
					else {
						this.paginaService.setLoading(false);
						switch (funcao) {
							case 1:
								if (navigator.share) {
									navigator.share({
										title: 'Compartilhar PIX',
										text: `Recebimento Pix no valor de ${this.dataPix.pixLabel}  de ${this.dataPix.empresa}`,
										url: retorno.records.items[0].url
									})
										.then(() => console.log('Compartilhado com sucesso!'))
										.catch((error) => console.error('Erro ao compartilhar:', error));
								} else {
									this.toastService.error("Função não suportada nesse dispositivo!");
								}
								this.clipBoard.copy(retorno.records.items[0].url);
								this.toastService.info('Link copiado para área de transferência!');
								break;
							case 2:
								let send = `Recebimento Pix no valor de ${this.dataPix.pixLabel}  de ${this.dataPix.empresa} link : ${retorno.records.items[0].url}`;
								 window.open(`https://wa.me/+55${dataEmail.replace(/\D/g, '')}?text=${send}`, '_blank');

								break;

							default:
								break;
						}


					}
				},
				error: (err) => {
					this.paginaService.setLoading(false);
					this.toastService.error(err);
				},
			})
	}

	getPermissaoSol(codSol: number): boolean {
        if (this.usuario) {
            if (this.usuario.arr_solucoes && this.usuario.arr_solucoes.length > 0) {
				console.log(this.usuario.arr_solucoes);
                if (this.usuario.arr_solucoes.includes(codSol)){
                    return true;
                }

            }
        }

        return false;
    }


}
