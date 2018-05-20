import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { PortalService } from '../services/portal.service';
import { AuthService } from '../../shared/services/auth.service';

@Injectable()
export class IsPortalOwnerService {

  constructor(private portalService: PortalService, private authService: AuthService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let portalId = sessionStorage.getItem('portalID');
    return this.portalService.IsPortalOwner(portalId).toPromise().then(res => this.authService.isPortalOwner = res);
  }
}
