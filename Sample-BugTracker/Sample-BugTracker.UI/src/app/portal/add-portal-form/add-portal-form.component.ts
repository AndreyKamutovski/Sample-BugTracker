import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

import { SignupService } from '../../services/signup.service';
import { PortalService } from '../portal.service';
import { emailNotTakenValidator } from '../validators/async/email-not-taken.validator';
import { portalTitleNotTakenValidator } from '../validators/async/portal-title-not-taken.validator';
import { equalPasswordValidator } from '../validators/equal-password.validator';
import { nonLetterOrDigitPasswordValidator } from '../validators/non-letter-or-digit-password.validator';
import { requireDigitPasswordValidator } from '../validators/require-digit-password.validator';
import { requireLowercasePasswordValidator } from '../validators/require-lowercase-password.validator';
import { requireUppercasePasswordValidator } from '../validators/require-uppercase-password.validator';

@Component({
  selector: 'app-add-portal-form',
  templateUrl: './add-portal-form.component.html',
  styles: []
})
export class AddPortalFormComponent implements OnInit {
  private addPortalForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddPortalFormComponent>,
    private signupService: SignupService,
    private portalService: PortalService
  ) {
    this.createForm();
  };


  get title() { return this.addPortalForm.get('title'); }
  get email() { return this.addPortalForm.get('Owner.email'); }
  get password() { return this.addPortalForm.get('Owner.password'); }
  get confirmPassword() { return this.addPortalForm.get('Owner.confirmPassword'); }
  get owner() { return this.addPortalForm.get('Owner'); }

  private hidePassword: boolean = true;
  private hidePConfirm: boolean = true;

  private createForm(): void {
    this.addPortalForm = this.formBuilder.group({
      'title': ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
        Validators.pattern("^[А-Яа-яёA-Za-z0-9 _-]*$")
      ], portalTitleNotTakenValidator.bind(this)],
      'Owner': this.formBuilder.group({
        'email': ['', [Validators.required, Validators.email], emailNotTakenValidator.bind(this)],
        'password': ['', [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern("[^А-Яа-я]+"),
          nonLetterOrDigitPasswordValidator,
          requireDigitPasswordValidator,
          requireLowercasePasswordValidator,
          requireUppercasePasswordValidator
        ]],
        'confirmPassword': ['', [Validators.required, Validators.minLength(6)]],
        'roleName': ["Admin"]
      }, { validator: equalPasswordValidator })
    });
  }

  addPortal(): void {
    if (this.addPortalForm.valid) {
      this.dialogRef.close({ 'portalData': this.addPortalForm.value });
    } else {
      throw new Error("Портал не создан. Проверьте правильность ввода данных.")
    }
  }

  ngOnInit() {
  }
}
