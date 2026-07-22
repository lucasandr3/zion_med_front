import { Component, Input, Output, EventEmitter, Injector, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

// Material
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

// Implemented
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { FormModule } from '../form/form.module';
import { LabelComponent } from '../label/label.component';


@Component({
  selector: 'app-table-mat',
  standalone: true,
  imports: [CommonModule, MatTableModule, FormModule, LabelComponent, CheckboxComponent],
  templateUrl: './table-mat.component.html',
  styleUrls: ['./table-mat.component.scss']
})
export class TableMatComponent implements OnChanges {

  @Input() enableSearch = false;
  @Input() displayedColumns: string[] = ['col1', 'col2'];
  @Input() dataSourceItens: any[] = [{ col1: 1, col2: 2 }];
  @Input() columnDefinitions = [{ key: 'col1', header: 'column1', type: 'text' }, { key: 'col2', header: 'column2', type: 'text' }];
  @Input() isLast = false;
  
  @Output() onChangeCheckbox = new EventEmitter<any>();
  @Output() onScroll = new EventEmitter<any>();

  screenHeight: number = window.innerHeight;
  dataSource = new MatTableDataSource<any>([]);
  changeCheckbox(change: any) {
    this.onChangeCheckbox.emit(change);
  }

  ngOnChanges(changes: SimpleChanges): void {
	if (changes['dataSourceItens']) {
		this.dataSource = new MatTableDataSource(this.dataSourceItens);
	  }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
