import { CommonModule } from "@angular/common";
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, ViewEncapsulation } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";

@Component({
    selector: "upx-editor",
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: "./editor.component.html",
    styleUrls: ["./editor.component.scss"],
    host: {
        'class': "upx-editor",
    },
    encapsulation: ViewEncapsulation.None
})
export class EditorComponent {

    @Input() placeholderText: string = '';
    @Input() size: string = 'md'; // xs, sm, md, lg, xl
    @Input() required: boolean = false;
    @Input() disabled: boolean = false;
    @Input() readOnly: boolean = false;
    @Input() feedbackDisabled: boolean = false;
    @Input() minlength?: string;
    @Input() maxlength?: string;
    @Input() lines: boolean = false;

    @Input() fieldId?: string;
    @Input() field!: FormControl;

    @Output() fieldChange = new EventEmitter<FormControl>();

    @ViewChild('upxEditor') upxEditor: ElementRef | undefined;

    constructor() {
        if (this.disabled) this.field.disable();
    }

    changeEmit() {
        this.fieldChange.emit(this.field);
    }

    getErrorMessage() {
        if (this.field.hasError('required')) {
            return 'Você deve inserir um valor.';
        }
        return '';
    }
}
