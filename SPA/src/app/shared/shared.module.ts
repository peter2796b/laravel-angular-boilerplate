import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import {MaterialModule} from "../material/material.module";
import { SidebarComponent } from './components/sidebar/sidebar.component';
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [ToolbarComponent, SidebarComponent],
  exports: [
    ToolbarComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ]
})
export class SharedModule { }
