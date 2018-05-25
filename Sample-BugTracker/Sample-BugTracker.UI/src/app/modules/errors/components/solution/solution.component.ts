import { QuillEditorComponent } from 'ngx-quill/src/quill-editor.component';

import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { MessageService } from '../../../shared/services/message.service';
import { StatusList } from '../../enums/status-list.enum';
import { ErrorAttachment } from '../../models/error-attachment.model';
import { ErrorSolution } from '../../models/error-solution.model';
import { ErrorBT } from '../../models/error.model';
import { SolutionAttachmentService } from '../../services/solution-attachment.service';
import { AttachmentsComponent } from '../attachments/attachments.component';
import { ErrorSolutionFormComponent } from '../error-solution-form/error-solution-form.component';
import {
  UpdateSolutionFormComponent
} from '../update-solution-form/update-solution-form.component';
import Quill from 'quill';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-solution',
  templateUrl: './solution.component.html',
  styles: []
})
export class SolutionComponent implements OnInit {

  @Input() error: ErrorBT;
  solution: ErrorSolution;
  @ViewChild("attachments") attachments: AttachmentsComponent;
  @Output() solutionChange = new EventEmitter<ErrorSolution>();

  constructor(
    public dialog: MatDialog,
    public slnAttachSrv: SolutionAttachmentService,
    public messageService: MessageService,
  ) { }

  ngOnInit() {
    this.solution = this.error.Solution ? this.error.Solution : new ErrorSolution();
    this.slnAttachSrv.get(this.solution.Id).toPromise().then(a => {
      this.attachments.pushAttachments(a);
    });
  }

  addSolutionDialog() {
    let dialogRef = this.dialog.open(ErrorSolutionFormComponent, {
      width: '50%',
      maxWidth: '50%',
      data: { 'error': this.error }
    });
    dialogRef.afterClosed().subscribe(this.afterCloseAddSolutionDialog.bind(this));
  }

  afterCloseAddSolutionDialog(data: any) {
    if (data) {
      this.solution.Description = data.solution.Description;
      if (data.attachments) {
        this.attachments.pushAttachments(data.attachments);
      }
      this.messageService.showSnackBarMsg("Решение успешно добавлено");
    }
  }

  updateSolutionDialog() {
    let dialogRef = this.dialog.open(UpdateSolutionFormComponent, {
      width: '50%',
      maxWidth: '50%',
      data: { 'sln': this.solution }
    });
    dialogRef.afterClosed().subscribe(this.afterCloseUpdateSolutionDialog.bind(this));
  }

  afterCloseUpdateSolutionDialog(data: any) {
    if (data) {
      this.solution = data.solution as ErrorSolution;
      if (data.attachments) {
        this.attachments.pushAttachments(data.attachments);
      }
      this.messageService.showSnackBarMsg("Решение успешно обновлено");
      this.solutionChange.emit(this.solution);
    }
  }
}