import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

export type LoadingVariantType = 'inline' | 'full-page';

@Component({
    selector: 'upx-loading',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.scss'],
	host: {
		'[class.upx-loading]': 'true',
		'[class.upx-loading--inline]': 'variant === "inline"',
		'[class.upx-loading--full-page]': 'variant === "full-page"',
	},
	encapsulation: ViewEncapsulation.None,
})
export class LoadingComponent {
	@Input() variant: LoadingVariantType = 'inline';
    @Input() width: string = '1.25rem';
	@Input() text: string = 'Carregando...';
}
