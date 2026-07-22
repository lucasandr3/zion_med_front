import {
    Injectable,
    ViewContainerRef,
    ComponentRef,
    EventEmitter,
} from '@angular/core';
import { EMPTY, Observable, Subject } from 'rxjs';
import {ConfirmComponent} from '../confirm/confirm.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Injectable({
    providedIn: 'root',
})
export class ModalService {
    viewContainerRef?: ViewContainerRef;

    constructor(public dialog: MatDialog) {}

    /*confirm(title: string, message?: string) {
        const componentRef: ComponentRef<ConfirmComponent> =
            this.viewContainerRef.createComponent(ConfirmComponent);

        const openConfirm = new EventEmitter<boolean>();

        componentRef.instance.title = title;
        componentRef.instance.message = message;
        componentRef.instance.openConfirm = openConfirm;

        this.viewContainerRef.insert(componentRef.hostView);

        setTimeout(() => {
            openConfirm.emit();
        }, 0);

        return componentRef.instance.onConfirm;
    }*/

    confirm(title: string, message?: string,
		button1: string = 'Sim, eu confirmo',
		button2: string = 'Não, cancelar',
        isTheme: boolean = true
	){

        const dialogRef = this.dialog.open(ConfirmComponent, {
            data: {
                title: title,
                message: message,
				button1: button1,
				button2: button2,
                isTheme: isTheme
            }
        });

        return dialogRef.afterClosed();

    }

    modalForm(
        component: any,
        data: any,
        options?: { id?: string }
    ): Observable<any> {
        const config: MatDialogConfig = {
            data: data,
            maxWidth: '100dvw',
            maxHeight: '100dvh',
            enterAnimationDuration: 100,
            exitAnimationDuration: 100,
        };
        if (options?.id) {
            config.id = options.id;
            if (this.dialog.getDialogById(options.id)) {
                return EMPTY as Observable<any>;
            }
        }
        const dialogRef = this.dialog.open(component, config);
        return dialogRef.afterClosed() as Observable<any>;
    }
}
