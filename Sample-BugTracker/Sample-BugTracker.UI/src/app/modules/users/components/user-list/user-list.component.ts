import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';

import { ProjectService } from '../../../projects/project.service';
import { User } from '../../models/user.model';
import { AddUserFormComponent } from '../add-user-form/add-user-form.component';
import { ActivatedRoute } from '@angular/router';
import { REST_URI } from '../../../../shared/services/httpClient.service';
import { AuthService } from '../../../../shared/services/auth.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styles: []
})
export class UserListComponent implements OnInit {
  private users: User[];

  constructor(
    private projectService: ProjectService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private _route: ActivatedRoute,
    private authService: AuthService,
    
    @Inject(REST_URI) private uri: string,
   
  ) { }

  ngOnInit() {
    this.users = this._route.snapshot.data.userList;
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
