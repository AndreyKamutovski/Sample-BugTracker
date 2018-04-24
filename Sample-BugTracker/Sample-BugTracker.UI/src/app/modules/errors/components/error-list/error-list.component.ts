import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent, MatDialog, MatSelectChange, MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

import { AuthService } from '../../../../shared/services/auth.service';
import { User } from '../../../users/models/user.model';
import { ErrorService } from '../../error.service';
import { ErrorBT } from '../../models/error.model';
import { UpdateErrorDeadlineBT } from '../../models/update-error-deadline.model';
import { UpdateErrorResponsibleBT } from '../../models/update-error-responsible.model';
import { AddErrorFormComponent } from '../add-error-form/add-error-form.component';
import { SelectedErrorDialogComponent } from '../selected-error-dialog/selected-error-dialog.component';
import { Project } from '../../../projects/models/project.model';

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
    private snackBar: MatSnackBar

  ) { }


  ngOnInit() {
    this.errors = this._route.snapshot.data.errorList;
    this.projectWorkers = this._route.snapshot.data.projectWorkers;
    this.projectUsers = this._route.snapshot.data.userList;
    this.project = this._route.snapshot.data.currentProject;
    this.cols = [
      { field: 'Title', header: 'Ошибка' },
      { field: 'EmailErrorAuthor', header: 'Автор' },
      { field: 'DateCreation', header: 'Создано' },
      { field: 'EmailErrorResponsible', header: 'Ответственный' },
      { field: 'Deadline', header: 'Срок' },
      { field: 'Status', header: 'Статус' },
      { field: 'Priority', header: 'Приоритет' },
      { field: 'Classification', header: 'Классификация' },
    ];
  }

  changeDeadline(errorId: number, event: MatDatepickerInputEvent<Date>) {
    let errorDeadline = new UpdateErrorDeadlineBT(errorId, event.value);
    this.errorService.updateErrorDeadline(errorDeadline).toPromise().then((error: UpdateErrorDeadlineBT) => {
      this.errors.find(e => e.Id == error.ErrorId).Deadline = error.Deadline;
      this.snackBar.open("Срок выполнения ошибки успешно обновлён", '', { duration: 2000 });
    });
  }

  changeErrorStatus(errorId: number, event: MatDatepickerInputEvent<Date>) {
    this.errorService.updateErrorStatus({ 'ErrorId': errorId, 'spc': event.value }).toPromise().then((error: any) => {
      this.errors.find(e => e.Id == error.ErrorId).Status = error.spc;
      this.snackBar.open("Статус ошибки успешно обновлён", '', { duration: 2000 });
    });
  }

  changeErrorPriority(errorId: number, event: MatDatepickerInputEvent<Date>) {
    this.errorService.updateErrorPriority({ 'ErrorId': errorId, 'spc': event.value }).toPromise().then((error: any) => {
      this.errors.find(e => e.Id == error.ErrorId).Priority = error.spc;
      this.snackBar.open("Приоритет ошибки успешно обновлён", '', { duration: 2000 });
    });
  }

  changeErrorClassification(errorId: number, event: MatDatepickerInputEvent<Date>) {
    this.errorService.updateErrorClassification({ 'ErrorId': errorId, 'spc': event.value }).toPromise().then((error: any) => {
      this.errors.find(e => e.Id == error.ErrorId).Classification = error.spc;
      this.snackBar.open("Классификация ошибки успешно обновлена", '', { duration: 2000 });
    });
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
      let idx = errs.findIndex(p => p.Id == err.Id);
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

  selectionChangeErrorResponsible(errorId: number, event: MatSelectChange) {
    let updatedErrorResponsible = new UpdateErrorResponsibleBT(errorId, event.value);
    this.errorService.updateErrorResponsible(updatedErrorResponsible).toPromise().then((error: UpdateErrorResponsibleBT) => {
      this.errors.find(e => e.Id == error.ErrorId).EmailErrorResponsible = error.EmailErrorResponsible;
      this.snackBar.open("Ответственный за ошибку успешно обновлён", '', { duration: 2000 });
    });
  }

  private afterClosedAddErrorDialog(res: any) {
    if (res != undefined && res != null) {
      if (res.hasOwnProperty('errorData')) {
        this.errorService.addError(res.errorData).toPromise().then(newError => {
          let errs = [...this.errors];
          errs.push(newError);
          this.errors = errs;
          this.snackBar.open("Ошибка успешно добавлена", '', { duration: 2000 });
        });
      }
    }
  }
}
