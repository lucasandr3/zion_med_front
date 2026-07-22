import { CommonModule } from '@angular/common';
import { Component, HostBinding, inject, Input, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ButtonComponent } from '../button/button.component';
import { IconComponent } from '../icon/icon.component';
import { Toast, ToastType } from './toast.model';
import { ToastService } from './toast.service';

@Component({
    selector: 'upx-toast',
    standalone: true,
    imports: [CommonModule, ButtonComponent, IconComponent, MatSnackBarModule],
    templateUrl: './toast.component.html',
    styleUrls: ['./toast.component.scss'],
})
export class ToastComponent implements OnInit {
    private router: Router = inject(Router);
    private toastService: ToastService = inject(ToastService);
    private _snackBar: MatSnackBar = inject(MatSnackBar);

    @Input() id = 'upx-toast-default';
    @Input() fade = true;

    toastType = ToastType;
    toasts: Toast[] = [];
    toastSubscription: Subscription = new Subscription();
    routeSubscription: Subscription = new Subscription();

    @HostBinding('class')
    get classes() {
        return {
            'upx-toast': true,
        };
    }

    ngOnInit() {
        this.toastSubscription = this.toastService.onToast(this.id).subscribe((toast) => {
            if (!toast.message) {
                this.toasts = this.toasts.filter((x) => x.keepAfterRouteChange);
                this.toasts.forEach((x) => delete x.keepAfterRouteChange);
                return;
            }
            this.toasts.push(toast);
            this._snackBar.open(toast.message, 'Fechar');


            if (toast.autoClose) {
                setTimeout(() => this.removeToast(toast), 3000);
            }
        });

        this.routeSubscription = this.router.events.subscribe((event) => {
            if (event instanceof NavigationStart) {
                this.toastService.clear(this.id);
            }
        });
    }

    ngOnDestroy() {
        this.toastSubscription.unsubscribe();
        this.routeSubscription.unsubscribe();
    }

    removeToast(toast: Toast) {
        if (!this.toasts.includes(toast)) return;

        if (this.fade) {
            const t = this.toasts.find((x) => x === toast);
            if (t) t.fade = true;

            setTimeout(() => {
                this.toasts = this.toasts.filter((x) => x !== toast);
            }, 250);
        } else {
            this.toasts = this.toasts.filter((x) => x !== toast);
        }
    }
}
