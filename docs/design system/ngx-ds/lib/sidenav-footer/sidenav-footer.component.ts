import { Component, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'upx-sidenav-footer',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './sidenav-footer.component.html',
    styleUrls: ['./sidenav-footer.component.scss'],
})
export class SidenavFooterComponent {
    @HostBinding('class')
    get classes() {
        return {
            'upx-sidenav-footer': true,
        };
    }
}
