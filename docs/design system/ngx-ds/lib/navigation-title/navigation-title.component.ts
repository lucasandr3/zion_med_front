import { Component, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'upx-navigation-title',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './navigation-title.component.html',
    styleUrls: ['./navigation-title.component.scss'],
})
export class NavigationTitleComponent {
    @HostBinding('class')
    get classes() {
        return {
            'upx-navigation-title': true,
        };
    }
}
