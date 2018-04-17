import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { ProjectService } from '../project.service';

@Injectable()
export class ProjectListResolverService {

  constructor(private projectService: ProjectService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let portalId = sessionStorage.getItem('portalID');
    return this.projectService.getPortalProjects(portalId);
  }
}
