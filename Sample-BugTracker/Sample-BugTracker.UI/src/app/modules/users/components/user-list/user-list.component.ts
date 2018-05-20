import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

import { AuthService } from '../../../shared/services/auth.service';
import { REST_URI } from '../../../shared/services/httpClient.service';
import { UnattachUser } from '../../models/unattach-user.model';
import { User } from '../../models/user.model';
import { UsersService } from '../../../shared/services/users.service';
import { AddUserFormComponent } from '../add-user-form/add-user-form.component';
import { ConfirmDeletingUserComponent } from '../confirm-deleting-user/confirm-deleting-user.component';
import { EditUserFormComponent } from '../edit-user-form/edit-user-form.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styles: [':host mat-list { width: 93%; }']
})
export class UserListComponent implements OnInit {
   users: User[];

  constructor(
    public userService: UsersService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public _route: ActivatedRoute,
    public authService: AuthService,
    @Inject(REST_URI) public uri: string,

  ) { }

  ngOnInit() {
    this.users = this._route.snapshot.data.userList;
  }

  private openDeleteUserDialog(delUser: User): void {
    let delDialogRef = this.dialog.open(ConfirmDeletingUserComponent, {
      width: '30%',
      data: { 'userEmail': delUser.Email }
    });
    delDialogRef.afterClosed().toPromise().then(res => {
      if (res) {
        this.users.splice(this.users.indexOf(delUser), 1);
        this.userService.unattachUser(new UnattachUser(delUser.Email, +sessionStorage.getItem('projectID'))).toPromise().then(res => {
          this.snackBar.open("Пользователь успешно удалён из проекта", '', { duration: 2000 });
        });
      }
    })
  }

  openEditUserDialog(editUser: User): void {
    let delDialogRef = this.dialog.open(EditUserFormComponent, {
      width: '50%',
      data: { 'editUser': editUser }
    });
    delDialogRef.afterClosed().toPromise().then(res => {
      if (res) {
        this.users.find(u => u.Email === res.editUser.Email).RoleName = res.editUser.RoleName;
        this.userService.updateAttachedUser(res.editUser).toPromise().then(res => {
          this.snackBar.open("Пользователь успешно обновлён", '', { duration: 2000 });
        });
      }
    })
  }

  openAddUserDialog(): void {
    let dialogRef = this.dialog.open(AddUserFormComponent, {
      width: '50%',
      data: {}
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res != undefined && res != null) {
        if (res.hasOwnProperty('userData')) {
          this.userService.attachUser(res.userData).toPromise().then(user => {
            if (user) {
              this.users.push(user);
              this.snackBar.open("Пользователь успешно добавлен к проекту", '', { duration: 2000 });
            }
          });
        }
      }
    })
  }

}
