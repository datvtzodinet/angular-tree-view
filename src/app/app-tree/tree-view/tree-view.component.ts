import {AfterViewInit, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {FlatTreeControl} from '@angular/cdk/tree';
import {TreeView} from "../models";
import {MatTreeFlatDataSource, MatTreeFlattener} from "../flat-data-source";
import {BehaviorSubject} from "rxjs";
import {AppTreeService} from "../app-tree.service";
import ITreeNode = TreeView.ITreeNode;

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
  parent?: string;
}

@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.scss'],
})
export class TreeViewComponent implements OnChanges, AfterViewInit {
  @Input() expandAll: boolean = true;
  @Input() data: ITreeNode[] = [];
  @Input() includeSubUnits: boolean = false;
  @Input() title: string = 'Fruits & Vegetables';
  @Input() showNavigation: boolean = false;
  @Output() navigationCB: EventEmitter<void> = new EventEmitter();


  dataSource!: MatTreeFlatDataSource<ITreeNode, ExampleFlatNode>;
  private _transformer = (node: ITreeNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
      parent: node.parent
    } as ExampleFlatNode;
  };
  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
  );
  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  constructor(private treeService: AppTreeService) {
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    this.dataSource.data = this.data;
  }

  ngAfterViewInit(): void {
    if (this.expandAll) {
      this.treeControl.expandAll();
    }
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
  private selectedNode: BehaviorSubject<ITreeNode | undefined> = new BehaviorSubject<ITreeNode | undefined>(undefined);

  ngOnChanges(changes: SimpleChanges): void {
    const {data}: SimpleChanges = changes;
    if (data) {
      if (data.currentValue) {
        this.dataSource.data = this.data;
      } else {
        this.dataSource.data = [];
      }
    }
  }

  handleNodeClicked(node: ExampleFlatNode): void {
    console.log(node);
    if (this.isSelected(node)) {
      this.selectedNode.next(undefined);
      this.treeService.setSelectedUnit(undefined);
      return;
    }
    this.selectedNode.next(node);
    this.treeService.setSelectedUnit(node.name);
  }


  isGroupActive(node: ExampleFlatNode): boolean {
    return this.includeSubUnits && this.isSelected(node) && !this.isLeaf(node);
  }

  isSelected(node: ExampleFlatNode): boolean {
    return this.getSelectedNode()?.name === node.name;
  }


  isLeafActive(node: ExampleFlatNode): boolean {
    return this.isSelected(node);
  }

  isParentActive(node: ExampleFlatNode): boolean {
    if (!this.includeSubUnits) {
      if (this.isSelected(node)) {
        return true;
      }
    }
    return false;
  }

  isRootNode(node: ExampleFlatNode): boolean {
    return node.level === 0;
  }

  private isLeaf(node: ExampleFlatNode): boolean {
    return node.level !== 0 && !this.treeControl.isExpandable(node);
  }

  handleNavigation(): void {
    if (this.navigationCB) {
      this.navigationCB.emit();
    }
  }

  private getSelectedNode(): ITreeNode | undefined {
    return this.selectedNode.value;
  }
}

