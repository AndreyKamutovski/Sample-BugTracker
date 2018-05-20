import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { equalPasswordValidator } from '../../../shared/validators/equal-password.validator';
import { nonLetterOrDigitPasswordValidator } from '../../../shared/validators/non-letter-or-digit-password.validator';
import { requireDigitPasswordValidator } from '../../../shared/validators/require-digit-password.validator';
import { requireLowercasePasswordValidator } from '../../../shared/validators/require-lowercase-password.validator';
import { requireUppercasePasswordValidator } from '../../../shared/validators/require-uppercase-password.validator';

@Component({
  selector: 'app-confirm-password-form',
  templateUrl: './confirm-password-form.component.html',
  styles: []
})
export class ConfirmPasswordFormComponent implements OnInit {
  confirmPasswordForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ConfirmPasswordFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.createForm();
  };
   hidePassword: boolean = true;
   hidePConfirm: boolean = true;

  get password() { return this.confirmPasswordForm.get('Password'); }
  get confirmPassword() { return this.confirmPasswordForm.get('ConfirmPassword'); }

  private createForm(): void {
    this.confirmPasswordForm = this.formBuilder.group({
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
      'guid': [this.data.Guid]
    }, { validator: equalPasswordValidator });
  }

  enterConfirmPassword(): void {
    if (this.confirmPasswordForm.valid) {
      this.dialogRef.close({ 'confirmData': this.confirmPasswordForm.value });
    } else {
      throw new Error("Пароль не подтверждён. Проверьте правильность ввода данных и перейдите по ссылке в электронном сообщении ещё раз.")
    }
  }

  ngOnInit() {
  }

}
