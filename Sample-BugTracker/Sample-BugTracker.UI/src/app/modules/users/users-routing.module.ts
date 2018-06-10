import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserListResolver } from '../shared/resolvers/user-list-resolver.service';
import { ConfirmPasswordComponent } from './components/confirm-password/confirm-password.component';
import { UserListComponent } from './components/user-list/user-list.component';

const usersRoutes: Routes = [
  {
    path: '',
    component: UserListComponent,
    resolve: { userList: UserListResolver },
    // canDeactivate:[DisactiveUserListService]
  },
  { path: ":awaitId", component: ConfirmPasswordComponent },
  
];

@NgModule({
  imports: [RouterModule.forChild(usersRoutes)],
  exports: [RouterModule],
  declarations: []
})
export class UsersRoutingModule { }
