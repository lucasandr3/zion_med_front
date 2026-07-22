import { Component, EventEmitter, HostListener, Input, OnInit, Output, ViewEncapsulation, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import { LoadingComponent } from '../loading/loading.component';
import { MatRippleModule } from '@angular/material/core';

@Component({
	selector: 'upx-button',
	standalone: true,
	imports: [CommonModule, IconComponent, LoadingComponent, MatRippleModule],
	templateUrl: './button.component.html',
	styleUrls: ['./button.component.scss'],
	host: {
		'class': 'upx-button',
		'[class.upx-button--full]': 'this.full',
		'[class.upx-button--disabled]': 'this.disabled',
		'[class.upx-button--onlyicon]': 'this.onlyIcon',

		'[class.upx-button--shape-square]': 'this.shape === "square"',
		'[class.upx-button--shape-rounded]': 'this.shape === "rounded"',
		'[class.upx-button--shape-circle]': 'this.shape === "circle"',

		'[class.upx-button--size-xs]': 'this.size === "xs"',
		'[class.upx-button--size-sm]': 'this.size === "sm"',
		'[class.upx-button--size-md]': 'this.size === "md"',
		'[class.upx-button--size-lg]': 'this.size === "lg"',
		'[class.upx-button--size-xl]': 'this.size === "xl"',

		'[class.upx-button--variant-default]': 'this.variant === "default"',
		'[class.upx-button--variant-solid]': 'this.variant === "solid"',
		'[class.upx-button--variant-two-tone]': 'this.variant === "two-tone"',
		'[class.upx-button--variant-plain]': 'this.variant === "plain"',
		'[class.upx-button--variant-outline]': 'this.variant === "outline"',

		'[class.upx-button--color-theme]': 'this.color === "theme"',
		'[class.upx-button--color-default]': 'this.color === "default"',
		'[class.upx-button--color-success]': 'this.color === "success"',
		'[class.upx-button--color-info]': 'this.color === "info"',
		'[class.upx-button--color-warning]': 'this.color === "warning"',
		'[class.upx-button--color-danger]': 'this.color === "danger"',
		'[class.upx-button--color-padrao]': 'this.color === "padrao"',
	},
	encapsulation: ViewEncapsulation.None
})
export class ButtonComponent implements OnInit {
	@Input() full: boolean = false;
	@Input() shape: string = 'rounded'; // square, rounded, circle
	@Input() size: string = 'sm'; // xs, sm, md, lg, xl
	@Input() variant: string = 'default'; // default, solid, two-tone, plain, outline
	@Input() color: string = 'default'; // theme, default, success, info, warning, danger, padrao
	@Input() disabled: boolean = false;
	@Input() loading: boolean = false;
	@Input() onlyIcon: boolean = false;
	@Input() icon?: string;

	@Output() onClick = new EventEmitter<MouseEvent>();

	@HostListener('click', ['$event'])
	click(e: MouseEvent) {
		if (this.disabled) {
			e.preventDefault();
			e.stopImmediatePropagation(); 
			return false;  // adicional para reforçar que o evento foi tratado
		}
		this.onClick.emit(e);
		return ;
	}

	constructor() { }

	ngOnInit(): void { }

	// mouseEnter() {
	//     const domSelect: HTMLElement | null = document.querySelector('.cdk-overlay-container');

	// 	if(domSelect){
	// 		(domSelect as HTMLElement).style.setProperty('pointer-events', 'none', 'important');
	// 	}
	// }

	// mouseLeave() {
	// const domSelect: HTMLElement | null = document.querySelector('.cdk-overlay-container');

	// if(domSelect){
	// 	(domSelect as HTMLElement).style.setProperty('pointer-events', 'auto', 'important');
	// }
	// }
}
