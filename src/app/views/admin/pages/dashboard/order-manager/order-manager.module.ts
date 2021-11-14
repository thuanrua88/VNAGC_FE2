import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderManagerComponent } from './order-manager.component';
import { RouterModule, Routes } from '@angular/router';
import { LoadModule } from 'src/app/core/component/load/load.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

const routers:Routes = [
  { path: '', component: OrderManagerComponent}
]

@NgModule({
  declarations: [OrderManagerComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routers),
    LoadModule,
    MatMenuModule,
    MatButtonModule
  ]
})
export class OrderManagerModule { }
