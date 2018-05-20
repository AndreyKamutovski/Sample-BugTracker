import { Component, OnInit, ViewChild } from '@angular/core';
import {
  MatDatepickerInputEvent,
  MatDialog,
  MatPaginator,
  MatSelectChange,
  MatSnackBar,
  MatSort,
  MatTable,
  MatTableDataSource,
} from '@angular/material';
import { ActivatedRoute } from '@angular/router';

import { AuthService } from '../../../../shared/services/auth.service';
import { InternationalizationService } from '../../../../shared/services/internationalization.service';
import { User } from '../../../users/models/user.model';
import { ErrorService } from '../../error.service';
import { ErrorBT } from '../../models/error.model';
import { UpdateErrorResponsibleBT } from '../../models/update-error-responsible.model';
import { AddErrorFormComponent } from '../add-error-form/add-error-form.component';
import { UpdateErrorDeadlineBT } from '../../models/update-error-deadline.model';

@Component({
  selector: 'app-error-list',
  templateUrl: './error-list.component.html',
  styleUrls: ['./error-list.component.css']
})
export class ErrorListComponent implements OnInit {

  @ViewChild('errorTable') private errorTable: MatTable<Error>;
  @ViewChild('errorPaginator') private errorPaginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;

  private displayedColumns = [
    'Title',
    'EmailErrorAuthor',
    'DateCreation',
    'EmailErrorResponsible',
    'Deadline',
    'Status',
    'Priority',
    'Classification'
  ];
  private dataSource: MatTableDataSource<ErrorBT> = new MatTableDataSource<ErrorBT>();
  private projectWorkers: User[];

  private errors: ErrorBT[];
  private cols: any[];

  constructor(
    private internationalizationService: InternationalizationService,
    private _route: ActivatedRoute,
    private authService: AuthService,
    private errorService: ErrorService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar

  ) { }

  ngOnInit() {
    this.dataSource.data = this._route.snapshot.data.errorList;
    this.errors = this._route.snapshot.data.errorList;
    this.projectWorkers = this._route.snapshot.data.projectWorkers;

    this.cols = [
      { field: 'Title', header: 'Ошибка' },
      { field: 'year', header: 'Автор' },
      { field: 'brand', header: 'Создано' },
      { field: 'color', header: 'Ответственный' },
      { field: 'color', header: 'Срок' },
      { field: 'color', header: 'Статус' },
      { field: 'color', header: 'Приоритет' },
      { field: 'color', header: 'Классификация' },
  ];
  }

  changeDeadline(errorId: number, event: MatDatepickerInputEvent<Date>) {
    let errorDeadline = new UpdateErrorDeadlineBT(errorId, event.value);
    this.errorService.updateErrorDeadline(errorDeadline).toPromise().then((error: UpdateErrorDeadlineBT) => {
      this.dataSource.data.find(e => e.Id == error.ErrorId).Deadline = error.Deadline;
      this.errorTable.renderRows();
      this.snackBar.open("Срок выполнения ошибки успешно обновлён", '', { duration: 2000 });
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }


  changeErrorStatus(errorId: number, event: MatDatepickerInputEvent<Date>) {
    this.errorService.updateErrorStatus({ 'ErrorId': errorId, 'spc': event.value }).toPromise().then((error: any) => {
      this.dataSource.data.find(e => e.Id == error.ErrorId).Status = error.spc;
      this.errorTable.renderRows();
      this.snackBar.open("Статус ошибки успешно обновлён", '', { duration: 2000 });
    });
  }

  changeErrorPriority(errorId: number, event: MatDatepickerInputEvent<Date>) {
    this.errorService.updateErrorPriority({ 'ErrorId': errorId, 'spc': event.value }).toPromise().then((error: any) => {
      this.dataSource.data.find(e => e.Id == error.ErrorId).Status = error.spc;
      this.errorTable.renderRows();
      this.snackBar.open("Приоритет ошибки успешно обновлён", '', { duration: 2000 });
    });
  }

  changeErrorClassification(errorId: number, event: MatDatepickerInputEvent<Date>) {
    this.errorService.updateErrorClassification({ 'ErrorId': errorId, 'spc': event.value }).toPromise().then((error: any) => {
      this.dataSource.data.find(e => e.Id == error.ErrorId).Status = error.spc;
      this.errorTable.renderRows();
      this.snackBar.open("Классификация ошибки успешно обновлена", '', { duration: 2000 });
    });
  }

  ngAfterViewInit() {
    if (this.dataSource.data.length > 0) {
      this.dataSource.paginator = this.errorPaginator;
      this.errorPaginator._intl = this.internationalizationService.RussianLabelMatTablePaginator;
      this.dataSource.sort = this.sort;
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
      this.dataSource.data.find(e => e.Id == error.ErrorId).EmailErrorResponsible = error.EmailErrorResponsible;
      this.errorTable.renderRows();
      this.snackBar.open("Ответственный за ошибку успешно обновлён", '', { duration: 2000 });
    });
  }

  private afterClosedAddErrorDialog(res: any) {
    if (res != undefined && res != null) {
      if (res.hasOwnProperty('errorData')) {
        this.errorService.addError(res.errorData).toPromise().then(newError => {
          this.dataSource.data.push(newError);
          this.errorTable.renderRows();
          this.dataSource.paginator = this.errorPaginator;
          this.snackBar.open("Ошибка успешно добавлена", '', { duration: 2000 });
        });
      }
    }
  }
}
