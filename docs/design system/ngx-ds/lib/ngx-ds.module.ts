import { NgModule } from '@angular/core';
import { AlertComponent } from './alert/alert.component';
import { AvatarComponent } from './avatar/avatar.component';
import { BadgeComponent } from './badge/badge.component';
import { ButtonComponent } from './button/button.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { DataListComponent } from './data-list/data-list.component';
import { DismissDirective } from './dismiss/dismiss.directive';
import { DropdownComponent } from './dropdown/dropdown.component';
import { CollapseDirective } from './collapse/collapse.directive';
import { IconComponent } from './icon/icon.component';
import { InputComponent } from './input/input.component';
import { LabelComponent } from './label/label.component';
import { LegendComponent } from './legend/legend.component';
import { LoadingComponent } from './loading/loading.component';
import { NavigationItemComponent } from './navigation-item/navigation-item.component';
import { NavigationTitleComponent } from './navigation-title/navigation-title.component';
import { SelectComponent } from './select/select.component';
import { SidenavBodyComponent } from './sidenav-body/sidenav-body.component';
import { SidenavFooterComponent } from './sidenav-footer/sidenav-footer.component';
import { SidenavHeaderComponent } from './sidenav-header/sidenav-header.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ToastService } from './toast/toast.service';
import { DropdownDirective } from './dropdown/dropdown.directive';
import { ScreenService } from './services/screen.service';
import { DataListSearchComponent } from './data-list-search/data-list-search.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { RadioComponent } from './radio/radio.component';
import { TabsComponent } from './tabs/tabs.component';
import { TabsItemComponent } from './tabs/tabs-item.component';
import { TabsContentComponent } from './tabs/tabs-content.component';
import { ToggleComponent } from './toggle/toggle.component';
import { ToastComponent } from './toast/toast.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { ModalService } from './services/modal.service';
import { CardModule } from "./card/card.module";
import { TooltipDirective } from './tooltip/tooltip.directive';
import { FormModule } from "./form/form.module";
import { TableModule } from "./table/table.module";
import { ModalModule } from "./modal/modal.module";
import { TabModule } from "./tab/tab.modules";
import { EditorComponent } from './editor/editor.component';
import { InputSelectComponent } from './input-select/input-select.component';
import { PageModule } from './page/page.module';
import { SidenavFilters } from './sidenav-filters/sidenav-filters.component';
import {MatTooltipModule} from "@angular/material/tooltip";
import { CustomDatepickerComponent } from './custom-datepicker/custom-datepicker.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { PopoverComponent } from './popover/popover.component';
import { DrawerComponent } from './drawer/drawer.component';
import { CommonModule, CurrencyPipe } from '@angular/common';

const COMPONENTS = [
    IconComponent,
    InputComponent,
    LabelComponent,
    LegendComponent,
    CheckboxComponent,
    RadioComponent,
    ButtonComponent,
    SelectComponent,
    SidenavComponent,
    SidenavHeaderComponent,
    SidenavBodyComponent,
    SidenavFooterComponent,
    NavigationTitleComponent,
    NavigationItemComponent,
    DropdownComponent,
    LoadingComponent,
    DataListComponent,
    DataListSearchComponent,
    AvatarComponent,
    BadgeComponent,
    AlertComponent,
    ToolbarComponent,
    TabsComponent,
    TabsItemComponent,
    TabsContentComponent,
    ToggleComponent,
    ToastComponent,
    ConfirmComponent,
    EditorComponent,
	SidenavFilters,
    InputSelectComponent,
	CustomDatepickerComponent,
	DrawerComponent,
];

const MODULES = [
    CardModule,
    FormModule,
    TableModule,
    ModalModule,
    TabModule,
    PageModule,
	MatTooltipModule,
	MatDatepickerModule,
	MatFormFieldModule,
	MatInputModule,
	MatNativeDateModule,
	FormsModule,
	CommonModule
];

const DIRECTIVES = [
    DismissDirective,
    CollapseDirective,
    DropdownDirective,
    TooltipDirective
];

const SERVICES = [ToastService, ModalService, ScreenService];

@NgModule({
    declarations: [
		PopoverComponent
	],
    imports: [...COMPONENTS, ...MODULES, ...DIRECTIVES],
    exports: [...COMPONENTS, ...MODULES, ...DIRECTIVES, PopoverComponent],
    providers: [...SERVICES],
})
export class NgxDsModule {}
