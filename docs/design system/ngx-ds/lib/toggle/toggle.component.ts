import {
    Component,
    ElementRef,
    EventEmitter,
    HostBinding,
    Input,
    OnInit,
    Output,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormControl, ReactiveFormsModule} from "@angular/forms";

@Component({
    selector: 'upx-toggle',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './toggle.component.html',
    styleUrls: ['./toggle.component.scss'],
    host: {
        'class': 'upx-toggle'
    },
    encapsulation: ViewEncapsulation.None
})
export class ToggleComponent implements OnInit {
    @Input() required: boolean = false;
    @Input() disabled: boolean = false;
    @Input() readOnly: boolean = false;
    @Input() feedbackDisabled: boolean = false;
    @Input() versao: string = 'v1';

    @Input() color: string = 'theme'; // theme, default, success, info, warning, danger
    @Input() size: string = 'md'; // sm, md, lg

    @Input() fieldId?: string;
    @Input() field!: FormControl;
    @Input() descricao: string = '';

    @Output() fieldChange = new EventEmitter<FormControl>();

    @ViewChild('upxToogle') upxToogle: ElementRef | undefined;

    @HostBinding('class')
    get classes() {
        return {
            'upx-toggle-readonly': this.readOnly,
            'upx-toggle-disabled': this.disabled,

            'upx-toggle-size-sm': this.size === 'sm',
            'upx-toggle-size-md': this.size === 'md',
            'upx-toggle-size-lg': this.size === 'lg',

            'upx-toggle-color-theme': this.color === 'theme',
            'upx-toggle-color-default': this.color === 'default',
            'upx-toggle-color-success': this.color === 'success',
            'upx-toggle-color-info': this.color === 'info',
            'upx-toggle-color-warning': this.color === 'warning',
            'upx-toggle-color-danger':  this.color === 'danger',

            'upx-toggle-valid': this.field ? this.field.valid : false,
            'upx-toggle-invalid': this.field
                ? this.field.invalid && (this.field.dirty || this.field.touched)
                : false,
        };
    }

    changeEmit() {
        this.fieldChange.emit(this.field);
    }

    ngOnInit(): void {
        if (this.field && (this.disabled || this.readOnly)) this.field.disable();
    }

    getErrorMessage() {
        if (this.field.hasError('required')) {
            return 'Você deve inserir um valor.';
        }
        if (this.field.hasError('email')) {
            return 'Não é um e-mail válido.';
        }
        return '';
    }
}
