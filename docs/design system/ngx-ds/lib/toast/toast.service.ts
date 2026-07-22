import { inject, Injectable } from '@angular/core';
import { filter, Observable, Subject } from 'rxjs';
import { Toast, ToastType } from './toast.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root',
})
export class ToastService {
    private subject = new Subject<Toast>();
    private defaultId = 'upx-toast-default';

    constructor(public _snackBar: MatSnackBar) {}

    onToast(id = this.defaultId): Observable<Toast> {
        return this.subject.asObservable().pipe(filter((x) => x && x.id === id));
    }

    success(message: string, options?: any) {
        this.Toast(new Toast({ ...options, type: ToastType.Success, message }));
    }

    error(message: string, options?: any) {
        this.Toast(new Toast({ ...options, type: ToastType.Error, message }));
    }

    info(message: string, options?: any) {
        this.Toast(new Toast({ ...options, type: ToastType.Info, message }));
    }

    warn(message: string, options?: any) {
        this.Toast(new Toast({ ...options, type: ToastType.Warning, message }));
    }

    Toast(Toast: Toast) {
        Toast.id = Toast.id || this.defaultId;
        this.subject.next(Toast);
		  const duration = Toast.duration !== undefined 
        ? Toast.duration 
        : (Toast.autoClose ? 8000 : 0);
        this._snackBar.open(Toast.message, 'Fechar', { duration:duration });
    }

    clear(id = this.defaultId) {
        this.subject.next(new Toast({ id }));
    }

    playAudio() {
        const audio = new Audio();
        audio.src = 'assets/audio/add.mp3';
        audio.load();
        audio.play();
    }
}
