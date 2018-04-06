import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';

import { User } from '../../shared/models/user.model';
import { AddUserFormComponent } from '../add-user-form/add-user-form.component';
import { ProjectService } from '../services/project.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styles: []
})
export class UserListComponent implements OnInit {
  private users: User[];

  constructor(
    private userService: UsersService,
    private projectService: ProjectService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.userService.getProjectUsers(sessionStorage.getItem('projectID')).subscribe(res => this.users = res);
  }

  public openAddUserDialog(): void {
    let dialogRef = this.dialog.open(AddUserFormComponent, {
      width: '50%',
      data: {}
    });
    dialogRef.afterClosed().subscribe(res => {
      if(res != undefined) {
           this.projectService.attachUser(res.userData).toPromise().then(res => {
        if (res) {
          this.snackBar.open("Пользователь успешно добавлен к проекту", '', { duration: 2000 });
        }
      });
      }
    })
  }
}
