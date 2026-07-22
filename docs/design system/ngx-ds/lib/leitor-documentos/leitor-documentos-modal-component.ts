import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
	selector: 'app-leitorDocumentos-modal',
	templateUrl: './leitor-documentos-modal-component.html',
	styleUrls: ['./leitor-documentos-modal-component.scss'],
})

export class leitorDocumentosModalComponent {

	form?: FormGroup;
	return = {
		ischanged: false,
		fin_nro_lan: 0 as number,
	};
	submited: boolean = true;
	triggerSave: EventEmitter<boolean> = new EventEmitter<boolean>();
	item: any;

	constructor(public dialogRef: MatDialogRef<leitorDocumentosModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
		this.item = data.item;
	}

	onChangeForm(form: FormGroup) {
		this.form = form;
	}

	onSubmited(event: boolean) {
		this.submited = event;
	}

	onSaved(event: boolean) {
		this.dialogRef.close(this.form?.value);
	}

	save() {
		this.triggerSave.emit();
	}
}