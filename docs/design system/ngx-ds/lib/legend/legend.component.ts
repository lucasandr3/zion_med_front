import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'upx-legend',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './legend.component.html',
    styleUrls: ['./legend.component.scss'],
})
export class LegendComponent implements OnInit {
    @Input() titleText!: string;
    @Input() descriptionText!: string | null;
    constructor() {}

    ngOnInit(): void {}
}
