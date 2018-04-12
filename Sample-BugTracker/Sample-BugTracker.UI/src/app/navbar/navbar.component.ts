import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';

import { AuthService } from '../services/auth.service';
import { UploadUserPhotoFormComponent } from './upload-user-photo-form/upload-user-photo-form.component';
import { UsersService } from '../projects/services/users.service';

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
    public snackBar: MatSnackBar,
    private userService: UsersService
  ) { }

  private logout(): void {
    this.authService.logout();
  }

  openUploadUserPhotoDialog() {
    let dialogRef = this.dialog.open(UploadUserPhotoFormComponent, {
      width: '50%',
      data: {}
    });

    dialogRef.afterClosed().subscribe(this.afterClosedUploadAvatarDialog.bind(this));
  }

  private afterClosedUploadAvatarDialog(avatarContent: any) {
    console.log('avatarContent',avatarContent);
    if (avatarContent != null) {
      this.userService.uploadAvatar(avatarContent).toPromise().then(res => {
        
        this.snackBar.open("Аватар успешно изменён", '', { duration: 2000 });
      });
    }
  }

  ngOnInit() {

  }
}
