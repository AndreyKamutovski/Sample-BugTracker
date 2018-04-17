import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { PortalService } from '../services/portal.service';
import { Observable } from 'rxjs/Observable';
import { Portal } from '../models/portal.model';

@Injectable()
export class PortalListResolverService {

  constructor(private portalService: PortalService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Portal[]> {
    return this.portalService.getUserPortals();
  }
}