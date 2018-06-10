import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CurrentProjectResolver } from '../shared/resolvers/current-project-resolver.service';
import { ProjectOwnerResolver } from '../shared/resolvers/project-owner-resolver.service';
import { ProjectPermissionResolverService } from '../projects/resolvers/project-permission-resolver.service';
import { MainPageComponent } from './components/main-page/main-page.component';
import { MyWorkResolverService } from './resolvers/my-work-resolver.service';

const dashboardRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    resolve: {
      currentProject: CurrentProjectResolver,
      projectOwner: ProjectOwnerResolver,
      projectPerm: ProjectPermissionResolverService
    },
  },
  {
    path: 'mainPage',
    component: MainPageComponent,
    resolve: {
      OverviewMyWork: MyWorkResolverService,
    },
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(dashboardRoutes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class DashboardRoutingModule { }
