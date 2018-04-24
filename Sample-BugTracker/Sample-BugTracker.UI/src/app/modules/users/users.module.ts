import { NgModule } from '@angular/core';

import { SharedModule } from './../shared/shared.module';
import { AddUserFormComponent } from './components/add-user-form/add-user-form.component';
import { ConfirmPasswordFormComponent } from './components/confirm-password-form/confirm-password-form.component';
import { ConfirmPasswordComponent } from './components/confirm-password/confirm-password.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserListResolverService } from './resolvers/user-list-resolver.service';
import { ProjectOwnerResolverService } from './resolvers/project-owner-resolver.service';
import { ConfirmDeletingUserComponent } from './components/confirm-deleting-user/confirm-deleting-user.component';
import { EditUserFormComponent } from './components/edit-user-form/edit-user-form.component';
import { ProjectWorkersResolverService } from './resolvers/project-workers-resolver.service';


@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    UserListComponent,
    AddUserFormComponent,
    LoginFormComponent,
    ConfirmPasswordComponent,
    ConfirmPasswordFormComponent,
    ConfirmDeletingUserComponent,
    EditUserFormComponent
  ],
  entryComponents: [
    ConfirmPasswordFormComponent,
    AddUserFormComponent,
    ConfirmDeletingUserComponent,
    EditUserFormComponent
],
providers: [
  UserListResolverService,
  ProjectOwnerResolverService,
  ProjectWorkersResolverService
]
})
export class UsersModule { }
