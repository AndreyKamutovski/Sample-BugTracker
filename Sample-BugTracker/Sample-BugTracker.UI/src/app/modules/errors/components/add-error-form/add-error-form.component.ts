import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

import { QuillEditorConfigurationService } from '../../../../shared/services/quill-editor-configuration.service';
import { ErrorService } from '../../error.service';
import { AuthService } from '../../../../shared/services/auth.service';

@Component({
  selector: 'app-add-error-form',
  templateUrl: './add-error-form.component.html',
  styles: []
})
export class AddErrorFormComponent implements OnInit {

  private addErrorForm: FormGroup;
  private nowDate: Date;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddErrorFormComponent>,
    private quillEditorConfig: QuillEditorConfigurationService,
    private errorService: ErrorService,
    private authService: AuthService,
    
  ) {
    this.nowDate = new Date(Date.now());
    this.createForm();
    
  };

  quillEditorTextContent: string = '';

  contentChange(event: any) {
    this.quillEditorTextContent = event.text;
  }

  addError(): void {
    if (this.addErrorForm.valid) {
      this.dialogRef.close({ 'errorData': this.addErrorForm.value });

    } else {
      throw new Error("Ошибка не добавлена. Проверьте правильность ввода данных.")
    }
  }

  private createForm(): void {
    this.addErrorForm = this.formBuilder.group({
      'Title': ["", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
        Validators.pattern("^[А-Яа-яa-zA-Z0-9 _-]*$")
      ]],
      "Description": ["", [
        Validators.maxLength(5000),
      ]],
      'DateCreation': [this.nowDate],
      // 'Deadline': [{value: "", disabled: true}, [Validators.required]],
      'Status': [1, [Validators.required]],
      'Priority': [1, [Validators.required]],
      'Classification': [1, [Validators.required]],
      'ProjectId': [sessionStorage.getItem('projectID')],
      // 'EmailErrorAuthor': [this.authService.currentUser.Email, [Validators.email]],     
     
      // 'EmailErrorResponsible': ["", [
      //   Validators.required,
      //   Validators.email
      // ]]
    });
  }

  get title() { return this.getFormControl('Title'); }
  get description() { return this.getFormControl('Description'); }
  // get deadline() { return this.getFormControl('Deadline'); }
  get status() { return this.getFormControl('Status'); }
  get priority() { return this.getFormControl('Priority'); }
  get classification() { return this.getFormControl('Classification'); }
  // get emailErrorResponsible() { return this.getFormControl('EmailErrorResponsible'); }



  private getFormControl(fcPath: string) {
    return this.addErrorForm.get(fcPath);
  }
  ngOnInit() {
  }

}
