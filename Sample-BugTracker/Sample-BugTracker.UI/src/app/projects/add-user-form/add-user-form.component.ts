import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

import { AddPortalFormComponent } from '../../portal/add-portal-form/add-portal-form.component';

@Component({
  selector: 'app-add-user-form',
  templateUrl: './add-user-form.component.html',
  styles: []
})
export class AddUserFormComponent {
  private addUserForm: FormGroup;

  get email() { return this.addUserForm.get('email'); }

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddPortalFormComponent>,
  ) {
    this.createForm();
  };

  private createForm(): void {
    this.addUserForm = this.formBuilder.group({
      'email': ['', [Validators.required, Validators.email]]
    });
  }

  addProjectUser(): void {
    if (this.addUserForm.valid) {
      this.dialogRef.close({ 'userData': this.addUserForm.value });
    } else {
      throw new Error("Пользователь не добавлен к проекту. Проверьте правильность ввода данных.")
    }
  }
}
