import {Component} from '@angular/core';
import {TreeView} from "./app-tree/models";
import ITreeNode = TreeView.ITreeNode;
import {AppTreeService} from "./app-tree/app-tree.service";

const TREE_DATA: ITreeNode[] = [
  {
    name: 'Fruit',
    children: [{name: 'Apple'}, {name: 'Banana'}, {name: 'Fruit loops'}],
  },
  {
    name: 'Vegetables',
    children: [
      {
        name: 'Green',
        children: [{name: 'Broccoli'}, {name: 'Brussels sprouts'}],
      },
      {
        name: 'Orange',
        children: [{name: 'Pumpkins'}, {name: 'Carrots'}],
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
  dataSource: ITreeNode[] = TREE_DATA;
  includeSubUnits: boolean = true;

  constructor(private treeService: AppTreeService) {
    this.treeService.getSelectedUnit().subscribe((unit: string | undefined) => {
      console.log('selected node:', unit);
    });
  }

  handleNavigation = (): void => {
    console.log("handleNavigation");
  }
}
