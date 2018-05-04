import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

import { AuthService } from '../../../../shared/services/auth.service';
import { PermissionService } from '../../../../shared/services/permission.service';
import { Project } from '../../../projects/models/project.model';
import { User } from '../../../users/models/user.model';
import { ErrorService } from '../../error.service';
import { ErrorBT } from '../../models/error.model';
import { AddErrorFormComponent } from '../add-error-form/add-error-form.component';
import { SelectedErrorDialogComponent } from '../selected-error-dialog/selected-error-dialog.component';
import { PermissionList }   from '../../../../shared/enums/permission-list.enum';

@Component({
  selector: 'app-error-list',
  templateUrl: './error-list.component.html',
  styleUrls: ['./error-list.component.css']
})
export class ErrorListComponent implements OnInit {

  private projectWorkers: User[];
  private projectUsers: User[];
  private errors: ErrorBT[];
  private project: Project;
  private cols: any[];

  constructor(
    private _route: ActivatedRoute,
    private authService: AuthService,
    private errorService: ErrorService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private permissionService: PermissionService
  ) { }


  ngOnInit() {
    this.errors = this._route.snapshot.data.errorList;
    this.projectWorkers = this._route.snapshot.data.projectWorkers;
    this.projectUsers = this._route.snapshot.data.userList;
    this.project = this._route.snapshot.data.currentProject;
    this.cols = [
      { field: 'Title', header: 'Ошибка' },
      { field: 'EmailAuthor', header: 'Автор' },
      { field: 'DateCreation', header: 'Создано' },
      { field: 'EmailAssignee', header: 'Ответственный' },
      { field: 'Deadline', header: 'Срок' },
      { field: 'Status', header: 'Статус' },
      { field: 'Priority', header: 'Приоритет' },
      { field: 'Classification', header: 'Классификация' },
    ];
  }

  updateError(error: ErrorBT, msg: string) {
    this.errorService.updateError(error.ErrorId, error).toPromise().then((error: ErrorBT) => {
      this.snackBar.open(`${msg}: успешно обновлено`, '', { duration: 2000 });
    });
  }
  
  showUpdatedMsg(msg: string) {
  this.errors[0].Status
    this.snackBar.open(`${msg}: успешно обновлено`, '', { duration: 2000 });
  }

  openErrorDialog(error: ErrorBT): void {
    event.preventDefault();
    let dialogRef = this.dialog.open(SelectedErrorDialogComponent, {
      width: '95%',
      maxWidth: '95%',
      height: '95%',
      maxHeight: '95%',
      disableClose: true,
      data: { 'error': error, 'project': this.project, 'projectWorkers': this.projectWorkers }
    });

    dialogRef.afterClosed().subscribe(this.afterClosedErrorDialog.bind(this));
  }


  afterClosedErrorDialog(err: ErrorBT): void {
    if (err != null) {
      let errs = [...this.errors];
      let idx = errs.findIndex(p => p.ErrorId == err.ErrorId);
      errs[idx] = err;
      this.errors = errs;
    }
  }

  openAddErrorDialog(): void {
    let dialogRef = this.dialog.open(AddErrorFormComponent, {
      width: '50%',
      data: {}
    });

    dialogRef.afterClosed().subscribe(this.afterClosedAddErrorDialog.bind(this));
  };

  private afterClosedAddErrorDialog(res: any) {
    if (res != undefined && res != null) {
      if (res.hasOwnProperty('errorData')) {
        this.errorService.addError(res.ProjectId, res.errorData).toPromise().then(newError => {
          let errs = [...this.errors];
          errs.push(newError);
          this.errors = errs;
          this.snackBar.open("Ошибка успешно добавлена", '', { duration: 2000 });
        });
      }
    }
  }
}
