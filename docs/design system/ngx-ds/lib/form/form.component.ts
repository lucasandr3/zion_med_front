import {Component, Input, ViewEncapsulation} from '@angular/core';
import {CommonModule} from '@angular/common';

export declare type FormGridCols = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9|11| 12;
export declare type FormFieldAlign = 'center' | 'end' | 'between' | 'start';

@Component({
    selector: 'upx-form-page',
    standalone: true,
    imports: [CommonModule],
    template: `
        <ng-content></ng-content>`,
    styleUrls: ['./form.component.scss'],
    host: {
        'class': 'upx-form-page',
    },
    encapsulation: ViewEncapsulation.None
})
export class FormPageComponent {
}

@Component({
    selector: 'upx-form-page-content',
    standalone: true,
    imports: [CommonModule],
    template: `
        <ng-content></ng-content>`,
    styleUrls: ['./form.component.scss'],
    host: {
        'class': 'upx-form-page-content',
    },
    encapsulation: ViewEncapsulation.None
})
export class FormPageContentComponent {
}

@Component({
    selector: 'upx-form-grid',
    standalone: true,
    imports: [CommonModule],
    template: `
        <ng-content></ng-content>`,
    styleUrls: ['./form.component.scss'],
    host: {
        'class': 'upx-form-grid',
        '[class.upx-form-grid--with-1-cols]': 'this.gridCols === 1',
        '[class.upx-form-grid--with-2-cols]': 'this.gridCols === 2',
        '[class.upx-form-grid--with-3-cols]': 'this.gridCols === 3',
        '[class.upx-form-grid--with-4-cols]': 'this.gridCols === 4',
		'[class.upx-form-grid--with-5-cols]': 'this.gridCols === 5',
		'[class.upx-form-grid--with-6-cols]': 'this.gridCols === 6',
		'[class.upx-form-grid--with-7-cols]': 'this.gridCols === 7',
		'[class.upx-form-grid--with-8-cols]': 'this.gridCols === 8',
		'[class.upx-form-grid--with-9-cols]': 'this.gridCols === 9',
        '[class.upx-form-grid--with-11-cols]': 'this.gridCols === 11',
		'[class.upx-form-grid--with-12-cols]': 'this.gridCols === 12',

    },
    encapsulation: ViewEncapsulation.None
})
export class FormGridComponent {
    @Input() gridCols: FormGridCols = 2;
}

@Component({
    selector: 'upx-form-field',
    standalone: true,
    imports: [CommonModule],
    template: `
        <ng-content></ng-content>`,
    styleUrls: ['./form.component.scss'],
    host: {
        'class': 'upx-form-field',
        '[class.upx-form-field--align-center]': 'this.align === "center"',
        '[class.upx-form-field--align-end]': 'this.align === "end"',
        '[class.upx-form-field--align-between]': 'this.align === "between"',
		'[class.upx-form-field--align-start]': 'this.align === "start"'

    },
    encapsulation: ViewEncapsulation.None
})
export class FormFieldComponent {
    @Input() align?: FormFieldAlign;
}
