import {Component, EventEmitter, HostBinding, Input, OnInit, Output, ViewEncapsulation,} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormControl, ReactiveFormsModule} from '@angular/forms';

@Component({
    selector: 'upx-checkbox',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './checkbox.component.html',
    styleUrls: ['./checkbox.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CheckboxComponent implements OnInit {
    @Input() checked: boolean = false;
    @Input() required: boolean = false;
    @Input() fieldId?: string;
    @Input() name!: string;
    @Input() id!: string;
    @Input() value!: any;
    @Input() disabled: boolean = false;
    @Input() readOnly: boolean = false;
    @Input() enableChangeFieldWithEnter: boolean = false;

    @Input() color: string = 'default'; // theme, default, success, info, warning, danger

    @Input() field: FormControl = new FormControl(false);
    @Output() fieldChange = new EventEmitter<FormControl>();

    @HostBinding('class')
    get classes() {
        return {
            'upx-checkbox': true,
            'upx-checkbox-readonly': this.readOnly,
            'upx-checkbox-disabled': this.disabled || this.field?.disabled,

            'upx-checkbox--color-theme': this.color === 'theme',
            'upx-checkbox--color-default': this.color === 'default',
            'upx-checkbox--color-success': this.color === 'success',
            'upx-checkbox--color-info': this.color === 'info',
            'upx-checkbox--color-warning': this.color === 'warning',
            'upx-checkbox--color-danger': this.color === 'danger',
        };
    }

    constructor() {}

    ngOnInit(): void {}
    
    changeEmit(event?: Event) {
        this.fieldChange.emit(this.field);

        if (event?.target) {
            this.handleChangeFieldWithEnter(event.target as HTMLElement);
        }
    }

    handleChangeFieldWithEnter(currentElement: HTMLElement) {
        if (this.enableChangeFieldWithEnter) {
            setTimeout(() => {
                const inputs = Array.from(document.querySelectorAll('input, select, textarea'))
                    .filter((element: any) => !element.disabled && element.offsetParent !== null);
    
                const currentIndex = inputs.indexOf(currentElement);
                const nextInput = inputs[currentIndex + 1] as HTMLElement;
    
                if (nextInput) {
                    nextInput.focus();
                }
            }, 10);
        }
    }
}

@Component({
    selector: 'upx-checkbox-group',
    standalone: true,
    imports: [CommonModule],
    template: '<ng-content></ng-content>',
    styleUrls: ['./checkbox.component.scss'],
	host: {
		'[class.upx-checkbox-group]': 'true',
	},
	encapsulation: ViewEncapsulation.None,
})
export class CheckboxGroupComponent {}
