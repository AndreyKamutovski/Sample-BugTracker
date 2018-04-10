import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { equalPasswordValidator } from '../portal/validators/equal-password.validator';
import { nonLetterOrDigitPasswordValidator } from '../portal/validators/non-letter-or-digit-password.validator';
import { requireDigitPasswordValidator } from '../portal/validators/require-digit-password.validator';
import { requireLowercasePasswordValidator } from '../portal/validators/require-lowercase-password.validator';
import { requireUppercasePasswordValidator } from '../portal/validators/require-uppercase-password.validator';

@Component({
  selector: 'app-confirm-password-form',
  templateUrl: './confirm-password-form.component.html',
  styles: []
})
export class ConfirmPasswordFormComponent implements OnInit {

  private confirmPasswordForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ConfirmPasswordFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.createForm();
  };

  get password() { return this.confirmPasswordForm.get('Password'); }
  get confirmPassword() { return this.confirmPasswordForm.get('ConfirmPassword'); }

  private createForm(): void {
    this.confirmPasswordForm = this.formBuilder.group({
      'Email': [this.data.Email],
      'Password': ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern("[^А-Яа-я]+"),
        nonLetterOrDigitPasswordValidator,
        requireDigitPasswordValidator,
        requireLowercasePasswordValidator,
        requireUppercasePasswordValidator
      ]],
      'ConfirmPassword': ['', [Validators.required, Validators.minLength(6)]],
      'RoleName': [this.data.Role]
    }, { validator: equalPasswordValidator });
  }

  enterConfirmPassword(): void {
    if (this.confirmPasswordForm.valid) {
      this.dialogRef.close({ 'confirmData': this.confirmPasswordForm.value });
    } else {
      throw new Error("Пароль не подтверждён. Проверьте правильность ввода данных и перейдите по ссылке в сообщении ещё раз.")
    }
  }

  ngOnInit() {
  }

}
