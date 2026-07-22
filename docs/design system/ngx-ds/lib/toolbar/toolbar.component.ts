import {Component, HostBinding, Input, TemplateRef, ViewEncapsulation} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
    selector: 'upx-toolbar',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
    host: {
        'class': 'upx-toolbar',
        '[class.upx-toolbar--border-top]': 'this.borderTop',
        '[class.upx-toolbar--border-bottom]': 'this.borderBottom',
        '[class.upx-toolbar--align-end]': 'this.align === "end"',
        '[class.upx-toolbar--align-between]': 'this.align === "between" || (this.startTemplate || this.endTemplate)',
        '[class.upx-toolbar--color-padrao]': 'this.color == "padrao"',
    },
    encapsulation: ViewEncapsulation.None
})
export class ToolbarComponent {
    @Input() startTemplate: TemplateRef<any> | null = null;
    @Input() endTemplate: TemplateRef<any> | null = null;
    @Input() color: string = 'padrao';
    @Input() borderTop: boolean = false;
    @Input() borderBottom: boolean = true;
    @Input() align: string = 'between';
}
