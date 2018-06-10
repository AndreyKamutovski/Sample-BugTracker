import 'rxjs/add/operator/filter';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../../../shared/services/auth.service';
import { Portal } from '../../models/portal.model';
import { SharedDataService } from '../../../shared/services/shared-data.service';

@Component({
  selector: 'app-portal-list',
  templateUrl: './portal-list.component.html',
  styles: [':host {display: flex; padding-top: 100px;} :host mat-card {margin: 0 auto; width: 70%;} :host mat-card-title {display: flex; justify-content: space-between; align-items: center;}']
})
export class PortalListComponent implements OnInit {

   _portals: Portal[];
   havePortal: boolean;

  constructor(
    public authService: AuthService,
    private _router: Router,
    private _route: ActivatedRoute,
    private sharedDataService:SharedDataService,
    
  ) { }

  ngOnInit() {
    this._portals = this._route.snapshot.data.portals;
    this.havePortal = this._route.snapshot.data.havePortal;
  }

  onClickPortal(event: Event, portal: Portal) {
    event.preventDefault();
    // sessionStorage.setItem('portalID', portal.PortalId);
    this.sharedDataService.PortalId = portal.PortalId;    
this.sharedDataService.PortalTitle = portal.Title;
    // sessionStorage.setItem('portalTitle', portal.Title);
    // this._router.navigate([portal.Title, "projects"], {relativeTo: this._route});
    this._router.navigate([portal.Title, "mainPage"], {relativeTo: this._route});
  }
}
