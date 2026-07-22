import {Component, Input, ViewEncapsulation} from '@angular/core';
import {CommonModule} from '@angular/common';

export declare type CardAppearance = 'outlined' | 'raised';
export declare type CardHeaderPosition = 'above' | 'left' | 'right';
export declare type CardActionsPosition = 'start' | 'center' | 'end';

@Component({
    selector: 'upx-card',
    standalone: true,
    imports: [CommonModule],
    template: ` <ng-content></ng-content>`,
    styleUrls: ['./card.component.scss'],
    host: {
        'class': 'upx-card',
        '[class.upx-card--outlined]': 'appearance === "outlined"',
        '[class.upx-card--raised]': 'appearance === "raised"',
        '[class.upx-card--header-above]': 'headerPosition === "above"',
        '[class.upx-card--header-left]': 'headerPosition === "left"',
        '[class.upx-card--header-right]': 'headerPosition === "right"',
    },
    encapsulation: ViewEncapsulation.None,
})
export class CardComponent {
    @Input() appearance: CardAppearance = 'outlined';
    @Input() headerPosition: CardHeaderPosition = 'above';
}

@Component({
    selector: 'upx-card-header',
    standalone: true,
    imports: [CommonModule],
    template: `
        <ng-content></ng-content>`,
    host: {
        'class': 'upx-card__header',
        '[class.upx-card__header--with-divider]': 'divider === true'
    }
})
export class CardHeaderComponent {
    @Input() divider: boolean = false;
}

@Component({
    selector: 'upx-card-title',
    standalone: true,
    imports: [CommonModule],
    template: `
        <ng-content></ng-content>`,
    host: {
        'class': 'upx-card__title'
    }
})
export class CardTitleComponent {
}

@Component({
    selector: 'upx-card-subtitle',
    standalone: true,
    imports: [CommonModule],
    template: `
        <ng-content></ng-content>`,
    host: {
        'class': 'upx-card__subtitle'
    }
})
export class CardSubtitleComponent {
}

@Component({
    selector: 'upx-card-content',
    standalone: true,
    imports: [CommonModule],
    template: `
        <ng-content></ng-content>`,
    host: {
        'class': 'upx-card__content'
    }
})
export class CardContentComponent {
}

@Component({
    selector: 'upx-card-actions',
    standalone: true,
    imports: [CommonModule],
    template: `
        <ng-content></ng-content>`,
    host: {
        'class': 'upx-card__actions',
        '[class.upx-card__actions--with-divider]': 'divider === true',
        '[class.upx-card__actions--align-start]': 'align === "start"',
        '[class.upx-card__actions--align-center]': 'align === "center"',
        '[class.upx-card__actions--align-end]': 'align === "end"'
    }
})
export class CardActionsComponent {
    @Input() divider: boolean = false;
    @Input() align: CardActionsPosition = 'end';
}
