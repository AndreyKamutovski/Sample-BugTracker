import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ErrorListResolverService } from '../errors/resolvers/error-list-resolver.service';
import { IsPortalOwnerService } from '../portal/resolvers/is-portal-owner.service';
import { CurrentProjectResolver } from '../shared/resolvers/current-project-resolver.service';
import { ProjectWorkersResolver } from '../shared/resolvers/project-workers-resolver.service';
import { UserListResolver } from '../shared/resolvers/user-list-resolver.service';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { SelectedProjectPageComponent } from './components/selected-project-page/selected-project-page.component';
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
    resolve: {
      errorList: ErrorListResolverService,
      projectWorkers: ProjectWorkersResolver,
      userList: UserListResolver,
      currentProject: CurrentProjectResolver
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: "../dashboard/dashboard.module#DashboardModule",
      },
      {
        path: 'errors',
        // component: ErrorListComponent
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
