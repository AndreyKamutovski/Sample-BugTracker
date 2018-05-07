import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

import { AuthService } from '../../../../shared/services/auth.service';

@Component({
  selector: 'app-add-error-form',
  templateUrl: './add-error-form.component.html',
  styles: []
})
export class AddErrorFormComponent {

  private addErrorForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddErrorFormComponent>,
  ) {
    this.createForm();
  };

  addError(): void {
    if (this.addErrorForm.valid) {
      this.dialogRef.close({ 'errorData': this.addErrorForm.value, 'ProjectId': sessionStorage.getItem('projectID') });
    } else {
      throw new Error("Ошибка не добавлена. Проверьте правильность ввода данных.")
    }
  }

  private createForm(): void {
    this.addErrorForm = new FormGroup({
      'DateCreation': new FormControl(Date.now())
    });
  }
}
