import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import {AbstractControl, Validators} from "@angular/forms";

@Component({
    selector: 'upx-label',
    standalone: true,
    imports: [CommonModule, IconComponent],
    templateUrl: './label.component.html',
    styleUrls: ['./label.component.scss'],
})
export class LabelComponent implements OnInit{
    @Input() required: boolean = false;
    @Input() optionalText!: string;
    @Input() helpIcon: string | undefined;
    @Input() helpText!: string;
    @Input() dynamicClassIcon: string = '';

    @Input() field?: AbstractControl;
    @Input() fieldId?: string;

    ngOnInit(): void {
        if(this.field?.hasValidator(Validators.required))
            this.required = true;
    }
}
