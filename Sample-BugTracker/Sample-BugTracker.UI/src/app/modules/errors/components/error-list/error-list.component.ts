import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

import { AuthService } from '../../../../shared/services/auth.service';
import { MessageService } from '../../../../shared/services/message.service';
import { PermissionService } from '../../../../shared/services/permission.service';
import { ErrorBT } from '../../models/error.model';
import { ErrorListSharedService } from '../../services/error-list-shared.service';
import { ErrorService } from '../../services/error.service';
import { AddErrorFormComponent } from '../add-error-form/add-error-form.component';
import { SelectedErrorDialogComponent } from '../selected-error-dialog/selected-error-dialog.component';

@Component({
  selector: 'app-error-list',
  templateUrl: './error-list.component.html',
  styleUrls: ['./error-list.component.css']
})
export class ErrorListComponent implements OnInit {

  private cols: any[] = [
    { field: 'Title', header: 'Ошибка' },
    { field: 'EmailAuthor', header: 'Автор' },
    { field: 'DateCreation', header: 'Создано' },
    { field: 'EmailAssignee', header: 'Ответственный' },
    { field: 'Deadline', header: 'Срок' },
    { field: 'Status', header: 'Статус' },
    { field: 'Priority', header: 'Приоритет' },
    { field: 'Classification', header: 'Классификация' },
  ];

  constructor(
    private _route: ActivatedRoute,
    private authService: AuthService,
    private errorService: ErrorService,
    private dialog: MatDialog,
    private permissionService: PermissionService,
    private errorListSharedService: ErrorListSharedService,
    private messageService: MessageService

  ) { }


  ngOnInit() {
    this.errorListSharedService.Errors = this._route.snapshot.data.errorList;
    this.errorListSharedService.ProjectWorkers = this._route.snapshot.data.projectWorkers;
    this.errorListSharedService.ProjectUsers = this._route.snapshot.data.userList;
    this.errorListSharedService.Project = this._route.snapshot.data.currentProject;
  }

  // editing error dialog
  openEditErrorDialog(error: ErrorBT): void {
    event.preventDefault();
    let dialogRef = this.dialog.open(SelectedErrorDialogComponent, {
      width: '95%',
      maxWidth: '95%',
      height: '95%',
      maxHeight: '95%',
      disableClose: true,
      data: { 'error': error}
    });
    dialogRef.afterClosed().subscribe(this.afterClosedEditErrorDialog.bind(this));
  }


  afterClosedEditErrorDialog(err: ErrorBT): void {
    if (err != null) {
      let errs = [...this.errorListSharedService.Errors];
      let idx = errs.findIndex(p => p.ErrorId == err.ErrorId);
      errs[idx] = err;
      this.errorListSharedService.Errors = errs;
    }
  }


  // addition error dialog
  openAddErrorDialog(): void {
    let dialogRef = this.dialog.open(AddErrorFormComponent, {
      width: '50%'
    });
    dialogRef.afterClosed().subscribe(this.afterClosedAddErrorDialog.bind(this));
  };

  private afterClosedAddErrorDialog(res: any) {
    if (res != undefined && res != null) {
      if (res.hasOwnProperty('errorData')) {
        this.errorService.addError(res.ProjectId, res.errorData).toPromise().then(newError => {
          this.errorListSharedService.Errors = [...this.errorListSharedService.Errors, newError];
          this.messageService.showSnackBarMsg("Ошибка успешно добавлена");
        });
      }
    }
  }
}
