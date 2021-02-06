import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminRoutingModule} from "./admin-routing.module";
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { HomeComponent } from './home/home.component';
import {MaterialModule} from "../../material/material.module";
import {SharedModule} from "../../shared/shared.module";
import { UsersComponent } from './users/users.component';



@NgModule({
  declarations: [AdminLayoutComponent, HomeComponent, UsersComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    MaterialModule
  ]
})
export class AdminModule { }
