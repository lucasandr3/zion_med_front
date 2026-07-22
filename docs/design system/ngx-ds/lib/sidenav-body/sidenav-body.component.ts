import { Component, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'upx-sidenav-body',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './sidenav-body.component.html',
    styleUrls: ['./sidenav-body.component.scss'],
})
export class SidenavBodyComponent {
    @HostBinding('class')
    get classes() {
        return {
            'upx-sidenav-body': true,
        };
    }
}
