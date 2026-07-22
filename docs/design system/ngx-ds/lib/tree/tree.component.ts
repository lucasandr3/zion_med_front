import {ChangeDetectorRef, Component, EventEmitter, Injectable, Input, Output} from '@angular/core';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeFlattener, MatTreeModule, MatTreeNestedDataSource} from '@angular/material/tree';
import {CollectionViewer, SelectionChange} from '@angular/cdk/collections';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ButtonComponent } from '../button/button.component';
import { IconComponent } from '../icon/icon.component';
import { FormModule } from '../form/form.module';
import { TableColComponent, TableRowComponent } from '../table/table.component';
import { TableModule } from '../table/table.module';



interface itemNode {
	name: string;
	children?: itemNode[];
  }
@Component({
	selector: 'upx-tree',
	standalone: true,
	  imports: [CommonModule, MatTreeModule, MatIconModule, ButtonComponent, FormModule, IconComponent, TableRowComponent, TableModule],
	templateUrl: './tree.component.html',
	styleUrls: ['./tree.component.scss']
  })

export class TreeComponent {
  recursive: boolean = false;

  @Output() onNodeSelect = new EventEmitter<any>();
  @Output() onNodeEdit = new EventEmitter<any>();
  @Output() onNodeDelete = new EventEmitter<any>();
  @Input() treeData: itemNode[] = [];
  @Input() nameDescricao: string = 'id';
  @Input() enableButtonEdit: boolean = false;
  @Input() enableButtonAdd: boolean = false;
  @Input() enableButtonDelete: boolean = false;

//   treeControl = new NestedTreeControl<Tree>(node => node.children);
//   dataSource = new MatTreeNestedDataSource<Tree>();

 // dataSource: MatTreeNestedDataSource<Tree>;
 treeControl = new NestedTreeControl<itemNode>(node => node.children);
 dataSource = new MatTreeNestedDataSource<itemNode>();
  constructor(private changeDetectorRef: ChangeDetectorRef) {

    // this.treeControl = new NestedTreeControl<Tree>(this.getChildren);
    // this.dataSource = new MatTreeNestedDataSource();
	this.dataSource.data = this.treeData;
    //this.dataSource.data = TREE_DATA;
  }


  hasChild = (_: number, node: itemNode) => !!node.children && node.children.length > 0;

  getNodeValue(node: any) : string
  {
	return node[this.nameDescricao];
  }

  onAddNodeChild(node: any)
  {
	this.onNodeSelect.emit(node);
  }

  onNodeEdited(node: any)
  {

	this.onNodeEdit.emit(node);
  }

  onNodeDeleted(node: any)
  {
	this.onNodeDelete.emit(node);
  }
}
