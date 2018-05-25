import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';

import { AuthService } from '../../../shared/services/auth.service';
import { ErrorService } from '../../services/error.service';
import { StatusSelectItems } from '../../services/selection-lists-items/status-select-items';
import { QuillEditorConfigurationService } from '../../../shared/services/quill-editor-configuration.service';
import { ErrorAttachmentService } from '../../services/error-attachment.service';
import { FileUpload } from 'primeng/components/fileupload/fileupload';
import { ErrorSolutionService } from '../../services/error-solution.service';
import { ErrorSolution } from '../../models/error-solution.model';
import { MessageService } from '../../../shared/services/message.service';
import { ErrorBT } from '../../models/error.model';
import { ErrorAttachment } from '../../models/error-attachment.model';
import { AttachmentPreviewService } from '../../services/attachment-preview.service';
import { SolutionAttachmentService } from '../../services/solution-attachment.service';

@Component({
  selector: 'app-solution-error-form',
  templateUrl: './error-solution-form.component.html',
  styleUrls: ['./error-solution-form.component.css'],
})
export class ErrorSolutionFormComponent {

  solutionForm: FormGroup;
  errorStatus: FormControl;
  description: FormControl;
  error: ErrorBT;
  @ViewChild("fileUploader") _fileUploader: FileUpload;
  isLoadSolution: boolean = false;
  uploadedFiles: any[] = [];
  _fileTypeIconsFolder: string = "../../../../../assets/file-types-icons";


  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ErrorSolutionFormComponent>,
    public errorService: ErrorService,
    public solutionService: ErrorSolutionService,
    public authService: AuthService,
    public snackBar: MatSnackBar,
    public quillEditorConfig: QuillEditorConfigurationService,
    private statusSelectItems: StatusSelectItems,
    private attachPreviewSrv: AttachmentPreviewService,
    public messageService: MessageService,
    private slnAttachSrv: SolutionAttachmentService,
    @Inject(MAT_DIALOG_DATA) public data: any,

  ) {
    this.error = this.data.error;
    this.createForm();

  };


  addSolution(): void {
    if (this.solutionForm.valid) {
      this.isLoadSolution = true;
      this.solutionService.addSolution(this.error.ErrorId, this.solutionForm.value).toPromise().then((solution: ErrorSolution) => {
        if (this._fileUploader.files.length > 0) {
          let formData = new FormData();
          for (let file of this._fileUploader.files) {
            formData.append('solutionAttachments[]', file, file.name);
          }
          this.slnAttachSrv.add(solution.Id, formData).toPromise().then((attachments: ErrorAttachment[]) => {
            this.isLoadSolution = false;
            this.dialogRef.close({ 'solution': solution, 'attachments': attachments });
          });
        }
        else {
          this.dialogRef.close({ 'solution': solution });
        }
      });
    } else {
      throw new Error("Решение не добавлено. Проверьте правильность ввода данных.")
    }
  }

  private createForm(): void {
    this.errorStatus = new FormControl(this.error.Status, [Validators.required]);
    this.description = new FormControl("", [Validators.required]);


    this.solutionForm = this.formBuilder.group({
      'ErrorStatus': this.errorStatus,
      "Description": this.description
    });
  }


  onUpload(event) {
    console.log('upload');
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
  }

  getFileSizeInKB(size: number): string {
    return this.attachPreviewSrv.getFileSizeInKB(size);
  }

  getFilePreviewSrc(fileName: string) {
    return `${this._fileTypeIconsFolder}/${this.attachPreviewSrv.getFilePreview(fileName)}`;
  }

  cancelAttachment(index: number) {
    event.preventDefault();
    if (index < this._fileUploader.files.length) {
      this._fileUploader.files.splice(index, 1);
    }
  }
}
