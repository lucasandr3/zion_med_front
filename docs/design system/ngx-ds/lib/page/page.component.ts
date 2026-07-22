import {Component, ViewEncapsulation} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
    selector: 'upx-page-list',
    standalone: true,
    imports: [CommonModule],
    template: `
        <ng-content></ng-content>`,
    styleUrls: ['./page.component.scss'],
    host: {
        'class': 'upx-page-list',
    },
    encapsulation: ViewEncapsulation.None
})
export class PageListComponent {
}
