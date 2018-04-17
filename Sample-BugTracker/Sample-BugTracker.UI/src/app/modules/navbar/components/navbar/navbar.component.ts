import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar, MatSidenav } from '@angular/material';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { AuthService } from '../../../../shared/services/auth.service';
import { REST_URI } from '../../../../shared/services/httpClient.service';
import { UsersService } from '../../../users/users.service';
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
  @Input() public sidenav: MatSidenav = null;


  private navbarElements: NavbarElement[] = [
    { title: "Проекты", tooltipTitle: "Проекты", routerLink: "projects" }
  ];


  constructor(
    private authService: AuthService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private userService: UsersService,
    private _sanitizer: DomSanitizer,
    private router: Router,
    @Inject(REST_URI) private uri: string,
  ) { }

  private logout(): void {
    this.router.navigateByUrl('/');
  }

  openUploadUserPhotoDialog() {
    let dialogRef = this.dialog.open(UploadUserPhotoFormComponent, {
      width: '50%',
      data: {}
    });

    dialogRef.afterClosed().subscribe(this.afterClosedUploadAvatarDialog.bind(this));
  }

  private afterClosedUploadAvatarDialog(avatarContent: any) {
    if (avatarContent != null) {
      this.userService.uploadAvatar(avatarContent).toPromise()
        .then(newPath => {
          this.authService.currentUser.Avatar = newPath;
          this.snackBar.open("Аватар успешно изменён", '', { duration: 2000 });
        });
    }
  }

  private toggleSidenav(): void {
    if (this.sidenav != null) {
      this.sidenav.toggle();
    }
  }

  private get getUriAvatar(): SafeStyle {
    let uriAvatar = `url('../../assets/person.png')`;
    if (this.authService.currentUser.Avatar != null) {
      uriAvatar = `url('${this.uri}${this.authService.currentUser.Avatar}')`;
    }
    return this._sanitizer.bypassSecurityTrustStyle(uriAvatar);
  }

  ngOnInit() {
  }
}
