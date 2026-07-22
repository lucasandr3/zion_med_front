import { Component, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'upx-sidenav-header',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './sidenav-header.component.html',
    styleUrls: ['./sidenav-header.component.scss'],
})
export class SidenavHeaderComponent {
    @HostBinding('class')
    get classes() {
        return {
            'upx-sidenav-header': true,
        };
    }
}
