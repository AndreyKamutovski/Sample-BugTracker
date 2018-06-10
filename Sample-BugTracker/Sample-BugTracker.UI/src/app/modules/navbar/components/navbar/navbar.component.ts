import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar, MatSidenav } from '@angular/material';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { AuthService } from '../../../shared/services/auth.service';
import { REST_URI } from '../../../shared/services/httpClient.service';
import { UsersService } from '../../../shared/services/users.service';
import { UploadUserPhotoFormComponent } from '../upload-user-photo-form/upload-user-photo-form.component';
import { MessageService } from '../../../shared/services/message.service';
import { SharedDataService } from '../../../shared/services/shared-data.service';

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
  @Input() titleApp: string;
  @Input() sidenav: MatSidenav = null;


  public navbarElements: NavbarElement[];


  constructor(
    public authService: AuthService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private userService: UsersService,
    private _sanitizer: DomSanitizer,
    private router: Router,
    public messageService: MessageService,
    private sharedDataService: SharedDataService,


    @Inject(REST_URI) private uri: string,
  ) {

  }


  ngOnInit() {
    this.navbarElements = [
      { title: "Главная", tooltipTitle: "Главная", routerLink: `/portals/${this.sharedDataService.PortalTitle}/mainPage`},
      { title: "Проекты", tooltipTitle: "Проекты", routerLink: `/portals/${this.sharedDataService.PortalTitle}/projects` }
    ];
  }

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
        .then(avatarBase64 => {
          this.authService.currentUser.AvatarBase64 = avatarBase64;
          this.messageService.showSnackBarMsg("Аватар успешно изменён");
        });
    }
  }

  private toggleSidenav(): void {
    if (this.sidenav != null) {
      this.sidenav.toggle();
    }
  }

  get getUriAvatar(): string {
    if (this.authService.currentUser.AvatarBase64 != null) {
      return `url(${this.authService.currentUser.AvatarBase64})`;
    }
    else return "url('../../assets/person.png')";
  }

}
