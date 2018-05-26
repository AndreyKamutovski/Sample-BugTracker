import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

import { AuthService } from '../../../shared/services/auth.service';
import {
    QuillEditorConfigurationService
} from '../../../shared/services/quill-editor-configuration.service';
import { ClassificationList } from '../../enums/classification-list.enum';
import { PriorityList } from '../../enums/priority-list.enum';
import { StatusList } from '../../enums/status-list.enum';
import {
    ClassificationSelectItems
} from '../../services/selection-lists-items/classification-select-items';
import { PrioritySelectItems } from '../../services/selection-lists-items/priority-select-items';

@Component({
  selector: 'app-add-error-form',
  templateUrl: './add-error-form.component.html',
  styles: []
})
export class AddErrorFormComponent {

   addErrorForm: FormGroup;
   title: FormControl;
   description: FormControl;
   priority: FormControl;
   classification: FormControl;

  constructor(
    public formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddErrorFormComponent>,
    public quillEditorConfig: QuillEditorConfigurationService,
    public classificationSelectItemsService: ClassificationSelectItems,
    public prioritySelectItemsService: PrioritySelectItems,
  ) { this.createForm(); };

  addError(): void {
    if (this.addErrorForm.valid) {
      this.dialogRef.close({ 'errorData': this.addErrorForm.value, 'ProjectId': sessionStorage.getItem('projectID') });
    } else {
      throw new Error("Ошибка не добавлена. Проверьте правильность ввода данных.")
    }
  }

  private createForm(): void {
    this.title = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100),
      Validators.pattern("^[А-Яа-яa-zA-Z0-9 _-]*$")
    ]);
    this.description = new FormControl('', [
      Validators.maxLength(5000)
    ]);
    this.priority = new FormControl(PriorityList.CRITICAL);
    this.classification = new FormControl(ClassificationList.SECURITY);

    this.addErrorForm = this.formBuilder.group({
      'Title': this.title,
      'Description': this.description,
      'DateCreation': [new Date(Date.now())],
      'Status': [StatusList.OPEN],
      'Priority': this.priority,
      'Classification': this.classification
    });
  }
}
