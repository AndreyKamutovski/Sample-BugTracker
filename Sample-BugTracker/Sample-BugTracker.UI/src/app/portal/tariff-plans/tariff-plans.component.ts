import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { AddPortalFormComponent } from '../add-portal-form/add-portal-form.component';
import { PortalService } from '../portal.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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
    private router: Router
  ) { }

  header = `Тарифные планы`;
  subheader = `Неограниченное число пользователей на платных тарифах. Цена зависит от числа проектов, которые можно создать в рамках портала.`;
  tiles = [
    { amount: 'FREE', title: "FREE", projectLimit: "1 Проект", storageLimit: "10 MB", userLimit: 5 },
    { amount: '$25 / месяц', title: "EXPRESS", projectLimit: "20 Проектов", storageLimit: "10 GB", userLimit: "&infin;" },
    { amount: '$50 / месяц', title: "PREMIUM", projectLimit: "50 Проектов", storageLimit: "100 GB", userLimit: "&infin;" },
    { amount: '$80 / месяц', title: "ENTERPRISE", projectLimit: "&infin; Проектов", storageLimit: "100 GB", userLimit: "&infin;" },
  ];


  openAddPortalDialog(): void {
    let dialogRef = this.dialog.open(AddPortalFormComponent, {
      width: '50%',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.portalService.createPortal(result.portalData).subscribe(res => {
          this.authService.login(result.portalData.Owner).subscribe(res => {
            this.router.navigateByUrl('app/project');
          })
        }
        );
      }
    });
  }

  ngOnInit() {
  }

}