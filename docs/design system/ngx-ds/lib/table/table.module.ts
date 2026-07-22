import { NgModule } from '@angular/core';
import {
    TableBodyComponent,
    TableColComponent,
    TableComponent,
    TableHeaderComponent,
    TableRowComponent
} from "./table.component";

const COMPONENTS = [TableComponent, TableHeaderComponent, TableBodyComponent, TableRowComponent, TableColComponent];

@NgModule({
    imports: [COMPONENTS],
    exports: [COMPONENTS],
})
export class TableModule { }
