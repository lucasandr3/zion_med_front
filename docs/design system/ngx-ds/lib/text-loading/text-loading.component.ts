import { Component, Input, Output, EventEmitter, Injector, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

// Material
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

// Implemented
import { FormModule } from '../form/form.module';
import { LoadingComponent } from "../loading/loading.component";


@Component({
  selector: 'app-text-loading',
  standalone: true,
  imports: [CommonModule, MatTableModule, FormModule, LoadingComponent],
  templateUrl: './text-loading.component.html',
  styleUrls: ['./text-loading.component.scss']
})
export class TextLoadingComponent  {

    @Input() loadingData: boolean = true;
    @Input() listAllFetched: boolean = false;
    @Input() totalData: number = 0;
    @Input() listData: any[] = [];
    @Input() message: string = 'Carregando...';
    
    @Output() listAppend = new EventEmitter<boolean>();    
}
