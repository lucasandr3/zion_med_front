import { Component, HostBinding, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'upx-tabs-content',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './tabs-content.component.html',
    styleUrls: ['./tabs-content.component.scss'],
})
export class TabsContentComponent {
    @Input() @HostBinding('id') tabsContentId?: string;

    @HostBinding('attr.role') attrRole: string = 'tabpanel';
    //@HostBinding('style.display') styleDisplay: string = 'none';

    @HostBinding('class')
    get classes() {
        return {
            'upx-tabs-content': true,
        };
    }
}
