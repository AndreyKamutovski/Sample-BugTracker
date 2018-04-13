import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { AddUserFormComponent } from './add-user-form/add-user-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { ConfirmPasswordComponent } from './confirm-password/confirm-password.component';
import { ConfirmPasswordFormComponent } from './confirm-password-form/confirm-password-form.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [UserListComponent, AddUserFormComponent, LoginFormComponent, ConfirmPasswordComponent, ConfirmPasswordFormComponent]
})
export class UsersModule { }
