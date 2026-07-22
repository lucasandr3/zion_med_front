import { Component, EventEmitter, HostBinding, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'upx-radio',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './radio.component.html',
    styleUrls: ['./radio.component.scss'],
	host: {
		'[class.upx-radio]': 'true',
		'[class.upx-radio-readonly]': 'this.readOnly',
		'[class.upx-radio-disabled]': 'this.disabled',
	},
	encapsulation: ViewEncapsulation.None,
})
export class RadioComponent implements OnInit {
    @Input() checked: boolean = false;
    @Input() required: boolean = false;
    @Input() fieldId?: string;
    @Input() name!: string;
    @Input() value!: any;
    @Input() disabled: boolean = false;
    @Input() readOnly: boolean = false;

    @Input() field: FormControl = new FormControl(false);
    @Output() fieldChange = new EventEmitter<FormControl>();
	constructor() {}

    ngOnInit(): void {}
	@HostBinding('class')
	get classes() {
        return {
            'upx-checkbox': true,
            'upx-checkbox-readonly': this.readOnly,
            'upx-checkbox-disabled': this.disabled,

        };
    }
    emitChange() {
        this.fieldChange.emit(this.field);
    }
}

@Component({
    selector: 'upx-radio-group',
    standalone: true,
    imports: [CommonModule],
    template: '<ng-content></ng-content>',
    styleUrls: ['./radio.component.scss'],
	host: {
		'[class.upx-radio-group]': 'true',
	},
	encapsulation: ViewEncapsulation.None,
})
export class RadioGroupComponent {}
