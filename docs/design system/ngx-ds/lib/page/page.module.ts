import { NgModule } from '@angular/core';
import { PageListComponent } from "./page.component";

const COMPONENTS = [
    PageListComponent
]

@NgModule({
    imports: [COMPONENTS],
    exports: [COMPONENTS],
})
export class PageModule { }
