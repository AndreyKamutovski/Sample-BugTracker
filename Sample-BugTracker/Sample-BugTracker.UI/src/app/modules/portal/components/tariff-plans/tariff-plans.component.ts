import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';

import { AuthService } from '../../../shared/services/auth.service';
import { Portal } from '../../models/portal.model';
import { PortalService } from '../../services/portal.service';
import { AddPortalFormComponent } from '../add-portal-form/add-portal-form.component';
import { UsersService } from '../../../shared/services/users.service';
import { AddPortalForExistingUserComponent } from '../add-portal-for-existing-user/add-portal-for-existing-user.component';

@Component({
  selector: 'app-tariff-plans',
  templateUrl: './tariff-plans.component.html',
  styles: [`mat-card-title {display: flex; justify-content: space-between; align-items: center;}`]
})
export class TariffPlansComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private portalService: PortalService,
    private authService: AuthService,
    private router: Router,
    private userServ: UsersService
  ) { }

  header = `Тарифные планы`;
  subheader = `Неограниченное число пользователей на платных тарифах. Цена зависит от числа проектов, которые можно создать в рамках портала.`;
  tiles = [
    { amount: 'FREE', title: "FREE", projectLimit: "1 Проект", storageLimit: "10 MB", userLimit: 5 },
    { amount: '$25 / месяц', title: "EXPRESS", projectLimit: "20 Проектов", storageLimit: "10 GB", userLimit: "&infin;" },
    { amount: '$50 / месяц', title: "PREMIUM", projectLimit: "50 Проектов", storageLimit: "100 GB", userLimit: "&infin;" },
    { amount: '$80 / месяц', title: "ENTERPRISE", projectLimit: "&infin; Проектов", storageLimit: "100 GB", userLimit: "&infin;" },
  ];


  opeAddPortalForNewUser() {
    let dialogRef = this.dialog.open(AddPortalFormComponent, {
      width: '50%',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.portalService.createPortal(result.portalData).subscribe((resPortal: Portal) => {
          sessionStorage.setItem('portalID', resPortal.PortalId);
          this.authService.login(result.portalData.Owner).then(resAuth => {
            this.router.navigateByUrl(`/portals/${resPortal.Title}/projects`);
          })
        }
        );
      }
    });
  }

  openAddPortalDialog(): void {
    if (this.authService.isLoggedIn) {
      this.userServ.userHavePortal().toPromise().then(have => {
        if (have) {
          this.opeAddPortalForNewUser();
        }
        // not have portal
        else {
          let dialogRef = this.dialog.open(AddPortalForExistingUserComponent, {
            width: '50%',
            data: {}
          });
        }
      });
    }
    else {
      this.opeAddPortalForNewUser();
    }


  }

  ngOnInit() {
  }

}
