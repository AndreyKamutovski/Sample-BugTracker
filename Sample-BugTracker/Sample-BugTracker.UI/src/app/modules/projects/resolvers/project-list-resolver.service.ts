import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { PortalService } from '../../portal/services/portal.service';
import { SharedDataService } from '../../shared/services/shared-data.service';

@Injectable()
export class ProjectListResolverService {

  constructor(
    private portaltService: PortalService,
    private sharedDataService:SharedDataService,
    
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // let portalId = sessionStorage.getItem('portalID');
    let portalId = this.sharedDataService.PortalId;
    return this.portaltService.getPortalProjects(portalId);
  }
}
