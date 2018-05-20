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

@Component({
  selector: 'app-solution-error-form',
  templateUrl: './error-solution-form.component.html',
  styleUrls: ['./error-solution-form.component.css'],
})
export class ErrorSolutionFormComponent implements OnInit {

  solutionForm: FormGroup;

  errorStatus: FormControl;
  description: FormControl;

  error: ErrorBT;

  @ViewChild("fileUploader") _fileUploader: FileUpload;


  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ErrorSolutionFormComponent>,
    public errorService: ErrorService,
    public solutionService: ErrorSolutionService,
    public authService: AuthService,
    public snackBar: MatSnackBar,
    public quillEditorConfig: QuillEditorConfigurationService,
    private statusSelectItems: StatusSelectItems,
    private errorAttachmentService: ErrorAttachmentService,
    public messageService: MessageService,
    @Inject(MAT_DIALOG_DATA) public data: any,

  ) {
    this.error = this.data.error;
    this.createForm();

  };

  isLoadSolution: boolean = false;

  addSolution(): void {
    if (this.solutionForm.valid) {
      this.isLoadSolution = true;
      this.solutionService.addSolution(this.error.ErrorId, this.solutionForm.value).toPromise().then((solution: ErrorSolution) => {
        let formData = new FormData();
        for (let file of this._fileUploader.files) {
          formData.append('solutionAttachments[]', file, file.name);
        }
        this.solutionService.addAttachments(solution.Id, formData).toPromise().then((attachments: ErrorAttachment[]) => {
          this.isLoadSolution = false;
          this.dialogRef.close({ 'solution': solution, 'attachments': attachments });
          this.messageService.showSnackBarMsg("Решение успешно добавлено");
        });
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

  uploadedFiles: any[] = [];

  onUpload(event) {
    console.log('upload');
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
  }

  ngOnInit() {

  }

  _fileTypeIconsFolder: string = "../../../../../assets/file-types-icons";


  getFileSizeInKB(size: number): string {
    let sizeKB = size / 1024;
    return `${sizeKB.toFixed(0)} KB`;
  }

  getFilePreviewSrc(fileName: string) {
    return `${this._fileTypeIconsFolder}/${this.errorAttachmentService.getFilePreview(fileName)}`;
  }

  cancelAttachment(index: number) {
    event.preventDefault();
    if (index < this._fileUploader.files.length) {
      this._fileUploader.files.splice(index, 1);
    }
  }
}
