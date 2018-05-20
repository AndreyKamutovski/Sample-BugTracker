import 'rxjs/add/operator/filter';

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../../../shared/services/auth.service';
import { Portal } from '../../models/portal.model';

@Component({
  selector: 'app-portal-list',
  templateUrl: './portal-list.component.html',
  styles: [':host {display: flex; padding-top: 100px;} :host mat-card {margin: 0 auto; width: 70%;} :host mat-card-title {display: flex; justify-content: space-between; align-items: center;}']
})
export class PortalListComponent implements OnInit {

   _portals: Portal[];

  constructor(
    public authService: AuthService,
    private _router: Router,
    private _route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this._portals = this._route.snapshot.data.portals;
  }

  onClickPortal(event: Event, portal: Portal) {
    event.preventDefault();
    sessionStorage.setItem('portalID', portal.PortalId);
    sessionStorage.setItem('portalTitle', portal.Title);
    this._router.navigate([portal.Title, "projects"], {relativeTo: this._route});
  }
}
