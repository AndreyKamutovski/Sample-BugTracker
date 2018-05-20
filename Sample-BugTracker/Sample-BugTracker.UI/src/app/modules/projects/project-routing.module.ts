import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IsPortalOwnerService } from '../portal/resolvers/is-portal-owner.service';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { SelectedProjectPageComponent } from './components/selected-project-page/selected-project-page.component';
import { AuthGuard } from './guards/auth-guard-login.service';
import { ProjectListResolverService } from './resolvers/project-list-resolver.service';

// import { UserListComponent } from '../users/components/user-list/user-list.component';
const projectsRoutes: Routes = [
  {
    path: "",
    component: ProjectListComponent,
    resolve: {
      projectList: ProjectListResolverService,
      isPortalOwner: IsPortalOwnerService
    }
  },
  {
    path: ":id",
    component: SelectedProjectPageComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: "../dashboard/dashboard.module#DashboardModule",
      },
      {
        path: 'errors',
        loadChildren: "../errors/errors.module#ErrorsModule",
      },
      {
        path: 'users',
        loadChildren: "../users/users.module#UsersModule",
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(projectsRoutes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class ProjectRoutingModule { }
