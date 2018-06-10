import { NgModule } from '@angular/core';
import { ChartModule } from 'primeng/chart';

import { ErrorService } from '../errors/services/error.service';
import { SharedModule } from './../shared/shared.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { StatisticsService } from './services/statistics.service';
import { ErrorsModule } from '../errors/errors.module';
import { MainPageComponent } from './components/main-page/main-page.component';
import { NavbarModule } from '../navbar/navbar.module';
import { MyWorkResolverService } from './resolvers/my-work-resolver.service';

@NgModule({
  imports: [
    SharedModule,
    ChartModule,
    DashboardRoutingModule,
    ErrorsModule,
    NavbarModule,   
  ],
  declarations: [
    DashboardComponent,
    MainPageComponent
  ],
  providers: [
    StatisticsService,
    ErrorService,
    MyWorkResolverService
  ]
})
export class DashboardModule { }
