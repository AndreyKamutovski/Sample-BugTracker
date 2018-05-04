import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { PermissionService } from '../../../shared/services/permission.service';

@Injectable()
export class ProjectPermissionResolverService {

  constructor(private permissionService: PermissionService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let projectId = +sessionStorage.getItem('projectID');
    return this.permissionService.getProjectPermission(projectId).toPromise().then(perm => this.permissionService.Permission = perm);
  }
}
