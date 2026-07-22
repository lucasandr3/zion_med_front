import { Component, HostBinding, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import { DismissDirective } from '../dismiss/dismiss.directive';

@Component({
    selector: 'upx-alert',
    standalone: true,
    imports: [CommonModule, IconComponent, DismissDirective],
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss'],
})
export class AlertComponent {
    @Input() titleText?: string;
    @Input() messageText?: string;
    @Input() variant: string = 'default'; // default
    @Input() color: string = 'theme'; // theme, default, success, info, warning, danger, dark
    @Input() icon?: string;
    @Input() dismiss?: boolean;

    @HostBinding('attr.dismissId') dismissId =
        'alertDismiss' + (Math.random() + '').split('.')[1];

    @HostBinding('role') role = 'alert';

    @HostBinding('class')
    get classes() {
        return {
            'upx-alert': true,
            'upx-alert-icon': this.icon,

            'upx-alert-variant-default': this.variant === 'default',

            'upx-alert-color-theme': this.color === 'theme',
            'upx-alert-color-default': this.color === 'default',
            'upx-alert-color-success': this.color === 'success',
            'upx-alert-color-info': this.color === 'info',
            'upx-alert-color-warning': this.color === 'warning',
            'upx-alert-color-danger': this.color === 'danger',
        };
    }
}
