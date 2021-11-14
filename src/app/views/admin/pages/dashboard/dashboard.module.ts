import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { NavigationComponent } from '../../component/navigation/navigation.component';
import { FooterComponent } from '../../component/footer/footer.component';
import { HeaderComponent } from '../../component/header/header.component';
import { MatMenuModule } from '@angular/material/menu';
import { BaseDashboardComponent } from './base/base.component';
import { ChartsModule } from "@rinminase/ng-charts";
import { LoadModule } from 'src/app/core/component/load/load.module';
import { MatSelectModule } from '@angular/material/select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatDatepickerModule } from '@angular/material/datepicker';

@NgModule({
  declarations: [
    DashboardComponent,
    NavigationComponent,
    FooterComponent,
    HeaderComponent,
    BaseDashboardComponent
  ],
  imports: [
    CommonModule,
    MatMenuModule,
    DashboardRoutingModule,
    ChartsModule,
    LoadModule,
    NgbModule,
    MatSelectModule,
    MatDatepickerModule
  ]
})
export class DashboardModule { }
