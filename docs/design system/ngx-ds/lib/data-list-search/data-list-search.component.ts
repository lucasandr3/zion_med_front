import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from '../input/input.component';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'upx-data-list-search',
    standalone: true,
    imports: [CommonModule, InputComponent],
    templateUrl: './data-list-search.component.html',
    styleUrls: ['./data-list-search.component.scss'],
	host: {
		'[class.upx-data-list-search]': 'true'
	},
	encapsulation: ViewEncapsulation.None,
})
export class DataListSearchComponent {
    @Input() fieldId: string = `upx-data-list-search__input-${Math.random().toString(36).substr(2, 9)}`;
    @Input() field!: FormControl;
	@Input() placeholderText: string = 'Digite para buscar';

    @Output() fieldChange = new EventEmitter<FormControl>();
}
