import {Component} from '@angular/core';
import {TreeView} from "./app-tree/models";
import ITreeNode = TreeView.ITreeNode;
import {AppTreeService} from "./app-tree/app-tree.service";

const TREE_DATA: ITreeNode[] = [
  {
    name: 'Fruit',
    children: [{name: 'Apple', parent: 'Fruit'}, {name: 'Banana', parent: 'Fruit'}, {
      name: 'Fruit loops',
      parent: 'Fruit'
    }],
  },
  {
    name: 'Vegetables',
    children: [
      {
        name: 'Green',
        parent: 'Vegetables',
        children: [{name: 'Broccoli', parent: 'Green'}, {name: 'Brussels sprouts', parent: 'Green'}],
      },
      {
        name: 'Orange',
        parent: 'Vegetables',
        children: [{name: 'Pumpkins', parent: 'Orange'}, {name: 'Carrots', parent: 'Orange'}],
      },
    ],
  },
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'untitled';
  dataSource: ITreeNode[] = [];
  includeSubUnits: boolean = true;

  constructor(private treeService: AppTreeService) {
    this.treeService.getSelectedUnit().subscribe((unit: string | undefined) => {
      console.log('selected node:', unit);
    });

    setTimeout(() => {
        this.dataSource = TREE_DATA;
    }, 3000);
    setTimeout(() => {
        this.dataSource = [...TREE_DATA, ...TREE_DATA];
    }, 6000);
  }

  handleNavigation = (): void => {
    console.log("handleNavigation");
  }
}
