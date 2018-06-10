import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { PortalService } from '../services/portal.service';
import { AuthService } from '../../shared/services/auth.service';
import { SharedDataService } from '../../shared/services/shared-data.service';

@Injectable()
export class IsPortalOwnerService {

  constructor(
    private portalService: PortalService,
     private authService: AuthService,
     private sharedDataService:SharedDataService,
     
    ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // let portalId = sessionStorage.getItem('portalID');
    let portalId = this.sharedDataService.PortalId;
    return this.portalService.IsPortalOwner(portalId).toPromise().then(res => this.authService.isPortalOwner = res);
  }
}
