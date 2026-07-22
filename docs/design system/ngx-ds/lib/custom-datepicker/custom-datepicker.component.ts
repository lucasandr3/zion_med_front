import {
	Component,
	ElementRef,
	EventEmitter,
	Input,
	OnInit,
	Output,
	ViewChild,
	ViewEncapsulation
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
	selector: 'upx-datepicker',
	standalone: true,
	imports: [
		CommonModule,
		ReactiveFormsModule,
		MatDatepickerModule,
		MatInputModule,
		MatNativeDateModule
	],
	templateUrl: './custom-datepicker.component.html',
	styleUrls: ['./custom-datepicker.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class CustomDatepickerComponent implements OnInit {

	@Input() field!: FormControl;
	@Input() fieldId: string = `custom-datepicker-${Math.random().toString(36).substr(2, 8)}`;
	@Input() disabled: boolean = false;
	@Output() fieldChange = new EventEmitter<FormControl>();
	@Output() changeDate = new EventEmitter<any>();
	@ViewChild('datepickerInput') datepickerInput!: ElementRef;
	@ViewChild('picker') datepicker!: any;

	displayDate: string = '';

	ngOnInit(): void {

		if (this.disabled) {
			this.field.disable();
		}

		this.updateDisplayDate();
		this.field.valueChanges.subscribe(() => this.updateDisplayDate());

	}

	openDatePicker() {
		this.datepicker.open();
	}

	changeEmit() {
		this.fieldChange.emit(this.field);
		this.updateDisplayDate();
	}

	private updateDisplayDate() {

		const dateValue = this.field.value;
		if (dateValue) {
			const date = new Date(dateValue);
			this.displayDate = date.toLocaleDateString(undefined, { timeZone: 'UTC' });
		} else {
			this.displayDate = '';
		}

	}

}
