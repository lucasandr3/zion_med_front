import {
    Component,
    Inject,
    inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import { IconComponent } from '../icon/icon.component';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {ModalModule} from "../modal/modal.module";
import { Router } from '@angular/router';

export interface SuccessDialogData {
    message?: string,
    redirectRoute?: string
}

@Component({
    selector: 'upx-success-modal',
    standalone: true,
    imports: [CommonModule, IconComponent, ButtonComponent, MatDialogModule, ModalModule],
    template: `
        <upx-modal [disableFullSizeMobile]="true" [disableOrderMobile]="true" size="sm">
            <upx-modal-content>
                <div class="flex items-center gap-3 mb-4">
                    <upx-icon name="done" class="text-green-500" size="lg"></upx-icon>
                    <h3 class="text-lg font-semibold">Sucesso!</h3>
                </div>
                <p *ngIf="message" class="text-base text-neutral-600 dark:text-neutral-300">
                    {{message}}
                </p>
            </upx-modal-content>
            <upx-modal-footer>
                <upx-button *ngIf="redirectRoute" (onClick)="redirect()" variant="solid" color="theme">
                    Ver Agendamentos
                </upx-button>
                <upx-button (onClick)="close()" variant="outline">
                    Fechar
                </upx-button>
            </upx-modal-footer>
        </upx-modal>
    `,
})
export class SuccessModalComponent {
    message?: string;
    redirectRoute?: string;
    router: Router = inject(Router);

    constructor(
        public dialogRef: MatDialogRef<SuccessModalComponent>, 
        @Inject(MAT_DIALOG_DATA) public data: SuccessDialogData
    ) {
        this.message = data.message;
        this.redirectRoute = data.redirectRoute;
    }

    close() {
        this.dialogRef.close();
    }

    redirect() {
        if (this.redirectRoute) {
            this.router.navigate([this.redirectRoute]);
        }
        this.dialogRef.close();
    }
}

