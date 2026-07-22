import {Component, ElementRef, EventEmitter, inject, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatDialogRef} from "@angular/material/dialog";
import {ButtonComponent} from "../button/button.component";
import {IconComponent} from "../icon/icon.component";
import {DragDropModule} from "@angular/cdk/drag-drop";
import { ModalService } from '../services/modal.service';


export declare type ModalSize = 'exs'|'xs' | 'sm' | 'md' | 'lg';
export declare type ModalFooterPosition = 'center' | 'end'|'evenly'|'start'|'between'|'around'|'evenly';

@Component({
    selector: 'upx-modal',
    standalone: true,
    imports: [CommonModule, DragDropModule],
    template: `
        <ng-content></ng-content>`,
    styleUrls: ['./modal.component.scss'],
    host: {
        'class': 'upx-modal',
        '[class.upx-modal--size-exs]':  'this.size === "exs"',
        '[class.upx-modal--size-xs]':  'this.size === "xs"',
        '[class.upx-modal--size-sm]':  'this.size === "sm"',
        '[class.upx-modal--size-md]':  'this.size === "md"',
        '[class.upx-modal--size-lg]':  'this.size === "lg"',
        '[class.upx-modal--disable-full-size-mobile]':  'this.disableFullSizeMobile === true',
        '[class.upx-modal--disable-order-mobile]':  'this.disableOrderMobile === true',
    },
    encapsulation: ViewEncapsulation.None
})
export class ModalComponent{
    @Input() size: ModalSize = 'md';
    @Input() disableFullSizeMobile: boolean = false;
    @Input() disableOrderMobile: boolean = false;
}

@Component({
    selector: 'upx-modal-heading',
    standalone: true,
    imports: [CommonModule, ButtonComponent, IconComponent, DragDropModule],
    template: `
        <div class="upx-modal_title">
            <ng-content></ng-content>
        </div>
        <div cdkDrag cdkDragRootElement=".cdk-overlay-pane">
			<upx-button *ngIf="isImage" (click)="openUpload()" [onlyIcon]="true" variant="plain" size="sm" shape="circle">
					<upx-icon name="file_upload"></upx-icon>
				</upx-button>
            <upx-button cdkDragHandle [onlyIcon]="true" variant="plain" size="sm" shape="circle" class="upx-modal__drag-handle">
                <upx-icon name="drag_indicator"></upx-icon>
            </upx-button>
			<upx-button *ngIf="enableDelete" (click)="onDeleteRequest()" [onlyIcon]="true" variant="plain" size="sm" shape="circle">
                <upx-icon name="delete"></upx-icon>
            </upx-button>
			<upx-button *ngIf="enableInfo" (click)="onItemInfoRequest()" [onlyIcon]="true" variant="plain" size="sm" shape="circle">
                <upx-icon name="info"></upx-icon>
            </upx-button>
            <upx-button *ngIf="dialogRef" (onClick)="onClose()" [onlyIcon]="true" variant="plain" size="sm" shape="circle">
                <upx-icon name="close"></upx-icon>
            </upx-button>
        </div>
    `,
    styleUrls: ['./modal.component.scss'],
    host: {
        'class': 'upx-modal__heading'
    },
    encapsulation: ViewEncapsulation.None
})
export class ModalHeadingComponent {
    @Input() dialogRef?: MatDialogRef<any>;
	@Input() enableDelete =false;
	@Input() enableInfo = false;
	@Input() isImage :boolean = false;
	@Output() onItemDelete = new EventEmitter<any>();
	@Output() onItemInfo = new EventEmitter<any>();
	@Output() onOpenUpload = new EventEmitter<any>();
	@Input() onCloseAction: boolean = false;
    @Input() closeActionMessage: string = '';

	modalService: ModalService = inject(ModalService);

	public onClose(){

		if(!this.onCloseAction){

			this.dialogRef?.close();

		}else{

			this.modalService
				.confirm('', this.closeActionMessage, 'Sim', 'Não')
				.subscribe((result: boolean) => {

					if (result){
						this.dialogRef?.close();
					}

				}

			);

		}

	}

	onDeleteRequest()
	{

	  this.onItemDelete.emit();
	}

	onItemInfoRequest(){

		this.onItemInfo.emit();
	}
	openUpload(){
		this.onOpenUpload.emit();
	}

}

@Component({
    selector: 'upx-modal-content',
    standalone: true,
    imports: [CommonModule],
    template: `
        <ng-content></ng-content>`,
    styleUrls: ['./modal.component.scss'],
    host: {
        'class': 'upx-modal__content'
    },
    encapsulation: ViewEncapsulation.None
})
export class ModalContentComponent {

}

@Component({
    selector: 'upx-modal-footer',
    standalone: true,
    imports: [CommonModule],
    template: `
        <ng-content></ng-content>`,
    styleUrls: ['./modal.component.scss'],
    host: {
        'class': 'upx-modal__footer',
        '[class.upx-modal__footer--align-center]':  'this.align === "center"',
        '[class.upx-modal__footer--align-end]':     'this.align === "end"',
		'[class.upx-modal__footer--align-evenly]':     'this.align === "evenly"',
		'[class.upx-modal__footer--align-start]':     'this.align === "start"',
		'[class.upx-modal__footer--align-between]':     'this.align === "between"',
		'[class.upx-modal__footer--align-around]':     'this.align === "around"',
    },
    encapsulation: ViewEncapsulation.None
})
export class ModalFooterComponent {
    @Input() align: ModalFooterPosition = 'end';
}
