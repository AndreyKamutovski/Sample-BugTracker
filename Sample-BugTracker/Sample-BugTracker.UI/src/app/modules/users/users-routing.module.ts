import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserListComponent } from './components/user-list/user-list.component';
import { UserListResolver } from '../shared/resolvers/user-list-resolver.service';

const usersRoutes: Routes = [
  {
    path: '',
    component: UserListComponent,
    resolve: { userList: UserListResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(usersRoutes)],
  exports: [RouterModule],
  declarations: []
})
export class UsersRoutingModule { }
