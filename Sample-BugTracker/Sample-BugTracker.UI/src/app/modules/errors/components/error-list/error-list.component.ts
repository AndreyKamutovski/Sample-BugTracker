import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

import {
    WarningDialogComponent
} from '../../../shared/components/warning-dialog/warning-dialog.component';
import { AuthService } from '../../../shared/services/auth.service';
import { MessageService } from '../../../shared/services/message.service';
import { PermissionService } from '../../../shared/services/permission.service';
import { StatusList } from '../../enums/status-list.enum';
import { ErrorBT } from '../../models/error.model';
import { ErrorListSharedService } from '../../services/error-list-shared.service';
import { ErrorService } from '../../services/error.service';
import {
    ClassificationSelectItems
} from '../../services/selection-lists-items/classification-select-items';
import { PrioritySelectItems } from '../../services/selection-lists-items/priority-select-items';
import { StatusSelectItems } from '../../services/selection-lists-items/status-select-items';
import { AddErrorFormComponent } from '../add-error-form/add-error-form.component';
import {
    SelectedErrorDialogComponent
} from '../selected-error-dialog/selected-error-dialog.component';

@Component({
  selector: 'app-error-list',
  templateUrl: './error-list.component.html',
  styleUrls: ['./error-list.component.css']
})
export class ErrorListComponent implements OnInit {

  cols: any[] = [
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
    public _route: ActivatedRoute,
    public authService: AuthService,
    public errorService: ErrorService,
    public dialog: MatDialog,
    public permissionService: PermissionService,
    public errorListSharedService: ErrorListSharedService,
    public messageService: MessageService,
    public statusSelectItemsService: StatusSelectItems,
    public prioritySelectItemsService: PrioritySelectItems,
    public classificationSelectItemsService: ClassificationSelectItems
  ) { }


  ngOnInit() {
    this.errorListSharedService.Errors = this._route.snapshot.data.errorList;
    this.errorListSharedService.ProjectWorkers = this._route.snapshot.data.projectWorkers;
    this.errorListSharedService.ProjectUsers = this._route.snapshot.data.userList;
    this.errorListSharedService.Project = this._route.snapshot.data.currentProject;
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
}
