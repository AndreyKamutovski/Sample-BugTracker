import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSelect, MatSelectionList } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Table } from 'primeng/table';

import { WarningDialogComponent } from '../../../shared/components/warning-dialog/warning-dialog.component';
import { AuthService } from '../../../shared/services/auth.service';
import { MessageService } from '../../../shared/services/message.service';
import { PermissionService } from '../../../shared/services/permission.service';
import { StatisticsRoutingService } from '../../../shared/services/statistics-routing.service';
import { StatusList } from '../../enums/status-list.enum';
import { ErrorBT } from '../../models/error.model';
import { ErrorListSharedService } from '../../../shared/services/error-list-shared.service';
import { ErrorService } from '../../services/error.service';
import { ClassificationSelectItems } from '../../services/selection-lists-items/classification-select-items';
import { PrioritySelectItems } from '../../services/selection-lists-items/priority-select-items';
import { StatusSelectItems } from '../../services/selection-lists-items/status-select-items';
import { AddErrorFormComponent } from '../add-error-form/add-error-form.component';
import { SelectedErrorDialogComponent } from '../selected-error-dialog/selected-error-dialog.component';


@Component({
  selector: 'app-error-list',
  templateUrl: './error-list.component.html',
  styleUrls: ['./error-list.component.css']
})
export class ErrorListComponent implements OnInit {

  cols: any[] = [
    { field: 'Title', header: 'Ошибка', class: "" },
    { field: 'EmailAuthor', header: 'Автор', class: "ui-p-3" },
    { field: 'DateCreation', header: 'Создано', class: "ui-p-3" },
    { field: 'EmailAssignee', header: 'Ответственный', class: "" },
    { field: 'Deadline', header: 'Срок', class: "" },
    { field: 'Status', header: 'Статус', class: "" },
    { field: 'Priority', header: 'Приоритет', class: "" },
    { field: 'Classification', header: 'Классификация', class: "ui-p-3" },
  ];
  @ViewChild('statusSelect') public statusSelect: MatSelect;

  constructor(
    public _route: ActivatedRoute,
    public authService: AuthService,
    public errorService: ErrorService,
    public dialog: MatDialog,
    public permissionService: PermissionService,
    public errorListSharedService: ErrorListSharedService,
    public messageService: MessageService,
    public statusSelectItemsService: StatusSelectItems,
    public prioritySelectItemsService: PrioritySelectItems,
    public classificationSelectItemsService: ClassificationSelectItems,
    private _statisticRouting: StatisticsRoutingService
  ) { }


  ngOnInit() {
    // this.errorListSharedService.Errors = this._route.snapshot.data.errorList;
    // this.errorListSharedService.ProjectWorkers = this._route.snapshot.data.projectWorkers;
    // this.errorListSharedService.ProjectUsers = this._route.snapshot.data.userList;
    // this.errorListSharedService.Project = this._route.snapshot.data.currentProject;
    if (this._statisticRouting.isFromDiagram) {
      this.loadingTable = true;
      let status: StatusList[] = [];
      if (this._statisticRouting.openClosedDiagram == StatusList.OPEN) {
        status.push(StatusList.OPEN, StatusList.DECIDED, StatusList.NECESSARYTEST);
      }
      if (this._statisticRouting.openClosedDiagram == StatusList.CLOSED) {
        status.push(StatusList.CLOSED);
      }
      this.errorsTable.filter(status, 'Status', 'in');
      this._statisticRouting.isFromDiagram = false;
      setTimeout(() => {
        this.listCheckboxStatus.options.filter((item) => status.indexOf(item.value) !== -1).forEach((v) => v.selected = true);
        this.loadingTable = false;
      }, 0);
    }
  }

  crossErrorTitle(status: StatusList) {
    return status == StatusList.CLOSED ? 'line-through' : '';
  }

  // editing error dialog
  openEditErrorDialog(error: ErrorBT, isOpenAttachmentExpPanel: boolean): void {
    event.preventDefault();
    let dialogRef = this.dialog.open(SelectedErrorDialogComponent, {
      width: '95%',
      maxWidth: '95%',
      height: '95%',
      maxHeight: '95%',
      disableClose: true,
      data: { 'error': error, 'isOpenAttachExpPanel': isOpenAttachmentExpPanel }
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

  afterClosedAddErrorDialog(res: any) {
    if (res != undefined && res != null) {
      if (res.hasOwnProperty('errorData')) {
        this.errorService.addError(res.ProjectId, res.errorData).toPromise().then(newError => {
          this.errorListSharedService.Errors = [...this.errorListSharedService.Errors, newError];
          this.messageService.showSnackBarMsg("Ошибка успешно добавлена");
        });
      }
    }
  }


  deleteError(id: number) {
    let confirmDeletionDialog = this.dialog.open(WarningDialogComponent, {
      width: '50%',
      data: { 'dialogBody': 'Удалить ошибку?' }
    });
    confirmDeletionDialog.afterClosed().toPromise().then(userChoice => {
      if (userChoice) {
        this.errorService.delete(id).toPromise().then(r => {
          let errs = [...this.errorListSharedService.Errors];
          let idx = errs.findIndex(p => p.ErrorId == id);
          errs.splice(idx, 1);
          this.errorListSharedService.Errors = errs;
          this.messageService.showSnackBarMsg("Ошибка успешно удалена");
        }
        );
      }
    }
    );
  }

  @ViewChild("opListCheckboxStatus") listCheckboxStatus: MatSelectionList;
  loadingTable: boolean = false;

  ngAfterContentInit() {

  }

  ngAfterViewInit() {

    // setTimeout(() => {this.loadingTable = false;},0)
  }

  // filtering
  selectedProjectProgressFilterMode: string;
  showFilterPanelProjectProgress: boolean;
  @ViewChild("errorsTable") errorsTable: Table;
  filterModes = [
    { value: "equals", viewValue: "Равно", checked: true },
    { value: "gt", viewValue: "Больше", checked: false },
    { value: "lt", viewValue: "Меньше", checked: false }
  ];

  runFiltering(value: any, colField: string, mode: string) {
    this.errorsTable.filter(value, colField, mode);
  }

  getCheckboxesFilterValues(selectList: MatSelectionList): StatusList[] {
    return selectList.selectedOptions.selected.map<StatusList>(v => v.value)
  }
}
