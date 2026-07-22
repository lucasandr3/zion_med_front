import { NgModule } from '@angular/core';
import {TabContentDirective, TabGroupComponent, TabDirective, TabLabelDirective} from "./tab.component";

const COMPONENTS = [
    TabGroupComponent, TabDirective, TabLabelDirective, TabContentDirective
]

@NgModule({
    imports: [COMPONENTS],
    exports: [COMPONENTS],
})
export class TabModule { }
