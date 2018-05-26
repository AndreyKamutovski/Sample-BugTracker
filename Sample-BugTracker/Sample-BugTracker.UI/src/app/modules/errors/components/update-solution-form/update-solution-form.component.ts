import { FileUpload } from 'primeng/components/fileupload/fileupload';

import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';

import { AuthService } from '../../../shared/services/auth.service';
import { MessageService } from '../../../shared/services/message.service';
import {
    QuillEditorConfigurationService
} from '../../../shared/services/quill-editor-configuration.service';
import { ErrorAttachment } from '../../models/error-attachment.model';
import { ErrorSolution } from '../../models/error-solution.model';
import { ErrorBT } from '../../models/error.model';
import { AttachmentPreviewService } from '../../services/attachment-preview.service';
import { ErrorAttachmentService } from '../../services/error-attachment.service';
import { ErrorSolutionService } from '../../services/error-solution.service';
import { ErrorService } from '../../services/error.service';
import { StatusSelectItems } from '../../services/selection-lists-items/status-select-items';
import { SolutionAttachmentService } from '../../services/solution-attachment.service';
import { AttachmentsComponent } from '../attachments/attachments.component';
import { ErrorSolutionFormComponent } from '../error-solution-form/error-solution-form.component';

@Component({
  selector: 'app-update-solution-form',
  templateUrl: './update-solution-form.component.html',
  styles: []
})
export class UpdateSolutionFormComponent implements OnInit {

  updateSolutionForm: FormGroup;
  errorStatus: FormControl;
  description: FormControl;
  solution: ErrorSolution;
  isUpdtedSln: boolean = false;
  uploadedFiles: any[] = [];
  @ViewChild("fileUploader") _fileUploader: FileUpload;
  _fileTypeIconsFolder: string = "../../../../../assets/file-types-icons";


  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<UpdateSolutionFormComponent>,
    public errorService: ErrorService,
    public solutionService: ErrorSolutionService,
    public authService: AuthService,
    public snackBar: MatSnackBar,
    public quillEditorConfig: QuillEditorConfigurationService,
    private statusSelectItems: StatusSelectItems,
    private attachPreviewSrv: AttachmentPreviewService,
    private slnAttachSrv: SolutionAttachmentService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.solution = this.data.sln;
    this.createForm();
  }

  ngOnInit() {
  }

  private createForm(): void {
    this.errorStatus = new FormControl(this.solution.ErrorStatus, [Validators.required]);
    this.description = new FormControl(this.solution.Description, [Validators.required]);

    this.updateSolutionForm = this.formBuilder.group({
      'ErrorStatus': this.errorStatus,
      "Description": this.description
    });
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

  updateSolution(): void {
    if (this.updateSolutionForm.valid) {
      this.isUpdtedSln = true;
      this.solutionService.updateSolution(this.solution.Id, this.updateSolutionForm.value).toPromise().then((solution: ErrorSolution) => {
        if (this._fileUploader.files.length > 0) {
          let formData = new FormData();
          for (let file of this._fileUploader.files) {
            formData.append('solutionAttachments[]', file, file.name);
          }
          this.slnAttachSrv.add(solution.Id, formData).toPromise().then((attachments: ErrorAttachment[]) => {
            this.isUpdtedSln = false;
            this.dialogRef.close({ 'solution': solution, 'attachments': attachments });
          });
        } else {
          this.dialogRef.close({ 'solution': solution });
        }
      });
    } else {
      throw new Error("Решение не обновлено. Проверьте правильность ввода данных.")
    }
  }
}


