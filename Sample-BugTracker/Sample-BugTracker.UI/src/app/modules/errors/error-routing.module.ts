import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ErrorListComponent } from './components/error-list/error-list.component';
import { ErrorListResolverService } from './resolvers/error-list-resolver.service';
import { ProjectWorkersResolver } from '../shared/resolvers/project-workers-resolver.service';
import { UserListResolver } from '../shared/resolvers/user-list-resolver.service';
import { CurrentProjectResolver } from '../shared/resolvers/current-project-resolver.service';
import { ErrorAttachmentsComponent } from './components/error-attachments/error-attachments.component';
import { SelectedErrorDialogComponent } from './components/selected-error-dialog/selected-error-dialog.component';


const errorsRoutes: Routes = [
  {
    path: '',
    component: ErrorListComponent,
    resolve: {
      errorList: ErrorListResolverService,
      projectWorkers: ProjectWorkersResolver,
      userList: UserListResolver,
      currentProject: CurrentProjectResolver
    }
  },
  {
    path: ":id",
    component: SelectedErrorDialogComponent,
    children: [
      { path: 'attachments', component: ErrorAttachmentsComponent }
    ]
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(errorsRoutes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class ErrorRoutingModule { }
