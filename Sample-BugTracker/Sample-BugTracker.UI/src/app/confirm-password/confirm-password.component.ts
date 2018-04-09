import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

import { AddPortalFormComponent } from '../portal/add-portal-form/add-portal-form.component';
import { SignupService } from '../services/signup.service';

@Component({
  selector: 'app-confirm-password',
  styles: []
})
export class ConfirmPasswordComponent implements OnInit {

  private confirmPasswordForm: FormGroup;
  private dataDialog: any;

  constructor(
    public dialog: MatDialog,
    private signupService: SignupService,
    private _route: ActivatedRoute,
    private router: Router
  ) {
    this.dataDialog = {
      Email: this._route.snapshot.params['Email'],
      projectId: this._route.snapshot.params['projectId'],
      Role: this._route.snapshot.params['RoleName']
    };
    this.openAddPortalDialog();
  };

  openAddPortalDialog(): void {
    let dialogRef = this.dialog.open(AddPortalFormComponent, {
      width: '50%',
      data: this.dataDialog
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.signupService.createPortal(result.confirmData).subscribe(res => {
            this.router.navigateByUrl('app/project');
        }
        );
      }
    });
  }

  ngOnInit() {
  }

}
