import { ModalService } from 'projects/up/src/app/components/ds/public-api';
import { AfterContentInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { PaginaService } from 'projects/up/src/app/services/pagina.service';
import { ToastService } from 'projects/up/src/app/components/ds/public-api';
import { CardComponent, CardContentComponent } from 'projects/up/src/app/components/ds/public-api';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
	selector: 'app-leitorDocumentos',
	templateUrl: './leitor-documentos-component.html',
	styleUrls: ['./leitor-documentos-component.scss']
})
export class leitorDocumentosComponent implements OnInit, AfterContentInit {

	@ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
	private readonly destroy$: Subject<void> = new Subject();
	fb = inject(FormBuilder);
	modalService: ModalService = inject(ModalService);
	paginaService: PaginaService = inject(PaginaService);
	toastService: ToastService = inject(ToastService);

	@Input() triggerSave?: EventEmitter<boolean>;
	@Output() onChangeForm = new EventEmitter<FormGroup>();
	@Output() onSubmited = new EventEmitter<boolean>();
	@Output() onSaved = new EventEmitter();
	@Input() item: any;
	@Input() isFinance: boolean = false;

	// Form and file management
	form!: FormGroup;

	selectedFiles: File[] = [];
	isDragOver = false;

	// File validation
	private readonly maxFileSize = 10 * 1024 * 1024; // 10MB
	private readonly allowedTypes = [
		'application/pdf',
		// 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
		// 'application/msword',
		// 'image/jpeg',
		// 'image/jpg',
		// 'image/png'
	];
	ngOnInit(): void {

		if (this.item) {
			this.isFinance = this.item.isFinance;
		}

		this.form = this.fb.group({
			paymentType: ['boleto'],
			alter: [false],
			parcelado: [false],        // adiciona
			boleto: [true],
			selectedFiles: [[]]
		});

		this.triggerSave?.subscribe(() => {
			this.save();
		});
		this.form.valueChanges.subscribe(() => {
			this.onChangeForm.emit(this.form);
		});
	}

	ngDoCheck(): void { }

	ngOnChanges() { }

	ngAfterContentInit(): void { }

	onInputChanged(event: any) { }

	setParametrosTela() {
	}

	setNomeOperacao() {
	}

	getListClient() {
	}

	// Drag and Drop handlers
	onDragOver(event: DragEvent): void {
		event.preventDefault();
		event.stopPropagation();
		this.isDragOver = true;
	}

	onDragLeave(event: DragEvent): void {
		event.preventDefault();
		event.stopPropagation();
		this.isDragOver = false;
	}

	onDrop(event: DragEvent): void {
		
		event.preventDefault();
		event.stopPropagation();

		// if(this.selectedFiles.length > 0 && this.form.get('boleto')?.value === true){
		// 	this.toastService.error('É permitido selecionar apenas um arquivo');
		// 	return;
		// }

		this.isDragOver = false;

		const files = event.dataTransfer?.files;
		if (files) {
			this.handleFiles(Array.from(files));
		}
	}

	// File selection handler
	onFileSelected(event: Event): void {

		const input = event.target as HTMLInputElement;
		if (input.files) {
			this.handleFiles(Array.from(input.files));
		}

		if(this.fileInput){
			this.fileInput.nativeElement.value = '';
		}
		
	}

	// File handling logic
	private handleFiles(files: File[]): void {
		const validFiles: File[] = [];
		const invalidFiles: string[] = [];

		// if(files.length > 1 && this.form.get('boleto')?.value === true){
		// 	this.toastService.error('É permitido selecionar apenas um arquivo');
		// 	return;
		// }

		files.forEach(file => {
			if (this.validateFile(file)) {
				validFiles.push(file);
			} else {
				invalidFiles.push(file.name);
			}
		});

		if (invalidFiles.length > 0) {
			if(invalidFiles.length > 1){
				this.toastService.error(`Arquivos inválidos: ${invalidFiles.join(', ')}, somente .pdf`);
			}else {
				this.toastService.error(`Arquivo inválido: ${invalidFiles.join(', ')}, somente .pdf`);
			}
		}

		if (validFiles.length > 0) {
			this.selectedFiles = [...this.selectedFiles, ...validFiles];
			this.form.get('selectedFiles')?.setValue(this.selectedFiles);
			this.form.get('alter')?.setValue(true);
			this.toastService.success(`${validFiles.length} arquivo(s) adicionado(s) com sucesso!`);
			this.disableButton();
		}
	}

	// File validation
	private validateFile(file: File): boolean {
		// Check file size
		if (file.size > this.maxFileSize) {
			return false;
		}

		// Check file type
		if (!this.allowedTypes.includes(file.type)) {
			return false;
		}

		return true;
	}

	// File management
	removeFile(index: number): void {
		this.selectedFiles.splice(index, 1);
		this.disableButton();
		this.toastService.info('Arquivo removido');
	}

	clearAll(notification: boolean = true): void {
		
		this.selectedFiles = [];
		this.form.reset({ paymentType: 'boleto' }); // Reset to default 'boleto'
		if(notification){
			this.toastService.info('Todos os arquivos foram removidos');			
		}
		this.form.get('boleto')?.setValue(true);
		this.form.get('parcelado')?.setValue(false);		

		this.disableButton();
	}

	disableButton(){

		if(this.selectedFiles.length === 0){
			this.onSubmited.emit(true);
		}else {
			this.onSubmited.emit(false);
		}

	}

	// Utility methods
	formatFileSize(bytes: number): string {
		if (bytes === 0) return '0 Bytes';
		const k = 1024;
		const sizes = ['Bytes', 'KB', 'MB', 'GB'];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
	}

	// Save functionality
	save(): void {
		if (this.selectedFiles.length === 0) {
			this.toastService.error('Selecione pelo menos um arquivo');
			return;
		}

		if (!this.form.get('paymentType')?.value) {
			this.toastService.error('Selecione pelo menos uma opção de pagamento');
			return;
		}

		// Emit form data
		this.onChangeForm.emit(this.form);
		this.onSaved.emit();
		// this.onSubmited.emit(true);

		// Here you would typically upload the files
		// this.uploadFiles();
	}

	private uploadFiles(): void {
		// Simulate file upload
		this.toastService.success('Upload iniciado...');

		// In a real implementation, you would upload files here
		setTimeout(() => {
			this.toastService.success('Documentos enviados com sucesso!');
			this.onSaved.emit();
		}, 2000);
	}

	alterChekbox(type: string){

		if(type === 'boleto'){

			this.form.get('boleto')?.setValue(true);
			this.form.get('parcelado')?.setValue(false);

		} else if(type === 'parcelado'){
			
			this.form.get('boleto')?.setValue(false);
			this.form.get('parcelado')?.setValue(true);
		}
		
	}
}