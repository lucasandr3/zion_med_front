import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    inject,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
    ViewEncapsulation
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {CardAppearance} from "../card/card.component";

export declare type TableAppearance = 'outlined' | 'raised';
export declare type TableColAlign = 'start' |'center' | 'end';

@Component({
  selector: 'upx-table',
  standalone: true,
  imports: [CommonModule],
  template: `<ng-content></ng-content>`,
  styleUrls: ['./table.component.scss'],
    host: {
        class: 'upx-table',
        '[class.upx-table--outlined]': 'appearance === "outlined"',
    },
  encapsulation: ViewEncapsulation.None
})
export class TableComponent {
    @Input() appearance: TableAppearance = 'outlined';
}

@Component({
    selector: 'upx-table-header',
    standalone: true,
    imports: [CommonModule],
    template: `<ng-content></ng-content>`,
    styleUrls: ['./table.component.scss'],
    host: {
        class: 'upx-table__header',
    },
    encapsulation: ViewEncapsulation.None
})
export class TableHeaderComponent {
}

@Component({
    selector: 'upx-table-body',
    standalone: true,
    imports: [CommonModule],
    template: `<ng-content></ng-content>`,
    styleUrls: ['./table.component.scss'],
    host: {
        class: 'upx-table__body',
    },
    encapsulation: ViewEncapsulation.None
})
export class TableBodyComponent {
}

@Component({
    selector: 'upx-table-row',
    standalone: true,
    imports: [CommonModule],
    template: `<ng-content></ng-content>`,
    styleUrls: ['./table.component.scss'],
    host: {
        class: 'upx-table__row',
		'(click)': 'onRowClick()'
    },
    encapsulation: ViewEncapsulation.None
})
export class TableRowComponent {
	@Output() rowClick = new EventEmitter<void>(); // Isso emitirá o evento quando um clique acontecer.

    onRowClick() {
        this.rowClick.emit(); // Quando a linha é clicada, emitimos o evento.
    }

}

@Component({
    selector: 'upx-table-col',
    standalone: true,
    imports: [CommonModule],
    template: `<ng-content></ng-content>`,
    styleUrls: ['./table.component.scss'],
    host: {
        class: 'upx-table__col',
        '[class.upx-table__col--emphasis]': 'this.emphasis',
        '[class.upx-table__col--align-center]': 'this.align === "center"',
        '[class.upx-table__col--align-end]': 'this.align === "end"'
    },
    encapsulation: ViewEncapsulation.None
})
export class TableColComponent implements OnChanges{

    private elementRef: ElementRef = inject(ElementRef);

    @Input() width?: string;
    @Input() emphasis?: boolean;
    @Input() align?: TableColAlign;

    ngOnChanges(changes: SimpleChanges): void {
        if(changes['width'].currentValue !== changes['width'].previousValue){
            this.elementRef.nativeElement.style.width = changes['width'].currentValue;
        }
    }

}


