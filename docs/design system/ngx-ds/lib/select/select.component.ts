import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

export type SelectType = 'native' | 'material' | 'funciona' | 'multiempresa';

@Component({
    selector: 'upx-select',
    standalone: true,
    imports: [CommonModule, IconComponent, ReactiveFormsModule, MatInputModule, MatSelectModule],
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.scss'],
    host: {
        'class': 'upx-select',
        '[class.upx-select--readonly]': 'this.readOnly',
        '[class.upx-select--disabled]': 'this.disabled',
        '[class.upx-select--feedback-disabled]': 'this.feedbackDisabled',
        //'[class.upx-select--size-1]': 'this.icon',
        '[class.upx-select--size-xs]': 'this.size === "xs"',
        '[class.upx-select--size-sm]': 'this.size === "sm"',
        '[class.upx-select--size-md]': 'this.size === "md"',
        '[class.upx-select--size-lg]': 'this.size === "lg"',
        '[class.upx-select--size-xl]': 'this.size === "xl"'
    },
    encapsulation: ViewEncapsulation.None
})
export class SelectComponent implements OnInit {

    @Input() enableChangeFieldWithEnter: boolean = false;
    @Input() selectType: SelectType = 'native';
    @Input() subscriptSizing: boolean = false;
    @Input() floatLabel: boolean = false;
    @Input() size: string = 'md'; // xs, sm, md, lg, xl
    @Input() placeholderText: string = 'Selecione...';
    @Input() icon!: string | undefined;
    @Input() required: boolean = false;
    @Input() disabled: boolean = false;
    @Input() readOnly: boolean = false;
    @Input() multiple: boolean = false;
    @Input() multiempresa: boolean = false;
    @Input() feedbackDisabled: boolean = false;
    @Input() matOptions: any[] = [];
    @Input() enableNone: boolean = true;
    @Input() field!: FormControl;
    @Input() fieldId?: string;
    @Input() reference?: string;
    @Output() fieldChange = new EventEmitter<FormControl>();
    @Output() onItemSelect = new EventEmitter<any>();
    @Output() onItemSelectMulti = new EventEmitter<any>();
    @Output() onItemSelectMultiEmpresa = new EventEmitter<any>();
    @Output() onChange = new EventEmitter<any>();
    @ViewChild('upxSelect') upxSelect: ElementRef | undefined;

    ngOnInit(): void {
        if (this.disabled) this.field.disable();
    }

    changeEmit(event?: Event) {
        this.fieldChange.emit(this.field);
        if (event?.target) {
            this.handleChangeFieldWithEnter(event.target as HTMLElement);
        }
    }

    handleChangeFieldWithEnter(currentElement: HTMLElement) {
        if (this.enableChangeFieldWithEnter) {
            setTimeout(() => {
                const inputs = Array.from(document.querySelectorAll('input, select, textarea')).filter((element: any) => !element.disabled && element.offsetParent !== null);

                const currentIndex = inputs.indexOf(currentElement);
                const nextInput = inputs[currentIndex + 1] as HTMLElement;

                if (nextInput) {
                    nextInput.focus();
                }
            }, 10);
        }
    }

    itemSelected(option: any, selected: any) {
        option.selected = selected;
        this.onItemSelectMulti.emit(option);
        this.onItemSelect.emit(this.field);
    }

    itemSelectedMultiEmpresa(option: any, selected: any) {
        option.selected = selected;
        this.onItemSelectMultiEmpresa.emit(option);
    }

    clear() {
        if (this.field) {
            this.field.reset();
            this.field.markAsDirty();
            this.changeEmit();
        }
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

    onFieldChanged(event: any) {
        console.log('aaaaa: ', event)
    }
}
