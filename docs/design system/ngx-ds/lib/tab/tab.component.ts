import {
    AfterViewInit,
    Component,
    ContentChild,
    ContentChildren,
    Directive, Input,
    OnInit,
    TemplateRef,
    ViewEncapsulation
} from '@angular/core';
import {CommonModule, NgFor} from '@angular/common';
import { MatTabsModule } from "@angular/material/tabs";

@Directive({
    selector: '[upxTab]',
    standalone: true,
})
export class TabDirective {
    constructor(public templateRef: TemplateRef<unknown>) {}
}

@Directive({
    selector: '[upxTabLabel]',
    standalone: true,
})
export class TabLabelDirective {
    constructor(public templateRef: TemplateRef<unknown>) {}
}

@Directive({
    selector: '[upxTabContent]',
    standalone: true,
})
export class TabContentDirective {
    constructor(public templateRef: TemplateRef<unknown>) {}
}

@Component({
    selector: 'upx-tab-group',
    standalone: true,
    imports: [CommonModule, MatTabsModule],
    template: `
        <!--<mat-tab-group animationDuration="0" mat-stretch-tabs="false" mat-align-tabs="start">
            <ng-container >
                <mat-tab *ngFor="let tab as this.tabsTemplate">
                    <ng-container *ngTemplateOutlet="tab">
                    </ng-container>
                </mat-tab>
            </ng-container>
        </mat-tab-group>-->
    `,
    styleUrls: ['../tab/tab.component.scss'],
    host: {
        'class': 'upx-tab-group',
    },
    encapsulation: ViewEncapsulation.None
})
export class TabGroupComponent implements AfterViewInit {

    /*@Input() tabsTemplate?: TemplateRef<unknown>[];

    @ContentChildren(TabDirective) contentTabs!: TabDirective;
    @ContentChild(TabLabelDirective) contentLabel!: TabLabelDirective;*/

    ngAfterViewInit(): void {
        //console.log(this.contentTabs);
    }
}

