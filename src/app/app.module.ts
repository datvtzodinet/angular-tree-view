import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {AppTreeModule} from "./app-tree/app-tree.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppTreeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
