import { Component, HostBinding, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'upx-sidenav',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent {
    @Input() compact: boolean = false;
    @Input() closed: boolean = true;
    @HostBinding('class')
    get classes() {
        return {
            'upx-sidenav': true,
            'upx-sidenav-compact': this.compact,
            'upx-sidenav-closed': this.closed,
            'h-100dvh shadow-left': true
        };
    }
}
