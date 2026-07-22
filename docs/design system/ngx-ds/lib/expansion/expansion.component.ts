import { Component, ContentChildren, EventEmitter, Input, Output, QueryList, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';

@Component({
    selector: 'upx-expansion',
    standalone: true,
    imports: [CommonModule],
    template: `<ng-content></ng-content>`,
    styleUrls: ['./expansion.component.scss'],
    host: {
        'class': 'upx-expansion',
        '[class.upx-expansion--multi]': 'this.multi'
    },
    encapsulation: ViewEncapsulation.None
})
export class ExpansionComponent {
    @Input() multi: boolean = true;
}

@Component({
    selector: 'upx-expansion-panel',
    standalone: true,
    imports: [CommonModule, IconComponent],
    template: `
        <div class="upx-expansion-panel" 
             [class.upx-expansion-panel--expanded]="expanded"
             [class.upx-expansion-panel--disabled]="disabled">
            <div class="upx-expansion-panel__header" (click)="!disabled && toggle()">
                <ng-content select="upx-expansion-panel-header"></ng-content>
                <div class="upx-expansion-panel__icon">
                    <upx-icon [name]="expanded ? 'expand_less' : 'expand_more'"></upx-icon>
                </div>
            </div>
            <div class="upx-expansion-panel__content-wrapper" [class.upx-expansion-panel__content-wrapper--expanded]="expanded">
                <div class="upx-expansion-panel__content">
                    <ng-content select="upx-expansion-panel-content"></ng-content>
                </div>
            </div>
        </div>
    `,
    styleUrls: ['./expansion.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ExpansionPanelComponent {
    @Input() expanded: boolean = false;
    @Input() disabled: boolean = false;
    @Output() expandedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    toggle(): void {
        if (!this.disabled) {
            this.expanded = !this.expanded;
            this.expandedChange.emit(this.expanded);
        }
    }
}

@Component({
    selector: 'upx-expansion-panel-header',
    standalone: true,
    imports: [CommonModule],
    template: `<ng-content></ng-content>`,
    encapsulation: ViewEncapsulation.None
})
export class ExpansionPanelHeaderComponent {}

@Component({
    selector: 'upx-expansion-panel-content',
    standalone: true,
    imports: [CommonModule],
    template: `<ng-content></ng-content>`,
    encapsulation: ViewEncapsulation.None
})
export class ExpansionPanelContentComponent {}

