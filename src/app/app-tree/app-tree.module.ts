import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TreeViewComponent} from './tree-view/tree-view.component';
import {CdkTreeModule} from "@angular/cdk/tree";

@NgModule({
  declarations: [
    TreeViewComponent
  ],
  exports: [
    TreeViewComponent
  ],
  imports: [
    CommonModule,
    CdkTreeModule
  ]
})
export class AppTreeModule {
}
