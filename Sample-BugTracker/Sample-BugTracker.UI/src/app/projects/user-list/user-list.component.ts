import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { User } from '../../shared/models/user.model';
import { AddUserFormComponent } from '../add-user-form/add-user-form.component';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styles: [] 
})
export class UserListComponent implements OnInit {
  private users: User[];

  constructor(private userService: UsersService, private dialog: MatDialog) { }

  ngOnInit() {
    this.userService.getProjectUsers(sessionStorage.getItem('projectID')).subscribe(res => this.users = res);
  }

  public openAddUserDialog(): void {
    let dialogRef = this.dialog.open(AddUserFormComponent, {
      width: '50%',
      data: {}
    });
    dialogRef.afterClosed().subscribe(this.afterClosedDialog);
  }

  private afterClosedDialog(res: any): void {
    if (res != null) {
      if (res.projectData != null) {
        // this.messageService.reportSnackBarMessage("Проект успешно создан");
      }
    }
  }
}
