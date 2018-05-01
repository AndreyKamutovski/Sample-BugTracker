import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { PortalService } from '../../portal/services/portal.service';

@Injectable()
export class ProjectListResolverService {

  constructor(private portaltService: PortalService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let portalId = sessionStorage.getItem('portalID');
    return this.portaltService.getPortalProjects(portalId);
  }
}
