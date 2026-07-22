import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output, ViewEncapsulation } from "@angular/core";
import { ToolbarComponent } from "../toolbar/toolbar.component";
import { ButtonComponent } from "../button/button.component";
import { IconComponent } from "../icon/icon.component";

@Component({
	selector: "upx-sidenav-filters",
	standalone: true,
	imports: [CommonModule, ToolbarComponent, ButtonComponent, IconComponent],
	templateUrl: "./sidenav-filters.component.html",
	styleUrls: ["./sidenav-filters.component.scss"],
	host: {
		class: "upx-sidenav-filters",
	},
	encapsulation: ViewEncapsulation.None,
})
export class SidenavFilters {

	@Output() onClose = new EventEmitter();
	@Output() onReset = new EventEmitter();
	@Output() onApply = new EventEmitter();
	@Output() disable = new EventEmitter(false);

	@Input() applyDisable: boolean =  false;

	close(){
		this.onClose.emit();
	}

	reset(){
		this.onReset.emit();
	}

	apply(){
		this.onApply.emit();
	}

}
