import 'rxjs/add/operator/filter';

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../../../../shared/services/auth.service';
import { Portal } from '../../models/portal.model';

@Component({
  selector: 'app-portal-list',
  templateUrl: './portal-list.component.html',
  styles: [':host {display: flex; padding-top: 100px;} :host mat-card {margin: 0 auto; width: 70%;} :host mat-card-title {display: flex; justify-content: space-between; align-items: center;}']
})
export class PortalListComponent implements OnInit {

  private _portals: Portal[];

  constructor(
    private authService: AuthService,
    private router: Router,
    private _route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this._portals = this._route.snapshot.data.portals;
  }

  private onClickPortal(event: Event, portalId: string) {
    event.preventDefault();
    sessionStorage.setItem('portalID', portalId);
    this.router.navigateByUrl('app/projects');
  }
}
