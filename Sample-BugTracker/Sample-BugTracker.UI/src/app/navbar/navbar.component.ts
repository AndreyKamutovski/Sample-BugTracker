import { Component, Input, OnInit } from '@angular/core';

import { AuthService } from '../services/auth.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { UploadUserPhotoFormComponent } from '../upload-user-photo-form/upload-user-photo-form.component';

interface NavbarElement {
  title: string,
  tooltipTitle: string;
  routerLink: string;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() public titleApp: string;

  private navbarElements: NavbarElement[] = [
    { title: "Проекты", tooltipTitle: "Проекты", routerLink: "project" }
  ];

  constructor(
    private authService: AuthService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  private logout(): void {
    this.authService.logout();
  }

  openUploadUserPhotoDialog() {
    let dialogRef = this.dialog.open(UploadUserPhotoFormComponent, {
      width: '50%',
      data: {}
    });

    dialogRef.afterClosed().subscribe(this.afterClosedUploadUserPhotoDialog.bind(this));
  }

  private afterClosedUploadUserPhotoDialog(isUploadSuccsess: boolean) {
    console.log('isUploadSuccsess', isUploadSuccsess);
    if (isUploadSuccsess) {
      this.snackBar.open("Аватар успешно изменён", '', { duration: 2000 });
    };
  }


  ngOnInit() {

  }

}
