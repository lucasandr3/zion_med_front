import { Component, HostBinding, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'upx-tabs-item',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './tabs-item.component.html',
    styleUrls: ['./tabs-item.component.scss'],
})
export class TabsItemComponent {
    @Input() tabsItemId?: string;
    @Input() disabled: boolean = false;

    @HostBinding('attr.role') attrRole: string = 'presentation';

    @HostBinding('class')
    get classes() {
        return {
            'upx-tabs-item': true,
            'upx-tabs-item-disabled': this.disabled,
        };
    }
}
