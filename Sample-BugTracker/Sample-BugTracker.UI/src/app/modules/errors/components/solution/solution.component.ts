import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';

import { ErrorSolution } from '../../models/error-solution.model';
import { ErrorSolutionFormComponent } from '../error-solution-form/error-solution-form.component';
import { ErrorBT } from '../../models/error.model';
import { ErrorAttachment } from '../../models/error-attachment.model';
import { SolutionAttachmentService } from '../../services/solution-attachment.service';
import { AttachmentsComponent } from '../attachments/attachments.component';

@Component({
  selector: 'app-solution',
  templateUrl: './solution.component.html',
  styles: []
})
export class SolutionComponent implements OnInit {

  @Input() error: ErrorBT;
  solution: ErrorSolution;
  @ViewChild("attachments") attachments: AttachmentsComponent;

  constructor(
    public dialog: MatDialog,
    public slnAttachSrv: SolutionAttachmentService,

  ) { }

  ngOnInit() {
    this.solution = this.error.Solution;
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
    this.solution.Description = data.solution.Description;
    this.attachments.pushAttachments(data.attachments);
  }
}
