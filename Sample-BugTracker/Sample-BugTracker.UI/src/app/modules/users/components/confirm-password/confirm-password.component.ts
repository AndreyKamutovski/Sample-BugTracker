import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

import { UsersService } from '../../../shared/services/users.service';
import { ConfirmPasswordFormComponent } from '../confirm-password-form/confirm-password-form.component';

@Component({
  selector: 'app-confirm-password',
  templateUrl: './confirm-password.component.html',
  styles: []
})
export class ConfirmPasswordComponent implements OnInit {

  private dataDialog: any;

  constructor(
    public dialog: MatDialog,
    private userService: UsersService,
    private _route: ActivatedRoute,
    private router: Router
  ) {
    this.dataDialog = {
      // Guid: this._route.snapshot.queryParams['id'],
      Guid: this._route.snapshot.params['awaitId'],

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
        this.userService.confirmAttachmentUser(result.confirmData).toPromise().then(portalName => {
          console.log('confirmed user');
          
          this.router.navigateByUrl(`/portals/${portalName}/projects`);
        }
        );
      }
    });
  }

  ngOnInit() {
  }

}
