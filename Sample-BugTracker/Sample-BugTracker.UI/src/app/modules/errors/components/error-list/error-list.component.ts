import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSnackBar, MatSort, MatTable, MatTableDataSource } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

import { AuthService } from '../../../../shared/services/auth.service';
import { InternationalizationService } from '../../../../shared/services/internationalization.service';
import { ErrorService } from '../../error.service';
import { ErrorBT } from '../../models/error.model';
import { AddErrorFormComponent } from '../add-error-form/add-error-form.component';

@Component({
  selector: 'app-error-list',
  templateUrl: './error-list.component.html',
  styles: []
})
export class ErrorListComponent implements OnInit {

  @ViewChild('errorTable') private errorTable: MatTable<Error>;
  @ViewChild('errorPaginator') private errorPaginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

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
