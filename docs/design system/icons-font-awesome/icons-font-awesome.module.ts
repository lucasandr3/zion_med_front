import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { MatTooltipModule, MAT_TOOLTIP_DEFAULT_OPTIONS, MatTooltipDefaultOptions} from "@angular/material/tooltip";

export const myCustomTooltipDefaults: MatTooltipDefaultOptions = {
	showDelay: 200,
	hideDelay: 200,
	touchendHideDelay: 200,
};

@NgModule({
  exports:[FontAwesomeModule, MatTooltipModule],
})
export class IconsFontAwesomeModule {
	constructor(library: FaIconLibrary) {
		library.addIconPacks(fas, far);
	}
 }
