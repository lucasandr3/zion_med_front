import { Component, HostBinding, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'upx-navigation-item',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './navigation-item.component.html',
    styleUrls: ['./navigation-item.component.scss'],
})
export class NavigationItemComponent {
    @Input() active: boolean = false;
    @HostBinding('class')
    get classes() {
        return {
            'upx-navigation-item': true,
            'upx-navigation-item-active': this.active,
        };
    }
}
