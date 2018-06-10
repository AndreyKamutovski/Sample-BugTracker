import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { SignupService } from '../../services/signup.service';
import { PortalService } from '../../services/portal.service';
import { portalTitleNotTakenValidator } from '../../validators/async-validators/portal-title-not-taken.validator';
import { Router } from '@angular/router';
import { Portal } from '../../models/portal.model';

@Component({
  selector: 'app-add-portal-for-existing-user',
  templateUrl: './add-portal-for-existing-user.component.html',
  styles: []
})
export class AddPortalForExistingUserComponent implements OnInit {

  addPortalForm: FormGroup;

  get title() { return this.addPortalForm.get('Title'); }


  constructor(
    public formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddPortalForExistingUserComponent>,
    public signupService: SignupService,
    public portalService: PortalService,
    private router: Router,

  ) {
    this.createForm();
  }

  ngOnInit() {
  }

  private createForm(): void {
    this.addPortalForm = this.formBuilder.group({
      'Title': ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
        Validators.pattern("^[А-Яа-яёA-Za-z0-9 _-]*$")
      ], portalTitleNotTakenValidator.bind(this)]
    });
  }
 
  addPortal(): void {
    if (this.addPortalForm.valid) {
      this.portalService.createPortalForExistingUser(this.title.value).toPromise().then((res: Portal) => {
        sessionStorage.setItem('portalID', res.PortalId); 
        this.router.navigateByUrl(`/portals/${res.Title}/projects`);
        this.dialogRef.close({ 'portalData': this.addPortalForm.value });
      });
    } else {
      throw new Error("Портал не создан. Проверьте правильность ввода данных.")
    }
  }
}
