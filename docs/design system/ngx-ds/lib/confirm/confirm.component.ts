import {
    Component,
    EventEmitter,
    HostBinding, Inject,
    inject,
    Input,
    OnInit,
    Output,
    Renderer2,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import { ButtonComponent } from '../button/button.component';
import { Modal, ModalInterface, ModalOptions } from 'flowbite';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {ModalModule} from "../modal/modal.module";

export interface DialogData {
    title?: string,
    message?: string,
    button1?: string,
    button2?: string,
    isTheme?: boolean | null
}

@Component({
    selector: 'upx-confirm',
    standalone: true,
    imports: [CommonModule, IconComponent, ButtonComponent, MatDialogModule, ModalModule],
    templateUrl: './confirm.component.html',
    styleUrls: ['./confirm.component.scss'],
})
export class ConfirmComponent implements OnInit {
    renderer2: Renderer2 = inject(Renderer2);

    modalConfirm!: ModalInterface;

    @Input() message?: string;
    @Input() title?: string;
    @Input() button1?: string;
    @Input() button2?: string;
    @Input() isTheme?: boolean;
    @Input() openConfirm?: EventEmitter<boolean>;
    @Input() onClose?: EventEmitter<boolean>;

    @HostBinding('id') @Input() confirmId: string = this.generateUniqueId();

    @Output() onConfirm = new EventEmitter<boolean>();

    @Output() onHide = new EventEmitter();
    @Output() onShow = new EventEmitter();
    @Output() onToggle = new EventEmitter();

    @HostBinding('class')
    get classes() {
        return {
            'upx-confirm': true,
        };
    }

    constructor(public dialogRef: MatDialogRef<ConfirmComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {
        this.title = data.title;
        this.message = data.message;
        this.button1 = data.button1;
        this.button2 = data.button2;
        this.isTheme = data.isTheme == true ? true : false;
    }

    ngOnInit(): void {
        this.openConfirm?.subscribe(() => {
            this.open();
        });
        this.onClose?.subscribe(() => {
            this.close();
        });
    }

    ngAfterViewInit(): void {
        const modalElement: HTMLElement = this.renderer2.selectRootElement(
            `#${this.confirmId}`,
            true
        );

        const modalOptions: ModalOptions = {
            placement: 'center',
            backdrop: 'static',
            backdropClasses:
                'bg-neutral-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
            closable: true,
            onHide: () => {
                this.onHide.emit();
            },
            onShow: () => {
                this.onShow.emit();
            },
            onToggle: () => {
                this.onToggle.emit();
            },
        };

        this.modalConfirm = new Modal(modalElement, modalOptions);
        //this.modalConfirm.show();
    }

    generateUniqueId() {
        return `upx-confirm-${Math.random().toString(36).substr(2, 9)}`;
    }

    open() {
        //this.modalConfirm.show();
        /*this.dialog.open(ConfirmContentComponent, {
            data: {
                title: this.title,
                message: this.message
            }
        });*/
    }

    close(confirm: boolean = false) {
        //this.modalConfirm.hide();
        //this.onConfirm.emit(confirm);
        this.dialogRef.close(confirm);
    }
}

/*@Component({
    selector: 'upx-confirm-content',
    standalone: true,
    imports: [CommonModule, IconComponent, ButtonComponent, MatDialogModule],
    templateUrl: './confirm.component.html',
    styleUrls: ['./confirm.component.scss'],
})
export class ConfirmContentComponent {
    title?: string;
    message?: string;
    constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
        this.title = data.title;
        this.message = data.message;
    }
}*/
