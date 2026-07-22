import { Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

export declare type BadgeAppearance = 'default' | 'dot';
export declare type BadgeColor = 'default' | 'theme' | 'success' | 'info' | 'warning' | 'danger' | 'slate' | 'red' | 'amber' | 'lime' | 'teal' | 'sky' | 'indigo' | 'purple' | 'pink';
export declare type BadgeSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'| 'custom';
export declare type BadgeShape = 'square' | 'rounded' | 'circle';

@Component({
    selector: 'upx-badge',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './badge.component.html',
    styleUrls: ['./badge.component.scss'],
	host: {
		'class': 'upx-badge',
		'[class.upx-badge--variant-dot]': 'this.variant === "dot"',
		'[class.upx-badge--variant-default]': 'this.variant === "default"',
		'[class.upx-badge--color-theme]': 'this.color === "theme"',
		'[class.upx-badge--color-default]': 'this.color === "default"',
		'[class.upx-badge--color-success]': 'this.color === "success"',
		'[class.upx-badge--color-info]': 'this.color === "info"',
		'[class.upx-badge--color-warning]': 'this.color === "warning"',
		'[class.upx-badge--color-danger]': 'this.color === "danger"',
		'[class.upx-badge--color-slate]': 'this.color === "slate"',
		'[class.upx-badge--color-red]': 'this.color === "red"',
		'[class.upx-badge--color-amber]': 'this.color === "amber"',
		'[class.upx-badge--color-lime]': 'this.color === "lime"',
		'[class.upx-badge--color-teal]': 'this.color === "teal"',
		'[class.upx-badge--color-sky]': 'this.color === "sky"',
		'[class.upx-badge--color-indigo]': 'this.color === "indigo"',
		'[class.upx-badge--color-purple]': 'this.color === "purple"',
		'[class.upx-badge--color-pink]': 'this.color === "pink"',
		'[class.upx-badge--color-hexadecimal]': 'this.colorHexadecimal',
		'[class.upx-badge--size-custom]': 'this.size === "custom"',
		'[class.upx-badge--size-xs]': 'this.size === "xs"',
		'[class.upx-badge--size-sm]': 'this.size === "sm"',
		'[class.upx-badge--size-md]': 'this.size === "md"',
		'[class.upx-badge--size-lg]': 'this.size === "lg"',
		'[class.upx-badge--size-xl]': 'this.size === "xl"',
		'[class.upx-badge--shape-square]': 'this.shape === "square"',
		'[class.upx-badge--shape-rounded]': 'this.shape === "rounded"',
		'[class.upx-badge--shape-circle]': 'this.shape === "circle"',
		'[style.background-color]': 'this.colorHexadecimal',
		'[style.color]': 'this.colorTextHexadecimal',
	},
	encapsulation: ViewEncapsulation.None,
})
export class BadgeComponent {
    @Input() variant: BadgeAppearance = 'default';
    @Input() color: BadgeColor = 'default';
    @Input() size: BadgeSize = 'sm';
    @Input() shape: BadgeShape = 'circle';
	@Input() colorHexadecimal: string = '';
	@Input() colorTextHexadecimal: string = '';
}
