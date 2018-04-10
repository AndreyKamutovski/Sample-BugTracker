import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

import { SignupService } from '../services/signup.service';
import { ConfirmPasswordFormComponent } from './confirm-password-form.component';

@Component({
  selector: 'app-confirm-password',
  template: '',
  styles: []
})
export class ConfirmPasswordComponent implements OnInit {

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
    let dialogRef = this.dialog.open(ConfirmPasswordFormComponent, {
      width: '50%',
      data: this.dataDialog
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        // this.signupService.createPortal(result.confirmData).subscribe(res => {
        //     this.router.navigateByUrl('app/project');
        // }
        // );
      }
    });
  }

  ngOnInit() {
  }

}
