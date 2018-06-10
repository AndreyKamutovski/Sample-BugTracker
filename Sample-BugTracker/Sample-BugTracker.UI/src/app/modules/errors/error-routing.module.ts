import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ErrorListComponent } from './components/error-list/error-list.component';
import { SelectedErrorDialogComponent } from './components/selected-error-dialog/selected-error-dialog.component';


const errorsRoutes: Routes = [
  {
    path: '',
    component: ErrorListComponent,
    resolve: {
      // errorList: ErrorListResolverService,
      // projectWorkers: ProjectWorkersResolver,
      // userList: UserListResolver,
      // currentProject: CurrentProjectResolver
    }
  },
  {
    path: ":id",
    component: SelectedErrorDialogComponent,
    // children: [
    //   { path: 'attachments', component: ErrorAttachmentsComponent }
    // ]
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
