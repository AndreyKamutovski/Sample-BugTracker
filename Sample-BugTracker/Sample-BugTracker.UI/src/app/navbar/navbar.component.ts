import { Component, Input, OnInit, Inject } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';

import { UsersService } from '../projects/services/users.service';
import { AuthService } from '../services/auth.service';
import { UploadUserPhotoFormComponent } from './upload-user-photo-form/upload-user-photo-form.component';
import { REST_URI } from '../shared/services/httpClient.service';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { Router } from '@angular/router';

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
