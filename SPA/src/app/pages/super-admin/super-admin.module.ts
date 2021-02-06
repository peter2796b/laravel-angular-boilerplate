import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperAdminLayoutComponent } from './super-admin-layout/super-admin-layout.component';
import { HomeComponent } from './home/home.component';
import {SuperAdminRoutingModule} from "./super-admin-routing.module";



@NgModule({
  declarations: [SuperAdminLayoutComponent, HomeComponent],
  imports: [
    CommonModule,
    SuperAdminRoutingModule
  ]
})
export class SuperAdminModule { }
