import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { AuthService } from '../../../../shared/services/auth.service';
import { QuillEditorConfigurationService } from '../../../../shared/services/quill-editor-configuration.service';
import { ErrorBT } from '../../models/error.model';
import { ErrorListSharedService } from '../../services/error-list-shared.service';
import { SolutionErrorFormComponent } from '../solution-error-form/solution-error-form.component';

@Component({
  selector: 'app-selected-error-dialog',
  templateUrl: './selected-error-dialog.component.html',
  styleUrls: ['./selected-error-dialog.component.css']
})
export class SelectedErrorDialogComponent {

  private errorForm: FormGroup;
  private error: ErrorBT;
  // private project: Project;
  private isShowQuillEditor: boolean = false;
  // private projectWorkers: User[];
  private errorSolution: SolutionErrorFormComponent;
  // private isDisabledTitleAndDesc: boolean;


  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<SelectedErrorDialogComponent>,
    private quillEditorConfig: QuillEditorConfigurationService,
    // private errorService: ErrorService,
    private authService: AuthService,
    private dialog: MatDialog,
    private errorListSharedService: ErrorListSharedService,
    
    @Inject(MAT_DIALOG_DATA) public data: any,

  ) {
    this.error = this.data.error;
    // this.project = this.data.project;
    // this.projectWorkers = this.data.projectWorkers;
    // this.isDisabledTitleAndDesc = this.data.isDisabledTitleAndDesc;
    // this.isShowQuillEditor = this.error.Description != '' ? true : false;
    this.createForm();
  };


  quillEditorTextContent: string = '';
  quillEditorHtmlContent: string = '';

  quillEditorIsActive: boolean = false;

  contentChange(event: any) {
    this.quillEditorHtmlContent = event.html;
    this.quillEditorTextContent = event.text;
  }

  // updateError(updatedField: string, fcName: string) {
  //   if (this.getFormControl(fcName).valid) {
  //     this.errorService.updateError(this.error.ErrorId, this.errorForm.value).toPromise().then((error: ErrorBT) => {
  //       this.error = error;
  //       this.snackBar.open(`${updatedField}: успешно обновлено`, '', { duration: 2000 });
  //     });
  //   } else { 
  //     this.snackBar.open(`Не удалось выполнить обновление`, '', { duration: 2000 });
  //   }
  // }



  // changeDeadline(errorId: number, event: MatDatepickerInputEvent<Date>) {
  //   let errorDeadline = new UpdateErrorDeadlineBT(errorId, event.value);
  //   this.errorService.updateErrorDeadline(errorDeadline).toPromise().then((error: UpdateErrorDeadlineBT) => {
  //     this.errors.find(e => e.Id == error.ErrorId).Deadline = error.Deadline;
  //     this.snackBar.open("Срок выполнения : успешно обновлено", '', { duration: 2000 });
  //   });
  // }


  private createForm(): void {
    this.errorForm = this.formBuilder.group({
      'Id': [this.error.ErrorId],
      'Title': [this.error.Title, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
        Validators.pattern("^[А-Яа-я0-9 _-]*$")
      ]],
      "Description": [this.error.Description, [
        Validators.maxLength(5000),
      ]],
      'DateCreation': [this.error.DateCreation],
      'Deadline': [this.error.Deadline],
      'Status': [this.error.Status, [Validators.required]],
      'Priority': [this.error.Priority, [Validators.required]],
      'Classification': [this.error.Classification, [Validators.required]],
      'ProjectId': [this.error.ProjectId],
      'EmailAssignee': [this.error.EmailAssignee]
    });
  }

  get title() { return this.getFormControl('Title'); }
  get description() { return this.getFormControl('Description'); }
  get deadline() { return this.getFormControl('Deadline'); }
  get status() { return this.getFormControl('Status'); }
  get priority() { return this.getFormControl('Priority'); }
  get classification() { return this.getFormControl('Classification'); }
  get emailAssignee() { return this.getFormControl('EmailAssignee'); }


  private getFormControl(fcPath: string) {
    return this.errorForm.get(fcPath);
  }

  openSolutionErrorDialog() {
    event.preventDefault();
    let dialogRef = this.dialog.open(SolutionErrorFormComponent, {
      width: '50%',
      maxWidth: '50%',
      data: { 'error': null }
    });

    dialogRef.afterClosed().subscribe(this.afterSolutionErrorDialog.bind(this));
  }

  afterSolutionErrorDialog(sln: SolutionErrorFormComponent) {
    if(sln != null) {
      this.errorSolution = sln;
    }

  }
}
