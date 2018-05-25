import { Component, Inject, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatExpansionPanel } from '@angular/material';

import { AuthService } from '../../../shared/services/auth.service';
import { MessageService } from '../../../shared/services/message.service';
import { QuillEditorConfigurationService } from '../../../shared/services/quill-editor-configuration.service';
import { ClassificationList } from '../../enums/classification-list.enum';
import { PriorityList } from '../../enums/priority-list.enum';
import { StatusList } from '../../enums/status-list.enum';
import { ErrorBT } from '../../models/error.model';
import { ErrorListSharedService } from '../../services/error-list-shared.service';
import { ClassificationSelectItems } from '../../services/selection-lists-items/classification-select-items';
import { PrioritySelectItems } from '../../services/selection-lists-items/priority-select-items';
import { StatusSelectItems } from '../../services/selection-lists-items/status-select-items';
import { ErrorAttachment } from '../../models/error-attachment.model';
import { ErrorAttachmentService } from '../../services/error-attachment.service';
import { ErrorSolutionFormComponent } from '../error-solution-form/error-solution-form.component';
import { ErrorSolution } from '../../models/error-solution.model';
import { ErrorService } from '../../services/error.service';
import { ScrollToService } from 'ng2-scroll-to-el';



type errorUpdateFunc = (errorId: number, value: string | Date | StatusList | PriorityList | ClassificationList) => void;


@Component({
  selector: 'app-selected-error-dialog',
  templateUrl: './selected-error-dialog.component.html',
  styleUrls: ['./selected-error-dialog.component.css']
})
export class SelectedErrorDialogComponent {


  error: ErrorBT;
  errorSolution: ErrorSolutionFormComponent;
  viewQuill: boolean = false;
  quillEditorTextContent: string = '';
  quillEditorHtmlContent: string = '';
  oldQuillHtmlContent: string = '';

  editErrorForm: FormGroup;
  title: FormControl;
  description: FormControl;
  dateCreation: FormControl;
  deadline: FormControl;
  status: FormControl;
  priority: FormControl;
  classification: FormControl;
  emailAssignee: FormControl;
  isOpenAttachmentExpPanel: boolean;
  @ViewChild("attachmentsExpPanelAnchor") attachmentsExpPanelAnchor: HTMLElement;



  constructor(
    public formBuilder: FormBuilder,
    public dialogEditError: MatDialogRef<SelectedErrorDialogComponent>,
    public quillEditorConfig: QuillEditorConfigurationService,
    public authService: AuthService,
    public dialog: MatDialog,
    public messageService: MessageService,
    public errorListSharedService: ErrorListSharedService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public statusSelectItemsService: StatusSelectItems,
    public prioritySelectItemsService: PrioritySelectItems,
    public classificationSelectItemsService: ClassificationSelectItems,
    public errorAttachmentService: ErrorAttachmentService,
    public errorService: ErrorService,
    private scrollService: ScrollToService
  ) {
    this.error = this.data.error;
    this.isOpenAttachmentExpPanel = this.data.isOpenAttachExpPanel as boolean;
    this.createForm();
  };

  ngAfterViewInit(): void {
    if (this.isOpenAttachmentExpPanel) {
      this.scrollService.scrollTo(this.attachmentsExpPanelAnchor);
    }
  }

  contentChange(event: any) {
    this.quillEditorHtmlContent = event.html;
    this.quillEditorTextContent = event.text;
  }

  updateError(callback: errorUpdateFunc, value: any) {
    if (this.editErrorForm.valid) {
      callback(this.error.ErrorId, value);
    }
    else {
      this.messageService.showSnackBarMsg("Ошибка не обновлена");
    }
  }

  createForm(): void {

    this.title = new FormControl(this.error.Title, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100),
      Validators.pattern("^[A-Za-zА-Яа-я0-9 _-]*$")
    ]);
    this.description = new FormControl(this.error.Description, [Validators.maxLength(5000)]);
    this.dateCreation = new FormControl(this.error.DateCreation);
    this.deadline = new FormControl(this.error.Deadline, Validators.required);
    this.status = new FormControl(this.error.Status, [Validators.required]);
    this.priority = new FormControl(this.error.Priority, [Validators.required]);
    this.classification = new FormControl(this.error.Classification, [Validators.required]);
    this.emailAssignee = new FormControl(this.error.EmailAssignee ? this.error.EmailAssignee : "null", [Validators.required]);

    this.editErrorForm = this.formBuilder.group({
      'ErrorId': [this.error.ErrorId],
      'EmailAuthor': [this.error.EmailAuthor],
      'Title': this.title,
      "Description": this.description,
      'DateCreation': this.dateCreation,
      'Deadline': this.deadline,
      'Status': this.status,
      'Priority': this.priority,
      'Classification': this.classification,
      'EmailAssignee': this.emailAssignee,
      'Solution': [this.error.Solution]
    });
  }

  solutionChange(sln: ErrorSolution) {
    this.editErrorForm.get('Solution').setValue(sln);
    this.status.setValue(sln.ErrorStatus);
  }

  close() {
    if (this.editErrorForm.valid) {
      this.errorService.get(this.error.ErrorId).toPromise().then((error: ErrorBT) => {
        this.dialogEditError.close(error);
      });
    }
    else {
      this.dialogEditError.close(null);
    }
  }
}
