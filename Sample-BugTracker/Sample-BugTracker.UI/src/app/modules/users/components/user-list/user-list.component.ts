import { Component, OnInit } from '@angular/core';

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
      if (res != undefined && res != null) {
        if (res.hasOwnProperty('userData')) {
          this.users.push(res.userData);
          this.projectService.attachUser(res.userData).toPromise().then(res => {
            if (res) {
              this.snackBar.open("Пользователь успешно добавлен к проекту", '', { duration: 2000 });
            }
          });
        }
      }
    })
  }

}
