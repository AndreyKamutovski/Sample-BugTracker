import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { Portal } from '../../shared/models/portal.model';
import { PortalService } from '../portal.service';
import "rxjs/add/operator/filter";
import { PortalDataSourceService } from '../portal-data-source.service';
import { PortalListResolverService } from '../portal-list-resolver.service';

@Component({
  selector: 'app-portal-list',
  templateUrl: './portal-list.component.html',
  styles: []
})
export class PortalListComponent implements OnInit {
  private previousUrl: string;
  constructor(
    private portalDataSource: PortalDataSourceService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  private onClickPortal(event: Event, portalId: string) {
    event.preventDefault();
    this.portalDataSource.saveInSessionStorage(portalId);
    this.router.navigateByUrl('app/project');
  }
}
