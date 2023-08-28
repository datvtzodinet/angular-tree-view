import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {ArrayDataSource} from '@angular/cdk/collections';
import {NestedTreeControl} from '@angular/cdk/tree';
import {TreeView} from "../models";
import {BehaviorSubject, Observable} from "rxjs";
import ITreeNode = TreeView.ITreeNode;
import {AppTreeService} from "../app-tree.service";

@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.scss'],
})
export class TreeViewComponent implements OnChanges {
  @Input() expandAll: boolean = true;
  @Input() data: ITreeNode[] = [];
  @Input() includeSubUnits: boolean = false;
  treeControl = new NestedTreeControl<ITreeNode>(node => node.children);
  dataSource!: ArrayDataSource<ITreeNode>;

  private _data: BehaviorSubject<ITreeNode[]> = new BehaviorSubject<TreeView.ITreeNode[]>([]);
  private selectedNode: BehaviorSubject<ITreeNode | undefined> = new BehaviorSubject<ITreeNode | undefined>(undefined);

  constructor(private treeService: AppTreeService) {
    this.dataSource = new ArrayDataSource<TreeView.ITreeNode>(this._data);
    this._data.next(this.data);
    this.treeControl.dataNodes = this.getData();
    if (this.expandAll) {
      this.treeControl.expandAll();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const {data}: SimpleChanges = changes;
    if (data) {
      if (data.currentValue) {
        this.setDataSource(changes['data'].currentValue);
      } else {
        this.setDataSource([]);
      }
    }
  }

  setDataSource(data: ITreeNode[]) {
    this._data.next(data);
    this.treeControl.dataNodes = this.getData();
    if (this.expandAll) {
      this.treeControl.expandAll();
    }
  }

  handleNodeClicked(node: ITreeNode): void {
    if (this.isSelected(node)) {
      this.selectedNode.next(undefined);
      this.treeService.setSelectedUnit(undefined);
      return;
    }
    this.selectedNode.next(node);
    this.treeService.setSelectedUnit(node.name);
  }

  isGroupActive(node: ITreeNode): boolean {
    return this.includeSubUnits && this.isSelected(node) && !this.isLeaf(node);
  }

  isSelected(node: ITreeNode): boolean {
    return this.getSelectedNode()?.name === node.name;
  }

  isLeafActive(node: ITreeNode): boolean {
    return this.isSelected(node);
  }

  isParentActive(node: ITreeNode): boolean {
    if(!this.includeSubUnits){
      if(this.isSelected(node)){
        return true;
      }
    }
    return false;
  }

  hasChild = (_: number, node: ITreeNode) => !!node.children && node.children.length > 0;

  private getData(): ITreeNode[] {
    return this._data.value;
  }

  private getSelectedNode(): ITreeNode | undefined {
    return this.selectedNode.value;
  }

  private isLeaf(node: ITreeNode): boolean {
    return !node.children || node.children.length === 0;
  }
}

