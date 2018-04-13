import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirm-password',
  templateUrl: './confirm-password.component.html',
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
      Guid: this._route.snapshot.queryParams['id'],
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
        this.signupService.confirmAttachmentUser(result.confirmData).subscribe(res => {
          this.router.navigateByUrl('app/project');
        }
        );
      }
    });
  }

  ngOnInit() {
  }

}
