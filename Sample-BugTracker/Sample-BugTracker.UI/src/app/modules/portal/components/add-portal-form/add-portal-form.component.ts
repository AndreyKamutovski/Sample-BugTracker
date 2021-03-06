import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

import {
    emailNotTakenValidator
} from '../../../shared/validators/async-validators/email-not-taken.validator';
import { equalPasswordValidator } from '../../../shared/validators/equal-password.validator';
import {
    nonLetterOrDigitPasswordValidator
} from '../../../shared/validators/non-letter-or-digit-password.validator';
import {
    requireDigitPasswordValidator
} from '../../../shared/validators/require-digit-password.validator';
import {
    requireLowercasePasswordValidator
} from '../../../shared/validators/require-lowercase-password.validator';
import {
    requireUppercasePasswordValidator
} from '../../../shared/validators/require-uppercase-password.validator';
import { PortalService } from '../../services/portal.service';
import { SignupService } from '../../services/signup.service';
import {
    portalTitleNotTakenValidator
} from '../../validators/async-validators/portal-title-not-taken.validator';

@Component({
  selector: 'app-add-portal-form',
  templateUrl: './add-portal-form.component.html',
  styles: []
})
export class AddPortalFormComponent implements OnInit {
   addPortalForm: FormGroup;

  constructor(
     public formBuilder: FormBuilder,
     public dialogRef: MatDialogRef<AddPortalFormComponent>,
     public signupService: SignupService,
     public portalService: PortalService
  ) {
    this.createForm();
  };


  get title() { return this.addPortalForm.get('Title'); }
  get email() { return this.addPortalForm.get('Owner.Email'); }
  get password() { return this.addPortalForm.get('Owner.Password'); }
  get confirmPassword() { return this.addPortalForm.get('Owner.ConfirmPassword'); }
  get owner() { return this.addPortalForm.get('Owner'); }

   hidePassword: boolean = true;
   hidePConfirm: boolean = true;

  private createForm(): void {
    this.addPortalForm = this.formBuilder.group({
      'Title': ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
        Validators.pattern("^[А-Яа-яёA-Za-z0-9 _-]*$")
      ], portalTitleNotTakenValidator.bind(this)],
      'Owner': this.formBuilder.group({
        'Email': ['', [Validators.required, Validators.email], emailNotTakenValidator.bind(this)],
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
        'RoleName': ["Admin"]
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
