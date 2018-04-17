import { NgModule } from '@angular/core';

import { SharedModule } from './../shared/shared.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';


@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    DashboardComponent
  ]
})
export class DashboardModule { }
