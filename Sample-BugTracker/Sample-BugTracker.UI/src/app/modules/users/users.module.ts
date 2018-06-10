import { NgModule } from '@angular/core';

import { SharedModule } from './../shared/shared.module';
import { AddUserFormComponent } from './components/add-user-form/add-user-form.component';
import { ConfirmDeletingUserComponent } from './components/confirm-deleting-user/confirm-deleting-user.component';
import { ConfirmPasswordFormComponent } from './components/confirm-password-form/confirm-password-form.component';
import { ConfirmPasswordComponent } from './components/confirm-password/confirm-password.component';
import { EditUserFormComponent } from './components/edit-user-form/edit-user-form.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UsersRoutingModule } from './users-routing.module';
import { DisactiveUserListService } from './guards/disactive-user-list.service';


@NgModule({
  imports: [
    SharedModule,
    UsersRoutingModule
  ],
  declarations: [
    UserListComponent,
    AddUserFormComponent,
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
  // DisactiveUserListService
]
})
export class UsersModule { }
