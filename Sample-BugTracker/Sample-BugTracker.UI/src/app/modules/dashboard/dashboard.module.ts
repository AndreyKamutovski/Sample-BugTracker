import { NgModule } from '@angular/core';

import { SharedModule } from './../shared/shared.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {ChartModule} from 'primeng/chart';

@NgModule({
  imports: [
    SharedModule,
    ChartModule
  ],
  declarations: [
    DashboardComponent
  ]
})
export class DashboardModule { }
